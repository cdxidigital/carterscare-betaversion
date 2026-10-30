import { w as require_jsx_runtime } from "./_libs/@tanstack/react-router+[...].mjs";
import { c as Route$20 } from "./_ssr/router-Bty-v5RX.mjs";
import { v as NoteDetailScreen } from "./_ssr/screens-TEN7enTD.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_noteId-siXO03s0.js
var import_jsx_runtime = require_jsx_runtime();
var SplitComponent = function NoteRoute() {
	const { noteId } = Route$20.useParams();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NoteDetailScreen, { noteId });
};
//#endregion
export { SplitComponent as component };
