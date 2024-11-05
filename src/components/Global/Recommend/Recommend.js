import React from "react";
import { CardVideo } from "../Card/Card";
import "./Recommend.css";

const Recommend = ({ title, value }) => {
  return (
    <div className="main-recommend-wrapper ">
      <h3>{title}</h3>
      <div className="recommend-inner">
        {value?.map((item, index) => (
          <div key={index} className="recommend-item">
            <CardVideo
              title={item.title}
              video_id={item.id}
              highlighted_thumbnail={item.highlighted_thumbnail}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Recommend;
