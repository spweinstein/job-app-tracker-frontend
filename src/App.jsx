import { useState, useContext } from "react";
import "./App.css";
import Landing from "./components/Landing/Landing.jsx";
import CompanyPage from "./components/Companies/CompanyPage.jsx";
import CompanyList from "./components/Companies/CompanyList.jsx";
import CompanyForm from "./components/Companies/CompanyForm.jsx";
import CompanyEdit from "./components/Companies/CompanyEdit.jsx";
import CompanyDetails from "./components/Companies/CompanyDetails.jsx";
import ApplicationPage from "./components/Applications/ApplicationPage.jsx";
import ApplicationList from "./components/Applications/ApplicationList.jsx";
import ApplicationForm from "./components/Applications/ApplicationForm.jsx";
import ApplicationEdit from "./components/Applications/ApplicationEdit.jsx";
import ApplicationDetails from "./components/Applications/ApplicationDetails.jsx";
import ResumePage from "./components/Resumes/ResumePage.jsx";
import ResumeList from "./components/Resumes/ResumeList.jsx";
import ResumeForm from "./components/Resumes/ResumeForm.jsx";
import ResumeEdit from "./components/Resumes/ResumeEdit.jsx";
import ResumeDetails from "./components/Resumes/ResumeDetails.jsx";
import CoverLetterPage from "./components/CoverLetters/CoverLetterPage.jsx";
import CoverLetterList from "./components/CoverLetters/CoverLetterList.jsx";
import CoverLetterForm from "./components/CoverLetters/CoverLetterForm.jsx";
import CoverLetterEdit from "./components/CoverLetters/CoverLetterEdit.jsx";
import CoverLetterDetails from "./components/CoverLetters/CoverLetterDetails.jsx";
import { Routes, Route, Navigate } from "react-router";
import NavBar from "./components/shared/layout/NavBar/NavBar.jsx";
import LoginForm from "./components/LoginForm.jsx";
import RegisterForm from "./components/RegisterForm.jsx";
import AppLayout from "./components/shared/layout/AppLayout/AppLayout.jsx";
import "./components/shared/list/ListControls.css";
import Dashboard from "./components/Dashboard/Dashboard.jsx";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute.jsx";
import { UserContext } from "./contexts/UserContext.jsx";
import NotFound from "./components/NotFound/NotFound.jsx";

function App() {
  const isAiAssistantEnabled =
    import.meta.env.VITE_AI_ASSISTANT_ENABLED === "true";
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen((o) => !o);
  const closeSidebar = () => setSidebarOpen(false);

  const toggleChat = () => setChatOpen((o) => !o);
  const closeChat = () => setChatOpen(false);
  const { user } = useContext(UserContext);

  return (
    <>
      <NavBar
        sidebarOpen={sidebarOpen}
        onMenuToggle={toggleSidebar}
        chatOpen={chatOpen}
        onChatToggle={toggleChat}
        isAiAssistantEnabled={isAiAssistantEnabled}
      />
      <Routes>
        <Route path="/home" element={<Landing />} />
        <Route
          path="/"
          element={
            <AppLayout
              isAiAssistantEnabled={isAiAssistantEnabled}
              sidebarOpen={sidebarOpen}
              onSidebarClose={closeSidebar}
              chatOpen={chatOpen}
              onChatClose={closeChat}
            />
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="companies" element={<CompanyPage />}>
            <Route index element={<CompanyList />} />
            <Route path="new" element={<CompanyForm />} />
            <Route path=":companyId/edit" element={<CompanyEdit />} />
            <Route path=":companyId" element={<CompanyDetails />} />
          </Route>
          <Route path="applications" element={<ApplicationPage />}>
            <Route index element={<ApplicationList />} />
            <Route path="new" element={<ApplicationForm />} />
            <Route path=":applicationId/edit" element={<ApplicationEdit />} />
            <Route path=":applicationId" element={<ApplicationDetails />} />
          </Route>
          <Route path="resumes" element={<ResumePage />}>
            <Route index element={<ResumeList />} />
            <Route path="new" element={<ResumeForm />} />
            <Route path=":resumeId/edit" element={<ResumeEdit />} />
            <Route
              path=":resumeId"
              element={
                <ResumeDetails isAiAssistantEnabled={isAiAssistantEnabled} />
              }
            />
          </Route>
          <Route path="cover-letters" element={<CoverLetterPage />}>
            <Route index element={<CoverLetterList />} />
            <Route path="new" element={<CoverLetterForm />} />
            <Route path=":coverLetterId/edit" element={<CoverLetterEdit />} />
            <Route
              path=":coverLetterId"
              element={
                <CoverLetterDetails
                  isAiAssistantEnabled={isAiAssistantEnabled}
                />
              }
            />
          </Route>
        </Route>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
