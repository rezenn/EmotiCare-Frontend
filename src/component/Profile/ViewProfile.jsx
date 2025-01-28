import React from "react";
import styles from "./ViewProfile.module.css";
import { Link } from "react-router-dom";

function ViewProfile() {
  return (
    <div className={styles.container}>
      {/* Profile Header Section */}
      <section className={styles.profileHeader}>
        <img
          className={styles.profileImg}
          src="./src/assets/ProfileImg.jpg"
          alt="User Profile"
        />
        <div className={styles.profileDetails}>
          <span className={styles.fullname}>Rijen Khadgi</span>
          <ProfileField
            className={styles.profileField}
            label="Username"
            value="Happy Day"
          />
          <ProfileField
            className={styles.profileField}
            label="Email"
            value="rezenkhadgi@gmail.com"
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
        <ProfileField
          className={styles.profileField}
          label="Birthday"
          value="14/03/2001"
        />
        <ProfileField
          className={styles.profileField}
          label="Gender"
          value="Male"
        />
        <ProfileField
          className={styles.profileField}
          label="Joined on"
          value="23/08/2024"
        />
      </section>

      <hr className={styles.divider} />

      {/* Stats Section */}
      <section className={styles.statsSection}>
        <h2>Activity</h2>
        <ul className={styles.statsList}>
          <StatItem label="Mood entry" value="234" />
          <StatItem label="Mood streak" value="54🔥" />
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
