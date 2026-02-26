import { Badge } from "@/components/ui/badge";
import { GradientBox } from "@/components/ui/gradient-box";
import { Icon } from "@/components/ui/icon";
import type { Biomarker } from "@/types/dashboard";

interface BiomarkerCardProps {
  biomarker: Biomarker;
}

function TrendIcon({ trend }: { trend: Biomarker["trend"] }) {
  switch (trend) {
    case "up":
      return <Icon name="trend-up" size={24} className="text-status-optimal" />;
    case "down":
      return (
        <Icon name="trend-down" size={24} className="text-status-danger" />
      );
    case "stable":
      return (
        <Icon name="arrow-right" size={24} className="text-text-secondary" />
      );
  }
}

export function BiomarkerCard({ biomarker }: BiomarkerCardProps) {
  return (
    <div className="rounded-inner bg-bg-card shadow-card flex min-w-62.5 flex-1 items-center gap-3 p-4">
      <GradientBox
        gradientFrom={biomarker.gradientFrom}
        gradientTo={biomarker.gradientTo}
      >
        <Icon name={biomarker.iconName} size={32} className="text-white" />
      </GradientBox>

      <div className="flex min-w-0 flex-1 flex-col gap-2">
        <div className="flex items-center gap-2">
          <span className="text-text-primary truncate text-base font-semibold">
            {biomarker.name}
          </span>
          <Badge variant={biomarker.badge}>{biomarker.badgeLabel}</Badge>
        </div>

        <div className="flex items-baseline gap-2">
          <span className="text-text-primary text-[32px] leading-7 font-bold">
            {biomarker.value}
          </span>
          <span className="text-text-secondary text-base font-normal">
            {biomarker.unit}
          </span>
          <TrendIcon trend={biomarker.trend} />
        </div>
      </div>
    </div>
  );
}
