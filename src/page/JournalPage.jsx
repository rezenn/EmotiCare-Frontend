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

        setJournals(response.data);
      } catch (error) {
        console.error("Error fetching journals:", error);
      }
    };

    fetchJournals();
  }, []);

  const addItem = (newJournal) => {
    setJournals((prevJournals) => [...prevJournals, newJournal]);
  };

  return (
    <>
      <Navbar activePage="journal" />
      <div className={styles.journalContainer}>
        <div className={styles.verticalLine}></div>
        <JournalView journals={journals} setJournals={setJournals} />{" "}
      </div>
      <Footer2 />
    </>
  );
}

export default JournalPage;
