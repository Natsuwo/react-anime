import React from "react";
import "./Account.css";
import { NavLink, Outlet } from "react-router-dom";

const Account = () => {
  return (
    <main className="page-main">
      <div className="page-container">
        <h1 className="headline-titile">Account / Settings</h1>
        <div className="account-page-wrapper">
          <div className="account-page-inner">
            <ul className="account-page-nav">
              <li>
                <NavLink to="/account">
                  <span className="account-page-nav-title">
                    Account Management
                  </span>
                </NavLink>
              </li>
              <li>
                <NavLink to="badges">
                  <span className="account-page-nav-title">Badges</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/coupon">
                  <span className="account-page-nav-title">Coupon</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/mailnoty">
                  <span className="account-page-nav-title">Mail Settings</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/announcement">
                  <span className="account-page-nav-title">Announcement</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/faq">
                  <span className="account-page-nav-title">FAQ</span>
                </NavLink>
              </li>
            </ul>
            <div className="account-page-content">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Account;
