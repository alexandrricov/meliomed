import { ProgressBar } from "@/components/ui/progress-bar";
import { useI18n } from "@/hooks/useI18n";
import type { HealthMetric } from "@/types/dashboard";

interface MetricRowProps {
  metric: HealthMetric;
}

export function MetricRow({ metric }: MetricRowProps) {
  const { t } = useI18n();

  return (
    <div className="mock flex items-center gap-3">
      <div
        className="rounded-inner flex h-10 w-10 shrink-0 items-center justify-center text-2xl"
        style={{ backgroundColor: metric.accentBg }}
      >
        <span aria-hidden="true">{metric.emoji}</span>
      </div>

      <div className="flex min-w-0 flex-1 flex-col gap-0.5">
        <span className="text-text-secondary text-small font-medium">
          {t(metric.name)}
        </span>
        <span className="text-text-secondary text-small font-medium">
          <span className="text-text-primary font-bold">{t(metric.status)}</span>{" "}
          {String(metric.current)}/{String(metric.max)}
        </span>
      </div>

      <ProgressBar
        value={metric.current}
        max={metric.max}
        gradientFrom={metric.gradientFrom}
        gradientTo={metric.gradientTo}
        label={t("{name}: {current} out of {max}", {
          name: t(metric.name),
          current: metric.current,
          max: metric.max,
        })}
      />
    </div>
  );
}
