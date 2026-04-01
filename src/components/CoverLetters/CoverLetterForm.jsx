import { useState, useEffect } from "react";
import {
  createCoverLetter,
  getCoverLetter,
} from "../../services/coverLetterService.js";
import { useNavigate, useSearchParams, useOutletContext } from "react-router";
import {
  TextInput,
  TextAreaInput,
  FormContainer,
  FormField,
} from "../shared/forms/index.js";
import { BackButton, SubmitButton, CancelButton } from "../shared/ui/index.js";
import useErrors from "../../hooks/useErrors.js";
import { coverLetterCreateSchema } from "../../schemas/coverLetters.js";
import { flattenZodErrors } from "../../schemas/common.js";

const CoverLetterForm = () => {
  const { setHeader = () => {} } = useOutletContext() ?? {};
  const { errors, addError, clearErrors } = useErrors();
  const [fieldErrors, setFieldErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    body: "",
    notes: "",
  });
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const parentId = searchParams.get("parentId");

  useEffect(() => {
    setHeader({
      title: parentId ? "New Version" : "New Cover Letter",
      actions: <BackButton onClick={() => navigate(-1)} />,
    });
  }, [parentId, setHeader, navigate]);

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
  }, [parentId, addError, setFormData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    clearErrors();
    setFieldErrors({});
    const payload = {
      ...formData,
      ...(parentId ? { parent: parentId } : {}),
    };
    const parsed = coverLetterCreateSchema.safeParse(payload);
    if (!parsed.success) {
      setFieldErrors(flattenZodErrors(parsed.error));
      return;
    }
    const { parent, ...body } = parsed.data;
    setSubmitting(true);
    try {
      await createCoverLetter(parent ? { ...body, parent } : body);
      navigate("/cover-letters");
    } catch (err) {
      addError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

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

export default CoverLetterForm;
