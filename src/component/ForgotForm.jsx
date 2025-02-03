import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "../axios/axios"; // Import Axios instance
import "./login.css";

function ForgotForm({ setAuth }) {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { email, password, confirmPassword } = inputs;

  const onChange = (e) =>
    setInputs({ ...inputs, [e.target.name]: e.target.value });

  const onSubmitForm = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post("/auth/forgotPassword", {
        email,
        newPassword: password,
      });

      alert("Password reset successful!");
      navigate("/login");
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
    }
  };

  return (
    <div className="main">
      <section>
        <img
          className="logoSection"
          src="./src/assets/logoImage.png"
          alt="logo"
        />
        <h3>Reset Your Password</h3>
        <form onSubmit={onSubmitForm}>
          <label>Email</label>
          <br />
          <input
            type="email"
            placeholder="Enter email"
            name="email"
            value={email}
            onChange={onChange}
            required
          />
          <br />
          <label>Password</label>
          <br />
          <input
            type="password"
            placeholder="Enter new password"
            name="password"
            value={password}
            onChange={onChange}
            required
          />
          <br />
          <label>Confirm Password</label>
          <br />
          <input
            type="password"
            placeholder="Re-enter new password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={onChange}
            required
          />
          <br />
          <button className="signinButton">Reset Password</button>
        </form>
        <hr className="line" />
        <div className="linkPage">
          <span>
            Password changed?
            <Link className="link" to="/login">
              Login
            </Link>
          </span>
        </div>
      </section>
    </div>
  );
}

export default ForgotForm;
