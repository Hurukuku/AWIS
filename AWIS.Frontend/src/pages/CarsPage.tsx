import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import axios from "axios";
import { getCars, deleteCar } from "../services/carService";
import type { Car } from "../models/Car";
import CarCard from "../components/CarCard";
import Loading from "../components/Loading";
import { useCarUiStore } from "../store/useCarUiStore";

export default function CarsPage() {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const searchTerm = useCarUiStore((state) => state.searchTerm);
  const setSearchTerm = useCarUiStore((state) => state.setSearchTerm);
  const showFavoritesOnly = useCarUiStore((state) => state.showFavoritesOnly);
  const setShowFavoritesOnly = useCarUiStore((state) => state.setShowFavoritesOnly);
  const favoriteCarIds = useCarUiStore((state) => state.favoriteCarIds);
  const removeFavorite = useCarUiStore((state) => state.removeFavorite);

  useEffect(() => {
    const controller = new AbortController();

          async function loadCars() {
            try {
              setLoading(true);
              setError(null);

              const loadedCars = await getCars(controller.signal);
              setCars(loadedCars);
            } catch (caughtError) {
              if (axios.isCancel(caughtError)) {
                return;
              }

          if (caughtError instanceof Error) {
            setError(caughtError.message);
          } else {
            setError("Wystąpił nieznany błąd.");
          }
        } finally {
          if (!controller.signal.aborted) {
            setLoading(false);
          }
  }
    }

loadCars();

return () => {
  controller.abort();
};
  }, []);

const handleDelete = async (id: string) => {
  const confirmed = window.confirm("Czy na pewno chcesz usunąć ten samochód?");
  if (!confirmed) {
    return;
  }

  try {
    await deleteCar(id);
    removeFavorite(id);
    setCars((currentCars) => currentCars.filter((car) => car.id !== id));
  } catch (err: any) {
    alert("Błąd podczas usuwania samochodu: " + (err.message || "Nieznany błąd"));
  }
};

const normalizedSearch = searchTerm.trim().toLowerCase();

const visibleCars = cars.filter((car) => {
  const matchesSearch =
    car.brand.toLowerCase().includes(normalizedSearch) ||
    car.model.toLowerCase().includes(normalizedSearch);

  const matchesFavorite =
    !showFavoritesOnly || favoriteCarIds.includes(car.id);

  return matchesSearch && matchesFavorite;
});

if (loading) {
  return <Loading message="Ładowanie samochodów..." />;
}

if (error) {
  return (
    <div className="p-12 text-center text-red-400">
      <p>Wystąpił błąd: {error}</p>
      <button
        onClick={() => window.location.reload()}
        className="mt-4 px-4 py-2 border border-gray-500 rounded hover:bg-neutral-800"
      >
        Odśwież
      </button>
    </div>
  );
}

return (
  <div className="flex min-h-screen w-full flex-col items-center px-6 py-8">
    <div className="flex w-full max-w-5xl justify-between items-center mb-6">
      <h1 className="text-2xl font-bold">Samochody</h1>
      <Link
        to="/cars/new"
        className="rounded-md border border-green-500 bg-green-600 px-4 py-2 text-white hover:bg-green-700"
      >
        + Dodaj samochód
      </Link>
    </div>

    <div className="cars-toolbar flex flex-wrap items-center gap-4 mb-6 w-full max-w-5xl">
      <input
        type="search"
        placeholder="Szukaj po marce lub modelu..."
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
        className="flex-1 min-w-[280px] px-3 py-2 rounded-md bg-neutral-800 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
      />

      <button
        type="button"
        onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
        className={`favorite-filter flex items-center justify-center p-2.5 rounded-md transition cursor-pointer select-none ${
          showFavoritesOnly
            ? "bg-amber-600 border border-amber-500 text-white shadow-md hover:bg-amber-500"
            : "border border-gray-500 bg-transparent text-gray-400 hover:border-amber-500 hover:text-amber-400"
        }`}
        title={showFavoritesOnly ? "Pokaż wszystkie samochody" : "Pokaż tylko ulubione"}
        aria-label={showFavoritesOnly ? "Pokaż wszystkie samochody" : "Pokaż tylko ulubione"}
        aria-pressed={showFavoritesOnly}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          className={`w-5 h-5 transition ${
            showFavoritesOnly ? "fill-white" : "fill-amber-400"
          }`}
        >
          <path d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z" />
        </svg>
      </button>
    </div>

    {cars.length === 0 ? (
      <div className="p-12 text-center text-gray-400">
        Brak samochodów w bazie danych.
      </div>
    ) : visibleCars.length === 0 ? (
      <div className="p-12 text-center text-gray-400">
        Brak samochodów spełniających kryteria wyszukiwania.
      </div>
    ) : (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl">
        {visibleCars.map((car) => (
          <CarCard key={car.id} car={car} onDelete={handleDelete} />
        ))}
      </div>
    )}
  </div>
);
}
