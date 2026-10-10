import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import { currentUser } from "./data/selectors";
import type { Person } from "./data/lighthouse";

type SessionValue = {
  user: Person | null;
  signIn: () => void;
  signOut: () => void;
};

const SessionContext = createContext<SessionValue | null>(null);

export function SessionProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<Person | null>(() => currentUser());
  const value = useMemo<SessionValue>(
    () => ({
      user,
      signIn: () => setUser(currentUser()),
      signOut: () => setUser(null),
    }),
    [user],
  );
  return <SessionContext.Provider value={value}>{children}</SessionContext.Provider>;
}

export function useSession(): SessionValue {
  const value = useContext(SessionContext);
  if (!value) {
    throw new Error("useSession must be used inside SessionProvider");
  }
  return value;
}
