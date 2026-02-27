import { useGetDashboardStats } from "@/hooks/useDashboard";
import { useI18n } from "@/hooks/useI18n";
import type { StatItem as StatItemType } from "@/types/dashboard";
import { StatItem } from "./stat-item";

function StatsSkeleton() {
  return (
    <section aria-busy="true" className="rounded-card bg-bg-card shadow-card animate-pulse p-4">
      <div className="flex flex-col gap-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex items-center gap-3 p-3">
            <div className="bg-bg-progress-track h-14 w-14 shrink-0 rounded-xl" />
            <div className="flex flex-1 flex-col gap-1.5">
              <div className="bg-bg-progress-track h-4 w-24 rounded" />
              <div className="bg-bg-progress-track h-3 w-40 rounded" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export function StatsCard() {
  const { t } = useI18n();
  const { data: stats, isLoading } = useGetDashboardStats();

  if (isLoading) return <StatsSkeleton />;
  if (!stats) return null;

  const items: StatItemType[] = [
    {
      value: stats.streak,
      title: "Days streak",
      description: "Keep logging your health data",
      gradientFrom: "#f89f3f",
      gradientTo: "#ff6700",
    },
    {
      value: stats.analyses_last_30_days,
      title: "Analyses this month",
      description: "Medical analyses in the last 30 days",
      gradientFrom: "#fb5aa5",
      gradientTo: "#fe2e67",
    },
    {
      value: stats.upcoming_consultations,
      title: "Upcoming consultations",
      description: "Pending medical appointments",
      gradientFrom: "#c400e0",
      gradientTo: "#8523fd",
    },
  ];

  return (
    <section
      aria-labelledby="stats-title"
      className="rounded-card bg-bg-card shadow-card p-4"
    >
      <h2 id="stats-title" className="sr-only">
        {t("Activity stats")}
      </h2>
      <div className="flex flex-col gap-3">
        {items.map((stat) => (
          <StatItem key={stat.title} stat={stat} />
        ))}
      </div>
    </section>
  );
}
