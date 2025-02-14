import React, { useState, useEffect } from "react"; // Add useEffect import
import { Link } from "react-router-dom";
import "./navbar.css";
import defaultUserImage from "../../assets/ProfileImg.jpg"; // Import default user image
import logoImage from "../../assets/logoImage.png"; // Import logo image

function Navbar() {
  const [email, setEmail] = useState("");
  const [profileImg, setProfileImg] = useState("");
  const [isFetching, setIsFetching] = useState(true); // Add isFetching state
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const loggedInEmail = localStorage.getItem("email");
    const token = localStorage.getItem("token");

    if (!loggedInEmail || !token) {
      alert("No logged-in user found.");
      setIsFetching(false);
      return;
    }

    const fetchUserData = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/profile/${loggedInEmail}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }
        const userData = await response.json();

        setProfileImg(userData.profile_picture_url || "");
      } catch (error) {
        console.error(error.message);
        alert("Failed to fetch user");
      } finally {
        setIsFetching(false);
      }
    };
    fetchUserData();
    const intervalid = setInterval(fetchUserData, 500);
    return () => clearInterval(intervalid);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="header">
      <div className="logo">
        <img src={logoImage} alt="EmotiCare Logo" /> {/* Use imported logo */}
      </div>
      <nav className={`nav ${isMenuOpen ? "active" : ""}`}>
        <ul>
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
          <li>
            <Link to="/moodTracker">Mood Tracker</Link>
          </li>
          <li>
            <Link to="/dailyChallenge">Daily Challenge</Link>
          </li>
          <li>
            <Link to="/journal">Journal</Link>
          </li>

          <li>
            <Link to="/settings">Settings</Link>
          </li>
          <li>
            <Link to="/profile">
              <img
                className="user"
                src={
                  profileImg
                    ? `http://localhost:5000${profileImg}`
                    : defaultUserImage
                }
                alt="User Profile"
              />
            </Link>
          </li>
        </ul>
      </nav>
      <div
        className={`hamburger ${isMenuOpen ? "active" : ""}`}
        onClick={toggleMenu}
        aria-label="Toggle Menu"
      >
        <div></div>
        <div></div>
        <div></div>
      </div>
    </header>
  );
}

export default Navbar;
