import { useTitle } from "../lib/title";
import { useSession } from "../session";

export function SignedOut() {
  const { signIn } = useSession();
  useTitle("Signed out");
  return (
    <section className="pt-8">
      <h1 className="text-lg font-medium text-text-primary">Signed out</h1>
      <div className="mt-6 border-t border-border-subtle pt-6">
        <p className="max-w-xl text-text-secondary">
          Priya Nandakumar’s session is closed. Nothing was sent to a server.
        </p>
        <button
          type="button"
          onClick={signIn}
          className="mt-4 inline-flex h-8 items-center rounded-[6px] border border-border-default bg-surface-raised px-3 text-text-primary hover:bg-surface-subtle"
        >
          Sign in
        </button>
      </div>
    </section>
  );
}
