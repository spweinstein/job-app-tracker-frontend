import { useState, useEffect } from "react";
import { createCoverLetter, getCoverLetter } from "../../services/coverLetterService.js";
import { useNavigate, useSearchParams } from "react-router";
import {
  TextInput,
  TextAreaInput,
  FormContainer,
  FormField,
} from "../shared/forms/index.js";
import { BackButton, SubmitButton } from "../shared/ui/index.js";
import useErrors from "../../hooks/useErrors.js";

const CoverLetterForm = ({ setHeader = () => {} }) => {
  const {errors, addError, clearErrors} = useErrors();
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
  }, [parentId]);

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
    setSubmitting(true);
    // #region agent log
    fetch('http://127.0.0.1:7242/ingest/ebbbd420-2498-4129-a13e-5fc82c7a528f',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'CoverLetterForm.jsx:handleSubmit',message:'submitting new cover letter',hypothesisId:'D',data:{parentId,parentIncluded:!!parentId},timestamp:Date.now()})}).catch(()=>{});
    // #endregion
    try {
      await createCoverLetter({
        ...formData,
        ...(parentId && { parent: parentId }),
      });
      navigate("/cover-letters");
    } catch (e) {
      addError(e.message);
    } finally {
      setSubmitting(false);
    }
  };

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
      <div className="actions">
        <SubmitButton loading={submitting}>Save Cover Letter</SubmitButton>
        <CancelButton onClick={() => navigate(-1)} />
      </div>
    </FormContainer>
  );
};

export default CoverLetterForm;
