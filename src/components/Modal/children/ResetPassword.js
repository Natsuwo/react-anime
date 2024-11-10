import React, { useState } from "react";
import { UseUserMetaContext } from "../../../context/UserMeta";
import { FetchResetPassword } from "../../../features/useFetch";
import HeadlineBack from "../component/HeadlineBack";
import InputForm from "../../Global/FormInput/FormInput";

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

export default ResetPassword;
