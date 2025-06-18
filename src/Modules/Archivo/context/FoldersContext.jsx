import React, { createContext } from "react";
import { useFolders } from "../hooks/useFolders";
export const FoldersContext = createContext();

export const FoldersProvider = ({ children }) => {
  const {
    elements,
    historyElements,
    getElementsIngreso,
    getElementsHistoryIngreso,
    createElement,
    deleteElement,
    updateElement,
    createElements,
    generalError,
    validationErrors,
    clearErrors,
    loading,
  } = useFolders();

  const value = {
    folders: elements,
    historyFolders: historyElements,
    getFoldersIngreso: getElementsIngreso,
    getFoldersHistoryIngreso: getElementsHistoryIngreso,
    updateFolder: updateElement,
    createFolder: createElement,
    deleteFolder: deleteElement,
    createFolders: createElements,
    generalError,
    validationErrors,
    clearErrors,
    loading,
  }; // Objeto con el estado y la función

  return (
    <FoldersContext.Provider value={value}>{children}</FoldersContext.Provider>
  );
};
