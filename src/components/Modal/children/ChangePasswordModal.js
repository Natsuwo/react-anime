import React from "react";
import { useState } from "react";
import { FetchChangePassword } from "../../../features/useFetch";
import HeadlineBack from "../component/HeadlineBack";
import InputForm from "../../Global/FormInput/FormInput";
import { validatePassword } from "../../../features/helper";

const ChangePasswordModal = ({
  setVisible,
  openModal,
  backModal,
  NextModal,
}) => {
  const [isDisable, setDisable] = useState(false);
  const [password, setPassword] = useState("");
  const [errorText, setError] = useState("");
  const [changed, setChanged] = useState(false);
  const [isError, setIsError] = useState(false);

  const onValidPassword = (e) => {
    const isPass = validatePassword(e.target.value);

    if (!isPass.success) {
      setError(isPass.error);
      setIsError(true);
    } else {
      setIsError(false);
      setError("");
    }

    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isError) {
      setDisable(true);
      const changePassword = await FetchChangePassword(password);
      if (changePassword.success) {
        setChanged(true);
        setVisible(false);
      } else {
        setError(changePassword.error);
        setDisable(false);
      }
    }
  };

  return (
    <>
      <HeadlineBack
        title="Change Password"
        openModal={() => openModal(backModal, "change-email-password")}
      />
      <div className="modal-content-wrapper">
        <form onSubmit={handleSubmit} className="modal-form mt-2">
          <InputForm
            label={"New Password"}
            onChange={onValidPassword}
            name={"password"}
            type="password"
            subtitle={true}
            placeholder={"New Password"}
          />
          <div className="modal-error-alert">
            <p className="modal-error-alert-text">{errorText}</p>
          </div>
          <div className="modal-description __text-center">
            {changed && "Your password changed!"}
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

export default ChangePasswordModal;
