import "./navbar.css";
import React, { useState } from "react";


function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    console.log(isMenuOpen);
  };

  return (
    <header className="header">
      <div className="logo">
        <img src="./src/assets/logo.png" alt="EmotiCare Logo" />
      </div>
      <nav className={`nav ${isMenuOpen ? "active" : ""}`}>
        <ul>
          <li><a href="#">Dashboard</a></li>
          <li><a href="#">Mood Tracker</a></li>
          <li><a href="#">Daily Challenge</a></li>
          <li><a href="#">Insight</a></li>
          <li><a href="#">Resources</a></li> 
          <li><a href="#">Settings</a></li> 
        </ul>
        <img className="user" src="./src/assets/User.png" alt="Users" />
      </nav>
      <div className="hamburger" onClick={toggleMenu}>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </header>
  );
}

export default Navbar;
