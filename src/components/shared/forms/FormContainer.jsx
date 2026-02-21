import React from "react";
import "./FormField.css";

const FormContainer = ({ children, onSubmit }) => {
  return (
    <form className="crud-form" onSubmit={onSubmit}>
      {children}
    </form>
  );
};

export default FormContainer;
