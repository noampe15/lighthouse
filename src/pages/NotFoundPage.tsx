import { Link } from "react-router";
import { useTitle } from "../lib/title";

export function NotFoundPage() {
  useTitle("Not found");
  return (
    <section className="pt-8">
      <h1 className="text-lg font-medium text-text-primary">Page not found</h1>
      <div className="mt-6 border-t border-border-subtle pt-6">
        <p className="text-text-secondary">That path is not part of Lighthouse.</p>
        <Link
          to="/requests"
          className="mt-4 inline-flex h-8 items-center text-accent-text underline decoration-1 underline-offset-4"
        >
          Back to requests
        </Link>
      </div>
    </section>
  );
}
