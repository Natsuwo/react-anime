import React, { useState } from "react";
import "./AccountManagement.css";
import UseIconList from "../../../Global/SvgList/UseIconList";
import Modal from "../../../Modal/Modal";
import EditAccountModal from "../../../Modal/children/EditAccountModal";
import EditEmailPassword from "../../../Modal/children/EditEmailPassword";
import CreateOTPModal from "../../../Modal/children/CreateOTPModal";
import Avatar from "react-avatar";
import { Link, useNavigate } from "react-router-dom";
import { UseUserMetaContext } from "../../../../context/UserMeta";
import Skeleton from "../../../Global/Skeleton/Skeleton";
import VerifyEmailModal from "../../../Modal/children/VerifyEmailModal";
import { SendMailAgain } from "../../../../features/useFetch";
import useAuth from "../../../../features/useAuth";
import { isMobile } from "react-device-detect";

const AccountManagement = () => {
  const { signOut } = useAuth();
  const [isVisible, setIsVisible] = useState(false);
  const [modalName, setModalName] = useState("");
  const { user, userId, userLevel, userMetaData, loadingUser } =
    UseUserMetaContext();

  const navigate = useNavigate();
  const handleNavigateMobile = (goto) => {
    if (!isMobile) return;
    navigate(goto);
  };

  const handleModalMobile = (goto) => {
    if (!isMobile) return;
    setIsVisible(true);
    setModalName(goto);
  };

  return (
    <>
      <h2 className="manager-title">Account Manager</h2>
      <div className="account-manager-wrapper">
        <div
          onClick={() => handleModalMobile("profile")}
          className="account-manager-item"
        >
          <div className="manager-item-wrapper">
            <div className="manager-item-left">
              <span className="manager-item-icon">
                {userMetaData && userMetaData.avatar ? (
                  <img
                    src={`data:image/jpeg;base64,${userMetaData.avatar}`}
                    alt=""
                  />
                ) : (
                  <Avatar name="Guest" />
                )}
              </span>
              <div className="manager-text">
                <div className="text-account-id">
                  {!userId && <Skeleton width="50px" height="6px" />}
                  {userId && "ID: " + userId}
                </div>
                <div className="text-account-username">
                  {userMetaData.user_name
                    ? userMetaData.user_name
                    : "Nickname not set"}
                </div>
              </div>
            </div>
            <div className="manager-item-right">
              <button
                onClick={() => {
                  setIsVisible(true);
                  setModalName("profile");
                }}
                className="btn account-btn"
              >
                Edit
              </button>
            </div>
          </div>
        </div>
        <div
          onClick={() => handleNavigateMobile("/subscription/status")}
          className="account-manager-item"
        >
          <div className="manager-item-wrapper">
            <div className="manager-item-left">
              <span className="manager-item-icon plan">
                <UseIconList icon="credit-card" />
              </span>
              <div
                className={`manager-item-text ${
                  userLevel?.level_text
                    ? userLevel?.level_text.toLowerCase()
                    : ""
                }`}
              >
                <div className="item-main-text">Plan</div>
                <div className="item-sub-text">
                  {!Object.keys(userLevel).length && (
                    <Skeleton width="50px" height="6px" />
                  )}
                  {userLevel ? userLevel?.level_text : ""}
                </div>
              </div>
            </div>
            <div className="manager-item-right">
              <Link to={"/subscription/status"}>
                <button className="btn account-btn btn-green">Upgrade</button>
              </Link>
            </div>
          </div>
        </div>
        <div
          onClick={() => {
            if (user && !user?.emailVerified) {
              handleModalMobile("verify-email");
            } else if (user && user?.email) {
              handleModalMobile("change-email-password");
            } else {
              handleModalMobile("edit-email");
            }
          }}
          className="account-manager-item"
        >
          <div className="manager-item-wrapper">
            <div className="manager-item-left">
              <span className="manager-item-icon small">
                <UseIconList icon="mail" />
              </span>
              <div className="manager-item-text">
                <div className="item-main-text">Email/Password</div>
                <div className="item-sub-text">
                  {loadingUser && <Skeleton width="90px" height="6px" />}
                  {!loadingUser ? user?.email : ""}
                </div>
              </div>
            </div>
            <div className="manager-item-right">
              {user && !user?.emailVerified ? (
                <button
                  className="btn account-btn"
                  onClick={() => {
                    SendMailAgain();
                    setIsVisible(true);
                    setModalName("verify-email");
                  }}
                >
                  Verify
                </button>
              ) : user && user?.email ? (
                <button
                  className="btn account-btn"
                  onClick={() => {
                    setIsVisible(true);
                    setModalName("change-email-password");
                  }}
                >
                  Update
                </button>
              ) : (
                <button
                  className="btn account-btn"
                  onClick={() => {
                    setIsVisible(true);
                    setModalName("edit-email");
                  }}
                >
                  Sign Up
                </button>
              )}
            </div>
          </div>
        </div>
        <div
          onClick={() => handleModalMobile("create-otp")}
          className="account-manager-item"
        >
          <div className="manager-item-wrapper">
            <div className="manager-item-left">
              <span className="manager-item-icon small">
                <UseIconList icon="link" />
              </span>
              <div className="manager-item-text">
                <div className="item-main-text">Create OTP</div>
              </div>
            </div>
            <div className="manager-item-right">
              <button
                className="btn account-btn"
                onClick={() => {
                  setModalName("create-otp");
                  setIsVisible(true);
                }}
              >
                Create
              </button>
            </div>
          </div>
        </div>
        <div className="switch-account-wrapper mt-2">
          <p className="manager-sub-text">
            You can switch accounts using the information you've set up on other
            devices.
          </p>
          <div className="switch-bottom-action">
            <button
              className="btn switch-acount-btn"
              style={{
                color: "var(--link-active)",
                height: "44px",
                maxWidth: "260px",
              }}
              onClick={() => {
                setModalName("switch-account");
                setIsVisible(true);
              }}
            >
              Switch Account
            </button>
            {user && (
              <button onClick={() => signOut()} className="btn btn-danger">
                Logout
              </button>
            )}
          </div>
        </div>
      </div>
      <Modal visible={isVisible} setVisible={setIsVisible}>
        {modalName === "profile" && (
          <EditAccountModal visible={isVisible} setVisible={setIsVisible} />
        )}
        {modalName === "edit-email" && (
          <EditEmailPassword visible={isVisible} setVisible={setIsVisible} />
        )}
        {modalName === "switch-account" && (
          <EditEmailPassword
            modalType="modal-switch-account"
            visible={isVisible}
            setVisible={setIsVisible}
          />
        )}
        {modalName === "change-email-password" && (
          <EditEmailPassword
            modalType="change-email-password"
            visible={isVisible}
            setVisible={setIsVisible}
          />
        )}
        {modalName === "create-otp" && (
          <CreateOTPModal visible={isVisible} setVisible={setIsVisible} />
        )}
        {modalName === "verify-email" && (
          <VerifyEmailModal visible={isVisible} setVisible={setIsVisible} />
        )}
      </Modal>
    </>
  );
};

export default AccountManagement;
