import React, { useEffect } from "react";
import { getCarById } from "../services/carService";
import { bodyType, fuelType, type Car } from "../models/Car";
import { useParams } from "react-router";
import NotFoundPage from "./NotFoundPage";
export default function CarDetailsPage() {
  const [car, setCar] = React.useState<Car | null>(null);
  const [loading, setLoading] = React.useState<boolean>(true);
  const { id } = useParams<{ id: string }>();
  if (!id) {
    return <NotFoundPage />;
  }
  useEffect(() => {
    getCarById(id).then((data) => {
      setCar(data);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!car) {
    return <NotFoundPage />;
  }

  return (
    <div className="flex min-h-screen w-full flex-col items-center px-6 py-16">
      <div className="flex flex-col border border-gray-500 rounded-md w-3/4 p-4">
        <h1 className="text-2xl font-bold mb-4">
          {car.brand} {car.model}
        </h1>
        <p className="mb-2">Data Produkcji: {car.productionDate}</p>
        <p className="mb-2">Typ nadwozia: {bodyType[car.bodyType]}</p>
        <p className="mb-2">Liczba drzwi: {car.doorsNumber}</p>
        <p className="mb-2">Pojemność bagażnika: {car.luggageCapacity} l</p>
        <p className="mb-2">Pojemność silnika: {car.engineCapacity} cm³</p>
        <p className="mb-2">Typ paliwa: {fuelType[car.fuelType]}</p>
        <p className="mb-2">Średnie zużycie paliwa: {car.averageFuelConsumption} l/100km</p>
      </div>
    </div>
  );
}
