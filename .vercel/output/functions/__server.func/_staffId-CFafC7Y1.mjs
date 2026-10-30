import { w as require_jsx_runtime } from "./_libs/@tanstack/react-router+[...].mjs";
import { r as Route$8 } from "./_ssr/router-Bty-v5RX.mjs";
import { O as StaffDetailScreen } from "./_ssr/screens-TEN7enTD.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_staffId-CFafC7Y1.js
var import_jsx_runtime = require_jsx_runtime();
var SplitComponent = function StaffRoute() {
	const { staffId } = Route$8.useParams();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StaffDetailScreen, { staffId });
};
//#endregion
export { SplitComponent as component };
