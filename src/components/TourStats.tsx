import React from "react";
import { useTranslation } from "@/context/LanguageContext";
import { MobileDrawer } from "@/components/ui/MobileDrawer";
import { useMediaQuery } from "@/hooks/use-media-query";

interface TourStatsProps {
  stops: number;
  estimatedTime: number | string;
}

export function TourStats({ stops, estimatedTime }: TourStatsProps) {
  const { t } = useTranslation();
  const isDesktop = useMediaQuery("(min-width: 768px)"); // md breakpoint

  const content = (
    <div className="flex justify-center gap-6 sm:gap-8 text-sm sm:text-base">
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

  if (isDesktop) {
    return <div className="mt-8">{content}</div>;
  }

  return (
    <MobileDrawer
      triggerText={t("home.tourStats")}
      title={t("home.tourStats")}
      className="mt-8"
      sheetContentClassName="h-[50vh]"
    >
      {content}
    </MobileDrawer>
  );
}
