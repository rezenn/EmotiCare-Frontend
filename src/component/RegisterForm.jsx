import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import axios from "../axios/axios";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "./login.css";

function RegisterForm({ setAuth }) {
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { name, email, password } = inputs;

  const onChange = (e) =>
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/auth/register", {
        name,
        email,
        password,
      });

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        setAuth(true);
        alert("Registration successful!");
      } else {
        console.error("Missing token.");
      }
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
        <h3>Welcome, Let's create an account</h3>
        <form onSubmit={onSubmitForm}>
          <label htmlFor="Username">Username</label>
          <br />
          <input
            id="Username"
            type="text"
            placeholder="Username"
            name="name"
            value={name}
            onChange={onChange}
            required
          />
          <br />
          <label htmlFor="email">Email</label>
          <br />
          <input
            id="email"
            type="email"
            placeholder="Email Address"
            name="email"
            value={email}
            onChange={onChange}
            required
          />
          <br />
          <label htmlFor="Password">Password</label>
          <br />
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="Enter password"
            name="password"
            value={password}
            onChange={onChange}
            required
          />

          <button
            type="button"
            className="togglePassword2"
            onClick={() => setShowPassword(!showPassword)}
            aria-label="Toggle password visibility" // Add this line
          >
            {showPassword ? (
              <FaEyeSlash className="eyeIcon" />
            ) : (
              <FaEye className="eyeIcon" />
            )}
          </button>
          <br />
          <button className="signinButton">Register</button>
        </form>
        <hr className="line" />
        <div className="linkPage">
          <span>
            Already have an account?
            <Link className="link" to="/login">
              Login
            </Link>
          </span>
        </div>
      </section>
    </div>
  );
}

export default RegisterForm;
