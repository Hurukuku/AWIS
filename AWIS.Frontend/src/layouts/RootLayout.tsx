import React from "react";
import { Outlet } from "react-router";
import Navbar from "../components/Navbar";

export default function RootLayout() {
  return (
    <div className="min-h-screen w-full flex flex-col bg-[#1a1817] text-[#f5f5f5]">
      <Navbar />
      <main className="flex-1 w-full">
        <Outlet />
      </main>
    </div>
  );
}
