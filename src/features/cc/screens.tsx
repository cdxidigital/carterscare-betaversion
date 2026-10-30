import { type FormEvent, Fragment, useState } from "react";
import { Link, useNavigate, useSearch } from "@tanstack/react-router";
import { AlertTriangle, CalendarDays, Clock, FileText, Heart, ShieldCheck, UserCircle, Users } from "lucide-react";
import { useLookups } from "@/lib/cc/lookups";
import { canAccess, homeFor } from "@/lib/cc/nav";
import { useSession } from "@/lib/cc/session";
import { CLAIM_NOTE, money, rosterHold, rosterWarn } from "@/lib/cc/compliance";
import { weekDays, seed } from "@/lib/cc/seed";
import { displayClock, hoursBetween, perthDate, perthGreeting, perthNow, perthShortDate, perthShortDateYear } from "@/lib/utils";
import { Btn, Card, Crumb, Empty, Field, Input, Modal, PageHead, PersonLink, Pill, Select, Textarea } from "@/components/cc/ui";
import { PrivacyNotice } from "@/features/cc/privacy-notice";
import { REQUEST_LABEL } from "@/lib/cc/privacy";
import { Guard } from "@/components/cc/shell";
import type { RequestKind, Role } from "@/lib/cc/types";

function useDeskSearch() {
  return useSearch({ strict: false }) as { add?: string; client?: string };
}

function Missing({ what, back }: { what: string; back: string }) {
  return (
    <Card>
      <h1 className="text-lg font-semibold">That {what} is not on file</h1>
      <p className="mt-1 text-sm text-muted">It may have been removed. Return to the list.</p>
      <div className="mt-4">
        <Btn to={back}>Back</Btn>
      </div>
    </Card>
  );
}

export function DashboardScreen() {
  const nav = useNavigate();
  const { session } = useSession();
  const db = useLookups();
  const role = session?.role;
  const isMgr = canAccess(role, "manager");
  const isAdmin = canAccess(role, "admin");
  const onShift = db.checkins.filter((c) => !c.outAt);
  const openIncidents = db.incidents.filter((i) => i.status !== "closed");
  const reportable = openIncidents.filter((i) => i.reportable).length;
  const alerts =
    openIncidents.length + db.staff.filter((s) => s.firstAid !== "ok" || s.wwcc !== "ok" || s.ndisScreening !== "ok").length;
  const first = session?.name.split(" ")[0] ?? "there";
  const notesToday = db.notes.length;
  const activeClients = db.clients.filter((c) => c.status === "active");
  return (
    <>
      <PageHead
        title={`${perthGreeting()}, ${first}.`}
        sub={`Perth · ${perthDate()}`}
      />
      <div className="mb-5 flex flex-wrap gap-2" role="navigation" aria-label="Quick actions" data-testid="dashboard-quick-actions">
        <Link to="/clients" className="qa-clients inline-flex h-10 items-center gap-2 rounded-md px-4 text-sm font-semibold text-primary-fg shadow-(--shadow-card)">
          <Heart size={16} /> View Clients
        </Link>
        <Link to={isMgr ? "/roster" : "/my-roster"} className="qa-roster inline-flex h-10 items-center gap-2 rounded-md px-4 text-sm font-semibold text-primary-fg shadow-(--shadow-card)">
          <CalendarDays size={16} /> {isMgr ? "Today's Roster" : "My Roster"}
        </Link>
        <Link to={isMgr ? "/timesheets" : "/my-timesheets"} className="qa-timesheets inline-flex h-10 items-center gap-2 rounded-md px-4 text-sm font-semibold text-primary-fg shadow-(--shadow-card)">
          <Clock size={16} /> Timesheets
        </Link>
        <Link to={"/case-notes" as never} className="qa-notes inline-flex h-10 items-center gap-2 rounded-md px-4 text-sm font-semibold text-primary-fg shadow-(--shadow-card)">
          <FileText size={16} /> Case Notes
        </Link>
      </div>
      <div className="grid gap-3 sm:grid-cols-3">
        <button type="button" className="flex items-center gap-4 rounded-lg border border-border/50 bg-surface p-5 text-left shadow-(--shadow-card)" onClick={() => void nav({ to: "/check-in" })}>
          <span className="icon-purple grid size-14 shrink-0 place-items-center rounded-lg text-primary-fg shadow-(--shadow-card)">
            <Users size={22} />
          </span>
          <span>
            <span className="block text-2xl font-bold leading-tight">{onShift.length}</span>
            <span className="block text-sm font-semibold text-fg/70">Staff on Shift</span>
            <span className="block text-xs text-muted">Active check-ins today</span>
          </span>
        </button>
        <button
          type="button"
          className="flex items-center gap-4 rounded-lg border border-border/50 bg-surface p-5 text-left shadow-(--shadow-card)"
          onClick={() => void nav({ to: isMgr ? "/staff" : "/my-timesheets" })}
        >
          <span className="icon-blue grid size-14 shrink-0 place-items-center rounded-lg text-primary-fg shadow-(--shadow-card)">
            <UserCircle size={22} />
          </span>
          <span>
            <span className="block text-2xl font-bold leading-tight">{isMgr ? db.staff.filter((s) => s.status === "active").length : `${db.timesheets.filter((t) => t.staffId === session?.staffId).reduce((s, t) => s + t.hours, 0)}h`}</span>
            <span className="block text-sm font-semibold text-fg/70">{isMgr ? "Active Staff" : "My hours"}</span>
            <span className="block text-xs text-muted">{isMgr ? "Registered care workers" : "Timesheets"}</span>
          </span>
        </button>
        <button type="button" className="flex items-center gap-4 rounded-lg border border-border/50 bg-surface p-5 text-left shadow-(--shadow-card)" onClick={() => void nav({ to: "/incidents" })}>
          <span className={`${alerts > 0 ? "icon-orange" : "icon-green"} grid size-14 shrink-0 place-items-center rounded-lg text-primary-fg shadow-(--shadow-card)`}>
            {alerts > 0 ? <AlertTriangle size={22} /> : <ShieldCheck size={22} />}
          </span>
          <span>
            <span className="block text-2xl font-bold leading-tight">{alerts}</span>
            <span className="block text-sm font-semibold text-fg/70">Alerts</span>
            <span className="block text-xs text-muted">{alerts > 0 ? (reportable ? `${reportable} reportable · 24h notice` : "Requires attention") : "All clear"}</span>
          </span>
        </button>
      </div>
      <div className="mt-3 grid gap-3 sm:grid-cols-3">
        <button type="button" className="flex items-center gap-3 rounded-lg border border-border/50 bg-surface p-4 text-left shadow-(--shadow-card)" onClick={() => void nav({ to: "/clients" })}>
          <span className="icon-teal grid size-10 place-items-center rounded-md text-primary-fg">
            <Heart size={18} />
          </span>
          <span>
            <span className="block text-xl font-bold">{activeClients.length}</span>
            <span className="text-xs font-medium text-muted">Active Clients</span>
          </span>
        </button>
        <button type="button" className="flex items-center gap-3 rounded-lg border border-border/50 bg-surface p-4 text-left shadow-(--shadow-card)" onClick={() => void nav({ to: "/case-notes" as never })}>
          <span className="icon-yellow grid size-10 place-items-center rounded-md text-primary-fg">
            <FileText size={18} />
          </span>
          <span>
            <span className="block text-xl font-bold">{notesToday}</span>
            <span className="text-xs font-medium text-muted">Notes on file</span>
          </span>
        </button>
        <button type="button" className="flex items-center gap-3 rounded-lg border border-border/50 bg-surface p-4 text-left shadow-(--shadow-card)" onClick={() => void nav({ to: "/incidents" })}>
          <span className={`${openIncidents.length ? "icon-red" : "icon-green"} grid size-10 place-items-center rounded-md text-primary-fg`}>
            <AlertTriangle size={18} />
          </span>
          <span>
            <span className="block text-xl font-bold">{openIncidents.length}</span>
            <span className="text-xs font-medium text-muted">Open Incidents</span>
          </span>
        </button>
      </div>
      <div className="mt-4 grid gap-4 lg:grid-cols-5">
        <Card className="lg:col-span-3">
          <div className="mb-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="icon-orange grid size-8 place-items-center rounded-md text-primary-fg">
                <CalendarDays size={16} />
              </span>
              <h2 className="font-semibold">Upcoming Shifts</h2>
            </div>
            <Link to={isMgr ? "/roster" : "/my-roster"} className="text-sm text-primary">
              Roster
            </Link>
          </div>
          <div className="space-y-2">
            {db.shifts
              .filter((s) => s.status === "scheduled" || s.status === "in_progress")
              .sort((a, b) => weekDays.indexOf(a.day) - weekDays.indexOf(b.day))
              .slice(0, 6)
              .map((s) => (
                <div key={s.id} className="flex items-center justify-between rounded-md p-2 hover:bg-bg">
                  <span>
                    <Link to={`/staff/${s.staffId}` as never} className="font-semibold hover:underline">
                      {db.staffName(s.staffId)}
                    </Link>
                    {" · "}
                    <Link to={`/clients/${s.clientId}` as never} className="hover:underline">
                      {db.clientName(s.clientId)}
                    </Link>
                    <span className="block text-xs text-muted">
                      {s.day} {s.window}
                    </span>
                  </span>
                  <Pill status={s.status}>{s.status}</Pill>
                </div>
              ))}
            {db.shifts.every((s) => s.status === "complete" || s.status === "off") ? (
              <p className="text-sm text-muted">No shifts left this week.</p>
            ) : null}
          </div>
        </Card>
        <Card className="lg:col-span-2">
          <div className="mb-3 flex items-center gap-2">
            <span className="icon-green grid size-8 place-items-center rounded-md text-primary-fg">
              <ShieldCheck size={16} />
            </span>
            <h2 className="font-semibold">Recent Activity</h2>
          </div>
          {db.checkins.map((c) => (
            <Link key={c.id} to="/check-in" className="flex items-center justify-between rounded-md p-2 hover:bg-bg">
              <span>
                <span className="block text-sm font-semibold">{db.staffName(c.staffId)}</span>
                <span className="text-xs text-muted">{db.clientName(c.clientId)} · in {displayClock(c.inAt)}{c.outAt ? ` · out ${displayClock(c.outAt)}` : ""}</span>
              </span>
              <Pill status={c.outAt ? "complete" : "ok"}>{c.outAt ? "out" : "on shift"}</Pill>
            </Link>
          ))}
          {isAdmin ? (
            <Link to="/tidy-up" className="mt-2 block text-sm font-semibold text-primary">
              Tidy up the floor
            </Link>
          ) : null}
        </Card>
      </div>
      <Card className="mt-4">
        <div className="mb-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="icon-teal grid size-8 place-items-center rounded-md text-primary-fg">
              <Heart size={16} />
            </span>
            <h2 className="font-semibold">Active Clients</h2>
          </div>
          <Link to="/clients" className="text-sm text-primary">
            All clients
          </Link>
        </div>
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {activeClients.map((c) => (
            <PersonLink key={c.id} href={`/clients/${c.id}`} name={c.name} meta={`${c.suburb} · ${c.plan}`} right={<Pill status={c.risk}>{c.risk}</Pill>} />
          ))}
        </div>
      </Card>
    </>
  );
}

