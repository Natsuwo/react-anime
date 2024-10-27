import React, { useState } from "react";
import "./FormInput.css";
import UseIconList from "../SvgList/UseIconList";

const PasswordForm = ({
  className,
  value,
  subtitle = true,
  label = "Password",
  placeholder = "Enter your password",
  type,
  idFor,
  disabled = false,
  widthForm,
  heightForm,
  children,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <span className="form-input-wrapper">
      <label htmlFor={idFor}>{label}</label>
      {subtitle && (
        <span className="modal-sub-text">
          {children
            ? children
            : `The password must be 8 to 32 characters long and must contain only
          alphanumeric characters and the symbols "_ (underscore)" and "-
          (hyphen)". Do not use the same characters or consecutive numbers.`}
        </span>
      )}

      <span className="form-input-password" style={{ width: widthForm }}>
        <input
          className={className}
          style={{ width: widthForm, height: heightForm }}
          id={idFor}
          type={showPassword ? "text" : "password"}
          placeholder={placeholder}
          disabled={disabled}
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

const InputCheckBoxForm = ({ name, onChange, checked }) => {
  return (
    <span
      className={`main-checkbox${checked ? " active" : ""}`}
      onClick={onChange}
    >
      <div className="checkbox-item">
        <input
          name={name}
          onChange={() => {}}
          type="checkbox"
          checked={checked}
        />
        <span className="main-checkbox-icon">
          <UseIconList icon="done" />
        </span>
      </div>
    </span>
  );
};

const InputFormDefault = ({
  className,
  value,
  subtitle,
  label,
  placeholder,
  type,
  idFor,
  disabled = false,
  widthForm,
  heightForm,
  buttonText,
  autocomplete,
  onChange,
}) => {
  return (
    <span className="form-input-wrapper">
      <label htmlFor={idFor}>{label}</label>
      {subtitle && <span className="modal-sub-text">{subtitle}</span>}
      <div className="input-flex-with-button">
        <input
          className={className}
          style={{ width: widthForm, height: heightForm }}
          value={value}
          id={idFor}
          type={type}
          placeholder={placeholder}
          disabled={disabled}
          autoComplete={autocomplete}
          onChange={onChange}
        />
        {buttonText && <button className="btn btn-active">{buttonText}</button>}
      </div>
    </span>
  );
};

const InputForm = ({
  name,
  className,
  value,
  subtitle,
  label,
  placeholder,
  type = "text",
  idFor,
  disabled = false,
  widthForm,
  buttonText,
  checked,
  onChange,
  heightForm = "44px",
  autocomplete,
}) => {
  return (
    <>
      {type === "checkbox" && (
        <InputCheckBoxForm name={name} checked={checked} onChange={onChange} />
      )}
      {type === "password" && (
        <PasswordForm
          className={className}
          value={value}
          subtitle={subtitle}
          label={label}
          placeholder={placeholder}
          type={type}
          idFor={idFor}
          disabled={disabled}
          widthForm={widthForm}
          heightForm={heightForm}
        />
      )}
      {type !== "checkbox" && type !== "password" && (
        <InputFormDefault
          className={className}
          value={value}
          subtitle={subtitle}
          label={label}
          placeholder={placeholder}
          type={type}
          idFor={idFor}
          disabled={disabled}
          widthForm={widthForm}
          heightForm={heightForm}
          buttonText={buttonText}
          autocomplete={autocomplete}
          onChange={onChange}
        />
      )}
    </>
  );
};

export default InputForm;
