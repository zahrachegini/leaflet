import React, { useEffect, useState } from "react";
import { MapContainer, Marker, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import marker from "../assets/images/marker.png";

const icon = L.icon({
  iconUrl: "../assets/images/marker.png",
  iconSize: [35, 35],
});

// function ResetCenterView(props) {
//   const { selectPosition } = props;
//   const map = useMap();

//   useEffect(() => {
//     if (selectPosition) {
//       map.setView(
//         L.latLng(selectPosition?.lat, selectPosition?.lon),
//         map.getZoom(),
//         {
//           animate: true,
//         }
//       );
//     }
//   }, [selectPosition]);

//   return null;
// }

const MyMap = ({ ClickHandler, props }) => {
  // const { selectPosition } = props;
  // const locationSelection = [selectPosition?.lat, selectPosition?.lon];
  function LocationMarker() {
    const [position, setPosition] = useState(null);
    const [bbox, setBbox] = useState([]);

    const map = useMap();

    useEffect(() => {
      map.locate().on("locationfound", function (e) {
        setPosition(e.latlng);
        map.flyTo(e.latlng, map.getZoom());
        setBbox(e.bounds.toBBoxString().split(","));
      });
    }, [map]);

    return position === null
      ? null
      : console.log("مکان یاب دستگاه خود را فعال کنید");
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

      {/* {selectPosition && (
        <Marker
          position={locationSelection}
          icon={icon}
          style={{ display: "flex", alignItems: "center" }}
        ></Marker>
      )} */}

      <div className="absolute flex left-[50%] bottom-[50%]">
        <img
          src={marker}
          className="cursor-pointer"
          alt="marker"
          style={{
            zIndex: "999",
          }}
        />
      </div>
      {/* <ResetCenterView selectPosition={selectPosition} /> */}
      <LocationMarker />
      <ClickHandler />
      {/* <MoveLocation /> */}
    </MapContainer>
  );
};

export default MyMap;
