import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Tour, TourStop, getTourById } from "@/data/tours";
import { useAuth } from "./AuthContext";
import { saveTourToFirestore, getUserTours, getTourById as getTourFromFirestore, deleteTourFromFirestore, updateTourInFirestore } from "@/lib/firestore";

export interface TourContextType {
  currentTourId: string | null;
  currentTour: Tour | null;
  unlockedStops: Set<string>;
  userTours: Tour[];
  setCurrentTour: (tourId: string) => void;
  unlockStop: (stopId: string) => void;
  isStopUnlocked: (stopId: string) => boolean;
  getProgress: () => { unlocked: number; total: number };
  clearTour: () => void;
  saveTour: (tour: Tour) => Promise<void>;
  deleteTour: (tourId: string) => Promise<void>;
  loadUserTours: () => Promise<void>;
  qrActive?: boolean;
}

export const TourContext = createContext<TourContextType | undefined>(undefined);

const STORAGE_KEY_TOUR = "kyststi-current-tour";
const STORAGE_KEY_UNLOCKED = "kyststi-unlocked-stops";

export function TourProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [currentTourId, setCurrentTourId] = useState<string | null>(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem(STORAGE_KEY_TOUR);
    }
    return null;
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

  const [userTours, setUserTours] = useState<Tour[]>([]);
  const [loading, setLoading] = useState(false);

  // Load user tours from Firebase when user logs in
  useEffect(() => {
    if (user) {
      loadUserTours();
    } else {
      setUserTours([]);
    }
  }, [user]);

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

    setUnlockedStops((prev) => {
      const next = new Set(prev);
      next.add(stopId);
      return next;
    });

    // Save progress to Firebase if user is logged in
    if (user && currentTour) {
      const updatedTour = {
        ...currentTour,
        unlockedStops: Array.from(new Set([...unlockedStops, stopId])),
      };
      updateTourInFirestore(user.uid, updatedTour).catch(console.error);
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

  const saveTour = async (tour: Tour) => {
    if (!user) {
      throw new Error("Du må være logget inn for å lagre turer");
    }
    try {
      await saveTourToFirestore(user.uid, tour);
      setUserTours((prev) => [...prev, tour]);
    } catch (error) {
      console.error("Error saving tour:", error);
      throw error;
    }
  };

  const deleteTour = async (tourId: string) => {
    if (!user) {
      throw new Error("Du må være logget inn for å slette turer");
    }
    try {
      await deleteTourFromFirestore(user.uid, tourId);
      setUserTours((prev) => prev.filter((t) => t.id !== tourId));
    } catch (error) {
      console.error("Error deleting tour:", error);
      throw error;
    }
  };

  const loadUserTours = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const tours = await getUserTours(user.uid);
      setUserTours(tours);
    } catch (error) {
      console.error("Error loading user tours:", error);
    } finally {
      setLoading(false);
    }
  };

  const qrActive = import.meta.env.VITE_ENABLE_QR_SCANNER === "true";

  return (
    <TourContext.Provider
      value={{
        currentTourId,
        currentTour,
        unlockedStops,
        userTours,
        setCurrentTour,
        unlockStop,
        isStopUnlocked,
        getProgress,
        clearTour,
        saveTour,
        deleteTour,
        loadUserTours,
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
