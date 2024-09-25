import React, { createContext, useState, useContext, useEffect } from "react";

// Create a context for the login state
const LoginContext = createContext();

export const useLogin = () => useContext(LoginContext);

export const LoginProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem("isLoggedIn") === "true";
  });

  const [username, setUsername] = useState(() => {
    return localStorage.getItem("username") || "";
  });

  const login = (user) => {
    setIsLoggedIn(true);
    setUsername(user);
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("username", user);
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUsername("");
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("username");
  };

  useEffect(() => {
    const storedLoginState = localStorage.getItem("isLoggedIn");
    const storedUsername = localStorage.getItem("username");
    if (storedLoginState === "true" && storedUsername) {
      setIsLoggedIn(true);
      setUsername(storedUsername);
    }
  }, []);

  return (
    <LoginContext.Provider value={{ isLoggedIn, username, login, logout }}>
      {children}
    </LoginContext.Provider>
  );
};
