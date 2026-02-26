import type { IconName } from "@/components/ui/icon";
import { Icon } from "@/components/ui/icon";
import { useI18n } from "@/hooks/useI18n";
import type { TranslationKey } from "@/i18n/ro";

export interface TabItem<T extends string = string> {
  value: T;
  label: TranslationKey;
  icon: IconName;
}

interface TabSwitcherProps<T extends string> {
  items: TabItem<T>[];
  value: T;
  onChange: (value: T) => void;
  ariaLabel: string;
}

export function TabSwitcher<T extends string>({
  items,
  value,
  onChange,
  ariaLabel,
}: TabSwitcherProps<T>) {
  const { t } = useI18n();

  return (
    <div role="tablist" aria-label={ariaLabel} className="flex gap-2">
      {items.map((item) => {
        const isActive = item.value === value;
        return (
          <button
            key={item.value}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(item.value)}
            className={`rounded-inner flex flex-1 items-center justify-center gap-2 border px-3 py-2 font-semibold transition-colors lg:flex-none ${
              isActive
                ? "border-status-optimal bg-status-optimal-bg text-status-optimal"
                : "border-border-divider text-text-secondary hover:border-status-optimal hover:text-status-optimal"
            }`}
          >
            <Icon name={item.icon} size={24} />
            {t(item.label)}
          </button>
        );
      })}
    </div>
  );
}
