import React, { createContext, useCallback, useState } from "react";
import { loginApi } from "../apis";
import { Navigate } from "react-router-dom";

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
  const [errors, setErrors] = useState();
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
    try {
      const responseFromApi = await loginApi(data);

      if (responseFromApi.message) {
        console.log("no debera ver esto");
        console.log(responseFromApi);

        if (typeof responseFromApi.message == "string") {
          //global error
          setErrors(responseFromApi.message);
          return Promise.reject(responseFromApi.message); // Rechazamos la promesa con los errores
        } else {
          //validation errors
          const sanitizedErrors = responseFromApi.message.reduce(
            (acumulador, cadena) => {
              const palabras = cadena.trim().split(/\s+/);
              const primeraPalabra = palabras[0].toLowerCase();

              if (!acumulador[primeraPalabra]) {
                acumulador[primeraPalabra] = [];
              }

              acumulador[primeraPalabra].push(cadena);

              return acumulador;
            },
            {}
          );

          setErrors(sanitizedErrors);
          return Promise.reject(sanitizedErrors); // Rechazamos la promesa con los errores
        }
      } else {
        setTokens(responseFromApi.token); // Almacena tokens en el contexto
        setUser(responseFromApi.userData); // Almacena tokens en el contexto
        setErrors([]); // Limpiamos errores si la actualización es exitosa
        return Promise.resolve(); // Resolvemos la promesa si no hay errores
      }
    } catch (error) {
      // ... (manejo de errores)
      return Promise.reject(error); // Rechazamos la promesa en caso de error en la petición
    } finally {
      setLoading(false);
    }
  }, []);

  //functions
  const logout = async () => {
    try {
      localStorage.removeItem("tokens");
      localStorage.removeItem("userData");
      setErrors([]);
    } catch (error) {
      // setErrors(error);
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
        errors,
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
