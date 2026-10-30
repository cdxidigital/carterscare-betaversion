import { w as require_jsx_runtime } from "./_libs/@tanstack/react-router+[...].mjs";
import { i as Route$10 } from "./_ssr/router-Bty-v5RX.mjs";
import { S as RequestDetailScreen } from "./_ssr/screens-TEN7enTD.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_requestId-p7I2l4oB.js
var import_jsx_runtime = require_jsx_runtime();
var SplitComponent = function RequestRoute() {
	const { requestId } = Route$10.useParams();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RequestDetailScreen, { requestId });
};
//#endregion
export { SplitComponent as component };
