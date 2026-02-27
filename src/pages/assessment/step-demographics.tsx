import { useMemo } from "react";
import { useI18n } from "@/hooks/useI18n";
import type { TranslationKey } from "@/i18n/ro";
import type { AssessmentPayload } from "@/types/assessment";
import { KeyHint } from "./key-hint";
import { useNumberKeys } from "./use-number-keys";
import type { StepProps } from "./wizard";

const SEX_OPTIONS: {
  value: NonNullable<AssessmentPayload["sex"]>;
  label: TranslationKey;
  emoji: string;
}[] = [
  { value: "F", label: "Female", emoji: "♀" },
  { value: "M", label: "Male", emoji: "♂" },
  { value: "NA", label: "Prefer not to say", emoji: "—" },
];

export function StepDemographics({ form, update }: StepProps) {
  const { t } = useI18n();

  const shortcuts = useMemo(
    () =>
      SEX_OPTIONS.map((opt) => () => {
        update("sex", form.sex === opt.value ? undefined : opt.value);
      }),
    [form.sex, update],
  );
  useNumberKeys(shortcuts);

  return (
    <div className="flex flex-col gap-6">
      {/* Age */}
      <div className="flex flex-col items-center gap-2">
        <label
          htmlFor="wizard-age"
          className="text-text-secondary text-small font-medium"
        >
          {t("How old are you?")}
        </label>
        <input
          id="wizard-age"
          type="number"
          inputMode="numeric"
          min={1}
          max={120}
          placeholder="—"
          value={form.age ?? ""}
          onChange={(e) => {
            update("age", e.target.value ? Number(e.target.value) : undefined);
          }}
          autoFocus
          className="border-border-divider bg-bg-card text-text-primary rounded-inner focus:border-status-optimal w-24 border py-3 text-center text-2xl font-bold focus:outline-none"
        />
      </div>

      {/* Sex */}
      <div className="flex flex-col gap-2">
        <span className="text-text-secondary text-small text-center font-medium">
          {t("Sex")}
        </span>
        <div className="flex justify-center gap-2">
          {SEX_OPTIONS.map((opt, i) => {
            const active = form.sex === opt.value;
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => {
                  update("sex", active ? undefined : opt.value);
                }}
                className={`rounded-inner relative flex items-center gap-2 border px-4 py-3 text-sm font-medium transition-colors ${
                  active
                    ? "border-status-optimal bg-status-optimal/10 text-status-optimal"
                    : "border-border-divider text-text-secondary hover:border-text-secondary"
                }`}
              >
                <span aria-hidden="true">{opt.emoji}</span>
                {t(opt.label)}
                <KeyHint>{i + 1}</KeyHint>
              </button>
            );
          })}
        </div>
      </div>

      <p className="text-text-secondary hidden text-center text-xs opacity-60 [@media(hover:hover)]:block">
        {t("Tip: use number keys to select and Enter to continue")}
      </p>
    </div>
  );
}
