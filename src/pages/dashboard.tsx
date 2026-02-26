import { MelioScoreCard } from "@/components/dashboard/melio-score-card";
import { PlanAheadCard } from "@/components/dashboard/plan-ahead-card";
import { RecentInsightsCard } from "@/components/dashboard/recent-insights-card";
import { StatsCard } from "@/components/dashboard/stats-card";
import { DashboardHeader } from "@/components/layout/dashboard-header";

export function DashboardPage() {
  return (
    <div className="bg-bg-page relative min-h-screen">
      {/* Background gradient overlay */}
      <div
        className="pointer-events-none fixed inset-0 opacity-40"
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
        Skip to main content
      </a>

      <DashboardHeader />

      <main
        id="main-content"
        className="relative z-10 mx-auto max-w-[1440px] px-4 pt-4 pb-16 lg:px-[120px] lg:pt-14"
      >
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-[389px_1fr]">
          {/* Left column */}
          <div className="flex flex-col gap-4">
            <MelioScoreCard />
            <div className="order-4 lg:order-none">
              <StatsCard />
            </div>
          </div>

          {/* Right column */}
          <div className="flex flex-col gap-4">
            <RecentInsightsCard />
            <PlanAheadCard />
          </div>
        </div>
      </main>
    </div>
  );
}
