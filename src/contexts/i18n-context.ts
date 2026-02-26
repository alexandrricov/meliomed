import { createContext } from "react";
import type { TranslationKey } from "@/i18n/ro";

export type Lang = "ro" | "en";

export interface I18nContextValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (key: TranslationKey, params?: Record<string, string | number>) => string;
}

export const I18nContext = createContext<I18nContextValue | null>(null);
