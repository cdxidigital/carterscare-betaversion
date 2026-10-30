import { type ReactNode, useEffect, useMemo, useState } from "react";
import { Link, Outlet, useNavigate, useRouterState } from "@tanstack/react-router";
import {
  AlertCircle,
  AlertTriangle,
  BarChart3,
  Briefcase,
  CalendarDays,
  ChevronDown,
  ClipboardCheck,
  ClipboardList,
  Clock,
  FileText,
  GraduationCap,
  Heart,
  LayoutDashboard,
  LogOut,
  Menu,
  MessageSquare,
  PieChart,
  Receipt,
  Search,
  Settings,
  Shield,
  Sparkles,
  UserPlus,
  Users,
  Wallet,
  X,
  type LucideIcon,
} from "lucide-react";
import { NAV, NAV_GROUPS, RANK, canAccess, homeFor } from "@/lib/cc/nav";
import { useSession } from "@/lib/cc/session";
import { useCC } from "@/lib/cc/store";
import { Avatar, Btn } from "./ui";
import type { Role } from "@/lib/cc/types";

const ICONS: Record<string, LucideIcon> = {
  dashboard: LayoutDashboard,
  heart: Heart,
  notes: FileText,
  roster: CalendarDays,
  clock: Clock,
  alert: AlertTriangle,
  grad: GraduationCap,
  check: ClipboardCheck,
  requests: MessageSquare,
  shield: Shield,
  users: Users,
  plans: ClipboardList,
  risk: AlertCircle,
  onboard: UserPlus,
  briefcase: Briefcase,
  chart: PieChart,
  invoice: Receipt,
  wallet: Wallet,
  reports: BarChart3,
  tidy: Sparkles,
  settings: Settings,
};

function clientAllowed(pathname: string) {
  return pathname === "/client-portal" || pathname.startsWith("/requests");
}

