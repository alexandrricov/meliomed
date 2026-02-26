import type { IconName } from "@/components/ui/icon";
import type { TranslationKey } from "@/i18n/ro";

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
  name: TranslationKey;
  status: TranslationKey;
  current: number;
  max: number;
  gradientFrom: string;
  gradientTo: string;
  accentBg: string;
}

export interface StatItem {
  value: number;
  title: TranslationKey;
  description: TranslationKey;
  gradientFrom: string;
  gradientTo: string;
}

export interface Biomarker {
  name: TranslationKey;
  value: number;
  unit: string;
  badge: BadgeVariant;
  badgeLabel: TranslationKey;
  trend: TrendDirection;
  iconName: IconName;
  gradientFrom: string;
  gradientTo: string;
}

export interface Appointment {
  month: string;
  day: string;
  title: TranslationKey;
  description: TranslationKey | "";
  badge: BadgeVariant;
  badgeLabel: TranslationKey;
  hasCta: boolean;
  ctaLabel?: TranslationKey;
}

export interface NavItem {
  label: TranslationKey;
  iconName: IconName;
  href: string;
}
