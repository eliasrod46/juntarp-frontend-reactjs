import { Route, Routes } from "react-router";
import { IndexRegister, IndexLogin, IndexProfile } from "@/Modules/Auth/pages";
import { LoginMiddleware } from "@/Modules/Auth/middlewares";
import { ProtectedAuthRoute } from "./ProtectedAuthRoute";

export const AuthRoutes = () => {
  return (
    <Routes>
      {/* <Route path="/register" element={<IndexRegister />} /> */}
      <Route path="/login" element={<LoginMiddleware />} />
      <Route element={<ProtectedAuthRoute />}>
        <Route path="/profile" element={<IndexProfile />} />
      </Route>
    </Routes>
  );
};
