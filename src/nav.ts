export const modules = [
  { id: "requests", label: "Requests", href: "/requests", phase: 2 },
  { id: "agents", label: "Agents", href: "/agents", phase: 3 },
  { id: "policies", label: "Policies", href: "/policies", phase: 4 },
  { id: "activity", label: "Activity", href: "/activity", phase: 5 },
  { id: "integrations", label: "Integrations", href: "/integrations", phase: 6 },
] as const;

export type ModuleId = (typeof modules)[number]["id"];

export function moduleById(id: ModuleId) {
  const found = modules.find((item) => item.id === id);
  if (!found) {
    throw new Error(`Unknown module ${id}`);
  }
  return found;
}
