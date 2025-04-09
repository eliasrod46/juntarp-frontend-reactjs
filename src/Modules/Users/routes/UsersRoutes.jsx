import { Route, Routes } from "react-router";
import { IndexUsers } from "@/Modules/Users/pages";
import { UsersProvider } from "@/Modules/Users/context";
import { RolesProvider } from "@/Modules/ConfigModule/context";

export const UsersRoutes = () => {
  return (
    <RolesProvider>
      <UsersProvider>
        <Routes>
          <Route path="/" element={<IndexUsers />} />
        </Routes>
      </UsersProvider>
    </RolesProvider>
  );
};
