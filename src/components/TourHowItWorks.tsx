import { useTranslation } from "@/context/LanguageContext";
import { MobileDrawer } from "@/components/ui/MobileDrawer";

interface TourHowItWorksProps {
  description: string;
}

export function TourHowItWorks({ description }: TourHowItWorksProps) {
  const { t } = useTranslation();

  return (
    <MobileDrawer
      triggerText={t("home.howItWorks")}
      title={t("home.howItWorks")}
      className="mt-8 rounded-xl bg-muted/50 border p-4 sm:p-6 text-sm sm:text-base text-muted-foreground"
      desktopContent={
        <>
          <p className="font-medium text-foreground">{t("home.howItWorks")}</p>
          <p className="mt-2">{description}</p>
        </>
      }
      sheetContentClassName="h-[70vh]"
    >
      <p>{description}</p>
    </MobileDrawer>
  );
}
