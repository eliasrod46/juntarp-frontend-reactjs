import React from "react";
import { UsersIndexTable } from "../components";
// import { DocentesIndexTable } from "@/Modules/Docentes/components";

export const IndexUsers = () => {
  return (
    <div>
      <h2 className="text-center text-2xl my-4">Usuarios</h2>
      <UsersIndexTable />
    </div>
  );
};
