import { ProgressBar } from "@/components/ui/progress-bar";
import type { HealthMetric } from "@/types/dashboard";

interface MetricRowProps {
  metric: HealthMetric;
}

export function MetricRow({ metric }: MetricRowProps) {
  return (
    <div className="flex items-center gap-3">
      <div
        className="rounded-inner flex h-10 w-10 shrink-0 items-center justify-center text-2xl"
        style={{ backgroundColor: metric.accentBg }}
      >
        <span aria-hidden="true">{metric.emoji}</span>
      </div>

      <div className="flex min-w-0 flex-1 flex-col gap-0.5">
        <span className="text-text-secondary text-sm font-medium">
          {metric.name}
        </span>
        <span className="text-text-secondary text-sm font-medium">
          <span className="text-text-primary font-bold">{metric.status}</span>{" "}
          {String(metric.current)}/{String(metric.max)}
        </span>
      </div>

      <ProgressBar
        value={metric.current}
        max={metric.max}
        gradientFrom={metric.gradientFrom}
        gradientTo={metric.gradientTo}
        label={`${metric.name}: ${String(metric.current)} out of ${String(metric.max)}`}
      />
    </div>
  );
}
