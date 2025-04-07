import React, { createContext } from "react";
import { useDocentes } from "@/Modules/Docentes/hooks";
export const DocentesContext = createContext();

export const DocentesProvider = ({ children }) => {
  const {
    docentes,
    getDocentes,
    updateDocente,
    createDocente,
    deleteDocente,
    errors,
    clearErrors,
    loading,
  } = useDocentes();

  const value = {
    docentes,
    getDocentes,
    updateDocente,
    createDocente,
    deleteDocente,
    errors,
    clearErrors,
    loading,
  }; // Objeto con el estado y la función

  return (
    <DocentesContext.Provider value={value}>
      {children}
    </DocentesContext.Provider>
  );
};
