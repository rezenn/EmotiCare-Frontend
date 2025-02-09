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
        isPreloaded: challenge.IsPreloaded || false, // Add IsPreloaded flag
      }));

      setChallenges(challengesWithCompleted);
    } catch (err) {
      console.error("Error fetching challenges:", err);
    }
  };

  // Adjust the checkbox behavior to disable interaction with preloaded challenges
  const toggleChallenge = async (index) => {
    const selectedChallenge = challenges[index];

    if (selectedChallenge.isPreloaded) {
      alert("You cannot mark preloaded challenges as done.");
      return;
    }

    // Proceed with toggling if it's not preloaded
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

  return (
    <div className={styles.challengeContainer}>
      <h2 className={styles.challengeTitle}>Challenges</h2>
      <hr />
      <div className={styles.displayChallenges}>
        <ul>
          {challenges.map((challenge, index) => (
            <li className={styles.listItems} key={challenge.challenge_id}>
              <input
                type="checkbox"
                className={styles.inputCheckbox}
                checked={challenge.completed || false}
                onChange={() => toggleChallenge(index)} // Trigger toggle on change
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
