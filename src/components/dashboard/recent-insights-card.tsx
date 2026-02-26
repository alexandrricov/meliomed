import { BiomarkerCard } from "@/components/dashboard/biomarker-card";
import { biomarkers } from "@/data/mock-dashboard";

export function RecentInsightsCard() {
  return (
    <section
      aria-labelledby="insights-title"
      className="rounded-card bg-bg-card shadow-card p-4"
    >
      <div className="flex flex-col gap-1">
        <h2
          id="insights-title"
          className="text-text-primary text-[22px] leading-7 font-bold"
        >
          Recent Insights
        </h2>
        <p className="text-text-secondary text-base font-normal">
          Your latest biomarkers
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
