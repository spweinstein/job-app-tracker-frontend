import { useState } from "react";
import { Routes, Route } from "react-router";
import { PageContainer } from "../shared/layout/index.js";
import CoverLetterList from "./CoverLetterList.jsx";
import CoverLetterDetails from "./CoverLetterDetails.jsx";
import CoverLetterForm from "./CoverLetterForm.jsx";
import CoverLetterEdit from "./CoverLetterEdit.jsx";

const CoverLetterPage = () => {
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
        <Route index element={<CoverLetterList setHeader={setHeader} />} />
        <Route path="/new" element={<CoverLetterForm setHeader={setHeader} />} />
        <Route path="/:coverLetterId/edit" element={<CoverLetterEdit setHeader={setHeader} />} />
        <Route path="/:coverLetterId" element={<CoverLetterDetails setHeader={setHeader} />} />
      </Routes>
    </PageContainer>
  );
};

export default CoverLetterPage;
