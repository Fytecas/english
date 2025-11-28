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
            24943999,
            24944222,
            24944258,
            27031336,
            27282950,
            44450008,
            44450010,
            44509206,
            44674342,
            44733081,
            44818030,
            44818654,
            82295304,
            82296648,
            82862309,
            146350133,
            158428939,
            229776317,
            235367063,
            267825123,
            328709670,
            329052411,
            329052413,
            329075071,
            569405743,
            569405744,
            569405745,
            569410623,
            569410627,
            569410628,
            569410629,
            569410630,
            569410631,
            569410634,
            569410635,
            569410636,
            569410637,
            569410640,
            569410641,
            569410643,
            569410644,
            981300176
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
    "id": "tributary",
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
    "id": "tributary copy",
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

  style.layers.push({
    "id": "Waterway",
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


  return style;
}
