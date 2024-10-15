import React from "react";

const UseIconList = ({ icon, tag, width = 24, height = 24 }) => {
  return (
    <svg
      aria-label=""
      aria-hidden="true"
      width={width}
      height={height}
      role="img"
      focusable="false"
    >
      <use xlinkHref={`${icon}#svg-${tag}`}></use>
    </svg>
  );
};

export default UseIconList;
