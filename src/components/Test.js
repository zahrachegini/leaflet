import React, { useRef } from "react";
import L from "leaflet";

function OpenStreetMap() {
  const mapRef = useRef(null);

  // Define a function to handle the touchend event
  function handleTouchEnd(event) {
    // Get the touch object representing the first touch point that was lifted from the surface
    const touch = event.changedTouches[0];

    // Get the X and Y coordinates of the touch point relative to the viewport
    const x = touch.clientX;
    const y = touch.clientY;

    // Use the X and Y coordinates to get the latitude and longitude of the touched location using Leaflet's pixelToLatLng method
    const latLng = mapRef.current.leafletElement.pixelToLatLng([x, y]);

    // Use Leaflet's reverse geocoding API to get the address of the touched location
    L.Control.Geocoder.nominatim().reverse(latLng, 10, (results) => {
      console.log(results[0].name); // replace 'name' with whatever property holds the address value

      // TODO: do something with the address value, e.g. update state or call a callback function
    });
  }

  // Initialize the map when the component mounts
  React.useEffect((L) => {
    // Create a new instance of the map
    const map = L.map(mapRef.current, {
      center: [51.505, -0.09],
      zoom: 13,
      layers: [
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution: '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
        }),
      ],
    });

    // Add a touchend event listener to the map
    map.on("touchend", handleTouchEnd);

    // Return a cleanup function that removes the touchend event listener when the component unmounts
    return () => {
      map.off("touchend", handleTouchEnd);
    };
  }, []);

  return <div ref={mapRef} style={{ height: "100vh" }}></div>;
}

export default OpenStreetMap;
