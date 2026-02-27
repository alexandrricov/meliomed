import { useCallback, useEffect, useState } from "react";
import { useI18n } from "@/hooks/useI18n";
import type { TranslationKey } from "@/i18n/ro";
import type { StepProps } from "./wizard";

const COLS = 2;

const MEPA_QUESTIONS: { emoji: string; text: TranslationKey }[] = [
  { emoji: "🥦", text: "I eat at least 4.5 cups of fruits and vegetables per day" },
  { emoji: "🐟", text: "I eat at least two 3.5 oz servings of fish per week" },
  { emoji: "🌾", text: "I eat at least three 1 oz servings of whole grains per day" },
  { emoji: "🧂", text: "I consume no more than 1500 mg of sodium per day" },
  { emoji: "🥤", text: "I drink no more than 36 oz (men) / 24 oz (women) of sugar-sweetened beverages per week" },
  { emoji: "🥜", text: "I eat at least four servings of nuts, legumes, and seeds per week" },
  { emoji: "🥩", text: "I eat no more than two servings of processed meats per week" },
  { emoji: "🧈", text: "I eat less than 7% of my total calories from saturated fat" },
  { emoji: "🌈", text: "I eat fruits and vegetables of varied colors daily" },
  { emoji: "💧", text: "I drink at least 8 glasses of water per day" },
  { emoji: "🍳", text: "I avoid skipping breakfast" },
  { emoji: "🍟", text: "I limit fried food consumption" },
  { emoji: "⏰", text: "I eat meals at regular times" },
  { emoji: "🏷️", text: "I read food labels before purchasing" },
  { emoji: "🍬", text: "I limit sugar intake in daily diet" },
  { emoji: "🏡", text: "I prefer home-cooked meals over fast food" },
];

const COUNT = MEPA_QUESTIONS.length;

export function StepDiet({ form, update }: StepProps) {
  const { t } = useI18n();
  const answers = form.mepa_answers ?? new Array<boolean>(COUNT).fill(false);
  const checked = answers.filter(Boolean).length;
  const [focus, setFocus] = useState(-1);

  function toggle(index: number) {
    const next = [...answers];
    next[index] = !next[index];
    update("mepa_answers", next);
  }

  const clamp = (n: number) => Math.max(0, Math.min(COUNT - 1, n));

  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement).tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return;

      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          setFocus((f) => clamp(f < 0 ? 0 : f + COLS));
          break;
        case "ArrowUp":
          e.preventDefault();
          setFocus((f) => clamp(f < 0 ? 0 : f - COLS));
          break;
        case "ArrowRight":
          e.preventDefault();
          setFocus((f) => clamp(f < 0 ? 0 : f + 1));
          break;
        case "ArrowLeft":
          e.preventDefault();
          setFocus((f) => clamp(f < 0 ? 0 : f - 1));
          break;
        case " ":
          e.preventDefault();
          if (focus >= 0) toggle(focus);
          break;
      }
    },
    [focus, answers],
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [handleKey]);

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <p className="text-text-secondary text-small font-medium">
          {t("Check the statements that apply to you.")}
        </p>
        <span className="text-text-secondary text-xs font-medium">
          {t("{count} of {total} checked", { count: checked, total: COUNT })}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-1.5">
        {MEPA_QUESTIONS.map((q, i) => {
          const active = answers[i] ?? false;
          const focused = focus === i;
          return (
            <button
              key={i}
              type="button"
              onClick={() => { toggle(i); }}
              className={`rounded-inner flex items-start gap-2 border p-2.5 text-left transition-colors ${
                active
                  ? "border-status-optimal bg-status-optimal/10"
                  : "border-border-divider hover:border-text-secondary"
              } ${focused ? "ring-status-optimal/50 ring-2" : ""}`}
            >
              <span className="shrink-0 text-sm" aria-hidden="true">{q.emoji}</span>
              <span className={`text-xs leading-snug ${active ? "text-status-optimal font-medium" : "text-text-primary"}`}>
                {t(q.text)}
              </span>
            </button>
          );
        })}
      </div>

      <p className="text-text-secondary hidden text-center text-xs opacity-60 [@media(hover:hover)]:block">
        {t("Tip: use arrow keys to navigate and Space to toggle")}
      </p>
    </div>
  );
}
