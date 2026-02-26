import { Outlet } from "react-router";
import { useI18n } from "@/hooks/useI18n";
import { DashboardHeader } from "./dashboard-header";

export function AppLayout() {
  const { t } = useI18n();

  return (
    <div className="bg-bg-page relative min-h-screen">
      {/* Background gradient overlay */}
      <div
        className="pointer-events-none fixed inset-0 opacity-40 dark:opacity-15"
        aria-hidden="true"
        style={{
          background:
            "linear-gradient(to bottom right, #ffbb0d, #ffcf32, #90d178)",
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
        className="relative z-10 mx-auto max-w-360 px-4 pb-16 lg:px-30"
      >
        <Outlet />
      </main>
    </div>
  );
}
