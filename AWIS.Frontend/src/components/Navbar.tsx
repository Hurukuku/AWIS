import React from "react";
import { NavLink } from "react-router";

export default function Navbar() {
  return (
    <header className="border-b border-gray-700 bg-neutral-900 sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
        <NavLink to="/" className="font-bold text-xl text-white tracking-wide">
          Cars
        </NavLink>
        <nav className="flex items-center gap-6 text-sm">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              isActive
                ? "text-blue-400 font-semibold border-b-2 border-blue-400 pb-1"
                : "text-gray-300 hover:text-white pb-1"
            }
          >
            Strona Główna
          </NavLink>
          <NavLink
            to="/cars"
            end
            className={({ isActive }) =>
              isActive
                ? "text-blue-400 font-semibold border-b-2 border-blue-400 pb-1"
                : "text-gray-300 hover:text-white pb-1"
            }
          >
            Samochody
          </NavLink>
          <NavLink
            to="/cars/new"
            className={({ isActive }) =>
              isActive
                ? "text-green-400 font-semibold border-b-2 border-green-400 pb-1"
                : "text-gray-300 hover:text-white pb-1"
            }
          >
            + Dodaj samochód
          </NavLink>
        </nav>
      </div>
    </header>
  );
}

