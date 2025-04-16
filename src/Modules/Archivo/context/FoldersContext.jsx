import React, { createContext } from "react";
import { useFolders } from "../hooks";
export const FoldersContext = createContext();

export const FoldersProvider = ({ children }) => {
  const {
    elements,
    getElementsIngreso,
    createElement,
    deleteElement,
    updateElement,
    generalError,
    validationErrors,
    clearErrors,
    loading,
  } = useFolders();

  const value = {
    folders: elements,
    getFoldersIngreso: getElementsIngreso,
    updateFolder: updateElement,
    createFolder: createElement,
    deleteFolder: deleteElement,
    generalError,
    validationErrors,
    clearErrors,
    loading,
  }; // Objeto con el estado y la función

  return (
    <FoldersContext.Provider value={value}>{children}</FoldersContext.Provider>
  );
};
