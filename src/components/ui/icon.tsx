import type { SVGProps } from "react";

export type IconName =
  | "arrow-right"
  | "bell"
  | "calendar"
  | "drop"
  | "hamburger"
  | "heart"
  | "nav-ai"
  | "nav-dashboard"
  | "nav-data"
  | "nav-profile"
  | "pulse"
  | "tab-calendar"
  | "tab-list"
  | "trend-down"
  | "trend-up"
  | "user";

interface IconProps extends SVGProps<SVGSVGElement> {
  name: IconName;
  size?: number;
  className?: string;
}

export function Icon({ name, size = 24, className, ...rest }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      aria-hidden="true"
      className={className}
      {...rest}
    >
      <use href={`${import.meta.env.BASE_URL}sprite.svg#icon__${name}`} />
    </svg>
  );
}
