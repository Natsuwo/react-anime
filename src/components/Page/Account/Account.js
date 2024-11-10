import React from "react";
import "./Account.css";
import { NavLink, Outlet } from "react-router-dom";
import UseIconList from "../../Global/SvgList/UseIconList";
import { isMobile } from "react-device-detect";

const Account = () => {
  return (
    <main className="page-main">
      <div className="page-container container__mobile">
        <h1 className="headline-titile">Account / Settings</h1>
        <div className="account-page-wrapper">
          <div className="account-page-inner">
            {!isMobile && (
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
                  <NavLink to="/mailnotify">
                    <span className="account-page-nav-title">
                      Mail Settings
                    </span>
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/announcement">
                    <span className="account-page-nav-title">Announcement</span>
                    <span className="account-page-nav-icon">
                      <UseIconList icon="external-link" />
                    </span>
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/faq">
                    <span className="account-page-nav-title">FAQ</span>
                    <span className="account-page-nav-icon">
                      <UseIconList icon="external-link" />
                    </span>
                  </NavLink>
                </li>
              </ul>
            )}

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
