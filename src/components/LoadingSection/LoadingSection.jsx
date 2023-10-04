import React from "react";
import { ScaleLoader } from "react-spinners";

const LoadingSection = () => {
  return (
    <div className="w-full h-[200px] flex items-center justify-center">
      <ScaleLoader color="rgb(234 179 8)" />
    </div>
  );
};

export default LoadingSection;
