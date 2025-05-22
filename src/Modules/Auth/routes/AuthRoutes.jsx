import { Route, Routes } from "react-router";
import { IndexRegister, IndexLogin, IndexProfile } from "@/Modules/Auth/pages";
import { LoginMiddleware } from "@/Modules/Auth/middlewares";
import { ProtectedAuthRoute } from "./ProtectedAuthRoute";
import { UsersProvider } from "@/Modules/Users/context";

export const AuthRoutes = () => {
  return (
    <UsersProvider>
      <Routes>
        {/* <Route path="/register" element={<IndexRegister />} /> */}
        <Route path="/login" element={<LoginMiddleware />} />
        {/* <Route element={<ProtectedAuthRoute />}></Route> */}
      </Routes>
    </UsersProvider>
  );
};
