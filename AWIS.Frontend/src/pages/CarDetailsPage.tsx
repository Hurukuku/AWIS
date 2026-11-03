import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router";
import { getCarById, deleteCar } from "../services/carService";
import { bodyType, fuelType, type Car } from "../models/Car";
import NotFoundPage from "./NotFoundPage";
import Loading from "../components/Loading";

export default function CarDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [car, setCar] = useState<Car | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    let ignore = false;
    setLoading(true);

    getCarById(id)
      .then((data) => {
        if (!ignore) {
          setCar(data);
          setError(null);
        }
      })
      .catch((err) => {
        if (!ignore) {
          setError(err.message || "Błąd pobierania danych");
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
  }, [id]);

  const handleDelete = async () => {
    if (!id) return;
    const confirmed = window.confirm("Czy na pewno chcesz usunąć ten samochód?");
    if (!confirmed) return;

    try {
      await deleteCar(id);
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

  return (
    <div className="flex min-h-screen w-full flex-col items-center px-6 py-8">
      <div className="flex flex-col border border-gray-500 rounded-md w-full max-w-2xl p-6 bg-neutral-800">
        <div className="flex justify-between items-center mb-6 border-b border-gray-700 pb-4">
          <h1 className="text-2xl font-bold">
            {car.brand} {car.model}
          </h1>
          <span className="text-xs text-gray-400 bg-neutral-900 border border-gray-700 px-3 py-1 rounded">
            ID: {car.id}
          </span>
        </div>

        <div className="flex flex-col gap-2 text-sm text-gray-300 mb-6">
          <p>
            <strong className="text-white">Data produkcji:</strong> {car.productionDate}
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
