import React from "react";
import { Link } from "react-router";

export default function HomePage() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-6 text-center">
      <h1 className="text-4xl font-bold mb-4">Cars Client</h1>
      <p className="text-lg text-gray-400 max-w-md mb-8">
        Aplikacja do przeglądania i zarządzania bazą samochodów (React + TypeScript).
      </p>
      <div className="flex flex-wrap gap-4 justify-center">
        <Link
          to="/cars"
          className="rounded-md border border-blue-500 bg-neutral-800 px-6 py-2 text-white hover:bg-blue-600 transition"
        >
          Przeglądaj samochody
        </Link>
        <Link
          to="/cars/new"
          className="rounded-md border border-green-500 bg-neutral-800 px-6 py-2 text-white hover:bg-green-600 transition"
        >
          Dodaj nowy samochód
        </Link>
      </div>
    </div>
  );
}

