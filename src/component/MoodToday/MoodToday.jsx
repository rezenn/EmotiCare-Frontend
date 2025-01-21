import MoodTracker from "../../page/MoodTrackerPage";
import styles from "./MoodToday.module.css";

import { Link, useNavigate } from "react-router-dom";

function TodayMood() {
  const navigate = useNavigate();

  const handleInsightClick = () => {
    navigate("/moodTracker");
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
