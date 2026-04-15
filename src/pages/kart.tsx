import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { tourStops, mapColors, uiText } from "@/data/tourData";
import { appConfig } from "@/config";
import { tourInfo } from "@/data/Turinfo";
import { BottomNav } from "@/components/BottomNav";
import { getUnlockedStops } from "@/lib/unlocked";
import { useUserLocation, getDistanceKm } from "@/hooks/useUserLocation";

export default function MapPage() {
  const mapRef = useRef<HTMLDivElement>(null);
  const [selectedStop, setSelectedStop] = useState<typeof tourStops[0] | null>(null);
  const [unlocked, setUnlocked] = useState<Set<string>>(new Set());
  const { location, loading, error, requestLocation } = useUserLocation();

  useEffect(() => {
    setUnlocked(getUnlockedStops());
  }, []);

  useEffect(() => {
    if (!mapRef.current) return;
    let cancelled = false;

    async function initMap() {
      const L = await import("leaflet");
      await import("leaflet/dist/leaflet.css");
      if (cancelled || !mapRef.current) return;

      const map = L.map(mapRef.current, { zoomControl: false })
        .setView([tourInfo.mapCenter.lat, tourInfo.mapCenter.lng], tourInfo.mapZoom);

      L.control.zoom({ position: "bottomright" }).addTo(map);
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        maxZoom: 19,
      }).addTo(map);

      tourStops.forEach((stop) => {
        const isUnlocked = unlocked.has(stop.id);
        const bg = isUnlocked ? mapColors.unlockedPin : mapColors.lockedPin;
        const icon = L.divIcon({
          html: `<div style="background:${bg};color:white;width:28px;height:28px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:13px;border:2px solid white;box-shadow:0 2px 6px rgba(0,0,0,.3);">${isUnlocked ? stop.order : "?"}</div>`,
          className: "",
          iconSize: [28, 28],
          iconAnchor: [14, 14],
        });
        L.marker([stop.lat, stop.lng], { icon }).addTo(map).on("click", () => setSelectedStop(stop));
      });

      return () => { map.remove(); };
    }

    const cleanup = initMap();
    return () => { cancelled = true; cleanup?.then((fn) => fn?.()); };
  }, [unlocked]);

  if (!appConfig.enableMap) return null;

  const isSelectedUnlocked = selectedStop ? unlocked.has(selectedStop.id) : false;
  let distance = null;
  if (selectedStop && location) {
    distance = getDistanceKm(location.lat, location.lng, selectedStop.lat, selectedStop.lng);
  }

  return (
    <div className="flex h-screen flex-col">
      <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur-md px-4 py-3">
        <h1 className="font-display text-xl font-bold">Kart</h1>
      </header>

      <div className="relative flex-1 pb-16">
        <div ref={mapRef} className="h-full w-full" />

        {selectedStop && (
          <div className="absolute bottom-20 left-4 right-4 z-[1000] mx-auto max-w-lg">
            <div className="rounded-xl bg-card border shadow-xl p-4">
              <button
                onClick={() => setSelectedStop(null)}
                className="absolute right-3 top-3 h-7 w-7 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:bg-muted/80"
                aria-label="Lukk"
              >x</button>
              <div className="flex gap-3">
                <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg">
                  {isSelectedUnlocked ? (
                    <img src={selectedStop.images[0]} alt={selectedStop.title} className="h-full w-full object-cover" />
                  ) : (
                    <div className="h-full w-full bg-muted flex items-center justify-center"><span className="text-xl">?</span></div>
                  )}
                </div>
                <div className="min-w-0">
                  <span className="text-xs font-semibold text-primary">{uiText.stopLabel(selectedStop.order)}</span>
                  <h3 className="font-display text-base font-bold leading-tight">
                    {isSelectedUnlocked ? selectedStop.title : uiText.lockedLabel}
                  </h3>
                  {/* Avstand fra bruker (kun hvis aktivert) */}
                  {appConfig.enableDistance && selectedStop && (
                    <div className="mt-1">
                      {location && distance != null ? (
                        <span className="text-xs font-medium text-accent-foreground">
                          {uiText.distanceLabel(distance)}
                        </span>
                      ) : (
                        <button
                          onClick={requestLocation}
                          className="text-xs text-primary underline underline-offset-2 disabled:opacity-60"
                          disabled={loading}
                        >
                          {loading ? uiText.fetchingLocation : uiText.showDistance}
                        </button>
                      )}
                      {error && (
                        <div className="text-xs text-destructive mt-1">{error}</div>
                      )}
                    </div>
                  )}
                  {isSelectedUnlocked ? (
                    <Link to={`/stopp/${selectedStop.id}`} className="mt-1 inline-block text-sm font-medium text-primary underline underline-offset-2">
                      {uiText.seeDetails}
                    </Link>
                  ) : (
                    <p className="mt-1 text-xs text-muted-foreground">
                      {selectedStop.locationHint || uiText.scanToUnlock}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <BottomNav />
    </div>
  );
}
