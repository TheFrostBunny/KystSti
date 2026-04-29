import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTour } from "@/context/TourContext";
import { useTranslation } from "@/context/LanguageContext";
import { tours } from "@/data/tours";
import Button from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

interface TourSelectorProps {
  onTourSelected?: () => void;
}

export function TourSelector({ onTourSelected }: TourSelectorProps) {
  const { currentTourId, setCurrentTour } = useTour();
  const { language } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const currentTour = tours.find((t) => t.id === currentTourId);

  const handleSelectTour = (tourId: string) => {
    setCurrentTour(tourId);
    setIsOpen(false);
    onTourSelected?.();
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "lett":
        return "bg-green-100 text-green-800";
      case "moderat":
        return "bg-yellow-100 text-yellow-800";
      case "krevende":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getDifficultyLabel = (difficulty: string) => {
    const labels = {
      lett: language === "no" ? "Lett" : "Easy",
      moderat: language === "no" ? "Moderat" : "Moderate",
      krevende: language === "no" ? "Krevende" : "Challenging",
    };
    return labels[difficulty as keyof typeof labels] || difficulty;
  };

  return (
    <div className="relative w-full">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-4 py-3 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
      >
        <div className="flex-1 text-left">
          <p className="text-sm text-gray-600">
            {language === "no" ? "Velg tur:" : "Choose tour:"}
          </p>
          <p className="font-semibold text-gray-900">
            {currentTour
              ? typeof currentTour.title === "object"
                ? currentTour.title[language as "no" | "en"]
                : currentTour.title
              : language === "no"
              ? "Velg en tur"
              : "Select a tour"}
          </p>
        </div>
        <ChevronDown
          className={`w-5 h-5 text-gray-600 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-300 rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto"
          >
            {tours.map((tour) => (
              <button
                key={tour.id}
                onClick={() => handleSelectTour(tour.id)}
                className={`w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0 ${
                  currentTourId === tour.id ? "bg-green-50" : ""
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900">
                      {typeof tour.title === "object"
                        ? tour.title[language as "no" | "en"]
                        : tour.title}
                    </p>
                    <p className="text-sm text-gray-600 mt-1">
                      {typeof tour.subtitle === "object"
                        ? tour.subtitle[language as "no" | "en"]
                        : tour.subtitle}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${getDifficultyColor(
                          tour.difficulty
                        )}`}
                      >
                        {getDifficultyLabel(tour.difficulty)}
                      </span>
                      <span className="text-xs text-gray-500">
                        {tour.distance} • {tour.stops.length}{" "}
                        {language === "no" ? "stopp" : "stops"}
                      </span>
                    </div>
                  </div>
                  {currentTourId === tour.id && (
                    <div className="text-green-600 font-bold">✓</div>
                  )}
                </div>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
