import { bodyType, type Car } from "../models/Car";
import { Link } from "react-router";

interface CarCardProps {
  car: Car;
  onDelete?: (id: string) => void;
}

export default function CarCard({ car, onDelete }: CarCardProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 rounded-lg border border-gray-500 bg-neutral-800 p-4 shadow-md w-full">
      <h3 className="text-lg px-2 font-bold text-center">
        {car.brand} {car.model}{" "}
        <span className="text-xs text-gray-400">
          ({car.productionDate ? car.productionDate.split("-")[0] : ""})
        </span>
      </h3>
      <p className="text-sm text-gray-400">{bodyType[car.bodyType] ?? car.bodyType}</p>
      <div className="flex flex-row gap-2 w-full text-sm mt-2">
        <Link
          to={`/cars/${car.id}`}
          className="rounded-md border flex-1 border-blue-500 p-2 text-center text-white hover:bg-blue-600"
        >
          Szczegóły
        </Link>
        <Link
          to={`/cars/${car.id}/edit`}
          className="rounded-md border flex-1 border-yellow-500 p-2 text-center text-white hover:bg-yellow-600"
        >
          Edytuj
        </Link>
        <button
          type="button"
          onClick={() => onDelete?.(car.id)}
          className="rounded-md border flex-1 border-red-500 p-2 text-center text-white hover:bg-red-600 cursor-pointer"
        >
          Usuń
        </button>
      </div>
    </div>
  );
}
