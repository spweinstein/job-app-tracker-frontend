import React from "react";

const TextInput = ({ name, value, onChange, required }) => {
  return (
    <input
      type="text"
      autoComplete="off"
      id={name}
      value={value}
      name={name}
      onChange={onChange}
      required={required === true}
    />
  );
};

export default TextInput;
