import { i as __toESM } from "../_runtime.mjs";
import { S as useSearch, Z as require_react, b as Link, w as require_jsx_runtime, x as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { A as CircleUser, D as Clock, l as ShieldCheck, o as TriangleAlert, r as Users, w as FileText, x as Heart, z as CalendarDays } from "../_libs/lucide-react.mjs";
import { A as homeFor, C as perthNow, N as seed, P as weekDays, S as perthGreeting, T as perthShortDateYear, d as useSession, g as rosterWarn, h as rosterHold, k as canAccess, m as money, p as CLAIM_NOTE, v as displayClock, w as perthShortDate, x as perthDate, y as hoursBetween } from "./router-Bty-v5RX.mjs";
import { a as Empty, c as Input, d as PersonLink, f as Pill, i as Crumb, l as Modal, m as Textarea, n as Btn, o as Field, p as Select, r as Card, s as Guard, u as PageHead } from "./shell-D2eey5Tf.mjs";
import { n as REQUEST_LABEL, r as useLookups, t as PrivacyNotice } from "./privacy-C_bY1ZRK.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/screens-TEN7enTD.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function useDeskSearch() {
	return useSearch({ strict: false });
}
function Missing({ what, back }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
			className: "text-lg font-semibold",
			children: [
				"That ",
				what,
				" is not on file"
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 text-sm text-muted",
			children: "It may have been removed. Return to the list."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-4",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
				to: back,
				children: "Back"
			})
		})
	] });
}
function DashboardScreen() {
	const nav = useNavigate();
	const { session } = useSession();
	const db = useLookups();
	const role = session?.role;
	const isMgr = canAccess(role, "manager");
	const isAdmin = canAccess(role, "admin");
	const onShift = db.checkins.filter((c) => !c.outAt);
	const openIncidents = db.incidents.filter((i) => i.status !== "closed");
	const reportable = openIncidents.filter((i) => i.reportable).length;
	const alerts = openIncidents.length + db.staff.filter((s) => s.firstAid !== "ok" || s.wwcc !== "ok" || s.ndisScreening !== "ok").length;
	const first = session?.name.split(" ")[0] ?? "there";
	const notesToday = db.notes.length;
	const activeClients = db.clients.filter((c) => c.status === "active");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHead, {
			title: `${perthGreeting()}, ${first}.`,
			sub: `Perth · ${perthDate()}`
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-5 flex flex-wrap gap-2",
			role: "navigation",
			"aria-label": "Quick actions",
			"data-testid": "dashboard-quick-actions",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/clients",
					className: "qa-clients inline-flex h-10 items-center gap-2 rounded-md px-4 text-sm font-semibold text-primary-fg shadow-(--shadow-card)",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, { size: 16 }), " View Clients"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: isMgr ? "/roster" : "/my-roster",
					className: "qa-roster inline-flex h-10 items-center gap-2 rounded-md px-4 text-sm font-semibold text-primary-fg shadow-(--shadow-card)",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalendarDays, { size: 16 }),
						" ",
						isMgr ? "Today's Roster" : "My Roster"
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: isMgr ? "/timesheets" : "/my-timesheets",
					className: "qa-timesheets inline-flex h-10 items-center gap-2 rounded-md px-4 text-sm font-semibold text-primary-fg shadow-(--shadow-card)",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { size: 16 }), " Timesheets"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/case-notes",
					className: "qa-notes inline-flex h-10 items-center gap-2 rounded-md px-4 text-sm font-semibold text-primary-fg shadow-(--shadow-card)",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { size: 16 }), " Case Notes"]
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-3 sm:grid-cols-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					className: "flex items-center gap-4 rounded-lg border border-border/50 bg-surface p-5 text-left shadow-(--shadow-card)",
					onClick: () => void nav({ to: "/check-in" }),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "icon-purple grid size-14 shrink-0 place-items-center rounded-lg text-primary-fg shadow-(--shadow-card)",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { size: 22 })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "block text-2xl font-bold leading-tight",
							children: onShift.length
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "block text-sm font-semibold text-fg/70",
							children: "Staff on Shift"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "block text-xs text-muted",
							children: "Active check-ins today"
						})
					] })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					className: "flex items-center gap-4 rounded-lg border border-border/50 bg-surface p-5 text-left shadow-(--shadow-card)",
					onClick: () => void nav({ to: isMgr ? "/staff" : "/my-timesheets" }),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "icon-blue grid size-14 shrink-0 place-items-center rounded-lg text-primary-fg shadow-(--shadow-card)",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleUser, { size: 22 })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "block text-2xl font-bold leading-tight",
							children: isMgr ? db.staff.filter((s) => s.status === "active").length : `${db.timesheets.filter((t) => t.staffId === session?.staffId).reduce((s, t) => s + t.hours, 0)}h`
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "block text-sm font-semibold text-fg/70",
							children: isMgr ? "Active Staff" : "My hours"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "block text-xs text-muted",
							children: isMgr ? "Registered care workers" : "Timesheets"
						})
					] })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					className: "flex items-center gap-4 rounded-lg border border-border/50 bg-surface p-5 text-left shadow-(--shadow-card)",
					onClick: () => void nav({ to: "/incidents" }),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: `${alerts > 0 ? "icon-orange" : "icon-green"} grid size-14 shrink-0 place-items-center rounded-lg text-primary-fg shadow-(--shadow-card)`,
						children: alerts > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { size: 22 }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { size: 22 })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "block text-2xl font-bold leading-tight",
							children: alerts
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "block text-sm font-semibold text-fg/70",
							children: "Alerts"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "block text-xs text-muted",
							children: alerts > 0 ? reportable ? `${reportable} reportable · 24h notice` : "Requires attention" : "All clear"
						})
					] })]
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-3 grid gap-3 sm:grid-cols-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					className: "flex items-center gap-3 rounded-lg border border-border/50 bg-surface p-4 text-left shadow-(--shadow-card)",
					onClick: () => void nav({ to: "/clients" }),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "icon-teal grid size-10 place-items-center rounded-md text-primary-fg",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, { size: 18 })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "block text-xl font-bold",
						children: activeClients.length
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-xs font-medium text-muted",
						children: "Active Clients"
					})] })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					className: "flex items-center gap-3 rounded-lg border border-border/50 bg-surface p-4 text-left shadow-(--shadow-card)",
					onClick: () => void nav({ to: "/case-notes" }),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "icon-yellow grid size-10 place-items-center rounded-md text-primary-fg",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { size: 18 })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "block text-xl font-bold",
						children: notesToday
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-xs font-medium text-muted",
						children: "Notes on file"
					})] })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					className: "flex items-center gap-3 rounded-lg border border-border/50 bg-surface p-4 text-left shadow-(--shadow-card)",
					onClick: () => void nav({ to: "/incidents" }),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: `${openIncidents.length ? "icon-red" : "icon-green"} grid size-10 place-items-center rounded-md text-primary-fg`,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { size: 18 })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "block text-xl font-bold",
						children: openIncidents.length
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-xs font-medium text-muted",
						children: "Open Incidents"
					})] })]
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-4 grid gap-4 lg:grid-cols-5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "lg:col-span-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-3 flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "icon-orange grid size-8 place-items-center rounded-md text-primary-fg",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalendarDays, { size: 16 })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-semibold",
							children: "Upcoming Shifts"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: isMgr ? "/roster" : "/my-roster",
						className: "text-sm text-primary",
						children: "Roster"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-2",
					children: [db.shifts.filter((s) => s.status === "scheduled" || s.status === "in_progress").sort((a, b) => weekDays.indexOf(a.day) - weekDays.indexOf(b.day)).slice(0, 6).map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between rounded-md p-2 hover:bg-bg",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: `/staff/${s.staffId}`,
								className: "font-semibold hover:underline",
								children: db.staffName(s.staffId)
							}),
							" · ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: `/clients/${s.clientId}`,
								className: "hover:underline",
								children: db.clientName(s.clientId)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "block text-xs text-muted",
								children: [
									s.day,
									" ",
									s.window
								]
							})
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pill, {
							status: s.status,
							children: s.status
						})]
					}, s.id)), db.shifts.every((s) => s.status === "complete" || s.status === "off") ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted",
						children: "No shifts left this week."
					}) : null]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "lg:col-span-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-3 flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "icon-green grid size-8 place-items-center rounded-md text-primary-fg",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { size: 16 })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-semibold",
							children: "Recent Activity"
						})]
					}),
					db.checkins.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/check-in",
						className: "flex items-center justify-between rounded-md p-2 hover:bg-bg",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "block text-sm font-semibold",
							children: db.staffName(c.staffId)
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-xs text-muted",
							children: [
								db.clientName(c.clientId),
								" · in ",
								displayClock(c.inAt),
								c.outAt ? ` · out ${displayClock(c.outAt)}` : ""
							]
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pill, {
							status: c.outAt ? "complete" : "ok",
							children: c.outAt ? "out" : "on shift"
						})]
					}, c.id)),
					isAdmin ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/tidy-up",
						className: "mt-2 block text-sm font-semibold text-primary",
						children: "Tidy up the floor"
					}) : null
				]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
			className: "mt-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-3 flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "icon-teal grid size-8 place-items-center rounded-md text-primary-fg",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, { size: 16 })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-semibold",
						children: "Active Clients"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/clients",
					className: "text-sm text-primary",
					children: "All clients"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-2 sm:grid-cols-2 lg:grid-cols-3",
				children: activeClients.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PersonLink, {
					href: `/clients/${c.id}`,
					name: c.name,
					meta: `${c.suburb} · ${c.plan}`,
					right: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pill, {
						status: c.risk,
						children: c.risk
					})
				}, c.id))
			})]
		})
	] });
}
function ClientsScreen() {
	const { session } = useSession();
	const db = useLookups();
	const nav = useNavigate();
	const [open, setOpen] = (0, import_react.useState)(false);
	const [q, setQ] = (0, import_react.useState)("");
	const isMgr = canAccess(session?.role, "manager");
	const rows = db.clients.filter((c) => (c.name + c.suburb).toLowerCase().includes(q.toLowerCase()));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHead, {
			title: "Clients",
			sub: isMgr ? "Active supports across metro Perth" : "Participants assigned to you",
			actions: isMgr ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
				onClick: () => setOpen(true),
				children: "Add client"
			}) : void 0
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
			value: q,
			onChange: (e) => setQ(e.target.value),
			placeholder: "Search…",
			className: "mb-3 max-w-xs"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
			className: "overflow-x-auto",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
				className: "w-full min-w-[640px] text-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", {
					className: "text-left text-[11px] tracking-wide text-muted uppercase",
					children: [
						"Name",
						"Suburb",
						"Plan",
						"Hrs",
						"Risk",
						"Status"
					].map((h) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
						className: "pb-2",
						children: h
					}, h))
				}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: rows.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
					className: "border-t border-border",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "py-3",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: `/clients/${c.id}`,
								className: "font-semibold hover:underline",
								children: c.name
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: c.suburb }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: c.plan }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: c.hours }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pill, {
							status: c.risk,
							children: c.risk
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pill, {
							status: c.status,
							children: c.status
						}) })
					]
				}, c.id)) })]
			})
		}),
		open && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Modal, {
			title: "Add client",
			onClose: () => setOpen(false),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit: (e) => {
					e.preventDefault();
					const fd = new FormData(e.currentTarget);
					const id = db.addClient({
						name: String(fd.get("name")),
						suburb: String(fd.get("suburb")),
						ndis: String(fd.get("ndis")),
						plan: String(fd.get("plan")),
						hours: Number(fd.get("hours") || 12),
						risk: fd.get("risk") || "low",
						privacyConsent: fd.get("consent") === "on"
					});
					setOpen(false);
					nav({
						to: "/clients/$clientId",
						params: { clientId: id }
					});
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Name",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							name: "name",
							required: true
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Suburb",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							name: "suburb",
							required: true
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "NDIS",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							name: "ndis",
							required: true
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Plan",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							name: "plan",
							required: true
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Hours",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							name: "hours",
							type: "number",
							defaultValue: 12
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Risk",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
							name: "risk",
							defaultValue: "low",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "low" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "medium" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "high" })
							]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PrivacyNotice, { variant: "collect" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "mb-3 flex items-start gap-2 text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "checkbox",
							name: "consent",
							className: "mt-0.5 size-4",
							required: true
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "The participant or their guardian consents to collecting this sensitive information for supports, safety, and NDIS claiming." })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
						type: "submit",
						children: "Save and open"
					})
				]
			})
		})
	] });
}
function ClientDetailScreen({ clientId }) {
	const { session } = useSession();
	const db = useLookups();
	const [assign, setAssign] = (0, import_react.useState)(false);
	const c = db.clients.find((x) => x.id === clientId);
	if (!c) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Missing, {
		what: "client",
		back: "/clients"
	});
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
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Crumb, { items: [{
			to: "/clients",
			label: "Clients"
		}, { label: c.name }] }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHead, {
			title: c.name,
			sub: `${c.suburb} · NDIS ${c.ndis} · ${c.plan}`,
			actions: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
					to: "/case-notes",
					search: {
						add: "1",
						client: c.id
					},
					children: "Add note"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
					to: "/incidents",
					search: {
						add: "1",
						client: c.id
					},
					variant: "ghost",
					children: "Report incident"
				}),
				isMgr ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
					to: "/clients/risk",
					variant: "ghost",
					children: "Risk register"
				}) : null
			] })
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-4 flex flex-wrap items-center gap-2",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pill, {
					status: c.status,
					children: c.status
				}),
				isMgr ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
					className: "h-9 w-40",
					"aria-label": "Risk level",
					value: c.risk,
					onChange: (e) => db.setClientRisk(c.id, e.target.value),
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "low",
							children: "low risk"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "medium",
							children: "medium risk"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "high",
							children: "high risk"
						})
					]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Pill, {
					status: c.risk,
					children: [c.risk, " risk"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "text-sm text-muted",
					children: [c.hours, " hrs / week"]
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "mb-4 text-xs leading-relaxed text-muted",
			children: ["The NDIS number is a government identifier, used only for the plan and claims. It is not the file number and it is not used for marketing.", c.privacyConsent ? ` Privacy consent is on file${c.consentAt ? ` (${c.consentAt})` : ""}.` : " Privacy consent is not on file yet — intake stays open until it is recorded."]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-4 lg:grid-cols-2",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mb-2 font-semibold",
					children: "Care plan"
				}), plans.length > 0 ? plans.map((plan) => isMgr ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/clients/care-plans",
					search: { client: c.id },
					className: "mb-2 block rounded-md p-2 hover:bg-bg last:mb-0",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-semibold",
							children: plan.name
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted",
							children: plan.goals.join(" · ")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pill, {
							status: plan.status,
							children: plan.status
						})
					]
				}, plan.id) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-2 rounded-md p-2 last:mb-0",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-semibold",
							children: plan.name
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted",
							children: plan.goals.join(" · ")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pill, {
							status: plan.status,
							children: plan.status
						})
					]
				}, plan.id)) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Empty, {
					title: "No care plan",
					action: isMgr ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
						to: "/clients/care-plans",
						search: {
							add: "1",
							client: c.id
						},
						children: "Open care plans"
					}) : void 0
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-2 flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-semibold",
							children: "Assigned staff"
						}), isMgr ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
							variant: "ghost",
							onClick: () => setAssign(true),
							children: "Assign"
						}) : null]
					}),
					c.staffIds.map((id) => {
						const s = db.staff.find((x) => x.id === id);
						if (!s) return null;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PersonLink, {
							href: `/staff/${id}`,
							name: s.name,
							meta: s.title
						}, id);
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-2 text-xs text-muted",
						children: [
							"Coordinator:",
							" ",
							coord ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: `/staff/${coord.id}`,
								className: "font-semibold hover:underline",
								children: coord.name
							}) : c.coordinator
						]
					})
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-2 flex justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-semibold",
						children: "Case notes"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/case-notes",
						search: { client: c.id },
						className: "text-sm text-primary",
						children: "All notes"
					})]
				}), notes.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted",
					children: "None yet."
				}) : notes.map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: `/case-notes/${n.id}`,
					className: "block rounded-md p-2 hover:bg-bg",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-xs text-muted",
						children: [
							n.date,
							" · ",
							db.staffName(n.staffId)
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm",
						children: n.body
					})]
				}, n.id))] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-2 flex justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-semibold",
						children: "Incidents"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/incidents",
						search: { client: c.id },
						className: "text-sm text-primary",
						children: "All incidents"
					})]
				}), incidents.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted",
					children: "None recorded."
				}) : incidents.map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: `/incidents/${i.id}`,
					className: "flex items-center justify-between rounded-md p-2 hover:bg-bg",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-sm",
						children: i.summary
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "flex gap-1",
						children: [i.reportable && i.status !== "closed" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pill, {
							status: "high",
							children: "24h"
						}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pill, {
							status: i.status,
							children: i.status
						})]
					})]
				}, i.id))] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mb-2 font-semibold",
					children: "Roster this week"
				}), shifts.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Empty, {
					title: "No shifts this week",
					action: isMgr ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
						to: "/roster",
						children: "Open roster"
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
						to: "/my-roster",
						children: "My roster"
					})
				}) : shifts.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: isMgr ? "/roster" : `/staff/${s.staffId}`,
					className: "flex justify-between rounded-md p-2 text-sm hover:bg-bg",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
						s.day,
						" ",
						s.window,
						" · ",
						db.staffName(s.staffId)
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pill, {
						status: s.status,
						children: s.status
					})]
				}, s.id))] }),
				isAdmin ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mb-2 font-semibold",
						children: "Invoices"
					}),
					invoices.map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: `/invoices/${i.id}`,
						className: "flex justify-between rounded-md p-2 text-sm hover:bg-bg",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
							i.number,
							" · ",
							i.period
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pill, {
							status: i.status,
							children: i.status
						})]
					}, i.id)),
					invoices.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Empty, {
						title: "No invoices",
						action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
							to: "/invoices",
							children: "Invoice book"
						})
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/financials",
						className: "mt-2 inline-block text-sm text-primary",
						children: "Financials"
					})
				] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mb-2 font-semibold",
						children: "Hours"
					}),
					db.timesheets.filter((t) => t.clientId === c.id && (isMgr || t.staffId === session?.staffId)).map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: `/timesheets/${t.id}`,
						className: "flex justify-between rounded-md p-2 text-sm hover:bg-bg",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
							t.date,
							" · ",
							db.staffName(t.staffId),
							" · ",
							t.hours,
							"h"
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pill, {
							status: t.status,
							children: t.status
						})]
					}, t.id)),
					isMgr ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/timesheets",
						search: { client: c.id },
						className: "mt-2 inline-block text-sm text-primary",
						children: "Timesheets"
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/my-timesheets",
						className: "mt-2 inline-block text-sm text-primary",
						children: "My timesheets"
					})
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mb-2 font-semibold",
						children: "Requests"
					}),
					reqs.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: `/requests/${r.id}`,
						className: "flex justify-between rounded-md p-2 text-sm hover:bg-bg",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: r.title }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pill, {
							status: r.status,
							children: r.status
						})]
					}, r.id)),
					reqs.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
						to: "/requests",
						search: {
							add: "1",
							client: c.id
						},
						variant: "ghost",
						children: "Open requests"
					}) : null
				] })
			]
		}),
		assign && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Modal, {
			title: "Assign staff",
			onClose: () => setAssign(false),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit: (e) => {
					e.preventDefault();
					const fd = new FormData(e.currentTarget);
					db.assignStaff(c.id, String(fd.get("staffId")));
					setAssign(false);
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Worker",
					children: unassigned.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted",
						children: "Everyone on the team is already assigned."
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
						name: "staffId",
						children: unassigned.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
							value: s.id,
							children: [
								s.name,
								" · ",
								rosterHold(s) ?? s.title
							]
						}, s.id))
					})
				}), unassigned.length === 0 ? null : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
					type: "submit",
					children: "Assign"
				})]
			})
		})
	] });
}
function CarePlansScreen() {
	const db = useLookups();
	const { session } = useSession();
	const nav = useNavigate();
	const search = useDeskSearch();
	const [open, setOpen] = (0, import_react.useState)(search.add === "1");
	const highlight = search.client;
	const isMgr = canAccess(session?.role, "manager");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHead, {
			title: "Care plans",
			sub: "Goals and approved supports",
			actions: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
				onClick: () => setOpen(true),
				children: "Add plan"
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid gap-3",
			children: db.carePlans.map((p) => {
				const c = db.clients.find((x) => x.id === p.clientId);
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
					className: highlight === p.clientId ? "ring-2 ring-primary/30" : "",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-start justify-between gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: `/clients/${p.clientId}`,
								className: "font-semibold hover:underline",
								children: c?.name
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm",
								children: p.name
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-muted",
								children: p.goals.join(" · ")
							})
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap items-center gap-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pill, {
									status: p.status,
									children: p.status
								}),
								isMgr && p.status !== "active" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
									onClick: () => db.setCarePlanStatus(p.id, "active"),
									children: "Activate"
								}) : null,
								isMgr && p.status === "active" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
									variant: "ghost",
									onClick: () => db.setCarePlanStatus(p.id, "review"),
									children: "Review"
								}) : null
							]
						})]
					})
				}, p.id);
			})
		}),
		open && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Modal, {
			title: "Add care plan",
			onClose: () => setOpen(false),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit: (e) => {
					e.preventDefault();
					const fd = new FormData(e.currentTarget);
					const clientId = String(fd.get("clientId"));
					db.addCarePlan({
						clientId,
						name: String(fd.get("name")),
						status: "draft",
						goals: String(fd.get("goals")).split(",").map((g) => g.trim()).filter(Boolean),
						start: perthShortDateYear()
					});
					setOpen(false);
					nav({
						to: "/clients/$clientId",
						params: { clientId }
					});
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Client",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
							name: "clientId",
							defaultValue: search.client ?? db.clients[0]?.id,
							children: db.clients.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: c.id,
								children: c.name
							}, c.id))
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Name",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							name: "name",
							required: true,
							defaultValue: "Support plan"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Goals",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							name: "goals",
							placeholder: "Comma separated",
							required: true
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
						type: "submit",
						children: "Save and open client"
					})
				]
			})
		})
	] });
}
function RiskScreen() {
	const ranked = [...useLookups().clients].sort((a, b) => [
		"low",
		"medium",
		"high"
	].indexOf(b.risk) - [
		"low",
		"medium",
		"high"
	].indexOf(a.risk));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHead, {
		title: "Risk register",
		sub: "Highest first. Open a person to act."
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: ranked.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PersonLink, {
		href: `/clients/${c.id}`,
		name: c.name,
		meta: c.suburb,
		right: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pill, {
			status: c.risk,
			children: c.risk
		})
	}, c.id)) })] });
}
function StaffScreen() {
	const db = useLookups();
	const nav = useNavigate();
	const [open, setOpen] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Guard, {
		min: "manager",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHead, {
				title: "Staff",
				sub: "Workforce, screening and first aid",
				actions: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
					onClick: () => setOpen(true),
					children: "Add staff"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
				className: "overflow-x-auto",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
					className: "w-full min-w-[720px] text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", {
						className: "text-left text-[11px] tracking-wide text-muted uppercase",
						children: [
							"Name",
							"Title",
							"NDIS",
							"WWCC",
							"First aid",
							"Status"
						].map((h) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "pb-2",
							children: h
						}, h))
					}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: db.staff.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						className: "border-t border-border",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "py-3",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: `/staff/${s.id}`,
									className: "font-semibold hover:underline",
									children: s.name
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: s.title }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pill, {
								status: s.ndisScreening,
								children: s.ndisScreening
							}) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pill, {
								status: s.wwcc,
								children: s.wwcc
							}) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pill, {
								status: s.firstAid,
								children: s.firstAid
							}) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pill, {
								status: s.status,
								children: s.status
							}) })
						]
					}, s.id)) })]
				})
			}),
			open && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Modal, {
				title: "Add staff",
				onClose: () => setOpen(false),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit: (e) => {
						e.preventDefault();
						const fd = new FormData(e.currentTarget);
						const id = db.addStaff({
							name: String(fd.get("name")),
							email: String(fd.get("email")),
							phone: String(fd.get("phone")),
							title: String(fd.get("title") || "Support Worker")
						});
						setOpen(false);
						nav({
							to: "/staff/$staffId",
							params: { staffId: id }
						});
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Name",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								name: "name",
								required: true
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Email",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								name: "email",
								type: "email",
								required: true
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Phone",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								name: "phone",
								required: true
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Title",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								name: "title",
								defaultValue: "Support Worker"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
							type: "submit",
							children: "Save and open"
						})
					]
				})
			})
		]
	});
}
function StaffDetailScreen({ staffId }) {
	const { session } = useSession();
	const db = useLookups();
	const s = db.staff.find((x) => x.id === staffId);
	const isMgr = canAccess(session?.role, "manager");
	if (!s) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Missing, {
		what: "staff member",
		back: isMgr ? "/staff" : homeFor(session?.role)
	});
	const assigned = db.clients.filter((c) => c.staffIds.includes(s.id));
	const sheets = db.timesheets.filter((t) => t.staffId === s.id);
	const training = db.training.filter((t) => t.staffId === s.id);
	const shifts = db.shifts.filter((x) => x.staffId === s.id);
	const hold = rosterHold(s);
	const warn = rosterWarn(s);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Crumb, { items: [{
			to: isMgr ? "/staff" : homeFor(session?.role),
			label: isMgr ? "Staff" : "Home"
		}, { label: s.name }] }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHead, {
			title: s.name,
			sub: `${s.title} · ${s.phone}`,
			actions: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [isMgr ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
				to: "/staff/training",
				children: "Training"
			}) : s.id === session?.staffId ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
				to: "/my-compliance",
				children: "My compliance"
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
				to: "/clients",
				variant: "ghost",
				children: "Clients"
			}), isMgr ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
				to: "/staff/compliance",
				variant: "ghost",
				children: "Compliance"
			}) : null] })
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-4 flex flex-wrap gap-2",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pill, {
					status: s.status,
					children: s.status
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Pill, {
					status: s.ndisScreening,
					children: ["NDIS screening ", s.ndisScreening]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Pill, {
					status: s.wwcc,
					children: ["WWCC ", s.wwcc]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Pill, {
					status: s.firstAid,
					children: ["First aid ", s.firstAid]
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "mb-3 text-xs text-muted",
			children: [
				"NDIS screening ",
				s.ndisScreeningExpiry,
				" · WWCC ",
				s.wwccExpiry,
				" · First aid ",
				s.firstAidExpiry
			]
		}),
		hold ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "mb-3 text-sm text-bad",
			children: [hold, ". Roster and check-in stay blocked until this is cleared."]
		}) : null,
		!hold && warn ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "mb-3 text-sm text-warn",
			children: [warn, ". Still clear to work."]
		}) : null,
		isMgr && (s.ndisScreening !== "ok" || s.wwcc !== "ok" || s.firstAid !== "ok" || s.status === "leave") ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-4 flex flex-wrap gap-2",
			children: [
				s.status === "leave" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
					onClick: () => db.setStaffStatus(s.id, "active"),
					children: "Return to work"
				}) : null,
				s.ndisScreening !== "ok" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
					variant: "ghost",
					onClick: () => db.markClearance(s.id, "ndis"),
					children: "Mark NDIS screening current"
				}) : null,
				s.wwcc !== "ok" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
					variant: "ghost",
					onClick: () => db.markClearance(s.id, "wwcc"),
					children: "Mark WWCC current"
				}) : null,
				s.firstAid !== "ok" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
					variant: "ghost",
					onClick: () => db.markClearance(s.id, "firstAid"),
					children: "Mark first aid current"
				}) : null
			]
		}) : null,
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-4 lg:grid-cols-2",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mb-2 font-semibold",
						children: "Assigned clients"
					}),
					assigned.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PersonLink, {
						href: `/clients/${c.id}`,
						name: c.name,
						meta: c.plan
					}, c.id)),
					assigned.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted",
						children: "No current assignments."
					}) : null
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mb-2 font-semibold",
					children: "This week"
				}), shifts.map((x) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: isMgr ? "/roster" : `/clients/${x.clientId}`,
					className: "flex justify-between rounded-md p-2 text-sm hover:bg-bg",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
						x.day,
						" ",
						x.window,
						" · ",
						db.clientName(x.clientId)
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pill, {
						status: x.status,
						children: x.status
					})]
				}, x.id))] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mb-2 font-semibold",
					children: "Timesheets"
				}), sheets.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: `/timesheets/${t.id}`,
					className: "flex justify-between rounded-md p-2 text-sm hover:bg-bg",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
						t.date,
						" ",
						db.clientName(t.clientId),
						" · ",
						t.hours,
						"h"
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pill, {
						status: t.status,
						children: t.status
					})]
				}, t.id))] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mb-2 font-semibold",
					children: "Training"
				}), training.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex justify-between rounded-md p-2 text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
						t.name,
						" · ",
						t.expiry
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pill, {
						status: t.status,
						children: t.status
					})]
				}, t.id))] })
			]
		})
	] });
}
function RosterScreen() {
	const db = useLookups();
	const [open, setOpen] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)("");
	const workers = db.staff.filter((s) => s.role === "support_worker" || s.role === "team_leader");
	const [staffId, setStaffId] = (0, import_react.useState)(workers[0]?.id ?? "");
	const picked = workers.find((s) => s.id === staffId);
	const hold = picked ? rosterHold(picked) : null;
	const warn = picked && !hold ? rosterWarn(picked) : null;
	const weekLabel = `${weekDays[0]} – ${weekDays[weekDays.length - 1]}`;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Guard, {
		min: "manager",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHead, {
				title: "Roster",
				sub: `Week of ${weekLabel} · Perth`,
				actions: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
					onClick: () => {
						setError("");
						setOpen(true);
					},
					children: "Add shift"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
					to: "/check-in",
					variant: "ghost",
					children: "Live check-in"
				})] })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
				className: "overflow-x-auto",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid min-w-[880px] gap-1",
					style: { gridTemplateColumns: `110px repeat(${weekDays.length}, minmax(72px, 1fr))` },
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {}),
						weekDays.map((d) => {
							const [weekday, ...rest] = d.split(" ");
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-[11px] font-semibold leading-tight text-muted",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "block",
									children: weekday
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "block font-medium",
									children: rest.join(" ")
								})]
							}, d);
						}),
						workers.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_react.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: `/staff/${s.id}`,
							className: "pt-2 text-xs font-semibold hover:underline",
							children: [s.name.split(" ")[0], rosterHold(s) ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "block text-[10px] font-medium text-bad",
								children: "Not clear"
							}) : null]
						}), weekDays.map((d) => {
							const cells = db.shifts.filter((x) => x.staffId === s.id && x.day === d);
							return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: `min-h-16 rounded-md border border-border p-1.5 text-[11px] ${cells.length ? "bg-bg" : ""}`,
								children: cells.length ? cells.map((cell) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: `/clients/${cell.clientId}`,
									className: "mb-1 block rounded-sm bg-surface px-1 py-0.5 leading-tight last:mb-0 hover:underline",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "block font-semibold",
										children: db.clientName(cell.clientId).split(" ")[0]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "block text-subtle",
										children: cell.window
									})]
								}, cell.id)) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-subtle",
									children: "off"
								})
							}, s.id + d);
						})] }, s.id))
					]
				})
			}),
			open && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Modal, {
				title: "Add shift",
				onClose: () => setOpen(false),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit: (e) => {
						e.preventDefault();
						const fd = new FormData(e.currentTarget);
						const result = db.addShift({
							staffId: String(fd.get("staffId")),
							clientId: String(fd.get("clientId")),
							day: String(fd.get("day")),
							window: String(fd.get("window") || "09–15")
						});
						if ("error" in result) {
							setError(result.error);
							return;
						}
						setError("");
						setOpen(false);
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Worker",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
								name: "staffId",
								value: staffId,
								onChange: (e) => {
									setStaffId(e.target.value);
									setError("");
								},
								children: workers.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
									value: s.id,
									children: [s.name, rosterHold(s) ? " · not clear" : ""]
								}, s.id))
							})
						}),
						hold ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mb-3 text-sm text-bad",
							children: [hold, ". They cannot be rostered until this is cleared."]
						}) : null,
						warn ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mb-3 text-sm text-warn",
							children: [warn, ". Still clear to roster."]
						}) : null,
						error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mb-3 text-sm text-bad",
							children: error
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Client",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
								name: "clientId",
								defaultValue: db.clients[0]?.id,
								children: db.clients.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: c.id,
									children: c.name
								}, c.id))
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Day",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
								name: "day",
								defaultValue: weekDays[0],
								children: weekDays.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: d }, d))
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Window",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								name: "window",
								defaultValue: "09–15"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
							type: "submit",
							disabled: !!hold,
							children: "Save to roster"
						})
					]
				})
			})
		]
	});
}
function CheckInScreen() {
	const { session } = useSession();
	const db = useLookups();
	const mine = session?.staffId;
	const isMgr = canAccess(session?.role, "manager");
	const open = db.checkins.filter((c) => !c.outAt);
	const [staffId, setStaffId] = (0, import_react.useState)(mine || db.staff[0]?.id || "s1");
	const [clientId, setClientId] = (0, import_react.useState)(db.clients[0]?.id ?? "c1");
	const [note, setNote] = (0, import_react.useState)("");
	const picked = db.staff.find((s) => s.id === staffId);
	const hold = picked ? rosterHold(picked) : null;
	const warn = picked && !hold ? rosterWarn(picked) : null;
	if (session?.role === "support_worker") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WorkerCheckInScreen, {});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHead, {
			title: "Live check-in",
			sub: "Who is on the floor right now"
		}),
		isMgr ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
			className: "mb-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mb-2 font-semibold",
					children: "Start a shift"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-3 sm:grid-cols-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Worker",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
							value: staffId,
							onChange: (e) => setStaffId(e.target.value),
							children: db.staff.filter((s) => s.role !== "client").map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: s.id,
								children: s.name
							}, s.id))
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Client",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
							value: clientId,
							onChange: (e) => setClientId(e.target.value),
							children: db.clients.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: c.id,
								children: c.name
							}, c.id))
						})
					})]
				}),
				hold ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mb-2 text-sm text-bad",
					children: [hold, ". Check-in stays blocked until this is cleared."]
				}) : null,
				warn ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mb-2 text-sm text-warn",
					children: [warn, ". Still clear to work."]
				}) : null,
				note ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mb-2 text-sm text-muted",
					children: note
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
					disabled: !!hold,
					onClick: () => setNote(db.checkIn(staffId, clientId) ?? `Checked in ${db.staffName(staffId)}.`),
					children: "Check in now"
				})
			]
		}) : null,
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-3",
			children: [open.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "flex flex-wrap items-center justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PersonLink, {
					href: `/staff/${c.staffId}`,
					name: db.staffName(c.staffId),
					meta: `with ${db.clientName(c.clientId)} · in ${displayClock(c.inAt)}`
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
						to: `/clients/${c.clientId}`,
						children: "Client"
					}), isMgr || mine === c.staffId ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
						variant: "ghost",
						onClick: () => db.checkOut(c.staffId),
						children: "Check out"
					}) : null]
				})]
			}, c.id)), open.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Empty, {
				title: "Nobody is checked in",
				action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
					to: "/roster",
					children: "Go to roster"
				})
			}) : null]
		})
	] });
}
function TimesheetsScreen() {
	const { session } = useSession();
	const db = useLookups();
	const nav = useNavigate();
	const search = useDeskSearch();
	const [open, setOpen] = (0, import_react.useState)(search.add === "1");
	const canApprove = canAccess(session?.role, "manager");
	const worker = session?.role === "support_worker";
	const rows = session?.role === "support_worker" && session.staffId ? db.timesheets.filter((t) => t.staffId === session.staffId) : search.client ? db.timesheets.filter((t) => t.clientId === search.client) : db.timesheets;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHead, {
			title: "Timesheets",
			sub: "Approve hours before claiming",
			actions: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
				onClick: () => setOpen(true),
				children: "Log hours"
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [rows.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-wrap items-center justify-between gap-2 border-b border-border py-3 last:border-0",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: `/timesheets/${t.id}`,
				className: "min-w-0",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-semibold",
						children: db.staffName(t.staffId)
					}),
					" · ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: db.clientName(t.clientId) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-xs text-muted",
						children: [
							t.date,
							" ",
							t.start,
							"–",
							t.end,
							" · ",
							t.hours,
							"h"
						]
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pill, {
					status: t.status,
					children: t.status
				}), canApprove && t.status !== "approved" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
					onClick: () => db.setTimesheetStatus(t.id, "approved"),
					children: "Approve"
				}) : null]
			})]
		}, t.id)), rows.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Empty, {
			title: "No timesheets",
			action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
				onClick: () => setOpen(true),
				children: "Log hours"
			})
		}) : null] }),
		open && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Modal, {
			title: "Log hours",
			onClose: () => setOpen(false),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit: (e) => {
					e.preventDefault();
					const fd = new FormData(e.currentTarget);
					const id = db.addTimesheet({
						staffId: String(fd.get("staffId") || session?.staffId || db.staff[0]?.id),
						clientId: String(fd.get("clientId")),
						date: String(fd.get("date")),
						start: String(fd.get("start")),
						end: String(fd.get("end")),
						hours: hoursBetween(String(fd.get("start")), String(fd.get("end"))),
						status: "submitted"
					});
					setOpen(false);
					nav({
						to: "/timesheets/$timesheetId",
						params: { timesheetId: id }
					});
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Worker",
						children: worker ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "hidden",
							name: "staffId",
							value: session?.staffId ?? ""
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm font-semibold",
							children: session?.name
						})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
							name: "staffId",
							defaultValue: session?.staffId ?? db.staff[0]?.id,
							children: db.staff.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: s.id,
								children: s.name
							}, s.id))
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Client",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
							name: "clientId",
							defaultValue: search.client ?? db.clients[0]?.id,
							children: db.clients.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: c.id,
								children: c.name
							}, c.id))
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Date",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							name: "date",
							defaultValue: perthShortDate()
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Start",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							name: "start",
							defaultValue: "07:00"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "End",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							name: "end",
							defaultValue: "15:00"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
						type: "submit",
						children: "Submit"
					})
				]
			})
		})
	] });
}
function TimesheetDetailScreen({ timesheetId }) {
	const { session } = useSession();
	const db = useLookups();
	const t = db.timesheets.find((x) => x.id === timesheetId);
	if (!t) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Missing, {
		what: "timesheet",
		back: "/timesheets"
	});
	if (session?.role === "support_worker" && session.staffId && t.staffId !== session.staffId) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Missing, {
		what: "timesheet",
		back: "/my-timesheets"
	});
	const related = db.invoices.filter((i) => i.timesheetIds.includes(t.id));
	const canApprove = canAccess(session?.role, "manager");
	const isAdmin = canAccess(session?.role, "admin");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Crumb, { items: [{
			to: "/timesheets",
			label: "Timesheets"
		}, { label: `${t.date} ${t.hours}h` }] }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHead, {
			title: `${db.staffName(t.staffId)} · ${t.hours}h`,
			sub: `${t.date} ${t.start}–${t.end}`
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pill, {
			status: t.status,
			children: t.status
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-4 flex flex-wrap gap-2",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
					to: `/staff/${t.staffId}`,
					children: "Worker"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
					to: `/clients/${t.clientId}`,
					variant: "ghost",
					children: "Client file"
				}),
				canApprove && t.status !== "approved" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
					onClick: () => db.setTimesheetStatus(t.id, "approved"),
					children: "Approve"
				}) : null,
				isAdmin ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
					to: "/invoices",
					variant: "ghost",
					children: "Invoices"
				}) : null
			]
		})] }),
		isAdmin ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
			className: "mt-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mb-2 font-semibold",
				children: "Claimed on"
			}), related.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted",
				children: "Not on a claim yet. Approve the hours, then pull them onto an invoice."
			}) : related.map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: `/invoices/${i.id}`,
				className: "flex justify-between py-2 text-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
					i.number,
					" · ",
					i.period
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pill, {
					status: i.status,
					children: i.status
				})]
			}, i.id))]
		}) : null
	] });
}
function NotesScreen() {
	const { session } = useSession();
	const db = useLookups();
	const nav = useNavigate();
	const search = useDeskSearch();
	const [open, setOpen] = (0, import_react.useState)(search.add === "1");
	const rows = search.client ? db.notes.filter((n) => n.clientId === search.client) : db.notes;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHead, {
			title: "Case notes",
			sub: "Shift records ready for audit",
			actions: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
				onClick: () => setOpen(true),
				children: "Add note"
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-3",
			children: [rows.map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: `/case-notes/${n.id}`,
				className: "block",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex justify-between gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-semibold",
							children: db.clientName(n.clientId)
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-xs text-muted",
							children: [
								n.date,
								" · ",
								n.shift
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm",
						children: n.body
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-2 text-xs text-muted",
						children: [
							"Logged by ",
							db.staffName(n.staffId),
							" · ",
							n.visibleToClient ? "Shared with portal" : "Staff only"
						]
					})
				] })
			}, n.id)), rows.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Empty, {
				title: "No notes yet",
				action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
					onClick: () => setOpen(true),
					children: "Add note"
				})
			}) : null]
		}),
		open && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Modal, {
			title: "Add case note",
			onClose: () => setOpen(false),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit: (e) => {
					e.preventDefault();
					const fd = new FormData(e.currentTarget);
					const id = db.addNote({
						clientId: String(fd.get("clientId")),
						staffId: session?.staffId || db.staff[0]?.id || "",
						date: perthShortDateYear(),
						shift: String(fd.get("shift") || "today"),
						body: String(fd.get("body")),
						kind: "daily care",
						visibleToClient: fd.get("share") === "on"
					});
					setOpen(false);
					nav({
						to: "/case-notes/$noteId",
						params: { noteId: id }
					});
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Client",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
							name: "clientId",
							defaultValue: search.client ?? db.clients[0]?.id,
							children: db.clients.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: c.id,
								children: c.name
							}, c.id))
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Shift window",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							name: "shift",
							defaultValue: "07:00–15:00"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Note",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
							name: "body",
							rows: 4,
							required: true
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "mb-3 flex items-start gap-2 text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "checkbox",
							name: "share",
							className: "mt-0.5 size-4"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Share with the participant’s portal. Leave off for staff-only observations." })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
						type: "submit",
						children: "Save and open"
					})
				]
			})
		})
	] });
}
function NoteDetailScreen({ noteId }) {
	const db = useLookups();
	const n = db.notes.find((x) => x.id === noteId);
	if (!n) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Missing, {
		what: "note",
		back: "/case-notes"
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Crumb, { items: [{
			to: "/case-notes",
			label: "Case notes"
		}, { label: n.date }] }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHead, {
			title: db.clientName(n.clientId),
			sub: `${n.date} · ${n.shift} · ${db.staffName(n.staffId)}`
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: n.body }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-xs text-muted",
				children: n.visibleToClient ? "Shared with the participant’s portal." : "Staff only — not shown in the portal."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 flex flex-wrap gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
						to: `/clients/${n.clientId}`,
						children: "Client file"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
						to: `/staff/${n.staffId}`,
						variant: "ghost",
						children: "Worker"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
						to: "/ask-maureen",
						variant: "ghost",
						children: "Ask Maureen"
					})
				]
			})
		] })
	] });
}
function IncidentsScreen() {
	const { session } = useSession();
	const db = useLookups();
	const nav = useNavigate();
	const search = useDeskSearch();
	const [open, setOpen] = (0, import_react.useState)(search.add === "1");
	const rows = search.client ? db.incidents.filter((i) => i.clientId === search.client) : db.incidents;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHead, {
			title: "Incidents",
			sub: "Follow-up, including 24-hour NDIS Commission notices",
			actions: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
				onClick: () => setOpen(true),
				children: "Report"
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-3",
			children: [rows.map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: `/incidents/${i.id}`,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: "flex items-start justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-semibold",
							children: db.clientName(i.clientId)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm",
							children: i.summary
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-xs text-muted",
							children: [
								i.when,
								" · ",
								db.staffName(i.staffId)
							]
						})
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "flex flex-col items-end gap-1",
						children: [i.reportable && i.status !== "closed" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pill, {
							status: "high",
							children: "24h notice"
						}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pill, {
							status: i.status,
							children: i.status
						})]
					})]
				})
			}, i.id)), rows.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Empty, {
				title: "No incidents",
				action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
					onClick: () => setOpen(true),
					children: "Report"
				})
			}) : null]
		}),
		open && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Modal, {
			title: "Report incident",
			onClose: () => setOpen(false),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit: (e) => {
					e.preventDefault();
					const fd = new FormData(e.currentTarget);
					const id = db.addIncident({
						clientId: String(fd.get("clientId")),
						staffId: session?.staffId || db.staff[0]?.id || "",
						severity: String(fd.get("severity")) || "low",
						status: "open",
						reportable: fd.get("reportable") === "on",
						when: perthNow(),
						summary: String(fd.get("summary")),
						followUp: fd.get("reportable") === "on" ? "Notify the NDIS Commission within 24 hours. This demo records the flag and does not lodge the notice." : "Awaiting manager review."
					});
					setOpen(false);
					nav({
						to: "/incidents/$incidentId",
						params: { incidentId: id }
					});
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Client",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
							name: "clientId",
							defaultValue: search.client ?? db.clients[0]?.id,
							children: db.clients.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: c.id,
								children: c.name
							}, c.id))
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Severity",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
							name: "severity",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "low" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "moderate" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "high" })
							]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Summary",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
							name: "summary",
							rows: 3,
							required: true
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "mb-3 flex items-start gap-2 text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "checkbox",
							name: "reportable",
							className: "mt-0.5 size-4"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Reportable to the NDIS Commission within 24 hours — death, serious injury, abuse or neglect, unlawful contact, sexual misconduct, or an unauthorised restrictive practice." })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
						type: "submit",
						children: "Save and open"
					})
				]
			})
		})
	] });
}
function IncidentDetailScreen({ incidentId }) {
	const { session } = useSession();
	const db = useLookups();
	const i = db.incidents.find((x) => x.id === incidentId);
	if (!i) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Missing, {
		what: "incident",
		back: "/incidents"
	});
	const canClose = session?.role !== "support_worker";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Crumb, { items: [{
			to: "/incidents",
			label: "Incidents"
		}, { label: db.clientName(i.clientId) }] }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHead, {
			title: db.clientName(i.clientId),
			sub: `${i.when} · ${i.severity}${i.reportable ? " · reportable" : ""}`
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pill, {
					status: i.status,
					children: i.status
				}), i.reportable ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pill, {
					status: "high",
					children: "24h notice"
				}) : null]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3",
				children: i.summary
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm text-muted",
				children: i.followUp
			}),
			canClose ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "mt-3",
				onSubmit: (e) => {
					e.preventDefault();
					db.setIncidentFollowUp(i.id, String(new FormData(e.currentTarget).get("followUp") || ""));
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Update follow-up",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
						name: "followUp",
						defaultValue: i.followUp,
						rows: 2
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
					type: "submit",
					children: "Save follow-up"
				})]
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-xs leading-relaxed text-muted",
				children: i.reportable ? "Reportable incidents are notified to the NDIS Commission within 24 hours of key personnel becoming aware. Aged care SIRS Priority 1 incidents follow the same 24-hour clock. This demo records the flag only — it does not lodge the notice." : "Not marked reportable. A death, serious injury, abuse or neglect, unlawful contact, sexual misconduct, or unauthorised restrictive practice must be notified to the NDIS Commission within 24 hours."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 flex flex-wrap gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
						to: `/clients/${i.clientId}`,
						children: "Client file"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
						to: `/staff/${i.staffId}`,
						variant: "ghost",
						children: "Reporter"
					}),
					canClose && i.status === "open" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
						variant: "ghost",
						onClick: () => db.setIncidentStatus(i.id, "investigating"),
						children: "Investigate"
					}) : null,
					canClose && i.status !== "closed" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
						onClick: () => db.setIncidentStatus(i.id, "closed"),
						children: "Close incident"
					}) : null
				]
			})
		] })
	] });
}
function InvoicesScreen() {
	const db = useLookups();
	const nav = useNavigate();
	const [open, setOpen] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Guard, {
		min: "admin",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHead, {
				title: "Invoices",
				sub: "NDIS claiming book",
				actions: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
					onClick: () => setOpen(true),
					children: "Draft invoice"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
					to: "/financials",
					variant: "ghost",
					children: "Financials"
				})] })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: db.invoices.map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: `/invoices/${i.id}`,
				className: "flex items-center justify-between border-b border-border py-3 last:border-0",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-semibold",
					children: i.number
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "block text-xs text-muted",
					children: [
						db.clientName(i.clientId),
						" · ",
						i.period
					]
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "tabular-nums",
						children: money(i.amount)
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pill, {
						status: i.status,
						children: i.status
					})]
				})]
			}, i.id)) }),
			open && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Modal, {
				title: "Draft invoice",
				onClose: () => setOpen(false),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit: (e) => {
						e.preventDefault();
						const fd = new FormData(e.currentTarget);
						const id = db.addInvoice({
							clientId: String(fd.get("clientId")),
							amount: Number(fd.get("amount") || 0),
							status: "draft",
							period: String(fd.get("period") || "Oct 2026"),
							timesheetIds: []
						});
						setOpen(false);
						nav({
							to: "/invoices/$invoiceId",
							params: { invoiceId: id }
						});
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Client",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
								name: "clientId",
								children: db.clients.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: c.id,
									children: c.name
								}, c.id))
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Period",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								name: "period",
								defaultValue: "Oct 2026"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Amount",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								name: "amount",
								type: "number",
								defaultValue: 0
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
							type: "submit",
							children: "Save and open"
						})
					]
				})
			})
		]
	});
}
function InvoiceDetailScreen({ invoiceId }) {
	const db = useLookups();
	const [pullNote, setPullNote] = (0, import_react.useState)("");
	const i = db.invoices.find((x) => x.id === invoiceId);
	if (!i) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Missing, {
		what: "invoice",
		back: "/invoices"
	});
	const linked = db.timesheets.filter((t) => i.timesheetIds.includes(t.id));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Guard, {
		min: "admin",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Crumb, { items: [{
				to: "/invoices",
				label: "Invoices"
			}, { label: i.number }] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHead, {
				title: i.number,
				sub: `${db.clientName(i.clientId)} · ${i.period}`
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-3xl font-semibold tabular-nums",
					children: money(i.amount)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-xs leading-relaxed text-muted",
					children: CLAIM_NOTE
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-3",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pill, {
						status: i.status,
						children: i.status
					})
				}),
				pullNote ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted",
					children: pullNote
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 flex flex-wrap gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
							to: `/clients/${i.clientId}`,
							children: "Client file"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
							to: "/timesheets",
							search: { client: i.clientId },
							variant: "ghost",
							children: "Timesheets"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
							variant: "ghost",
							onClick: () => {
								const pulled = db.attachApprovedHours(i.id);
								setPullNote(pulled.count ? `Attached ${pulled.count} approved timesheet${pulled.count === 1 ? "" : "s"} · ${money(pulled.amount)}.` : "No unclaimed approved hours for this client.");
							},
							children: "Pull approved hours"
						}),
						i.status === "draft" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
							onClick: () => db.setInvoiceStatus(i.id, "sent"),
							children: "Mark sent"
						}) : null,
						i.status === "sent" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
							onClick: () => db.setInvoiceStatus(i.id, "paid"),
							children: "Mark paid"
						}) : null
					]
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "mt-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mb-2 font-semibold",
					children: "Claimed hours"
				}), linked.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted",
					children: "None attached. Pull approved hours from the client book."
				}) : linked.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: `/timesheets/${t.id}`,
					className: "flex justify-between py-2 text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
						t.date,
						" · ",
						db.staffName(t.staffId),
						" · ",
						t.hours,
						"h"
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pill, {
						status: t.status,
						children: t.status
					})]
				}, t.id))]
			})
		]
	});
}
function MaureenScreen() {
	const { session } = useSession();
	const db = useLookups();
	const [q, setQ] = (0, import_react.useState)("");
	const [msgs, setMsgs] = (0, import_react.useState)([{
		who: "maureen",
		text: "Ask about a person, roster, incidents, hours, or invoices. I will open the record."
	}]);
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
			reply = live.length ? live.map((s) => `${db.staffName(s.staffId).split(" ")[0]} with ${db.clientName(s.clientId).split(" ")[0]} ${s.day} ${s.window} (${s.status.replace("_", " ")})`).join(". ") : "No shifts loaded this week.";
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
		setMsgs((m) => [
			...m,
			{
				who: "you",
				text
			},
			{
				who: "maureen",
				text: reply,
				href
			}
		]);
		setQ("");
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHead, {
		title: "Ask Maureen",
		sub: "Operations assistant — answers include a live link"
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-4 flex items-center gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: "/brand/maureen.png",
				alt: "",
				className: "size-12 rounded-full border-2 border-primary/20 object-cover"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm font-bold text-primary",
				children: "Maureen"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs text-muted",
				children: "Ask about a person, roster, incidents, hours, or invoices."
			})] })]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "space-y-2",
			children: msgs.map((m, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: `rounded-md p-3 text-sm ${m.who === "maureen" ? "bg-primary-soft/60" : "border border-border"}`,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: m.text }), m.href ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: m.href,
					className: "mt-1 inline-block text-primary",
					children: "Open record"
				}) : null]
			}, i))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-4 flex gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
				value: q,
				onChange: (e) => setQ(e.target.value),
				onKeyDown: (e) => e.key === "Enter" && send(),
				placeholder: "Ask about Robert, Emma, roster, incidents…"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
				onClick: send,
				children: "Send"
			})]
		})
	] })] });
}
function AnalyticsScreen() {
	const db = useLookups();
	const hours = db.timesheets.reduce((s, t) => s + t.hours, 0);
	const fill = Math.round(db.timesheets.filter((t) => t.status !== "draft").length / Math.max(db.timesheets.length, 1) * 100);
	const unclaimed = db.invoices.filter((i) => i.status !== "paid").reduce((s, i) => s + i.amount, 0);
	const rows = db.clients.map((c) => {
		const booked = db.timesheets.filter((t) => t.clientId === c.id).reduce((s, t) => s + t.hours, 0);
		return {
			id: c.id,
			name: c.name,
			booked,
			plan: c.hours
		};
	});
	const max = Math.max(1, ...rows.map((r) => Math.max(r.booked, r.plan)));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Guard, {
		min: "admin",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHead, {
				title: "Analytics",
				sub: "Utilisation against the plan",
				actions: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
					to: "/reports",
					variant: "ghost",
					children: "Reports"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-3 sm:grid-cols-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-3xl font-semibold",
							children: [fill, "%"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted",
							children: "Timesheets past draft"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/timesheets",
							className: "text-sm text-primary",
							children: "Timesheets"
						})
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-3xl font-semibold",
							children: [hours, "h"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted",
							children: "Hours in the book"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/roster",
							className: "text-sm text-primary",
							children: "Roster"
						})
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-3xl font-semibold",
							children: money(unclaimed)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted",
							children: "Unpaid"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/invoices",
							className: "text-sm text-primary",
							children: "Invoices"
						})
					] })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "mt-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mb-3 font-semibold",
					children: "Hours booked vs plan"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "space-y-3",
					children: rows.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: `/clients/${r.id}`,
						className: "block",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mb-1 flex justify-between text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-semibold",
								children: r.name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-muted",
								children: [
									r.booked,
									"h booked · ",
									r.plan,
									"h plan"
								]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "h-2 overflow-hidden rounded-full bg-bg",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "h-full rounded-full bg-primary",
								style: { width: `${Math.round(r.booked / max * 100)}%` }
							})
						})]
					}, r.id))
				})]
			})
		]
	});
}
function FinancialsScreen() {
	const db = useLookups();
	const total = db.invoices.reduce((s, i) => s + i.amount, 0);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Guard, {
		min: "admin",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHead, {
			title: "Financials",
			sub: `Book total ${money(total)}`,
			actions: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
				to: "/invoices",
				children: "Invoices"
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: db.clients.map((c) => {
			const inv = db.invoices.filter((i) => i.clientId === c.id);
			const sum = inv.reduce((s, i) => s + i.amount, 0);
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center justify-between gap-2 border-b border-border py-3 last:border-0",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: `/clients/${c.id}`,
					className: "font-semibold hover:underline",
					children: c.name
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "flex flex-wrap items-center gap-2",
					children: [inv.map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: `/invoices/${i.id}`,
						className: "text-sm text-primary hover:underline",
						children: i.number
					}, i.id)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "tabular-nums",
						children: money(sum)
					})]
				})]
			}, c.id);
		}) })]
	});
}
function ReportsScreen() {
	const db = useLookups();
	const openIncidents = db.incidents.filter((i) => i.status !== "closed");
	const waiting = db.timesheets.filter((t) => t.status !== "approved");
	const expiring = db.staff.filter((s) => s.wwcc !== "ok" || s.firstAid !== "ok" || s.ndisScreening !== "ok");
	const unpaid = db.invoices.filter((i) => i.status !== "paid");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Guard, {
		min: "admin",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHead, {
			title: "Reports",
			sub: `${db.org?.name ?? "Carters Care"} · ${perthDate()}`,
			actions: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				className: "no-print inline-flex min-h-11 items-center rounded-md border border-border bg-surface px-3.5 text-sm font-semibold",
				onClick: () => window.print(),
				children: "Print pack"
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-3 sm:grid-cols-2",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-2 flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-semibold",
							children: "Utilisation"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/analytics",
							className: "text-sm text-primary",
							children: "Analytics"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-sm",
						children: [
							db.timesheets.reduce((s, t) => s + t.hours, 0),
							" hours on file. ",
							waiting.length,
							" still need approval."
						]
					}),
					waiting.slice(0, 4).map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: `/timesheets/${t.id}`,
						className: "mt-2 block text-sm hover:underline",
						children: [
							db.staffName(t.staffId),
							" · ",
							db.clientName(t.clientId),
							" · ",
							t.hours,
							"h"
						]
					}, t.id))
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-2 flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-semibold",
						children: "Compliance"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/compliance",
						className: "text-sm text-primary",
						children: "Register"
					})]
				}), expiring.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted",
					children: "Screening, WWCC and first aid are current."
				}) : expiring.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: `/staff/${s.id}`,
					className: "mt-2 flex justify-between text-sm hover:underline",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: s.name }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "text-muted",
						children: [
							"NDIS ",
							s.ndisScreening,
							" · WWCC ",
							s.wwcc,
							" · aid ",
							s.firstAid
						]
					})]
				}, s.id))] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-2 flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-semibold",
						children: "Incidents"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/incidents",
						className: "text-sm text-primary",
						children: "Log"
					})]
				}), openIncidents.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted",
					children: "None open."
				}) : openIncidents.map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: `/incidents/${i.id}`,
					className: "mt-2 block text-sm hover:underline",
					children: [
						db.clientName(i.clientId),
						" · ",
						i.status
					]
				}, i.id))] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-2 flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-semibold",
							children: "Claims"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/financials",
							className: "text-sm text-primary",
							children: "Financials"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-sm",
						children: [money(unpaid.reduce((s, i) => s + i.amount, 0)), " not yet paid."]
					}),
					unpaid.map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: `/invoices/${i.id}`,
						className: "mt-2 block text-sm hover:underline",
						children: [
							i.number,
							" · ",
							db.clientName(i.clientId),
							" · ",
							money(i.amount)
						]
					}, i.id))
				] })
			]
		})]
	});
}
function SettingsScreen() {
	const db = useLookups();
	const base = db.org ?? {
		name: "Carters Care Group",
		phone: "1800 CARTERS",
		email: "hello@carterscare.com.au",
		abn: "61 448 220 193",
		region: "Perth metro · Australia/Perth"
	};
	const [org, setOrg] = (0, import_react.useState)(base);
	const [saved, setSaved] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Guard, {
		min: "admin",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHead, {
			title: "Settings",
			sub: org.region
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-3 sm:grid-cols-2",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-semibold",
						children: "Organisation"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mb-3 text-sm text-muted",
						children: "Shown on reports and the client portal."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						onSubmit: (e) => {
							e.preventDefault();
							db.setOrg(org);
							setSaved(true);
						},
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Name",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									value: org.name,
									onChange: (e) => {
										setOrg({
											...org,
											name: e.target.value
										});
										setSaved(false);
									},
									required: true
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Phone",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									value: org.phone,
									onChange: (e) => {
										setOrg({
											...org,
											phone: e.target.value
										});
										setSaved(false);
									},
									required: true
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Email",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									type: "email",
									value: org.email,
									onChange: (e) => {
										setOrg({
											...org,
											email: e.target.value
										});
										setSaved(false);
									},
									required: true
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "ABN",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									value: org.abn,
									onChange: (e) => {
										setOrg({
											...org,
											abn: e.target.value
										});
										setSaved(false);
									},
									required: true
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
									type: "submit",
									children: "Save organisation"
								}), saved ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-sm text-ok",
									children: "Saved"
								}) : null]
							})
						]
					})
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-semibold",
						children: "Desks"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mb-3 text-sm text-muted",
						children: "Admin work that still needs a human."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
								to: "/tidy-up",
								children: "Tidy up"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
								to: "/invoices",
								variant: "ghost",
								children: "Invoices"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
								to: "/reports",
								variant: "ghost",
								children: "Reports"
							})
						]
					})
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-semibold",
						children: "Demo data"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mb-3 text-sm text-muted",
						children: "Reset deletes the local record on this browser, including organisation details, and restores the seed set. Do not store a real participant here."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
						variant: "ghost",
						onClick: () => {
							db.reset();
							setOrg(seed.org);
							setSaved(false);
						},
						children: "Reset demo data"
					})
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: "sm:col-span-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-semibold",
							children: "Privacy"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-2",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PrivacyNotice, { variant: "full" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-3",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
								to: "/compliance",
								variant: "ghost",
								children: "Compliance desk"
							})
						})
					]
				})
			]
		})]
	});
}
function TidyUpScreen() {
	const db = useLookups();
	const items = [
		...db.timesheets.filter((t) => t.status !== "approved").map((t) => ({
			href: `/timesheets/${t.id}`,
			title: `Timesheet ${db.staffName(t.staffId)}`,
			status: t.status
		})),
		...db.incidents.filter((i) => i.status !== "closed").map((i) => ({
			href: `/incidents/${i.id}`,
			title: `Incident ${db.clientName(i.clientId)}`,
			status: i.status
		})),
		...db.staff.filter((s) => s.firstAid !== "ok" || s.wwcc !== "ok" || s.ndisScreening !== "ok").map((s) => ({
			href: `/staff/${s.id}`,
			title: `Clearance ${s.name}`,
			status: s.firstAid !== "ok" ? s.firstAid : s.wwcc !== "ok" ? s.wwcc : s.ndisScreening
		})),
		...db.incidents.filter((i) => i.reportable && i.status !== "closed").map((i) => ({
			href: `/incidents/${i.id}`,
			title: `24h notice ${db.clientName(i.clientId)}`,
			status: "high"
		})),
		...db.invoices.filter((i) => i.status === "draft").map((i) => ({
			href: `/invoices/${i.id}`,
			title: i.number,
			status: i.status
		})),
		...db.onboarding.filter((o) => o.status === "pending").map((o) => ({
			href: o.subjectType === "client" ? `/clients/${o.subjectId}` : `/staff/${o.subjectId}`,
			title: o.name,
			status: o.status
		})),
		...db.requests.filter((r) => r.status !== "resolved").map((r) => ({
			href: `/requests/${r.id}`,
			title: r.title,
			status: r.status
		}))
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Guard, {
		min: "admin",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHead, {
			title: "Tidy up",
			sub: "Every flag opens the record that owns it"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [items.map((it, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
			to: it.href,
			className: "flex justify-between rounded-md p-2 hover:bg-bg",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: it.title }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pill, {
				status: it.status,
				children: it.status
			})]
		}, i)), items.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Empty, {
			title: "Floor is clear",
			action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
				to: "/home",
				children: "Dashboard"
			})
		}) : null] })]
	});
}
function OnboardingScreen() {
	const db = useLookups();
	const rows = db.onboarding.filter((o) => o.subjectType === "client");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Guard, {
		min: "manager",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHead, {
			title: "Client onboarding",
			sub: "Intake still open"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [rows.map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-wrap items-center justify-between gap-2 border-b border-border py-3 last:border-0",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: `/clients/${o.subjectId}`,
				className: "font-semibold hover:underline",
				children: [
					db.clientName(o.subjectId),
					" · ",
					o.name
				]
			}), o.status === "pending" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
				onClick: () => db.completeTask(o.id),
				children: "Mark done"
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pill, {
				status: "done",
				children: "done"
			})]
		}, o.id)), rows.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Empty, {
			title: "No client intake tasks",
			action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
				to: "/clients",
				children: "Clients"
			})
		}) : null] })]
	});
}
function StaffOnboardingScreen() {
	const { session } = useSession();
	const db = useLookups();
	const isMgr = canAccess(session?.role, "manager");
	const rows = db.onboarding.filter((o) => o.subjectType === "staff" && (isMgr || o.subjectId === session?.staffId));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Guard, {
		min: "support_worker",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHead, {
			title: "Onboarding",
			sub: isMgr ? "Return-to-work and induction" : "Your induction tasks"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [rows.map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-wrap items-center justify-between gap-2 py-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: `/staff/${o.subjectId}`,
				className: "font-semibold hover:underline",
				children: [
					db.staffName(o.subjectId),
					" · ",
					o.name
				]
			}), o.status === "pending" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
				onClick: () => db.completeTask(o.id),
				children: "Mark done"
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pill, {
				status: "done",
				children: "done"
			})]
		}, o.id)), rows.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Empty, {
			title: "No onboarding tasks",
			action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
				to: isMgr ? "/staff" : "/my-compliance",
				children: isMgr ? "Staff list" : "My compliance"
			})
		}) : null] })]
	});
}
function RequestsScreen() {
	const { session } = useSession();
	const db = useLookups();
	const nav = useNavigate();
	const search = useDeskSearch();
	const [open, setOpen] = (0, import_react.useState)(search.add === "1");
	const isClient = session?.role === "client";
	const rows = isClient && session.clientId ? db.requests.filter((r) => r.clientId === session.clientId) : db.requests;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		isClient ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Crumb, { items: [{
			to: "/client-portal",
			label: "Portal"
		}, { label: "Requests" }] }) : null,
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHead, {
			title: "Requests",
			sub: "Client and family asks",
			actions: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
				onClick: () => setOpen(true),
				children: "New request"
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [rows.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
			to: `/requests/${r.id}`,
			className: "flex flex-wrap items-center justify-between gap-2 border-b border-border py-3 last:border-0",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-semibold",
				children: isClient ? r.title : db.clientName(r.clientId)
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted",
				children: isClient ? REQUEST_LABEL[r.type] : `${r.title} · ${REQUEST_LABEL[r.type]}`
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pill, {
				status: r.status,
				children: r.status
			})]
		}, r.id)), rows.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Empty, {
			title: "No requests",
			action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
				onClick: () => setOpen(true),
				children: "New request"
			})
		}) : null] }),
		open && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Modal, {
			title: "New request",
			onClose: () => setOpen(false),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit: (e) => {
					e.preventDefault();
					const fd = new FormData(e.currentTarget);
					const id = db.addRequest({
						clientId: String(fd.get("clientId") || session?.clientId || "c1"),
						title: String(fd.get("title")),
						status: "pending",
						notes: String(fd.get("notes") || ""),
						type: String(fd.get("type") || "other")
					});
					setOpen(false);
					nav({
						to: "/requests/$requestId",
						params: { requestId: id }
					});
				},
				children: [
					isClient ? null : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Client",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
							name: "clientId",
							defaultValue: search.client ?? session?.clientId ?? "c1",
							children: db.clients.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: c.id,
								children: c.name
							}, c.id))
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Type",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
							name: "type",
							defaultValue: "other",
							children: Object.keys(REQUEST_LABEL).map((k) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: k,
								children: REQUEST_LABEL[k]
							}, k))
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Request",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							name: "title",
							required: true
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Details",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
							name: "notes",
							rows: 3
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
						type: "submit",
						children: "Save and open"
					})
				]
			})
		})
	] });
}
function RequestDetailScreen({ requestId }) {
	const { session } = useSession();
	const db = useLookups();
	const [reply, setReply] = (0, import_react.useState)("");
	const r = db.requests.find((x) => x.id === requestId);
	const isClient = session?.role === "client";
	if (!r) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Missing, {
		what: "request",
		back: "/requests"
	});
	if (isClient && session.clientId && r.clientId !== session.clientId) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Missing, {
		what: "request",
		back: "/requests"
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Crumb, { items: [{
			to: isClient ? "/client-portal" : "/requests",
			label: isClient ? "Portal" : "Requests"
		}, { label: r.title }] }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHead, {
			title: r.title,
			sub: isClient ? REQUEST_LABEL[r.type] : `${db.clientName(r.clientId)} · ${REQUEST_LABEL[r.type]}`
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pill, {
				status: r.status,
				children: r.status
			}),
			r.notes ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-sm",
				children: r.notes
			}) : null,
			r.reply ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-3 text-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-semibold",
					children: "Team reply. "
				}), r.reply]
			}) : null,
			!isClient && r.status !== "resolved" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Reply to the participant",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
						value: reply,
						onChange: (e) => setReply(e.target.value),
						rows: 2,
						placeholder: "They will see this on the request"
					})
				})
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 flex flex-wrap gap-2",
				children: [
					isClient ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
						to: "/client-portal",
						variant: "ghost",
						children: "Portal"
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
						to: `/clients/${r.clientId}`,
						children: "Client file"
					}),
					isClient ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
						to: "/requests",
						variant: "ghost",
						children: "All requests"
					}) : null,
					!isClient && r.status !== "resolved" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [r.status === "pending" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
						variant: "ghost",
						onClick: () => db.setRequestStatus(r.id, "in_progress"),
						children: "Start"
					}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
						onClick: () => db.setRequestStatus(r.id, "resolved", reply),
						children: "Resolve"
					})] }) : null
				]
			})
		] })
	] });
}
function WorkerHomeScreen() {
	const { session } = useSession();
	const db = useLookups();
	const staffId = session?.staffId || "s1";
	const open = db.checkins.find((c) => c.staffId === staffId && !c.outAt);
	const mine = db.timesheets.filter((t) => t.staffId === staffId);
	const upcoming = db.shifts.filter((s) => s.staffId === staffId && (s.status === "scheduled" || s.status === "in_progress")).sort((a, b) => weekDays.indexOf(a.day) - weekDays.indexOf(b.day));
	const next = upcoming.find((s) => s.status === "in_progress") ?? upcoming[0];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHead, {
		title: `${perthGreeting()}, ${session?.name.split(" ")[0] ?? "there"}.`,
		sub: "Your shift desk"
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-3 sm:grid-cols-2",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
				open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pill, {
					status: "ok",
					children: "checked in"
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pill, {
					status: "warn",
					children: "not on shift"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-2 text-lg font-semibold",
					children: open ? db.clientName(open.clientId) : next ? `${db.clientName(next.clientId)} · ${next.day} ${next.window}` : "No shift loaded"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-3 flex flex-wrap gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
							to: "/worker/check-in",
							children: open ? "Check out" : "Check in"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
							to: "/worker/notes",
							variant: "ghost",
							children: "Log note"
						}),
						open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
							to: `/clients/${open.clientId}`,
							variant: "ghost",
							children: "Client file"
						}) : next ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
							to: `/clients/${next.clientId}`,
							variant: "ghost",
							children: "Client file"
						}) : null
					]
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-semibold",
				children: "Shortcuts"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-2 grid gap-2",
				children: [
					["/my-roster", "My roster"],
					["/my-timesheets", "My timesheets"],
					["/my-compliance", "My compliance"],
					["/incidents", "Incidents"],
					["/ask-maureen", "Ask Maureen"]
				].map(([to, label]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to,
					className: "rounded-md bg-bg px-3 py-2 text-sm font-semibold",
					children: label
				}, to))
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-semibold",
					children: "My timesheets"
				}),
				mine.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: `/timesheets/${t.id}`,
					className: "flex justify-between py-2 text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
						t.date,
						" ",
						db.clientName(t.clientId)
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pill, {
						status: t.status,
						children: t.status
					})]
				}, t.id)),
				mine.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted",
					children: "None yet. Check out to draft one."
				}) : null
			] })
		]
	})] });
}
function WorkerCheckInScreen() {
	const { session } = useSession();
	const db = useLookups();
	const staffId = session?.staffId || "s1";
	const open = db.checkins.find((c) => c.staffId === staffId && !c.outAt);
	const suggested = db.shifts.find((s) => s.staffId === staffId && (s.status === "in_progress" || s.status === "scheduled"))?.clientId ?? db.clients[0]?.id ?? "c1";
	const [clientId, setClientId] = (0, import_react.useState)(suggested);
	const me = db.staff.find((s) => s.id === staffId);
	const hold = me ? rosterHold(me) : "Your staff file is missing.";
	const warn = me && !hold ? rosterWarn(me) : null;
	const [note, setNote] = (0, import_react.useState)("");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Crumb, { items: [{
			to: "/worker",
			label: "My shift"
		}, { label: "Check-in" }] }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHead, {
			title: "Check in",
			sub: "GPS is simulated in this demo"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: open ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "font-semibold",
				children: [
					"On shift with ",
					db.clientName(open.clientId),
					" since ",
					displayClock(open.inAt)
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-muted",
				children: "Checking out writes a draft timesheet for today."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-3 flex gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
						onClick: () => db.checkOut(staffId),
						children: "Check out"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
						to: `/clients/${open.clientId}`,
						variant: "ghost",
						children: "Client file"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
						to: "/worker/notes",
						variant: "ghost",
						children: "Log note"
					})
				]
			})
		] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Client",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
					value: clientId,
					onChange: (e) => setClientId(e.target.value),
					children: db.clients.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: c.id,
						children: c.name
					}, c.id))
				})
			}),
			hold ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mb-3 text-sm text-bad",
				children: [hold, ". Check-in stays blocked until this is cleared."]
			}) : null,
			warn ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mb-3 text-sm text-warn",
				children: [warn, ". Still clear to work."]
			}) : null,
			note ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mb-3 text-sm text-muted",
				children: note
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
					disabled: !!hold,
					onClick: () => setNote(db.checkIn(staffId, clientId) ?? "Checked in."),
					children: "Check in now"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
					to: `/clients/${clientId}`,
					variant: "ghost",
					children: "Client file"
				})]
			})
		] }) })
	] });
}
function WorkerNotesScreen() {
	const { session } = useSession();
	const db = useLookups();
	const nav = useNavigate();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Crumb, { items: [{
			to: "/worker",
			label: "My shift"
		}, { label: "Note" }] }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHead, {
			title: "Log a note",
			sub: "Saves to the client file and the notes book"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			onSubmit: (e) => {
				e.preventDefault();
				const fd = new FormData(e.currentTarget);
				const id = db.addNote({
					clientId: String(fd.get("clientId")),
					staffId: session?.staffId || "s1",
					date: perthShortDateYear(),
					shift: String(fd.get("shift") || "current"),
					body: String(fd.get("body")),
					kind: "daily care",
					visibleToClient: fd.get("share") === "on"
				});
				nav({
					to: "/case-notes/$noteId",
					params: { noteId: id }
				});
			},
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Client",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
						name: "clientId",
						children: db.clients.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: c.id,
							children: c.name
						}, c.id))
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Shift",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						name: "shift",
						defaultValue: "07:00–15:00"
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Note",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
						name: "body",
						rows: 5,
						required: true
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "mb-3 flex items-start gap-2 text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "checkbox",
						name: "share",
						className: "mt-0.5 size-4"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Share with the participant’s portal. Leave off for staff-only observations." })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
					type: "submit",
					children: "Save to case notes"
				})
			]
		}) })
	] });
}
function MyRosterScreen() {
	const { session } = useSession();
	const db = useLookups();
	const id = session?.staffId || "s1";
	const shifts = db.shifts.filter((s) => s.staffId === id);
	const isMgr = canAccess(session?.role, "manager");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHead, {
		title: "My roster",
		sub: session?.name,
		actions: isMgr ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
			to: "/roster",
			variant: "ghost",
			children: "Full roster"
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
			to: "/worker",
			variant: "ghost",
			children: "My shift"
		})
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [shifts.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
		to: `/clients/${s.clientId}`,
		className: "flex justify-between py-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
			s.day,
			" ",
			s.window,
			" · ",
			db.clientName(s.clientId)
		] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pill, {
			status: s.status,
			children: s.status
		})]
	}, s.id)), shifts.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Empty, {
		title: "No shifts this week",
		action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
			to: "/worker",
			children: "My shift"
		})
	}) : null] })] });
}
function MyTimesheetsScreen() {
	const { session } = useSession();
	const db = useLookups();
	const id = session?.staffId || "s1";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHead, {
		title: "My timesheets",
		sub: "Drafts from check-out land here",
		actions: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
			to: "/timesheets",
			search: { add: "1" },
			children: "Log hours"
		})
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [db.timesheets.filter((t) => t.staffId === id).map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex justify-between py-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
			to: `/timesheets/${t.id}`,
			children: [
				t.date,
				" ",
				db.clientName(t.clientId),
				" · ",
				t.hours,
				"h"
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pill, {
			status: t.status,
			children: t.status
		})]
	}, t.id)), db.timesheets.filter((t) => t.staffId === id).length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Empty, {
		title: "No timesheets yet",
		action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
			to: "/worker/check-in",
			children: "Check in"
		})
	}) : null] })] });
}
function MyComplianceScreen() {
	const { session } = useSession();
	const db = useLookups();
	const s = db.staff.find((x) => x.id === (session?.staffId || "s1"));
	if (!s) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Missing, {
		what: "profile",
		back: "/worker"
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHead, {
			title: "My compliance",
			sub: s.name,
			actions: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
				to: `/staff/${s.id}`,
				variant: "ghost",
				children: "Full profile"
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
			className: "mb-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mb-2 font-semibold",
				children: "Privacy on shift"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PrivacyNotice, { variant: "worker" })]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "flex justify-between py-2",
				children: [
					"NDIS screening ",
					s.ndisScreeningExpiry,
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pill, {
						status: s.ndisScreening,
						children: s.ndisScreening
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "flex justify-between py-2",
				children: [
					"WWCC ",
					s.wwccExpiry,
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pill, {
						status: s.wwcc,
						children: s.wwcc
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "flex justify-between py-2",
				children: [
					"First aid ",
					s.firstAidExpiry,
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pill, {
						status: s.firstAid,
						children: s.firstAid
					})
				]
			}),
			db.training.filter((t) => t.staffId === s.id).map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex justify-between py-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t.name }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pill, {
					status: t.status,
					children: t.status
				})]
			}, t.id))
		] })
	] });
}
function TrainingScreen() {
	const db = useLookups();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Guard, {
		min: "manager",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHead, {
			title: "Training",
			sub: "Currency across the team"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: db.training.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-wrap items-center justify-between gap-2 py-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: `/staff/${t.staffId}`,
				className: "font-semibold hover:underline",
				children: [
					db.staffName(t.staffId),
					" · ",
					t.name
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pill, {
					status: t.status,
					children: t.status
				}), t.status !== "current" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
					onClick: () => db.setTrainingStatus(t.id, "current"),
					children: "Mark current"
				}) : null]
			})]
		}, t.id)) })]
	});
}
function ComplianceScreen() {
	const db = useLookups();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Guard, {
		min: "manager",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHead, {
				title: "Compliance",
				sub: "NDIS screening, WWCC, first aid, and privacy",
				actions: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
					to: "/staff/compliance",
					children: "Full register"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "mb-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mb-2 font-semibold",
					children: "How personal information is handled"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PrivacyNotice, { variant: "full" })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: db.staff.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: `/staff/${s.id}`,
				className: "flex items-center justify-between py-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-semibold",
					children: s.name
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "flex flex-wrap justify-end gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pill, {
							status: s.ndisScreening,
							children: "NDIS"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pill, {
							status: s.wwcc,
							children: "WWCC"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pill, {
							status: s.firstAid,
							children: "First aid"
						})
					]
				})]
			}, s.id)) })
		]
	});
}
function HrScreen() {
	const db = useLookups();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Guard, {
		min: "admin",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHead, {
			title: "HR",
			sub: "Employment and leave"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: db.staff.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-wrap items-center justify-between gap-2 py-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: `/staff/${s.id}`,
				className: "font-semibold hover:underline",
				children: [
					s.name,
					" · ",
					s.employment
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pill, {
					status: s.status,
					children: s.status
				}), s.status === "leave" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
					onClick: () => db.setStaffStatus(s.id, "active"),
					children: "Return to work"
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
					variant: "ghost",
					onClick: () => db.setStaffStatus(s.id, "leave"),
					children: "Put on leave"
				})]
			})]
		}, s.id)) })]
	});
}
function StaffComplianceScreen() {
	const db = useLookups();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Guard, {
		min: "manager",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHead, {
			title: "Staff compliance",
			sub: "NDIS Worker Screening, WWCC, and first aid",
			actions: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
				to: "/compliance",
				variant: "ghost",
				children: "Privacy and exceptions"
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: db.staff.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
			to: `/staff/${s.id}`,
			className: "flex flex-wrap items-center justify-between gap-2 border-b border-border py-3 last:border-0",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "block font-semibold",
				children: s.name
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "text-xs text-muted",
				children: [
					"Screening ",
					s.ndisScreeningExpiry,
					" · WWCC ",
					s.wwccExpiry,
					" · Aid ",
					s.firstAidExpiry
				]
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "flex flex-wrap justify-end gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pill, {
						status: s.ndisScreening,
						children: "NDIS"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pill, {
						status: s.wwcc,
						children: "WWCC"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pill, {
						status: s.firstAid,
						children: "First aid"
					}),
					s.status === "leave" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pill, {
						status: "leave",
						children: "leave"
					}) : null
				]
			})]
		}, s.id)) })]
	});
}
//#endregion
export { StaffScreen as A, RequestsScreen as C, StaffComplianceScreen as D, SettingsScreen as E, WorkerCheckInScreen as F, WorkerHomeScreen as I, WorkerNotesScreen as L, TimesheetDetailScreen as M, TimesheetsScreen as N, StaffDetailScreen as O, TrainingScreen as P, RequestDetailScreen as S, RosterScreen as T, MyTimesheetsScreen as _, ClientsScreen as a, OnboardingScreen as b, FinancialsScreen as c, IncidentsScreen as d, InvoiceDetailScreen as f, MyRosterScreen as g, MyComplianceScreen as h, ClientDetailScreen as i, TidyUpScreen as j, StaffOnboardingScreen as k, HrScreen as l, MaureenScreen as m, CarePlansScreen as n, ComplianceScreen as o, InvoicesScreen as p, CheckInScreen as r, DashboardScreen as s, AnalyticsScreen as t, IncidentDetailScreen as u, NoteDetailScreen as v, RiskScreen as w, ReportsScreen as x, NotesScreen as y };
