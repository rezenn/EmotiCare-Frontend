import styles from "./Timer.module.css";

function Timer() {
  return (
    <>
      <div className={styles.container}>
        <h2 className={styles.timerHeading}>Timer</h2>
        <hr />
        <div className={styles.btnContainer}>
          <button className={styles.decrBtn}>-</button>
          <div className={styles.time}>00:30:00</div>
          <button className={styles.incBtn}>+</button>
        </div>
        <button className={styles.startBtn}>Start timer</button>
      </div>
    </>
  );
}

export default Timer;
