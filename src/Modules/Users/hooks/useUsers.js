//hook custom
import { useState, useCallback, useEffect } from "react";
import {
  createElementApi,
  deleteElementApi,
  getElementsApi,
  updateElementApi,
  assignRolesApi,
  changePassswordApi,
  resetPassswordApi,
} from "@/Modules/Users/apis";
import { generalErrorsHandler } from "@/config/generalErrorsHandler";
import { useNavigate } from "react-router-dom";

export function useUsers() {
  const navigate = useNavigate();

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
        navigate("/"); // Redirige a la ruta '/login'
      }
      await generalErrorsHandler(
        catchError,
        setGeneralError,
        setValidationErrors
      );
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
      if (catchError.statusCode == 401) {
        navigate("/"); // Redirige a la ruta '/login'
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

  const assignRoles = useCallback(async (authTokens, data) => {
    try {
      await assignRolesApi(authTokens, data);
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

  const changePasssword = useCallback(async (authTokens, id, data) => {
    setLoading(true);
    setGeneralError(null);
    setValidationErrors(null);
    try {
      await changePassswordApi(authTokens, id, data);

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
      return Promise.reject(catchError);
    } finally {
      setLoading(false);
    }
  }, []);

  const resetPasssword = useCallback(async (authTokens, id) => {
    setLoading(true);
    setGeneralError(null);
    setValidationErrors(null);
    try {
      await resetPassswordApi(authTokens, id);

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
      return Promise.reject(catchError);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    elements,
    getElements,
    updateElement,
    createElement,
    deleteElement,
    assignRoles,
    changePasssword,
    resetPasssword,
    generalError,
    validationErrors,
    clearErrors,
    loading,
  };
}
