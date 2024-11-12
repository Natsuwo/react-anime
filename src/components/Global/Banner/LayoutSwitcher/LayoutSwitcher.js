import React from "react";
import "./LayoutSwitcher.css";
import UseIconList from "../../SvgList/UseIconList";

const LayoutSwitcher = ({ isSwitcher, handleSwitch }) => {
  return (
    <div className="layout-switcher-wrapper">
      <div className="layout-switcher">
        <div
          onClick={() => handleSwitch(0)}
          className={`preview${isSwitcher === 0 ? " active" : ""}`}
        >
          <button className="switch">
            <UseIconList icon="content-preview" />
            Slide
          </button>
        </div>
        <div
          onClick={() => handleSwitch(1)}
          className={`list${isSwitcher === 1 ? " active" : ""}`}
        >
          <button className="switch">
            <UseIconList icon="genre" />
            List
          </button>
        </div>
      </div>
    </div>
  );
};

export default LayoutSwitcher;
