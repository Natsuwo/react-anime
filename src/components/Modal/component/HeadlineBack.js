import React from "react";
import UseIconList from "../../Global/SvgList/UseIconList";

const HeadlineBack = ({ title, openModal }) => {
  return (
    <div className="modal-headline-back">
      <span
        onClick={openModal}
        className="modal-headline-back-icon __icon-default"
      >
        <UseIconList icon="chevron-left" />
      </span>
      <h1 className="modal-item-title">{title}</h1>
    </div>
  );
};

export default HeadlineBack;
