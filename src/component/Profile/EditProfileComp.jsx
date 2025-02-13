import { useRef, useState, useEffect } from "react";
import styles from "./EditProfileComp.module.css";
import axios from "../../axios/axios";
import defaultUserImage from "../../assets/ProfileImg.jpg";
import { useNavigate } from "react-router-dom";

function EditProfileComp() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [profileImgFile, setProfileImgFile] = useState(null);
  const [profileImg, setProfileImg] = useState("");
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    const loggedInEmail = localStorage.getItem("email");
    const token = localStorage.getItem("token");

    if (!loggedInEmail || !token) {
      alert("No logged-in user found. Please log in.");
      setIsFetching(false);
      return;
    }

    axios
      .get(`/profile/${loggedInEmail}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const userData = response.data;
        setFullName(userData.full_name || "");
        setUsername(userData.user_name || "");
        setGender(userData.gender || "");
        setEmail(userData.user_email || "");
        setBirthday(userData.birthday?.split("T")[0] || "");
        setProfileImg(userData.profile_picture_url || ""); // Ensure existing image is retained
      })
      .catch((error) => {
        console.error(error);
        alert("Failed to fetch user data.");
      })
      .finally(() => {
        setIsFetching(false);
      });
  }, []);

  const editProfileImg = () => {
    fileInputRef.current.click();
  };

  const changeProfileImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileImgFile(file);
      setProfileImg(imageUrl); // Set the selected image to profileImg
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append("user_name", username);
      formData.append("full_name", fullName);
      formData.append("birthday", birthday);
      formData.append("gender", gender);

      if (profileImgFile) {
        formData.append("userImage", profileImgFile);
      } else {
        formData.append("profile_picture_url", profileImg); // Preserve existing image if no new image is selected
      }

      formData.append("email", email);

      const token = localStorage.getItem("token");
      await axios.put(`/profile/${email}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Profile updated successfully!");
      navigate("/profile");
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.error || "Failed to update profile.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isFetching) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <form className={styles.profile} onSubmit={handleSubmit}>
        <div className={styles.profileContainer}>
          <img
            className={styles.profileImg}
            src={
              profileImgFile
                ? URL.createObjectURL(profileImgFile) // Display the new image if selected
                : profileImg
                ? profileImg.startsWith("http")
                  ? profileImg
                  : `http://localhost:5000${profileImg}` // If profileImg is available, use it
                : defaultUserImage // Use default image if no profileImg is found
            }
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
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />
        <br />
        <label className={styles.profileLabel}>Username:</label>
        <br />
        <input
          className={styles.profileInput}
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <br />
        <label className={styles.profileLabel}>Gender:</label>
        <div className={styles.radiobtn}>
          <div className={styles.gender}>
            <input
              className={styles.profileInputRadio}
              type="radio"
              name="gender"
              value="Male"
              checked={gender === "Male"}
              onChange={(e) => setGender(e.target.value)}
            />
            <label className={styles.profileLabelRadio}>Male</label>
          </div>
          <div className={styles.gender}>
            <input
              className={styles.profileInputRadio}
              type="radio"
              name="gender"
              value="Female"
              checked={gender === "Female"}
              onChange={(e) => setGender(e.target.value)}
            />
            <label className={styles.profileLabelRadio}>Female</label>
          </div>
          <div className={styles.gender}>
            <input
              className={styles.profileInputRadio}
              type="radio"
              name="gender"
              value="Other"
              checked={gender === "Other"}
              onChange={(e) => setGender(e.target.value)}
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
          value={email}
          readOnly
        />
        <br />
        <label className={styles.profileLabel}>Date of Birth:</label>
        <br />
        <input
          className={styles.profileInput}
          type="date"
          value={birthday}
          onChange={(e) => setBirthday(e.target.value)}
        />
        <br />
        <button className={styles.updateBtn} type="submit" disabled={isLoading}>
          {isLoading ? "Updating..." : "Update Profile"}
        </button>
      </form>
    </div>
  );
}

export default EditProfileComp;
