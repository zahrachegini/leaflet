import React from "react";
import logodeka from "../assets/images/logodeka.svg";
const Navbar = () => {
  return (
    <div className="shadow-md">
      <div className="container flex items-center h-24 px-2 md:px-14">
        <div className="flex items-center justify-around gap-4">
          <img src={logodeka} alt="دکا" />
        </div>
        <div className="grid pr-2">
          <span className=" text-xl font-bold text-teal-600">دکا</span>
          <span className=" text-xl font-bold text-teal-600">
            ربات پاسخگوی خودکار
          </span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