export function ClientsScreen() {
  const { session } = useSession();
  const db = useLookups();
  const nav = useNavigate();
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const isMgr = canAccess(session?.role, "manager");
  const rows = db.clients.filter((c) => (c.name + c.suburb).toLowerCase().includes(q.toLowerCase()));
  return (
    <>
      <PageHead title="Clients" sub={isMgr ? "Active supports across metro Perth" : "Participants assigned to you"} actions={isMgr ? <Btn onClick={() => setOpen(true)}>Add client</Btn> : undefined} />
      <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search…" className="mb-3 max-w-xs" />
      <Card className="overflow-x-auto">
        <table className="w-full min-w-[640px] text-sm">
          <thead>
            <tr className="text-left text-[11px] tracking-wide text-muted uppercase">
              {["Name", "Suburb", "Plan", "Hrs", "Risk", "Status"].map((h) => (
                <th key={h} className="pb-2">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((c) => (
              <tr key={c.id} className="border-t border-border">
                <td className="py-3">
                  <Link to={`/clients/${c.id}` as never} className="font-semibold hover:underline">{c.name}</Link>
                </td>
                <td>{c.suburb}</td>
                <td>{c.plan}</td>
                <td>{c.hours}</td>
                <td><Pill status={c.risk}>{c.risk}</Pill></td>
                <td><Pill status={c.status}>{c.status}</Pill></td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
      {open && (
        <Modal title="Add client" onClose={() => setOpen(false)}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const fd = new FormData(e.currentTarget);
              const id = db.addClient({
                name: String(fd.get("name")),
                suburb: String(fd.get("suburb")),
                ndis: String(fd.get("ndis")),
                plan: String(fd.get("plan")),
                hours: Number(fd.get("hours") || 12),
                risk: (fd.get("risk") as "low") || "low",
                privacyConsent: fd.get("consent") === "on",
              });
              setOpen(false);
              void nav({ to: "/clients/$clientId", params: { clientId: id } });
            }}
          >
            <Field label="Name"><Input name="name" required /></Field>
            <Field label="Suburb"><Input name="suburb" required /></Field>
            <Field label="NDIS"><Input name="ndis" required /></Field>
            <Field label="Plan"><Input name="plan" required /></Field>
            <Field label="Hours"><Input name="hours" type="number" defaultValue={12} /></Field>
            <Field label="Risk">
              <Select name="risk" defaultValue="low">
                <option>low</option>
                <option>medium</option>
                <option>high</option>
              </Select>
            </Field>
            <PrivacyNotice variant="collect" />
            <label className="mb-3 flex items-start gap-2 text-sm">
              <input type="checkbox" name="consent" className="mt-0.5 size-4" required />
              <span>The participant or their guardian consents to collecting this sensitive information for supports, safety, and NDIS claiming.</span>
            </label>
            <Btn type="submit">Save and open</Btn>
          </form>
        </Modal>
      )}
    </>
  );
}

export function ClientDetailScreen({ clientId }: { clientId: string }) {
  const { session } = useSession();
  const db = useLookups();
  const [assign, setAssign] = useState(false);
  const c = db.clients.find((x) => x.id === clientId);
  if (!c) return <Missing what="client" back="/clients" />;
  const notes = db.notes.filter((n) => n.clientId === c.id);
  const incidents = db.incidents.filter((i) => i.clientId === c.id);
  const invoices = db.invoices.filter((i) => i.clientId === c.id);
  const plans = db.carePlans.filter((p) => p.clientId === c.id);
  const shifts = db.shifts.filter((s) => s.clientId === c.id);
  const reqs = db.requests.filter((r) => r.clientId === c.id);
  const coord = db.staff.find((s) => s.name === c.coordinator);
  const isAdmin = canAccess(session?.role, "admin");
  const isMgr = canAccess(session?.role, "manager");
  const unassigned = db.staff.filter((s) => !c.staffIds.includes(s.id) && s.role !== "client");
  return (
    <>
      <Crumb items={[{ to: "/clients", label: "Clients" }, { label: c.name }]} />
      <PageHead
        title={c.name}
        sub={`${c.suburb} · NDIS ${c.ndis} · ${c.plan}`}
        actions={
          <>
            <Btn to="/case-notes" search={{ add: "1", client: c.id }}>Add note</Btn>
            <Btn to="/incidents" search={{ add: "1", client: c.id }} variant="ghost">Report incident</Btn>
            {isMgr ? <Btn to="/clients/risk" variant="ghost">Risk register</Btn> : null}
          </>
        }
      />
      <div className="mb-4 flex flex-wrap items-center gap-2">
        <Pill status={c.status}>{c.status}</Pill>
        {isMgr ? (
          <Select
            className="h-9 w-40"
            aria-label="Risk level"
            value={c.risk}
            onChange={(e) => db.setClientRisk(c.id, e.target.value as "low" | "medium" | "high")}
          >
            <option value="low">low risk</option>
            <option value="medium">medium risk</option>
            <option value="high">high risk</option>
          </Select>
        ) : (
          <Pill status={c.risk}>{c.risk} risk</Pill>
        )}
        <span className="text-sm text-muted">{c.hours} hrs / week</span>
      </div>
      <p className="mb-4 text-xs leading-relaxed text-muted">
        The NDIS number is a government identifier, used only for the plan and claims. It is not the file number and it is not used for marketing.
        {c.privacyConsent ? ` Privacy consent is on file${c.consentAt ? ` (${c.consentAt})` : ""}.` : " Privacy consent is not on file yet — intake stays open until it is recorded."}
      </p>
      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <h2 className="mb-2 font-semibold">Care plan</h2>
          {plans.length > 0 ? (
            plans.map((plan) =>
              isMgr ? (
                <Link key={plan.id} to="/clients/care-plans" search={{ client: c.id } as never} className="mb-2 block rounded-md p-2 hover:bg-bg last:mb-0">
                  <p className="font-semibold">{plan.name}</p>
                  <p className="text-sm text-muted">{plan.goals.join(" · ")}</p>
                  <Pill status={plan.status}>{plan.status}</Pill>
                </Link>
              ) : (
                <div key={plan.id} className="mb-2 rounded-md p-2 last:mb-0">
                  <p className="font-semibold">{plan.name}</p>
                  <p className="text-sm text-muted">{plan.goals.join(" · ")}</p>
                  <Pill status={plan.status}>{plan.status}</Pill>
                </div>
              ),
            )
          ) : (
            <Empty title="No care plan" action={isMgr ? <Btn to="/clients/care-plans" search={{ add: "1", client: c.id }}>Open care plans</Btn> : undefined} />
          )}
        </Card>
        <Card>
          <div className="mb-2 flex items-center justify-between">
            <h2 className="font-semibold">Assigned staff</h2>
            {isMgr ? <Btn variant="ghost" onClick={() => setAssign(true)}>Assign</Btn> : null}
          </div>
          {c.staffIds.map((id) => {
            const s = db.staff.find((x) => x.id === id);
            if (!s) return null;
            return <PersonLink key={id} href={`/staff/${id}`} name={s.name} meta={s.title} />;
          })}
          <p className="mt-2 text-xs text-muted">
            Coordinator:{" "}
            {coord ? (
              <Link to={`/staff/${coord.id}` as never} className="font-semibold hover:underline">{coord.name}</Link>
            ) : (
              c.coordinator
            )}
          </p>
        </Card>
        <Card>
          <div className="mb-2 flex justify-between">
            <h2 className="font-semibold">Case notes</h2>
            <Link to="/case-notes" search={{ client: c.id } as never} className="text-sm text-primary">All notes</Link>
          </div>
          {notes.length === 0 ? <p className="text-sm text-muted">None yet.</p> : notes.map((n) => (
            <Link key={n.id} to={`/case-notes/${n.id}` as never} className="block rounded-md p-2 hover:bg-bg">
              <p className="text-xs text-muted">{n.date} · {db.staffName(n.staffId)}</p>
              <p className="text-sm">{n.body}</p>
            </Link>
          ))}
        </Card>
        <Card>
          <div className="mb-2 flex justify-between">
            <h2 className="font-semibold">Incidents</h2>
            <Link to="/incidents" search={{ client: c.id } as never} className="text-sm text-primary">All incidents</Link>
          </div>
          {incidents.length === 0 ? <p className="text-sm text-muted">None recorded.</p> : incidents.map((i) => (
            <Link key={i.id} to={`/incidents/${i.id}` as never} className="flex items-center justify-between rounded-md p-2 hover:bg-bg">
              <span className="text-sm">{i.summary}</span>
              <span className="flex gap-1">
                {i.reportable && i.status !== "closed" ? <Pill status="high">24h</Pill> : null}
                <Pill status={i.status}>{i.status}</Pill>
              </span>
            </Link>
          ))}
        </Card>
        <Card>
          <h2 className="mb-2 font-semibold">Roster this week</h2>
          {shifts.length === 0 ? (
            <Empty title="No shifts this week" action={isMgr ? <Btn to="/roster">Open roster</Btn> : <Btn to="/my-roster">My roster</Btn>} />
          ) : shifts.map((s) => (
            <Link key={s.id} to={(isMgr ? "/roster" : `/staff/${s.staffId}`) as never} className="flex justify-between rounded-md p-2 text-sm hover:bg-bg">
              <span>{s.day} {s.window} · {db.staffName(s.staffId)}</span>
              <Pill status={s.status}>{s.status}</Pill>
            </Link>
          ))}
        </Card>
        {isAdmin ? (
          <Card>
            <h2 className="mb-2 font-semibold">Invoices</h2>
            {invoices.map((i) => (
              <Link key={i.id} to={`/invoices/${i.id}` as never} className="flex justify-between rounded-md p-2 text-sm hover:bg-bg">
                <span>{i.number} · {i.period}</span>
                <Pill status={i.status}>{i.status}</Pill>
              </Link>
            ))}
            {invoices.length === 0 ? <Empty title="No invoices" action={<Btn to="/invoices">Invoice book</Btn>} /> : (
              <Link to="/financials" className="mt-2 inline-block text-sm text-primary">Financials</Link>
            )}
          </Card>
        ) : (
          <Card>
            <h2 className="mb-2 font-semibold">Hours</h2>
            {db.timesheets.filter((t) => t.clientId === c.id && (isMgr || t.staffId === session?.staffId)).map((t) => (
              <Link key={t.id} to={`/timesheets/${t.id}` as never} className="flex justify-between rounded-md p-2 text-sm hover:bg-bg">
                <span>{t.date} · {db.staffName(t.staffId)} · {t.hours}h</span>
                <Pill status={t.status}>{t.status}</Pill>
              </Link>
            ))}
            {isMgr ? (
              <Link to="/timesheets" search={{ client: c.id } as never} className="mt-2 inline-block text-sm text-primary">Timesheets</Link>
            ) : (
              <Link to="/my-timesheets" className="mt-2 inline-block text-sm text-primary">My timesheets</Link>
            )}
          </Card>
        )}
        <Card>
          <h2 className="mb-2 font-semibold">Requests</h2>
          {reqs.map((r) => (
            <Link key={r.id} to={`/requests/${r.id}` as never} className="flex justify-between rounded-md p-2 text-sm hover:bg-bg">
              <span>{r.title}</span>
              <Pill status={r.status}>{r.status}</Pill>
            </Link>
          ))}
          {reqs.length === 0 ? <Btn to="/requests" search={{ add: "1", client: c.id }} variant="ghost">Open requests</Btn> : null}
        </Card>
      </div>
      {assign && (
        <Modal title="Assign staff" onClose={() => setAssign(false)}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const fd = new FormData(e.currentTarget);
              db.assignStaff(c.id, String(fd.get("staffId")));
              setAssign(false);
            }}
          >
            <Field label="Worker">
              {unassigned.length === 0 ? (
                <p className="text-sm text-muted">Everyone on the team is already assigned.</p>
              ) : (
                <Select name="staffId">
                  {unassigned.map((s) => <option key={s.id} value={s.id}>{s.name} · {rosterHold(s) ?? s.title}</option>)}
                </Select>
              )}
            </Field>
            {unassigned.length === 0 ? null : <Btn type="submit">Assign</Btn>}
          </form>
        </Modal>
      )}
    </>
  );
}

export function CarePlansScreen() {
  const db = useLookups();
  const { session } = useSession();
  const nav = useNavigate();
  const search = useDeskSearch();
  const [open, setOpen] = useState(search.add === "1");
  const highlight = search.client;
  const isMgr = canAccess(session?.role, "manager");
  return (
    <>
      <PageHead title="Care plans" sub="Goals and approved supports" actions={<Btn onClick={() => setOpen(true)}>Add plan</Btn>} />
      <div className="grid gap-3">
        {db.carePlans.map((p) => {
          const c = db.clients.find((x) => x.id === p.clientId);
          return (
            <Card key={p.id} className={highlight === p.clientId ? "ring-2 ring-primary/30" : ""}>
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <Link to={`/clients/${p.clientId}` as never} className="font-semibold hover:underline">{c?.name}</Link>
                  <p className="text-sm">{p.name}</p>
                  <p className="text-sm text-muted">{p.goals.join(" · ")}</p>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <Pill status={p.status}>{p.status}</Pill>
                  {isMgr && p.status !== "active" ? <Btn onClick={() => db.setCarePlanStatus(p.id, "active")}>Activate</Btn> : null}
                  {isMgr && p.status === "active" ? <Btn variant="ghost" onClick={() => db.setCarePlanStatus(p.id, "review")}>Review</Btn> : null}
                </div>
              </div>
            </Card>
          );
        })}
      </div>
      {open && (
        <Modal title="Add care plan" onClose={() => setOpen(false)}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const fd = new FormData(e.currentTarget);
              const clientId = String(fd.get("clientId"));
              db.addCarePlan({
                clientId,
                name: String(fd.get("name")),
                status: "draft",
                goals: String(fd.get("goals")).split(",").map((g) => g.trim()).filter(Boolean),
                start: perthShortDateYear(),
              });
              setOpen(false);
              void nav({ to: "/clients/$clientId", params: { clientId } });
            }}
          >
            <Field label="Client">
              <Select name="clientId" defaultValue={search.client ?? db.clients[0]?.id}>
                {db.clients.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
              </Select>
            </Field>
            <Field label="Name"><Input name="name" required defaultValue="Support plan" /></Field>
            <Field label="Goals"><Input name="goals" placeholder="Comma separated" required /></Field>
            <Btn type="submit">Save and open client</Btn>
          </form>
        </Modal>
      )}
    </>
  );
}

