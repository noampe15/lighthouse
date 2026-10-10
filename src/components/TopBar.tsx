import { Menu, Search, X } from "lucide-react";
import { NavLink } from "react-router";
import { Link } from "react-router";
import { AccountMenu } from "./AccountMenu";
import { modules } from "../nav";
import { useSession } from "../session";

function modifierHint(): string {
  const platform = navigator.platform || navigator.userAgent;
  return /mac|iphone|ipad/i.test(platform) ? "⌘K" : "Ctrl K";
}

export function TopBar({
  pendingCount,
  onOpenPalette,
  navOpen,
  onToggleNav,
  accountOpen,
  onToggleAccount,
  onCloseAccount,
}: {
  pendingCount: number;
  onOpenPalette: () => void;
  navOpen: boolean;
  onToggleNav: () => void;
  accountOpen: boolean;
  onToggleAccount: () => void;
  onCloseAccount: () => void;
}) {
  const { user, signIn, signOut } = useSession();
  const hint = modifierHint();

  return (
    <header className="sticky top-0 z-40 border-b border-border-subtle bg-surface-bar backdrop-blur-md">
      <div className="mx-auto flex h-[52px] w-full max-w-[1280px] items-center gap-3 px-6">
        <button
          type="button"
          className="inline-flex h-8 w-8 items-center justify-center rounded-[6px] text-text-primary hover:bg-surface-subtle min-[900px]:hidden"
          aria-label={navOpen ? "Close menu" : "Open menu"}
          aria-expanded={navOpen}
          aria-controls="module-menu"
          onClick={onToggleNav}
        >
          {navOpen ? <X size={16} aria-hidden="true" /> : <Menu size={16} aria-hidden="true" />}
        </button>
        <Link to="/requests" className="shrink-0 text-md font-medium tracking-tight text-text-primary">
          Lighthouse
        </Link>
        <nav className="hidden h-[52px] items-stretch gap-1 min-[900px]:flex" aria-label="Modules">
          {modules.map((item) => (
            <NavLink
              key={item.href}
              to={item.href}
              aria-label={item.id === "requests" ? `Requests, ${pendingCount} pending` : undefined}
              className={({ isActive }) =>
                [
                  "relative flex items-center px-2.5 text-base",
                  isActive
                    ? "font-medium text-text-primary after:absolute after:inset-x-2.5 after:bottom-0 after:h-0.5 after:bg-accent"
                    : "text-text-secondary hover:text-text-primary",
                ].join(" ")
              }
            >
              {item.label}
              {item.id === "requests" && pendingCount > 0 ? (
                <span className="ml-1.5 inline-flex h-4 min-w-4 items-center justify-center rounded-[6px] bg-accent-soft px-1 font-mono text-xs leading-none text-accent-text">
                  {pendingCount}
                </span>
              ) : null}
            </NavLink>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-2">
          <button
            type="button"
            onClick={onOpenPalette}
            aria-label="Open command palette"
            aria-keyshortcuts="Control+K Meta+K"
            className="inline-flex h-8 w-[220px] max-w-[42vw] items-center gap-2 rounded-[6px] border border-border-default bg-surface-raised px-2.5 text-text-tertiary hover:text-text-secondary"
          >
            <Search size={14} aria-hidden="true" />
            <span className="min-w-0 flex-1 truncate text-left max-[420px]:sr-only">Search</span>
            <kbd
              aria-hidden="true"
              className="rounded-[6px] border border-border-default px-1.5 font-mono text-xs leading-4 text-text-tertiary max-[420px]:hidden"
            >
              {hint}
            </kbd>
          </button>
          {user ? (
            <AccountMenu
              user={user}
              open={accountOpen}
              onToggle={onToggleAccount}
              onClose={onCloseAccount}
              onSignOut={signOut}
            />
          ) : (
            <button
              type="button"
              onClick={signIn}
              className="inline-flex h-8 items-center rounded-[6px] px-2.5 text-text-primary hover:bg-surface-subtle"
            >
              Sign in
            </button>
          )}
        </div>
      </div>
      {navOpen ? (
        <nav
          id="module-menu"
          aria-label="Modules"
          className="border-t border-border-subtle bg-surface-raised min-[900px]:hidden"
        >
          <ul>
            {modules.map((item) => (
              <li key={item.href} className="border-b border-border-subtle last:border-b-0">
                <NavLink
                  to={item.href}
                  aria-label={item.id === "requests" ? `Requests, ${pendingCount} pending` : undefined}
                  className={({ isActive }) =>
                    [
                      "flex h-10 items-center gap-2 border-l-2 px-6",
                      isActive
                        ? "border-accent font-medium text-text-primary"
                        : "border-transparent text-text-secondary",
                    ].join(" ")
                  }
                >
                  {item.label}
                  {item.id === "requests" && pendingCount > 0 ? (
                    <span className="inline-flex h-4 min-w-4 items-center justify-center rounded-[6px] bg-accent-soft px-1 font-mono text-xs leading-none text-accent-text">
                      {pendingCount}
                    </span>
                  ) : null}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      ) : (
        <div id="module-menu" hidden />
      )}
    </header>
  );
}
