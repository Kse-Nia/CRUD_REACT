import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
import "../Navbar/Navbar.css";
import Button from "@mui/material/Button";
import LogoutIcon from "@mui/icons-material/Logout";
import Logo from "../../Assets/icon.svg";

const Navbar = () => {
  const navigate = useNavigate;

  function clearStorage() {
    window.localStorage.clear();
    window.location.reload();
    navigate("/");
  }

  return (
    <header className="header">
      <div className="nav">
        <input type="checkbox" id="nav-check" />
        <div className="nav-header">
          <img src={Logo} alt="Groupomania" className="logo" />
        </div>
        <div className="nav-btn">
          <label htmlFor="nav-check">
            <span></span>
            <span></span>
            <span></span>
          </label>
        </div>

        <div className="nav-links">
          <a href="/dashboard">Home</a>
          <a href="/members">Membres</a>
          <a href="/profile">Mon Compte</a>
          <a href="/posts">Créer un nouveau post</a>
          <Button
            onClick={clearStorage}
            variant="contained"
            startIcon={<LogoutIcon />}
            aria-label="se déconnecter"
          >
            LogOut
          </Button>
        </div>
      </div>
    </header>
  );
};
export default Navbar;
