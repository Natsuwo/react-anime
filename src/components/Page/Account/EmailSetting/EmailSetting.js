import React, { useState } from "react";
import InputForm from "../../../Global/FormInput/FormInput";
import "./EmailSetting.css";
import { Link } from "react-router-dom";

const EmailSetting = () => {
  const [listCheck, setListCheck] = useState({
    item1: false,
    item2: false,
    item3: false,
    all: false,
  });
  const [privacyCheck, setPrivacyCheck] = useState(false);
  const arrCheckList = [
    {
      id: "item1",
      title: "Latest Infomation",
      desc: "We bring you information on recommended stuffs, new stuffs, and popular videos.",
    },
    {
      id: "item2",
      title: "My List",
      desc: `We will send you updates on videos you have added to your "My List".`,
    },
    {
      id: "item3",
      title: "Our Survey",
      desc: "Please let us know your opinions so we can improve our services.",
    },
    {
      id: "all",
      title: "Choose all / Delete all",
    },
  ];

  const handleClick = (id) => {
    handleCheckboxChange(id);
  };

  const handleCheckboxChange = (id) => {
    if (id === "all") {
      const newValue = !listCheck.all;
      setListCheck({
        item1: newValue,
        item2: newValue,
        item3: newValue,
        all: newValue,
      });
    } else {
      const uploadListCheck = {
        ...listCheck,
        [id]: !listCheck[id],
      };
      uploadListCheck.all =
        uploadListCheck.item1 && uploadListCheck.item2 && uploadListCheck.item3;
      setListCheck(uploadListCheck);
    }
  };
  return (
    <>
      <h2 className="manager-title">Mail Notify Settings</h2>
      <div className="manager-sub-text">
        To set up email notifications, please follow the steps below.
      </div>
      <form className="main-form mt-2">
        <InputForm
          className={"dark-theme"}
          type="email"
          placeholder={"Enter your email address"}
          label={"Email Address"}
          widthForm={"350px"}
        />

        <ul className="subscription-wrapper mt-2">
          {arrCheckList.map((item) => (
            <li
              key={item.id}
              className="subscription-item"
              onClick={() => handleClick(item.id)}
            >
              <div className="subscription-item-inner">
                <InputForm
                  type="checkbox"
                  name={item.id}
                  checked={listCheck[item.id]}
                  onChange={() => handleCheckboxChange(item.id)}
                />
                <span className="subscription-detail">
                  <div className="subscription-tile">{item.title}</div>
                  {item.desc && (
                    <div className="manager-sub-text">{item.desc}</div>
                  )}
                </span>
              </div>
            </li>
          ))}
        </ul>
        <div className="manager-policy-checkbox">
          <span className="icon-check">
            <InputForm
              type="checkbox"
              name="privacy"
              onChange={() => setPrivacyCheck(!privacyCheck)}
              checked={privacyCheck}
            />
          </span>
          <span className="manager-sub-text" style={{ fontSize: "var(--h5)" }}>
            I agree to the{" "}
            <Link style={{ color: "var(--link-active)" }} to="/privacy-policy">
              Privacy Policy
            </Link>
          </span>
        </div>
        <div className="manager-actions">
          <button className="btn btn-active" disabled={true}>
            Register
          </button>
          <Link className="__text-active" to={"/mailnotify/unsubscribe"}>
            Click here to unsubscribe from notifications
          </Link>
        </div>
      </form>
    </>
  );
};

export default EmailSetting;
