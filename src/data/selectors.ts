import { NOW } from "../lib/time";
import { modules } from "../nav";
import type { AccessRequest, Agent, Grant, Person, Policy } from "./lighthouse";
import { agents, CURRENT_USER_ID, grants, people, policies, requests } from "./lighthouse";

export {
  activity,
  agents,
  credentials,
  grants,
  integrations,
  people,
  policies,
  requests,
} from "./lighthouse";

export type GrantStatus = "active" | "expired" | "revoked";

export type GrantView = Grant & { status: GrantStatus };

export function getPerson(id: string | null | undefined): Person | undefined {
  if (!id) return undefined;
  return people.find((person) => person.id === id);
}

export function getAgent(id: string | null | undefined): Agent | undefined {
  if (!id) return undefined;
  return agents.find((agent) => agent.id === id);
}

export function getRequest(id: string | null | undefined): AccessRequest | undefined {
  if (!id) return undefined;
  return requests.find((request) => request.id === id);
}

export function getPolicy(id: string | null | undefined): Policy | undefined {
  if (!id) return undefined;
  return policies.find((policy) => policy.id === id);
}

export function currentUser(): Person {
  const person = getPerson(CURRENT_USER_ID);
  if (!person) {
    throw new Error("Current user is missing from the directory.");
  }
  return person;
}

export function initials(name: string): string {
  const parts = name.split(" ").filter(Boolean);
  const first = parts[0]?.[0] ?? "";
  const last = parts.length > 1 ? parts[parts.length - 1]?.[0] ?? "" : "";
  return `${first}${last}`.toUpperCase();
}

export function pendingRequests(): AccessRequest[] {
  return requests.filter((request) => request.status === "pending");
}

export function pendingRequestCount(): number {
  return pendingRequests().length;
}

export function agentName(agentId: string): string {
  return getAgent(agentId)?.name ?? agentId;
}

export function personName(personId: string | null): string {
  if (!personId) return "Unowned";
  return getPerson(personId)?.name ?? personId;
}

export function grantStatus(grant: Grant): GrantStatus {
  if (grant.revokedAt && Date.parse(grant.revokedAt) <= Date.parse(NOW)) return "revoked";
  if (Date.parse(grant.expiresAt) <= Date.parse(NOW)) return "expired";
  return "active";
}

export function grantsWithStatus(): GrantView[] {
  return grants.map((grant) => ({ ...grant, status: grantStatus(grant) }));
}

export function isKnownHref(href: string): boolean {
  if (modules.some((item) => item.href === href)) return true;
  const agentMatch = /^\/agents\/([^/]+)$/.exec(href);
  if (agentMatch) return Boolean(getAgent(decodeURIComponent(agentMatch[1])));
  const requestMatch = /^\/requests\/([^/]+)$/.exec(href);
  if (requestMatch) return Boolean(getRequest(decodeURIComponent(requestMatch[1])));
  return false;
}
