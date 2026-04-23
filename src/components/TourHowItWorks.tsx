import { useTranslation } from "@/context/LanguageContext";

interface TourHowItWorksProps {
  description: string;
}

export function TourHowItWorks({ description }: TourHowItWorksProps) {
  const { t } = useTranslation();
  return (
    <div className="mt-8 rounded-xl bg-muted/50 border p-4 sm:p-6 text-sm sm:text-base text-muted-foreground">
      <p className="font-medium text-foreground">{t("home.howItWorks")}</p>
      <p className="mt-2">{description}</p>
    </div>
  );
}
