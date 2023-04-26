import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useGeolocation } from "react-geolocation";

function MyMap() {
  const geolocation = useGeolocation();

  return (
    <MapContainer
      center={[geolocation.latitude, geolocation.longitude]}
      zoom={13}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Marker position={[geolocation.latitude, geolocation.longitude]} />
    </MapContainer>
  );
}

export default MyMap;
