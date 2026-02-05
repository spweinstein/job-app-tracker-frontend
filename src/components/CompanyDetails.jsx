import { useState, useEffect } from "react";
import * as companyService from "../services/companyService.js";

const CompanyDetails = ({ selectedCompanyId }) => {
  const [company, setCompany] = useState({ _id: null });

  useEffect(() => {
    if (!selectedCompanyId) return;
    const fetchCompany = async () => {
      try {
        const res = await companyService.getCompany(selectedCompanyId);
        setCompany(res[0]);
        console.log(selectedCompanyId, res);
      } catch (e) {
        console.log(e);
      }
    };
    console.log(selectedCompanyId);

    fetchCompany();
  }, [selectedCompanyId]);

  if (company._id === null) {
    return <></>;
  }

  if (!company.name) {
    return <h3>Company Not Found</h3>;
  }

  return (
    <>
      <h3>Company: {company.name}</h3>
      {company.description ? <p>Description: {company.description}</p> : ""}
      {company.notes ? <p>Notes: {company.notes}</p> : ""}
    </>
  );
};

export default CompanyDetails;
