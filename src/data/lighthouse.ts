import { minutesFromNow } from "../lib/time";

export { NOW } from "../lib/time";

export const CURRENT_USER_ID = "per_priya";

export type Role = "Owner" | "Security" | "Admin";

export type Person = {
  id: string;
  name: string;
  team: string;
  role: Role;
};

export type AgentFramework =
  | "LangGraph"
  | "OpenAI Agents SDK"
  | "Anthropic SDK"
  | "CrewAI"
  | "custom";

export type AgentStatus = "active" | "suspended";

export type Agent = {
  id: string;
  name: string;
  purpose: string;
  framework: AgentFramework;
  ownerId: string | null;
  status: AgentStatus;
  createdAt: string;
  lastActiveAt: string;
};

export type CredentialKind = "api-key" | "workload-identity" | "oauth";

export type Credential = {
  id: string;
  agentId: string;
  label: string;
  kind: CredentialKind;
  createdAt: string;
};

export type RiskTier = "low" | "medium" | "high" | "critical";

export type PolicyDecision = "auto-grant" | "owner" | "security";

export type Policy = {
  id: string;
  name: string;
  summary: string;
  decision: PolicyDecision;
  resourcePattern: string;
  maxGrantMinutes: number;
  enabled: boolean;
};

export type RequestStatus = "pending" | "approved" | "denied" | "expired";

export type AccessRequest = {
  id: string;
  agentId: string;
  resource: string;
  scope: string;
  reason: string;
  status: RequestStatus;
  route: PolicyDecision;
  policyId: string;
  risk: RiskTier;
  requestedAt: string;
  decidedAt: string | null;
  decidedById: string | null;
};

export type Grant = {
  id: string;
  requestId: string;
  agentId: string;
  resource: string;
  scope: string;
  ownerId: string;
  grantedAt: string;
  expiresAt: string;
  revokedAt: string | null;
};

export type ActorKind = "person" | "agent" | "system";

export type ActivityEvent = {
  id: string;
  at: string;
  action: string;
  actorKind: ActorKind;
  actorId: string | null;
  requestId: string | null;
  agentId: string | null;
};

export type IntegrationStatus = "connected" | "attention" | "disconnected";

export type Integration = {
  id: string;
  name: string;
  system: string;
  status: IntegrationStatus;
  detail: string;
  syncedAt: string | null;
};

const at = minutesFromNow;

export const people: Person[] = [
  { id: "per_priya", name: "Priya Nandakumar", team: "Identity", role: "Security" },
  { id: "per_owen", name: "Owen Blake", team: "Product Engineering", role: "Owner" },
  { id: "per_lena", name: "Lena Vogt", team: "Platform Engineering", role: "Owner" },
  { id: "per_samir", name: "Samir Haddad", team: "Data Platform", role: "Owner" },
  { id: "per_chloe", name: "Chloe Nguyen", team: "Security Operations", role: "Security" },
  { id: "per_hugo", name: "Hugo Bergstrom", team: "Finance Systems", role: "Owner" },
  { id: "per_amira", name: "Amira Solano", team: "IT Operations", role: "Admin" },
  { id: "per_theo", name: "Theo Marchetti", team: "Developer Experience", role: "Owner" },
];

