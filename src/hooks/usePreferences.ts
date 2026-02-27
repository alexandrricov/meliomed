import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api, type ResponseWrapper } from "@/utils/api";
import type { UserPreferences } from "@/types/dashboard";

export const PREFERENCES_KEY = ["preferences"] as const;

interface PreferencesResponse {
  preferences: UserPreferences;
}

export function useGetPreferences() {
  return useQuery<ResponseWrapper<PreferencesResponse>, Error, UserPreferences>({
    queryKey: PREFERENCES_KEY,
    queryFn: () => api<PreferencesResponse>("preferences", { method: "GET" }),
    select: (r) => r.data.preferences,
    staleTime: 1000 * 60 * 5,
  });
}

export function useUpdatePreference() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      key,
      value,
    }: {
      key: keyof UserPreferences;
      value: UserPreferences[keyof UserPreferences];
    }) =>
      api(`preferences/${key}`, {
        method: "POST",
        data: { value },
      }),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: PREFERENCES_KEY });
    },
  });
}
