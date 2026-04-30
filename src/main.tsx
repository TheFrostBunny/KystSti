import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./styles.css";

import { TourProvider } from "@/context/TourContext";
import { LanguageProvider } from "@/context/LanguageContext";
import { ThemeProvider } from "@/context/ThemeContext";
import { AuthProvider } from "@/context/AuthContext";
import App from "./App";
import HomePage from "./pages/index";
import TourDetailPage from "./pages/tur/[tourId]";
import TourStopsPage from "./pages/tur/[tourId]/stopp";
import TourStopDetailPage from "./pages/tur/[tourId]/stopp/[stopId]";
import TourMapPage from "./pages/tur/[tourId]/kart";


import TourBuilderPage from "./pages/lage";
import NotFoundPage from "./pages/not-found";
import { OnlineStatusBanner } from "@/components/OnlineStatusBanner";
import ScanPage from "./pages/skann";
import SettingsPage from "./pages/innstillinger";
import LoginPage from "./pages/logg-inn";
import SignupPage from "./pages/registrer";
import { ProtectedRoute } from "@/components/ProtectedRoute";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider>
      <LanguageProvider>
        <AuthProvider>
          <TourProvider>
            <BrowserRouter>
            <OnlineStatusBanner />
            <Routes>
              <Route element={<App />}>
                <Route index element={<HomePage />} />
                <Route path="tur/:tourId" element={<TourDetailPage />} />
                <Route path="tur/:tourId/stopp" element={<TourStopsPage />} />
                <Route path="tur/:tourId/stopp/:stopId" element={<TourStopDetailPage />} />
                <Route path="tur/:tourId/kart" element={<TourMapPage />} />
                {import.meta.env.VITE_ENABLE_QR_SCANNER === "true" && <Route path="skann" element={<ScanPage />} />}
                <Route path="innstillinger" element={<SettingsPage />} />
                <Route path="lage" element={<ProtectedRoute><TourBuilderPage /></ProtectedRoute>} />
                <Route path="logg-inn" element={<LoginPage />} />
                <Route path="registrer" element={<SignupPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Route>
            </Routes>
            </BrowserRouter>
            </TourProvider>
          </AuthProvider>
        </LanguageProvider>
      </ThemeProvider>
    </React.StrictMode>
);
