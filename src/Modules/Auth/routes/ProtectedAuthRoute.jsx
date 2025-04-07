import React, { useContext, useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom"; // Importa Navigate y Outlet
import AuthContext from "../context/AuthContext";

export function ProtectedAuthRoute({ children }) {
  const { authTokens } = useContext(AuthContext);

  if (!authTokens) {
    return <Navigate to="/auth/login" replace />;
  }

  return children || <Outlet />;
}
