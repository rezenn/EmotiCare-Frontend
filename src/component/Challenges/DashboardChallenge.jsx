import { useState } from "react";
import styles from "./DashboardChallenge.module.css";

function DashboardChallenge() {
  const [challenges, setChallenges] = useState([]);
  const [challengeInput, setChallengeInput] = useState("");

  const toggleChallenge = (index) => {
    const updateChallenges = challenges.map((challenge, i) =>
      i === index
        ? { ...challenge, completed: !challenge.completed }
        : challenge
    );
    setChallenges(updateChallenges);
  };

  return (
    <>
      <div className={styles.challengeContainer}>
        <h2 className={styles.challengeTitle}>Today's Challenges</h2>
        <hr />

        <ul>
          <li className={styles.listItems}>
            <label className={styles.challengeName}>
              <input type="checkbox" className={styles.inputCheckbox} />
              Read a book for 30 minutes.
            </label>
            <label className={styles.challengeName}>
              <input type="checkbox" className={styles.inputCheckbox} />
              Do 100 jumping jacks.
            </label>
          </li>
        </ul>
      </div>
    </>
  );
}

export default DashboardChallenge;
