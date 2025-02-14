import { useState } from "react";
import MoodTracker from "../../page/MoodTrackerPage";
import styles from "./MoodToday.module.css";

import { Link, useNavigate } from "react-router-dom";
import axios from "../../axios";

function TodayMood() {
  const [userId, setUserId] = useState(null);
  const [moods, setMoods] = useState({});

  const navigate = useNavigate();

  const handleInsightClick = () => {
    navigate("/moodTracker");
  };

  const fetchMood = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found.");

      const response = await axios.get("/moodTrcker/userMood", {
        Headers: { token },
      });
    } catch (error) {}
  };
  return (
    <>
      <div className={styles.container}>
        <div className={styles.headingContainer}>
          <h2 className={styles.moodTitle}>Today's Mood</h2>
          <button className={styles.insightBtn} onClick={handleInsightClick}>
            Insights
          </button>
        </div>
        <hr />
        <div className={styles.moodContainer}>
          <span className={styles.moodName}>Happy</span>

          <p className={styles.moodEmoji}>😊</p>
        </div>
      </div>
    </>
  );
}

export default TodayMood;
