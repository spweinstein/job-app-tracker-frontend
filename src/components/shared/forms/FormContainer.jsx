import React from "react";
import "./FormField.css";
import "./FormRow.css";

const FormContainer = ({ children, onSubmit, errors, className }) => {
  return (
    <>
      {errors && <div id="error-message">{
        errors.map((error) => (
          <p key={error}>{error}</p>
        ))
      }</div>}
      <form className={`crud-form ${className}`} onSubmit={onSubmit}>
        {children}
      </form>
    </>
  );
};

export default FormContainer;
