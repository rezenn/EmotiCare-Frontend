import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import axios from "../../axios/axios";
import styles from "./MoodCalendar.module.css";

const MoodCalendar = ({ onMoodDataChange }) => {
  const [name, setName] = useState("");
  const [userId, setUserId] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [moods, setMoods] = useState({});
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const [currentDate, setCurrentDate] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const moodOptions = [
    { emoji: "😀", label: "Happy" },
    { emoji: "🤩", label: "Excited" },
    { emoji: "⚪", label: "Blank" },
    { emoji: "😇", label: "Blessed" },
    { emoji: "😌", label: "Relaxed" },
    { emoji: "😮", label: "Surprised" },
    { emoji: "😐", label: "Indifferent" },
    { emoji: "😕", label: "Confused" },
    { emoji: "😴", label: "Tired" },
    { emoji: "😔", label: "Gloomy" },
    { emoji: "😒", label: "Annoyed" },
    { emoji: "🫨", label: "Overwhelmed" },
    { emoji: "😰", label: "Nervous" },
    { emoji: "😞", label: "Disappointed" },
    { emoji: "😡", label: "Angry" },
    { emoji: "😤", label: "Enraged" },
  ];

  const emojiToNumber = {
    "😀": 5,
    "🤩": 5,
    "😇": 5,
    "😌": 4,
    "😮": 4,
    "😴": 3,
    "😐": 4,
    "🫨": 2,
    "😰": 2,
    "😤": 1,
    "😒": 2,
    "😕": 3,
    "😔": 1,
    "😡": 1,
    "😞": 1,
  };

  const getLocalDate = (date) => {
    const offset = date.getTimezoneOffset() * 60000;
    const localDate = new Date(date.getTime() - offset);
    return localDate.toISOString().split("T")[0];
  };

  const getName = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found");

      const response = await axios.get("/moodTracker", { headers: { token } });
      setName(response.data.user_name);
      setUserId(response.data.user_id);
    } catch (error) {
      console.error(error.message);
    }
  };

  const fetchMoods = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("/moodTracker", {
        headers: { token },
      });

      if (Array.isArray(response.data.moods)) {
        const moods = {};
        response.data.moods.forEach((mood) => {
          const formattedDate = getLocalDate(new Date(mood.mood_date));
          moods[formattedDate] = mood.mood_emoji;
        });
        setMoods(moods);
      } else {
        console.error("Invalid data structure for moods", response.data.moods);
      }
      setIsLoading(false);
    } catch (error) {
      console.error("Failed to fetch moods:", error.message);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getName();
    fetchMoods();
  }, []);

  const handleDateClick = (date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Normalize today's date for accurate comparison

    if (date > today) {
      alert("You cannot set a mood for a future date!");
      return;
    }

    setCurrentDate(date);
    setIsPickerOpen(true);
  };

  const handleEmojiSelect = async (emoji, label) => {
    if (!currentDate) {
      console.error("Invalid date");
      return;
    }

    const formattedDate = getLocalDate(currentDate);
    const updatedMoods = { ...moods, [formattedDate]: emoji };
    setMoods(updatedMoods);
    setIsPickerOpen(false);

    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found");

      await axios.post(
        "/moodTracker",
        {
          moodDate: formattedDate,
          moodEmoji: emoji,
          moodLabel: label,
        },
        { headers: { token, "Content-Type": "application/json" } }
      );
      fetchMoods();
    } catch (error) {
      console.error("Error posting mood:", error.message);
    }
  };

  const tileContent = ({ date, view }) => {
    if (view === "month") {
      const formattedDate = getLocalDate(date);
      return moods[formattedDate] ? <span>{moods[formattedDate]}</span> : null;
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.CalendarDiv}>
      <h1 className={styles.titleMood}>Moodometer</h1>
      <h2 className={styles.moodToday}>How is your mood today, {name}?</h2>
      <Calendar
        className={styles.moodCalendar}
        onClickDay={handleDateClick}
        value={selectedDate}
        tileContent={tileContent}
      />
      {isPickerOpen && (
        <div className={styles.emojiPicker}>
          <h3>Select your mood</h3>
          <div className={styles.emojiOptions}>
            {moodOptions.map((mood) => (
              <button
                key={mood.label}
                className={styles.emojiButton}
                onClick={() => handleEmojiSelect(mood.emoji, mood.label)}
                aria-label={`Select ${mood.label} mood`}
              >
                <span role="img" aria-label={mood.label}>
                  {mood.emoji}
                </span>
                <p>{mood.label}</p>
              </button>
            ))}
          </div>
        </div>
      )}
      {isPickerOpen && (
        <div
          className={styles.emojiPickerOverlay}
          onClick={() => setIsPickerOpen(false)}
        />
      )}
    </div>
  );
};

export default MoodCalendar;
