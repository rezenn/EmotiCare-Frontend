import React, { useEffect, useState } from "react";
import axios from "../../axios/axios"; // Import Axios instance
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
  const [countMood, setCountMood] = useState("");
  const [streaks, setStreaks] = useState("");
  const [countJournal, setCountJournal] = useState("");
  const [countChallenges, setCountChallenges] = useState("");
  const [completedChallenges, setCompletedChallenges] = useState(0);
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
        const { data } = await axios.get(`/profile/${loggedInEmail}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setFullName(data.full_name || "");
        setUsername(data.user_name || "");
        setGender(data.gender || "");
        setEmail(data.user_email || "");
        setBirthday(data.birthday ? data.birthday.split("T")[0] : "");
        setProfileImg(data.profile_picture_url || "");
        setCreatedAt(
          data.created_at ? new Date(data.created_at).toLocaleDateString() : ""
        );
      } catch (error) {
        console.error(
          "Error fetching user data:",
          error.response?.data || error.message
        );
        alert("Failed to fetch user data");
      } finally {
        setIsFetching(false);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    const fetchUserMood = async () => {
      try {
        const token = localStorage.getItem("token");
        const { data } = await axios.get("/moodTracker/countMoods", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCountMood(data.count_mood);
      } catch (error) {
        console.error("Failed to count moods:", error.message);
        setIsLoading(false);
      }
    };
    fetchUserMood();
  }, []);

  useEffect(() => {
    const fetchStreaks = async () => {
      try {
        const token = localStorage.getItem("token");
        const { data } = await axios.get("/moodTracker/streaks", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setStreaks(data.streaks);
      } catch (error) {
        console.error("Failed to count moods:", error.message);
        setIsLoading(false);
      }
    };
    fetchStreaks();
  }, []);

  useEffect(() => {
    const fetchUserJournals = async () => {
      try {
        const token = localStorage.getItem("token");
        const { data } = await axios.get("/dailyJournal/countJournal", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCountJournal(data.count_journal);
      } catch (error) {
        console.error("Failed to count journals:", error.message);
        setIsLoading(false);
      }
    };
    fetchUserJournals();
  }, []);

  useEffect(() => {
    const fetchUserChallenges = async () => {
      try {
        const token = localStorage.getItem("token");
        const { data } = await axios.get("/challenge/countChallenge", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCountChallenges(data.count_challenges);
      } catch (error) {
        console.error("Failed to count challenges:", error.message);
        setIsLoading(false);
      }
    };
    fetchUserChallenges();
  }, []);

  useEffect(() => {
    const fetchCompletedChallenges = async () => {
      try {
        const token = localStorage.getItem("token");
        const { data } = await axios.get("/challenge/countCompleteChallenge", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCompletedChallenges(data.count_complete_challenges); // FIXED HERE
      } catch (error) {
        console.error("Failed to count complete challenges:", error.message);
      }
    };
    fetchCompletedChallenges();
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
          <ProfileField label="Username" value={username} />
          <ProfileField label="Email" value={email} />
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
        <ProfileField label="Birthday" value={birthday} />
        <ProfileField label="Gender" value={gender} />
        <ProfileField label="Joined on" value={createdAt} />
      </section>

      <hr className={styles.divider} />

      {/* Stats Section */}
      <section className={styles.statsSection}>
        <h2>Activity</h2>
        <hr />
        <ul className={styles.statsList}>
          <StatItem label="Mood entry" value={countMood} />
          <StatItem label="Streaks" value={streaks} />
          <StatItem label="Journal entry" value={countJournal} />
          <StatItem label="Total challenges " value={countChallenges} />
          <StatItem label="Challenges completed" value={completedChallenges} />
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

function StatItem({ label, value }) {
  const getStreakEmoji = (streaks) => {
    if (streaks >= 101) return "💎";
    if (streaks >= 100) return "💯";
    if (streaks >= 51) return "💎";
    if (streaks >= 50) return "🎉";
    if (streaks >= 31) return "💎";
    if (streaks >= 30) return "🏅";
    if (streaks >= 8) return "💎";
    if (streaks >= 7) return "🏆";
    if (streaks >= 3) return "🌟";
    return " ";
  };
  return (
    <li className={styles.statItem}>
      <span className={styles.statLabel}>{label}: </span>
      <span className={styles.statValue}>
        {label === "Streaks"
          ? `${value} ${getStreakEmoji(value)}`
          : label === "Challenges completed"
          ? `${value} ✅`
          : value}
      </span>
    </li>
  );
}

export default ViewProfile;
