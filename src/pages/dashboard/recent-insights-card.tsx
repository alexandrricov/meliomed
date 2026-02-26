import { biomarkers } from "@/data/mock-dashboard";
import { useI18n } from "@/hooks/useI18n";
import { BiomarkerCard } from "./biomarker-card";

export function RecentInsightsCard() {
  const { t } = useI18n();

  return (
    <section
      aria-labelledby="insights-title"
      className="rounded-card bg-bg-card shadow-card p-4"
    >
      <div className="flex flex-col gap-1">
        <h2 id="insights-title" className="text-text-primary text-h2 font-bold">
          {t("Recent Insights")}
        </h2>
        <p className="text-text-secondary font-normal">
          {t("Your latest biomarkers")}
        </p>
      </div>

      <div className="mt-4 flex flex-wrap gap-4">
        {biomarkers.map((biomarker) => (
          <BiomarkerCard key={biomarker.name} biomarker={biomarker} />
        ))}
      </div>
    </section>
  );
}
