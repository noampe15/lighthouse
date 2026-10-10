import { useParams } from "react-router";
import { getAgent, getRequest } from "../data/selectors";
import { useTitle } from "../lib/title";
import { NotFoundPage } from "./NotFoundPage";

export function AgentPlaceholder() {
  const { id = "" } = useParams();
  const agent = getAgent(id);
  useTitle(agent?.name ?? "Not found");
  if (!agent) return <NotFoundPage />;
  return <RecordPlaceholder phase={3} title={agent.name} meta={agent.id} />;
}

export function RequestPlaceholder() {
  const { id = "" } = useParams();
  const request = getRequest(id);
  useTitle(request ? request.id : "Not found");
  if (!request) return <NotFoundPage />;
  return <RecordPlaceholder phase={2} title={request.resource} meta={request.id} />;
}

function RecordPlaceholder({
  phase,
  title,
  meta,
}: {
  phase: number;
  title: string;
  meta: string;
}) {
  return (
    <section className="pt-8">
      <h1 className="text-lg font-medium text-text-primary">{title}</h1>
      <p className="mt-1 font-mono text-sm text-text-tertiary">{meta}</p>
      <div className="mt-6 border-t border-border-subtle pt-6">
        <p className="text-text-secondary">Built in phase {phase}</p>
      </div>
    </section>
  );
}
