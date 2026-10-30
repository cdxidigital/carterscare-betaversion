import { type FormEvent, useState } from "react";
import {
  AlertCircle,
  Eye,
  EyeOff,
  Hash,
  Heart,
  Lock,
  Mail,
  Shield,
  User,
  UserCircle,
  Users,
} from "lucide-react";
import { CLIENT_PORTAL, DEMO_PASSWORD, accounts } from "@/lib/cc/seed";
import { accountFor, portalAccount, useSession } from "@/lib/cc/session";
import type { Session } from "@/lib/cc/types";

const DEMOS = [
  { email: "demo@admin.carterscare.com", label: "Admin", desc: "Full platform access", cls: "demo-admin", Icon: Shield },
  { email: "demo@manager.carterscare.com", label: "Manager", desc: "Team management", cls: "demo-manager", Icon: Users },
  { email: "demo@worker.carterscare.com", label: "Support Worker", desc: "Care delivery", cls: "demo-worker", Icon: UserCircle },
  { email: "demo@client.carterscare.com", label: "Client", desc: "Client portal", cls: "demo-client", Icon: Heart },
] as const;

function sessionFromAccount(acc: (typeof accounts)[number]): Session {
  return {
    email: acc.email,
    name: acc.name,
    role: acc.role,
    staffId: "staffId" in acc ? acc.staffId : undefined,
    clientId: "clientId" in acc ? acc.clientId : undefined,
  };
}

