import React from "react";

const DateInput = ({
  name,
  value,
  onChange,
  required,
  error,
}) => {
  return (
    <>
      <input
        id={name}
        type="date"
        value={value}
        name={name}
        onChange={onChange}
        required={required === true}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${name}-error` : undefined}
      />
      {error ? (
        <span className="field-error" id={`${name}-error`} role="alert">
          {error}
        </span>
      ) : null}
    </>
  );
};

export default DateInput;
