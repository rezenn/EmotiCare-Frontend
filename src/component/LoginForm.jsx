import React, { useState, useEffect } from "react";
import axios from "../axios/axios";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa6";
import "./login.css";
import { Link, useNavigate } from "react-router-dom";

function LoginForm({ setAuth }) {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const { email, password } = inputs;

  const onChange = (e) =>
    setInputs({ ...inputs, [e.target.name]: e.target.value });

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/auth/login", {
        email,
        password,
      });

      const parseRes = response.data;

      if (parseRes.token) {
        localStorage.setItem("token", parseRes.token);
        localStorage.setItem("email", email);
        setAuth(true);
        alert("Login successful!");
        navigate("/dashboard");
      } else {
        setAuth(false);
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
        <h3>Nice to see you again</h3>
        <form onSubmit={onSubmitForm}>
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
          <label htmlFor="password">Password</label>
          <br />
          <div className="passwordContainer">
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
              className="togglePassword"
              onClick={() => setShowPassword(!showPassword)}
              aria-label="Toggle password visibility" // Add this line
            >
              {showPassword ? (
                <FaEyeSlash className="eyeIcon" />
              ) : (
                <FaEye className="eyeIcon" />
              )}
            </button>
          </div>
          <br />
          <Link className="forgotPassword" to="/forgotPassword">
            Forgot password?
          </Link>
          <br />
          <button className="signinButton" type="submit">
            Sign in
          </button>
        </form>
        <hr className="line" />
        <div className="linkPage">
          <span>
            Don't have an account?
            <Link className="link" to="/register">
              Sign up now
            </Link>
          </span>
        </div>
      </section>
    </div>
  );
}

export default LoginForm;
