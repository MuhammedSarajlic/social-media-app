import React from "react";
import LoginButton from "./LoginButton";

const WelcomePage = ({ isAuthentificated, setIsAuthentificated }) => {
  return (
    <>
      <p>Welcome on our Social Media App</p>
      <LoginButton auth={isAuthentificated} setAuth={setIsAuthentificated} />
    </>
  );
};

export default WelcomePage;
