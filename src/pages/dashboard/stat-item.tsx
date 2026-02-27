import { GradientBox } from "@/components/ui/gradient-box";
import { useI18n } from "@/hooks/useI18n";
import type { StatItem as StatItemType } from "@/types/dashboard";

interface StatItemProps {
  stat: StatItemType;
}

export function StatItem({ stat }: StatItemProps) {
  const { t } = useI18n();

  return (
    <div className="rounded-inner bg-bg-card shadow-card flex items-center gap-3 p-4">
      <GradientBox
        gradientFrom={stat.gradientFrom}
        gradientTo={stat.gradientTo}
      >
        <span className="text-h1 font-bold text-white">{stat.value}</span>
      </GradientBox>

      <div className="flex min-w-0 flex-col gap-1">
        <h3 className="text-text-primary text-h3 font-bold">
          {t(stat.title)}
        </h3>
        <p className="text-text-secondary text-small font-normal">
          {t(stat.description)}
        </p>
      </div>
    </div>
  );
}
