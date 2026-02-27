import { useMemo, useState } from "react";
import { Icon } from "@/components/ui/icon";
import { useGetCalendarEvents } from "@/hooks/useDashboard";
import { useI18n } from "@/hooks/useI18n";
import type { BadgeVariant } from "@/types/dashboard";

const DAYS_OF_WEEK = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const MONTH_NAMES_RO = [
  "Ianuarie", "Februarie", "Martie", "Aprilie", "Mai", "Iunie",
  "Iulie", "August", "Septembrie", "Octombrie", "Noiembrie", "Decembrie",
];

const MONTH_NAMES_EN = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

const badgeColors: Record<BadgeVariant, string> = {
  scheduled: "var(--status-scheduled)",
  pending: "var(--status-elevated)",
  planning: "var(--status-planning)",
  optimal: "var(--status-optimal)",
  elevated: "var(--status-elevated)",
};

interface CalendarEventLocal {
  day: number;
  badge: BadgeVariant;
  title: string;
  badgeLabel: string;
  color: string;
}

function statusToBadge(status: string): BadgeVariant {
  switch (status) {
    case "completed": return "optimal";
    case "cancelled": return "elevated";
    case "pending":
    default: return "pending";
  }
}

function EventDots({ events }: { events: CalendarEventLocal[] }) {
  if (events.length === 0) return null;
  return (
    <div className="flex flex-col items-center gap-0.5">
      {events.slice(0, 3).map((event, i) => (
        <span
          key={i}
          className="block h-0.75 w-full rounded-[1px]"
          style={{ backgroundColor: event.color || badgeColors[event.badge] }}
        />
      ))}
    </div>
  );
}

const legendItems: { badge: BadgeVariant; label: string }[] = [
  { badge: "optimal", label: "Completed" },
  { badge: "pending", label: "Pending" },
  { badge: "elevated", label: "Cancelled" },
];

function formatYmd(year: number, month: number, day: number): string {
  const m = String(month + 1).padStart(2, "0");
  const d = String(day).padStart(2, "0");
  return `${year}-${m}-${d}`;
}

function daysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

function firstDayOfWeek(year: number, month: number): number {
  return new Date(year, month, 1).getDay();
}

export function CalendarView() {
  const { t, lang } = useI18n();
  const now = new Date();
  const [year, setYear] = useState(now.getFullYear());
  const [month, setMonth] = useState(now.getMonth());

  const start = formatYmd(year, month, 1);
  const end = formatYmd(year, month, daysInMonth(year, month));
  const { data: apiEvents } = useGetCalendarEvents(start, end);

  const events: CalendarEventLocal[] = useMemo(() => {
    if (!apiEvents) return [];
    return apiEvents.map((e) => {
      const day = new Date(e.scheduled_date).getDate();
      return {
        day,
        badge: statusToBadge(e.status),
        title: e.title,
        badgeLabel: e.status.charAt(0).toUpperCase() + e.status.slice(1),
        color: e.color,
      };
    });
  }, [apiEvents]);

  const totalDays = daysInMonth(year, month);
  const offset = firstDayOfWeek(year, month);

  const cells: (number | null)[] = [];
  for (let i = 0; i < offset; i++) cells.push(null);
  for (let d = 1; d <= totalDays; d++) cells.push(d);

  const monthNames = lang === "ro" ? MONTH_NAMES_RO : MONTH_NAMES_EN;
  const monthLabel = `${monthNames[month]} ${year}`;

  function getEventsForDay(day: number): CalendarEventLocal[] {
    return events.filter((e) => e.day === day);
  }

  function prevMonth() {
    if (month === 0) { setMonth(11); setYear((y) => y - 1); }
    else setMonth((m) => m - 1);
  }

  function nextMonth() {
    if (month === 11) { setMonth(0); setYear((y) => y + 1); }
    else setMonth((m) => m + 1);
  }

  const upcomingEvents = events.filter((e) => e.badge === "pending" || e.badge === "optimal");

  return (
    <div className="mt-4 flex flex-col">
      <div className="rounded-inner flex flex-col">
        {/* Calendar grid section */}
        <div className="p-4">
          {/* Month navigation */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                type="button"
                aria-label={t("Previous month")}
                onClick={prevMonth}
                className="text-text-secondary flex size-6 items-center justify-center rounded"
              >
                <Icon name="chevron-left" size={24} />
              </button>
              <span className="bg-border-divider h-4.25 w-px" />
            </div>

            <span className="text-text-primary text-small font-bold">
              {monthLabel}
            </span>

            <div className="flex items-center gap-4">
              <span className="bg-border-divider h-4.25 w-px" />
              <button
                type="button"
                aria-label={t("Next month")}
                onClick={nextMonth}
                className="text-text-secondary flex size-6 items-center justify-center rounded"
              >
                <Icon name="chevron-right" size={24} />
              </button>
            </div>
          </div>

          {/* Day headers + grid */}
          <div className="mt-3 grid grid-cols-7 gap-x-2.5 gap-y-3">
            {DAYS_OF_WEEK.map((day) => (
              <div
                key={day}
                className="text-text-primary text-center text-xs font-medium uppercase"
              >
                {day}
              </div>
            ))}

            {cells.map((day, i) => {
              const dayEvents = day ? getEventsForDay(day) : [];
              return (
                <div key={i} className="flex justify-center">
                  {day !== null ? (
                    <div className="flex size-9 flex-col items-center justify-center gap-0.5 rounded border border-border-cell">
                      <span className="text-text-primary text-small font-bold leading-5">
                        {day}
                      </span>
                      {dayEvents.length > 0 && (
                        <div className="w-7.5">
                          <EventDots events={dayEvents} />
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="size-9" />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Divider */}
        <div className="bg-border-divider h-px" />

        {/* Legend */}
        <div className="flex items-center gap-4 px-4 py-3">
          {legendItems.map((item) => (
            <div key={item.badge} className="flex items-center gap-2">
              <span
                className="size-4 shrink-0 rounded"
                style={{ backgroundColor: badgeColors[item.badge] }}
              />
              <span className="text-text-primary text-small font-bold">
                {item.label}
              </span>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="bg-border-divider h-px" />

        {/* Upcoming this month */}
        <div className="flex flex-col gap-4 p-4">
          <h3 className="text-text-primary text-h3 font-bold">
            {t("Upcoming this month")}
          </h3>

          {upcomingEvents.length > 0 ? (
            upcomingEvents.map((event, i) => (
              <div
                key={`${event.title}-${i}`}
                className="flex items-center justify-between gap-2 px-3 py-1"
              >
                <div className="flex items-center gap-2">
                  <span
                    className="size-4 shrink-0 rounded"
                    style={{ backgroundColor: event.color || badgeColors[event.badge] }}
                  />
                  <span className="text-text-primary">
                    {event.title}
                  </span>
                </div>
                <span
                  className="text-small shrink-0 font-bold"
                  style={{ color: event.color || badgeColors[event.badge] }}
                >
                  {event.badgeLabel}
                </span>
              </div>
            ))
          ) : (
            <p className="text-text-secondary py-2 text-center">
              {t("No events this month")}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
