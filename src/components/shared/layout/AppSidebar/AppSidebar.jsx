import { useState } from "react";
import { useNavigate } from "react-router";
import CompanySidebarList from "../../../Companies/CompanySidebarList.jsx";
import ApplicationSidebarList from "../../../Applications/ApplicationSidebarList.jsx";
import ResumeSidebarList from "../../../Resumes/ResumeSidebarList.jsx";
import CoverLetterSidebarList from "../../../CoverLetters/CoverLetterSidebarList.jsx";
import "./AppSidebar.css";

const SECTIONS = [
  { key: "companies",      label: "Companies",     path: "/companies" },
  { key: "applications",   label: "Applications",  path: "/applications" },
  { key: "resumes",        label: "Resumes",       path: "/resumes" },
  { key: "cover-letters",  label: "Cover Letters", path: "/cover-letters" },
];

const SECTION_LISTS = {
  companies:      <CompanySidebarList />,
  applications:   <ApplicationSidebarList />,
  resumes:        <ResumeSidebarList />,
  "cover-letters":<CoverLetterSidebarList />,
};

const AppSidebar = () => {
  const [activeSection, setActiveSection] = useState("companies");
  const navigate = useNavigate();

  const handleSectionClick = (section, path) => {
    setActiveSection(section);
    navigate(path);
  };

  return (
    <nav className="app-sidebar">
      <ul className="sidebar-tabs">
        {SECTIONS.map((s) => (
          <li key={s.key}>
            <button
              className={`sidebar-tab${activeSection === s.key ? " sidebar-tab--active" : ""}`}
              onClick={() => handleSectionClick(s.key, s.path)}
            >
              {s.label}
            </button>
          </li>
        ))}
      </ul>
      <div className="sidebar-section-list">
        {SECTION_LISTS[activeSection]}
      </div>
    </nav>
  );
};

export default AppSidebar;
