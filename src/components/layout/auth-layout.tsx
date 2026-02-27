import { Outlet } from "react-router";
import { useI18n } from "@/hooks/useI18n";

export function AuthLayout() {
  const { lang, setLang, t } = useI18n();

  return (
    <div className="bg-bg-page relative flex min-h-screen items-center justify-center px-4">
      {/* Background gradient */}
      <div
        className="pointer-events-none fixed inset-0"
        aria-hidden="true"
        style={{
          background: "var(--gradient-overlay)",
          opacity: "var(--gradient-overlay-opacity)",
        }}
      />

      <div className="rounded-card bg-bg-card shadow-card relative z-10 w-full max-w-105 p-8">
        {/* Logo */}
        <div className="mb-8 flex items-center justify-center gap-2">
          <div
            className="rounded-inner flex h-10 w-10 items-center justify-center font-extrabold text-white"
            style={{
              background:
                "linear-gradient(to right, var(--gradient-brand-from), var(--gradient-brand-to))",
            }}
          >
            <span className="text-[28px]">M</span>
          </div>
          <span className="text-text-primary text-2xl leading-9.5 font-extrabold">
            melio
          </span>
        </div>

        <Outlet />

        {/* Language switcher */}
        <div
          className="mt-6 flex justify-center gap-1"
          role="radiogroup"
          aria-label={t("Language")}
        >
          {(["ro", "en"] as const).map((code) => (
            <button
              key={code}
              type="button"
              role="radio"
              aria-checked={lang === code}
              className={`rounded-inner px-3 py-1 text-small font-semibold transition-colors ${
                lang === code
                  ? "bg-status-optimal-bg text-status-optimal"
                  : "text-text-secondary hover:text-text-primary"
              }`}
              onClick={() => {
                setLang(code);
              }}
            >
              {code === "ro" ? "Română" : "English"}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
