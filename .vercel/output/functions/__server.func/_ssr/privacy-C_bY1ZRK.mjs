import { i as __toESM } from "../_runtime.mjs";
import { Z as require_react, w as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { d as useSession, f as useCC } from "./router-Bty-v5RX.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/privacy-C_bY1ZRK.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function useLookups() {
	const db = useCC();
	const { session } = useSession();
	const view = (0, import_react.useMemo)(() => {
		if (session?.role === "client" && session.clientId) {
			const id = session.clientId;
			return {
				...db,
				clients: db.clients.filter((c) => c.id === id),
				notes: db.notes.filter((n) => n.clientId === id && n.visibleToClient !== false),
				incidents: [],
				invoices: [],
				timesheets: [],
				requests: db.requests.filter((r) => r.clientId === id),
				carePlans: db.carePlans.filter((p) => p.clientId === id),
				shifts: db.shifts.filter((s) => s.clientId === id)
			};
		}
		if (session?.role === "support_worker" && session.staffId) {
			const mine = session.staffId;
			const ids = new Set(db.clients.filter((c) => c.staffIds.includes(mine)).map((c) => c.id));
			return {
				...db,
				clients: db.clients.filter((c) => ids.has(c.id)),
				notes: db.notes.filter((n) => ids.has(n.clientId)),
				incidents: db.incidents.filter((i) => ids.has(i.clientId)),
				requests: db.requests.filter((r) => ids.has(r.clientId)),
				carePlans: db.carePlans.filter((p) => ids.has(p.clientId)),
				invoices: [],
				shifts: db.shifts.filter((s) => s.staffId === mine || ids.has(s.clientId)),
				timesheets: db.timesheets.filter((t) => t.staffId === mine),
				checkins: db.checkins.filter((c) => c.staffId === mine)
			};
		}
		return db;
	}, [db, session]);
	const staffName = (id) => db.staff.find((s) => s.id === id)?.name ?? "Unknown staff";
	const clientName = (id) => {
		if (!(view.clients.some((c) => c.id === id) || session?.role === "admin" || session?.role === "manager")) return "Hidden";
		return db.clients.find((c) => c.id === id)?.name ?? "Unknown client";
	};
	return {
		...view,
		staffName,
		clientName
	};
}
function PrivacyNotice({ variant }) {
	if (variant === "collect") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "mb-3 text-xs leading-relaxed text-muted",
		children: "Disability and health details are sensitive information under the Privacy Act 1988 (Cth). They are collected to deliver supports, keep people safe, and prepare NDIS claims. The NDIS number is a government identifier and is not the file number. It is not used for marketing. This demo keeps the record in this browser only — do not enter a real participant."
	});
	if (variant === "worker") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-sm leading-relaxed text-muted",
		children: "Open only the participants assigned to you. Leave a note staff-only unless the person should see it in their portal. Do not put a real person’s information into this demo."
	});
	if (variant === "portal") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-2 text-sm leading-relaxed text-muted",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Your file is used to deliver your supports and to claim NDIS funding. Notes appear here only when your team marks them as shared with you. You can ask for a correction, or raise a privacy question, from Requests." }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
				"If a privacy complaint is not resolved with your provider, you can contact the Office of the Australian Information Commissioner at",
				" ",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
					className: "font-semibold text-portal underline",
					href: "https://www.oaic.gov.au",
					target: "_blank",
					rel: "noreferrer",
					children: "oaic.gov.au"
				}),
				". Concerns about the quality of NDIS supports can go to the NDIS Quality and Safeguards Commission."
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "This demo stores the record only in this browser. It is not a clinical record system. Do not enter real personal information." })
		]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-2 text-sm leading-relaxed text-muted",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Personal information here is handled against the Australian Privacy Principles. Health and disability information is sensitive and is collected with consent, for supports, safety, and NDIS claiming only." }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Support workers see participants assigned to them, not the whole book. Information is not used for direct marketing and this demo does not send it overseas — it stays in the browser on this device." }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "The NDIS number is a government identifier (APP 9). Files use an internal id, never the NDIS number." }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Participants can read shared notes in the portal and request a correction or make a privacy complaint from Requests. Unresolved privacy complaints can go to the OAIC. This demo is not a certified health record and does not replace a provider’s privacy policy or a Notifiable Data Breaches assessment." })
		]
	});
}
var REQUEST_LABEL = {
	schedule: "Schedule",
	service: "Service",
	feedback: "Feedback",
	privacy: "Privacy",
	correction: "Correction",
	other: "Other"
};
//#endregion
export { REQUEST_LABEL as n, useLookups as r, PrivacyNotice as t };
