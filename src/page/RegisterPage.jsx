import Header from "../component/Navbar/Header";
import Footer from "../component/Footer/Footer";
import RegisterForm from "../component/RegisterForm";
function RegisterPage({ setAuth }) {
  return (
    <>
      <Header />
      <RegisterForm setAuth={setAuth} />
      <Footer />
    </>
  );
}

export default RegisterPage;
