import { Navigate } from "react-router-dom";
import { IndexLogin } from "../pages";
import AuthContext from "../context/AuthContext";
import { useContext } from "react";

export const LoginMiddleware = () => {
  const { authTokens } = useContext(AuthContext);

  if (authTokens) {
    return <Navigate to="/inicio" replace />;
  }

  return <IndexLogin />;
};
