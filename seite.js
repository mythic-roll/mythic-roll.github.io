// Mythische Rolle – gemeinsame Bausteine aller Seiten: Navigation, Community-Bereich, Bildplätze.
(function () {
  var MR = window.MR = window.MR || {};
  var SEITEN = [
    { datei: "index.html", name: "Das Spiel" },
    { datei: "auren.html", name: "Auren" },
    { datei: "welt.html", name: "Welt" },
    { datei: "klassen.html", name: "Klassen" },
    { datei: "updates.html", name: "Updates" },
    { datei: "roadmap.html", name: "Roadmap" }
  ];

  MR.el = function (tag, cls, text) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text !== undefined && text !== null) e.textContent = String(text);
    return e;
  };
  MR.zahl = function (n) { return Number(n || 0).toLocaleString("de-DE"); };
  MR.rgb = function (f) { return f ? "rgb(" + f[0] + "," + f[1] + "," + f[2] + ")" : "var(--gold)"; };
  function links() { return (MR.spiel && MR.spiel.links) || {}; }
  function gueltig(url) { return typeof url === "string" && /^https:\/\//.test(url); }

  // kleines, pro Name gleichbleibendes Sternbild als Hintergrund der Illustration
  function sternbildSvg(schluessel) {
    var h = 0;
    for (var i = 0; i < schluessel.length; i++) h = (h * 31 + schluessel.charCodeAt(i)) >>> 0;
    function zufall() { h = (h * 1103515245 + 12345) >>> 0; return (h % 1000) / 1000; }
    var ns = "http://www.w3.org/2000/svg";
    var svg = document.createElementNS(ns, "svg");
    svg.setAttribute("viewBox", "0 0 160 90");
    svg.setAttribute("aria-hidden", "true");
    var punkte = [];
    for (var k = 0; k < 6; k++) punkte.push([12 + zufall() * 136, 10 + zufall() * 70]);
    for (var a = 0; a < punkte.length - 1; a++) {
      var l = document.createElementNS(ns, "line");
      l.setAttribute("x1", punkte[a][0]); l.setAttribute("y1", punkte[a][1]);
      l.setAttribute("x2", punkte[a + 1][0]); l.setAttribute("y2", punkte[a + 1][1]);
      l.setAttribute("stroke", "currentColor"); l.setAttribute("stroke-width", ".5"); l.setAttribute("opacity", ".6");
      svg.appendChild(l);
    }
    punkte.forEach(function (p) {
      var c = document.createElementNS(ns, "circle");
      c.setAttribute("cx", p[0]); c.setAttribute("cy", p[1]); c.setAttribute("r", 1.4);
      c.setAttribute("fill", "currentColor");
      svg.appendChild(c);
    });
    svg.style.color = "var(--gold)";
    return svg;
  }

  // Bildplatz: zeigt bilder/<id>.jpg oder .png, sonst die Illustration
  MR.bildplatz = function (id, symbol, akzent, alt) {
    var box = MR.el("div", "bildplatz");
    if (akzent) box.style.setProperty("--akzent", akzent);
    var illu = MR.el("div", "illu");
    illu.appendChild(sternbildSvg(id));
    illu.appendChild(MR.el("span", null, symbol || "✦"));
    box.appendChild(illu);
    var endungen = ["jpg", "png", "webp"];
    var img = document.createElement("img");
    img.alt = alt || "";
    img.loading = "lazy";
    var nr = 0;
    img.onload = function () { box.classList.add("hat-bild"); };
    img.onerror = function () {
      nr += 1;
      if (nr < endungen.length) img.src = "bilder/" + id + "." + endungen[nr];
      else img.remove();
    };
    img.src = "bilder/" + id + "." + endungen[0];
    box.appendChild(img);
    return box;
  };

  function kopf() {
    var ziel = document.getElementById("kopf");
    if (!ziel) return;
    var jetzt = (location.pathname.split("/").pop() || "index.html").toLowerCase();
    if (jetzt === "") jetzt = "index.html";
    var header = MR.el("header", "leiste-oben");
    var b = MR.el("div", "breite");
    var marke = MR.el("a", "marke");
    marke.href = "index.html";
    var icon = document.createElement("img");
    icon.src = "bilder/icon.png"; icon.alt = "";
    icon.onerror = function () { icon.remove(); };
    marke.appendChild(icon);
    marke.appendChild(document.createTextNode("Mythische Rolle"));
    b.appendChild(marke);
    var navi = MR.el("nav", "navi");
    navi.setAttribute("aria-label", "Seiten");
    SEITEN.forEach(function (s) {
      var a = MR.el("a", null, s.name);
      a.href = s.datei;
      if (s.datei === jetzt) a.setAttribute("aria-current", "page");
      navi.appendChild(a);
    });
    b.appendChild(navi);
    if (gueltig(links().spiel)) {
      var sp = MR.el("a", "spiellink", "Auf Roblox spielen");
      sp.href = links().spiel; sp.target = "_blank"; sp.rel = "noopener";
      b.appendChild(sp);
    }
    header.appendChild(b);
    ziel.replaceWith(header);
  }

  function fuss() {
    var ziel = document.getElementById("fuss");
    if (!ziel) return;
    var f = MR.el("footer", "fuss");
    var b = MR.el("div", "breite");
    b.appendChild(MR.el("h2", null, "Community"));
    b.appendChild(MR.el("p", "leise text", "Zeig deine seltensten Auren, finde Mitspieler für Bosskämpfe und erfahre als Erstes, was im nächsten Update kommt."));
    var reihe = MR.el("div", "community");
    [
      { url: links().spiel, text: "▶ Auf Roblox spielen", haupt: true },
      { url: links().discord, text: "Discord beitreten" },
      { url: links().gruppe, text: "Roblox-Gruppe" }
    ].forEach(function (k) {
      if (!gueltig(k.url)) return;
      var a = MR.el("a", "knopf" + (k.haupt ? " haupt" : ""), k.text);
      a.href = k.url; a.target = "_blank"; a.rel = "noopener";
      reihe.appendChild(a);
    });
    b.appendChild(reihe);
    b.appendChild(MR.el("small", null, "Mythische Rolle ist ein Spiel auf Roblox. Stand: Version " + ((MR.spiel && MR.spiel.version) || "") + "."));
    f.appendChild(b);
    ziel.replaceWith(f);
  }

  kopf();
  fuss();
})();
