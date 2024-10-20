import React from "react";
import { CardVideo } from "../Card/Card";
import "./Recommend.css";

const Recommend = ({ title }) => {
  return (
    <div className="main-recommend-wrapper ">
      <h3>{title}</h3>
      <div className="recommend-inner">
        <div className="recommend-item">
          <CardVideo title="Hello world" />
        </div>
        <div className="recommend-item">
          <CardVideo title="Hello world" />
        </div>
        <div className="recommend-item">
          <CardVideo title="Hello world" />
        </div>
        <div className="recommend-item">
          <CardVideo title="Hello world" />
        </div>
        <div className="recommend-item">
          <CardVideo title="Hello world" />
        </div>
        <div className="recommend-item">
          <CardVideo title="Hello world" />
        </div>
        <div className="recommend-item">
          <CardVideo title="Hello world" />
        </div>
        <div className="recommend-item">
          <CardVideo title="Hello world" />
        </div>
      </div>
    </div>
  );
};

export default Recommend;
