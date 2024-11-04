import React, { useState } from "react";
import { UseUserMetaContext } from "../../../context/UserMeta";
import { isValidEmail, validatePassword } from "../../../features/helper";
import { FireBaseSignUp } from "../../../features/useFetch";
import Alert from "../component/Alert";
import { Link } from "react-router-dom";
import InputForm from "../../Global/FormInput/FormInput";

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

export default ModalSignUp;
