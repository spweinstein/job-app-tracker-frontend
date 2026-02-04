import { useState } from "react";
import "./App.css";
import CompanyList from "./components/CompanyList.jsx";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <h1>Job Application Tracker</h1>
      <CompanyList />
    </>
  );
}

export default App;
