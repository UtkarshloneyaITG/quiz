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
  console.log("user hello");
  return (
    <div>{
      User?
      <>
      {/* <Alert message={"Welcome" + User.fullName} color="#006400" /> */}
      <Background/>
      <HeroText/>
      <SelectCard />
      </>
   :    <div>
      <Alert message={"Welcome NewBie"} color="#CE2029"/>
      <Background/>
      <HeroText/>
      <SelectCard />
    </div>}</div>
);
};
export default memo(Home);