export function AppShell() {
  const { session, ready, logout } = useSession();
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [expanded, setExpanded] = useState<Set<string>>(() => new Set(["My Work", "Team Management"]));
  const clients = useCC((s) => s.clients);
  const staff = useCC((s) => s.staff);
  const notes = useCC((s) => s.notes);
  const incidents = useCC((s) => s.incidents);
  const invoices = useCC((s) => s.invoices);
  const requests = useCC((s) => s.requests);
  const carePlans = useCC((s) => s.carePlans);
  const maureenAlert = incidents.some((i) => i.status !== "closed");

  useEffect(() => {
    if (!ready) return;
    if (!session) {
      void navigate({ to: "/login" });
      return;
    }
    if (session.role === "client" && !clientAllowed(pathname)) {
      void navigate({ to: "/client-portal" });
      return;
    }
    if (session.role === "support_worker" && pathname === "/home") {
      void navigate({ to: "/worker" });
    }
  }, [ready, session, pathname, navigate]);

  useEffect(() => {
    NAV_GROUPS.forEach((g) => {
      const hit = NAV.some(
        (n) => n.group === g.label && (pathname === n.to || (n.to !== "/home" && pathname.startsWith(`${n.to}/`))),
      );
      if (hit) setExpanded((prev) => new Set([...prev, g.label]));
    });
  }, [pathname]);

  const items = NAV.filter((n) => {
    if (!session) return false;
    if (RANK[session.role] < RANK[n.min]) return false;
    if (n.to === "/worker" && session.role !== "support_worker") return false;
    if (n.to === "/home" && session.role === "support_worker") return false;
    if (n.to === "/my-compliance" && session.role !== "support_worker") return false;
    return true;
  });
  const groups = NAV_GROUPS.filter((g) => items.some((n) => n.group === g.label));
  const hits = useMemo(() => {
    const query = q.trim().toLowerCase();
    if (!query || !session) return [];
    const allowed =
      session.role === "support_worker" && session.staffId
        ? new Set(clients.filter((c) => c.staffIds.includes(session.staffId as string)).map((c) => c.id))
        : session.role === "client" && session.clientId
          ? new Set([session.clientId])
          : null;
    const inBook = (clientId: string) => !allowed || allowed.has(clientId);
    const people = [
      ...clients.filter((c) => inBook(c.id)).map((c) => ({ to: `/clients/${c.id}`, label: c.name, kind: "Client" })),
      ...(session.role === "client" ? [] : staff.map((s) => ({ to: `/staff/${s.id}`, label: s.name, kind: "Staff" }))),
      ...notes.filter((n) => inBook(n.clientId) && (session.role !== "client" || n.visibleToClient !== false)).map((n) => ({
        to: `/case-notes/${n.id}`,
        label: n.body.slice(0, 60),
        kind: "Note",
      })),
      ...(session.role === "client" ? [] : incidents.filter((i) => inBook(i.clientId)).map((i) => ({ to: `/incidents/${i.id}`, label: i.summary, kind: "Incident" }))),
      ...requests.filter((r) => inBook(r.clientId)).map((r) => ({ to: `/requests/${r.id}`, label: r.title, kind: "Request" })),
      ...carePlans.filter((p) => inBook(p.clientId)).map((p) => ({ to: `/clients/${p.clientId}`, label: p.name, kind: "Care plan" })),
    ];
    if (canAccess(session.role, "admin")) {
      people.push(...invoices.map((i) => ({ to: `/invoices/${i.id}`, label: i.number, kind: "Invoice" })));
    }
    return people.filter((p) => p.label.toLowerCase().includes(query)).slice(0, 8);
  }, [q, clients, staff, notes, incidents, invoices, requests, carePlans, session]);

  if (!ready || !session) {
    return <div className="login-wash grid min-h-svh place-items-center text-sm text-muted">Loading floor…</div>;
  }

  if (session.role === "client") {
    const me = clients.find((c) => c.id === session.clientId);
    const hello = me?.preferredName || session.name.split(" ")[0];
    return (
      <div className="portal-wash min-h-svh">
        <header className="sticky top-0 z-20 border-b border-portal/15 bg-surface/80 backdrop-blur-md">
          <div className="mx-auto flex max-w-2xl items-center justify-between gap-3 px-4 py-4">
            <Link to="/client-portal" className="flex items-center gap-3">
              <img src="/brand/mark.svg?v=4" alt="" className="size-10" />
              <span>
                <span className="flex items-center gap-1.5">
                  <span className="text-base font-black tracking-tight">Carters<span className="text-primary">Care</span></span>
                  <span className="rounded-full bg-portal-soft px-1.5 py-0.5 text-[10px] font-bold text-portal">DEMO</span>
                </span>
                <span className="block text-xs text-muted">Hello, {hello}</span>
              </span>
            </Link>
            <button
              type="button"
              onClick={logout}
              className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs text-muted hover:bg-bad-bg hover:text-bad"
              aria-label="Sign out"
            >
              <LogOut size={16} />
              <span className="hidden sm:inline">Sign Out</span>
            </button>
          </div>
        </header>
        <Outlet />
      </div>
    );
  }

  return (
    <div className="min-h-svh bg-bg lg:grid lg:grid-cols-[240px_1fr]">
      <header className="flex items-center justify-between border-b border-border bg-surface px-4 py-3 lg:hidden">
        <div className="flex items-center gap-2">
          <img src="/brand/mark.svg?v=4" alt="" className="size-9" />
          <strong className="text-sm font-black tracking-tight">Carters<span className="text-primary">Care</span></strong>
        </div>
        <button type="button" className="rounded-md border border-border p-2" onClick={() => setOpen((v) => !v)} aria-label="Menu">
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </header>
      <aside
        className={`${open ? "flex" : "hidden"} max-h-[75vh] flex-col overflow-auto border-b border-border bg-surface lg:sticky lg:top-0 lg:flex lg:h-svh lg:max-h-none lg:border-r lg:border-b-0`}
        data-testid="app-sidebar"
      >
        <div className="hidden items-center gap-3 border-b border-border px-4 py-4 lg:flex">
          <img src="/brand/mark.svg?v=4" alt="" className="size-12" />
          <div className="leading-tight">
            <p className="text-lg font-black tracking-tight text-fg">Carters<span className="text-primary">Care</span></p>
            <p className="mt-0.5 text-[11px] font-semibold text-subtle">More room for care.</p>
          </div>
        </div>
        <nav className="flex-1 space-y-1 overflow-auto py-2">
          <div className="px-2 pb-1">
            <Link
              to="/ask-maureen"
              onClick={() => setOpen(false)}
              className={`flex w-full items-center gap-2.5 rounded-md border p-2 ${
                pathname === "/ask-maureen"
                  ? "border-primary/20 bg-primary-soft"
                  : maureenAlert
                    ? "border-warn/30 bg-warn-bg"
                    : "border-primary/15 bg-primary-soft/70 hover:bg-primary-soft"
              }`}
              data-testid="sidebar-maureen-button-top"
            >
              <span className="relative shrink-0">
                <img src="/brand/maureen.png" alt="" className="size-7 rounded-full border-2 border-primary/20 object-cover" />
                {maureenAlert ? <span className="absolute -top-0.5 -right-0.5 size-2.5 rounded-full border-2 border-surface bg-warn" /> : null}
              </span>
              <span className="min-w-0 text-left">
                <span className="block text-xs font-bold text-primary">Ask Maureen</span>
                <span className="block text-[10px] text-subtle">AI Assistant</span>
              </span>
            </Link>
          </div>
          {groups.map((g) => {
            const isOpen = !g.collapsible || expanded.has(g.label);
            const groupItems = items.filter((n) => n.group === g.label);
            const hasActive = groupItems.some((n) => (n.to === "/home" || n.to === "/worker" ? pathname === n.to : pathname === n.to || pathname.startsWith(`${n.to}/`)));
            return (
              <div key={g.label} className="mt-1">
                {g.collapsible ? (
                  <button
                    type="button"
                    onClick={() =>
                      setExpanded((prev) => {
                        const next = new Set(prev);
                        if (next.has(g.label)) next.delete(g.label);
                        else next.add(g.label);
                        return next;
                      })
                    }
                    className={`flex w-full items-center justify-between px-3 py-1.5 text-[10px] font-semibold tracking-wider uppercase ${hasActive ? "text-primary" : "text-subtle"}`}
                  >
                    <span>{g.label}</span>
                    <ChevronDown size={12} className={`transition-transform duration-200 ${isOpen ? "" : "-rotate-90"}`} />
                  </button>
                ) : (
                  <p className="px-3 py-1.5 text-[10px] font-semibold tracking-wider text-subtle uppercase">{g.label}</p>
                )}
                {isOpen
                  ? groupItems.map((n) => {
                      const Icon = ICONS[n.icon] ?? LayoutDashboard;
                      const active = n.to === "/home" || n.to === "/worker" ? pathname === n.to : pathname === n.to || pathname.startsWith(`${n.to}/`);
                      return (
                        <Link
                          key={n.to}
                          to={n.to as never}
                          onClick={() => setOpen(false)}
                          className={`mx-2 flex items-center gap-2.5 rounded-md border px-2 py-1.5 ${
                            active ? "border-primary/15 bg-primary-soft" : "border-transparent hover:bg-bg"
                          }`}
                        >
                          <span className={`icon-${n.tone} grid size-7 shrink-0 place-items-center rounded-md text-primary-fg ${active ? "" : "opacity-80"}`}>
                            <Icon size={14} />
                          </span>
                          <span className={`truncate text-[13px] ${active ? "font-semibold text-primary" : "font-medium text-muted"}`}>{n.label}</span>
                        </Link>
                      );
                    })
                  : null}
              </div>
            );
          })}
        </nav>
        <div className="flex items-center gap-2.5 border-t border-border p-2">
          <span className="relative shrink-0">
            <Avatar name={session.name} />
            <span className="absolute -right-0.5 -bottom-0.5 size-2.5 rounded-full border-2 border-surface bg-ok" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="truncate text-xs font-semibold">{session.name}</p>
            <p className="truncate text-[10px] text-subtle">{session.email}</p>
          </div>
          <button type="button" onClick={logout} className="rounded-md p-2 text-subtle hover:bg-bad-bg hover:text-bad" aria-label="Sign out">
            <LogOut size={14} />
          </button>
        </div>
      </aside>
      <div className="min-w-0">
        <div className="no-print sticky top-0 z-20 border-b border-border bg-surface/90 px-4 py-3 backdrop-blur">
          <div className="relative mx-auto max-w-3xl">
            <Search size={16} className="absolute top-1/2 left-3 -translate-y-1/2 text-subtle" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search people, notes, incidents…"
              className="h-11 w-full rounded-md border border-border bg-bg pr-3 pl-9 text-sm"
            />
            {hits.length > 0 && (
              <div className="absolute right-0 left-0 mt-1 rounded-md border border-border bg-surface p-1 shadow-(--shadow-elevated)">
                {hits.map((h) => (
                  <button
                    key={h.to + h.kind}
                    type="button"
                    className="flex w-full items-center justify-between rounded-sm px-3 py-2 text-left text-sm hover:bg-bg"
                    onClick={() => {
                      setQ("");
                      void navigate({ to: h.to as never });
                    }}
                  >
                    <span className="truncate pr-3">{h.label}</span>
                    <span className="text-xs text-muted">{h.kind}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
        <main className="mx-auto max-w-6xl px-4 py-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export function Guard({ min, children }: { min: Role; children: ReactNode }) {
  const { session } = useSession();
  if (!session || RANK[session.role] < RANK[min]) {
    return (
      <div className="rounded-lg border border-border bg-surface p-6 shadow-(--shadow-card)">
        <h1 className="text-lg font-semibold">You do not have this desk</h1>
        <p className="mt-1 text-sm text-muted">Ask a manager if you need access.</p>
        <div className="mt-4">
          <Btn to={homeFor(session?.role)}>Back to your desk</Btn>
        </div>
      </div>
    );
  }
  return children;
}
