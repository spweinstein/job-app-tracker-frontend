import { useState, useContext } from "react";
import { useNavigate, useLocation } from "react-router";
import { login } from "../services/authService";
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
import { loginBodySchema } from "../schemas/auth.js";
import "./shared/forms/AuthForm.css";

const initialState = {
  username: "",
  password: "",
};

const LoginForm = () => {
  const { errors, addError, clearErrors } = useErrors();
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);
  const location = useLocation();

  const onSubmit = async (formData) => {
    setSubmitting(true);
    clearErrors();
    try {
      const signedInUser = await login(formData);
      setUser(signedInUser);
      // get the from location from the state
      const loc = location.state?.from?.pathname || "/";
      navigate(loc);
    } catch (e) {
      addError(e.message);
    } finally {
      setSubmitting(false);
    }
  };

  const { register, fieldErrors, handleSubmit, formErrors } = useForm(
    initialState,
    onSubmit,
    { schema: loginBodySchema },
  );

  return (
    <PageContainer  errors={errors}>
      <FormContainer
        className="auth-form"
        onSubmit={handleSubmit}
        errors={formErrors}
      >
        <FormField label="Username">
          <TextInput {...register("username")} error={fieldErrors.username} />
        </FormField>
        <FormField label="Password">
          <PasswordInput
            {...register("password")}
            error={fieldErrors.password}
          />
        </FormField>
        <div className="form-actions">
          <SubmitButton loading={submitting}>Sign In</SubmitButton>
          <CancelButton onClick={() => navigate("/")} />
        </div>
      </FormContainer>
    </PageContainer>
  );
};

export default LoginForm;
