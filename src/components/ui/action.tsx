import { clsx } from "clsx";
import {
  Link as RouterLink,
  type LinkProps as RouterLinkProps,
} from "react-router";

import { Icon, type IconName } from "./icon";

type BaseProps = {
  variant: "primary";
  children: React.ReactNode;
  icon?: {
    name: IconName;
    position?: "left" | "right";
  };
};

function actionStyles({
  disabled,
  className,
}: {
  disabled?: boolean;
  className?: string;
}) {
  return clsx(
    "rounded-inner inline-flex h-11 w-fit items-center justify-center gap-2.5 px-4 font-semibold",
    "shadow-cta bg-gradient-brand text-text-primary transition-opacity dark:text-emerald-950",
    disabled
      ? "pointer-events-none cursor-not-allowed opacity-50"
      : "hover:opacity-90",
    className,
  );
}

function InnerContent({
  icon,
  children,
}: {
  icon?: BaseProps["icon"];
  children: React.ReactNode;
}) {
  if (!icon) return <>{children}</>;

  return (
    <>
      {icon.position !== "right" && <Icon name={icon.name} size={20} />}
      {children}
      {icon.position === "right" && <Icon name={icon.name} size={20} />}
    </>
  );
}

export function Button({
  children,
  variant: _variant,
  icon,
  className,
  disabled,
  ref,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> &
  BaseProps & {
    ref?: React.Ref<HTMLButtonElement>;
  }) {
  return (
    <button
      ref={ref}
      disabled={disabled}
      className={actionStyles({ disabled, className })}
      {...props}
    >
      <InnerContent icon={icon}>{children}</InnerContent>
    </button>
  );
}

export function Link({
  children,
  variant: _variant,
  icon,
  className,
  ref,
  ...props
}: RouterLinkProps &
  BaseProps & {
    ref?: React.Ref<HTMLAnchorElement>;
  }) {
  return (
    <RouterLink
      ref={ref}
      className={actionStyles({ disabled: !props.to, className })}
      {...props}
    >
      <InnerContent icon={icon}>{children}</InnerContent>
    </RouterLink>
  );
}
