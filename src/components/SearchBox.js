import React from "react";
import { useState } from "react";
import { IoSearch, IoClose } from "react-icons/io5";

const NOMINATIM_BASE_URL = "https://nominatim.openstreetmap.org/search?";

// const params = {
//   q: "",
//   format: "json",
//   addressdetail: "addressdetail",
// };

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
        "accept-language": "language",
      },
    };
    fetch(`${NOMINATIM_BASE_URL}${queryString}`, requestOptions)
      .then((response) => response.text())
      .then((result) => {
        let addressResult = JSON.parse(result);

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
      <div className="flex items-center justify-start border border-2 border-gray-300 bg-white">
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
                    console.log(item.lat, item.lon);
                    setSelectPosition(item);
                  }}
                >
                  {`${item?.address.country ? item?.address.country + "," : ""}
                  ${item?.address.city ? item?.address.city + "," : ""} ${
                    item?.address.road ? item?.address.road + "," : ""
                  } ${
                    item?.address.village ? item?.address.village + "," : ""
                  } `}
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
