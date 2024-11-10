import React, { useState } from "react";
import "./Navbar.css";
import { Link, NavLink } from "react-router-dom";
import UseIconList from "../SvgList/UseIconList";
import { UseToggleContext } from "../../../context/ToggleContext";
import AccountBar from "./AccountBar";
import { UseCategoryContext } from "../../../context/CategoryContext";

const Navbar = () => {
  const { nav, toggleNav } = UseToggleContext();
  const [delayHover, setDelayHover] = useState(null);
  const [hovered, setHovered] = useState(false);
  const { categoryList } = UseCategoryContext();

  const handleHover = (state) => {
    if (nav !== hovered) {
      clearTimeout(delayHover);
      setDelayHover(
        setTimeout(() => {
          setHovered(state);
          if (state === nav) {
            toggleNav();
          }
        }, 1000)
      );
    }
  };

  const arrMenu = [
    { id: 1, title: "Home", icon: "home", href: "/" },
    { id: 2, title: "MyList", icon: "done", href: "/mylist" },
    { id: 3, title: "History", icon: "history", href: "/history" },
  ];
  return (
    <aside
      onMouseEnter={() => handleHover(true)}
      onMouseLeave={() => handleHover(false)}
      className={`main-navbar${nav ? " active" : ""}`}
    >
      <div className="sidebar-wrapper">
        <div className="sidebar-main-list">
          <ul className="navbar-menu">
            {arrMenu.map((item) => (
              <li key={item.id}>
                <NavLink to={item.href}>
                  <div className="navbar-item">
                    <span className="navbar-icon">
                      <UseIconList icon={item.icon} />
                    </span>
                    <span className="navbar-text-under-icon">{item.title}</span>
                  </div>
                  <span className="navbar-text">{item.title}</span>
                </NavLink>
              </li>
            ))}
            <li className="menu-disable-link menu-overline">
              <div className="disalbed-link">
                <div className="navbar-item ">
                  <span className="navbar-icon">
                    <UseIconList icon={"genre"} />
                  </span>
                  <span className="navbar-text-under-icon">Genre</span>
                </div>
                <span className="navbar-text">Genre</span>
              </div>
            </li>
          </ul>
          <div className="sub-menu-wrapper">
            <div className="sub-menu-collapsible-wrapper">
              <div className="sub-menu-collapsible-inner">
                <ul className="sub-menu-list">
                  {categoryList &&
                    categoryList.map((item, index) => (
                      <li key={index} className="sub-menu-item">
                        <NavLink
                          to={`/genre/${item.slug}`}
                          className="link-block"
                        >
                          <div className="sub-menu-item-content">
                            <div className="sub-menu-item-content-icon"></div>
                            <div
                              className="sub-menu-item-content-text clamp-text"
                              style={{ WebkitLineClamp: 1 }}
                            >
                              {item.name}
                            </div>
                          </div>
                        </NavLink>
                      </li>
                    ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
        <AccountBar />
      </div>
    </aside>
  );
};

export default Navbar;
