import React, { useContext } from "react";
import UserContext from "../context/UserContext";
import HospitalImage from "../assets/Hospital.png";
import { useNavigate } from "react-router";

const HeroComponent = () => {
  const { darkMode } = useContext(UserContext);
  const navigate = useNavigate();

  return (
    <div className={`w-full flex flex-col-reverse md:flex-row items-center justify-between px-6 sm:px-10 md:px-20 py-10 sm:py-15 
      ${darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"}`}>
      
      <div className="flex flex-col gap-4 sm:gap-6 md:gap-8 text-center md:text-left">
        <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold">
          Welcome to <span className="text-sky-500 text-2xl sm:text-3xl md:text-5xl">Hospital Management System</span>
        </h2>

        <p className={`text-sm sm:text-base md:text-lg ${darkMode ? "text-white" : "text-gray-900"}`}>
          Manage patients, manage doctors, and get analytics — all in one place.
        </p>

        <button 
          className="w-max px-4 sm:px-6 py-2 sm:py-3 bg-sky-500 rounded-lg text-white hover:bg-sky-600 transition"
          onClick={() => navigate('/login')}
        >
          Login To Your Account
        </button>
      </div>

      <img 
        src={HospitalImage} 
        alt="Doctors" 
        className="w-full sm:w-96 md:w-[500px] h-auto mb-6 md:mb-0"
      />
    </div>
  );
};

export default HeroComponent;
