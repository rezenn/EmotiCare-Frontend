import { useState } from "react";
import styles from "./Challenge.module.css";

function Challenge() {
  const [challenges, setChallenges] = useState([]);
  const [challengeInput, setChallengeInput] = useState("");

  const addChallenge = () => {
    if (challengeInput.trim() === "") {
      alert("Please enter a challenge.");
    }
    setChallenges([...challenges, { text: challengeInput, completed: false }]);
    setChallengeInput("");
  };

  const toggleChallenge = (index) => {
    const updateChallenges = challenges.map((challenge, i) =>
      i === index
        ? { ...challenge, completed: !challenge.completed }
        : challenge
    );
    setChallenges(updateChallenges);
  };

  const removeChallenge = (index) => {
    const updateChallenges = challenges.filter((_, i) => i !== index);
    setChallenges(updateChallenges);
  };

  return (
    <>
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
          {challenges.map((challenges, index) => (
            <li className={styles.listItems} key={index}>
              <input
                type="checkbox"
                className={styles.inputCheckbox}
                checked={challenges.completed}
                onChange={() => toggleChallenge(index)}
              />
              <span className={styles.challengeName}>{challenges.text}</span>
              <button
                className={styles.removeButton}
                onClick={() => removeChallenge(index)}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default Challenge;
