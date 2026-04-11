import { useState, useContext } from "react";
import { useNavigate } from "react-router";
import { register as registerUser } from "../services/authService";
import { UserContext } from "../contexts/UserContext.jsx";
import { PageContainer } from "./shared/layout/index.js";
import {
  FormContainer,
  FormField,
  TextInput,
  PasswordInput,
} from "./shared/forms/index.js";
import { SubmitButton, CancelButton } from "./shared/ui/index.js";
import useErrors from "../hooks/useErrors.js";
import useForm from "../hooks/useForm.js";
import { registerFormSchema } from "../schemas/auth.js";
import "./shared/forms/AuthForm.css";

const RegisterForm = () => {
  const { errors, addError } = useErrors();
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  const initialState = {
    username: "",
    password: "",
    passwordConf: "",
  };

  const onSubmit = async (formData) => {
    setSubmitting(true);
    try {
      const newUser = await registerUser(formData);
      setUser(newUser);
      navigate("/");
    } catch (e) {
      addError(e.message);
    } finally {
      setSubmitting(false);
    }
  };

  const { register, fieldErrors, handleSubmit, formErrors } = useForm(
    initialState,
    onSubmit,
    { schema: registerFormSchema },
  );

  return (
    <PageContainer errors={errors}>
      <FormContainer
        className="auth-form"
        onSubmit={handleSubmit}
        errors={formErrors}
      >
        <h2>Sign Up</h2>
        <FormField label="Username">
          <TextInput {...register("username")} error={fieldErrors.username} />
        </FormField>
        <FormField label="Password">
          <PasswordInput
            {...register("password")}
            error={fieldErrors.password}
          />
        </FormField>
        <FormField label="Confirm Password">
          <PasswordInput
            {...register("passwordConf")}
            error={fieldErrors.passwordConf}
          />
        </FormField>
        <div>
          <SubmitButton loading={submitting}>Sign Up</SubmitButton>
          <CancelButton onClick={() => navigate("/")} />
        </div>
      </FormContainer>
    </PageContainer>
  );
};

export default RegisterForm;