export const agents: Agent[] = [
  {
    id: "ag_ledger",
    name: "Ledger Reconciler",
    purpose: "Matches settlements to the general ledger during month-end close.",
    framework: "LangGraph",
    ownerId: "per_hugo",
    status: "active",
    createdAt: at(-60 * 24 * 80),
    lastActiveAt: at(-18),
  },
  {
    id: "ag_triage",
    name: "Ticket Triage",
    purpose: "Routes inbound support tickets and drafts the first reply.",
    framework: "OpenAI Agents SDK",
    ownerId: "per_owen",
    status: "active",
    createdAt: at(-60 * 24 * 40),
    lastActiveAt: at(-150),
  },
  {
    id: "ag_deploy",
    name: "Deploy Guard",
    purpose: "Checks release diffs against production policy before rollout.",
    framework: "custom",
    ownerId: "per_lena",
    status: "active",
    createdAt: at(-60 * 24 * 120),
    lastActiveAt: at(-300),
  },
  {
    id: "ag_index",
    name: "Corpus Indexer",
    purpose: "Refreshes the internal document index used by search.",
    framework: "LangGraph",
    ownerId: "per_samir",
    status: "suspended",
    createdAt: at(-60 * 24 * 200),
    lastActiveAt: at(-60 * 24),
  },
  {
    id: "ag_vendor",
    name: "Vendor Scout",
    purpose: "Researches vendors and extracts security questionnaire answers.",
    framework: "CrewAI",
    ownerId: null,
    status: "active",
    createdAt: at(-60 * 24 * 12),
    lastActiveAt: at(-42),
  },
  {
    id: "ag_scribe",
    name: "Incident Scribe",
    purpose: "Writes the timeline while an incident channel is open.",
    framework: "Anthropic SDK",
    ownerId: "per_theo",
    status: "active",
    createdAt: at(-60 * 24 * 25),
    lastActiveAt: at(-29),
  },
  {
    id: "ag_payroll",
    name: "Payroll Diff",
    purpose: "Compares payroll runs and flags unexpected deltas.",
    framework: "custom",
    ownerId: "per_hugo",
    status: "active",
    createdAt: at(-60 * 24 * 90),
    lastActiveAt: at(-50),
  },
  {
    id: "ag_schema",
    name: "Schema Watch",
    purpose: "Detects warehouse schema drift and opens a change note.",
    framework: "LangGraph",
    ownerId: "per_samir",
    status: "active",
    createdAt: at(-60 * 24 * 55),
    lastActiveAt: at(-60 * 24 * 2),
  },
  {
    id: "ag_inbox",
    name: "Inbox Clerk",
    purpose: "Files shared-inbox mail and proposes replies.",
    framework: "custom",
    ownerId: "per_owen",
    status: "suspended",
    createdAt: at(-60 * 24 * 30),
    lastActiveAt: at(-60 * 24 * 4),
  },
  {
    id: "ag_patch",
    name: "Patch Planner",
    purpose: "Proposes patch windows for vulnerable container images.",
    framework: "OpenAI Agents SDK",
    ownerId: "per_lena",
    status: "active",
    createdAt: at(-60 * 24 * 18),
    lastActiveAt: at(-60 * 6),
  },
];

export const credentials: Credential[] = [
  { id: "cred_ledger", agentId: "ag_ledger", label: "Warehouse workload identity", kind: "workload-identity", createdAt: at(-60 * 24 * 70) },
  { id: "cred_triage", agentId: "ag_triage", label: "Support desk OAuth", kind: "oauth", createdAt: at(-60 * 24 * 38) },
  { id: "cred_deploy", agentId: "ag_deploy", label: "Release API key", kind: "api-key", createdAt: at(-60 * 24 * 100) },
  { id: "cred_vendor", agentId: "ag_vendor", label: "Research API key", kind: "api-key", createdAt: at(-60 * 24 * 10) },
  { id: "cred_scribe", agentId: "ag_scribe", label: "Incident channel OAuth", kind: "oauth", createdAt: at(-60 * 24 * 20) },
  { id: "cred_payroll", agentId: "ag_payroll", label: "Payroll workload identity", kind: "workload-identity", createdAt: at(-60 * 24 * 80) },
  { id: "cred_schema", agentId: "ag_schema", label: "Warehouse read identity", kind: "workload-identity", createdAt: at(-60 * 24 * 50) },
  { id: "cred_patch", agentId: "ag_patch", label: "Registry read key", kind: "api-key", createdAt: at(-60 * 24 * 16) },
];

export const policies: Policy[] = [
  {
    id: "pol_warehouse_read",
    name: "Warehouse read",
    summary: "Read-only finance warehouse access is decided by the agent's owner.",
    decision: "owner",
    resourcePattern: "warehouse:*",
    maxGrantMinutes: 60,
    enabled: true,
  },
  {
    id: "pol_repo_write",
    name: "Repository write",
    summary: "Writing to a product repository is decided by the agent's owner.",
    decision: "owner",
    resourcePattern: "github:northline/*",
    maxGrantMinutes: 30,
    enabled: true,
  },
  {
    id: "pol_billing_write",
    name: "Billing repository write",
    summary: "Write access to the billing repository escalates to security.",
    decision: "security",
    resourcePattern: "github:northline/billing",
    maxGrantMinutes: 20,
    enabled: true,
  },
  {
    id: "pol_secrets",
    name: "Secrets",
    summary: "Any secret read escalates to security and stays short.",
    decision: "security",
    resourcePattern: "vault:*",
    maxGrantMinutes: 15,
    enabled: true,
  },
  {
    id: "pol_incident_read",
    name: "Incident history",
    summary: "Reading incident-channel history is auto-granted.",
    decision: "auto-grant",
    resourcePattern: "slack:channel/incidents",
    maxGrantMinutes: 120,
    enabled: true,
  },
  {
    id: "pol_analytics_read",
    name: "Analytics query",
    summary: "Read-only analytics queries are auto-granted for one hour.",
    decision: "auto-grant",
    resourcePattern: "snowflake:prod.analytics",
    maxGrantMinutes: 60,
    enabled: true,
  },
];

