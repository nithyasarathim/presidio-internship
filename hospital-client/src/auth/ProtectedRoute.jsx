import React from "react";
import { Navigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import Error403 from "../error/Error403";

const ProtectedRoute = ({ children, allowedRole = "" }) => {
  const token = localStorage.getItem("token");
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  let role = "";
  try {
    const decoded = jwt_decode(token);
    const {role}=decoded;
  } catch (err) {
    console.error("Invalid token:", err);
    return <Navigate to="/login" replace />;
  }
  if (allowedRole && role !== allowedRole) {
    return <Error403 />;
  }
  return children;
};

export default ProtectedRoute;
