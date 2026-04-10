import { useState, useEffect } from "react";
import { createApplication } from "../../services/applicationService.js";
import { getCompanies } from "../../services/companyService.js";
import { getResumes } from "../../services/resumeService.js";
import { getCoverLetters } from "../../services/coverLetterService.js";
import { useNavigate, useOutletContext } from "react-router";
import {
  FormRow,
  FormField,
  TextInput,
  SelectInput,
  DateInput,
  FormContainer,
} from "../shared/forms";
import { PageContainer } from "../shared/layout";
import useErrors from "../../hooks/useErrors.js";
import { SearchableSelect } from "../shared/forms";
import { BackButton, SubmitButton, CancelButton } from "../shared/ui/index.js";
import {
  applicationCreateSchema,
  applicationSources,
  applicationStatuses,
} from "../../schemas/applications.js";
import { flattenZodErrors } from "../../schemas/common.js";

const ApplicationForm = () => {
  const { setHeader = () => {} } = useOutletContext() ?? {};
  const { addError, clearErrors } = useErrors();
  const [fieldErrors, setFieldErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    company: "",
    resume: "",
    coverLetter: "",
    status: "Applied",
    priority: "Low",
    source: "Indeed",
    appliedAt: new Date().toISOString().split("T")[0],
    url: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    setHeader({
      title: "New Application",
      // Back button
      actions: (
        <>
          <BackButton onClick={() => navigate(-1)} />
        </>
      ),
    });
  }, [navigate, setHeader]);

  const loadCompanies = async (q) => {
    const res = await getCompanies({
      q,
      limit: 20,
      sort: "name",
      sortDir: "asc",
    });
    return res.data.map((c) => ({ label: c.name, value: c._id }));
  };

  const loadResumes = async (q) => {
    const res = await getResumes({
      q,
      limit: 20,
      sort: "name",
      sortDir: "asc",
    });
    return res.data.map((r) => ({ label: r.name, value: r._id }));
  };

  const loadCoverLetters = async (q) => {
    const res = await getCoverLetters({
      q,
      limit: 20,
      sort: "name",
      sortDir: "asc",
    });
    return res.data.map((c) => ({ label: c.name, value: c._id }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    clearErrors();
    setFieldErrors({});
    const parsed = applicationCreateSchema.safeParse(formData);
    if (!parsed.success) {
      setFieldErrors(flattenZodErrors(parsed.error));
      return;
    }
    setSubmitting(true);
    try {
      await createApplication(parsed.data);
      navigate("/applications");
    } catch (err) {
      addError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <FormRow>
        <FormField label="Company">
          <SearchableSelect
            name="company"
            value={formData.company}
            onChange={handleChange}
            loadOptions={loadCompanies}
            required
            error={fieldErrors.company}
          />
        </FormField>
        <FormField label="Title">
          <TextInput
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            error={fieldErrors.title}
          />
        </FormField>
      </FormRow>

      <FormRow>
        <FormField label="Status">
          <SelectInput
            name="status"
            value={formData.status}
            onChange={handleChange}
            optionLabels={applicationStatuses}
            optionValues={applicationStatuses}
            required
            error={fieldErrors.status}
          />
        </FormField>

        <FormField label="Priority">
          <SelectInput
            name="priority"
            value={formData.priority}
            onChange={handleChange}
            optionLabels={["Low", "Medium", "High"]}
            optionValues={["Low", "Medium", "High"]}
            error={fieldErrors.priority}
          />
        </FormField>
        <FormField label="Source">
          <SelectInput
            name="source"
            value={formData.source}
            onChange={handleChange}
            optionLabels={applicationSources}
            optionValues={applicationSources}
            error={fieldErrors.source}
          />
        </FormField>
      </FormRow>

      <FormRow>
        <FormField label="Link">
          <TextInput
            name="url"
            value={formData.url}
            onChange={handleChange}
            error={fieldErrors.url}
          />
        </FormField>
        <FormField label="Applied At">
          <DateInput
            name="appliedAt"
            value={formData.appliedAt}
            onChange={handleChange}
            error={fieldErrors.appliedAt}
          />
        </FormField>
      </FormRow>
      <FormRow>
        <FormField label="Resume">
          <SearchableSelect
            name="resume"
            value={formData.resume}
            onChange={handleChange}
            loadOptions={loadResumes}
            required
            error={fieldErrors.resume}
          />
        </FormField>
        <FormField label="Cover Letter">
          <SearchableSelect
            name="coverLetter"
            value={formData.coverLetter}
            onChange={handleChange}
            loadOptions={loadCoverLetters}
            required
            error={fieldErrors.coverLetter}
          />
        </FormField>
      </FormRow>
      <div className="actions">
        <SubmitButton loading={submitting}>Add Application</SubmitButton>
        <CancelButton onClick={() => navigate(-1)} />
      </div>
    </FormContainer>
  );
};

export default ApplicationForm;
