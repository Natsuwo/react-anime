import React from "react";
import "./Tooltip.css";

const Tooltip = ({
  condition,
  textTrue,
  textFalse,
  position = "left",
  style,
}) => {
  return (
    <div className={`main-tooltip tooltip-${position}`}>
      <span style={style} className="tooltip-text">
        {condition ? textTrue : textFalse}
      </span>
    </div>
  );
};

export default Tooltip;
