import { useRef, useState } from "react";
import styles from "./EditProfileComp.module.css";
import defaultUserImage from "../../assets/ProfileImg.jpg";

function EditProfileComp() {
  const [profileImg, setProfileImg] = useState(null);
  const fileInputRef = useRef(null);

  const editProfileImg = () => {
    fileInputRef.current.click();
  };

  const changeProfileImage = (e) => {
    const file = e.target.files[0]; // Fixed: use files instead of file
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileImg(imageUrl);
    }
  };

  return (
    <>
      <div className={styles.container}>
        <form className={styles.profile}>
          <div className={styles.profileContainer}>
            <img
              className={styles.profileImg}
              src={profileImg || defaultUserImage}
              alt="User"
            />
            <button
              className={styles.changeImgBtn}
              type="button"
              onClick={editProfileImg}
            >
              Change Profile
            </button>
          </div>
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={changeProfileImage}
            style={{ display: "none" }}
          />
          <br />
          <label className={styles.profileLabel}>Full Name:</label>
          <br />
          <input
            className={styles.profileInput}
            type="text"
            placeholder="Full Name"
          />
          <br />
          <label className={styles.profileLabel}>Username:</label>
          <br />
          <input
            className={styles.profileInput}
            type="text"
            placeholder="Username"
          />
          <br />
          <label className={styles.profileLabel}>Gender:</label>
          <div className={styles.radiobtn}>
            <div className={styles.gender}>
              <input
                className={styles.profileInputRadio}
                type="radio"
                name="gender"
                value="male"
              />
              <label className={styles.profileLabelRadio}>Male</label>
            </div>
            <div className={styles.gender}>
              <input
                className={styles.profileInputRadio}
                type="radio"
                name="gender"
                value="female"
              />
              <label className={styles.profileLabelRadio}>Female</label>
            </div>
            <div className={styles.gender}>
              <input
                className={styles.profileInputRadio}
                type="radio"
                name="gender"
                value="other"
              />
              <label className={styles.profileLabelRadio}>Other</label>
            </div>
          </div>
          <label className={styles.profileLabel}>Email:</label>
          <br />
          <input
            className={styles.profileInput}
            type="email"
            placeholder="Email"
          />
          <br />
          <label className={styles.profileLabel}>Date of Birth:</label>
          <br />
          <input className={styles.profileInput} type="date" />
          <br />

          <button className={styles.updateBtn}>Update Profile</button>
        </form>
      </div>
    </>
  );
}

export default EditProfileComp;
