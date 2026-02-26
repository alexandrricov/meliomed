interface ProgressBarProps {
  value: number;
  max: number;
  gradientFrom: string;
  gradientTo: string;
  label: string;
}

export function ProgressBar({
  value,
  max,
  gradientFrom,
  gradientTo,
  label,
}: ProgressBarProps) {
  const percent = Math.round((value / max) * 100);

  return (
    <div
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={max}
      aria-label={label}
      className="rounded-inner bg-bg-progress-track h-2 w-[104px]"
    >
      <div
        className="rounded-inner h-full dark:brightness-90"
        style={{
          width: `${String(percent)}%`,
          background: `linear-gradient(to right, ${gradientFrom}, ${gradientTo})`,
        }}
      />
    </div>
  );
}
