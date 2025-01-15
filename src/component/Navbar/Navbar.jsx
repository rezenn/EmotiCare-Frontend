import "./navbar.css";
import React, { useState } from "react";
import { Link  } from "react-router-dom";



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
          <li><Link to="/dashboard">Dashboard</Link></li>
          <li><Link to="/moodTracker">Mood Tracker</Link></li>
          <li><Link to="/dailyChallenge">Daily Challenge</Link></li>
          <li><Link to="/insight">Insight</Link></li>
          <li><Link to="/resources">Resources</Link></li> 
          <li><Link to="/settings">Settings</Link></li> 
          <li><Link to="/profile">        
            <img className="user" 
            src="./src/assets/User.png" 
            alt="Users" />
          </Link></li>
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

export default Navbar;
