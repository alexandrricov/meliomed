import { useState } from "react";
import { Link, useSearchParams } from "react-router";
import { Input } from "@/components/ui/input";
import { useResetPassword } from "@/hooks/useAuth";
import { useI18n } from "@/hooks/useI18n";

export function ResetPasswordPage() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token") ?? "";
  const email = searchParams.get("email") ?? "";

  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const resetPassword = useResetPassword();
  const { t } = useI18n();

  function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault();
    resetPassword.mutate({
      email,
      token,
      password,
      password_confirmation: passwordConfirmation,
    });
  }

  if (resetPassword.isSuccess) {
    return (
      <div className="text-center">
        <div className="text-status-optimal mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-status-optimal-bg">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
            <polyline points="22 4 12 14.01 9 11.01" />
          </svg>
        </div>
        <h1 className="text-text-primary text-h2 mb-1 font-bold">
          {t("Password changed")}
        </h1>
        <p className="text-text-secondary mb-6 font-normal">
          {t("Your password has been reset successfully.")}
        </p>
        <Link
          to="/login"
          className="rounded-inner shadow-cta inline-block px-8 py-3 font-bold text-white dark:text-emerald-950"
          style={{
            background:
              "linear-gradient(to right, var(--gradient-brand-from), var(--gradient-brand-to))",
          }}
        >
          {t("Sign in")}
        </Link>
      </div>
    );
  }

  return (
    <>
      <h1 className="text-text-primary text-h2 mb-1 text-center font-bold">
        {t("Set new password")}
      </h1>
      <p className="text-text-secondary mb-6 text-center font-normal">
        {t("Choose a new password for your account")}
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Input
          id="new-password"
          label={t("New password")}
          type="password"
          required
          autoComplete="new-password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />

        <Input
          id="confirm-new-password"
          label={t("Confirm password")}
          type="password"
          required
          autoComplete="new-password"
          value={passwordConfirmation}
          onChange={(e) => {
            setPasswordConfirmation(e.target.value);
          }}
        />

        {resetPassword.isError && (
          <div
            role="alert"
            className="rounded-inner bg-status-elevated/10 border-status-elevated/30 text-status-danger text-small border px-3 py-2"
          >
            {resetPassword.error instanceof Error
              ? resetPassword.error.message
              : t("Something went wrong. Please try again.")}
          </div>
        )}

        <button
          type="submit"
          disabled={resetPassword.isPending}
          className="rounded-inner shadow-cta py-3 font-bold text-white transition-opacity disabled:opacity-60 dark:text-emerald-950"
          style={{
            background:
              "linear-gradient(to right, var(--gradient-brand-from), var(--gradient-brand-to))",
          }}
        >
          {resetPassword.isPending
            ? t("Resetting…")
            : t("Reset password")}
        </button>
      </form>

      <p className="text-text-secondary text-small mt-6 text-center">
        <Link
          to="/login"
          className="text-status-optimal font-semibold hover:underline"
        >
          {t("Back to sign in")}
        </Link>
      </p>
    </>
  );
}
