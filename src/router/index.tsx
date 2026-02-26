import { BrowserRouter, Routes, Route } from "react-router";
import { GuestRoute } from "@/components/auth/guest-route";
import { ProtectedRoute } from "@/components/auth/protected-route";
import { AppLayout } from "@/components/layout/app-layout";
import { AiAssistantPage } from "@/pages/ai";
import { DashboardPage } from "@/pages/dashboard";
import { DataPage } from "@/pages/data";
import { LoginPage } from "@/pages/login";
import { UserPage } from "@/pages/user";

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
          element={
            <ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/" element={<DashboardPage />} />
          <Route path="/ai" element={<AiAssistantPage />} />
          <Route path="/data" element={<DataPage />} />
          <Route path="/user" element={<UserPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
