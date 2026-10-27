"use client";

import React, { createContext, useContext, useSyncExternalStore, useCallback, useEffect } from "react";

type Theme = "dark" | "light";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

const listeners = new Set<() => void>();

function getThemeSnapshot(): Theme {
  if (typeof window === "undefined" || typeof document === "undefined") return "dark";
  if (document.documentElement.classList.contains("dark")) return "dark";
  const saved = localStorage.getItem("theme");
  if (saved === "light") return "light";
  return "dark";
}

function getServerSnapshot(): Theme {
  return "dark";
}

function notify() {
  for (const listener of listeners) {
    listener();
  }
}

function applyTheme(theme: Theme) {
  try {
    localStorage.setItem("theme", theme);
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  } catch {}
  notify();
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const theme = useSyncExternalStore(
    (callback) => {
      listeners.add(callback);
      window.addEventListener("storage", callback);
      return () => {
        listeners.delete(callback);
        window.removeEventListener("storage", callback);
      };
    },
    getThemeSnapshot,
    getServerSnapshot
  );

  useEffect(() => {
    // Ensure dark is initialized in localStorage if not set
    const saved = localStorage.getItem("theme") as Theme | null;
    if (!saved) {
      applyTheme("dark");
    } else {
      applyTheme(saved);
    }
  }, []);

  const setTheme = useCallback((newTheme: Theme) => {
    applyTheme(newTheme);
  }, []);

  const toggleTheme = useCallback(() => {
    const current = getThemeSnapshot();
    const next = current === "dark" ? "light" : "dark";
    applyTheme(next);
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
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
