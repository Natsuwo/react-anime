import React from "react";
import "./YureiLoading.css";
import { ReactComponent as YureiLogo } from "../../../assets/images/yurei/yurei.svg";
import { ReactComponent as YureiLogoCompleted } from "../../../assets/images/yurei/yurei_oowarai.svg";

const YureiLoading = ({ width, height, type = "spin" }) => {
  return (
    <div
      className={`yurei-logo-loading-wrapper ${type}`}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <YureiLogo width={width} height={height} className="yurei-logo-loading" />
    </div>
  );
};

export default YureiLoading;
