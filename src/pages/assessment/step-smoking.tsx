import { useMemo } from "react";
import { useI18n } from "@/hooks/useI18n";
import type { TranslationKey } from "@/i18n/ro";
import type { AssessmentPayload } from "@/types/assessment";
import { KeyHint } from "./key-hint";
import { useNumberKeys } from "./use-number-keys";
import type { StepProps } from "./wizard";

const SMOKING_OPTIONS: { value: NonNullable<AssessmentPayload["smoking_raw"]>; label: TranslationKey; emoji: string }[] = [
  { value: 100, label: "Never smoked", emoji: "🙅" },
  { value: 75, label: "Quit 5+ years ago", emoji: "🎉" },
  { value: 50, label: "Quit 1-5 years ago", emoji: "💪" },
  { value: 25, label: "Quit less than 12 months ago", emoji: "🔄" },
  { value: 0, label: "Currently smoking", emoji: "🚬" },
];

export function StepSmoking({ form, update }: StepProps) {
  const { t } = useI18n();

  const shortcuts = useMemo(
    () => SMOKING_OPTIONS.map((opt) => () => update("smoking_raw", opt.value)),
    [update],
  );
  useNumberKeys(shortcuts);

  return (
    <div className="flex flex-col gap-3">
      <p className="text-text-secondary text-small mb-1 text-center font-medium">
        {t("What is your smoking status?")}
      </p>

      {SMOKING_OPTIONS.map((opt, i) => {
        const active = form.smoking_raw === opt.value;
        return (
          <button
            key={opt.value}
            type="button"
            onClick={() => {
              update("smoking_raw", opt.value);
            }}
            className={`relative rounded-inner flex items-center gap-3 border p-4 text-left transition-colors ${
              active
                ? "border-status-optimal bg-status-optimal/10"
                : "border-border-divider hover:border-text-secondary"
            }`}
          >
            <span className="text-xl" aria-hidden="true">{opt.emoji}</span>
            <span className={`text-sm font-medium ${active ? "text-status-optimal" : "text-text-primary"}`}>
              {t(opt.label)}
            </span>
            <KeyHint>{i + 1}</KeyHint>
          </button>
        );
      })}
    </div>
  );
}
