import React from "react";
import "./Select.css";
import UseIconList from "../SvgList/UseIconList";

const Select = ({ id, data = [{}], autocomplete }) => {
  return (
    <div className="select-wrapper">
      <div className="select-container">
        <span className="select-icon">
          <UseIconList icon="arrow-down" />
        </span>
        <div className="select-element">
          <select
            autoComplete={autocomplete}
            name={id}
            id={id}
            className="expiration-date-select"
          >
            {data.map((item) => (
              <option key={item.id} value={item.value}>
                {item.value}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default Select;