export function RiskScreen() {
  const db = useLookups();
  const ranked = [...db.clients].sort((a, b) => ["low", "medium", "high"].indexOf(b.risk) - ["low", "medium", "high"].indexOf(a.risk));
  return (
    <>
      <PageHead title="Risk register" sub="Highest first. Open a person to act." />
      <Card>
        {ranked.map((c) => (
          <PersonLink key={c.id} href={`/clients/${c.id}`} name={c.name} meta={c.suburb} right={<Pill status={c.risk}>{c.risk}</Pill>} />
        ))}
      </Card>
    </>
  );
}

export function StaffScreen() {
  const db = useLookups();
  const nav = useNavigate();
  const [open, setOpen] = useState(false);
  return (
    <Guard min="manager">
      <PageHead title="Staff" sub="Workforce, screening and first aid" actions={<Btn onClick={() => setOpen(true)}>Add staff</Btn>} />
      <Card className="overflow-x-auto">
        <table className="w-full min-w-[720px] text-sm">
          <thead>
            <tr className="text-left text-[11px] tracking-wide text-muted uppercase">
              {["Name", "Title", "NDIS", "WWCC", "First aid", "Status"].map((h) => <th key={h} className="pb-2">{h}</th>)}
            </tr>
          </thead>
          <tbody>
            {db.staff.map((s) => (
              <tr key={s.id} className="border-t border-border">
                <td className="py-3"><Link to={`/staff/${s.id}` as never} className="font-semibold hover:underline">{s.name}</Link></td>
                <td>{s.title}</td>
                <td><Pill status={s.ndisScreening}>{s.ndisScreening}</Pill></td>
                <td><Pill status={s.wwcc}>{s.wwcc}</Pill></td>
                <td><Pill status={s.firstAid}>{s.firstAid}</Pill></td>
                <td><Pill status={s.status}>{s.status}</Pill></td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
      {open && (
        <Modal title="Add staff" onClose={() => setOpen(false)}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const fd = new FormData(e.currentTarget);
              const id = db.addStaff({
                name: String(fd.get("name")),
                email: String(fd.get("email")),
                phone: String(fd.get("phone")),
                title: String(fd.get("title") || "Support Worker"),
              });
              setOpen(false);
              void nav({ to: "/staff/$staffId", params: { staffId: id } });
            }}
          >
            <Field label="Name"><Input name="name" required /></Field>
            <Field label="Email"><Input name="email" type="email" required /></Field>
            <Field label="Phone"><Input name="phone" required /></Field>
            <Field label="Title"><Input name="title" defaultValue="Support Worker" /></Field>
            <Btn type="submit">Save and open</Btn>
          </form>
        </Modal>
      )}
    </Guard>
  );
}

export function StaffDetailScreen({ staffId }: { staffId: string }) {
  const { session } = useSession();
  const db = useLookups();
  const s = db.staff.find((x) => x.id === staffId);
  const isMgr = canAccess(session?.role, "manager");
  if (!s) return <Missing what="staff member" back={isMgr ? "/staff" : homeFor(session?.role)} />;
  const assigned = db.clients.filter((c) => c.staffIds.includes(s.id));
  const sheets = db.timesheets.filter((t) => t.staffId === s.id);
  const training = db.training.filter((t) => t.staffId === s.id);
  const shifts = db.shifts.filter((x) => x.staffId === s.id);
  const hold = rosterHold(s);
  const warn = rosterWarn(s);
  return (
    <>
      <Crumb items={[{ to: isMgr ? "/staff" : homeFor(session?.role), label: isMgr ? "Staff" : "Home" }, { label: s.name }]} />
      <PageHead
        title={s.name}
        sub={`${s.title} · ${s.phone}`}
        actions={
          <>
            {isMgr ? <Btn to="/staff/training">Training</Btn> : s.id === session?.staffId ? <Btn to="/my-compliance">My compliance</Btn> : <Btn to="/clients" variant="ghost">Clients</Btn>}
            {isMgr ? <Btn to="/staff/compliance" variant="ghost">Compliance</Btn> : null}
          </>
        }
      />
      <div className="mb-4 flex flex-wrap gap-2">
        <Pill status={s.status}>{s.status}</Pill>
        <Pill status={s.ndisScreening}>NDIS screening {s.ndisScreening}</Pill>
        <Pill status={s.wwcc}>WWCC {s.wwcc}</Pill>
        <Pill status={s.firstAid}>First aid {s.firstAid}</Pill>
      </div>
      <p className="mb-3 text-xs text-muted">NDIS screening {s.ndisScreeningExpiry} · WWCC {s.wwccExpiry} · First aid {s.firstAidExpiry}</p>
      {hold ? <p className="mb-3 text-sm text-bad">{hold}. Roster and check-in stay blocked until this is cleared.</p> : null}
      {!hold && warn ? <p className="mb-3 text-sm text-warn">{warn}. Still clear to work.</p> : null}
      {isMgr && (s.ndisScreening !== "ok" || s.wwcc !== "ok" || s.firstAid !== "ok" || s.status === "leave") ? (
        <div className="mb-4 flex flex-wrap gap-2">
          {s.status === "leave" ? <Btn onClick={() => db.setStaffStatus(s.id, "active")}>Return to work</Btn> : null}
          {s.ndisScreening !== "ok" ? <Btn variant="ghost" onClick={() => db.markClearance(s.id, "ndis")}>Mark NDIS screening current</Btn> : null}
          {s.wwcc !== "ok" ? <Btn variant="ghost" onClick={() => db.markClearance(s.id, "wwcc")}>Mark WWCC current</Btn> : null}
          {s.firstAid !== "ok" ? <Btn variant="ghost" onClick={() => db.markClearance(s.id, "firstAid")}>Mark first aid current</Btn> : null}
        </div>
      ) : null}
      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <h2 className="mb-2 font-semibold">Assigned clients</h2>
          {assigned.map((c) => <PersonLink key={c.id} href={`/clients/${c.id}`} name={c.name} meta={c.plan} />)}
          {assigned.length === 0 ? <p className="text-sm text-muted">No current assignments.</p> : null}
        </Card>
        <Card>
          <h2 className="mb-2 font-semibold">This week</h2>
          {shifts.map((x) => (
            <Link key={x.id} to={(isMgr ? "/roster" : `/clients/${x.clientId}`) as never} className="flex justify-between rounded-md p-2 text-sm hover:bg-bg">
              <span>{x.day} {x.window} · {db.clientName(x.clientId)}</span>
              <Pill status={x.status}>{x.status}</Pill>
            </Link>
          ))}
        </Card>
        <Card>
          <h2 className="mb-2 font-semibold">Timesheets</h2>
          {sheets.map((t) => (
            <Link key={t.id} to={`/timesheets/${t.id}` as never} className="flex justify-between rounded-md p-2 text-sm hover:bg-bg">
              <span>{t.date} {db.clientName(t.clientId)} · {t.hours}h</span>
              <Pill status={t.status}>{t.status}</Pill>
            </Link>
          ))}
        </Card>
        <Card>
          <h2 className="mb-2 font-semibold">Training</h2>
          {training.map((t) => (
            <div key={t.id} className="flex justify-between rounded-md p-2 text-sm">
              <span>{t.name} · {t.expiry}</span>
              <Pill status={t.status}>{t.status}</Pill>
            </div>
          ))}
        </Card>
      </div>
    </>
  );
}

export function SimpleLinkList({
  title,
  sub,
  min,
  rows,
}: {
  title: string;
  sub: string;
  min: Role;
  rows: { href: string; title: string; meta: string; status: string }[];
}) {
  return (
    <Guard min={min}>
      <PageHead title={title} sub={sub} />
      <Card>
        {rows.map((r) => (
          <Link key={r.href + r.title} to={r.href as never} className="flex items-center justify-between rounded-md p-2 hover:bg-bg">
            <span>
              <span className="block font-semibold">{r.title}</span>
              <span className="text-xs text-muted">{r.meta}</span>
            </span>
            <Pill status={r.status}>{r.status}</Pill>
          </Link>
        ))}
      </Card>
    </Guard>
  );
}

export function RosterScreen() {
  const db = useLookups();
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");
  const workers = db.staff.filter((s) => s.role === "support_worker" || s.role === "team_leader");
  const [staffId, setStaffId] = useState(workers[0]?.id ?? "");
  const picked = workers.find((s) => s.id === staffId);
  const hold = picked ? rosterHold(picked) : null;
  const warn = picked && !hold ? rosterWarn(picked) : null;
  const weekLabel = `${weekDays[0]} – ${weekDays[weekDays.length - 1]}`;
  return (
    <Guard min="manager">
      <PageHead title="Roster" sub={`Week of ${weekLabel} · Perth`} actions={<><Btn onClick={() => { setError(""); setOpen(true); }}>Add shift</Btn><Btn to="/check-in" variant="ghost">Live check-in</Btn></>} />
      <Card className="overflow-x-auto">
        <div className="grid min-w-[880px] gap-1" style={{ gridTemplateColumns: `110px repeat(${weekDays.length}, minmax(72px, 1fr))` }}>
          <div />
          {weekDays.map((d) => {
            const [weekday, ...rest] = d.split(" ");
            return (
              <div key={d} className="text-[11px] font-semibold leading-tight text-muted">
                <span className="block">{weekday}</span>
                <span className="block font-medium">{rest.join(" ")}</span>
              </div>
            );
          })}
          {workers.map((s) => (
            <Fragment key={s.id}>
              <Link to={`/staff/${s.id}` as never} className="pt-2 text-xs font-semibold hover:underline">
                {s.name.split(" ")[0]}
                {rosterHold(s) ? <span className="block text-[10px] font-medium text-bad">Not clear</span> : null}
              </Link>
              {weekDays.map((d) => {
                const cells = db.shifts.filter((x) => x.staffId === s.id && x.day === d);
                return (
                  <div key={s.id + d} className={`min-h-16 rounded-md border border-border p-1.5 text-[11px] ${cells.length ? "bg-bg" : ""}`}>
                    {cells.length ? (
                      cells.map((cell) => (
                        <Link key={cell.id} to={`/clients/${cell.clientId}` as never} className="mb-1 block rounded-sm bg-surface px-1 py-0.5 leading-tight last:mb-0 hover:underline">
                          <span className="block font-semibold">{db.clientName(cell.clientId).split(" ")[0]}</span>
                          <span className="block text-subtle">{cell.window}</span>
                        </Link>
                      ))
                    ) : (
                      <span className="text-subtle">off</span>
                    )}
                  </div>
                );
              })}
            </Fragment>
          ))}
        </div>
      </Card>
      {open && (
        <Modal title="Add shift" onClose={() => setOpen(false)}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const fd = new FormData(e.currentTarget);
              const result = db.addShift({
                staffId: String(fd.get("staffId")),
                clientId: String(fd.get("clientId")),
                day: String(fd.get("day")),
                window: String(fd.get("window") || "09–15"),
              });
              if ("error" in result) {
                setError(result.error);
                return;
              }
              setError("");
              setOpen(false);
            }}
          >
            <Field label="Worker">
              <Select name="staffId" value={staffId} onChange={(e) => { setStaffId(e.target.value); setError(""); }}>
                {workers.map((s) => <option key={s.id} value={s.id}>{s.name}{rosterHold(s) ? " · not clear" : ""}</option>)}
              </Select>
            </Field>
            {hold ? <p className="mb-3 text-sm text-bad">{hold}. They cannot be rostered until this is cleared.</p> : null}
            {warn ? <p className="mb-3 text-sm text-warn">{warn}. Still clear to roster.</p> : null}
            {error ? <p className="mb-3 text-sm text-bad">{error}</p> : null}
            <Field label="Client">
              <Select name="clientId" defaultValue={db.clients[0]?.id}>
                {db.clients.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
              </Select>
            </Field>
            <Field label="Day">
              <Select name="day" defaultValue={weekDays[0]}>
                {weekDays.map((d) => <option key={d}>{d}</option>)}
              </Select>
            </Field>
            <Field label="Window"><Input name="window" defaultValue="09–15" /></Field>
            <Btn type="submit" disabled={!!hold}>Save to roster</Btn>
          </form>
        </Modal>
      )}
    </Guard>
  );
}

