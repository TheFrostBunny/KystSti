import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { getAllTours } from "@/data/tours";
import { useTour } from "@/context/TourContext";
import { useTranslation } from "@/context/LanguageContext";
import { BottomNav } from "@/components/BottomNav";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChevronRight, MapPin, Clock, Route } from "lucide-react";

export default function ToursPage() {
  const tours = getAllTours();
  const { setCurrentTour, getProgress } = useTour();
  const { language, t } = useTranslation();

  const difficultyColors = {
    lett: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
    moderat: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
    krevende: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
  };

  const difficultyLabels = {
    lett: { no: "Lett", en: "Easy" },
    moderat: { no: "Moderat", en: "Moderate" },
    krevende: { no: "Krevende", en: "Challenging" },
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <LanguageSwitcher center className="pt-4" />
      
      <div className="flex-1 px-4 pb-24 pt-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mx-auto max-w-2xl"
        >
          <h1 className="mb-2 text-center text-2xl font-bold text-foreground">
            {t("tours.title")}
          </h1>
          <p className="mb-6 text-center text-muted-foreground">
            {t("tours.subtitle")}
          </p>

          <div className="space-y-4">
            {tours.map((tour, index) => {
              const title = typeof tour.title === "object" ? tour.title[language as "no" | "en"] : tour.title;
              const subtitle = typeof tour.subtitle === "object" ? tour.subtitle[language as "no" | "en"] : tour.subtitle;
              const estimatedTime = typeof tour.estimatedTime === "object" ? tour.estimatedTime[language as "no" | "en"] : tour.estimatedTime;

              return (
                <motion.div
                  key={tour.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <Link
                    to={`/tur/${tour.id}`}
                    onClick={() => setCurrentTour(tour.id)}
                    className="block"
                  >
                    <Card className="overflow-hidden transition-all hover:shadow-lg hover:scale-[1.02]">
                      <div className="relative h-40 overflow-hidden">
                        <img
                          src={tour.coverImage}
                          alt={title}
                          className="h-full w-full object-cover"
                          crossOrigin="anonymous"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        <div className="absolute bottom-3 left-3 right-3">
                          <h2 className="text-lg font-semibold text-white line-clamp-1">
                            {title}
                          </h2>
                        </div>
                        <Badge
                          className={`absolute right-3 top-3 ${difficultyColors[tour.difficulty]}`}
                        >
                          {difficultyLabels[tour.difficulty][language as "no" | "en"]}
                        </Badge>
                      </div>
                      <CardContent className="p-4">
                        <p className="mb-3 text-sm text-muted-foreground line-clamp-2">
                          {subtitle}
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <MapPin className="h-3.5 w-3.5" />
                              {tour.stops.length} {t("tours.stops")}
                            </span>
                            <span className="flex items-center gap-1">
                              <Route className="h-3.5 w-3.5" />
                              {tour.distance}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="h-3.5 w-3.5" />
                              {estimatedTime}
                            </span>
                          </div>
                          <ChevronRight className="h-5 w-5 text-muted-foreground" />
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
      
      <BottomNav />
    </div>
  );
}
