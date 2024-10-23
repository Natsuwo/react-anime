import React from "react";

const InputForm = ({
  value,
  subtitle,
  label,
  placeholder,
  type = "text",
  idFor,
  disabled = false,
}) => {
  return (
    <span className="form-input-wrapper">
      <label htmlFor={idFor}>{label}</label>
      {subtitle && <span className="modal-sub-text">{subtitle}</span>}
      <input
        value={value}
        id={idFor}
        type={type}
        placeholder={placeholder}
        disabled={disabled}
      />
    </span>
  );
};

export default InputForm;
