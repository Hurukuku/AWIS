import React, { useEffect, useState } from "react";
import { NavLink, Link } from "react-router";
import { useCarUiStore } from "../store/useCarUiStore";
import { getCars } from "../services/carService";
import type { Car } from "../models/Car";
import { getYearFromDate } from "../utils/dateUtils";

export default function Navbar() {
  const favoriteCarIds = useCarUiStore((state) => state.favoriteCarIds);
  const setShowFavoritesOnly = useCarUiStore((state) => state.setShowFavoritesOnly);
  const removeFavorite = useCarUiStore((state) => state.removeFavorite);
  const [allCars, setAllCars] = useState<Car[]>([]);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [loadingCars, setLoadingCars] = useState<boolean>(false);

  const fetchCars = async () => {
    try {
      setLoadingCars(true);
      const data = await getCars();
      setAllCars(data);
    } catch {
   
    } finally {
      setLoadingCars(false);
    }
  };

  useEffect(() => {
    fetchCars();
  }, [favoriteCarIds.length]);

  const favoriteCars = allCars.filter((car) => favoriteCarIds.includes(car.id));
  const count = favoriteCarIds.length;
  const badgeText = count === 0 ? null : count > 9 ? "9+" : String(count);

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

          <div
            className="relative"
            onMouseEnter={() => {
              setIsHovered(true);
              if (allCars.length === 0) {
                fetchCars();
              }
            }}
            onMouseLeave={() => setIsHovered(false)}
          >
            <Link
              to="/cars"
              onClick={() => {
                if (count > 0) {
                  setShowFavoritesOnly(true);
                }
              }}
              className="favorite-counter relative flex items-center justify-center p-2 rounded-full text-gray-300 hover:text-white hover:bg-neutral-800 transition"
              title="Ulubione"
              aria-label="Ulubione"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className={`w-6 h-6 transition ${
                  count > 0 ? "fill-amber-400" : "fill-none stroke-current stroke-2 text-gray-400"
                }`}
              >
                <path d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z" />
              </svg>

              {badgeText && (
                <span className="absolute -top-1 -right-1 flex items-center justify-center w-[18px] h-[18px] rounded-full bg-amber-600 text-white text-[10px] font-bold leading-none border border-neutral-900 shadow select-none">
                  {badgeText}
                </span>
              )}
            </Link>

            {isHovered && (
              <div className="absolute right-0 top-full pt-1 w-64 z-50">
                <div className="bg-neutral-900 border border-gray-700 rounded-md shadow-xl p-2 text-sm">
                  {loadingCars && allCars.length === 0 ? (
                    <div className="p-2 text-xs text-center text-gray-400">
                      Ładowanie...
                    </div>
                  ) : favoriteCars.length === 0 ? (
                    <div className="p-2 text-xs text-center text-gray-400">
                      Brak ulubionych samochodów
                    </div>
                  ) : (
                    <ul className="max-h-60 overflow-y-auto space-y-1">
                      {favoriteCars.map((car) => {
                        const year = getYearFromDate(car.productionDate);
                        return (
                          <li
                            key={car.id}
                            className="flex items-center justify-between gap-2 px-2 py-1.5 hover:bg-neutral-800 rounded transition"
                          >
                            <Link
                              to={`/cars/${car.id}`}
                              className="text-white hover:text-amber-400 truncate text-xs font-medium"
                              title={`${car.brand} ${car.model} ${year ? `(${year})` : ""}`}
                            >
                              {car.brand} {car.model} {year ? `(${year})` : ""}
                            </Link>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                removeFavorite(car.id);
                              }}
                              className="p-1 text-amber-400 hover:text-red-400 transition cursor-pointer shrink-0"
                              title="Usuń z ulubionych"
                              aria-label={`Usuń ${car.brand} ${car.model} z ulubionych`}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                className="w-4 h-4 fill-current"
                              >
                                <path d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z" />
                              </svg>
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </div>
              </div>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}

