import { Route, Routes } from "react-router";
import { FoldersProvider } from "../context";
import { IndexFolders } from "../pages";
import { IndexMovementFolders } from "../pages/IndexMovementFolders";
import { IndexFoldersHistory } from "../pages/IndexFoldersHistory";

export const ArchivoRoutes = () => {
  return (
    <FoldersProvider>
      <Routes>
            <Route path="/" element={<IndexFolders />} />
            <Route path="/carpetas" element={<IndexMovementFolders />} />
            <Route path="/historial-carpetas" element={<IndexFoldersHistory />} />

      </Routes>
    </FoldersProvider>
  );
};
