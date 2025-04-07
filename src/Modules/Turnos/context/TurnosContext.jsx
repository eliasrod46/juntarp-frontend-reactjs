import React, { createContext } from "react";
import { useTurnos } from "@/Modules/Turnos/hooks";
export const TurnosContext = createContext();

export const TurnosProvider = ({ children }) => {
  const {
    elements,
    getTurnos,
    updateTurno,
    createTurno,
    deleteTurno,
    errors,
    clearErrors,
    loading,
  } = useTurnos();

  const value = {
    elements,
    getTurnos,
    updateTurno,
    createTurno,
    deleteTurno,
    errors,
    clearErrors,
    loading,
  }; // Objeto con el estado y la función

  return (
    <TurnosContext.Provider value={value}>{children}</TurnosContext.Provider>
  );
};
