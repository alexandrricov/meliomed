import { Icon } from "@/components/ui/icon";
import { navItems } from "@/data/mock-dashboard";
import { useTheme } from "@/hooks/useTheme";

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
          background: "linear-gradient(to right, #8bec90, #17d792)",
        }}
      >
        <span className={mSize}>M</span>
      </div>
      <span
        className={`${brandSize} text-text-primary leading-[38px] font-extrabold`}
      >
        melio
      </span>
    </div>
  );
}

function ThemeToggle() {
  const { resolved, setTheme } = useTheme();
  const isDark = resolved === "dark";

  return (
    <button
      type="button"
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      className="text-text-secondary hover:text-text-primary p-1 transition-colors"
      onClick={() => {
        setTheme(isDark ? "light" : "dark");
      }}
    >
      <Icon name={isDark ? "sun" : "moon"} size={24} />
    </button>
  );
}

function NotificationBell() {
  return (
    <button
      type="button"
      aria-label="Notifications, 1 unread"
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
  return (
    <header className="border-border-divider bg-bg-header sticky top-0 z-50 border-b backdrop-blur-[34px]">
      {/* Desktop header */}
      <div className="mx-auto hidden h-16 max-w-[1440px] items-center gap-4 px-[120px] lg:flex">
        <Logo />

        <nav aria-label="Main navigation" className="ml-8">
          <ul role="menubar" className="flex gap-2">
            {navItems.map((item) => (
              <li key={item.label} role="none">
                <a
                  href={item.href}
                  role="menuitem"
                  aria-current={item.active ? "page" : undefined}
                  className={`rounded-inner flex items-center gap-2 px-3 py-2 font-semibold transition-colors ${
                    item.active
                      ? "bg-status-optimal-bg text-status-optimal"
                      : "text-text-secondary hover:text-text-primary"
                  }`}
                >
                  <Icon
                    name={item.iconName}
                    size={24}
                    className={
                      item.active
                        ? "text-status-optimal"
                        : "text-text-secondary"
                    }
                  />
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="ml-auto flex items-center gap-4">
          <ThemeToggle />
          <NotificationBell />

          <div className="bg-border-divider h-10 w-px" aria-hidden="true" />

          <div className="flex items-center gap-2">
            <span className="mock text-text-dark text-small font-semibold tracking-[0.28px]">
              Hello, Tatiana
            </span>
            <div
              className="flex h-8 w-8 items-center justify-center rounded-full"
              style={{
                background: "linear-gradient(to right, #8bec90, #17d792)",
              }}
            >
              <Icon name="user" size={24} className="text-text-primary" />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile header */}
      <div className="flex h-16 items-center justify-between px-4 lg:hidden">
        <Logo compact />

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <NotificationBell />
          <button type="button" aria-label="Open menu" className="p-1">
            <Icon name="hamburger" size={24} className="text-text-primary" />
          </button>
        </div>
      </div>
    </header>
  );
}
