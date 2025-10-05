import React, {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import * as jwt_decode from "jwt-decode";
import Header from '../components/Header';
import HeroComponent from "../components/HeroComponent";

const Dashboard = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const { role } = jwt_decode.default(token);
        if (role === "admin") {
          navigate("/admin");
        } else if (role === "user") {
          navigate("/doctor");
        }
      } catch (err) {
        console.error("Invalid token:", err);
        localStorage.removeItem("token");
      }
    }
  }, []);

  return (
    <div>
      <Header/>
      <HeroComponent/>
    </div>
  );
};

export default Dashboard;
