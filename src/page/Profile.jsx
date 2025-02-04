import { useEffect, useRef, useState } from "react";
import Navbar from "../component/Navbar/Navbar";
import styles from "./Profile.module.css";
import defaultUserImage from "../assets/ProfileImg.jpg"; // Adjust path as needed
import ViewProfile from "../component/Profile/ViewProfile";
import MoodLineChart from "../component/Chart/MoodLineChart";

function Profile() {
  const [name, setName] = useState("");
  const [moodData, setMoodData] = useState([]); // Stores mood data

  async function getNameAndMoods() {
    try {
      const token = localStorage.getItem("token");
      if (!token || token === "undefined") {
        setAuth(false);
        throw new Error("No token found");
      }

      const emojiToNumber = {
        "😀": 5,
        "🤩": 5,
        "😇": 4,
        "😌": 4,
        "😮": 5,
        "😴": 1,
        "😐": 4,
        "🫨": 3,
        "😰": 1,
        "😤": 2,
        "😒": 2,
        "😕": 3,
        "😔": 1,
        "😡": 3,
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
          mood: emojiToNumber[mood.mood_emoji] || 0, // Convert emoji to number
        }));
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
        <div className={styles.diplayProfile}>
          <ViewProfile className={styles.View} />
          <div className={styles.verticalLine}></div>
        </div>
        <div className={styles.chartContainer}>
          <MoodLineChart moods={moodData} />
        </div>
      </div>
    </>
  );
}

export default Profile;
