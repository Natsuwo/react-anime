import React, { useMemo, useState } from "react";
import "./ActionButton.css";
import UseIconList from "../SvgList/UseIconList";
import Tooltip from "../../Global/Tooltip/Tooltip";
import { UseMyListContext } from "../../../context/MyListContext";
import ModalAlert from "../../Modal/ModalAlert";
import { Link } from "react-router-dom";

const ActionButton = ({ items }) => {
  const { id } = items;
  const [isVisible, setIsVisible] = useState(false);
  const arrAction = [
    { title: "X", icon: "social-x" },
    { title: "Facebook", icon: "facebook" },
  ];
  const { addToList, handleAddToList } = UseMyListContext();
  const handleClick = async (e) => {
    e.stopPropagation();
    setIsVisible(true);
    await handleAddToList(id, "videos");
  };

  const isAddedToList = useMemo(() => addToList?.videos?.[id], [addToList, id]);
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
      <ModalAlert visible={isVisible} setVisible={setIsVisible}>
        <div
          style={{
            display: "flex",
            gap: "16px",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {isAddedToList ? (
            <>
              <p> This video has been added into My List </p>
              <Link to="/mylist">
                <button className="btn btn-black">Check it</button>
              </Link>
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
