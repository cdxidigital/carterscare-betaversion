import { i as __toESM } from "../_runtime.mjs";
import { C as useRouter, J as redirect, Z as require_react, _ as lazyRouteComponent, d as Scripts, f as HeadContent, g as Outlet, h as createRouter, v as createFileRoute, w as require_jsx_runtime, y as createRootRoute } from "../_libs/@tanstack/react-router+[...].mjs";
import { o as TriangleAlert } from "../_libs/lucide-react.mjs";
import { a as union, i as string, n as number, r as object, t as literal } from "../_libs/zod.mjs";
import { n as persist, r as create, t as createJSONStorage } from "../_libs/zustand.mjs";
import { t as clsx } from "../_libs/clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-Bty-v5RX.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var __defProp = Object.defineProperty;
var __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
var FALLBACK_MESSAGE = "An unexpected error occurred. Try reloading the page.";
function errorMessage(error) {
	if (error instanceof Error && error.message) return error.message;
	if (typeof error === "string" && error) return error;
	return FALLBACK_MESSAGE;
}
function AppErrorComponent({ error }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "flex min-h-screen flex-col items-center justify-center gap-3 bg-bg px-6 text-center text-fg",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-bad",
				"aria-hidden": "true",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {
					className: "size-10",
					strokeWidth: 2
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-lg font-semibold",
				children: "Something went wrong"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "max-w-md text-sm break-words text-muted",
				children: errorMessage(error)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
				href: "/",
				className: "mt-2 rounded-md bg-primary px-4 py-2.5 text-sm font-semibold text-primary-fg",
				children: "Return to sign in"
			})
		]
	});
}
/**
* App-wide client provider mounted once near the root (in `src/routes/__root.tsx`):
*
*   <AuthProvider><Outlet /></AuthProvider>
*
* Better Auth's React client (`@/lib/auth/client`) needs NO context provider —
* its `useSession()` works standalone — so this is a passthrough today. It's
* kept as the single, stable mount point for any future client-side providers
* (e.g. a toast or theme provider) without churning the root shell.
*/
function AuthProvider({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children });
}
var CONNECTOR_TOKEN_READY_EVENT = "grok:connector-token-ready";
function isGrokEmbedderOrigin(origin) {
	try {
		const url = new URL(origin);
		if (url.protocol !== "https:" && url.protocol !== "http:") return false;
		const host = url.hostname.toLowerCase();
		if (host === "grok.com" || host.endsWith(".grok.com")) return true;
		if (host === "localhost" || host === "127.0.0.1" || host === "[::1]") return true;
		return false;
	} catch {
		return false;
	}
}
function isSandboxPreviewGuestHost(hostname) {
	const host = hostname.toLowerCase();
	return host === "grok-sandbox.com" || host.endsWith(".grok-sandbox.com");
}
function isRemintPreviewPair(guestHost, parentHost) {
	const guest = guestHost.toLowerCase();
	const parent = parentHost.toLowerCase();
	const i = guest.indexOf(".preview.");
	if (i <= 0) return false;
	const label = guest.slice(0, i);
	const rest = guest.slice(i + 9);
	if (label.includes(".") || !rest.includes(".")) return false;
	return parent === rest || parent === `grok.${rest}`;
}
function resolveParentEmbedderOrigin(parentIsSelf, referrer, ancestorOrigin, guestHostname = "") {
	if (parentIsSelf) return null;
	for (const candidate of [referrer, ancestorOrigin ?? ""].filter(Boolean)) try {
		const url = new URL(candidate.includes("://") ? candidate : `https://${candidate}`);
		if (url.protocol !== "https:" && url.protocol !== "http:") continue;
		if (isGrokEmbedderOrigin(url.origin)) return url.origin;
		if (isSandboxPreviewGuestHost(guestHostname) || isRemintPreviewPair(guestHostname, url.hostname)) return url.origin;
	} catch {}
	return null;
}
/**
* Guest side of the grok-web ↔ sandbox preview postMessage bridge.
*
* Activates only when this page is framed by an allowlisted Grok embedder.
* Top-level runs (download/export, local `npm run dev`, deployed sites) noop.
*/
var PREVIEW_BRIDGE_CHANNEL = "grok-preview-bridge";
var EnvelopeSchema = object({
	channel: literal(PREVIEW_BRIDGE_CHANNEL),
	version: number().int().positive(),
	type: string().min(1)
});
var HelloSchema = EnvelopeSchema.extend({ type: literal("hello") });
var NavigateSchema = EnvelopeSchema.extend({
	type: literal("navigate"),
	path: string().min(1)
});
var HistorySchema = EnvelopeSchema.extend({
	type: literal("history"),
	delta: union([literal(-1), literal(1)])
});
var ConnectorTokenReadySchema = EnvelopeSchema.extend({ type: literal("connector-token-ready") });
function isSafeBridgePath(path) {
	if (!path.startsWith("/") || path.startsWith("//") || path.includes("\\")) return false;
	try {
		return new URL(path, "https://preview.invalid").origin === "https://preview.invalid";
	} catch {
		return false;
	}
}
/**
* Origin of the Grok embedder framing this page, or null when the page runs
* top-level (download/export, local `npm run dev`, deployed sites) or under a
* non-Grok parent. Client-only; null during SSR.
*/
function resolveCurrentEmbedderOrigin() {
	if (typeof window === "undefined") return null;
	const ancestorOrigin = typeof location.ancestorOrigins !== "undefined" && location.ancestorOrigins.length > 0 ? location.ancestorOrigins[0] : null;
	return resolveParentEmbedderOrigin(window.parent === window, document.referrer, ancestorOrigin, window.location.hostname);
}
/**
* Install host↔guest messaging. Returns a dispose function.
* Noops (returns a no-op dispose) when not embedded under a Grok parent.
*/
function installPreviewHostBridge(options = {}) {
	const parentOrigin = resolveCurrentEmbedderOrigin();
	if (parentOrigin === null) return () => {};
	const ROOT_STATE_KEY = "__grokPreviewBridgeRoot";
	const originalPushState = window.history.pushState.bind(window.history);
	const originalReplaceState = window.history.replaceState.bind(window.history);
	const isAtHistoryRoot = () => {
		const state = window.history.state;
		return Boolean(state && typeof state === "object" && state[ROOT_STATE_KEY] === true);
	};
	try {
		const current = window.history.state;
		if (!(current !== null && typeof current === "object" && Object.prototype.hasOwnProperty.call(current, ROOT_STATE_KEY))) {
			const isRoot = window.history.length <= 1;
			originalReplaceState(current && typeof current === "object" ? {
				...current,
				[ROOT_STATE_KEY]: isRoot
			} : { [ROOT_STATE_KEY]: isRoot }, "", window.location.href);
		}
	} catch {}
	const post = (message) => {
		window.parent.postMessage(message, parentOrigin);
	};
	const reportLocation = () => {
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "location",
			path: window.location.pathname || "/",
			search: window.location.search,
			hash: window.location.hash
		});
	};
	const reportRoutes = () => {
		const paths = options.getRoutePaths?.() ?? [];
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "routes",
			paths
		});
	};
	const defaultNavigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		try {
			const url = new URL(path, window.location.origin);
			if (url.origin !== window.location.origin) return;
			const next = `${url.pathname}${url.search}${url.hash}`;
			window.history.pushState(window.history.state, "", next);
			window.dispatchEvent(new PopStateEvent("popstate", { state: window.history.state }));
		} catch {}
	};
	const navigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		if (options.navigate) {
			options.navigate(path);
			return;
		}
		defaultNavigate(path);
	};
	const announce = () => {
		reportLocation();
		reportRoutes();
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "ready"
		});
	};
	const onHello = (data) => {
		if (!HelloSchema.safeParse(data).success) return;
		announce();
	};
	const onNavigate = (data) => {
		const parsed = NavigateSchema.safeParse(data);
		if (!parsed.success) return;
		navigate(parsed.data.path);
		queueMicrotask(reportLocation);
	};
	const onHistory = (data) => {
		const parsed = HistorySchema.safeParse(data);
		if (!parsed.success) return;
		if (parsed.data.delta === -1 && isAtHistoryRoot()) return;
		window.history.go(parsed.data.delta);
	};
	const onConnectorTokenReady = (data) => {
		if (!ConnectorTokenReadySchema.safeParse(data).success) return;
		window.dispatchEvent(new Event(CONNECTOR_TOKEN_READY_EVENT));
	};
	const hostMessageHandlers = /* @__PURE__ */ new Map([
		["hello", onHello],
		["navigate", onNavigate],
		["history", onHistory],
		["connector-token-ready", onConnectorTokenReady]
	]);
	const onMessage = (event) => {
		if (event.source !== window.parent) return;
		if (event.origin !== parentOrigin) return;
		const envelope = EnvelopeSchema.safeParse(event.data);
		if (!envelope.success || envelope.data.version !== 1) return;
		hostMessageHandlers.get(envelope.data.type)?.(event.data);
	};
	const onPopState = () => {
		reportLocation();
	};
	const onHashChange = () => {
		reportLocation();
	};
	window.history.pushState = (data, unused, url) => {
		const next = data && typeof data === "object" ? {
			...data,
			[ROOT_STATE_KEY]: false
		} : data;
		originalPushState(next, unused, url);
		reportLocation();
	};
	window.history.replaceState = (data, unused, url) => {
		const next = isAtHistoryRoot() ? {
			...data && typeof data === "object" ? data : {},
			[ROOT_STATE_KEY]: true
		} : data;
		originalReplaceState(next, unused, url);
		reportLocation();
	};
	window.addEventListener("message", onMessage);
	window.addEventListener("popstate", onPopState);
	window.addEventListener("hashchange", onHashChange);
	announce();
	return () => {
		window.removeEventListener("message", onMessage);
		window.removeEventListener("popstate", onPopState);
		window.removeEventListener("hashchange", onHashChange);
		window.history.pushState = originalPushState;
		window.history.replaceState = originalReplaceState;
	};
}
/** Collect static path patterns from a TanStack route tree (best-effort). */
function collectRoutePathsFromTree(routeTree) {
	const paths = /* @__PURE__ */ new Set();
	const walk = (node) => {
		if (!node || typeof node !== "object") return;
		const record = node;
		const full = typeof record.fullPath === "string" ? record.fullPath : typeof record.path === "string" ? record.path : null;
		if (full !== null && full !== "") paths.add(full.startsWith("/") ? full : `/${full}`);
		else if (full === "") paths.add("/");
		const children = record.children;
		if (Array.isArray(children)) for (const child of children) walk(child);
		else if (children && typeof children === "object") for (const child of Object.values(children)) walk(child);
	};
	walk(routeTree);
	return [...paths];
}
/**
* Mount once in `__root.tsx` so the Grok preview chrome can drive navigation
* (and later receive registered routes). Noops when the app is not embedded.
*/
function PreviewHostBridge() {
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		return installPreviewHostBridge({
			navigate: (path) => {
				router.history.push(path);
			},
			getRoutePaths: () => collectRoutePathsFromTree(router.routeTree)
		});
	}, [router]);
	return null;
}
var DEMO_PASSWORD = "Demo1234";
var CLIENT_PORTAL = {
	username: "robert.thompson",
	accessCode: "472819"
};
var MONTHS$1 = [
	"Jan",
	"Feb",
	"Mar",
	"Apr",
	"May",
	"Jun",
	"Jul",
	"Aug",
	"Sep",
	"Oct",
	"Nov",
	"Dec"
];
var WEEK = [
	"Sun",
	"Mon",
	"Tue",
	"Wed",
	"Thu",
	"Fri",
	"Sat"
];
function perthWall(offsetDays = 0) {
	const wall = new Date((/* @__PURE__ */ new Date()).toLocaleString("en-US", { timeZone: "Australia/Perth" }));
	wall.setDate(wall.getDate() + offsetDays);
	return wall;
}
function stamp(offsetDays) {
	const d = perthWall(offsetDays);
	const weekday = WEEK[d.getDay()];
	const month = MONTHS$1[d.getMonth()];
	return {
		weekday,
		date: d.getDate(),
		month,
		year: d.getFullYear(),
		label: `${weekday} ${d.getDate()} ${month}`,
		short: `${d.getDate()} ${month}`,
		long: `${d.getDate()} ${month} ${d.getFullYear()}`
	};
}
var today = perthWall(0);
var mondayOffset = today.getDay() === 0 ? -6 : 1 - today.getDay();
var week = Array.from({ length: 7 }, (_, i) => stamp(mondayOffset + i));
var todayIndex = Math.max(0, week.findIndex((d) => d.date === today.getDate() && d.month === MONTHS$1[today.getMonth()]));
function shiftStatus(dayIndex, live = false) {
	if (dayIndex < todayIndex) return "complete";
	if (dayIndex === todayIndex && live) return "in_progress";
	return "scheduled";
}
var liveDay = todayIndex;
var nextDay = todayIndex + 1 < week.length ? todayIndex + 1 : 0;
var earlierDay = [
	0,
	1,
	2,
	3,
	4,
	5,
	6
].find((i) => i !== liveDay && i !== nextDay) ?? 0;
var weekDays = week.map((d) => d.label);
var todayLabel = week[todayIndex]?.label ?? week[0].label;
var accounts = [
	{
		email: "demo@admin.carterscare.com",
		role: "admin",
		name: "Sarah Mitchell",
		staffId: "s6"
	},
	{
		email: "demo@manager.carterscare.com",
		role: "manager",
		name: "David Chen",
		staffId: "s5"
	},
	{
		email: "demo@worker.carterscare.com",
		role: "support_worker",
		name: "Emma Johnson",
		staffId: "s1"
	},
	{
		email: "demo@client.carterscare.com",
		role: "client",
		name: "Robert Thompson",
		clientId: "c1"
	}
];
var seed = {
	org: {
		name: "Carters Care Group",
		phone: "1800 CARTERS",
		email: "hello@carterscare.com.au",
		abn: "61 448 220 193",
		region: "Perth metro · Australia/Perth"
	},
	staff: [
		{
			id: "s1",
			name: "Emma Johnson",
			email: "demo@worker.carterscare.com",
			phone: "0412 889 102",
			title: "Support Worker",
			role: "support_worker",
			status: "active",
			wwcc: "ok",
			firstAid: "expiring",
			ndisScreening: "ok",
			wwccExpiry: "12 Apr 2027",
			firstAidExpiry: stamp(21).long,
			ndisScreeningExpiry: "12 Apr 2027",
			employment: "casual"
		},
		{
			id: "s2",
			name: "Jamal Okonkwo",
			email: "jamal@carterscare.com",
			phone: "0433 210 554",
			title: "Support Worker",
			role: "support_worker",
			status: "active",
			wwcc: "ok",
			firstAid: "ok",
			ndisScreening: "ok",
			wwccExpiry: "3 Jan 2028",
			firstAidExpiry: "11 Mar 2027",
			ndisScreeningExpiry: "3 Jan 2028",
			employment: "part-time"
		},
		{
			id: "s3",
			name: "Priya Nair",
			email: "priya@carterscare.com",
			phone: "0408 771 390",
			title: "Team Leader",
			role: "team_leader",
			status: "active",
			wwcc: "ok",
			firstAid: "ok",
			ndisScreening: "ok",
			wwccExpiry: "19 Aug 2027",
			firstAidExpiry: "2 Feb 2027",
			ndisScreeningExpiry: "19 Aug 2027",
			employment: "full-time"
		},
		{
			id: "s4",
			name: "Tom Walsh",
			email: "tom@carterscare.com",
			phone: "0421 009 884",
			title: "Support Worker",
			role: "support_worker",
			status: "leave",
			wwcc: "expiring",
			firstAid: "expired",
			ndisScreening: "ok",
			wwccExpiry: "8 Nov 2026",
			firstAidExpiry: "1 Jun 2026",
			ndisScreeningExpiry: "8 Nov 2027",
			employment: "casual"
		},
		{
			id: "s5",
			name: "David Chen",
			email: "demo@manager.carterscare.com",
			phone: "0417 665 221",
			title: "Operations Manager",
			role: "manager",
			status: "active",
			wwcc: "ok",
			firstAid: "ok",
			ndisScreening: "ok",
			wwccExpiry: "4 May 2028",
			firstAidExpiry: "18 Jul 2027",
			ndisScreeningExpiry: "4 May 2028",
			employment: "full-time"
		},
		{
			id: "s6",
			name: "Sarah Mitchell",
			email: "demo@admin.carterscare.com",
			phone: "0400 112 338",
			title: "Director",
			role: "admin",
			status: "active",
			wwcc: "ok",
			firstAid: "ok",
			ndisScreening: "ok",
			wwccExpiry: "22 Dec 2028",
			firstAidExpiry: "9 Oct 2027",
			ndisScreeningExpiry: "22 Dec 2028",
			employment: "full-time"
		}
	],
	clients: [
		{
			id: "c1",
			name: "Robert Thompson",
			preferredName: "Bob",
			suburb: "Perth",
			ndis: "431 234 567",
			plan: "SIL + Community",
			hours: 28,
			risk: "medium",
			status: "active",
			coordinator: "Priya Nair",
			goals: "Independent grocery shop and community swimming.",
			staffIds: ["s1", "s3"],
			privacyConsent: true,
			consentAt: "1 Jul 2026"
		},
		{
			id: "c2",
			name: "Eliza Hart",
			suburb: "Fremantle",
			ndis: "431 008 441",
			plan: "Community Access",
			hours: 16,
			risk: "low",
			status: "active",
			coordinator: "Priya Nair",
			goals: "Weekly swimming program and cafe social.",
			staffIds: ["s3", "s2"],
			privacyConsent: true,
			consentAt: "14 Mar 2026"
		},
		{
			id: "c3",
			name: "Marcus Bell",
			suburb: "Joondalup",
			ndis: "429 774 102",
			plan: "Personal Care",
			hours: 22,
			risk: "high",
			status: "active",
			coordinator: "David Chen",
			goals: "Safe transfers and reduced anxiety at home.",
			staffIds: ["s2", "s3"],
			privacyConsent: true,
			consentAt: "2 May 2026"
		},
		{
			id: "c4",
			name: "Aisha Rahman",
			suburb: "Canning Vale",
			ndis: "432 551 009",
			plan: "Capacity Building",
			hours: 12,
			risk: "low",
			status: "active",
			coordinator: "Emma Johnson",
			goals: "Budgeting and public transport practice.",
			staffIds: ["s1"],
			privacyConsent: true,
			consentAt: "20 Aug 2026"
		},
		{
			id: "c5",
			name: "Owen Fraser",
			suburb: "Midland",
			ndis: "428 330 776",
			plan: "SIL",
			hours: 38,
			risk: "medium",
			status: "onboarding",
			coordinator: "David Chen",
			goals: "Settle into SIL and complete intake.",
			staffIds: ["s5"],
			privacyConsent: false
		}
	],
	notes: [
		{
			id: "n1",
			clientId: "c1",
			staffId: "s1",
			date: stamp(-2).long,
			shift: "07:00–15:00",
			kind: "daily care",
			visibleToClient: true,
			body: "Good day — Robert engaged well. Completed grocery shop independently with verbal prompts. Mood settled after lunch. PRN not required."
		},
		{
			id: "n2",
			clientId: "c3",
			staffId: "s2",
			date: stamp(-1).long,
			shift: "15:00–21:00",
			kind: "daily care",
			visibleToClient: false,
			body: "Elevated anxiety during transition home. Used grounding sequence from care plan. Family updated."
		},
		{
			id: "n3",
			clientId: "c2",
			staffId: "s3",
			date: stamp(-3).long,
			shift: "09:00–13:00",
			kind: "daily care",
			visibleToClient: true,
			body: "Community access to South Beach. Participated in swimming program. No incidents."
		},
		{
			id: "n4",
			clientId: "c1",
			staffId: "s2",
			date: stamp(-4).long,
			shift: "09:00–13:00",
			kind: "progress",
			visibleToClient: true,
			body: "Mobility improving — walked around the garden independently. Proud of the extra lap."
		}
	],
	incidents: [
		{
			id: "i1",
			clientId: "c3",
			staffId: "s2",
			severity: "moderate",
			status: "investigating",
			reportable: false,
			when: `${stamp(-2).long} 16:40`,
			summary: "Slip in bathroom. No injury. Environment reviewed.",
			followUp: "Non-slip mat ordered. Review this week."
		},
		{
			id: "i2",
			clientId: "c1",
			staffId: "s1",
			severity: "low",
			status: "closed",
			reportable: false,
			when: `${stamp(-8).long} 11:15`,
			summary: "Missed medication window by 20 min. Double-check protocol followed.",
			followUp: "Closed after medication audit."
		},
		{
			id: "i3",
			clientId: "c3",
			staffId: "s2",
			severity: "high",
			status: "open",
			reportable: true,
			when: `${stamp(0).long} 07:20`,
			summary: "Door locked during an anxiety episode. No injury. Recorded as an unauthorised restrictive practice.",
			followUp: "Notify the NDIS Commission within 24 hours. Behaviour support to review the plan."
		}
	],
	timesheets: [
		{
			id: "t1",
			staffId: "s1",
			clientId: "c1",
			date: stamp(-2).short,
			start: "07:00",
			end: "15:00",
			hours: 8,
			status: "submitted"
		},
		{
			id: "t2",
			staffId: "s2",
			clientId: "c3",
			date: stamp(-1).short,
			start: "15:00",
			end: "21:00",
			hours: 6,
			status: "draft"
		},
		{
			id: "t3",
			staffId: "s3",
			clientId: "c2",
			date: stamp(-3).short,
			start: "09:00",
			end: "13:00",
			hours: 4,
			status: "approved"
		},
		{
			id: "t4",
			staffId: "s1",
			clientId: "c4",
			date: stamp(-3).short,
			start: "16:00",
			end: "20:00",
			hours: 4,
			status: "approved"
		}
	],
	invoices: [
		{
			id: "inv1",
			number: "INV-1044",
			clientId: "c1",
			amount: 4280,
			status: "paid",
			period: "Aug 2026",
			timesheetIds: []
		},
		{
			id: "inv2",
			number: "INV-1045",
			clientId: "c3",
			amount: 3610,
			status: "sent",
			period: "Aug 2026",
			timesheetIds: []
		},
		{
			id: "inv3",
			number: "INV-1046",
			clientId: "c2",
			amount: 2144,
			status: "draft",
			period: "Sep 2026",
			timesheetIds: ["t3"]
		}
	],
	shifts: [
		{
			id: "sh1",
			staffId: "s1",
			clientId: "c1",
			day: week[0].label,
			window: "07–15",
			status: shiftStatus(0)
		},
		{
			id: "sh2",
			staffId: "s1",
			clientId: "c1",
			day: week[1].label,
			window: "07–15",
			status: shiftStatus(1)
		},
		{
			id: "sh3",
			staffId: "s1",
			clientId: "c4",
			day: week[2].label,
			window: "16–20",
			status: shiftStatus(2)
		},
		{
			id: "sh4",
			staffId: "s1",
			clientId: "c1",
			day: week[4].label,
			window: "07–15",
			status: shiftStatus(4)
		},
		{
			id: "sh5",
			staffId: "s2",
			clientId: "c3",
			day: week[earlierDay].label,
			window: "15–21",
			status: shiftStatus(earlierDay)
		},
		{
			id: "sh6",
			staffId: "s2",
			clientId: "c3",
			day: week[liveDay].label,
			window: "07–15",
			status: shiftStatus(liveDay, true)
		},
		{
			id: "sh7",
			staffId: "s2",
			clientId: "c3",
			day: week[nextDay].label,
			window: "15–21",
			status: shiftStatus(nextDay)
		},
		{
			id: "sh8",
			staffId: "s2",
			clientId: "c2",
			day: week[5].label,
			window: "09–13",
			status: shiftStatus(5)
		},
		{
			id: "sh9",
			staffId: "s3",
			clientId: "c2",
			day: week[0].label,
			window: "09–13",
			status: shiftStatus(0)
		},
		{
			id: "sh10",
			staffId: "s3",
			clientId: "c1",
			day: week[3].label,
			window: "15–21",
			status: shiftStatus(3)
		},
		{
			id: "sh11",
			staffId: "s3",
			clientId: "c3",
			day: week[4].label,
			window: "07–13",
			status: shiftStatus(4)
		}
	],
	carePlans: [
		{
			id: "cp1",
			clientId: "c1",
			name: "Robert SIL 2026",
			status: "active",
			goals: ["Independent shop", "Community swim"],
			start: "1 Jul 2026"
		},
		{
			id: "cp2",
			clientId: "c2",
			name: "Eliza community access",
			status: "active",
			goals: ["Swimming", "Social cafe"],
			start: "14 Mar 2026"
		},
		{
			id: "cp3",
			clientId: "c3",
			name: "Marcus personal care",
			status: "review",
			goals: ["Safe transfers", "Anxiety plan"],
			start: "2 May 2026"
		},
		{
			id: "cp4",
			clientId: "c4",
			name: "Aisha capacity building",
			status: "active",
			goals: ["Budgeting", "Transperth"],
			start: "20 Aug 2026"
		},
		{
			id: "cp5",
			clientId: "c5",
			name: "Owen intake plan",
			status: "draft",
			goals: ["SIL settle", "Intake pack"],
			start: "9 Sep 2026"
		}
	],
	training: [
		{
			id: "tr1",
			staffId: "s1",
			name: "Provide First Aid",
			status: "due",
			expiry: stamp(21).long
		},
		{
			id: "tr2",
			staffId: "s1",
			name: "Manual handling",
			status: "current",
			expiry: "4 Feb 2027"
		},
		{
			id: "tr3",
			staffId: "s2",
			name: "Positive behaviour support",
			status: "current",
			expiry: "11 Mar 2027"
		},
		{
			id: "tr4",
			staffId: "s4",
			name: "Provide First Aid",
			status: "overdue",
			expiry: "1 Jun 2026"
		},
		{
			id: "tr5",
			staffId: "s3",
			name: "Team leader induction",
			status: "current",
			expiry: "30 Nov 2027"
		}
	],
	onboarding: [
		{
			id: "ob1",
			subjectType: "client",
			subjectId: "c5",
			name: "Service agreement signed",
			status: "pending"
		},
		{
			id: "ob2",
			subjectType: "client",
			subjectId: "c5",
			name: "Privacy consent recorded",
			status: "pending"
		},
		{
			id: "ob3",
			subjectType: "client",
			subjectId: "c5",
			name: "Risk assessment complete",
			status: "pending"
		},
		{
			id: "ob4",
			subjectType: "client",
			subjectId: "c5",
			name: "SIL environment check",
			status: "done"
		},
		{
			id: "ob5",
			subjectType: "staff",
			subjectId: "s4",
			name: "Return-to-work plan",
			status: "pending"
		}
	],
	checkins: [{
		id: "ck1",
		staffId: "s2",
		clientId: "c3",
		inAt: "08:05"
	}],
	requests: [
		{
			id: "rq1",
			clientId: "c1",
			title: "Change visit time",
			status: "pending",
			type: "schedule",
			notes: "Please change Friday visit from 9am to 10am. Family lunch on Friday."
		},
		{
			id: "rq2",
			clientId: "c2",
			title: "New pool towel",
			status: "resolved",
			type: "service",
			notes: "Towel at South Beach program is worn. Replacement approved.",
			reply: "Replacement towel is with the South Beach program."
		},
		{
			id: "rq3",
			clientId: "c1",
			title: "Preferred name is Bob",
			status: "pending",
			type: "correction",
			notes: "Please keep my preferred name as Bob on the portal and the roster."
		}
	]
};
var RANK = {
	client: 0,
	support_worker: 1,
	manager: 2,
	admin: 3
};
function canAccess(role, min) {
	if (!role) return false;
	return RANK[role] >= RANK[min];
}
function homeFor(role) {
	if (!role) return "/login";
	if (role === "client") return "/client-portal";
	if (role === "support_worker") return "/worker";
	return "/home";
}
function deskSearch(s) {
	const out = {};
	if (s.add === true || s.add === "1" || s.add === 1) out.add = "1";
	if (typeof s.client === "string" && s.client) out.client = s.client;
	return out;
}
var NAV_GROUPS = [
	{
		label: "Quick Access",
		collapsible: false
	},
	{
		label: "My Work",
		collapsible: true
	},
	{
		label: "Team Management",
		collapsible: true
	},
	{
		label: "Admin",
		collapsible: true
	}
];
var NAV = [
	{
		to: "/home",
		label: "Dashboard",
		min: "manager",
		group: "Quick Access",
		icon: "dashboard",
		tone: "purple"
	},
	{
		to: "/worker",
		label: "Dashboard",
		min: "support_worker",
		group: "Quick Access",
		icon: "dashboard",
		tone: "purple"
	},
	{
		to: "/clients",
		label: "Clients",
		min: "support_worker",
		group: "Quick Access",
		icon: "heart",
		tone: "teal"
	},
	{
		to: "/case-notes",
		label: "Case Notes",
		min: "support_worker",
		group: "Quick Access",
		icon: "notes",
		tone: "blue"
	},
	{
		to: "/my-roster",
		label: "My Roster",
		min: "support_worker",
		group: "My Work",
		icon: "roster",
		tone: "blue"
	},
	{
		to: "/my-timesheets",
		label: "My Timesheets",
		min: "support_worker",
		group: "My Work",
		icon: "clock",
		tone: "yellow"
	},
	{
		to: "/incidents",
		label: "Incidents",
		min: "support_worker",
		group: "My Work",
		icon: "alert",
		tone: "red"
	},
	{
		to: "/staff-onboarding",
		label: "Onboarding",
		min: "support_worker",
		group: "My Work",
		icon: "grad",
		tone: "green"
	},
	{
		to: "/check-in",
		label: "Check-in",
		min: "support_worker",
		group: "My Work",
		icon: "check",
		tone: "teal"
	},
	{
		to: "/requests",
		label: "Requests",
		min: "support_worker",
		group: "My Work",
		icon: "requests",
		tone: "indigo"
	},
	{
		to: "/my-compliance",
		label: "My Compliance",
		min: "support_worker",
		group: "My Work",
		icon: "shield",
		tone: "green"
	},
	{
		to: "/roster",
		label: "Full Roster",
		min: "manager",
		group: "Team Management",
		icon: "roster",
		tone: "orange"
	},
	{
		to: "/timesheets",
		label: "Timesheets",
		min: "manager",
		group: "Team Management",
		icon: "clock",
		tone: "yellow"
	},
	{
		to: "/staff",
		label: "Staff",
		min: "manager",
		group: "Team Management",
		icon: "users",
		tone: "blue"
	},
	{
		to: "/clients/care-plans",
		label: "Care Plans",
		min: "manager",
		group: "Team Management",
		icon: "plans",
		tone: "teal"
	},
	{
		to: "/clients/risk",
		label: "Risk",
		min: "manager",
		group: "Team Management",
		icon: "risk",
		tone: "orange"
	},
	{
		to: "/staff/training",
		label: "Training",
		min: "manager",
		group: "Team Management",
		icon: "grad",
		tone: "green"
	},
	{
		to: "/staff/compliance",
		label: "Staff Compliance",
		min: "manager",
		group: "Team Management",
		icon: "shield",
		tone: "indigo"
	},
	{
		to: "/compliance",
		label: "Compliance",
		min: "manager",
		group: "Team Management",
		icon: "shield",
		tone: "blue"
	},
	{
		to: "/onboarding",
		label: "Client Onboarding",
		min: "manager",
		group: "Team Management",
		icon: "onboard",
		tone: "green"
	},
	{
		to: "/staff/hr",
		label: "HR",
		min: "admin",
		group: "Admin",
		icon: "briefcase",
		tone: "purple"
	},
	{
		to: "/analytics",
		label: "Analytics",
		min: "admin",
		group: "Admin",
		icon: "chart",
		tone: "indigo"
	},
	{
		to: "/invoices",
		label: "Invoices",
		min: "admin",
		group: "Admin",
		icon: "invoice",
		tone: "green"
	},
	{
		to: "/financials",
		label: "Financials",
		min: "admin",
		group: "Admin",
		icon: "wallet",
		tone: "teal"
	},
	{
		to: "/reports",
		label: "Reports",
		min: "admin",
		group: "Admin",
		icon: "reports",
		tone: "teal"
	},
	{
		to: "/tidy-up",
		label: "Tidy up",
		min: "admin",
		group: "Admin",
		icon: "tidy",
		tone: "orange"
	},
	{
		to: "/settings",
		label: "Settings",
		min: "admin",
		group: "Admin",
		icon: "settings",
		tone: "slate"
	}
];
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
function initials(name) {
	return name.split(" ").filter(Boolean).map((p) => p[0]).join("").slice(0, 2).toUpperCase();
}
function uid(prefix) {
	return `${prefix}-${Math.random().toString(36).slice(2, 8)}`;
}
function perthNow() {
	return (/* @__PURE__ */ new Date()).toLocaleString("en-AU", { timeZone: "Australia/Perth" });
}
function perthGreeting() {
	const hour = Number(new Intl.DateTimeFormat("en-AU", {
		timeZone: "Australia/Perth",
		hour: "numeric",
		hour12: false
	}).format(/* @__PURE__ */ new Date()));
	if (hour < 12) return "Good morning";
	if (hour < 17) return "Good afternoon";
	return "Good evening";
}
function perthShortDate() {
	return new Intl.DateTimeFormat("en-AU", {
		timeZone: "Australia/Perth",
		day: "numeric",
		month: "short"
	}).format(/* @__PURE__ */ new Date());
}
function perthShortDateYear() {
	return new Intl.DateTimeFormat("en-AU", {
		timeZone: "Australia/Perth",
		day: "numeric",
		month: "short",
		year: "numeric"
	}).format(/* @__PURE__ */ new Date());
}
function perthClock() {
	return new Intl.DateTimeFormat("en-AU", {
		timeZone: "Australia/Perth",
		hour: "2-digit",
		minute: "2-digit",
		hourCycle: "h23"
	}).format(/* @__PURE__ */ new Date()).replace(/\u202f/g, " ");
}
function displayClock(value) {
	if (!value) return "";
	if (value.includes("T") || value.includes(",")) {
		const d = new Date(value);
		if (!Number.isNaN(d.getTime())) return new Intl.DateTimeFormat("en-AU", {
			timeZone: "Australia/Perth",
			hour: "2-digit",
			minute: "2-digit",
			hourCycle: "h23"
		}).format(d).replace(/\u202f/g, " ");
	}
	return value;
}
function hoursBetween(start, end) {
	const mins = (v) => {
		const m = v.match(/(\d{1,2}):(\d{2})/);
		if (!m) return null;
		const h = Number(m[1]);
		const min = Number(m[2]);
		if (h > 23 || min > 59) return null;
		return h * 60 + min;
	};
	const a = mins(start);
	const b = mins(end);
	if (a == null || b == null || b === a) return 0;
	const diff = b < a ? b + 1440 - a : b - a;
	return Math.round(diff / 60 * 10) / 10;
}
function perthDate() {
	return new Intl.DateTimeFormat("en-AU", {
		timeZone: "Australia/Perth",
		weekday: "long",
		day: "numeric",
		month: "long",
		year: "numeric"
	}).format(/* @__PURE__ */ new Date());
}
var MONTHS = {
	Jan: 0,
	Feb: 1,
	Mar: 2,
	Apr: 3,
	May: 4,
	Jun: 5,
	Jul: 6,
	Aug: 7,
	Sep: 8,
	Oct: 9,
	Nov: 10,
	Dec: 11
};
/** National maxima, NDIS Pricing Schedule 2026-27 (effective 24 Sep 2026), standard self-care. Cents. */
var RATE = {
	weekday: {
		cents: 7358,
		item: "01_011_0107_1_1",
		label: "weekday daytime"
	},
	saturday: {
		cents: 10354,
		item: "01_013_0107_1_1",
		label: "Saturday"
	},
	sunday: {
		cents: 13350,
		item: "01_014_0107_1_1",
		label: "Sunday"
	}
};
function perthYear() {
	return Number(new Intl.DateTimeFormat("en-AU", {
		timeZone: "Australia/Perth",
		year: "numeric"
	}).format(/* @__PURE__ */ new Date()));
}
function rateForDate(dateLabel) {
	const m = dateLabel.match(/(\d{1,2})\s+([A-Za-z]{3})(?:\s+(\d{4}))?/);
	const month = m ? MONTHS[m[2]] : void 0;
	let band = RATE.weekday;
	if (m && month != null) {
		const day = new Date(Date.UTC(m[3] ? Number(m[3]) : perthYear(), month, Number(m[1]))).getUTCDay();
		if (day === 6) band = RATE.saturday;
		else if (day === 0) band = RATE.sunday;
	}
	return {
		...band,
		dollars: band.cents / 100
	};
}
function claimCents(hours, date) {
	return Math.round(hours * rateForDate(date).cents);
}
function money(n) {
	const whole = Math.abs(n - Math.round(n)) < .001;
	return n.toLocaleString("en-AU", {
		style: "currency",
		currency: "AUD",
		minimumFractionDigits: whole ? 0 : 2,
		maximumFractionDigits: 2
	});
}
var CLAIM_NOTE = "Hours are priced at the national self-care limit for that day (weekday daytime $73.58, Saturday $103.54, Sunday $133.50). Evening, night and public holidays are not split out. Usually GST-free. This demo does not lodge a claim with the NDIA.";
function rosterHold(s) {
	if (s.status === "leave") return `${s.name} is on leave`;
	if (s.ndisScreening === "expired" || s.ndisScreening === "missing") return `${s.name} does not have a current NDIS Worker Screening Check`;
	if (s.wwcc === "expired") return `${s.name} has an expired Working with Children Check`;
	if (s.firstAid === "expired") return `${s.name} has expired first aid`;
	return null;
}
function rosterWarn(s) {
	const bits = [];
	if (s.ndisScreening === "expiring") bits.push("NDIS screening expiring");
	if (s.wwcc === "expiring") bits.push("WWCC expiring");
	if (s.firstAid === "expiring") bits.push("first aid expiring");
	return bits.length ? `${s.name}: ${bits.join(" · ")}` : null;
}
var useCC = create()(persist((set, get) => ({
	...seed,
	hydrated: false,
	setHydrated: (v) => set({ hydrated: v }),
	addClient: (c) => {
		const id = uid("c");
		const name = c.name;
		const consented = c.privacyConsent !== false;
		set({
			clients: [{
				status: "onboarding",
				staffIds: [],
				coordinator: "David Chen",
				goals: "To be confirmed at intake.",
				...c,
				id,
				privacyConsent: consented,
				consentAt: consented ? perthShortDateYear() : void 0
			}, ...get().clients],
			onboarding: [
				{
					id: uid("ob"),
					subjectType: "client",
					subjectId: id,
					name: "Service agreement signed",
					status: "pending"
				},
				{
					id: uid("ob"),
					subjectType: "client",
					subjectId: id,
					name: "Privacy consent recorded",
					status: consented ? "done" : "pending"
				},
				{
					id: uid("ob"),
					subjectType: "client",
					subjectId: id,
					name: "Risk assessment complete",
					status: "pending"
				},
				...get().onboarding
			],
			carePlans: [{
				id: uid("cp"),
				clientId: id,
				name: `${name} intake plan`,
				status: "draft",
				goals: ["Complete intake", "Confirm goals"],
				start: perthShortDateYear()
			}, ...get().carePlans]
		});
		return id;
	},
	addStaff: (s) => {
		const id = uid("s");
		set({
			staff: [{
				id,
				status: "active",
				wwcc: "ok",
				firstAid: "ok",
				ndisScreening: "missing",
				wwccExpiry: "TBC",
				firstAidExpiry: "TBC",
				ndisScreeningExpiry: "Not recorded",
				employment: "casual",
				role: "support_worker",
				...s
			}, ...get().staff],
			training: [
				{
					id: uid("tr"),
					staffId: id,
					name: "Provide First Aid",
					status: "due",
					expiry: "TBC"
				},
				{
					id: uid("tr"),
					staffId: id,
					name: "Induction",
					status: "due",
					expiry: "TBC"
				},
				...get().training
			],
			onboarding: [{
				id: uid("ob"),
				subjectType: "staff",
				subjectId: id,
				name: "Induction pack",
				status: "pending"
			}, ...get().onboarding]
		});
		return id;
	},
	addNote: (n) => {
		const id = uid("n");
		set({ notes: [{
			id,
			...n
		}, ...get().notes] });
		return id;
	},
	addIncident: (i) => {
		const id = uid("i");
		set({ incidents: [{
			id,
			...i
		}, ...get().incidents] });
		return id;
	},
	addTimesheet: (t) => {
		const id = uid("t");
		set({ timesheets: [{
			id,
			...t
		}, ...get().timesheets] });
		return id;
	},
	setTimesheetStatus: (id, status) => set({ timesheets: get().timesheets.map((t) => t.id === id ? {
		...t,
		status
	} : t) }),
	setIncidentStatus: (id, status) => set({ incidents: get().incidents.map((i) => i.id === id ? {
		...i,
		status
	} : i) }),
	setIncidentFollowUp: (id, followUp) => set({ incidents: get().incidents.map((i) => i.id === id ? {
		...i,
		followUp
	} : i) }),
	setInvoiceStatus: (id, status) => set({ invoices: get().invoices.map((i) => i.id === id ? {
		...i,
		status
	} : i) }),
	checkIn: (staffId, clientId) => {
		const person = get().staff.find((s) => s.id === staffId);
		if (!person) return "That worker is not on file.";
		const hold = rosterHold(person);
		if (hold) return `${hold}. Check-in stays blocked until this is cleared.`;
		if (!get().clients.some((c) => c.id === clientId)) return "That participant is not on file.";
		const day = todayLabel;
		const clock = perthClock();
		const hour = Number(clock.slice(0, 2));
		const startH = Number.isFinite(hour) ? hour : 7;
		const endH = Math.min(23, startH + 6);
		const pad = (n) => String(n).padStart(2, "0");
		const window = `${pad(startH)}–${pad(endH)}`;
		const existing = get().shifts.filter((s) => s.staffId === staffId && s.clientId === clientId && s.day === day);
		let shifts = get().shifts.map((s) => s.staffId === staffId && s.clientId === clientId && s.day === day && s.status !== "complete" ? {
			...s,
			status: "in_progress"
		} : s);
		if (existing.length === 0) shifts = [{
			id: uid("sh"),
			staffId,
			clientId,
			day,
			window,
			status: "in_progress"
		}, ...shifts];
		set({
			checkins: [{
				id: uid("ck"),
				staffId,
				clientId,
				inAt: clock
			}, ...get().checkins.filter((c) => !(c.staffId === staffId && !c.outAt))],
			shifts
		});
		return null;
	},
	checkOut: (staffId) => {
		const open = get().checkins.find((c) => c.staffId === staffId && !c.outAt);
		if (!open) return;
		const outAt = perthClock();
		const start = displayClock(open.inAt);
		const date = perthShortDate();
		const sheet = get().timesheets.some((t) => t.staffId === staffId && t.clientId === open.clientId && t.date === date && t.start === start) ? null : {
			id: uid("t"),
			staffId,
			clientId: open.clientId,
			date,
			start,
			end: outAt,
			hours: hoursBetween(start, outAt),
			status: "draft"
		};
		set({
			checkins: get().checkins.map((c) => c.id === open.id ? {
				...c,
				outAt
			} : c),
			shifts: get().shifts.map((s) => s.staffId === staffId && s.clientId === open.clientId && s.day === todayLabel && s.status === "in_progress" ? {
				...s,
				status: "complete"
			} : s),
			timesheets: sheet ? [sheet, ...get().timesheets] : get().timesheets
		});
	},
	completeTask: (id) => {
		const task = get().onboarding.find((t) => t.id === id);
		const tasks = get().onboarding.map((t) => t.id === id ? {
			...t,
			status: "done"
		} : t);
		let clients = get().clients;
		if (task?.subjectType === "client" && task.name === "Privacy consent recorded") clients = clients.map((c) => c.id === task.subjectId ? {
			...c,
			privacyConsent: true,
			consentAt: c.consentAt || perthShortDateYear()
		} : c);
		if (task?.subjectType === "client") {
			if (tasks.filter((t) => t.subjectType === "client" && t.subjectId === task.subjectId && t.status === "pending").length === 0) clients = clients.map((c) => c.id === task.subjectId ? {
				...c,
				status: "active"
			} : c);
		}
		set({
			onboarding: tasks,
			clients
		});
	},
	addRequest: (r) => {
		const id = uid("rq");
		set({ requests: [{
			...r,
			id
		}, ...get().requests] });
		return id;
	},
	setRequestStatus: (id, status, reply) => set({ requests: get().requests.map((r) => r.id === id ? {
		...r,
		status,
		...reply?.trim() ? { reply: reply.trim() } : {}
	} : r) }),
	addCarePlan: (p) => {
		const id = uid("cp");
		set({ carePlans: [{
			id,
			...p
		}, ...get().carePlans] });
		return id;
	},
	assignStaff: (clientId, staffId) => {
		if (!clientId || !staffId) return;
		set({ clients: get().clients.map((c) => c.id === clientId && !c.staffIds.includes(staffId) ? {
			...c,
			staffIds: [...c.staffIds, staffId]
		} : c) });
	},
	setStaffStatus: (id, status) => set({ staff: get().staff.map((s) => s.id === id ? {
		...s,
		status
	} : s) }),
	setTrainingStatus: (id, status) => {
		const item = get().training.find((t) => t.id === id);
		set({
			training: get().training.map((t) => t.id === id ? {
				...t,
				status
			} : t),
			staff: item && status === "current" && /first aid/i.test(item.name) ? get().staff.map((s) => s.id === item.staffId ? {
				...s,
				firstAid: "ok",
				firstAidExpiry: "Current"
			} : s) : get().staff
		});
	},
	markClearance: (id, kind) => set({ staff: get().staff.map((s) => {
		if (s.id !== id) return s;
		if (kind === "ndis") return {
			...s,
			ndisScreening: "ok",
			ndisScreeningExpiry: "Current"
		};
		if (kind === "wwcc") return {
			...s,
			wwcc: "ok",
			wwccExpiry: "Current"
		};
		return {
			...s,
			firstAid: "ok",
			firstAidExpiry: "Current"
		};
	}) }),
	addInvoice: (i) => {
		const id = uid("inv");
		const number = i.number ?? `INV-${1047 + get().invoices.length}`;
		set({ invoices: [{
			...i,
			id,
			number
		}, ...get().invoices] });
		return id;
	},
	attachApprovedHours: (invoiceId) => {
		const inv = get().invoices.find((i) => i.id === invoiceId);
		if (!inv) return {
			count: 0,
			amount: 0
		};
		const claimed = new Set(get().invoices.flatMap((i) => i.timesheetIds));
		const extra = get().timesheets.filter((t) => t.clientId === inv.clientId && t.status === "approved" && !claimed.has(t.id));
		if (extra.length === 0) return {
			count: 0,
			amount: 0
		};
		const add = extra.reduce((sum, t) => sum + claimCents(t.hours, t.date), 0) / 100;
		set({ invoices: get().invoices.map((i) => i.id === invoiceId ? {
			...i,
			timesheetIds: [...i.timesheetIds, ...extra.map((t) => t.id)],
			amount: Math.round((i.amount + add) * 100) / 100
		} : i) });
		return {
			count: extra.length,
			amount: add
		};
	},
	addShift: (s) => {
		const person = get().staff.find((x) => x.id === s.staffId);
		if (!person) return { error: "That worker is not on file." };
		const hold = rosterHold(person);
		if (hold) return { error: `${hold}. They cannot be rostered until this is cleared.` };
		const id = uid("sh");
		const next = {
			id,
			status: "scheduled",
			...s
		};
		set({ shifts: [...get().shifts.filter((x) => !(x.staffId === s.staffId && x.day === s.day && x.window === s.window)), next] });
		return { id };
	},
	setCarePlanStatus: (id, status) => set({ carePlans: get().carePlans.map((p) => p.id === id ? {
		...p,
		status
	} : p) }),
	setClientRisk: (id, risk) => set({ clients: get().clients.map((c) => c.id === id ? {
		...c,
		risk
	} : c) }),
	setOrg: (patch) => set({ org: {
		...get().org ?? seed.org,
		...patch
	} }),
	reset: () => set({
		...seed,
		hydrated: true
	})
}), {
	name: "cc-platform-db-v26",
	storage: createJSONStorage(() => localStorage),
	skipHydration: true,
	partialize: (s) => ({
		staff: s.staff,
		clients: s.clients,
		notes: s.notes,
		incidents: s.incidents,
		timesheets: s.timesheets,
		invoices: s.invoices,
		shifts: s.shifts,
		carePlans: s.carePlans,
		training: s.training,
		onboarding: s.onboarding,
		requests: s.requests,
		checkins: s.checkins,
		org: s.org
	})
}));
var KEY = "cc-platform-session-v21";
var Ctx = (0, import_react.createContext)(null);
function load() {
	try {
		const raw = localStorage.getItem(KEY);
		return raw ? JSON.parse(raw) : null;
	} catch {
		return null;
	}
}
function SessionProvider({ children }) {
	const [session, setSession] = (0, import_react.useState)(null);
	const [ready, setReady] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		setSession(load());
		useCC.persist.rehydrate();
		useCC.getState().setHydrated(true);
		setReady(true);
	}, []);
	const value = (0, import_react.useMemo)(() => ({
		session,
		ready,
		login: (s) => {
			try {
				localStorage.setItem(KEY, JSON.stringify(s));
			} catch {}
			setSession(s);
			const to = homeFor(s.role);
			window.location.assign(to);
		},
		logout: () => {
			try {
				localStorage.removeItem(KEY);
			} catch {}
			setSession(null);
			window.location.assign("/login");
		}
	}), [session, ready]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ctx.Provider, {
		value,
		children
	});
}
function useSession() {
	const ctx = (0, import_react.useContext)(Ctx);
	if (!ctx) throw new Error("useSession must be inside SessionProvider");
	return ctx;
}
function accountFor(email) {
	return accounts.find((a) => a.email === email.trim().toLowerCase());
}
function portalAccount(username, code) {
	const user = username.trim().toLowerCase();
	const pin = code.trim();
	if (user === CLIENT_PORTAL.username && pin === CLIENT_PORTAL.accessCode) return accounts.find((a) => a.role === "client");
}
var styles_default = "/assets/styles-Ei8adtsW.css";
var APP_NAME = "CartersCare";
var Route$43 = createRootRoute({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: APP_NAME },
			{
				name: "theme-color",
				content: "#9B188F"
			}
		],
		links: [
			{
				rel: "icon",
				type: "image/svg+xml",
				href: "/favicon.svg"
			},
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "manifest",
				href: "/__grok/manifest.webmanifest"
			},
			{
				rel: "apple-touch-icon",
				href: "/__grok/icon-180.png"
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700;800;900&display=swap"
			}
		]
	}),
	component: Root,
	notFoundComponent: NotFound
});
function Root() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en-AU",
		suppressHydrationWarning: true,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PreviewHostBridge, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SessionProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}) }) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})
		] })]
	});
}
function NotFound() {
	const { session } = useSession();
	const to = homeFor(session?.role);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto flex min-h-svh max-w-lg flex-col items-center justify-center gap-4 px-6 text-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm font-semibold tracking-wide text-primary uppercase",
				children: "404"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-3xl font-semibold tracking-tight",
				children: "This page is not on the floor"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-muted",
				children: "The link is stale or the record moved. Head back to your desk or search from the sidebar."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
				href: to,
				className: "rounded-md bg-primary px-4 py-2.5 text-sm font-semibold text-primary-fg",
				children: "Return to your desk"
			})
		]
	});
}
var $$splitComponentImporter$42 = () => import("./routes-D6iIMj2x.mjs");
var Route$42 = createFileRoute("/")({ component: lazyRouteComponent($$splitComponentImporter$42, "component") });
var $$splitComponentImporter$41 = () => import("../_-BImbeO-p.mjs");
var Route$41 = createFileRoute("/$")({ component: lazyRouteComponent($$splitComponentImporter$41, "component") });
var $$splitComponentImporter$40 = () => import("../_app-DN3cNGeL.mjs");
var Route$40 = createFileRoute("/_app")({ component: lazyRouteComponent($$splitComponentImporter$40, "component") });
var $$splitComponentImporter$39 = () => import("./login-04irgLgd.mjs");
var Route$39 = createFileRoute("/login")({ component: lazyRouteComponent($$splitComponentImporter$39, "component") });
var $$splitComponentImporter$38 = () => import("./analytics-SyoF6GNs.mjs");
var Route$38 = createFileRoute("/_app/analytics")({ component: lazyRouteComponent($$splitComponentImporter$38, "component") });
var $$splitComponentImporter$37 = () => import("./ask-maureen-BRAC9Gy5.mjs");
var Route$37 = createFileRoute("/_app/ask-maureen")({ component: lazyRouteComponent($$splitComponentImporter$37, "component") });
var $$splitComponentImporter$36 = () => import("./check-in-BprZreAq.mjs");
var Route$36 = createFileRoute("/_app/check-in")({ component: lazyRouteComponent($$splitComponentImporter$36, "component") });
var $$splitComponentImporter$35 = () => import("./client-portal-B4sW8Nlf.mjs");
var Route$35 = createFileRoute("/_app/client-portal")({ component: lazyRouteComponent($$splitComponentImporter$35, "component") });
var $$splitComponentImporter$34 = () => import("./compliance-B5DgPi7T.mjs");
var Route$34 = createFileRoute("/_app/compliance")({ component: lazyRouteComponent($$splitComponentImporter$34, "component") });
var $$splitComponentImporter$33 = () => import("./financials-CT4_vK4Z.mjs");
var Route$33 = createFileRoute("/_app/financials")({ component: lazyRouteComponent($$splitComponentImporter$33, "component") });
var $$splitComponentImporter$32 = () => import("./home-CkI_d3ew.mjs");
var Route$32 = createFileRoute("/_app/home")({ component: lazyRouteComponent($$splitComponentImporter$32, "component") });
var $$splitComponentImporter$31 = () => import("./my-compliance-ClDFDfR5.mjs");
var Route$31 = createFileRoute("/_app/my-compliance")({ component: lazyRouteComponent($$splitComponentImporter$31, "component") });
var $$splitComponentImporter$30 = () => import("./my-roster-jgbhtII_.mjs");
var Route$30 = createFileRoute("/_app/my-roster")({ component: lazyRouteComponent($$splitComponentImporter$30, "component") });
var $$splitComponentImporter$29 = () => import("./my-timesheets-DKxfcDf6.mjs");
var Route$29 = createFileRoute("/_app/my-timesheets")({ component: lazyRouteComponent($$splitComponentImporter$29, "component") });
var $$splitComponentImporter$28 = () => import("./notes-ByhTBQri.mjs");
var Route$28 = createFileRoute("/_app/notes")({
	beforeLoad: () => {
		throw redirect({ to: "/case-notes" });
	},
	component: lazyRouteComponent($$splitComponentImporter$28, "component")
});
var $$splitComponentImporter$27 = () => import("./onboarding-I6ZxBw_z.mjs");
var Route$27 = createFileRoute("/_app/onboarding")({ component: lazyRouteComponent($$splitComponentImporter$27, "component") });
var $$splitComponentImporter$26 = () => import("./reports-BxSgUEr5.mjs");
var Route$26 = createFileRoute("/_app/reports")({ component: lazyRouteComponent($$splitComponentImporter$26, "component") });
var $$splitComponentImporter$25 = () => import("./roster-BhYhzdAk.mjs");
var Route$25 = createFileRoute("/_app/roster")({ component: lazyRouteComponent($$splitComponentImporter$25, "component") });
var $$splitComponentImporter$24 = () => import("./settings-Bc-YJF_n.mjs");
var Route$24 = createFileRoute("/_app/settings")({ component: lazyRouteComponent($$splitComponentImporter$24, "component") });
var $$splitComponentImporter$23 = () => import("./staff-onboarding-0Yt-K9VN.mjs");
var Route$23 = createFileRoute("/_app/staff-onboarding")({ component: lazyRouteComponent($$splitComponentImporter$23, "component") });
var $$splitComponentImporter$22 = () => import("./tidy-up-BF0kx7mG.mjs");
var Route$22 = createFileRoute("/_app/tidy-up")({ component: lazyRouteComponent($$splitComponentImporter$22, "component") });
var $$splitComponentImporter$21 = () => import("./case-notes-BIoJC-dK.mjs");
var Route$21 = createFileRoute("/_app/case-notes/")({
	validateSearch: deskSearch,
	component: lazyRouteComponent($$splitComponentImporter$21, "component")
});
var $$splitComponentImporter$20 = () => import("../_noteId-siXO03s0.mjs");
var Route$20 = createFileRoute("/_app/case-notes/$noteId")({ component: lazyRouteComponent($$splitComponentImporter$20, "component") });
var $$splitComponentImporter$19 = () => import("./clients-DvP3MKXJ.mjs");
var Route$19 = createFileRoute("/_app/clients/")({ component: lazyRouteComponent($$splitComponentImporter$19, "component") });
var $$splitComponentImporter$18 = () => import("../_clientId-Duu9HAxf.mjs");
var Route$18 = createFileRoute("/_app/clients/$clientId")({ component: lazyRouteComponent($$splitComponentImporter$18, "component") });
var $$splitComponentImporter$17 = () => import("./care-plans-BsNhbEAb.mjs");
var Route$17 = createFileRoute("/_app/clients/care-plans")({
	validateSearch: deskSearch,
	component: lazyRouteComponent($$splitComponentImporter$17, "component")
});
var $$splitComponentImporter$16 = () => import("./risk-D4FxOCTJ.mjs");
var Route$16 = createFileRoute("/_app/clients/risk")({ component: lazyRouteComponent($$splitComponentImporter$16, "component") });
var $$splitComponentImporter$15 = () => import("./incidents-CNGgxDWF.mjs");
var Route$15 = createFileRoute("/_app/incidents/")({
	validateSearch: deskSearch,
	component: lazyRouteComponent($$splitComponentImporter$15, "component")
});
var $$splitComponentImporter$14 = () => import("../_incidentId-CxJUMUfJ.mjs");
var Route$14 = createFileRoute("/_app/incidents/$incidentId")({ component: lazyRouteComponent($$splitComponentImporter$14, "component") });
var $$splitComponentImporter$13 = () => import("./invoices-DILSa8pd.mjs");
var Route$13 = createFileRoute("/_app/invoices/")({ component: lazyRouteComponent($$splitComponentImporter$13, "component") });
var $$splitComponentImporter$12 = () => import("../_invoiceId-BD5imMWV.mjs");
var Route$12 = createFileRoute("/_app/invoices/$invoiceId")({ component: lazyRouteComponent($$splitComponentImporter$12, "component") });
var $$splitComponentImporter$11 = () => import("./requests-B7rRfQbe.mjs");
var Route$11 = createFileRoute("/_app/requests/")({
	validateSearch: deskSearch,
	component: lazyRouteComponent($$splitComponentImporter$11, "component")
});
var $$splitComponentImporter$10 = () => import("../_requestId-p7I2l4oB.mjs");
var Route$10 = createFileRoute("/_app/requests/$requestId")({ component: lazyRouteComponent($$splitComponentImporter$10, "component") });
var $$splitComponentImporter$9 = () => import("./staff-Cg2DBXRI.mjs");
var Route$9 = createFileRoute("/_app/staff/")({ component: lazyRouteComponent($$splitComponentImporter$9, "component") });
var $$splitComponentImporter$8 = () => import("../_staffId-CFafC7Y1.mjs");
var Route$8 = createFileRoute("/_app/staff/$staffId")({ component: lazyRouteComponent($$splitComponentImporter$8, "component") });
var $$splitComponentImporter$7 = () => import("./compliance-C4JwJHIq.mjs");
var Route$7 = createFileRoute("/_app/staff/compliance")({ component: lazyRouteComponent($$splitComponentImporter$7, "component") });
var $$splitComponentImporter$6 = () => import("./hr-BdlsTwU9.mjs");
var Route$6 = createFileRoute("/_app/staff/hr")({ component: lazyRouteComponent($$splitComponentImporter$6, "component") });
var $$splitComponentImporter$5 = () => import("./training-BVfK9bi3.mjs");
var Route$5 = createFileRoute("/_app/staff/training")({ component: lazyRouteComponent($$splitComponentImporter$5, "component") });
var $$splitComponentImporter$4 = () => import("./timesheets-Dc32fBb6.mjs");
var Route$4 = createFileRoute("/_app/timesheets/")({
	validateSearch: deskSearch,
	component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
var $$splitComponentImporter$3 = () => import("../_timesheetId-DMXjL_qK.mjs");
var Route$3 = createFileRoute("/_app/timesheets/$timesheetId")({ component: lazyRouteComponent($$splitComponentImporter$3, "component") });
var $$splitComponentImporter$2 = () => import("./worker-C7_NPgGx.mjs");
var Route$2 = createFileRoute("/_app/worker/")({ component: lazyRouteComponent($$splitComponentImporter$2, "component") });
var $$splitComponentImporter$1 = () => import("./check-in-DGYUzQt-.mjs");
var Route$1 = createFileRoute("/_app/worker/check-in")({ component: lazyRouteComponent($$splitComponentImporter$1, "component") });
var $$splitComponentImporter = () => import("./notes-CLMD3xSK.mjs");
var Route = createFileRoute("/_app/worker/notes")({ component: lazyRouteComponent($$splitComponentImporter, "component") });
var IndexRoute = Route$42.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$43
});
var SplatRoute = Route$41.update({
	id: "/$",
	path: "/$",
	getParentRoute: () => Route$43
});
var AppRoute = Route$40.update({
	id: "/_app",
	getParentRoute: () => Route$43
});
var LoginRoute = Route$39.update({
	id: "/login",
	path: "/login",
	getParentRoute: () => Route$43
});
var AppAnalyticsRoute = Route$38.update({
	id: "/analytics",
	path: "/analytics",
	getParentRoute: () => AppRoute
});
var AppAskMaureenRoute = Route$37.update({
	id: "/ask-maureen",
	path: "/ask-maureen",
	getParentRoute: () => AppRoute
});
var AppCheckInRoute = Route$36.update({
	id: "/check-in",
	path: "/check-in",
	getParentRoute: () => AppRoute
});
var AppClientPortalRoute = Route$35.update({
	id: "/client-portal",
	path: "/client-portal",
	getParentRoute: () => AppRoute
});
var AppComplianceRoute = Route$34.update({
	id: "/compliance",
	path: "/compliance",
	getParentRoute: () => AppRoute
});
var AppFinancialsRoute = Route$33.update({
	id: "/financials",
	path: "/financials",
	getParentRoute: () => AppRoute
});
var AppHomeRoute = Route$32.update({
	id: "/home",
	path: "/home",
	getParentRoute: () => AppRoute
});
var AppMyComplianceRoute = Route$31.update({
	id: "/my-compliance",
	path: "/my-compliance",
	getParentRoute: () => AppRoute
});
var AppMyRosterRoute = Route$30.update({
	id: "/my-roster",
	path: "/my-roster",
	getParentRoute: () => AppRoute
});
var AppMyTimesheetsRoute = Route$29.update({
	id: "/my-timesheets",
	path: "/my-timesheets",
	getParentRoute: () => AppRoute
});
var AppNotesRoute = Route$28.update({
	id: "/notes",
	path: "/notes",
	getParentRoute: () => AppRoute
});
var AppOnboardingRoute = Route$27.update({
	id: "/onboarding",
	path: "/onboarding",
	getParentRoute: () => AppRoute
});
var AppReportsRoute = Route$26.update({
	id: "/reports",
	path: "/reports",
	getParentRoute: () => AppRoute
});
var AppRosterRoute = Route$25.update({
	id: "/roster",
	path: "/roster",
	getParentRoute: () => AppRoute
});
var AppSettingsRoute = Route$24.update({
	id: "/settings",
	path: "/settings",
	getParentRoute: () => AppRoute
});
var AppStaffOnboardingRoute = Route$23.update({
	id: "/staff-onboarding",
	path: "/staff-onboarding",
	getParentRoute: () => AppRoute
});
var AppTidyUpRoute = Route$22.update({
	id: "/tidy-up",
	path: "/tidy-up",
	getParentRoute: () => AppRoute
});
var AppCaseNotesIndexRoute = Route$21.update({
	id: "/case-notes/",
	path: "/case-notes/",
	getParentRoute: () => AppRoute
});
var AppCaseNotesNoteIdRoute = Route$20.update({
	id: "/case-notes/$noteId",
	path: "/case-notes/$noteId",
	getParentRoute: () => AppRoute
});
var AppClientsIndexRoute = Route$19.update({
	id: "/clients/",
	path: "/clients/",
	getParentRoute: () => AppRoute
});
var AppClientsClientIdRoute = Route$18.update({
	id: "/clients/$clientId",
	path: "/clients/$clientId",
	getParentRoute: () => AppRoute
});
var AppClientsCarePlansRoute = Route$17.update({
	id: "/clients/care-plans",
	path: "/clients/care-plans",
	getParentRoute: () => AppRoute
});
var AppClientsRiskRoute = Route$16.update({
	id: "/clients/risk",
	path: "/clients/risk",
	getParentRoute: () => AppRoute
});
var AppIncidentsIndexRoute = Route$15.update({
	id: "/incidents/",
	path: "/incidents/",
	getParentRoute: () => AppRoute
});
var AppIncidentsIncidentIdRoute = Route$14.update({
	id: "/incidents/$incidentId",
	path: "/incidents/$incidentId",
	getParentRoute: () => AppRoute
});
var AppInvoicesIndexRoute = Route$13.update({
	id: "/invoices/",
	path: "/invoices/",
	getParentRoute: () => AppRoute
});
var AppInvoicesInvoiceIdRoute = Route$12.update({
	id: "/invoices/$invoiceId",
	path: "/invoices/$invoiceId",
	getParentRoute: () => AppRoute
});
var AppRequestsIndexRoute = Route$11.update({
	id: "/requests/",
	path: "/requests/",
	getParentRoute: () => AppRoute
});
var AppRequestsRequestIdRoute = Route$10.update({
	id: "/requests/$requestId",
	path: "/requests/$requestId",
	getParentRoute: () => AppRoute
});
var AppStaffIndexRoute = Route$9.update({
	id: "/staff/",
	path: "/staff/",
	getParentRoute: () => AppRoute
});
var AppStaffStaffIdRoute = Route$8.update({
	id: "/staff/$staffId",
	path: "/staff/$staffId",
	getParentRoute: () => AppRoute
});
var AppStaffComplianceRoute = Route$7.update({
	id: "/staff/compliance",
	path: "/staff/compliance",
	getParentRoute: () => AppRoute
});
var AppStaffHrRoute = Route$6.update({
	id: "/staff/hr",
	path: "/staff/hr",
	getParentRoute: () => AppRoute
});
var AppStaffTrainingRoute = Route$5.update({
	id: "/staff/training",
	path: "/staff/training",
	getParentRoute: () => AppRoute
});
var AppTimesheetsIndexRoute = Route$4.update({
	id: "/timesheets/",
	path: "/timesheets/",
	getParentRoute: () => AppRoute
});
var AppTimesheetsTimesheetIdRoute = Route$3.update({
	id: "/timesheets/$timesheetId",
	path: "/timesheets/$timesheetId",
	getParentRoute: () => AppRoute
});
var AppWorkerIndexRoute = Route$2.update({
	id: "/worker/",
	path: "/worker/",
	getParentRoute: () => AppRoute
});
var AppRouteChildren = {
	AppAnalyticsRoute,
	AppAskMaureenRoute,
	AppCheckInRoute,
	AppClientPortalRoute,
	AppComplianceRoute,
	AppFinancialsRoute,
	AppHomeRoute,
	AppMyComplianceRoute,
	AppMyRosterRoute,
	AppMyTimesheetsRoute,
	AppNotesRoute,
	AppOnboardingRoute,
	AppReportsRoute,
	AppRosterRoute,
	AppSettingsRoute,
	AppStaffOnboardingRoute,
	AppTidyUpRoute,
	AppCaseNotesNoteIdRoute,
	AppClientsClientIdRoute,
	AppClientsCarePlansRoute,
	AppClientsRiskRoute,
	AppIncidentsIncidentIdRoute,
	AppInvoicesInvoiceIdRoute,
	AppRequestsRequestIdRoute,
	AppStaffStaffIdRoute,
	AppStaffComplianceRoute,
	AppStaffHrRoute,
	AppStaffTrainingRoute,
	AppTimesheetsTimesheetIdRoute,
	AppWorkerCheckInRoute: Route$1.update({
		id: "/worker/check-in",
		path: "/worker/check-in",
		getParentRoute: () => AppRoute
	}),
	AppWorkerNotesRoute: Route.update({
		id: "/worker/notes",
		path: "/worker/notes",
		getParentRoute: () => AppRoute
	}),
	AppCaseNotesIndexRoute,
	AppClientsIndexRoute,
	AppIncidentsIndexRoute,
	AppInvoicesIndexRoute,
	AppRequestsIndexRoute,
	AppStaffIndexRoute,
	AppTimesheetsIndexRoute,
	AppWorkerIndexRoute
};
var rootRouteChildren = {
	IndexRoute,
	SplatRoute,
	AppRoute: AppRoute._addFileChildren(AppRouteChildren),
	LoginRoute
};
var routeTree = Route$43._addFileChildren(rootRouteChildren)._addFileTypes();
var router_exports = /* @__PURE__ */ __exportAll({ getRouter: () => getRouter });
function getRouter() {
	return createRouter({
		routeTree,
		defaultErrorComponent: AppErrorComponent,
		defaultPreload: "intent"
	});
}
//#endregion
export { homeFor as A, perthNow as C, NAV_GROUPS as D, NAV as E, DEMO_PASSWORD as M, seed as N, RANK as O, weekDays as P, perthGreeting as S, perthShortDateYear as T, cn as _, Route$12 as a, initials as b, Route$20 as c, useSession as d, useCC as f, rosterWarn as g, rosterHold as h, Route$10 as i, CLIENT_PORTAL as j, canAccess as k, accountFor as l, money as m, Route$3 as n, Route$14 as o, CLAIM_NOTE as p, Route$8 as r, Route$18 as s, router_exports as t, portalAccount as u, displayClock as v, perthShortDate as w, perthDate as x, hoursBetween as y };
