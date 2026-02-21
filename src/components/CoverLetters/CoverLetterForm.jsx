import { useState } from "react";
import { createCoverLetter } from "../../services/coverLetterService.js";
import { useNavigate } from "react-router";
import { PageContainer } from "../shared/layout/index.js";
import {
  TextInput,
  TextAreaInput,
  FormContainer,
  FormField,
} from "../shared/forms/index.js";

const CoverLetterForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    body: "",
    notes: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createCoverLetter(formData);
    navigate("/cover-letters");
  };

  return (
    <PageContainer title="New Cover Letter">
      <FormContainer className="crud-form" onSubmit={handleSubmit}>
        <FormField label="Name">
          <TextInput
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </FormField>

        <FormField label="Body">
          <TextAreaInput
            name="body"
            value={formData.body}
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
        <button type="submit">Save Cover Letter</button>
      </FormContainer>
    </PageContainer>
  );
};

export default CoverLetterForm;
