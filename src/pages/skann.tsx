import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import QrScanner from "react-qr-scanner";
import { useTour } from "@/context/TourContext";
import { useTranslation } from "@/context/LanguageContext";
import { getTourById } from "@/data/tours";
import { BottomNav } from "@/components/BottomNav";
import Button from "@/components/ui/button";
import { useState } from "react";

type ScanStatus = "idle" | "scanning" | "success" | "error";

export default function ScanPage() {
  const navigate = useNavigate();
  const { unlockStop, currentTourId, setCurrentTour } = useTour();
  const { t } = useTranslation();
  const [status, setStatus] = useState<ScanStatus>("scanning");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [hasCamera, setHasCamera] = useState(true);

  const handleScan = (data: { text: string } | null) => {
    if (data) {
      handleQRCode(data.text);
    }
  };

  const handleError = (err: any) => {
    console.error(err);
    setHasCamera(false);
    setErrorMessage(t('scanner.cameraPermission'));
    setStatus("error");
  };

  const handleQRCode = (data: string) => {
    if (status === "success") return; // Already handling a success

    // Expected format: kyststi://tour/{tourId}/stop/{stopId} or simpler: {tourId}/{stopId}
    const match = data.match(/(?:kyststi:\/\/tour\/)?([^\/]+)\/(?:stop\/)?([^\/]+)/);
    
    if (match) {
      const [, tourId, stopId] = match;
      const tour = getTourById(tourId);
      
      if (tour) {
        const stop = tour.stops.find((s) => s.id === stopId);
        if (stop) {
          setStatus("success");
          if (currentTourId !== tourId) {
            setCurrentTour(tourId);
          }
          unlockStop(stopId);
          setSuccessMessage(`${stop.title} ${t('tour.unlockedBanner')}`);
          
          setTimeout(() => {
            navigate(`/tur/${tourId}/stopp/${stopId}`);
          }, 1500);
          return;
        }
      }
    }

    // Invalid QR code
    setStatus("error");
    setErrorMessage(t('scanner.scanning'));
    setTimeout(() => setStatus("scanning"), 2000);
  };
  
  const handleManualInput = () => {
    const input = prompt(t('scanner.scanInstructions'));
    if (input) {
      handleQRCode(input);
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-black">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-black/95 backdrop-blur-md border-b border-white/10">
        <div className="flex h-14 items-center px-4 gap-3">
          <button 
            onClick={() => navigate(-1)} 
            className="flex h-10 w-10 items-center justify-center rounded-lg text-white hover:bg-white/10 transition-colors"
          >
            <ArrowLeftIcon className="h-5 w-5" />
          </button>
          <div className="flex-1">
            <h1 className="font-display text-base font-bold text-white">{t('scanner.title')}</h1>
            <p className="text-xs text-white/60">Rett kameraet mot QR-koden</p>
          </div>
        </div>
      </header>

      {/* Camera View */}
      <div className="relative flex-1 flex items-center justify-center overflow-hidden">
        {hasCamera ? (
          <>
            <QrScanner
              delay={300}
              onError={handleError}
              onScan={handleScan}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
              constraints={{ video: { facingMode: "environment" } }}
            />

            {/* Scan overlay */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="relative">
                <div className="w-64 h-64 relative">
                  <div className="absolute top-0 left-0 w-12 h-12 border-t-4 border-l-4 border-white rounded-tl-lg" />
                  <div className="absolute top-0 right-0 w-12 h-12 border-t-4 border-r-4 border-white rounded-tr-lg" />
                  <div className="absolute bottom-0 left-0 w-12 h-12 border-b-4 border-l-4 border-white rounded-bl-lg" />
                  <div className="absolute bottom-0 right-0 w-12 h-12 border-b-4 border-r-4 border-white rounded-br-lg" />
                  
                  {status === "scanning" && (
                    <motion.div
                      className="absolute left-2 right-2 h-1 bg-primary rounded-full"
                      initial={{ top: "10%" }}
                      animate={{ top: ["10%", "90%", "10%"] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    />
                  )}
                </div>
              </div>
            </div>
            
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute inset-0 bg-black/60" style={{
                clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%, 0 0, calc(50% - 128px) calc(50% - 128px), calc(50% - 128px) calc(50% + 128px), calc(50% + 128px) calc(50% + 128px), calc(50% + 128px) calc(50% - 128px), calc(50% - 128px) calc(50% - 128px))"
              }} />
            </div>
          </>
        ) : (
          <div className="text-center text-white p-6">
            <CameraOffIcon className="h-16 w-16 mx-auto mb-4 opacity-50" />
            <p className="text-lg mb-2">{t('scanner.cameraPermission')}</p>
            <p className="text-sm text-white/70 mb-4">{errorMessage}</p>
            <Button onClick={handleManualInput} variant="secondary">
              {t('scanner.scanning')}
            </Button>
          </div>
        )}

        {/* Status Messages */}
        <AnimatePresence>
          {status === "success" && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="absolute inset-0 flex items-center justify-center bg-black/80"
            >
              <div className="text-center text-white">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-green-500"
                >
                  <CheckIcon className="h-10 w-10" />
                </motion.div>
                <p className="text-xl font-bold">{successMessage}</p>
              </div>
            </motion.div>
          )}

          {status === "error" && !hasCamera && (
             <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="absolute bottom-24 left-4 right-4 rounded-xl bg-destructive p-4 text-center text-white"
            >
              {errorMessage}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Instructions */}
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="bg-black/95 border-t border-white/10 px-6 py-5 text-center text-white space-y-3"
      >
        <p className="text-sm font-medium text-white/90">
          {t('scanner.scanInstructions')}
        </p>
        <Button 
          onClick={handleManualInput} 
          variant="secondary"
          size="sm"
          className="w-full rounded-lg"
        >
          Skriv inn manuelt
        </Button>
      </motion.div>

      <BottomNav />
    </div>
  );
}


function ArrowLeftIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="m12 19-7-7 7-7" /><path d="M19 12H5" />
    </svg>
  );
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

function CameraOffIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <line x1="2" x2="22" y1="2" y2="22" /><path d="M7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16" /><path d="M9.5 4h5L17 7h3a2 2 0 0 1 2 2v7.5" /><path d="M14.121 15.121A3 3 0 1 1 9.88 10.88" />
    </svg>
  );
}
