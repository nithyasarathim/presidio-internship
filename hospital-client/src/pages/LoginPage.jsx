import React, { useContext, useState } from "react";
import UserContext from "../context/UserContext";
import DoctorImage from "../assets/Doctors.png";
import { LoginService } from "../services/authService";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import { jwtDecode } from "jwt-decode";

const LoginPage = () => {
  const navigate=useNavigate();
  const {darkMode,setRole,setToken,login} = useContext(UserContext);
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await LoginService({ email, password });
      if (!data.success) {
        toast.error(data.error);
        return;
      }
      const {token}=data;
      const { doctor:{role}} = data;
      localStorage.setItem("token", token);
      login(token);
      setRole(role);
      toast.success("Login successful!");
      if (role === "admin") navigate("/admin");
      else if (role === "doctor") navigate("/doctor");
    } catch (err) {
      console.log(err);
      if (err.error) toast.error(err.error);
      else toast.error("Login failed. Please try again.");
    }
  };
  

  return (
    <div
      className={`flex flex-col md:flex-row px-20 ${
        darkMode ? "bg-gray-900 text-white":"bg-white text-gray-900"
      }`}
    >
      <div className="flex-1 flex flex-col justify-center items-center ">
        <div className="w-full max-w-md">
          <h2 className="text-3xl font-bold mb-10 text-center">Login to your Account</h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`px-4 py-3 rounded-lg border outline-none w-full ${
                darkMode
                  ? "bg-gray-800 border-gray-700 text-white"
                  : "bg-gray-50 border-gray-300 text-gray-900"
              }`}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`px-4 py-3 rounded-lg border outline-none w-full ${
                darkMode
                  ? "bg-gray-800 border-gray-700 text-white"
                  : "bg-gray-50 border-gray-300 text-gray-900"
              }`}
              required
            />
            <button
              type="submit"
              className="w-full py-3 bg-sky-500 rounded-lg text-white hover:bg-sky-600 transition font-semibold"
            >
              Login
            </button>
          </form>
        </div>
      </div>

      <div className="flex-1 hidden md:flex items-center justify-center">
        <img
          src={DoctorImage}
          alt="Doctors"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default LoginPage;
