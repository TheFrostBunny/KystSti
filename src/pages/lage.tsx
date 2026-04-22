import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BottomNav } from "@/components/BottomNav";
import { TourBuilderForm } from "@/components/TourBuilder/TourBuilderForm";
import { StopManager } from "@/components/TourBuilder/StopManager";
import { ExportPanel } from "@/components/TourBuilder/ExportPanel";
import type { Tour, TourStop } from "@/data/tours";

const tabs = [
  {
    id: "tour" as const,
    label: "Turdetaljer",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
        <path fillRule="evenodd" d="M4.5 2A1.5 1.5 0 003 3.5v13A1.5 1.5 0 004.5 18h11a1.5 1.5 0 001.5-1.5V7.621a1.5 1.5 0 00-.44-1.06l-4.12-4.122A1.5 1.5 0 0011.378 2H4.5zm2.25 8.5a.75.75 0 000 1.5h6.5a.75.75 0 000-1.5h-6.5zm0 3a.75.75 0 000 1.5h6.5a.75.75 0 000-1.5h-6.5z" clipRule="evenodd" />
      </svg>
    ),
  },
  {
    id: "stops" as const,
    label: "Stopp",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
        <path fillRule="evenodd" d="m9.69 18.933.003.001C9.89 19.02 10 19 10 19s.11.02.308-.066l.002-.001.006-.003.018-.008a5.741 5.741 0 00.281-.14c.186-.096.446-.24.757-.433.62-.384 1.445-.966 2.274-1.765C15.302 14.988 17 12.493 17 9A7 7 0 103 9c0 3.492 1.698 5.988 3.355 7.584a13.731 13.731 0 002.273 1.765 11.842 11.842 0 00.976.544l.062.029.018.008.006.003zM10 11.25a2.25 2.25 0 100-4.5 2.25 2.25 0 000 4.5z" clipRule="evenodd" />
      </svg>
    ),
  },
  {
    id: "export" as const,
    label: "Eksporter",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
        <path d="M10.75 2.75a.75.75 0 00-1.5 0v8.614L6.295 8.235a.75.75 0 10-1.09 1.03l4.25 4.5a.75.75 0 001.09 0l4.25-4.5a.75.75 0 00-1.09-1.03l-2.955 3.129V2.75z" />
        <path d="M3.5 12.75a.75.75 0 00-1.5 0v2.5A2.75 2.75 0 004.75 18h10.5A2.75 2.75 0 0018 15.25v-2.5a.75.75 0 00-1.5 0v2.5c0 .69-.56 1.25-1.25 1.25H4.75c-.69 0-1.25-.56-1.25-1.25v-2.5z" />
      </svg>
    ),
  },
];

