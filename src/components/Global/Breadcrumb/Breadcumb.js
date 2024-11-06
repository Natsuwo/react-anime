import React from "react";
import "./Breadcumb.css";
import UseIconList from "../SvgList/UseIconList";
import { Link } from "react-router-dom";

const Breadcumb = ({ items = [] }) => {
  return (
    <div className="breadcrumb-wrapper">
      <ul className="breadcrumbs">
        <li>
          <Link to={"/"}>
            <span className="breadcumb-text">Home</span>
          </Link>
        </li>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return !isLast ? (
            <li key={index}>
              <div className="breadcrumb-icon">
                <UseIconList icon="chevron-right" />
              </div>
              <Link to={item.url}>
                <span className="breadcumb-text">{item.title}</span>
              </Link>
            </li>
          ) : (
            <li key={index}>
              <div className="breadcrumb-icon">
                <UseIconList icon="chevron-right" />
              </div>
              <span className="breadcumb-text">{item.title}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Breadcumb;
