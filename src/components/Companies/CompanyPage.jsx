import CompanyList from "./CompanyList.jsx";
import { useState } from "react";
import CompanyDetails from "./CompanyDetails.jsx";
import CompanyForm from "./CompanyForm.jsx";
import CompanyEdit from "./CompanyEdit.jsx";

import { Routes, Route } from "react-router";

const CompanyPage = () => {
  return (
    <Routes>
      <Route index element={<CompanyList />} />
      <Route path="/:companyId/edit" element={<CompanyEdit />} />

      <Route path="/:companyId" element={<CompanyDetails />} />
      <Route path="/new" element={<CompanyForm />} />
    </Routes>
  );
};

export default CompanyPage;