export default function TourBuilderPage() {
  const [activeTab, setActiveTab] = useState<"tour" | "stops" | "export">("tour");
  const [tourData, setTourData] = useState<Partial<Tour>>({
    id: "",
    title: "",
    subtitle: "",
    description: "",
    howItWorks: "",
    estimatedTime: "",
    distance: "",
    difficulty: "lett",
    coverImage: "",
    mapCenter: { lat: 63.111, lng: 7.729 },
    mapZoom: 15,
    stops: [],
  });

  const handleTourChange = (updates: Partial<Tour>) => {
    setTourData((prev) => ({ ...prev, ...updates }));
  };

  const handleAddStop = (stop: TourStop) => {
    setTourData((prev) => ({
      ...prev,
      stops: [...(prev.stops || []), stop],
    }));
  };

  const handleUpdateStop = (index: number, stop: TourStop) => {
    setTourData((prev) => ({
      ...prev,
      stops: prev.stops?.map((s, i) => (i === index ? stop : s)) || [],
    }));
  };

  const handleDeleteStop = (index: number) => {
    setTourData((prev) => ({
      ...prev,
      stops: prev.stops?.filter((_, i) => i !== index) || [],
    }));
  };

  const completedSteps = [
    tourData.title,
    tourData.subtitle,
    tourData.description,
    (tourData.stops?.length || 0) > 0,
  ].filter(Boolean).length;

  return (
    <div className="flex min-h-screen flex-col pb-20">
      {/* Header with gradient */}
      <header className="relative overflow-hidden border-b bg-linear-to-br from-primary/5 via-background to-accent/5">
        <div className="pointer-events-none absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
        <div className="relative mx-auto max-w-4xl px-4 lg:px-8 py-6 lg:py-8">
          <div className="flex items-start gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-primary/10">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-7 w-7 text-primary">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <h1 className="font-display text-2xl lg:text-3xl font-bold text-balance">
                Lag din egen tur
              </h1>
              <p className="text-muted-foreground mt-1">
                Opprett en interaktiv tur med stopp, bilder og QR-koder
              </p>
            </div>
          </div>
          
          {/* Progress indicator */}
          <div className="mt-6">
            <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
              <span>Fremgang</span>
              <span>{completedSteps}/4 fullfort</span>
            </div>
            <div className="h-2 rounded-full bg-muted overflow-hidden">
              <motion.div
                className="h-full bg-primary"
                initial={{ width: 0 }}
                animate={{ width: `${(completedSteps / 4) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>
        </div>
      </header>

      {/* Tab Navigation */}
      <div className="sticky top-0 z-30 border-b bg-card/80 backdrop-blur-lg">
        <div className="mx-auto max-w-4xl px-4 lg:px-8">
          <div className="flex gap-1 -mx-4 px-4 lg:mx-0 lg:px-0 overflow-x-auto scrollbar-none">
            {tabs.map((tab, index) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative flex items-center gap-2 px-4 py-3.5 font-medium text-sm whitespace-nowrap transition-colors ${
                  activeTab === tab.id
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <span className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold transition-colors ${
                  activeTab === tab.id 
                    ? "bg-primary text-primary-foreground" 
                    : "bg-muted text-muted-foreground"
                }`}>
                  {index + 1}
                </span>
                <span className="hidden sm:inline">{tab.label}</span>
                <span className="sm:hidden">{tab.icon}</span>
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <main className="flex-1">
        <div className="mx-auto max-w-4xl px-4 lg:px-8 py-6 lg:py-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {activeTab === "tour" && (
                <div className="space-y-6">
                  <div className="flex items-center gap-3 pb-2">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                      {tabs[0].icon}
                    </div>
                    <div>
                      <h2 className="font-display text-xl font-semibold">Turdetaljer</h2>
                      <p className="text-sm text-muted-foreground">Fyll ut informasjon om turen</p>
                    </div>
                  </div>
                  <TourBuilderForm tourData={tourData} onChange={handleTourChange} />
                </div>
              )}
              {activeTab === "stops" && (
                <StopManager
                  stops={tourData.stops || []}
                  tourId={tourData.id || ""}
                  onAdd={handleAddStop}
                  onUpdate={handleUpdateStop}
                  onDelete={handleDeleteStop}
                />
              )}
              {activeTab === "export" && <ExportPanel tourData={tourData as Tour} />}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      {/* Navigation hints */}
      <div className="fixed bottom-20 left-0 right-0 px-4 pb-4 pointer-events-none">
        <div className="mx-auto max-w-4xl">
          <div className="flex justify-between pointer-events-auto">
            {activeTab !== "tour" && (
              <motion.button
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                onClick={() => setActiveTab(activeTab === "export" ? "stops" : "tour")}
                className="flex items-center gap-1.5 rounded-full bg-card border px-4 py-2 text-sm font-medium shadow-lg hover:shadow-xl transition-shadow"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4">
                  <path fillRule="evenodd" d="M14 8a.75.75 0 0 1-.75.75H4.56l3.22 3.22a.75.75 0 1 1-1.06 1.06l-4.5-4.5a.75.75 0 0 1 0-1.06l4.5-4.5a.75.75 0 0 1 1.06 1.06L4.56 7.25h8.69A.75.75 0 0 1 14 8Z" clipRule="evenodd" />
                </svg>
                Forrige
              </motion.button>
            )}
            <div /> {/* Spacer */}
            {activeTab !== "export" && (
              <motion.button
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                onClick={() => setActiveTab(activeTab === "tour" ? "stops" : "export")}
                className="flex items-center gap-1.5 rounded-full bg-primary text-primary-foreground px-4 py-2 text-sm font-medium shadow-lg hover:shadow-xl transition-shadow"
              >
                Neste
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4">
                  <path fillRule="evenodd" d="M2 8a.75.75 0 0 1 .75-.75h8.69L8.22 4.03a.75.75 0 0 1 1.06-1.06l4.5 4.5a.75.75 0 0 1 0 1.06l-4.5 4.5a.75.75 0 0 1-1.06-1.06l3.22-3.22H2.75A.75.75 0 0 1 2 8Z" clipRule="evenodd" />
                </svg>
              </motion.button>
            )}
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
