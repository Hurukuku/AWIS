export interface Car {
  id: string;
  brand: string;
  model: string;
  doorsNumber: number;
  luggageCapacity: number;
  engineCapacity: number;
  fuelType: number;
  productionDate: string;
  averageFuelConsumption: number;
  bodyType: number;
}

export const fuelType: Record<number, string> = {
  0: "Petrol",
  1: "Diesel",
  2: "Hybrid",
  3: "Electric",
  4: "Lpg",
};

export const bodyType: Record<number, string> = {
  0: "Hatchback",
  1: "Sedan",
  2: "Kombi",
  3: "Suv",
  4: "Roadster",
};

export type NewCar = Omit<Car, "id">;
