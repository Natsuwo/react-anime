import React from "react";
import "./CardList.css";
import { Link } from "react-router-dom";
import CategoryTag from "../../../Global/CategoryTag/CategoryTag";

const CardList = ({ props }) => {
  return (
    <Link to={`/video/detail/${props?.id}`} className="cardlist-wrapper">
      <div className="cardlist-container">
        <div className="cardlist-thumbnail-wrapper">
          <div className="cardlist-thumbnail">
            <img
              src={props?.highlighted_thumbnail}
              alt={props?.title + " thumbnail"}
            />
          </div>
        </div>
        <div className="cardlist-logo-wrapper">
          <div className="cardlist-logo">
            <CategoryTag type={props?.category_id && props?.category_id[0]} />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CardList;
