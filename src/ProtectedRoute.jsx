import React from "react";
import { useAuth } from "./context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";
import { FullScreenLoading } from "./components";

const ProtectedRoute = () => {
  const { adminUser, authLoading } = useAuth();
  if (authLoading) {
    return ;
  }
  return <>{adminUser ? <Outlet /> : <Navigate to={"/login"} />}</>;
};

export default ProtectedRoute;
