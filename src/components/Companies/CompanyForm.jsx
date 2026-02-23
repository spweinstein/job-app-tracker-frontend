import { useState, useEffect } from "react";
import { createCompany } from "../../services/companyService";
import { useNavigate } from "react-router";
import { FormRow, FormField, TextInput, TextAreaInput, FormContainer } from "../shared/forms";
import useErrors from "../../hooks/useErrors.js";
import { BackButton, SubmitButton, CancelButton } from "../shared/ui/index.js";

const CompanyForm = ({ setHeader = () => {} }) => {
  const {errors, addError, clearErrors} = useErrors();
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
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await createCompany(formData);
      navigate("/companies");
    } catch (e) {
      addError(e.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <FormContainer className="crud-form" onSubmit={handleSubmit} errors={errors}>
      <FormRow>
        <FormField label="Name">
          <TextInput
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </FormField>
        <FormField label="Website">
          <TextInput name="url" value={formData.url} onChange={handleChange} />
        </FormField>
      </FormRow>
      <FormField label="Description">
        <TextAreaInput
          name="description"
          value={formData.description}
          onChange={handleChange}
        />
      </FormField>
      <FormField label="Notes">
        <TextAreaInput
          name="notes"
          value={formData.notes}
          onChange={handleChange}
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
