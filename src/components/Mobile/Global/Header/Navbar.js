import React from "react";
import { Link, NavLink } from "react-router-dom";
import { UseCategoryContext } from "../../../../context/CategoryContext";

const Navbar = () => {
  const { categoryList } = UseCategoryContext();
  return (
    <ul className="mobile-nav-bar">
      <li>
        <NavLink className="mobile-nav-item-link" to="/">
          Home
        </NavLink>
      </li>
      {categoryList &&
        categoryList.map((item, index) => (
          <li key={index}>
            <NavLink
              to={`/genre/${item.slug}`}
              className="mobile-nav-item-link"
            >
              {item.name}
            </NavLink>
          </li>
        ))}
    </ul>
  );
};

export default Navbar;
