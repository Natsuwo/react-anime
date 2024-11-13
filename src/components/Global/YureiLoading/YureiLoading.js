import React from "react";
import "./YureiLoading.css";
import { ReactComponent as YureiPurple } from "../../../assets/images/yurei/yurei.svg";
import { ReactComponent as YureiGreen } from "../../../assets/images/yurei/yurei_oowarai.svg";
import { ReactComponent as YureiBlack } from "../../../assets/images/yurei/yurei_black.svg";
import { ReactComponent as YureiCry } from "../../../assets/images/yurei/yurei_cry.svg";

const YureiLoading = ({
  style,
  width,
  height,
  type = "spin",
  model = "purple",
}) => {
  return (
    <div
      className={`yurei-logo-loading-wrapper ${type}`}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        ...style,
      }}
    >
      {model === "purple" && (
        <YureiPurple
          width={width}
          height={height}
          className="yurei-logo-loading"
        />
      )}
      {model === "black" && (
        <YureiBlack
          width={width}
          height={height}
          className="yurei-logo-loading"
        />
      )}
      {model === "green" && (
        <YureiGreen
          width={width}
          height={height}
          className="yurei-logo-loading"
        />
      )}
      {model === "cry" && (
        <YureiCry
          width={width}
          height={height}
          className="yurei-logo-loading"
        />
      )}
    </div>
  );
};

export default YureiLoading;
