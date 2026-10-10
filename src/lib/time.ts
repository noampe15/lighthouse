/** Frozen demo clock. Timestamps are always compared to this, never to the real clock. */
export const NOW = "2026-10-10T15:30:00.000Z";

const MINUTE = 60_000;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;

export function minutesFromNow(minutes: number): string {
  return new Date(Date.parse(NOW) + minutes * MINUTE).toISOString();
}

export function formatExact(iso: string): string {
  const date = new Date(iso);
  const pad = (value: number) => String(value).padStart(2, "0");
  return `${date.getUTCFullYear()}-${pad(date.getUTCMonth() + 1)}-${pad(date.getUTCDate())} ${pad(date.getUTCHours())}:${pad(date.getUTCMinutes())} UTC`;
}

export function formatRelative(iso: string): string {
  const delta = Date.parse(iso) - Date.parse(NOW);
  const abs = Math.abs(delta);
  const past = delta < 0;
  if (abs < 45_000) return "just now";
  if (abs < HOUR) {
    const minutes = Math.round(abs / MINUTE);
    return past ? `${minutes}m ago` : `in ${minutes}m`;
  }
  if (abs < DAY) {
    const hours = Math.round(abs / HOUR);
    return past ? `${hours}h ago` : `in ${hours}h`;
  }
  const days = Math.round(abs / DAY);
  return past ? `${days}d ago` : `in ${days}d`;
}
