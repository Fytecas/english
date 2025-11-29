<script lang="ts">
    import { onMount, onDestroy } from "svelte";
    import { Map, MapStyle, Marker, Popup, config } from "@maptiler/sdk";
    import "@maptiler/sdk/dist/maptiler-sdk.css";
    import { gen_style } from "$lib/style";
    import Badge from "$lib/badge.svelte";

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
        lng: 84.52898,
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
    const Gomuck: MapPosition = {lng: 79.0839672088623, lat: 30.92615685415305
    ,pitch: 45.005443460589376
    ,bearing: 51.006147019862055
    ,zoom: 12.72041144530694 };

    const Varanasi: MapPosition = {lng: 83.01928194578204, lat: 25.31454666917712
    ,pitch: 0
    ,bearing: 0
    ,zoom: 11.899513654791 };

    const Narora: MapPosition = {lng: 78.26237957276112, lat: 28.50007094077131
    ,pitch: 0
    ,bearing: 0
    ,zoom: 10.381600682285741 };



    // null -> no point selected
    // a string -> the point id
    let selected_point: string | null = null;

    const points = [
        {
            id: "2",
            title: "New Delhi",
            pos: Okhla_barrage,
            tip_orientation: "right",
        },
        {
            id: "1",
            title: "The Gomuck source",
            pos: Gomuck,
            tip_orientation: "left",
        },
        {
          id: "4",
          title: "Varanasi",
          pos: Varanasi,
          tip_orientation: "top"
        },
        {
          id: "3",
          title: "Narora Ramsar Site",
          pos: Narora,
          tip_orientation: "left"
        }
    ];

    config.apiKey = "fur1hZSNTzJLlMuvOoJX";

    function crate_map() {
        map = new Map({
            container: mapContainer,
            style: "019ac709-2e2b-7045-b486-6c12ad7ee576",
            center: [Northern_India.lng, Northern_India.lat],
            zoom: Northern_India.zoom,
            // terrain: true,
            // terrainControl: true,
            // scaleControl: false,
            // forceNoAttributionControl: false,
            // navigationControl: false,
            // geolocateControl: false,
            // dragPan: false,
            // scrollZoom: false,
            // doubleClickZoom: false
        });

        new Marker()
          .setLngLat({lng: 79.0839672088623, lat: 30.92615685415305 })
          .setPopup(new Popup().setHTML("<h1>The Gomuck Water Source</h1>"))
          .addTo(map)

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
            // switch_map_on(Uttarakhand);
        });

        map.on("click", (e) => console.log(e))
    }

    function switch_map_on(pos: MapPosition) {
        map?.easeTo({
            center: [pos.lng, pos.lat],
            zoom: pos.zoom,
            pitch: pos.pitch,
            bearing: pos.bearing,
            duration: 3000,
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
        class="home-button"
        onclick={() => {
            let id = selected_point;
            selected_point = null;
            switch_map_on(Northern_India);
        }}
    >
        {"<- Return to the map"}
    </button>
{/if}

{#each points as point}
    <Badge
        {point}
        onselect={() => {
            let id = point.id;
            selected_point = id;
            switch_map_on(point.pos);
        }}
        show={selected_point == null}
        orientation={point.tip_orientation}
    />
{/each}

<style>
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

    .home-button {
        position: absolute;
        z-index: 1000;
        top: 10px;
        left: 10px;
        background-color: #007bff;
        border: none;
        border-radius: 10px;
        padding: 10px;
        font-size: 25px;
    }
</style>
