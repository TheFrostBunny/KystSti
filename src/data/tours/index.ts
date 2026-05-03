import type { Tour, TourStop } from "./types";


const tourModules = Object.values(
  import.meta.glob('./tours/*.ts', { eager: true })
).map((mod: any) => mod.default).filter(Boolean) as Tour[];

export const tours: Tour[] = tourModules;

export type { Tour, TourStop };

export function getTourById(tourId: string): Tour | undefined {
  return tours.find((tour) => tour.id === tourId);
}

export function getStopById(tourId: string, stopId: string): TourStop | undefined {
  const tour = getTourById(tourId);
  return tour?.stops.find((stop) => stop.id === stopId);
}

export function getAllTours(): Tour[] {
  return tours;
}

export const mapColors = {
  unlockedPin: "#2d6a4f",
  lockedPin: "#9ca3af",
};
