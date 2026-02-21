import { useState, useEffect } from "react";
import {
  getCoverLetter,
  updateCoverLetter,
  deleteCoverLetter,
} from "../../services/coverLetterService.js";
import { useNavigate, useParams } from "react-router";
import { PageContainer } from "../shared/layout/index.js";
import {
  TextInput,
  TextAreaInput,
  FormContainer,
  FormField,
} from "../shared/forms/index.js";

const CoverLetterEdit = () => {
  const [formData, setFormData] = useState({
    name: "",
    body: "",
    notes: "",
  });
  const { coverLetterId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCoverLetter = async () => {
      try {
        const res = await getCoverLetter(coverLetterId);
        const { name, body, notes } = res;
        setFormData({
          name: name ?? "",
          body: body ?? "",
          notes: notes ?? "",
        });
      } catch (e) {
        console.log(e);
      }
    };
    fetchCoverLetter();
  }, [coverLetterId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateCoverLetter(coverLetterId, formData);
    navigate(`/cover-letters/${coverLetterId}`);
  };

  const handleDeleteClick = async () => {
    await deleteCoverLetter(coverLetterId);
    navigate("/cover-letters");
  };

  return (
    <PageContainer
      title="Edit Cover Letter"
      actions={
        <>
          <button onClick={handleDeleteClick} className="btn btn-danger btn-sm">
            Delete
          </button>
        </>
      }
    >
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

export default CoverLetterEdit;
