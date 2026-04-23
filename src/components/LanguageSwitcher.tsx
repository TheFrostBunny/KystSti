import { useTranslation } from "@/context/LanguageContext";
import Button from "@/components/ui/button";
import React from "react";

interface LanguageSwitcherProps {
  center?: boolean;
  className?: string;
}

export function LanguageSwitcher({ center, className }: LanguageSwitcherProps) {
  const { language, setLanguage } = useTranslation();

  const content = (
    <div className={"flex gap-1 bg-muted rounded-lg p-1 " + (className || "")}> 
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
  if (center) {
    return <div className="flex justify-center">{content}</div>;
  }
  return content;
}
