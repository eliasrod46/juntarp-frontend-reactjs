import { Route, Routes } from "react-router";
import { IndexUsers } from "@/Modules/Users/pages";
import { UsersProvider } from "@/Modules/Users/context";

export const UsersRoutes = () => {
  return (
    <UsersProvider>
      <Routes>
        <Route path="/" element={<IndexUsers />} />
      </Routes>
    </UsersProvider>
  );
};
