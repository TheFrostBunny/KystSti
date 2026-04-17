import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from "react-leaflet";
import L from "leaflet";
import { getTourById, mapColors, TourStop } from "@/data/tours";
import { useTour } from "@/context/TourContext";
import { useTranslation } from "@/context/LanguageContext";
import { BottomNav } from "@/components/BottomNav";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import "leaflet/dist/leaflet.css";

// Fix default marker icons
delete (L.Icon.Default.prototype as unknown as { _getIconUrl?: () => void })._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});

// Create enhanced custom marker icons with better styling
function createCustomIcon(color: string, number: number, isActive: boolean = false) {
  const borderWidth = isActive ? 4 : 2;
  return L.divIcon({
    className: `custom-marker ${isActive ? 'active-marker' : ''}`,
    html: `
      <div style="
        background-color: ${color};
        width: 48px;
        height: 48px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-weight: bold;
        font-size: 18px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        border: ${borderWidth}px solid white;
        transition: all 0.3s ease;
        ${isActive ? `
          animation: pulse-marker 2s infinite;
        ` : ''}
      ">
        ${number}
      </div>
      <style>
        @keyframes pulse-marker {
          0%, 100% { transform: scale(1); box-shadow: 0 4px 12px rgba(0,0,0,0.3), 0 0 0 0 rgba(${color === mapColors.unlockedPin ? '34, 197, 94' : '107, 114, 128'}, 0.7); }
          50% { transform: scale(1.1); box-shadow: 0 4px 12px rgba(0,0,0,0.3), 0 0 0 10px rgba(${color === mapColors.unlockedPin ? '34, 197, 94' : '107, 114, 128'}, 0); }
        }
      </style>
    `,
    iconSize: [48, 48],
    iconAnchor: [24, 24],
  });
}

function MapController({ center, zoom }: { center: [number, number]; zoom: number }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, zoom, { animate: true, duration: 0.5 });
  }, [center, zoom, map]);
  return null;
}

