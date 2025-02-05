import { useEffect, useState } from "react";
import Navbar from "../component/Navbar/Navbar";
import styles from "./Profile.module.css";
import ViewProfile from "../component/Profile/ViewProfile";
import MoodLineChart from "../component/Chart/MoodLineChart";

function Profile() {
  const [name, setName] = useState("");
  const [moodData, setMoodData] = useState([]); // Stores mood data

  async function getNameAndMoods() {
    try {
      const token = localStorage.getItem("token");
      if (!token || token === "undefined") {
        throw new Error("No token found");
      }

      const emojiToMood = {
        "😀": "Happy",
        "🤩": "Excited",
        "😇": "Blessed",
        "😌": "Relaxed",
        "😮": "Surprised",
        "😴": "Tired",
        "😐": "Indifferent",
        "🫨": "Overwhelmed",
        "😰": "Nervous",
        "😤": "Enraged",
        "😒": "Annoyed",
        "😕": "Confused",
        "😞": "Disappointed",
        "😡": "Angry",
        "😔": "Gloomy",
      };

      const response = await fetch("http://localhost:5000/moodTracker", {
        method: "GET",
        headers: { token },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch data.");
      }

      const parseRes = await response.json();
      setName(parseRes.user_name);

      if (Array.isArray(parseRes.moods)) {
        const moodsFormatted = parseRes.moods.map((mood) => {
          const date = new Date(mood.mood_date);
          const localDate = new Date(
            date.getFullYear(),
            date.getMonth(),
            date.getDate()
          ).toLocaleDateString("en-CA");

          return {
            date: localDate,
            mood: emojiToMood[mood.mood_emoji] || "Unknown", // Convert emoji to mood name
          };
        });
        setMoodData(moodsFormatted);
      }
    } catch (error) {
      console.error(error.message);
    }
  }

  useEffect(() => {
    getNameAndMoods();
  }, []);

  return (
    <>
      <Navbar activePage="profile" />
      <div className={styles.profileConatiner}>
        <div className={styles.displayProfile}>
          <ViewProfile className={styles.View} />
        </div>
        <div className={styles.chartContainer}>
          <span className={styles.moodChartTitle}>Mood Chart</span>
          <hr className={styles.hr} />
          <MoodLineChart moods={moodData} />
        </div>
      </div>
    </>
  );
}

export default Profile;
