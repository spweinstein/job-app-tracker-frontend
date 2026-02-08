import { useState } from "react";
import "./App.css";
import CompanyPage from "./components/CompanyPage.jsx";
import { Routes, Route } from "react-router";
import NavBar from "./components/NavBar.jsx";
import LoginForm from "./components/LoginForm.jsx";
import RegisterForm from "./components/RegisterForm.jsx";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <NavBar />
      <h1>Job Application Tracker</h1>
      <Routes>
        <Route path="/" element={<h1>Landing</h1>} />
        <Route path="/companies/*" element={<CompanyPage />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
      </Routes>
    </>
  );
}

export default App;
