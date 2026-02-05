import { useState, useEffect } from "react";
import * as companyService from "../services/companyService.js";
import CompanyDetails from "./CompanyDetails.jsx";

const CompanyList = ({ setSelected }) => {
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    const fetchCompanies = async () => {
      const companies = await companyService.getCompanies();
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
      <ul>
        {companies.map((company) => (
          <li
            style={{ cursor: "pointer", color: "#646CFF" }}
            key={company._id}
            onClick={() => setSelected(company._id)}
          >
            {company.name}
          </li>
        ))}
      </ul>
    </>
  );
};

export default CompanyList;
