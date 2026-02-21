import React from "react";
import "./FormField.css";

const FormField = ({ name, label, children }) => {
  return (
    <div className="field">
      <label htmlFor={name}>{label}</label>
      {children}
    </div>
  );
};

export default FormField;
