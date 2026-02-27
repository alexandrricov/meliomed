import { useState } from "react";
import { useI18n } from "@/hooks/useI18n";

interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "className"> {
  label: string;
}

export function Input({ label, type, ...rest }: InputProps) {
  const { t } = useI18n();
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";
  const resolvedType = isPassword && showPassword ? "text" : type;

  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={rest.id}
        className="text-text-primary text-small font-semibold"
      >
        {label}
      </label>
      <div className="relative">
        <input
          type={resolvedType}
          className={`border-border-divider text-text-primary placeholder:text-text-secondary/50 rounded-inner focus:border-status-optimal w-full border px-3 py-2.5 transition-colors outline-none${isPassword ? " pr-10" : ""}`}
          {...rest}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => {
              setShowPassword((prev) => !prev);
            }}
            aria-label={
              showPassword ? t("Hide password") : t("Show password")
            }
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
        )}
      </div>
    </div>
  );
}
