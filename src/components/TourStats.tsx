import React from "react";

import { useTranslation } from "@/context/LanguageContext";

interface TourStatsProps {
  stops: number;
  estimatedTime: number | string;
}

export function TourStats({ stops, estimatedTime }: TourStatsProps) {
  const { t } = useTranslation();
  return (
    <div className="mt-8 flex justify-center gap-6 sm:gap-8 text-sm sm:text-base">
      <div className="text-center">
        <div className="font-display text-2xl sm:text-3xl font-bold text-primary">{stops}</div>
        <div className="text-xs sm:text-sm text-muted-foreground mt-1">{t("home.stops")}</div>
      </div>
      <div className="h-10 w-px bg-border" />
      <div className="text-center">
        <div className="font-display text-2xl sm:text-3xl font-bold text-primary">{estimatedTime}</div>
        <div className="text-xs sm:text-sm text-muted-foreground mt-1">{t("home.estimatedTime")}</div>
      </div>
    </div>
  );
}
