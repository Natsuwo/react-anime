import React from "react";
import InputForm from "../../Global/FormInput/FormInput";

const CreateOTPModal = ({ setVisible }) => {
  return (
    <>
      <h1 className="modal-item-title">Profile</h1>
      <div className="modal-content-wrapper">
        <div className="modal-descripton">
          You can use this account on other devices by entering your ID and
          one-time password.
        </div>
        <form className="modal-form">
          <InputForm value="dasdasdsad" label="ID" idFor="id" disabled={true} />
          <InputForm
            idFor="otp"
            label="One-Time Password"
            placeholder="Enter your One-Time Password"
            buttonText="Accept"
          />
          {/* <span className="form-input-wrapper">
            <label htmlFor="otp">One-Time Password</label>
            <div className="modal-otp-input">
              <input
                id="otp"
                type="text"
                placeholder="Enter your One-Time Password"
              />
              <button className="btn btn-active">Accept</button>
            </div>
          </span> */}
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
