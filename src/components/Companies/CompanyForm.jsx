import { useState, useEffect } from "react";
import { createCompany } from "../../services/companyService";
import { useNavigate } from "react-router";
import {
  FormRow,
  FormField,
  TextInput,
  TextAreaInput,
  FormContainer,
} from "../shared/forms";
import useErrors from "../../hooks/useErrors.js";
import { BackButton, SubmitButton, CancelButton } from "../shared/ui/index.js";
import { useOutletContext } from "react-router";
import { companySubmitSchema } from "../../schemas/companies.js";
import { flattenZodErrors } from "../../schemas/common.js";

const CompanyForm = () => {
  const { setHeader } = useOutletContext();
  const { errors, addError, clearErrors } = useErrors();
  const [fieldErrors, setFieldErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    url: "",
    description: "",
    notes: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    setHeader({
      title: "New Company",
      actions: <BackButton onClick={() => navigate(-1)} />,
    });
  }, [navigate, setHeader]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    clearErrors();
    setFieldErrors({});
    const parsed = companySubmitSchema.safeParse(formData);
    if (!parsed.success) {
      setFieldErrors(flattenZodErrors(parsed.error));
      return;
    }
    setSubmitting(true);
    try {
      await createCompany(parsed.data);
      navigate("/companies");
    } catch (err) {
      addError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <FormContainer
      className="crud-form"
      onSubmit={handleSubmit}
      errors={errors}
    >
      <FormRow>
        <FormField label="Name">
          <TextInput
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            error={fieldErrors.name}
          />
        </FormField>
        <FormField label="Website">
          <TextInput
            name="url"
            value={formData.url}
            onChange={handleChange}
            error={fieldErrors.url}
          />
        </FormField>
      </FormRow>
      <FormField label="Description">
        <TextAreaInput
          name="description"
          value={formData.description}
          onChange={handleChange}
          error={fieldErrors.description}
        />
      </FormField>
      <FormField label="Notes">
        <TextAreaInput
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          error={fieldErrors.notes}
        />
      </FormField>
      <div className="actions">
        <SubmitButton loading={submitting}>Add New Company</SubmitButton>
        <CancelButton onClick={() => navigate(-1)} />
      </div>
    </FormContainer>
  );
};

export default CompanyForm;
