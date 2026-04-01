import React from "react";

const PasswordInput = ({ name, value, onChange, required, error, ...rest }) => {
  return (
    <>
      <input
        type="password"
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

export default PasswordInput;
