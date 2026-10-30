import { i as __toESM } from "../_runtime.mjs";
import { Z as require_react, b as Link, g as Outlet, p as useRouterState, w as require_jsx_runtime, x as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { B as Briefcase, C as GraduationCap, D as Clock, F as ChevronDown, I as ChartPie, L as ChartColumn, N as CircleAlert, O as ClipboardList, a as UserPlus, b as LayoutDashboard, c as Shield, f as Search, g as Menu, h as MessageSquare, k as ClipboardCheck, n as Wallet, o as TriangleAlert, p as Receipt, r as Users, s as Sparkles, t as X, u as Settings, v as LogOut, w as FileText, x as Heart, z as CalendarDays } from "../_libs/lucide-react.mjs";
import { A as homeFor, D as NAV_GROUPS, E as NAV, O as RANK, _ as cn, b as initials, d as useSession, f as useCC, k as canAccess } from "./router-Bty-v5RX.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/shell-D2eey5Tf.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function toneFor(status) {
	const s = status.toLowerCase();
	if ([
		"active",
		"approved",
		"paid",
		"ok",
		"closed",
		"low",
		"done",
		"current",
		"complete",
		"resolved",
		"in_progress"
	].includes(s)) return "ok";
	if ([
		"submitted",
		"sent",
		"investigating",
		"medium",
		"expiring",
		"onboarding",
		"draft",
		"open",
		"moderate",
		"pending",
		"due",
		"scheduled",
		"review"
	].includes(s)) return "warn";
	if ([
		"high",
		"expired",
		"leave",
		"overdue",
		"missing"
	].includes(s)) return "bad";
	return "info";
}
function Pill({ children, status }) {
	const tone = status ? toneFor(status) : "info";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn("inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-semibold capitalize", {
			ok: "bg-ok-bg text-ok",
			warn: "bg-warn-bg text-warn",
			bad: "bg-bad-bg text-bad",
			info: "bg-info-bg text-info"
		}[tone]),
		children: typeof children === "string" ? children.replaceAll("_", " ") : children
	});
}
function Card({ children, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: cn("rounded-lg border border-border/80 bg-surface p-5 shadow-(--shadow-card)", className),
		children
	});
}
function PageHead({ title, sub, actions }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		className: "mb-5 flex flex-wrap items-end justify-between gap-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "text-2xl font-bold tracking-tight",
			children: title
		}), sub ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 text-sm text-muted",
			children: sub
		}) : null] }), actions ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex flex-wrap gap-2",
			children: actions
		}) : null]
	});
}
function Btn({ children, to, search, onClick, variant = "primary", type = "button", disabled = false }) {
	const cls = cn("inline-flex min-h-11 items-center justify-center gap-1.5 rounded-md px-3.5 text-sm font-semibold transition-opacity duration-150", variant === "primary" && "bg-primary text-primary-fg hover:opacity-90", variant === "ghost" && "border border-border bg-surface text-fg hover:bg-bg", variant === "danger" && "bg-bad text-primary-fg hover:opacity-90", disabled && "cursor-not-allowed opacity-50");
	if (to) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
		to,
		search,
		className: cls,
		children
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type,
		onClick,
		disabled,
		className: cls,
		children
	});
}
function Avatar({ name }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "avatar-grad grid size-9 shrink-0 place-items-center rounded-full text-xs font-bold text-primary-fg",
		children: initials(name)
	});
}
function Field({ label, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "mb-3 block",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "mb-1 block text-[11px] font-semibold tracking-wide text-muted uppercase",
			children: label
		}), children]
	});
}
var inputCls = "h-11 w-full rounded-md border border-border bg-bg px-3 text-sm outline-none focus:ring-2 focus:ring-primary/30";
function Input(props) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
		...props,
		className: cn(inputCls, props.className)
	});
}
function Textarea(props) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
		...props,
		className: cn(inputCls, "h-auto py-2", props.className)
	});
}
function Select(props) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
		...props,
		className: cn(inputCls, props.className)
	});
}
function Modal({ title, onClose, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed inset-0 z-50 grid place-items-center bg-fg/35 p-4",
		onClick: onClose,
		role: "presentation",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "w-full max-w-md rounded-lg border border-border bg-surface p-5 shadow-(--shadow-elevated)",
			onClick: (e) => e.stopPropagation(),
			role: "dialog",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-3 flex items-center justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-lg font-semibold",
					children: title
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "rounded-md border border-border px-2 py-1 text-sm",
					onClick: onClose,
					children: "Close"
				})]
			}), children]
		})
	});
}
function Empty({ title, action }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
		className: "text-center",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm text-muted",
			children: title
		}), action ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-3 flex justify-center",
			children: action
		}) : null]
	});
}
function Crumb({ items }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
		className: "mb-3 flex flex-wrap gap-1 text-xs text-muted",
		children: items.map((it, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "flex items-center gap-1",
			children: [i > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "/" }) : null, it.to ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: it.to,
				className: "hover:text-fg",
				children: it.label
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-fg",
				children: it.label
			})]
		}, it.label))
	});
}
function PersonLink({ href, name, meta, right }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
		to: href,
		className: "flex items-center gap-3 rounded-md p-2 hover:bg-bg",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Avatar, { name }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "min-w-0 flex-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "block text-sm font-semibold",
					children: name
				}), meta ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "block text-xs text-muted",
					children: meta
				}) : null]
			}),
			right
		]
	});
}
var ICONS = {
	dashboard: LayoutDashboard,
	heart: Heart,
	notes: FileText,
	roster: CalendarDays,
	clock: Clock,
	alert: TriangleAlert,
	grad: GraduationCap,
	check: ClipboardCheck,
	requests: MessageSquare,
	shield: Shield,
	users: Users,
	plans: ClipboardList,
	risk: CircleAlert,
	onboard: UserPlus,
	briefcase: Briefcase,
	chart: ChartPie,
	invoice: Receipt,
	wallet: Wallet,
	reports: ChartColumn,
	tidy: Sparkles,
	settings: Settings
};
function clientAllowed(pathname) {
	return pathname === "/client-portal" || pathname.startsWith("/requests");
}
function AppShell() {
	const { session, ready, logout } = useSession();
	const navigate = useNavigate();
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	const [open, setOpen] = (0, import_react.useState)(false);
	const [q, setQ] = (0, import_react.useState)("");
	const [expanded, setExpanded] = (0, import_react.useState)(() => /* @__PURE__ */ new Set(["My Work", "Team Management"]));
	const clients = useCC((s) => s.clients);
	const staff = useCC((s) => s.staff);
	const notes = useCC((s) => s.notes);
	const incidents = useCC((s) => s.incidents);
	const invoices = useCC((s) => s.invoices);
	const requests = useCC((s) => s.requests);
	const carePlans = useCC((s) => s.carePlans);
	const maureenAlert = incidents.some((i) => i.status !== "closed");
	(0, import_react.useEffect)(() => {
		if (!ready) return;
		if (!session) {
			navigate({ to: "/login" });
			return;
		}
		if (session.role === "client" && !clientAllowed(pathname)) {
			navigate({ to: "/client-portal" });
			return;
		}
		if (session.role === "support_worker" && pathname === "/home") navigate({ to: "/worker" });
	}, [
		ready,
		session,
		pathname,
		navigate
	]);
	(0, import_react.useEffect)(() => {
		NAV_GROUPS.forEach((g) => {
			if (NAV.some((n) => n.group === g.label && (pathname === n.to || n.to !== "/home" && pathname.startsWith(`${n.to}/`)))) setExpanded((prev) => /* @__PURE__ */ new Set([...prev, g.label]));
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
	const hits = (0, import_react.useMemo)(() => {
		const query = q.trim().toLowerCase();
		if (!query || !session) return [];
		const allowed = session.role === "support_worker" && session.staffId ? new Set(clients.filter((c) => c.staffIds.includes(session.staffId)).map((c) => c.id)) : session.role === "client" && session.clientId ? /* @__PURE__ */ new Set([session.clientId]) : null;
		const inBook = (clientId) => !allowed || allowed.has(clientId);
		const people = [
			...clients.filter((c) => inBook(c.id)).map((c) => ({
				to: `/clients/${c.id}`,
				label: c.name,
				kind: "Client"
			})),
			...session.role === "client" ? [] : staff.map((s) => ({
				to: `/staff/${s.id}`,
				label: s.name,
				kind: "Staff"
			})),
			...notes.filter((n) => inBook(n.clientId) && (session.role !== "client" || n.visibleToClient !== false)).map((n) => ({
				to: `/case-notes/${n.id}`,
				label: n.body.slice(0, 60),
				kind: "Note"
			})),
			...session.role === "client" ? [] : incidents.filter((i) => inBook(i.clientId)).map((i) => ({
				to: `/incidents/${i.id}`,
				label: i.summary,
				kind: "Incident"
			})),
			...requests.filter((r) => inBook(r.clientId)).map((r) => ({
				to: `/requests/${r.id}`,
				label: r.title,
				kind: "Request"
			})),
			...carePlans.filter((p) => inBook(p.clientId)).map((p) => ({
				to: `/clients/${p.clientId}`,
				label: p.name,
				kind: "Care plan"
			}))
		];
		if (canAccess(session.role, "admin")) people.push(...invoices.map((i) => ({
			to: `/invoices/${i.id}`,
			label: i.number,
			kind: "Invoice"
		})));
		return people.filter((p) => p.label.toLowerCase().includes(query)).slice(0, 8);
	}, [
		q,
		clients,
		staff,
		notes,
		incidents,
		invoices,
		requests,
		carePlans,
		session
	]);
	if (!ready || !session) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "login-wash grid min-h-svh place-items-center text-sm text-muted",
		children: "Loading floor…"
	});
	if (session.role === "client") {
		const hello = clients.find((c) => c.id === session.clientId)?.preferredName || session.name.split(" ")[0];
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "portal-wash min-h-svh",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
				className: "sticky top-0 z-20 border-b border-portal/15 bg-surface/80 backdrop-blur-md",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto flex max-w-2xl items-center justify-between gap-3 px-4 py-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/client-portal",
						className: "flex items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: "/brand/mark.svg?v=4",
							alt: "",
							className: "size-10"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "flex items-center gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-base font-black tracking-tight",
								children: ["Carters", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-primary",
									children: "Care"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "rounded-full bg-portal-soft px-1.5 py-0.5 text-[10px] font-bold text-portal",
								children: "DEMO"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "block text-xs text-muted",
							children: ["Hello, ", hello]
						})] })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: logout,
						className: "flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs text-muted hover:bg-bad-bg hover:text-bad",
						"aria-label": "Sign out",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { size: 16 }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "hidden sm:inline",
							children: "Sign Out"
						})]
					})]
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {})]
		});
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-svh bg-bg lg:grid lg:grid-cols-[240px_1fr]",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "flex items-center justify-between border-b border-border bg-surface px-4 py-3 lg:hidden",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: "/brand/mark.svg?v=4",
						alt: "",
						className: "size-9"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", {
						className: "text-sm font-black tracking-tight",
						children: ["Carters", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-primary",
							children: "Care"
						})]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "rounded-md border border-border p-2",
					onClick: () => setOpen((v) => !v),
					"aria-label": "Menu",
					children: open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { size: 18 }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { size: 18 })
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
				className: `${open ? "flex" : "hidden"} max-h-[75vh] flex-col overflow-auto border-b border-border bg-surface lg:sticky lg:top-0 lg:flex lg:h-svh lg:max-h-none lg:border-r lg:border-b-0`,
				"data-testid": "app-sidebar",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "hidden items-center gap-3 border-b border-border px-4 py-4 lg:flex",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: "/brand/mark.svg?v=4",
							alt: "",
							className: "size-12"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "leading-tight",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-lg font-black tracking-tight text-fg",
								children: ["Carters", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-primary",
									children: "Care"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-0.5 text-[11px] font-semibold text-subtle",
								children: "More room for care."
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
						className: "flex-1 space-y-1 overflow-auto py-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "px-2 pb-1",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/ask-maureen",
								onClick: () => setOpen(false),
								className: `flex w-full items-center gap-2.5 rounded-md border p-2 ${pathname === "/ask-maureen" ? "border-primary/20 bg-primary-soft" : maureenAlert ? "border-warn/30 bg-warn-bg" : "border-primary/15 bg-primary-soft/70 hover:bg-primary-soft"}`,
								"data-testid": "sidebar-maureen-button-top",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "relative shrink-0",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
										src: "/brand/maureen.png",
										alt: "",
										className: "size-7 rounded-full border-2 border-primary/20 object-cover"
									}), maureenAlert ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute -top-0.5 -right-0.5 size-2.5 rounded-full border-2 border-surface bg-warn" }) : null]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "min-w-0 text-left",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "block text-xs font-bold text-primary",
										children: "Ask Maureen"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "block text-[10px] text-subtle",
										children: "AI Assistant"
									})]
								})]
							})
						}), groups.map((g) => {
							const isOpen = !g.collapsible || expanded.has(g.label);
							const groupItems = items.filter((n) => n.group === g.label);
							const hasActive = groupItems.some((n) => n.to === "/home" || n.to === "/worker" ? pathname === n.to : pathname === n.to || pathname.startsWith(`${n.to}/`));
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-1",
								children: [g.collapsible ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									onClick: () => setExpanded((prev) => {
										const next = new Set(prev);
										if (next.has(g.label)) next.delete(g.label);
										else next.add(g.label);
										return next;
									}),
									className: `flex w-full items-center justify-between px-3 py-1.5 text-[10px] font-semibold tracking-wider uppercase ${hasActive ? "text-primary" : "text-subtle"}`,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: g.label }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, {
										size: 12,
										className: `transition-transform duration-200 ${isOpen ? "" : "-rotate-90"}`
									})]
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "px-3 py-1.5 text-[10px] font-semibold tracking-wider text-subtle uppercase",
									children: g.label
								}), isOpen ? groupItems.map((n) => {
									const Icon = ICONS[n.icon] ?? LayoutDashboard;
									const active = n.to === "/home" || n.to === "/worker" ? pathname === n.to : pathname === n.to || pathname.startsWith(`${n.to}/`);
									return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
										to: n.to,
										onClick: () => setOpen(false),
										className: `mx-2 flex items-center gap-2.5 rounded-md border px-2 py-1.5 ${active ? "border-primary/15 bg-primary-soft" : "border-transparent hover:bg-bg"}`,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: `icon-${n.tone} grid size-7 shrink-0 place-items-center rounded-md text-primary-fg ${active ? "" : "opacity-80"}`,
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { size: 14 })
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: `truncate text-[13px] ${active ? "font-semibold text-primary" : "font-medium text-muted"}`,
											children: n.label
										})]
									}, n.to);
								}) : null]
							}, g.label);
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2.5 border-t border-border p-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "relative shrink-0",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Avatar, { name: session.name }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute -right-0.5 -bottom-0.5 size-2.5 rounded-full border-2 border-surface bg-ok" })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0 flex-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "truncate text-xs font-semibold",
									children: session.name
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "truncate text-[10px] text-subtle",
									children: session.email
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: logout,
								className: "rounded-md p-2 text-subtle hover:bg-bad-bg hover:text-bad",
								"aria-label": "Sign out",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { size: 14 })
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-w-0",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "no-print sticky top-0 z-20 border-b border-border bg-surface/90 px-4 py-3 backdrop-blur",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative mx-auto max-w-3xl",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, {
								size: 16,
								className: "absolute top-1/2 left-3 -translate-y-1/2 text-subtle"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								value: q,
								onChange: (e) => setQ(e.target.value),
								placeholder: "Search people, notes, incidents…",
								className: "h-11 w-full rounded-md border border-border bg-bg pr-3 pl-9 text-sm"
							}),
							hits.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "absolute right-0 left-0 mt-1 rounded-md border border-border bg-surface p-1 shadow-(--shadow-elevated)",
								children: hits.map((h) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									className: "flex w-full items-center justify-between rounded-sm px-3 py-2 text-left text-sm hover:bg-bg",
									onClick: () => {
										setQ("");
										navigate({ to: h.to });
									},
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "truncate pr-3",
										children: h.label
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-xs text-muted",
										children: h.kind
									})]
								}, h.to + h.kind))
							})
						]
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
					className: "mx-auto max-w-6xl px-4 py-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {})
				})]
			})
		]
	});
}
function Guard({ min, children }) {
	const { session } = useSession();
	if (!session || RANK[session.role] < RANK[min]) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-lg border border-border bg-surface p-6 shadow-(--shadow-card)",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-lg font-semibold",
				children: "You do not have this desk"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-muted",
				children: "Ask a manager if you need access."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
					to: homeFor(session?.role),
					children: "Back to your desk"
				})
			})
		]
	});
	return children;
}
//#endregion
export { Empty as a, Input as c, PersonLink as d, Pill as f, Crumb as i, Modal as l, Textarea as m, Btn as n, Field as o, Select as p, Card as r, Guard as s, AppShell as t, PageHead as u };
