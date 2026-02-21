import React from "react";

const DateInput = ({
  name,
  value,
  optionLabels,
  optionValues,
  onChange,
  required,
}) => {
  return (
    <input
      id={name}
      type="date"
      value={value}
      name={name}
      onChange={onChange}
      required={required === true}
    />
  );
};

export default DateInput;
