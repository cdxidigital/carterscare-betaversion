import { i as __toESM } from "../_runtime.mjs";
import { Z as require_react, b as Link, w as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { D as Clock, M as CircleCheckBig, P as ChevronRight, R as Calendar, d as Send, h as MessageSquare, i as User, j as CirclePlus, m as Phone, t as X, w as FileText, x as Heart } from "../_libs/lucide-react.mjs";
import { P as weekDays, d as useSession } from "./router-Bty-v5RX.mjs";
import { n as REQUEST_LABEL, r as useLookups, t as PrivacyNotice } from "./privacy-C_bY1ZRK.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/client-portal-B4sW8Nlf.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var TABS = [
	{
		id: "overview",
		label: "Overview",
		Icon: User
	},
	{
		id: "schedule",
		label: "My Schedule",
		Icon: Calendar
	},
	{
		id: "notes",
		label: "Care Notes",
		Icon: FileText
	},
	{
		id: "requests",
		label: "Requests",
		Icon: MessageSquare
	}
];
var WEEKDAYS = {
	Mon: "Monday",
	Tue: "Tuesday",
	Wed: "Wednesday",
	Thu: "Thursday",
	Fri: "Friday",
	Sat: "Saturday",
	Sun: "Sunday"
};
var MONTH_LONG = {
	Jan: "January",
	Feb: "February",
	Mar: "March",
	Apr: "April",
	May: "May",
	Jun: "June",
	Jul: "July",
	Aug: "August",
	Sep: "September",
	Oct: "October",
	Nov: "November",
	Dec: "December"
};
function parseDay(day) {
	const [short, num, month = "Sep"] = day.split(" ");
	const longMonth = MONTH_LONG[month] ?? month;
	return {
		short,
		weekday: WEEKDAYS[short] ?? day,
		month,
		date: num ?? day,
		long: `${WEEKDAYS[short] ?? short}, ${num} ${longMonth}`
	};
}
function rangeFromWindow(window) {
	const [a, b] = window.split(/[–-]/);
	const pad = (x) => {
		const t = x.trim();
		return t.includes(":") ? t : `${t.padStart(2, "0")}:00`;
	};
	return `${pad(a ?? "")} – ${pad(b ?? "")}`;
}
function hoursFromWindow(window) {
	const [a, b] = window.split(/[–-]/);
	const hour = (x) => {
		const m = x?.match(/(\d{1,2})/);
		return m ? Number(m[1]) : NaN;
	};
	const start = hour(a ?? "");
	const end = hour(b ?? "");
	if (!Number.isFinite(start) || !Number.isFinite(end)) return 0;
	return end > start ? end - start : end + 24 - start;
}
function visitStatus(status) {
	if (status === "complete") return {
		label: "Complete",
		cls: "bg-ok-bg text-ok"
	};
	if (status === "in_progress") return {
		label: "In progress",
		cls: "bg-info-bg text-info"
	};
	if (status === "scheduled") return {
		label: "Scheduled",
		cls: "bg-warn-bg text-warn"
	};
	return {
		label: status,
		cls: "bg-bg text-muted"
	};
}
function requestTone(status) {
	if (status === "resolved") return {
		label: "Resolved",
		cls: "bg-ok-bg text-ok",
		Icon: CircleCheckBig
	};
	if (status === "in_progress") return {
		label: "In Progress",
		cls: "bg-info-bg text-info",
		Icon: Clock
	};
	return {
		label: "Pending",
		cls: "bg-warn-bg text-warn",
		Icon: Clock
	};
}
function ClientPortalScreen() {
	const { session } = useSession();
	const db = useLookups();
	const me = db.clients.find((c) => c.id === session?.clientId) ?? db.clients[0];
	const displayName = me.preferredName || me.name.split(" ")[0];
	const [tab, setTab] = (0, import_react.useState)("overview");
	const [showNew, setShowNew] = (0, import_react.useState)(false);
	const [flash, setFlash] = (0, import_react.useState)("");
	const [title, setTitle] = (0, import_react.useState)("");
	const [details, setDetails] = (0, import_react.useState)("");
	const [kind, setKind] = (0, import_react.useState)("schedule");
	const visits = (0, import_react.useMemo)(() => db.shifts.filter((s) => s.clientId === me.id).sort((a, b) => weekDays.indexOf(a.day) - weekDays.indexOf(b.day)), [db.shifts, me.id]);
	const upcoming = visits.filter((s) => s.status === "scheduled" || s.status === "in_progress");
	const notes = db.notes.filter((n) => n.clientId === me.id && n.visibleToClient !== false);
	const reqs = db.requests.filter((r) => r.clientId === me.id);
	const next = upcoming[0] ?? visits.find((s) => s.status === "scheduled");
	const listed = upcoming.length ? upcoming : visits;
	const submit = (e) => {
		e.preventDefault();
		if (!title.trim() || !details.trim()) return;
		db.addRequest({
			clientId: me.id,
			title: title.trim(),
			notes: details.trim(),
			status: "pending",
			type: kind
		});
		setTitle("");
		setDetails("");
		setKind("schedule");
		setShowNew(false);
		setFlash("Request submitted! Your care team will be in touch.");
		setTab("requests");
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-2xl px-4 py-6 pb-16",
		"data-testid": "client-portal",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
				className: "-mx-4 mb-6 border-b border-portal/15 px-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex overflow-x-auto",
					children: TABS.map(({ id, label, Icon }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => setTab(id),
						className: `flex items-center gap-1.5 whitespace-nowrap border-b-2 px-4 py-3 text-sm font-medium ${tab === id ? "border-portal bg-portal-soft/50 text-portal" : "border-transparent text-muted"}`,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { size: 16 }), label]
					}, id))
				})
			}),
			tab === "overview" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "portal-banner relative overflow-hidden rounded-xl p-6 text-portal-fg",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute top-0 right-0 size-32 translate-x-8 -translate-y-8 rounded-full bg-surface/10" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
								className: "relative text-xl font-bold",
								children: [
									"Hello, ",
									displayName,
									"!"
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "relative mt-1 text-sm text-portal-fg/80",
								children: upcoming.length > 0 ? `You have ${upcoming.length} upcoming visit${upcoming.length > 1 ? "s" : ""} scheduled.` : "Welcome to your care portal."
							}),
							me.ndis ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "relative mt-2 text-xs text-portal-fg/70",
								children: [
									"NDIS ",
									me.ndis,
									" · used for your plan only, not as your login"
								]
							}) : null
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-3 gap-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
								icon: Calendar,
								label: "Upcoming",
								value: upcoming.length,
								tone: "blue",
								onClick: () => setTab("schedule")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
								icon: FileText,
								label: "Care Notes",
								value: notes.length,
								tone: "purple",
								onClick: () => setTab("notes")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
								icon: MessageSquare,
								label: "Requests",
								value: reqs.length,
								tone: "teal",
								onClick: () => setTab("requests")
							})
						]
					}),
					next ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VisitCard, {
						shift: next,
						staffName: db.staffName(next.staffId),
						featured: true
					}) : null,
					notes[0] ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "rounded-xl border border-border/60 bg-surface p-5 shadow-(--shadow-card)",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mb-4 flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
								className: "flex items-center gap-2 text-sm font-bold",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, {
									size: 16,
									className: "text-primary"
								}), " Latest Note"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => setTab("notes"),
								className: "flex items-center gap-1 text-xs font-medium text-portal",
								children: ["View all ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { size: 12 })]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-lg border border-primary/15 bg-primary-soft p-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mb-1.5 flex items-center justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-xs font-semibold text-primary capitalize",
										children: notes[0].kind ?? "daily care"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-xs text-subtle",
										children: notes[0].date.replace(" 2026", "")
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm leading-relaxed",
									children: notes[0].body
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mt-2 text-xs text-subtle",
									children: ["by ", db.staffName(notes[0].staffId)]
								})
							]
						})]
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "rounded-xl border border-border/60 bg-surface p-5 shadow-(--shadow-card)",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "mb-2 text-sm font-bold",
								children: "Your information"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PrivacyNotice, { variant: "portal" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-4 flex flex-wrap gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									className: "rounded-lg border border-border px-3 py-2 text-sm font-semibold",
									onClick: () => {
										setKind("correction");
										setTitle("Please correct my information");
										setShowNew(true);
										setTab("requests");
									},
									children: "Ask for a correction"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									className: "rounded-lg border border-border px-3 py-2 text-sm font-semibold",
									onClick: () => {
										setKind("privacy");
										setTitle("Privacy question");
										setShowNew(true);
										setTab("requests");
									},
									children: "Privacy question"
								})]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "rounded-xl border border-border/60 bg-surface p-5 shadow-(--shadow-card)",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
								className: "mb-3 flex items-center gap-2 text-sm font-bold",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, {
									size: 16,
									className: "text-bad"
								}), " Need help?"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mb-4 text-sm text-muted",
								children: "Contact your coordinator. For a privacy question, use the buttons above."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
								href: "tel:18002278377",
								className: "flex items-center gap-3 rounded-lg border border-portal/20 bg-portal-soft p-3 text-portal",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, {
									size: 20,
									className: "shrink-0"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "block text-sm font-semibold",
									children: "Call Us"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "block text-xs",
									children: db.org?.phone ?? "1800 CARTERS"
								})] })]
							})
						]
					})
				]
			}) : null,
			tab === "schedule" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-lg font-bold",
					children: "My Schedule"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-0.5 text-sm text-muted",
					children: "Your upcoming and recent care visits"
				})] }), listed.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Empty, {
					icon: Calendar,
					message: "No visits scheduled",
					sub: "Your care coordinator will be in touch to arrange visits"
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "space-y-3",
					children: listed.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VisitCard, {
						shift: s,
						staffName: db.staffName(s.staffId)
					}, s.id))
				})]
			}) : null,
			tab === "notes" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-lg font-bold",
					children: "Care Notes"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-0.5 text-sm text-muted",
					children: "Updates shared by your care team"
				})] }), notes.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Empty, {
					icon: FileText,
					message: "No care notes yet",
					sub: "Notes from your care team will appear here"
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "space-y-3",
					children: notes.map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
						className: "rounded-lg border border-border/60 bg-surface p-4 shadow-(--shadow-card)",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mb-2 flex items-start justify-between gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "rounded-full bg-primary-soft px-2 py-0.5 text-xs font-bold whitespace-nowrap text-primary capitalize",
									children: n.kind ?? "daily care"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "shrink-0 text-xs text-subtle",
									children: n.date
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm leading-relaxed",
								children: n.body
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-3 flex items-center gap-1.5 border-t border-border/60 pt-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "grid size-5 place-items-center rounded-full bg-portal-soft",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, {
										size: 12,
										className: "text-portal"
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-subtle",
									children: db.staffName(n.staffId)
								})]
							})
						]
					}, n.id))
				})]
			}) : null,
			tab === "requests" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-lg font-bold",
							children: "My Requests"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-0.5 text-sm text-muted",
							children: "Contact your care team"
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => setShowNew(true),
							className: "portal-cta inline-flex h-11 items-center gap-1.5 rounded-lg px-4 text-sm font-semibold text-portal-fg shadow-(--shadow-card)",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CirclePlus, { size: 16 }), "New"]
						})]
					}),
					flash ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "rounded-lg bg-ok-bg px-3 py-2 text-sm text-ok",
						children: flash
					}) : null,
					showNew ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						onSubmit: submit,
						className: "space-y-3 rounded-lg border border-portal/30 bg-surface p-4 shadow-(--shadow-card)",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "text-sm font-semibold",
									children: "New Request"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => setShowNew(false),
									className: "text-subtle",
									"aria-label": "Close",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { size: 16 })
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "block",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "mb-1.5 block text-xs font-semibold tracking-wide text-muted uppercase",
									children: "Type"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
									value: kind,
									onChange: (e) => setKind(e.target.value),
									className: "h-10 w-full rounded-md border border-border bg-bg px-3 text-sm",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "schedule",
											children: "Schedule change"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "service",
											children: "Service request"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "feedback",
											children: "Feedback"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "correction",
											children: "Correct my information"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "privacy",
											children: "Privacy question or complaint"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "other",
											children: "Other"
										})
									]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "block",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "mb-1.5 block text-xs font-semibold tracking-wide text-muted uppercase",
									children: "Subject"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									value: title,
									onChange: (e) => setTitle(e.target.value),
									placeholder: "Brief description of your request",
									className: "h-10 w-full rounded-md border border-border bg-bg px-3 text-sm",
									required: true
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "block",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "mb-1.5 block text-xs font-semibold tracking-wide text-muted uppercase",
									children: "Details"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
									value: details,
									onChange: (e) => setDetails(e.target.value),
									placeholder: "Tell us more about your request...",
									rows: 3,
									className: "w-full resize-none rounded-md border border-border bg-bg px-3 py-2.5 text-sm",
									required: true
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "submit",
								className: "portal-cta flex h-10 w-full items-center justify-center gap-2 rounded-md text-sm font-semibold text-portal-fg",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, { size: 16 }), "Submit Request"]
							})
						]
					}) : null,
					reqs.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Empty, {
						icon: MessageSquare,
						message: "No requests yet",
						sub: "Tap New to send a message to your care team"
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "space-y-3",
						children: reqs.map((r) => {
							const tone = requestTone(r.status);
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: `/requests/${r.id}`,
								className: "block rounded-lg border border-border/60 bg-surface p-4 shadow-(--shadow-card)",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mb-2 flex items-start justify-between gap-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-sm leading-tight font-semibold",
											children: r.title
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: `inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold whitespace-nowrap ${tone.cls}`,
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(tone.Icon, { size: 12 }), tone.label]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm leading-relaxed text-muted",
										children: r.notes
									}),
									r.reply ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "mt-2 text-sm",
										children: ["Team: ", r.reply]
									}) : null,
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "mt-3 flex items-center gap-3 border-t border-border/60 pt-3 text-xs text-subtle",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "rounded-full bg-bg px-2 py-0.5",
											children: REQUEST_LABEL[r.type]
										})
									})
								]
							}, r.id);
						})
					})
				]
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
				className: "mt-8 border-t border-portal/15 pt-6 text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: "/brand/mark.svg?v=4",
						alt: "",
						className: "mx-auto mb-2 size-8 opacity-70"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-subtle",
						children: "CartersCare client portal"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-xs text-subtle",
						children: "Demo only · the record stays in this browser. Don’t enter real personal information."
					})
				]
			})
		]
	});
}
function StatCard({ icon: Icon, label, value, tone, onClick }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		type: "button",
		onClick,
		className: "rounded-lg border border-border/60 bg-surface p-4 text-left shadow-(--shadow-card)",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: `${tone === "blue" ? "stat-grad-blue" : tone === "purple" ? "stat-grad-purple" : "stat-grad-teal"} mb-2 grid size-8 place-items-center rounded-md text-primary-fg`,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { size: 16 })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xl font-extrabold",
				children: value
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs leading-tight text-muted",
				children: label
			})
		]
	});
}
function VisitCard({ shift, staffName, featured }) {
	const d = parseDay(shift.day);
	const tone = visitStatus(shift.status);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "rounded-xl border border-border/60 bg-surface p-5 shadow-(--shadow-card)",
		children: [featured ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
			className: "mb-4 flex items-center gap-2 text-sm font-bold",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calendar, {
				size: 16,
				className: "text-info"
			}), " Next Visit"]
		}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "date-chip flex size-14 shrink-0 flex-col items-center justify-center rounded-lg border",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-[10px] font-bold tracking-wide uppercase",
						children: d.month
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-xl font-black leading-none",
						children: d.date
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0 flex-1",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-semibold",
							children: featured ? d.weekday : d.long
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "flex flex-wrap items-center gap-1 text-sm text-muted",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { size: 14 }),
								rangeFromWindow(shift.window),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-subtle",
									children: "·"
								}),
								hoursFromWindow(shift.window),
								"h"
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-0.5 truncate text-xs text-subtle",
							children: featured ? staffName : `with ${staffName}`
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: `rounded-full px-2 py-0.5 text-xs font-semibold whitespace-nowrap ${tone.cls}`,
					children: tone.label
				})
			]
		})]
	});
}
function Empty({ icon: Icon, message, sub }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-xl border border-border/60 bg-surface p-12 text-center shadow-(--shadow-card)",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
				size: 48,
				className: "mx-auto mb-3 text-border"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-medium text-muted",
				children: message
			}),
			sub ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-xs text-subtle",
				children: sub
			}) : null
		]
	});
}
var SplitComponent = ClientPortalScreen;
//#endregion
export { SplitComponent as component };
