import { useState } from "react";
import { createCompany } from "../../services/companyService";
import { useNavigate } from "react-router";
import { FormRow, FormField, TextInput, TextAreaInput, FormContainer } from "../shared/forms";
import { PageContainer } from "../shared/layout";
import useErrors from "../../hooks/useErrors.js";

const CompanyForm = () => {
  const {errors, addError, clearErrors} = useErrors();
  const [formData, setFormData] = useState({
    name: "",
    url: "",
    description: "",
    notes: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(formData);
      const res = await createCompany(formData);
      navigate("/companies");
    } catch (e) {
      addError(e.message);
    }
  };

  return (
    <PageContainer title="New Company" errors={errors}>
      <FormContainer className="crud-form" onSubmit={handleSubmit}>
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
          <button type="submit">Add New Company</button>
        </div>
      </FormContainer>
    </PageContainer>
  );
};

export default CompanyForm;
