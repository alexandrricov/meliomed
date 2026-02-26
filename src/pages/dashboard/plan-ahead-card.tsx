import { useState } from "react";
import type { TabItem } from "@/components/ui/tab-switcher";
import { TabSwitcher } from "@/components/ui/tab-switcher";
import { appointments } from "@/data/mock-dashboard";
import { useI18n } from "@/hooks/useI18n";
import { AppointmentRow } from "./appointment-row";
import { CalendarView } from "./calendar-view";

type ViewMode = "list" | "calendar";

const viewTabs: TabItem<ViewMode>[] = [
  { value: "list", label: "List", icon: "tab-list" },
  { value: "calendar", label: "Calendar", icon: "tab-calendar" },
];

export function PlanAheadCard() {
  const { t } = useI18n();
  const [view, setView] = useState<ViewMode>("list");

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

      {view === "list" && (
        <div className="mt-4 flex flex-col gap-4">
          {appointments.map((appointment) => (
            <AppointmentRow
              key={`${appointment.month}-${appointment.day}`}
              appointment={appointment}
            />
          ))}
        </div>
      )}

      {view === "calendar" && <CalendarView />}
    </section>
  );
}
