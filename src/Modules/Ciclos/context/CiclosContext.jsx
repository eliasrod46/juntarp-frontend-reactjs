import React, { createContext } from "react";
import { useCiclos } from "@/Modules/Ciclos/hooks";
export const CiclosContext = createContext();

export const CiclosProvider = ({ children }) => {
  const {
    elements,
    getCiclos,
    updateCiclo,
    createCiclo,
    deleteCiclo,
    errors,
    clearErrors,
    loading,
  } = useCiclos();

  const value = {
    elements,
    getCiclos,
    updateCiclo,
    createCiclo,
    deleteCiclo,
    errors,
    clearErrors,
    loading,
  }; // Objeto con el estado y la función

  return (
    <CiclosContext.Provider value={value}>{children}</CiclosContext.Provider>
  );
};
