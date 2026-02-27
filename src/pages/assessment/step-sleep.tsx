import { useMemo, useState } from "react";
import { useI18n } from "@/hooks/useI18n";
import { useTheme } from "@/hooks/useTheme";
import type { TranslationKey } from "@/i18n/ro";
import type { AssessmentPayload } from "@/types/assessment";
import { KeyHint } from "./key-hint";
import { useNumberKeys } from "./use-number-keys";
import type { StepProps } from "./wizard";

const SLEEP_OPTIONS: { label: TranslationKey; raw: NonNullable<AssessmentPayload["sleep_raw"]>; emoji: string }[] = [
  { label: "<4h", raw: 0, emoji: "😵" },
  { label: "4-5h", raw: 20, emoji: "😫" },
  { label: "5-6h", raw: 40, emoji: "😴" },
  { label: "6-7h", raw: 70, emoji: "🥱" },
  { label: "7-8h", raw: 100, emoji: "😊" },
  { label: "8-9h", raw: 100, emoji: "😌" },
  { label: "9-10h", raw: 90, emoji: "😪" },
  { label: "10h+", raw: 0, emoji: "😶" },
];

function getZone(idx: number | null): { color: string; label: TranslationKey | "" } {
  if (idx === null) return { color: "#52525b", label: "" };
  if (idx <= 1) return { color: "#f87171", label: "Insufficient" };
  if (idx <= 3) return { color: "#fb923c", label: "Sub-optimal" };
  if (idx <= 5) return { color: "#4ade80", label: "Optimal" };
  return { color: "#facc15", label: "Too much" };
}

function SleepArc({ selected, isDark }: { selected: number | null; isDark: boolean }) {
  const total = SLEEP_OPTIONS.length;
  const startAngle = Math.PI;
  const cx = 160;
  const cy = 150;
  const r = 120;
  const inactiveColor = isDark ? "#27272a" : "#e5e7eb";

  return (
    <svg
      width="320"
      height="170"
      viewBox="0 0 320 170"
      className="mx-auto block"
      aria-hidden="true"
    >
      {SLEEP_OPTIONS.map((_, i) => {
        const a1 = startAngle + (i / total) * Math.PI;
        const a2 = startAngle + ((i + 0.85) / total) * Math.PI;
        const x1 = cx + r * Math.cos(a1);
        const y1 = cy + r * Math.sin(a1);
        const x2 = cx + r * Math.cos(a2);
        const y2 = cy + r * Math.sin(a2);
        const isSelected = selected === i;
        const isPast = selected !== null && i <= selected;
        return (
          <path
            key={i}
            d={`M ${x1} ${y1} A ${r} ${r} 0 0 1 ${x2} ${y2}`}
            fill="none"
            stroke={isPast ? getZone(selected).color : inactiveColor}
            strokeWidth={isSelected ? 10 : 6}
            strokeLinecap="round"
            style={{
              transition: "stroke 0.3s, stroke-width 0.2s",
              filter: isSelected ? `drop-shadow(0 0 8px ${getZone(i).color}66)` : "none",
            }}
          />
        );
      })}
      {selected !== null && (
        <>
          <text
            x={cx}
            y={cy - 30}
            textAnchor="middle"
            style={{ fontSize: 36 }}
          >
            {SLEEP_OPTIONS[selected]!.emoji}
          </text>
          <text
            x={cx}
            y={cy + 2}
            textAnchor="middle"
            className="fill-text-primary"
            style={{ fontSize: 22, fontWeight: 700 }}
          >
            {SLEEP_OPTIONS[selected]!.label}
          </text>
          <text
            x={cx}
            y={cy + 24}
            textAnchor="middle"
            fill={getZone(selected).color}
            style={{ fontSize: 12, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em" }}
          >
            {getZone(selected).label}
          </text>
        </>
      )}
      {selected === null && (
        <>
          <text x={cx} y={cy - 10} textAnchor="middle" style={{ fontSize: 28 }}>
            🌙
          </text>
          <text
            x={cx}
            y={cy + 16}
            textAnchor="middle"
            className="fill-text-secondary"
            style={{ fontSize: 12, fontWeight: 500 }}
          >
            Select duration
          </text>
        </>
      )}
    </svg>
  );
}

export function StepSleep({ form, update }: StepProps) {
  const { t } = useI18n();
  const { theme } = useTheme();
  const isDark = theme === "dark";

  // Find selected index from current sleep_raw value
  const selectedIdx = form.sleep_raw != null
    ? SLEEP_OPTIONS.findIndex((opt) => opt.raw === form.sleep_raw)
    : null;

  // Since multiple options can map to same raw value, track by index
  const [localIdx, setLocalIdx] = useState<number | null>(
    selectedIdx !== -1 ? selectedIdx : null,
  );

  function handleSelect(idx: number) {
    setLocalIdx(idx);
    update("sleep_raw", SLEEP_OPTIONS[idx]!.raw);
  }

  const shortcuts = useMemo(
    () => SLEEP_OPTIONS.map((_, i) => () => handleSelect(i)),
    [],
  );
  useNumberKeys(shortcuts);

  return (
    <div className="flex flex-col gap-3">
      <p className="text-text-secondary text-small mb-1 text-center font-medium">
        {t("How many hours do you sleep per night?")}
      </p>

      <SleepArc selected={localIdx} isDark={isDark} />

      {/* Pill buttons */}
      <div className="flex flex-wrap justify-center gap-1.5">
        {SLEEP_OPTIONS.map((opt, i) => {
          const active = localIdx === i;
          const zone = getZone(i);
          return (
            <button
              key={i}
              type="button"
              onClick={() => { handleSelect(i); }}
              className="relative rounded-full border px-3 py-2 text-xs font-medium transition-all"
              style={{
                borderColor: active ? zone.color : "var(--border-divider)",
                background: active ? `${zone.color}18` : "transparent",
                color: active ? zone.color : "var(--text-secondary)",
                fontWeight: active ? 700 : 400,
              }}
            >
              {t(opt.label)}
              <KeyHint>{i + 1}</KeyHint>
            </button>
          );
        })}
      </div>

      {/* WHO hint */}
      <div className="rounded-inner border-border-divider mt-2 flex items-center gap-2 border p-3">
        <span className="text-sm" aria-hidden="true">💡</span>
        <span className="text-text-secondary text-xs leading-relaxed">
          {t("WHO recommends 7-9 hours of sleep for adults")}
        </span>
      </div>
    </div>
  );
}
