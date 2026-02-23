import { useState, useEffect } from "react";
import { createApplication } from "../../services/applicationService.js";
import { getCompanies } from "../../services/companyService.js";
import { getResumes } from "../../services/resumeService.js";
import { useNavigate } from "react-router";
import { FormRow, FormField, TextInput, SelectInput, DateInput, FormContainer } from "../shared/forms";
import { PageContainer } from "../shared/layout";
import useErrors from "../../hooks/useErrors.js";
import { SearchableSelect } from "../shared/forms";

const ApplicationForm = () => {
  const {errors, addError, clearErrors} = useErrors();
  const [formData, setFormData] = useState({
    title: "",
    company: "",
    resume: "",
    status: "Applied",
    priority: "Low",
    source: "Indeed",
    appliedAt: new Date().toISOString().split("T")[0],
    url: "",
  });
  
  const navigate = useNavigate();

  const loadCompanies = async (q) => {
    const res = await getCompanies({ q, limit: 20, sort: "name", sortDir: "asc" });
    return res.data.map((c) => ({ label: c.name, value: c._id }));
  };

  const loadResumes = async (q) => {
    const res = await getResumes({ q, limit: 20, sort: "name", sortDir: "asc" });
    return res.data.map((r) => ({ label: r.name, value: r._id }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createApplication({...formData, company: formData.company?._id ?? formData.company, resume: formData.resume?._id ?? formData.resume});
      navigate("/applications");
    } catch (e) {
      addError(e.message);
    }
  };

  return (
    <PageContainer title="New Application" errors={errors}>
      <FormContainer onSubmit={handleSubmit}>
        <FormRow>
          <FormField label="Company">
            <SearchableSelect
              name="company"
              value={formData.company}
              onChange={handleChange}
              loadOptions={loadCompanies}
              required
            />
          </FormField>
          <FormField label="Title">
            <TextInput
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          
          </FormField>
        </FormRow>

        <FormRow>
          <FormField label="Status">
            <SelectInput
              name="status"
              value={formData.status}
              onChange={handleChange}
              optionLabels={["Applied", "Interviewing", "Offer", "Rejected"]}
              optionValues={["Applied", "Interviewing", "Offer", "Rejected"]}
              required
            />
          </FormField>

          <FormField label="Priority">
            <SelectInput
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              optionLabels={["Low", "Medium", "High"]}
              optionValues={["Low", "Medium", "High"]}
            />
          </FormField>
          <FormField label="Source">
            <SelectInput
              name="source"
              value={formData.source}
              onChange={handleChange}
              optionLabels={["LinkedIn", "Indeed", "Company Site", "Networking"]}
              optionValues={["LinkedIn", "Indeed", "Company Site", "Networking"]}
            />
          </FormField>
        </FormRow>

        <FormRow>
          <FormField label="Link">
            <TextInput name="url" value={formData.url} onChange={handleChange} />
          </FormField>
          <FormField label="Applied At">
            <DateInput
              name="appliedAt"
              value={formData.appliedAt}
              onChange={handleChange}
            />
          </FormField>
        </FormRow>

        <FormField label="Resume">
          <SearchableSelect
            name="resume"
            value={formData.resume}
            onChange={handleChange}
            loadOptions={loadResumes}
            required
          />
        </FormField>
        <div className="actions">
          <button type="submit">Add Application</button>
        </div>
      </FormContainer>
    </PageContainer>
  );
};

export default ApplicationForm;
