import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTour } from "@/context/TourContext";
import { useTranslation } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";
import { tours } from "@/data/tours";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

interface TourSelectorProps {
  onTourSelected?: () => void;
}

export function TourSelector({ onTourSelected }: TourSelectorProps) {
  const { currentTourId, setCurrentTour } = useTour();
  const { language } = useTranslation();
  const { isDark } = useTheme();
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
        return isDark
          ? "bg-green-900/30 text-green-400 border border-green-800"
          : "bg-green-100 text-green-700 border border-green-200";
      case "moderat":
        return isDark
          ? "bg-amber-900/30 text-amber-400 border border-amber-800"
          : "bg-amber-100 text-amber-700 border border-amber-200";
      case "krevende":
        return isDark
          ? "bg-red-900/30 text-red-400 border border-red-800"
          : "bg-red-100 text-red-700 border border-red-200";
      default:
        return isDark
          ? "bg-muted text-muted-foreground border border-border"
          : "bg-gray-100 text-gray-700 border border-gray-200";
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
      <motion.button
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "w-full flex items-center justify-between px-4 py-3 rounded-xl border transition-all",
          isDark
            ? "bg-card border-border hover:border-primary/50 hover:bg-card/80"
            : "bg-background border-border hover:border-primary/50 hover:bg-muted/30"
        )}
      >
        <div className="flex-1 text-left">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            {language === "no" ? "Velg tur" : "Select tour"}
          </p>
          <p className={cn(
            "font-display font-bold mt-1 truncate",
            isDark ? "text-foreground" : "text-foreground"
          )}>
            {currentTour
              ? typeof currentTour.title === "object"
                ? currentTour.title[language as "no" | "en"]
                : currentTour.title
              : language === "no"
              ? "Ingen tur valgt"
              : "No tour selected"}
          </p>
        </div>
        <ChevronDown
          className={cn(
            "w-5 h-5 text-muted-foreground transition-transform shrink-0 ml-2",
            isOpen && "rotate-180"
          )}
        />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-40"
            />

            {/* Dropdown */}
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.96 }}
              transition={{ duration: 0.15 }}
              className={cn(
                "absolute top-full left-0 right-0 mt-2 rounded-xl border shadow-xl z-50 max-h-96 overflow-y-auto",
                isDark
                  ? "bg-card border-border/80"
                  : "bg-background border-border/80"
              )}
            >
              <div className="divide-y divide-border/50">
                {tours.map((tour, index) => {
                  const isSelected = currentTourId === tour.id;
                  return (
                    <motion.button
                      key={tour.id}
                      initial={{ opacity: 0, x: -4 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.03 }}
                      onClick={() => handleSelectTour(tour.id)}
                      className={cn(
                        "w-full px-4 py-3.5 text-left transition-all",
                        isSelected
                          ? isDark
                            ? "bg-primary/10 hover:bg-primary/15"
                            : "bg-primary/5 hover:bg-primary/10"
                          : isDark
                          ? "hover:bg-muted/50"
                          : "hover:bg-muted/30"
                      )}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <p className="font-semibold truncate">
                              {typeof tour.title === "object"
                                ? tour.title[language as "no" | "en"]
                                : tour.title}
                            </p>
                            {isSelected && (
                              <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground"
                              >
                                <CheckIcon className="h-3 w-3" />
                              </motion.div>
                            )}
                          </div>
                          <p className={cn(
                            "text-xs mt-1 line-clamp-1",
                            isDark
                              ? "text-muted-foreground"
                              : "text-muted-foreground"
                          )}>
                            {typeof tour.subtitle === "object"
                              ? tour.subtitle[language as "no" | "en"]
                              : tour.subtitle}
                          </p>
                          <div className="flex items-center gap-2 mt-2 flex-wrap">
                            <span
                              className={cn(
                                "text-xs px-2 py-1 rounded-full font-medium",
                                getDifficultyColor(tour.difficulty)
                              )}
                            >
                              {getDifficultyLabel(tour.difficulty)}
                            </span>
                            <span className={cn(
                              "text-xs",
                              isDark
                                ? "text-muted-foreground"
                                : "text-muted-foreground"
                            )}>
                              {tour.distance} • {tour.stops.length}{" "}
                              {language === "no" ? "stopp" : "stops"}
                            </span>
                          </div>
                        </div>
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={3}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}
