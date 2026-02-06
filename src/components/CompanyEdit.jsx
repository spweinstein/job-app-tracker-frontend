import { useState, useEffect } from "react";
import { updateCompany, getCompany } from "../services/companyService";
import { useNavigate, useParams } from "react-router";

const CompanyForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    notes: "",
  });
  const { companyId } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCompany = async () => {
      try {
        const res = await getCompany(companyId);
        setFormData(res[0]);
      } catch (e) {
        console.log(e);
      }
    };
    fetchCompany();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await updateCompany(companyId, formData);
    console.log(res);
    navigate("/companies");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        {" "}
        <label htmlFor="name">Name</label>
        <input
          name="name"
          id="name"
          value={formData.name}
          onChange={handleChange}
        />
      </div>
      <div>
        {" "}
        <label htmlFor="description">Description</label>
        <input
          name="description"
          id="description"
          value={formData.description}
          onChange={handleChange}
        />
      </div>
      <div>
        {" "}
        <label htmlFor="notes">Notes</label>
        <input
          name="notes"
          id="notes"
          value={formData.notes}
          onChange={handleChange}
        />
      </div>
      <button type="submit">Save Company</button>
    </form>
  );
};

export default CompanyForm;
