// Sternwacht-Bot: leitet Support-Nachrichten aus dem Spiel in einen privaten Discord-Kanal weiter.
// Das Spiel speichert jede Nachricht im DataStore „SupportTickets_v1“ (Schlüssel T_<Unixzeit>_<UserId>).
// Dieses Skript läuft alle 10 Minuten als GitHub Action, liest neue Einträge über Roblox Open Cloud
// und postet sie per Webhook nach Discord. Das Postfach im Spiel bleibt unverändert.
//
// WICHTIG: Das Repository ist öffentlich – und damit auch die Logs der Actions.
// Deshalb gibt dieses Skript NIE Text, Namen, IDs, Schlüssel oder die Webhook-Adresse aus, nur Zahlen.
// Der Merkzettel bot/support-stand.json enthält nur eine Uhrzeit und unkenntliche Fingerabdrücke
// der Schlüssel (HMAC mit dem Webhook als Geheimnis) – keine UserIds, keine Inhalte.
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const API_KEY = (process.env.ROBLOX_API_KEY || "").trim();
const WEBHOOK = (process.env.DISCORD_SUPPORT_WEBHOOK || "").trim();
const UNIVERSE_ID = (process.env.UNIVERSE_ID || "10768606540").trim();
const DATASTORE = (process.env.DATASTORE || "SupportTickets_v1").trim();
// Nur zum Testen umstellbar (lokaler Nachbau der Roblox-Schnittstellen)
const API_BASIS = (process.env.ROBLOX_API_BASE || "https://apis.roblox.com").replace(/\/+$/, "");
const BILD_BASIS = (process.env.ROBLOX_THUMBNAILS_BASE || "https://thumbnails.roblox.com").replace(/\/+$/, "");
const DATEI = "bot/support-stand.json";

const MAX_PRO_LAUF = 10;        // höchstens so viele Nachrichten pro Lauf – der Rest kommt beim nächsten Lauf
const ERSTER_LAUF_TAGE = 7;     // allererster Lauf (noch kein Merkzettel): Nachrichten der letzten 7 Tage
const FENSTER = 3 * 3600;       // Sicherheitsfenster in Sekunden für Einträge, die etwas verspätet auftauchen
const MAX_SEITEN = 40;          // höchstens 40 Seiten à 256 Schlüssel auflisten
const MAX_MERKEN = 200;         // höchstens so viele Fingerabdrücke im Merkzettel
const MAX_TEXT = 3500;          // Discord erlaubt 4096 Zeichen in der Beschreibung
const ZEITLIMIT = 20000;        // Millisekunden pro Anfrage

const KATEGORIEN = {
  Fehler: { symbol: "🐞", farbe: 0xE5534B },
  Frage: { symbol: "❓", farbe: 0x58A6FF },
  Idee: { symbol: "💡", farbe: 0xE8C46A },
  Sonstiges: { symbol: "📝", farbe: 0x7EE0C3 }
};
const FUSSZEILE = "Erledigt? Im Spiel: Support → 📬 Postfach → ✓ Erledigt";

// Fehler mit einer Meldung, die gefahrlos im öffentlichen Log stehen darf
class Abbruch extends Error {}

function warten(ms) { return new Promise(r => setTimeout(r, ms)); }
function mehrzahl(n, eins, viele) { return n + " " + (n === 1 ? eins : viele); }

// Fingerabdruck eines Schlüssels: ohne den geheimen Webhook nicht zurückzurechnen
function fingerabdruck(text) {
  return crypto.createHmac("sha256", WEBHOOK).update(String(text)).digest("hex");
}
function schluesselAbdruck(id) { return fingerabdruck("schluessel:" + id).slice(0, 16); }
function pruefwert() { return fingerabdruck("sternwacht-support-stand").slice(0, 8); }

