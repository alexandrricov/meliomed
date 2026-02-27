import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/utils/api";
import type { AssessmentPayload } from "@/types/assessment";
import { HEALTH_SCORE_LATEST_KEY } from "@/hooks/useDashboard";

export function useSubmitAssessment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: AssessmentPayload) =>
      api("health-score", { method: "POST", data }),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: [...HEALTH_SCORE_LATEST_KEY] });
    },
  });
}
