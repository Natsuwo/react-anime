import React, { useEffect, useState } from "react";
import InputForm from "../../Global/FormInput/FormInput";
import { UseUserMetaContext } from "../../../context/UserMeta";
import { validateOTP } from "../../../features/helper";
import { CreateDocument, FetchDocument } from "../../../features/useFetch";

const CreateOTPModal = ({ visible, setVisible }) => {
  const { user, userMetaData } = UseUserMetaContext();
  const [otpCode, setOtpCode] = useState("");
  const [errorText, setError] = useState("");
  const [isCreated, setCreate] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = validateOTP(otpCode);
    if (!isValid.valid) {
      setError(isValid.message);
    } else {
      const params = {
        otp_code: otpCode,
        created_at: new Date(Date.now()),
        expires_at: new Date(Date.now() + 10 * 60 * 1000),
        is_used: false,
        userId: userMetaData.userId,
        uid: user.uid,
      };
      const optCreate = await CreateDocument("OTPRequests", user?.uid, params);
      if (optCreate.success) {
        setCreate(true);
        setError("");
      } else {
        setError(optCreate.error);
      }
    }
  };

  useEffect(() => {
    const getOptCreated = async () => {
      if (user) {
        const otp = await FetchDocument("OTPRequests", user.uid);
        console.log(Date.now() > otp?.expires_at.toMillis());
        if (otp?.expires_at.toMillis() > Date.now()) {
          setCreate(true);
          setOtpCode(otp.otp_code);
        } else {
          setCreate(false);
          setOtpCode("");
        }
      }
    };
    getOptCreated();
  }, [isCreated]);
  return (
    <>
      <h1 className="modal-item-title">Profile</h1>
      <div className="modal-content-wrapper">
        <div className="modal-descripton">
          You can use this account on other devices by entering your ID and
          one-time password.
        </div>
        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-input-wrapper mb-2">
            <label>ID</label>
            <div className="modal-form-disabled">{userMetaData?.userId}</div>
          </div>
          {isCreated ? (
            <div className="form-input-wrapper mb-2">
              <label>One-Time Password</label>
              <div className="modal-form-disabled">{otpCode}</div>
            </div>
          ) : (
            <InputForm
              onChange={(e) => setOtpCode(e.target.value)}
              name="otp"
              idFor="otp"
              label="One-Time Password"
              placeholder="Enter your One-Time Password"
              buttonText="Accept"
              errorText={errorText}
            />
          )}
        </form>
        <div className="modal-description">
          <ul>
            <li>*Please enter 6 to 10 characters.</li>
            <li>*Do not use the same string as your ID.</li>
            <li>
              *Do not use only the same characters or consecutive numbers.
            </li>
            <li>*The one-time password is only valid for 10 minutes.</li>
          </ul>
        </div>
        <div className="modal-actions">
          <button onClick={() => setVisible(false)} className="btn">
            Cancel
          </button>
        </div>
      </div>
    </>
  );
};

export default CreateOTPModal;
