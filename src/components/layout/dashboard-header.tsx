import { useState, useEffect, useRef } from "react";
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

  const [menuOpen, setMenuOpen] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  // Body scroll lock, Escape key, focus trap
  useEffect(() => {
    if (!menuOpen) return;

    document.body.style.overflow = "hidden";

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setMenuOpen(false);

      if (e.key === "Tab") {
        const drawer = drawerRef.current;
        if (!drawer) return;
        const focusable = drawer.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }
    document.addEventListener("keydown", handleKeyDown);

    // Move focus into drawer
    const firstLink = drawerRef.current?.querySelector<HTMLElement>("a[href]");
    firstLink?.focus();

    const toggle = toggleRef.current;
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleKeyDown);
      toggle?.focus();
    };
  }, [menuOpen]);

  return (
    <>
      <header className="border-border-divider bg-bg-header fixed inset-x-0 top-0 z-50 border-b backdrop-blur-[34px]">
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
            <button
              ref={toggleRef}
              type="button"
              aria-label={menuOpen ? t("Close menu") : t("Open menu")}
              aria-expanded={menuOpen}
              aria-controls="mobile-nav-drawer"
              onClick={() => { setMenuOpen((prev) => !prev); }}
              className="p-1"
            >
              <Icon
                name={menuOpen ? "x" : "hamburger"}
                size={24}
                className="text-text-primary"
              />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile navigation drawer — outside header to avoid backdrop-blur containing block */}
      <div
        id="mobile-nav-drawer"
        ref={drawerRef}
        role="dialog"
        aria-label={t("Main navigation")}
        aria-modal="true"
        className={`bg-bg-card fixed inset-x-0 top-16 bottom-0 z-40 transition-all duration-200 ease-out lg:hidden ${
          menuOpen
            ? "visible translate-y-0 opacity-100"
            : "invisible -translate-y-2 opacity-0"
        }`}
      >
        <div className="flex h-full flex-col gap-3 overflow-y-auto px-4 pt-3 pb-6">
          {/* Divider */}
          <div className="bg-border-divider h-px" aria-hidden="true" />

          {/* User profile */}
          <div className="flex items-center gap-2 py-1">
            <div
              className="flex h-8 w-8 items-center justify-center rounded-full"
              style={{
                background:
                  "linear-gradient(to right, var(--gradient-brand-from), var(--gradient-brand-to))",
              }}
            >
              <Icon name="user" size={24} className="text-white" />
            </div>
            <span className="text-text-dark text-small font-semibold tracking-[0.28px]">
              {t("Hello, {name}", { name: user?.first_name ?? "..." })}
            </span>
          </div>

          {/* Divider */}
          <div className="bg-border-divider h-px" aria-hidden="true" />

          {/* Navigation items */}
          <nav aria-label={t("Main navigation")}>
            <ul className="flex flex-col gap-2">
              {navItems.map((item) => {
                const active =
                  item.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(item.href);

                return (
                  <li key={item.href}>
                    <Link
                      to={item.href}
                      onClick={() => { setMenuOpen(false); }}
                      aria-current={active ? "page" : undefined}
                      className={`flex items-center gap-2 rounded-inner px-3 py-2 font-semibold transition-colors ${
                        active
                          ? "bg-status-optimal-bg text-status-optimal"
                          : "text-text-secondary"
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
        </div>
      </div>
    </>
  );
}
