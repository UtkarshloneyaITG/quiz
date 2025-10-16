import React from "react";
import Background from "../Components/Background";
import SelectCard from "../Components/SelectCard";
import { memo } from "react";
import HeroText from "../Components/HeroText";

const Home = () => {
  return (
    <div >
      <Background/>
      <HeroText/>
      <SelectCard />

    </div>
  );
};

export default memo(Home);
