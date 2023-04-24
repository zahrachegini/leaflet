import { useEffect } from "react";
import { useMap } from "react-leaflet";

function MapComponent() {
  const map = useMap();

  useEffect(() => {
    map.locate({ setView: true, maxZoom: 16 });
    map.on("locationfound", (e) => {
      console.log(e.latlng); // logs the device location coordinates
    });
  }, [map]);

  return null;
}

export default MapComponent;
