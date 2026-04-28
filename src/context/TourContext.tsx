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
  const [currentTourId, setCurrentTourId] = useState<string | null>(() => {
    const envTourId = import.meta.env.VITE_ACTIVE_TOUR_ID || "kristiansund-byvandring";
    if (typeof window !== "undefined") {
      return localStorage.getItem(STORAGE_KEY_TOUR) || envTourId;
    }
    return envTourId;
  });

  const [unlockedStops, setUnlockedStops] = useState<Set<string>>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(STORAGE_KEY_UNLOCKED);
      if (saved) {
        try {
          return new Set(JSON.parse(saved));
        } catch {
          return new Set();
        }
      }
    }
    return new Set();
  });

  const currentTour = currentTourId ? getTourById(currentTourId) || null : null;

  useEffect(() => {
    if (currentTourId) {
      localStorage.setItem(STORAGE_KEY_TOUR, currentTourId);
    } else {
      localStorage.removeItem(STORAGE_KEY_TOUR);
    }
  }, [currentTourId]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_UNLOCKED, JSON.stringify([...unlockedStops]));
  }, [unlockedStops]);

  const setCurrentTour = (tourId: string) => {
    setCurrentTourId(tourId);
  };

  const unlockStop = (stopId: string) => {
    if (!currentTour) return;
    const stop = currentTour.stops.find((s) => s.id === stopId);
    if (!stop) return;

    if (stop.order === 1) {
      setUnlockedStops((prev) => new Set([...prev, stopId]));
      return;
    }
    const previousStops = currentTour.stops.filter(s => s.order < stop.order);
    const allPrevUnlocked = previousStops.every(s => unlockedStops.has(s.id));
    if (allPrevUnlocked) {
      setUnlockedStops((prev) => new Set([...prev, stopId]));
    }
  };

  const isStopUnlocked = (stopId: string) => {
    return unlockedStops.has(stopId);
  };

  const getProgress = () => {
    if (!currentTour) return { unlocked: 0, total: 0 };
    const tourStopIds = currentTour.stops.map((s) => s.id);
    const unlockedInTour = tourStopIds.filter((id) => unlockedStops.has(id)).length;
    return { unlocked: unlockedInTour, total: currentTour.stops.length };
  };

  const clearTour = () => {
    setCurrentTourId(null);
  };

  const qrActive = import.meta.env.VITE_ENABLE_QR_SCANNER === "true"; // Hent QR-skanner status fra miljøvariabelen

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
