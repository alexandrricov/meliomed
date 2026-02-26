import { Icon } from "@/components/ui/icon";
import { appointments } from "@/data/mock-dashboard";
import { useI18n } from "@/hooks/useI18n";
import { AppointmentRow } from "./appointment-row";

export function PlanAheadCard() {
  const { t } = useI18n();

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

        {/* Tabs */}
        <div role="tablist" aria-label={t("View mode")} className="flex gap-2">
          <button
            type="button"
            role="tab"
            aria-selected="true"
            className="rounded-inner border-border-divider bg-status-optimal-bg text-status-optimal flex flex-1 items-center justify-center gap-2 border px-3 py-2 font-semibold lg:flex-none"
          >
            <Icon name="tab-list" size={24} />
            {t("List")}
          </button>
          <button
            type="button"
            role="tab"
            aria-selected="false"
            className="rounded-inner text-text-secondary flex flex-1 items-center justify-center gap-2 px-3 py-2 font-semibold lg:flex-none"
          >
            <Icon name="tab-calendar" size={24} />
            {t("Calendar")}
          </button>
        </div>
      </div>

      <div className="mt-4 flex flex-col gap-4">
        {appointments.map((appointment) => (
          <AppointmentRow
            key={`${appointment.month}-${appointment.day}`}
            appointment={appointment}
          />
        ))}
      </div>
    </section>
  );
}
