import { BrowserRouter, Routes, Route } from "react-router";
import { GuestRoute } from "@/components/auth/guest-route";
import { ProtectedRoute } from "@/components/auth/protected-route";
import { AppLayout } from "@/components/layout/app-layout";
import { AuthLayout } from "@/components/layout/auth-layout";
import { AiAssistantPage } from "@/pages/ai";
import { DashboardPage } from "@/pages/dashboard";
import { DataPage } from "@/pages/data";
import { ForgotPasswordPage } from "@/pages/forgot-password";
import { LoginPage } from "@/pages/login";
import { RegisterPage } from "@/pages/register";
import { ResetPasswordPage } from "@/pages/reset-password";
import { UserPage } from "@/pages/user";

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes — accessible without auth */}
        <Route
          element={
            <GuestRoute>
              <AuthLayout />
            </GuestRoute>
          }
        >
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
        </Route>

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
