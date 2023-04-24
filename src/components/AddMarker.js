import React, { useState } from "react";
import { Marker, Popup, useMapEvents } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

function GetIcon(_iconSize) {
  return L.icon({
    iconUrl: require("../assets/images/marker.png"),
    iconSize: [_iconSize],
  });
}

const AddMarkers = () => {
  const [markers, setMarkers] = useState([
    {
      lat: 35.699711,
      lng: 51.33758,
    },
  ]);

  const map = useMapEvents({
    click: (e) => {
        setMarkers([...markers, e.latlng]);
    },
  });
  return (
    <>
      {markers.map((marker, i) => (
        <Marker key={`marker-${0}`} position={marker} icon={GetIcon()}>
          <Popup>
            <span>
              A pretty CSS3 popup. <br /> Easily customizable.
            </span>
          </Popup>
        </Marker>
      ))}
      {/* <Marker position={markers[0]}>
        <Popup>
          <span>
            A pretty CSS3 popup. <br /> Easily customizable.
          </span>
        </Popup>
      </Marker> */}
    </>
  );
};

export default AddMarkers;


