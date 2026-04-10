import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router";
import CompanySidebarList from "../../../Companies/CompanySidebarList.jsx";
import ApplicationSidebarList from "../../../Applications/ApplicationSidebarList.jsx";
import ResumeSidebarList from "../../../Resumes/ResumeSidebarList.jsx";
import CoverLetterSidebarList from "../../../CoverLetters/CoverLetterSidebarList.jsx";
import "./AppSidebar.css";

const SECTIONS = [
  { key: "dashboard", label: "Dashboard", path: "/" },
  { key: "companies", label: "Companies", path: "/companies" },
  { key: "applications", label: "Applications", path: "/applications" },
  { key: "resumes", label: "Resumes", path: "/resumes" },
  { key: "cover-letters", label: "Cover Letters", path: "/cover-letters" },
];

const SECTION_LISTS = {
  dashboard: <ApplicationSidebarList />,
  companies: <CompanySidebarList />,
  applications: <ApplicationSidebarList />,
  resumes: <ResumeSidebarList />,
  "cover-letters": <CoverLetterSidebarList />,
};

const AppSidebar = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [activeSection, setActiveSection] = useState("");

  // Derive the active section from the current URL
  // If the current path is the root path, the active section is "dashboard"
  // Otherwise, the active section is the section that the current path starts with
  useEffect(() => {
    if (pathname === "/") {
      setActiveSection("dashboard");
    } else {
      setActiveSection(
        SECTIONS.find((s) => s.path !== "/" && pathname.startsWith(s.path))
          ?.key ?? SECTIONS[0].key,
      );
    }
  }, [pathname]);

  const handleSectionClick = (section, path) => {
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
      <div className="sidebar-section-list">{SECTION_LISTS[activeSection]}</div>
    </nav>
  );
};

export default AppSidebar;
