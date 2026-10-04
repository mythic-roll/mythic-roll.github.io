// Mythische Rolle – Klassen, Lehrer, Skillbaum und Ränge.
window.MR = window.MR || {};
window.MR.klassen = {
  "einleitung": "Ab Level 10 wählst du eine Klasse. Die vier Klassenlehrer warten im Vorhof der Sternwacht auf dem Berg. Wechseln kannst du später gegen Sternenstaub, die Punkte aus deinem Klassen-Ast bekommst du dabei zurück.",
  "liste": [
    {
      "id": "magier",
      "name": "Magier",
      "symbol": "🔮",
      "farbe": [
        190,
        125,
        255
      ],
      "lehrer": "Erzmagier Vaelor",
      "kurz": "Mehr Aura-Schaden – Arkanblitze im Bosskampf.",
      "text": "Magier verwandeln die Kraft ihrer Aura in Angriffe. Im Bosskampf richten sie den meisten Schaden an."
    },
    {
      "id": "hueter",
      "name": "Hüter",
      "symbol": "🛡️",
      "farbe": [
        255,
        212,
        110
      ],
      "lehrer": "Schildmeisterin Brunja",
      "kurz": "Schild und Heilung – schützt sich und Mitspieler.",
      "text": "Hüter stehen, wo andere fallen. Sie halten Schaden aus und heilen ihre Gruppe."
    },
    {
      "id": "glueckswirker",
      "name": "Glückswirker",
      "symbol": "🍀",
      "farbe": [
        120,
        230,
        140
      ],
      "lehrer": "Glücksweberin Lumi",
      "kurz": "Mehr Glück – stärkere Glückswürfe und Tränke.",
      "text": "Glückswirker biegen das Schicksal ein wenig zurecht. Ihre Glückswürfe sind stärker als die aller anderen."
    },
    {
      "id": "himmelslaeufer",
      "name": "Himmelsläufer",
      "symbol": "🪽",
      "farbe": [
        120,
        205,
        255
      ],
      "lehrer": "Sturmläufer Aeron",
      "kurz": "Schneller fliegen – Sturmflug und Luftakrobatik.",
      "text": "Himmelsläufer sind in der Luft zu Hause. Niemand fliegt schneller und wendiger."
    }
  ],
  "skillbaum": {
    "text": "Der Skillbaum ist ein Sternbild aus 35 Sternen, du öffnest ihn mit der Taste P. Skillpunkte bekommst du, wenn du im Level und im Rang aufsteigst.",
    "aeste": [
      {
        "name": "Würfeln",
        "symbol": "🎲",
        "text": "Mehr Glück, schnelleres Würfeln und mehrere Auren pro Wurf.",
        "beispiele": [
          "Glücksfunke: +1 % Glück je Stufe",
          "Doppelwurf: Chance, dass ein Wurf zwei Auren bringt",
          "Mehrfachwurf: bis zu fünf Auren auf einmal",
          "Würfelmeister: +5 % Glück und 5 % schneller würfeln"
        ]
      },
      {
        "name": "Bosskampf",
        "symbol": "⚔️",
        "text": "Mehr Schaden gegen Bosse.",
        "beispiele": [
          "Kampfgeist: +5 % Aura-Schaden",
          "Aurenkraft: +3 % Aura-Schaden je Stufe",
          "Kritische Treffer: Chance auf doppelten Schaden"
        ]
      },
      {
        "name": "Flug",
        "symbol": "🪽",
        "text": "Bessere Flügel für alle, die gern abheben.",
        "beispiele": [
          "Aufwind: 15 % weniger Tempoverlust beim Steigen",
          "Doppelter Schub-Stoß: zwei Stöße direkt hintereinander"
        ]
      },
      {
        "name": "Klassen-Ast",
        "symbol": "✨",
        "text": "Jede Klasse hat ihren eigenen Ast, den du nach der Klassenwahl freischaltest.",
        "beispiele": [
          "Glückskind (Glückswirker): Glückswürfe ×3,5",
          "Schicksalsfaden (Glückswirker): mehr Doppelwürfe"
        ]
      }
    ]
  },
  "raenge": {
    "text": "Dein Rang zeigt, wie viel du schon gewürfelt hast.",
    "liste": [
      {
        "name": "Novize",
        "wuerfe": 0
      },
      {
        "name": "Würfler",
        "wuerfe": 250
      },
      {
        "name": "Sternenseher",
        "wuerfe": 1000
      },
      {
        "name": "Runenkundiger",
        "wuerfe": 2500
      },
      {
        "name": "Glücksritter",
        "wuerfe": 5000
      },
      {
        "name": "Aurenmeister",
        "wuerfe": 10000
      }
    ]
  }
};