// ---------- Merkzettel ----------
function standLesen() {
  let roh;
  try { roh = fs.readFileSync(DATEI, "utf8"); } catch (e) { return null; }
  let d;
  try { d = JSON.parse(roh); } catch (e) { d = null; }
  if (!d || typeof d !== "object" || typeof d.zuletzt !== "number") {
    throw new Abbruch("Der Merkzettel " + DATEI + " ist beschädigt. Bitte reparieren oder löschen (dann werden die Nachrichten der letzten " + ERSTER_LAUF_TAGE + " Tage erneut geschickt).");
  }
  const keys = Array.isArray(d.keys) ? d.keys.filter(k => typeof k === "string" && /^\d+-[0-9a-f]{16}$/.test(k)) : [];
  return { zuletzt: d.zuletzt, pruef: typeof d.pruef === "string" ? d.pruef : "", ab: typeof d.ab === "number" ? d.ab : 0, keys };
}
function standSchreiben(stand) {
  // Nur Fingerabdrücke behalten, die noch im Sicherheitsfenster liegen
  const grenze = stand.zuletzt - FENSTER;
  stand.keys = stand.keys
    .filter(k => Number(k.split("-")[0]) > grenze)
    .sort((a, b) => Number(a.split("-")[0]) - Number(b.split("-")[0]))
    .slice(-MAX_MERKEN);
  const daten = { zuletzt: stand.zuletzt, pruef: stand.pruef, keys: stand.keys };
  if (stand.ab > grenze) daten.ab = stand.ab; // Untergrenze nur so lange, wie sie noch etwas bewirkt
  fs.mkdirSync(path.dirname(DATEI), { recursive: true });
  fs.writeFileSync(DATEI, JSON.stringify(daten, null, 2) + "\n");
}

// ---------- Roblox Open Cloud (Data Stores v2) ----------
const STORE_PFAD = "/cloud/v2/universes/" + encodeURIComponent(UNIVERSE_ID) + "/data-stores/" + encodeURIComponent(DATASTORE);

function wartezeit(antwort, standard) {
  const s = parseFloat(antwort.headers.get("retry-after") || "");
  return Number.isFinite(s) && s >= 0 ? Math.min(s, 60) * 1000 + 250 : standard;
}

// Holt JSON von Open Cloud. Gibt null zurück, wenn der Eintrag nicht (mehr) existiert (404).
async function roblox(pfad, wofuer) {
  for (let versuch = 1; ; versuch++) {
    let r;
    try {
      r = await fetch(API_BASIS + pfad, {
        headers: { "x-api-key": API_KEY, "Accept": "application/json" },
        signal: AbortSignal.timeout(ZEITLIMIT)
      });
    } catch (e) {
      if (versuch < 3) { await warten(2000 * versuch); continue; }
      throw new Abbruch("Roblox Open Cloud ist nicht erreichbar (" + wofuer + ").");
    }
    if ((r.status === 429 || r.status >= 500) && versuch < 3) {
      await warten(wartezeit(r, 2000 * versuch));
      continue;
    }
    if (r.status === 404) return null;
    if (r.status === 401) throw new Abbruch("Roblox lehnt den API-Schlüssel ab (401). Geheimnis ROBLOX_API_KEY prüfen – falsch kopiert, gelöscht oder abgelaufen?");
    if (r.status === 403) throw new Abbruch("Dem API-Schlüssel fehlt eine Berechtigung (403). Im Creator Hub prüfen: Data Stores, Spiel Mythische Rolle, Einträge auflisten + lesen.");
    if (!r.ok) throw new Abbruch("Roblox Open Cloud antwortet mit Status " + r.status + " (" + wofuer + ").");
    try { return await r.json(); } catch (e) {
      throw new Abbruch("Roblox Open Cloud hat eine unlesbare Antwort geschickt (" + wofuer + ").");
    }
  }
}

// Gemeinsamer Anfang aller Zeitstempel zwischen „von“ und „bis“ → kleinerer Filter, weniger Seiten
function praefix(von, bis) {
  const a = String(Math.max(0, von)), b = String(bis);
  if (a.length !== b.length) return "T_";
  let i = 0;
  while (i < a.length && a[i] === b[i]) i++;
  return "T_" + a.slice(0, i);
}

