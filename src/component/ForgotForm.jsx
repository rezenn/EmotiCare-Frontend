import { Link } from "react-router-dom";
import "./login.css";

function ForgotForm() {
  return (
    <>
      <div className="main">
        <section>
          <img className="logoSection" src="./src/assets/logo.png" alt="logo" />
          <h3>Welcome, Let's create an account</h3>
          <form action="submit">
            <label id="Login">Email</label>
            <br />
            <input type="email" placeholder="Email Address" required />
            <br />
            <label id="Password">Password</label>
            <br />
            <input type="password" placeholder="Enter password" required />
            <br />
            <label id="confirmPassword">Confirm Password</label>
            <br />
            <input type="password" placeholder="Re-enter password" required />
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
      {/*  */}
    </>
  );
}

export default ForgotForm;
