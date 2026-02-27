import { useState } from "react";
import { Button } from "@/components/ui/action";
import { useGetHealthScoreLatest } from "@/hooks/useDashboard";
import { useI18n } from "@/hooks/useI18n";
import type { TranslationKey } from "@/i18n/ro";
import type { HealthMetric } from "@/types/dashboard";
import { AssessmentWizard } from "@/pages/assessment/wizard";
import { MetricRow } from "./metric-row";
import { ScoreDonutChart } from "./score-donut-chart";

const componentMeta: Record<string, { emoji: string; emojiLabel: string; gradientFrom: string; gradientTo: string; accentBg: string }> = {
  diet:        { emoji: "🥗", emojiLabel: "Salad",      gradientFrom: "#1bcf88", gradientTo: "#01a087", accentBg: "var(--accent-green-light)" },
  activity:    { emoji: "🏃", emojiLabel: "Runner",     gradientFrom: "#f89f3f", gradientTo: "#ff6700", accentBg: "var(--accent-green-light)" },
  smoking:     { emoji: "🚭", emojiLabel: "No smoking", gradientFrom: "#fb5aa5", gradientTo: "#fe2e67", accentBg: "var(--accent-purple-light)" },
  sleep:       { emoji: "😴", emojiLabel: "Sleeping",   gradientFrom: "#7c4dff", gradientTo: "#651fff", accentBg: "var(--accent-purple-light)" },
  bmi:         { emoji: "⚖️", emojiLabel: "Scale",      gradientFrom: "#13aed9", gradientTo: "#3886f3", accentBg: "var(--accent-blue-light)" },
  bp:          { emoji: "💓", emojiLabel: "Heart",      gradientFrom: "#fb5aa5", gradientTo: "#fe2e67", accentBg: "var(--accent-purple-light)" },
  cholesterol: { emoji: "🩸", emojiLabel: "Blood drop", gradientFrom: "#f89f3f", gradientTo: "#ff6700", accentBg: "var(--accent-green-light)" },
  glucose:     { emoji: "🍬", emojiLabel: "Candy",      gradientFrom: "#1bcf88", gradientTo: "#01a087", accentBg: "var(--accent-blue-light)" },
};

function getScoreSubtitle(level: string | null): TranslationKey {
  switch (level) {
    case "high":
    case "excellent":
      return "You are in the optimal range. Keep it up.";
    default:
      return "You are in the optimal range. Keep it up.";
  }
}

function getStatusLabel(score: number | null): TranslationKey {
  if (score == null) return "Low";
  if (score >= 80) return "Excellent";
  if (score >= 60) return "High";
  if (score >= 40) return "Moderate";
  return "Low";
}

function ScoreSkeleton() {
  return (
    <section aria-busy="true" className="rounded-card bg-bg-card shadow-card animate-pulse p-4">
      <div className="bg-bg-progress-track h-6 w-40 rounded" />
      <div className="bg-bg-progress-track mx-auto mt-4 h-48 w-48 rounded-full" />
      <div className="mt-8 flex flex-col gap-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex items-center gap-3">
            <div className="bg-bg-progress-track h-10 w-10 rounded" />
            <div className="flex flex-1 flex-col gap-1">
              <div className="bg-bg-progress-track h-3 w-28 rounded" />
              <div className="bg-bg-progress-track h-3 w-16 rounded" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export function MelioScoreCard() {
  const { t } = useI18n();
  const { data: healthScore, isLoading } = useGetHealthScoreLatest();
  const [wizardOpen, setWizardOpen] = useState(false);

  if (isLoading) return <ScoreSkeleton />;

  const hasScore = healthScore != null && healthScore.total_score != null;

  // Empty state: API responded but user has no health score
  if (!hasScore) {
    return (
      <>
        <section
          aria-labelledby="melio-score-title"
          className="rounded-card bg-bg-card shadow-card p-4"
        >
          <h2
            id="melio-score-title"
            className="text-text-primary text-h2 font-bold"
          >
            {t("Your Melio Score")}
          </h2>
          <div className="mt-4">
            <ScoreDonutChart score={0} maxScore={100} />
          </div>
          <p className="text-text-secondary mt-4 text-center font-normal">
            {t("No health score yet")}
          </p>
          <p className="text-text-secondary mt-1 text-center text-sm">
            {t("Complete your first health assessment to see your score.")}
          </p>
          <div className="mt-6 flex justify-center">
            <Button
              variant="primary"
              icon={{ name: "plus-circle", position: "left" }}
              onClick={() => { setWizardOpen(true); }}
            >
              {t("Start assessment")}
            </Button>
          </div>
        </section>

        <AssessmentWizard open={wizardOpen} onClose={() => { setWizardOpen(false); }} />
      </>
    );
  }

  const score = healthScore.total_score!;
  const subtitle = getScoreSubtitle(healthScore.score_level);

  const metrics: HealthMetric[] = healthScore.components
    .filter((c) => c.score != null)
    .slice(0, 3)
    .map((c) => {
      const meta = componentMeta[c.key] ?? componentMeta.activity;
      return {
        emoji: meta.emoji,
        emojiLabel: meta.emojiLabel,
        name: c.label as TranslationKey,
        status: getStatusLabel(c.score),
        current: Math.round((c.score! / 100) * 10),
        max: 10,
        gradientFrom: meta.gradientFrom,
        gradientTo: meta.gradientTo,
        accentBg: meta.accentBg,
      };
    });

  return (
    <>
      <section
        aria-labelledby="melio-score-title"
        className="rounded-card bg-bg-card shadow-card p-4"
      >
        <div className="flex flex-col gap-1">
          <h2
            id="melio-score-title"
            className="text-text-primary text-h2 font-bold"
          >
            {t("Your Melio Score")}
          </h2>
          <p className="text-status-optimal font-normal">
            {t(subtitle)}
          </p>
        </div>

        <div className="mt-4">
          <ScoreDonutChart score={score} maxScore={100} />
        </div>

        <div className="mt-8 flex flex-col gap-3">
          {metrics.map((metric) => (
            <MetricRow key={metric.name} metric={metric} />
          ))}
        </div>

        <div className="mt-6 flex justify-center">
          <Button
            variant="primary"
            icon={{ name: "plus-circle", position: "left" }}
            onClick={() => { setWizardOpen(true); }}
          >
            {t("Start assessment")}
          </Button>
        </div>
      </section>

      <AssessmentWizard open={wizardOpen} onClose={() => { setWizardOpen(false); }} />
    </>
  );
}
