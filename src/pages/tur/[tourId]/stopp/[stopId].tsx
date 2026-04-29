import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { getTourById, getStopById, uiText } from "@/data/tours";
import { useTour } from "@/context/TourContext";
import { BottomNav } from "@/components/BottomNav";
import Button from "@/components/ui/button";
import { AudioPlayer } from "@/components/AudioPlayer";
import { cn } from "@/lib/utils";
import { useTranslation } from "@/context/LanguageContext";

export default function StopDetailPage() {
  const { t, language } = useTranslation();
  const { tourId, stopId } = useParams<{ tourId: string; stopId: string }>();
  const navigate = useNavigate();
  const { isStopUnlocked, unlockStop } = useTour();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [loadingLocation, setLoadingLocation] = useState(false);

  const tour = tourId ? getTourById(tourId) : null;
  const stop = tourId && stopId ? getStopById(tourId, stopId) : null;

  // Auto-unlock first stop
  useEffect(() => {
    if (stop && tour && stop.order === 1 && !isStopUnlocked(stop.id)) {
      unlockStop(stop.id);
    }
  }, [stop, tour, isStopUnlocked, unlockStop]);

  if (!tour || !stop) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center p-6 text-center">
        <h1 className="font-display text-2xl font-bold">{t("tourBuilder.stopNotFound")}</h1>
        <p className="mt-2 text-muted-foreground">{t("tourBuilder.stopNotFoundDesc")}</p>
        <Button asChild className="mt-4">
          <Link to="/turer">{t("tourBuilder.seAlleTurer")}</Link>
        </Button>
      </div>
    );
  }

  const unlocked = isStopUnlocked(stop.id);
  const nextStop = tour.stops.find((s) => s.order === stop.order + 1);

  const getLocation = () => {
    setLoadingLocation(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUserLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        setLoadingLocation(false);
      },
      () => setLoadingLocation(false),
      { enableHighAccuracy: true }
    );
  };

  const calculateDistance = () => {
    if (!userLocation) return null;
    const R = 6371;
    const dLat = ((stop.lat - userLocation.lat) * Math.PI) / 180;
    const dLon = ((stop.lng - userLocation.lng) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos((userLocation.lat * Math.PI) / 180) *
        Math.cos((stop.lat * Math.PI) / 180) *
        Math.sin(dLon / 2) ** 2;
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  };

  const distance = calculateDistance();

  // Gjør stop-nummer-teksten enklere å bruke i JSX
  const stopOfTotalText = t("stops.stopOfTotal", { order: stop.order, total: tour.stops.length }) || `Stop ${stop.order} of ${tour.stops.length}`;

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <button
            onClick={() => navigate(`/tur/${tour.id}/stopp`)}
            className="p-2 -ml-2 hover:bg-muted rounded-lg transition-colors"
          >
            <ArrowLeftIcon className="h-5 w-5" />
          </button>
          <h1 className="font-display text-lg font-bold truncate flex-1 mx-4">
            {typeof stop.title === 'object' ? stop.title[language as 'no' | 'en'] : stop.title}
          </h1>
          <div className="w-9" />
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        <div className="mx-auto max-w-6xl">
          {/* Desktop Grid Layout: 2 columns on lg, 1 on mobile */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-4 lg:p-8">
            {/* Image Section - Left (2/3 width on desktop) */}
            <div className="lg:col-span-2 space-y-4">
              {/* Main Image */}
              {stop.images && stop.images.length > 0 && (
                <motion.div
                  key={currentImageIndex}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="relative overflow-hidden rounded-2xl bg-muted aspect-video lg:aspect-auto lg:h-125"
                >
                  <img
                    src={stop.images[currentImageIndex]}
                    alt={typeof stop.title === 'object' ? stop.title[language as 'no' | 'en'] : stop.title}
                    className="w-full h-full object-cover"
                    crossOrigin="anonymous"
                  />
                </motion.div>
              )}

              {/* Image Gallery Thumbnails */}
              {stop.images.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {stop.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={cn(
                        "h-20 w-20 shrink-0 rounded-lg overflow-hidden border-2 transition-all hover:border-muted-foreground",
                        currentImageIndex === index
                          ? "border-primary"
                          : "border-muted"
                      )}
                    >
                      <img
                        src={image}
                        alt={`${stop.title} ${index + 1}`}
                        className="h-full w-full object-cover"
                        crossOrigin="anonymous"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Content Section - Right (1/3 width on desktop, sticky) */}
            <div className="space-y-4 lg:sticky lg:top-20 lg:h-fit">
              {/* Stop Header */}
              <div>
                <h2 className="font-display text-2xl lg:text-3xl font-bold mt-2">{typeof stop.title === 'object' ? stop.title[language as 'no' | 'en'] : stop.title}</h2>
              </div>

              {/* Audio Player */}
              {stop.audioUrl && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <AudioPlayer audioUrl={stop.audioUrl} title={typeof stop.title === 'object' ? stop.title[language as 'no' | 'en'] : stop.title} />
                </motion.div>
              )}

              {/* Description Card */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="rounded-xl bg-card border p-4 space-y-2"
              >
                <p className="text-xs font-semibold text-muted-foreground uppercase">
                  {t("tourBuilder.aboutStop")}
                </p>
                <p className="text-sm leading-relaxed text-foreground">{typeof stop.description === 'object' ? stop.description[language as 'no' | 'en'] : stop.description}</p>
              </motion.div>

              {/* Location Card */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="rounded-xl border bg-card p-4"
              >
                <div className="flex items-center gap-2 mb-3">
                  <MapPinIcon className="h-4 w-4 text-primary" />
                  <span className="text-xs font-semibold text-muted-foreground uppercase">
                    {t("tourBuilder.position")}
                  </span>
                </div>
                
                {distance !== null && (
                  <p className="text-sm mb-3 text-muted-foreground">
                    {t("tourBuilder.distanceLabel", { distance: distance.toFixed(2) })}
                  </p>
                )}

                <div className="flex flex-col gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={getLocation}
                    disabled={loadingLocation}
                    className="w-full"
                  >
                    {loadingLocation ? t("tourBuilder.fetchingLocation") : t("tourBuilder.showDistance")}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    asChild
                    className="w-full"
                  >
                    <a
                      href={`https://www.google.com/maps/dir/?api=1&destination=${stop.lat},${stop.lng}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {t("tourBuilder.openInMaps")}
                    </a>
                  </Button>
                </div>
              </motion.div>

              {/* Next Stop Card */}
              {nextStop && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="rounded-xl border bg-muted/50 p-4"
                >
                  <p className="text-xs font-semibold text-muted-foreground uppercase">
                    {t("tourBuilder.nextStopLabel")}
                  </p>
                  <p className="mt-2 font-display text-lg font-bold">{typeof nextStop.title === 'object' ? nextStop.title[language as 'no' | 'en'] : nextStop.title}</p>
                  {nextStop.locationHint && (
                    <p className="mt-1 text-xs text-muted-foreground">{typeof nextStop.locationHint === 'object' ? nextStop.locationHint[language as 'no' | 'en'] : nextStop.locationHint}</p>
                  )}
                </motion.div>
              )}

              {/* Navigation Buttons */}
              <div className="flex flex-col gap-2 pt-4 lg:pt-0">
                <Button
                  asChild
                  variant="outline"
                  size="sm"
                  className="w-full"
                >
                  <Link to={`/tur/${tour.id}/stopp`}>{t("tourBuilder.backToStops")}</Link>
                </Button>
              </div>
            </div>
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

function MapPinIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" />
    </svg>
  );
}
