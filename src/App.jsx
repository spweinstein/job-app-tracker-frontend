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

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <NavBar />
      {/* <h1>Job Application Tracker</h1> */}
      <Routes>
        <Route path="/" element={<h1>Landing</h1>} />
        <Route path="/companies/*" element={<CompanyPage />} />
        <Route path="/applications/*" element={<ApplicationPage />} />
        <Route path="/resumes/*" element={<ResumePage />} />
        <Route path="/cover-letters/*" element={<CoverLetterPage />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
      </Routes>
    </>
  );
}

export default App;
