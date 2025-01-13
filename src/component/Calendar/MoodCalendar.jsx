import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css"; 
import style from  "./MoodCalendar.module.css"; 

const MoodCalendar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [moods, setMoods] = useState({});
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const [currentDate, setCurrentDate] = useState(null);

  const moodOptions = [
    { emoji: "😀", label: "Happy" },
    { emoji: "🤩", label: "Excited" },
    { emoji: "😇", label: "Blessed" },
    { emoji: "😇", label: "Blessed" },
    { emoji: "😴", label: "Tired" },
    { emoji: "😐", label: "Indifferent" },
    { emoji: "😌", label: "Relaxed " },
    { emoji: "😮", label: "Suprised" },
    { emoji: "🫨", label: "Overwhelmed" },
    { emoji: "😰", label: "Nervous" },
    { emoji: "😤", label: "Enraged" },
    { emoji: "😒", label: "Annoyed" },
    { emoji: "😕", label: "Confused" },
    { emoji: "😔", label: "Disappointed" },
    { emoji: "😡", label: "Angry" },
    { emoji: "😔", label: "Gloomy " },

    
  ];

  useEffect(() => {
    const storedMoods = JSON.parse(localStorage.getItem("moods")) || {};
    setMoods(storedMoods);
  }, []);

  useEffect(() => {
    localStorage.setItem("moods", JSON.stringify(moods));
  }, [moods]);

  const handleDateClick = (date) => {
    setCurrentDate(date);
    setIsPickerOpen(true);
  };

  const handleEmojiSelect = (emoji) => {
    const formattedDate = currentDate.toISOString().split("T")[0];
    const updatedMoods = { ...moods, [formattedDate]: emoji };
    setMoods(updatedMoods);
    setIsPickerOpen(false);
  };

  const tileContent = ({ date, view }) => {
    if (view === "month") {
      const formattedDate = date.toISOString().split("T")[0];
      return moods[formattedDate] ? <span>{moods[formattedDate]}</span> : null;
    }
  };

  return (
    <div className={style.CalendarDiv}>
      <h1 className={style.title}>Mood Tracker</h1>
      <div className={style.moodCalendar}>
        <h1 className="moodToday">How is your mood today</h1>
        <Calendar
          className={style.moodCalendar}
          onClickDay={handleDateClick}
          value={selectedDate}
          tileContent={tileContent}
        />
        {isPickerOpen && (
          <div className={style.emojiPicker}>
            <h3>Select your mood</h3>
            <div className={style.emojiOptions}>
              {moodOptions.map((mood) => (
                <button
                  key={mood.label}
                  className={style.emojiButton}
                  onClick={() => handleEmojiSelect(mood.emoji)}
                >
                  <span className="span" role="img" aria-label={mood.label}>
                    {mood.emoji}
                  </span>
                  <p>{mood.label}</p>
                </button>
              ))}
            </div>
          </div>
        )}
        {isPickerOpen && <div className={style.emojiPickerOverlay} onClick={() => setIsPickerOpen(false)} />}
      </div>
    </div>
  );
};

export default MoodCalendar;
