import React from "react";
import "./Skeleton.css";

const Skeleton = ({
  customStyle,
  className,
  width = "100%",
  height = "100%",
  rounded,
  borderRadius,
  children,
  horizontal = true,
}) => {
  return (
    <div
      className={`skeleton-card loading ${className ? className : ""}`}
      style={{
        width: width,
        height: height,
        borderRadius: rounded ? "50%" : borderRadius,
        ...customStyle,
      }}
    >
      <div className={`skeleton${horizontal ? " horizontal" : " vertical"}`}>
        <div className="skeleton-children">{children}</div>
      </div>
    </div>
  );
};

export default Skeleton;
