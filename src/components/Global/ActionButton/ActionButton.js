import React, { useMemo } from "react";
import "./ActionButton.css";
import UseIconList from "../SvgList/UseIconList";
import Tooltip from "../Tooltip/Tooltip";
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

  const type = useMemo(() => {
    return items.highlighted_thumbnail ? "videos" : "episodes";
  }, [items.highlighted_thumbnail]);

  const isAddedToList = useMemo(
    () => addToList?.[type]?.[id],
    [addToList, id, type]
  );

  const handleClick = async (e) => {
    e.stopPropagation();
    handleToast(true);
    handleToastCondition(!isAddedToList);
    await handleAddToList(id, type);
  };

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
