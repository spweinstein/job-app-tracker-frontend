import { useState, useEffect } from "react";
import {
  updateCompany,
  getCompany,
  deleteCompany,
} from "../../services/companyService";
import { useNavigate, useParams } from "react-router";
import { FormField, TextInput, FormContainer } from "../shared/forms";
import { PageContainer } from "../shared/layout";

const CompanyEdit = () => {
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
        const res = await getCompany(companyId);
        setFormData(res);
      } catch (e) {
        console.log(e);
      }
    };
    fetchCompany();
  }, [companyId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await updateCompany(companyId, formData);
    console.log(res);
    navigate(`/companies/${companyId}`);
  };

  const handleDeleteClick = async () => {
    await deleteCompany(companyId);
    navigate("/companies");
  };

  return (
    <PageContainer
      title="Edit Company"
      actions={
        <button onClick={handleDeleteClick} className="btn btn-danger btn-sm">
          Delete
        </button>
      }
    >
      <FormContainer className="crud-form" onSubmit={handleSubmit}>
        <FormField label="Name">
          <TextInput
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </FormField>
        <FormField label="Website">
          <TextInput name="url" value={formData.url} onChange={handleChange} />
        </FormField>
        <FormField label="Description">
          <TextInput
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </FormField>
        <FormField label="Notes">
          <TextInput
            name="notes"
            value={formData.notes}
            onChange={handleChange}
          />
        </FormField>
        <div className="actions">
          <button type="submit">Save Company</button>
        </div>
      </FormContainer>
    </PageContainer>
  );
};

export default CompanyEdit;