export function LoginPage() {
  const { login, ready } = useSession();
  const [tab, setTab] = useState<"staff" | "client">("staff");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [username, setUsername] = useState("");
  const [accessCode, setAccessCode] = useState("");
  const [error, setError] = useState("");
  const [fieldErr, setFieldErr] = useState("");

  if (!ready) {
    return (
      <main className="login-wash grid min-h-svh place-items-center p-6">
        <p className="text-sm text-muted">Loading…</p>
      </main>
    );
  }

  const enter = (s: Session) => {
    setError("");
    login(s);
  };

  const submitStaff = (e: FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      setFieldErr("Email is required");
      return;
    }
    if (password.length < 6) {
      setFieldErr("Min 6 characters");
      return;
    }
    const acc = accountFor(email);
    if (!acc || password !== DEMO_PASSWORD) {
      setError("Use a demo account and Demo1234.");
      return;
    }
    enter(sessionFromAccount(acc));
  };

  const submitClient = (e: FormEvent) => {
    e.preventDefault();
    if (!username.trim()) {
      setFieldErr("Username is required");
      return;
    }
    if (!/^\d{6}$/.test(accessCode.trim())) {
      setFieldErr("Must be 6 digits");
      return;
    }
    const acc = portalAccount(username, accessCode);
    if (!acc) {
      setError("Invalid username or access code.");
      return;
    }
    enter(sessionFromAccount(acc));
  };

  return (
    <main className="login-wash flex h-svh min-h-0 overflow-hidden" data-testid="login-page">
      <section className="relative hidden overflow-hidden lg:flex lg:w-1/2 lg:flex-col lg:items-center lg:justify-center lg:p-12">
        <div className="hero-blob-purple absolute -top-20 -left-20 size-72 rounded-full opacity-20" />
        <div className="hero-blob-blue absolute -right-20 -bottom-20 size-96 rounded-full opacity-15" />
        <div className="hero-blob-green absolute top-1/2 left-1/3 size-48 rounded-full opacity-10" />
        <div className="relative z-10 max-w-lg">
          <div className="mb-8 flex items-center gap-3">
            <img src="/brand/mark.svg?v=4" alt="" className="h-20 w-20" />
            <p className="text-4xl leading-none font-black tracking-tight text-fg">
              Carters<span className="text-primary">Care</span>
            </p>
          </div>
          <h1 className="text-4xl leading-tight font-black tracking-tight text-fg">
            More room for care<span className="text-primary">.</span>
          </h1>
          <p className="mt-3 text-lg font-semibold text-muted">Care management, connected.</p>
          <p className="mt-4 max-w-md leading-relaxed text-muted">
            Rostering, compliance, incidents and timesheets for NDIS and aged care — one connected floor.
          </p>
          <div className="mt-8 flex flex-wrap gap-2">
            {["Rostering", "Compliance", "Case Notes", "Timesheets", "Incidents", "Reports"].map((f) => (
              <span key={f} className="rounded-full border border-border/80 bg-surface/80 px-3 py-1.5 text-xs font-semibold text-muted shadow-(--shadow-card)">
                {f}
              </span>
            ))}
          </div>
          <p className="mt-8 text-xs font-semibold tracking-wide text-subtle">A Carters Care Group platform</p>
        </div>
      </section>

      <section className="flex min-h-0 flex-1 justify-center overflow-y-auto p-4 py-8 sm:p-6">
        <div className="w-full max-w-sm">
          <div className="mb-6 flex items-center justify-center gap-2 lg:hidden">
            <img src="/brand/mark.svg?v=4" alt="" className="h-12 w-12" />
            <p className="text-2xl leading-none font-black tracking-tight text-fg">
              Carters<span className="text-primary">Care</span>
            </p>
          </div>
          <div className="overflow-hidden rounded-xl border border-surface/80 bg-surface shadow-(--shadow-elevated)" data-testid="login-card">
            <div className="brand-bar h-2" />
            <div className="flex border-b border-border">
              <button
                type="button"
                onClick={() => {
                  setTab("staff");
                  setError("");
                  setFieldErr("");
                }}
                className={`flex flex-1 items-center justify-center gap-2 py-3.5 text-sm font-semibold ${
                  tab === "staff" ? "border-b-2 border-primary bg-primary-soft/40 text-primary" : "text-muted"
                }`}
              >
                <Shield size={16} />
                Staff Login
              </button>
              <button
                type="button"
                onClick={() => {
                  setTab("client");
                  setError("");
                  setFieldErr("");
                }}
                className={`flex flex-1 items-center justify-center gap-2 py-3.5 text-sm font-semibold ${
                  tab === "client" ? "border-b-2 border-portal bg-portal-soft text-portal" : "text-muted"
                }`}
              >
                <Heart size={16} />
                Client Portal
              </button>
            </div>

            <div className="p-6 sm:p-8">
              {tab === "staff" ? (
                <>
                  <div className="mb-5">
                    <h2 className="text-2xl font-bold">Welcome back</h2>
                    <p className="mt-1 text-sm text-muted">Choose a desk to enter the floor</p>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {DEMOS.map((demo) => (
                      <button
                        key={demo.email}
                        type="button"
                        onClick={() => {
                          const acc = accountFor(demo.email);
                          if (acc) enter(sessionFromAccount(acc));
                        }}
                        className={`${demo.cls} rounded-md p-3 text-left text-primary-fg transition-opacity duration-150 hover:opacity-90`}
                      >
                        <demo.Icon size={20} className="mb-1.5" />
                        <p className="text-xs font-bold">{demo.label}</p>
                        <p className="text-[10px] opacity-80">{demo.desc}</p>
                      </button>
                    ))}
                  </div>
                  <p className="mt-3 text-center text-xs text-subtle">
                    Password for every desk is <span className="font-mono font-bold text-primary">{DEMO_PASSWORD}</span>
                  </p>
                  <form onSubmit={submitStaff} className="mt-6 space-y-4 border-t border-border pt-5">
                    <label className="block">
                      <span className="mb-2 block text-xs font-semibold tracking-wide text-muted uppercase">Email</span>
                      <span className="relative block">
                        <Mail size={16} className="absolute top-1/2 left-3.5 -translate-y-1/2 text-subtle" />
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="you@example.com"
                          autoComplete="email"
                          className="h-11 w-full rounded-md border border-border bg-bg pr-4 pl-10 text-sm outline-none focus:ring-2 focus:ring-primary/30"
                        />
                      </span>
                    </label>
                    <label className="block">
                      <span className="mb-2 block text-xs font-semibold tracking-wide text-muted uppercase">Password</span>
                      <span className="relative block">
                        <Lock size={16} className="absolute top-1/2 left-3.5 -translate-y-1/2 text-subtle" />
                        <input
                          type={showPw ? "text" : "password"}
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="••••••••"
                          autoComplete="current-password"
                          className="h-11 w-full rounded-md border border-border bg-bg pr-10 pl-10 text-sm outline-none focus:ring-2 focus:ring-primary/30"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPw((v) => !v)}
                          className="absolute top-1/2 right-3 -translate-y-1/2 text-subtle"
                          aria-label={showPw ? "Hide password" : "Show password"}
                        >
                          {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                      </span>
                    </label>
                    {fieldErr ? (
                      <p className="flex items-center gap-1 text-xs text-bad">
                        <AlertCircle size={12} />
                        {fieldErr}
                      </p>
                    ) : null}
                    {error ? <p className="text-sm text-bad">{error}</p> : null}
                    <button type="submit" className="btn-staff mt-2 flex h-11 w-full items-center justify-center rounded-md text-sm font-bold text-primary-fg shadow-(--shadow-card) transition-opacity duration-150 hover:opacity-90">
                      Sign In
                    </button>
                  </form>
                </>
              ) : (
                <>
                  <div className="mb-5">
                    <h2 className="text-2xl font-bold">Client Portal</h2>
                    <p className="mt-1 text-sm text-muted">Bob’s care schedule, notes and requests</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      const acc = portalAccount(CLIENT_PORTAL.username, CLIENT_PORTAL.accessCode);
                      if (acc) enter(sessionFromAccount(acc));
                    }}
                    className="demo-client flex w-full items-center gap-3 rounded-md p-4 text-left text-primary-fg"
                  >
                    <Heart size={22} />
                    <span>
                      <span className="block text-sm font-bold">Enter as Bob</span>
                      <span className="block text-[11px] opacity-80">{CLIENT_PORTAL.username} · {CLIENT_PORTAL.accessCode}</span>
                    </span>
                  </button>
                  <form onSubmit={submitClient} className="mt-6 space-y-4 border-t border-border pt-5">
                    <label className="block">
                      <span className="mb-2 block text-xs font-semibold tracking-wide text-muted uppercase">Username</span>
                      <span className="relative block">
                        <User size={16} className="absolute top-1/2 left-3.5 -translate-y-1/2 text-subtle" />
                        <input
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                          placeholder="firstname.lastname"
                          autoComplete="username"
                          className="h-11 w-full rounded-md border border-border bg-bg pr-4 pl-10 text-sm outline-none focus:ring-2 focus:ring-portal/30"
                        />
                      </span>
                    </label>
                    <label className="block">
                      <span className="mb-2 block text-xs font-semibold tracking-wide text-muted uppercase">Access Code</span>
                      <span className="relative block">
                        <Hash size={16} className="absolute top-1/2 left-3.5 -translate-y-1/2 text-subtle" />
                        <input
                          value={accessCode}
                          onChange={(e) => setAccessCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
                          placeholder="6-digit code"
                          inputMode="numeric"
                          maxLength={6}
                          autoComplete="one-time-code"
                          className="h-11 w-full rounded-md border border-border bg-bg pr-4 pl-10 font-mono text-sm tracking-widest outline-none focus:ring-2 focus:ring-portal/30"
                        />
                      </span>
                    </label>
                    {fieldErr ? (
                      <p className="flex items-center gap-1 text-xs text-bad">
                        <AlertCircle size={12} />
                        {fieldErr}
                      </p>
                    ) : null}
                    {error ? <p className="text-sm text-bad">{error}</p> : null}
                    <button type="submit" className="btn-portal mt-2 flex h-11 w-full items-center justify-center rounded-md text-sm font-bold text-portal-fg shadow-(--shadow-card) transition-opacity duration-150 hover:opacity-90">
                      Access My Portal
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
