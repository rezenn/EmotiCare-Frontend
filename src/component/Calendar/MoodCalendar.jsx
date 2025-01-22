import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import { useNavigate } from "react-router-dom";
import "react-calendar/dist/Calendar.css";
import styles from "./MoodCalendar.module.css";
const MoodCalendar = ({ setAuth }) => {
  const navigate = useNavigate();

  const handleNavigation = (page) => {
    setActivePage(page);
    navigate(`/${page}`);
  };

  const [name, setName] = useState("");
  const [userId, setUserId] = useState(null);

  async function getName() {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found");
      }

      const response = await fetch("http://localhost:5000/moodTracker", {
        method: "GET",
        headers: { token },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch username.");
      }

      const parseRes = await response.json();
      setName(parseRes.user_name);
      setUserId(parseRes.user_id); // Assuming user_id is part of the response
    } catch (error) {
      console.error(error.message);
    }
  }

  useEffect(() => {
    getName();
    fetchMoods();
  }, []);

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [moods, setMoods] = useState({});
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const [currentDate, setCurrentDate] = useState(null);

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

  // Fetch moods from the database
  async function fetchMoods() {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch("http://localhost:5000/moodTracker/mood", {
        method: "GET",
        headers: { token },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch moods");
      }

      const data = await response.json();
      const moods = {};
      data.forEach((mood) => {
        moods[mood.mood_date] = mood.mood_emoji;
      });
      setMoods(moods); // Update moods in state
    } catch (error) {
      console.error(error.message);
    }
  }

  // Store moods locally
  useEffect(() => {
    const storedMoods = JSON.parse(localStorage.getItem("moods")) || {};
    setMoods(storedMoods);
  }, []);

  useEffect(() => {
    localStorage.setItem("moods", JSON.stringify(moods));
  }, [moods]);

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

    const formattedDate = currentDate.toISOString().split("T")[0];
    const updatedMoods = { ...moods, [formattedDate]: emoji };
    setMoods(updatedMoods);
    setIsPickerOpen(false);

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found");
      }

      const response = await fetch("http://localhost:5000/moodTracker", {
        method: "POST",
        headers: { token, "Content-Type": "application/json" },
        body: JSON.stringify({
          moodDate: formattedDate,
          moodEmoji: emoji,
          moodLabel: label,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to post mood");
      }

      const newMood = await response.json();
      console.log("Mood added:", newMood);
    } catch (error) {
      console.error("Error posting mood:", error.message);
    }
  };

  // Render the tile content
  const tileContent = ({ date, view }) => {
    if (view === "month") {
      const formattedDate = date.toISOString().split("T")[0];
      return moods[formattedDate] ? <span>{moods[formattedDate]}</span> : null;
    }
  };

  return (
    <div className={styles.CalendarDiv}>
      <h1 className={styles.title}>Mood Tracker</h1>
      <div className={styles.moodCalendar}>
        <h1 className="moodToday">How is your mood today, {name}!</h1>
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
    </div>
  );
};

export default MoodCalendar;
