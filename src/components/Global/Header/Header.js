import React, { useEffect, useState } from "react";
import "./Header.css";
import { UseToggleContext } from "../../../context/ToggleContext";
import UseIconList from "../SvgList/UseIconList";
import { Link, useNavigate } from "react-router-dom";

const Header = ({ hideMenu = false, hiddenSearch = false }) => {
  const { toggleNav } = UseToggleContext();
  const [isActive, setIsActive] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const navigate = useNavigate();

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

  const handleSubmit = (e) => {
    e.preventDefault(); // Ngăn form redirect
    if (searchValue.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchValue)}`); // Chuyển hướng đến trang search với query
    }
  };

  return (
    <header className="main-header">
      <div className={`top-bar${isActive ? "" : " transparent-header"}`}>
        <div className="left-zone">
          {hideMenu && (
            <button onClick={toggleNav} className="bars-button">
              <div className="bars-icon">
                <UseIconList icon="bars" />
              </div>
            </button>
          )}

          <Link
            to={"/"}
            className={`logo-text${hideMenu ? " __hide-menu" : ""}`}
          >
            YureiTV
          </Link>
        </div>
        {!hiddenSearch && (
          <form onSubmit={handleSubmit} className="search-bar">
            <input
              onChange={(e) => setSearchValue(e.target.value)}
              value={searchValue}
              name="q"
              type="text"
              placeholder="Search something..."
            />
            <button type="sumbit">
              <div className="icon-search">
                <UseIconList icon="search" />
              </div>
            </button>
          </form>
        )}
      </div>
    </header>
  );
};

export default Header;
