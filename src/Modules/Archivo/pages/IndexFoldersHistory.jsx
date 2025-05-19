import React, { useState } from "react";
import { FoldersIndexTable } from "../components/folders/foldersIndexTabla/FoldersIndexTable";
import Breadcrumb from "@/components/Breadcrumb";
import { HistoryFoldersTable } from "../components/tables/HistoryFoldersTable";

export const IndexFoldersHistory = () => {
  return (
    <div>
      <h2 className="text-center text-2xl my-4">Historial de carpetas</h2>
      <div>
        <Breadcrumb />
      </div>
      <HistoryFoldersTable />
    </div>
  );
};
