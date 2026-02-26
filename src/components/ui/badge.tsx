import type { BadgeVariant } from "@/types/dashboard";

const variantStyles: Record<BadgeVariant, string> = {
  optimal:
    "bg-status-scheduled-bg text-status-scheduled border-status-scheduled-border",
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
}

export function Badge({ variant, children }: BadgeProps) {
  return (
    <span
      className={`rounded-inner inline-block border px-3 py-1 font-semibold ${variantStyles[variant]}`}
    >
      {children}
    </span>
  );
}
