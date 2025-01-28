import { useRef, useState, useEffect } from "react";
import styles from "./EditProfileComp.module.css";
import defaultUserImage from "../../assets/ProfileImg.jpg";

function EditProfileComp() {
  const [profileImgFile, setProfileImgFile] = useState(null);
  const [profileImg, setProfileImg] = useState("");
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const fileInputRef = useRef(null);

  useEffect(() => {
    const loggedInEmail = localStorage.getItem("email");
    const token = localStorage.getItem("token");

    if (!loggedInEmail || !token) {
      alert("No logged-in user found. Please log in.");
      setIsFetching(false);
      return;
    }

    const fetchUserData = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/profile/${loggedInEmail}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }

        const userData = await response.json();

        // Format the date to YYYY-MM-DD if it exists
        const formattedBirthday = userData.birthday
          ? userData.birthday.split("T")[0]
          : "";

        setFullName(userData.full_name || "");
        setUsername(userData.user_name || "");
        setGender(userData.gender || "");
        setEmail(userData.user_email || "");
        setBirthday(formattedBirthday); // Set the formatted date
        setProfileImg(userData.profile_picture_url || ""); // Set the image URL from the server
      } catch (error) {
        console.error(error.message);
        alert("Failed to fetch user data. Please try again.");
      } finally {
        setIsFetching(false);
      }
    };

    fetchUserData();
  }, []);

  const editProfileImg = () => {
    fileInputRef.current.click();
  };

  const changeProfileImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileImgFile(file); // Store the file object
      setProfileImg(imageUrl); // Store the temporary URL
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append("user_name", username);
      formData.append("full_name", fullName);
      formData.append("birthday", birthday); // Ensure the date is in YYYY-MM-DD format
      formData.append("gender", gender);
      if (profileImgFile) {
        formData.append("userImage", profileImgFile); // Append the file for upload
      }
      formData.append("email", email);

      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:5000/profile/${email}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to update profile");
      }

      const data = await response.json();
      console.log("Profile updated successfully:", data);
      alert("Profile updated successfully!");
    } catch (error) {
      console.error(error.message);
      alert(error.message || "Failed to update profile. Please try again.");
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
                ? URL.createObjectURL(profileImgFile) // For newly uploaded images
                : profileImg
                ? `http://localhost:5000${profileImg}` // For images fetched from the server
                : defaultUserImage // Fallback to default image
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
              value="male"
              checked={gender === "male"}
              onChange={(e) => setGender(e.target.value)}
            />
            <label className={styles.profileLabelRadio}>Male</label>
          </div>
          <div className={styles.gender}>
            <input
              className={styles.profileInputRadio}
              type="radio"
              name="gender"
              value="female"
              checked={gender === "female"}
              onChange={(e) => setGender(e.target.value)}
            />
            <label className={styles.profileLabelRadio}>Female</label>
          </div>
          <div className={styles.gender}>
            <input
              className={styles.profileInputRadio}
              type="radio"
              name="gender"
              value="other"
              checked={gender === "other"}
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
