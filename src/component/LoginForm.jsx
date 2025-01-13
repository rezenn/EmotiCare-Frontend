import './login.css';
import { Link,useNavigate   } from "react-router-dom";


function LoginForm(){
    const navigate = useNavigate(); 
    const handleSubmit = (e) => {
        e.preventDefault();
        navigate("/moodTracker");
    }
    return(
        <>
            <div className="main">
                <section>
                    <img className='logoSection' src="./src/assets/logo.png" alt="logo" />
                    <h3>Nice to see you again</h3>
                    <form onSubmit={handleSubmit}>
                        <label id="Login">Email</label>
                        <br />
                        <input type="email" placeholder="Email Address" required />
                        <br /> 
                        <label id="Password">Password</label>
                        <br />
                        <input type="password" placeholder="Enter password" required /> 
                        <br />
                        <Link 
                        className='forgotPassword' to="/forgotPassword" >Forgot password?</Link>
                        <br />
                        <button className='signinButton' type="submit" >Sign in</button>
                    </form>
                    <hr className='line'/>
                    <div className="linkPage">
                        <span>Don't have an account?
                            <Link className='link' to="/register">Sign up now
                            </Link>
                        </span>
                    </div>
                </section>
            </div>
        </>
    )
}

export default LoginForm;