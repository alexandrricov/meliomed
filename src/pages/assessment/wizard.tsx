import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/action";
import { Modal } from "@/components/ui/modal";
import { useSubmitAssessment } from "@/hooks/useAssessment";
import { useI18n } from "@/hooks/useI18n";
import type { TranslationKey } from "@/i18n/ro";
import type { AssessmentPayload } from "@/types/assessment";
import { KeyHint } from "./key-hint";
import { StepActivity } from "./step-activity";
import { StepBody } from "./step-body";
import { StepBp } from "./step-bp";
import { StepCholesterol } from "./step-cholesterol";
import { StepDemographics } from "./step-demographics";
import { StepDiet } from "./step-diet";
import { StepGlucose } from "./step-glucose";
import { StepSleep } from "./step-sleep";
import { StepSmoking } from "./step-smoking";

export interface StepProps {
  form: AssessmentPayload;
  update: <K extends keyof AssessmentPayload>(key: K, value: AssessmentPayload[K]) => void;
}

interface StepDef {
  title: TranslationKey;
  component: React.ComponentType<StepProps>;
}

const STEPS: StepDef[] = [
  { title: "About You", component: StepDemographics },
  { title: "Smoking", component: StepSmoking },
  { title: "Physical activity", component: StepActivity },
  { title: "Sleep", component: StepSleep },
  { title: "Diet", component: StepDiet },
  { title: "Body", component: StepBody },
  { title: "Blood Pressure", component: StepBp },
  { title: "Cholesterol", component: StepCholesterol },
  { title: "Glucose", component: StepGlucose },
];

interface AssessmentWizardProps {
  open: boolean;
  onClose: () => void;
}

export function AssessmentWizard({ open, onClose }: AssessmentWizardProps) {
  const { t } = useI18n();
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<AssessmentPayload>({});
  const { mutate: submit, isPending } = useSubmitAssessment();

  // Reset on close
  useEffect(() => {
    if (!open) {
      setStep(0);
      setForm({});
    }
  }, [open]);

  function update<K extends keyof AssessmentPayload>(key: K, value: AssessmentPayload[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function goNext() {
    if (step < STEPS.length - 1) {
      setStep((s) => s + 1);
    }
  }

  function goBack() {
    if (step > 0) {
      setStep((s) => s - 1);
    }
  }

  function handleSubmit() {
    submit(form, { onSuccess: onClose });
  }

  function isStepComplete(s: number): boolean {
    switch (s) {
      case 0: // Demographics
        return form.age != null && form.sex != null;
      case 1: // Smoking
        return form.smoking_raw != null;
      case 2: // Activity
        return form.activity_raw != null;
      case 3: // Sleep
        return form.sleep_raw != null;
      case 4: // Diet — all-unchecked is a valid answer
        return true;
      case 5: // Body
        return form.height_cm != null && form.weight_kg != null;
      case 6: // BP
        return form.bp_known === false || (form.bp_known === true && form.bp_range_score != null);
      case 7: // Cholesterol
        return form.cholesterol_known === false || (form.cholesterol_known === true && form.cholesterol_range_score != null);
      case 8: // Glucose
        return form.diabetes_status === "unknown"
          || (form.diabetes_status === "no" && form.glucose_range_score != null)
          || (form.diabetes_status === "yes" && form.a1c_range_score != null);
      default:
        return true;
    }
  }

  const isLast = step === STEPS.length - 1;
  const canProceed = isStepComplete(step);
  const current = STEPS[step]!;
  const StepComponent = current.component;

  // Enter key → Next / Save
  const handleEnter = useCallback(
    (e: KeyboardEvent) => {
      if (e.key !== "Enter" || !canProceed || isPending) return;
      e.preventDefault();
      if (isLast) handleSubmit();
      else goNext();
    },
    [canProceed, isPending, isLast],
  );

  useEffect(() => {
    if (!open) return;
    document.addEventListener("keydown", handleEnter);
    return () => document.removeEventListener("keydown", handleEnter);
  }, [open, handleEnter]);

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={t(current.title)}
      onBack={step > 0 ? goBack : undefined}
      size={step === 4 ? "wide" : "default"}
    >
      {/* Progress bar */}
      <div className="mb-6 flex gap-1">
        {STEPS.map((_, i) => (
          <div
            key={i}
            className={`h-1 flex-1 rounded-full transition-colors duration-200 ${
              i <= step ? "bg-status-optimal" : "bg-bg-progress-track"
            }`}
          />
        ))}
      </div>

      {/* Step content */}
      <StepComponent
        form={form}
        update={update}
      />

      {/* Footer */}
      <div className="mt-8 flex items-center justify-between">
        <button
          type="button"
          onClick={goNext}
          className="text-text-secondary hover:text-text-primary text-sm font-medium transition-colors"
          disabled={isLast}
          hidden={isLast}
        >
          {t("Skip")}
        </button>

        {isLast ? (
          <Button
            variant="primary"
            onClick={handleSubmit}
            disabled={isPending || !canProceed}
            className="relative ml-auto"
          >
            {isPending ? t("Saving…") : t("Save")}
            <KeyHint>↵</KeyHint>
          </Button>
        ) : (
          <Button
            variant="primary"
            onClick={goNext}
            disabled={!canProceed}
            className="relative ml-auto"
          >
            {t("Next")}
            <KeyHint>↵</KeyHint>
          </Button>
        )}
      </div>
    </Modal>
  );
}
