import Challenge from "../component/Challenges/Challenge";
import DashboardChallenge from "../component/Challenges/DashboardChallenge";
import Footer from "../component/Footer/Footer2";
import Navbar from "../component/Navbar/Navbar";

import styles from "./DailyChallenge.module.css";

function DailyChallenge() {
  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <DashboardChallenge className={styles.challenges} />
        <Challenge />
      </div>
      <Footer />
    </>
  );
}

export default DailyChallenge;
