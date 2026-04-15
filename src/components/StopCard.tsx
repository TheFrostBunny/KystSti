import { Link } from "@tanstack/react-router";
import type { TourStop } from "@/data/tourData";

interface StopCardProps {
  stop: TourStop;
  distanceKm?: number | null;
}

export function StopCard({ stop, distanceKm }: StopCardProps) {
  return (
    <Link
      to="/stopp/$stopId"
      params={{ stopId: stop.id }}
      className="flex gap-3 rounded-xl bg-card p-3 shadow-sm border transition-shadow hover:shadow-md active:scale-[0.99]"
    >
      <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg">
        <img
          src={stop.images[0]}
          alt={stop.title}
          className="h-full w-full object-cover"
          loading="lazy"
        />
      </div>
      <div className="flex min-w-0 flex-1 flex-col justify-center">
        <span className="text-xs font-semibold text-primary">
          Stopp {stop.order}
        </span>
        <h3 className="font-display text-base font-semibold leading-tight truncate">
          {stop.title}
        </h3>
        <p className="mt-0.5 text-xs text-muted-foreground line-clamp-2">
          {stop.description}
        </p>
        {distanceKm != null && (
          <span className="mt-1 text-xs font-medium text-accent-foreground">
            📍 {distanceKm < 1 ? `${Math.round(distanceKm * 1000)} m` : `${distanceKm.toFixed(1)} km`}
          </span>
        )}
      </div>
    </Link>
  );
}
