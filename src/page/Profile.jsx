import Navbar from "../component/Navbar/Navbar";
import styles from "./Profile.module.css";
import ViewProfile from "../component/Profile/ViewProfile";
import DisplayChart from "../component/DisplayChart/DisplayChart";
import Footer2 from "../component/Footer/Footer2";

function Profile() {
  return (
    <>
      <Navbar activePage="profile" />
      <div className={styles.profileConatiner}>
        <div className={styles.displayProfile}>
          <ViewProfile className={styles.View} />
        </div>
        <div className={styles.displayChart}>
          <DisplayChart />
        </div>
      </div>
      <Footer2 />
    </>
  );
}

export default Profile;
