import * as maplibregl from "https://cdn.skypack.dev/maplibre-gl";

import { Protocol } from "https://esm.sh/pmtiles";
const protocol = new Protocol();
maplibregl.addProtocol("pmtiles", protocol.tile);

const map = new maplibregl.Map({
    container: 'mijnkaart', // container id
    style: './assets/style.json',
    center: [5.66509, 51.96857], // starting position [lng, lat]
    zoom: 14, // starting zoom
    maxBounds: [
        [5.6058239, 51.9364055],
        [5.7243627, 52.0007083]
    ],
    minZoom: 11,
    maxZoom: 16,
});

map.on('load', () => {
    map.addSource('wandeling', {
        type: 'geojson',
        data: './assets/wandeling.geojson'
    });

    map.addLayer({
        id: 'wandeling',
        type: 'line',
        source: 'wandeling',
        paint: {
            "line-color": [
                "interpolate",
                ["exponential", 2.5],
                ["zoom"],
                11,
                "rgba(12, 12, 12, 1)",
                16,
                "rgba(211, 233, 13, 1)"
            ],
            "line-dasharray": [
                "step",
                ["zoom"],
                ["literal", [3, 1]],
                16,
                ["literal", [2, 1]],
                18,
                ["literal", [2, 0]]
            ],
            "line-width": [
                "interpolate",
                ["exponential", 1.5],
                ["zoom"],
                11,
                4.5,
                20,
                12
            ]
        },
    });
});