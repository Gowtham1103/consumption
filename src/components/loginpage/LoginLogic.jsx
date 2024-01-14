import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginPage from "./LoginPage";

const LoginLogic = ({ setIsAuthenticated }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleCheck = (e) => {
    e.preventDefault();
    if (username === "baashyam" && password === "12345") {
      console.log("Login successfully");
      setIsAuthenticated(true);
      sessionStorage.setItem("isAuthenticated", "true");
      navigate("/Page2");
    } else {
      console.log(errorMessage);
      setErrorMessage("*Invalid username or password!");
    }
  };

  return (
    <LoginPage
      setUsername={setUsername}
      setPassword={setPassword}
      handleCheck={handleCheck}
      errorMessage={errorMessage}
    />
  );
};

export default LoginLogic;
