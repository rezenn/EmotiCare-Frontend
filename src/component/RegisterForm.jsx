import { Link } from "react-router-dom";

import "./login.css";
import { useState } from "react";

function RegisterForm({ setAuth }) {
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = inputs;
  const onChange = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmitFrom = async (e) => {
    e.preventDefault();
    try {
      const body = { name, email, password };
      const response = await fetch("http://localhost:5000/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      // Check if the response is ok (status 2xx)
      if (response.ok) {
        const parseRes = await response.json();
        if (parseRes.token) {
          localStorage.setItem("token", parseRes.token);
          setAuth(true);
          alert("Registration successful!");
        } else {
          console.error("Missing token.");
        }
      } else {
        const errorResponse = await response.text(); // get the response as text in case it's not JSON
        console.error("Server error:", errorResponse);
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  return (
    <>
      <div className="main">
        <section>
          <img
            className="logoSection"
            src="./src/assets/logoImage.png"
            alt="logo"
          />
          <h3>Welcome, Let's create an account</h3>
          <form onSubmit={onSubmitFrom}>
            <label id="Username">Username</label>
            <br />
            <input
              type="text"
              placeholder="Username"
              name="name"
              value={name}
              onChange={(e) => onChange(e)}
              required
            />
            <br />
            <label id="Login">Email</label>
            <br />
            <input
              type="email"
              placeholder="Email Address"
              name="email"
              value={email}
              onChange={(e) => onChange(e)}
              required
            />
            <br />
            <label id="Password">Password</label>
            <br />
            <input
              type="password"
              placeholder="Enter password"
              name="password"
              value={password}
              onChange={(e) => onChange(e)}
              required
            />
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
    </>
  );
}

export default RegisterForm;