export function CheckInScreen() {
  const { session } = useSession();
  const db = useLookups();
  const mine = session?.staffId;
  const isMgr = canAccess(session?.role, "manager");
  const open = db.checkins.filter((c) => !c.outAt);
  const [staffId, setStaffId] = useState(mine || db.staff[0]?.id || "s1");
  const [clientId, setClientId] = useState(db.clients[0]?.id ?? "c1");
  const [note, setNote] = useState("");
  const picked = db.staff.find((s) => s.id === staffId);
  const hold = picked ? rosterHold(picked) : null;
  const warn = picked && !hold ? rosterWarn(picked) : null;
  if (session?.role === "support_worker") return <WorkerCheckInScreen />;
  return (
    <>
      <PageHead title="Live check-in" sub="Who is on the floor right now" />
      {isMgr ? (
        <Card className="mb-3">
          <h2 className="mb-2 font-semibold">Start a shift</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            <Field label="Worker">
              <Select value={staffId} onChange={(e) => setStaffId(e.target.value)}>
                {db.staff.filter((s) => s.role !== "client").map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
              </Select>
            </Field>
            <Field label="Client">
              <Select value={clientId} onChange={(e) => setClientId(e.target.value)}>
                {db.clients.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
              </Select>
            </Field>
          </div>
          {hold ? <p className="mb-2 text-sm text-bad">{hold}. Check-in stays blocked until this is cleared.</p> : null}
          {warn ? <p className="mb-2 text-sm text-warn">{warn}. Still clear to work.</p> : null}
          {note ? <p className="mb-2 text-sm text-muted">{note}</p> : null}
          <Btn disabled={!!hold} onClick={() => setNote(db.checkIn(staffId, clientId) ?? `Checked in ${db.staffName(staffId)}.`)}>Check in now</Btn>
        </Card>
      ) : null}
      <div className="grid gap-3">
        {open.map((c) => (
          <Card key={c.id} className="flex flex-wrap items-center justify-between gap-3">
            <PersonLink href={`/staff/${c.staffId}`} name={db.staffName(c.staffId)} meta={`with ${db.clientName(c.clientId)} · in ${displayClock(c.inAt)}`} />
            <div className="flex gap-2">
              <Btn to={`/clients/${c.clientId}`}>Client</Btn>
              {isMgr || mine === c.staffId ? <Btn variant="ghost" onClick={() => db.checkOut(c.staffId)}>Check out</Btn> : null}
            </div>
          </Card>
        ))}
        {open.length === 0 ? (
          <Empty title="Nobody is checked in" action={<Btn to="/roster">Go to roster</Btn>} />
        ) : null}
      </div>
    </>
  );
}

export function TimesheetsScreen() {
  const { session } = useSession();
  const db = useLookups();
  const nav = useNavigate();
  const search = useDeskSearch();
  const [open, setOpen] = useState(search.add === "1");
  const canApprove = canAccess(session?.role, "manager");
  const worker = session?.role === "support_worker";
  const rows =
    session?.role === "support_worker" && session.staffId
      ? db.timesheets.filter((t) => t.staffId === session.staffId)
      : search.client
        ? db.timesheets.filter((t) => t.clientId === search.client)
        : db.timesheets;
  return (
    <>
      <PageHead title="Timesheets" sub="Approve hours before claiming" actions={<Btn onClick={() => setOpen(true)}>Log hours</Btn>} />
      <Card>
        {rows.map((t) => (
          <div key={t.id} className="flex flex-wrap items-center justify-between gap-2 border-b border-border py-3 last:border-0">
            <Link to={`/timesheets/${t.id}` as never} className="min-w-0">
              <span className="font-semibold">{db.staffName(t.staffId)}</span>
              {" · "}
              <span>{db.clientName(t.clientId)}</span>
              <p className="text-xs text-muted">{t.date} {t.start}–{t.end} · {t.hours}h</p>
            </Link>
            <div className="flex items-center gap-2">
              <Pill status={t.status}>{t.status}</Pill>
              {canApprove && t.status !== "approved" ? <Btn onClick={() => db.setTimesheetStatus(t.id, "approved")}>Approve</Btn> : null}
            </div>
          </div>
        ))}
        {rows.length === 0 ? <Empty title="No timesheets" action={<Btn onClick={() => setOpen(true)}>Log hours</Btn>} /> : null}
      </Card>
      {open && (
        <Modal title="Log hours" onClose={() => setOpen(false)}>
          <form
            onSubmit={(e: FormEvent<HTMLFormElement>) => {
              e.preventDefault();
              const fd = new FormData(e.currentTarget);
              const id = db.addTimesheet({
                staffId: String(fd.get("staffId") || session?.staffId || db.staff[0]?.id),
                clientId: String(fd.get("clientId")),
                date: String(fd.get("date")),
                start: String(fd.get("start")),
                end: String(fd.get("end")),
                hours: hoursBetween(String(fd.get("start")), String(fd.get("end"))),
                status: "submitted",
              });
              setOpen(false);
              void nav({ to: "/timesheets/$timesheetId", params: { timesheetId: id } });
            }}
          >
            <Field label="Worker">
              {worker ? (
                <>
                  <input type="hidden" name="staffId" value={session?.staffId ?? ""} />
                  <p className="text-sm font-semibold">{session?.name}</p>
                </>
              ) : (
                <Select name="staffId" defaultValue={session?.staffId ?? db.staff[0]?.id}>
                  {db.staff.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
                </Select>
              )}
            </Field>
            <Field label="Client">
              <Select name="clientId" defaultValue={search.client ?? db.clients[0]?.id}>
                {db.clients.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
              </Select>
            </Field>
            <Field label="Date"><Input name="date" defaultValue={perthShortDate()} /></Field>
            <Field label="Start"><Input name="start" defaultValue="07:00" /></Field>
            <Field label="End"><Input name="end" defaultValue="15:00" /></Field>
            <Btn type="submit">Submit</Btn>
          </form>
        </Modal>
      )}
    </>
  );
}

export function TimesheetDetailScreen({ timesheetId }: { timesheetId: string }) {
  const { session } = useSession();
  const db = useLookups();
  const t = db.timesheets.find((x) => x.id === timesheetId);
  if (!t) return <Missing what="timesheet" back="/timesheets" />;
  if (session?.role === "support_worker" && session.staffId && t.staffId !== session.staffId) {
    return <Missing what="timesheet" back="/my-timesheets" />;
  }
  const related = db.invoices.filter((i) => i.timesheetIds.includes(t.id));
  const canApprove = canAccess(session?.role, "manager");
  const isAdmin = canAccess(session?.role, "admin");
  return (
    <>
      <Crumb items={[{ to: "/timesheets", label: "Timesheets" }, { label: `${t.date} ${t.hours}h` }]} />
      <PageHead title={`${db.staffName(t.staffId)} · ${t.hours}h`} sub={`${t.date} ${t.start}–${t.end}`} />
      <Card>
        <Pill status={t.status}>{t.status}</Pill>
        <div className="mt-4 flex flex-wrap gap-2">
          <Btn to={`/staff/${t.staffId}`}>Worker</Btn>
          <Btn to={`/clients/${t.clientId}`} variant="ghost">Client file</Btn>
          {canApprove && t.status !== "approved" ? <Btn onClick={() => db.setTimesheetStatus(t.id, "approved")}>Approve</Btn> : null}
          {isAdmin ? <Btn to="/invoices" variant="ghost">Invoices</Btn> : null}
        </div>
      </Card>
      {isAdmin ? (
        <Card className="mt-4">
          <h2 className="mb-2 font-semibold">Claimed on</h2>
          {related.length === 0 ? <p className="text-sm text-muted">Not on a claim yet. Approve the hours, then pull them onto an invoice.</p> : related.map((i) => (
            <Link key={i.id} to={`/invoices/${i.id}` as never} className="flex justify-between py-2 text-sm">
              <span>{i.number} · {i.period}</span>
              <Pill status={i.status}>{i.status}</Pill>
            </Link>
          ))}
        </Card>
      ) : null}
    </>
  );
}

export function NotesScreen() {
  const { session } = useSession();
  const db = useLookups();
  const nav = useNavigate();
  const search = useDeskSearch();
  const [open, setOpen] = useState(search.add === "1");
  const rows = search.client ? db.notes.filter((n) => n.clientId === search.client) : db.notes;
  return (
    <>
      <PageHead title="Case notes" sub="Shift records ready for audit" actions={<Btn onClick={() => setOpen(true)}>Add note</Btn>} />
      <div className="grid gap-3">
        {rows.map((n) => (
          <Link key={n.id} to={`/case-notes/${n.id}` as never} className="block">
            <Card>
              <div className="flex justify-between gap-2">
                <span className="font-semibold">{db.clientName(n.clientId)}</span>
                <span className="text-xs text-muted">{n.date} · {n.shift}</span>
              </div>
              <p className="mt-2 text-sm">{n.body}</p>
              <p className="mt-2 text-xs text-muted">Logged by {db.staffName(n.staffId)} · {n.visibleToClient ? "Shared with portal" : "Staff only"}</p>
            </Card>
          </Link>
        ))}
        {rows.length === 0 ? <Empty title="No notes yet" action={<Btn onClick={() => setOpen(true)}>Add note</Btn>} /> : null}
      </div>
      {open && (
        <Modal title="Add case note" onClose={() => setOpen(false)}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const fd = new FormData(e.currentTarget);
              const id = db.addNote({
                clientId: String(fd.get("clientId")),
                staffId: session?.staffId || db.staff[0]?.id || "",
                date: perthShortDateYear(),
                shift: String(fd.get("shift") || "today"),
                body: String(fd.get("body")),
                kind: "daily care",
                visibleToClient: fd.get("share") === "on",
              });
              setOpen(false);
              void nav({ to: "/case-notes/$noteId", params: { noteId: id } });
            }}
          >
            <Field label="Client">
              <Select name="clientId" defaultValue={search.client ?? db.clients[0]?.id}>{db.clients.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}</Select>
            </Field>
            <Field label="Shift window"><Input name="shift" defaultValue="07:00–15:00" /></Field>
            <Field label="Note"><Textarea name="body" rows={4} required /></Field>
            <label className="mb-3 flex items-start gap-2 text-sm">
              <input type="checkbox" name="share" className="mt-0.5 size-4" />
              <span>Share with the participant’s portal. Leave off for staff-only observations.</span>
            </label>
            <Btn type="submit">Save and open</Btn>
          </form>
        </Modal>
      )}
    </>
  );
}

export function NoteDetailScreen({ noteId }: { noteId: string }) {
  const db = useLookups();
  const n = db.notes.find((x) => x.id === noteId);
  if (!n) return <Missing what="note" back="/case-notes" />;
  return (
    <>
      <Crumb items={[{ to: "/case-notes", label: "Case notes" }, { label: n.date }]} />
      <PageHead title={db.clientName(n.clientId)} sub={`${n.date} · ${n.shift} · ${db.staffName(n.staffId)}`} />
      <Card>
        <p>{n.body}</p>
        <p className="mt-3 text-xs text-muted">{n.visibleToClient ? "Shared with the participant’s portal." : "Staff only — not shown in the portal."}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          <Btn to={`/clients/${n.clientId}`}>Client file</Btn>
          <Btn to={`/staff/${n.staffId}`} variant="ghost">Worker</Btn>
          <Btn to="/ask-maureen" variant="ghost">Ask Maureen</Btn>
        </div>
      </Card>
    </>
  );
}

export function IncidentsScreen() {
  const { session } = useSession();
  const db = useLookups();
  const nav = useNavigate();
  const search = useDeskSearch();
  const [open, setOpen] = useState(search.add === "1");
  const rows = search.client ? db.incidents.filter((i) => i.clientId === search.client) : db.incidents;
  return (
    <>
      <PageHead title="Incidents" sub="Follow-up, including 24-hour NDIS Commission notices" actions={<Btn onClick={() => setOpen(true)}>Report</Btn>} />
      <div className="grid gap-3">
        {rows.map((i) => (
          <Link key={i.id} to={`/incidents/${i.id}` as never}>
            <Card className="flex items-start justify-between gap-3">
              <div>
                <p className="font-semibold">{db.clientName(i.clientId)}</p>
                <p className="text-sm">{i.summary}</p>
                <p className="text-xs text-muted">{i.when} · {db.staffName(i.staffId)}</p>
              </div>
              <span className="flex flex-col items-end gap-1">
                {i.reportable && i.status !== "closed" ? <Pill status="high">24h notice</Pill> : null}
                <Pill status={i.status}>{i.status}</Pill>
              </span>
            </Card>
          </Link>
        ))}
        {rows.length === 0 ? <Empty title="No incidents" action={<Btn onClick={() => setOpen(true)}>Report</Btn>} /> : null}
      </div>
      {open && (
        <Modal title="Report incident" onClose={() => setOpen(false)}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const fd = new FormData(e.currentTarget);
              const id = db.addIncident({
                clientId: String(fd.get("clientId")),
                staffId: session?.staffId || db.staff[0]?.id || "",
                severity: (String(fd.get("severity")) as "low" | "moderate" | "high") || "low",
                status: "open",
                reportable: fd.get("reportable") === "on",
                when: perthNow(),
                summary: String(fd.get("summary")),
                followUp: fd.get("reportable") === "on"
                  ? "Notify the NDIS Commission within 24 hours. This demo records the flag and does not lodge the notice."
                  : "Awaiting manager review.",
              });
              setOpen(false);
              void nav({ to: "/incidents/$incidentId", params: { incidentId: id } });
            }}
          >
            <Field label="Client">
              <Select name="clientId" defaultValue={search.client ?? db.clients[0]?.id}>{db.clients.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}</Select>
            </Field>
            <Field label="Severity">
              <Select name="severity"><option>low</option><option>moderate</option><option>high</option></Select>
            </Field>
            <Field label="Summary"><Textarea name="summary" rows={3} required /></Field>
            <label className="mb-3 flex items-start gap-2 text-sm">
              <input type="checkbox" name="reportable" className="mt-0.5 size-4" />
              <span>Reportable to the NDIS Commission within 24 hours — death, serious injury, abuse or neglect, unlawful contact, sexual misconduct, or an unauthorised restrictive practice.</span>
            </label>
            <Btn type="submit">Save and open</Btn>
          </form>
        </Modal>
      )}
    </>
  );
}

