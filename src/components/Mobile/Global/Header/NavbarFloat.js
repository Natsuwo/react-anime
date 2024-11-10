import React, { useState } from "react";
import { Link } from "react-router-dom";
import UseIconList from "../../../Global/SvgList/UseIconList";
import EmailPasswordSignIn from "../../../Modal/children/EmailPasswordSignIn";
import Modal from "../../../Modal/Modal";
import ResetPassword from "../../../Modal/children/ResetPassword";
import { UseUserMetaContext } from "../../../../context/UserMeta";

const NavbarFloat = ({ handleFloat }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [modalState, setModalState] = useState("sign-in");
  const { user, userId, userMetaData, userLevel, levelLoading } =
    UseUserMetaContext();
  const handleModalState = (state) => {
    if (!state) {
      if (modalState !== "reset-password") {
        setIsVisible(false);
      }
      setModalState("sign-in");
    } else {
      setModalState(state);
    }
  };

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
          <Link to="/subscription/signup">Sign up</Link>
        </li>
        <li>
          <Link onClick={() => setIsVisible(true)}>Sign in</Link>
        </li>
      </ul>
      <ul className="mobile-nav-bar-float">
        <li>
          <div className="mobile-account-wrapper">
            <Link className="nav-item-grid" to="/account">
              <div className="mobile-item-account-icon">
                <UseIconList width="48" height="48" icon="account" />
              </div>
              <div className="mobile-item-wrapper account-title">
                <div className="mobile-item mobile-item-title">
                  <div className="account-information">Account Settings</div>
                </div>
              </div>
              <div className="mobile-item-wrapper user-id">
                <div className="mobile-item">
                  <span className="label">ID</span>
                  <span className="label-text text-clamp">{userId}</span>
                </div>
              </div>
              {user?.email && (
                <div className="mobile-item-wrapper user-email">
                  <div className="mobile-item item-email">
                    <span className="label">Email Address</span>
                    <span className="label-text clamp-text">{user?.email}</span>
                  </div>
                </div>
              )}
            </Link>
            <Link to="/subscription/status">
              <div className="mobile-item-wrapper user-plan">
                <div className="mobile-item">
                  <span>Plan</span>
                  <span
                    className={`label-text ${userLevel?.level_text?.toLowerCase()}`}
                  >
                    {userLevel?.level_text}
                  </span>
                </div>
              </div>
            </Link>
          </div>
        </li>
        <li>
          <Link className="mobile-nav-float-item-link" to="/mylist">
            <div className="item-icon">
              <UseIconList width="24" height="24" icon="add" />
            </div>
            <span className="item-text"> My List</span>
          </Link>
        </li>
        <li>
          <Link className="mobile-nav-float-item-link" to="/history">
            <div className="item-icon">
              <UseIconList width="24" height="24" icon="history" />
            </div>
            <span className="item-text">History</span>
          </Link>
        </li>
        <li>
          <Link className="mobile-nav-float-item-link" to="#">
            <div className="item-icon">
              <UseIconList width="24" height="24" icon="mail" />
            </div>
            <span className="item-text">Mail</span>
          </Link>
        </li>
        <li>
          <Link className="mobile-nav-float-item-link" to="#">
            <div className="item-icon">
              <UseIconList width="24" height="24" icon="yurei-green" />
            </div>
            <span className="item-text">Badges</span>
          </Link>
        </li>
        <li>
          <Link className="mobile-nav-float-item-link" to="#">
            <div className="item-icon">
              <UseIconList width="24" height="24" icon="coupon" />
            </div>
            <span className="item-text">Coupon</span>
          </Link>
        </li>
      </ul>
      <Modal visible={isVisible} setVisible={setIsVisible}>
        {modalState === "sign-in" && (
          <EmailPasswordSignIn
            setVisible={setIsVisible}
            openModal={handleModalState}
          ></EmailPasswordSignIn>
        )}

        {modalState === "reset-password" && (
          <ResetPassword
            setVisible={setIsVisible}
            openModal={handleModalState}
          ></ResetPassword>
        )}
      </Modal>
    </>
  );
};

export default NavbarFloat;
