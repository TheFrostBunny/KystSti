import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./styles.css";

import { TourProvider } from "@/context/TourContext";
import App from "./App";
import HomePage from "./pages/index";
import TourDetailPage from "./pages/tur/[tourId]";
import TourStopsPage from "./pages/tur/[tourId]/stopp";
import TourStopDetailPage from "./pages/tur/[tourId]/stopp/[stopId]";
import TourMapPage from "./pages/tur/[tourId]/kart";
import { appConfig } from "@/config";
import AboutPage from "./pages/om";
import NotFoundPage from "./pages/not-found";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <TourProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<App />}>
            <Route index element={<HomePage />} />
            <Route path="tur/:tourId" element={<TourDetailPage />} />
            <Route path="tur/:tourId/stopp" element={<TourStopsPage />} />
            <Route path="tur/:tourId/stopp/:stopId" element={<TourStopDetailPage />} />
            <Route path="tur/:tourId/kart" element={<TourMapPage />} />
            {appConfig.enableQrScanner && <Route path="skann" element={<ScanPage />} />}
            <Route path="om" element={<AboutPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </TourProvider>
  </React.StrictMode>
);
