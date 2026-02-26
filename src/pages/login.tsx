import { useState } from "react";
import { useNavigate } from "react-router";
import { useLogin } from "@/hooks/useAuth";

export function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const login = useLogin();
  const navigate = useNavigate();

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
    <div className="bg-bg-page relative flex min-h-screen items-center justify-center px-4">
      {/* Background gradient */}
      <div
        className="pointer-events-none fixed inset-0 opacity-30 dark:opacity-10"
        aria-hidden="true"
        style={{
          background:
            "linear-gradient(135deg, #ffbb0d 0%, #ffcf32 40%, #90d178 100%)",
        }}
      />

      <div className="rounded-card bg-bg-card shadow-card relative z-10 w-full max-w-105 p-8">
        {/* Logo */}
        <div className="mb-8 flex items-center justify-center gap-2">
          <div
            className="rounded-inner flex h-10 w-10 items-center justify-center font-extrabold text-white"
            style={{
              background: "linear-gradient(to right, #8bec90, #17d792)",
            }}
          >
            <span className="text-[28px]">M</span>
          </div>
          <span className="text-text-primary text-2xl leading-9.5 font-extrabold">
            melio
          </span>
        </div>

        <h1 className="text-text-primary text-h2 mb-1 text-center font-bold">
          Welcome back
        </h1>
        <p className="text-text-secondary mb-6 text-center font-normal">
          Sign in to your account
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="email"
              className="text-text-primary text-small font-semibold"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              placeholder="you@example.com"
              className="border-border-divider text-text-primary placeholder:text-text-secondary/50 rounded-inner focus:border-status-optimal border px-3 py-2.5 transition-colors outline-none"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="password"
              className="text-text-primary text-small font-semibold"
            >
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                required
                autoComplete="current-password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                placeholder="Enter your password"
                className="border-border-divider text-text-primary placeholder:text-text-secondary/50 rounded-inner focus:border-status-optimal w-full border px-3 py-2.5 pr-10 transition-colors outline-none"
              />
              <button
                type="button"
                onClick={() => {
                  setShowPassword((prev) => !prev);
                }}
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="text-text-secondary hover:text-text-primary absolute top-1/2 right-3 -translate-y-1/2"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  {showPassword ? (
                    <>
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
                      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
                      <line x1="1" y1="1" x2="23" y2="23" />
                    </>
                  ) : (
                    <>
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </>
                  )}
                </svg>
              </button>
            </div>
          </div>

          <div className="flex justify-end">
            <a
              href="/forgot-password"
              className="text-status-optimal text-small font-semibold hover:underline"
            >
              Forgot password?
            </a>
          </div>

          {login.isError && (
            <div
              role="alert"
              className="rounded-inner bg-status-elevated/10 border-status-elevated/30 text-status-danger text-small border px-3 py-2"
            >
              {login.error instanceof Error
                ? login.error.message
                : "Invalid email or password"}
            </div>
          )}

          <button
            type="submit"
            disabled={login.isPending}
            className="rounded-inner shadow-cta py-3 font-bold text-white transition-opacity disabled:opacity-60"
            style={{
              background: "linear-gradient(to right, #8bec90, #17d792)",
            }}
          >
            {login.isPending ? "Signing in…" : "Sign in"}
          </button>
        </form>

        <p className="text-text-secondary text-small mt-6 text-center">
          Don&apos;t have an account?{" "}
          <a
            href="/register"
            className="text-status-optimal font-semibold hover:underline"
          >
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}
