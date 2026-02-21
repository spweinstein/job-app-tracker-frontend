import React from "react";

const SelectInput = ({
  name,
  value,
  optionLabels,
  optionValues,
  onChange,
  required,
}) => {
  return (
    <select
      id={name}
      value={value}
      name={name}
      onChange={onChange}
      required={required === true}
    >
      <option value="">Select a {name}</option>

      {optionValues.map((optionVal, idx) => (
        <option key={optionVal} value={optionVal}>
          {optionLabels[idx]}
        </option>
      ))}
    </select>
  );
};

export default SelectInput;
