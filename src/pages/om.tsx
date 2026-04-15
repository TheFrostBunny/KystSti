import { BottomNav } from "@/components/BottomNav";
import { tourInfo } from "@/data/Turinfo";

export default function AboutPage() {
  return (
    <div className="min-h-screen pb-24">
      <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur-md px-4 py-3">
        <h1 className="font-display text-xl font-bold">Om turen</h1>
      </header>
      <div className="mx-auto max-w-lg p-4 space-y-6">
        <div className="rounded-xl bg-card border p-6 space-y-4">
          <h2 className="font-display text-2xl font-bold">{tourInfo.title}</h2>
          <p className="text-muted-foreground leading-relaxed">{tourInfo.description}</p>
          <div className="grid grid-cols-3 gap-4 pt-2">
            <div className="text-center">
              <div className="font-display text-xl font-bold text-primary">{tourInfo.totalStops}</div>
              <div className="text-xs text-muted-foreground">stopp</div>
            </div>
            <div className="text-center">
              <div className="font-display text-xl font-bold text-primary">{tourInfo.distance}</div>
              <div className="text-xs text-muted-foreground">distanse</div>
            </div>
            <div className="text-center">
              <div className="font-display text-xl font-bold text-primary">{tourInfo.estimatedTime}</div>
              <div className="text-xs text-muted-foreground">tid</div>
            </div>
          </div>
        </div>

        <div className="rounded-xl bg-card border p-6 space-y-3">
          <h2 className="font-display text-lg font-bold">Slik bruker du appen</h2>
          <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
            {tourInfo.instructions.map((step, i) => (
              <li key={i}>{step}</li>
            ))}
          </ol>
        </div>

        <div className="rounded-xl bg-muted/50 p-6 text-center text-sm text-muted-foreground">
          {tourInfo.privacyText.map((line, i) => (
            <p key={i} className={i > 0 ? "mt-1" : ""}>{line}</p>
          ))}
        </div>
      </div>
      <BottomNav />
    </div>
  );
}
