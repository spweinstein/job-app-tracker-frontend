import { useState, useContext } from "react";
import { useNavigate } from "react-router";
import { register as registerUser } from "../services/authService";
import { UserContext } from "../contexts/UserContext.jsx";
import { PageContainer } from "./shared/layout/index.js";
import { FormContainer, FormField, TextInput, PasswordInput } from "./shared/forms/index.js";
import useErrors from "../hooks/useErrors.js";
import useForm from "../hooks/useForm.js";

const RegisterForm = () => {
  const {errors, addError, clearErrors} = useErrors();
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);
  
  const initialState = {
    username: "",
    password: "",
    passwordConf: "",
  };

  const onSubmit = async (formData) => {
    const newUser = await registerUser(formData);
    setUser(newUser);
    navigate("/");
  };

  const { register, formData, setFormData, fieldErrors, handleChange, handleSubmit, formErrors } = useForm(initialState, onSubmit);

  const isFormInvalid = () => {
    return !(formData.username && formData.password && formData.password === formData.passwordConf);
  };

  return (
    <PageContainer title="Sign Up" errors={errors}>
      <FormContainer onSubmit={handleSubmit} errors={formErrors}>
        <FormField label="Username">
          {/* <TextInput name="username" value={username} onChange={handleChange} required /> */}
          <TextInput {...register("username", (value) => value.length > 0 ? undefined : "Username is required")} />
        </FormField>
        <FormField label="Password">
          {/* <PasswordInput name="password" value={password} onChange={handleChange} required /> */}
          <PasswordInput {...register("password", (value) => value.length > 0 ? undefined : "Password is required")} />
        </FormField>
        <FormField label="Confirm Password">
          {/* <PasswordInput name="passwordConf" value={passwordConf} onChange={handleChange} required /> */}
          <PasswordInput {...register("passwordConf", (value) => value.length > 0 ? undefined : "Password confirmation is required")} />
        </FormField>
        <div>
          <button type="submit" disabled={isFormInvalid()}>
            Sign Up
          </button>
          <button onClick={() => navigate("/")}>Cancel</button>
        </div>
      </FormContainer>
    </PageContainer>
  );
};

export default RegisterForm;
