import { NavBar } from "@/components/NavBar/NavBar";
import React from "react";
import { Outlet } from "react-router";

export const BasicLayout = ({ children }) => {
  return (
    <main>
      <NavBar />
      <div className="mx-10">
        <Outlet />
      </div>
    </main>
  );
};
