import { useParams, useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Polyline, useMap } from "react-leaflet";
import L from "leaflet";
import { getTourById, mapColors, TourStop } from "@/data/tours";
import { useTour } from "@/context/TourContext";
import { useTranslation  } from "@/context/LanguageContext";

import Button from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import "leaflet/dist/leaflet.css";

// Fix default marker icons
delete (L.Icon.Default.prototype as unknown as { _getIconUrl?: () => void })._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});

function createCustomIcon(color: string, number: number) {
  return L.divIcon({
    className: "custom-marker",
    html: `<div style="background-color: ${color}; width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 16px; box-shadow: 0 4px 12px rgba(0,0,0,0.25); border: 2px solid white;">${number}</div>`,
    iconSize: [40, 40],
    iconAnchor: [20, 20],
  });
}

function MapController({ center, zoom }: { center: [number, number]; zoom: number }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, zoom);
  }, [center, zoom, map]);
  return null;
}

export default function TourMapPage() {
  const { tourId } = useParams<{ tourId: string }>();
  const navigate = useNavigate();
  const { isStopUnlocked } = useTour();
  const { t, language } = useTranslation();

  const [selectedStop, setSelectedStop] = useState<TourStop | null>(null);
  
  const tour = tourId ? getTourById(tourId) : null;

  if (!tour) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center p-6 text-center">
        <h1 className="font-display text-2xl font-bold">{t("map.tourNotFound")}</h1>
        <Button asChild className="mt-4">
          <Link to="/turer">{t("map.backToTours")}</Link>
        </Button>
      </div>
    );
  }

  const routeCoordinates: [number, number][] = tour.stops
    .sort((a, b) => a.order - b.order)
    .map((stop) => [stop.lat, stop.lng]);

  const visibleStops = tour.stops.filter((stop) => {
    const isUnlocked = isStopUnlocked(stop.id) || stop.order === 1;
    if (isUnlocked) return true;
    
    // Find the first locked stop (next stop)
    const isNextStop = tour.stops
      .filter((s) => s.order < stop.order)
      .every((s) => isStopUnlocked(s.id) || s.order === 1);
    
    return isNextStop;
  });

  // Create route coordinates only for visible stops
  const visibleRouteCoordinates: [number, number][] = visibleStops
    .sort((a, b) => a.order - b.order)
    .map((stop) => [stop.lat, stop.lng]);

  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="sticky top-0 z-30 border-b bg-background/95 backdrop-blur-md shadow-sm">
        <div className="flex h-12 sm:h-14 items-center px-3 sm:px-4 gap-2 sm:gap-3">
          <button 
            onClick={() => navigate(`/tur/${tour.id}`)} 
            className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-lg hover:bg-muted transition-colors shrink-0"
          >
            <ArrowLeftIcon className="h-5 w-5" />
          </button>
          <div className="flex-1 min-w-0">
            <h1 className="font-display text-sm sm:text-base font-bold truncate">
              {typeof tour.title === 'object' ? tour.title[language] : tour.title}
            </h1>
            <p className="text-xs text-muted-foreground hidden sm:block">{t("map.map")}</p>
          </div>
        </div>
      </header>

      {/* Map */}
      <div className="flex-1 relative">
        <MapContainer
          center={[tour.mapCenter.lat, tour.mapCenter.lng]}
          zoom={tour.mapZoom}
          className="h-full w-full"
          style={{ height: "calc(100vh - 48px - 64px)" }}
        >
          <MapController center={[tour.mapCenter.lat, tour.mapCenter.lng]} zoom={tour.mapZoom} />
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          
          {/* Route line - only between visible stops */}
          <Polyline
            positions={visibleRouteCoordinates}
            color={mapColors.unlockedPin}
            weight={4}
            opacity={0.7}
            dashArray="8, 8"
          />

          {/* Stop markers */}
          {visibleStops.map((stop) => {
            const unlocked = isStopUnlocked(stop.id) || stop.order === 1;
            return (
              <Marker
                key={stop.id}
                position={[stop.lat, stop.lng]}
                icon={createCustomIcon(
                  unlocked ? mapColors.unlockedPin : mapColors.lockedPin,
                  stop.order
                )}
                eventHandlers={{
                  click: () => setSelectedStop(stop),
                }}
              />
            );
          })}
        </MapContainer>

        {/* Legend - Overlay on map */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`absolute bottom-20 sm:bottom-24 left-3 sm:left-4 z-[999] rounded-2xl backdrop-blur-md p-3 sm:p-4 shadow-lg border max-w-xs ${
            "bg-white/95 border-border/50"
          }`}
        >
          <div className="space-y-2">
            <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Forklaring</p>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full" style={{ backgroundColor: mapColors.unlockedPin }} />
                <span className="text-xs font-medium">{t("map.unlocked")}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full" style={{ backgroundColor: mapColors.lockedPin }} />
                <span className="text-xs font-medium">{t("map.locked")}</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>


      {/* Bottom Sheet Modal for Stop Details */}
      <AnimatePresence>
        {selectedStop && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedStop(null)}
              className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
            />

            {/* Bottom Sheet */}
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed bottom-16 left-0 right-0 z-50 rounded-t-3xl bg-card border-t border-border shadow-2xl max-h-[60vh] sm:max-h-96"
            >
              <div className="overflow-y-auto max-h-[calc(60vh-64px)] sm:max-h-96">
                {/* Handle bar */}
                <div className="flex justify-center pt-3 pb-2">
                  <div className="h-1 w-12 rounded-full bg-muted" />
                </div>

                <div className="px-4 sm:px-6 pb-6 space-y-4">
                  {/* Stop header with number and title */}
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-full bg-primary/10 border-2 border-primary/20 shadow-sm">
                      <span className="font-bold text-primary text-base sm:text-lg">{selectedStop.order}</span>
                    </div>
                    <div className="flex-1 pt-1">
                      <h2 className="font-display text-lg sm:text-xl font-bold leading-tight">
                        {typeof selectedStop.title === 'object' ? selectedStop.title[language] : selectedStop.title}
                      </h2>
                      <p className="text-xs text-muted-foreground mt-1">Stopp {selectedStop.order} av {tour.stops.length}</p>
                    </div>
                  </div>

                  {/* Status badge */}
                  <div>
                    {(isStopUnlocked(selectedStop.id) || selectedStop.order === 1) ? (
                      <motion.div 
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="inline-flex items-center gap-2 bg-green-100 rounded-full px-4 py-2 border border-green-200 shadow-sm"
                      >
                        <div className="w-2.5 h-2.5 rounded-full bg-green-600 animate-pulse" />
                        <span className="text-sm font-semibold text-green-700">Opplåst</span>
                      </motion.div>
                    ) : (
                      <motion.div 
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="inline-flex items-center gap-2 bg-amber-100 rounded-full px-4 py-2 border border-amber-200 shadow-sm"
                      >
                        <div className="w-2.5 h-2.5 rounded-full bg-amber-600" />
                        <span className="text-sm font-semibold text-amber-700">Låst</span>
                      </motion.div>
                    )}
                  </div>

                  {/* Description */}
                  {selectedStop.description && (
                    <div className="pt-2">
                      <p className="text-xs sm:text-sm text-foreground/80 leading-relaxed">
                        {typeof selectedStop.description === 'object' ? selectedStop.description[language] : selectedStop.description}
                      </p>
                    </div>
                  )}

                  {/* Action button */}
                  {(isStopUnlocked(selectedStop.id) || selectedStop.order === 1) && (
                    <motion.div
                      initial={{ y: 10, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.2 }}
                      className="pt-2"
                    >
                      <Button 
                        asChild 
                        size="lg" 
                        className="w-full h-10 sm:h-12 rounded-xl font-semibold shadow-md text-sm"
                      >
                        <Link to={`/tur/${tour.id}/stopp/${selectedStop.id}`}>
                          Se detaljer
                        </Link>
                      </Button>
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
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
