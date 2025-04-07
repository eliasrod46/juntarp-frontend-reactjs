//hook custom
import { useState, useCallback, useEffect } from "react";
import {
  getTurnosApi,
  updateTurnoApi,
  createTurnoApi,
  deleteTurnoApi,
} from "@/Modules/Turnos/apis";

export function useTurnos() {
  const [elements, setElements] = useState();
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(true);

  const getTurnos = useCallback(async () => {
    // useCallback para evitar re-renderizados innecesarios
    setLoading(true); // Establecer loading a true ANTES de la llamada a la API
    try {
      const responseFromApi = await getTurnosApi();
      // console.log("Datos de la API:", responseFromApi); // <-- Imprime los datos recibidos de la API
      setElements(responseFromApi || []); // Usar || [] para evitar null o undefined
    } catch (error) {
      // console.error("Error al obtener turnos:", error);
      setErrors({ general: ["Error al cargar los turnos"] }); // Manejo de error
    } finally {
      setLoading(false); // Establecer loading a false DESPUÉS de la llamada a la API
    }
  }, []);

  const updateTurno = useCallback(async (id, data) => {
    try {
      const responseFromApi = await updateTurnoApi(id, data);

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

  const createTurno = useCallback(async (data) => {
    try {
      const responseFromApi = await createTurnoApi(data);

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

  const deleteTurno = async (id) => {
    try {
      const responseFromApi = await deleteTurnoApi(id);
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
    getTurnos,
    updateTurno,
    createTurno,
    deleteTurno,
    errors,
    clearErrors,
    loading,
  };
}
