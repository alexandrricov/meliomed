import { useI18n } from "@/hooks/useI18n";

export function DataPage() {
  const { t } = useI18n();

  return (
    <div className="pt-4 lg:pt-14">
      <h1 className="text-text-primary text-h2 font-bold">{t("My Data")}</h1>
    </div>
  );
}
