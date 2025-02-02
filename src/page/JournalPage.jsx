import React from "react";
import Navbar from "../component/Navbar/Navbar";
import JournalForm from "../component/Journal/JournalForm";
import Footer from "../component/Footer/Footer2";
import JournalView from "../component/Journal/JournalView";
import styles from "./journalPage.module.css";

function JournalPage() {
  return (
    <>
      <Navbar activePage="journal" />
      <div className={styles.journalContainer}>
        <JournalForm />
        <div className={styles.verticalLine}></div>
        <JournalView />
      </div>
      {/* <Footer /> */}
    </>
  );
}

export default JournalPage;
