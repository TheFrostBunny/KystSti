import { useTranslation } from "@/context/LanguageContext";
import { Button } from "@/components/ui/button";

export function LanguageSwitcher() {
  const { language, setLanguage } = useTranslation();

  return (
    <div className="flex gap-1 bg-muted rounded-lg p-1">
      <Button
        variant={language === "no" ? "default" : "ghost"}
        size="sm"
        onClick={() => setLanguage("no")}
        className="h-8 px-2 text-xs font-medium rounded"
      >
        NO
      </Button>
      <Button
        variant={language === "en" ? "default" : "ghost"}
        size="sm"
        onClick={() => setLanguage("en")}
        className="h-8 px-2 text-xs font-medium rounded"
      >
        EN
      </Button>
    </div>
  );
}
