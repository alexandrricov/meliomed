import { Badge } from "@/components/ui/badge";
import { Icon } from "@/components/ui/icon";
import type { Appointment } from "@/types/dashboard";

interface AppointmentRowProps {
  appointment: Appointment;
}

export function AppointmentRow({ appointment }: AppointmentRowProps) {
  return (
    <div className="rounded-inner bg-bg-card shadow-card flex flex-wrap items-center gap-3 p-4">
      {/* Date box */}
      <div className="rounded-inner bg-date-box-bg flex h-20 w-20 shrink-0 flex-col items-center justify-center gap-1 p-3">
        <span className="text-text-date-label text-base font-semibold">
          {appointment.month}
        </span>
        <span className="text-[32px] leading-7 font-bold text-white">
          {appointment.day}
        </span>
      </div>

      {/* Content */}
      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <h3 className="text-text-primary text-lg font-bold">
          {appointment.title}
        </h3>
        {appointment.description && (
          <p className="text-text-secondary text-base font-normal">
            {appointment.description}
          </p>
        )}
      </div>

      {/* Badge */}
      <Badge variant={appointment.badge}>{appointment.badgeLabel}</Badge>

      {/* CTA button */}
      {appointment.hasCta && appointment.ctaLabel && (
        <button
          type="button"
          aria-label={`${appointment.ctaLabel}: ${appointment.title}`}
          className="rounded-inner text-text-primary shadow-cta flex w-full items-center justify-center gap-2.5 px-4 py-3 text-base font-semibold lg:w-auto"
          style={{
            background: "linear-gradient(to right, #8bec90, #17d792)",
          }}
        >
          <Icon name="calendar" size={24} />
          {appointment.ctaLabel}
        </button>
      )}
    </div>
  );
}
