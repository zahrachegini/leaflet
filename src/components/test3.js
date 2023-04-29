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

// function GetIcon(_iconSize) {
//   return L.icon({
//     iconUrl: require("../assets/images/marker.png"),
//     iconSize: [_iconSize],
//   });
// }

import L from "leaflet";

import icon from "../constants";
import axios from "axios";

function ClickHandler() {
  const [address, setAddress] = useState([]);
  useMapEvents({
    click: async (e) => {
      const lat = e.latlng.lat;
      const lng = e.latlng.lng;
      const language = e.latlng.language;
      console.log(lat);
      console.log(lng);

      try {
        const response = await axios.get(
          `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}&accept-language=${language}`
        );
        setAddress(response.data.address);
        alert(response.data.address);
      } catch (error) {
        console.log(error);
      }
    },
  });

  return null;
}

const MyMap = () => {
  function LocationMarker() {
    const [position, setPosition] = useState(null);
    const [bbox, setBbox] = useState([]);
    const [draggable, setDraggable] = useState(false);
    const markerRef = useRef(null);
    const eventHandlers = useMemo(
      () => ({
        dragend() {
          const marker = markerRef.current;
          if (marker != null) {
            setPosition(marker.getLatLng());
          }
        },
      }),
      []
    );

    // const toggleDraggable = useCallback(() => {
    //   setDraggable((d) => !d);
    // }, []);

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
      <Marker
        position={position}
        icon={icon}
        draggable={draggable}
        eventHandlers={eventHandlers}
      >
        {/* <Popup>
            <span>
              {draggable
                ? "آدرس خود را انتخاب کنید"
                : "برای انتخاب آدرس، نشانگر را لمس کنید"}
            </span>
          </Popup> */}
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

      <ClickHandler />
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
