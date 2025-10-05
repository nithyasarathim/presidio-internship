import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import Error403 from "../error/Error403";
import UserContext from "../context/UserContext"

const ProtectedRoute=({children,allowedRole})=>{
  const { role, token }=useContext(UserContext);

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRole && role!==allowedRole) {
    return <Error403 />;
  }

  return children;
};

export default ProtectedRoute;
