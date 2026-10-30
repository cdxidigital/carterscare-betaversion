import { i as __toESM } from "../_runtime.mjs";
import { Z as require_react, w as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { A as homeFor, d as useSession } from "./router-Bty-v5RX.mjs";
import { t as LoginPage } from "./login-page-CZP9wicP.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-D6iIMj2x.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function RootHome() {
	const { session, ready } = useSession();
	(0, import_react.useEffect)(() => {
		if (!ready || !session) return;
		const to = homeFor(session.role);
		if (window.location.pathname !== to) window.location.assign(to);
	}, [ready, session]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoginPage, {});
}
//#endregion
export { RootHome as component };
