import type {
  Appointment,
  Biomarker,
  CalendarEvent,
  HealthMetric,
  NavItem,
  StatItem,
} from "@/types/dashboard";

export const melioScore = {
  value: 84,
  maxValue: 100,
  subtitle: "You are in the optimal range. Keep it up.",
} as const;

export const healthMetrics: HealthMetric[] = [
  {
    emoji: "🩺",
    emojiLabel: "Stethoscope",
    name: "Cancer risk level",
    status: "Low",
    current: 3,
    max: 10,
    gradientFrom: "#1bcf88",
    gradientTo: "#01a087",
    accentBg: "var(--accent-blue-light)",
  },
  {
    emoji: "🏃",
    emojiLabel: "Runner",
    name: "Overall physical activity",
    status: "High",
    current: 8,
    max: 10,
    gradientFrom: "#f89f3f",
    gradientTo: "#ff6700",
    accentBg: "var(--accent-green-light)",
  },
  {
    emoji: "📋",
    emojiLabel: "Clipboard",
    name: "Treatment plan activity",
    status: "High",
    current: 9,
    max: 10,
    gradientFrom: "#13aed9",
    gradientTo: "#3886f3",
    accentBg: "var(--accent-purple-light)",
  },
];

export const statItems: StatItem[] = [
  {
    value: 7,
    title: "Days streak",
    description: "Keep logging your health data",
    gradientFrom: "#f89f3f",
    gradientTo: "#ff6700",
  },
  {
    value: 12,
    title: "Active Goals",
    description: "You're making great progress",
    gradientFrom: "#fb5aa5",
    gradientTo: "#fe2e67",
  },
  {
    value: 3,
    title: "Pending actions",
    description: "Review and complete them",
    gradientFrom: "#c400e0",
    gradientTo: "#8523fd",
  },
];

export const biomarkers: Biomarker[] = [
  {
    name: "Vitamin D (25 - OH)",
    value: 52,
    unit: "ng/ml",
    badge: "optimal",
    badgeLabel: "Optimal",
    trend: "up",
    iconName: "drop",
    gradientFrom: "#13aed9",
    gradientTo: "#3886f3",
  },
  {
    name: "LDL Cholesterol",
    value: 130,
    unit: "mg/dl",
    badge: "elevated",
    badgeLabel: "Elevated",
    trend: "down",
    iconName: "heart",
    gradientFrom: "#f89f3f",
    gradientTo: "#ff6700",
  },
  {
    name: "Blood Pressure",
    value: 118,
    unit: "mmHg",
    badge: "optimal",
    badgeLabel: "Optimal",
    trend: "stable",
    iconName: "pulse",
    gradientFrom: "#fb5aa5",
    gradientTo: "#fe2e67",
  },
];

export const appointments: Appointment[] = [
  {
    month: "OCT",
    day: "24",
    title: "Quarterly Metabolic Panel",
    description: "",
    badge: "pending",
    badgeLabel: "Pending",
    hasCta: true,
    ctaLabel: "Confirm Appointment",
  },
  {
    month: "NOV",
    day: "24",
    title: "Nutritionist Check-in (Virtual)",
    description: "Scheduled",
    badge: "scheduled",
    badgeLabel: "Scheduled",
    hasCta: false,
  },
  {
    month: "DEC",
    day: "2023",
    title: "Anticipated Annual Review",
    description: "Planning Phase",
    badge: "planning",
    badgeLabel: "Planning",
    hasCta: false,
  },
];

export const calendarEvents: CalendarEvent[] = [
  {
    day: 11,
    badge: "scheduled",
    title: "Quarterly Metabolic Panel",
    badgeLabel: "Scheduled",
  },
  {
    day: 11,
    badge: "planning",
    title: "Anticipated Annual Review",
    badgeLabel: "Planning",
  },
  {
    day: 11,
    badge: "pending",
    title: "Nutritionist Check-in (Virtual)",
    badgeLabel: "Pending",
  },
  {
    day: 17,
    badge: "scheduled",
    title: "Quarterly Metabolic Panel",
    badgeLabel: "Scheduled",
  },
];

export const navItems: NavItem[] = [
  { label: "Dashboard", iconName: "nav-dashboard", href: "/" },
  { label: "AI Assistant", iconName: "nav-ai", href: "/ai" },
  { label: "My Data", iconName: "nav-data", href: "/data" },
  { label: "Profile", iconName: "nav-profile", href: "/user" },
];
