import { useCallback, useMemo, useState } from "react";
import { I18nContext } from "@/contexts/i18n-context";
import type { Lang } from "@/contexts/i18n-context";
import ro from "@/i18n/ro";
import type { TranslationKey } from "@/i18n/ro";

const STORAGE_KEY = "lang";

function getStoredLang(): Lang {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored === "ro" || stored === "en") return stored;
  return "ro";
}

// Sync lang attribute before first render (avoids flash)
document.documentElement.lang = getStoredLang();

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>(getStoredLang);

  const setLang = useCallback((next: Lang) => {
    setLangState(next);
    localStorage.setItem(STORAGE_KEY, next);
    document.documentElement.lang = next;
  }, []);

  const t = useCallback(
    (key: TranslationKey, params?: Record<string, string | number>) => {
      const raw = lang === "en" ? (key as string) : ro[key];
      if (!params) return raw;
      return Object.entries(params).reduce<string>(
        (acc, [k, v]) => acc.replaceAll(`{${k}}`, String(v)),
        raw,
      );
    },
    [lang],
  );

  const value = useMemo(() => ({ lang, setLang, t }), [lang, setLang, t]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}