export function IncidentDetailScreen({ incidentId }: { incidentId: string }) {
  const { session } = useSession();
  const db = useLookups();
  const i = db.incidents.find((x) => x.id === incidentId);
  if (!i) return <Missing what="incident" back="/incidents" />;
  const canClose = session?.role !== "support_worker";
  return (
    <>
      <Crumb items={[{ to: "/incidents", label: "Incidents" }, { label: db.clientName(i.clientId) }]} />
      <PageHead title={db.clientName(i.clientId)} sub={`${i.when} · ${i.severity}${i.reportable ? " · reportable" : ""}`} />
      <Card>
        <div className="flex flex-wrap gap-2">
          <Pill status={i.status}>{i.status}</Pill>
          {i.reportable ? <Pill status="high">24h notice</Pill> : null}
        </div>
        <p className="mt-3">{i.summary}</p>
        <p className="mt-2 text-sm text-muted">{i.followUp}</p>
        {canClose ? (
          <form
            className="mt-3"
            onSubmit={(e) => {
              e.preventDefault();
              db.setIncidentFollowUp(i.id, String(new FormData(e.currentTarget).get("followUp") || ""));
            }}
          >
            <Field label="Update follow-up">
              <Textarea name="followUp" defaultValue={i.followUp} rows={2} />
            </Field>
            <Btn type="submit">Save follow-up</Btn>
          </form>
        ) : null}
        <p className="mt-3 text-xs leading-relaxed text-muted">
          {i.reportable
            ? "Reportable incidents are notified to the NDIS Commission within 24 hours of key personnel becoming aware. Aged care SIRS Priority 1 incidents follow the same 24-hour clock. This demo records the flag only — it does not lodge the notice."
            : "Not marked reportable. A death, serious injury, abuse or neglect, unlawful contact, sexual misconduct, or unauthorised restrictive practice must be notified to the NDIS Commission within 24 hours."}
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <Btn to={`/clients/${i.clientId}`}>Client file</Btn>
          <Btn to={`/staff/${i.staffId}`} variant="ghost">Reporter</Btn>
          {canClose && i.status === "open" ? <Btn variant="ghost" onClick={() => db.setIncidentStatus(i.id, "investigating")}>Investigate</Btn> : null}
          {canClose && i.status !== "closed" ? <Btn onClick={() => db.setIncidentStatus(i.id, "closed")}>Close incident</Btn> : null}
        </div>
      </Card>
    </>
  );
}

export function InvoicesScreen() {
  const db = useLookups();
  const nav = useNavigate();
  const [open, setOpen] = useState(false);
  return (
    <Guard min="admin">
      <PageHead title="Invoices" sub="NDIS claiming book" actions={<><Btn onClick={() => setOpen(true)}>Draft invoice</Btn><Btn to="/financials" variant="ghost">Financials</Btn></>} />
      <Card>
        {db.invoices.map((i) => (
          <Link key={i.id} to={`/invoices/${i.id}` as never} className="flex items-center justify-between border-b border-border py-3 last:border-0">
            <span>
              <span className="font-semibold">{i.number}</span>
              <span className="block text-xs text-muted">{db.clientName(i.clientId)} · {i.period}</span>
            </span>
            <span className="flex items-center gap-2">
              <span className="tabular-nums">{money(i.amount)}</span>
              <Pill status={i.status}>{i.status}</Pill>
            </span>
          </Link>
        ))}
      </Card>
      {open && (
        <Modal title="Draft invoice" onClose={() => setOpen(false)}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const fd = new FormData(e.currentTarget);
              const id = db.addInvoice({
                clientId: String(fd.get("clientId")),
                amount: Number(fd.get("amount") || 0),
                status: "draft",
                period: String(fd.get("period") || "Oct 2026"),
                timesheetIds: [],
              });
              setOpen(false);
              void nav({ to: "/invoices/$invoiceId", params: { invoiceId: id } });
            }}
          >
            <Field label="Client">
              <Select name="clientId">{db.clients.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}</Select>
            </Field>
            <Field label="Period"><Input name="period" defaultValue="Oct 2026" /></Field>
            <Field label="Amount"><Input name="amount" type="number" defaultValue={0} /></Field>
            <Btn type="submit">Save and open</Btn>
          </form>
        </Modal>
      )}
    </Guard>
  );
}

export function InvoiceDetailScreen({ invoiceId }: { invoiceId: string }) {
  const db = useLookups();
  const [pullNote, setPullNote] = useState("");
  const i = db.invoices.find((x) => x.id === invoiceId);
  if (!i) return <Missing what="invoice" back="/invoices" />;
  const linked = db.timesheets.filter((t) => i.timesheetIds.includes(t.id));
  return (
    <Guard min="admin">
      <Crumb items={[{ to: "/invoices", label: "Invoices" }, { label: i.number }]} />
      <PageHead title={i.number} sub={`${db.clientName(i.clientId)} · ${i.period}`} />
      <Card>
        <p className="text-3xl font-semibold tabular-nums">{money(i.amount)}</p>
        <p className="mt-2 text-xs leading-relaxed text-muted">{CLAIM_NOTE}</p>
        <div className="mt-3"><Pill status={i.status}>{i.status}</Pill></div>
        {pullNote ? <p className="mt-2 text-sm text-muted">{pullNote}</p> : null}
        <div className="mt-4 flex flex-wrap gap-2">
          <Btn to={`/clients/${i.clientId}`}>Client file</Btn>
          <Btn to="/timesheets" search={{ client: i.clientId }} variant="ghost">Timesheets</Btn>
          <Btn variant="ghost" onClick={() => {
            const pulled = db.attachApprovedHours(i.id);
            setPullNote(pulled.count
              ? `Attached ${pulled.count} approved timesheet${pulled.count === 1 ? "" : "s"} · ${money(pulled.amount)}.`
              : "No unclaimed approved hours for this client.");
          }}>Pull approved hours</Btn>
          {i.status === "draft" ? <Btn onClick={() => db.setInvoiceStatus(i.id, "sent")}>Mark sent</Btn> : null}
          {i.status === "sent" ? <Btn onClick={() => db.setInvoiceStatus(i.id, "paid")}>Mark paid</Btn> : null}
        </div>
      </Card>
      <Card className="mt-4">
        <h2 className="mb-2 font-semibold">Claimed hours</h2>
        {linked.length === 0 ? <p className="text-sm text-muted">None attached. Pull approved hours from the client book.</p> : linked.map((t) => (
          <Link key={t.id} to={`/timesheets/${t.id}` as never} className="flex justify-between py-2 text-sm">
            <span>{t.date} · {db.staffName(t.staffId)} · {t.hours}h</span>
            <Pill status={t.status}>{t.status}</Pill>
          </Link>
        ))}
      </Card>
    </Guard>
  );
}

