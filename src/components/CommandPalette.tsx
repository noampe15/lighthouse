import { Command } from "cmdk";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { agentName, agents, isKnownHref, requests } from "../data/selectors";
import { modules } from "../nav";

type RecentKind = "Page" | "Agent" | "Request";

type RecentItem = {
  href: string;
  label: string;
  hint: string;
  kind: RecentKind;
};

const STORAGE_KEY = "lighthouse.recent";

function readRecent(): RecentItem[] {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(isRecentItem).slice(0, 5);
  } catch {
    return [];
  }
}

function isRecentItem(value: unknown): value is RecentItem {
  if (!value || typeof value !== "object") return false;
  const item = value as Partial<RecentItem>;
  return (
    typeof item.href === "string" &&
    isKnownHref(item.href) &&
    typeof item.label === "string" &&
    typeof item.hint === "string" &&
    (item.kind === "Page" || item.kind === "Agent" || item.kind === "Request")
  );
}

export function CommandPalette({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [recent, setRecent] = useState<RecentItem[]>(readRecent);

  useEffect(() => {
    if (open) setSearch("");
  }, [open]);

  useEffect(() => {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(recent));
  }, [recent]);

  function choose(item: RecentItem) {
    setRecent((current) => [item, ...current.filter((entry) => entry.href !== item.href)].slice(0, 5));
    onOpenChange(false);
    navigate(item.href);
  }

  const showRecent = search.trim() === "" && recent.length > 0;

  return (
    <Command.Dialog
      open={open}
      onOpenChange={onOpenChange}
      label="Command palette"
      overlayClassName="palette-overlay"
      contentClassName="palette-content"
      className="palette-root"
      vimBindings={false}
      loop
    >
      <div className="palette-search">
        <Search size={14} aria-hidden="true" />
        <Command.Input
          value={search}
          onValueChange={setSearch}
          placeholder="Search agents, requests, and pages"
          aria-label="Search agents, requests, and pages"
        />
      </div>
      <Command.List className="palette-list" label="Search results">
        <Command.Empty>No results</Command.Empty>
        {showRecent ? (
          <Command.Group heading="Recent">
            {recent.map((item) => (
              <Command.Item
                key={`recent:${item.href}`}
                value={`recent:${item.href}`}
                keywords={[item.label, item.hint, item.kind]}
                onSelect={() => choose(item)}
              >
                <ResultLabel label={item.label} hint={item.hint} kind={item.kind} />
              </Command.Item>
            ))}
          </Command.Group>
        ) : null}
        <Command.Group heading="Go to">
          {modules.map((item) => (
            <Command.Item
              key={item.href}
              value={`page:${item.id}`}
              keywords={[item.label, "go to", "page"]}
              onSelect={() =>
                choose({ href: item.href, label: item.label, hint: "", kind: "Page" })
              }
            >
              <ResultLabel label={item.label} hint="" kind="Page" />
            </Command.Item>
          ))}
        </Command.Group>
        <Command.Group heading="Agents">
          {agents.map((agent) => (
            <Command.Item
              key={agent.id}
              value={`agent:${agent.id}`}
              keywords={[agent.name, agent.id]}
              onSelect={() =>
                choose({
                  href: `/agents/${agent.id}`,
                  label: agent.name,
                  hint: agent.id,
                  kind: "Agent",
                })
              }
            >
              <ResultLabel label={agent.name} hint={agent.id} kind="Agent" />
            </Command.Item>
          ))}
        </Command.Group>
        <Command.Group heading="Requests">
          {requests.map((request) => {
            const name = agentName(request.agentId);
            return (
              <Command.Item
                key={request.id}
                value={`request:${request.id}`}
                keywords={[request.id, request.resource, request.scope, name]}
                onSelect={() =>
                  choose({
                    href: `/requests/${request.id}`,
                    label: request.resource,
                    hint: request.id,
                    kind: "Request",
                  })
                }
              >
                <ResultLabel label={request.resource} hint={request.id} kind="Request" />
              </Command.Item>
            );
          })}
        </Command.Group>
      </Command.List>
      <p className="palette-hint">↑↓ to move · Enter to open · Esc to close</p>
    </Command.Dialog>
  );
}

function ResultLabel({ label, hint, kind }: { label: string; hint: string; kind: RecentKind }) {
  return (
    <>
      <span className="min-w-0 flex-1 truncate">
        {hint ? <span className="font-mono text-sm text-text-secondary">{hint}</span> : null}
        {hint ? <span className="text-text-tertiary"> · </span> : null}
        <span>{label}</span>
      </span>
      <span className="shrink-0 text-xs text-text-tertiary">{kind}</span>
    </>
  );
}
