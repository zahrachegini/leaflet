import React from "react";
import { useState } from "react";
import { IoSearch, IoClose } from "react-icons/io5";

const NOMINATIM_BASE_URL = "https://nominatim.openstreetmap.org/search?";

const params = {
  q: encodeURIComponent("نام مکان"),
  format: "json",
  addressdetail: "addressdetail",
};

const SearchBox = (props) => {
  const [showInput, setShowInput] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [listPlace, setListPlace] = useState([]);
  const { selectPosition, setSelectPosition } = props;

  function handleInputClose() {
    setShowInput(false);
  }

  function handleInputOpen() {
    setShowInput(true);
  }

  const handleInput = (e) => {
    setSearchText(e.target.value);
    console.log(e.target.value);
  };

  const searchHandle = () => {
    // Search
    const params = {
      q: searchText,
      format: "json",
      addressdetails: 1,
      polygon_geojson: 0,
    };
    const queryString = new URLSearchParams(params).toString();
    const requestOptions = {
      method: "GET",
      redirect: "follow",
      headers: {
        "accept-language": "fa-FA",
      },
    };
    fetch(`${NOMINATIM_BASE_URL}${queryString}`, requestOptions)
      .then((response) => response.text())
      .then((result) => {
        let addressResult = JSON.parse(result);
        let city = JSON.parse(result)[0].address.city;

        setListPlace(addressResult);
      })
      .catch((err) => console.log("err: ", err));
  };

  return (
    <div
      className="absolute button-auto right-auto left-[10px] top-[20%] flex flex-col items-strech"
      style={{
        zIndex: "999",
      }}
    >
      <div className="flex items-center justify-start border border-2 border-gray-300">
        <form className="">
          {showInput && (
            <div className="flex items-center ">
              <div
                onClick={handleInputClose}
                className="bg-white p-2 cursor-pointer"
              >
                <IoClose />
              </div>
              <input
                type="text"
                className="p-1 outline-none"
                value={searchText}
                onChange={handleInput}
              />
            </div>
          )}
        </form>
        <div onClick={handleInputOpen} className="bg-white p-2 cursor-pointer">
          <IoSearch onClick={() => searchHandle()} />
        </div>
      </div>
      {showInput ? (
        <div className="left-[10px] top-[35px] text-left">
          <ul>
            {listPlace.map((item) => {
              return (
                <li
                  key={item?.place_id}
                  className="border border-2 border-gray-400/60 bg-white p-1"
                  onClick={() => {
                    setSelectPosition(item);
                  }}
                >
                  {`${item?.address.city ? item?.address.city + "," : ""} ${
                    item?.address.road ? item?.address.road : ""
                  } ${item?.address.village ? item?.address.village : ""} `}
                </li>
              );
            })}
          </ul>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default SearchBox;

{
  /* <div className="flex justify-end flex-col absolute button-auto right-auto left-[10px] top-[19%] w-1/3">
      <div
        className="button-auto right-auto flex items-center justify-start border border-2 border-gray-400/60"
        style={{
          zIndex: "999",
        }}
      >
        <form className="">
          {showInput && (
            <div className="flex items-center bg-red-500">
              <div
                onClick={handleInputClose}
                className="bg-white p-2 cursor-pointer"
              >
                <IoClose />
              </div>
              <input
                type="text"
                className="p-1 outline-none"
                value={searchText}
                onChange={handleInput}
              />
            </div>
          )}
        </form>
        <div onClick={handleInputOpen} className="bg-white p-2 cursor-pointer">
          <IoSearch />
        </div>
      </div>
      <div
        style={{
          zIndex: "999",
        }}
      >
        <ul
        // className="button-auto right-auto left-[10px]"
        >
          <li className="border border-2 border-gray-400/60 bg-white p-1">
            tehran
          </li>
          <li>tehran tehran </li>
          <li>tehran</li>
          <li>tehran</li>
          <li>tehran</li>
        </ul>
      </div>
    </div> */
}
