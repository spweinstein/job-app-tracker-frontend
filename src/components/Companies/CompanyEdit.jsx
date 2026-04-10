import { useState, useEffect } from "react";
import {
  updateCompany,
  getCompany,
  deleteCompany,
} from "../../services/companyService";
import { useNavigate, useParams } from "react-router";
import {
  FormRow,
  FormField,
  TextInput,
  FormContainer,
  TextAreaInput,
} from "../shared/forms";
import {
  DeleteButton,
  BackButton,
  SubmitButton,
  CancelButton,
} from "../shared/ui/index.js";
import { LoadingSpinner } from "../shared/ui/index.js";
import useErrors from "../../hooks/useErrors.js";
import { useOutletContext } from "react-router";
import { companySubmitSchema } from "../../schemas/companies.js";
import { flattenZodErrors } from "../../schemas/common.js";

const CompanyEdit = () => {
  const { setHeader } = useOutletContext();
  const { errors, addError, clearErrors } = useErrors();
  const [loading, setLoading] = useState(true);
  const [fieldErrors, setFieldErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    url: "",
    description: "",
    notes: "",
  });
  const { companyId } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCompany = async () => {
      try {
        setLoading(true);
        clearErrors();
        const res = await getCompany(companyId);
        setFormData(res);
      } catch (e) {
        addError(e.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCompany();
  }, [companyId, addError, clearErrors, setLoading]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    clearErrors();
    setFieldErrors({});
    const parsed = companySubmitSchema.safeParse(formData);
    if (!parsed.success) {
      setFieldErrors(flattenZodErrors(parsed.error));
      return;
    }
    setSubmitting(true);
    try {
      const res = await updateCompany(companyId, parsed.data);
      if (res.error) {
        addError(res.error);
      }
      navigate(`/companies/${companyId}`);
    } catch (err) {
      addError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    const handleDeleteClick = async () => {
      try {
        await deleteCompany(companyId);
        navigate("/companies");
      } catch (e) {
        addError(e.message);
      }
    };

    setHeader({
      title: "Edit Company",
      actions: (
        <>
          <BackButton onClick={() => navigate(-1)} />
          <DeleteButton onClick={handleDeleteClick} />
        </>
      ),
    });
  }, [companyId, addError, setHeader, navigate]);

  if (loading) return <LoadingSpinner />;
  if (!formData?._id) return <h3>Company Not Found</h3>;

  return (
    <FormContainer
      className="crud-form"
      onSubmit={handleSubmit}
      errors={errors}
    >
      <FormRow>
        <FormField label="Name">
          <TextInput
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            error={fieldErrors.name}
          />
        </FormField>
        <FormField label="Website">
          <TextInput
            name="url"
            value={formData.url}
            onChange={handleChange}
            error={fieldErrors.url}
          />
        </FormField>
      </FormRow>
      <FormField label="Description">
        <TextAreaInput
          name="description"
          value={formData.description}
          onChange={handleChange}
          error={fieldErrors.description}
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
        <SubmitButton loading={submitting}>Save Company</SubmitButton>
        <CancelButton onClick={() => navigate(-1)} />
      </div>
    </FormContainer>
  );
};

export default CompanyEdit;
