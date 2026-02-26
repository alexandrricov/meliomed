import { Navigate } from "react-router";
import { useIsAuthenticated } from "@/hooks/useAuth";

export function GuestRoute({ children }: { children: React.ReactNode }) {
  const isAuthenticated = useIsAuthenticated();

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
}
