import React from "react";
import Background from "../Components/Background";
import SelectCard from "../Components/SelectCard";
import { memo } from "react";
import Alert from "../Components/Alert";
// import ShapeChangingLoader from "../Components/loader";
import HeroText from "../Components/HeroText";

// console.log("Checkpoint",User);
const Home = () => {
  const User = JSON.parse(localStorage.getItem("user"));
  return (
    <div >
      <Background/>
      <HeroText/>
      <SelectCard />

    </div>
  );
};
export default memo(Home);