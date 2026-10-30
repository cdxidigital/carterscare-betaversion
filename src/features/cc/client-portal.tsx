import { type FormEvent, useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  Calendar,
  CheckCircle,
  ChevronRight,
  Clock,
  FileText,
  Heart,
  MessageSquare,
  Phone,
  PlusCircle,
  Send,
  User,
  X,
} from "lucide-react";
import { useLookups } from "@/lib/cc/lookups";
import { REQUEST_LABEL } from "@/lib/cc/privacy";
import { PrivacyNotice } from "@/features/cc/privacy-notice";
import { weekDays } from "@/lib/cc/seed";
import { useSession } from "@/lib/cc/session";
import type { RequestKind, Shift } from "@/lib/cc/types";

type Tab = "overview" | "schedule" | "notes" | "requests";

const TABS: { id: Tab; label: string; Icon: typeof User }[] = [
  { id: "overview", label: "Overview", Icon: User },
  { id: "schedule", label: "My Schedule", Icon: Calendar },
  { id: "notes", label: "Care Notes", Icon: FileText },
  { id: "requests", label: "Requests", Icon: MessageSquare },
];

const WEEKDAYS: Record<string, string> = {
  Mon: "Monday",
  Tue: "Tuesday",
  Wed: "Wednesday",
  Thu: "Thursday",
  Fri: "Friday",
  Sat: "Saturday",
  Sun: "Sunday",
};

const MONTH_LONG: Record<string, string> = {
  Jan: "January", Feb: "February", Mar: "March", Apr: "April", May: "May", Jun: "June",
  Jul: "July", Aug: "August", Sep: "September", Oct: "October", Nov: "November", Dec: "December",
};

function parseDay(day: string) {
  const [short, num, month = "Sep"] = day.split(" ");
  const longMonth = MONTH_LONG[month] ?? month;
  return {
    short,
    weekday: WEEKDAYS[short] ?? day,
    month,
    date: num ?? day,
    long: `${WEEKDAYS[short] ?? short}, ${num} ${longMonth}`,
  };
}

function rangeFromWindow(window: string) {
  const [a, b] = window.split(/[–-]/);
  const pad = (x: string) => {
    const t = x.trim();
    return t.includes(":") ? t : `${t.padStart(2, "0")}:00`;
  };
  return `${pad(a ?? "")} – ${pad(b ?? "")}`;
}

function hoursFromWindow(window: string) {
  const [a, b] = window.split(/[–-]/);
  const hour = (x: string) => {
    const m = x?.match(/(\d{1,2})/);
    return m ? Number(m[1]) : NaN;
  };
  const start = hour(a ?? "");
  const end = hour(b ?? "");
  if (!Number.isFinite(start) || !Number.isFinite(end)) return 0;
  return end > start ? end - start : end + 24 - start;
}

function visitStatus(status: Shift["status"]) {
  if (status === "complete") return { label: "Complete", cls: "bg-ok-bg text-ok" };
  if (status === "in_progress") return { label: "In progress", cls: "bg-info-bg text-info" };
  if (status === "scheduled") return { label: "Scheduled", cls: "bg-warn-bg text-warn" };
  return { label: status, cls: "bg-bg text-muted" };
}

function requestTone(status: string) {
  if (status === "resolved") return { label: "Resolved", cls: "bg-ok-bg text-ok", Icon: CheckCircle };
  if (status === "in_progress") return { label: "In Progress", cls: "bg-info-bg text-info", Icon: Clock };
  return { label: "Pending", cls: "bg-warn-bg text-warn", Icon: Clock };
}

