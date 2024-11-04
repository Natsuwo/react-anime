import React, { useState } from "react";
import HeadlineBack from "../component/HeadlineBack";
import { isValidEmail } from "../../../features/helper";
import { FireBaseSignIn } from "../../../features/useFetch";
import Alert from "../component/Alert";
import InputForm from "../../Global/FormInput/FormInput";
import { Link } from "react-router-dom";

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

export default EmailPasswordSignIn;
