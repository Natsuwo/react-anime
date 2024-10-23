import React, { useEffect, useState } from "react";
import UseIconList from "../../Global/SvgList/UseIconList";
import { Link } from "react-router-dom";
import Alert from "../component/Alert";
import HeadlineBack from "../component/HeadlineBack";
import PasswordForm from "../component/PasswordForm";
import InputForm from "../component/InputForm";

const ModalSignUp = ({ visible, setVisible, openModal }) => {
  const handleSumbit = (e) => {
    e.preventDefault();
  };
  return (
    <>
      <form onSubmit={handleSumbit} className="modal-form">
        <fieldset>
          <legend>
            <h1 className="modal-item-title">Set Email Password</h1>
          </legend>
          <div className="modal-long-content-wrapper">
            <div className="modal-scroll-area">
              <div className="modal-description">
                To register for YUREITV Premium and purchase pay-per-view,
                please register your email address and password.
              </div>
              <Alert title="If you're already have an account just sign in.">
                <Link
                  onClick={() => openModal("modal-switch-account")}
                  className="sign-in-link"
                >
                  Sign in for already have an account user!
                </Link>
              </Alert>
              <InputForm
                idFor="email"
                label="Email Address"
                type="text"
                placeholder="Enter your email"
              />
              <PasswordForm />
              <div className="modal-description modal-supplement">
                当社の利用規約及びプライバシーポリシーを確認の上、同意して送信してください。
                取得したメールアドレスは、以下の目的で使用します。
                <ol>
                  <li>問い合わせ対応、アンケートに関する連絡</li>
                  <li>購入内容、サービスに関する連絡</li>
                  <li>新着、おすすめなど、番組情報の案内</li>
                  <li>キャンペーン、プレゼントに関する連絡</li>
                </ol>
                当社が委託する提携会社から上記の連絡をする場合があります。
              </div>
            </div>
          </div>
          <div className="modal-actions">
            <button onClick={() => setVisible(false)} className="btn">
              Cancel
            </button>
            <button className="btn btn-active">Confirm</button>
          </div>
        </fieldset>
      </form>
    </>
  );
};

const ModalSwitchAccount = ({ setVisible, openModal }) => {
  return (
    <>
      <h1 className="modal-item-title">Profile</h1>
      <div className="modal-content-wrapper">
        <button
          className="btn modal-btn"
          onClick={() => openModal("email-password-signin")}
        >
          <span className="modal-btn-icon">
            <UseIconList icon="mail" />
          </span>
          <span className="modal-btn-text">Email & Password</span>
        </button>
        <button
          className="btn modal-btn"
          onClick={() => openModal("id-otp-signin")}
        >
          <span className="modal-btn-icon">
            <UseIconList icon="link" />
          </span>
          <span className="modal-btn-text">ID & OTP</span>
        </button>
      </div>
      <div className="modal-actions">
        <button onClick={() => setVisible(false)} className="btn">
          Cancel
        </button>
      </div>
    </>
  );
};

const EmailPasswordSignIn = ({ setVisible, openModal }) => {
  const title =
    "If you switch to a different account, you will no longer be able to use the viewing plan or purchased content of your current account.";
  return (
    <>
      <HeadlineBack
        title="Email & Password Sign In"
        openModal={() => openModal("modal-switch-account")}
      />
      <div className="modal-content-wrapper">
        <Alert title={title} />
        <div className="modal-description">
          You can switch accounts by entering the email address and password you
          set up on another device.
        </div>
        <form className="modal-form mt-2">
          <InputForm
            idFor="email"
            label="Email Address"
            type="text"
            placeholder="Enter your email"
          />
          <PasswordForm subtitle={false} />
        </form>
      </div>
      <div className="modal-actions">
        <button onClick={() => setVisible(false)} className="btn">
          Cancel
        </button>
        <button
          onClick={() => setVisible(false)}
          className="btn btn-active"
          disabled
        >
          Confirm
        </button>
      </div>
    </>
  );
};

const ID_OTPSignIn = ({ setVisible, openModal }) => {
  const title =
    "If you switch to a different account, you will no longer be able to use the viewing plan or purchased content of your current account.";
  return (
    <>
      <HeadlineBack
        title="ID & OTP Sign In"
        openModal={() => openModal("modal-switch-account")}
      />
      <div className="modal-content-wrapper">
        <Alert title={title} />
        <div className="modal-description">
          You can switch accounts by entering the email address and password you
          set up on another device.
        </div>
        <form className="modal-form mt-2">
          <InputForm
            idFor="id"
            label="Your ID"
            type="text"
            placeholder="Enter User ID"
          />
          <InputForm
            idFor="otp"
            label="OTP"
            type="text"
            placeholder="Enter One-Time Password"
          />
        </form>
      </div>
      <div className="modal-actions">
        <button onClick={() => setVisible(false)} className="btn">
          Cancel
        </button>
        <button
          onClick={() => setVisible(false)}
          className="btn btn-active"
          disabled
        >
          Confirm
        </button>
      </div>
    </>
  );
};

// Root Component
const EditEmailPassword = ({ modalType, setVisible, visible }) => {
  const [modalState, setModalState] = useState(
    modalType ? modalType : "modal-sign-up"
  );

  const openModal = (state) => {
    setModalState(state);
  };

  useEffect(() => {
    if (!visible && !modalType) {
      setModalState("modal-sign-up");
    }
  }, [visible]);

  return (
    <>
      {modalState === "modal-sign-up" && (
        <ModalSignUp openModal={openModal} setVisible={setVisible} />
      )}
      {modalState === "modal-switch-account" && (
        <ModalSwitchAccount setVisible={setVisible} openModal={openModal} />
      )}

      {modalState === "email-password-signin" && (
        <EmailPasswordSignIn setVisible={setVisible} openModal={openModal} />
      )}

      {modalState === "id-otp-signin" && (
        <ID_OTPSignIn setVisible={setVisible} openModal={openModal} />
      )}
    </>
  );
};

export default EditEmailPassword;
