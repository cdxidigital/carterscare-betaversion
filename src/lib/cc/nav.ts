import type { Role } from "./types";

export type NavTone = "purple" | "teal" | "blue" | "yellow" | "red" | "green" | "orange" | "indigo" | "slate";

export type NavItem = {
  to: string;
  label: string;
  min: Role;
  group: "Quick Access" | "My Work" | "Team Management" | "Admin";
  icon: string;
  tone: NavTone;
};

export const RANK: Record<Role, number> = {
  client: 0,
  support_worker: 1,
  manager: 2,
  admin: 3,
};

export function canAccess(role: Role | undefined | null, min: Role) {
  if (!role) return false;
  return RANK[role] >= RANK[min];
}

export function homeFor(role?: Role | null) {
  if (!role) return "/login";
  if (role === "client") return "/client-portal";
  if (role === "support_worker") return "/worker";
  return "/home";
}

export function deskSearch(s: Record<string, unknown>): { add?: string; client?: string } {
  const out: { add?: string; client?: string } = {};
  if (s.add === true || s.add === "1" || s.add === 1) out.add = "1";
  if (typeof s.client === "string" && s.client) out.client = s.client;
  return out;
}

export const NAV_GROUPS: { label: NavItem["group"]; collapsible: boolean }[] = [
  { label: "Quick Access", collapsible: false },
  { label: "My Work", collapsible: true },
  { label: "Team Management", collapsible: true },
  { label: "Admin", collapsible: true },
];

export const NAV: NavItem[] = [
  { to: "/home", label: "Dashboard", min: "manager", group: "Quick Access", icon: "dashboard", tone: "purple" },
  { to: "/worker", label: "Dashboard", min: "support_worker", group: "Quick Access", icon: "dashboard", tone: "purple" },
  { to: "/clients", label: "Clients", min: "support_worker", group: "Quick Access", icon: "heart", tone: "teal" },
  { to: "/case-notes", label: "Case Notes", min: "support_worker", group: "Quick Access", icon: "notes", tone: "blue" },
  { to: "/my-roster", label: "My Roster", min: "support_worker", group: "My Work", icon: "roster", tone: "blue" },
  { to: "/my-timesheets", label: "My Timesheets", min: "support_worker", group: "My Work", icon: "clock", tone: "yellow" },
  { to: "/incidents", label: "Incidents", min: "support_worker", group: "My Work", icon: "alert", tone: "red" },
  { to: "/staff-onboarding", label: "Onboarding", min: "support_worker", group: "My Work", icon: "grad", tone: "green" },
  { to: "/check-in", label: "Check-in", min: "support_worker", group: "My Work", icon: "check", tone: "teal" },
  { to: "/requests", label: "Requests", min: "support_worker", group: "My Work", icon: "requests", tone: "indigo" },
  { to: "/my-compliance", label: "My Compliance", min: "support_worker", group: "My Work", icon: "shield", tone: "green" },
  { to: "/roster", label: "Full Roster", min: "manager", group: "Team Management", icon: "roster", tone: "orange" },
  { to: "/timesheets", label: "Timesheets", min: "manager", group: "Team Management", icon: "clock", tone: "yellow" },
  { to: "/staff", label: "Staff", min: "manager", group: "Team Management", icon: "users", tone: "blue" },
  { to: "/clients/care-plans", label: "Care Plans", min: "manager", group: "Team Management", icon: "plans", tone: "teal" },
  { to: "/clients/risk", label: "Risk", min: "manager", group: "Team Management", icon: "risk", tone: "orange" },
  { to: "/staff/training", label: "Training", min: "manager", group: "Team Management", icon: "grad", tone: "green" },
  { to: "/staff/compliance", label: "Staff Compliance", min: "manager", group: "Team Management", icon: "shield", tone: "indigo" },
  { to: "/compliance", label: "Compliance", min: "manager", group: "Team Management", icon: "shield", tone: "blue" },
  { to: "/onboarding", label: "Client Onboarding", min: "manager", group: "Team Management", icon: "onboard", tone: "green" },
  { to: "/staff/hr", label: "HR", min: "admin", group: "Admin", icon: "briefcase", tone: "purple" },
  { to: "/analytics", label: "Analytics", min: "admin", group: "Admin", icon: "chart", tone: "indigo" },
  { to: "/invoices", label: "Invoices", min: "admin", group: "Admin", icon: "invoice", tone: "green" },
  { to: "/financials", label: "Financials", min: "admin", group: "Admin", icon: "wallet", tone: "teal" },
  { to: "/reports", label: "Reports", min: "admin", group: "Admin", icon: "reports", tone: "teal" },
  { to: "/tidy-up", label: "Tidy up", min: "admin", group: "Admin", icon: "tidy", tone: "orange" },
  { to: "/settings", label: "Settings", min: "admin", group: "Admin", icon: "settings", tone: "slate" },
];
