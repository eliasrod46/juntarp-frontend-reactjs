import { Route, Routes } from "react-router";
import { IndexMain } from "../pages";

export const MainRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<IndexMain />} />
    </Routes>
  );
};
