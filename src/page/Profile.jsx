import { useRef, useState } from "react";
import Navbar from "../component/Navbar/Navbar";
import styles from "./Profile.module.css";
import defaultUserImage from "../assets/ProfileImg.jpg"; // Adjust path as needed
import ViewProfile from "../component/Profile/ViewProfile";
import LineChart from "../component/Chart/LineChart";

function Profile() {
  return (
    <>
      <Navbar activePage="profile" />
      <div className={styles.diplayProfile}>
        <ViewProfile className={styles.View} />
        <div className={styles.verticalLine}></div>

        <LineChart />
      </div>
    </>
  );
}

export default Profile;