export const requests: AccessRequest[] = [
  {
    id: "req_4812",
    agentId: "ag_ledger",
    resource: "warehouse:finance.settlements",
    scope: "rows:read",
    reason: "Month-end tie-out needs the settlement table.",
    status: "pending",
    route: "owner",
    policyId: "pol_warehouse_read",
    risk: "medium",
    requestedAt: at(-18),
    decidedAt: null,
    decidedById: null,
  },
  {
    id: "req_4813",
    agentId: "ag_vendor",
    resource: "vault:prod/payroll",
    scope: "secret:read",
    reason: "A vendor packet asks for the payroll escrow secret.",
    status: "pending",
    route: "security",
    policyId: "pol_secrets",
    risk: "critical",
    requestedAt: at(-42),
    decidedAt: null,
    decidedById: null,
  },
  {
    id: "req_4814",
    agentId: "ag_triage",
    resource: "github:northline/support",
    scope: "issues:write",
    reason: "File a tracking issue for a repeated login bug.",
    status: "pending",
    route: "owner",
    policyId: "pol_repo_write",
    risk: "low",
    requestedAt: at(-150),
    decidedAt: null,
    decidedById: null,
  },
  {
    id: "req_4815",
    agentId: "ag_deploy",
    resource: "github:northline/billing",
    scope: "pull_requests:write",
    reason: "Open a revert pull request against the billing service.",
    status: "pending",
    route: "security",
    policyId: "pol_billing_write",
    risk: "high",
    requestedAt: at(-300),
    decidedAt: null,
    decidedById: null,
  },
  {
    id: "req_4788",
    agentId: "ag_scribe",
    resource: "slack:channel/incidents",
    scope: "history:read",
    reason: "Pull the last hour of the checkout incident channel.",
    status: "approved",
    route: "auto-grant",
    policyId: "pol_incident_read",
    risk: "low",
    requestedAt: at(-30),
    decidedAt: at(-29),
    decidedById: null,
  },
  {
    id: "req_4770",
    agentId: "ag_payroll",
    resource: "warehouse:finance.settlements",
    scope: "rows:read",
    reason: "Compare this payroll run with last month's settlements.",
    status: "approved",
    route: "owner",
    policyId: "pol_warehouse_read",
    risk: "medium",
    requestedAt: at(-50),
    decidedAt: at(-20),
    decidedById: "per_hugo",
  },
  {
    id: "req_4702",
    agentId: "ag_payroll",
    resource: "s3:payroll-drops",
    scope: "objects:read",
    reason: "Read the raw payroll drop to explain a delta.",
    status: "denied",
    route: "security",
    policyId: "pol_secrets",
    risk: "high",
    requestedAt: at(-60 * 24 * 2 - 30),
    decidedAt: at(-60 * 24 * 2),
    decidedById: "per_chloe",
  },
  {
    id: "req_4681",
    agentId: "ag_inbox",
    resource: "github:northline/support",
    scope: "contents:read",
    reason: "Look up the support repo while filing a customer mail.",
    status: "denied",
    route: "owner",
    policyId: "pol_repo_write",
    risk: "low",
    requestedAt: at(-60 * 24 * 4 - 20),
    decidedAt: at(-60 * 24 * 4),
    decidedById: "per_owen",
  },
  {
    id: "req_4660",
    agentId: "ag_index",
    resource: "snowflake:prod.analytics",
    scope: "query:read",
    reason: "Refresh document counts from the analytics schema.",
    status: "expired",
    route: "auto-grant",
    policyId: "pol_analytics_read",
    risk: "low",
    requestedAt: at(-60 * 24 - 70),
    decidedAt: at(-60 * 24 - 69),
    decidedById: null,
  },
  {
    id: "req_4644",
    agentId: "ag_schema",
    resource: "warehouse:finance.settlements",
    scope: "rows:read",
    reason: "Confirm a column type change on the settlements table.",
    status: "expired",
    route: "owner",
    policyId: "pol_warehouse_read",
    risk: "medium",
    requestedAt: at(-60 * 24 * 2 - 90),
    decidedAt: at(-60 * 24 * 2 - 40),
    decidedById: "per_samir",
  },
];

