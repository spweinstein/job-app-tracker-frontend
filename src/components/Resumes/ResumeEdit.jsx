import { useState, useEffect } from "react";
import {
  getResume,
  updateResume,
  deleteResume,
} from "../../services/resumeService.js";
import { getCompanies } from "../../services/companyService.js";
import { useNavigate, useParams, useOutletContext } from "react-router";
import {
  FormField,
  TextInput,
  TextAreaInput,
  DateInput,
  FormContainer,
  RepeatableFieldGroup,
  SearchableSelect,
} from "../shared/forms";
import {
  DeleteButton,
  BackButton,
  SubmitButton,
  CancelButton,
} from "../shared/ui/index.js";
import useErrors from "../../hooks/useErrors.js";
import { resumeUpdateSchema } from "../../schemas/resumes.js";
import { flattenZodErrors } from "../../schemas/common.js";

const EMPTY_EXPERIENCE = {
  company: "",
  title: "",
  startDate: "",
  endDate: "",
  description: "",
};

const EMPTY_EDUCATION = {
  degree: "",
  school: "",
  year: "",
};

const EMPTY_PROJECT = {
  title: "",
  company: "",
  year: "",
  link: "",
  description: "",
};

const EMPTY_CERTIFICATION = {
  title: "",
  company: "",
  year: "",
  description: "",
};

const EMPTY_SKILL = { skill: "" };

const loadCompanies = async (q) => {
  const res = await getCompanies({
    q,
    limit: 20,
    sort: "name",
    sortDir: "asc",
  });
  return res.data.map((c) => ({ label: c.name, value: c._id }));
};

