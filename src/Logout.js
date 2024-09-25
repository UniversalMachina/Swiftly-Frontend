import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLogin } from "./LoginContext";

const Logout = () => {
  const { logout } = useLogin();
  const navigate = useNavigate();

  useEffect(() => {
    // Call the logout function and redirect to the login page
    logout();
    navigate("/expert-signup");
  }, [logout, navigate]);

  return (
    <div>
      <h1>Logging out...</h1>
    </div>
  );
};

export default Logout;
