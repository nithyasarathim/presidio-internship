import React, { useContext } from "react";
import { Moon, Sun } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import UserContext from "../context/UserContext";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { role, darkMode, toggleDarkMode, logout } = useContext(UserContext);

  return (
    <div className={`w-full px-15 py-5 flex justify-between items-center ${darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"}`}>
      <h1 className="font-bold text-2xl">Hospital Management System</h1>
      <div className="flex items-center gap-4">
        {role === "admin" && (
          <>
            <button onClick={() => navigate("/doctors")} className={`px-3 py-1 rounded ${darkMode ? "hover:bg-gray-700" : "hover:bg-gray-50"}`}>Doctors</button>
            <button onClick={() => navigate("/analytics")} className={`px-3 py-1 rounded ${darkMode ? "hover:bg-gray-700" : "hover:bg-gray-50"}`}>Analytics</button>
          </>
        )}
        {role && (
          <>
            <button onClick={() => navigate("/profile")} className={`px-3 py-1 rounded ${darkMode ? "hover:bg-gray-700" : "hover:bg-gray-50"}`}>Profile</button>
            <button onClick={logout} className={`px-3 py-1 rounded ${darkMode ? "hover:bg-gray-700" : "hover:bg-gray-50"}`}>Logout</button>
          </>
        )}
        <button
          onClick={toggleDarkMode}
          className={`flex items-center p-2 rounded-full ${darkMode ? "hover:bg-gray-700" : "hover:bg-gray-50"}`}
        >
          {darkMode ? <Sun /> : <Moon />}
        </button>
        {!role && location.pathname === "/" && (
          <button onClick={() => navigate("/login")} className="px-4 py-2 bg-sky-500 rounded-lg text-white">Login</button>
        )}
      </div>
    </div>
  );
};

export default Header;
