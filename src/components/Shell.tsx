import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router";
import { pendingRequestCount } from "../data/selectors";
import { useSession } from "../session";
import { CommandPalette } from "./CommandPalette";
import { TopBar } from "./TopBar";
import { SignedOut } from "../pages/SignedOut";

export function Shell() {
  const location = useLocation();
  const { user } = useSession();
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [navOpen, setNavOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setPaletteOpen((open) => !open);
        setAccountOpen(false);
        setNavOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    setNavOpen(false);
    setAccountOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 900px)");
    const onChange = () => {
      if (media.matches) setNavOpen(false);
    };
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  return (
    <div className="min-h-screen bg-surface-page text-text-primary">
      <a className="skip-link" href="#content">
        Skip to content
      </a>
      <TopBar
        pendingCount={pendingRequestCount()}
        onOpenPalette={() => {
          setAccountOpen(false);
          setNavOpen(false);
          setPaletteOpen(true);
        }}
        navOpen={navOpen}
        onToggleNav={() => {
          setAccountOpen(false);
          setNavOpen((open) => !open);
        }}
        accountOpen={accountOpen}
        onToggleAccount={() => {
          setNavOpen(false);
          setAccountOpen((open) => !open);
        }}
        onCloseAccount={() => setAccountOpen(false)}
      />
      <main
        id="content"
        tabIndex={-1}
        className="mx-auto w-full max-w-[1280px] px-6 pb-16"
      >
        {user ? <Outlet /> : <SignedOut />}
      </main>
      <CommandPalette open={paletteOpen} onOpenChange={setPaletteOpen} />
    </div>
  );
}