export default function TourMapPage() {
  const { tourId } = useParams<{ tourId: string }>();
  const navigate = useNavigate();
  const { isStopUnlocked, getProgress } = useTour();
  const { t } = useTranslation();
  const [selectedStop, setSelectedStop] = useState<TourStop | null>(null);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  
  const tour = tourId ? getTourById(tourId) : null;
  const progress = getProgress();

  if (!tour) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center p-6 text-center">
        <h1 className="font-display text-2xl font-bold">{t('tour.stopNotFound')}</h1>
        <Button asChild className="mt-4">
          <Link to="/">{t('common.back')}</Link>
        </Button>
      </div>
    );
  }

  const routeCoordinates: [number, number][] = tour.stops
    .sort((a, b) => a.order - b.order)
    .map((stop) => [stop.lat, stop.lng]);

  const calculateDistance = (lat1: number, lng1: number, lat2: number, lng2: number) => {
    const R = 6371;
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLng = ((lng2 - lng1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLng / 2) ** 2;
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  };

  const distanceToSelectedStop = selectedStop && userLocation
    ? calculateDistance(userLocation.lat, userLocation.lng, selectedStop.lat, selectedStop.lng)
    : null;

  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="sticky top-0 z-[1000] border-b bg-background/95 backdrop-blur-md">
        <div className="flex h-14 items-center justify-between px-4 gap-2">
          <div className="flex items-center min-w-0">
            <button onClick={() => navigate(`/tur/${tour.id}/stopp`)} className="mr-2 p-2 -ml-2 hover:bg-muted rounded-lg transition-colors flex-shrink-0">
              <ArrowLeftIcon className="h-5 w-5" />
            </button>
            <div className="min-w-0">
              <h1 className="font-display text-base md:text-lg font-bold truncate">{tour.title}</h1>
              <p className="text-xs text-muted-foreground hidden sm:block">{progress.unlocked} av {progress.total} låst opp</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              navigator.geolocation.getCurrentPosition((pos) => {
                setUserLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude });
              });
            }}
            className="gap-1 flex-shrink-0"
          >
            <LocationIcon className="h-4 w-4" />
            <span className="text-xs hidden sm:inline">Min posisjon</span>
          </Button>
        </div>
      </header>

      {/* Map */}
      <div className="flex-1 relative w-full overflow-hidden">
        <MapContainer
          center={[tour.mapCenter.lat, tour.mapCenter.lng]}
          zoom={tour.mapZoom}
          className="w-full h-full"
        >
          <MapController center={[tour.mapCenter.lat, tour.mapCenter.lng]} zoom={tour.mapZoom} />
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          
          {/* User location marker */}
          {userLocation && (
            <Marker
              position={[userLocation.lat, userLocation.lng]}
              icon={L.icon({
                iconUrl: `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%233b82f6'%3E%3Ccircle cx='12' cy='12' r='8' fill='%233b82f6'/%3E%3Ccircle cx='12' cy='12' r='4' fill='white'/%3E%3C/svg%3E`,
                iconSize: [24, 24],
                iconAnchor: [12, 12],
              })}
            >
              <Popup>Du er her</Popup>
            </Marker>
          )}

          {/* Route line - animated gradient effect with separate completed/remaining */}
          {routeCoordinates.length > 1 && (
            <>
              <Polyline
                positions={routeCoordinates.slice(0, progress.unlocked + 1)}
                color={mapColors.unlockedPin}
                weight={4}
                opacity={0.8}
                lineCap="round"
                lineJoin="round"
              />
              {progress.unlocked < progress.total && (
                <Polyline
                  positions={routeCoordinates.slice(progress.unlocked)}
                  color={mapColors.lockedPin}
                  weight={4}
                  opacity={0.4}
                  dashArray="8, 4"
                  lineCap="round"
                  lineJoin="round"
                />
              )}
            </>
          )}

          {/* Stop markers */}
          {tour.stops.map((stop) => {
            const unlocked = isStopUnlocked(stop.id) || stop.order === 1;
            const isSelected = selectedStop?.id === stop.id;
            return (
              <Marker
                key={stop.id}
                position={[stop.lat, stop.lng]}
                icon={createCustomIcon(
                  unlocked ? mapColors.unlockedPin : mapColors.lockedPin,
                  stop.order,
                  isSelected
                )}
                eventHandlers={{
                  click: () => setSelectedStop(stop),
                }}
              >
                <Popup>
                  <div className="min-w-[200px]">
                    <h3 className="font-bold">{stop.title}</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      {unlocked ? stop.description.slice(0, 100) + "..." : stop.locationHint}
                    </p>
                    {(unlocked || stop.order === 1) && (
                      <Link
                        to={`/tur/${tour.id}/stopp/${stop.id}`}
                        className="inline-block mt-2 text-sm text-primary font-medium"
                      >
                        Se detaljer
                      </Link>
                    )}
                  </div>
                </Popup>
              </Marker>
            );
          })}
        </MapContainer>

        {/* Enhanced Legend - Responsive */}
        <div className="absolute bottom-20 left-2 right-2 sm:left-4 sm:right-auto z-[1000] rounded-lg bg-white/95 backdrop-blur-md p-3 sm:p-4 shadow-xl border border-white/20 max-w-xs">
          <div className="space-y-3">
            {/* Progress */}
            <div>
              <p className="text-xs font-semibold text-foreground mb-1">Fremgang</p>
              <div className="flex items-center gap-2">
                <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary transition-all duration-500"
                    style={{ width: `${progress.total > 0 ? (progress.unlocked / progress.total) * 100 : 0}%` }}
                  />
                </div>
                <span className="text-xs font-medium text-muted-foreground whitespace-nowrap">
                  {progress.unlocked}/{progress.total}
                </span>
              </div>
            </div>

            {/* Legend items */}
            <div className="space-y-2">
              <p className="text-xs font-semibold text-foreground">Markører</p>
              <div className="flex items-center gap-2 text-xs">
                <div className="w-4 h-4 rounded-full" style={{ backgroundColor: mapColors.unlockedPin }} />
                <span className="text-muted-foreground">Opplåst stopp</span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <div className="w-4 h-4 rounded-full" style={{ backgroundColor: mapColors.lockedPin }} />
                <span className="text-muted-foreground">Låst stopp</span>
              </div>
            </div>

            {/* Tour stats */}
            <div className="pt-2 border-t border-border space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">Totale stopp:</span>
                <span className="font-semibold">{progress.total}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">Estimert tid:</span>
                <span className="font-semibold">{tour.estimatedTime}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stop Details Bottom Sheet - Responsive */}
      <AnimatePresence>
        {selectedStop && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            className="fixed inset-x-0 bottom-20 z-[999] mx-auto px-2 sm:px-0 sm:max-w-lg"
          >
            <div className="bg-card border-t border-border rounded-t-2xl sm:rounded-2xl shadow-xl p-3 sm:p-4 space-y-3 sm:space-y-4 max-h-48 overflow-y-auto">
              {/* Image preview */}
              {selectedStop.images[0] && (
                <img
                  src={selectedStop.images[0]}
                  alt={selectedStop.title}
                  className="w-full h-24 sm:h-32 object-cover rounded-lg"
                  crossOrigin="anonymous"
                />
              )}

              {/* Stop info */}
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                  Stopp {selectedStop.order} av {tour.stops.length}
                </p>
                <h2 className="font-display text-lg sm:text-xl font-bold mt-1">{selectedStop.title}</h2>
                {distanceToSelectedStop !== null && (
                  <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                    {distanceToSelectedStop.toFixed(1)} km unna
                  </p>
                )}
              </div>

              {/* Action buttons */}
              <div className="flex gap-2 pt-2">
                <Button
                  asChild
                  size="sm"
                  className="flex-1 text-xs sm:text-sm"
                  variant={(isStopUnlocked(selectedStop.id) || selectedStop.order === 1) ? "default" : "secondary"}
                >
                  <Link to={`/tur/${tour.id}/stopp/${selectedStop.id}`}>
                    Se detaljer
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 text-xs sm:text-sm"
                  onClick={() => setSelectedStop(null)}
                >
                  Lukk
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

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

function LocationIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" />
    </svg>
  );
}
