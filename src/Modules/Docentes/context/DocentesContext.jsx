import React, { createContext } from "react";
import { useDocentes } from "@/Modules/Docentes/hooks";
export const DocentesContext = createContext();

export const DocentesProvider = ({ children }) => {
  const {
    elements,
    getElements,
    updateElement,
    createElement,
    deleteElement,
    generalError,
    validationErrors,
    clearErrors,
    loading,
  } = useDocentes();

  const value = {
    docentes: elements,
    getDocentes: getElements,
    updateDocente: updateElement,
    createDocente: createElement,
    deleteDocente: deleteElement,
    generalError,
    validationErrors,
    clearErrors,
    loading,
  }; // Objeto con el estado y la función

  return (
    <DocentesContext.Provider value={value}>
      {children}
    </DocentesContext.Provider>
  );
};
