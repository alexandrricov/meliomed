import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { api } from "@/utils/api";
import {
  getAccessToken,
  removeAccessToken,
  setAccessToken,
} from "@/utils/auth";

export interface User {
  id_user: number;
  email: string;
  name: string;
  first_name: string;
  last_name: string;
  picture: string | null;
  profile_completed: boolean;
  dob: string | null;
  sex: string | null;
  phone_number: string | null;
  created_at: string;
}

interface LoginResponse {
  user: User;
  token: string;
  token_type: string;
}

interface MeResponse {
  user: User;
}

export const ME_QUERY_KEY = ["auth", "me"] as const;

export function useGetMe() {
  return useQuery({
    queryKey: ME_QUERY_KEY,
    queryFn: () => api<MeResponse>("auth/me", { method: "GET" }),
    select: (r) => r.data.user,
    staleTime: 1000 * 60 * 5,
    enabled: Boolean(getAccessToken()),
  });
}

export function useLogin() {
  return useMutation({
    mutationFn: (data: { email: string; password: string }) =>
      api<LoginResponse>("auth/login", {
        method: "POST",
        data,
        useAuth: false,
      }),
    onSuccess: (result) => {
      setAccessToken(result.data.token);
    },
  });
}

export function useLogout() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return () => {
    removeAccessToken();
    queryClient.clear();
    void navigate("/login");
  };
}

export function useIsAuthenticated(): boolean {
  return Boolean(getAccessToken());
}
