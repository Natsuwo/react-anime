import React from "react";
import "./Tooltip.css";

const Tooltip = ({ condition, textTrue, textFalse, position = "left" }) => {
  return (
    <div className={`player-tooltip tooltip-${position}`}>
      <span className="tooltip-text">{condition ? textTrue : textFalse}</span>
    </div>
  );
};

export default Tooltip;
