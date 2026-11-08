import React, { useState } from "react";
import { Link } from "react-router";
import { bodyType, fuelType, type NewCar } from "../models/Car";
import { formatDateForInput } from "../utils/dateUtils";

interface CarFormProps {
  initialValues?: NewCar;
  onSubmit: (car: NewCar) => Promise<void> | void;
  submitButtonText?: string;
  cancelPath?: string;
}

const defaultValues: NewCar = {
  brand: "",
  model: "",
  doorsNumber: 5,
  luggageCapacity: 450,
  engineCapacity: 1600,
  fuelType: 0,
  productionDate: new Date().toISOString().split("T")[0],
  averageFuelConsumption: 6.0,
  bodyType: 0,
};

export default function CarForm({
  initialValues = defaultValues,
  onSubmit,
  submitButtonText = "Zapisz",
  cancelPath = "/cars",
}: CarFormProps) {
  const [formData, setFormData] = useState<NewCar>(() => ({
    ...initialValues,
    productionDate: formatDateForInput(initialValues.productionDate),
  })); 1
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "number" || name === "fuelType" || name === "bodyType"
          ? Number(value)
          : value,
    }));
  };

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      await onSubmit(formData);
    } catch (err: any) {
      setError(err.message || "Wystąpił błąd podczas zapisywania");
      setSubmitting(false);
    }
  };

  return (
    <div>
      {error && (
        <div className="mb-4 p-3 border border-red-500 bg-red-900/30 text-red-200 rounded">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label className="block text-sm mb-1 text-gray-300">Marka</label>
          <input
            type="text"
            name="brand"
            required
            value={formData.brand}
            onChange={handleChange}
            className="w-full rounded border border-gray-600 bg-neutral-900 p-2 text-white"
            placeholder="np. Toyota"
          />
        </div>

        <div>
          <label className="block text-sm mb-1 text-gray-300">Model</label>
          <input
            type="text"
            name="model"
            required
            value={formData.model}
            onChange={handleChange}
            className="w-full rounded border border-gray-600 bg-neutral-900 p-2 text-white"
            placeholder="np. Corolla"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm mb-1 text-gray-300">Liczba drzwi</label>
            <input
              type="number"
              name="doorsNumber"
              min="1"
              max="10"
              required
              value={formData.doorsNumber}
              onChange={handleChange}
              className="w-full rounded border border-gray-600 bg-neutral-900 p-2 text-white"
            />
          </div>

          <div>
            <label className="block text-sm mb-1 text-gray-300">Pojemność bagażnika (l)</label>
            <input
              type="number"
              name="luggageCapacity"
              min="0"
              required
              value={formData.luggageCapacity}
              onChange={handleChange}
              className="w-full rounded border border-gray-600 bg-neutral-900 p-2 text-white"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm mb-1 text-gray-300">Pojemność silnika (cm³)</label>
            <input
              type="number"
              name="engineCapacity"
              min="0"
              required
              value={formData.engineCapacity}
              onChange={handleChange}
              className="w-full rounded border border-gray-600 bg-neutral-900 p-2 text-white"
            />
          </div>

          <div>
            <label className="block text-sm mb-1 text-gray-300">Średnie spalanie (l/100km)</label>
            <input
              type="number"
              name="averageFuelConsumption"
              step="0.1"
              min="0"
              required
              value={formData.averageFuelConsumption}
              onChange={handleChange}
              className="w-full rounded border border-gray-600 bg-neutral-900 p-2 text-white"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm mb-1 text-gray-300">Rodzaj paliwa</label>
            <select
              name="fuelType"
              value={formData.fuelType}
              onChange={handleChange}
              className="w-full rounded border border-gray-600 bg-neutral-900 p-2 text-white"
            >
              {Object.entries(fuelType).map(([key, name]) => (
                <option key={key} value={key}>
                  {name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm mb-1 text-gray-300">Typ nadwozia</label>
            <select
              name="bodyType"
              value={formData.bodyType}
              onChange={handleChange}
              className="w-full rounded border border-gray-600 bg-neutral-900 p-2 text-white"
            >
              {Object.entries(bodyType).map(([key, name]) => (
                <option key={key} value={key}>
                  {name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm mb-1 text-gray-300">Data produkcji</label>
          <input
            type="date"
            name="productionDate"
            required
            value={formData.productionDate}
            onChange={handleChange}
            className="w-full rounded border border-gray-600 bg-neutral-900 p-2 text-white"
          />
        </div>

        <div className="flex gap-4 mt-4">
          <button
            type="submit"
            disabled={submitting}
            className="rounded-md border border-blue-500 bg-blue-600 px-6 py-2 text-white hover:bg-blue-700 disabled:opacity-50 cursor-pointer"
          >
            {submitting ? "Zapisywanie..." : submitButtonText}
          </button>
          <Link
            to={cancelPath}
            className="rounded-md border border-gray-500 px-6 py-2 text-white hover:bg-neutral-700 text-center"
          >
            Anuluj
          </Link>
        </div>
      </form>
    </div>
  );
}

