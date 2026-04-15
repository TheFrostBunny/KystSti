import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { tourStops, uiText } from "@/data/tourData";
import { ImageGallery } from "@/components/ImageGallery";
import { BottomNav } from "@/components/BottomNav";
import { Button } from "@/components/ui/button";
import { unlockStop } from "@/lib/unlocked";
import { tourInfo } from "@/data/Turinfo";

export const Route = createFileRoute("/stopp/$stopId")({
  component: StopDetailPage,
  loader: ({ params }) => {
    const stop = tourStops.find((s) => s.id === params.stopId);
    if (!stop) throw notFound();
    return { stop };
  },
  notFoundComponent: () => (
    <div className="flex min-h-screen items-center justify-center px-4 text-center">
      <div>
        <h1 className="font-display text-2xl font-bold">{uiText.stopNotFound}</h1>
        <p className="mt-2 text-muted-foreground">{uiText.stopNotFoundDesc}</p>
        <Button asChild className="mt-6"><Link to="/stopp-liste">{uiText.backToList}</Link></Button>
      </div>
    </div>
  ),
  head: ({ loaderData }) => {
    const stop = loaderData?.stop;
    return {
      meta: stop
        ? [
            { title: `${stop.title} — ${tourInfo.title}` },
            { name: "description", content: stop.description },
            { property: "og:title", content: `${stop.title} — ${tourInfo.title}` },
            { property: "og:description", content: stop.description },
            { property: "og:image", content: stop.images[0] },
          ]
        : [],
    };
  },
});

function StopDetailPage() {
  const { stop } = Route.useLoaderData();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    unlockStop(stop.id);
    setReady(true);
  }, [stop.id]);

  const nextStop = tourStops.find((s) => s.order === stop.order + 1);

  if (!ready) return null;

  return (
    <div className="min-h-screen pb-24">
      <header className="sticky top-0 z-40 flex items-center gap-3 border-b bg-background/95 backdrop-blur-md px-4 py-3">
        <Link to="/stopp-liste" className="flex h-9 w-9 items-center justify-center rounded-lg hover:bg-muted">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </Link>
        <div>
          <span className="text-xs font-semibold text-primary">
            {uiText.stopOfTotal(stop.order, tourStops.length)}
          </span>
          <h1 className="font-display text-lg font-bold leading-tight">{stop.title}</h1>
        </div>
      </header>

      <div className="mx-auto max-w-lg p-4 space-y-6">
        <div className="rounded-xl bg-primary/10 border border-primary/20 p-3 text-center text-sm font-medium text-primary">
          {uiText.stopUnlockedBanner}
        </div>

        <ImageGallery images={stop.images} alt={stop.title} />

        <p className="text-base leading-relaxed">{stop.description}</p>

        <div className="rounded-xl bg-muted/50 p-4 text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-4 w-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
            </svg>
            <span>{stop.lat.toFixed(4)}, {stop.lng.toFixed(4)}</span>
          </div>
          <a
            href={`https://www.google.com/maps/dir/?api=1&destination=${stop.lat},${stop.lng}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-block text-primary underline underline-offset-2 text-sm font-medium"
          >
            {uiText.openInMaps}
          </a>
        </div>

        {nextStop && (
          <div className="rounded-xl bg-primary/5 border border-primary/20 p-4">
            <p className="text-xs font-semibold text-primary">{uiText.nextStopLabel}</p>
            <p className="font-display text-lg font-bold mt-1">
              {uiText.stopLabel(nextStop.order)} — ???
            </p>
            {nextStop.locationHint && (
              <p className="text-sm text-muted-foreground mt-1">📍 Hint: {nextStop.locationHint}</p>
            )}
            <p className="text-xs text-muted-foreground mt-2">{uiText.findQrHint}</p>
          </div>
        )}

        {!nextStop && (
          <div className="rounded-xl bg-primary/10 border border-primary/20 p-4 text-center">
            <p className="font-display text-lg font-bold text-primary">🎉 Siste stopp!</p>
            <p className="text-sm text-muted-foreground mt-1">Du har fullført hele byvandringen!</p>
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
}
