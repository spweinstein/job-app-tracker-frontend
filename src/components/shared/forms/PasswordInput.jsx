import React from "react";

const PasswordInput = ({ name, value, onChange, required }) => {
  return (
    <input
      type="password"
      autoComplete="off"
      id={name}
      value={value}
      name={name}
      onChange={onChange}
      required={required === true}
    />
  );
};

export default PasswordInput;
