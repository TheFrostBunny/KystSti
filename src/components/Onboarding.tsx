import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, QrCode, Volume2, ChevronRight, X } from "lucide-react";
import Button  from "@/components/ui/button";
import { appConfig } from "@/config";

const ONBOARDING_KEY = "kyststi-onboarding-complete";

interface OnboardingStep {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const steps: OnboardingStep[] = [
  {
    icon: <MapPin className="h-12 w-12" />,
    title: "Utforsk turer",
    description:
      "Velg mellom flere turer i Kristiansund-området. Hver tur har unike stopp med historier og informasjon.",
  },
  {
    icon: <QrCode className="h-12 w-12" />,
    title: "Skann QR-koder",
    description:
      "Ved hvert stopp finner du en QR-kode. Skann den for å låse opp innhold og registrere fremgangen din.",
  },
  {
    icon: <Volume2 className="h-12 w-12" />,
    title: "Lytt til historiene",
    description:
      "Mange stopp har lydguider som forteller deg mer om stedet. Bare trykk play og lytt mens du utforsker.",
  },
];

export function Onboarding() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    if (!appConfig.enableOnboarding) return;

    const hasCompleted = localStorage.getItem(ONBOARDING_KEY);
    if (!hasCompleted) {
      setIsOpen(true);
    }
  }, []);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleComplete();
    }
  };

  const handleComplete = () => {
    localStorage.setItem(ONBOARDING_KEY, "true");
    setIsOpen(false);
  };

  const handleSkip = () => {
    handleComplete();
  };

  if (!appConfig.enableOnboarding || !isOpen) return null;

  const step = steps[currentStep];
  const isLastStep = currentStep === steps.length - 1;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/60 backdrop-blur-sm p-4"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="relative w-full max-w-sm bg-card rounded-2xl shadow-xl overflow-hidden"
        >
          {/* Skip button */}
          <button
            onClick={handleSkip}
            className="absolute top-4 right-4 p-2 text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Hopp over"
          >
            <X className="h-5 w-5" />
          </button>

          {/* Content */}
          <div className="p-8 pt-12">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                className="flex flex-col items-center text-center"
              >
                <div className="mb-6 p-4 rounded-full bg-primary/10 text-primary">
                  {step.icon}
                </div>
                <h2 className="text-2xl font-semibold mb-3 text-foreground">
                  {step.title}
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Progress dots */}
          <div className="flex justify-center gap-2 pb-4">
            {steps.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentStep(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentStep
                    ? "w-6 bg-primary"
                    : "w-2 bg-muted-foreground/30"
                }`}
                aria-label={`Gå til steg ${index + 1}`}
              />
            ))}
          </div>

          {/* Actions */}
          <div className="p-4 pt-0">
            <Button
              onClick={handleNext}
              className="w-full gap-2"
              size="lg"
            >
              {isLastStep ? "Kom i gang" : "Neste"}
              {!isLastStep && <ChevronRight className="h-4 w-4" />}
            </Button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
