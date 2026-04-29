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
      {tour.coverImage && (
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
      )}

      <main className="flex-1 px-4 py-8 max-w-5xl mx-auto w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {/* Left Column: Info & Description */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <h2 className="text-sm font-bold uppercase tracking-widest text-primary mb-2">Om turen</h2>
              <p className="text-foreground/90 leading-relaxed text-lg">{typeof tour.description === 'object' ? tour.description[language] : tour.description}</p>
              
              <div className="mt-8 grid grid-cols-3 gap-3">
                <div className="flex flex-col items-center justify-center p-4 rounded-2xl bg-card border shadow-sm">
                  <ClockIcon className="h-6 w-6 text-primary mb-1.5" />
                  <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Tid</span>
                  <span className="text-sm font-bold">{typeof tour.estimatedTime === 'object' ? tour.estimatedTime[language] : tour.estimatedTime}</span>
                </div>
                <div className="flex flex-col items-center justify-center p-4 rounded-2xl bg-card border shadow-sm">
                  <RouteIcon className="h-6 w-6 text-primary mb-1.5" />
                  <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Distanse</span>
                  <span className="text-sm font-bold">{tour.distance}</span>
                </div>
                <div className="flex flex-col items-center justify-center p-4 rounded-2xl bg-card border shadow-sm">
                  <MapPinIcon className="h-6 w-6 text-primary mb-1.5" />
                  <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Stopp</span>
                  <span className="text-sm font-bold">{tour.stops.length}</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="rounded-2xl bg-muted/30 border border-dashed border-muted-foreground/20 p-6"
            >
              <h3 className="font-bold text-foreground flex items-center gap-2 mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-primary">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z" clipRule="evenodd" />
                </svg>
                Slik fungerer det
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{typeof tour.howItWorks === 'object' ? tour.howItWorks[language] : tour.howItWorks}</p>
            </motion.div>
          </div>

          {/* Right Column: Progress & Actions */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="rounded-3xl border bg-card p-6 shadow-md"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Din fremgang</span>
                <span className="text-lg font-black text-primary">
                  {progress.unlocked} / {progress.total}
                </span>
              </div>
              <Progress value={progressPercent} className="h-3 bg-muted" />
              <p className="mt-4 text-sm text-muted-foreground leading-relaxed italic">
                {progress.unlocked === 0 ? "Start turen for å låse opp ditt første stopp!" : "Bra jobba! Fortsett turen for å se mer av kysten."}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex flex-col gap-4"
            >
              <Button asChild size="lg" className="h-16 rounded-2xl text-lg font-black shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all">
                <Link to={`/tur/${tour.id}/stopp`}>Fortsett turen</Link>
              </Button>
              <div className="grid grid-cols-2 gap-4">
                <Button asChild variant="outline" size="lg" className="h-14 rounded-2xl font-bold border-2 hover:bg-muted/50 transition-all">
                  <Link to={`/tur/${tour.id}/kart`}>Vis kart</Link>
                </Button>
                <Button asChild variant="secondary" size="lg" className="h-14 rounded-2xl font-bold hover:bg-secondary/80 transition-all">
                  <Link to="/skann">Skann QR</Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
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
