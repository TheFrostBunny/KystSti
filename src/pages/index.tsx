import { TourHeader } from "@/components/TourHeader";
import { StartTourButton } from "@/components/StartTourButton";
import { TourSelector } from "@/components/TourSelector";
import { ThemeToggle } from "@/components/ThemeToggle";
import { motion } from "framer-motion";
import { tours, getTourById } from "@/data/tours";
import { useTour } from "@/context/TourContext";
import { useTranslation } from "@/context/LanguageContext";
import { BottomNav } from "@/components/BottomNav";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import  Button  from "@/components/ui/button";
import { LogoIconContainer } from "@/components/LogoIconContainer";
import { TourStats } from "@/components/TourStats";
import { TourProgress } from "@/components/TourProgress";
import { TourHowItWorks } from "@/components/TourHowItWorks";
import { useEffect } from "react";
import { PageTransition } from "@/components/PageTransition";

export default function HomePage() {
  const { currentTour, currentTourId, getProgress, setCurrentTour } = useTour();
  const { language } = useTranslation();

  // Set first tour as default if no tour is selected
  useEffect(() => {
    if (!currentTourId && tours.length > 0) {
      setCurrentTour(tours[0].id);
    }
  }, []);

  const progress = getProgress();

  // Show a loading state if no tour is selected yet
  if (!currentTour && tours.length > 0) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <PageTransition className="flex min-h-screen flex-col">
      <div className="flex items-center justify-center gap-3 pt-4 px-4 md:hidden">
        <LanguageSwitcher />
        <ThemeToggle />
      </div>
      <div className="relative flex flex-1 flex-col items-center justify-center px-4 sm:px-6 py-12 md:py-20 pb-24 text-center">
        <div className="pointer-events-none absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />

        <div className="relative z-10 w-full max-w-3xl mx-auto">
          <LogoIconContainer />

          {tours.length > 1 && (
            <div className="mb-6">
              <TourSelector />
            </div>
          )}

          <TourHeader
            title={typeof currentTour?.title === 'object' ? currentTour.title[language as 'no' | 'en'] : (currentTour?.title || "KystSti")}
            subtitle={typeof currentTour?.subtitle === 'object' ? currentTour.subtitle[language as 'no' | 'en'] : (currentTour?.subtitle || "Opplev kysten på en ny måte")}
            description={typeof currentTour?.description === 'object' ? currentTour.description[language as 'no' | 'en'] : (currentTour?.description || "Utforsk vakre kyststier med interaktive turer, QR-koder og lydguider.")}
          />

          {currentTour && (
            <TourStats
              stops={currentTour.stops?.length || 0}
              estimatedTime={
                typeof currentTour.estimatedTime === 'object'
                  ? currentTour.estimatedTime[language as 'no' | 'en']
                  : currentTour.estimatedTime
              }
            />
          )}

          {currentTour && (
            <TourProgress
              unlocked={progress.unlocked}
              total={progress.total}
              link={`/tur/${currentTour.id}/stopp`}
            />
          )}

          <TourHowItWorks
            description={typeof currentTour?.howItWorks === 'object' ? currentTour.howItWorks[language as 'no' | 'en'] : (currentTour?.howItWorks || "Finn QR-kodene ved hvert stopp for å låse opp historier, bilder og lydguider!")}
          />

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <StartTourButton to={currentTour ? `/tur/${currentTour.id}/stopp` : '/turer'} />
          </div>
        </div>
      </div>
      <BottomNav />
    </PageTransition>
  );
}
