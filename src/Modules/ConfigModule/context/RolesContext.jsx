import React, { createContext } from "react";
import { useRoles } from "../hooks";
export const RolesContext = createContext();

export const RolesProvider = ({ children }) => {
  const {
    elements,
    getElements,
    createElement,
    deleteElement,
    updateElement,
    errors,
    clearErrors,
    loading,
  } = useRoles();

  const value = {
    roles: elements,
    getRoles: getElements,
    updateRole: updateElement,
    createRole: createElement,
    deleteRole: deleteElement,
    errors,
    clearErrors,
    loading,
  }; // Objeto con el estado y la función

  return (
    <RolesContext.Provider value={value}>{children}</RolesContext.Provider>
  );
};
