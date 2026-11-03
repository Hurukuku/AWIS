import React from "react";
import { Link } from "react-router";

export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] gap-4 text-center px-6">
      <div className="text-5xl font-bold text-gray-500">404</div>
      <div className="text-xl font-semibold">Nie znaleziono strony</div>
      <p className="text-sm text-gray-400">Podany adres URL nie istnieje.</p>
      <Link
        to="/"
        className="mt-2 rounded-md border border-blue-500 px-4 py-2 text-white hover:bg-blue-600 transition"
      >
        Wróć do strony głównej
      </Link>
    </div>
  );
}
