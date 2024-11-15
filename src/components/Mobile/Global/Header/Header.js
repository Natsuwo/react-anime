import React, { useEffect, useRef, useState } from "react";
import "./Header.css";
import UseIconList from "../../../Global/SvgList/UseIconList";
import Navbar from "./Navbar";
import NavbarFloat from "./NavbarFloat";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const [isActive, setIsActive] = useState(false);
  const [floatActive, setFloatActive] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const floatRef = useRef(null);
  const handleFloat = (opt = !floatActive) => {
    setFloatActive(opt);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (floatRef.current && floatRef.current.contains(event.target)) {
        setFloatActive(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault(); // Ngăn form redirect
    if (searchValue.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchValue)}`); // Chuyển hướng đến trang search với query
    }
  };

  return (
    <div className="mobile-header">
      <div className="mobile-header-wrapper">
        <div className="mobile-header-outer">
          <div className={`mobile-header-display${isActive ? " hidden" : ""}`}>
            <div className="mobile-bars">
              <button
                className="mobile-button"
                onClick={() => setFloatActive(true)}
              >
                <UseIconList
                  width="24"
                  height="24"
                  className="mobile-icon"
                  icon="bars"
                />
              </button>
              <div className="mobile-logo">
                <Link to="/">
                  <span>YureiTV</span>
                </Link>
              </div>
            </div>
            <button onClick={() => setIsActive(true)} className="mobile-button">
              <UseIconList
                width="24"
                height="24"
                className="mobile-icon"
                icon="search"
              />
            </button>
          </div>
          <div className={`mobile-header-form${isActive ? " active" : ""}`}>
            <form onSubmit={handleSubmit} className="mobile-header-input">
              <input
                onChange={(e) => setSearchValue(e.target.value)}
                value={searchValue}
                name="q"
                type="text"
                placeholder="Search something..."
              />

              <button
                type="button"
                onClick={() => setIsActive(false)}
                className="mobile-button close"
              >
                <UseIconList
                  width="24"
                  height="24"
                  icon="close"
                  className="mobile-icon"
                ></UseIconList>
              </button>
            </form>
          </div>
        </div>
      </div>
      <div className="mobile-navbar">
        <div className="mobile-navbar-wrapper">
          <Navbar />
        </div>
      </div>
      <div
        ref={floatRef}
        className={`mobile-navbar-float${floatActive ? " active" : ""}`}
      >
        <NavbarFloat handleFloat={handleFloat} />
      </div>
    </div>
  );
};

export default Header;
