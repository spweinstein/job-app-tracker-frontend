import React from "react";

const TextAreaInput = ({ name, value, onChange, required }) => {
  return (
    <textarea
      autoComplete="off"
      id={name}
      value={value}
      name={name}
      onChange={onChange}
      required={required === true}
    />
  );
};

export default TextAreaInput;
