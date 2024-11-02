import React, { useEffect, useState } from "react";
import { ReactComponent as YureiLogo } from "../../../assets/images/yurei/yurei.svg";
import { ReactComponent as YureiLogoCompleted } from "../../../assets/images/yurei/yurei_oowarai.svg";
import Alert from "../component/Alert";
import {
  CheckEmailVerification,
  SendMailAgain,
} from "../../../features/useFetch";

const VerifyEmailModal = ({ setVisible, openModal }) => {
  const [isVerify, setVerify] = useState(false);
  const [isSend, setSend] = useState(false);
  const [errorText, setError] = useState("");

  const onSend = async () => {
    setSend(true);
    try {
      const data = await SendMailAgain();
      if (data.success) {
        setError("Another email has sent to your email! Check it!");
      } else {
        setError(data.error);
      }
    } catch (err) {
      setError(err.message);
    }
  };
  useEffect(() => {
    const interval = setInterval(async () => {
      const reloadUser = await CheckEmailVerification();
      if (reloadUser.success) {
        setError("");
        setVerify(true);
        clearInterval(interval);
      }
    }, 5000); // Kiểm tra mỗi 5 giây

    return () => clearInterval(interval); // Clear khi component unmount
  }, []);
  return (
    <>
      <h1 className="modal-item-title">Verify Email</h1>
      <div className="modal-content-wrapper">
        <div className="modal-descripton">
          A confirmation email has been sent to your email address. Please check
          it. If you can’t find it, please look in your spam folder.
        </div>
        <Alert title="Click the link we've sent to your mail to verify!"></Alert>
        <div
          className="yurei-logo-loading"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {isVerify ? (
            <YureiLogoCompleted className="yurei-logo-loading"></YureiLogoCompleted>
          ) : (
            <YureiLogo className="yurei-logo-loading"></YureiLogo>
          )}
        </div>
        <div className="modal-description" style={{ textAlign: "center" }}>
          {isVerify
            ? "Wow! All Done! You can close this tab!"
            : "Just wait a little bit..."}
        </div>
        <div className="modal-error-alert">
          <p className="modal-error-alert-text __text-center">{errorText}</p>
        </div>
        <div className="modal-actions">
          {isVerify ? (
            <button onClick={() => setVisible(false)} className="btn">
              Close
            </button>
          ) : (
            <button
              disabled={isSend}
              onClick={onSend}
              className="btn btn-green mt-2"
            >
              Send another email
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default VerifyEmailModal;
