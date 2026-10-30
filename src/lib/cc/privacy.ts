import type { RequestKind } from "./types";

export const REQUEST_LABEL: Record<RequestKind, string> = {
  schedule: "Schedule",
  service: "Service",
  feedback: "Feedback",
  privacy: "Privacy",
  correction: "Correction",
  other: "Other",
};
