"use client";

import React, { createContext, useContext, useEffect, useMemo } from "react";

// ============================================
// Theme Configuration Types
// ============================================

export interface ThemeConfig {
  colors?: {
    primary?: string;
    primaryHover?: string;
    primaryActive?: string;
    primaryLight?: string;
    primaryDark?: string;
    secondary?: string;
    secondaryHover?: string;
    secondaryActive?: string;
    secondaryLight?: string;
    secondaryDark?: string;
    success?: string;
    successHover?: string;
    successActive?: string;
    successLight?: string;
    successDark?: string;
    warning?: string;
    warningHover?: string;
    warningActive?: string;
    warningLight?: string;
    warningDark?: string;
    danger?: string;
    dangerHover?: string;
    dangerActive?: string;
    dangerLight?: string;
    dangerDark?: string;
    info?: string;
    infoHover?: string;
    infoActive?: string;
    infoLight?: string;
    infoDark?: string;
  };
  typography?: {
    fontFamily?: string;
    fontFamilyMono?: string;
  };
  borderRadius?: {
    sm?: string;
    base?: string;
    md?: string;
    lg?: string;
    xl?: string;
  };
}

interface ThemeContextValue {
  theme: ThemeConfig;
}

// ============================================
// Theme Context
// ============================================

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}

// ============================================
// CSS Variable Mapping
// ============================================

function applyThemeToCSS(theme: ThemeConfig): void {
  const root = document.documentElement;

  // Colors
  if (theme.colors) {
    const colorMap: Record<string, string> = {
      primary: "--ui-color-primary",
      primaryHover: "--ui-color-primary-hover",
      primaryActive: "--ui-color-primary-active",
      primaryLight: "--ui-color-primary-light",
      primaryDark: "--ui-color-primary-dark",
      secondary: "--ui-color-secondary",
      secondaryHover: "--ui-color-secondary-hover",
      secondaryActive: "--ui-color-secondary-active",
      secondaryLight: "--ui-color-secondary-light",
      secondaryDark: "--ui-color-secondary-dark",
      success: "--ui-color-success",
      successHover: "--ui-color-success-hover",
      successActive: "--ui-color-success-active",
      successLight: "--ui-color-success-light",
      successDark: "--ui-color-success-dark",
      warning: "--ui-color-warning",
      warningHover: "--ui-color-warning-hover",
      warningActive: "--ui-color-warning-active",
      warningLight: "--ui-color-warning-light",
      warningDark: "--ui-color-warning-dark",
      danger: "--ui-color-danger",
      dangerHover: "--ui-color-danger-hover",
      dangerActive: "--ui-color-danger-active",
      dangerLight: "--ui-color-danger-light",
      dangerDark: "--ui-color-danger-dark",
      info: "--ui-color-info",
      infoHover: "--ui-color-info-hover",
      infoActive: "--ui-color-info-active",
      infoLight: "--ui-color-info-light",
      infoDark: "--ui-color-info-dark",
    };

    Object.entries(theme.colors).forEach(([key, value]) => {
      if (value && colorMap[key]) {
        root.style.setProperty(colorMap[key], value);
      }
    });
  }

  // Typography
  if (theme.typography) {
    if (theme.typography.fontFamily) {
      root.style.setProperty("--ui-font-family", theme.typography.fontFamily);
    }
    if (theme.typography.fontFamilyMono) {
      root.style.setProperty("--ui-font-family-mono", theme.typography.fontFamilyMono);
    }
  }

  // Border Radius
  if (theme.borderRadius) {
    const radiusMap: Record<string, string> = {
      sm: "--ui-radius-sm",
      base: "--ui-radius-base",
      md: "--ui-radius-md",
      lg: "--ui-radius-lg",
      xl: "--ui-radius-xl",
    };

    Object.entries(theme.borderRadius).forEach(([key, value]) => {
      if (value && radiusMap[key]) {
        root.style.setProperty(radiusMap[key], value);
      }
    });
  }
}

// ============================================
// Theme Provider Component
// ============================================

interface ThemeProviderProps {
  children: React.ReactNode;
  theme?: ThemeConfig;
}

export function ThemeProvider({ children, theme = {} }: ThemeProviderProps) {
  useEffect(() => {
    applyThemeToCSS(theme);
  }, [theme]);

  const value = useMemo(() => ({ theme }), [theme]);

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}
