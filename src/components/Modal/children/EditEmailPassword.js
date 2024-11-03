import React, { useEffect, useState } from "react";
import UseIconList from "../../Global/SvgList/UseIconList";
import { Link } from "react-router-dom";
import Alert from "../component/Alert";
import HeadlineBack from "../component/HeadlineBack";
import InputForm from "../../Global/FormInput/FormInput";
import { isValidEmail, validatePassword } from "../../../features/helper";
import {
  CheckEmailVerification,
  FetchChangeUserEmail,
  FetchReAuthenticateUser,
  FetchResetPassword,
  FireBaseSignIn,
  FireBaseSignUp,
} from "../../../features/useFetch";
import VerifyEmailModal from "./VerifyEmailModal";
import { UseUserMetaContext } from "../../../context/UserMeta";
import { ReactComponent as YureiLogo } from "../../../assets/images/yurei/yurei.svg";
import { ReactComponent as YureiLogoCompleted } from "../../../assets/images/yurei/yurei_oowarai.svg";
import ChangePasswordModal from "./ChangePasswordModal";

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
                  onClick={() => openModal("email-password-signin")}
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
        </fieldset>
      </form>
    </>
  );
};

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

const ChangeEmail = ({ setVisible, openModal, nextModal }) => {
  const [isDisable, setDisable] = useState(false);
  const [email, setEmail] = useState("");
  const [errorText, setError] = useState("");
  const [changed, setChanged] = useState(false);
  const [isVerify, setVerify] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setDisable(true);
    const changeEmail = await FetchChangeUserEmail(email);
    if (changeEmail.success) {
      setChanged(true);
    } else {
      setError(changeEmail.error);
      setDisable(false);
    }
  };

  useEffect(() => {
    if (changed) {
      const interval = setInterval(async () => {
        const reloadUser = await CheckEmailVerification();
        if (reloadUser.success) {
          setVerify(true);
          clearInterval(interval);
        }
      }, 5000); // Kiểm tra mỗi 5 giây

      return () => clearInterval(interval); // Clear khi component unmount
    }
  }, [changed]);

  return (
    <>
      <HeadlineBack
        title="Change Email"
        openModal={() => openModal("", true, "")}
      />
      <div className="modal-content-wrapper">
        <Alert
          title={
            "A registration guide email will be sent to the email address you entered."
          }
        />

        <form onSubmit={handleSubmit} className="modal-form mt-2">
          {changed ? (
            <div
              className="yurei-logo-loading"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {isVerify ? (
                <>
                  <YureiLogoCompleted className="yurei-logo-loading" />
                  <div className="modal-description __text-center">
                    All done!
                  </div>
                </>
              ) : (
                <>
                  <YureiLogo className="yurei-logo-loading" />
                  <div className="modal-description __text-center">
                    Please verify your new email!
                  </div>
                </>
              )}
            </div>
          ) : (
            <InputForm
              label={"New Email"}
              onChange={(e) => setEmail(e.target.value)}
              name={"email"}
              type="email"
              subtitle={false}
              placeholder={"New Email"}
            />
          )}

          <div className="modal-error-alert">
            <p className="modal-error-alert-text">{errorText}</p>
          </div>

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

const ResetPassword = ({ setVisible, openModal, backModal, nextModal }) => {
  const { user } = UseUserMetaContext();
  const [email, setEmail] = useState("");
  const [errorText, setError] = useState("");
  const [isSend, setSend] = useState(false);
  const [isDisable, setDisable] = useState(false);

  const handleResetPassword = async () => {
    setDisable(true);
    const data = await FetchResetPassword(
      user && user?.email ? user.email : email
    );
    if (data.success) {
      setSend(true);
    } else {
      setError(data.error);
      console.error(data?.errorCode);
      setDisable(false);
    }
  };
  return (
    <>
      <HeadlineBack
        title="Reset Password"
        openModal={() => openModal("", true)}
      />
      <div className="modal-content-wrapper">
        <InputForm
          label={"Your Email"}
          onChange={(e) => setEmail(e.target.value)}
          name={"email"}
          type="email"
          subtitle={false}
          placeholder={"Enter your email"}
        />
        <div className="modal-error-alert">
          <p className="modal-error-alert-text">{errorText}</p>
        </div>
        <div className="modal-description">
          {isSend
            ? "Please check your email! If you can’t find it, please look in your spam folder."
            : `An email with instructions on how to reset your password will be sent
          to ${user?.email ? user?.email : email}`}
        </div>
        <div className="modal-actions">
          <button onClick={() => setVisible(false)} className="btn">
            Cancel
          </button>
          {isSend ? (
            <button
              onClick={() => openModal("", true)}
              className="btn btn-active"
            >
              Back to main menu
            </button>
          ) : (
            <button
              disabled={isDisable}
              onClick={handleResetPassword}
              className="btn btn-active"
            >
              Confirm
            </button>
          )}
        </div>
      </div>
    </>
  );
};

const EmailPasswordSignIn = ({ setVisible, openModal }) => {
  const [errorText, setError] = useState({ email: "", password: "" });
  const [values, setValues] = useState({ email: "", password: "" });
  const [modalError, setModalError] = useState("");
  const [isError, setIsError] = useState(false);
  const [isSent, setSent] = useState(false);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  };

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

  const onChangePassword = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSumbit = async (e) => {
    e.preventDefault();
    if (!isError) {
      setSent(true);
      const dataAuth = await FireBaseSignIn(values);
      if (dataAuth.success) {
        setVisible(false);
      } else {
        setSent(false);
        setModalError(dataAuth.error);
        console.error(dataAuth.errorCode);
      }
    }
  };

  const title =
    "If you switch to a different account, you will no longer be able to use the viewing plan or purchased content of your current account.";
  return (
    <>
      <HeadlineBack
        title="Email & Password Sign In"
        openModal={() => openModal("", true)}
      />
      <div className="modal-content-wrapper">
        <Alert title={title} />
        <div className="modal-description">
          You can switch accounts by entering the email address and password you
          set up on another device.
        </div>
        <form
          className="modal-form mt-2"
          onSubmit={handleSumbit}
          onKeyDown={handleKeyDown}
        >
          <InputForm
            name={"email"}
            onChange={onValidEmail}
            idFor="email"
            label="Email Address"
            type="text"
            placeholder="Enter your email"
            autocomplete={"true"}
            errorText={errorText["email"]}
          />
          <InputForm
            name={"password"}
            errorText={errorText["password"]}
            onChange={onChangePassword}
            type="password"
            subtitle={false}
          />

          <div className="modal-error-alert">
            <p className="modal-error-alert-text">{modalError}</p>
          </div>
          <Link
            onClick={() => openModal("reset-password")}
            className="__link-active"
          >
            Forgot Password
          </Link>

          <div className="modal-actions">
            <button
              type="button"
              onClick={() => setVisible(false)}
              className="btn"
            >
              Cancel
            </button>
            <button disabled={isSent} type="submit" className="btn btn-active">
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
      setNextModal();
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