export function MaureenScreen() {
  const { session } = useSession();
  const db = useLookups();
  const [q, setQ] = useState("");
  const [msgs, setMsgs] = useState<{ who: "you" | "maureen"; text: string; href?: string }[]>([
    { who: "maureen", text: "Ask about a person, roster, incidents, hours, or invoices. I will open the record." },
  ]);
  const send = () => {
    const text = q.trim();
    if (!text) return;
    const lower = text.toLowerCase();
    const open = db.incidents.filter((i) => i.status !== "closed");
    const client = db.clients.find((c) => lower.includes(c.name.toLowerCase()) || lower.includes(c.name.split(" ")[0].toLowerCase()));
    const staff = db.staff.find((s) => lower.includes(s.name.toLowerCase()) || lower.includes(s.name.split(" ")[0].toLowerCase()));
    const role = session?.role;
    let reply = `${open.length} open incident(s), ${db.timesheets.filter((t) => t.status !== "approved").length} timesheets waiting.`;
    let href = role === "admin" ? "/tidy-up" : role === "support_worker" ? "/worker" : "/home";
    if (client) {
      reply = `${client.name} — ${client.suburb}, ${client.plan}, ${client.hours} hrs. ${client.goals}`;
      href = `/clients/${client.id}`;
    } else if (staff) {
      reply = `${staff.name} · ${staff.title}. NDIS screening ${staff.ndisScreening}, WWCC ${staff.wwcc}, first aid ${staff.firstAid}.`;
      href = `/staff/${staff.id}`;
    } else if (lower.includes("roster") || lower.includes("shift")) {
      const live = db.shifts.filter((s) => s.status === "in_progress" || s.status === "scheduled").slice(0, 4);
      reply = live.length
        ? live.map((s) => `${db.staffName(s.staffId).split(" ")[0]} with ${db.clientName(s.clientId).split(" ")[0]} ${s.day} ${s.window} (${s.status.replace("_", " ")})`).join(". ")
        : "No shifts loaded this week.";
      href = role === "support_worker" ? "/my-roster" : "/roster";
    } else if (lower.includes("incident")) {
      reply = open[0] ? `${db.clientName(open[0].clientId)}: ${open[0].summary}` : "No open incidents.";
      href = open[0] ? `/incidents/${open[0].id}` : "/incidents";
    } else if (lower.includes("timesheet") || lower.includes("hour")) {
      reply = `${db.timesheets.filter((t) => t.status !== "approved").length} timesheets still need approval.`;
      href = role === "support_worker" ? "/my-timesheets" : "/timesheets";
    } else if (lower.includes("invoice") || lower.includes("claim")) {
      if (!canAccess(role, "admin")) {
        reply = "The invoice book is on the admin desk.";
        href = role === "support_worker" ? "/worker" : "/home";
      } else {
        reply = `${db.invoices.filter((i) => i.status !== "paid").length} invoices not yet paid.`;
        href = "/invoices";
      }
    } else if (lower.includes("request")) {
      reply = db.requests[0] ? db.requests[0].title : "No open requests.";
      href = db.requests[0] ? `/requests/${db.requests[0].id}` : "/requests";
    } else if (lower.includes("wwcc") || lower.includes("training") || lower.includes("compliance")) {
      reply = "NDIS Worker Screening, WWCC and first aid sit on each staff file. Expired clearance or leave blocks the roster.";
      href = role === "support_worker" ? "/my-compliance" : "/compliance";
    } else if (lower.includes("onboard")) {
      const pending = db.onboarding.find((o) => o.subjectType === "client" && o.status === "pending");
      reply = pending ? `${db.clientName(pending.subjectId)} still has intake tasks open.` : "No open intake tasks.";
      href = canAccess(role, "manager") ? "/onboarding" : pending ? `/clients/${pending.subjectId}` : "/clients";
    }
    setMsgs((m) => [...m, { who: "you", text }, { who: "maureen", text: reply, href }]);
    setQ("");
  };
  return (
    <>
      <PageHead title="Ask Maureen" sub="Operations assistant — answers include a live link" />
      <Card>
        <div className="mb-4 flex items-center gap-3">
          <img src="/brand/maureen.png" alt="" className="size-12 rounded-full border-2 border-primary/20 object-cover" />
          <div>
            <p className="text-sm font-bold text-primary">Maureen</p>
            <p className="text-xs text-muted">Ask about a person, roster, incidents, hours, or invoices.</p>
          </div>
        </div>
        <div className="space-y-2">
          {msgs.map((m, i) => (
            <div key={i} className={`rounded-md p-3 text-sm ${m.who === "maureen" ? "bg-primary-soft/60" : "border border-border"}`}>
              <p>{m.text}</p>
              {m.href ? <Link to={m.href as never} className="mt-1 inline-block text-primary">Open record</Link> : null}
            </div>
          ))}
        </div>
        <div className="mt-4 flex gap-2">
          <Input value={q} onChange={(e) => setQ(e.target.value)} onKeyDown={(e) => e.key === "Enter" && send()} placeholder="Ask about Robert, Emma, roster, incidents…" />
          <Btn onClick={send}>Send</Btn>
        </div>
      </Card>
    </>
  );
}

export function AnalyticsScreen() {
  const db = useLookups();
  const hours = db.timesheets.reduce((s, t) => s + t.hours, 0);
  const fill = Math.round((db.timesheets.filter((t) => t.status !== "draft").length / Math.max(db.timesheets.length, 1)) * 100);
  const unclaimed = db.invoices.filter((i) => i.status !== "paid").reduce((s, i) => s + i.amount, 0);
  const rows = db.clients.map((c) => {
    const booked = db.timesheets.filter((t) => t.clientId === c.id).reduce((s, t) => s + t.hours, 0);
    return { id: c.id, name: c.name, booked, plan: c.hours };
  });
  const max = Math.max(1, ...rows.map((r) => Math.max(r.booked, r.plan)));
  return (
    <Guard min="admin">
      <PageHead title="Analytics" sub="Utilisation against the plan" actions={<Btn to="/reports" variant="ghost">Reports</Btn>} />
      <div className="grid gap-3 sm:grid-cols-3">
        <Card>
          <p className="text-3xl font-semibold">{fill}%</p>
          <p className="text-sm text-muted">Timesheets past draft</p>
          <Link to={"/timesheets" as never} className="text-sm text-primary">Timesheets</Link>
        </Card>
        <Card>
          <p className="text-3xl font-semibold">{hours}h</p>
          <p className="text-sm text-muted">Hours in the book</p>
          <Link to="/roster" className="text-sm text-primary">Roster</Link>
        </Card>
        <Card>
          <p className="text-3xl font-semibold">{money(unclaimed)}</p>
          <p className="text-sm text-muted">Unpaid</p>
          <Link to="/invoices" className="text-sm text-primary">Invoices</Link>
        </Card>
      </div>
      <Card className="mt-4">
        <h2 className="mb-3 font-semibold">Hours booked vs plan</h2>
        <div className="space-y-3">
          {rows.map((r) => (
            <Link key={r.id} to={`/clients/${r.id}` as never} className="block">
              <div className="mb-1 flex justify-between text-sm">
                <span className="font-semibold">{r.name}</span>
                <span className="text-muted">{r.booked}h booked · {r.plan}h plan</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-bg">
                <div className="h-full rounded-full bg-primary" style={{ width: `${Math.round((r.booked / max) * 100)}%` }} />
              </div>
            </Link>
          ))}
        </div>
      </Card>
    </Guard>
  );
}

export function FinancialsScreen() {
  const db = useLookups();
  const total = db.invoices.reduce((s, i) => s + i.amount, 0);
  return (
    <Guard min="admin">
      <PageHead title="Financials" sub={`Book total ${money(total)}`} actions={<Btn to="/invoices">Invoices</Btn>} />
      <Card>
        {db.clients.map((c) => {
          const inv = db.invoices.filter((i) => i.clientId === c.id);
          const sum = inv.reduce((s, i) => s + i.amount, 0);
          return (
            <div key={c.id} className="flex flex-wrap items-center justify-between gap-2 border-b border-border py-3 last:border-0">
              <Link to={`/clients/${c.id}` as never} className="font-semibold hover:underline">{c.name}</Link>
              <span className="flex flex-wrap items-center gap-2">
                {inv.map((i) => (
                  <Link key={i.id} to={`/invoices/${i.id}` as never} className="text-sm text-primary hover:underline">{i.number}</Link>
                ))}
              <span className="tabular-nums">{money(sum)}</span>
              </span>
            </div>
          );
        })}
      </Card>
    </Guard>
  );
}

export function ReportsScreen() {
  const db = useLookups();
  const openIncidents = db.incidents.filter((i) => i.status !== "closed");
  const waiting = db.timesheets.filter((t) => t.status !== "approved");
  const expiring = db.staff.filter((s) => s.wwcc !== "ok" || s.firstAid !== "ok" || s.ndisScreening !== "ok");
  const unpaid = db.invoices.filter((i) => i.status !== "paid");
  return (
    <Guard min="admin">
      <PageHead
        title="Reports"
        sub={`${db.org?.name ?? "Carters Care"} · ${perthDate()}`}
        actions={<button type="button" className="no-print inline-flex min-h-11 items-center rounded-md border border-border bg-surface px-3.5 text-sm font-semibold" onClick={() => window.print()}>Print pack</button>}
      />
      <div className="grid gap-3 sm:grid-cols-2">
        <Card>
          <div className="mb-2 flex items-center justify-between">
            <h2 className="font-semibold">Utilisation</h2>
            <Link to="/analytics" className="text-sm text-primary">Analytics</Link>
          </div>
          <p className="text-sm">{db.timesheets.reduce((s, t) => s + t.hours, 0)} hours on file. {waiting.length} still need approval.</p>
          {waiting.slice(0, 4).map((t) => (
            <Link key={t.id} to={`/timesheets/${t.id}` as never} className="mt-2 block text-sm hover:underline">
              {db.staffName(t.staffId)} · {db.clientName(t.clientId)} · {t.hours}h
            </Link>
          ))}
        </Card>
        <Card>
          <div className="mb-2 flex items-center justify-between">
            <h2 className="font-semibold">Compliance</h2>
            <Link to="/compliance" className="text-sm text-primary">Register</Link>
          </div>
          {expiring.length === 0 ? <p className="text-sm text-muted">Screening, WWCC and first aid are current.</p> : expiring.map((s) => (
            <Link key={s.id} to={`/staff/${s.id}` as never} className="mt-2 flex justify-between text-sm hover:underline">
              <span>{s.name}</span>
              <span className="text-muted">NDIS {s.ndisScreening} · WWCC {s.wwcc} · aid {s.firstAid}</span>
            </Link>
          ))}
        </Card>
        <Card>
          <div className="mb-2 flex items-center justify-between">
            <h2 className="font-semibold">Incidents</h2>
            <Link to="/incidents" className="text-sm text-primary">Log</Link>
          </div>
          {openIncidents.length === 0 ? <p className="text-sm text-muted">None open.</p> : openIncidents.map((i) => (
            <Link key={i.id} to={`/incidents/${i.id}` as never} className="mt-2 block text-sm hover:underline">
              {db.clientName(i.clientId)} · {i.status}
            </Link>
          ))}
        </Card>
        <Card>
          <div className="mb-2 flex items-center justify-between">
            <h2 className="font-semibold">Claims</h2>
            <Link to="/financials" className="text-sm text-primary">Financials</Link>
          </div>
          <p className="text-sm">{money(unpaid.reduce((s, i) => s + i.amount, 0))} not yet paid.</p>
          {unpaid.map((i) => (
            <Link key={i.id} to={`/invoices/${i.id}` as never} className="mt-2 block text-sm hover:underline">
              {i.number} · {db.clientName(i.clientId)} · {money(i.amount)}
            </Link>
          ))}
        </Card>
      </div>
    </Guard>
  );
}

