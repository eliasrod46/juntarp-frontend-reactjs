import { Route, Routes } from "react-router";
import { IndexConfig } from "../pages";
import { IndexRoles } from "../pages/IndexRoles";
import { RolesProvider } from "../context";

export const ConfigRoutes = () => {
  return (
    <RolesProvider>
      <Routes>
        <Route path="/" element={<IndexConfig />} />
        <Route path="/roles" element={<IndexRoles />} />
        {/* 
      <Route element={<ProtectedAuthRoute />}>
        <Route path="/profile" element={<IndexProfile />} />
      </Route> */}
      </Routes>
    </RolesProvider>
  );
};
