import React from "react";
import "./FirstLoading.css";
import YureiLoading from "../YureiLoading/YureiLoading";
import { ReactComponent as LoadingIcon } from "../../../assets/images/icons/player/loading.svg";

const FirstLoading = () => {
  return (
    <div className="main-first-loading">
      <div className="first-loading-content">
        <div className="first-loading-logo">
          <YureiLoading className="first-loading-yurei" type="sway" />
        </div>
        <p>Hello! Just a moment...</p>
        <div className="first-loading-icon">
          <LoadingIcon />
        </div>
      </div>
    </div>
  );
};

export default FirstLoading;
