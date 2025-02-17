import { useEffect, useState } from "react";
import Navbar from "../component/Navbar/Navbar";
import MoodCalendar from "../component/Calendar/MoodCalendar";
import Footer from "../component/Footer/Footer2";
import MoodPieChart from "../component/Chart/MoodPieChart";
import styles from "./moodTrackerPage.module.css";

function MoodTracker() {
  const [name, setName] = useState("");
  const [moodData, setMoodData] = useState([]);

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
            mood: emojiToMood[mood.mood_emoji] || "Unknown",
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

    const interval = setInterval(() => {
      getNameAndMoods();
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <MoodCalendar onMoodDataChange={getNameAndMoods} />
        <div className={styles.pieChart}>
          <h2 className={styles.heading}>Pie Chart</h2>
          <MoodPieChart moods={moodData} />
        </div>
      </div>
      <Footer />
    </>
  );
}

export default MoodTracker;
