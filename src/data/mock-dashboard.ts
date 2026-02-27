import type {
  Biomarker,
  NavItem,
} from "@/types/dashboard";

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

export const navItems: NavItem[] = [
  { label: "Dashboard", iconName: "nav-dashboard", href: "/" },
  { label: "AI Assistant", iconName: "nav-ai", href: "/ai" },
  { label: "My Data", iconName: "nav-data", href: "/data" },
  { label: "Profile", iconName: "nav-profile", href: "/user" },
];
