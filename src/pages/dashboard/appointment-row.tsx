import { Button } from "@/components/ui/action";
import { Badge } from "@/components/ui/badge";
import { useI18n } from "@/hooks/useI18n";
import type { Appointment } from "@/types/dashboard";

interface AppointmentRowProps {
  appointment: Appointment;
}

export function AppointmentRow({ appointment }: AppointmentRowProps) {
  const { t } = useI18n();

  return (
    <div className="rounded-inner bg-bg-card shadow-card flex items-start gap-3 p-4">
      {/* Left group: date box + content */}
      <div className="flex min-w-0 flex-1 items-start gap-3">
        {/* Date box */}
        <div className="rounded-inner bg-date-box-bg flex h-20 min-w-20 shrink-0 flex-col items-center justify-center gap-1 p-3">
          <span className="text-text-date-label font-semibold">
            {appointment.month}
          </span>
          <span className="text-h1 font-bold text-white">
            {appointment.day}
          </span>
        </div>

        {/* Title + description/CTA stacked */}
        <div className="flex min-w-0 flex-col gap-3 pt-0.5">
          <h3 className="text-text-primary text-h3 font-bold">
            {t(appointment.title)}
          </h3>

          {appointment.description && (
            <p className="text-text-secondary font-normal">
              {t(appointment.description)}
            </p>
          )}

          {appointment.hasCta && appointment.ctaLabel && (
            <Button
              variant="primary"
              icon={{ name: "calendar", position: "left" }}
              aria-label={t("{label}: {title}", {
                label: t(appointment.ctaLabel),
                title: t(appointment.title),
              })}
            >
              {t(appointment.ctaLabel)}
            </Button>
          )}
        </div>
      </div>

      {/* Badge — right-aligned */}
      <Badge variant={appointment.badge}>{t(appointment.badgeLabel)}</Badge>
    </div>
  );
}
