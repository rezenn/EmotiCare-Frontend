import DashboardChallenge from "../component/Challenges/DashboardChallenge";
import Footer from "../component/Footer/Footer2";
import TodayMood from "../component/MoodToday/MoodToday";
import Navbar from "../component/Navbar/Navbar";
import Note from "../component/notes/Note";
import Timer from "../component/timer/Timer";
import styles from "./Dashboard.module.css";

function Dashboard({ setAuth }) {
  return (
    <>
      <Navbar setAuth={setAuth} />
      <div className={styles.container}>
        <h1>Dashboard</h1>
        <h2>Hi, Royan!</h2>
        <DashboardChallenge className={styles.dashboardChallenge} />
        <Timer className={styles.timer} />
        <DashboardChallenge className={styles.dashboardChallenges} />
        <Note className={styles.note} />
        <TodayMood />
      </div>
      <Footer />
    </>
  );
}

export default Dashboard;
