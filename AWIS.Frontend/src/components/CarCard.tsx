import { bodyType, type Car } from "../models/Car";
import { Link } from "react-router";
import { useCarUiStore } from "../store/useCarUiStore";
import starIcon from "../assets/Star.svg";
import starEmptyIcon from "../assets/StarEmpty.svg";
import { getYearFromDate } from "../utils/dateUtils";

interface CarCardProps {
  car: Car;
  onDelete?: (id: string) => void;
}

export default function CarCard({ car, onDelete }: CarCardProps) {
  const isFavorite = useCarUiStore((state) =>
    state.favoriteCarIds.includes(car.id),
  );

  const toggleFavorite = useCarUiStore((state) => state.toggleFavorite);

  return (
    <div className="flex flex-col items-center justify-center gap-2 rounded-lg border border-gray-500 bg-neutral-800 p-4 shadow-md w-full">
        <h3 className="text-lg px-2 flex flex-row font-bold w-full justify-between items-center">
          <div>
            {car.brand} {car.model}
            <span className="text-xs p-2 text-gray-400">
              ({getYearFromDate(car.productionDate)})
            </span>
          </div>
          <button
            type="button"
            onClick={() => toggleFavorite(car.id)}
            className={`favorite-button ${isFavorite ? "active-favorite" : ""} p-1 hover:scale-110 transition cursor-pointer`}
            title={isFavorite ? "Usuń z ulubionych" : "Dodaj do ulubionych"}
            aria-label={isFavorite ? "Usuń z ulubionych" : "Dodaj do ulubionych"}
          >
            <img
              src={isFavorite ? starIcon : starEmptyIcon}
              alt={isFavorite ? "Ulubione" : "Dodaj do ulubionych"}
              className="w-5 h-5 invert"
            />
          </button>
        </h3>
        <p className="text-sm w-full text-left px-2 text-gray-400">
          {bodyType[car.bodyType] ?? car.bodyType}
        </p>
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
