import { useState } from "react";
import { createCompany } from "../../services/companyService";
import { useNavigate } from "react-router";
import { FormField, TextInput, FormContainer } from "../shared/forms";
import { PageContainer } from "../shared/layout";
const CompanyForm = () => {
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
    const res = await createCompany(formData);
    console.log(res);
    navigate("/companies");
  };

  return (
    <PageContainer title="New Company">
      <FormContainer className="crud-form" onSubmit={handleSubmit}>
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
        <FormField label="Description">
          <TextInput
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </FormField>
        <FormField label="Notes">
          <TextInput
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
