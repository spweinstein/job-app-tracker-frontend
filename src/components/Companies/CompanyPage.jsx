import CompanyList from "./CompanyList.jsx";
import { useState } from "react";
import CompanyDetails from "./CompanyDetails.jsx";
import CompanyForm from "./CompanyForm.jsx";
import CompanyEdit from "./CompanyEdit.jsx";

import { Routes, Route } from "react-router";
import { PageContainer } from "../shared/layout/index.js";

const CompanyPage = () => {
  const [title, setTitle] = useState("");
  const [actions, setActions] = useState(null);
  const [errors, setErrors] = useState([]);

  const setHeader = ({ title, actions = null, errors = [] }) => {
    setTitle(title);
    setActions(actions);
    setErrors(errors);
  };
  return (
    <PageContainer title={title} actions={actions} errors={errors}>
    <Routes>  
      <Route index element={<CompanyList setHeader={setHeader} />} />
      <Route path="/:companyId/edit" element={<CompanyEdit setHeader={setHeader} />} />
      <Route path="/:companyId" element={<CompanyDetails setHeader={setHeader} />} />
      <Route path="/new" element={<CompanyForm setHeader={setHeader} />} />
    </Routes>
    </PageContainer>
  );
};

export default CompanyPage;
