import { i as __toESM } from "../_runtime.mjs";
import { Z as require_react, w as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { A as CircleUser, E as EyeOff, N as CircleAlert, S as Hash, T as Eye, _ as Mail, c as Shield, i as User, r as Users, x as Heart, y as Lock } from "../_libs/lucide-react.mjs";
import { M as DEMO_PASSWORD, d as useSession, j as CLIENT_PORTAL, l as accountFor, u as portalAccount } from "./router-Bty-v5RX.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/login-page-CZP9wicP.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var DEMOS = [
	{
		email: "demo@admin.carterscare.com",
		label: "Admin",
		desc: "Full platform access",
		cls: "demo-admin",
		Icon: Shield
	},
	{
		email: "demo@manager.carterscare.com",
		label: "Manager",
		desc: "Team management",
		cls: "demo-manager",
		Icon: Users
	},
	{
		email: "demo@worker.carterscare.com",
		label: "Support Worker",
		desc: "Care delivery",
		cls: "demo-worker",
		Icon: CircleUser
	},
	{
		email: "demo@client.carterscare.com",
		label: "Client",
		desc: "Client portal",
		cls: "demo-client",
		Icon: Heart
	}
];
function sessionFromAccount(acc) {
	return {
		email: acc.email,
		name: acc.name,
		role: acc.role,
		staffId: "staffId" in acc ? acc.staffId : void 0,
		clientId: "clientId" in acc ? acc.clientId : void 0
	};
}
function LoginPage() {
	const { login, ready } = useSession();
	const [tab, setTab] = (0, import_react.useState)("staff");
	const [email, setEmail] = (0, import_react.useState)("");
	const [password, setPassword] = (0, import_react.useState)("");
	const [showPw, setShowPw] = (0, import_react.useState)(false);
	const [username, setUsername] = (0, import_react.useState)("");
	const [accessCode, setAccessCode] = (0, import_react.useState)("");
	const [error, setError] = (0, import_react.useState)("");
	const [fieldErr, setFieldErr] = (0, import_react.useState)("");
	if (!ready) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "login-wash grid min-h-svh place-items-center p-6",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm text-muted",
			children: "Loading…"
		})
	});
	const enter = (s) => {
		setError("");
		login(s);
	};
	const submitStaff = (e) => {
		e.preventDefault();
		if (!email.trim()) {
			setFieldErr("Email is required");
			return;
		}
		if (password.length < 6) {
			setFieldErr("Min 6 characters");
			return;
		}
		const acc = accountFor(email);
		if (!acc || password !== "Demo1234") {
			setError("Use a demo account and Demo1234.");
			return;
		}
		enter(sessionFromAccount(acc));
	};
	const submitClient = (e) => {
		e.preventDefault();
		if (!username.trim()) {
			setFieldErr("Username is required");
			return;
		}
		if (!/^\d{6}$/.test(accessCode.trim())) {
			setFieldErr("Must be 6 digits");
			return;
		}
		const acc = portalAccount(username, accessCode);
		if (!acc) {
			setError("Invalid username or access code.");
			return;
		}
		enter(sessionFromAccount(acc));
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "login-wash flex h-svh min-h-0 overflow-hidden",
		"data-testid": "login-page",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "relative hidden overflow-hidden lg:flex lg:w-1/2 lg:flex-col lg:items-center lg:justify-center lg:p-12",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "hero-blob-purple absolute -top-20 -left-20 size-72 rounded-full opacity-20" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "hero-blob-blue absolute -right-20 -bottom-20 size-96 rounded-full opacity-15" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "hero-blob-green absolute top-1/2 left-1/3 size-48 rounded-full opacity-10" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative z-10 max-w-lg",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mb-8 flex items-center gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: "/brand/mark.svg?v=4",
								alt: "",
								className: "h-20 w-20"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-4xl leading-none font-black tracking-tight text-fg",
								children: ["Carters", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-primary",
									children: "Care"
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
							className: "text-4xl leading-tight font-black tracking-tight text-fg",
							children: ["More room for care", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-primary",
								children: "."
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 text-lg font-semibold text-muted",
							children: "Care management, connected."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 max-w-md leading-relaxed text-muted",
							children: "Rostering, compliance, incidents and timesheets for NDIS and aged care — one connected floor."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-8 flex flex-wrap gap-2",
							children: [
								"Rostering",
								"Compliance",
								"Case Notes",
								"Timesheets",
								"Incidents",
								"Reports"
							].map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "rounded-full border border-border/80 bg-surface/80 px-3 py-1.5 text-xs font-semibold text-muted shadow-(--shadow-card)",
								children: f
							}, f))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-8 text-xs font-semibold tracking-wide text-subtle",
							children: "A Carters Care Group platform"
						})
					]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "flex min-h-0 flex-1 justify-center overflow-y-auto p-4 py-8 sm:p-6",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "w-full max-w-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-6 flex items-center justify-center gap-2 lg:hidden",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: "/brand/mark.svg?v=4",
						alt: "",
						className: "h-12 w-12"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-2xl leading-none font-black tracking-tight text-fg",
						children: ["Carters", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-primary",
							children: "Care"
						})]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "overflow-hidden rounded-xl border border-surface/80 bg-surface shadow-(--shadow-elevated)",
					"data-testid": "login-card",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "brand-bar h-2" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex border-b border-border",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => {
									setTab("staff");
									setError("");
									setFieldErr("");
								},
								className: `flex flex-1 items-center justify-center gap-2 py-3.5 text-sm font-semibold ${tab === "staff" ? "border-b-2 border-primary bg-primary-soft/40 text-primary" : "text-muted"}`,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shield, { size: 16 }), "Staff Login"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => {
									setTab("client");
									setError("");
									setFieldErr("");
								},
								className: `flex flex-1 items-center justify-center gap-2 py-3.5 text-sm font-semibold ${tab === "client" ? "border-b-2 border-portal bg-portal-soft text-portal" : "text-muted"}`,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, { size: 16 }), "Client Portal"]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "p-6 sm:p-8",
							children: tab === "staff" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mb-5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
										className: "text-2xl font-bold",
										children: "Welcome back"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-1 text-sm text-muted",
										children: "Choose a desk to enter the floor"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "grid grid-cols-2 gap-2",
									children: DEMOS.map((demo) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										type: "button",
										onClick: () => {
											const acc = accountFor(demo.email);
											if (acc) enter(sessionFromAccount(acc));
										},
										className: `${demo.cls} rounded-md p-3 text-left text-primary-fg transition-opacity duration-150 hover:opacity-90`,
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(demo.Icon, {
												size: 20,
												className: "mb-1.5"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-xs font-bold",
												children: demo.label
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-[10px] opacity-80",
												children: demo.desc
											})
										]
									}, demo.email))
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mt-3 text-center text-xs text-subtle",
									children: ["Password for every desk is ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-mono font-bold text-primary",
										children: DEMO_PASSWORD
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
									onSubmit: submitStaff,
									className: "mt-6 space-y-4 border-t border-border pt-5",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
											className: "block",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "mb-2 block text-xs font-semibold tracking-wide text-muted uppercase",
												children: "Email"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "relative block",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, {
													size: 16,
													className: "absolute top-1/2 left-3.5 -translate-y-1/2 text-subtle"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
													type: "email",
													value: email,
													onChange: (e) => setEmail(e.target.value),
													placeholder: "you@example.com",
													autoComplete: "email",
													className: "h-11 w-full rounded-md border border-border bg-bg pr-4 pl-10 text-sm outline-none focus:ring-2 focus:ring-primary/30"
												})]
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
											className: "block",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "mb-2 block text-xs font-semibold tracking-wide text-muted uppercase",
												children: "Password"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "relative block",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, {
														size: 16,
														className: "absolute top-1/2 left-3.5 -translate-y-1/2 text-subtle"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
														type: showPw ? "text" : "password",
														value: password,
														onChange: (e) => setPassword(e.target.value),
														placeholder: "••••••••",
														autoComplete: "current-password",
														className: "h-11 w-full rounded-md border border-border bg-bg pr-10 pl-10 text-sm outline-none focus:ring-2 focus:ring-primary/30"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
														type: "button",
														onClick: () => setShowPw((v) => !v),
														className: "absolute top-1/2 right-3 -translate-y-1/2 text-subtle",
														"aria-label": showPw ? "Hide password" : "Show password",
														children: showPw ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EyeOff, { size: 16 }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { size: 16 })
													})
												]
											})]
										}),
										fieldErr ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "flex items-center gap-1 text-xs text-bad",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, { size: 12 }), fieldErr]
										}) : null,
										error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-sm text-bad",
											children: error
										}) : null,
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "submit",
											className: "btn-staff mt-2 flex h-11 w-full items-center justify-center rounded-md text-sm font-bold text-primary-fg shadow-(--shadow-card) transition-opacity duration-150 hover:opacity-90",
											children: "Sign In"
										})
									]
								})
							] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mb-5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
										className: "text-2xl font-bold",
										children: "Client Portal"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-1 text-sm text-muted",
										children: "Bob’s care schedule, notes and requests"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									onClick: () => {
										const acc = portalAccount(CLIENT_PORTAL.username, CLIENT_PORTAL.accessCode);
										if (acc) enter(sessionFromAccount(acc));
									},
									className: "demo-client flex w-full items-center gap-3 rounded-md p-4 text-left text-primary-fg",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, { size: 22 }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "block text-sm font-bold",
										children: "Enter as Bob"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "block text-[11px] opacity-80",
										children: [
											CLIENT_PORTAL.username,
											" · ",
											CLIENT_PORTAL.accessCode
										]
									})] })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
									onSubmit: submitClient,
									className: "mt-6 space-y-4 border-t border-border pt-5",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
											className: "block",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "mb-2 block text-xs font-semibold tracking-wide text-muted uppercase",
												children: "Username"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "relative block",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, {
													size: 16,
													className: "absolute top-1/2 left-3.5 -translate-y-1/2 text-subtle"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
													value: username,
													onChange: (e) => setUsername(e.target.value),
													placeholder: "firstname.lastname",
													autoComplete: "username",
													className: "h-11 w-full rounded-md border border-border bg-bg pr-4 pl-10 text-sm outline-none focus:ring-2 focus:ring-portal/30"
												})]
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
											className: "block",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "mb-2 block text-xs font-semibold tracking-wide text-muted uppercase",
												children: "Access Code"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "relative block",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Hash, {
													size: 16,
													className: "absolute top-1/2 left-3.5 -translate-y-1/2 text-subtle"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
													value: accessCode,
													onChange: (e) => setAccessCode(e.target.value.replace(/\D/g, "").slice(0, 6)),
													placeholder: "6-digit code",
													inputMode: "numeric",
													maxLength: 6,
													autoComplete: "one-time-code",
													className: "h-11 w-full rounded-md border border-border bg-bg pr-4 pl-10 font-mono text-sm tracking-widest outline-none focus:ring-2 focus:ring-portal/30"
												})]
											})]
										}),
										fieldErr ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "flex items-center gap-1 text-xs text-bad",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, { size: 12 }), fieldErr]
										}) : null,
										error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-sm text-bad",
											children: error
										}) : null,
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "submit",
											className: "btn-portal mt-2 flex h-11 w-full items-center justify-center rounded-md text-sm font-bold text-portal-fg shadow-(--shadow-card) transition-opacity duration-150 hover:opacity-90",
											children: "Access My Portal"
										})
									]
								})
							] })
						})
					]
				})]
			})
		})]
	});
}
//#endregion
export { LoginPage as t };
