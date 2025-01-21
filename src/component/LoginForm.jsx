import { useState } from "react";
import "./login.css";
import { Link, useNavigate } from "react-router-dom";

function LoginForm({ setAuth }) {
  const navigate = useNavigate();
  // const handleSubmit = (e) => {
  //     e.preventDefault();
  //     navigate("/moodTracker");
  // }

  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  const { email, password } = inputs;

  const onChange = (e) =>
    setInputs({ ...inputs, [e.target.name]: e.target.value });

  const onSubmitFrom = async (e) => {
    e.preventDefault();
    try {
      const body = { email, password };
      const response = await fetch("http://localhost:5000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const parseRes = await response.json();

      if (parseRes.token) {
        localStorage.setItem("token", parseRes.token);
        setAuth(true);
        navigate("/dashboard");
      } else {
        setAuth(false);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <>
      <div className="main">
        <section>
          <img className="logoSection" src="./src/assets/logo.png" alt="logo" />
          <h3>Nice to see you again</h3>
          <form onSubmit={onSubmitFrom}>
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
    </>
  );
}

export default LoginForm;
