import React from "react";
import { Link } from "react-router-dom";
import UseIconList from "../../../Global/SvgList/UseIconList";

const NavbarFloat = ({ handleFloat }) => {
  return (
    <>
      <button
        onClick={() => handleFloat(false)}
        className="mobile-button"
        style={{ backgroundColor: "var(--primary-color)" }}
      >
        <UseIconList icon="close" width="24" height="24"></UseIconList>
      </button>
      <ul className="mobile-nav-float-top">
        <li>
          <Link to="#">Sign up</Link>
        </li>
        <li>
          <Link to="#">Sign in</Link>
        </li>
      </ul>
      <ul className="mobile-nav-bar-float">
        <li>
          <Link className="mobile-nav-float-item-link" to="#">
            <div className="mobile-account-wrapper">
              <div className="mobile-item-title">
                <div className="account-icon">
                  <UseIconList width="24" height="24" icon="account" />
                </div>
                <div className="account-information">Account Settings</div>
              </div>
              <div className="mobile-item-wrapper">
                <div className="mobile-item">
                  <span className="label">ID</span>
                  <span className="label-text">Em5oCBavHD2jVR</span>
                </div>
                <div className="mobile-item">
                  <span className="label">Plan</span>
                  <span className="label-text">Basic</span>
                </div>
              </div>
            </div>
          </Link>
        </li>
        <li>
          <Link className="mobile-nav-float-item-link" to="#">
            Giftbox
          </Link>
        </li>
        <li>
          <Link className="mobile-nav-float-item-link" to="#">
            Coupon
          </Link>
        </li>
        <li>
          <Link className="mobile-nav-float-item-link" to="#">
            Mail
          </Link>
        </li>
        <li>
          <Link className="mobile-nav-float-item-link" to="#">
            <span className="item-text">About us</span>
            <div className="item-icon">
              <UseIconList width="24" height="24" icon="external-link" />
            </div>
          </Link>
        </li>
        <li>
          <Link className="mobile-nav-float-item-link" to="#">
            <span className="item-text">FAQ</span>
            <div className="item-icon">
              <UseIconList width="24" height="24" icon="external-link" />
            </div>
          </Link>
        </li>
      </ul>
    </>
  );
};

export default NavbarFloat;
