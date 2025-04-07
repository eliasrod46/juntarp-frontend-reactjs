import { Route, Routes } from "react-router";
import { IndexRegister, IndexLogin } from "@/Modules/Auth/pages";
import { LoginMiddleware } from "@/Modules/Auth/middlewares";

export const AuthRoutes = () => {
  return (
    <Routes>
      {/* <Route path="/register" element={<IndexRegister />} /> */}
      <Route path="/login" element={<LoginMiddleware />} />
      {/* <Route path="/profile" element={<IndexLogin />} /> */}
    </Routes>
  );
};
