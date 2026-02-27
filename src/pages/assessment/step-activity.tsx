import { useMemo, useState } from "react";
import { useI18n } from "@/hooks/useI18n";
import type { TranslationKey } from "@/i18n/ro";
import type { AssessmentPayload } from "@/types/assessment";
import { KeyHint } from "./key-hint";
import { useNumberKeys } from "./use-number-keys";
import type { StepProps } from "./wizard";

const FREQ_OPTIONS: { label: TranslationKey; emoji: string; value: number }[] = [
  { label: "No sport", emoji: "🛋️", value: 0 },
  { label: "1-2 times", emoji: "🚶", value: 1.5 },
  { label: "3-4 times", emoji: "🏃", value: 3.5 },
  { label: "Daily", emoji: "⚡", value: 6 },
];

const DURATION_OPTIONS: { label: TranslationKey; value: number }[] = [
  { label: "~30 min", value: 30 },
  { label: "~1 hour", value: 60 },
  { label: "1.5h+", value: 100 },
];

function minutesToActivityRaw(minutes: number): AssessmentPayload["activity_raw"] {
  if (minutes === 0) return 0;
  if (minutes < 30) return 20;
  if (minutes < 60) return 40;
  if (minutes < 90) return 60;
  if (minutes < 120) return 80;
  if (minutes < 150) return 90;
  return 100;
}

export function StepActivity({ update }: StepProps) {
  const { t } = useI18n();
  const [freqIdx, setFreqIdx] = useState<number | null>(null);
  const [durIdx, setDurIdx] = useState<number | null>(null);

  const freq = freqIdx !== null ? FREQ_OPTIONS[freqIdx]! : null;
  const dur = durIdx !== null ? DURATION_OPTIONS[durIdx]! : null;
  const total = freq && dur ? Math.round(freq.value * dur.value) : null;
  const showDuration = freqIdx !== null && freq !== null && freq.value > 0;

  const shortcuts = useMemo(() => {
    if (showDuration) {
      return DURATION_OPTIONS.map((_, i) => () => handleDuration(i));
    }
    return FREQ_OPTIONS.map((_, i) => () => handleFreq(i));
  }, [showDuration, freqIdx, durIdx]);
  useNumberKeys(shortcuts);

  function handleFreq(idx: number) {
    setFreqIdx(idx);
    const opt = FREQ_OPTIONS[idx]!;
    if (opt.value === 0) {
      update("activity_raw", 0);
      setDurIdx(null);
    } else if (durIdx !== null) {
      const minutes = Math.round(opt.value * DURATION_OPTIONS[durIdx]!.value);
      update("activity_raw", minutesToActivityRaw(minutes));
    }
  }

  function handleDuration(idx: number) {
    setDurIdx(idx);
    if (freqIdx !== null) {
      const minutes = Math.round(FREQ_OPTIONS[freqIdx]!.value * DURATION_OPTIONS[idx]!.value);
      update("activity_raw", minutesToActivityRaw(minutes));
    }
  }

  return (
    <div className="flex flex-col gap-5">
      {/* Frequency */}
      <div>
        <p className="text-text-secondary text-small mb-3 text-center font-medium">
          {t("How often do you exercise per week?")}
        </p>
        <div className="grid grid-cols-2 gap-2">
          {FREQ_OPTIONS.map((opt, i) => {
            const active = freqIdx === i;
            return (
              <button
                key={i}
                type="button"
                onClick={() => { handleFreq(i); }}
                className={`relative rounded-inner flex items-center gap-3 border p-3 text-left transition-colors ${
                  active
                    ? "border-status-optimal bg-status-optimal/10"
                    : "border-border-divider hover:border-text-secondary"
                }`}
              >
                <span className="text-xl" aria-hidden="true">{opt.emoji}</span>
                <span className={`text-sm font-medium ${active ? "text-status-optimal" : "text-text-primary"}`}>
                  {t(opt.label)}
                </span>
                {!showDuration && <KeyHint>{i + 1}</KeyHint>}
              </button>
            );
          })}
        </div>
      </div>

      {/* Duration — shown when freq > 0 */}
      {showDuration && (
        <div className="animate-fade-slide-in">
          <p className="text-text-secondary text-small mb-3 text-center font-medium">
            {t("How long is a typical session?")}
          </p>
          <div className="flex gap-2">
            {DURATION_OPTIONS.map((opt, i) => {
              const active = durIdx === i;
              return (
                <button
                  key={i}
                  type="button"
                  onClick={() => { handleDuration(i); }}
                  className={`relative rounded-inner flex-1 border py-3 text-center text-sm font-medium transition-colors ${
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
        </div>
      )}

      {/* Summary */}
      {total !== null && (
        <div className="animate-fade-slide-in rounded-inner border-border-divider flex items-center gap-3 border p-4">
          <span className="text-xl" aria-hidden="true">🎯</span>
          <div>
            <span className="text-text-secondary text-xs font-medium">{t("Weekly estimate")}</span>
            <div className="text-text-primary text-lg font-bold">~{total} min</div>
          </div>
        </div>
      )}

      {freqIdx === 0 && (
        <div className="animate-fade-slide-in rounded-inner bg-bg-progress-track p-4">
          <span className="text-text-secondary text-sm">
            {t("No worries — Melio will adapt the plan for you.")} 💪
          </span>
        </div>
      )}
    </div>
  );
}
