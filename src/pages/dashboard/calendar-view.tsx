import { Icon } from "@/components/ui/icon";
import { calendarEvents } from "@/data/mock-dashboard";
import { useI18n } from "@/hooks/useI18n";
import type { BadgeVariant, CalendarEvent } from "@/types/dashboard";

const DAYS_OF_WEEK = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

/** June 2023 starts on Thursday (index 4), has 30 days */
const FIRST_DAY_OFFSET = 4;
const DAYS_IN_MONTH = 30;

const badgeColors: Record<BadgeVariant, string> = {
  scheduled: "var(--status-scheduled)",
  pending: "var(--status-elevated)",
  planning: "var(--status-planning)",
  optimal: "var(--status-optimal)",
  elevated: "var(--status-elevated)",
};

function getEventsForDay(day: number): CalendarEvent[] {
  return calendarEvents.filter((e) => e.day === day);
}

function EventDots({ events }: { events: CalendarEvent[] }) {
  if (events.length === 0) return null;
  return (
    <div className="flex flex-col items-center gap-0.5">
      {events.slice(0, 3).map((event, i) => (
        <span
          key={i}
          className="block h-0.75 w-full rounded-[1px]"
          style={{ backgroundColor: badgeColors[event.badge] }}
        />
      ))}
    </div>
  );
}

const legendItems = [
  { badge: "scheduled", label: "Scheduled" },
  { badge: "pending", label: "Pending" },
  { badge: "planning", label: "Planning" },
] as const;

const upcomingEvents = [
  { badge: "scheduled", title: "Quarterly Metabolic Panel", badgeLabel: "Scheduled" },
  { badge: "pending", title: "Nutritionist Check-in (Virtual)", badgeLabel: "Pending" },
  { badge: "planning", title: "Anticipated Annual Review", badgeLabel: "Planning" },
] as const;

export function CalendarView() {
  const { t } = useI18n();

  const cells: (number | null)[] = [];
  for (let i = 0; i < FIRST_DAY_OFFSET; i++) cells.push(null);
  for (let d = 1; d <= DAYS_IN_MONTH; d++) cells.push(d);

  return (
    <div className="mock mt-4 flex flex-col">
      {/* Calendar container */}
      <div className="rounded-inner flex flex-col">
        {/* Calendar grid section */}
        <div className="p-4">
          {/* Month navigation */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                type="button"
                aria-label={t("Previous month")}
                className="text-text-secondary flex size-6 items-center justify-center rounded"
              >
                <Icon name="chevron-left" size={24} />
              </button>
              <span className="bg-border-divider h-4.25 w-px" />
            </div>

            <button
              type="button"
              className="rounded-inner flex items-center gap-2 px-3 py-2"
            >
              <span className="text-text-primary text-small font-bold">
                {t("June 2023")}
              </span>
              <Icon name="chevron-down" size={24} className="text-text-secondary" />
            </button>

            <div className="flex items-center gap-4">
              <span className="bg-border-divider h-4.25 w-px" />
              <button
                type="button"
                aria-label={t("Next month")}
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
              const events = day ? getEventsForDay(day) : [];
              return (
                <div key={i} className="flex justify-center">
                  {day !== null ? (
                    <div className="flex size-9 flex-col items-center justify-center gap-0.5 rounded border border-border-cell">
                      <span className="text-text-primary text-small font-bold leading-5">
                        {day}
                      </span>
                      {events.length > 0 && (
                        <div className="w-7.5">
                          <EventDots events={events} />
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
                {t(item.label)}
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

          {upcomingEvents.map((event) => (
            <div
              key={event.title}
              className="flex items-center justify-between gap-2 px-3 py-1"
            >
              <div className="flex items-center gap-2">
                <span
                  className="size-4 shrink-0 rounded"
                  style={{ backgroundColor: badgeColors[event.badge] }}
                />
                <span className="text-text-primary">
                  {t(event.title)}
                </span>
              </div>
              <span
                className="text-small shrink-0 font-bold"
                style={{ color: badgeColors[event.badge] }}
              >
                {t(event.badgeLabel)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
