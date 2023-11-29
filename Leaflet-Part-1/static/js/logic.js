var Url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

let myMap = L.map("map", {
    center: [27.96044, -82.30695],
    zoom: 3
});

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

function getMarkerSize(magnitude) {
    return magnitude * 5;
}

function getMarkerColor(depth) {
    if (depth >= -10 && depth <= 10) {
        return '#00ff00';
    } else if (depth > 10 && depth <= 30) {
        return '#ffff00';
    } else if (depth > 30 && depth <= 50) {
        return '#ffa500';
    } else if (depth > 50 && depth <= 70) {
        return '#ff8c00';
    } else if (depth > 70 && depth <= 90) {
        return '#ff4500';
    } else {
        return '#ff0000';
    }
}

fetch(Url)
    .then(response => response.json())
    .then(data => {
        data.features.forEach(feature => {
            const { geometry, properties } = feature;
            const { mag } = properties;
            const depth = geometry.coordinates[2];

            const markerOptions = {
                radius: getMarkerSize(mag),
                fillColor: getMarkerColor(depth),
                color: '#000',
                weight: 1,
                opacity: 1,
                fillOpacity: 0.8
            };

            L.circleMarker([geometry.coordinates[1], geometry.coordinates[0]], markerOptions)
                .bindPopup(`<b>Location:</b> ${properties.place}<br><b>Magnitude:</b> ${mag}<br><b>Depth:</b> ${depth}`)
                .addTo(myMap);
        });
    });


