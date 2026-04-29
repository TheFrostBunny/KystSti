import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { getTourById, uiText } from "@/data/tours";
import { useTranslation } from "@/context/LanguageContext";
import { useTour } from "@/context/TourContext";
import { BottomNav } from "@/components/BottomNav";
import Button from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { PageTransition } from "@/components/PageTransition";

export default function TourDetailPage() {
  const { tourId } = useParams<{ tourId: string }>();
  const navigate = useNavigate();
  const { setCurrentTour, getProgress, currentTourId } = useTour();
  const { t, language } = useTranslation();
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

  const stopsText = tour ? (t("stops.stopCount", { count: tour.stops.length }) || `${tour.stops.length} stopp`) : "";

  return (
    <PageTransition className="flex min-h-screen flex-col pb-24">
      {/* Hero Image */}
      <div className="relative h-64 overflow-hidden">
        <img
          src={tour.coverImage}
          alt={typeof tour.title === 'object' ? tour.title[language] : tour.title}
          className="w-full h-full object-cover"
          crossOrigin="anonymous"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />
        <button
          onClick={() => navigate("/")}
          className="absolute top-4 left-4 flex h-10 w-10 items-center justify-center rounded-full bg-black/20 backdrop-blur-md text-white border border-white/20 transition-colors hover:bg-black/40"
        >
          <ArrowLeftIcon className="h-5 w-5" />
        </button>
        <div className="absolute bottom-6 left-6 right-6">
          <h1 className="font-display text-3xl font-bold text-white text-balance">{typeof tour.title === 'object' ? tour.title[language] : tour.title}</h1>
          <p className="text-white/80 mt-1 text-lg">{typeof tour.subtitle === 'object' ? tour.subtitle[language] : tour.subtitle}</p>
        </div>
      </div>

      <main className="flex-1 px-4 py-6 max-w-2xl mx-auto w-full">
        {/* Progress Card */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 rounded-2xl border bg-card p-5 shadow-sm"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Din fremgang</span>
            <span className="text-sm font-bold text-primary">
              {progress.unlocked} av {progress.total} stopp
            </span>
          </div>
          <Progress value={progressPercent} className="h-2.5 bg-muted" />
          <p className="mt-3 text-xs text-muted-foreground italic">
            {progress.unlocked === 0 ? "Start turen for å låse opp ditt første stopp!" : "Bra jobba! Fortsett turen for å se mer."}
          </p>
        </motion.div>

        {/* Info Section */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <p className="text-foreground/90 leading-relaxed text-lg">{typeof tour.description === 'object' ? tour.description[language] : tour.description}</p>
          
          <div className="mt-6 grid grid-cols-3 gap-3">
            <div className="flex flex-col items-center justify-center p-3 rounded-xl bg-primary/5 border border-primary/10">
              <ClockIcon className="h-5 w-5 text-primary mb-1" />
              <span className="text-xs font-medium text-muted-foreground uppercase">Tid</span>
              <span className="text-sm font-bold">{typeof tour.estimatedTime === 'object' ? tour.estimatedTime[language] : tour.estimatedTime}</span>
            </div>
            <div className="flex flex-col items-center justify-center p-3 rounded-xl bg-primary/5 border border-primary/10">
              <RouteIcon className="h-5 w-5 text-primary mb-1" />
              <span className="text-xs font-medium text-muted-foreground uppercase">Distanse</span>
              <span className="text-sm font-bold">{tour.distance}</span>
            </div>
            <div className="flex flex-col items-center justify-center p-3 rounded-xl bg-primary/5 border border-primary/10">
              <MapPinIcon className="h-5 w-5 text-primary mb-1" />
              <span className="text-xs font-medium text-muted-foreground uppercase">Stopp</span>
              <span className="text-sm font-bold">{tour.stops.length}</span>
            </div>
          </div>
        </motion.div>

        {/* How it works */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8 rounded-2xl bg-muted/30 border border-dashed border-muted-foreground/20 p-5"
        >
          <h3 className="font-bold text-foreground flex items-center gap-2 mb-2">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-primary">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z" clipRule="evenodd" />
            </svg>
            {uiText.howItWorksLabel}
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed">{typeof tour.howItWorks === 'object' ? tour.howItWorks[language] : tour.howItWorks}</p>
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col gap-4 mb-8"
        >
          <Button asChild size="lg" className="h-16 rounded-2xl text-lg font-bold shadow-lg shadow-primary/20">
            <Link to={`/tur/${tour.id}/stopp`}>Start turen nå</Link>
          </Button>
          <div className="grid grid-cols-2 gap-4">
            <Button asChild variant="outline" size="lg" className="h-14 rounded-2xl font-semibold border-2">
              <Link to={`/tur/${tour.id}/kart`}>Vis i kart</Link>
            </Button>
            <Button asChild variant="secondary" size="lg" className="h-14 rounded-2xl font-semibold">
              <Link to="/skann">Skann QR</Link>
            </Button>
          </div>
        </motion.div>
      </main>

      <BottomNav />
    </PageTransition>
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
