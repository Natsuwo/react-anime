import React from "react";
import { CardVideo } from "../Card/Card";
import "./Recommend.css";
import Skeleton from "../Skeleton/Skeleton";

const Recommend = ({ title, value, loading = true }) => {
  const preLoadingData = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    value: i + 1,
  }));
  return (
    <div className="main-recommend-wrapper ">
      <h3>{title}</h3>
      <div className="recommend-inner">
        {loading &&
          preLoadingData.map((item, index) => (
            <Skeleton key={index} width={226} height={127} />
          ))}
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
