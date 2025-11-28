<script lang="ts">
    import { onMount, onDestroy } from "svelte";
    import { Map, MapStyle, Marker, config } from "@maptiler/sdk";
    import "@maptiler/sdk/dist/maptiler-sdk.css";
    import { gen_style } from "$lib/style";
    import Badge from "$lib/badge.svelte";

    let map: Map | undefined;
    let mapContainer: HTMLDivElement | undefined;


    type MapPosition = { lng: number, lat: number, zoom: number, pitch: number, bearing: number };
    const Okhla_barrage: MapPosition = { lng: 77.315, lat: 28.545, zoom: 14.5, pitch: 30., bearing: 0 };
    const Northern_India: MapPosition = { lng: 84.52898, lat: 26.46599, zoom: 5.5, pitch: 0, bearing: 0 };
    const Uttarakhand: MapPosition = { lng: 79.24806544698231, lat: 30.068049501495068, zoom: 13.791900911483996, pitch: 43.000000000000014, bearing: 26.10322121772288 };

    const points = [
      {
        "id": "1",
        "title": "New Delhi",
        "pos": Okhla_barrage
      }
    ];

    config.apiKey = "fur1hZSNTzJLlMuvOoJX";

    function crate_map() {
      map = new Map({
          container: mapContainer,
          style: "019ac709-2e2b-7045-b486-6c12ad7ee576",
          center: [Northern_India.lng, Northern_India.lat],
          zoom: Northern_India.zoom,
          terrain: true,
          terrainControl: true,
          // scaleControl: false,
          // terrainControl: false,
          // forceNoAttributionControl: false,
          // navigationControl: false,
          // geolocateControl: false,
          // dragPan: false,
          // scrollZoom: false,
      });

      points.forEach(point => {
        const el = document.getElementById(`badge-${point.id}`);
        if (!el) return;

        el.className = "marker";

        el.addEventListener('click', function () {
              window.alert(point.title);
        });

        if (!map) return;
        new Marker({
          element: el
        }).setLngLat([point.pos.lng, point.pos.lat]).addTo(map);
      });

      map.onReadyAsync().then(() => {
          let style = map?.getStyle();
          if (!style) return;
          map?.setStyle(gen_style(style));
          switch_map_on(Uttarakhand);

      });
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

<button onclick={() => {
  let center = map?.getCenter();
  let roll = map?.getRoll();
  let pitch = map?.getPitch();
  let bearing = map?.getBearing();
  let zoom = map?.getZoom();
  window.alert(`Center: ${center?.lng}, ${center?.lat}\nRoll: ${roll}\nPitch: ${pitch}\nBearing: ${bearing}\nZoom: ${zoom}`);
}}>Get Pos</button>

<div class="map-wrap">
    <div class="map" bind:this={mapContainer}></div>
</div>

{#each points as point}
	<Badge point={point} />
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
</style>