async function schluesselAuflisten(filterPraefix) {
  const ids = [];
  let token = "";
  for (let seite = 0; seite < MAX_SEITEN; seite++) {
    const q = new URLSearchParams({ maxPageSize: "256", filter: 'id.startsWith("' + filterPraefix + '")' });
    if (token) q.set("pageToken", token);
    const d = await roblox(STORE_PFAD + "/entries?" + q.toString(), "Auflisten");
    if (d === null) throw new Abbruch("Der DataStore wurde nicht gefunden (404). Stimmen UNIVERSE_ID und DATASTORE?");
    for (const e of d.dataStoreEntries || []) {
      let id = typeof e.id === "string" ? e.id : "";
      if (!id && typeof e.path === "string" && e.path.includes("/entries/")) id = e.path.split("/entries/").pop();
      if (id) ids.push(id);
    }
    token = d.nextPageToken || "";
    if (!token) return { ids, vollstaendig: true };
  }
  return { ids, vollstaendig: false };
}

async function eintragLesen(id) {
  const d = await roblox(STORE_PFAD + "/entries/" + encodeURIComponent(id), "Lesen");
  if (d === null) return null;
  let wert = d.value;
  if (typeof wert === "string") { try { wert = JSON.parse(wert); } catch (e) { /* bleibt Text */ } }
  return { wert };
}

