import React, { useState } from "react";
import UseIconList from "../../Global/SvgList/UseIconList";

const PasswordForm = ({ subtitle = true }) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <span className="form-input-wrapper">
      <label htmlFor="password">Password</label>
      {subtitle && (
        <span className="modal-sub-text">
          The password must be 8 to 32 characters long and must contain only
          alphanumeric characters and the symbols "_ (underscore)" and "-
          (hyphen)". Do not use the same characters or consecutive numbers.
        </span>
      )}

      <span className="form-input-password">
        <input
          id="password"
          type={showPassword ? "text" : "password"}
          placeholder="Enter your password"
        />
        <span
          className="modal-password-icon"
          onClick={() => setShowPassword(!showPassword)}
        >
          <UseIconList icon={showPassword ? "view" : "view-off"} />
        </span>
      </span>
    </span>
  );
};

export default PasswordForm;
