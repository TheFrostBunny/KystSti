import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import type { Tour } from "@/data/tours";

interface ExportPanelProps {
  tourData: Tour;
}

export function ExportPanel({ tourData }: ExportPanelProps) {
  const [copied, setCopied] = useState(false);

  const generateTypeScriptCode = (tour: Tour): string => {
    const tourCode = `
{
  id: "${tour.id}",
  title: "${tour.title.replace(/"/g, '\\"')}",
  subtitle: "${tour.subtitle.replace(/"/g, '\\"')}",
  description: "${tour.description.replace(/"/g, '\\"').replace(/\n/g, '\\n')}",
  howItWorks: "${tour.howItWorks.replace(/"/g, '\\"').replace(/\n/g, '\\n')}",
  estimatedTime: "${tour.estimatedTime}",
  distance: "${tour.distance}",
  difficulty: "${tour.difficulty}",
  coverImage: "${tour.coverImage}",
  mapCenter: { lat: ${tour.mapCenter.lat}, lng: ${tour.mapCenter.lng} },
  mapZoom: ${tour.mapZoom},
  stops: [
${tour.stops
  .map(
    (stop) => `    {
      id: "${stop.id}",
      order: ${stop.order},
      title: "${stop.title.replace(/"/g, '\\"')}",
      description: "${stop.description.replace(/"/g, '\\"').replace(/\n/g, '\\n')}",
      images: [${stop.images.map((img) => `"${img}"`).join(", ")}],
      lat: ${stop.lat},
      lng: ${stop.lng},${
        stop.audioUrl ? `\n      audioUrl: "${stop.audioUrl}",` : ""
      }${stop.locationHint ? `\n      locationHint: "${stop.locationHint.replace(/"/g, '\\"')}"` : ""}
    }`
  )
  .join(",\n")}
  ],
}`;
    return tourCode;
  };

  const typeScriptCode = generateTypeScriptCode(tourData);

  const handleCopy = () => {
    navigator.clipboard.writeText(typeScriptCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const element = document.createElement("a");
    element.setAttribute(
      "href",
      "data:text/plain;charset=utf-8," + encodeURIComponent(typeScriptCode)
    );
    element.setAttribute("download", `${tourData.id}.ts`);
    element.style.display = "none";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const isValid = tourData.title && tourData.stops.length > 0;

  return (
    <div className="space-y-6">
      {/* Status */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className={`rounded-lg border p-4 ${
          isValid ? "bg-green-50 dark:bg-green-950/30 border-green-200 dark:border-green-900" : "bg-yellow-50 dark:bg-yellow-950/30 border-yellow-200 dark:border-yellow-900"
        }`}
      >
        <p className={`font-medium ${isValid ? "text-green-900 dark:text-green-100" : "text-yellow-900 dark:text-yellow-100"}`}>
          {isValid ? "✓ Turen er klar til eksport" : "⚠ Fyll inn alle påkrevde felt og legg til minst et stopp"}
        </p>
        <div className={`text-sm mt-2 space-y-1 ${isValid ? "text-green-800 dark:text-green-200" : "text-yellow-800 dark:text-yellow-200"}`}>
          <p>• Tittel: {tourData.title ? "✓" : "✗"}</p>
          <p>• Stopp: {tourData.stops.length > 0 ? `✓ (${tourData.stops.length})` : "✗"}</p>
        </div>
      </motion.div>

      {/* Instructions */}
      <div className="rounded-lg border bg-card p-4 space-y-3">
        <h3 className="font-semibold">Hvordan bruke eksportert kode:</h3>
        <ol className="text-sm text-muted-foreground space-y-2 list-decimal list-inside">
          <li>Kopier koden eller last ned filen nedenfor</li>
          <li>Åpne <code className="bg-muted px-2 py-1 rounded font-mono text-xs">src/data/tours.ts</code></li>
          <li>Legg til turen i <code className="bg-muted px-2 py-1 rounded font-mono text-xs">tours</code>-arrayen</li>
          <li>Sørg for at alle bilde-URL-er er tilgjengelige</li>
          <li>Test turen på siden din!</li>
        </ol>
      </div>

      {/* Code Preview */}
      <div className="space-y-2">
        <h3 className="font-semibold">Generert kode:</h3>
        <div className="rounded-lg border bg-muted/50 overflow-hidden">
          <div className="max-h-96 overflow-y-auto">
            <pre className="p-4 font-mono text-xs text-foreground whitespace-pre-wrap break-words">
              {typeScriptCode}
            </pre>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3">
        <Button
          onClick={handleCopy}
          disabled={!isValid}
          className="flex-1"
          variant={copied ? "default" : "outline"}
        >
          {copied ? "Kopiert!" : "Kopier kode"}
        </Button>
        <Button
          onClick={handleDownload}
          disabled={!isValid}
          className="flex-1"
        >
          Last ned som .ts fil
        </Button>
      </div>

      {/* File Info */}
      <div className="rounded-lg bg-muted/50 border p-4 text-sm text-muted-foreground space-y-1">
        <p>
          <strong>Filnavn:</strong> <code className="font-mono">{tourData.id}.ts</code>
        </p>
        <p>
          <strong>Tour ID:</strong> <code className="font-mono">{tourData.id}</code>
        </p>
        <p>
          <strong>Antall stopp:</strong> {tourData.stops.length}
        </p>
      </div>
    </div>
  );
}
