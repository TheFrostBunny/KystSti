import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { getTourById, getStopById, uiText } from "@/data/tours";
import { useTour } from "@/context/TourContext";
import { BottomNav } from "@/components/BottomNav";
import { Button } from "@/components/ui/button";
import { AudioPlayer } from "@/components/AudioPlayer";

export default function StopDetailPage() {
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
        <h1 className="font-display text-2xl font-bold">{uiText.stopNotFound}</h1>
        <p className="mt-2 text-muted-foreground">{uiText.stopNotFoundDesc}</p>
        <Button asChild className="mt-4">
          <Link to="/turer">Se alle turer</Link>
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

  return (
    <div className="flex min-h-screen flex-col pb-20">
      {/* Image Gallery */}
      <div className="relative h-64 overflow-hidden bg-muted">
        <motion.img
          key={currentImageIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          src={stop.images[currentImageIndex]}
          alt={stop.title}
          className="w-full h-full object-cover"
          crossOrigin="anonymous"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        
        <button
          onClick={() => navigate(`/tur/${tour.id}/stopp`)}
          className="absolute top-4 left-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm text-white"
        >
          <ArrowLeftIcon className="h-5 w-5" />
        </button>

        {stop.images.length > 1 && (
          <div className="absolute bottom-16 left-0 right-0 flex justify-center gap-1.5">
            {stop.images.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentImageIndex(idx)}
                className={`h-2 w-2 rounded-full transition-colors ${
                  idx === currentImageIndex ? "bg-white" : "bg-white/40"
                }`}
              />
            ))}
          </div>
        )}

        <div className="absolute bottom-4 left-4 right-4">
          <p className="text-sm text-white/80">
            {uiText.stopOfTotal(stop.order, tour.stops.length)}
          </p>
          <h1 className="font-display text-2xl font-bold text-white">{stop.title}</h1>
        </div>
      </div>

      <main className="flex-1 px-4 py-6">
        {/* Audio Player */}
        {stop.audioUrl && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
          >
            <AudioPlayer audioUrl={stop.audioUrl} title={stop.title} />
          </motion.div>
        )}

        {/* Description */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-6"
        >
          <p className="text-muted-foreground leading-relaxed">{stop.description}</p>
        </motion.div>

        {/* Location */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-6 rounded-xl border bg-card p-4"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MapPinIcon className="h-5 w-5 text-primary" />
              <span className="font-medium">Posisjon</span>
            </div>
            {distance !== null && (
              <span className="text-sm text-muted-foreground">
                {uiText.distanceLabel(distance)}
              </span>
            )}
          </div>
          
          <div className="mt-3 flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={getLocation}
              disabled={loadingLocation}
              className="flex-1"
            >
              {loadingLocation ? uiText.fetchingLocation : uiText.showDistance}
            </Button>
            <Button
              variant="outline"
              size="sm"
              asChild
              className="flex-1"
            >
              <a
                href={`https://www.google.com/maps/dir/?api=1&destination=${stop.lat},${stop.lng}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {uiText.openInMaps}
              </a>
            </Button>
          </div>
        </motion.div>

        {/* Next Stop */}
        {nextStop && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="rounded-xl border bg-muted/50 p-4"
          >
            <p className="text-sm font-medium text-muted-foreground">{uiText.nextStopLabel}</p>
            <p className="mt-1 font-display text-lg font-bold">{nextStop.title}</p>
            {nextStop.locationHint && (
              <p className="mt-1 text-sm text-muted-foreground">{nextStop.locationHint}</p>
            )}
            <p className="mt-2 text-xs text-primary">{uiText.findQrHint}</p>
          </motion.div>
        )}
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
