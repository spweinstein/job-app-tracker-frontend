import React from "react";

const TextAreaInput = ({ name, value, onChange, required, error, ...rest }) => {
  return (
    <>
      <textarea
        autoComplete="off"
        id={name}
        value={value}
        name={name}
        onChange={onChange}
        required={required === true}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${name}-error` : undefined}
        {...rest}
      />
      {error ? (
        <span className="field-error" id={`${name}-error`} role="alert">
          {error}
        </span>
      ) : null}
    </>
  );
};

export default TextAreaInput;
