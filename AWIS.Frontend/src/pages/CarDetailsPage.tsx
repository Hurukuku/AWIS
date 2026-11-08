import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router";
import axios from "axios";
import { getCarById, deleteCar } from "../services/carService";
import { bodyType, fuelType, type Car } from "../models/Car";
import NotFoundPage from "./NotFoundPage";
import Loading from "../components/Loading";
import { formatDateForDisplay } from "../utils/dateUtils";
import { useCarUiStore } from "../store/useCarUiStore";
import starIcon from "../assets/Star.svg";
import starEmptyIcon from "../assets/StarEmpty.svg";

export default function CarDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [car, setCar] = useState<Car | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const favoriteCarIds = useCarUiStore((state) => state.favoriteCarIds);
  const toggleFavorite = useCarUiStore((state) => state.toggleFavorite);
  const removeFavorite = useCarUiStore((state) => state.removeFavorite);

  useEffect(() => {
    if (!id) return;

    const controller = new AbortController();

    async function loadCar() {
      try {
        setLoading(true);
        setError(null);

        const loadedCar = await getCarById(id!, controller.signal);
        setCar(loadedCar);
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

    loadCar();

    return () => {
      controller.abort();
    };
  }, [id]);

  const handleDelete = async () => {
    if (!id) return;
    const confirmed = window.confirm("Czy na pewno chcesz usunąć ten samochód?");
    if (!confirmed) return;

    try {
      await deleteCar(id);
      removeFavorite(id);
      navigate("/cars");
    } catch (err: any) {
      alert("Błąd podczas usuwania: " + (err.message || "Nieznany błąd"));
    }
  };

  if (!id) {
    return <NotFoundPage />;
  }

  if (loading) {
    return <Loading message="Ładowanie szczegółów samochodu..." />;
  }

  if (error || !car) {
    return <NotFoundPage />;
  }

  const isFavorite = favoriteCarIds.includes(car.id);

  return (
    <div className="flex min-h-screen w-full flex-col items-center px-6 py-8">
      <div className="flex flex-col border border-gray-500 rounded-md w-full max-w-2xl p-6 bg-neutral-800">
        <div className="flex justify-between items-center mb-6 border-b border-gray-700 pb-4">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold">
              {car.brand} {car.model}
            </h1>
            <button
              type="button"
              onClick={() => toggleFavorite(car.id)}
              className="p-1 hover:scale-110 transition cursor-pointer"
              title={isFavorite ? "Usuń z ulubionych" : "Dodaj do ulubionych"}
              aria-label={isFavorite ? "Usuń z ulubionych" : "Dodaj do ulubionych"}
            >
              <img
                src={isFavorite ? starIcon : starEmptyIcon}
                alt={isFavorite ? "Ulubiony" : "Ulubione"}
                className="w-6 h-6 invert"
              />
            </button>
          </div>
          <span className="text-xs text-gray-400 bg-neutral-900 border border-gray-700 px-3 py-1 rounded">
            ID: {car.id}
          </span>
        </div>

        <div className="flex flex-col gap-2 text-sm text-gray-300 mb-6">
          <p>
            <strong className="text-white">Data produkcji:</strong>{" "}
            {formatDateForDisplay(car.productionDate)}
          </p>
          <p>
            <strong className="text-white">Typ nadwozia:</strong>{" "}
            {bodyType[car.bodyType] ?? car.bodyType}
          </p>
          <p>
            <strong className="text-white">Liczba drzwi:</strong> {car.doorsNumber}
          </p>
          <p>
            <strong className="text-white">Pojemność bagażnika:</strong> {car.luggageCapacity} l
          </p>
          <p>
            <strong className="text-white">Pojemność silnika:</strong> {car.engineCapacity} cm³
          </p>
          <p>
            <strong className="text-white">Typ paliwa:</strong>{" "}
            {fuelType[car.fuelType] ?? car.fuelType}
          </p>
          <p>
            <strong className="text-white">Średnie zużycie paliwa:</strong>{" "}
            {car.averageFuelConsumption} l/100km
          </p>
        </div>

        <div className="flex flex-wrap gap-3 pt-4 border-t border-gray-700">
          <Link
            to="/cars"
            className="rounded-md border border-gray-500 px-4 py-2 text-white hover:bg-neutral-700 text-center"
          >
            ← Wróć do listy
          </Link>
          <Link
            to={`/cars/${car.id}/edit`}
            className="rounded-md border border-yellow-500 px-4 py-2 text-white hover:bg-yellow-600 text-center"
          >
            Edytuj
          </Link>
          <button
            type="button"
            onClick={handleDelete}
            className="rounded-md border border-red-500 px-4 py-2 text-white hover:bg-red-600 cursor-pointer"
          >
            Usuń
          </button>
        </div>
      </div>
    </div>
  );
}
