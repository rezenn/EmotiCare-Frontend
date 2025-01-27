import { useState, useEffect } from "react";
import axios from "axios";
import styles from "./Challenge.module.css";

function Challenge() {
  const [challenges, setChallenges] = useState([]);
  const [challengeInput, setChallengeInput] = useState("");
  const [isPreloaded, setIsPreloaded] = useState(false);

  useEffect(() => {
    fetchChallenges();
  }, []);

  const fetchChallenges = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found in localStorage");
        return;
      }

      const response = await axios.get("http://localhost:5000/challenge/all", {
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

  const addChallenge = async () => {
    if (challengeInput.trim() === "") {
      alert("Please enter a challenge.");
      return;
    }
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found in localStorage");
        return;
      }

      const isPreloaded = false;
      const response = await axios.post(
        "http://localhost:5000/challenge/add",
        { title: challengeInput, isPreloaded },
        {
          headers: { token },
        }
      );
      setChallenges([...challenges, response.data]);
      setChallengeInput("");
    } catch (err) {
      console.error("Error adding challenge:", err);
    }
  };

  const toggleChallenge = async (index) => {
    const challenge = challenges[index];

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found in localStorage");
        return;
      }

      const response = await axios.patch(
        "http://localhost:5000/challenge/mark-done",
        { challengeID: challenge.challenge_id },
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

  const removeChallenge = async (index) => {
    const challenge = challenges[index];

    if (!challenge?.challenge_id) {
      console.error("Challenge ID is undefined");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found in localStorage");
        return;
      }

      const response = await axios.delete(
        `http://localhost:5000/challenge/delete/${challenge.challenge_id}`,
        {
          headers: { token },
        }
      );

      if (response.status === 200) {
        const updatedChallenges = challenges.filter((_, i) => i !== index);
        setChallenges(updatedChallenges);
      } else {
        console.error("Unexpected response:", response);
      }
    } catch (err) {
      console.error("Error removing challenge:", err);
      console.error("Error response data:", err.response?.data);
    }
  };
  return (
    <div className={styles.challengeContainer}>
      <h2 className={styles.challengeTitle}>Add your Challenges</h2>
      <hr />
      <input
        onChange={(e) => setChallengeInput(e.target.value)}
        className={styles.enterChallenge}
        type="text"
        value={challengeInput}
        placeholder="Add your own challenges . . ."
      />
      <button onClick={addChallenge} className={styles.addChallenge}>
        Add Challenge
      </button>

      <ul>
        {challenges.map((challenge, index) => {
          return (
            <li className={styles.listItems} key={challenge.challenge_id}>
              <input
                type="checkbox"
                className={styles.inputCheckbox}
                checked={challenge.completed || false}
                onChange={() => toggleChallenge(index)}
              />
              <span className={styles.challengeName}>{challenge.title}</span>
              <button
                className={styles.removeButton}
                onClick={() => removeChallenge(index)}
              >
                Remove
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Challenge;
