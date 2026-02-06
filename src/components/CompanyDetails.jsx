import { useState, useEffect } from "react";
import { getCompany, deleteCompany } from "../services/companyService.js";
import { useParams, useNavigate } from "react-router";
import { Link } from "react-router";

const CompanyDetails = ({}) => {
  const [company, setCompany] = useState({ _id: null });
  const { companyId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCompany = async () => {
      try {
        const res = await getCompany(companyId);
        setCompany(res[0]);
      } catch (e) {
        console.log(e);
      }
    };
    fetchCompany();
  }, []);

  const handleDeleteClick = async () => {
    deleteCompany(companyId);
    navigate("/companies");
  };

  if (company._id === null) {
    return <h3>Loading...</h3>;
  }

  if (!company.name) {
    return <h3>Company Not Found</h3>;
  }

  return (
    <>
      <div>
        <h3>Company: {company.name}</h3>
        {company.description ? <p>Description: {company.description}</p> : ""}
        {company.notes ? <p>Notes: {company.notes}</p> : ""}
      </div>
      <div>
        <button>
          <Link to={`/companies/${companyId}/edit`}>Edit</Link>
        </button>
        <button onClick={handleDeleteClick}>Delete</button>
      </div>
    </>
  );
};

export default CompanyDetails;
