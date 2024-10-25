import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import UseIconList from "../SvgList/UseIconList";
import "./AccountBar.css";

const AccountBar = () => {
  const location = useLocation();
  console.log(location.pathname);
  const accountChildPath = [
    "/badges",
    "/coupon",
    "/mailnotify",
    "/mailnotify/unsubscribe",
    "/subscription/status",
  ];
  const isInPath = accountChildPath.some((item) => item === location.pathname);
  return (
    <NavLink
      to="/account"
      className={`account-nav${isInPath ? " active" : ""}`}
    >
      <span className="account-nav-main">
        <span className="account-nav-icon">
          <UseIconList icon="account" />
        </span>
        <span className="account-nav-title">Account / Settings</span>
      </span>
      <span className="account-nav-item">
        <span className="account-item-tag">ID</span>
        <span className="account-nav-text">SDSJ*721asd</span>
      </span>
      <span className="account-nav-item">
        <span className="account-item-tag">Plan</span>
        <span className="account-nav-text free">Free</span>
      </span>
    </NavLink>
  );
};

export default AccountBar;
