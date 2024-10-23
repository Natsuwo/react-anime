import React, { useState } from "react";
import "./Navbar.css";
import { NavLink } from "react-router-dom";
import UseIconList from "../SvgList/UseIconList";
import { UseToggleContext } from "../../../context/ToggleContext";
import AccountBar from "./AccountBar";

const Navbar = () => {
  const { nav, toggleNav } = UseToggleContext();
  const [delayHover, setDelayHover] = useState(null);
  const [hovered, setHovered] = useState(false);

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
        </ul>
        <AccountBar />
      </div>
    </aside>
  );
};

export default Navbar;
