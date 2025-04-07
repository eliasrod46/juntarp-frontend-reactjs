import { Route, Routes } from "react-router";
import { IndexDocentes } from "@/Modules/Docentes/pages";
import { DocentesProvider } from "@/Modules/Docentes/context";

export const DocentesRoutes = () => {
  return (
    <DocentesProvider>
      <Routes>
        <Route path="/" element={<IndexDocentes />} />
      </Routes>
    </DocentesProvider>
  );
};
