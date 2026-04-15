import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { getTourById, uiText } from "@/data/tours";
import { useTour } from "@/context/TourContext";
import { BottomNav } from "@/components/BottomNav";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

export default function TourDetailPage() {
  const { tourId } = useParams<{ tourId: string }>();
  const navigate = useNavigate();
  const { setCurrentTour, getProgress, currentTourId } = useTour();
  const tour = tourId ? getTourById(tourId) : null;

  if (!tour) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center p-6 text-center">
        <h1 className="font-display text-2xl font-bold">Tur ikke funnet</h1>
        <p className="mt-2 text-muted-foreground">Denne turen finnes ikke.</p>
        <Button asChild className="mt-4">
          <Link to="/turer">Se alle turer</Link>
        </Button>
      </div>
    );
  }

  // Set this as current tour if not already
  if (currentTourId !== tour.id) {
    setCurrentTour(tour.id);
  }

  const progress = getProgress();
  const progressPercent = progress.total > 0 ? (progress.unlocked / progress.total) * 100 : 0;

  return (
    <div className="flex min-h-screen flex-col pb-20">
      {/* Hero Image */}
      <div className="relative h-56 overflow-hidden">
        <img
          src={tour.coverImage}
          alt={tour.title}
          className="w-full h-full object-cover"
          crossOrigin="anonymous"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        <button
          onClick={() => navigate("/turer")}
          className="absolute top-4 left-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm text-white"
        >
          <ArrowLeftIcon className="h-5 w-5" />
        </button>
        <div className="absolute bottom-4 left-4 right-4">
          <h1 className="font-display text-2xl font-bold text-white">{tour.title}</h1>
          <p className="text-white/80">{tour.subtitle}</p>
        </div>
      </div>

      <main className="flex-1 px-4 py-6">
        {/* Progress */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 rounded-xl border bg-card p-4"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Din fremgang</span>
            <span className="text-sm text-muted-foreground">
              {progress.unlocked} av {progress.total} stopp
            </span>
          </div>
          <Progress value={progressPercent} className="h-2" />
        </motion.div>

        {/* Info */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-6"
        >
          <p className="text-muted-foreground">{tour.description}</p>
          
          <div className="mt-4 flex gap-4 text-sm">
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <ClockIcon className="h-4 w-4" />
              {tour.estimatedTime}
            </div>
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <RouteIcon className="h-4 w-4" />
              {tour.distance}
            </div>
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <MapPinIcon className="h-4 w-4" />
              {tour.stops.length} stopp
            </div>
          </div>
        </motion.div>

        {/* How it works */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-6 rounded-xl bg-muted/50 border p-4"
        >
          <p className="font-medium text-foreground">{uiText.howItWorksLabel}</p>
          <p className="mt-1 text-sm text-muted-foreground">{tour.howItWorks}</p>
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col gap-3"
        >
          <Button asChild size="lg" className="h-14 rounded-xl text-base font-semibold">
            <Link to={`/tur/${tour.id}/stopp`}>Se alle stopp</Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="h-14 rounded-xl text-base">
            <Link to={`/tur/${tour.id}/kart`}>{uiText.mapButton}</Link>
          </Button>
          <Button asChild variant="secondary" size="lg" className="h-14 rounded-xl text-base">
            <Link to="/skann">{uiText.scanQr}</Link>
          </Button>
        </motion.div>
      </main>

      <BottomNav />
    </div>
  );
}

function ArrowLeftIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="m12 19-7-7 7-7" /><path d="M19 12H5" />
    </svg>
  );
}

function ClockIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function RouteIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="6" cy="19" r="3" /><path d="M9 19h8.5a3.5 3.5 0 0 0 0-7h-11a3.5 3.5 0 0 1 0-7H15" /><circle cx="18" cy="5" r="3" />
    </svg>
  );
}

function MapPinIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" />
    </svg>
  );
}
