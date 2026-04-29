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
      className="flex gap-4 rounded-2xl bg-card p-4 shadow-sm border transition-all hover:shadow-md active:scale-[0.97] active:bg-muted/50"
    >
      {stop.images && stop.images.length > 0 && (
        <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg">
          <img
            src={stop.images[0]}
            alt={stop.title}
            className="h-full w-full object-cover"
            loading="lazy"
          />
        </div>
      )}
      <div className="flex min-w-0 flex-1 flex-col justify-center">
        <div className="flex items-center justify-between mb-1">
          <span className="text-[10px] font-bold uppercase tracking-widest text-primary/70">
            Stopp {stop.order}
          </span>
          {distanceKm != null && (
            <span className="text-[10px] font-bold text-accent-foreground bg-accent/10 px-1.5 py-0.5 rounded-md">
              {distanceKm < 1 ? `${Math.round(distanceKm * 1000)}m` : `${distanceKm.toFixed(1)}km`}
            </span>
          )}
        </div>
        <h3 className="font-display text-lg font-bold leading-tight text-foreground group-active:text-primary transition-colors">
          {typeof stop.title === 'object' ? stop.title['no'] : stop.title}
        </h3>
        <p className="mt-1 text-sm text-muted-foreground line-clamp-2 leading-relaxed">
          {typeof stop.description === 'object' ? stop.description['no'] : stop.description}
        </p>

      </div>
    </Link>
  );
}
