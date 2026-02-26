import { useI18n } from "@/hooks/useI18n";

export function AiAssistantPage() {
  const { t } = useI18n();

  return (
    <div className="pt-4 lg:pt-14">
      <h1 className="text-text-primary text-h2 font-bold">
        {t("AI Assistant")}
      </h1>
    </div>
  );
}
