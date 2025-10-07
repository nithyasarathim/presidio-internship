import React,{useContext} from "react";
import {Moon,Sun} from "lucide-react";
import {useNavigate,useLocation} from "react-router-dom";
import UserContext from "../context/UserContext";

const Header=()=>{
  const navigate=useNavigate();
  const location=useLocation();
  const {role,darkMode,toggleDarkMode,logout}=useContext(UserContext);

  return(
    <div className={`w-full px-6 sm:px-10 md:px-15 py-4 md:py-5 flex flex-row  justify-between items-center gap-3 sm:gap-0 ${darkMode?"bg-gray-900 text-white":"bg-white text-gray-900"}`}>
      <h1 className="font-bold text-xl sm:text-2xl text-center sm:text-left">
        <span className="sm:hidden">HMS</span>
        <span className="hidden sm:inline">Hospital Management System</span>
      </h1>
      <div className="flex items-center gap-3 sm:gap-4">
        {role&&(
          <button onClick={logout} className={`px-3 py-1 rounded text-sm sm:text-base ${darkMode?"hover:bg-gray-700":"hover:bg-gray-50"}`}>Logout</button>
        )}
        <button onClick={toggleDarkMode} className={`flex items-center p-2 rounded-full ${darkMode?"hover:bg-gray-700":"hover:bg-gray-50"}`}>
          {darkMode?<Sun/>:<Moon/>}
        </button>
        {!role&&location.pathname==="/"&&(
          <button onClick={()=>navigate("/login")} className="px-3 sm:px-4 py-2 bg-sky-500 rounded-lg text-white text-sm sm:text-base">Login</button>
        )}
      </div>
    </div>
  );
};

export default Header;
