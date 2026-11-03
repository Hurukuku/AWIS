import React from "react";
import { useNavigate } from "react-router";
import { createCar } from "../services/carService";
import type { NewCar } from "../models/Car";
import CarForm from "../components/CarForm";

export default function CreateCarPage() {
  const navigate = useNavigate();

  const handleCreate = async (formData: NewCar) => {
    const created = await createCar(formData);
    navigate(`/cars/${created.id}`);
  };

  return (
    <div className="flex min-h-screen w-full flex-col items-center px-6 py-8">
      <div className="flex flex-col border border-gray-500 rounded-md w-full max-w-2xl p-6 bg-neutral-800">
        <h1 className="text-2xl font-bold mb-6">Dodaj nowy samochód</h1>
        <CarForm
          onSubmit={handleCreate}
          submitButtonText="Dodaj samochód"
          cancelPath="/cars"
        />
      </div>
    </div>
  );
}
