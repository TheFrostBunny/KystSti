import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./styles.css";

import App from "./App";
import HomePage from "./pages/index";
import StopListPage from "./pages/stopp-liste";
import MapPage from "./pages/kart";
import AboutPage from "./pages/om";
import StopDetailPage from "./pages/stopp/[stopId]";
import NotFoundPage from "./pages/not-found";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<App />}>
          <Route index element={<HomePage />} />
          <Route path="stopp-liste" element={<StopListPage />} />
          <Route path="kart" element={<MapPage />} />
          <Route path="om" element={<AboutPage />} />
          <Route path="stopp/:stopId" element={<StopDetailPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
