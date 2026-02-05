import CompanyList from "./CompanyList.jsx";
import { useState } from "react";
import CompanyDetails from "./CompanyDetails.jsx";

const CompanyPage = () => {
  const [selectedCompanyId, setSelectedCompanyId] = useState("");

  return (
    <>
      <CompanyDetails selectedCompanyId={selectedCompanyId} />
      <CompanyList setSelected={setSelectedCompanyId} />
    </>
  );
};

export default CompanyPage;
