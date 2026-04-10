import React from "react";

const SelectInput = ({
  name,
  value,
  optionLabels,
  optionValues,
  onChange,
  required,
  error,
}) => {
  return (
    <>
      <select
        id={name}
        value={value}
        name={name}
        onChange={onChange}
        required={required === true}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${name}-error` : undefined}
      >
        <option value="">Select a {name}</option>

        {optionValues.map((optionVal, idx) => (
          <option key={optionVal} value={optionVal}>
            {optionLabels[idx]}
          </option>
        ))}
      </select>
      {error ? (
        <span className="field-error" id={`${name}-error`} role="alert">
          {error}
        </span>
      ) : null}
    </>
  );
};

export default SelectInput;
