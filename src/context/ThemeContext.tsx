import React, { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark" | "system";

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  isDark: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(() => {
    // Try to get theme from localStorage
    const stored = localStorage.getItem("kyststi-theme");
    if (stored === "light" || stored === "dark" || stored === "system") {
      return stored;
    }
    // Default to system
    return "system";
  });

  const [isDark, setIsDark] = useState(false);

  // Update DOM and isDark state based on theme
  useEffect(() => {
    const updateTheme = () => {
      const html = document.documentElement;
      let shouldBeDark = false;

      if (theme === "system") {
        shouldBeDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      } else {
        shouldBeDark = theme === "dark";
      }

      if (shouldBeDark) {
        html.classList.add("dark");
      } else {
        html.classList.remove("dark");
      }

      setIsDark(shouldBeDark);
    };

    updateTheme();

    // Listen for system theme changes if in system mode
    if (theme === "system") {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      mediaQuery.addEventListener("change", updateTheme);
      return () => mediaQuery.removeEventListener("change", updateTheme);
    }
  }, [theme]);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    localStorage.setItem("kyststi-theme", newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, isDark }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
