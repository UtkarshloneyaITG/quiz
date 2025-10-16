import React, { Suspense } from "react";
import Loading from "../sharedComponents/Loding";

const LazyLoad = ({ children }) => {
  return <Suspense fallback={<Loading />}>{children}</Suspense>;
};

export default LazyLoad;
