import React, { createContext } from "react";
import { useUsers } from "@/Modules/Users/hooks";
export const UsersContext = createContext();

export const UsersProvider = ({ children }) => {
  const {
    elements,
    getElements,
    createElement,
    deleteElement,
    updateElement,
    assignRoles,
    changePasssword,
    resetPasssword,
    generalError,
    validationErrors,
    clearErrors,
    loading,
  } = useUsers();

  const value = {
    users: elements,
    getUsers: getElements,
    updateUser: updateElement,
    createUser: createElement,
    deleteUser: deleteElement,
    assignRoles,
    changePasssword,
    resetPasssword,
    generalError,
    validationErrors,
    clearErrors,
    loading,
  };

  return (
    <UsersContext.Provider value={value}>{children}</UsersContext.Provider>
  );
};
