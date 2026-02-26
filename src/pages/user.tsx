import { Icon } from "@/components/ui/icon";
import type { Lang } from "@/contexts/i18n-context";
import { useI18n } from "@/hooks/useI18n";
import { useTheme } from "@/hooks/useTheme";

const languages: { code: Lang; label: string }[] = [
  { code: "ro", label: "Română" },
  { code: "en", label: "English" },
];

function ThemeToggle() {
  const { resolved, setTheme } = useTheme();
  const { t } = useI18n();
  const isDark = resolved === "dark";

  return (
    <button
      type="button"
      aria-label={isDark ? t("Switch to light theme") : t("Switch to dark theme")}
      className="bg-bg-card shadow-card rounded-outer flex w-full items-center justify-between px-4 py-3"
      onClick={() => {
        setTheme(isDark ? "light" : "dark");
      }}
    >
      <div className="flex items-center gap-3">
        <Icon
          name={isDark ? "moon" : "sun"}
          size={24}
          className="text-text-secondary"
        />
        <span className="text-text-primary font-semibold">
          {isDark ? t("Dark theme") : t("Light theme")}
        </span>
      </div>
      <Icon
        name={isDark ? "sun" : "moon"}
        size={20}
        className="text-text-tertiary"
      />
    </button>
  );
}

function LanguageSwitcher() {
  const { lang, setLang, t } = useI18n();

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
            onClick={() => {
              setLang(l.code);
            }}
          >
            {l.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export function UserPage() {
  const { t } = useI18n();

  return (
    <div className="flex flex-col gap-6 pt-6">
      <section aria-label={t("Appearance")}>
        <h2 className="text-text-secondary text-small mb-3 font-semibold tracking-wider uppercase">
          {t("Appearance")}
        </h2>
        <ThemeToggle />
      </section>

      <section aria-label={t("Language")}>
        <h2 className="text-text-secondary text-small mb-3 font-semibold tracking-wider uppercase">
          {t("Language")}
        </h2>
        <LanguageSwitcher />
      </section>
    </div>
  );
}
