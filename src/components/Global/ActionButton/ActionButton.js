import React, { useState } from "react";
import "./ActionButton.css";
import UseIconList from "../SvgList/UseIconList";
import Tooltip from "../../Global/Tooltip/Tooltip";
import { UseMyListContext } from "../../../context/MyListContext";
import ModalAlert from "../../Modal/ModalAlert";
import { Link } from "react-router-dom";

const ActionButton = ({ items }) => {
  const [isVisible, setIsVisible] = useState(false);
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
    setIsVisible(true);
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
    <>
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
      <ModalAlert visible={isVisible} setVisible={setIsVisible}>
        <div
          style={{
            display: "flex",
            gap: "16px",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {addToList[video_id] ? (
            <>
              <p> This video has been added into My List </p>
              <button className="btn btn-black">
                <Link to="/mylist">Check it</Link>
              </button>
            </>
          ) : (
            <p>This video has been delete from My List</p>
          )}
        </div>
      </ModalAlert>
    </>
  );
};

export default ActionButton;
