import React from "react";
import { Outlet } from "react-router/internal/react-server-client";

export default function RootLayout() {
  return <div className="min-h-screen w-screen">{<Outlet />}</div>;
}
