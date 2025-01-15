import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../component/Navbar/Navbar";
import style from "./settings.module.css"
import logoutIcon from "../assets/logout.svg"; 

function Settings ({setAuth}){
    const navigate = useNavigate();

    // const logout = async e => {
    //     e.preventDefault();
    //     try {
    //         localStorage.removeItem("token");
    //         setAuth(false);
    //         navigate("/login");
            
    //     } catch (error) {
    //         console.error(error.message);
    //     }
        
    // }
    
const logout = async e => {
    e.preventDefault();
    try {
      localStorage.removeItem("token");
      setAuth(false);
      toast.success("Logout successfully");
    } catch (err) {
      console.error(err.message);
    }
  };

    return(
        <>
        <Navbar className={style.Navbar} activePage="settings" setActivePage={() => {}} />
        <div className={style.container}>
            <button onClick={logout} className={style.logoutButton}>
                <img src={logoutIcon} alt="logout" className="logout"/>
                Logout
            </button>
        </div>
        </>
    )
}

export default Settings;