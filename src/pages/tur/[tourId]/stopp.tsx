import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { getTourById, uiText } from "@/data/tours";
import { useTour } from "@/context/TourContext";
import { BottomNav } from "@/components/BottomNav";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function TourStopsPage() {
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

  return (
    <div className="flex min-h-screen flex-col pb-20">
      <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur-md">
        <div className="flex h-14 items-center px-4">
          <Link to={`/tur/${tour.id}`} className="mr-3">
            <ArrowLeftIcon className="h-5 w-5" />
          </Link>
          <div className="flex-1">
            <h1 className="font-display text-lg font-bold">{tour.title}</h1>
            <p className="text-xs text-muted-foreground">
              {progress.unlocked} av {progress.total} stopp fullfort
            </p>
          </div>
          <Link to="/skann" className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <QrCodeIcon className="h-4 w-4" />
          </Link>
        </div>
      </header>

      <main className="flex-1 px-4 py-4">
        <div className="space-y-3">
          {tour.stops.map((stop, index) => {
            const unlocked = isStopUnlocked(stop.id);
            const isFirst = index === 0;
            const previousUnlocked = index === 0 || isStopUnlocked(tour.stops[index - 1].id);

            return (
              <motion.div
                key={stop.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Link
                  to={unlocked || isFirst ? `/tur/${tour.id}/stopp/${stop.id}` : "#"}
                  className={cn(
                    "flex items-center gap-4 rounded-xl border p-4 transition-all",
                    unlocked ? "bg-card hover:shadow-md" : "bg-muted/30 opacity-70"
                  )}
                  onClick={(e) => {
                    if (!unlocked && !isFirst) e.preventDefault();
                  }}
                >
                  <div
                    className={cn(
                      "flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold",
                      unlocked
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                    )}
                  >
                    {unlocked ? (
                      <CheckIcon className="h-5 w-5" />
                    ) : (
                      stop.order
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className={cn(
                      "font-medium truncate",
                      !unlocked && !isFirst && "text-muted-foreground"
                    )}>
                      {stop.title}
                    </h3>
                    <p className="text-xs text-muted-foreground truncate">
                      {unlocked || isFirst ? stop.description : stop.locationHint || uiText.scanToUnlock}
                    </p>
                  </div>

                  {(unlocked || isFirst) && (
                    <ChevronRightIcon className="h-5 w-5 text-muted-foreground shrink-0" />
                  )}
                  {!unlocked && !isFirst && (
                    <LockIcon className="h-4 w-4 text-muted-foreground shrink-0" />
                  )}
                </Link>
              </motion.div>
            );
          })}
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
