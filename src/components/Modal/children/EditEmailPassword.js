import React, { useEffect, useState } from "react";
import UseIconList from "../../Global/SvgList/UseIconList";
import { Link } from "react-router-dom";
import Alert from "../component/Alert";
import HeadlineBack from "../component/HeadlineBack";
import InputForm from "../../Global/FormInput/FormInput";
import {
  CreateDocument,
  FetchReAuthenticateUser,
  getDoubleFind,
} from "../../../features/useFetch";
import VerifyEmailModal from "./VerifyEmailModal";
import { UseUserMetaContext } from "../../../context/UserMeta";
import ChangePasswordModal from "./ChangePasswordModal";
import ModalSignUp from "./ModalSignUp";
import ChangeEmail from "./ChangeEmail";
import EmailPasswordSignIn from "./EmailPasswordSignIn";
import ResetPassword from "./ResetPassword";
import { signInWithCustomToken } from "firebase/auth";
import { auth } from "../../../firebase";

const ModalSwitchAccount = ({ setVisible, openModal }) => {
  return (
    <>
      <h1 className="modal-item-title">Sign In / Switch Account</h1>
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

const ChangeEmailPassword = ({ setVisible, openModal }) => {
  const { user } = UseUserMetaContext();
  return (
    <>
      <h1 className="modal-item-title">Change Email / Password</h1>
      <div className="modal-content-wrapper">
        <button
          className="btn modal-btn"
          onClick={() => openModal("confirm-password", false, "change-email")}
        >
          <span className="modal-btn-icon">
            <UseIconList icon="mail" />
          </span>
          <span className="modal-btn-text" style={{ textAlign: "left" }}>
            <div className="modal-subtitle">Change Email</div>
            <div
              className="modal-description"
              style={{ color: "var(--sub-title-color)" }}
            >
              {user.email}
            </div>
          </span>
        </button>
        <button
          className="btn modal-btn"
          onClick={() =>
            openModal("confirm-password", false, "change-password")
          }
        >
          <span className="modal-btn-icon">
            <UseIconList icon="link" />
          </span>
          <span className="modal-btn-text">Change Password</span>
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

const ConfirmPassword = ({ setVisible, openModal, nextModal }) => {
  const { user } = UseUserMetaContext();
  const [isDisable, setDisable] = useState(false);
  const [password, setPassword] = useState("");
  const [errorText, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setDisable(true);
    const checkPass = await FetchReAuthenticateUser(password);
    if (checkPass.success) {
      openModal(nextModal, false);
    } else {
      setError(checkPass.error);
      setDisable(false);
    }
  };
  return (
    <>
      <HeadlineBack
        title="Confirm Password"
        openModal={() => openModal("", true, nextModal)}
      />
      <div className="modal-content-wrapper">
        <form onSubmit={handleSubmit} className="modal-form mt-2">
          <div className="form-input-wrapper mb-2">
            <label>Email</label>
            <div className="modal-form-disabled">{user?.email}</div>
          </div>
          <InputForm
            onChange={(e) => setPassword(e.target.value)}
            name={"password"}
            type="password"
            subtitle={false}
          />
          <div className="modal-error-alert">
            <p className="modal-error-alert-text">{errorText}</p>
          </div>
          <Link
            onClick={() => openModal("reset-password", false)}
            className="__link-active"
          >
            Reset Password
          </Link>
          <div className="modal-actions">
            <button
              type="button"
              onClick={() => setVisible(false)}
              className="btn"
            >
              Cancel
            </button>
            <button
              disabled={isDisable}
              type="submit"
              className="btn btn-active"
            >
              Confirm
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

const ID_OTPSignIn = ({ setVisible, openModal }) => {
  const title =
    "If you switch to a different account, you will no longer be able to use the viewing plan or purchased content of your current account.";
  const [values, setValues] = useState({ userId: "", otp_code: "" });
  const [modalError, setModalError] = useState("");
  const [isSent, setSent] = useState(false);

  const onInputChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSumbit = async (e) => {
    e.preventDefault();
    setSent(true);
    const otp = await getDoubleFind(
      "OTPRequests",
      ["userId", values.userId, false],
      ["otp_code", values.otp_code, false],
      1
    );
    console.log(otp);

    if (otp.success) {
      const otpData = otp.doc[0];
      const baseURL =
        process.env.NODE_ENV === "production"
          ? "yureitv-server.vercel.app"
          : "";
      if (otpData?.expires_at.toMillis() > Date.now() && !otpData.is_used) {
        const response = await fetch(baseURL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ user_id: otpData.uid }),
        }).catch((error) => {
          console.error("Failed to get auth token ", error);
        });
        const data = await response.json();
        if (!data.success) {
          console.error("Failed to get auth token ", data.error);
          setModalError("Failed to get auth token");
          setSent(false);
          return;
        } else {
          const customToken = data.token;
          await signInWithCustomToken(auth, customToken);
          otpData.is_used = true;
          await CreateDocument("OTPRequests", otpData.uid, otpData);
          setSent(false);
          setVisible(false);
        }
      } else {
        setModalError("This OTP is expired or already used!!");
        setSent(false);
      }
    } else {
      setSent(false);
    }
  };

  return (
    <>
      <HeadlineBack
        title="ID & OTP Sign In"
        openModal={() => openModal("", true)}
      />
      <div className="modal-content-wrapper">
        <Alert title={title} />
        <div className="modal-description">
          You can switch accounts by entering the email address and password you
          set up on another device.
        </div>
        <form onSubmit={handleSumbit} className="modal-form mt-2">
          <InputForm
            idFor="userId"
            label="Your ID"
            type="text"
            placeholder="Enter User ID"
            name="userId"
            onChange={onInputChange}
          />
          <InputForm
            name="otp_code"
            idFor="otp_code"
            label="OTP"
            type="text"
            placeholder="Enter One-Time Password"
            onChange={onInputChange}
          />
          <div className="modal-error-alert">
            <p className="modal-error-alert-text">{modalError}</p>
          </div>
          <div className="modal-actions">
            <button
              type="button"
              onClick={() => setVisible(false)}
              className="btn"
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-active" disabled={isSent}>
              Confirm
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

// Root Component
const EditEmailPassword = ({ modalType, setVisible, visible }) => {
  const [modalState, setModalState] = useState(
    modalType ? modalType : "modal-sign-up"
  );

  const [nextModal, setNextModal] = useState("");
  const [modalRoute, setModalRoute] = useState([]);
  const openModal = (state, isBack = false, nextMdl) => {
    if (isBack) {
      const prevRoute = modalRoute[modalRoute.length - 2];
      setModalState(prevRoute);
      const updateRoute = modalRoute.slice(0, modalRoute.length - 1);
      setModalRoute(updateRoute);
    } else {
      if (modalRoute[modalRoute.length - 1] !== state) {
        setModalRoute((prev) => [...prev, state]);
      }
      setModalState(state);
    }

    if (nextMdl) {
      setNextModal(nextMdl);
    }
  };

  useEffect(() => {
    if (!visible && !modalType) {
      setModalState("modal-sign-up");
    }

    if (visible) {
      const initialModalState = modalType || modalState;
      setModalState(initialModalState);
      setModalRoute([initialModalState]);
    } else {
      setModalRoute([]);
      setModalState(modalType || "modal-sign-up");
    }
  }, [visible]);

  return (
    <>
      {modalState === "modal-sign-up" && (
        <ModalSignUp
          setVisible={setVisible}
          openModal={openModal}
          nextModal={nextModal}
        />
      )}
      {modalState === "modal-switch-account" && (
        <ModalSwitchAccount
          setVisible={setVisible}
          openModal={openModal}
          nextModal={nextModal}
        />
      )}

      {modalState === "email-password-signin" && (
        <EmailPasswordSignIn
          setVisible={setVisible}
          openModal={openModal}
          nextModal={nextModal}
        />
      )}

      {modalState === "id-otp-signin" && (
        <ID_OTPSignIn
          setVisible={setVisible}
          openModal={openModal}
          nextModal={nextModal}
        />
      )}

      {modalState === "verify-email" && (
        <VerifyEmailModal
          setVisible={setVisible}
          openModal={openModal}
          nextModal={nextModal}
        />
      )}

      {modalState === "change-email-password" && (
        <ChangeEmailPassword
          setVisible={setVisible}
          openModal={openModal}
          nextModal={nextModal}
        />
      )}

      {modalState === "confirm-password" && (
        <ConfirmPassword
          setVisible={setVisible}
          openModal={openModal}
          nextModal={nextModal}
        />
      )}
      {modalState === "reset-password" && (
        <ResetPassword
          setVisible={setVisible}
          openModal={openModal}
          nextModal={nextModal}
        />
      )}
      {modalState === "change-email" && (
        <ChangeEmail
          setVisible={setVisible}
          openModal={openModal}
          nextModal={nextModal}
        />
      )}
      {modalState === "change-password" && (
        <ChangePasswordModal
          setVisible={setVisible}
          openModal={openModal}
          nextModal={nextModal}
        />
      )}
    </>
  );
};

export default EditEmailPassword;
