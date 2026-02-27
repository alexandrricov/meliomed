import { useI18n } from "@/hooks/useI18n";
import type { StepProps } from "./wizard";

export function StepBody({ form, update }: StepProps) {
  const { t } = useI18n();

  const bmi =
    form.height_cm && form.weight_kg
      ? (form.weight_kg / (form.height_cm / 100) ** 2).toFixed(1)
      : null;

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="flex gap-6">
        {/* Height */}
        <div className="flex flex-col items-center gap-2">
          <label htmlFor="wizard-height" className="text-text-secondary text-small font-medium">
            {t("Height (cm)")}
          </label>
          <input
            id="wizard-height"
            type="number"
            inputMode="numeric"
            min={50}
            max={250}
            placeholder="—"
            autoFocus
            value={form.height_cm ?? ""}
            onChange={(e) => {
              update("height_cm", e.target.value ? Number(e.target.value) : undefined);
            }}
            className="border-border-divider bg-bg-card text-text-primary rounded-inner w-24 border py-3 text-center text-2xl font-bold focus:border-status-optimal focus:outline-none"
          />
        </div>

        {/* Weight */}
        <div className="flex flex-col items-center gap-2">
          <label htmlFor="wizard-weight" className="text-text-secondary text-small font-medium">
            {t("Weight (kg)")}
          </label>
          <input
            id="wizard-weight"
            type="number"
            inputMode="numeric"
            min={20}
            max={300}
            placeholder="—"
            value={form.weight_kg ?? ""}
            onChange={(e) => {
              update("weight_kg", e.target.value ? Number(e.target.value) : undefined);
            }}
            className="border-border-divider bg-bg-card text-text-primary rounded-inner w-24 border py-3 text-center text-2xl font-bold focus:border-status-optimal focus:outline-none"
          />
        </div>
      </div>

      {/* BMI display */}
      {bmi && (
        <div className="animate-fade-slide-in rounded-inner border-border-divider flex items-center gap-3 border p-4">
          <span className="text-xl" aria-hidden="true">⚖️</span>
          <div>
            <span className="text-text-secondary text-xs font-medium">BMI</span>
            <div className="text-text-primary text-lg font-bold">{bmi}</div>
          </div>
        </div>
      )}
    </div>
  );
}
