import { Route, Routes } from "react-router";
import { IndexCiclos } from "@/Modules/Ciclos/pages";
import { CiclosProvider } from "@/Modules/Ciclos/context";

export const CiclosRoutes = () => {
  return (
    <CiclosProvider>
      <Routes>
        <Route path="/" element={<IndexCiclos />} />
      </Routes>
    </CiclosProvider>
  );
};
