import { useState } from "react";
import { Outlet } from "react-router";
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
      <Outlet context={{ setHeader }} />
    </PageContainer>
  );
};

export default CompanyPage;
