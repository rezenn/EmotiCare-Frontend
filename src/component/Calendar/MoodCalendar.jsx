import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import axios from "../../axios/axios";
import styles from "./MoodCalendar.module.css";

const MoodCalendar = () => {
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
    { emoji: "😴", label: "Tired" },
    { emoji: "😐", label: "Indifferent" },
    { emoji: "🫨", label: "Overwhelmed" },
    { emoji: "😰", label: "Nervous" },
    { emoji: "😤", label: "Enraged" },
    { emoji: "😒", label: "Annoyed" },
    { emoji: "😕", label: "Confused" },
    { emoji: "😔", label: "Disappointed" },
    { emoji: "😡", label: "Angry" },
    { emoji: "😔", label: "Gloomy" },
  ];

  // Convert date to local timezone
  const getLocalDate = (date) => {
    const offset = date.getTimezoneOffset() * 60000; // Convert offset to milliseconds
    const localDate = new Date(date.getTime() - offset);
    return localDate.toISOString().split("T")[0];
  };

  // Fetch user info
  async function getName() {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found");
      }

      const response = await axios.get("/moodTracker", {
        headers: { token },
      });

      setName(response.data.user_name);
      setUserId(response.data.user_id);
    } catch (error) {
      console.error(error.message);
    }
  }

  // Fetch moods from the database
  async function fetchMoods() {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get("/moodTracker/mood", {
        headers: { token },
      });

      const moods = {};
      response.data.forEach((mood) => {
        const formattedDate = getLocalDate(new Date(mood.mood_date)); // Normalize date format
        moods[formattedDate] = mood.mood_emoji;
      });
      setMoods(moods);
      setIsLoading(false);
    } catch (error) {
      console.error(error.message);
      setIsLoading(false);
    }
  }

  // Fetch data on component mount
  useEffect(() => {
    getName();
    fetchMoods();
  }, []);

  // Log the moods state
  useEffect(() => {}, [moods]);

  // Handle date click
  const handleDateClick = (date) => {
    setCurrentDate(date);
    setIsPickerOpen(true);
  };

  // Handle emoji selection
  const handleEmojiSelect = async (emoji, label) => {
    if (!currentDate) {
      console.error("Invalid date");
      return;
    }

    const formattedDate = getLocalDate(currentDate); // Use local timezone
    const updatedMoods = { ...moods, [formattedDate]: emoji };
    setMoods(updatedMoods);
    setIsPickerOpen(false);

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found");
      }

      const response = await axios.post(
        "/moodTracker",
        {
          moodDate: formattedDate,
          moodEmoji: emoji,
          moodLabel: label,
        },
        {
          headers: { token, "Content-Type": "application/json" },
        }
      );
    } catch (error) {
      console.error("Error posting mood:", error.message);
    }
  };

  // Render the tile content
  const tileContent = ({ date, view }) => {
    if (view === "month") {
      const formattedDate = getLocalDate(date); // Use local timezone
      return moods[formattedDate] ? <span>{moods[formattedDate]}</span> : null;
    }
  };

  // Show loading state while fetching data
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.CalendarDiv}>
      <img
        className={styles.moodometer}
        src=".\src\assets\moodometer.png"
        alt="moodometer"
      />
      <h2 className={styles.moodToday}>How is your mood today, {name}!</h2>
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
