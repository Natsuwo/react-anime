import React from "react";
import "./CardList.css";
import { Link } from "react-router-dom";

const CardList = () => {
  return (
    <Link to="#" className="cardlist-wrapper">
      <div className="cardlist-container">
        <div className="cardlist-thumbnail-wrapper">
          <div className="cardlist-thumbnail">
            <img
              src="https://image.p-c2-x.abema-tv.com/image/programs/89-102_s0_p28675/thumb001.png?height=216&quality=75&version=1727325252&width=384"
              alt=""
            />
          </div>
        </div>
        <div className="cardlist-logo-wrapper">
          <div className="cardlist-logo">
            <img
              src="https://image.p-c2-x.abema-tv.com/image/channels/news-plus/logo.png?height=52&quality=30&version=20200413&width=128"
              alt=""
            />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CardList;
