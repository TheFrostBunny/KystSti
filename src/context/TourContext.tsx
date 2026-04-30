import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Tour, TourStop, getTourById } from "@/data/tours";

export interface TourContextType {
  currentTourId: string | null;
  currentTour: Tour | null;
  unlockedStops: Set<string>;
  setCurrentTour: (tourId: string) => void;
  unlockStop: (stopId: string) => void;
  isStopUnlocked: (stopId: string) => boolean;
  getProgress: () => { unlocked: number; total: number };
  clearTour: () => void;
  qrActive?: boolean;
}

export const TourContext = createContext<TourContextType | undefined>(undefined);

const STORAGE_KEY_TOUR = "kyststi-current-tour";
const STORAGE_KEY_UNLOCKED = "kyststi-unlocked-stops";

export function TourProvider({ children }: { children: ReactNode }) {
  const [currentTourId, setCurrentTourId] = useState<string | null>(() => 
    globalThis?.localStorage?.getItem(STORAGE_KEY_TOUR) ?? null
  );

  const [unlockedStops, setUnlockedStops] = useState<Set<string>>(() => {
    const saved = globalThis?.localStorage?.getItem(STORAGE_KEY_UNLOCKED);
    try {
      return saved ? new Set(JSON.parse(saved)) : new Set();
    } catch {
      return new Set();
    }
  });

  const currentTour = currentTourId ? getTourById(currentTourId) ?? null : null;

  useEffect(() => {
    currentTourId 
      ? globalThis?.localStorage?.setItem(STORAGE_KEY_TOUR, currentTourId)
      : globalThis?.localStorage?.removeItem(STORAGE_KEY_TOUR);
  }, [currentTourId]);

  useEffect(() => {
    globalThis?.localStorage?.setItem(STORAGE_KEY_UNLOCKED, JSON.stringify([...unlockedStops]));
  }, [unlockedStops]);

  const setCurrentTour = (tourId: string) => setCurrentTourId(tourId);

  const unlockStop = (stopId: string) => {
    const stop = currentTour?.stops.find(s => s.id === stopId);
    if (!stop) return;

    setUnlockedStops(prev => new Set([...prev, stopId]));
  };

  const isStopUnlocked = (stopId: string) => unlockedStops.has(stopId);

  const getProgress = () => {
    const tourStops = currentTour?.stops ?? [];
    const tourStopIds = tourStops.map(s => s.id);
    const unlockedInTour = tourStopIds.filter(id => unlockedStops.has(id)).length;
    return { unlocked: unlockedInTour, total: tourStops.length };
  };

  const clearTour = () => setCurrentTourId(null);

  const qrActive = import.meta.env.VITE_ENABLE_QR_SCANNER === "true";

  return (
    <TourContext.Provider
      value={{
        currentTourId,
        currentTour,
        unlockedStops,
        setCurrentTour,
        unlockStop,
        isStopUnlocked,
        getProgress,
        clearTour,
        qrActive,
      }}
    >
      {children}
    </TourContext.Provider>
  );
}

export function useTour() {
  const context = useContext(TourContext);
  if (!context) {
    throw new Error("useTour must be used within a TourProvider");
  }
  return context;
}
