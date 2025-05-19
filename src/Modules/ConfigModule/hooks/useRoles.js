//hook custom
import { useState, useCallback } from "react";
import {
  createElementApi,
  deleteElementApi,
  getElementsApi,
  updateElementApi,
} from "../apis/rolesApi";
import { generalErrorsHandler } from "@/config/generalErrorsHandler";

export function useRoles() {
  const [elements, setElements] = useState();
  const [generalError, setGeneralError] = useState();
  const [validationErrors, setValidationErrors] = useState();
  const [loading, setLoading] = useState(true);

  const getElements = useCallback(async (authTokens) => {
    setLoading(true);
    setGeneralError(null);
    try {
      const responseFromApi = await getElementsApi(authTokens);

      setElements(responseFromApi || []);
      return Promise.resolve();
    } catch (catchError) {
      if (catchError.statusCode == 401) {
        
        navigate('/'); // Redirige a la ruta '/login'
      }
      await generalErrorsHandler(
        catchError,
        setGeneralError,
        setValidationErrors
      );
    } finally {
      setLoading(false); 
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
      if (catchError.statusCode == 401) {
        
        navigate('/'); // Redirige a la ruta '/login'
      }
      await generalErrorsHandler(
        catchError,
        setGeneralError,
        setValidationErrors
      );
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
      if (catchError.statusCode == 401) {
        
        navigate('/'); // Redirige a la ruta '/login'
      }
      await generalErrorsHandler(
        catchError,
        setGeneralError,
        setValidationErrors
      );
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
      if (catchError.statusCode == 401) {
        
        navigate('/'); // Redirige a la ruta '/login'
      }
      await generalErrorsHandler(
        catchError,
        setGeneralError,
        setValidationErrors
      );
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
    getElements,
    updateElement,
    createElement,
    deleteElement,
    generalError,
    validationErrors,
    clearErrors,
    loading,
  };
}
