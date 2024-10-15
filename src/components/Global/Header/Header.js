import React, { useEffect, useState } from "react";
import "./Header.css";
import { UseContext } from "../../../features/Context";
import SvgList from "../SvgList/SvgList";
import { Link } from "react-router-dom";

const Header = () => {
  const { toggleNav } = UseContext();
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
              <SvgList icon="bars" />
            </div>
          </button>
          <Link to={"/"} className="logo-text">
            YureiTV
          </Link>
        </div>
        <div className="search-bar">
          <input type="text" placeholder="Search something..." />
          <div className="icon-search">
            <SvgList icon="search" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
