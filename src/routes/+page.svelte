<script lang="ts">
    import { onMount, onDestroy } from "svelte";
    import { Map, MapStyle, Marker, Popup, config } from "@maptiler/sdk";
    import "@maptiler/sdk/dist/maptiler-sdk.css";
    import { gen_style } from "$lib/style";
    import Badge from "$lib/badge.svelte";
    import {
        ArrowLeftIcon,
        ArrowRightIcon,
        CopyrightIcon,
        InfoIcon,
        MapIcon,
        XIcon,
    } from "@lucide/svelte";
    import { fade, slide } from "svelte/transition";

    let map: Map | undefined;
    let mapContainer: HTMLDivElement | undefined;

    type MapPosition = {
        lng: number;
        lat: number;
        zoom: number;
        pitch: number;
        bearing: number;
    };
    const Okhla_barrage: MapPosition = {
        lng: 77.318,
        lat: 28.545,
        zoom: 14.5,
        pitch: 30,
        bearing: 0,
    };
    const Northern_India: MapPosition = {
        lng: 83.02898,
        lat: 26.46599,
        zoom: 5.5,
        pitch: 0,
        bearing: 0,
    };
    const Uttarakhand: MapPosition = {
        lng: 79.24806544698231,
        lat: 30.068049501495068,
        zoom: 13.791900911483996,
        pitch: 43.000000000000014,
        bearing: 26.10322121772288,
    };
    const Gomuck: MapPosition = {
        lng: 79.0839672088623,
        lat: 30.92615685415305,
        pitch: 45.005443460589376,
        bearing: 51.006147019862055,
        zoom: 14.5041144530694,
    };

    const Varanasi: MapPosition = {
        lng: 83.01928194578204,
        lat: 25.31454666917712,
        pitch: 0,
        bearing: 0,
        zoom: 11.899513654791,
    };

    const Narora: MapPosition = {
        lng: 78.26237957276112,
        lat: 28.50007094077131,
        pitch: 0,
        bearing: 0,
        zoom: 9.881600682285741,
    };

    // null -> no point selected
    let selected_point: any | null = null;

    let info_modal_open = false;

    const points = [
        {
            id: "1",
            title: "The Gomuck source",
            pos: Gomuck,
            tip_orientation: "left",
            audio_url: "clovis.m4a",
            author: "Clovis",
        },
        {
            id: "2",
            title: "New Delhi",
            pos: Okhla_barrage,
            tip_orientation: "right",
            audio_url: "mathilde.mp3",
            author: "Mathilde",
        },
        {
            id: "3",
            title: "Narora Ramsar Site",
            pos: Narora,
            tip_orientation: "left",
            audio_url: "dario.m4a",
            author: "Dario",
        },
        {
            id: "4",
            title: "Varanasi",
            pos: Varanasi,
            tip_orientation: "top",
            audio_url: "jawad.aac",
            author: "Jawad",
        },
    ];

    config.apiKey = "fur1hZSNTzJLlMuvOoJX";

    function crate_map() {
        map = new Map({
            container: mapContainer,
            style: "019ac709-2e2b-7045-b486-6c12ad7ee576",
            center: [Northern_India.lng, Northern_India.lat],
            zoom: Northern_India.zoom,
            terrainControl: true,
            scaleControl: false,
            navigationControl: false,
            geolocateControl: false,
            dragPan: false,
            scrollZoom: false,
            doubleClickZoom: false,
        });

        new Marker()
            .setLngLat({ lng: 79.0839672088623, lat: 30.92615685415305 })
            .setPopup(new Popup().setHTML("<h1>The Gomuck Water Source</h1>"))
            .addTo(map);

        points.forEach((point) => {
            const el = document.getElementById(`badge-${point.id}`);
            if (!el) return;

            el.className = "marker";

            if (!map) return;
            new Marker({
                element: el,
            })
                .setLngLat([point.pos.lng, point.pos.lat])
                .addTo(map);
        });

        map.onReadyAsync().then(() => {
            let style = map?.getStyle();
            if (!style) return;
            map?.setStyle(gen_style(style));
        });

        map.on("click", (e) => console.log(e));
    }

    function switch_map_on(pos: MapPosition) {
        map?.easeTo({
            center: [pos.lng, pos.lat],
            zoom: pos.zoom,
            pitch: pos.pitch,
            bearing: pos.bearing,
            duration: 1500,
        });
    }

    onMount(() => {
        crate_map();
    });

    onDestroy(() => {
        map?.remove();
    });
</script>

<!-- <button
    onclick={() => {
        let center = map?.getCenter();
        let roll = map?.getRoll();
        let pitch = map?.getPitch();
        let bearing = map?.getBearing();
        let zoom = map?.getZoom();
        window.alert(
            `{lng: ${center?.lng}, lat: ${center?.lat}\n,pitch: ${pitch}\n,bearing: ${bearing}\n,zoom: ${zoom} }`,
        );
    }}>Get Pos</button
> -->

<div class="map-wrap">
    <div class="map" bind:this={mapContainer}></div>
</div>

