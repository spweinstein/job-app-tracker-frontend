import { useState, useEffect } from "react";
import {
  getResume,
  updateResume,
  deleteResume,
} from "../../services/resumeService.js";
import { useNavigate, useParams } from "react-router";
import { FormField, TextInput, TextAreaInput, FormContainer } from "../shared/forms";
import { PageContainer } from "../shared/layout";

const ResumeEdit = () => {
  const [formData, setFormData] = useState({
    name: "",
    link: "",
    summary: "",
    notes: "",
  });
  const { resumeId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchResume = async () => {
      try {
        const res = await getResume(resumeId);
        const { name, link, summary, notes } = res;
        setFormData({
          name: name ?? "",
          link: link ?? "",
          summary: summary ?? "",
          notes: notes ?? "",
        });
      } catch (e) {
        console.log(e);
      }
    };
    fetchResume();
  }, [resumeId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateResume(resumeId, formData);
    navigate(`/resumes/${resumeId}`);
  };

  const handleDeleteClick = async () => {
    await deleteResume(resumeId);
    navigate("/resumes");
  };

  return (
    <PageContainer
      title="Edit Resume"
      actions={
        <button onClick={handleDeleteClick} className="btn btn-danger btn-sm">
          Delete
        </button>
      }
    >
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
          <button type="submit">Save Resume</button>
        </div>
      </FormContainer>
    </PageContainer>
  );
};

export default ResumeEdit;
