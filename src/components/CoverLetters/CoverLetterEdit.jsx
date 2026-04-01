import { useState, useEffect } from "react";
import {
  getCoverLetter,
  updateCoverLetter,
  deleteCoverLetter,
} from "../../services/coverLetterService.js";
import { useNavigate, useParams, useOutletContext } from "react-router";
import {
  TextInput,
  TextAreaInput,
  FormContainer,
  FormField,
} from "../shared/forms/index.js";
import {
  BackButton,
  DeleteButton,
  SubmitButton,
  CancelButton,
} from "../shared/ui/index.js";
import useErrors from "../../hooks/useErrors.js";
import { coverLetterUpdateSchema } from "../../schemas/coverLetters.js";
import { flattenZodErrors } from "../../schemas/common.js";

const CoverLetterEdit = () => {
  const { setHeader = () => {} } = useOutletContext() ?? {};
  const { errors, addError, clearErrors } = useErrors();
  const [fieldErrors, setFieldErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    body: "",
    notes: "",
  });
  const [loading, setLoading] = useState(true);
  const { coverLetterId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCoverLetter = async () => {
      try {
        setLoading(true);
        clearErrors();
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
  }, [coverLetterId, addError, clearErrors, setLoading]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    clearErrors();
    setFieldErrors({});
    const parsed = coverLetterUpdateSchema.safeParse(formData);
    if (!parsed.success) {
      setFieldErrors(flattenZodErrors(parsed.error));
      return;
    }
    setSubmitting(true);
    try {
      await updateCoverLetter(coverLetterId, parsed.data);
      navigate(`/cover-letters/${coverLetterId}`);
    } catch (err) {
      addError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    const handleDeleteClick = async () => {
      try {
        await deleteCoverLetter(coverLetterId);
        navigate("/cover-letters");
      } catch (e) {
        addError(e.message);
      }
    };
    setHeader({
      title: "Edit Cover Letter",
      actions: (
        <>
          <BackButton onClick={() => navigate(-1)} />
          <DeleteButton onClick={handleDeleteClick} />
        </>
      ),
    });
  }, [coverLetterId, setHeader, navigate, addError]);

  if (loading) return <LoadingSpinner />;
  if (!formData?._id) return <h3>Cover Letter Not Found</h3>;

  return (
    <FormContainer
      className="crud-form"
      onSubmit={handleSubmit}
      errors={errors}
    >
      <FormField label="Name">
        <TextInput
          name="name"
          value={formData.name}
          onChange={handleChange}
          error={fieldErrors.name}
        />
      </FormField>

      <FormField label="Body">
        <TextAreaInput
          name="body"
          value={formData.body}
          onChange={handleChange}
          error={fieldErrors.body}
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
        <SubmitButton loading={submitting}>Save Cover Letter</SubmitButton>
        <CancelButton onClick={() => navigate(-1)} />
      </div>
    </FormContainer>
  );
};

export default CoverLetterEdit;
