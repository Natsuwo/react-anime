import React from "react";
import UseIconList from "../../Global/SvgList/UseIconList";

const Alert = ({ title, children }) => {
  return (
    <div className="modal-alert">
      <span className="modal-alert-headline">
        <span className="modal-alert-icon">
          <UseIconList icon="error" />
        </span>
        <span className="modal-alert-title">{title}</span>
      </span>
      <span className="modal-alert-content">{children}</span>
    </div>
  );
};

export default Alert;
