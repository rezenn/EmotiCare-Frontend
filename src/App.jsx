import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Landing from "./page/Landing.jsx";
import Login from "./page/LoginPage.jsx";
import RegisterPage from "./page/RegisterPage.jsx";
import ForgotPasswordPage from "./page/forgotPasswordPage.jsx";
import MoodTracker from "./page/MoodTrackerPage.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} /> 
        <Route path="/login" element={<Login />} /> 
        <Route path="/register" element={<RegisterPage />} /> 
        <Route path="/forgotPassword" element={<ForgotPasswordPage />} /> 
        <Route path="/moodTracker" element={<MoodTracker />} /> 
      </Routes>
    </Router>

    // <MoodTracker/>
  );
}

export default App;
