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
    if (savedLanguage && (savedLanguage === "en" || savedLanguage === "no")) {
      setLanguageState(savedLanguage);
    } else {
      const browserLang = navigator.language.split("-")[0];
      if (browserLang === "en") {
        setLanguageState("en");
      } else {
        setLanguageState("no");
      }
    }
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
      if (value && typeof value === "object" && key in value) {
        value = value[key];
      } else {
        console.warn(`Translation key not found: ${path}`);
        return path;
      }
    }

    if (typeof value === "function") {
      return value(vars);
    }

    if (typeof value === "string" && vars && Object.keys(vars).length > 0) {
      return value.replace(/\{(\w+)\}/g, (_, k) =>
        vars[k] !== undefined ? vars[k] : `{${k}}`
      );
    }

    return value;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {!isInitialized ? null : children}
    </LanguageContext.Provider>
  );
}

export function useTranslation() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useTranslation must be used within LanguageProvider");
  }
  return context;
}
