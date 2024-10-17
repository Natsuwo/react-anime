import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <ul className="mobile-nav-bar">
      <li className="active">
        <Link className="mobile-nav-item-link" to="#">
          Home
        </Link>
      </li>
      <li>
        <Link className="mobile-nav-item-link" to="#">
          Category
        </Link>
      </li>
      <li>
        <Link className="mobile-nav-item-link" to="#">
          List
        </Link>
      </li>
      <li>
        <Link className="mobile-nav-item-link" to="#">
          Lorem, ipsum dolor
        </Link>
      </li>
      <li>
        <Link className="mobile-nav-item-link" to="#">
          Lorem, ipsum dolor
        </Link>
      </li>
      <li>
        <Link className="mobile-nav-item-link" to="#">
          Lorem, ipsum dolor
        </Link>
      </li>
      <li>
        <Link className="mobile-nav-item-link" to="#">
          Lorem, ipsum dolor
        </Link>
      </li>
      <li>
        <Link className="mobile-nav-item-link" to="#">
          Lorem, ipsum dolor
        </Link>
      </li>
      <li>
        <Link className="mobile-nav-item-link" to="#">
          Lorem, ipsum dolor
        </Link>
      </li>
      <li>
        <Link className="mobile-nav-item-link" to="#">
          Lorem, ipsum dolor
        </Link>
      </li>
    </ul>
  );
};

export default Navbar;
