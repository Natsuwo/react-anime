import React, { useEffect, useState } from "react";
import "./Header.css";
import { UseToggleContext } from "../../../context/ToggleContext";
import UseIconList from "../SvgList/UseIconList";
import { Link } from "react-router-dom";

const Header = () => {
  const { toggleNav } = UseToggleContext();
  const [isActive, setIsActive] = useState(false);
  const handleScroll = () => {
    if (window.scrollY > 0) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <header className="main-header">
      <div className={`top-bar${isActive ? "" : " transparent-header"}`}>
        <div className="left-zone">
          <button onClick={toggleNav} className="bars-button">
            <div className="bars-icon">
              <UseIconList icon="bars" />
            </div>
          </button>
          <Link to={"/"} className="logo-text">
            YureiTV
          </Link>
        </div>
        <div className="search-bar">
          <input type="text" placeholder="Search something..." />
          <div className="icon-search">
            <UseIconList icon="search" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
