import { useEffect, useRef } from "react";
import { initials } from "../data/selectors";
import type { Person } from "../data/lighthouse";

export function AccountMenu({
  user,
  open,
  onToggle,
  onClose,
  onSignOut,
}: {
  user: Person;
  open: boolean;
  onToggle: () => void;
  onClose: () => void;
  onSignOut: () => void;
}) {
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const restoreFocus = useRef(false);

  useEffect(() => {
    if (!open) return;
    menuRef.current?.querySelector<HTMLElement>("[role='menuitem']")?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        restoreFocus.current = true;
        onClose();
      }
    };
    const onPointer = (event: PointerEvent) => {
      const target = event.target as Node;
      if (triggerRef.current?.contains(target) || menuRef.current?.contains(target)) return;
      onClose();
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
      if (restoreFocus.current) {
        restoreFocus.current = false;
        triggerRef.current?.focus();
      }
    };
  }, [open, onClose]);

  return (
    <div className="relative">
      <button
        ref={triggerRef}
        type="button"
        aria-label={`Account menu for ${user.name}`}
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={onToggle}
        className="inline-flex h-8 items-center rounded-[6px] px-1 hover:bg-surface-subtle"
      >
        <span
          aria-hidden="true"
          className="inline-flex h-6 w-6 items-center justify-center rounded-[6px] bg-accent-soft font-mono text-xs text-accent-text"
        >
          {initials(user.name)}
        </span>
      </button>
      {open ? (
        <div
          ref={menuRef}
          role="menu"
          aria-label="Account"
          className="absolute right-0 top-[calc(100%+4px)] z-40 w-56 overflow-hidden rounded-[6px] border border-border-subtle bg-surface-overlay shadow-overlay"
        >
          <div className="px-3 py-2">
            <p className="text-text-primary">{user.name}</p>
            <p className="text-sm text-text-secondary">{user.role}</p>
          </div>
          <div className="border-t border-border-subtle">
            <button
              type="button"
              role="menuitem"
              className="flex h-8 w-full items-center px-3 text-left text-text-primary hover:bg-surface-subtle"
              onClick={() => {
                onSignOut();
                onClose();
              }}
            >
              Sign out
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
