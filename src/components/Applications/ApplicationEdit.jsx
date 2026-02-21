import { useState, useEffect } from "react";
import {
  deleteApplication,
  getApplication,
  updateApplication,
} from "../../services/applicationService.js";
import { getCompanies } from "../../services/companyService.js";
import { getResumes } from "../../services/resumeService.js";
import { useNavigate, useParams } from "react-router";
import { FormField, TextInput, SelectInput, DateInput, FormContainer } from "../shared/forms";
import { PageContainer } from "../shared/layout";

const ApplicationEdit = () => {
  const [formData, setFormData] = useState({
    title: "",
    company: "",
    resume: "",
    status: "Applied",
    priority: "Low",
    source: "Indeed",
    appliedAt: "",
    url: "",
  });
  const [companies, setCompanies] = useState([]);
  const [resumes, setResumes] = useState([]);
  const { applicationId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [application, companiesRes, resumesRes] = await Promise.all([
          getApplication(applicationId),
          getCompanies(),
          getResumes(),
        ]);
        setCompanies(companiesRes ?? []);
        setResumes(resumesRes ?? []);
        setFormData({
          ...application,
          company: application.company?._id ?? application.company,
          resume: application.resume?._id ?? application.resume,
          appliedAt: application.appliedAt
            ? new Date(application.appliedAt).toISOString().split("T")[0]
            : new Date().toISOString().split("T")[0],
        });
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, [applicationId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateApplication(applicationId, formData);
    navigate(`/applications/${applicationId}`);
  };

  const handleDeleteClick = async () => {
    await deleteApplication(applicationId);
    navigate("/applications");
  };

  return (
    <PageContainer
      title="Edit Application"
      actions={
        <button onClick={handleDeleteClick} className="btn btn-danger btn-sm">
          Delete
        </button>
      }
    >
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
          <button type="submit">Save Application</button>
        </div>
      </FormContainer>
    </PageContainer>
  );
};

export default ApplicationEdit;
