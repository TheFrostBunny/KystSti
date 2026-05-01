import { useState } from "react";
import { useTranslation } from "@/context/LanguageContext";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useMediaQuery } from "@/hooks/use-media-query";

interface TourHowItWorksProps {
  description: string;
}

export function TourHowItWorks({ description }: TourHowItWorksProps) {
  const { t } = useTranslation();
  const isDesktop = useMediaQuery("(min-width: 768px)"); // md breakpoint
  const [open, setOpen] = useState(false);

  if (isDesktop) {
    return (
      <div className="mt-8 rounded-xl bg-muted/50 border p-4 sm:p-6 text-sm sm:text-base text-muted-foreground">
        <p className="font-medium text-foreground">{t("home.howItWorks")}</p>
        <p className="mt-2">{description}</p>
      </div>
    );
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" className="w-full mt-8">
          {t("home.howItWorks")}
        </Button>
      </SheetTrigger>
      <SheetContent side="bottom" className="h-[70vh]">
        <SheetHeader>
          <SheetTitle>{t("home.howItWorks")}</SheetTitle>
        </SheetHeader>
        <div className="mt-4 text-sm text-muted-foreground overflow-y-auto pb-8">
          <p>{description}</p>
        </div>
      </SheetContent>
    </Sheet>
  );
}
