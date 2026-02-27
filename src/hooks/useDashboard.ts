import { useQuery } from "@tanstack/react-query";
import { api } from "@/utils/api";
import type {
  CalendarEventApi,
  CalendarUpcomingItem,
  DashboardStats,
  HealthScoreLatest,
} from "@/types/dashboard";

export const DASHBOARD_STATS_KEY = ["dashboard", "stats"] as const;
export const HEALTH_SCORE_LATEST_KEY = ["health-score", "latest"] as const;
export const CALENDAR_UPCOMING_KEY = ["calendar", "upcoming"] as const;
export const CALENDAR_EVENTS_KEY = ["calendar", "events"] as const;

export function useGetDashboardStats() {
  return useQuery({
    queryKey: DASHBOARD_STATS_KEY,
    queryFn: () => api<DashboardStats>("dashboard/stats", { method: "GET" }),
    select: (r) => r.data,
    staleTime: 1000 * 60 * 2,
  });
}

export function useGetHealthScoreLatest() {
  return useQuery({
    queryKey: HEALTH_SCORE_LATEST_KEY,
    queryFn: () =>
      api<HealthScoreLatest | null>("health-score/latest", { method: "GET" }),
    select: (r) => r.data,
    staleTime: 1000 * 60 * 5,
  });
}

export function useGetCalendarUpcoming() {
  return useQuery({
    queryKey: CALENDAR_UPCOMING_KEY,
    queryFn: () =>
      api<CalendarUpcomingItem[]>("calendar/upcoming", { method: "GET" }),
    select: (r) => r.data,
    staleTime: 1000 * 60 * 2,
  });
}

export function useGetCalendarEvents(start: string, end: string) {
  return useQuery({
    queryKey: [...CALENDAR_EVENTS_KEY, start, end],
    queryFn: () =>
      api<CalendarEventApi[]>("calendar/events", {
        method: "GET",
        params: { start, end },
      }),
    select: (r) => r.data,
    staleTime: 1000 * 60 * 2,
    enabled: Boolean(start && end),
  });
}
