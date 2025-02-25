import "./Header.css";
import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="header">
      <div className="logo">
        <img src="./src/assets/logoImage.png" alt="EmotiCare Logo" />
      </div>
      <nav className={`nav ${isMenuOpen ? "active" : ""}`}>
        <ul>
          <li>
            <NavLink to="/" activeClassName="active-link" exact>  Home</NavLink>
          </li>
          <li>
            <NavLink to="/features" activeClassName="active-link">Features </NavLink>
          </li>
          <li>
            <NavLink to="/resources" activeClassName="active-link">  Resources</NavLink>
          </li>
          <li>
            <NavLink to="/login" activeClassName="active-link">  Login</NavLink>
          </li>
        </ul>
      </nav>
      <div className="hamburger" onClick={toggleMenu}>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </header>
  );
}

export default Header;
