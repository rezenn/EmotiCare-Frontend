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
  const [moodData, setMoodData] = useState([]); // Stores mood data

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
        "😔": "Glommy",
        "😒": "Annoyed",
        "🫨": "Overwhelmed",
        "😰": "Nervous",
        "☹️": "Disappointed",
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
        const moodsFormatted = parseRes.moods.map((mood) => ({
          date: new Date(mood.mood_date).toISOString().split("T")[0],
          mood: emojiToMood[mood.mood_emoji] || "Unknown", // Convert emoji to mood name
        }));
        const today = new Date();
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(today.getDate() - 6); // 6 days ago + today

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
