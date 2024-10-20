import React from "react";
import "./ActionButton.css";
import UseIconList from "../SvgList/UseIconList";

const ActionButton = () => {
  const arrAction = [
    { title: "X", icon: "social-x" },
    { title: "Facebook", icon: "facebook" },
  ];
  return (
    <ul className="detail-action-list">
      <li>
        <div className="detail-button-wrapper">
          <button className={`detail-button add-to-list`}>
            <UseIconList width="24px" height="24px" icon="add"></UseIconList>
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
