import { useState } from "react";
import "./App.css";
import CompanyPage from "./components/Companies/CompanyPage.jsx";
import ApplicationPage from "./components/Applications/ApplicationPage.jsx";
import ResumePage from "./components/Resumes/ResumePage.jsx";
import { Routes, Route } from "react-router";
import NavBar from "./components/shared/layout/NavBar/NavBar.jsx";
import LoginForm from "./components/LoginForm.jsx";
import RegisterForm from "./components/RegisterForm.jsx";
import CoverLetterPage from "./components/CoverLetters/CoverLetterPage.jsx";
import AppLayout from "./components/shared/layout/AppLayout/AppLayout.jsx";
import "./components/shared/list/ListControls.css";
import Dashboard from "./components/Dashboard/Dashboard.jsx";

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen((o) => !o);
  const closeSidebar  = () => setSidebarOpen(false);

  return (
    <>
      <NavBar sidebarOpen={sidebarOpen} onMenuToggle={toggleSidebar} />
      <Routes>
        <Route
          path="/"
          element={<AppLayout sidebarOpen={sidebarOpen} onSidebarClose={closeSidebar} />}
        >
          <Route index element={<Dashboard />} />
          <Route path="/companies/*"     element={<CompanyPage />} />
          <Route path="/applications/*"  element={<ApplicationPage />} />
          <Route path="/resumes/*"       element={<ResumePage />} />
          <Route path="/cover-letters/*" element={<CoverLetterPage />} />
        </Route>
        <Route path="/login"    element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
      </Routes>
    </>
  );
}

export default App;
