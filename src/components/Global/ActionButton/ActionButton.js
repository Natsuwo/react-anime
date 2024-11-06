import React from "react";
import "./ActionButton.css";
import UseIconList from "../SvgList/UseIconList";
import Tooltip from "../../Global/Tooltip/Tooltip";
import { UseMyListContext } from "../../../context/MyListContext";

const ActionButton = ({ items }) => {
  const {
    video_id,
    last_modified_date,
    upload_date,
    title,
    highlighted_thumbnail,
    thumbnail_url,
  } = items;
  const arrAction = [
    { title: "X", icon: "social-x" },
    { title: "Facebook", icon: "facebook" },
  ];
  const { addToList, handleAddToList } = UseMyListContext();
  const handleClick = async (e) => {
    e.stopPropagation();
    await handleAddToList(video_id, {
      last_modified_date,
      upload_date,
      id: video_id,
      video_id,
      title,
      highlighted_thumbnail: highlighted_thumbnail
        ? highlighted_thumbnail
        : thumbnail_url,
    });
  };
  return (
    <ul className="detail-action-list">
      <li>
        <div className="detail-button-wrapper">
          <button
            onClick={(e) => (addToList ? handleClick(e) : null)}
            className={`btn-tooltip detail-button add-to-list${
              addToList && addToList[video_id] ? " added" : ""
            }`}
          >
            <Tooltip
              condition={addToList && addToList[video_id]}
              textTrue={"Remove to My List"}
              textFalse={"Add to My List"}
              position={"center"}
            />
            {console.log(addToList && addToList[video_id])}
            <UseIconList
              width="24px"
              height="24px"
              icon={addToList && addToList[video_id] ? "done" : "add"}
            ></UseIconList>
          </button>
          <span className="title">My List</span>
        </div>
      </li>
      {arrAction.map((item, index) => (
        <li key={index}>
          <div className="detail-button-wrapper">
            <button className={`detail-button ${item.icon}`}>
              <UseIconList
                width="24px"
                height="24px"
                icon={item.icon}
              ></UseIconList>
            </button>
            <span className="title">{item.title}</span>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default ActionButton;
