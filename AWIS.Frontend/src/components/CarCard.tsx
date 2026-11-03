import { bodyType, type Car } from '../models/Car'
import { NavLink } from "react-router";
export default function CarCard({ car }: { car: Car }) {

    
  return (
    <div className="flex flex-col items-center justify-center gap-2 rounded-lg border border-gray-500 bg-neutral-800 p-4 shadow-md">
      <h3 className="text-lg px-5 font-bold">{car.brand} {car.model} <span className="text-xs text-gray-500">({car.productionDate.split('-')[0]})</span> </h3>
      <p className="text-sm text-gray-400"> {bodyType[car.bodyType]}</p>
      <div className="flex flex-row gap-2 w-full text-sm" >
        <button className="rounded-md border w-1/2 border-blue-500 p-2 text-white hover:bg-blue-600"><NavLink to={`/cars/${car.id}`}>Szczegóły</NavLink></    button>
        <button className="rounded-md border w-1/2 border-red-500 p-2 text-white hover:bg-red-600">Usuń</button>
      </div>
    </div>
  )
}
