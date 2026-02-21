import { useState, useEffect } from "react";
import { createApplication } from "../../services/applicationService.js";
import { getCompanies } from "../../services/companyService.js";
import { getResumes } from "../../services/resumeService.js";
import { useNavigate } from "react-router";
import { FormField, TextInput, SelectInput, DateInput, FormContainer } from "../shared/forms";
import { PageContainer } from "../shared/layout";

const ApplicationForm = () => {
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
  const [companies, setCompanies] = useState([]);
  const [resumes, setResumes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOptions = async () => {
      const [companiesRes, resumesRes] = await Promise.all([
        getCompanies(),
        getResumes(),
      ]);
      setCompanies(companiesRes ?? []);
      setResumes(resumesRes ?? []);
    };
    fetchOptions();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createApplication(formData);
    navigate("/applications");
  };

  return (
    <PageContainer title="New Application">
      <FormContainer onSubmit={handleSubmit}>
        <FormField label="Company">
          <SelectInput
            name="company"
            value={formData.company}
            onChange={handleChange}
            optionLabels={companies.map((c) => c.name)}
            optionValues={companies.map((c) => c._id)}
            required
          />
        </FormField>
        <FormField label="Resume">
          <SelectInput
            name="resume"
            value={formData.resume}
            onChange={handleChange}
            optionLabels={resumes.map((r) => r.name)}
            optionValues={resumes.map((r) => r._id)}
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
        <FormField label="Source">
          <SelectInput
            name="source"
            value={formData.source}
            onChange={handleChange}
            optionLabels={["LinkedIn", "Indeed", "Company Site", "Networking"]}
            optionValues={["LinkedIn", "Indeed", "Company Site", "Networking"]}
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
        <div className="actions">
          <button type="submit">Add Application</button>
        </div>
      </FormContainer>
    </PageContainer>
  );
};

export default ApplicationForm;
