import { Routes, Route } from "react-router";
import CoverLetterList from "./CoverLetterList.jsx";
import CoverLetterDetails from "./CoverLetterDetails.jsx";
import CoverLetterForm from "./CoverLetterForm.jsx";
import CoverLetterEdit from "./CoverLetterEdit.jsx";

const CoverLetterPage = () => {
  return (
    <Routes>
      <Route index element={<CoverLetterList />} />
      <Route path="/new" element={<CoverLetterForm />} />
      <Route path="/:coverLetterId/edit" element={<CoverLetterEdit />} />
      <Route path="/:coverLetterId" element={<CoverLetterDetails />} />
    </Routes>
  );
};

export default CoverLetterPage;
