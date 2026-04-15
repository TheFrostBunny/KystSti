import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { getAllTours, uiText, Tour } from "@/data/tours";
import { useTour } from "@/context/TourContext";
import { BottomNav } from "@/components/BottomNav";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

function TourCard({ tour, index }: { tour: Tour; index: number }) {
  const navigate = useNavigate();
  const { setCurrentTour } = useTour();

  const handleSelectTour = () => {
    setCurrentTour(tour.id);
    navigate(`/tur/${tour.id}`);
  };

  const difficultyColor = {
    lett: "bg-green-100 text-green-800",
    moderat: "bg-yellow-100 text-yellow-800",
    krevende: "bg-red-100 text-red-800",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <Card
        className="overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
        onClick={handleSelectTour}
      >
        <div className="relative h-40 overflow-hidden">
          <img
            src={tour.coverImage}
            alt={tour.title}
            className="w-full h-full object-cover"
            crossOrigin="anonymous"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-3 left-3 right-3">
            <h3 className="font-display text-xl font-bold text-white">{tour.title}</h3>
            <p className="text-sm text-white/80">{tour.subtitle}</p>
          </div>
        </div>
        <CardContent className="p-4">
          <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
            {tour.description}
          </p>
          <div className="flex items-center justify-between">
            <div className="flex gap-2 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <ClockIcon className="h-3.5 w-3.5" />
                {tour.estimatedTime}
              </span>
              <span className="flex items-center gap-1">
                <RouteIcon className="h-3.5 w-3.5" />
                {tour.distance}
              </span>
              <span className="flex items-center gap-1">
                <MapPinIcon className="h-3.5 w-3.5" />
                {tour.stops.length} stopp
              </span>
            </div>
            <Badge className={difficultyColor[tour.difficulty]} variant="secondary">
              {uiText.difficulty[tour.difficulty]}
            </Badge>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export default function ToursPage() {
  const tours = getAllTours();

  return (
    <div className="flex min-h-screen flex-col pb-20">
      <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur-md">
        <div className="flex h-14 items-center justify-center px-4">
          <h1 className="font-display text-lg font-bold">{uiText.allTours}</h1>
        </div>
      </header>

      <main className="flex-1 px-4 py-6">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 text-center"
        >
          <h2 className="font-display text-2xl font-bold">{uiText.chooseTour}</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Velg en av turene nedenfor for a starte opplevelsen
          </p>
        </motion.div>

        <div className="grid gap-4">
          {tours.map((tour, index) => (
            <TourCard key={tour.id} tour={tour} index={index} />
          ))}
        </div>
      </main>

      <BottomNav />
    </div>
  );
}

function ClockIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function RouteIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="6" cy="19" r="3" />
      <path d="M9 19h8.5a3.5 3.5 0 0 0 0-7h-11a3.5 3.5 0 0 1 0-7H15" />
      <circle cx="18" cy="5" r="3" />
    </svg>
  );
}

function MapPinIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}
