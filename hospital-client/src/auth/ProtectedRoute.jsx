import React from "react";
import Error403 from "../components/Error403";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({children,isAuthenticated,role,allowedRoles}) => {
  if (!isAuthenticated) {
    return <Navigate to="/login" replace/>
  }
  if (!allowedRoles.includes(role)) {
    return <Error403/>
  }
  return children;
};

export default ProtectedRoute;
