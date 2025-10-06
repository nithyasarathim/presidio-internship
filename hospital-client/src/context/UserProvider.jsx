import React, { useState, useEffect } from "react";
import UserContext from "./UserContext";
import jwt_decode from "jwt-decode";
import toast from 'react-hot-toast';

const UserProvider = ({ children }) => {
  const [role, setRole]=useState("");
  const [token, setToken]=useState(localStorage.getItem("token")||"");
  const [darkMode,setDarkMode] = useState(false);
  const [name,setName]=useState("");
  const [email,setEmail]=useState("");

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
      try {
        const decoded = jwt_decode(token);
        setRole(decoded.role||"");
        setName(decoded.name||"");
        setEmail(decoded.email||"");
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
    toast.success("Logout successful !");
    setToken("");
    setRole("");
  };

  return (
    <UserContext.Provider
      value={{role,token,darkMode,toggleDarkMode,login,logout,setRole,setToken,name,email}}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
