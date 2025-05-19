import { Route, Routes } from "react-router";
import { IndexMain } from "../pages";
import { IndexProfile } from "@/Modules/Auth/pages";
import { UsersProvider } from "@/Modules/Users/context";

export const MainRoutes = () => {
  return (
    <UsersProvider>
      <Routes>
        <Route path="/" element={<IndexMain />} />
        <Route path="/profile" element={<IndexProfile />} />
      </Routes>
    </UsersProvider>
  );
};
