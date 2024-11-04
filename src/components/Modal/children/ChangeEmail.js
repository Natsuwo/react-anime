import React, { useEffect, useState } from "react";
import InputForm from "../../Global/FormInput/FormInput";
import HeadlineBack from "../component/HeadlineBack";
import {
  CheckEmailVerification,
  FetchChangeUserEmail,
} from "../../../features/useFetch";
import { ReactComponent as YureiLogo } from "../../../assets/images/yurei/yurei.svg";
import { ReactComponent as YureiLogoCompleted } from "../../../assets/images/yurei/yurei_oowarai.svg";
import Alert from "../component/Alert";

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

export default ChangeEmail;
