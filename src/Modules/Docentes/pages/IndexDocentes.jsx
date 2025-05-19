import React from "react";
import { DocentesIndexTable } from "@/Modules/Docentes/components";
import Breadcrumb from "@/components/Breadcrumb";

export const IndexDocentes = () => {
  return (
    <div>
      <h2 className="text-center text-2xl my-4">Docentes</h2>
      <div>
        <Breadcrumb/>
      </div>
      <DocentesIndexTable />
    </div>
  );
};
