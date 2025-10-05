import React from "react";
import Error403 from "../components/Error403";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({children,isAuthenticated,role,allowedRoles}) => {
  const navigate=useNavigate();
  if (!isAuthenticated) {
    navigate("/login");
  }
  if (allowedRoles && !allowedRoles.includes(role)) {
    return <Error403/>
  }

  return children;
};

export default ProtectedRoute;
