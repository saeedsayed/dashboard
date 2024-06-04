import React from "react";
import { useAuth } from "./context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const { adminUser } = useAuth();
  return <>{adminUser ? <Outlet /> : <Navigate to={"/login"} />}</>;
};

export default ProtectedRoute;
