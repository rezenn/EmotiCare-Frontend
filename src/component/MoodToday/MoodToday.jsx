import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../axios/axios";
import styles from "./MoodToday.module.css";

function TodayMood() {
  const [moods, setMoods] = useState({});
  const navigate = useNavigate();

  const handleInsightClick = () => {
    navigate("/moodTracker");
  };

  const fetchMood = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found.");

      const response = await axios.get("/moodTracker/userMood", {
        headers: { Authorization: `Bearer ${token}` }, // Pass token in headers for authentication
      });

      setMoods(response.data);
    } catch (error) {
      console.error("Error fetching mood data:", error);
    }
  };

  useEffect(() => {
    fetchMood();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.headingContainer}>
        <h2 className={styles.moodTitle}>Today's Mood</h2>
        <button className={styles.insightBtn} onClick={handleInsightClick}>
          Insights
        </button>
      </div>
      <hr />
      <div className={styles.moodContainer}>
        {moods.mood_emoji && (
          <>
            <span className={styles.moodName}>{moods.mood_label}</span>
            <p className={styles.moodEmoji}>{moods.mood_emoji}</p>
          </>
        )}
        {!moods.mood_emoji && (
          <p className={styles.noMood}>No mood data available 🥺 </p>
        )}
      </div>
    </div>
  );
}

export default TodayMood;
