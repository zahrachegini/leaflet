import { useEffect, useState } from "react";
import L from "leaflet";

function getAddressFromLatLng(lat, lng) {
  const url = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=jsonv2`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const address = data.display_name;
      console.log("Address: ", address);
      // Do something with the address
    })
    .catch((error) => console.error(error));
}

function Map() {
  const [map, setMap] = useState(null);
  const [marker, setMarker] = useState(null);

  useEffect(() => {
    const leafletMap = L.map("map").setView([51.505, -0.09], 13);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        'Map data © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors',
    }).addTo(leafletMap);

    setMap(leafletMap);
  }, []);

  useEffect(() => {
    if (map) {
      const leafletMarker = L.marker([51.505, -0.09]).addTo(map);
      setMarker(leafletMarker);
    }
  }, [map]);

  useEffect(() => {
    if (marker) {
      marker.on("click", (e) => {
        const { lat, lng } = e.latlng;
        getAddressFromLatLng(lat, lng);
      });
    }
  }, [marker]);

  return <div id="map" style={{ height: "500px" }}></div>;
}

export default Map;
