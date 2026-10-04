// Sternwacht-Bot: schickt jeden Sonntag einen Wochenbericht mit den Zahlen des Spiels nach Discord.
// Die Zahlen der Vorwoche stehen in bot/statistik.json und werden nach dem Senden aktualisiert.
const fs = require("fs");
const vm = require("vm");

const WEBHOOK = process.env.DISCORD_WEBHOOK;
const UNIVERSE_ID = process.env.UNIVERSE_ID || "10768606540";
const DATEI = "bot/statistik.json";
const FARBE = 0x7EE0C3;

function zahl(n) { return Number(n || 0).toLocaleString("de-DE"); }
function zuwachs(jetzt, vorher) {
  if (vorher === undefined || vorher === null) return "";
  const d = jetzt - vorher;
  if (d === 0) return " (±0 diese Woche)";
  return " (" + (d > 0 ? "+" : "−") + zahl(Math.abs(d)) + " diese Woche)";
}
async function json(url) {
  const r = await fetch(url, { headers: { "Accept": "application/json" } });
  if (!r.ok) throw new Error("Roblox antwortet mit " + r.status + " für " + url);
  return r.json();
}
function lesen(code) {
  const kontext = { window: {} };
  vm.runInNewContext(code, kontext, { timeout: 1000 });
  return kontext.window.MR || {};
}

async function main() {
  if (!WEBHOOK) {
    console.error("Kein Discord-Webhook gefunden. Lege in GitHub unter Settings → Secrets and variables → Actions das Geheimnis DISCORD_WEBHOOK an.");
    process.exit(1);
  }
  const spiel = (await json("https://games.roblox.com/v1/games?universeIds=" + UNIVERSE_ID)).data[0];
  const stimmen = (await json("https://games.roblox.com/v1/games/votes?universeIds=" + UNIVERSE_ID)).data[0] || {};
  let symbol = null;
  try { symbol = (await json("https://thumbnails.roblox.com/v1/games/icons?universeIds=" + UNIVERSE_ID + "&size=512x512&format=Png&isCircular=false")).data[0].imageUrl; } catch (e) {}

  const jetzt = {
    datum: new Date().toISOString().slice(0, 10),
    besuche: spiel.visits || 0,
    favoriten: spiel.favoritedCount || 0,
    daumenHoch: stimmen.upVotes || 0,
    daumenRunter: stimmen.downVotes || 0
  };
  let vorher = null;
  try { vorher = JSON.parse(fs.readFileSync(DATEI, "utf8")); } catch (e) { vorher = null; }

  let spielLink = "https://www.roblox.com/games/" + (spiel.rootPlaceId || "");
  try { spielLink = (lesen(fs.readFileSync("daten/spiel.js", "utf8")).spiel.links.spiel) || spielLink; } catch (e) {}

  const zuletzt = spiel.updated ? new Date(spiel.updated).toLocaleString("de-DE", { timeZone: "Europe/Berlin", dateStyle: "long", timeStyle: "short" }) + " Uhr" : "unbekannt";
  const bewertung = (jetzt.daumenHoch + jetzt.daumenRunter) > 0 ? Math.round(jetzt.daumenHoch / (jetzt.daumenHoch + jetzt.daumenRunter) * 100) + " % positiv" : "noch keine Bewertungen";
  const zeitraum = vorher && vorher.datum
    ? "Die Woche seit dem " + new Date(vorher.datum + "T12:00:00Z").toLocaleDateString("de-DE", { day: "numeric", month: "long" }) + " in Zahlen."
    : "Die erste Messung – ab nächster Woche siehst du hier, wie viel dazugekommen ist.";

  const nachricht = {
    username: "Sternwacht-Bot",
    avatar_url: symbol || undefined,
    allowed_mentions: { parse: [] },
    embeds: [{
      title: "📊 Wochenbericht – Mythische Rolle",
      url: spielLink,
      description: zeitraum,
      color: FARBE,
      fields: [
        { name: "👣 Besuche", value: "**" + zahl(jetzt.besuche) + "**" + zuwachs(jetzt.besuche, vorher && vorher.besuche), inline: true },
        { name: "⭐ Favoriten", value: "**" + zahl(jetzt.favoriten) + "**" + zuwachs(jetzt.favoriten, vorher && vorher.favoriten), inline: true },
        { name: "👍 Daumen hoch", value: "**" + zahl(jetzt.daumenHoch) + "**" + zuwachs(jetzt.daumenHoch, vorher && vorher.daumenHoch) + "\n" + bewertung, inline: true },
        { name: "🎲 Gerade im Spiel", value: zahl(spiel.playing) + " Spieler", inline: true },
        { name: "🛠️ Letztes Spiel-Update", value: zuletzt, inline: true },
        { name: "\u200b", value: "[▶ Jetzt spielen](" + spielLink + ")", inline: false }
      ],
      thumbnail: symbol ? { url: symbol } : undefined,
      footer: { text: "Sternwacht-Bot · jeden Sonntag" },
      timestamp: new Date().toISOString()
    }]
  };
  const antwort = await fetch(WEBHOOK, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(nachricht) });
  if (!antwort.ok) {
    console.error("Discord hat den Bericht abgelehnt: " + antwort.status + " " + (await antwort.text()).slice(0, 300));
    process.exit(1);
  }
  fs.writeFileSync(DATEI, JSON.stringify(jetzt, null, 2) + "\n");
  console.log("Wochenbericht gesendet: " + JSON.stringify(jetzt));
}
main().catch(e => { console.error(e.message || e); process.exit(1); });
