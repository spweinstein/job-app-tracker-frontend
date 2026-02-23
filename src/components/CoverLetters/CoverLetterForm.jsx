import { useState, useEffect } from "react";
import { createCoverLetter, getCoverLetter } from "../../services/coverLetterService.js";
import { useNavigate, useSearchParams } from "react-router";
import { PageContainer } from "../shared/layout/index.js";
import {
  TextInput,
  TextAreaInput,
  FormContainer,
  FormField,
} from "../shared/forms/index.js";
import useErrors from "../../hooks/useErrors.js";

const CoverLetterForm = () => {
  const {errors, addError, clearErrors} = useErrors();
  const [formData, setFormData] = useState({
    name: "",
    body: "",
    notes: "",
  });
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const parentId = searchParams.get("parentId");

  useEffect(() => {
    if (!parentId) return;
    const fetchParent = async () => {
      try {
        const res = await getCoverLetter(parentId);
        setFormData({
          name: res.name ?? "",
          body: res.body ?? "",
          notes: res.notes ?? "",
        });
      } catch (e) {
        addError(e.message);
      }
    };
    fetchParent();
  }, [parentId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createCoverLetter({
        ...formData,
        ...(parentId && { parent: parentId }),
      });
      navigate("/cover-letters");
    } catch (e) {
      addError(e.message);
    }
  };

  return (
    <PageContainer title={parentId ? "New Version" : "New Cover Letter"} errors={errors}>
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
