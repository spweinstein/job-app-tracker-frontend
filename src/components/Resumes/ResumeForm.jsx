import { useState } from "react";
import { createResume } from "../../services/resumeService.js";
import { useNavigate } from "react-router";
import { FormField, TextInput, TextAreaInput, FormContainer } from "../shared/forms";
import { PageContainer } from "../shared/layout";

const ResumeForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    link: "",
    summary: "",
    notes: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createResume(formData);
    navigate("/resumes");
  };

  return (
    <PageContainer title="New Resume">
      <FormContainer onSubmit={handleSubmit}>
        <FormField label="Name">
          <TextInput
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </FormField>
        <FormField label="Link">
          <TextInput name="link" value={formData.link} onChange={handleChange} />
        </FormField>
        <FormField label="Summary">
          <TextInput
            name="summary"
            value={formData.summary}
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
          <button type="submit">Add Resume</button>
        </div>
      </FormContainer>
    </PageContainer>
  );
};

export default ResumeForm;
