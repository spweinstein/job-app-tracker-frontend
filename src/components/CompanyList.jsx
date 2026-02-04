import { useState, useEffect } from "react";

import * as companyService from "../services/companyService.js";

const CompanyList = () => {
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    const fetchCompanies = async () => {
      const companies = await companyService.getCompanies();
      setCompanies(companies);
    };
    fetchCompanies();
  }, []);

  return (
    <>
      <h2>Companies</h2>
      <ul>
        {companies.map((company) => (
          <li key={company._id}>
            <p>Company: {company.name}</p>
            <p>Description: {company.description}</p>
          </li>
        ))}
      </ul>
    </>
  );
};

export default CompanyList;
