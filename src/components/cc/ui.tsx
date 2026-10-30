import { type InputHTMLAttributes, type ReactNode, type SelectHTMLAttributes, type TextareaHTMLAttributes } from "react";
import { Link } from "@tanstack/react-router";
import { cn, initials } from "@/lib/utils";
import { toneFor } from "@/lib/cc/status";

export function Pill({ children, status }: { children: ReactNode; status?: string }) {
  const tone = status ? toneFor(status) : "info";
  const map = {
    ok: "bg-ok-bg text-ok",
    warn: "bg-warn-bg text-warn",
    bad: "bg-bad-bg text-bad",
    info: "bg-info-bg text-info",
  } as const;
  return (
    <span className={cn("inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-semibold capitalize", map[tone])}>
      {typeof children === "string" ? children.replaceAll("_", " ") : children}
    </span>
  );
}

export function Card({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <section className={cn("rounded-lg border border-border/80 bg-surface p-5 shadow-(--shadow-card)", className)}>
      {children}
    </section>
  );
}

export function PageHead({
  title,
  sub,
  actions,
}: {
  title: string;
  sub?: string;
  actions?: ReactNode;
}) {
  return (
    <header className="mb-5 flex flex-wrap items-end justify-between gap-3">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
        {sub ? <p className="mt-1 text-sm text-muted">{sub}</p> : null}
      </div>
      {actions ? <div className="flex flex-wrap gap-2">{actions}</div> : null}
    </header>
  );
}

export function Btn({
  children,
  to,
  search,
  onClick,
  variant = "primary",
  type = "button",
  disabled = false,
}: {
  children: ReactNode;
  to?: string;
  search?: Record<string, string | undefined>;
  onClick?: () => void;
  variant?: "primary" | "ghost" | "danger";
  type?: "button" | "submit";
  disabled?: boolean;
}) {
  const cls = cn(
    "inline-flex min-h-11 items-center justify-center gap-1.5 rounded-md px-3.5 text-sm font-semibold transition-opacity duration-150",
    variant === "primary" && "bg-primary text-primary-fg hover:opacity-90",
    variant === "ghost" && "border border-border bg-surface text-fg hover:bg-bg",
    variant === "danger" && "bg-bad text-primary-fg hover:opacity-90",
    disabled && "cursor-not-allowed opacity-50",
  );
  if (to) {
    return (
      <Link to={to as never} search={search as never} className={cls}>
        {children}
      </Link>
    );
  }
  return (
    <button type={type} onClick={onClick} disabled={disabled} className={cls}>
      {children}
    </button>
  );
}

export function Avatar({ name }: { name: string }) {
  return (
    <span className="avatar-grad grid size-9 shrink-0 place-items-center rounded-full text-xs font-bold text-primary-fg">
      {initials(name)}
    </span>
  );
}

export function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="mb-3 block">
      <span className="mb-1 block text-[11px] font-semibold tracking-wide text-muted uppercase">{label}</span>
      {children}
    </label>
  );
}

const inputCls =
  "h-11 w-full rounded-md border border-border bg-bg px-3 text-sm outline-none focus:ring-2 focus:ring-primary/30";

export function Input(props: InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={cn(inputCls, props.className)} />;
}

export function Textarea(props: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea {...props} className={cn(inputCls, "h-auto py-2", props.className)} />;
}

export function Select(props: SelectHTMLAttributes<HTMLSelectElement>) {
  return <select {...props} className={cn(inputCls, props.className)} />;
}

export function Modal({
  title,
  onClose,
  children,
}: {
  title: string;
  onClose: () => void;
  children: ReactNode;
}) {
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-fg/35 p-4" onClick={onClose} role="presentation">
      <div
        className="w-full max-w-md rounded-lg border border-border bg-surface p-5 shadow-(--shadow-elevated)"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
      >
        <div className="mb-3 flex items-center justify-between gap-3">
          <h2 className="text-lg font-semibold">{title}</h2>
          <button type="button" className="rounded-md border border-border px-2 py-1 text-sm" onClick={onClose}>
            Close
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

export function Empty({ title, action }: { title: string; action?: ReactNode }) {
  return (
    <Card className="text-center">
      <p className="text-sm text-muted">{title}</p>
      {action ? <div className="mt-3 flex justify-center">{action}</div> : null}
    </Card>
  );
}

export function Crumb({ items }: { items: { to?: string; label: string }[] }) {
  return (
    <nav className="mb-3 flex flex-wrap gap-1 text-xs text-muted">
      {items.map((it, i) => (
        <span key={it.label} className="flex items-center gap-1">
          {i > 0 ? <span>/</span> : null}
          {it.to ? (
            <Link to={it.to as never} className="hover:text-fg">
              {it.label}
            </Link>
          ) : (
            <span className="text-fg">{it.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}

export function PersonLink({
  href,
  name,
  meta,
  right,
}: {
  href: string;
  name: string;
  meta?: string;
  right?: ReactNode;
}) {
  return (
    <Link to={href as never} className="flex items-center gap-3 rounded-md p-2 hover:bg-bg">
      <Avatar name={name} />
      <span className="min-w-0 flex-1">
        <span className="block text-sm font-semibold">{name}</span>
        {meta ? <span className="block text-xs text-muted">{meta}</span> : null}
      </span>
      {right}
    </Link>
  );
}
