// Mythische Rolle – Klassen, Lehrer, Skillbaum und Ränge.
window.MR = window.MR || {};
window.MR.klassen = {
  "einleitung": "Ab Level 10 wählst du eine Klasse. Die vier Klassenlehrer warten im Vorhof der Sternwacht auf dem Berg. Jede Klasse bringt drei Fähigkeiten für den Kampf mit – auf den Tasten 1, 2 und 3, am Handy über die Fähigkeitenleiste. Die Ausweichrolle mit C beherrschen alle. Wechseln kannst du später gegen Sternenstaub, die Punkte aus deinem Klassen-Ast bekommst du dabei zurück.",
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
      "text": "Magier verwandeln die Kraft ihrer Aura in Angriffe. Im Bosskampf richten sie den meisten Schaden an.",
      "faehigkeiten": [
        {
          "taste": "1",
          "symbol": "⚡",
          "name": "Arkanblitz",
          "text": "Ein Blitz trifft den nächsten Gegner vor dir – dreifacher Aura-Schaden."
        },
        {
          "taste": "2",
          "symbol": "🌠",
          "name": "Sternenregen",
          "text": "Sterne regnen dreimal auf dein Ziel und treffen alles im Umkreis."
        },
        {
          "taste": "3",
          "symbol": "🔮",
          "name": "Bannkreis",
          "text": "Gegner in deiner Nähe erstarren drei Sekunden lang."
        }
      ]
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
      "text": "Hüter stehen, wo andere fallen. Sie halten Schaden aus und heilen ihre Gruppe.",
      "faehigkeiten": [
        {
          "taste": "1",
          "symbol": "🛡️",
          "name": "Schildwall",
          "text": "Ein Schild fängt 60 Schaden ab, Mitspieler in der Nähe erhalten 30."
        },
        {
          "taste": "2",
          "symbol": "💚",
          "name": "Heilwelle",
          "text": "Heilt dich und Mitspieler um 35 Lebenspunkte und hilft Gestürzten wieder auf."
        },
        {
          "taste": "3",
          "symbol": "💥",
          "name": "Sternenschlag",
          "text": "Ein Schlag auf den Boden trifft Gegner ringsum und wirft sie zurück."
        }
      ]
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
      "text": "Glückswirker biegen das Schicksal ein wenig zurecht. Ihre Glückswürfe sind stärker als die aller anderen.",
      "faehigkeiten": [
        {
          "taste": "1",
          "symbol": "🍀",
          "name": "Glückstreffer",
          "text": "Fünf Sekunden lang trifft deine Aura schneller und immer kritisch."
        },
        {
          "taste": "2",
          "symbol": "🎲",
          "name": "Schicksalswürfel",
          "text": "Die Augenzahl bestimmt den Schaden. Bei einer Sechs heilt der Würfel alle in der Nähe."
        },
        {
          "taste": "3",
          "symbol": "☘️",
          "name": "Kleeblattsegen",
          "text": "Mitspieler in der Nähe werden geheilt und treffen acht Sekunden lang stärker."
        }
      ]
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
      "text": "Himmelsläufer sind in der Luft zu Hause. Niemand fliegt schneller und wendiger.",
      "faehigkeiten": [
        {
          "taste": "1",
          "symbol": "💨",
          "name": "Windstoß",
          "text": "Ein blitzschneller Sprint nach vorn – Gegner im Weg werden getroffen."
        },
        {
          "taste": "2",
          "symbol": "🌪️",
          "name": "Wirbelsturm",
          "text": "Ein Wirbel um dich trifft Gegner drei Sekunden lang und stößt sie weg."
        },
        {
          "taste": "3",
          "symbol": "☄️",
          "name": "Himmelssprung",
          "text": "Spring hoch in die Luft und schlage mit voller Wucht auf."
        }
      ]
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
