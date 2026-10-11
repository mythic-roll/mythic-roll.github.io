// Mythische Rolle – Klassen, Lehrer, Skillbaum und Ränge.
window.MR = window.MR || {};
window.MR.klassen = {
  "einleitung": "Ab Level 10 wählst du eine Klasse. Die vier Klassenlehrer warten im Vorhof der Sternwacht auf dem Berg. Jede Klasse hat zwölf Fähigkeiten in drei Wegen – drei bekommst du sofort, die übrigen lernst du beim Lehrer. Sechs davon legst du auf deine Leiste (Tasten 1–6), dazu kommt die Meister-Fähigkeit. Ab Level 20 wählst du nach der Weg-Prüfung deinen Weg: Seine Fähigkeiten werden stärker, und er bestimmt deine Rolle in der Gruppe. Die Ausweichrolle mit C beherrschen alle.",
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
      "kurz": "Drei Wege: Sternenfeuer (Flächen und Meteore), Arkan (starke Einzel-Blitze) und Frost (einfrieren und aufhalten).",
      "text": "Magier verwandeln die Kraft ihrer Aura in Zauber – mit Meteoren und Flammen, starken Einzel-Blitzen oder Eis, das Gegner aufhält.",
      "faehigkeiten": [
        {
          "taste": "🔥",
          "symbol": "🌠",
          "name": "Sternenregen",
          "text": "Sterne regnen dreimal auf dein Ziel und treffen alles im Umkreis. (Sternenfeuer, ab Level 10)"
        },
        {
          "taste": "🔥",
          "symbol": "🔥",
          "name": "Feuerring",
          "text": "Ein Flammenring um dich: Gegner brennen und werden zurückgestoßen. (Sternenfeuer, ab Level 12)"
        },
        {
          "taste": "🔥",
          "symbol": "💫",
          "name": "Kometenschauer",
          "text": "Fünf Kometen schlagen nacheinander auf verschiedene Gegner ein. (Sternenfeuer, ab Level 24)"
        },
        {
          "taste": "🔥",
          "symbol": "☄️",
          "name": "Meteor",
          "text": "Ein riesiger brennender Meteor – großer Flächenschaden, alle Getroffenen brennen. (Sternenfeuer, ab Level 42)"
        },
        {
          "taste": "⚡",
          "symbol": "⚡",
          "name": "Arkanblitz",
          "text": "Ein Blitz trifft den nächsten Gegner vor dir – dreifacher Aura-Schaden. (Arkan, ab Level 10)"
        },
        {
          "taste": "⚡",
          "symbol": "💜",
          "name": "Arkane Geschosse",
          "text": "Fünf violette Geschosse treffen nacheinander dein Ziel. (Arkan, ab Level 16)"
        },
        {
          "taste": "⚡",
          "symbol": "⏳",
          "name": "Zeitriss",
          "text": "Das Ziel wird 4 s langsamer und nimmt 20 % mehr Schaden von allen. (Arkan, ab Level 30)"
        },
        {
          "taste": "⚡",
          "symbol": "🔱",
          "name": "Arkane Lanze",
          "text": "Ein durchdringender Strahl – der stärkste Einzeltreffer des Magiers. (Arkan, ab Level 50)"
        },
        {
          "taste": "❄️",
          "symbol": "🔮",
          "name": "Bannkreis",
          "text": "Gegner in deiner Nähe erstarren drei Sekunden lang. (Frost, ab Level 10)"
        },
        {
          "taste": "❄️",
          "symbol": "❄️",
          "name": "Frostlanze",
          "text": "Ein Eissplitter trifft das Ziel und friert es 2 s ein. (Frost, ab Level 20)"
        },
        {
          "taste": "❄️",
          "symbol": "🧊",
          "name": "Eisblock",
          "text": "Du wirst 3 s lang zu Eis: nichts trifft dich, du heilst 20 % Leben. (Frost, ab Level 36)"
        },
        {
          "taste": "❄️",
          "symbol": "🌨️",
          "name": "Ewiger Winter",
          "text": "Ein Schneesturm um dich friert alle Gegner ringsum 3 s ein und trifft sie schwer. (Frost, ab Level 60)"
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
      "kurz": "Drei Wege: Bollwerk (schützen), Sternenlicht (heilen) und Vergeltung (Schaden mit Schwert und heiligem Licht).",
      "text": "Hüter stehen, wo andere fallen. Sie halten Schaden aus und heilen ihre Gruppe.",
      "faehigkeiten": [
        {
          "taste": "🛡️",
          "symbol": "🛡️",
          "name": "Schildwall",
          "text": "Schild für dich (ein Viertel deines Lebens) und Mitspieler. Gegner ringsum werden getroffen und greifen 4 s lang nur dich an. (Bollwerk, ab Level 10)"
        },
        {
          "taste": "🛡️",
          "symbol": "🔰",
          "name": "Schildstoß",
          "text": "Du rammst das Ziel mit dem Schild – es ist 2 s betäubt und fliegt zurück. (Bollwerk, ab Level 12)"
        },
        {
          "taste": "🛡️",
          "symbol": "📯",
          "name": "Kampfruf",
          "text": "Ein lauter Ruf: alle Gegner ringsum greifen 6 s nur dich an, du nimmst dabei 20 % weniger Schaden. (Bollwerk, ab Level 24)"
        },
        {
          "taste": "🛡️",
          "symbol": "🗿",
          "name": "Unerschütterlich",
          "text": "8 s lang 40 % weniger Schaden, nichts wirft dich um. (Bollwerk, ab Level 42)"
        },
        {
          "taste": "✨",
          "symbol": "💚",
          "name": "Heilwelle",
          "text": "Heilt dich und Mitspieler um 15 % ihres Lebens (mindestens 35) und hilft Gestürzten wieder auf. (Sternenlicht, ab Level 10)"
        },
        {
          "taste": "✨",
          "symbol": "💛",
          "name": "Lichtsegen",
          "text": "Heilt den Mitspieler mit dem wenigsten Leben stark und gibt ihm einen kleinen Schild. (Sternenlicht, ab Level 16)"
        },
        {
          "taste": "✨",
          "symbol": "⭕",
          "name": "Heiliger Kreis",
          "text": "Ein leuchtender Kreis am Boden heilt 6 s lang alle, die darin stehen. (Sternenlicht, ab Level 30)"
        },
        {
          "taste": "✨",
          "symbol": "🌅",
          "name": "Morgenröte",
          "text": "Alle Gestürzten in der Nähe stehen sofort mit halbem Leben auf, alle anderen werden geheilt. (Sternenlicht, ab Level 50)"
        },
        {
          "taste": "⚔️",
          "symbol": "💥",
          "name": "Sternenschlag",
          "text": "Ein Schlag auf den Boden trifft Gegner ringsum mit dreifachem Aura-Schaden und wirft sie zurück. (Vergeltung, ab Level 10)"
        },
        {
          "taste": "⚔️",
          "symbol": "🗡️",
          "name": "Richtschwert",
          "text": "Drei schnelle Schwerthiebe auf das Ziel, der letzte trifft doppelt. (Vergeltung, ab Level 20)"
        },
        {
          "taste": "⚔️",
          "symbol": "🔆",
          "name": "Lichtlanze",
          "text": "Ein Strahl aus heiligem Licht trifft alle Gegner in einer Linie vor dir, sie brennen. (Vergeltung, ab Level 36)"
        },
        {
          "taste": "⚔️",
          "symbol": "☀️",
          "name": "Urteil des Himmels",
          "text": "Eine Lichtsäule stürzt auf das Ziel: fünffacher Aura-Schaden, Gegner ringsum werden geschwächt. (Vergeltung, ab Level 60)"
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
      "kurz": "Drei Wege: Fortuna (heilen und stärken), Schicksal (Würfel und viele Krits) und Chaos (wilde Zufallseffekte).",
      "text": "Glückswirker biegen das Schicksal ein wenig zurecht – sie heilen und stärken ihre Gruppe, würfeln kritische Treffer oder entfesseln wilde Zufallseffekte.",
      "faehigkeiten": [
        {
          "taste": "💚",
          "symbol": "☘️",
          "name": "Kleeblattsegen",
          "text": "Mitspieler in der Nähe werden geheilt und treffen acht Sekunden lang stärker. (Fortuna, ab Level 10)"
        },
        {
          "taste": "💚",
          "symbol": "🌧️",
          "name": "Glücksregen",
          "text": "Goldene Münzen regnen herab: alle in der Nähe werden 6 s lang geheilt. (Fortuna, ab Level 12)"
        },
        {
          "taste": "💚",
          "symbol": "🐞",
          "name": "Glücksbringer",
          "text": "Ein Mitspieler (oder du) bekommt 10 s lang +20 % Krit-Chance. (Fortuna, ab Level 24)"
        },
        {
          "taste": "💚",
          "symbol": "💠",
          "name": "Fortunas Schutz",
          "text": "Alle in der Nähe bekommen einen Glücksschild, der den nächsten Treffer ganz abfängt. (Fortuna, ab Level 42)"
        },
        {
          "taste": "🎲",
          "symbol": "🍀",
          "name": "Glückstreffer",
          "text": "Fünf Sekunden lang trifft deine Aura schneller und immer kritisch. (Schicksal, ab Level 10)"
        },
        {
          "taste": "🎲",
          "symbol": "💰",
          "name": "Goldene Münze",
          "text": "Eine Münze trifft das Ziel – Kopf: dreifacher Schaden, Zahl: dein nächster Treffer ist sicher kritisch. (Schicksal, ab Level 16)"
        },
        {
          "taste": "🎲",
          "symbol": "🧵",
          "name": "Schicksalsfaden",
          "text": "Markiert das Ziel 8 s lang: alle Treffer darauf haben +30 % Krit-Chance. (Schicksal, ab Level 30)"
        },
        {
          "taste": "🎲",
          "symbol": "🎰",
          "name": "Jackpot",
          "text": "Drei goldene Würfel fallen auf das Ziel – drei gleiche Zahlen machen zehnfachen Schaden. (Schicksal, ab Level 50)"
        },
        {
          "taste": "🌀",
          "symbol": "🎲",
          "name": "Schicksalswürfel",
          "text": "Die Augenzahl bestimmt den Schaden. Bei einer Sechs heilt der Würfel alle in der Nähe. (Chaos, ab Level 10)"
        },
        {
          "taste": "🌀",
          "symbol": "⚡",
          "name": "Chaosblitz",
          "text": "Ein Blitz mit zufälligem Element: Feuer (brennt), Eis (friert) oder Gift. (Chaos, ab Level 20)"
        },
        {
          "taste": "🌀",
          "symbol": "🃏",
          "name": "Wilde Karte",
          "text": "Zieht eine Karte: großer Treffer, Heilung für alle, Tempo für alle oder Gegner schrumpfen 4 s. (Chaos, ab Level 36)"
        },
        {
          "taste": "🌀",
          "symbol": "🎡",
          "name": "Glücksrad",
          "text": "Das große Rad dreht sich: Meteorhagel, Heilung für alle, Zeit steht still (Gegner 3 s eingefroren) oder 10 s alles kritisch für die ganze Gruppe. (Chaos, ab Level 60)"
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
      "kurz": "Drei Wege: Sturm (Wirbel und Blitze gegen viele), Klinge (schneller Speer-Nahkampf) und Falke (Speerwürfe und Kampf aus der Luft).",
      "text": "Himmelsläufer sind in der Luft zu Hause – mit Wirbeln und Blitzen gegen viele, schnellem Speer-Nahkampf oder Speerwürfen aus der Luft.",
      "faehigkeiten": [
        {
          "taste": "🌪️",
          "symbol": "🌪️",
          "name": "Wirbelsturm",
          "text": "Ein Wirbel um dich trifft Gegner drei Sekunden lang und stößt sie weg. (Sturm, ab Level 10)"
        },
        {
          "taste": "🌪️",
          "symbol": "🌩️",
          "name": "Gewitterschlag",
          "text": "Ein Blitz springt zwischen bis zu fünf Gegnern hin und her. (Sturm, ab Level 12)"
        },
        {
          "taste": "🌪️",
          "symbol": "🌬️",
          "name": "Sturmwand",
          "text": "Eine Windwand vor dir stößt alle Gegner zurück und macht sie langsamer. (Sturm, ab Level 24)"
        },
        {
          "taste": "🌪️",
          "symbol": "🌀",
          "name": "Orkan",
          "text": "Ein riesiger Tornado zieht alle Gegner zusammen und wirbelt sie 4 s herum. (Sturm, ab Level 42)"
        },
        {
          "taste": "🗡️",
          "symbol": "💨",
          "name": "Windstoß",
          "text": "Ein blitzschneller Sprint nach vorn – Gegner im Weg werden getroffen. (Klinge, ab Level 10)"
        },
        {
          "taste": "🗡️",
          "symbol": "💫",
          "name": "Speerwirbel",
          "text": "Du drehst den Speer um dich – jeder Gegner ringsum wird zweimal getroffen. (Klinge, ab Level 16)"
        },
        {
          "taste": "🗡️",
          "symbol": "🎯",
          "name": "Durchbohren",
          "text": "Ein mächtiger Stoß, das Ziel blutet 6 s lang. (Klinge, ab Level 30)"
        },
        {
          "taste": "🗡️",
          "symbol": "✴️",
          "name": "Tausend Stiche",
          "text": "2 s lang blitzschnelle Speerstiche auf das Ziel (zehn Treffer). (Klinge, ab Level 50)"
        },
        {
          "taste": "🦅",
          "symbol": "☄️",
          "name": "Himmelssprung",
          "text": "Spring hoch in die Luft und schlage mit voller Wucht auf. (Falke, ab Level 10)"
        },
        {
          "taste": "🦅",
          "symbol": "🔱",
          "name": "Speerwurf",
          "text": "Du wirfst den Speer auf ein fernes Ziel, er fliegt zu dir zurück – auch im Flug. (Falke, ab Level 20)"
        },
        {
          "taste": "🦅",
          "symbol": "👁️",
          "name": "Falkenauge",
          "text": "Markiert das Ziel: 8 s lang machen deine Krits darauf 50 % mehr Schaden. (Falke, ab Level 36)"
        },
        {
          "taste": "🦅",
          "symbol": "🦅",
          "name": "Sturzflug",
          "text": "Aus dem Flug oder einem Sprung stürzt du auf das Ziel: fünffacher Aura-Schaden, Gegner ringsum taumeln. (Falke, ab Level 60)"
        }
      ]
    }
  ],
  "skillbaum": {
    "text": "Das große Sternbild öffnest du mit P. Würfeln, Kampf und Fliegen kosten Skillpunkte – die bekommst du beim Aufstieg im Level und im Rang. Die drei Wege deiner Klasse kosten Talentpunkte: einen je Level ab Level 10.",
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
        "name": "Die Wege deiner Klasse",
        "symbol": "✨",
        "text": "Jede Klasse hat drei Wege mit eigenen Talentpunkten – einen je Level ab Level 10.",
        "beispiele": [
          "Fähigkeiten bis Stufe 5, auf Stufe 5 eine von zwei Varianten",
          "Talente wie Klingenkunst: +4 % Schaden je Stufe",
          "Schlüssel-Sterne wie Herr der Stürme oder Sieben auf einen Streich"
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
