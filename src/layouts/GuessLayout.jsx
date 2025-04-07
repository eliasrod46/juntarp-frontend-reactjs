import { GuessNavBar } from "@/components/NavBar/GuessNavBar";
import React from "react";
import { Outlet } from "react-router";

export const GuessLayout = ({ children }) => {
  return (
    <main>
      <GuessNavBar />
      <div className="mx-10">
        <Outlet />
      </div>
    </main>
  );
};
