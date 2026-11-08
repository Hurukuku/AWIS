import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router";
import axios from "axios";
import { getCarById, updateCar } from "../services/carService";
import type { Car, NewCar } from "../models/Car";
import NotFoundPage from "./NotFoundPage";
import Loading from "../components/Loading";
import CarForm from "../components/CarForm";

export default function EditCarPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [car, setCar] = useState<Car | null>(null);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

          const controller = new AbortController();

          async function loadCar() {
            try {
              setLoading(true);
              setFetchError(null);

              const loadedCar = await getCarById(id!, controller.signal);
              setCar(loadedCar);
            } catch (caughtError) {
              if (axios.isCancel(caughtError)) {
                return;
              }

          if (caughtError instanceof Error) {
            setFetchError(caughtError.message);
          } else {
            setFetchError("Wystąpił nieznany błąd.");
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

const handleUpdate = async (formData: NewCar) => {
  if (!id) return;
  await updateCar(id, formData);
  navigate(`/cars/${id}`);
};

if (!id) {
  return <NotFoundPage />;
}

if (loading) {
  return <Loading message="Ładowanie danych samochodu..." />;
}

if (fetchError || !car) {
  return (
    <div className="p-8 text-center text-red-400">
      <p>Nie udało się pobrać samochodu: {fetchError}</p>
      <Link to="/cars" className="mt-4 inline-block text-blue-400 hover:underline">
        Wróć do listy
      </Link>
    </div>
  );
}

return (
  <div className="flex min-h-screen w-full flex-col items-center px-6 py-8">
    <div className="flex flex-col border border-gray-500 rounded-md w-full max-w-2xl p-6 bg-neutral-800">
      <h1 className="text-2xl font-bold mb-6">
        Edytuj samochód: {car.brand} {car.model}
      </h1>
      <CarForm
        initialValues={car}
        onSubmit={handleUpdate}
        submitButtonText="Zapisz zmiany"
        cancelPath={`/cars/${id}`}
      />
    </div>
  </div>
);
}
