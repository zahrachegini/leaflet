import { useMapEvents } from "react-leaflet";

function MoveLocation() {
  const map = useMapEvents({
    mouseup: (e) => {
      //   console.log("Mouse up", e.latlng.lat);
      //   console.log("Mouse up", e.latlng.lng);
      //   console.log("Map center", map.getCenter().lat);
      map.getCenter();
      let latCenter = map.getCenter().lat;
      let lngCenter = map.getCenter().lng;
      console.log(latCenter, lngCenter);

      // map.setView([e.latlng.lat, e.latlng.lng], 16);
      map.zoomIn();
    },
  });
  return null;
}

export default MoveLocation;
