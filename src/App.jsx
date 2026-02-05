import { useState } from "react";
import "./App.css";
import CompanyPage from "./components/CompanyPage.jsx";
import { Routes, Route } from "react-router";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <h1>Job Application Tracker</h1>
      <CompanyPage />
    </>
  );
}

export default App;
