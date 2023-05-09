import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, useMap, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const MyMap = ({ ClickHandler }) => {
  function MyComponent() {
    const map = useMapEvents({
      mouseup: (e) => {
        // alert("Mouse up", e.latlng);
        console.log("Mouse up", e.latlng.lat);
      },
      touchend: (e) => {
        alert("Touch end", e.latlng);
        console.log("Mouse up", e.latlng.lat);

        map.zoomIn();
      },
    });
    return null;
  }

  // function MyComponent() {
  //   const map = useMapEvents({
  //     mouseup: (e) => {
  //       alert("map loc", e.latlng.alt);
  //       // let mouseLocation = e.target.lat;
  //       console.log(e.latlng.lat);
  //       // console.log("map loc", e.latlng);
  //       // console.log("map bounds", e.target.getBounds());/
  //       map.zoomIn();
  //     },
  //   });
  //   return null;
  // }

  function LocationMarker() {
    const [position, setPosition] = useState(null);
    const [bbox, setBbox] = useState([]);

    const map = useMap();

    useEffect(() => {
      map.locate().on("locationfound", function (e) {
        setPosition(e.latlng);
        map.flyTo(e.latlng, map.getZoom());
        // const radius = e.accuracy;
        // const circle = L.circle(e.latlng, radius);
        // circle.addTo(map);
        setBbox(e.bounds.toBBoxString().split(","));
      });
    }, [map]);

    return position === null
      ? null
      : // <Marker position={position} icon={icon}></Marker>
        console.log("OK");
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
      <MyComponent />
    </MapContainer>
  );
};

export default MyMap;
