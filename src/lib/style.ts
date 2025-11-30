import type { StyleSpecification } from "@maptiler/sdk";

export function gen_style(style: StyleSpecification) {

  style.layers.push({
    "id": "head streams",
    "type": "line",
    "source": "maptiler_planet",
    "source-layer": "waterway",
    "layout": {
      "line-join": "round",
      "line-cap": "round",
      "visibility": "visible"
    },
    "paint": {
      "line-width": 3,
      "line-color": "hsl(203, 100%, 50%)"
    },
    "filter": [
      "all",
      [
        "==",
        [
          "geometry-type"
        ],
        "LineString"
      ],
      [
        "all",
        [
          "match",
          [
            "id"
          ],
          [
            27282683,
            229531420
          ],
          true,
          false
        ],
        [
          "match",
          [
            "get",
            "name"
          ],
          [
            "Yamuna"
          ],
          true,
          true
        ]
      ]
    ]
  })

  style.layers.push({
    "id": "Country borders",
    "type": "line",
    "source": "maptiler_planet",
    "source-layer": "boundary",
    "layout": {
      "line-cap": "round",
      "line-join": "round",
      "visibility": "visible"
    },
    "paint": {
      "line-color": "hsl(0, 0%, 94%)",
      "line-width": [
        "interpolate",
        [
          "exponential",
          1.5
        ],
        [
          "zoom"
        ],
        3,
        0.5,
        9,
        1.5,
        22,
        32
      ]
    },
    "filter": [
      "all",
      [
        "==",
        "admin_level",
        2
      ],
      [
        "==",
        "maritime",
        0
      ],
      [
        "==",
        "disputed",
        0
      ]
    ]
  })

  style.layers.push({
    "id": "yamuna line",
    "type": "line",
    "source": "maptiler_planet",
    "source-layer": "waterway",
    "layout": {},
    "paint": {
      "line-color": "hsl(238, 99%, 51%)"
    },
    "filter": [
      "all",
      [
        "all",
        [
          "match",
          [
            "get",
            "class"
          ],
          [
            "river"
          ],
          true,
          false
        ],
        [
          "match",
          [
            "id"
          ],
          [
            1159116803
          ],
          true,
          false
        ]
      ],
      [
        "==",
        [
          "geometry-type"
        ],
        "LineString"
      ]
    ]
  });

  style.layers.push({
    "id": "yamuna text",
    "type": "symbol",
    "source": "maptiler_planet",
    "source-layer": "waterway",
    "layout": {
      "text-field": "Yamuna",
      "text-font": [
        "Noto Sans Regular"
      ],
      "visibility": "visible",
      "icon-keep-upright": true,
      "symbol-placement": "line",
      "symbol-spacing": 279,
      "text-anchor": "right",
      "text-size": 13,
      "symbol-avoid-edges": true
    },
    "paint": {
      "text-color": "hsl(0, 0%, 0%)",
      "icon-halo-color": "rgba(255, 255, 255, 1)",
      "text-halo-color": "rgba(255, 255, 255, 1)",
      "icon-halo-width": 1,
      "text-halo-width": 1
    },
    "filter": [
      "all",
      [
        "all",
        [
          "match",
          [
            "get",
            "class"
          ],
          [
            "river"
          ],
          true,
          false
        ],
        [
          "match",
          [
            "id"
          ],
          [
            1159116803
          ],
          true,
          false
        ]
      ],
      [
        "==",
        [
          "geometry-type"
        ],
        "LineString"
      ]
    ]
  });

  // Ganga river
  style.layers.push({
    "id": "ganga_river",
    "type": "line",
    "source": "maptiler_planet",
    "source-layer": "waterway",
    "layout": {
    },
    "paint": {
      "line-color": "#155DFC",
      "line-width": 5,
      "line-blur": 1,
    },
    "filter": [
      "all",
      [
        "==",
        [
          "geometry-type"
        ],
        "LineString"
      ],
      [
        "any",
        [
          "case",
          [
            "has",
            "brunnel"
          ],
          false,
          false
        ],
        [
          "case",
          [
            "has",
            "class"
          ],
          false,
          false
        ],
        [
          "match",
          [
            "id"
          ],
          [
            1159122643
          ],
          true,
          false
        ],
        [
          "match",
          [
            "get",
            "name"
          ],
          [
            "Ganga"
          ],
          true,
          false
        ],
        [
          "case",
          [
            "has",
            "intermittent"
          ],
          false,
          false
        ]
      ]
    ]
  });

  style.layers.push({
    "id": "Waterway copy 1",
    "type": "symbol",
    "source": "maptiler_planet",
    "layout": {
      "text-field": "Ganga",
      "text-font": [
        "Inter Regular",
        "Noto Sans Regular"
      ],
      "icon-keep-upright": true,
      "symbol-placement": "line",
      "text-anchor": "top",
      "symbol-spacing": 10,
      "text-size": 20,
      "symbol-avoid-edges": true,
    },
    "filter": [
      "all",
      [
        "==",
        [
          "geometry-type"
        ],
        "LineString"
      ],
      [
        "match",
        [
          "id"
        ],
        [
          1159122643
        ],
        true,
        false
      ]
    ],
    "paint": {
        "icon-halo-color": "rgba(255, 255, 255, 1)",
        "text-halo-color": "rgba(255, 255, 255, 1)",
        "icon-halo-width": 1,
        "text-halo-width": 1
    },
    "source-layer": "waterway"
  })

  style.layers.push({
    "id": "Okhla",
    "type": "symbol",
    "source": "maptiler_planet",
    "layout": {
      "text-field": "Okhla Barrage",
      "text-font": [
        "Noto Sans Regular"
      ],
      "icon-keep-upright": true,
      "text-anchor": "center",
      "symbol-placement": "point",
      "text-size": 25
    },
    "paint": {
      "icon-halo-color": "rgba(255, 255, 255, 1)",
      "text-halo-color": "rgba(255, 255, 255, 1)",
      "icon-halo-width": 1,
      "text-halo-width": 1,
      "text-translate": [
        310,
        432
      ]
    },
    "filter": [
      "all",
      [
        "match",
        [
          "id"
        ],
        [
          34869434
        ],
        true,
        false
      ],
      [
        "==",
        [
          "geometry-type"
        ],
        "LineString"
      ]
    ],
    "source-layer": "waterway"
  })

  style.layers.push({
    "id": "rahmsar",
    "type": "line",
    "source": "maptiler_planet",
    "layout": {
      "line-cap": "round",
      "line-join": "round"
    },
    "paint": {
      "line-color": "#d32f2f",
      "line-width": 14
    },
    "filter": [
      "all",
      [
        "==",
        [
          "geometry-type"
        ],
        "LineString"
      ],
      [
        "match",
        [
          "id"
        ],
        [
          82295315
        ],
        true,
        false
      ]
    ],
    "source-layer": "waterway"
  })

  style.layers.push({
    "id": "Varanasi Name",
    "type": "symbol",
    "source": "maptiler_planet",
    "layout": {
      "text-field": "Varanasi",
      "text-font": [
        "Noto Sans Regular"
      ],
      "text-size": [
        "step",
        [
          "zoom"
        ],
        0,
        8.2,
        31
      ]
    },
    "paint": {
      "icon-halo-color": "rgba(255, 255, 255, 1)",
      "text-halo-color": "rgba(255, 255, 255, 1)",
      "icon-halo-width": 1,
      "text-halo-width": 1
    },
    "filter": [
      "all",
      [
        "match",
        [
          "get",
          "name"
        ],
        [
          "Varanasi"
        ],
        true,
        false
      ],
      [
        "==",
        [
          "geometry-type"
        ],
        "Point"
      ]
    ],
    "source-layer": "place"
  })

  style.layers.push({
    "id": "rahmsar copy",
    "type": "symbol",
    "source": "maptiler_planet",
    "layout": {
      "text-field": "Narora Ramsar Site",
      "text-font": [
        "Noto Sans Regular"
      ],
      "visibility": "visible",
      "text-justify": "center",
      "icon-keep-upright": true,
      "symbol-placement": "point",
      "text-anchor": "bottom",
      "text-padding": 0,
      "text-radial-offset": 0,
      "text-size": 33
    },
    "paint": {
      "text-color": "#d32f2f",
      "icon-halo-color": "rgba(255, 255, 255, 1)",
      "text-halo-color": "rgba(255, 255, 255, 1)",
      "icon-halo-width": 1,
      "text-halo-width": 1
    },
    "filter": [
      "all",
      [
        "==",
        [
          "geometry-type"
        ],
        "LineString"
      ],
      [
        "match",
        [
          "id"
        ],
        [
          82295315
        ],
        true,
        false
      ]
    ],
    "source-layer": "waterway"
  })

  style.layers.push({
    "id": "Country names",
    "type": "symbol",
    "source": "maptiler_planet",
    "source-layer": "place",
    "minzoom": 1,
    "maxzoom": 12,
    "layout": {
      "symbol-sort-key": [
        "to-number",
        [
          "get",
          "rank"
        ]
      ],
      "text-field": "{name:en}",
      "text-font": [
        "Noto Sans Bold"
      ],
      "text-max-width": 10,
      "text-size": [
        "interpolate",
        [
          "linear",
          0.75,
          1,
          0.75,
          1
        ],
        [
          "zoom"
        ],
        1,
        [
          "step",
          [
            "get",
            "rank"
          ],
          13,
          1,
          12,
          2,
          12
        ],
        4,
        [
          "step",
          [
            "get",
            "rank"
          ],
          15,
          1,
          14,
          2,
          14
        ],
        6,
        [
          "step",
          [
            "get",
            "rank"
          ],
          23,
          1,
          18,
          2,
          18
        ],
        9,
        [
          "step",
          [
            "get",
            "rank"
          ],
          27,
          1,
          22,
          2,
          22
        ]
      ],
      "visibility": "visible"
    },
    "paint": {
      "text-color": "hsl(0, 0%, 100%)",
      "text-halo-blur": 1,
      "text-halo-color": "hsl(0, 0%, 0%)",
      "text-halo-width": 1
    },
    "filter": [
      "all",
      [
        "==",
        "$type",
        "Point"
      ],
      [
        "in",
        "class",
        "country"
      ],
      [
        "!=",
        "iso_a2",
        "VA"
      ]
    ]
  })

  return style;
}
