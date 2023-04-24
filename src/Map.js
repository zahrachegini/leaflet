import axios from "axios";
import React, { useState } from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";

function Map() {
  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);
  const [address, setAddress] = useState("");

  const getAddress = async (lat, lng) => {
    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`
      );
      setAddress(response.data.display_name);
    } catch (error) {
      console.log(error);
    }
  };

  const handleMapClick = (e) => {
    setLat(e.latlng.lat);
    setLng(e.latlng.lng);

    // Call the getAddress function
    getAddress(e.latlng.lat, e.latlng.lng);
  };

  return (
    <div>
      <MapContainer
        center={[lat, lng]}
        zoom={13}
        style={{ height: "400px" }}
        onClick={handleMapClick}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker position={[lat, lng]} />
      </MapContainer>
      <p>{address}</p>
    </div>
  );
  // Rest of the code
}

export default Map;
