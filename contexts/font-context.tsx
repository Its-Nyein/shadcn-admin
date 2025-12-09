"use client";

import * as React from "react";

export type FontOption = "inter" | "manrope" | "system";

const FONT_STORAGE_KEY = "app-font";

export interface FontContextValue {
  font: FontOption;
  setFont: (font: FontOption) => void;
}

export const FontContext = React.createContext<FontContextValue | null>(null);

export function FontProvider({ children }: { children: React.ReactNode }) {
  const [font, setFontState] = React.useState<FontOption>("inter");
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem(FONT_STORAGE_KEY) as FontOption | null;
    if (stored && ["inter", "manrope", "system"].includes(stored)) {
      setFontState(stored);
    }
  }, []);

  React.useEffect(() => {
    if (!mounted) return;

    const root = document.documentElement;

    root.classList.remove("font-inter", "font-manrope", "font-system");

    root.classList.add(`font-${font}`);

    localStorage.setItem(FONT_STORAGE_KEY, font);
  }, [font, mounted]);

  const setFont = React.useCallback((newFont: FontOption) => {
    setFontState(newFont);
  }, []);

  return (
    <FontContext.Provider value={{ font, setFont }}>
      {children}
    </FontContext.Provider>
  );
}

export function useFont() {
  const context = React.useContext(FontContext);
  if (!context) {
    throw new Error("useFont must be used within a FontProvider");
  }
  return context;
}
