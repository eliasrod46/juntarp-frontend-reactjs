//hook custom
import { useState, useCallback } from "react";
import {
  getTurnosTypesApi,
  updateTurnoTypeApi,
  createTurnoTypeApi,
  deleteTurnoTypeApi,
} from "@/Modules/Turnos/apis";

export function useTurnosTypes() {
  const [elements, setElements] = useState();
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(true);

  const getTurnosTypes = useCallback(async () => {
    setLoading(true);
    try {
      const responseFromApi = await getTurnosTypesApi();
      setElements(responseFromApi || []);

      //to debug
      // console.log("Datos de la API:", responseFromApi); // <-- Imprime los datos recibidos de la API
      // setElements([]);
    } catch (error) {
      // console.error("Error al obtener turnos:", error);
      setErrors({ general: ["Error al cargar los tipos turnos"] }); // Manejo de error
    } finally {
      setLoading(false); // Establecer loading a false DESPUÉS de la llamada a la API
    }
  }, []);

  const updateTurnoType = useCallback(async (id, data) => {
    try {
      const responseFromApi = await updateTurnoTypeApi(id, data);

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

  const createTurnoType = useCallback(async (data) => {
    try {
      const responseFromApi = await createTurnoTypeApi(data);

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

  const deleteTurnoType = async (id) => {
    try {
      const responseFromApi = await deleteTurnoTypeApi(id);
      // console.log(responseFromApi);
    } catch (error) {
      // ... (manejo de errores)
    } finally {
      setLoading(false);
    }
  };

  const clearErrors = async () => {
    setErrors([]);
  };

  return {
    elements,
    getTurnosTypes,
    updateTurnoType,
    createTurnoType,
    deleteTurnoType,
    errors,
    clearErrors,
    loading,
  };
}
