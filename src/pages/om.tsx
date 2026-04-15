import { BottomNav } from "@/components/BottomNav";
import { getAllTours } from "@/data/tours";

export default function AboutPage() {
  const tours = getAllTours();
  const totalStops = tours.reduce((acc, tour) => acc + tour.stops.length, 0);

  return (
    <div className="min-h-screen pb-24">
      <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur-md px-4 py-3">
        <h1 className="font-display text-xl font-bold">Om KystSti</h1>
      </header>
      <div className="mx-auto max-w-lg p-4 space-y-6">
        <div className="rounded-xl bg-card border p-6 space-y-4">
          <h2 className="font-display text-2xl font-bold">KystSti</h2>
          <p className="text-muted-foreground leading-relaxed">
            Utforsk vakre kyststier og byvandringer med interaktive turer. 
            Skann QR-koder ved hvert stopp for a lase opp historier, bilder og lydguider.
          </p>
          <div className="grid grid-cols-3 gap-4 pt-2">
            <div className="text-center">
              <div className="font-display text-xl font-bold text-primary">{tours.length}</div>
              <div className="text-xs text-muted-foreground">turer</div>
            </div>
            <div className="text-center">
              <div className="font-display text-xl font-bold text-primary">{totalStops}</div>
              <div className="text-xs text-muted-foreground">stopp totalt</div>
            </div>
            <div className="text-center">
              <div className="font-display text-xl font-bold text-primary">Gratis</div>
              <div className="text-xs text-muted-foreground">a bruke</div>
            </div>
          </div>
        </div>

        <div className="rounded-xl bg-card border p-6 space-y-3">
          <h2 className="font-display text-lg font-bold">Slik bruker du appen</h2>
          <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
            <li>Velg en tur fra turlisten</li>
            <li>Ga til startpunktet for turen</li>
            <li>Finn QR-koden som er plassert ved stoppet</li>
            <li>Skann QR-koden med kameraet - innholdet lases opp!</li>
            <li>Hør på lydguiden og les historien</li>
            <li>Følg veien til neste stopp</li>
          </ol>
        </div>

        <div className="rounded-xl bg-card border p-6 space-y-3">
          <h2 className="font-display text-lg font-bold">Funksjoner</h2>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-center gap-2">
              <CheckIcon className="h-4 w-4 text-primary" />
              Flere turer a velge mellom
            </li>
            <li className="flex items-center gap-2">
              <CheckIcon className="h-4 w-4 text-primary" />
              QR-skanning for a lase opp stopp
            </li>
            <li className="flex items-center gap-2">
              <CheckIcon className="h-4 w-4 text-primary" />
              Lydguide pa hvert stopp
            </li>
            <li className="flex items-center gap-2">
              <CheckIcon className="h-4 w-4 text-primary" />
              Interaktivt kart med rute
            </li>
            <li className="flex items-center gap-2">
              <CheckIcon className="h-4 w-4 text-primary" />
              Fremgangsindikator
            </li>
          </ul>
        </div>

        <div className="rounded-xl bg-muted/50 p-6 text-center text-sm text-muted-foreground">
          <p>Denne appen samler ikke inn personlig informasjon.</p>
          <p className="mt-1">Posisjonen din brukes kun lokalt for a vise avstand.</p>
        </div>
      </div>
      <BottomNav />
    </div>
  );
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}
