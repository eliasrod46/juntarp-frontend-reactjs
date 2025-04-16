import { BrowserRouter, Route, Routes } from "react-router";
import { createRoot } from "react-dom/client";
import { NavBar } from "./components/NavBar/NavBar.jsx";
import "./main.css";
import { App } from "./App.jsx";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { BasicLayout } from "./layouts/BasicLayout.jsx";
//context
import { AuthProvider } from "./Modules/Auth/context/index.js";
//routes
import { CiclosRoutes } from "@/Modules/Ciclos/routes/index.js";
import { DocentesRoutes } from "@/Modules/Docentes/routes/index.js";
import { TurnosRoutes } from "@/Modules/Turnos/routes/index.js";
import { AuthRoutes } from "./Modules/Auth/routes/index.js";
import { ProtectedAuthRoute } from "./Modules/Auth/routes/ProtectedAuthRoute.jsx";
import { ArchivoRoutes } from "./Modules/Archivo/routes/index.js";
import { MainRoutes } from "./Modules/Main/routes/index.js";
import { GuessLayout } from "./layouts/GuessLayout.jsx";
import { UsersRoutes } from "./Modules/Users/routes/index.js";
import { ConfigRoutes } from "./Modules/ConfigModule/routes/index.js";
import "./config/axiosConfig.js";
createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthProvider>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Routes>
          {/* Public routes */}
          <Route element={<GuessLayout />}>
            <Route path="/" element={<App />} />
            <Route path="auth/*" element={<AuthRoutes />} />
          </Route>

          {/* Protected routes */}
          <Route element={<ProtectedAuthRoute />}>
            <Route element={<BasicLayout />}>
              <Route path="inicio/*" element={<MainRoutes />} />
              <Route path="docentes/*" element={<DocentesRoutes />} />
              <Route path="usuarios/*" element={<UsersRoutes />} />
              <Route path="ciclos/*" element={<CiclosRoutes />} />
              <Route path="archivo/*" element={<ArchivoRoutes />} />
              <Route path="turnos/*" element={<TurnosRoutes />} />
              <Route path="configuracion/*" element={<ConfigRoutes />} />
            </Route>
          </Route>
        </Routes>
      </LocalizationProvider>
    </AuthProvider>
  </BrowserRouter>
);
