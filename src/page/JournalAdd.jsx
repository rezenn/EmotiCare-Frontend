import React, { useState, useEffect } from "react";
import axios from "../axios/axios";
import Navbar from "../component/Navbar/Navbar";
import JournalForm from "../component/Journal/JournalForm";

function JournalAdd() {
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
      <Navbar />
      <JournalForm addItem={addItem} journals={journals} />
    </>
  );
}

export default JournalAdd;
