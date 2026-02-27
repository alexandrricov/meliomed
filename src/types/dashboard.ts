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

export interface CalendarEvent {
  day: number;
  badge: BadgeVariant;
  title: TranslationKey;
  badgeLabel: TranslationKey;
}

export interface NavItem {
  label: TranslationKey;
  iconName: IconName;
  href: string;
}

// ── API response types ──────────────────────────────────────────────

export interface DashboardStats {
  streak: number;
  analyses_last_30_days: number;
  upcoming_consultations: number;
}

export interface HealthScoreComponent {
  key: string;
  label: string;
  score: number | null;
}

export interface HealthScoreLatest {
  id: number;
  total_score: number | null;
  score_level: string | null;
  completed_components_count: number;
  components: HealthScoreComponent[];
  recommendations: string[];
  created_at: string;
  updated_at: string;
}

export interface CalendarEventApi {
  id: number;
  title: string;
  start: string;
  scheduled_date: string;
  scheduled_time: string | null;
  status: "pending" | "completed" | "cancelled";
  priority: "low" | "medium" | "high";
  color: string;
  location: string | null;
  requires_fasting: boolean;
  doctor_name: string | null;
  is_overdue: boolean;
}

export interface CalendarUpcomingItem extends CalendarEventApi {
  scheduled_date_formatted: string;
  days_until: number;
  is_urgent: boolean;
}

export interface UserPreferences {
  dark_mode: boolean;
  language: "ro" | "en";
  notifications: boolean;
  preferred_date_filter: "daily" | "weekly" | "monthly";
}
