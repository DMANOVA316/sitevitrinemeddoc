import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { authService } from "@/services/authService";

const PrivateRoute = () => {
  const user = authService.getUser();

  if (!user) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};

export default PrivateRoute;
