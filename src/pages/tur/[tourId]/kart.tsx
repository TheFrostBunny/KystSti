import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Polyline, useMap } from "react-leaflet";
import L from "leaflet";
import { getTourById, mapColors, TourStop } from "@/data/tours";
import { useTour } from "@/context/TourContext";
import { useTranslation  } from "@/context/LanguageContext";
import { BottomNav } from "@/components/BottomNav";
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
    html: `<div style="background-color: ${color}; width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 14px; box-shadow: 0 2px 8px rgba(0,0,0,0.3);">${number}</div>`,
    iconSize: [32, 32],
    iconAnchor: [16, 16],
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
      <header className="sticky top-0 z-1000 border-b bg-background/95 backdrop-blur-md">
        <div className="flex h-14 items-center px-4">
          <button onClick={() => navigate(`/tur/${tour.id}`)} className="mr-3">
            <ArrowLeftIcon className="h-5 w-5" />
          </button>
          <h1 className="font-display text-lg font-bold">{tour.title?.[language] || tour.title?.no || tour.title?.en || ''} - {t("map.map")}</h1>
        </div>
      </header>

      {/* Map */}
      <div className="flex-1 relative">
        <MapContainer
          center={[tour.mapCenter.lat, tour.mapCenter.lng]}
          zoom={tour.mapZoom}
          className="h-full w-full"
          style={{ height: "calc(100vh - 56px - 64px)" }}
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
            weight={3}
            opacity={0.6}
            dashArray="10, 10"
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

        {/* Legend */}
        <div className="absolute bottom-20 left-4 z-1000 rounded-lg bg-white/95 backdrop-blur-sm p-3 shadow-lg">
          <div className="flex items-center gap-2 text-xs">
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: mapColors.unlockedPin }} />
              <span>{t("map.unlocked")}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: mapColors.lockedPin }} />
              <span>{t("map.locked")}</span>
            </div>
          </div>
        </div>
      </div>

      <BottomNav />

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
              className="fixed inset-0 z-1001 bg-black/40"
            />

            {/* Bottom Sheet */}
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed bottom-16 left-0 right-0 z-1002 rounded-t-2xl bg-card border-t"
            >
              <div className="p-4">
                <div className="flex flex-col items-center gap-3">
                  {/* Handle bar */}
                  <div className="h-1 w-12 rounded-full bg-muted" />

                  {/* Title */}
                  <h2 className="font-display text-lg font-bold text-center">
                    {selectedStop.title?.[language] || selectedStop.title?.no || selectedStop.title?.en || ''}
                  </h2>

                  {/* Status chip */}
                  <div className="inline-flex items-center gap-2 bg-muted/50 rounded-full px-3 py-2">
                    <div className={`w-3 h-3 rounded-full ${
                      (isStopUnlocked(selectedStop.id) || selectedStop.order === 1)
                        ? 'bg-green-600' 
                        : 'bg-gray-400'
                    }`} />
                    <span className="text-sm font-medium text-foreground">
                      {(isStopUnlocked(selectedStop.id) || selectedStop.order === 1) ? 'Opplåst' : 'Låst'}
                    </span>
                  </div>
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
