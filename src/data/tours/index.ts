// ============================================
// KYSTSTI — TUR SAMLING
// ============================================
// For å legge til en ny tur:
// 1. Opprett en ny fil i denne mappen (f.eks. min-nye-tur.ts)
// 2. Kopier strukturen fra en eksisterende turfil
// 3. Importer turen her og legg den til i tourModules-arrayen
// ============================================

import type { Tour, TourStop } from "./types";

// --- IMPORTER ALLE TURER HER ---
import kristiansundByvandring from "./kristiansund-byvandring";
import kyststiNordlandet from "./kyststi-nordlandet";
import atlanterhavsvegen from "./atlanterhavsvegen";
import historicalWalkKristiansund from "./historical-walk-kristiansund";

// --- LEGG TIL NYE TURER I DENNE LISTEN ---
const tourModules: Tour[] = [
  kristiansundByvandring,
  kyststiNordlandet,
  atlanterhavsvegen,
  historicalWalkKristiansund
];

// --- EKSPORTER ALLE TURER ---
export const tours: Tour[] = tourModules;

// --- RE-EKSPORTER TYPER ---
export type { Tour, TourStop };

// --- HJELPEFUNKSJONER ---
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

// --- UI TEKSTER ---
export const uiText = {
  startButton: "Start tur",
  mapButton: "Se kart",
  howItWorksLabel: "Slik fungerer det:",
  stopUnlockedBanner: "Stopp last opp! Du har skannet QR-koden.",
  nextStopLabel: "Neste stopp:",
  findQrHint: "Finn QR-koden der for a lase opp!",
  lockedLabel: "Last",
  scanToUnlock: "Skann QR-koden ved dette stoppet",
  showDistance: "Vis avstand fra meg",
  fetchingLocation: "Henter posisjon...",
  openInMaps: "Apne i Google Maps",
  seeDetails: "Se detaljer",
  backToList: "Tilbake til listen",
  stopNotFound: "Stopp ikke funnet",
  stopNotFoundDesc: "Denne QR-koden er ugyldig eller stoppet er fjernet.",
  unlockedCount: (n: number, total: number) => `${n} av ${total} stopp last opp`,
  stopLabel: (n: number) => `Stopp ${n}`,
  stopOfTotal: (n: number, total: number) => `Stopp ${n} av ${total}`,
  distanceLabel: (km: number) =>
    km < 1 ? `${Math.round(km * 1000)} m` : `${km.toFixed(1)} km`,
  chooseTour: "Velg en tur",
  allTours: "Alle turer",
  difficulty: {
    lett: "Lett",
    moderat: "Moderat",
    krevende: "Krevende",
  },
  scanQr: "Skann QR",
  audioPlay: "Spill av",
  audioPause: "Pause",
  audioLoading: "Laster lyd...",
};

// --- KARTFARGER ---
export const mapColors = {
  unlockedPin: "#2d6a4f",
  lockedPin: "#9ca3af",
};
