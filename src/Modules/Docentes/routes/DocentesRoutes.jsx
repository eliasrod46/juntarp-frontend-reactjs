import { Route, Routes } from "react-router";
import { IndexDocentes } from "@/Modules/Docentes/pages";
import { DocentesProvider } from "@/Modules/Docentes/context";
import { FoldersProvider } from "@/Modules/Archivo/context";

export const DocentesRoutes = () => {
  return (
    <FoldersProvider>
      <DocentesProvider>
        <Routes>
          <Route path="/" element={<IndexDocentes />} />
        </Routes>
      </DocentesProvider>
    </FoldersProvider>
  );
};
