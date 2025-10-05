import React from "react";
import { Navigate } from "react-router-dom";
import * as jwt_decode from "jwt-decode";
import Error403 from "../error/Error403";

const ProtectedRoute = ({ children,allowedRole}) => {

  const token = localStorage.getItem("token");
  const [role,setRole]=useState("");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  try {
    const decoded = jwt_decode(token);
    setRole(decoded.role);
  } catch (err) {
    console.error("Invalid token:", err);
    return <Navigate to="/login" replace />;
  }

  if (allowedRole && role!==allowedRole) {
    return <Error403 />;
  }

  return children;
};

export default ProtectedRoute;
