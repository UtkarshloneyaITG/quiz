import React from "react";
import Background from "../Components/Background";
import SelectCard from "../Components/SelectCard";
import { memo } from "react";
// import ShapeChangingLoader from "../Components/loader";

const Home = () => {
  return (
    <div>
      {/* <ShapeChangingLoader /> */}
      <Background />
      <SelectCard />
    </div>
  );
};

export default memo(Home);
