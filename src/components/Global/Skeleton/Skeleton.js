import React from "react";
import "./Skeleton.css";

const Skeleton = ({
  width = "100%",
  height = "100%",
  rounded,
  borderRadius,
  children,
}) => {
  return (
    <div
      className="skeleton-card loading"
      style={{ width, height, borderRadius: rounded ? "50%" : borderRadius }}
    >
      <div className="skeleton"></div>
      {children}
    </div>
  );
};

export default Skeleton;
