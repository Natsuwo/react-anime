import React from "react";
import "./Breadcumb.css";
import UseIconList from "../SvgList/UseIconList";

const Breadcumb = () => {
  return (
    <div className="breadcrumb-wrapper">
      <ul className="breadcrumbs">
        <li>Home</li>
        <li>
          <div className="breadcrumb-icon">
            <UseIconList icon="chevron-right" />
          </div>
          <span className="breadcumb-text">Korean</span>
        </li>
        <li>
          <div className="breadcrumb-icon">
            <UseIconList icon="chevron-right" />
          </div>
          <span className="breadcumb-text">誘惑</span>
        </li>
      </ul>
    </div>
  );
};

export default Breadcumb;
