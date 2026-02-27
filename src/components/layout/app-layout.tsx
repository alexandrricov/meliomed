import { Outlet } from "react-router";
import { useI18n } from "@/hooks/useI18n";
import { DashboardHeader } from "./dashboard-header";

export function AppLayout() {
  const { t } = useI18n();

  return (
    <div className="bg-bg-page relative min-h-screen">
      {/* Background gradient overlay */}
      <div
        className="pointer-events-none fixed inset-0"
        aria-hidden="true"
        style={{
          background: "var(--gradient-overlay)",
          opacity: "var(--gradient-overlay-opacity)",
        }}
      />

      {/* Skip to content */}
      <a
        href="#main-content"
        className="focus:rounded-inner focus:bg-bg-card focus:shadow-card sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2"
      >
        {t("Skip to main content")}
      </a>

      <DashboardHeader />

      <main
        id="main-content"
        className="relative z-10 mx-auto max-w-360 px-4 pt-16 pb-16 lg:px-6"
      >
        <Outlet />
      </main>
    </div>
  );
}
