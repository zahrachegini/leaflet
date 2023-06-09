import React, { useState } from "react";
import MyMap from "./MyMap";
import { useMapEvents } from "react-leaflet";
import axios from "axios";
import marker from "../assets/images/marker.png";

import SearchBox from "./SearchBox";

const MapAddress = (props) => {
  const [address, setAddress] = useState();
  const [postalCode, setPostalCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectPosition, setSelectPosition] = useState(null);

  const handleChangePostalCode = (e) => {
    setPostalCode(e.target.value);
  };

  const handleChangeAddress = (e) => {
    setAddress(e.target.value);
  };

  function ClickHandler() {
    const map = useMapEvents({
      click: async (e) => {
        handleEvent(e);
        console.log("click");
      },
      mouseup: async (e) => {
        handleEvent(e);
        console.log("UP");
      },
    });

    const handleEvent = async (e) => {
      setLoading(true);
      map.getCenter();
      const lat = map.getCenter().lat;
      const lng = map.getCenter().lng;
      console.log(lat, lng);
      const language = map.getCenter().language;

      try {
        const response = await axios.get(
          `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}&accept-language=${language}`
        );
        setLoading(false);
        let userAddress = response.data.address;

        let county = userAddress.county ? userAddress.county + "," : "";
        let State = userAddress.state ? userAddress.state + "," : "";
        // let country = userAddress.country ? userAddress.country + "," : "";
        let town = userAddress.town ? userAddress.town + "," : "";
        // let district = userAddress.district ? userAddress.district + "," : "";
        let hamlet = userAddress.hamlet ? userAddress.hamlet + "," : "";
        let neighbourhood = userAddress.neighbourhood
          ? userAddress.neighbourhood + ","
          : "";
        let village = userAddress.village ? userAddress.village + "," : "";
        // let suburb = userAddress.suburb ? userAddress.suburb + "," : "";
        let road = userAddress.road ? userAddress.road + "," : "";
        let amenity = userAddress.amenity ? userAddress.amenity + "," : "";
        let railway = userAddress.railway ? userAddress.railway + "," : "";
        let shop = userAddress.shop ? userAddress.shop + "," : "";
        let leisure = userAddress.leisure ? userAddress.leisure + "," : "";
        let office = userAddress.office ? userAddress.office + "," : "";
        let tourism = userAddress.tourism ? userAddress.tourism + "," : "";
        setAddress(
          `${State}${county}${town}${hamlet}${neighbourhood}${road}${amenity}${railway}${village}${shop}${leisure}${office}${tourism} `
        );
      } catch (error) {
        console.log(error);
      }
    };

    return null;
  }

  return (
    <div className="container mx-auto border border-teal-600 mt-4 p-3 rounded-lg grid md:grid-cols-3 gap-4">
      <div className="relative md:col-span-2">
        <MyMap ClickHandler={ClickHandler} selectPosition={selectPosition} />

        <div className="absolute flex left-[50%] bottom-[50%]">
          <img
            src={marker}
            className=" cursor-pointer"
            alt="marker"
            style={{
              zIndex: "999",
            }}
          />
        </div>

        <SearchBox
          selectPosition={selectPosition}
          setSelectPosition={setSelectPosition}
        />
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
