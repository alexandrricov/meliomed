import { MelioScoreCard } from "./melio-score-card";
import { PlanAheadCard } from "./plan-ahead-card";
import { RecentInsightsCard } from "./recent-insights-card";
import { StatsCard } from "./stats-card";

export function DashboardPage() {
  return (
    <div className="grid grid-cols-1 gap-4 pt-4 lg:grid-cols-[389px_1fr] lg:pt-14">
      {/* Left column */}
      <div className="flex flex-col gap-4">
        <MelioScoreCard />
        <div className="order-4 lg:order-0">
          <StatsCard />
        </div>
      </div>

      {/* Right column */}
      <div className="flex flex-col gap-4">
        <RecentInsightsCard />
        <PlanAheadCard />
      </div>
    </div>
  );
}
