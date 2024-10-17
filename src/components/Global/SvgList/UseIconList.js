import React from "react";
import IconList from "./IconList";

const UseIconList = ({
  className = "",
  icon,
  width = "100%",
  height = "100%",
}) => {
  return (
    <svg
      aria-label=""
      className={className}
      aria-hidden="true"
      width={width}
      height={height}
      role="img"
      focusable="false"
    >
      <use xlinkHref={`${IconList[icon]}#svg-${icon}`}></use>
    </svg>
  );
};

export default UseIconList;
