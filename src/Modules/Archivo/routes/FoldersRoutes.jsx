import { Route, Routes } from "react-router";
import { FoldersProvider } from "../context";
import { IndexFolders } from "../pages";

export const ArchivoRoutes = () => {
  return (
    <FoldersProvider>
      <Routes>
            <Route path="/carpetas" element={<IndexFolders />} />

      </Routes>
    </FoldersProvider>
  );
};
