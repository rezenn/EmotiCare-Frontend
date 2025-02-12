import { useEffect, useState } from "react";
import DashboardChallenge from "../component/Challenges/DashboardChallenge";
import Footer from "../component/Footer/Footer2";
import TodayMood from "../component/MoodToday/MoodToday";
import Navbar from "../component/Navbar/Navbar";
import Note from "../component/notes/Note";
import Timer from "../component/timer/Timer";
import styles from "./Dashboard.module.css";
import MoodLineChart from "../component/Chart/MoodLineChart";

function Dashboard({ setAuth }) {
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
        "😇": "Blessed",
        "🤩": "Excited",
        "😌": "Relaxed",
        "😮": "Surprised",
        "😐": "Indifferent",
        "😕": "Confused",
        "😴": "Tired",
        "😔": "Gloomy",
        "😒": "Annoyed",
        "🫨": "Overwhelmed",
        "😰": "Nervous",
        "😞": "Disappointed", // Make sure this matches exactly!
        "😡": "Angry",
        "😤": "Enraged",
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
          // Convert stored UTC date to local date without shifting
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

        // Ensure last 7 days including today
        const today = new Date();
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(today.getDate() - 7);

        const filteredMoods = moodsFormatted
          .filter((mood) => new Date(mood.date) >= sevenDaysAgo)
          .sort((a, b) => new Date(a.date) - new Date(b.date));

        setMoodData(filteredMoods);
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
      <Navbar setAuth={setAuth} />
      <div>
        <h1 className={styles.title}>Dashboard</h1>
        <h2 className={styles.titleName}>Hi, {name}!</h2>
      </div>
      <div className={styles.container}>
        <div className={styles.containerLeft}>
          <div className={styles.chartConatiner}>
            <span className={styles.moodChartTitle}>Mood chart</span>
            <hr className={styles.hr2} />
            <MoodLineChart moods={moodData} />
          </div>
          <DashboardChallenge className={styles.dashboardChallenge} />
        </div>
        <div className={styles.containerRight}>
          <Timer className={styles.timer} />
          <TodayMood />
          <Note className={styles.note} />
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Dashboard;
