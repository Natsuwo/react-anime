import React, { useEffect, useState } from "react";
import { CardSkeleton, CardVideo } from "../Card/Card";
import "./Recommend.css";

const Recommend = ({ title, value, loading }) => {
  return (
    <div className="main-recommend-wrapper">
      <h3>{title}</h3>
      <div className="recommend-inner">
        {value?.map((item, index) => (
          <div key={index} className="recommend-item">
            <CardVideo
              title={item.title}
              video_id={item.id}
              thumbnail_url={item.thumbnail_url}
              highlighted_thumbnail={item.highlighted_thumbnail}
              props={item}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Recommend;
