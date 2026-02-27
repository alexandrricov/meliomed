import { useEffect } from "react";
import { Icon } from "@/components/ui/icon";
import type { Lang } from "@/contexts/i18n-context";
import type { Theme } from "@/contexts/theme-context";
import { useI18n } from "@/hooks/useI18n";
import { useGetPreferences, useUpdatePreference } from "@/hooks/usePreferences";
import { useTheme } from "@/hooks/useTheme";

const languages: { code: Lang; label: string }[] = [
  { code: "ro", label: "Română" },
  { code: "en", label: "English" },
];

const themeOptions = [
  { value: "system", label: "Auto" },
  { value: "light", label: "Light" },
  { value: "dark", label: "Dark" },
] as const satisfies readonly { value: Theme; label: string }[];

function ThemeToggle({ onChangeTheme }: { onChangeTheme: (t: Theme) => void }) {
  const { theme, resolved } = useTheme();
  const { t } = useI18n();

  return (
    <div className="bg-bg-card shadow-card rounded-outer flex w-full items-center justify-between px-4 py-3">
      <div className="flex items-center gap-3">
        <Icon
          name={resolved === "dark" ? "moon" : "sun"}
          size={24}
          className="text-text-secondary"
        />
        <span className="text-text-primary font-semibold">
          {t("Appearance")}
        </span>
      </div>
      <div className="flex gap-1" role="radiogroup" aria-label={t("Appearance")}>
        {themeOptions.map((opt) => (
          <button
            key={opt.value}
            type="button"
            role="radio"
            aria-checked={theme === opt.value}
            className={`rounded-inner px-3 py-1 text-small font-semibold transition-colors ${
              theme === opt.value
                ? "bg-status-optimal-bg text-status-optimal"
                : "text-text-secondary hover:text-text-primary"
            }`}
            onClick={() => { onChangeTheme(opt.value); }}
          >
            {t(opt.label)}
          </button>
        ))}
      </div>
    </div>
  );
}

function LanguageSwitcher({ onChangeLang }: { onChangeLang: (l: Lang) => void }) {
  const { lang, t } = useI18n();

  return (
    <div className="bg-bg-card shadow-card rounded-outer flex w-full items-center justify-between px-4 py-3">
      <div className="flex items-center gap-3">
        <span className="flex h-6 w-6 items-center justify-center text-base text-text-secondary" aria-hidden="true">
          {lang === "ro" ? "RO" : "EN"}
        </span>
        <span className="text-text-primary font-semibold">
          {t("Language")}
        </span>
      </div>
      <div className="flex gap-1">
        {languages.map((l) => (
          <button
            key={l.code}
            type="button"
            aria-pressed={lang === l.code}
            className={`rounded-inner px-3 py-1 text-small font-semibold transition-colors ${
              lang === l.code
                ? "bg-status-optimal-bg text-status-optimal"
                : "text-text-secondary hover:text-text-primary"
            }`}
            onClick={() => { onChangeLang(l.code); }}
          >
            {l.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export function UserPage() {
  const { t, setLang } = useI18n();
  const { setTheme } = useTheme();
  const { data: prefs } = useGetPreferences();
  const { mutate: updatePref } = useUpdatePreference();

  // Sync server preferences to local context on load
  useEffect(() => {
    if (!prefs) return;
    setTheme(prefs.dark_mode ? "dark" : "light");
    setLang(prefs.language);
  }, [prefs, setTheme, setLang]);

  function handleThemeChange(theme: Theme) {
    setTheme(theme);
    updatePref({ key: "dark_mode", value: theme === "dark" });
  }

  function handleLangChange(newLang: Lang) {
    setLang(newLang);
    updatePref({ key: "language", value: newLang });
  }

  return (
    <div className="flex flex-col gap-6 pt-6">
      <section aria-label={t("Appearance")}>
        <h2 className="text-text-secondary text-small mb-3 font-semibold tracking-wider uppercase">
          {t("Appearance")}
        </h2>
        <ThemeToggle onChangeTheme={handleThemeChange} />
      </section>

      <section aria-label={t("Language")}>
        <h2 className="text-text-secondary text-small mb-3 font-semibold tracking-wider uppercase">
          {t("Language")}
        </h2>
        <LanguageSwitcher onChangeLang={handleLangChange} />
      </section>
    </div>
  );
}
