import { StatItem } from "@/components/dashboard/stat-item";
import { statItems } from "@/data/mock-dashboard";

export function StatsCard() {
  return (
    <section
      aria-labelledby="stats-title"
      className="rounded-card bg-bg-card shadow-card p-4"
    >
      <h2 id="stats-title" className="sr-only">
        Activity stats
      </h2>
      <div className="flex flex-col gap-3">
        {statItems.map((stat) => (
          <StatItem key={stat.title} stat={stat} />
        ))}
      </div>
    </section>
  );
}
