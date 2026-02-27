import { useMemo } from "react";
import { useI18n } from "@/hooks/useI18n";
import type { TranslationKey } from "@/i18n/ro";
import type { AssessmentPayload } from "@/types/assessment";
import { KeyHint } from "./key-hint";
import { useNumberKeys } from "./use-number-keys";
import type { StepProps } from "./wizard";

const BP_OPTIONS: { value: NonNullable<AssessmentPayload["bp_range_score"]>; label: TranslationKey; color: string }[] = [
  { value: 100, label: "Less than 120/80 mmHg", color: "#4ade80" },
  { value: 75, label: "120-129 / less than 80 mmHg", color: "#a3e635" },
  { value: 50, label: "130-139 / 80-89 mmHg", color: "#facc15" },
  { value: 25, label: "140-159 / 90-99 mmHg", color: "#fb923c" },
  { value: 0, label: "160+ / 100+ mmHg", color: "#f87171" },
];

export function StepBp({ form, update }: StepProps) {
  const { t } = useI18n();

  const shortcuts = useMemo(() => {
    const toggle = [
      () => update("bp_known", true),
      () => { update("bp_known", false); update("bp_range_score", undefined); },
    ];
    if (form.bp_known === true) {
      return [...toggle, ...BP_OPTIONS.map((opt) => () => update("bp_range_score", opt.value))];
    }
    return toggle;
  }, [form.bp_known, update]);
  useNumberKeys(shortcuts);

  return (
    <div className="flex flex-col gap-4">
      {/* Known toggle */}
      <p className="text-text-secondary text-small text-center font-medium">
        {t("Do you know your blood pressure?")}
      </p>
      <div className="flex justify-center gap-2">
        {([true, false] as const).map((val, i) => {
          const active = form.bp_known === val;
          return (
            <button
              key={String(val)}
              type="button"
              onClick={() => {
                update("bp_known", val);
                if (!val) {
                  update("bp_range_score", undefined);
                }
              }}
              className={`relative rounded-inner flex items-center gap-2 border px-6 py-3 text-sm font-medium transition-colors ${
                active
                  ? "border-status-optimal bg-status-optimal/10 text-status-optimal"
                  : "border-border-divider text-text-secondary hover:border-text-secondary"
              }`}
            >
              {val ? t("Yes") : t("No")}
              <KeyHint>{i + 1}</KeyHint>
            </button>
          );
        })}
      </div>

      {/* Range cards */}
      {form.bp_known && (
        <div className="animate-fade-slide-in flex flex-col gap-2">
          {BP_OPTIONS.map((opt, i) => {
            const active = form.bp_range_score === opt.value;
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => {
                  update("bp_range_score", opt.value);
                }}
                className={`relative rounded-inner flex items-center gap-3 border p-3 text-left transition-colors ${
                  active
                    ? "border-status-optimal bg-status-optimal/10"
                    : "border-border-divider hover:border-text-secondary"
                }`}
              >
                <span
                  className="h-3 w-3 shrink-0 rounded-full"
                  style={{ backgroundColor: opt.color }}
                  aria-hidden="true"
                />
                <span className={`text-sm ${active ? "text-status-optimal font-medium" : "text-text-primary"}`}>
                  {t(opt.label)}
                </span>
                <KeyHint>{i + 3}</KeyHint>
              </button>
            );
          })}

          {/* Medication */}
          <label className="mt-2 flex items-center gap-2 px-1">
            <input
              type="checkbox"
              checked={form.bp_on_medication ?? false}
              onChange={(e) => { update("bp_on_medication", e.target.checked); }}
              className="accent-status-optimal"
            />
            <span className="text-text-primary text-sm">
              {t("Currently on blood pressure medication")}
            </span>
          </label>
        </div>
      )}
    </div>
  );
}
