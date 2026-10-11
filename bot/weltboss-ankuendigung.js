// Sternwacht-Bot: kündigt den Weltboss 5 Minuten vor seinem Termin im Weltboss-Kanal an (täglich 18:00 und 21:00 Uhr
// deutscher Zeit, Version 3.0). Boss und Ort rechnet er genauso aus wie das Spiel (Roblox: ReplicatedStorage.Module.
// WeltbossDaten): Termin-Nummer nr = Tag × 2 + (0 für 18 Uhr, 1 für 21 Uhr), Tag = Tage seit dem 1.1.1970 in deutscher
// Zeit, Boss = BOSSE[nr % 3]. Ändert sich das im Spiel, muss es hier mitgeändert werden.
// Ohne das Geheimnis DISCORD_WELTBOSS_WEBHOOK sendet er nichts und endet grün. Sendet nur, wenn in den nächsten
// 20 Minuten wirklich ein Weltboss erwacht (der Ablauf startet zu Sommer- und Winterzeit, siehe discord-weltboss.yml).
// Probe ohne Senden: node bot/weltboss-ankuendigung.js --probe
const WEBHOOK = process.env.DISCORD_WELTBOSS_WEBHOOK;
const UNIVERSE_ID = process.env.UNIVERSE_ID || "10768606540";
const TERMINE = [18, 21];
const BOSSE = [
  { name: "Frost-Titan", praep: "auf der", gebiet: "Eis-Insel" },
  { name: "Lava-Koloss", praep: "auf der", gebiet: "Vulkan-Insel" },
  { name: "Sturm-Greif", praep: "im", gebiet: "Nebelwald" }
];
const VORHER = 5 * 60;        // Sekunden vor dem Termin kommt die Nachricht
const HOECHSTENS = 20 * 60;   // länger wartet das Skript nicht

// ===== Deutsche Zeit (reine Rechnung in UTC, wie im Spiel) =====
function tageSeit1970(j, m, t) {
  if (m <= 2) j -= 1;
  const era = Math.floor(j / 400);
  const yoe = j - era * 400;
  const mp = (m + 9) % 12;
  const doy = Math.floor((153 * mp + 2) / 5) + t - 1;
  const doe = yoe * 365 + Math.floor(yoe / 4) - Math.floor(yoe / 100) + doy;
  return era * 146097 + doe - 719468;
}
// letzter Sonntag eines Monats (Tage seit 1970); der 1.1.1970 war ein Donnerstag
function letzterSonntag(j, m) {
  const ende = tageSeit1970(j, m + 1, 1) - 1;
  return ende - ((ende + 4) % 7);
}
// so viele Sekunden liegt die deutsche Zeit zum Zeitpunkt t (Sekunden, UTC) vor UTC
function versatz(t) {
  const j = new Date(Math.floor(t) * 1000).getUTCFullYear();
  const von = letzterSonntag(j, 3) * 86400 + 3600;
  const bis = letzterSonntag(j, 10) * 86400 + 3600;
  return (t >= von && t < bis) ? 7200 : 3600;
}
function terminStart(tag, i) {
  const lokal = tag * 86400 + TERMINE[i] * 3600;
  return lokal - versatz(lokal - 3600);
}
// der nächste Termin nach t (Sekunden, UTC)
function naechster(t) {
  const tag = Math.floor((Math.floor(t) + versatz(t)) / 86400);
  for (let nr = tag * 2 - 2; nr <= tag * 2 + 5; nr++) {
    const start = terminStart(Math.floor(nr / 2), nr % 2);
    if (start > t) return { nr, start, boss: BOSSE[nr % BOSSE.length] };
  }
  return null;
}
function uhr(start) {
  const lokal = start + versatz(start);
  const h = Math.floor(lokal / 3600) % 24;
  const m = Math.floor(lokal / 60) % 60;
  return String(h).padStart(2, "0") + ":" + String(m).padStart(2, "0") + " Uhr";
}
// Text aus b9-texte-entwurf.md (freigegeben B9-12)
function text(x) {
  return "⚔️ **Weltboss in 5 Minuten!** Der **" + x.boss.name + "** erwacht um **" + uhr(x.start) + "** " + x.boss.praep +
    " **" + x.boss.gebiet + "**. Der Sternenriss im Zentrum bringt euch hin – ab Level 20 seid ihr dabei!";
}

async function main() {
  const jetzt = Date.now() / 1000;
  if (process.argv.includes("--probe")) {
    let t = jetzt;
    for (let k = 0; k < 6; k++) {
      const x = naechster(t);
      console.log(new Date(x.start * 1000).toISOString() + "  nr " + x.nr + "  " + x.boss.name + "  " + text(x));
      t = x.start + 1;
    }
    return;
  }
  const x = naechster(jetzt);
  if (!x) { console.log("Kein Termin gefunden."); return; }
  const bis = x.start - jetzt;
  if (bis > HOECHSTENS) {
    console.log("Der nächste Weltboss erwacht erst in " + Math.round(bis / 60) + " Minuten – jetzt nichts zu tun.");
    return;
  }
  if (!WEBHOOK) {
    console.log("Weltboss-Kanal noch nicht eingerichtet (Geheimnis DISCORD_WELTBOSS_WEBHOOK fehlt) – nichts gesendet.");
    return;
  }
  const warten = bis - VORHER;
  if (warten > 0) {
    console.log("Warte " + Math.round(warten) + " s bis 5 Minuten vor dem Termin.");
    await new Promise(r => setTimeout(r, warten * 1000));
  }
  if (x.start <= Date.now() / 1000) { console.log("Der Termin hat schon begonnen – keine Ankündigung mehr."); return; }
  let symbol = null;
  try {
    const r = await fetch("https://thumbnails.roblox.com/v1/games/icons?universeIds=" + UNIVERSE_ID + "&size=512x512&format=Png&isCircular=false");
    if (r.ok) symbol = (await r.json()).data[0].imageUrl;
  } catch (e) {}
  const nachricht = {
    username: "Sternwacht-Bot",
    avatar_url: symbol || undefined,
    allowed_mentions: { parse: [] },
    content: text(x)
  };
  const antwort = await fetch(WEBHOOK, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(nachricht) });
  if (!antwort.ok) {
    console.error("Discord hat die Ankündigung abgelehnt: " + antwort.status + " " + (await antwort.text()).slice(0, 300));
    process.exit(1);
  }
  console.log("Weltboss angekündigt: " + x.boss.name + " um " + uhr(x.start));
}
main().catch(e => { console.error(e.message || e); process.exit(1); });
