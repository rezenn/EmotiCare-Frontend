import { useEffect, useState } from "react";
import DashboardChallenge from "../component/Challenges/DashboardChallenge";
import Footer from "../component/Footer/Footer2";
import TodayMood from "../component/MoodToday/MoodToday";
import Navbar from "../component/Navbar/Navbar";
import Note from "../component/notes/Note";
import Timer from "../component/timer/Timer";
import styles from "./Dashboard.module.css";

function Dashboard({ setAuth }) {
  const [name, setName] = useState("");

  async function getName() {
    try {
      const token = localStorage.getItem("token");
      if (!token || token === "undefined") {
        setAuth(false);
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
    } catch (error) {
      console.error(error.message);
    }
  }
  useEffect(() => {
    getName();
  }, []);

  return (
    <>
      <Navbar setAuth={setAuth} />
      <div>
        <h1 className={styles.title}>Dashboard</h1>
        <h2 className={styles.titleName}>Hi, {name}!</h2>
      </div>
      <div className={styles.container}>
        <div className={styles.containerLeft}>
          <DashboardChallenge className={styles.dashboardChallenge} />
          <DashboardChallenge className={styles.dashboardChallenge} />
        </div>
        <div className={styles.containerRight}>
          <Timer className={styles.timer} />
          <TodayMood />
          <Note className={styles.note} />
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Dashboard;
