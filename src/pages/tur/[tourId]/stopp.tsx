import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { getTourById, uiText } from "@/data/tours";
import { useTour } from "@/context/TourContext";
import { useTranslation } from "@/context/LanguageContext";
import { BottomNav } from "@/components/BottomNav";
import Button from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";

export default function TourStopsPage() {
  const { t, language } = useTranslation();
  const { tourId } = useParams<{ tourId: string }>();
  const { isStopUnlocked, getProgress } = useTour();
  const tour = tourId ? getTourById(tourId) : null;

  if (!tour) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center p-6 text-center">
        <h1 className="font-display text-2xl font-bold">Tur ikke funnet</h1>
        <Button asChild className="mt-4">
          <Link to="/turer">Se alle turer</Link>
        </Button>
      </div>
    );
  }

  const progress = getProgress();
  const progressPercent = progress.total > 0 ? (progress.unlocked / progress.total) * 100 : 0;

  return (
    <div className="flex min-h-screen flex-col pb-20">
      <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur-md">
        <div className="mx-auto max-w-4xl flex h-14 items-center px-4">
          <Link to={`/`} className="mr-3 p-2 -ml-2">
            <ArrowLeftIcon className="h-5 w-5" />
          </Link>
          <div className="flex-1">
            <h1 className="font-display text-lg font-bold truncate">{typeof tour.title === 'object' ? tour.title[language] : tour.title}</h1>
          </div>
          <Button asChild variant="ghost" size="icon" className="w-10 h-10">
            <Link to={`/tur/${tour.id}/kart`}>
              <MapIcon className="h-5 w-5" />
            </Link>
          </Button>
        </div>
        <div className="mx-auto max-w-4xl px-4 pb-2">
          <Progress value={progressPercent} className="h-1" />
          <p className="text-xs text-muted-foreground mt-1 text-right">
            {progress.unlocked} av {progress.total} stopp fullført
          </p>
        </div>
      </header>

      <main className="flex-1">
        <div className="mx-auto max-w-4xl relative">
          {/* Vertical line */}
          <div className="absolute left-8 top-10 bottom-10 w-0.5 bg-border" />

          <div className="space-y-2 p-4">
            {tour.stops
              .filter((stop, index) => {
                // Show stop if: it's unlocked, it's the first stop, or it's the next locked stop
                const isUnlocked = isStopUnlocked(stop.id);
                const isFirst = index === 0;
                const isNextLocked = index > 0 && !isUnlocked && tour.stops.slice(0, index).every(s => isStopUnlocked(s.id) || tour.stops.indexOf(s) === 0);
                return isUnlocked || isFirst || isNextLocked;
              })
              .map((stop, index) => {
                const unlocked = isStopUnlocked(stop.id);
                const isFirst = stop.order === 1;

                return (
                  <motion.div
                    key={stop.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.07 }}
                    className="relative pl-12"
                  >
                    {/* Dot on the line */}
                    <div className={cn(
                      "absolute left-8 top-7 -translate-x-1/2 w-3 h-3 rounded-full border-2",
                      unlocked ? "bg-primary border-primary-foreground" : "bg-muted border-muted-foreground/30"
                    )} />

                    <Link
                      to={unlocked || isFirst ? `/tur/${tour.id}/stopp/${stop.id}` : "#"}
                      className={cn(
                        "block rounded-xl border p-4 transition-all",
                        unlocked ? "bg-card hover:shadow-md" : "bg-muted/40",
                        !unlocked && !isFirst && "pointer-events-none opacity-60"
                      )}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1 min-w-0">
                          <p className="text-xs text-muted-foreground">Stopp {stop.order}</p>
                          <h3 className="font-medium truncate mt-0.5">
                            {typeof stop.title === 'object' ? stop.title[language] : stop.title}
                          </h3>
                        </div>
                        <div className="ml-4 shrink-0">
                          {unlocked ? (
                            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-green-100 text-green-700">
                              <CheckIcon className="h-4 w-4" />
                            </div>
                          ) : (
                            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-muted">
                              <LockIcon className="h-4 w-4 text-muted-foreground" />
                            </div>
                          )}
                        </div>
                      </div>
                      {(unlocked || isFirst) && (
                        <p className="text-xs text-muted-foreground mt-2 truncate">
                          {typeof stop.description === 'object' ? stop.description[language] : stop.description}
                        </p>
                      )}
                    </Link>
                  </motion.div>
                );
              })}
          </div>
        </div>
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

function QrCodeIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect width="5" height="5" x="3" y="3" rx="1" /><rect width="5" height="5" x="16" y="3" rx="1" /><rect width="5" height="5" x="3" y="16" rx="1" /><path d="M21 16h-3a2 2 0 0 0-2 2v3" /><path d="M21 21v.01" /><path d="M12 7v3a2 2 0 0 1-2 2H7" /><path d="M3 12h.01" /><path d="M12 3h.01" /><path d="M12 16v.01" /><path d="M16 12h1" /><path d="M21 12v.01" /><path d="M12 21v-1" />
    </svg>
  );
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

function ChevronRightIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}

function LockIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect width="18" height="11" x="3" y="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}

function MapIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" />
    </svg>
  );
}
