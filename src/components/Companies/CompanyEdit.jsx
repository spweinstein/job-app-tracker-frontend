import { useState, useEffect } from "react";
import {
  updateCompany,
  getCompany,
  deleteCompany,
} from "../../services/companyService";
import { useNavigate, useParams } from "react-router";
import { FormRow, FormField, TextInput, FormContainer, TextAreaInput } from "../shared/forms";
import { DeleteButton, BackButton } from "../shared/ui/index.js";
import useErrors from "../../hooks/useErrors.js";

const CompanyEdit = ({ setHeader = () => {} }) => {
  const {errors, addError, clearErrors} = useErrors();
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
        addError(e.message);
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
    try {
      const res = await updateCompany(companyId, formData);
      if (res.error) {
        addError(res.error);
      }
      navigate(`/companies/${companyId}`);
    } catch (e) {
      addError(e.message);
    }
  };

  const handleDeleteClick = async () => {
    try {
      await deleteCompany(companyId);
      navigate("/companies");
    } catch (e) {
      addError(e.message);
    }
  };

  useEffect(() => {
    setHeader({
      title: "Edit Company",
      actions: (
        <>
          <BackButton onClick={() => navigate(-1)} />
          <DeleteButton onClick={handleDeleteClick} />
        </>
      ),
    });
  }, [companyId]);

  return (
    <FormContainer className="crud-form" onSubmit={handleSubmit} errors={errors}>
      <FormRow>
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
      </FormRow>
      <FormField label="Description">
        <TextAreaInput
          name="description"
          value={formData.description}
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
        <button type="submit">Save Company</button>
      </div>
    </FormContainer>
  );
};

export default CompanyEdit;
