import React, {useContext, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import UserContext from "../context/UserContext";
import HeroComponent from "../components/HeroComponent";

const Dashboard = () => {
  const {role,token} = useContext(UserContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (token) {
      navigate("/"+role);
      }
    },[role]);
  return (
    <div>
      <HeroComponent/>
    </div>
  );
};

export default Dashboard;
