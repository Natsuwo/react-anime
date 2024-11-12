import React from "react";
import "./Footer.css";
import UseIconList from "../SvgList/UseIconList";
import { Link } from "react-router-dom";

const Footer = () => {
  const arrFooterNav = [
    "Terms",
    "Privacy Policy",
    "Contact us",
    "FAQ",
    "Premium",
  ];
  return (
    <footer className="main-footer">
      <div className="footer-inner">
        <div className="footer-left">
          <ul className="footer-nav-list">
            {arrFooterNav.map((item, index) => (
              <li key={index}>
                <Link to="#">
                  <span className="footer-nav-logo">
                    <UseIconList icon="external-link" />
                  </span>
                  <span className="footer-nav-text">{item}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="footer-right">
          <div className="copyright">©YureiTV</div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
