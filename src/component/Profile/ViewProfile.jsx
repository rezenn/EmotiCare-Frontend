import React, { useEffect, useState } from "react";
import styles from "./ViewProfile.module.css";
import { Link } from "react-router-dom";
import defaultUserImage from "../../assets/ProfileImg.jpg";

function ViewProfile() {
  const [profileImg, setProfileImg] = useState("");
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");
  const [createdAt, setCreatedAt] = useState("");
  const [isFetching, setIsFetching] = useState(true);

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
        const formattedBirthday = userData.birthday
          ? userData.birthday.split("T")[0]
          : "";
        setFullName(userData.full_name || "");
        setUsername(userData.user_name || "");
        setGender(userData.gender || "");
        setEmail(userData.user_email || "");
        setBirthday(formattedBirthday || "");
        setProfileImg(userData.profile_picture_url || "");
        setCreatedAt(
          userData.created_at
            ? new Date(userData.created_at).toLocaleDateString()
            : ""
        );
      } catch (error) {
        console.error(error.message);
        alert("Failed to fetch user");
      } finally {
        setIsFetching(false);
      }
    };
    fetchUserData();
  }, []);

  if (isFetching) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      {/* Profile Header Section */}
      <section className={styles.profileHeader}>
        <img
          className={styles.profileImg}
          src={
            profileImg ? `http://localhost:5000${profileImg}` : defaultUserImage
          }
          alt="User Profile"
        />
        <div className={styles.profileDetails}>
          <h2 className={styles.fullname}>{fullName}</h2>
          <ProfileField
            className={styles.profileField}
            label="Username"
            value={username}
          />
          <ProfileField
            className={styles.profileField}
            label="Email"
            value={email}
          />
          <Link className={styles.editBtn} to="/editProfile">
            Edit Profile
          </Link>
        </div>
      </section>

      <hr className={styles.divider} />

      {/* About Section */}
      <section className={styles.aboutSection}>
        <h2>About</h2>
        <hr />
        <ProfileField
          className={styles.profileField}
          label="Birthday"
          value={birthday}
        />
        <ProfileField
          className={styles.profileField}
          label="Gender"
          value={gender}
        />
        <ProfileField
          className={styles.profileField}
          label="Joined on"
          value={createdAt}
        />
      </section>

      <hr className={styles.divider} />

      {/* Stats Section */}
      <section className={styles.statsSection}>
        <h2>Activity</h2>
        <hr />
        <ul className={styles.statsList}>
          <StatItem label="Mood entry" value="234" />
          <StatItem label="Mood streaks" value="54🔥" />
          <StatItem label="Journal entry" value="198" />
          <StatItem label="Challenges completed" value="314" />
          <StatItem label="Challenges added" value="124" />
        </ul>
      </section>
    </div>
  );
}

// Reusable Component for Profile Fields
function ProfileField({ label, value }) {
  return (
    <p className={styles.profileField}>
      <span className={styles.label}>{label}: </span>
      <span className={styles.value}>{value}</span>
    </p>
  );
}

// Reusable Component for Stats
function StatItem({ label, value }) {
  return (
    <li className={styles.statItem}>
      <span className={styles.statLabel}>{label}: </span>
      <span className={styles.statValue}>{value}</span>
    </li>
  );
}

export default ViewProfile;
