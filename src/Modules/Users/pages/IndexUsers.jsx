import React from "react";
import { UsersIndexTable } from "../components";
import Breadcrumb from "@/components/Breadcrumb";

export const IndexUsers = () => {
  return (
    <div>
      <h2 className="text-center text-2xl my-4">Usuarios</h2>
      <div>
        <Breadcrumb />
      </div>
      <UsersIndexTable />
    </div>
  );
};
