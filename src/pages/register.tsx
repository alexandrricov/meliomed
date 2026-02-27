import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { Input } from "@/components/ui/input";
import { useRegister } from "@/hooks/useAuth";
import { useI18n } from "@/hooks/useI18n";

export function RegisterPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const register = useRegister();
  const navigate = useNavigate();
  const { t } = useI18n();

  function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault();
    register.mutate(
      {
        first_name: firstName,
        last_name: lastName,
        email,
        password,
        password_confirmation: passwordConfirmation,
      },
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
        {t("Create your account")}
      </h1>
      <p className="text-text-secondary mb-6 text-center font-normal">
        {t("Start your health journey with Melio")}
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="grid grid-cols-2 gap-3">
          <Input
            id="first-name"
            label={t("First name")}
            type="text"
            required
            autoComplete="given-name"
            value={firstName}
            onChange={(e) => {
              setFirstName(e.target.value);
            }}
          />

          <Input
            id="last-name"
            label={t("Last name")}
            type="text"
            required
            autoComplete="family-name"
            value={lastName}
            onChange={(e) => {
              setLastName(e.target.value);
            }}
          />
        </div>

        <Input
          id="register-email"
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
          id="register-password"
          label={t("Password")}
          type="password"
          required
          autoComplete="new-password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          placeholder={t("Create a password")}
        />

        <Input
          id="confirm-password"
          label={t("Confirm password")}
          type="password"
          required
          autoComplete="new-password"
          value={passwordConfirmation}
          onChange={(e) => {
            setPasswordConfirmation(e.target.value);
          }}
          placeholder={t("Repeat your password")}
        />

        {register.isError && (
          <div
            role="alert"
            className="rounded-inner bg-status-elevated/10 border-status-elevated/30 text-status-danger text-small border px-3 py-2"
          >
            {register.error instanceof Error
              ? register.error.message
              : t("Something went wrong. Please try again.")}
          </div>
        )}

        <button
          type="submit"
          disabled={register.isPending}
          className="rounded-inner shadow-cta py-3 font-bold text-white transition-opacity disabled:opacity-60 dark:text-emerald-950"
          style={{
            background:
              "linear-gradient(to right, var(--gradient-brand-from), var(--gradient-brand-to))",
          }}
        >
          {register.isPending
            ? t("Creating account…")
            : t("Create account")}
        </button>
      </form>

      <p className="text-text-secondary text-small mt-6 text-center">
        {t("Already have an account?")}{" "}
        <Link
          to="/login"
          className="text-status-optimal font-semibold hover:underline"
        >
          {t("Sign in")}
        </Link>
      </p>
    </>
  );
}
