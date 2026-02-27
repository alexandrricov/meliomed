import { useState } from "react";
import type { TabItem } from "@/components/ui/tab-switcher";
import { TabSwitcher } from "@/components/ui/tab-switcher";
import { useGetCalendarUpcoming } from "@/hooks/useDashboard";
import { useI18n } from "@/hooks/useI18n";
import type { TranslationKey } from "@/i18n/ro";
import type { Appointment, BadgeVariant, CalendarUpcomingItem } from "@/types/dashboard";
import { AppointmentRow } from "./appointment-row";
import { CalendarView } from "./calendar-view";

type ViewMode = "list" | "calendar";

const viewTabs: TabItem<ViewMode>[] = [
  { value: "list", label: "List", icon: "tab-list" },
  { value: "calendar", label: "Calendar", icon: "tab-calendar" },
];

const MONTH_NAMES = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

function statusToBadge(status: CalendarUpcomingItem["status"]): BadgeVariant {
  switch (status) {
    case "completed": return "optimal";
    case "cancelled": return "elevated";
    case "pending":
    default: return "pending";
  }
}

function statusToLabel(status: CalendarUpcomingItem["status"]): TranslationKey {
  switch (status) {
    case "completed": return "Optimal";
    case "cancelled": return "Elevated";
    case "pending":
    default: return "Pending";
  }
}

function mapUpcomingToAppointment(item: CalendarUpcomingItem): Appointment {
  const date = new Date(item.scheduled_date);
  return {
    month: MONTH_NAMES[date.getMonth()] ?? "",
    day: String(date.getDate()),
    title: item.title as TranslationKey,
    description: (item.doctor_name ?? "") as TranslationKey | "",
    badge: statusToBadge(item.status),
    badgeLabel: statusToLabel(item.status),
    hasCta: item.status === "pending",
    ctaLabel: item.status === "pending" ? "Confirm Appointment" : undefined,
  };
}

export function PlanAheadCard() {
  const { t } = useI18n();
  const [view, setView] = useState<ViewMode>("list");
  const { data: upcoming, isLoading } = useGetCalendarUpcoming();

  const appointments: Appointment[] = upcoming
    ? upcoming.map(mapUpcomingToAppointment)
    : [];

  return (
    <section
      aria-labelledby="plan-title"
      className="rounded-card bg-bg-card shadow-card p-4"
    >
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="flex flex-col gap-1">
          <h2 id="plan-title" className="text-text-primary text-h2 font-bold">
            {t("The Plan Ahead")}
          </h2>
          <p className="text-text-secondary font-normal">
            {t("Upcoming appointments")}
          </p>
        </div>

        <TabSwitcher
          items={viewTabs}
          value={view}
          onChange={setView}
          ariaLabel={t("View mode")}
        />
      </div>

      {view === "list" && !isLoading && (
        <div className="mt-4 flex flex-col gap-4">
          {appointments.length > 0 ? (
            appointments.map((appointment, i) => (
              <AppointmentRow
                key={`${appointment.month}-${appointment.day}-${i}`}
                appointment={appointment}
              />
            ))
          ) : (
            <p className="text-text-secondary py-8 text-center">
              {t("No upcoming appointments")}
            </p>
          )}
        </div>
      )}

      {view === "calendar" && <CalendarView />}
    </section>
  );
}
