import React, { useEffect, useRef, useState } from "react";
import UseIconList from "../../Global/SvgList/UseIconList";
import InputForm from "../../Global/FormInput/FormInput";
import Avatar from "react-avatar";
import { UseUserMetaContext } from "../../../context/UserMeta";

const EditAccountModal = ({ visible, setVisible }) => {
  const avatarRef = useRef(null);
  const { userMetaData, handleUserMetaData } = UseUserMetaContext();
  const [values, setValues] = useState({
    user_name: userMetaData.user_name || "",
    avatar: userMetaData.avatar || "",
  });
  const [onError, setError] = useState("");
  const [isShow, setIsShow] = useState(false);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (!file) {
      setError("Please select a file to upload!");
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      // 2MB
      setError("Do not upload a file more than 2MB.");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result.split(",")[1]; // Lấy chuỗi base64 mà không có tiền tố data
      setValues({
        ...values,
        [event.target.name]: base64String,
      });
    };
    reader.readAsDataURL(file); // Chuyển đổi file thành chuỗi Base64
    setError(""); // Reset lỗi nếu có
    setIsShow(false);
  };
  const handleSumbit = (e) => {
    e.preventDefault();
    handleUserMetaData({
      user_name: values.user_name,
      avatar: values.avatar,
    });
    setVisible(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  };

  useEffect(() => {
    setValues({
      user_name: userMetaData.user_name || "",
      avatar: userMetaData.avatar || "",
    });
    const handleClickOutside = (event) => {
      if (avatarRef.current && !avatarRef.current.contains(event.target)) {
        setIsShow(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [userMetaData.avatar, userMetaData.user_name]);
  return (
    <>
      <form
        onSubmit={handleSumbit}
        onKeyDown={handleKeyDown}
        className="modal-form"
      >
        <fieldset>
          <legend>
            <h1 className="modal-item-title">Profile</h1>
          </legend>
          <div className="upload-avatar" ref={avatarRef}>
            <button
              type="button"
              className="modal-upload-btn"
              onClick={() => setIsShow(!isShow)}
            >
              <span className="avatar-img">
                {values && values?.avatar ? (
                  <img
                    src={`data:image/jpeg;base64,${values?.avatar}`}
                    alt=""
                  />
                ) : (
                  <Avatar name="Guest" size={120} />
                )}
              </span>
              <span className="upload-icon">
                <UseIconList icon="camera" />
              </span>
            </button>
            {isShow && (
              <ul className="upload-action-list">
                <li className="upload-action-item">
                  <span className="upload-action-text">Choose a image</span>
                  <input
                    name="avatar"
                    onChange={handleFileChange}
                    className="modal-input-file"
                    type="file"
                    accept="image/*"
                  />
                </li>
                <li className="upload-action-item">
                  <span
                    className="upload-action-text"
                    style={{ color: "var(--color-danger)" }}
                  >
                    Delete image
                  </span>
                </li>
              </ul>
            )}
          </div>
          <div className="modal-description">
            Please do not set content that violates the Terms of Service. <br />
            We may delete or suspend your account.
          </div>
          <InputForm
            value={values?.user_name}
            name="user_name"
            onChange={(e) =>
              setValues({ ...values, [e.target.name]: e.target.value })
            }
            placeholder={"Enter your Nickname"}
          />
          <div className="modal-error-alert">
            <p className="modal-error-alert-text">{onError}</p>
          </div>
          <div className="modal-actions">
            <button
              type="button"
              onClick={() => setVisible(false)}
              className="btn"
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-active">
              Confirm
            </button>
          </div>
        </fieldset>
      </form>
    </>
  );
};

export default EditAccountModal;
