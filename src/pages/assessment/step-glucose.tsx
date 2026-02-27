import { useMemo } from "react";
import { useI18n } from "@/hooks/useI18n";
import type { TranslationKey } from "@/i18n/ro";
import type { AssessmentPayload } from "@/types/assessment";
import { KeyHint } from "./key-hint";
import { useNumberKeys } from "./use-number-keys";
import type { StepProps } from "./wizard";

const DIABETES_OPTIONS: { value: NonNullable<AssessmentPayload["diabetes_status"]>; label: TranslationKey }[] = [
  { value: "no", label: "No" },
  { value: "yes", label: "Yes" },
  { value: "unknown", label: "I don't know" },
];

const GLUCOSE_OPTIONS: { value: NonNullable<AssessmentPayload["glucose_range_score"]>; label: TranslationKey; color: string }[] = [
  { value: 100, label: "Less than 100 mg/dL", color: "#4ade80" },
  { value: 60, label: "100-125 mg/dL", color: "#facc15" },
  { value: 0, label: "126+ mg/dL", color: "#f87171" },
];

const A1C_OPTIONS: { value: NonNullable<AssessmentPayload["a1c_range_score"]>; label: TranslationKey; color: string }[] = [
  { value: 40, label: "Less than 7%", color: "#4ade80" },
  { value: 30, label: "7 - 7.9%", color: "#a3e635" },
  { value: 20, label: "8 - 8.9%", color: "#facc15" },
  { value: 10, label: "9 - 9.9%", color: "#fb923c" },
  { value: 0, label: "10% or higher", color: "#f87171" },
];

export function StepGlucose({ form, update }: StepProps) {
  const { t } = useI18n();

  const shortcuts = useMemo(() => {
    const toggle = DIABETES_OPTIONS.map((opt) => () => {
      update("diabetes_status", opt.value);
      update("glucose_range_score", undefined);
      update("a1c_range_score", undefined);
    });
    if (form.diabetes_status === "no") {
      return [...toggle, ...GLUCOSE_OPTIONS.map((opt) => () => update("glucose_range_score", opt.value))];
    }
    if (form.diabetes_status === "yes") {
      return [...toggle, ...A1C_OPTIONS.map((opt) => () => update("a1c_range_score", opt.value))];
    }
    return toggle;
  }, [form.diabetes_status, update]);
  useNumberKeys(shortcuts);

  return (
    <div className="flex flex-col gap-4">
      {/* Diabetes status */}
      <p className="text-text-secondary text-small text-center font-medium">
        {t("Have you been diagnosed with diabetes?")}
      </p>
      <div className="flex justify-center gap-2">
        {DIABETES_OPTIONS.map((opt, i) => {
          const active = form.diabetes_status === opt.value;
          return (
            <button
              key={opt.value}
              type="button"
              onClick={() => {
                update("diabetes_status", opt.value);
                update("glucose_range_score", undefined);
                update("a1c_range_score", undefined);
              }}
              className={`relative rounded-inner flex items-center gap-2 border px-4 py-3 text-sm font-medium transition-colors ${
                active
                  ? "border-status-optimal bg-status-optimal/10 text-status-optimal"
                  : "border-border-divider text-text-secondary hover:border-text-secondary"
              }`}
            >
              {t(opt.label)}
              <KeyHint>{i + 1}</KeyHint>
            </button>
          );
        })}
      </div>

      {/* Glucose (no diabetes) */}
      {form.diabetes_status === "no" && (
        <div className="animate-fade-slide-in flex flex-col gap-2">
          <p className="text-text-secondary text-small font-medium">
            {t("Fasting glucose level")}
          </p>
          {GLUCOSE_OPTIONS.map((opt, i) => {
            const active = form.glucose_range_score === opt.value;
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => {
                  update("glucose_range_score", opt.value);
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
                <KeyHint>{i + 4}</KeyHint>
              </button>
            );
          })}
        </div>
      )}

      {/* HbA1c (has diabetes) */}
      {form.diabetes_status === "yes" && (
        <div className="animate-fade-slide-in flex flex-col gap-2">
          <p className="text-text-secondary text-small font-medium">
            {t("HbA1c level")}
          </p>
          {A1C_OPTIONS.map((opt, i) => {
            const active = form.a1c_range_score === opt.value;
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => {
                  update("a1c_range_score", opt.value);
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
                <KeyHint>{i + 4}</KeyHint>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