export function SettingsScreen() {
  const db = useLookups();
  const base = db.org ?? {
    name: "Carters Care Group",
    phone: "1800 CARTERS",
    email: "hello@carterscare.com.au",
    abn: "61 448 220 193",
    region: "Perth metro · Australia/Perth",
  };
  const [org, setOrg] = useState(base);
  const [saved, setSaved] = useState(false);
  return (
    <Guard min="admin">
      <PageHead title="Settings" sub={org.region} />
      <div className="grid gap-3 sm:grid-cols-2">
        <Card>
          <h2 className="font-semibold">Organisation</h2>
          <p className="mb-3 text-sm text-muted">Shown on reports and the client portal.</p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              db.setOrg(org);
              setSaved(true);
            }}
          >
            <Field label="Name"><Input value={org.name} onChange={(e) => { setOrg({ ...org, name: e.target.value }); setSaved(false); }} required /></Field>
            <Field label="Phone"><Input value={org.phone} onChange={(e) => { setOrg({ ...org, phone: e.target.value }); setSaved(false); }} required /></Field>
            <Field label="Email"><Input type="email" value={org.email} onChange={(e) => { setOrg({ ...org, email: e.target.value }); setSaved(false); }} required /></Field>
            <Field label="ABN"><Input value={org.abn} onChange={(e) => { setOrg({ ...org, abn: e.target.value }); setSaved(false); }} required /></Field>
            <div className="flex items-center gap-3">
              <Btn type="submit">Save organisation</Btn>
              {saved ? <span className="text-sm text-ok">Saved</span> : null}
            </div>
          </form>
        </Card>
        <Card>
          <h2 className="font-semibold">Desks</h2>
          <p className="mb-3 text-sm text-muted">Admin work that still needs a human.</p>
          <div className="flex flex-wrap gap-2">
            <Btn to="/tidy-up">Tidy up</Btn>
            <Btn to="/invoices" variant="ghost">Invoices</Btn>
            <Btn to="/reports" variant="ghost">Reports</Btn>
          </div>
        </Card>
        <Card>
          <h2 className="font-semibold">Demo data</h2>
          <p className="mb-3 text-sm text-muted">Reset deletes the local record on this browser, including organisation details, and restores the seed set. Do not store a real participant here.</p>
          <Btn variant="ghost" onClick={() => { db.reset(); setOrg(seed.org); setSaved(false); }}>Reset demo data</Btn>
        </Card>
        <Card className="sm:col-span-2">
          <h2 className="font-semibold">Privacy</h2>
          <div className="mt-2">
            <PrivacyNotice variant="full" />
          </div>
          <div className="mt-3">
            <Btn to="/compliance" variant="ghost">Compliance desk</Btn>
          </div>
        </Card>
      </div>
    </Guard>
  );
}

export function TidyUpScreen() {
  const db = useLookups();
  const items = [
    ...db.timesheets.filter((t) => t.status !== "approved").map((t) => ({ href: `/timesheets/${t.id}`, title: `Timesheet ${db.staffName(t.staffId)}`, status: t.status })),
    ...db.incidents.filter((i) => i.status !== "closed").map((i) => ({ href: `/incidents/${i.id}`, title: `Incident ${db.clientName(i.clientId)}`, status: i.status })),
    ...db.staff.filter((s) => s.firstAid !== "ok" || s.wwcc !== "ok" || s.ndisScreening !== "ok").map((s) => ({ href: `/staff/${s.id}`, title: `Clearance ${s.name}`, status: s.firstAid !== "ok" ? s.firstAid : s.wwcc !== "ok" ? s.wwcc : s.ndisScreening })),
    ...db.incidents.filter((i) => i.reportable && i.status !== "closed").map((i) => ({ href: `/incidents/${i.id}`, title: `24h notice ${db.clientName(i.clientId)}`, status: "high" })),
    ...db.invoices.filter((i) => i.status === "draft").map((i) => ({ href: `/invoices/${i.id}`, title: i.number, status: i.status })),
    ...db.onboarding.filter((o) => o.status === "pending").map((o) => ({ href: o.subjectType === "client" ? `/clients/${o.subjectId}` : `/staff/${o.subjectId}`, title: o.name, status: o.status })),
    ...db.requests.filter((r) => r.status !== "resolved").map((r) => ({ href: `/requests/${r.id}`, title: r.title, status: r.status })),
  ];
  return (
    <Guard min="admin">
      <PageHead title="Tidy up" sub="Every flag opens the record that owns it" />
      <Card>
        {items.map((it, i) => (
          <Link key={i} to={it.href as never} className="flex justify-between rounded-md p-2 hover:bg-bg">
            <span>{it.title}</span>
            <Pill status={it.status}>{it.status}</Pill>
          </Link>
        ))}
        {items.length === 0 ? <Empty title="Floor is clear" action={<Btn to="/home">Dashboard</Btn>} /> : null}
      </Card>
    </Guard>
  );
}

export function OnboardingScreen() {
  const db = useLookups();
  const rows = db.onboarding.filter((o) => o.subjectType === "client");
  return (
    <Guard min="manager">
      <PageHead title="Client onboarding" sub="Intake still open" />
      <Card>
        {rows.map((o) => (
          <div key={o.id} className="flex flex-wrap items-center justify-between gap-2 border-b border-border py-3 last:border-0">
            <Link to={`/clients/${o.subjectId}` as never} className="font-semibold hover:underline">
              {db.clientName(o.subjectId)} · {o.name}
            </Link>
            {o.status === "pending" ? <Btn onClick={() => db.completeTask(o.id)}>Mark done</Btn> : <Pill status="done">done</Pill>}
          </div>
        ))}
        {rows.length === 0 ? <Empty title="No client intake tasks" action={<Btn to="/clients">Clients</Btn>} /> : null}
      </Card>
    </Guard>
  );
}

export function StaffOnboardingScreen() {
  const { session } = useSession();
  const db = useLookups();
  const isMgr = canAccess(session?.role, "manager");
  const rows = db.onboarding.filter(
    (o) => o.subjectType === "staff" && (isMgr || o.subjectId === session?.staffId),
  );
  return (
    <Guard min="support_worker">
      <PageHead title="Onboarding" sub={isMgr ? "Return-to-work and induction" : "Your induction tasks"} />
      <Card>
        {rows.map((o) => (
          <div key={o.id} className="flex flex-wrap items-center justify-between gap-2 py-3">
            <Link to={`/staff/${o.subjectId}` as never} className="font-semibold hover:underline">
              {db.staffName(o.subjectId)} · {o.name}
            </Link>
            {o.status === "pending" ? <Btn onClick={() => db.completeTask(o.id)}>Mark done</Btn> : <Pill status="done">done</Pill>}
          </div>
        ))}
        {rows.length === 0 ? <Empty title="No onboarding tasks" action={<Btn to={isMgr ? "/staff" : "/my-compliance"}>{isMgr ? "Staff list" : "My compliance"}</Btn>} /> : null}
      </Card>
    </Guard>
  );
}

export function RequestsScreen() {
  const { session } = useSession();
  const db = useLookups();
  const nav = useNavigate();
  const search = useDeskSearch();
  const [open, setOpen] = useState(search.add === "1");
  const isClient = session?.role === "client";
  const rows = isClient && session.clientId ? db.requests.filter((r) => r.clientId === session.clientId) : db.requests;
  return (
    <>
      {isClient ? <Crumb items={[{ to: "/client-portal", label: "Portal" }, { label: "Requests" }]} /> : null}
      <PageHead title="Requests" sub="Client and family asks" actions={<Btn onClick={() => setOpen(true)}>New request</Btn>} />
      <Card>
        {rows.map((r) => (
          <Link key={r.id} to={`/requests/${r.id}` as never} className="flex flex-wrap items-center justify-between gap-2 border-b border-border py-3 last:border-0">
            <div>
              <p className="font-semibold">{isClient ? r.title : db.clientName(r.clientId)}</p>
              <p className="text-sm text-muted">{isClient ? REQUEST_LABEL[r.type] : `${r.title} · ${REQUEST_LABEL[r.type]}`}</p>
            </div>
            <Pill status={r.status}>{r.status}</Pill>
          </Link>
        ))}
        {rows.length === 0 ? <Empty title="No requests" action={<Btn onClick={() => setOpen(true)}>New request</Btn>} /> : null}
      </Card>
      {open && (
        <Modal title="New request" onClose={() => setOpen(false)}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const fd = new FormData(e.currentTarget);
              const id = db.addRequest({
                clientId: String(fd.get("clientId") || session?.clientId || "c1"),
                title: String(fd.get("title")),
                status: "pending",
                notes: String(fd.get("notes") || ""),
                type: (String(fd.get("type") || "other") as RequestKind),
              });
              setOpen(false);
              void nav({ to: "/requests/$requestId", params: { requestId: id } });
            }}
          >
            {isClient ? null : (
              <Field label="Client">
                <Select name="clientId" defaultValue={search.client ?? session?.clientId ?? "c1"}>
                  {db.clients.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
                </Select>
              </Field>
            )}
            <Field label="Type">
              <Select name="type" defaultValue="other">
                {(Object.keys(REQUEST_LABEL) as (keyof typeof REQUEST_LABEL)[]).map((k) => (
                  <option key={k} value={k}>{REQUEST_LABEL[k]}</option>
                ))}
              </Select>
            </Field>
            <Field label="Request"><Input name="title" required /></Field>
            <Field label="Details"><Textarea name="notes" rows={3} /></Field>
            <Btn type="submit">Save and open</Btn>
          </form>
        </Modal>
      )}
    </>
  );
}

export function RequestDetailScreen({ requestId }: { requestId: string }) {
  const { session } = useSession();
  const db = useLookups();
  const [reply, setReply] = useState("");
  const r = db.requests.find((x) => x.id === requestId);
  const isClient = session?.role === "client";
  if (!r) return <Missing what="request" back="/requests" />;
  if (isClient && session.clientId && r.clientId !== session.clientId) {
    return <Missing what="request" back="/requests" />;
  }
  return (
    <>
      <Crumb items={[{ to: isClient ? "/client-portal" : "/requests", label: isClient ? "Portal" : "Requests" }, { label: r.title }]} />
      <PageHead title={r.title} sub={isClient ? REQUEST_LABEL[r.type] : `${db.clientName(r.clientId)} · ${REQUEST_LABEL[r.type]}`} />
      <Card>
        <Pill status={r.status}>{r.status}</Pill>
        {r.notes ? <p className="mt-3 text-sm">{r.notes}</p> : null}
        {r.reply ? <p className="mt-3 text-sm"><span className="font-semibold">Team reply. </span>{r.reply}</p> : null}
        {!isClient && r.status !== "resolved" ? (
          <div className="mt-4">
            <Field label="Reply to the participant">
              <Textarea value={reply} onChange={(e) => setReply(e.target.value)} rows={2} placeholder="They will see this on the request" />
            </Field>
          </div>
        ) : null}
        <div className="mt-4 flex flex-wrap gap-2">
          {isClient ? <Btn to="/client-portal" variant="ghost">Portal</Btn> : <Btn to={`/clients/${r.clientId}`}>Client file</Btn>}
          {isClient ? <Btn to="/requests" variant="ghost">All requests</Btn> : null}
          {!isClient && r.status !== "resolved" ? (
            <>
              {r.status === "pending" ? <Btn variant="ghost" onClick={() => db.setRequestStatus(r.id, "in_progress")}>Start</Btn> : null}
              <Btn onClick={() => db.setRequestStatus(r.id, "resolved", reply)}>Resolve</Btn>
            </>
          ) : null}
        </div>
      </Card>
    </>
  );
}

