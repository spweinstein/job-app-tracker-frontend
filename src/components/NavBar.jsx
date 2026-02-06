import React from "react";
import { Link } from "react-router";

const NavBar = () => {
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/companies">Companies</Link>
    </nav>
  );
};

export default NavBar;
