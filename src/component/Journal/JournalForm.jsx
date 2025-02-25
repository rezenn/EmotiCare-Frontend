import React, { useState } from "react";
import styles from "./journalForm.module.css";
import TextEditor from "../TextEditor";
import axios from "../../axios/axios";
import { Navigate, useNavigate } from "react-router-dom";

function JournalForm({ addItem, journals }) {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [text, setText] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const convertToUTC = (time) => {
    const date = new Date(`1970-01-01T${time}:00`);
    return date.toISOString().split("T")[1].slice(0, 8); 
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    const token = localStorage.getItem("token");
    if (!token) {
      alert("You must be logged in to add a journal.");
      setIsLoading(false);
      return;
    }

    const existingJournal = journals.find(
      (journal) => journal.entry_date === date
    );

    if (existingJournal) {
      alert("A journal entry for this date already exists!");
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/dailyJournal",
        {
          title,
          description: text,
          entry_date: date,
          entry_time: convertToUTC(time), 
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      addItem(response.data);
      alert("Journal added successfully!");
      navigate("/journal");

      setTitle("");
      setDate("");
      setTime("");
      setText("");
    } catch (error) {
      console.error("Failed to add journal:", error);
      alert("Failed to add daily journal");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.journalTitle}>Daily Journal</h1>
      <hr />
      <form className={styles.journalForm} onSubmit={onSubmit}>
        <div className={styles.formTitle}>
          <input
            onChange={(event) => setTitle(event.target.value)}
            value={title}
            type="text"
            placeholder="Title"
            className={styles.journalInput}
            required
          />
          <br />
          <input
            type="date"
            onChange={(event) => setDate(event.target.value)}
            value={date}
            className={styles.journalDate}
            required
          />
          <input
            type="time"
            onChange={(event) => setTime(event.target.value)}
            value={time}
            className={styles.journalTime}
            required
          />
        </div>

        <TextEditor value={text} onChange={setText} />
        <br />
        <button
          className={styles.journalSubmit}
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? "Adding..." : "Add Journal"}
        </button>
      </form>
    </div>
  );
}

export default JournalForm;
