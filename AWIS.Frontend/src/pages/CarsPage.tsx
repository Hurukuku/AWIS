import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import { getCars, deleteCar } from "../services/carService";
import type { Car } from "../models/Car";
import CarCard from "../components/CarCard";
import Loading from "../components/Loading";

export default function CarsPage() {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let ignore = false;
    setLoading(true);

    getCars()
      .then((data) => {
        if (!ignore) {
          setCars(data);
          setError(null);
        }
      })
      .catch((err) => {
        if (!ignore) {
          setError(err.message || "Błąd podczas pobierania samochodów");
        }
      })
      .finally(() => {
        if (!ignore) {
          setLoading(false);
        }
      });

    return () => {
      ignore = true;
    };
  }, []);

  const handleDelete = async (id: string) => {
    const confirmed = window.confirm("Czy na pewno chcesz usunąć ten samochód?");
    if (!confirmed) {
      return;
    }

    try {
      await deleteCar(id);
      setCars((prev) => prev.filter((car) => car.id !== id));
    } catch (err: any) {
      alert("Błąd podczas usuwania samochodu: " + (err.message || "Nieznany błąd"));
    }
  };

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

      {cars.length === 0 ? (
        <div className="p-12 text-center text-gray-400">
          Brak samochodów w bazie danych.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl">
          {cars.map((car) => (
            <CarCard key={car.id} car={car} onDelete={handleDelete} />
          ))}
        </div>
      )}
    </div>
  );
}
