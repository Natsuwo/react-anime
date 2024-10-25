import React from "react";
import InputForm from "../../../Global/FormInput/FormInput";

const EmailUnsubscribe = () => {
  return (
    <>
      <h2 className="manager-title">Unsubscribe notification email address</h2>
      <div className="manager-sub-text mb-md">
        You can unsubscribe from the notification email address below.
      </div>
      <form className="main-form">
        <InputForm
          widthForm={"350px"}
          className={"dark-theme"}
          placeholder={"Enter email address"}
          label={"Email Address"}
        />
        <button
          className="btn btn-danger"
          style={{ display: "block", padding: "12px 50px" }}
          disabled={true}
        >
          Unsubscribe
        </button>
      </form>
    </>
  );
};

export default EmailUnsubscribe;
