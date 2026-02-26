import { clsx } from "clsx";
import type { BadgeVariant } from "@/types/dashboard";

const variantStyles: Record<BadgeVariant, string> = {
  optimal:
    "bg-status-optimal-bg text-status-optimal border-status-optimal-border",
  elevated:
    "bg-status-elevated-bg text-status-elevated border-status-elevated-border",
  pending:
    "bg-status-elevated-bg text-status-elevated border-status-elevated-border",
  scheduled:
    "bg-status-scheduled-bg text-status-scheduled border-status-scheduled-border",
  planning:
    "bg-status-planning-bg text-status-planning border-status-planning-border",
};

interface BadgeProps {
  variant: BadgeVariant;
  children: React.ReactNode;
  className?: string;
}

export function Badge({ variant, children, className }: BadgeProps) {
  return (
    <span
      className={clsx(
        "rounded-inner inline-block shrink-0 border px-3 py-1 font-semibold",
        variantStyles[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}
