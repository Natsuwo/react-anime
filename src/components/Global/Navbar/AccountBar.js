import React, { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import UseIconList from "../SvgList/UseIconList";
import "./AccountBar.css";
import Skeleton from "../Skeleton/Skeleton";
import { UseUserMetaContext } from "../../../context/UserMeta";

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
        {levelLoading ? (
          <Skeleton width={"50px"} height={"8px"} />
        ) : (
          <span className="account-nav-text">
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
            className={`account-nav-text ${
              userLevel?.level_text && userLevel?.level_text.toLowerCase()
            }`}
          >
            {userLevel && userLevel?.level_text}
          </span>
        )}
      </span>
    </NavLink>
  );
};

export default AccountBar;
