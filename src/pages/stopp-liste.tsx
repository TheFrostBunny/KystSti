import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { tourStops, uiText } from "@/data/tourData";
import { appConfig } from "@/config";
import { BottomNav } from "@/components/BottomNav";
import { useUserLocation, getDistanceKm } from "@/hooks/useUserLocation";
import { Button } from "@/components/ui/button";
import { getUnlockedStops } from "@/lib/unlocked";
import { tourInfo } from "@/data/Turinfo";

export default function StopListPage() {
  const { location, loading, requestLocation } = useUserLocation();
  const [unlocked, setUnlocked] = useState<Set<string>>(new Set());

  useEffect(() => {
    setUnlocked(getUnlockedStops());
  }, []);

  if (!appConfig.enableStopList) return null;

  const unlockedCount = tourStops.filter((s) => unlocked.has(s.id)).length;

  // Find the first locked stop (= next stop to visit)
  const nextLockedStop = tourStops.find((s) => !unlocked.has(s.id));

  return (
    <div className="min-h-screen pb-24">
      <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur-md px-4 py-3">
        <h1 className="font-display text-xl font-bold">Alle stopp</h1>
        <p className="text-xs text-muted-foreground mt-0.5">
          {uiText.unlockedCount(unlockedCount, tourStops.length)}
        </p>
        {!location && (
          <Button
            variant="ghost"
            size="sm"
            onClick={requestLocation}
            disabled={loading}
            className="mt-1 text-xs text-primary"
          >
            {loading ? uiText.fetchingLocation : uiText.showDistance}
          </Button>
        )}
      </header>

      <div className="mx-auto max-w-lg space-y-3 p-4">
        {/* Next stop hint */}
        {nextLockedStop && (
          <div className="rounded-xl bg-primary/5 border border-primary/20 p-4 mb-2">
            <p className="text-xs font-semibold text-primary">{uiText.nextStopLabel}</p>
            <p className="font-display text-base font-bold mt-0.5">
              {uiText.stopLabel(nextLockedStop.order)} — ???
            </p>
            {nextLockedStop.locationHint && (
              <p className="text-sm text-muted-foreground mt-1">
                Hint: {nextLockedStop.locationHint}
              </p>
            )}
            <p className="text-xs text-muted-foreground mt-2">{uiText.findQrHint}</p>
          </div>
        )}

        {!nextLockedStop && unlockedCount === tourStops.length && (
          <div className="rounded-xl bg-primary/10 border border-primary/20 p-4 text-center">
            <p className="font-display text-lg font-bold text-primary">Gratulerer!</p>
            <p className="text-sm text-muted-foreground mt-1">Du har fullfort hele byvandringen!</p>
          </div>
        )}

        {tourStops.map((stop) => {
          const isUnlocked = unlocked.has(stop.id);
          const isNext = nextLockedStop?.id === stop.id;
          const dist = location
            ? getDistanceKm(location.lat, location.lng, stop.lat, stop.lng)
            : null;

          return (
            <div
              key={stop.id}
              className={`flex gap-3 rounded-xl p-3 border transition-shadow ${
                isUnlocked
                  ? "bg-card shadow-sm"
                  : isNext
                    ? "bg-primary/5 border-primary/20"
                    : "bg-muted/30 opacity-60"
              }`}
            >
              <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg">
                {isUnlocked ? (
                  <img
                    src={stop.images[0]}
                    alt={stop.title}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                ) : (
                  <div className="h-full w-full bg-muted flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-muted-foreground">
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                      <path d="M7 11V7a5 5 0 0110 0v4" />
                    </svg>
                  </div>
                )}
              </div>

              <div className="flex min-w-0 flex-1 flex-col justify-center">
                <span className="text-xs font-semibold text-primary">
                  {uiText.stopLabel(stop.order)}
                  {isNext && " — neste!"}
                </span>
                <h3 className="font-display text-base font-semibold leading-tight">
                  {isUnlocked ? stop.title : uiText.lockedLabel}
                </h3>
                {isUnlocked ? (
                  <>
                    <p className="mt-0.5 text-xs text-muted-foreground line-clamp-2">
                      {stop.description}
                    </p>
                    <Link
                      to={`/stopp/${stop.id}`}
                      className="mt-1 text-xs font-medium text-primary underline underline-offset-2"
                    >
                      {uiText.seeDetails}
                    </Link>
                  </>
                ) : (
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    {isNext && stop.locationHint
                      ? stop.locationHint
                      : uiText.scanToUnlock}
                  </p>
                )}
                {dist != null && (
                  <span className="mt-1 text-xs font-medium text-accent-foreground">
                    {uiText.distanceLabel(dist)}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
      <BottomNav />
    </div>
  );
}
