import React, { useEffect, useState } from "react";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";

import MapComponent from "./MapComponent";

// function GetIcon(_iconSize) {
//   return L.icon({
//     iconUrl: require("../assets/images/marker.png"),
//     iconSize: [_iconSize],
//   });
// }

import L from "leaflet";

import icon from "../constants";

// function ClickHandler() {
//   useMapEvents({
//     click: async (e) => {
//       const lat = e.latlng.lat;
//       const lng = e.latlng.lng;
//       console.log(lat);
//       console.log(lng);

//       try {
//         const response = await axios.get(
//           `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`
//         );
//         // setAddress(response.data.display_name);
//         console.log(response.data.display_name);
//       } catch (error) {
//         console.log(error);
//       }
//     }
//   });

//   return null;
// }

const MyMap = () => {
  function LocationMarker() {
    const [position, setPosition] = useState(null);
    const [bbox, setBbox] = useState([]);

    const map = useMap();

    useEffect(() => {
      map.locate().on("locationfound", function (e) {
        setPosition(e.latlng);
        map.flyTo(e.latlng, map.getZoom());
        const radius = e.accuracy;
        const circle = L.circle(e.latlng, radius);
        circle.addTo(map);
        setBbox(e.bounds.toBBoxString().split(","));
      });
    }, [map]);

    return position === null ? null : (
      <Marker position={position} icon={icon}>
        <Popup>
          You are here. <br />
          Map bbox: <br />
          <b>Southwest lng</b>: {bbox[0]} <br />
          <b>Southwest lat</b>: {bbox[1]} <br />
          <b>Northeast lng</b>: {bbox[2]} <br />
          <b>Northeast lat</b>: {bbox[3]}
        </Popup>
      </Marker>
    );
  }

  return (
    <MapContainer
      doubleClickZoom={false}
      id="mapId"
      zoom={16}
      center={[35.699711, 51.33758]}
      style={{ height: "400px" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <LocationMarker />

      <MapComponent />
      {/* <ClickHandler /> */}
      {/* <Marker
        position={position}
        icon={GetIcon()}
        onClick={() => ClickHandler()}
      >
        <Popup>Location of marker</Popup>
      </Marker> */}

      {/* <AddMarkers /> */}
    </MapContainer>
  );
};

export default MyMap;
