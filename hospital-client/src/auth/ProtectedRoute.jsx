import React from "react";
import { useNavigate } from "react-router-dom";

const navigate=useNavigate();

const ProtectedRoute = ({children,isAuthenticated,role,allowedRoles}) => {
  if (!isAuthenticated) {
    navigate("/login");
    return
  }
  if (allowedRoles && !allowedRoles.includes(role)) {
    navigate("/unauthorized");
  }

  return children;
};

export default ProtectedRoute;
