import React, { useState } from "react";
import Register from "./Register";
import Login from "./Login";

// CSS
import "../../Style/style.css";
import Container from "@mui/material/Container";
import { Card } from "@mui/material";

const LogModal = (props) => {
  // Hooks
  const [registerModal, setRegisterModal] = useState(true); // lui passer en prop une info
  const [loginModal, setLoginModal] = useState(false); // lui passer en prop une info

  const handleModal = (e) => {
    if (e.target.id === "register") {
      setRegisterModal(true);
      setLoginModal(false);
    } else if (e.target.id === "login") {
      setLoginModal(true);
      setRegisterModal(false);
    }
  };

  return (
    <Container>
      <Card sx={{ mx: "2px" }} className="formContainer">
        <ul>
          <li
            id="register"
            onClick={handleModal}
            className={registerModal ? "active-btn" : null}
          >
            S'inscrire
          </li>
          <li
            id="login"
            onClick={handleModal}
            className={loginModal ? "active-btn" : null}
          >
            Se connecter
          </li>
        </ul>
        {registerModal && <Register />}
        {loginModal && <Login />}
      </Card>
    </Container>
  );
};

export default LogModal;
