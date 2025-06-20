import { Route, Routes } from "react-router";
import { IndexConfig } from "../pages";
import { IndexRoles } from "../pages/IndexRoles";
import { RolesProvider } from "../context";
import { IndexPermissions } from "../pages/IndexPermissions";
import { PermissionsProvider } from "../context/PermissionsContext";

export const ConfigRoutes = () => {
  return (
    <RolesProvider>
      <PermissionsProvider>
        <Routes>
          <Route path="/" element={<IndexConfig />} />
          <Route path="/roles" element={<IndexRoles />} />
          <Route path="/permisos" element={<IndexPermissions />} />
          {/* 
        <Route element={<ProtectedAuthRoute />}>
          <Route path="/profile" element={<IndexProfile />} />
        </Route> */}
        </Routes>
      </PermissionsProvider>
    </RolesProvider>
  );
};
