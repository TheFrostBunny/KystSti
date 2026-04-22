import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import type { Tour } from "@/data/tours";

interface ExportPanelProps {
  tourData: Tour;
}

export function ExportPanel({ tourData }: ExportPanelProps) {
  const [copied, setCopied] = useState(false);
  const [downloaded, setDownloaded] = useState(false);

  const generateTypeScriptCode = (tour: Tour): string => {
    const tourCode = `import type { Tour } from "./types";

const tour: Tour = {
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
};

export default tour;
`;
    return tourCode;
  };

  const typeScriptCode = generateTypeScriptCode(tourData);

  const handleCopy = () => {
    navigator.clipboard.writeText(typeScriptCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    let fileName = tourData.id ? tourData.id.replace(/[^a-zA-Z0-9_-]/g, "_") : "tour";
    fileName = fileName || "tour";
    const blob = new Blob([typeScriptCode], { type: "application/typescript;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const element = document.createElement("a");
    element.href = url;
    element.download = `${fileName}.ts`;
    element.style.display = "none";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 2000);
  };

  const isValid = tourData.title && tourData.stops.length > 0;

  const checks = [
    { label: "Tittel", ok: !!tourData.title },
    { label: "Undertittel", ok: !!tourData.subtitle },
    { label: "Beskrivelse", ok: !!tourData.description },
    { label: "Minst ett stopp", ok: tourData.stops.length > 0 },
    { label: "Coverbilde", ok: !!tourData.coverImage },
  ];

  const passedChecks = checks.filter((c) => c.ok).length;

  return (
    <div className="space-y-6">
      {/* Status Card */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className={`rounded-xl border p-5 ${
          isValid
            ? "bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20"
            : "bg-gradient-to-br from-accent/5 to-accent/10 border-accent/20"
        }`}
      >
        <div className="flex items-start gap-4">
          <div
            className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full ${
              isValid ? "bg-primary/20 text-primary" : "bg-accent/20 text-accent"
            }`}
          >
            {isValid ? (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-6 w-6">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-6 w-6">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
              </svg>
            )}
          </div>
          <div className="flex-1">
            <h3 className="font-display text-lg font-semibold">
              {isValid ? "Klar til eksport!" : "Nesten der..."}
            </h3>
            <p className="text-sm text-muted-foreground mt-1">
              {isValid
                ? "Turen din er komplett og klar til a lastes ned."
                : "Fyll ut de gjenvarende feltene for a fullfare."}
            </p>

            {/* Checklist */}
            <div className="mt-4 grid grid-cols-2 gap-2">
              {checks.map((check) => (
                <div
                  key={check.label}
                  className={`flex items-center gap-2 text-sm ${
                    check.ok ? "text-foreground" : "text-muted-foreground"
                  }`}
                >
                  {check.ok ? (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4 text-primary">
                      <path fillRule="evenodd" d="M12.416 3.376a.75.75 0 0 1 .208 1.04l-5 7.5a.75.75 0 0 1-1.154.114l-3-3a.75.75 0 0 1 1.06-1.06l2.353 2.353 4.493-6.74a.75.75 0 0 1 1.04-.207Z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4">
                      <path d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14ZM8 4a.75.75 0 0 1 .75.75v3a.75.75 0 0 1-1.5 0v-3A.75.75 0 0 1 8 4Zm0 8a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" />
                    </svg>
                  )}
                  {check.label}
                </div>
              ))}
            </div>

            <div className="mt-4 h-2 rounded-full bg-muted overflow-hidden">
              <motion.div
                className="h-full bg-primary"
                initial={{ width: 0 }}
                animate={{ width: `${(passedChecks / checks.length) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Instructions */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="rounded-xl border bg-card p-5"
      >
        <h3 className="font-display text-lg font-semibold flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5 text-primary">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z" clipRule="evenodd" />
          </svg>
          Slik bruker du filen
        </h3>
        <ol className="mt-4 space-y-3">
          {[
            { step: "1", text: "Last ned filen eller kopier koden" },
            { step: "2", text: "Legg filen i src/data/tours/ mappen" },
            { step: "3", text: "Apne src/data/tours/index.ts og importer din tur" },
            { step: "4", text: "Legg til turen i tourModules array" },
          ].map((item) => (
            <li key={item.step} className="flex items-start gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                {item.step}
              </span>
              <span className="text-sm text-muted-foreground">{item.text}</span>
            </li>
          ))}
        </ol>
      </motion.div>

      {/* File Info */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="rounded-xl bg-muted/50 border p-5"
      >
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-muted">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-6 w-6 text-muted-foreground">
              <path d="M3 3.5A1.5 1.5 0 014.5 2h6.879a1.5 1.5 0 011.06.44l4.122 4.12A1.5 1.5 0 0117 7.622V16.5a1.5 1.5 0 01-1.5 1.5h-11A1.5 1.5 0 013 16.5v-13z" />
            </svg>
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-mono text-sm font-medium truncate">
              {tourData.id || "din-tur"}.ts
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">
              TypeScript fil med {tourData.stops.length} stopp
            </p>
          </div>
        </div>
      </motion.div>

      {/* Code Preview */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="space-y-3"
      >
        <div className="flex items-center justify-between">
          <h3 className="font-display text-lg font-semibold">Generert kode</h3>
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleCopy}
              disabled={!isValid}
              className="h-8"
            >
              {copied ? (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4 mr-1.5 text-primary">
                    <path fillRule="evenodd" d="M12.416 3.376a.75.75 0 0 1 .208 1.04l-5 7.5a.75.75 0 0 1-1.154.114l-3-3a.75.75 0 0 1 1.06-1.06l2.353 2.353 4.493-6.74a.75.75 0 0 1 1.04-.207Z" clipRule="evenodd" />
                  </svg>
                  Kopiert!
                </>
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4 mr-1.5">
                    <path d="M5.5 3.5A1.5 1.5 0 0 1 7 2h2.879a1.5 1.5 0 0 1 1.06.44l2.122 2.12a1.5 1.5 0 0 1 .439 1.061V9.5A1.5 1.5 0 0 1 12 11V8.621a3 3 0 0 0-.879-2.121L9 4.379A3 3 0 0 0 6.879 3.5H5.5Z" />
                    <path d="M4 5a1.5 1.5 0 0 0-1.5 1.5v6A1.5 1.5 0 0 0 4 14h5a1.5 1.5 0 0 0 1.5-1.5V8.621a1.5 1.5 0 0 0-.44-1.06L7.94 5.439A1.5 1.5 0 0 0 6.878 5H4Z" />
                  </svg>
                  Kopier
                </>
              )}
            </Button>
          </div>
        </div>
        <div className="rounded-xl border bg-card overflow-hidden">
          <div className="flex items-center justify-between px-4 py-2 bg-muted/50 border-b">
            <span className="text-xs font-mono text-muted-foreground">
              {tourData.id || "tour"}.ts
            </span>
            <span className="text-xs text-muted-foreground">
              {typeScriptCode.split("\n").length} linjer
            </span>
          </div>
          <div className="max-h-80 overflow-y-auto">
            <pre className="p-4 font-mono text-xs text-foreground whitespace-pre overflow-x-auto">
              {typeScriptCode}
            </pre>
          </div>
        </div>
      </motion.div>

      {/* Action Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="flex gap-3"
      >
        <Button
          onClick={handleCopy}
          disabled={!isValid}
          variant="outline"
          className="flex-1 h-12"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4 mr-2">
            <path d="M7 3.5A1.5 1.5 0 018.5 2h3.879a1.5 1.5 0 011.06.44l3.122 3.12A1.5 1.5 0 0117 6.622V12.5a1.5 1.5 0 01-1.5 1.5h-1v-3.379a3 3 0 00-.879-2.121L10.5 5.379A3 3 0 008.379 4.5H7v-1z" />
            <path d="M4.5 6A1.5 1.5 0 003 7.5v9A1.5 1.5 0 004.5 18h7a1.5 1.5 0 001.5-1.5v-5.879a1.5 1.5 0 00-.44-1.06L9.44 6.44A1.5 1.5 0 008.378 6H4.5z" />
          </svg>
          {copied ? "Kopiert!" : "Kopier kode"}
        </Button>
        <Button onClick={handleDownload} disabled={!isValid} className="flex-1 h-12">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4 mr-2">
            <path d="M10.75 2.75a.75.75 0 00-1.5 0v8.614L6.295 8.235a.75.75 0 10-1.09 1.03l4.25 4.5a.75.75 0 001.09 0l4.25-4.5a.75.75 0 00-1.09-1.03l-2.955 3.129V2.75z" />
            <path d="M3.5 12.75a.75.75 0 00-1.5 0v2.5A2.75 2.75 0 004.75 18h10.5A2.75 2.75 0 0018 15.25v-2.5a.75.75 0 00-1.5 0v2.5c0 .69-.56 1.25-1.25 1.25H4.75c-.69 0-1.25-.56-1.25-1.25v-2.5z" />
          </svg>
          {downloaded ? "Lastet ned!" : "Last ned fil"}
        </Button>
      </motion.div>
    </div>
  );
}
