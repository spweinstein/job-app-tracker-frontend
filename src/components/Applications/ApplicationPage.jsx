import { useState } from "react";
import { Routes, Route } from "react-router";
import ApplicationList from "./ApplicationList.jsx";
import ApplicationDetails from "./ApplicationDetails.jsx";
import ApplicationForm from "./ApplicationForm.jsx";
import ApplicationEdit from "./ApplicationEdit.jsx";
import PageContainer from "../shared/layout/PageContainer/PageContainer.jsx";

const ApplicationPage = () => {
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
        <Route index element={<ApplicationList setHeader={setHeader} />} />
        <Route path="/new" element={<ApplicationForm setHeader={setHeader} />} />
        <Route path="/:applicationId/edit" element={<ApplicationEdit setHeader={setHeader} />} />
        <Route path="/:applicationId" element={<ApplicationDetails setHeader={setHeader} />} />
      </Routes>
    </PageContainer>
  );
};

export default ApplicationPage;
