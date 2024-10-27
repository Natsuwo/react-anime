import React from "react";
import UseIconList from "../SvgList/UseIconList";

const PlanOption = ({ title, lists = [{}] }) => {
  return (
    <>
      <div className="promote-plan-title">{title}</div>
      <ul className="plan-list">
        {lists.map((item, index) => (
          <li key={index} className="plan-list-item">
            <span className="promote-plan-icon">
              <UseIconList
                className={item.check ? "__text-active" : ""}
                icon={item.check ? "done" : "close"}
              />
            </span>
            <span className="plan-list-text">{item.option}</span>
          </li>
        ))}
      </ul>
    </>
  );
};

export default PlanOption;
