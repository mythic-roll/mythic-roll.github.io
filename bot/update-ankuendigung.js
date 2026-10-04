// Sternwacht-Bot: kündigt neue Versionen aus daten/updates.js in Discord an.
// Läuft als GitHub Action, sobald sich daten/updates.js ändert (oder per Hand zum Testen).
const fs = require("fs");
const vm = require("vm");
const { execSync } = require("child_process");

const WEBHOOK = process.env.DISCORD_WEBHOOK;
const ROLLE = (process.env.DISCORD_ROLLE || "").trim();
const ERZWINGEN = process.env.ERZWINGEN === "true";
const FARBE = 0xE8C46A;

function lesen(code) {
  const kontext = { window: {} };
  vm.runInNewContext(code, kontext, { timeout: 1000 });
  return kontext.window.MR || {};
}
function websiteAdresse() {
  const repo = process.env.GITHUB_REPOSITORY || "";
  const [besitzer, name] = repo.split("/");
  if (!besitzer || !name) return "";
  if (name.toLowerCase() === (besitzer + ".github.io").toLowerCase()) return "https://" + name.toLowerCase() + "/";
  return "https://" + besitzer.toLowerCase() + ".github.io/" + name + "/";
}
function liste(punkte) {
  let text = "";
  for (const p of punkte || []) {
    const zeile = "• " + p + "\n";
    if ((text + zeile).length > 1000) { text += "• …"; break; }
    text += zeile;
  }
  return text.trim();
}

async function spielsymbol(universeId) {
  try {
    const r = await fetch("https://thumbnails.roblox.com/v1/games/icons?universeIds=" + universeId + "&size=512x512&format=Png&isCircular=false");
    const d = await r.json();
    return (d.data && d.data[0] && d.data[0].imageUrl) || null;
  } catch (e) { return null; }
}

async function main() {
  if (!WEBHOOK) {
    console.error("Kein Discord-Webhook gefunden. Lege in GitHub unter Settings → Secrets and variables → Actions das Geheimnis DISCORD_WEBHOOK an.");
    process.exit(1);
  }
  const jetzt = lesen(fs.readFileSync("daten/updates.js", "utf8")).updates || [];
  const spiel = lesen(fs.readFileSync("daten/spiel.js", "utf8")).spiel || {};
  if (!jetzt.length) { console.log("Keine Versionen in daten/updates.js – nichts zu tun."); return; }

  let vorher = null;
  try {
    vorher = lesen(execSync("git show HEAD~1:daten/updates.js", { encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] })).updates || [];
  } catch (e) { vorher = null; }

  let neu;
  if (vorher === null) {
    neu = ERZWINGEN ? [jetzt[0]] : [];
    if (!neu.length) console.log("Erster Upload der Website – keine Ankündigung. Zum Testen den Bot per Hand starten.");
  } else {
    const bekannt = new Set(vorher.map(v => String(v.version)));
    neu = jetzt.filter(v => !bekannt.has(String(v.version))).reverse().slice(-3);
    if (!neu.length && ERZWINGEN) neu = [jetzt[0]];
    if (!neu.length) console.log("Keine neue Version dazugekommen – keine Ankündigung.");
  }
  if (!neu.length) return;

  const links = spiel.links || {};
  const website = websiteAdresse();
  const symbol = await spielsymbol(process.env.UNIVERSE_ID || "10768606540");

  for (const v of neu) {
    const felder = [];
    if (v.neu && v.neu.length) felder.push({ name: "✨ Neu", value: liste(v.neu) });
    if (v.verbessert && v.verbessert.length) felder.push({ name: "🛠️ Verbessert", value: liste(v.verbessert) });
    if (v.behoben && v.behoben.length) felder.push({ name: "🐞 Behoben", value: liste(v.behoben) });
    const wege = [];
    if (links.spiel) wege.push("[▶ Jetzt spielen](" + links.spiel + ")");
    if (website) wege.push("[🌐 Website](" + website + ")");
    if (website) wege.push("[📜 Alle Updates](" + website + "updates.html)");
    if (wege.length) felder.push({ name: "\u200b", value: wege.join("   ") });

    const nachricht = {
      username: "Sternwacht-Bot",
      avatar_url: symbol || undefined,
      content: ROLLE ? "<@&" + ROLLE + ">" : undefined,
      allowed_mentions: ROLLE ? { roles: [ROLLE] } : { parse: [] },
      embeds: [{
        title: "Version " + v.version + " ist da: " + v.titel,
        url: website ? website + "updates.html" : (links.spiel || undefined),
        description: "Ein neues Update für **Mythische Rolle** ist erschienen" + (v.datum && /\d/.test(v.datum) ? " (" + v.datum + ")" : "") + ".",
        color: FARBE,
        fields: felder,
        thumbnail: symbol ? { url: symbol } : undefined,
        footer: { text: "Sternwacht-Bot" },
        timestamp: new Date().toISOString()
      }]
    };
    const antwort = await fetch(WEBHOOK, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(nachricht) });
    if (!antwort.ok) {
      console.error("Discord hat die Nachricht abgelehnt: " + antwort.status + " " + (await antwort.text()).slice(0, 300));
      process.exit(1);
    }
    console.log("Angekündigt: Version " + v.version + " – " + v.titel);
  }
}
main().catch(e => { console.error(e); process.exit(1); });
