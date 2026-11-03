import React, { useEffect, useState } from "react";
import { getCars } from "../services/carService";
import type { Car } from "../models/Car";
import CarCard from "../components/CarCard";

export default function CarsPage() {
  const [cars, setCars] = useState<Car[]>([]);
  useEffect(() => {
    getCars().then((data) => setCars(data));
  }, []);
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center px-6 py-16">
      <div className="flex flex-row w-3/4 justify-between flex-wrap gap-6">
        {cars.map((car) => (
          <div key={car.id}>
            <CarCard car={car} />
          </div>
        ))}
      </div>
    </div>
  );
}
