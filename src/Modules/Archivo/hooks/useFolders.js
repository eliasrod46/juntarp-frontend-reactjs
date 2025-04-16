//hook custom
import { useState, useCallback } from "react";
import {
  createElementApi,
  deleteElementApi,
  getElementsIngresoApi,
  updateElementApi,
} from "../apis/foldersApi";

export function useFolders() {
  const [elements, setElements] = useState();
  const [generalError, setGeneralError] = useState();
  const [validationErrors, setValidationErrors] = useState();
  const [loading, setLoading] = useState(true);

  const getElementsIngreso = useCallback(async (authTokens) => {
    setLoading(true);
    setGeneralError(null);
    try {
      const responseFromApi = await getElementsIngresoApi(authTokens);
      // console.log("Datos de la API:", responseFromApi); // <-- Imprime los datos recibidos de la API
      setElements(responseFromApi || []);
      return Promise.resolve(); // Resolvemos la promesa si no hay errores
    } catch (catchError) {
      const { message } = catchError;

      if (message) {
        setGeneralError(message);
      } else {
        setGeneralError("Error desconocido al iniciar sesión.");
      }
    } finally {
      setLoading(false); // Establecer loading a false DESPUÉS de la llamada a la API
    }
  }, []);

  const updateElement = useCallback(async (authTokens, id, data) => {
    setLoading(true);
    setGeneralError(null);
    setValidationErrors(null);
    try {
      await updateElementApi(authTokens, id, data);
      return Promise.resolve();
    } catch (catchError) {
      const { message } = catchError;

      if (message === "Errores de validación") {
        setGeneralError(message);
        setValidationErrors(catchError.validationErrors);
      } else if (message) {
        setGeneralError(message);
      } else {
        setGeneralError("Error desconocido al iniciar sesión.");
      }
      return Promise.reject(catchError);
    } finally {
      setLoading(false);
    }
  }, []);

  const createElement = useCallback(async (authTokens, data) => {
    setLoading(true);
    setGeneralError(null);
    setValidationErrors(null);
    try {
      await createElementApi(authTokens, data);
      return Promise.resolve();
    } catch (catchError) {
      const { message } = catchError;

      if (message === "Errores de validación") {
        setGeneralError(message);
        setValidationErrors(catchError.validationErrors);
      } else if (message) {
        setGeneralError(message);
      } else {
        setGeneralError("Error desconocido al iniciar sesión.");
      }
      return Promise.reject(catchError);
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteElement = async (authTokens, id) => {
    setLoading(true);
    setGeneralError(null);
    try {
      await deleteElementApi(authTokens, id);
    } catch (catchError) {
      const { message } = catchError;

      if (message) {
        setGeneralError(message);
      } else {
        setGeneralError("Error desconocido al iniciar sesión.");
      }
    } finally {
      setLoading(false);
    }
  };

  const clearErrors = async () => {
    setGeneralError(null);
    setValidationErrors(null);
  };

  return {
    elements,
    getElementsIngreso,
    updateElement,
    createElement,
    deleteElement,
    generalError,
    validationErrors,
    clearErrors,
    loading,
  };
}
