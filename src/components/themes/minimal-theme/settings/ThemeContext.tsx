"use client";

import React, { createContext, useContext, ReactNode } from "react";
import { useBuilder } from "@/providers/builder-context-provider";
import { MINIMAL_THEME_SETTINGS } from "./index";

type ThemeContextType = {
  colors: typeof MINIMAL_THEME_SETTINGS.colors;
  fonts: typeof MINIMAL_THEME_SETTINGS.fonts;
  borderRadius: typeof MINIMAL_THEME_SETTINGS.borderRadius;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const { state } = useBuilder();

  const themeSettings = {
    ...MINIMAL_THEME_SETTINGS,
    ...state.themeSettings,
  };

  return (
    <ThemeContext.Provider
      value={{
        colors: themeSettings.colors,
        fonts: themeSettings.fonts,
        borderRadius: themeSettings.borderRadius,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
