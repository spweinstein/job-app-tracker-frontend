import { useContext } from "react";
import { NavLink, useNavigate } from "react-router";
import { UserContext } from "../../../../contexts/UserContext.jsx";
import "./NavBar.css";

const NavBar = ({ sidebarOpen, onMenuToggle }) => {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    setUser(null);
    navigate("/");
  };

  return (
    <nav className="navbar">
      <div className="navbar__left">
        {user && (
          <button
            className={`navbar__hamburger${sidebarOpen ? " navbar__hamburger--open" : ""}`}
            onClick={onMenuToggle}
            aria-label={sidebarOpen ? "Close sidebar" : "Open sidebar"}
          >
            <span className="hamburger-line" />
            <span className="hamburger-line" />
            <span className="hamburger-line" />
          </button>
        )}
        <NavLink to="/" className="navbar__brand">
          <span className="navbar__brand-icon">⬡</span>
          Job Application Tracker
        </NavLink>
      </div>

      <div className="navbar__right">
        {user ? (
          <button className="navbar__link" onClick={handleLogout}>Logout</button>
        ) : (
          <>
            <NavLink to="/login"    className="navbar__link">Login</NavLink>
            <NavLink to="/register" className="navbar__link navbar__link--cta">Register</NavLink>
          </>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
