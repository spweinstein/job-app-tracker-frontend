import { Routes, Route } from "react-router";
import ApplicationList from "./ApplicationList.jsx";
import ApplicationDetails from "./ApplicationDetails.jsx";
import ApplicationForm from "./ApplicationForm.jsx";
import ApplicationEdit from "./ApplicationEdit.jsx";

const ApplicationPage = () => {
  return (
    <Routes>
      <Route index element={<ApplicationList />} />
      <Route path="/new" element={<ApplicationForm />} />
      <Route path="/:applicationId/edit" element={<ApplicationEdit />} />
      <Route path="/:applicationId" element={<ApplicationDetails />} />
    </Routes>
  );
};

export default ApplicationPage;
