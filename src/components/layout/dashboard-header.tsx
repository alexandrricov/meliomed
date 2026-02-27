import { Link, useLocation } from "react-router";
import { Icon } from "@/components/ui/icon";
import { navItems } from "@/data/mock-dashboard";
import { useGetMe } from "@/hooks/useAuth";
import { useI18n } from "@/hooks/useI18n";

function Logo({ compact = false }: { compact?: boolean }) {
  const boxSize = compact ? 36 : 40;
  const mSize = compact ? "text-[25px]" : "text-[28px]";
  const brandSize = compact ? "text-[22px]" : "text-2xl";

  return (
    <div className="flex items-center gap-2">
      <div
        className="rounded-inner flex items-center justify-center font-extrabold text-white"
        style={{
          width: boxSize,
          height: boxSize,
          background: "linear-gradient(to right, var(--gradient-brand-from), var(--gradient-brand-to))",
        }}
      >
        <span className={mSize}>M</span>
      </div>
      <span
        className={`${brandSize} text-text-primary leading-9.5 font-extrabold`}
      >
        melio
      </span>
    </div>
  );
}

function NotificationBell() {
  const { t } = useI18n();

  return (
    <button
      type="button"
      aria-label={t("Notifications, {count} unread", { count: 1 })}
      className="relative p-1"
    >
      <Icon name="bell" size={24} className="text-text-secondary" />
      <span className="mock bg-status-optimal absolute -top-0.5 -right-0.5 flex h-3 w-3 items-center justify-center rounded-full text-[8px] font-extrabold text-white">
        1
      </span>
    </button>
  );
}

export function DashboardHeader() {
  const { pathname } = useLocation();
  const { t } = useI18n();
  const { data: user } = useGetMe();

  return (
    <header className="border-border-divider bg-bg-header sticky top-0 z-50 border-b backdrop-blur-[34px]">
      {/* Desktop header */}
      <div className="mx-auto hidden h-16 max-w-360 items-center gap-4 px-6 lg:flex">
        <Logo />

        <nav aria-label={t("Main navigation")} className="ml-8">
          <ul role="menubar" className="sliding-nav">
            {navItems.map((item) => {
              const active =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);

              return (
                <li key={item.href} role="none">
                  <Link
                    to={item.href}
                    role="menuitem"
                    aria-current={active ? "page" : undefined}
                    className={`flex items-center gap-2 rounded-inner px-3 py-2 font-semibold transition-colors ${
                      active
                        ? "text-status-optimal"
                        : "text-text-secondary hover:text-text-primary"
                    }`}
                  >
                    <Icon name={item.iconName} size={24} />
                    {t(item.label)}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="ml-auto flex items-center gap-4">
          <NotificationBell />

          <div className="bg-border-divider h-10 w-px" aria-hidden="true" />

          <Link to="/user" className="flex items-center gap-2" aria-label={t("User profile")}>
            <span className="text-text-dark text-small font-semibold tracking-[0.28px]">
              {t("Hello, {name}", { name: user?.first_name ?? "..." })}
            </span>
            <div
              className="flex h-8 w-8 items-center justify-center rounded-full"
              style={{
                background: "linear-gradient(to right, var(--gradient-brand-from), var(--gradient-brand-to))",
              }}
            >
              <Icon name="user" size={24} className="text-text-primary" />
            </div>
          </Link>
        </div>
      </div>

      {/* Mobile header */}
      <div className="flex h-16 items-center justify-between px-4 lg:hidden">
        <Logo compact />

        <div className="flex items-center gap-3">
          <NotificationBell />
          <button type="button" aria-label={t("Open menu")} className="p-1">
            <Icon name="hamburger" size={24} className="text-text-primary" />
          </button>
        </div>
      </div>
    </header>
  );
}
