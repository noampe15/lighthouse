import { useTitle } from "../lib/title";

export function ModulePlaceholder({ title, phase }: { title: string; phase: number }) {
  useTitle(title);
  return (
    <section className="pt-8">
      <h1 className="text-lg font-medium text-text-primary">{title}</h1>
      <div className="mt-6 border-t border-border-subtle pt-6">
        <p className="text-text-secondary">Built in phase {phase}</p>
      </div>
    </section>
  );
}
