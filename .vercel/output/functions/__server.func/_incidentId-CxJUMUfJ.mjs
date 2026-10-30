import { w as require_jsx_runtime } from "./_libs/@tanstack/react-router+[...].mjs";
import { o as Route$14 } from "./_ssr/router-Bty-v5RX.mjs";
import { u as IncidentDetailScreen } from "./_ssr/screens-TEN7enTD.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_incidentId-CxJUMUfJ.js
var import_jsx_runtime = require_jsx_runtime();
var SplitComponent = function IncidentRoute() {
	const { incidentId } = Route$14.useParams();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IncidentDetailScreen, { incidentId });
};
//#endregion
export { SplitComponent as component };
