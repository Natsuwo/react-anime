import React, { useEffect, useState } from "react";
import "./Header.css";
import { UseToggleContext } from "../../../context/ToggleContext";
import { Link } from "react-router-dom";

const HeaderPromote = () => {
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
          <Link to={"/"} className={"logo-text __hide-menu"}>
            YureiTV
          </Link>
        </div>
        <div
          className="icon-search"
          style={{ display: "flex", width: "100%", justifyContent: "flex-end" }}
        >
          <Link to="/subscription/signup">
            <button className="btn">Sign Up</button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default HeaderPromote;