export const grants: Grant[] = [
  {
    id: "gr_4788",
    requestId: "req_4788",
    agentId: "ag_scribe",
    resource: "slack:channel/incidents",
    scope: "history:read",
    ownerId: "per_theo",
    grantedAt: at(-29),
    expiresAt: at(91),
    revokedAt: null,
  },
  {
    id: "gr_4770",
    requestId: "req_4770",
    agentId: "ag_payroll",
    resource: "warehouse:finance.settlements",
    scope: "rows:read",
    ownerId: "per_hugo",
    grantedAt: at(-20),
    expiresAt: at(40),
    revokedAt: null,
  },
  {
    id: "gr_4660",
    requestId: "req_4660",
    agentId: "ag_index",
    resource: "snowflake:prod.analytics",
    scope: "query:read",
    ownerId: "per_samir",
    grantedAt: at(-60 * 24 - 69),
    expiresAt: at(-60 * 24 - 9),
    revokedAt: null,
  },
  {
    id: "gr_4644",
    requestId: "req_4644",
    agentId: "ag_schema",
    resource: "warehouse:finance.settlements",
    scope: "rows:read",
    ownerId: "per_samir",
    grantedAt: at(-60 * 24 * 2 - 40),
    expiresAt: at(-60 * 24 * 2 + 20),
    revokedAt: null,
  },
];

export const activity: ActivityEvent[] = [
  {
    id: "evt_4812",
    at: at(-18),
    action: "Ledger Reconciler asked to read warehouse:finance.settlements.",
    actorKind: "agent",
    actorId: "ag_ledger",
    requestId: "req_4812",
    agentId: "ag_ledger",
  },
  {
    id: "evt_4813",
    at: at(-42),
    action: "Vendor Scout asked to read vault:prod/payroll. Policy routed it to security.",
    actorKind: "agent",
    actorId: "ag_vendor",
    requestId: "req_4813",
    agentId: "ag_vendor",
  },
  {
    id: "evt_4770",
    at: at(-20),
    action: "Hugo Bergstrom approved Payroll Diff for warehouse:finance.settlements.",
    actorKind: "person",
    actorId: "per_hugo",
    requestId: "req_4770",
    agentId: "ag_payroll",
  },
  {
    id: "evt_4788",
    at: at(-29),
    action: "Policy auto-granted Incident Scribe read access to the incidents channel.",
    actorKind: "system",
    actorId: null,
    requestId: "req_4788",
    agentId: "ag_scribe",
  },
  {
    id: "evt_4815",
    at: at(-300),
    action: "Deploy Guard asked to write a pull request in github:northline/billing.",
    actorKind: "agent",
    actorId: "ag_deploy",
    requestId: "req_4815",
    agentId: "ag_deploy",
  },
  {
    id: "evt_4702",
    at: at(-60 * 24 * 2),
    action: "Chloe Nguyen denied Payroll Diff access to s3:payroll-drops.",
    actorKind: "person",
    actorId: "per_chloe",
    requestId: "req_4702",
    agentId: "ag_payroll",
  },
  {
    id: "evt_4660",
    at: at(-60 * 24 - 9),
    action: "The analytics query grant for Corpus Indexer expired.",
    actorKind: "system",
    actorId: null,
    requestId: "req_4660",
    agentId: "ag_index",
  },
  {
    id: "evt_4681",
    at: at(-60 * 24 * 4),
    action: "Owen Blake denied Inbox Clerk access to github:northline/support.",
    actorKind: "person",
    actorId: "per_owen",
    requestId: "req_4681",
    agentId: "ag_inbox",
  },
];

export const integrations: Integration[] = [
  {
    id: "int_okta",
    name: "Okta",
    system: "Identity provider",
    status: "connected",
    detail: "Workforce identities and group membership.",
    syncedAt: at(-15),
  },
  {
    id: "int_github",
    name: "GitHub",
    system: "Source control",
    status: "connected",
    detail: "Repositories under the northline org.",
    syncedAt: at(-12),
  },
  {
    id: "int_slack",
    name: "Slack",
    system: "Messaging",
    status: "connected",
    detail: "Incident and operations channels.",
    syncedAt: at(-8),
  },
  {
    id: "int_vault",
    name: "Vault",
    system: "Secrets",
    status: "attention",
    detail: "Last sync failed. Cached credentials are still in use.",
    syncedAt: at(-60 * 18),
  },
  {
    id: "int_snowflake",
    name: "Snowflake",
    system: "Warehouse",
    status: "connected",
    detail: "Production analytics and finance schemas.",
    syncedAt: at(-40),
  },
  {
    id: "int_pagerduty",
    name: "PagerDuty",
    system: "On-call",
    status: "disconnected",
    detail: "Not connected. Incident routing still uses Slack.",
    syncedAt: null,
  },
];
