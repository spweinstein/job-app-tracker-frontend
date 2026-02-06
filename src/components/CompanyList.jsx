import { useState, useEffect } from "react";
import { getCompanies } from "../services/companyService.js";
import { Link } from "react-router";

const CompanyList = () => {
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    const fetchCompanies = async () => {
      const companies = await getCompanies();
      setCompanies(companies);
    };
    fetchCompanies();
  }, []);

  if (!companies)
    return (
      <>
        <h2>Companies</h2>
        <p>No companies found</p>
      </>
    );

  return (
    <>
      <h3>Companies</h3>
      <button>
        <Link to="/companies/new">Create</Link>
      </button>
      <ul>
        {companies.map((company) => (
          <li key={company._id}>
            <Link to={`${company._id}`}>{company.name}</Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default CompanyList;
