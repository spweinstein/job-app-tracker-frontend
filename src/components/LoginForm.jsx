import { useState, useContext } from "react";
import { useNavigate } from "react-router";
import { login } from "../services/authService";
import { UserContext } from "../contexts/UserContext.jsx";
import { PageContainer } from "./shared/layout/index.js";
import { FormContainer, FormField, TextInput, PasswordInput, FormRow } from "./shared/forms/index.js";
import useErrors from "../hooks/useErrors.js";
import useForm from "../hooks/useForm.js";

const validate = (formData) => {
  const errors = {};
  if (!formData.username) {
    errors.username = "Username is required";
  }
  return errors;
};

const initialState = {
  username: "",
  password: "",
};

const LoginForm = () => {
  const {errors, addError, clearErrors} = useErrors();
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);
  
  const onSubmit = async (formData) => {
    const signedInUser = await login(formData);
    setUser(signedInUser);
    navigate("/");
  };

  const { register,formData, setFormData, fieldErrors, handleChange, handleSubmit, formErrors } = useForm(initialState, onSubmit);


  return (
    <PageContainer title="Sign In" errors={errors}>
      <FormContainer onSubmit={handleSubmit} errors={formErrors}>
        <FormField label="Username">
          <TextInput {...register("username", (value) => value.length > 0 ? undefined : "Username is required")} />
        </FormField>
        <FormField label="Password">
          <PasswordInput {...register("password", (value) => value.length > 0 ? undefined : "Password is required")} />
        </FormField>
        <div className="form-actions">
          <button type="submit">Sign In</button>
          <button onClick={() => navigate("/")}>Cancel</button>
        </div>
      </FormContainer>
    </PageContainer>
  );
};

export default LoginForm;
