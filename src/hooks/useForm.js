// useForm.js

import { useState } from "react";
import useErrors from "./useErrors.js";

const useForm = (initialState, onSubmit) => {
  const [formData, setFormData] = useState(initialState);
  const [fieldErrors, setFieldErrors] = useState({});
  const {errors, addError, clearErrors} = useErrors();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    clearErrors();
    try {
        await onSubmit(formData);
    } catch (err) {
        addError(err.message);
    }
  };

  const register = (name, validate=()=>true) => {
    return {
      onChange: (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        setFieldErrors((prev) => ({ ...prev, [name]: validate(value) }));
      },
      value: formData[name],
      error: fieldErrors[name],
      name
    }
};

  return { formData, setFormData, fieldErrors, handleChange, handleSubmit, formErrors: errors, register };
};

export default useForm;