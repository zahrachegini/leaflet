import React from "react";
import L from "leaflet";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

function GetIcon(_iconSize) {
  return L.icon({
    iconUrl: require("../assets/images/marker.png"),
    iconSize: [_iconSize],
  });
}
const MyMap = () => {
  const position = [35.699711, 51.33758];
  return (
    <MapContainer center={position} zoom={16}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={position} icon={GetIcon()}>
        <Popup>Location of marker</Popup>
      </Marker>
    </MapContainer>
  );
};

export default MyMap;
