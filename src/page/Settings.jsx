import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../component/Navbar/Navbar";
import Footer2 from "../component/Footer/Footer2";
import style from "./settings.module.css";
import logoutIcon from "../assets/logout.svg";
import { toast } from "react-toastify";

function Settings({ setAuth }) {
  const navigate = useNavigate();

  const logout = async (e) => {
    e.preventDefault();
    try {
      localStorage.removeItem("token");
      localStorage.removeItem("email");
      setAuth(false);
      toast.success("Logout successful!");
      navigate("/login");
    } catch (err) {
      console.error(err.message);
      toast.error("Logout failed!");
    }
  };

  return (
    <>
      <Navbar activePage="settings" setActivePage={() => {}} />
      <div className={style.container}>
        <h2 className={style.title}>Settings</h2>

        <button onClick={logout} className={style.logoutButton}>
          <img src={logoutIcon} alt="logout" className={style.logoutIcon} />
          Logout
        </button>
      </div>
      <Footer2 />
    </>
  );
}

export default Settings;