export function WorkerHomeScreen() {
  const { session } = useSession();
  const db = useLookups();
  const staffId = session?.staffId || "s1";
  const open = db.checkins.find((c) => c.staffId === staffId && !c.outAt);
  const mine = db.timesheets.filter((t) => t.staffId === staffId);
  const upcoming = db.shifts
    .filter((s) => s.staffId === staffId && (s.status === "scheduled" || s.status === "in_progress"))
    .sort((a, b) => weekDays.indexOf(a.day) - weekDays.indexOf(b.day));
  const next = upcoming.find((s) => s.status === "in_progress") ?? upcoming[0];
  return (
    <>
      <PageHead title={`${perthGreeting()}, ${session?.name.split(" ")[0] ?? "there"}.`} sub="Your shift desk" />
      <div className="grid gap-3 sm:grid-cols-2">
        <Card>
          {open ? <Pill status="ok">checked in</Pill> : <Pill status="warn">not on shift</Pill>}
          <h2 className="mt-2 text-lg font-semibold">{open ? db.clientName(open.clientId) : next ? `${db.clientName(next.clientId)} · ${next.day} ${next.window}` : "No shift loaded"}</h2>
          <div className="mt-3 flex flex-wrap gap-2">
            <Btn to="/worker/check-in">{open ? "Check out" : "Check in"}</Btn>
            <Btn to="/worker/notes" variant="ghost">Log note</Btn>
            {open ? <Btn to={`/clients/${open.clientId}`} variant="ghost">Client file</Btn> : next ? <Btn to={`/clients/${next.clientId}`} variant="ghost">Client file</Btn> : null}
          </div>
        </Card>
        <Card>
          <h2 className="font-semibold">Shortcuts</h2>
          <div className="mt-2 grid gap-2">
            {[
              ["/my-roster", "My roster"],
              ["/my-timesheets", "My timesheets"],
              ["/my-compliance", "My compliance"],
              ["/incidents", "Incidents"],
              ["/ask-maureen", "Ask Maureen"],
            ].map(([to, label]) => (
              <Link key={to} to={to as never} className="rounded-md bg-bg px-3 py-2 text-sm font-semibold">{label}</Link>
            ))}
          </div>
        </Card>
        <Card>
          <h2 className="font-semibold">My timesheets</h2>
          {mine.map((t) => (
            <Link key={t.id} to={`/timesheets/${t.id}` as never} className="flex justify-between py-2 text-sm">
              <span>{t.date} {db.clientName(t.clientId)}</span>
              <Pill status={t.status}>{t.status}</Pill>
            </Link>
          ))}
          {mine.length === 0 ? <p className="text-sm text-muted">None yet. Check out to draft one.</p> : null}
        </Card>
      </div>
    </>
  );
}

export function WorkerCheckInScreen() {
  const { session } = useSession();
  const db = useLookups();
  const staffId = session?.staffId || "s1";
  const open = db.checkins.find((c) => c.staffId === staffId && !c.outAt);
  const suggested =
    db.shifts.find((s) => s.staffId === staffId && (s.status === "in_progress" || s.status === "scheduled"))?.clientId ??
    db.clients[0]?.id ??
    "c1";
  const [clientId, setClientId] = useState(suggested);
  const me = db.staff.find((s) => s.id === staffId);
  const hold = me ? rosterHold(me) : "Your staff file is missing.";
  const warn = me && !hold ? rosterWarn(me) : null;
  const [note, setNote] = useState("");
  return (
    <>
      <Crumb items={[{ to: "/worker", label: "My shift" }, { label: "Check-in" }]} />
      <PageHead title="Check in" sub="GPS is simulated in this demo" />
      <Card>
        {open ? (
          <>
            <p className="font-semibold">On shift with {db.clientName(open.clientId)} since {displayClock(open.inAt)}</p>
            <p className="mt-1 text-sm text-muted">Checking out writes a draft timesheet for today.</p>
            <div className="mt-3 flex gap-2">
              <Btn onClick={() => db.checkOut(staffId)}>Check out</Btn>
              <Btn to={`/clients/${open.clientId}`} variant="ghost">Client file</Btn>
              <Btn to="/worker/notes" variant="ghost">Log note</Btn>
            </div>
          </>
        ) : (
          <>
            <Field label="Client">
              <Select value={clientId} onChange={(e) => setClientId(e.target.value)}>
                {db.clients.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
              </Select>
            </Field>
            {hold ? <p className="mb-3 text-sm text-bad">{hold}. Check-in stays blocked until this is cleared.</p> : null}
            {warn ? <p className="mb-3 text-sm text-warn">{warn}. Still clear to work.</p> : null}
            {note ? <p className="mb-3 text-sm text-muted">{note}</p> : null}
            <div className="flex flex-wrap gap-2">
              <Btn disabled={!!hold} onClick={() => setNote(db.checkIn(staffId, clientId) ?? "Checked in.")}>Check in now</Btn>
              <Btn to={`/clients/${clientId}`} variant="ghost">Client file</Btn>
            </div>
          </>
        )}
      </Card>
    </>
  );
}

export function WorkerNotesScreen() {
  const { session } = useSession();
  const db = useLookups();
  const nav = useNavigate();
  return (
    <>
      <Crumb items={[{ to: "/worker", label: "My shift" }, { label: "Note" }]} />
      <PageHead title="Log a note" sub="Saves to the client file and the notes book" />
      <Card>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const fd = new FormData(e.currentTarget);
            const id = db.addNote({
              clientId: String(fd.get("clientId")),
              staffId: session?.staffId || "s1",
              date: perthShortDateYear(),
              shift: String(fd.get("shift") || "current"),
              body: String(fd.get("body")),
              kind: "daily care",
              visibleToClient: fd.get("share") === "on",
            });
            void nav({ to: "/case-notes/$noteId", params: { noteId: id } });
          }}
        >
          <Field label="Client">
            <Select name="clientId">{db.clients.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}</Select>
          </Field>
          <Field label="Shift"><Input name="shift" defaultValue="07:00–15:00" /></Field>
          <Field label="Note"><Textarea name="body" rows={5} required /></Field>
          <label className="mb-3 flex items-start gap-2 text-sm">
            <input type="checkbox" name="share" className="mt-0.5 size-4" />
            <span>Share with the participant’s portal. Leave off for staff-only observations.</span>
          </label>
          <Btn type="submit">Save to case notes</Btn>
        </form>
      </Card>
    </>
  );
}

export function MyRosterScreen() {
  const { session } = useSession();
  const db = useLookups();
  const id = session?.staffId || "s1";
  const shifts = db.shifts.filter((s) => s.staffId === id);
  const isMgr = canAccess(session?.role, "manager");
  return (
    <>
      <PageHead title="My roster" sub={session?.name} actions={isMgr ? <Btn to="/roster" variant="ghost">Full roster</Btn> : <Btn to="/worker" variant="ghost">My shift</Btn>} />
      <Card>
        {shifts.map((s) => (
          <Link key={s.id} to={`/clients/${s.clientId}` as never} className="flex justify-between py-3">
            <span>{s.day} {s.window} · {db.clientName(s.clientId)}</span>
            <Pill status={s.status}>{s.status}</Pill>
          </Link>
        ))}
        {shifts.length === 0 ? <Empty title="No shifts this week" action={<Btn to="/worker">My shift</Btn>} /> : null}
      </Card>
    </>
  );
}

export function MyTimesheetsScreen() {
  const { session } = useSession();
  const db = useLookups();
  const id = session?.staffId || "s1";
  return (
    <>
      <PageHead title="My timesheets" sub="Drafts from check-out land here" actions={<Btn to="/timesheets" search={{ add: "1" }}>Log hours</Btn>} />
      <Card>
        {db.timesheets.filter((t) => t.staffId === id).map((t) => (
          <div key={t.id} className="flex justify-between py-3">
            <Link to={`/timesheets/${t.id}` as never}>{t.date} {db.clientName(t.clientId)} · {t.hours}h</Link>
            <Pill status={t.status}>{t.status}</Pill>
          </div>
        ))}
        {db.timesheets.filter((t) => t.staffId === id).length === 0 ? (
          <Empty title="No timesheets yet" action={<Btn to="/worker/check-in">Check in</Btn>} />
        ) : null}
      </Card>
    </>
  );
}

export function MyComplianceScreen() {
  const { session } = useSession();
  const db = useLookups();
  const s = db.staff.find((x) => x.id === (session?.staffId || "s1"));
  if (!s) return <Missing what="profile" back="/worker" />;
  return (
    <>
      <PageHead title="My compliance" sub={s.name} actions={<Btn to={`/staff/${s.id}`} variant="ghost">Full profile</Btn>} />
      <Card className="mb-3">
        <h2 className="mb-2 font-semibold">Privacy on shift</h2>
        <PrivacyNotice variant="worker" />
      </Card>
      <Card>
        <p className="flex justify-between py-2">NDIS screening {s.ndisScreeningExpiry} <Pill status={s.ndisScreening}>{s.ndisScreening}</Pill></p>
        <p className="flex justify-between py-2">WWCC {s.wwccExpiry} <Pill status={s.wwcc}>{s.wwcc}</Pill></p>
        <p className="flex justify-between py-2">First aid {s.firstAidExpiry} <Pill status={s.firstAid}>{s.firstAid}</Pill></p>
        {db.training.filter((t) => t.staffId === s.id).map((t) => (
          <div key={t.id} className="flex justify-between py-2">
            <span>{t.name}</span>
            <Pill status={t.status}>{t.status}</Pill>
          </div>
        ))}
      </Card>
    </>
  );
}

export function TrainingScreen() {
  const db = useLookups();
  return (
    <Guard min="manager">
      <PageHead title="Training" sub="Currency across the team" />
      <Card>
        {db.training.map((t) => (
          <div key={t.id} className="flex flex-wrap items-center justify-between gap-2 py-3">
            <Link to={`/staff/${t.staffId}` as never} className="font-semibold hover:underline">
              {db.staffName(t.staffId)} · {t.name}
            </Link>
            <div className="flex items-center gap-2">
              <Pill status={t.status}>{t.status}</Pill>
              {t.status !== "current" ? <Btn onClick={() => db.setTrainingStatus(t.id, "current")}>Mark current</Btn> : null}
            </div>
          </div>
        ))}
      </Card>
    </Guard>
  );
}

export function ComplianceScreen() {
  const db = useLookups();
  return (
    <Guard min="manager">
      <PageHead title="Compliance" sub="NDIS screening, WWCC, first aid, and privacy" actions={<Btn to="/staff/compliance">Full register</Btn>} />
      <Card className="mb-3">
        <h2 className="mb-2 font-semibold">How personal information is handled</h2>
        <PrivacyNotice variant="full" />
      </Card>
      <Card>
        {db.staff.map((s) => (
          <Link key={s.id} to={`/staff/${s.id}` as never} className="flex items-center justify-between py-3">
            <span className="font-semibold">{s.name}</span>
            <span className="flex flex-wrap justify-end gap-2">
              <Pill status={s.ndisScreening}>NDIS</Pill>
              <Pill status={s.wwcc}>WWCC</Pill>
              <Pill status={s.firstAid}>First aid</Pill>
            </span>
          </Link>
        ))}
      </Card>
    </Guard>
  );
}

export function HrScreen() {
  const db = useLookups();
  return (
    <Guard min="admin">
      <PageHead title="HR" sub="Employment and leave" />
      <Card>
        {db.staff.map((s) => (
          <div key={s.id} className="flex flex-wrap items-center justify-between gap-2 py-3">
            <Link to={`/staff/${s.id}` as never} className="font-semibold hover:underline">
              {s.name} · {s.employment}
            </Link>
            <div className="flex items-center gap-2">
              <Pill status={s.status}>{s.status}</Pill>
              {s.status === "leave" ? <Btn onClick={() => db.setStaffStatus(s.id, "active")}>Return to work</Btn> : <Btn variant="ghost" onClick={() => db.setStaffStatus(s.id, "leave")}>Put on leave</Btn>}
            </div>
          </div>
        ))}
      </Card>
    </Guard>
  );
}

export function StaffComplianceScreen() {
  const db = useLookups();
  return (
    <Guard min="manager">
      <PageHead title="Staff compliance" sub="NDIS Worker Screening, WWCC, and first aid" actions={<Btn to="/compliance" variant="ghost">Privacy and exceptions</Btn>} />
      <Card>
        {db.staff.map((s) => (
          <Link key={s.id} to={`/staff/${s.id}` as never} className="flex flex-wrap items-center justify-between gap-2 border-b border-border py-3 last:border-0">
            <span>
              <span className="block font-semibold">{s.name}</span>
              <span className="text-xs text-muted">Screening {s.ndisScreeningExpiry} · WWCC {s.wwccExpiry} · Aid {s.firstAidExpiry}</span>
            </span>
            <span className="flex flex-wrap justify-end gap-2">
              <Pill status={s.ndisScreening}>NDIS</Pill>
              <Pill status={s.wwcc}>WWCC</Pill>
              <Pill status={s.firstAid}>First aid</Pill>
              {s.status === "leave" ? <Pill status="leave">leave</Pill> : null}
            </span>
          </Link>
        ))}
      </Card>
    </Guard>
  );
}
