import React from "react";
import styles from "./features.module.css";
import Header from "../component/Navbar/Header";
import Footer from "../component/Footer/Footer";

function Features() {
  return (
    <>
      <Header activePage="features" />
      <div className={styles.featureContainer}>
        <h1 className={styles.title}>✨ Features of EmotiCare ✨</h1>
        <h3 className={styles.subtitle}>
          🌟 Track, Reflect, and Grow with Ease!
        </h3>
        <p className={styles.description}>
          The Mood & Self-Care Companion App is designed to help you stay
          mindful, manage emotions, and develop positive self-care habits.
          Explore the features that make your wellness journey seamless and
          rewarding.
        </p>

        <div className={styles.featuresGrid}>
          <div className={styles.featureBox}>
            <h3>📊 Mood Tracking</h3>
            <ul>
              <li>Log your daily mood and emotions effortlessly.</li>
              <li>
                Choose from a variety of mood options or add custom feelings.
              </li>
              <li>
                View detailed insights and trends over time with interactive
                charts.
              </li>
              <li>
                AI-based mood analysis to provide personalized self-care tips.
              </li>
            </ul>
          </div>

          <div className={styles.featureBox}>
            <h3>📖 Daily Journal</h3>
            <ul>
              <li>Write daily reflections, thoughts, and experiences.</li>
              <li>Add images or voice notes to capture emotions vividly.</li>
              <li>Lock personal entries for privacy.</li>
              <li>Search past entries for quick reflection.</li>
            </ul>
          </div>

          <div className={styles.featureBox}>
            <h3>⏳ Timer for Self-Care Activities</h3>
            <ul>
              <li>Use a built-in timer to focus on mindfulness practices.</li>
              <li>Pomodoro-style sessions for productivity and relaxation.</li>
              <li>Adjustable durations for different activities.</li>
            </ul>
          </div>

          <div className={styles.featureBox}>
            <h3>📝 Notes & Reminders</h3>
            <ul>
              <li>Jot down quick thoughts, affirmations, or to-do lists.</li>
              <li>Set reminders for important self-care tasks.</li>
              <li>Organize notes with categories and tags for easy access.</li>
            </ul>
          </div>

          <div className={styles.featureBox}>
            <h3>📈 Charts & Insights</h3>
            <ul>
              <li>View weekly and monthly progress on mood trends.</li>
              <li>Compare moods with self-care activity completion rates.</li>
              <li>
                Gain insights into emotional patterns and well-being
                improvements.
              </li>
            </ul>
          </div>

          <div className={styles.featureBox}>
            <h3>🔒 Privacy & Security</h3>
            <ul>
              <li>Secure journal entries and user info with passcodes.</li>
              <li>Backup to prevent data loss.</li>
              <li>Protect user data and information.</li>
            </ul>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Features;
