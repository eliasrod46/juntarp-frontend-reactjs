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
    assignElements,
    generalError,
    validationErrors,
    clearErrors,
    loading,
  } = useRoles();

  const value = {
    roles: elements,
    getRoles: getElements,
    updateRole: updateElement,
    createRole: createElement,
    deleteRole: deleteElement,
    assignPermissions: assignElements,
    generalError,
    validationErrors,
    clearErrors,
    loading,
  };

  return (
    <RolesContext.Provider value={value}>{children}</RolesContext.Provider>
  );
};
