import React,{useState} from "react";
import { Navigate } from "react-router-dom";
import * as jwt_decode from "jwt-decode";
import Error403 from "../error/Error403";

const ProtectedRoute = ({ children,allowedRole}) => {

  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  try {
    const decoded = jwt_decode.default(token);
    const {role}=decoded;
    if (allowedRole && role!==allowedRole) {
      return <Error403 />;
    }
  } catch (err) {
    console.error("Invalid token:", err);
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