export function ClientPortalScreen() {
  const { session } = useSession();
  const db = useLookups();
  const me = db.clients.find((c) => c.id === session?.clientId) ?? db.clients[0];
  const displayName = me.preferredName || me.name.split(" ")[0];
  const [tab, setTab] = useState<Tab>("overview");
  const [showNew, setShowNew] = useState(false);
  const [flash, setFlash] = useState("");
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const [kind, setKind] = useState<RequestKind>("schedule");

  const visits = useMemo(
    () =>
      db.shifts
        .filter((s) => s.clientId === me.id)
        .sort((a, b) => weekDays.indexOf(a.day) - weekDays.indexOf(b.day)),
    [db.shifts, me.id],
  );
  const upcoming = visits.filter((s) => s.status === "scheduled" || s.status === "in_progress");
  const notes = db.notes.filter((n) => n.clientId === me.id && n.visibleToClient !== false);
  const reqs = db.requests.filter((r) => r.clientId === me.id);
  const next = upcoming[0] ?? visits.find((s) => s.status === "scheduled");
  const listed = upcoming.length ? upcoming : visits;

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !details.trim()) return;
    db.addRequest({
      clientId: me.id,
      title: title.trim(),
      notes: details.trim(),
      status: "pending",
      type: kind,
    });
    setTitle("");
    setDetails("");
    setKind("schedule");
    setShowNew(false);
    setFlash("Request submitted! Your care team will be in touch.");
    setTab("requests");
  };

  return (
    <div className="mx-auto max-w-2xl px-4 py-6 pb-16" data-testid="client-portal">
      <nav className="-mx-4 mb-6 border-b border-portal/15 px-4">
        <div className="flex overflow-x-auto">
          {TABS.map(({ id, label, Icon }) => (
            <button
              key={id}
              type="button"
              onClick={() => setTab(id)}
              className={`flex items-center gap-1.5 whitespace-nowrap border-b-2 px-4 py-3 text-sm font-medium ${
                tab === id ? "border-portal bg-portal-soft/50 text-portal" : "border-transparent text-muted"
              }`}
            >
              <Icon size={16} />
              {label}
            </button>
          ))}
        </div>
      </nav>

      {tab === "overview" ? (
        <div className="space-y-5">
          <div className="portal-banner relative overflow-hidden rounded-xl p-6 text-portal-fg">
            <div className="absolute top-0 right-0 size-32 translate-x-8 -translate-y-8 rounded-full bg-surface/10" />
            <h2 className="relative text-xl font-bold">Hello, {displayName}!</h2>
            <p className="relative mt-1 text-sm text-portal-fg/80">
              {upcoming.length > 0
                ? `You have ${upcoming.length} upcoming visit${upcoming.length > 1 ? "s" : ""} scheduled.`
                : "Welcome to your care portal."}
            </p>
            {me.ndis ? <p className="relative mt-2 text-xs text-portal-fg/70">NDIS {me.ndis} · used for your plan only, not as your login</p> : null}
          </div>

          <div className="grid grid-cols-3 gap-3">
            <StatCard icon={Calendar} label="Upcoming" value={upcoming.length} tone="blue" onClick={() => setTab("schedule")} />
            <StatCard icon={FileText} label="Care Notes" value={notes.length} tone="purple" onClick={() => setTab("notes")} />
            <StatCard icon={MessageSquare} label="Requests" value={reqs.length} tone="teal" onClick={() => setTab("requests")} />
          </div>

          {next ? <VisitCard shift={next} staffName={db.staffName(next.staffId)} featured /> : null}

          {notes[0] ? (
            <section className="rounded-xl border border-border/60 bg-surface p-5 shadow-(--shadow-card)">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="flex items-center gap-2 text-sm font-bold">
                  <FileText size={16} className="text-primary" /> Latest Note
                </h3>
                <button type="button" onClick={() => setTab("notes")} className="flex items-center gap-1 text-xs font-medium text-portal">
                  View all <ChevronRight size={12} />
                </button>
              </div>
              <div className="rounded-lg border border-primary/15 bg-primary-soft p-3">
                <div className="mb-1.5 flex items-center justify-between">
                  <span className="text-xs font-semibold text-primary capitalize">{notes[0].kind ?? "daily care"}</span>
                  <span className="text-xs text-subtle">{notes[0].date.replace(" 2026", "")}</span>
                </div>
                <p className="text-sm leading-relaxed">{notes[0].body}</p>
                <p className="mt-2 text-xs text-subtle">by {db.staffName(notes[0].staffId)}</p>
              </div>
            </section>
          ) : null}

          <section className="rounded-xl border border-border/60 bg-surface p-5 shadow-(--shadow-card)">
            <h3 className="mb-2 text-sm font-bold">Your information</h3>
            <PrivacyNotice variant="portal" />
            <div className="mt-4 flex flex-wrap gap-2">
              <button
                type="button"
                className="rounded-lg border border-border px-3 py-2 text-sm font-semibold"
                onClick={() => {
                  setKind("correction");
                  setTitle("Please correct my information");
                  setShowNew(true);
                  setTab("requests");
                }}
              >
                Ask for a correction
              </button>
              <button
                type="button"
                className="rounded-lg border border-border px-3 py-2 text-sm font-semibold"
                onClick={() => {
                  setKind("privacy");
                  setTitle("Privacy question");
                  setShowNew(true);
                  setTab("requests");
                }}
              >
                Privacy question
              </button>
            </div>
          </section>
          <section className="rounded-xl border border-border/60 bg-surface p-5 shadow-(--shadow-card)">
            <h3 className="mb-3 flex items-center gap-2 text-sm font-bold">
              <Heart size={16} className="text-bad" /> Need help?
            </h3>
            <p className="mb-4 text-sm text-muted">Contact your coordinator. For a privacy question, use the buttons above.</p>
            <a
              href="tel:18002278377"
              className="flex items-center gap-3 rounded-lg border border-portal/20 bg-portal-soft p-3 text-portal"
            >
              <Phone size={20} className="shrink-0" />
              <span>
                <span className="block text-sm font-semibold">Call Us</span>
                <span className="block text-xs">{db.org?.phone ?? "1800 CARTERS"}</span>
              </span>
            </a>
          </section>
        </div>
      ) : null}

      {tab === "schedule" ? (
        <div className="space-y-4">
          <div>
            <h2 className="text-lg font-bold">My Schedule</h2>
            <p className="mt-0.5 text-sm text-muted">Your upcoming and recent care visits</p>
          </div>
          {listed.length === 0 ? (
            <Empty icon={Calendar} message="No visits scheduled" sub="Your care coordinator will be in touch to arrange visits" />
          ) : (
            <div className="space-y-3">
              {listed.map((s) => (
                <VisitCard key={s.id} shift={s} staffName={db.staffName(s.staffId)} />
              ))}
            </div>
          )}
        </div>
      ) : null}

      {tab === "notes" ? (
        <div className="space-y-4">
          <div>
            <h2 className="text-lg font-bold">Care Notes</h2>
            <p className="mt-0.5 text-sm text-muted">Updates shared by your care team</p>
          </div>
          {notes.length === 0 ? (
            <Empty icon={FileText} message="No care notes yet" sub="Notes from your care team will appear here" />
          ) : (
            <div className="space-y-3">
              {notes.map((n) => (
                <article key={n.id} className="rounded-lg border border-border/60 bg-surface p-4 shadow-(--shadow-card)">
                  <div className="mb-2 flex items-start justify-between gap-3">
                    <span className="rounded-full bg-primary-soft px-2 py-0.5 text-xs font-bold whitespace-nowrap text-primary capitalize">
                      {n.kind ?? "daily care"}
                    </span>
                    <span className="shrink-0 text-xs text-subtle">{n.date}</span>
                  </div>
                  <p className="text-sm leading-relaxed">{n.body}</p>
                  <div className="mt-3 flex items-center gap-1.5 border-t border-border/60 pt-3">
                    <span className="grid size-5 place-items-center rounded-full bg-portal-soft">
                      <User size={12} className="text-portal" />
                    </span>
                    <p className="text-xs text-subtle">{db.staffName(n.staffId)}</p>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      ) : null}

      {tab === "requests" ? (
        <div className="space-y-4">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-bold">My Requests</h2>
              <p className="mt-0.5 text-sm text-muted">Contact your care team</p>
            </div>
            <button
              type="button"
              onClick={() => setShowNew(true)}
              className="portal-cta inline-flex h-11 items-center gap-1.5 rounded-lg px-4 text-sm font-semibold text-portal-fg shadow-(--shadow-card)"
            >
              <PlusCircle size={16} />
              New
            </button>
          </div>

          {flash ? <p className="rounded-lg bg-ok-bg px-3 py-2 text-sm text-ok">{flash}</p> : null}

          {showNew ? (
            <form onSubmit={submit} className="space-y-3 rounded-lg border border-portal/30 bg-surface p-4 shadow-(--shadow-card)">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold">New Request</h3>
                <button type="button" onClick={() => setShowNew(false)} className="text-subtle" aria-label="Close">
                  <X size={16} />
                </button>
              </div>
              <label className="block">
                <span className="mb-1.5 block text-xs font-semibold tracking-wide text-muted uppercase">Type</span>
                <select
                  value={kind}
                  onChange={(e) => setKind(e.target.value as RequestKind)}
                  className="h-10 w-full rounded-md border border-border bg-bg px-3 text-sm"
                >
                  <option value="schedule">Schedule change</option>
                  <option value="service">Service request</option>
                  <option value="feedback">Feedback</option>
                  <option value="correction">Correct my information</option>
                  <option value="privacy">Privacy question or complaint</option>
                  <option value="other">Other</option>
                </select>
              </label>
              <label className="block">
                <span className="mb-1.5 block text-xs font-semibold tracking-wide text-muted uppercase">Subject</span>
                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Brief description of your request"
                  className="h-10 w-full rounded-md border border-border bg-bg px-3 text-sm"
                  required
                />
              </label>
              <label className="block">
                <span className="mb-1.5 block text-xs font-semibold tracking-wide text-muted uppercase">Details</span>
                <textarea
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                  placeholder="Tell us more about your request..."
                  rows={3}
                  className="w-full resize-none rounded-md border border-border bg-bg px-3 py-2.5 text-sm"
                  required
                />
              </label>
              <button type="submit" className="portal-cta flex h-10 w-full items-center justify-center gap-2 rounded-md text-sm font-semibold text-portal-fg">
                <Send size={16} />
                Submit Request
              </button>
            </form>
          ) : null}

          {reqs.length === 0 ? (
            <Empty icon={MessageSquare} message="No requests yet" sub="Tap New to send a message to your care team" />
          ) : (
            <div className="space-y-3">
              {reqs.map((r) => {
                const tone = requestTone(r.status);
                return (
                  <Link key={r.id} to={`/requests/${r.id}` as never} className="block rounded-lg border border-border/60 bg-surface p-4 shadow-(--shadow-card)">
                    <div className="mb-2 flex items-start justify-between gap-3">
                      <p className="text-sm leading-tight font-semibold">{r.title}</p>
                      <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold whitespace-nowrap ${tone.cls}`}>
                        <tone.Icon size={12} />
                        {tone.label}
                      </span>
                    </div>
                    <p className="text-sm leading-relaxed text-muted">{r.notes}</p>
                    {r.reply ? <p className="mt-2 text-sm">Team: {r.reply}</p> : null}
                    <div className="mt-3 flex items-center gap-3 border-t border-border/60 pt-3 text-xs text-subtle">
                      <span className="rounded-full bg-bg px-2 py-0.5">{REQUEST_LABEL[r.type]}</span>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      ) : null}

      <footer className="mt-8 border-t border-portal/15 pt-6 text-center">
        <img src="/brand/mark.svg?v=4" alt="" className="mx-auto mb-2 size-8 opacity-70" />
        <p className="text-xs text-subtle">CartersCare client portal</p>
        <p className="mt-1 text-xs text-subtle">Demo only · the record stays in this browser. Don’t enter real personal information.</p>
      </footer>
    </div>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
  tone,
  onClick,
}: {
  icon: typeof Calendar;
  label: string;
  value: number;
  tone: "blue" | "purple" | "teal";
  onClick: () => void;
}) {
  const grad = tone === "blue" ? "stat-grad-blue" : tone === "purple" ? "stat-grad-purple" : "stat-grad-teal";
  return (
    <button type="button" onClick={onClick} className="rounded-lg border border-border/60 bg-surface p-4 text-left shadow-(--shadow-card)">
      <span className={`${grad} mb-2 grid size-8 place-items-center rounded-md text-primary-fg`}>
        <Icon size={16} />
      </span>
      <p className="text-xl font-extrabold">{value}</p>
      <p className="text-xs leading-tight text-muted">{label}</p>
    </button>
  );
}

function VisitCard({ shift, staffName, featured }: { shift: Shift; staffName: string; featured?: boolean }) {
  const d = parseDay(shift.day);
  const tone = visitStatus(shift.status);
  return (
    <section className="rounded-xl border border-border/60 bg-surface p-5 shadow-(--shadow-card)">
      {featured ? (
        <h3 className="mb-4 flex items-center gap-2 text-sm font-bold">
          <Calendar size={16} className="text-info" /> Next Visit
        </h3>
      ) : null}
      <div className="flex items-center gap-4">
        <div className="date-chip flex size-14 shrink-0 flex-col items-center justify-center rounded-lg border">
          <span className="text-[10px] font-bold tracking-wide uppercase">{d.month}</span>
          <span className="text-xl font-black leading-none">{d.date}</span>
        </div>
        <div className="min-w-0 flex-1">
          <p className="font-semibold">{featured ? d.weekday : d.long}</p>
          <p className="flex flex-wrap items-center gap-1 text-sm text-muted">
            <Clock size={14} />
            {rangeFromWindow(shift.window)}
            <span className="text-subtle">·</span>
            {hoursFromWindow(shift.window)}h
          </p>
          <p className="mt-0.5 truncate text-xs text-subtle">{featured ? staffName : `with ${staffName}`}</p>
        </div>
        <span className={`rounded-full px-2 py-0.5 text-xs font-semibold whitespace-nowrap ${tone.cls}`}>{tone.label}</span>
      </div>
    </section>
  );
}

function Empty({ icon: Icon, message, sub }: { icon: typeof Calendar; message: string; sub?: string }) {
  return (
    <div className="rounded-xl border border-border/60 bg-surface p-12 text-center shadow-(--shadow-card)">
      <Icon size={48} className="mx-auto mb-3 text-border" />
      <p className="font-medium text-muted">{message}</p>
      {sub ? <p className="mt-1 text-xs text-subtle">{sub}</p> : null}
    </div>
  );
}
