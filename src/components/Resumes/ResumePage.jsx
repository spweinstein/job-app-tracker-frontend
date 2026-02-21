import { Routes, Route } from "react-router";
import ResumeList from "./ResumeList.jsx";
import ResumeDetails from "./ResumeDetails.jsx";
import ResumeForm from "./ResumeForm.jsx";
import ResumeEdit from "./ResumeEdit.jsx";

const ResumePage = () => {
  return (
    <Routes>
      <Route index element={<ResumeList />} />
      <Route path="/new" element={<ResumeForm />} />
      <Route path="/:resumeId/edit" element={<ResumeEdit />} />
      <Route path="/:resumeId" element={<ResumeDetails />} />
    </Routes>
  );
};

export default ResumePage;
