import { useCallback, useEffect, useMemo, useState } from "react";
import type { Theme } from "@/contexts/theme-context";
import { ThemeContext } from "@/contexts/theme-context";

const STORAGE_KEY = "theme";

function getSystemPreference(): "light" | "dark" {
  if (typeof window === "undefined") return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function getStoredTheme(): Theme {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored === "light" || stored === "dark" || stored === "system") {
    return stored;
  }
  return "system";
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(getStoredTheme);
  const [systemPref, setSystemPref] = useState<"light" | "dark">(
    getSystemPreference,
  );

  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = (e: MediaQueryListEvent) => {
      setSystemPref(e.matches ? "dark" : "light");
    };
    mq.addEventListener("change", handler);
    return () => {
      mq.removeEventListener("change", handler);
    };
  }, []);

  const resolved = theme === "system" ? systemPref : theme;

  useEffect(() => {
    const isDark = resolved === "dark";
    document.documentElement.classList.toggle("dark", isDark);

    // Sync browser chrome color (Safari address bar on iOS)
    const metas = document.querySelectorAll('meta[name="theme-color"]');
    const color = isDark ? "#1a1d27" : "#ffffff";
    metas.forEach((meta) => meta.setAttribute("content", color));
  }, [resolved]);

  const setTheme = useCallback((next: Theme) => {
    setThemeState(next);
    localStorage.setItem(STORAGE_KEY, next);
  }, []);

  const value = useMemo(
    () => ({ theme, resolved, setTheme }),
    [theme, resolved, setTheme],
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}
