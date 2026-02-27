import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { Input } from "@/components/ui/input";
import { useLogin } from "@/hooks/useAuth";
import { useI18n } from "@/hooks/useI18n";

export function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const login = useLogin();
  const navigate = useNavigate();
  const { t } = useI18n();

  function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault();
    login.mutate(
      { email, password },
      {
        onSuccess: () => {
          void navigate("/");
        },
      },
    );
  }

  return (
    <>
      <h1 className="text-text-primary text-h2 mb-1 text-center font-bold">
        {t("Welcome back")}
      </h1>
      <p className="text-text-secondary mb-6 text-center font-normal">
        {t("Sign in to your account")}
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Input
          id="email"
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

        <Input
          id="password"
          label={t("Password")}
          type="password"
          required
          autoComplete="current-password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          placeholder={t("Enter your password")}
        />

        <div className="flex justify-end">
          <Link
            to="/forgot-password"
            className="text-status-optimal text-small font-semibold hover:underline"
          >
            {t("Forgot password?")}
          </Link>
        </div>

        {login.isError && (
          <div
            role="alert"
            className="rounded-inner bg-status-elevated/10 border-status-elevated/30 text-status-danger text-small border px-3 py-2"
          >
            {login.error instanceof Error
              ? login.error.message
              : t("Invalid email or password")}
          </div>
        )}

        <button
          type="submit"
          disabled={login.isPending}
          className="rounded-inner shadow-cta py-3 font-bold text-white transition-opacity disabled:opacity-60 dark:text-emerald-950"
          style={{
            background:
              "linear-gradient(to right, var(--gradient-brand-from), var(--gradient-brand-to))",
          }}
        >
          {login.isPending ? t("Signing in…") : t("Sign in")}
        </button>
      </form>

      <p className="text-text-secondary text-small mt-6 text-center">
        {t("Don't have an account?")}{" "}
        <Link
          to="/register"
          className="text-status-optimal font-semibold hover:underline"
        >
          {t("Sign up")}
        </Link>
      </p>
    </>
  );
}
