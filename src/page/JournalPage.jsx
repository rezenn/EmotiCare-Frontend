import React, { useState, useEffect } from "react";
import axios from "../axios/axios";
import Navbar from "../component/Navbar/Navbar";
import JournalView from "../component/Journal/JournalView";
import styles from "./journalPage.module.css";
import Footer2 from "../component/Footer/Footer2";

function JournalPage() {
  const [journals, setJournals] = useState([]);

  useEffect(() => {
    const fetchJournals = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const response = await axios.get("http://localhost:5000/dailyJournal", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setJournals(response.data); // Update state with the latest journals
      } catch (error) {
        console.error("Error fetching journals:", error);
      }
    };

    fetchJournals();
  }, []); // Run only once when the component mounts

  const addItem = (newJournal) => {
    setJournals((prevJournals) => [...prevJournals, newJournal]); // Update the journals state
  };

  return (
    <>
      <Navbar activePage="journal" />
      <div className={styles.journalContainer}>
        {/* <JournalForm addItem={addItem} journals={journals} /> */}
        <div className={styles.verticalLine}></div>
        <JournalView journals={journals} setJournals={setJournals} />{" "}
        {/* Pass setJournals here */}
      </div>
      <Footer2 />
    </>
  );
}

export default JournalPage;
