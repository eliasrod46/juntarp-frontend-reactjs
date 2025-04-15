//hook custom
import { useState, useCallback, useEffect } from "react";
import {
  createElementApi,
  deleteElementApi,
  getElementsApi,
  updateElementApi,
  assignRolesApi,
  changePassswordApi,
} from "@/Modules/Users/apis";

export function useUsers() {
  const [elements, setElements] = useState();
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(true);

  const getElements = useCallback(async (authTokens) => {
    // useCallback para evitar re-renderizados innecesarios
    setLoading(true); // Establecer loading a true ANTES de la llamada a la API
    try {
      const responseFromApi = await getElementsApi(authTokens);
      // console.log("Datos de la API:", responseFromApi); // <-- Imprime los datos recibidos de la API
      setElements(responseFromApi || []); // Usar || [] para evitar null o undefined
    } catch (error) {
      // console.error("Error al obtener turnos:", error);
      setErrors({ general: ["Error al cargar los turnos"] }); // Manejo de error
    } finally {
      setLoading(false); // Establecer loading a false DESPUÉS de la llamada a la API
    }
  }, []);

  const updateElement = useCallback(async (authTokens, id, data) => {
    try {
      const responseFromApi = await updateElementApi(authTokens, id, data);

      if (responseFromApi.message) {
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

  const createElement = useCallback(async (authTokens, data) => {
    try {
      const responseFromApi = await createElementApi(authTokens, data);

      if (responseFromApi.message) {
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

  const deleteElement = async (authTokens, id) => {
    try {
      const responseFromApi = await deleteElementApi(authTokens, id);
      // console.log(responseFromApi);
    } catch (error) {
      // ... (manejo de errores)
    } finally {
      setLoading(false);
    }
  };

  const assignRoles = useCallback(async (authTokens, data) => {
    try {
      const responseFromApi = await assignRolesApi(authTokens, data);

      if (responseFromApi.message) {
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

  const changePasssword = useCallback(async (authTokens, id, data) => {
    try {
      const responseFromApi = await changePassswordApi(authTokens, id, data);

      if (responseFromApi.message) {
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

  const clearErrors = async () => {
    setErrors([]);
  };

  return {
    elements,
    getElements,
    updateElement,
    createElement,
    deleteElement,
    assignRoles,
    changePasssword,
    errors,
    clearErrors,
    loading,
  };
}
