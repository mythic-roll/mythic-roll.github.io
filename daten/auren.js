// Mythische Rolle – alle Auren mit Wahrscheinlichkeit, Farben, Biom und Seltenheitsstufe.
window.MR = window.MR || {};
window.MR.auren = {
  "stufen": [
    {
      "name": "Gewöhnlich",
      "farbe": [
        205,
        205,
        205
      ],
      "min": 1
    },
    {
      "name": "Ungewöhnlich",
      "farbe": [
        120,
        225,
        120
      ],
      "min": 8
    },
    {
      "name": "Selten",
      "farbe": [
        90,
        150,
        255
      ],
      "min": 32
    },
    {
      "name": "Episch",
      "farbe": [
        190,
        90,
        255
      ],
      "min": 100
    },
    {
      "name": "Legendär",
      "farbe": [
        255,
        190,
        60
      ],
      "min": 500
    },
    {
      "name": "Mythisch",
      "farbe": [
        255,
        80,
        80
      ],
      "min": 2500
    },
    {
      "name": "Göttlich",
      "farbe": [
        255,
        255,
        210
      ],
      "min": 15000
    },
    {
      "name": "Kosmisch",
      "farbe": [
        120,
        255,
        255
      ],
      "min": 100000
    }
  ],
  "liste": [
    {
      "name": "Glimmen",
      "chance": 2,
      "farbe": [
        235,
        235,
        235
      ],
      "farbe2": [
        255,
        255,
        255
      ],
      "biom": "überall",
      "nurBiom": false,
      "effekt": "Funken",
      "stufe": "Gewöhnlich"
    },
    {
      "name": "Waldhauch",
      "chance": 4,
      "farbe": [
        110,
        200,
        90
      ],
      "farbe2": [
        60,
        140,
        50
      ],
      "biom": "überall",
      "nurBiom": false,
      "effekt": "Blätter",
      "stufe": "Gewöhnlich"
    },
    {
      "name": "Glut",
      "chance": 8,
      "farbe": [
        255,
        140,
        50
      ],
      "farbe2": [
        255,
        60,
        20
      ],
      "biom": "Vulkan",
      "nurBiom": false,
      "effekt": "Funken",
      "stufe": "Ungewöhnlich"
    },
    {
      "name": "Frost",
      "chance": 12,
      "farbe": [
        170,
        220,
        255
      ],
      "farbe2": [
        220,
        245,
        255
      ],
      "biom": "Eis & Kristall",
      "nurBiom": false,
      "effekt": "Schneeflocken",
      "stufe": "Ungewöhnlich"
    },
    {
      "name": "Wolkenflaum",
      "chance": 16,
      "farbe": [
        250,
        250,
        255
      ],
      "farbe2": [
        200,
        210,
        235
      ],
      "biom": "Wolkentempel",
      "nurBiom": false,
      "effekt": "Wölkchen",
      "stufe": "Ungewöhnlich"
    },
    {
      "name": "Mondlicht",
      "chance": 32,
      "farbe": [
        190,
        205,
        255
      ],
      "farbe2": [
        120,
        140,
        220
      ],
      "biom": "überall",
      "nurBiom": false,
      "effekt": "Schein",
      "stufe": "Selten"
    },
    {
      "name": "Nebelgeist",
      "chance": 45,
      "farbe": [
        170,
        200,
        190
      ],
      "farbe2": [
        90,
        120,
        110
      ],
      "biom": "Nebelwald",
      "nurBiom": false,
      "effekt": "Nebelschleier",
      "stufe": "Selten"
    },
    {
      "name": "Mondstaub",
      "chance": 50,
      "farbe": [
        205,
        210,
        225
      ],
      "farbe2": [
        150,
        155,
        175
      ],
      "biom": "Weltraum",
      "nurBiom": true,
      "effekt": "Schein",
      "stufe": "Selten"
    },
    {
      "name": "Sonnenfunken",
      "chance": 60,
      "farbe": [
        255,
        225,
        90
      ],
      "farbe2": [
        255,
        170,
        40
      ],
      "biom": "überall",
      "nurBiom": false,
      "effekt": "Funken",
      "stufe": "Selten"
    },
    {
      "name": "Sturmläufer",
      "chance": 120,
      "farbe": [
        120,
        200,
        255
      ],
      "farbe2": [
        255,
        255,
        255
      ],
      "biom": "Wolkentempel",
      "nurBiom": false,
      "effekt": "Blitze",
      "stufe": "Episch"
    },
    {
      "name": "Kometenschweif",
      "chance": 150,
      "farbe": [
        130,
        230,
        255
      ],
      "farbe2": [
        255,
        255,
        255
      ],
      "biom": "Weltraum",
      "nurBiom": true,
      "effekt": "Funken",
      "stufe": "Episch"
    },
    {
      "name": "Lavaherz",
      "chance": 180,
      "farbe": [
        255,
        70,
        20
      ],
      "farbe2": [
        255,
        200,
        60
      ],
      "biom": "Vulkan",
      "nurBiom": false,
      "effekt": "Pulsieren",
      "stufe": "Episch"
    },
    {
      "name": "Eisdorn",
      "chance": 250,
      "farbe": [
        150,
        230,
        255
      ],
      "farbe2": [
        255,
        255,
        255
      ],
      "biom": "Eis & Kristall",
      "nurBiom": false,
      "effekt": "Eissplitter",
      "stufe": "Episch"
    },
    {
      "name": "Meteorsturm",
      "chance": 400,
      "farbe": [
        255,
        150,
        70
      ],
      "farbe2": [
        255,
        80,
        40
      ],
      "biom": "Weltraum",
      "nurBiom": true,
      "effekt": "Feuerring",
      "stufe": "Episch"
    },
    {
      "name": "Himmelsflügel",
      "chance": 600,
      "farbe": [
        255,
        250,
        220
      ],
      "farbe2": [
        255,
        215,
        120
      ],
      "biom": "Wolkentempel",
      "nurBiom": false,
      "effekt": "Lichtflügel",
      "stufe": "Legendär"
    },
    {
      "name": "Schattenkrone",
      "chance": 900,
      "farbe": [
        120,
        60,
        180
      ],
      "farbe2": [
        20,
        10,
        40
      ],
      "biom": "Nebelwald",
      "nurBiom": false,
      "effekt": "Schattenkrone",
      "stufe": "Legendär"
    },
    {
      "name": "Aurora",
      "chance": 1400,
      "farbe": [
        120,
        255,
        180
      ],
      "farbe2": [
        180,
        120,
        255
      ],
      "biom": "Eis & Kristall",
      "nurBiom": false,
      "effekt": "Lichtbänder",
      "stufe": "Legendär"
    },
    {
      "name": "Nebula",
      "chance": 1800,
      "farbe": [
        255,
        120,
        210
      ],
      "farbe2": [
        140,
        110,
        255
      ],
      "biom": "Weltraum",
      "nurBiom": true,
      "effekt": "Lichtbänder",
      "stufe": "Legendär"
    },
    {
      "name": "Drachenatem",
      "chance": 3000,
      "farbe": [
        255,
        90,
        30
      ],
      "farbe2": [
        255,
        220,
        90
      ],
      "biom": "Vulkan",
      "nurBiom": false,
      "effekt": "Feuerring",
      "stufe": "Mythisch"
    },
    {
      "name": "Sternenherz",
      "chance": 5000,
      "farbe": [
        200,
        220,
        255
      ],
      "farbe2": [
        255,
        255,
        255
      ],
      "biom": "überall",
      "nurBiom": false,
      "effekt": "Sterne",
      "stufe": "Mythisch"
    },
    {
      "name": "Schwarzes Loch",
      "chance": 6000,
      "farbe": [
        40,
        20,
        70
      ],
      "farbe2": [
        190,
        120,
        255
      ],
      "biom": "Weltraum",
      "nurBiom": true,
      "effekt": "Pulsieren",
      "stufe": "Mythisch"
    },
    {
      "name": "Silbersichel",
      "chance": 8000,
      "farbe": [
        225,
        235,
        255
      ],
      "farbe2": [
        160,
        180,
        230
      ],
      "biom": "überall",
      "nurBiom": false,
      "effekt": "Mondsichel",
      "stufe": "Mythisch"
    },
    {
      "name": "Supernova",
      "chance": 18000,
      "farbe": [
        255,
        245,
        190
      ],
      "farbe2": [
        255,
        140,
        60
      ],
      "biom": "überall",
      "nurBiom": false,
      "effekt": "Sterne",
      "stufe": "Göttlich"
    },
    {
      "name": "Weltenbaum",
      "chance": 20000,
      "farbe": [
        140,
        255,
        120
      ],
      "farbe2": [
        255,
        215,
        90
      ],
      "biom": "Nebelwald",
      "nurBiom": false,
      "effekt": "Lebensbaum",
      "stufe": "Göttlich"
    },
    {
      "name": "Ewiger Frost",
      "chance": 35000,
      "farbe": [
        200,
        240,
        255
      ],
      "farbe2": [
        120,
        180,
        255
      ],
      "biom": "Eis & Kristall",
      "nurBiom": false,
      "effekt": "Eissturm",
      "stufe": "Göttlich"
    },
    {
      "name": "Pulsar",
      "chance": 45000,
      "farbe": [
        150,
        240,
        255
      ],
      "farbe2": [
        255,
        255,
        255
      ],
      "biom": "Weltraum",
      "nurBiom": true,
      "effekt": "Blitze",
      "stufe": "Göttlich"
    },
    {
      "name": "Kosmos",
      "chance": 120000,
      "farbe": [
        140,
        100,
        255
      ],
      "farbe2": [
        60,
        255,
        220
      ],
      "biom": "überall",
      "nurBiom": false,
      "effekt": "Galaxie",
      "stufe": "Kosmisch"
    },
    {
      "name": "Urknall",
      "chance": 400000,
      "farbe": [
        255,
        255,
        255
      ],
      "farbe2": [
        255,
        170,
        60
      ],
      "biom": "überall",
      "nurBiom": false,
      "effekt": "Galaxie",
      "stufe": "Kosmisch"
    },
    {
      "name": "Mythische Rolle",
      "chance": 1000000,
      "farbe": [
        255,
        215,
        120
      ],
      "farbe2": [
        255,
        120,
        220
      ],
      "biom": "überall",
      "nurBiom": false,
      "effekt": "Regenbogen",
      "stufe": "Kosmisch"
    }
  ]
};
