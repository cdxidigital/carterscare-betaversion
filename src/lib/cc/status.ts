import type { StatusTone } from "./types";

export function toneFor(status: string): StatusTone {
  const s = status.toLowerCase();
  if (["active", "approved", "paid", "ok", "closed", "low", "done", "current", "complete", "resolved", "in_progress"].includes(s))
    return "ok";
  if (["submitted", "sent", "investigating", "medium", "expiring", "onboarding", "draft", "open", "moderate", "pending", "due", "scheduled", "review"].includes(s))
    return "warn";
  if (["high", "expired", "leave", "overdue", "missing"].includes(s)) return "bad";
  return "info";
}
