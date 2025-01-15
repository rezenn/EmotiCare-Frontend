import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Landing from "./page/Landing";
import Login from "./page/LoginPage";
import RegisterPage from "./page/RegisterPage";
import ForgotPasswordPage from "./page/ForgotPasswordPage";
import MoodTracker from "./page/MoodTrackerPage";
import Settings from "./page/Settings";

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(() => {
        return !!localStorage.getItem("token"); // Check if token exists on initialization
    });

    const setAuth = (boolean) => {
        setIsAuthenticated(boolean);
        if (!boolean) localStorage.removeItem("token"); // Clear token on logout
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
                    path="/moodTracker"
                    element={
                        isAuthenticated ? <MoodTracker /> : <Navigate to="/login" />
                    }
                />
                <Route
                    path="/settings"
                    element={
                        isAuthenticated ? <Settings setAuth={setAuth} /> : <Navigate to="/login" />
                    }
                />
            </Routes>
        </Router>
    );
}

export default App;
