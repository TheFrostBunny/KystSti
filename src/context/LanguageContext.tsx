import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { translations } from "@/i18n/translations";

export type Language = "no" | "en";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (path: string, ...args: any[]) => any;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("no");
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize language from localStorage or detect from browser
  useEffect(() => {
    const savedLanguage = localStorage.getItem("kyststi-language") as Language | null;
    if (savedLanguage && (savedLanguage === "en" || savedLanguage === "no")) {
      setLanguageState(savedLanguage);
    } else {
      // Detect from browser language
      const browserLang = navigator.language.split("-")[0];
      if (browserLang === "en") {
        setLanguageState("en");
      } else {
        // Default to Norwegian for anything else
        setLanguageState("no");
      }
    }
    setIsInitialized(true);
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("kyststi-language", lang);
  };

  // Helper function to traverse nested translation keys
  const t = (path: string, ...args: any[]): any => {
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

    // If it's a function (like for dynamic text), call it with args
    if (typeof value === "function") {
      return value(...args);
    }

    return value;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {isInitialized ? children : <div />}
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
