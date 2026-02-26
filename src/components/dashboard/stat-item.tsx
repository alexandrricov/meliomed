import { GradientBox } from "@/components/ui/gradient-box";
import type { StatItem as StatItemType } from "@/types/dashboard";

interface StatItemProps {
  stat: StatItemType;
}

export function StatItem({ stat }: StatItemProps) {
  return (
    <div className="rounded-inner bg-bg-card shadow-card flex items-center gap-3 p-4">
      <GradientBox
        gradientFrom={stat.gradientFrom}
        gradientTo={stat.gradientTo}
      >
        <span className="text-[32px] leading-7 font-bold text-white">
          {stat.value}
        </span>
      </GradientBox>

      <div className="flex min-w-0 flex-col gap-1">
        <h3 className="text-text-primary text-lg font-bold">{stat.title}</h3>
        <p className="text-text-secondary text-sm font-normal">
          {stat.description}
        </p>
      </div>
    </div>
  );
}