const ResumeEdit = () => {
  const { setHeader = () => {} } = useOutletContext() ?? {};
  const { errors, addError, clearErrors } = useErrors();
  const [fieldErrors, setFieldErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    link: "",
    summary: "",
    notes: "",
    experience: [],
    education: [],
    projects: [],
    certifications: [],
    skills: [],
  });
  const { resumeId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchResume = async () => {
      try {
        setLoading(true);
        clearErrors();
        const res = await getResume(resumeId);
        setFormData({
          name: res.name ?? "",
          link: res.link ?? "",
          summary: res.summary ?? "",
          notes: res.notes ?? "",
          experience:
            res.experience?.map((exp) => ({
              ...exp,
              company: exp.company?._id ?? exp.company ?? "",
              startDate: exp.startDate ? exp.startDate.split("T")[0] : "",
              endDate: exp.endDate ? exp.endDate.split("T")[0] : "",
              description: exp.description ?? "",
            })) ?? [],
          education:
            res.education?.map((edu) => ({
              ...edu,
              year: edu.year ?? "",
            })) ?? [],
          projects:
            res.projects?.map((proj) => ({
              ...proj,
              company: proj.company?._id ?? proj.company ?? "",
              year: proj.year ?? "",
              link: proj.link ?? "",
              description: proj.description ?? "",
            })) ?? [],
          certifications:
            res.certifications?.map((cert) => ({
              ...cert,
              company: cert.company?._id ?? cert.company ?? "",
              year: cert.year ?? "",
              description: cert.description ?? "",
            })) ?? [],
          skills: res.skills?.map((s) => ({ skill: s })) ?? [],
        });
      } catch (e) {
        addError(e.message);
      } finally {
        setLoading(false);
      }
    };
    fetchResume();
  }, [resumeId, addError, clearErrors, setLoading]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    clearErrors();
    setFieldErrors({});
    const parsed = resumeUpdateSchema.safeParse(formData);
    if (!parsed.success) {
      setFieldErrors(flattenZodErrors(parsed.error));
      return;
    }
    setSubmitting(true);
    try {
      await updateResume(resumeId, parsed.data);
      navigate(`/resumes/${resumeId}`);
    } catch (err) {
      addError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    const handleDeleteClick = async () => {
      try {
        await deleteResume(resumeId);
        navigate("/resumes");
      } catch (e) {
        addError(e.message);
      }
    };

    setHeader({
      title: "Edit Resume",
      actions: (
        <>
          <BackButton onClick={() => navigate(-1)} />
          <DeleteButton onClick={handleDeleteClick} />
        </>
      ),
    });
  }, [resumeId, setHeader, navigate, addError]);

  if (loading) return <LoadingSpinner />;
  if (!formData?._id) return <h3>Resume Not Found</h3>;

  return (
    <FormContainer onSubmit={handleSubmit} errors={errors}>
      <FormField label="Name">
        <TextInput
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          error={fieldErrors.name}
        />
      </FormField>
      <FormField label="Link">
        <TextInput
          name="link"
          value={formData.link}
          onChange={handleChange}
          error={fieldErrors.link}
        />
      </FormField>
      <FormField label="Summary">
        <TextAreaInput
          name="summary"
          value={formData.summary}
          onChange={handleChange}
          error={fieldErrors.summary}
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

      <RepeatableFieldGroup
        label="Experience"
        items={formData.experience}
        emptyItem={EMPTY_EXPERIENCE}
        onItemsChange={(experience) =>
          setFormData((prev) => ({ ...prev, experience }))
        }
        renderItem={(item, index, onChange) => (
          <>
            <FormField label="Company">
              <SearchableSelect
                name="company"
                value={item.company}
                onChange={(e) => onChange(index, e)}
                loadOptions={loadCompanies}
                required
                error={fieldErrors[`experience.${index}.company`]}
              />
            </FormField>
            <FormField label="Title">
              <TextInput
                name="title"
                value={item.title}
                onChange={(e) => onChange(index, e)}
                required
                error={fieldErrors[`experience.${index}.title`]}
              />
            </FormField>
            <FormField label="Start Date">
              <DateInput
                name="startDate"
                value={item.startDate}
                onChange={(e) => onChange(index, e)}
                required
                error={fieldErrors[`experience.${index}.startDate`]}
              />
            </FormField>
            <FormField label="End Date">
              <DateInput
                name="endDate"
                value={item.endDate}
                onChange={(e) => onChange(index, e)}
                error={fieldErrors[`experience.${index}.endDate`]}
              />
            </FormField>
            <FormField label="Description">
              <TextAreaInput
                name="description"
                value={item.description}
                onChange={(e) => onChange(index, e)}
                error={fieldErrors[`experience.${index}.description`]}
              />
            </FormField>
          </>
        )}
      />

      <RepeatableFieldGroup
        label="Education"
        items={formData.education}
        emptyItem={EMPTY_EDUCATION}
        onItemsChange={(education) =>
          setFormData((prev) => ({ ...prev, education }))
        }
        renderItem={(item, index, onChange) => (
          <>
            <FormField label="Degree">
              <TextInput
                name="degree"
                value={item.degree}
                onChange={(e) => onChange(index, e)}
                required
                error={fieldErrors[`education.${index}.degree`]}
              />
            </FormField>
            <FormField label="School">
              <TextInput
                name="school"
                value={item.school}
                onChange={(e) => onChange(index, e)}
                required
                error={fieldErrors[`education.${index}.school`]}
              />
            </FormField>
            <FormField label="Year">
              <TextInput
                name="year"
                value={item.year}
                onChange={(e) => onChange(index, e)}
                error={fieldErrors[`education.${index}.year`]}
              />
            </FormField>
          </>
        )}
      />

      <RepeatableFieldGroup
        label="Projects"
        items={formData.projects}
        emptyItem={EMPTY_PROJECT}
        onItemsChange={(projects) =>
          setFormData((prev) => ({ ...prev, projects }))
        }
        renderItem={(item, index, onChange) => (
          <>
            <FormField label="Title">
              <TextInput
                name="title"
                value={item.title}
                onChange={(e) => onChange(index, e)}
                required
                error={fieldErrors[`projects.${index}.title`]}
              />
            </FormField>
            <FormField label="Company">
              <SearchableSelect
                name="company"
                value={item.company}
                onChange={(e) => onChange(index, e)}
                loadOptions={loadCompanies}
                required
                error={fieldErrors[`projects.${index}.company`]}
              />
            </FormField>
            <FormField label="Year">
              <TextInput
                name="year"
                value={item.year}
                onChange={(e) => onChange(index, e)}
                error={fieldErrors[`projects.${index}.year`]}
              />
            </FormField>
            <FormField label="Link">
              <TextInput
                name="link"
                value={item.link}
                onChange={(e) => onChange(index, e)}
                error={fieldErrors[`projects.${index}.link`]}
              />
            </FormField>
            <FormField label="Description">
              <TextAreaInput
                name="description"
                value={item.description}
                onChange={(e) => onChange(index, e)}
                error={fieldErrors[`projects.${index}.description`]}
              />
            </FormField>
          </>
        )}
      />

      <RepeatableFieldGroup
        label="Certifications"
        items={formData.certifications}
        emptyItem={EMPTY_CERTIFICATION}
        onItemsChange={(certifications) =>
          setFormData((prev) => ({ ...prev, certifications }))
        }
        renderItem={(item, index, onChange) => (
          <>
            <FormField label="Title">
              <TextInput
                name="title"
                value={item.title}
                onChange={(e) => onChange(index, e)}
                error={fieldErrors[`certifications.${index}.title`]}
              />
            </FormField>
            <FormField label="Company">
              <SearchableSelect
                name="company"
                value={item.company}
                onChange={(e) => onChange(index, e)}
                loadOptions={loadCompanies}
                required
                error={fieldErrors[`certifications.${index}.company`]}
              />
            </FormField>
            <FormField label="Year">
              <TextInput
                name="year"
                value={item.year}
                onChange={(e) => onChange(index, e)}
                error={fieldErrors[`certifications.${index}.year`]}
              />
            </FormField>
            <FormField label="Description">
              <TextAreaInput
                name="description"
                value={item.description}
                onChange={(e) => onChange(index, e)}
                error={fieldErrors[`certifications.${index}.description`]}
              />
            </FormField>
          </>
        )}
      />

      <RepeatableFieldGroup
        label="Skills"
        items={formData.skills}
        emptyItem={EMPTY_SKILL}
        onItemsChange={(skills) => setFormData((prev) => ({ ...prev, skills }))}
        renderItem={(item, index, onChange) => (
          <FormField label="Skill">
            <TextInput
              name="skill"
              value={item.skill}
              onChange={(e) => onChange(index, e)}
              error={fieldErrors[`skills.${index}.skill`]}
            />
          </FormField>
        )}
      />

      <div className="actions">
        <SubmitButton loading={submitting}>Save Resume</SubmitButton>
        <CancelButton onClick={() => navigate(-1)} />
      </div>
    </FormContainer>
  );
};

export default ResumeEdit;
