import { Link } from "react-router-dom";
import Button from "@/components/ui/button";
import { useTranslation } from "@/context/LanguageContext";

interface TourProgressProps {
  unlocked: number;
  total: number;
  link: string;
}

export function TourProgress({ unlocked, total, link }: TourProgressProps) {
  const { t } = useTranslation();
  const percent = total > 0 ? (unlocked / total) * 100 : 0;
  return (
    <div className="mt-8 rounded-xl bg-card border p-4 sm:p-6 text-left hover:shadow-md transition-shadow">
      <p className="text-xs text-muted-foreground uppercase tracking-wider">{t("common.progress")}</p>
      <div className="mt-2 flex items-center gap-2">
        <div className="flex-1 h-2 rounded-full bg-muted overflow-hidden">
          <div
            className="h-full bg-primary transition-all"
            style={{ width: `${percent}%` }}
          />
        </div>
        <span className="text-xs text-muted-foreground">
          {t("tourBuilder.stops.unlocked", { unlocked, total }) || `${unlocked}/${total}`}
        </span>
      </div>
      <Button asChild size="sm" className="mt-3 w-full">
        <Link to={link}>{t("tourBuilder.stops.showAll")}</Link>
      </Button>
    </div>
  );
}
