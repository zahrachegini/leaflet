// import React, { useRef } from "react";
// import L from "leaflet";

// function OpenStreetMap() {
//   const mapRef = useRef(null);

//   // Define a function to handle the touchend event
//   function handleTouchEnd(event) {
//     // Get the touch object representing the first touch point that was lifted from the surface
//     const touch = event.changedTouches[0];

//     // Get the X and Y coordinates of the touch point relative to the viewport
//     const x = touch.clientX;
//     const y = touch.clientY;

//     // Use the X and Y coordinates to get the latitude and longitude of the touched location using Leaflet's pixelToLatLng method
//     const latLng = mapRef.current.leafletElement.pixelToLatLng([x, y]);

//     // Use Leaflet's reverse geocoding API to get the address of the touched location
//     L.Control.Geocoder.nominatim().reverse(latLng, 10, (results) => {
//       console.log(results[0].name); // replace 'name' with whatever property holds the address value

//       // TODO: do something with the address value, e.g. update state or call a callback function
//     });
//   }

//   // Initialize the map when the component mounts
//   React.useEffect((L) => {
//     // Create a new instance of the map
//     const map = L.map(mapRef.current, {
//       center: [51.505, -0.09],
//       zoom: 13,
//       layers: [
//         L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
//           attribution: '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
//         }),
//       ],
//     });

//     // Add a touchend event listener to the map
//     map.on("touchend", handleTouchEnd);

//     // Return a cleanup function that removes the touchend event listener when the component unmounts
//     return () => {
//       map.off("touchend", handleTouchEnd);
//     };
//   }, []);

//   return <div ref={mapRef} style={{ height: "100vh" }}></div>;
// }

// export default OpenStreetMap;

// function ClickHandler() {
//   useMapEvents({
//     click: async (e) => {
//       const lat = e.latlng.lat;
//       const lng = e.latlng.lng;
//       const language = e.latlng.language;

//       try {
//         const response = await axios.get(
//           `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}&accept-language=${language}`
//         );
//         let userAddress = response.data.address;

//         let county = userAddress.county ? userAddress.county + "," : "";
//         let State = userAddress.state ? userAddress.state + "," : "";
//         let country = userAddress.country ? userAddress.country + "," : "";
//         let town = userAddress.town ? userAddress.town + "," : "";
//         let district = userAddress.district ? userAddress.district + "," : "";
//         let hamlet = userAddress.hamlet ? userAddress.hamlet + "," : "";
//         let neighbourhood = userAddress.neighbourhood
//           ? userAddress.neighbourhood + ","
//           : "";
//         let suburb = userAddress.suburb ? userAddress.suburb + "," : "";
//         let road = userAddress.road ? userAddress.road + "," : "";
//         setAddress(
//           `${country}${State}${county}${suburb}${town}${district}${hamlet}${neighbourhood}${road} `
//         );
//       } catch (error) {
//         console.log(error);
//       }
//     },
//   })}

//====================================================================

// function ClickHandler() {
//   const map = useMapEvents({
//     click: async (e) => {
//       setLoading(true);
//       map.getCenter();
//       const lat = map.getCenter().lat;
//       const lng = map.getCenter().lng;
//       console.log(lat, lng);
//       const language = map.getCenter().language;

//       try {
//         const response = await axios.get(
//           `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}&accept-language=${language}`
//         );
//         setLoading(false);
//         let userAddress = response.data.address;

//         let county = userAddress.county ? userAddress.county + "," : "";
//         let State = userAddress.state ? userAddress.state + "," : "";
//         let country = userAddress.country ? userAddress.country + "," : "";
//         let town = userAddress.town ? userAddress.town + "," : "";
//         let district = userAddress.district ? userAddress.district + "," : "";
//         let hamlet = userAddress.hamlet ? userAddress.hamlet + "," : "";
//         let neighbourhood = userAddress.neighbourhood
//           ? userAddress.neighbourhood + ","
//           : "";
//         let village = userAddress.village ? userAddress.village + "," : "";
//         let suburb = userAddress.suburb ? userAddress.suburb + "," : "";
//         let road = userAddress.road ? userAddress.road + "," : "";
//         let amenity = userAddress.amenity ? userAddress.amenity + "," : "";
//         let railway = userAddress.railway ? userAddress.railway + "," : "";
//         let shop = userAddress.shop ? userAddress.shop + "," : "";
//         let leisure = userAddress.leisure ? userAddress.leisure + "," : "";
//         let office = userAddress.office ? userAddress.office + "," : "";
//         let tourism = userAddress.tourism ? userAddress.tourism + "," : "";
//         setAddress(
//           `${country}${State}${county}${suburb}${town}${district}${hamlet}${neighbourhood}${road}${amenity}${railway}${village}${shop}${leisure}${office}${tourism} `
//         );
//       } catch (error) {
//         console.log(error);
//       }
//     },
//   });

//   return null;
// }

//==============================

// function ClickHandler() {
//     useMapEvents({
//       mouseup: async (e) => {
//         setLoading(true);
//         const lat = e.latlng.lat;
//         const lng = e.latlng.lng;
//         console.log(lat, lng);
//         const language = e.latlng.language;

//         try {
//           const response = await axios.get(
//             `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}&accept-language=${language}`
//           );
//           setLoading(false);
//           let userAddress = response.data.address;

//           let county = userAddress.county ? userAddress.county + "," : "";
//           let State = userAddress.state ? userAddress.state + "," : "";
//           // let country = userAddress.country ? userAddress.country + "," : "";
//           let town = userAddress.town ? userAddress.town + "," : "";
//           // let district = userAddress.district ? userAddress.district + "," : "";
//           let hamlet = userAddress.hamlet ? userAddress.hamlet + "," : "";
//           let neighbourhood = userAddress.neighbourhood
//             ? userAddress.neighbourhood + ","
//             : "";
//           let village = userAddress.village ? userAddress.village + "," : "";
//           // let suburb = userAddress.suburb ? userAddress.suburb + "," : "";
//           let road = userAddress.road ? userAddress.road + "," : "";
//           let amenity = userAddress.amenity ? userAddress.amenity + "," : "";
//           let railway = userAddress.railway ? userAddress.railway + "," : "";
//           let shop = userAddress.shop ? userAddress.shop + "," : "";
//           let leisure = userAddress.leisure ? userAddress.leisure + "," : "";
//           let office = userAddress.office ? userAddress.office + "," : "";
//           let tourism = userAddress.tourism ? userAddress.tourism + "," : "";

//           setAddress(
//             `${State}${county}${town}${hamlet}${neighbourhood}${road}${amenity}${railway}${village}${shop}${leisure}${office}${tourism} `
//           );
//         } catch (error) {
//           console.log(error);
//         }
//       },
//     });
//   }
