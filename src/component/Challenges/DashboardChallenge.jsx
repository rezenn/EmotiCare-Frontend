import { useEffect, useState } from "react";
import styles from "./DashboardChallenge.module.css";
import axios from "../../axios/axios";

function DashboardChallenge() {
  const [challenges, setChallenges] = useState([]);

  useEffect(() => {
    fetchChallenges();
  }, []); // Remove the setInterval

  const fetchChallenges = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("/challenge/daily", {
        headers: { token },
      });

      const challengesWithCompleted = response.data.map((challenge) => ({
        ...challenge,
        completed: challenge.isdone || false,
      }));

      setChallenges(challengesWithCompleted);
    } catch (err) {
      console.error("Error fetching challenges:", err);
    }
  };

  const toggleChallenge = async (index) => {
    try {
      const token = localStorage.getItem("token");
      const selectedChallenge = challenges[index];

      // Ensure the challenge_id is correct
      console.log(`Toggling challenge: ${selectedChallenge.challenge_id}`);

      const response = await axios.patch(
        "/challenge/mark-done",
        { challengeID: selectedChallenge.challenge_id }, // Pass the correct challengeID
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
      <h2 className={styles.challengeTitle}>Today's Challenges</h2>
      <hr />
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
  );
}

export default DashboardChallenge;
