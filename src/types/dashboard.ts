import type { IconName } from "@/components/ui/icon";

export type BadgeVariant =
  | "optimal"
  | "elevated"
  | "pending"
  | "scheduled"
  | "planning";

export type TrendDirection = "up" | "down" | "stable";

export interface HealthMetric {
  emoji: string;
  emojiLabel: string;
  name: string;
  status: string;
  current: number;
  max: number;
  gradientFrom: string;
  gradientTo: string;
  accentBg: string;
}

export interface StatItem {
  value: number;
  title: string;
  description: string;
  gradientFrom: string;
  gradientTo: string;
}

export interface Biomarker {
  name: string;
  value: number;
  unit: string;
  badge: BadgeVariant;
  badgeLabel: string;
  trend: TrendDirection;
  iconName: IconName;
  gradientFrom: string;
  gradientTo: string;
}

export interface Appointment {
  month: string;
  day: string;
  title: string;
  description: string;
  badge: BadgeVariant;
  badgeLabel: string;
  hasCta: boolean;
  ctaLabel?: string;
}

export interface NavItem {
  label: string;
  iconName: IconName;
  active: boolean;
  href: string;
}
