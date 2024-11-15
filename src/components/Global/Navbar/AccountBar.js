import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import UseIconList from "../SvgList/UseIconList";
import "./AccountBar.css";
import Skeleton from "../Skeleton/Skeleton";
import { UseUserMetaContext } from "../../../context/UserMeta";
import { useDarkMode } from "../../../context/DarkModeContext";

const AccountBar = () => {
  const location = useLocation();
  const accountChildPath = [
    "/badges",
    "/coupon",
    "/mailnotify",
    "/mailnotify/unsubscribe",
    "/subscription/status",
  ];
  const isInPath = accountChildPath.some((item) => item === location.pathname);
  const { userId, userMetaData, userLevel, levelLoading } =
    UseUserMetaContext();
  const { darkMode, toggleDarkMode } = useDarkMode();

  return (
    <>
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
          {levelLoading ? (
            <Skeleton width={"50px"} height={"8px"} />
          ) : (
            <span className="account-nav-text clamp-text">
              {userMetaData && userMetaData?.user_name
                ? userMetaData?.user_name
                : userId}
            </span>
          )}
        </span>
        <span className="account-nav-item">
          <span className="account-item-tag">Plan</span>
          {levelLoading ? (
            <Skeleton width={"50px"} height={"8px"} />
          ) : (
            <span
              className={`account-nav-text clamp-text ${
                userLevel?.level_text && userLevel?.level_text.toLowerCase()
              }`}
            >
              {userLevel && userLevel?.level_text}
            </span>
          )}
        </span>
      </NavLink>
      <div className="dark-theme-switch">
        <span className="dark-theme-switch-text">Light</span>
        <div className="dark-theme-switch-input">
          <input
            checked={
              darkMode === null
                ? !window.matchMedia("(prefers-color-scheme: dark)").matches
                : !darkMode
            }
            onChange={(e) => toggleDarkMode(e.target.checked)}
            id="dark-switch"
            className="dark-switch"
            type="checkbox"
          />
          <label htmlFor="dark-switch">
            <span className="track"></span>
            <span className="thumb">
              <span className="eye"></span>
            </span>
          </label>
        </div>
      </div>
    </>
  );
};

export default AccountBar;
