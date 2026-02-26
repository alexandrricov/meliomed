import { BrowserRouter, Routes, Route } from "react-router";
import { GuestRoute } from "@/components/auth/guest-route";
import { ProtectedRoute } from "@/components/auth/protected-route";
import { DashboardPage } from "@/pages/dashboard";
import { LoginPage } from "@/pages/login";

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes — accessible without auth */}
        <Route
          path="/login"
          element={
            <GuestRoute>
              <LoginPage />
            </GuestRoute>
          }
        />

        {/* Protected routes — require auth */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
