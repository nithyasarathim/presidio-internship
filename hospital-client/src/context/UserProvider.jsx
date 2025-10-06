import React, { useState, useEffect } from "react";
import UserContext from "./UserContext";
import * as jwt_decode from "jwt-decode";

const UserProvider = ({ children }) => {
  const [role, setRole]=useState("");
  const [token, setToken]=useState(localStorage.getItem("token")||"");
  const [darkMode,setDarkMode] = useState(false);

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
      try {
        const decoded = jwt_decode.default(token);
        setRole(decoded.role||"");
      } catch {
        console.error("Invalid token");
        setRole("");
        localStorage.removeItem("token");
      }
    } else {
      setRole("");
      localStorage.removeItem("token");
    }
  }, [token]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const login = (newToken) => {
    setToken(newToken);
  };

  const logout = () => {
    setToken("");
    setRole("");
  };

  return (
    <UserContext.Provider
      value={{role,token,darkMode,toggleDarkMode,login,logout,setRole,setToken}}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
