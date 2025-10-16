import React from "react";
import Background from "../Components/Background";
import SelectCard from "../Components/SelectCard";
import { memo } from "react";

const Home = () => {
  return (
    <div>
      <Background/>
      <SelectCard />

    </div>
  );
};

export default memo(Home);
