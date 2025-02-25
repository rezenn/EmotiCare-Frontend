import { useEffect, useState } from "react";
import styles from "./DashboardChallenge.module.css";
import axios from "../../axios/axios";

function DashboardChallenge() {
  const [challenges, setChallenges] = useState([]);

  useEffect(() => {
    fetchChallenges();
    const intervalId = setInterval(fetchChallenges, 1000);
    return () => clearInterval(intervalId);
  }, []);

  const fetchChallenges = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("/challenge/daily", {
        headers: { token },
      });

      const challengesWithCompleted = response.data.map((challenge) => ({
        ...challenge,
        completed: challenge.isdone || false,
        isPreloaded: challenge.IsPreloaded || false,
      }));

      setChallenges(challengesWithCompleted);
    } catch (err) {
      console.error("Error fetching challenges:", err);
    }
  };

  const toggleChallenge = async (index) => {
    const selectedChallenge = challenges[index];

    if (selectedChallenge.isPreloaded) {
      alert("You cannot mark preloaded challenges as done.");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      const response = await axios.patch(
        "/challenge/mark-done",
        { challengeID: selectedChallenge.challenge_id },
        {
          headers: { token },
        }
      );

      const updatedChallenges = challenges.map((c, i) =>
        i === index ? { ...c, completed: response.data.challenge.isdone } : c
      );
      setChallenges(updatedChallenges);
    } catch (err) {
      console.error("Error toggling challenge:", err);
    }
  };

  const totalChallenges = challenges.length;
  const completedChallenges = challenges.filter((c) => c.completed).length;
  const completionPercentage =
    totalChallenges > 0
      ? Math.round((completedChallenges / totalChallenges) * 100)
      : 0;

  return (
    <div className={styles.challengeContainer}>
      <h2 className={styles.challengeTitle}>Challenges</h2>
      <hr />

      {totalChallenges > 0 && (
        <div className={styles.progressContainer}>
          <div
            className={styles.progressBar}
            style={{ width: `${completionPercentage}%` }}
          ></div>
          <p className={styles.progressText}>
            {completionPercentage}% Completed ({completedChallenges}/
            {totalChallenges})
          </p>
        </div>
      )}

      <div className={styles.displayChallenges}>
        <ul>
          {challenges.map((challenge, index) => (
            <li className={styles.listItems} key={challenge.challenge_id}>
              <input
                type="checkbox"
                className={styles.inputCheckbox}
                checked={challenge.completed || false}
                onChange={() => toggleChallenge(index)}
                disabled={challenge.isPreloaded}
              />
              <span className={styles.challengeName}>{challenge.title}</span>
              <br />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default DashboardChallenge;
