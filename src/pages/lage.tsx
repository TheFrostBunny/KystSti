import { useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "@/context/LanguageContext";
import { BottomNav } from "@/components/BottomNav";
import { TourBuilderForm } from "@/components/TourBuilder/TourBuilderForm";
import { StopManager } from "@/components/TourBuilder/StopManager";
import { ExportPanel } from "@/components/TourBuilder/ExportPanel";
import type { Tour, TourStop } from "@/data/tours";

export default function TourBuilderPage() {
  const { t } = useTranslation();
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

  return (
    <div className="flex min-h-screen flex-col pb-20">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur-md">
        <div className="mx-auto max-w-4xl px-4 lg:px-8 py-4">
          <h1 className="font-display text-2xl lg:text-3xl font-bold">Lag en tur</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Opprett en interaktiv tur med stopp og QR-koder
          </p>
        </div>
      </header>

      {/* Tab Navigation */}
      <div className="sticky top-[68px] z-30 border-b bg-card/50 backdrop-blur-sm">
        <div className="mx-auto max-w-4xl px-4 lg:px-8">
          <div className="flex gap-2 overflow-x-auto -mx-4 px-4 lg:mx-0 lg:px-0">
            {(
              [
                { id: "tour", label: "Turdetaljer" },
                { id: "stops", label: "Stopp" },
                { id: "export", label: "Eksporter" },
              ] as const
            ).map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-3 font-medium text-sm whitespace-nowrap transition-colors border-b-2 ${
                  activeTab === tab.id
                    ? "border-primary text-primary"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <main className="flex-1">
        <div className="mx-auto max-w-4xl px-4 lg:px-8 py-6 lg:py-8">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {activeTab === "tour" && (
              <TourBuilderForm
                tourData={tourData}
                onChange={handleTourChange}
              />
            )}
            {activeTab === "stops" && (
              <StopManager
                stops={tourData.stops || []}
                onAdd={handleAddStop}
                onUpdate={handleUpdateStop}
                onDelete={handleDeleteStop}
              />
            )}
            {activeTab === "export" && (
              <ExportPanel tourData={tourData as Tour} />
            )}
          </motion.div>
        </div>
      </main>

      <BottomNav />
    </div>
  );
}
