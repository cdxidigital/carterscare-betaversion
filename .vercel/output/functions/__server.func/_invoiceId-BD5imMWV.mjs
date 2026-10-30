import { w as require_jsx_runtime } from "./_libs/@tanstack/react-router+[...].mjs";
import { a as Route$12 } from "./_ssr/router-Bty-v5RX.mjs";
import { f as InvoiceDetailScreen } from "./_ssr/screens-TEN7enTD.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_invoiceId-BD5imMWV.js
var import_jsx_runtime = require_jsx_runtime();
var SplitComponent = function InvoiceRoute() {
	const { invoiceId } = Route$12.useParams();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InvoiceDetailScreen, { invoiceId });
};
//#endregion
export { SplitComponent as component };
