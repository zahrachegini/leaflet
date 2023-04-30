import React, { useState } from "react";
import MyMap from "./MyMap";
import { useMapEvents } from "react-leaflet";
import axios from "axios";
import marker from "../assets/images/marker.png";

const MapAddress = () => {
  const [address, setAddress] = useState([]);

  function ClickHandler() {
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
          let userAddress = response.data.address;
          setAddress(userAddress.county);
        } catch (error) {
          console.log(error);
        }
      },
    });

    return null;
  }
  return (
    <div className="container mx-auto border border-teal-600 mt-10 p-3 rounded">
      <div className="relative">
        <MyMap ClickHandler={ClickHandler} />
        <div>
          <img
            src={marker}
            className="absolute button-auto right-auto left-[50%] top-[40%]"
            alt="marker"
            style={{
              zIndex: "999",
            }}
          />
        </div>
      </div>
      <div>
        <form>
          <div className="my-8">
            <label className="block text-lx font-bold">کد پستی</label>
            <input
              type="text"
              className="border-2 border-teal-600 rounded w-full md:w-1/3 p-3 focus:outline-teal-600 mt-2"
            />
          </div>
          <div>
            <label className="block text-lx font-bold">آدرس</label>
            <textarea
              value={address}
              type="text"
              className="border-2 border-teal-600 rounded w-full md:w-1/3 p-3 focus:outline-teal-600 mt-2"
              rows="4"
            />
          </div>
          <button className="bg-teal-600 text-slate-50 rounded w-full md:w-1/3 p-3 mt-2 text-lx font-bold">
            ارسال فایل
          </button>
        </form>
      </div>
    </div>
  );
};

export default MapAddress;
