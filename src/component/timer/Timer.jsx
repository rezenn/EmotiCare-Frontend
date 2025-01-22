import React, { useState, useEffect, useRef } from "react";
import styles from "./Timer.module.css";

function Timer() {
  const [timerSecond, setTimerSecond] = useState(1800);
  const [isRunning, setIsRunning] = useState(false);
  const timerIntervalRef = useRef(null);
  const alarm = useRef(new Audio("./src/assets/audio/alarm.mp3"));
  const background = useRef(new Audio("./src/assets/audio/background.mp3"));

  useEffect(() => {
    alarm.current.preload = "auto";
    background.current.preload = "auto";

    return () => {
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
      }
      background.current.pause();
      alarm.current.pause();
    };
  }, []);

  const formatTimer = (second) => {
    const hours = Math.floor(second / 3600)
      .toString()
      .padStart(2, "0");
    const minutes = Math.floor((second % 3600) / 60)
      .toString()
      .padStart(2, "0");
    const secs = Math.floor(second % 60)
      .toString()
      .padStart(2, "0");
    return `${hours}:${minutes}:${secs}`;
  };

  const handleIncrement = () => {
    setTimerSecond((prev) => prev + 300);
  };

  const handleDecrement = () => {
    setTimerSecond((prev) => (prev >= 300 ? prev - 300 : prev));
  };

  const handleStartPause = () => {
    if (isRunning) {
      clearInterval(timerIntervalRef.current);
      timerIntervalRef.current = null;
      setIsRunning(false);
      background.current.pause();
    } else {
      setIsRunning(true);
      timerIntervalRef.current = setInterval(() => {
        setTimerSecond((prev) => {
          if (prev > 0) {
            if (background.current.paused) {
              background.current.play();
            }
            return prev - 1;
          } else {
            clearInterval(timerIntervalRef.current);
            timerIntervalRef.current = null;
            setIsRunning(false);
            background.current.pause();
            alarm.current.play();
            return prev;
          }
        });
      }, 1000);
    }
  };

  const handleEnd = () => {
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
      timerIntervalRef.current = null;
    }
    setIsRunning(false);
    background.current.pause();
    background.current.currentTime = 0;
    alarm.current.pause();
    alarm.current.currentTime = 0;
    setTimerSecond(1800); // Reset timer to initial value
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.timerHeading}>Timer</h2>
      <hr />
      <div className={styles.btnContainer}>
        <button className={styles.decrBtn} onClick={handleDecrement}>
          -
        </button>
        <div className={styles.time}>{formatTimer(timerSecond)}</div>
        <button className={styles.incBtn} onClick={handleIncrement}>
          +
        </button>
      </div>
      <button
        className={styles.startBtn}
        onClick={timerSecond === 0 ? handleEnd : handleStartPause}
      >
        {timerSecond === 0 ? "End Timer" : isRunning ? "Pause" : "Start Timer"}
      </button>
    </div>
  );
}

export default Timer;
