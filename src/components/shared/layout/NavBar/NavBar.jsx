import { useContext } from "react";
import { Link, useNavigate } from "react-router";
import { UserContext } from "../../../../contexts/UserContext.jsx";
import "./NavBar.css";

const NavBar = () => {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/");
  };

  return (
    <nav className="navbar">
      <Link to="/">Home</Link>
      {user ? (
        <>
          <Link to="/companies">Companies</Link>
          <Link to="/applications">Applications</Link>

          <Link to="/resumes">Resumes</Link>
          <Link to="/cover-letters">Cover Letters</Link>

          <a href="#" onClick={handleLogout}>
            Logout
          </a>
        </>
      ) : (
        <>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </>
      )}
    </nav>
  );
};

export default NavBar;
