import { Route, Routes } from "react-router";
import { IndexTurnos } from "@/Modules/Turnos/pages";
import { TurnosProvider, TurnosTypesProvider } from "@/Modules/Turnos/context";
import { CiclosProvider } from "@/Modules/Ciclos/context";
import { DocentesProvider } from "@/Modules/Docentes/context";
import { IndexTurnosTypes } from "../pages/IndexTurnosTypes";

export const TurnosRoutes = () => {
  return (
    <CiclosProvider>
      <DocentesProvider>
        <TurnosTypesProvider>
          <TurnosProvider>
            <Routes>
              <Route path="/" element={<IndexTurnos />} />
              <Route path="/tipos-turnos" element={<IndexTurnosTypes />} />
            </Routes>
          </TurnosProvider>
        </TurnosTypesProvider>
      </DocentesProvider>
    </CiclosProvider>
  );
};
