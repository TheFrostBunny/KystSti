import React, { createContext, useContext, useState, useEffect } from "react";
import { translations, Language } from "@/i18n/translations";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (path: string, ...args: any[]) => any;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("no");
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const savedLanguage = localStorage.getItem("kyststi-language") as Language | null;
    const validLanguage = ["en", "no"].includes(savedLanguage!) ? savedLanguage : null;
    
    const detectedLanguage = validLanguage ?? 
      (navigator.language.split("-")[0] === "en" ? "en" : "no");
    
    setLanguageState(detectedLanguage);
    setIsInitialized(true);
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("kyststi-language", lang);
  };

  const t = (path: string, vars?: Record<string, any>): any => {
    const keys = path.split(".");
    let value: any = translations[language];

    for (const key of keys) {
      value = value?.[key];
      if (value === undefined) {
        console.warn(`Translation key not found: ${path}`);
        return path;
      }
    }

    return typeof value === "function" 
      ? value(vars)
      : typeof value === "string" && vars && Object.keys(vars).length > 0
      ? value.replace(/\{(\w+)\}/g, (_, k) => vars[k] ?? `{${k}}`)
      : value;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {isInitialized ? children : null}
    </LanguageContext.Provider>
  );
}

export function useTranslation() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useTranslation must be used within LanguageProvider");
  return context;
}
