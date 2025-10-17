import React from "react";

function Loading() {
  return (
    <>
      <div className="w-full absolute top-[50%] left-[50%] transform translate-x-[-50%] translate-y-[-50%] h-full flex justify-center items-center">
        <div className="w-12 h-12 relative m-auto loader-animation" />
      </div>
    </>
  );
}

export default Loading;
