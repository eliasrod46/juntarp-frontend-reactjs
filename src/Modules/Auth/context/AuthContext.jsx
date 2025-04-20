import React, { createContext, useCallback, useState } from "react";
import { loginApi } from "../apis";
import { Navigate } from "react-router-dom";
import { envs } from "@/config";
import { generalErrorsHandler } from "@/config/generalErrorsHandler";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // states
  const [authTokens, setAuthTokens] = useState(() => {
    const storedToken = localStorage.getItem("tokens");
    try {
      // Intentar parsear por si acaso alguna vez se guardó como JSON
      return JSON.parse(storedToken) || null;
    } catch (e) {
      // Si no es un JSON válido, devolverlo tal cual (debería ser la cadena del token)
      return storedToken || null;
    }
  });
  const [authUser, setAuthUser] = useState(() => {
    const storedToken = localStorage.getItem("userData");
    try {
      // Intentar parsear por si acaso alguna vez se guardó como JSON
      return JSON.parse(storedToken) || null;
    } catch (e) {
      // Si no es un JSON válido, devolverlo tal cual (debería ser la cadena del token)
      return storedToken || null;
    }
  });
  const [generalError, setGeneralError] = useState();
  const [validationErrors, setValidationErrors] = useState();
  const [loading, setLoading] = useState();

  // set states
  const setTokens = (data) => {
    localStorage.setItem("tokens", data);
    setAuthTokens(data);
  };

  const setUser = (data) => {
    localStorage.setItem("userData", JSON.stringify(data));
    setAuthUser(data);
  };

  //functions
  const login = useCallback(async (data) => {
    setLoading(true);
    setGeneralError(null);
    setValidationErrors(null);
    try {
      const responseFromApi = await loginApi(data);

      if (responseFromApi.token) {
        setTokens(responseFromApi.token);
        setUser(responseFromApi.userData);
        return Promise.resolve();
      }
    } catch (catchError) {
      await generalErrorsHandler(
        catchError,
        setGeneralError,
        setValidationErrors
      );
    } finally {
      setLoading(false);
    }
  }, []);

  //functions
  const logout = async () => {
    try {
      localStorage.removeItem("tokens");
      localStorage.removeItem("userData");
      setGeneralError();
    } catch (error) {
      // setGeneralError(error);
    } finally {
      setLoading(false);
    }
  };

  const can = async (permissions_request = []) => {
    const authorization = [
      ...authUser.auth.roles,
      ...authUser.auth.permissions,
    ];

    if (permissions_request.length >= 1) {
      for (const permision of permissions_request) {
        if (authorization.includes(permision)) {
          return true;
        }
      }
      return false;
    } else {
      return false;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        can,
        generalError,
        validationErrors,
        login,
        logout,
        loading,
        authTokens,
        authUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