// Vorschaubild für eine Bild-ID (öffentliche Thumbnail-Schnittstelle, ohne Schlüssel). Bei Fehlern: kein Bild.
async function vorschaubild(bildId) {
  try {
    const r = await fetch(BILD_BASIS + "/v1/assets?assetIds=" + bildId + "&size=420x420&format=Png&isCircular=false", { signal: AbortSignal.timeout(10000) });
    if (!r.ok) return null;
    const d = await r.json();
    const t = d && Array.isArray(d.data) ? d.data[0] : null;
    if (t && t.state === "Completed" && typeof t.imageUrl === "string" && /^https?:\/\//.test(t.imageUrl)) return t.imageUrl;
  } catch (e) { /* ohne Bild weiter */ }
  return null;
}

// ---------- Discord ----------
function kuerzen(text, max) {
  const zeichen = Array.from(String(text));
  return zeichen.length > max ? zeichen.slice(0, max - 1).join("") + "…" : zeichen.join("");
}
// Spielertext soll als reiner Text erscheinen: Markdown, Links und <…>-Codes unschädlich machen
function md(text) {
  return String(text)
    .replace(/[\\*_~`|\[\]()<>]/g, "\\$&")
    .replace(/^(\s*)([#>-])/gm, "$1\\$2");
}
function wert(text) {
  const t = text === undefined || text === null ? "" : String(text).trim();
  return t ? kuerzen(md(t), 1000) : "–";
}
function gueltigeZeit(unix) { return Number.isFinite(unix) && unix > 0 && unix < 4102444800; } // vor dem Jahr 2100
function zeitText(unix) {
  return new Date(unix * 1000).toLocaleString("de-DE", { timeZone: "Europe/Berlin", dateStyle: "medium", timeStyle: "short" }) + " Uhr";
}

async function nachrichtBauen(ticket, schluesselZeit) {
  const t = ticket && typeof ticket === "object" ? ticket : {};
  const kategorie = KATEGORIEN[t.kategorie] ? t.kategorie : "Sonstiges";
  const art = KATEGORIEN[kategorie];
  const zeit = gueltigeZeit(Number(t.zeit)) ? Number(t.zeit) : schluesselZeit;
  const userId = /^\d+$/.test(String(t.userId || "")) ? String(t.userId) : "";
  const ausStudio = String(t.server || "") === "Studio";

  const name = (t.anzeige ? md(String(t.anzeige).trim()) : "?") + " (@" + (t.spieler ? md(String(t.spieler).trim()) : "?") + ")";
  const felder = [
    { name: "👤 Spieler", value: kuerzen(userId ? "[" + name + "](https://www.roblox.com/users/" + userId + "/profile)" : name, 1000), inline: true },
    { name: "📱 Gerät", value: wert(t.geraet), inline: true },
    { name: "📍 Ort", value: wert(t.ort), inline: true },
    { name: "🏷️ Version", value: wert(t.version), inline: true },
    { name: "🖥️ Server", value: wert(t.server), inline: true },
    { name: "🕒 Zeit", value: zeitText(zeit), inline: true }
  ];
  const bildId = /^\d{5,20}$/.test(String(t.bild || "")) ? String(t.bild) : "";
  let bild = null;
  if (bildId) {
    felder.push({ name: "🖼️ Bild", value: "[Bild " + bildId + " öffnen](https://create.roblox.com/store/asset/" + bildId + ")", inline: false });
    bild = await vorschaubild(bildId);
  }
  const text = typeof t.text === "string" && t.text.trim() ? t.text.trim() : "";
  return {
    username: "Sternwacht-Support",
    allowed_mentions: { parse: [] },
    embeds: [{
      title: art.symbol + " " + kategorie + (ausStudio ? " · 🧪 Test aus Studio" : ""),
      description: text ? kuerzen(md(text), MAX_TEXT) : (ticket && typeof ticket === "object" ? "*(kein Text)*" : "*Eintrag in unbekanntem Format – bitte im Spiel-Postfach nachsehen.*"),
      color: art.farbe,
      fields: felder,
      image: bild ? { url: bild } : undefined,
      footer: { text: FUSSZEILE },
      timestamp: new Date(zeit * 1000).toISOString()
    }]
  };
}

// Notlösung, falls Discord eine Nachricht ablehnt (400): nur ein Hinweis, damit nichts verloren geht
function ersatzNachricht(original, schluesselZeit) {
  const e = original.embeds[0];
  return {
    username: "Sternwacht-Support",
    allowed_mentions: { parse: [] },
    embeds: [{
      title: e.title,
      description: "Diese Nachricht konnte hier nicht angezeigt werden. Bitte im Spiel unter Support → 📬 Postfach nachsehen.",
      color: e.color,
      fields: [{ name: "🕒 Zeit", value: zeitText(schluesselZeit), inline: true }],
      footer: { text: FUSSZEILE },
      timestamp: new Date(schluesselZeit * 1000).toISOString()
    }]
  };
}

// Schickt eine Nachricht an den Webhook. Beachtet Discords Wartezeiten (429 / retry_after).
async function discordSenden(nachricht) {
  const ziel = new URL(WEBHOOK);
  ziel.searchParams.set("wait", "true");
  for (let versuch = 1; versuch <= 5; versuch++) {
    let r;
    try {
      r = await fetch(ziel, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nachricht),
        signal: AbortSignal.timeout(ZEITLIMIT)
      });
    } catch (e) {
      if (versuch < 3) { await warten(2000 * versuch); continue; }
      throw new Abbruch("Discord ist nicht erreichbar.");
    }
    if (r.status === 429) {
      let sekunden = NaN;
      try { const d = await r.json(); sekunden = Number(d.retry_after); } catch (e) { /* Kopfzeile nutzen */ }
      if (!Number.isFinite(sekunden)) sekunden = parseFloat(r.headers.get("retry-after") || "2");
      await warten(Math.min(Math.max(sekunden, 0.5), 60) * 1000 + 250);
      continue;
    }
    if (r.status >= 500 && versuch < 3) { await warten(2000 * versuch); continue; }
    // Kontingent aufgebraucht? Dann vor der nächsten Nachricht kurz warten.
    if (r.headers.get("x-ratelimit-remaining") === "0") {
      const s = parseFloat(r.headers.get("x-ratelimit-reset-after") || "1");
      await warten(Math.min(Number.isFinite(s) ? s : 1, 60) * 1000 + 250);
    }
    try { await r.arrayBuffer(); } catch (e) { /* Antwort wird nicht gebraucht */ }
    return r.status;
  }
  throw new Abbruch("Discord bremst zu stark (429) – nächster Versuch beim nächsten Lauf.");
}
function discordFehler(status) {
  if (status === 401 || status === 403 || status === 404) {
    return "Discord kennt den Webhook nicht (" + status + "). Wurde er gelöscht? Geheimnis DISCORD_SUPPORT_WEBHOOK prüfen.";
  }
  return "Discord hat eine Support-Nachricht abgelehnt (Status " + status + ").";
}

// ---------- Ablauf ----------
async function main() {
  if (!API_KEY || !WEBHOOK) {
    console.log("Support-Weiterleitung ist noch nicht eingerichtet (Geheimnisse fehlen).");
    return;
  }
  if (!/^https?:\/\/\S+$/.test(WEBHOOK)) throw new Abbruch("Das Geheimnis DISCORD_SUPPORT_WEBHOOK ist keine gültige Webhook-Adresse.");

  const jetzt = Math.floor(Date.now() / 1000);
  const alt = standLesen();
  const pruef = pruefwert();
  // grenze: nur Nachrichten, die NACH dieser Zeit geschrieben wurden, kommen in Frage
  // ab: feste Untergrenze nach einem Webhook-Tausch (davor ist alles schon gesendet)
  let grenze, bekannt, ab = 0;
  if (!alt) {
    grenze = jetzt - ERSTER_LAUF_TAGE * 86400;
    bekannt = new Set();
  } else if (alt.pruef !== pruef) {
    // Der Webhook wurde getauscht: alte Fingerabdrücke passen nicht mehr → nur echt neuere Nachrichten
    grenze = ab = alt.zuletzt;
    bekannt = new Set();
  } else {
    ab = alt.ab;
    grenze = Math.max(alt.zuletzt - FENSTER, ab);
    bekannt = new Set(alt.keys.map(k => k.split("-")[1]));
  }
  const stand = {
    zuletzt: alt ? alt.zuletzt : 0,
    pruef,
    ab,
    keys: alt && alt.pruef === pruef ? alt.keys.slice() : []
  };

  const liste = await schluesselAuflisten(praefix(grenze, jetzt + 86400));
  if (!liste.vollstaendig) console.log("Hinweis: Sehr viele gespeicherte Nachrichten – nicht alle konnten geprüft werden. Bitte alte Nachrichten im Spiel-Postfach erledigen.");

  const neu = [];
  for (const id of new Set(liste.ids)) {
    const m = /^T_(\d+)_(\d+)$/.exec(id);
    if (!m) continue;
    const zeit = Number(m[1]);
    if (!gueltigeZeit(zeit) || zeit <= grenze) continue;
    const abdruck = schluesselAbdruck(id);
    if (bekannt.has(abdruck)) continue;
    neu.push({ id, zeit, abdruck });
  }
  neu.sort((a, b) => a.zeit - b.zeit || (a.id < b.id ? -1 : 1));
  const jetztDran = neu.slice(0, MAX_PRO_LAUF);

  let gesendet = 0, verschwunden = 0;
  for (const t of jetztDran) {
    const eintrag = await eintragLesen(t.id);
    if (eintrag === null) { verschwunden++; continue; } // inzwischen im Spiel erledigt/gelöscht

    const nachricht = await nachrichtBauen(eintrag.wert, t.zeit);
    let status = await discordSenden(nachricht);
    if (status === 400) status = await discordSenden(ersatzNachricht(nachricht, t.zeit));
    if (status < 200 || status >= 300) {
      if (gesendet) console.log(mehrzahl(gesendet, "neue Support-Nachricht", "neue Support-Nachrichten") + " weitergeleitet.");
      throw new Abbruch(discordFehler(status));
    }

    // Erst nach erfolgreichem Senden merken (und sofort speichern, falls der Lauf später abbricht)
    gesendet++;
    stand.zuletzt = Math.min(Math.max(stand.zuletzt, t.zeit), jetzt);
    stand.keys.push(t.zeit + "-" + t.abdruck);
    standSchreiben(stand);
    await warten(400);
  }

  if (gesendet) console.log(mehrzahl(gesendet, "neue Support-Nachricht", "neue Support-Nachrichten") + " weitergeleitet.");
  else console.log("Keine neuen Support-Nachrichten.");
  if (verschwunden) console.log(mehrzahl(verschwunden, "Nachricht war", "Nachrichten waren") + " inzwischen schon gelöscht.");
  if (neu.length > jetztDran.length) console.log((neu.length - jetztDran.length) + " weitere folgen beim nächsten Lauf.");
}

// Nie die rohe Fehlermeldung ausgeben – sie könnte Inhalte oder Adressen enthalten.
main().catch(e => {
  if (e instanceof Abbruch) console.error(e.message);
  else console.error("Unerwarteter Fehler bei der Support-Weiterleitung (" + ((e && e.name) || "Fehler") + ").");
  process.exit(1);
});
