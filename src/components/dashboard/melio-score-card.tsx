import { MetricRow } from "@/components/dashboard/metric-row";
import { ScoreDonutChart } from "@/components/dashboard/score-donut-chart";
import { healthMetrics, melioScore } from "@/data/mock-dashboard";

export function MelioScoreCard() {
  return (
    <section
      aria-labelledby="melio-score-title"
      className="rounded-card bg-bg-card shadow-card p-4"
    >
      <div className="flex flex-col gap-1">
        <h2
          id="melio-score-title"
          className="text-text-primary text-h2 font-bold"
        >
          Your Melio Score
        </h2>
        <p className="text-status-optimal font-normal">{melioScore.subtitle}</p>
      </div>

      <div className="mt-4">
        <ScoreDonutChart
          score={melioScore.value}
          maxScore={melioScore.maxValue}
        />
      </div>

      <div className="mt-8 flex flex-col gap-3">
        {healthMetrics.map((metric) => (
          <MetricRow key={metric.name} metric={metric} />
        ))}
      </div>
    </section>
  );
}
