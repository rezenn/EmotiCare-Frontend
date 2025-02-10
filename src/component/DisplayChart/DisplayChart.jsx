import React, { useEffect, useState } from "react";
import MoodLineChart from "../Chart/MoodLineChart";
import MoodPieChart from "../Chart/MoodPieChart";
import styles from "./displayChart.module.css";

function DisplayChart() {
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
    <div>
      <div className={styles.chartsDisplay}>
        <div className={styles.chartContainer}>
          <span className={styles.moodChartTitle}>Mood Chart</span>
          <hr className={styles.hr} />
          <MoodLineChart moods={moodData} />
        </div>

        <div className={styles.PiechartContainer}>
          <span className={styles.moodChartTitle}>Mood Count</span>
          <hr className={styles.hr} />
          <MoodPieChart moods={moodData} />
        </div>
      </div>
    </div>
  );
}

export default DisplayChart;
