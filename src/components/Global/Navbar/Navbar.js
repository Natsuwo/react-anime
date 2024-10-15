import React, { useState } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import SvgList from "../SvgList/SvgList";
import { UseContext } from "../../../features/Context";

const Navbar = () => {
  const { nav, toggleNav } = UseContext();
  const [active, setActive] = useState(1);
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

  const handleMenuActive = (id) => {
    setActive(id);
  };

  const arrMenu = [
    { id: 1, title: "Home", icon: "home", href: "/" },
    { id: 2, title: "MyList", icon: "check", href: "/mylist" },
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
              <Link
                className={`${active === item.id ? "active" : undefined}`}
                onClick={() => handleMenuActive(item.id)}
                to={item.href}
              >
                <div className="navbar-item">
                  <span className="navbar-icon">
                    <SvgList icon={item.icon} />
                  </span>
                  <span className="navbar-text-under-icon">{item.title}</span>
                </div>
                <span className="navbar-text">{item.title}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default Navbar;
