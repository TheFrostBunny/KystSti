import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from "react-leaflet";
import L from "leaflet";
import { getTourById, mapColors, TourStop } from "@/data/tours";
import { useTour } from "@/context/TourContext";
import { BottomNav } from "@/components/BottomNav";
import { Button } from "@/components/ui/button";
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
    html: `<div style=\"background-color: ${color}; width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 14px; box-shadow: 0 2px 8px rgba(0,0,0,0.3);\">${number}</div>`,
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
  const [selectedStop, setSelectedStop] = useState<TourStop | null>(null);
  
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

  const routeCoordinates: [number, number][] = tour.stops
    .sort((a, b) => a.order - b.order)
    .map((stop) => [stop.lat, stop.lng]);

  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="sticky top-0 z-[1000] border-b bg-background/95 backdrop-blur-md">
        <div className="flex h-14 items-center px-4">
          <button onClick={() => navigate(-1)} className="mr-3">
            <ArrowLeftIcon className="h-5 w-5" />
          </button>
          <h1 className="font-display text-lg font-bold">{tour.title} - Kart</h1>
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
          
          {/* Route line */}
          <Polyline
            positions={routeCoordinates}
            color={mapColors.unlockedPin}
            weight={3}
            opacity={0.6}
            dashArray="10, 10"
          />

          {/* Stop markers */}
          {(() => {
            // Only show unlocked stops, the first stop, and the next stop to unlock
            const unlockedStops = tour.stops.filter(s => isStopUnlocked(s.id));
            const firstStop = tour.stops.find(s => s.order === 1);
            const nextStop = tour.stops.find(s => {
              if (isStopUnlocked(s.id)) return false;
              if (s.order === 1) return false;
              // All previous stops must be unlocked
              const prev = tour.stops.filter(p => p.order < s.order);
              return prev.every(p => isStopUnlocked(p.id));
            });
            const visibleStops = [
              ...unlockedStops,
              ...(firstStop && !isStopUnlocked(firstStop.id) ? [firstStop] : []),
              ...(nextStop ? [nextStop] : []),
            ];
            // Remove duplicates
            const uniqueStops = Array.from(new Set(visibleStops));
            return uniqueStops.map((stop) => {
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
            });
          })()}
        </MapContainer>

        {/* Legend */}
        <div className="absolute bottom-20 left-4 z-[1000] rounded-lg bg-white/95 backdrop-blur-sm p-3 shadow-lg">
          <div className="flex items-center gap-2 text-xs">
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: mapColors.unlockedPin }} />
              <span>Opplåst</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: mapColors.lockedPin }} />
              <span>Låst</span>
            </div>
          </div>
        </div>

        {/* Pop-out stop info card */}
        {selectedStop && (
          <div className="fixed left-0 right-0 bottom-0 z-[1100] flex justify-center pointer-events-none">
            <div className="w-full max-w-md m-4 pointer-events-auto">
              <div className="rounded-xl bg-white shadow-2xl p-5 border border-gray-200 animate-popin">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold text-lg truncate">{selectedStop.title}</h3>
                  <button
                    onClick={() => setSelectedStop(null)}
                    className="ml-2 text-gray-400 hover:text-gray-700"
                    aria-label="Lukk"
                  >
                    <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18M6 6l12 12"/></svg>
                  </button>
                </div>
                <p className="text-sm text-gray-600 mb-2">
                  {(isStopUnlocked(selectedStop.id) || selectedStop.order === 1)
                    ? selectedStop.description.slice(0, 120) + (selectedStop.description.length > 120 ? "..." : "")
                    : selectedStop.locationHint}
                </p>
                {(isStopUnlocked(selectedStop.id) || selectedStop.order === 1) && (
                  <Link
                    to={`/tur/${tour.id}/stopp/${selectedStop.id}`}
                    className="inline-block mt-2 text-sm text-primary font-medium"
                  >
                    Se detaljer
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

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
