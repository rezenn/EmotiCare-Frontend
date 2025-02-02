import React, { useState } from "react";
import styles from "./journalForm.module.css";
import TextEditor from "../TextEditor";

function JournalForm(addItem) {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [text, setText] = useState("");

  const onSumbit = (event) => {
    event.preventDefault();
    let itemObject = {
      title: title,
      date: date,
      text: text,
    };
    addItem(itemObject);
  };
  return (
    <div className={styles.container}>
      <h1 className={styles.journalTitle}>Daily Journal</h1>
      <hr />
      <form className={styles.journalForm}>
        <div className={styles.formTitle}>
          <input
            onChange={(event) => setTitle(event.target.value)}
            type="text"
            placeholder="Title"
            className={styles.journalInput}
          />
          <br />
          <input
            type="date"
            onChange={(event) => setDate(event.target.value)}
            className={styles.journalDate}
          />
          <input
            type="time"
            onChange={(event) => setTime(event.target.value)}
            className={styles.journalTime}
          />
        </div>

        <TextEditor />
        <br />
        <button className={styles.journalSubmit} type="submit">
          Add Journal
        </button>
      </form>
    </div>
  );
}

export default JournalForm;
