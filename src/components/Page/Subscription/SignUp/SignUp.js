import React from "react";
import InputForm from "../../../Global/FormInput/FormInput";
import { Link } from "react-router-dom";
import "./SignUp.css";

const SignUp = () => {
  return (
    <main className="page-main">
      <div className="page-container">
        <h1 className="main-title mb-2">Sign up</h1>
        <div className="subscription-step my-auto">Step 1/2</div>
        <h2 className="sub-title my-auto">Account Settings</h2>
        <div className="subtitle-description">
          To register for YureiTV Premium, you will need to register an email
          address and password.
        </div>

        <div className="signup-container mt-2">
          <form className="main-form">
            <InputForm
              placeholder={"Email Address"}
              widthForm={"400px"}
              label={"Email Address"}
            />
            <InputForm type="password" widthForm={"400px"} label={"Password"} />

            <Link className="__text-active my-auto">
              Switch to a registered account
            </Link>
            <div className="subtitle-description mb-2">
              Please review and agree to our{" "}
              <Link className="__text-active">Terms of Use</Link> and{" "}
              <Link className="__text-active">Privacy Policy</Link> before
              submitting.
            </div>
            <button className="btn btn-active">Accept & Signup</button>
          </form>
          <div className="mt-2">
            The email address obtained will be used for the following purposes:
          </div>
          <div className="subtitle-description">
            <ul className="my-auto">
              <li>
                Responding to inquiries and contacting you regarding surveys
              </li>
              <li>Contacting you about purchase details and services</li>
              <li>Information about new programs, recommendations, etc.</li>
              <li>Contacting you about campaigns and giveaways</li>
            </ul>
            <p>
              The above contact may be made by affiliated companies commissioned
              by our company.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default SignUp;
