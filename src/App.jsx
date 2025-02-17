import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useEffect, useState } from "react";
import Landing from "./page/Landing";
import Login from "./page/LoginPage";
import RegisterPage from "./page/RegisterPage";
import ForgotPasswordPage from "./page/ForgotPasswordPage";
import MoodTracker from "./page/MoodTrackerPage";
import Settings from "./page/Settings";
import Dashboard from "./page/Dashboard";
import DailyChallenge from "./page/DailyChallenge";
import Profile from "./page/Profile";
import EditProfile from "./page/EditProfile";
import Journal from "./page/JournalPage";
import JournalAdd from "./page/JournalAdd";
import Resources from "./page/Resources";
import Features from "./page/Features";
function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return !!localStorage.getItem("token");
  });

  const setAuth = (boolean) => {
    setIsAuthenticated(boolean);
    if (!boolean) localStorage.removeItem("token");
  };

  async function isAuth() {
    try {
      const response = await fetch("http://localhost:5000/auth/verified", {
        method: "GET",
        headers: { token: localStorage.token },
      });

      const parseRes = await response.json();

      if (parseRes === true) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
        localStorage.removeItem("token");
      }
    } catch (error) {
      console.error(error.message);
      setIsAuthenticated(false);
    }
  }

  useEffect(() => {
    if (localStorage.getItem("token")) {
      isAuth();
    }
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login setAuth={setAuth} />} />
        <Route path="/register" element={<RegisterPage setAuth={setAuth} />} />
        <Route path="/forgotPassword" element={<ForgotPasswordPage />} />
        <Route
          path="/dashboard"
          element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />}
        />
        <Route
          path="/moodTracker"
          element={isAuthenticated ? <MoodTracker /> : <Navigate to="/login" />}
        />
        <Route
          path="/dailyChallenge"
          element={
            isAuthenticated ? <DailyChallenge /> : <Navigate to="/login" />
          }
        />
        <Route
          path="/journal"
          element={isAuthenticated ? <Journal /> : <Navigate to="/login" />}
        />
        <Route path="/resources" element={<Resources />} />
        <Route path="/features" element={<Features />} />
        <Route
          path="/profile"
          element={
            isAuthenticated ? (
              <Profile setAuth={setAuth} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/editProfile"
          element={
            isAuthenticated ? (
              <EditProfile setAuth={setAuth} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/settings"
          element={
            isAuthenticated ? (
              <Settings setAuth={setAuth} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/addJournal"
          element={
            isAuthenticated ? (
              <JournalAdd setAuth={setAuth} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
