import React, { useState } from "react";
import MyMap from "./MyMap";
import { useMapEvents } from "react-leaflet";
import axios from "axios";
import marker from "../assets/images/marker.png";
import { IoSearch, IoClose } from "react-icons/io5";

const MapAddress = () => {
  const [address, setAddress] = useState();
  const [postalCode, setPostalCode] = useState("");
  const [showInput, setShowInput] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChangePostalCode = (e) => {
    setPostalCode(e.target.value);
  };

  const handleChangeAddress = (e) => {
    setAddress(e.target.value);
  };

  function ClickHandler() {
    useMapEvents({
      click: async (e) => {
        setLoading(true);
        const lat = e.latlng.lat;
        const lng = e.latlng.lng;
        const language = e.latlng.language;

        try {
          const response = await axios.get(
            `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}&accept-language=${language}`
          );
          setLoading(false);
          let userAddress = response.data.address;

          let county = userAddress.county ? userAddress.county + "," : "";
          let State = userAddress.state ? userAddress.state + "," : "";
          let country = userAddress.country ? userAddress.country + "," : "";
          let town = userAddress.town ? userAddress.town + "," : "";
          let district = userAddress.district ? userAddress.district + "," : "";
          let hamlet = userAddress.hamlet ? userAddress.hamlet + "," : "";
          let neighbourhood = userAddress.neighbourhood
            ? userAddress.neighbourhood + ","
            : "";
          let suburb = userAddress.suburb ? userAddress.suburb + "," : "";
          let road = userAddress.road ? userAddress.road + "," : "";
          setAddress(
            `${country}${State}${county}${suburb}${town}${district}${hamlet}${neighbourhood}${road} `
          );
        } catch (error) {
          console.log(error);
        }
      },
    });

    return null;
  }

  function handleInputClose() {
    setShowInput(false);
  }

  function handleInputOpen() {
    setShowInput(true);
  }

  const mouseLeave = () => {
    alert("It's me");
  };

  return (
    <div className="container mx-auto border border-teal-600 mt-4 p-3 rounded-lg grid md:grid-cols-3 gap-4">
      <div className="relative md:col-span-2">
        <MyMap ClickHandler={ClickHandler} />
        <div>
          <img
            src={marker}
            className="absolute button-auto right-auto left-[50%] top-[40%] cursor-pointer"
            alt="marker"
            style={{
              zIndex: "999",
            }}
          />
        </div>

        <div
          className="absolute button-auto right-auto left-[10px] top-[20%] flex items-center justify-start border border-2 border-gray-300"
          style={{
            zIndex: "999",
          }}
        >
          <form className="">
            {showInput && (
              <div className="flex items-center ">
                <div
                  onClick={handleInputClose}
                  className="bg-white p-2 cursor-pointer"
                >
                  <IoClose />
                </div>
                <input type="text" className="p-1 outline-none" />
              </div>
            )}
          </form>
          <div
            onClick={handleInputOpen}
            className="bg-white p-2 cursor-pointer"
          >
            <IoSearch />
          </div>
        </div>
      </div>
      <div>
        <form>
          <div>
            <label className="block text-lx font-bold mt-2">آدرس</label>

            <textarea
              value={loading ? "در حال جستجو..." : address}
              type="text"
              className="border-2 border-teal-600 rounded-lg w-full  p-3 focus:outline-teal-600 mt-2"
              rows="4"
              onChange={handleChangeAddress}
            />
          </div>
          <div className="my-4">
            <label className="block text-lx font-bold">کد پستی</label>
            <input
              onChange={handleChangePostalCode}
              type="text"
              className="border-2 border-teal-600 rounded-lg w-full  p-3 focus:outline-teal-600 mt-2"
            />
          </div>

          <button className="bg-teal-600 text-slate-50 rounded-lg w-full  p-3 mt-2 text-lx font-bold">
            ارسال فایل
          </button>
        </form>
      </div>
    </div>
  );
};

export default MapAddress;
