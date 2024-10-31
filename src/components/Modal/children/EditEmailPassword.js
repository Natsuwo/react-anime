import React, { useEffect, useState } from "react";
import UseIconList from "../../Global/SvgList/UseIconList";
import { Link } from "react-router-dom";
import Alert from "../component/Alert";
import HeadlineBack from "../component/HeadlineBack";
import InputForm from "../../Global/FormInput/FormInput";
import { isValidEmail, validatePassword } from "../../../features/helper";
import { FireBaseSignUp } from "../../../features/useFetch";
import VerifyEmailModal from "./VerifyEmailModal";
import { UseUserMetaContext } from "../../../context/UserMeta";

const ModalSignUp = ({ visible, setVisible, openModal }) => {
  const [errorText, setError] = useState({ email: "", password: "" });
  const [isError, setIsError] = useState(false);
  const [values, setValues] = useState({ email: "", password: "" });
  const [modalError, setModalError] = useState("");
  const [isSent, setSent] = useState(false);

  const { userId, userMetaData } = UseUserMetaContext();

  const onValidEmail = (e) => {
    if (!isValidEmail(e.target.value)) {
      setError((prev) => ({
        ...prev,
        email: "Your email address is not valid!",
      }));
      setIsError(true);
    } else {
      setIsError(false);
      setError((prev) => ({
        ...prev,
        email: "",
      }));
    }

    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const onValidPassword = (e) => {
    const isPass = validatePassword(e.target.value);

    if (!isPass.success) {
      setError((prev) => ({
        ...prev,
        password: isPass.error,
      }));
      setIsError(true);
    } else {
      setIsError(false);
      setError((prev) => ({
        ...prev,
        password: "",
      }));
    }

    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSumbit = async (e) => {
    e.preventDefault();
    if (!isError) {
      setSent(true);
      const combinedObject = { ...values, userId, userMetaData };
      const signUp = await FireBaseSignUp(combinedObject);
      if (signUp.success) {
        openModal("verify-email");
      } else {
        setSent(false);
        setModalError(signUp.error);
      }
    }
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
                By registering for a YUREITV account, you can freely watch
                videos on the website, save your favorite stuffs to a playlist,
                and gain access to exclusive videos.
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
                onChange={onValidEmail}
                value={values.email}
                idFor="email"
                name="email"
                label="Email Address"
                type="text"
                placeholder="Enter your email"
                autocomplete={"true"}
                errorText={errorText["email"]}
              />
              <InputForm
                onChange={onValidPassword}
                idFor={"password"}
                name={"password"}
                type="password"
                errorText={errorText["password"]}
              />
              <div className="modal-description modal-supplement">
                Please read our privacy policy and terms carefully before
                registering. Your email address will be used for the following
                purposes:
                <ol>
                  <li>To send you information about upcoming videos</li>
                  <li>
                    To update you on new episodes for the videos you’ve saved to
                    My List
                  </li>
                  <li>To send surveys so we can improve our service</li>
                  <li>To send you videos that you may be interested in</li>
                </ol>
                Please note that the above communications may also come from our
                partner companies that we have contracted.
              </div>
            </div>
          </div>
          <div className="modal-error-alert">
            <p className="modal-error-alert-text">{modalError}</p>
          </div>
          <div className="modal-actions">
            <button onClick={() => setVisible(false)} className="btn">
              Cancel
            </button>
            <button className="btn btn-active" disabled={isSent}>
              Confirm
            </button>
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
          <InputForm type="password" subtitle={false} />
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

      {modalState === "verify-email" && (
        <VerifyEmailModal setVisible={setVisible} openModal={openModal} />
      )}
    </>
  );
};

export default EditEmailPassword;
