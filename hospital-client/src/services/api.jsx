import axios from "axios";
import { useContext } from "react";
import UserContext from "../context/UserContext";

const baseURL=import.meta.env.VITE_BASE_URL;

const useApi=()=>{
  const {token}=useContext(UserContext); 
  const api=axios.create({
    baseURL,
    headers: {
      Authorization: token ? `Bearer ${token}`:""
    },
  });
  return api;
};

export default useApi;
