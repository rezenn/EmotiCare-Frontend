import { Link, useNavigate } from "react-router-dom";
import "./login.css";
import { useState } from "react";

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
      alert("Password does not match");
      return;
    }
    try {
      const body = { email, newPassword: password };
      const response = await fetch(
        "http://localhost:5000/auth/forgotPassword",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const parseRes = await response.json();
      alert("Password reset successful!");
      navigate("/login");
    } catch (error) {
      console.error(error.message);
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
          <form onSubmit={onSubmitForm}>
            <label id="email">Email</label>
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
            <label id="password">Password</label>
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
            <label id="confirmPassword">Confirm Password</label>
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
              Account password changed?
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

export default ForgotForm;
