import { useState } from "react";
import { Routes, Route } from "react-router";
import { PageContainer } from "../shared/layout/index.js";
import ResumeList from "./ResumeList.jsx";
import ResumeDetails from "./ResumeDetails.jsx";
import ResumeForm from "./ResumeForm.jsx";
import ResumeEdit from "./ResumeEdit.jsx";

const ResumePage = () => {
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
        <Route index element={<ResumeList setHeader={setHeader} />} />
        <Route path="/new" element={<ResumeForm setHeader={setHeader} />} />
        <Route path="/:resumeId/edit" element={<ResumeEdit setHeader={setHeader} />} />
        <Route path="/:resumeId" element={<ResumeDetails setHeader={setHeader} />} />
      </Routes>
    </PageContainer>
  );
};

export default ResumePage;
