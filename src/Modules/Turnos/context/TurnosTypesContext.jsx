import React, { createContext } from "react";
import { useTurnosTypes } from "@/Modules/Turnos/hooks";
export const TurnosTypesContext = createContext();

export const TurnosTypesProvider = ({ children }) => {
  const {
    elements,
    getTurnosTypes,
    updateTurnoType,
    createTurnoType,
    deleteTurnoType,
    errors,
    clearErrors,
    loading,
  } = useTurnosTypes();

  const value = {
    elements,
    getTurnosTypes,
    updateTurnoType,
    createTurnoType,
    deleteTurnoType,
    errors,
    clearErrors,
    loading,
  }; // Objeto con el estado y la función

  return (
    <TurnosTypesContext.Provider value={value}>
      {children}
    </TurnosTypesContext.Provider>
  );
};
