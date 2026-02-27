import { useState } from "react";
import { Link } from "react-router";
import { Input } from "@/components/ui/input";
import { useForgotPassword } from "@/hooks/useAuth";
import { useI18n } from "@/hooks/useI18n";

export function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const forgotPassword = useForgotPassword();
  const { t } = useI18n();

  function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault();
    forgotPassword.mutate({ email });
  }

  if (forgotPassword.isSuccess) {
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
          {t("Check your email")}
        </h1>
        <p className="text-text-secondary mb-6 font-normal">
          {t("We sent a password reset link to {email}", { email })}
        </p>
        <Link
          to="/login"
          className="text-status-optimal text-small font-semibold hover:underline"
        >
          {t("Back to sign in")}
        </Link>
      </div>
    );
  }

  return (
    <>
      <h1 className="text-text-primary text-h2 mb-1 text-center font-bold">
        {t("Reset your password")}
      </h1>
      <p className="text-text-secondary mb-6 text-center font-normal">
        {t("Enter your email and we'll send you a reset link")}
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Input
          id="forgot-email"
          label={t("Email")}
          type="email"
          required
          autoComplete="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          placeholder={t("you@example.com")}
        />

        {forgotPassword.isError && (
          <div
            role="alert"
            className="rounded-inner bg-status-elevated/10 border-status-elevated/30 text-status-danger text-small border px-3 py-2"
          >
            {forgotPassword.error instanceof Error
              ? forgotPassword.error.message
              : t("Something went wrong. Please try again.")}
          </div>
        )}

        <button
          type="submit"
          disabled={forgotPassword.isPending}
          className="rounded-inner shadow-cta py-3 font-bold text-white transition-opacity disabled:opacity-60 dark:text-emerald-950"
          style={{
            background:
              "linear-gradient(to right, var(--gradient-brand-from), var(--gradient-brand-to))",
          }}
        >
          {forgotPassword.isPending
            ? t("Sending…")
            : t("Send reset link")}
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
