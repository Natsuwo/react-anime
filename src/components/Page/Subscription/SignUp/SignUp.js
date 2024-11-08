import React, { useEffect, useState } from "react";
import InputForm from "../../../Global/FormInput/FormInput";
import { Link, useNavigate } from "react-router-dom";
import "./SignUp.css";
import { UseUserMetaContext } from "../../../../context/UserMeta";
import { isValidEmail } from "../../../../features/helper";
import { validatePassword } from "../../../../features/helper";
import { CreatePayment, FireBaseSignUp } from "../../../../features/useFetch";
import VerifyEmailModal from "../../../Modal/children/VerifyEmailModal";
import Modal from "../../../Modal/Modal";

const SignUp = () => {
  const [errorText, setError] = useState({
    email: "",
    password: "",
    re_password: "",
  });
  const [isError, setIsError] = useState(false);
  const [values, setValues] = useState({
    email: "",
    password: "",
    re_password: "",
  });
  const [isSent, setSent] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const { user, userId, userMetaData } = UseUserMetaContext();
  const navigate = useNavigate();

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
        setIsVisible(true);
      } else {
        setSent(false);
      }
    }
  };

  useEffect(() => {
    if (user?.emailVerified && userMetaData?.subscription_level === 1) {
      (async () => {
        const paymentlocal = localStorage.getItem("PAYMENT")
          ? JSON.parse(localStorage.getItem("PAYMENT"))
          : "";
        if (!paymentlocal) {
          navigate("/account");
          return;
        }
        const payment = await CreatePayment(
          user.uid,
          paymentlocal.amount,
          paymentlocal.vnd_amount,
          paymentlocal.period,
          paymentlocal.level
        );
        if (payment.success) {
          localStorage.removeItem("PAYMENT");
          navigate(`/subscription/` + payment.uid);
        }
      })();
    }
  }, [user?.emailVerified]);
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
          <form onSubmit={handleSumbit} className="main-form">
            <InputForm
              onChange={onValidEmail}
              name="email"
              value={values.email}
              placeholder={"Email Address"}
              widthForm={"400px"}
              label={"Email Address"}
              errorText={errorText["email"]}
            />
            <InputForm
              onChange={onValidPassword}
              idFor={"password"}
              name={"password"}
              errorText={errorText["password"]}
              type="password"
              widthForm={"400px"}
              label={"Password"}
            />
            <InputForm
              onChange={(e) => {
                if (e.target.value !== values.password) {
                  setError((prev) => ({
                    ...prev,
                    re_password: "Confirm password not match with password!",
                  }));
                  setIsError(true);
                } else {
                  setIsError(false);
                  setError((prev) => ({
                    ...prev,
                    re_password: "",
                  }));
                }
              }}
              idFor={"re_password"}
              name={"re_password"}
              errorText={errorText["re_password"]}
              type="password"
              widthForm={"400px"}
              label={"Confirm Password"}
              subtitle={false}
              placeholder={"Enter password again"}
            />

            <Link className="__text-active my-auto">
              Switch to a registered account
            </Link>
            <div className="subtitle-description mb-2">
              Please review and agree to our{" "}
              <Link className="__text-active">Terms of Use</Link> and{" "}
              <Link className="__text-active">Privacy Policy</Link> before
              submitting.
            </div>
            <button disabled={isSent} type="submit" className="btn btn-active">
              Accept & Signup
            </button>
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
        <Modal visible={isVisible} setVisible={setIsVisible}>
          {isVisible && (
            <VerifyEmailModal setVisible={setIsVisible}></VerifyEmailModal>
          )}
        </Modal>
      </div>
    </main>
  );
};

export default SignUp;