{#if selected_point != null}
    <button
        class="home-button button"
        onclick={() => {
            selected_point = null;
            switch_map_on(Northern_India);
        }}
        in:slide={{ delay: 500, axis: "x" }}
        out:slide={{ axis: "x" }}
    >
        <ArrowLeftIcon /> Go to the map
    </button>

    {#if points.indexOf(selected_point) > 0}
        <button
            in:slide={{ delay: 500}}
            out:slide
            class="button back-button"
            onclick={() => {
                if (selected_point != null) {
                    let point_idx = points.indexOf(selected_point);
                    if (point_idx > 0) {
                        selected_point = points[point_idx - 1];
                        switch_map_on(selected_point.pos);
                    }
                }
            }}
        >
            <ArrowLeftIcon /> Back
        </button>
    {/if}

    <button
        class="button next-button"
        in:slide={{ delay: 500}}
        out:slide
        onclick={() => {
            if (selected_point != null) {
                let point_idx = points.indexOf(selected_point);
                if (point_idx < points.length - 1) {
                    selected_point = points[point_idx + 1];
                    switch_map_on(selected_point.pos);
                } else {
                    selected_point = null;
                    switch_map_on(Northern_India);
                }
            }
        }}
    >
        <ArrowRightIcon /> Next
    </button>

    <div class="player" in:slide={{ delay: 1000 }} out:slide>
        <div class="player-content">
            <span class="player-title"
                >{selected_point.id}. {selected_point.title}</span
            >
            <span class="player-author">{selected_point.author}</span>
        </div>
        <audio controls>
            <source src={selected_point.audio_url} type="audio/mpeg" />
        </audio>
    </div>
{:else}
    <button
        class="info-button home-button"
        in:slide={{ delay: 500, axis: "x" }}
        out:slide={{ axis: "x" }}
        onclick={() => (info_modal_open = !info_modal_open)}
    >
        <InfoIcon />
    </button>

    <div class="player" in:slide={{ delay: 1000 }} out:slide>
        <div class="player-content">
            <span class="player-title"
                >5. The pollution of the Ganges River</span
            >
            <span class="player-author">Mathilde, Jawad, Clovis and Dario</span>
        </div>
        <span
            class="player-description"
            style="font-weight: bold; font-size: 0.8em;">Conclusion :</span
        >
        <audio controls>
            <source src="conclusion.aac" type="audio/mpeg" />
        </audio>
    </div>
{/if}

{#if info_modal_open && !selected_point}
    <div class="info-modal" in:slide out:slide>
        <button class="close-button" onclick={() => (info_modal_open = false)}>
            <XIcon />
        </button>
        <div class="info-content">
            <h2>About the Map</h2>
            <p>
                This map shows the pollution of the Ganges River across various
                points of interest.
            </p>
            <p>
                This entire website was programmed by Le Hy Dario, the creators
                of each voice recording can be found in the corresponding points
                on the map.
            </p>
            <p style="font-weight: bold;">
                Any copy of the content of this website, and more importantly,
                the voice recordings, is strictly prohibited without prior
                written consent by the creator.
            </p>
            <p>
                The following licence applies to the code and other content,
                excluding the voice recordings which are subject to the
                copyright notice above. MIT License Copyright (c) 2025 Dario Le
                Hy Permission is hereby granted, free of charge, to any person
                obtaining a copy of this software and associated documentation
                files (the "Software"), to deal in the Software without
                restriction, including without limitation the rights to use,
                copy, modify, merge, publish, distribute, sublicense, and/or
                sell copies of the Software, and to permit persons to whom the
                Software is furnished to do so, subject to the following
                conditions: The above copyright notice and this permission
                notice shall be included in all copies or substantial portions
                of the Software. THE SOFTWARE IS PROVIDED "AS IS", WITHOUT
                WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT
                LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
                PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
                AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR
                OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
                OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
                SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
            </p>
        </div>
    </div>
{/if}

{#each points as point}
    <Badge
        {point}
        onselect={() => {
            selected_point = point;
            switch_map_on(point.pos);
        }}
        show={selected_point == null}
        orientation={point.tip_orientation}
    />
{/each}

<style>
    .info-modal {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: white;
        border-radius: 10px;
        padding: 20px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
        z-index: 1000;
    }

    .close-button {
        position: absolute;
        top: 10px;
        right: 10px;
        background-color: transparent;
        border: none;
        color: #007bff;
        font-size: 25px;
        cursor: pointer;
    }

    .info-content {
        margin-top: 20px;
    }

    .map-wrap {
        position: relative;
        width: 100%;
        height: 100vh; /* calculate height of the screen minus the heading */
    }

    .map {
        position: absolute;
        width: 100%;
        height: 100%;
    }

    .button {
        position: absolute;
        z-index: 1000;
        background-color: #007bff;
        border: none;
        color: white;
        border-radius: 100px;
        padding: 10px 15px;
        font-size: 25px;

        display: flex;
        align-items: center;
        gap: 10px;

        transition: background-color 0.3s ease;

        text-wrap: nowrap;
        flex-wrap: nowrap;
    }

    .home-button {
        top: 10px;
        left: 10px;
    }

    .back-button {
        bottom: 10px;
        left: 10px;
    }

    .next-button {
        bottom: 10px;
        right: 10px;
    }

    .button:hover {
        background-color: #0056b3;
    }

    .button:active {
        background-color: #004085;
    }

    .player {
        position: absolute;
        z-index: 1000;
        bottom: 10px;
        /*Center the player horizontally*/
        left: 50%;
        transform: translateX(-50%);
        background-color: #007bff;
        border: none;
        border-radius: 10px;
        padding: 10px;
        font-weight: bold;
        /*padding-bottom: 5px;*/
        font-size: 25px;

        display: flex;
        align-items: flex-start;
        color: white;
        gap: 10px;
        flex-direction: column;
    }

    .player-author {
        font-size: 18px;
        font-weight: normal;
        font-style: italic;
    }

    .player-content {
        display: flex;
        flex-direction: column;
        gap: 0px;
    }
</style>
