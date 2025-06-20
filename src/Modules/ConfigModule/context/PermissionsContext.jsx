import React, { createContext } from "react";
import { usePermissions } from "../hooks/usePermissions";
export const PermissionsContext = createContext();

export const PermissionsProvider = ({ children }) => {
  const {
    elements,
    getElements,
    createElement,
    createElements,
    deleteElement,
    updateElement,
    generalError,
    validationErrors,
    clearErrors,
    loading,
  } = usePermissions();

  const value = {
    permissions: elements,
    getPermissions: getElements,
    updatePermission: updateElement,
    createPermission: createElement,
    createPermissions: createElements,
    deletePermission: deleteElement,
    generalError,
    validationErrors,
    clearErrors,
    loading,
  };

  return (
    <PermissionsContext.Provider value={value}>
      {children}
    </PermissionsContext.Provider>
  );
};
