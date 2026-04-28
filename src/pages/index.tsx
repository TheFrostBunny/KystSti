import { TourHeader } from "@/components/TourHeader";
import { StartTourButton } from "@/components/StartTourButton";
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

export default function HomePage() {
  const { currentTour, getProgress, setCurrentTour } = useTour();
  const { language } = useTranslation();

  // Set active tour if not already set
  const envTourId = import.meta.env.VITE_ACTIVE_TOUR_ID || "kristiansund-byvandring";
  if (currentTour?.id !== envTourId) {
    setCurrentTour(envTourId);
  }

  const progress = getProgress();

  return (
    <div className="flex min-h-screen flex-col">
      <LanguageSwitcher center className="pt-4" />
      <div className="relative flex flex-1 flex-col items-center justify-center px-4 sm:px-6 py-16 text-center">
        <div className="pointer-events-none absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10 w-full max-w-2xl"
        >
          <LogoIconContainer />

          <TourHeader
            title={typeof currentTour?.title === 'object' ? currentTour.title[language as 'no' | 'en'] : (currentTour?.title || "KystSti")}
            subtitle={typeof currentTour?.subtitle === 'object' ? currentTour.subtitle[language as 'no' | 'en'] : (currentTour?.subtitle || "Opplev kysten på en ny måte")}
            description={typeof currentTour?.description === 'object' ? currentTour.description[language as 'no' | 'en'] : (currentTour?.description || "Utforsk vakre kyststier med interaktive turer, QR-koder og lydguider.")}
          />

          {currentTour && (
            <TourStats
              stops={currentTour.stops.length}
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
        </motion.div>
      </div>
      <BottomNav />
    </div>
  );
}
