import Header from "../component/Navbar/Header";
import LoginForm from "../component/LoginForm";
import Footer from "../component/Footer/Footer";

function Login({ setAuth }) {
  return (
    <>
      <Header />
      <LoginForm setAuth={setAuth} />
      <Footer />
    </>
  );
}

export default Login;
