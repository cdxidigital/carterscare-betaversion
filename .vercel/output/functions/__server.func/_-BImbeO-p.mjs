import { b as Link, w as require_jsx_runtime } from "./_libs/@tanstack/react-router+[...].mjs";
import { A as homeFor, d as useSession } from "./_ssr/router-Bty-v5RX.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_-BImbeO-p.js
var import_jsx_runtime = require_jsx_runtime();
var SplitComponent = function CatchAll() {
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
				children: "Every live desk is in the sidebar. This path does not match a record or a module."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to,
				className: "rounded-md bg-primary px-4 py-2.5 text-sm font-semibold text-primary-fg",
				children: "Return to your desk"
			})
		]
	});
};
//#endregion
export { SplitComponent as component };
