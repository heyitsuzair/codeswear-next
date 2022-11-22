import React from "react";
import LoadingBar from "react-top-loading-bar";
const ProgressBar = ({ progress }) => {
  return (
    <LoadingBar
      waitingTime={300}
      shadow={true}
      color={"#ff63db"}
      progress={progress}
      height={3}
    />
  );
};

export default ProgressBar;
