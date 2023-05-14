import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import MapAddress from "./MapAddress";
import Navbar from "./Navbar";

const Home = () => {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const myParam = params.get("id");
    console.log(`myParam is ${myParam}`);
  }, [window.location.search]);
  return (
    <>
      <Navbar />
      <MapAddress />
    </>
  );
};

export default Home;
