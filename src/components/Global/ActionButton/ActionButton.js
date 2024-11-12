import React, { useEffect, useMemo, useState } from "react";
import "./ActionButton.css";
import UseIconList from "../SvgList/UseIconList";
import Tooltip from "../../Global/Tooltip/Tooltip";
import { UseMyListContext } from "../../../context/MyListContext";
import { UseToastMyListContext } from "../../../context/ToastMyListContext";

const ActionButton = ({ items }) => {
  const { id } = items;
  const { handleToast, handleToastCondition } = UseToastMyListContext();
  const arrAction = [
    { title: "X", icon: "social-x" },
    { title: "Facebook", icon: "facebook" },
  ];
  const { addToList, handleAddToList } = UseMyListContext();
  const handleClick = async (e) => {
    e.stopPropagation();
    handleToast(true);
    await handleAddToList(id, "videos");
  };

  const isAddedToList = useMemo(() => addToList?.videos?.[id], [addToList, id]);

  useEffect(() => {
    if (isAddedToList) {
      handleToastCondition(true);
    } else {
      handleToastCondition(false);
    }
  }, [isAddedToList]);
  return (
    <>
      <ul className="detail-action-list">
        <li>
          <div className="detail-button-wrapper">
            <button
              onClick={(e) => (addToList ? handleClick(e) : null)}
              className={`btn-tooltip detail-button add-to-list${
                isAddedToList ? " added" : ""
              }`}
            >
              <Tooltip
                condition={isAddedToList}
                textTrue={"Remove to My List"}
                textFalse={"Add to My List"}
                position={"center"}
              />
              <UseIconList
                width="24px"
                height="24px"
                icon={isAddedToList ? "done" : "add"}
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
    </>
  );
};

export default ActionButton;
