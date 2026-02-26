import { statItems } from "@/data/mock-dashboard";
import { useI18n } from "@/hooks/useI18n";
import { StatItem } from "./stat-item";

export function StatsCard() {
  const { t } = useI18n();

  return (
    <section
      aria-labelledby="stats-title"
      className="rounded-card bg-bg-card shadow-card p-4"
    >
      <h2 id="stats-title" className="sr-only">
        {t("Activity stats")}
      </h2>
      <div className="flex flex-col gap-3">
        {statItems.map((stat) => (
          <StatItem key={stat.title} stat={stat} />
        ))}
      </div>
    </section>
  );
}
