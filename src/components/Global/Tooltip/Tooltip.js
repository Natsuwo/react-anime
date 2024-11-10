import React from "react";
import "./Tooltip.css";
import { isMobile } from "react-device-detect";

const Tooltip = ({
  condition,
  textTrue,
  textFalse,
  position = "left",
  style,
}) => {
  return (
    <>
      {!isMobile && (
        <div className={`main-tooltip tooltip-${position}`}>
          <span style={style} className="tooltip-text">
            {condition ? textTrue : textFalse}
          </span>
        </div>
      )}
    </>
  );
};

export default Tooltip;
