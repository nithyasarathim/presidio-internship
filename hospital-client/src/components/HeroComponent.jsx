import React, { useContext } from "react";
import UserContext from "../context/UserContext";
import HospitalImage from "../assets/Hospital.png";
import { useNavigate } from "react-router";

const HeroComponent = () => {
  const { darkMode } = useContext(UserContext);
  const navigate= useNavigate();

  return (
    <div className={`w-full min-h-fit flex flex-col md:flex-row items-center justify-between px-20 py-15 
      ${darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"}`}>
      
      <div className="flex flex-col gap-6 md:gap-8">
        <h2 className="text-3xl md:text-5xl font-bold">
          Welcome to <span className="text-sky-500">Hospital Management System</span>
        </h2>

        <p className={`text-gray-600  ${darkMode?"text-white":"text-gray-900"}`}>
          Manage patients, manage doctors, and get analytics — all in one place.
        </p>


        <button className="w-max px-6 py-3 bg-sky-500 rounded-lg text-white hover:bg-sky-600 transition" onClick={()=>{navigate('/login')}}>
            Login To Your Account
        </button>
      </div>

      <img src={HospitalImage} alt="Doctors" className="w-fit md:w-fit h-130" />
    </div>
  );
};

export default HeroComponent;
