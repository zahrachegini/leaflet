import React from "react";
import MarkersMap from "./MyMap";

const MapAddress = () => {
  return (
    // <MyMap />
    <div className="container mx-auto border border-teal-600 mt-10 p-3 rounded">
      <div>
        <MarkersMap />
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
