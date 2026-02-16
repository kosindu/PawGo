
export const WALK_SCENE_DATA = {
  "v": "5.5.2",
  "fr": 30,
  "ip": 0,
  "op": 120,
  "w": 800,
  "h": 600,
  "nm": "Walk Scene",
  "ddd": 0,
  "assets": [],
  "layers": [
    {
      "ddd": 0,
      "ind": 1,
      "ty": 4,
      "nm": "Sun",
      "sr": 1,
      "ks": {
        "o": { "a": 0, "k": 100, "ix": 11 },
        "r": { "a": 0, "k": 0, "ix": 10 },
        "p": { "a": 0, "k": [650, 100, 0], "ix": 2 },
        "a": { "a": 0, "k": [0, 0, 0], "ix": 1 },
        "s": {
          "a": 1,
          "k": [
            {
              "t": 0,
              "s": [100, 100, 100],
              "i": { "x": [0.667, 0.667, 0.667], "y": [1, 1, 1] },
              "o": { "x": [0.333, 0.333, 0.333], "y": [0, 0, 0] }
            },
            {
              "t": 60,
              "s": [120, 120, 100],
              "i": { "x": [0.667, 0.667, 0.667], "y": [1, 1, 1] },
              "o": { "x": [0.333, 0.333, 0.333], "y": [0, 0, 0] }
            },
            {
              "t": 120,
              "s": [100, 100, 100]
            }
          ],
          "ix": 6
        }
      },
      "ao": 0,
      "shapes": [
        {
          "ty": "gr",
          "it": [
            {
              "d": 1,
              "ty": "el",
              "s": { "a": 0, "k": [120, 120], "ix": 2 },
              "p": { "a": 0, "k": [0, 0], "ix": 3 },
              "nm": "Sun Path",
              "mn": "ADBE Vector Shape - Ellipse",
              "hd": false
            },
            {
              "ty": "fl",
              "c": { "a": 0, "k": [1, 0.8, 0.1, 1], "ix": 4 },
              "o": { "a": 0, "k": 100, "ix": 5 },
              "r": 1,
              "bm": 0,
              "nm": "Fill 1",
              "mn": "ADBE Vector Graphic - Fill",
              "hd": false
            },
            {
                "ty": "st", 
                "c": { "a": 0, "k": [1, 0.6, 0, 0.4] }, 
                "o": { "a": 0, "k": 100 }, 
                "w": { "a": 0, "k": 20 }, 
                "nm": "Glow" 
            }
          ],
          "nm": "Sun Group",
          "np": 2,
          "cix": 2,
          "bm": 0,
          "ix": 1,
          "mn": "ADBE Vector Group",
          "hd": false
        }
      ],
      "ip": 0,
      "op": 120,
      "st": 0,
      "bm": 0
    },
    {
      "ddd": 0,
      "ind": 2,
      "ty": 4,
      "nm": "Cloud",
      "sr": 1,
      "ks": {
        "o": { "a": 0, "k": 90, "ix": 11 },
        "r": { "a": 0, "k": 0, "ix": 10 },
        "p": {
          "a": 1,
          "k": [
            {
              "t": 0,
              "s": [100, 150, 0],
              "i": { "x": 0.833, "y": 0.833 },
              "o": { "x": 0.167, "y": 0.167 }
            },
            {
              "t": 120,
              "s": [700, 150, 0]
            }
          ],
          "ix": 2
        },
        "a": { "a": 0, "k": [0, 0, 0], "ix": 1 },
        "s": { "a": 0, "k": [100, 100, 100], "ix": 6 }
      },
      "ao": 0,
      "shapes": [
        {
          "ty": "gr",
          "it": [
            {
              "d": 1,
              "ty": "el",
              "s": { "a": 0, "k": [100, 60], "ix": 2 },
              "p": { "a": 0, "k": [0, 0], "ix": 3 },
              "nm": "C1",
              "mn": "ADBE Vector Shape - Ellipse",
              "hd": false
            },
            {
              "d": 1,
              "ty": "el",
              "s": { "a": 0, "k": [80, 50], "ix": 2 },
              "p": { "a": 0, "k": [40, 10], "ix": 3 },
              "nm": "C2",
              "mn": "ADBE Vector Shape - Ellipse",
              "hd": false
            },
            {
              "d": 1,
              "ty": "el",
              "s": { "a": 0, "k": [80, 50], "ix": 2 },
              "p": { "a": 0, "k": [-40, 10], "ix": 3 },
              "nm": "C3",
              "mn": "ADBE Vector Shape - Ellipse",
              "hd": false
            },
            {
              "ty": "fl",
              "c": { "a": 0, "k": [1, 1, 1, 1], "ix": 4 },
              "o": { "a": 0, "k": 100, "ix": 5 },
              "r": 1,
              "bm": 0,
              "nm": "Fill 1",
              "mn": "ADBE Vector Graphic - Fill",
              "hd": false
            }
          ],
          "nm": "Cloud Group",
          "np": 4,
          "cix": 2,
          "bm": 0,
          "ix": 1,
          "mn": "ADBE Vector Group",
          "hd": false
        }
      ],
      "ip": 0,
      "op": 120,
      "st": 0,
      "bm": 0
    },
    {
      "ddd": 0,
      "ind": 3,
      "ty": 4,
      "nm": "Hills",
      "sr": 1,
      "ks": {
        "o": { "a": 0, "k": 100, "ix": 11 },
        "r": { "a": 0, "k": 0, "ix": 10 },
        "p": { "a": 0, "k": [400, 500, 0], "ix": 2 },
        "a": { "a": 0, "k": [0, 0, 0], "ix": 1 },
        "s": { "a": 0, "k": [100, 100, 100], "ix": 6 }
      },
      "ao": 0,
      "shapes": [
        {
          "ty": "gr",
          "it": [
            {
              "d": 1,
              "ty": "el",
              "s": { "a": 0, "k": [1000, 300], "ix": 2 },
              "p": { "a": 0, "k": [0, 100], "ix": 3 },
              "nm": "Hill 1",
              "mn": "ADBE Vector Shape - Ellipse",
              "hd": false
            },
            {
              "ty": "fl",
              "c": { "a": 0, "k": [0.4, 0.8, 0.2, 1], "ix": 4 },
              "o": { "a": 0, "k": 100, "ix": 5 },
              "r": 1,
              "bm": 0,
              "nm": "Fill 1",
              "mn": "ADBE Vector Graphic - Fill",
              "hd": false
            }
          ],
          "nm": "Hills Group",
          "np": 2,
          "cix": 2,
          "bm": 0,
          "ix": 1,
          "mn": "ADBE Vector Group",
          "hd": false
        }
      ],
      "ip": 0,
      "op": 120,
      "st": 0,
      "bm": 0
    },
    {
      "ddd": 0,
      "ind": 4,
      "ty": 4,
      "nm": "Sky",
      "sr": 1,
      "ks": {
        "o": { "a": 0, "k": 100, "ix": 11 },
        "r": { "a": 0, "k": 0, "ix": 10 },
        "p": { "a": 0, "k": [400, 300, 0], "ix": 2 },
        "a": { "a": 0, "k": [0, 0, 0], "ix": 1 },
        "s": { "a": 0, "k": [100, 100, 100], "ix": 6 }
      },
      "ao": 0,
      "shapes": [
        {
          "ty": "gr",
          "it": [
            {
              "d": 1,
              "ty": "rc",
              "s": { "a": 0, "k": [800, 600], "ix": 2 },
              "p": { "a": 0, "k": [0, 0], "ix": 3 },
              "r": { "a": 0, "k": 0, "ix": 4 },
              "nm": "Rect",
              "mn": "ADBE Vector Shape - Rect",
              "hd": false
            },
            {
              "ty": "fl",
              "c": { "a": 0, "k": [0.5, 0.8, 1, 1], "ix": 4 },
              "o": { "a": 0, "k": 100, "ix": 5 },
              "r": 1,
              "bm": 0,
              "nm": "Fill 1",
              "mn": "ADBE Vector Graphic - Fill",
              "hd": false
            }
          ],
          "nm": "Sky Group",
          "np": 2,
          "cix": 2,
          "bm": 0,
          "ix": 1,
          "mn": "ADBE Vector Group",
          "hd": false
        }
      ],
      "ip": 0,
      "op": 120,
      "st": 0,
      "bm": 0
    }
  ]
};
