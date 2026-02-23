import { useState, useEffect } from "react";
import {
  getCoverLetter,
  updateCoverLetter,
  deleteCoverLetter,
} from "../../services/coverLetterService.js";
import { useNavigate, useParams } from "react-router";
import {
  TextInput,
  TextAreaInput,
  FormContainer,
  FormField,
} from "../shared/forms/index.js";
import { BackButton, DeleteButton } from "../shared/ui/index.js";
import useErrors from "../../hooks/useErrors.js";

const CoverLetterEdit = ({ setHeader = () => {} }) => {
  const {errors, addError, clearErrors} = useErrors();
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
        addError(e.message);
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
    try {
      await updateCoverLetter(coverLetterId, formData);
    } catch (e) {
      addError(e.message);
    }
    navigate(`/cover-letters/${coverLetterId}`);
  };

  const handleDeleteClick = async () => {
    try {
      await deleteCoverLetter(coverLetterId);
      navigate("/cover-letters");
    } catch (e) {
      addError(e.message);
    }
  };

  useEffect(() => {
    setHeader({
      title: "Edit Cover Letter",
      actions: (
        <>
          <BackButton onClick={() => navigate(-1)} />
          <DeleteButton onClick={handleDeleteClick} />
        </>
      ),
    });
  }, [coverLetterId]);

  return (
    <FormContainer className="crud-form" onSubmit={handleSubmit} errors={errors}>
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
  );
};

export default CoverLetterEdit;
