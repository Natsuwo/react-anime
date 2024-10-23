import React, { useState } from "react";
import "./AccountManagement.css";
import UseIconList from "../../../Global/SvgList/UseIconList";
import Modal from "../../../Modal/Modal";
import EditAccountModal from "../../../Modal/children/EditAccountModal";

const AccountManagement = () => {
  const [isVisible, setIsVisible] = useState(false);
  return (
    <>
      <h2 className="manager-title">Account Manager</h2>
      <div className="account-manager-wrapper">
        <div className="account-manager-item">
          <div className="manager-item-wrapper">
            <div className="manager-item-left">
              <span className="manager-item-icon">
                <img
                  src="https://image.p-c2-x.abema-tv.com/image/user/profile/thumb/default/human2.jpg"
                  alt=""
                />
              </span>
              <div className="manager-text">
                <div className="text-account-id">ID: Em5oCBavHD2jVR</div>
                <div className="text-account-username">ニックネーム未設定</div>
              </div>
            </div>
            <div className="manager-item-right">
              <button
                onClick={() => setIsVisible(true)}
                className="btn account-btn"
              >
                Edit
              </button>
            </div>
          </div>
        </div>
        <div className="account-manager-item">
          <div className="manager-item-wrapper">
            <div className="manager-item-left">
              <span className="manager-item-icon">
                <UseIconList icon="credit-card" />
              </span>
              <div className="manager-item-text">
                <div className="item-main-text">Plan</div>
                <div className="item-sub-text">Free</div>
              </div>
            </div>
            <div className="manager-item-right">
              <button className="btn account-btn btn-green">Sign Up</button>
            </div>
          </div>
        </div>
        <div className="account-manager-item">
          <div className="manager-item-wrapper">
            <div className="manager-item-left">
              <span className="manager-item-icon small">
                <UseIconList icon="mail" />
              </span>
              <div className="manager-item-text">
                <div className="item-main-text">Email/Passwor</div>
                <div className="item-sub-text">deptrai@gmail.com</div>
              </div>
            </div>
            <div className="manager-item-right">
              <button className="btn account-btn">Update</button>
            </div>
          </div>
        </div>
        <div className="account-manager-item">
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
              <button className="btn account-btn">Create</button>
            </div>
          </div>
        </div>
        <div className="switch-account-wrapper mt-2">
          <p className="switch-text">
            他のデバイスで設定済みの情報を使ってアカウントの切り替えができます。
          </p>
          <button
            className="btn switch-acount-btn"
            style={{
              color: "var(--link-active)",
              height: "44px",
              width: "260px",
            }}
          >
            Switch Account
          </button>
        </div>
      </div>
      <Modal visible={isVisible} setVisible={setIsVisible}>
        <EditAccountModal visible={isVisible} setVisible={setIsVisible} />
      </Modal>
    </>
  );
};

export default AccountManagement;
