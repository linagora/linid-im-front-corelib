import * as e from "vue";
import { Fragment as t, Text as n, computed as r, createBlock as i, createCommentVNode as a, createElementBlock as o, createVNode as s, defineAsyncComponent as c, defineComponent as l, effectScope as u, getCurrentInstance as d, getCurrentScope as f, hasInjectionContext as p, inject as m, isReactive as h, isRef as g, markRaw as _, mergeProps as v, nextTick as y, onMounted as b, onScopeDispose as x, onUnmounted as S, openBlock as C, reactive as w, ref as T, renderList as E, renderSlot as D, resolveDynamicComponent as O, shallowRef as k, toRaw as A, toRef as j, toRefs as M, unref as N, watch as P } from "vue";
import { getInstance as F, registerRemotes as ee } from "@module-federation/enhanced/runtime";
//#region \0rolldown/runtime.js
var te = Object.create, I = Object.defineProperty, ne = Object.getOwnPropertyDescriptor, re = Object.getOwnPropertyNames, ie = Object.getPrototypeOf, ae = Object.prototype.hasOwnProperty, oe = (e, t) => () => (t || (e((t = { exports: {} }).exports, t), e = null), t.exports), L = (e, t) => {
	let n = {};
	for (var r in e) I(n, r, {
		get: e[r],
		enumerable: !0
	});
	return t || I(n, Symbol.toStringTag, { value: "Module" }), n;
}, se = (e, t, n, r) => {
	if (t && typeof t == "object" || typeof t == "function") for (var i = re(t), a = 0, o = i.length, s; a < o; a++) s = i[a], !ae.call(e, s) && s !== n && I(e, s, {
		get: ((e) => t[e]).bind(null, s),
		enumerable: !(r = ne(t, s)) || r.enumerable
	});
	return e;
}, ce = (e, t, n) => (n = e == null ? {} : te(ie(e)), se(t || !e || !e.__esModule ? I(n, "default", {
	value: e,
	enumerable: !0
}) : n, e)), le = null;
function ue(e) {
	if (le !== null) {
		console.warn("[LinID CoreLib] Module Federation has already been initialized. Re-initialization is ignored.");
		return;
	}
	le = e;
}
function de() {
	if (le === null) throw Error("[LinID CoreLib] Module Federation is not initialized. Call setModuleFederation() first.");
	return le;
}
var fe = (e) => c(() => de().loadRemote(e).then((t) => {
	if (!t?.default) throw Error(`Failed to load component from ${e}`);
	return t.default;
})), pe = {};
function me(e, t) {
	pe[e] = _(t);
}
function he(e) {
	Object.entries(e).forEach(([e, t]) => me(e, t));
}
function ge(e) {
	return pe[e] || (console.warn(`[LinID CoreLib] Local component "${e}" is not registered, falling back to global resolution. Registered components: ${Object.keys(pe).join(", ")}.`), e);
}
//#endregion
//#region node_modules/.pnpm/pinia@3.0.4_typescript@6.0.3_vue@3.5.39_typescript@6.0.3_/node_modules/pinia/dist/pinia.mjs
var _e = typeof window < "u", ve, ye = (e) => ve = e;
process.env.NODE_ENV;
var be = process.env.NODE_ENV === "production" ? Symbol() : Symbol("pinia");
function xe(e) {
	return e && typeof e == "object" && Object.prototype.toString.call(e) === "[object Object]" && typeof e.toJSON != "function";
}
var Se;
(function(e) {
	e.direct = "direct", e.patchObject = "patch object", e.patchFunction = "patch function";
})(Se ||= {});
var Ce = typeof window == "object" && window.window === window ? window : typeof self == "object" && self.self === self ? self : typeof global == "object" && global.global === global ? global : typeof globalThis == "object" ? globalThis : { HTMLElement: null };
function R(e, { autoBom: t = !1 } = {}) {
	return t && /^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(e.type) ? new Blob(["﻿", e], { type: e.type }) : e;
}
function we(e, t, n) {
	let r = new XMLHttpRequest();
	r.open("GET", e), r.responseType = "blob", r.onload = function() {
		ke(r.response, t, n);
	}, r.onerror = function() {
		console.error("could not download file");
	}, r.send();
}
function Te(e) {
	let t = new XMLHttpRequest();
	t.open("HEAD", e, !1);
	try {
		t.send();
	} catch {}
	return t.status >= 200 && t.status <= 299;
}
function Ee(e) {
	try {
		e.dispatchEvent(new MouseEvent("click"));
	} catch {
		let t = new MouseEvent("click", {
			bubbles: !0,
			cancelable: !0,
			view: window,
			detail: 0,
			screenX: 80,
			screenY: 20,
			clientX: 80,
			clientY: 20,
			ctrlKey: !1,
			altKey: !1,
			shiftKey: !1,
			metaKey: !1,
			button: 0,
			relatedTarget: null
		});
		e.dispatchEvent(t);
	}
}
var De = typeof navigator == "object" ? navigator : { userAgent: "" }, Oe = /Macintosh/.test(De.userAgent) && /AppleWebKit/.test(De.userAgent) && !/Safari/.test(De.userAgent), ke = _e ? typeof HTMLAnchorElement < "u" && "download" in HTMLAnchorElement.prototype && !Oe ? Ae : "msSaveOrOpenBlob" in De ? je : Me : () => {};
function Ae(e, t = "download", n) {
	let r = document.createElement("a");
	r.download = t, r.rel = "noopener", typeof e == "string" ? (r.href = e, r.origin === location.origin ? Ee(r) : Te(r.href) ? we(e, t, n) : (r.target = "_blank", Ee(r))) : (r.href = URL.createObjectURL(e), setTimeout(function() {
		URL.revokeObjectURL(r.href);
	}, 4e4), setTimeout(function() {
		Ee(r);
	}, 0));
}
function je(e, t = "download", n) {
	if (typeof e == "string") if (Te(e)) we(e, t, n);
	else {
		let t = document.createElement("a");
		t.href = e, t.target = "_blank", setTimeout(function() {
			Ee(t);
		});
	}
	else navigator.msSaveOrOpenBlob(R(e, n), t);
}
function Me(e, t, n, r) {
	if (r ||= open("", "_blank"), r && (r.document.title = r.document.body.innerText = "downloading..."), typeof e == "string") return we(e, t, n);
	let i = e.type === "application/octet-stream", a = /constructor/i.test(String(Ce.HTMLElement)) || "safari" in Ce, o = /CriOS\/[\d]+/.test(navigator.userAgent);
	if ((o || i && a || Oe) && typeof FileReader < "u") {
		let t = new FileReader();
		t.onloadend = function() {
			let e = t.result;
			if (typeof e != "string") throw r = null, Error("Wrong reader.result type");
			e = o ? e : e.replace(/^data:[^;]*;/, "data:attachment/file;"), r ? r.location.href = e : location.assign(e), r = null;
		}, t.readAsDataURL(e);
	} else {
		let t = URL.createObjectURL(e);
		r ? r.location.assign(t) : location.href = t, r = null, setTimeout(function() {
			URL.revokeObjectURL(t);
		}, 4e4);
	}
}
var { assign: Ne } = Object;
function Pe(e, t) {
	for (let n in t) {
		let r = t[n];
		if (!(n in e)) continue;
		let i = e[n];
		xe(i) && xe(r) && !g(r) && !h(r) ? e[n] = Pe(i, r) : e[n] = r;
	}
	return e;
}
var Fe = () => {};
function Ie(e, t, n, r = Fe) {
	e.add(t);
	let i = () => {
		e.delete(t) && r();
	};
	return !n && f() && x(i), i;
}
function Le(e, ...t) {
	e.forEach((e) => {
		e(...t);
	});
}
var Re = (e) => e(), ze = Symbol(), Be = Symbol();
function Ve(e, t) {
	e instanceof Map && t instanceof Map ? t.forEach((t, n) => e.set(n, t)) : e instanceof Set && t instanceof Set && t.forEach(e.add, e);
	for (let n in t) {
		if (!t.hasOwnProperty(n)) continue;
		let r = t[n], i = e[n];
		xe(i) && xe(r) && e.hasOwnProperty(n) && !g(r) && !h(r) ? e[n] = Ve(i, r) : e[n] = r;
	}
	return e;
}
var He = process.env.NODE_ENV === "production" ? Symbol() : Symbol("pinia:skipHydration");
function Ue(e) {
	return !xe(e) || !Object.prototype.hasOwnProperty.call(e, He);
}
var { assign: We } = Object;
function Ge(e) {
	return !!(g(e) && e.effect);
}
function Ke(e, t, n, i) {
	let { state: a, actions: o, getters: s } = t, c = n.state.value[e], l;
	function u() {
		!c && (process.env.NODE_ENV === "production" || !i) && (n.state.value[e] = a ? a() : {});
		let t = process.env.NODE_ENV !== "production" && i ? M(T(a ? a() : {}).value) : M(n.state.value[e]);
		return We(t, o, Object.keys(s || {}).reduce((i, a) => (process.env.NODE_ENV !== "production" && a in t && console.warn(`[🍍]: A getter cannot have the same name as another state property. Rename one of them. Found with "${a}" in store "${e}".`), i[a] = _(r(() => {
			ye(n);
			let t = n._s.get(e);
			return s[a].call(t, t);
		})), i), {}));
	}
	return l = qe(e, u, t, n, i, !0), l;
}
function qe(e, t, n = {}, i, a, o) {
	let s, c = We({ actions: {} }, n);
	/* istanbul ignore if */
	if (process.env.NODE_ENV !== "production" && !i._e.active) throw Error("Pinia destroyed");
	let l = { deep: !0 };
	/* istanbul ignore else */
	process.env.NODE_ENV !== "production" && (l.onTrigger = (e) => {
		/* istanbul ignore else */
		d ? v = e : d == 0 && !N._hotUpdating && (Array.isArray(v) ? v.push(e) : console.error("🍍 debuggerEvents should be an array. This is most likely an internal Pinia bug."));
	});
	let d, f, p = /* @__PURE__ */ new Set(), m = /* @__PURE__ */ new Set(), v, b = i.state.value[e];
	!o && !b && (process.env.NODE_ENV === "production" || !a) && (i.state.value[e] = {});
	let x = T({}), S;
	function C(t) {
		let n;
		d = f = !1, process.env.NODE_ENV !== "production" && (v = []), typeof t == "function" ? (t(i.state.value[e]), n = {
			type: Se.patchFunction,
			storeId: e,
			events: v
		}) : (Ve(i.state.value[e], t), n = {
			type: Se.patchObject,
			payload: t,
			storeId: e,
			events: v
		});
		let r = S = Symbol();
		y().then(() => {
			S === r && (d = !0);
		}), f = !0, Le(p, n, i.state.value[e]);
	}
	let E = o ? function() {
		let { state: e } = n, t = e ? e() : {};
		this.$patch((e) => {
			We(e, t);
		});
	} : process.env.NODE_ENV === "production" ? Fe : () => {
		throw Error(`🍍: Store "${e}" is built using the setup syntax and does not implement $reset().`);
	};
	function D() {
		s.stop(), p.clear(), m.clear(), i._s.delete(e);
	}
	let O = (t, n = "") => {
		if (ze in t) return t[Be] = n, t;
		let r = function() {
			ye(i);
			let n = Array.from(arguments), a = /* @__PURE__ */ new Set(), o = /* @__PURE__ */ new Set();
			function s(e) {
				a.add(e);
			}
			function c(e) {
				o.add(e);
			}
			Le(m, {
				args: n,
				name: r[Be],
				store: N,
				after: s,
				onError: c
			});
			let l;
			try {
				l = t.apply(this && this.$id === e ? this : N, n);
			} catch (e) {
				throw Le(o, e), e;
			}
			return l instanceof Promise ? l.then((e) => (Le(a, e), e)).catch((e) => (Le(o, e), Promise.reject(e))) : (Le(a, l), l);
		};
		return r[ze] = !0, r[Be] = n, r;
	}, k = /*#__PURE__*/ _({
		actions: {},
		getters: {},
		state: [],
		hotState: x
	}), M = {
		_p: i,
		$id: e,
		$onAction: Ie.bind(null, m),
		$patch: C,
		$reset: E,
		$subscribe(t, n = {}) {
			let r = Ie(p, t, n.detached, () => a()), a = s.run(() => P(() => i.state.value[e], (r) => {
				(n.flush === "sync" ? f : d) && t({
					storeId: e,
					type: Se.direct,
					events: v
				}, r);
			}, We({}, l, n)));
			return r;
		},
		$dispose: D
	}, N = w(process.env.NODE_ENV !== "production" || process.env.NODE_ENV !== "production" && process.env.NODE_ENV !== "test" && _e ? We({
		_hmrPayload: k,
		_customProperties: _(/* @__PURE__ */ new Set())
	}, M) : M);
	i._s.set(e, N);
	let F = (i._a && i._a.runWithContext || Re)(() => i._e.run(() => (s = u()).run(() => t({ action: O }))));
	for (let t in F) {
		let r = F[t];
		g(r) && !Ge(r) || h(r) ? (process.env.NODE_ENV !== "production" && a ? x.value[t] = j(F, t) : o || (b && Ue(r) && (g(r) ? r.value = b[t] : Ve(r, b[t])), i.state.value[e][t] = r), process.env.NODE_ENV !== "production" && k.state.push(t)) : typeof r == "function" ? (F[t] = process.env.NODE_ENV !== "production" && a ? r : O(r, t), process.env.NODE_ENV !== "production" && (k.actions[t] = r), c.actions[t] = r) : process.env.NODE_ENV !== "production" && Ge(r) && (k.getters[t] = o ? n.getters[t] : r, _e && (F._getters ||= _([])).push(t));
	}
	if (We(N, F), We(A(N), F), Object.defineProperty(N, "$state", {
		get: () => process.env.NODE_ENV !== "production" && a ? x.value : i.state.value[e],
		set: (e) => {
			/* istanbul ignore if */
			if (process.env.NODE_ENV !== "production" && a) throw Error("cannot set hotState");
			C((t) => {
				We(t, e);
			});
		}
	}), process.env.NODE_ENV !== "production" && (N._hotUpdate = _((t) => {
		N._hotUpdating = !0, t._hmrPayload.state.forEach((e) => {
			if (e in N.$state) {
				let n = t.$state[e], r = N.$state[e];
				typeof n == "object" && xe(n) && xe(r) ? Pe(n, r) : t.$state[e] = r;
			}
			N[e] = j(t.$state, e);
		}), Object.keys(N.$state).forEach((e) => {
			e in t.$state || delete N[e];
		}), d = !1, f = !1, i.state.value[e] = j(t._hmrPayload, "hotState"), f = !0, y().then(() => {
			d = !0;
		});
		for (let e in t._hmrPayload.actions) {
			let n = t[e];
			N[e] = O(n, e);
		}
		for (let e in t._hmrPayload.getters) {
			let n = t._hmrPayload.getters[e], a = o ? r(() => (ye(i), n.call(N, N))) : n;
			N[e] = a;
		}
		Object.keys(N._hmrPayload.getters).forEach((e) => {
			e in t._hmrPayload.getters || delete N[e];
		}), Object.keys(N._hmrPayload.actions).forEach((e) => {
			e in t._hmrPayload.actions || delete N[e];
		}), N._hmrPayload = t._hmrPayload, N._getters = t._getters, N._hotUpdating = !1;
	})), process.env.NODE_ENV !== "production" && process.env.NODE_ENV !== "test" && _e) {
		let e = {
			writable: !0,
			configurable: !0,
			enumerable: !1
		};
		[
			"_p",
			"_hmrPayload",
			"_getters",
			"_customProperties"
		].forEach((t) => {
			Object.defineProperty(N, t, We({ value: N[t] }, e));
		});
	}
	return i._p.forEach((e) => {
		/* istanbul ignore else */
		if (process.env.NODE_ENV !== "production" && process.env.NODE_ENV !== "test" && _e) {
			let t = s.run(() => e({
				store: N,
				app: i._a,
				pinia: i,
				options: c
			}));
			Object.keys(t || {}).forEach((e) => N._customProperties.add(e)), We(N, t);
		} else We(N, s.run(() => e({
			store: N,
			app: i._a,
			pinia: i,
			options: c
		})));
	}), process.env.NODE_ENV !== "production" && N.$state && typeof N.$state == "object" && typeof N.$state.constructor == "function" && !N.$state.constructor.toString().includes("[native code]") && console.warn(`[🍍]: The "state" must be a plain object. It cannot be
	state: () => new MyClass()
Found in store "${N.$id}".`), b && o && n.hydrate && n.hydrate(N.$state, b), d = !0, f = !0, N;
}
function Je(e, t, n) {
	let r, i = typeof t == "function";
	r = i ? n : t;
	function a(n, o) {
		let s = p();
		if (n = (process.env.NODE_ENV === "test" && ve && ve._testing ? null : n) || (s ? m(be, null) : null), n && ye(n), process.env.NODE_ENV !== "production" && !ve) throw Error("[🍍]: \"getActivePinia()\" was called but there was no active Pinia. Are you trying to use a store before calling \"app.use(pinia)\"?\nSee https://pinia.vuejs.org/core-concepts/outside-component-usage.html for help.\nThis will fail in production.");
		n = ve, n._s.has(e) || (i ? qe(e, t, r, n) : Ke(e, r, n), process.env.NODE_ENV !== "production" && (a._pinia = n));
		let c = n._s.get(e);
		if (process.env.NODE_ENV !== "production" && o) {
			let a = "__hot:" + e, s = i ? qe(a, t, r, n, !0) : Ke(a, We({}, r), n, !0);
			o._hotUpdate(s), delete n.state.value[a], n._s.delete(a);
		}
		if (process.env.NODE_ENV !== "production" && _e) {
			let t = d();
			if (t && t.proxy && !o) {
				let n = t.proxy, r = "_pStores" in n ? n._pStores : n._pStores = {};
				r[e] = c;
			}
		}
		return c;
	}
	return a.$id = e, a;
}
//#endregion
//#region src/services/piniaStoreService.ts
var Ye = null;
function Xe(e) {
	if (Ye !== null) {
		console.warn("[LinID CoreLib] Pinia store has already been initialized. Re-initialization is ignored.");
		return;
	}
	Ye = e;
}
function Ze() {
	if (Ye === null) throw Error("[LinID CoreLib] Pinia store is not initialized. Call setPiniaStore() first.");
	return Ye;
}
//#endregion
//#region src/stores/linidZoneStore.ts
var Qe = () => $e(Ze()), $e = Je("linidZoneStore", {
	state: () => ({ zones: {} }),
	getters: { hasZoneEntries: (e) => (t) => (e.zones[t]?.length ?? 0) > 0 },
	actions: {
		appendEntry(e, t) {
			this.zones[e] || (this.zones[e] = []), this.zones[e].push(t);
		},
		registerPlugin(e, t, n) {
			this.appendEntry(e, {
				type: "federated",
				plugin: t,
				props: n
			});
		},
		registerPluginOnce(e, t, n) {
			this.zones[e]?.some((e) => e.type === "federated" && e.plugin === t) || this.registerPlugin(e, t, n);
		},
		registerComponent(e, t, n) {
			this.appendEntry(e, {
				type: "component",
				component: t,
				props: n
			});
		}
	}
}), et = /* @__PURE__ */ l({
	inheritAttrs: !1,
	__name: "LinidZoneRenderer",
	props: { zone: {} },
	setup(e) {
		let n = e, r = (Qe().zones[n.zone] || []).map((e) => ({
			props: e.props,
			component: e.type === "federated" ? fe(e.plugin) : ge(e.component)
		}));
		return (e, n) => (C(), o(t, null, [(C(!0), o(t, null, E(N(r), (t, n) => (C(), i(O(t.component), v({ key: n }, { ref_for: !0 }, {
			...e.$attrs,
			...t.props
		}), null, 16))), 128)), N(r).length === 0 ? D(e.$slots, "default", { key: 0 }) : a("", !0)], 64));
	}
}), tt = /* @__PURE__ */ oe(((e, t) => {
	(function(n, r) {
		typeof e == "object" && t !== void 0 ? t.exports = r() : typeof define == "function" && define.amd ? define(r) : (n = typeof globalThis < "u" ? globalThis : n || self).dayjs = r();
	})(e, (function() {
		var e = 1e3, t = 6e4, n = 36e5, r = "millisecond", i = "second", a = "minute", o = "hour", s = "day", c = "week", l = "month", u = "quarter", d = "year", f = "date", p = "Invalid Date", m = /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/, h = /\[([^\]]+)]|YYYY|YY|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g, g = {
			name: "en",
			weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),
			months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"),
			ordinal: function(e) {
				var t = [
					"th",
					"st",
					"nd",
					"rd"
				], n = e % 100;
				return "[" + e + (t[(n - 20) % 10] || t[n] || t[0]) + "]";
			}
		}, _ = function(e, t, n) {
			var r = String(e);
			return !r || r.length >= t ? e : "" + Array(t + 1 - r.length).join(n) + e;
		}, v = {
			s: _,
			z: function(e) {
				var t = -e.utcOffset(), n = Math.abs(t), r = Math.floor(n / 60), i = n % 60;
				return (t <= 0 ? "+" : "-") + _(r, 2, "0") + ":" + _(i, 2, "0");
			},
			m: function e(t, n) {
				if (t.date() < n.date()) return -e(n, t);
				var r = 12 * (n.year() - t.year()) + (n.month() - t.month()), i = t.clone().add(r, l), a = n - i < 0, o = t.clone().add(r + (a ? -1 : 1), l);
				return +(-(r + (n - i) / (a ? i - o : o - i)) || 0);
			},
			a: function(e) {
				return e < 0 ? Math.ceil(e) || 0 : Math.floor(e);
			},
			p: function(e) {
				return {
					M: l,
					y: d,
					w: c,
					d: s,
					D: f,
					h: o,
					m: a,
					s: i,
					ms: r,
					Q: u
				}[e] || String(e || "").toLowerCase().replace(/s$/, "");
			},
			u: function(e) {
				return e === void 0;
			}
		}, y = "en", b = {};
		b[y] = g;
		var x = "$isDayjsObject", S = function(e) {
			return e instanceof E || !(!e || !e[x]);
		}, C = function e(t, n, r) {
			var i;
			if (!t) return y;
			if (typeof t == "string") {
				var a = t.toLowerCase();
				b[a] && (i = a), n && (b[a] = n, i = a);
				var o = t.split("-");
				if (!i && o.length > 1) return e(o[0]);
			} else {
				var s = t.name;
				b[s] = t, i = s;
			}
			return !r && i && (y = i), i || !r && y;
		}, w = function(e, t) {
			if (S(e)) return e.clone();
			var n = typeof t == "object" ? t : {};
			return n.date = e, n.args = arguments, new E(n);
		}, T = v;
		T.l = C, T.i = S, T.w = function(e, t) {
			return w(e, {
				locale: t.$L,
				utc: t.$u,
				x: t.$x,
				$offset: t.$offset
			});
		};
		var E = function() {
			function g(e) {
				this.$L = C(e.locale, null, !0), this.parse(e), this.$x = this.$x || e.x || {}, this[x] = !0;
			}
			var _ = g.prototype;
			return _.parse = function(e) {
				this.$d = function(e) {
					var t = e.date, n = e.utc;
					if (t === null) return /* @__PURE__ */ new Date(NaN);
					if (T.u(t)) return /* @__PURE__ */ new Date();
					if (t instanceof Date) return new Date(t);
					if (typeof t == "string" && !/Z$/i.test(t)) {
						var r = t.match(m);
						if (r) {
							var i = r[2] - 1 || 0, a = (r[7] || "0").substring(0, 3);
							return n ? new Date(Date.UTC(r[1], i, r[3] || 1, r[4] || 0, r[5] || 0, r[6] || 0, a)) : new Date(r[1], i, r[3] || 1, r[4] || 0, r[5] || 0, r[6] || 0, a);
						}
					}
					return new Date(t);
				}(e), this.init();
			}, _.init = function() {
				var e = this.$d;
				this.$y = e.getFullYear(), this.$M = e.getMonth(), this.$D = e.getDate(), this.$W = e.getDay(), this.$H = e.getHours(), this.$m = e.getMinutes(), this.$s = e.getSeconds(), this.$ms = e.getMilliseconds();
			}, _.$utils = function() {
				return T;
			}, _.isValid = function() {
				return this.$d.toString() !== p;
			}, _.isSame = function(e, t) {
				var n = w(e);
				return this.startOf(t) <= n && n <= this.endOf(t);
			}, _.isAfter = function(e, t) {
				return w(e) < this.startOf(t);
			}, _.isBefore = function(e, t) {
				return this.endOf(t) < w(e);
			}, _.$g = function(e, t, n) {
				return T.u(e) ? this[t] : this.set(n, e);
			}, _.unix = function() {
				return Math.floor(this.valueOf() / 1e3);
			}, _.valueOf = function() {
				return this.$d.getTime();
			}, _.startOf = function(e, t) {
				var n = this, r = !!T.u(t) || t, u = T.p(e), p = function(e, t) {
					var i = T.w(n.$u ? Date.UTC(n.$y, t, e) : new Date(n.$y, t, e), n);
					return r ? i : i.endOf(s);
				}, m = function(e, t) {
					return T.w(n.toDate()[e].apply(n.toDate("s"), (r ? [
						0,
						0,
						0,
						0
					] : [
						23,
						59,
						59,
						999
					]).slice(t)), n);
				}, h = this.$W, g = this.$M, _ = this.$D, v = "set" + (this.$u ? "UTC" : "");
				switch (u) {
					case d: return r ? p(1, 0) : p(31, 11);
					case l: return r ? p(1, g) : p(0, g + 1);
					case c:
						var y = this.$locale().weekStart || 0, b = (h < y ? h + 7 : h) - y;
						return p(r ? _ - b : _ + (6 - b), g);
					case s:
					case f: return m(v + "Hours", 0);
					case o: return m(v + "Minutes", 1);
					case a: return m(v + "Seconds", 2);
					case i: return m(v + "Milliseconds", 3);
					default: return this.clone();
				}
			}, _.endOf = function(e) {
				return this.startOf(e, !1);
			}, _.$set = function(e, t) {
				var n, c = T.p(e), u = "set" + (this.$u ? "UTC" : ""), p = (n = {}, n[s] = u + "Date", n[f] = u + "Date", n[l] = u + "Month", n[d] = u + "FullYear", n[o] = u + "Hours", n[a] = u + "Minutes", n[i] = u + "Seconds", n[r] = u + "Milliseconds", n)[c], m = c === s ? this.$D + (t - this.$W) : t;
				if (c === l || c === d) {
					var h = this.clone().set(f, 1);
					h.$d[p](m), h.init(), this.$d = h.set(f, Math.min(this.$D, h.daysInMonth())).$d;
				} else p && this.$d[p](m);
				return this.init(), this;
			}, _.set = function(e, t) {
				return this.clone().$set(e, t);
			}, _.get = function(e) {
				return this[T.p(e)]();
			}, _.add = function(r, u) {
				var f, p = this;
				r = Number(r);
				var m = T.p(u), h = function(e) {
					var t = w(p);
					return T.w(t.date(t.date() + Math.round(e * r)), p);
				};
				if (m === l) return this.set(l, this.$M + r);
				if (m === d) return this.set(d, this.$y + r);
				if (m === s) return h(1);
				if (m === c) return h(7);
				var g = (f = {}, f[a] = t, f[o] = n, f[i] = e, f)[m] || 1, _ = this.$d.getTime() + r * g;
				return T.w(_, this);
			}, _.subtract = function(e, t) {
				return this.add(-1 * e, t);
			}, _.format = function(e) {
				var t = this, n = this.$locale();
				if (!this.isValid()) return n.invalidDate || p;
				var r = e || "YYYY-MM-DDTHH:mm:ssZ", i = T.z(this), a = this.$H, o = this.$m, s = this.$M, c = n.weekdays, l = n.months, u = n.meridiem, d = function(e, n, i, a) {
					return e && (e[n] || e(t, r)) || i[n].slice(0, a);
				}, f = function(e) {
					return T.s(a % 12 || 12, e, "0");
				}, m = u || function(e, t, n) {
					var r = e < 12 ? "AM" : "PM";
					return n ? r.toLowerCase() : r;
				};
				return r.replace(h, (function(e, r) {
					return r || function(e) {
						switch (e) {
							case "YY": return String(t.$y).slice(-2);
							case "YYYY": return T.s(t.$y, 4, "0");
							case "M": return s + 1;
							case "MM": return T.s(s + 1, 2, "0");
							case "MMM": return d(n.monthsShort, s, l, 3);
							case "MMMM": return d(l, s);
							case "D": return t.$D;
							case "DD": return T.s(t.$D, 2, "0");
							case "d": return String(t.$W);
							case "dd": return d(n.weekdaysMin, t.$W, c, 2);
							case "ddd": return d(n.weekdaysShort, t.$W, c, 3);
							case "dddd": return c[t.$W];
							case "H": return String(a);
							case "HH": return T.s(a, 2, "0");
							case "h": return f(1);
							case "hh": return f(2);
							case "a": return m(a, o, !0);
							case "A": return m(a, o, !1);
							case "m": return String(o);
							case "mm": return T.s(o, 2, "0");
							case "s": return String(t.$s);
							case "ss": return T.s(t.$s, 2, "0");
							case "SSS": return T.s(t.$ms, 3, "0");
							case "Z": return i;
						}
						return null;
					}(e) || i.replace(":", "");
				}));
			}, _.utcOffset = function() {
				return 15 * -Math.round(this.$d.getTimezoneOffset() / 15);
			}, _.diff = function(r, f, p) {
				var m, h = this, g = T.p(f), _ = w(r), v = (_.utcOffset() - this.utcOffset()) * t, y = this - _, b = function() {
					return T.m(h, _);
				};
				switch (g) {
					case d:
						m = b() / 12;
						break;
					case l:
						m = b();
						break;
					case u:
						m = b() / 3;
						break;
					case c:
						m = (y - v) / 6048e5;
						break;
					case s:
						m = (y - v) / 864e5;
						break;
					case o:
						m = y / n;
						break;
					case a:
						m = y / t;
						break;
					case i:
						m = y / e;
						break;
					default: m = y;
				}
				return p ? m : T.a(m);
			}, _.daysInMonth = function() {
				return this.endOf(l).$D;
			}, _.$locale = function() {
				return b[this.$L];
			}, _.locale = function(e, t) {
				if (!e) return this.$L;
				var n = this.clone(), r = C(e, t, !0);
				return r && (n.$L = r), n;
			}, _.clone = function() {
				return T.w(this.$d, this);
			}, _.toDate = function() {
				return new Date(this.valueOf());
			}, _.toJSON = function() {
				return this.isValid() ? this.toISOString() : null;
			}, _.toISOString = function() {
				return this.$d.toISOString();
			}, _.toString = function() {
				return this.$d.toUTCString();
			}, g;
		}(), D = E.prototype;
		return w.prototype = D, [
			["$ms", r],
			["$s", i],
			["$m", a],
			["$H", o],
			["$W", s],
			["$M", l],
			["$y", d],
			["$D", f]
		].forEach((function(e) {
			D[e[1]] = function(t) {
				return this.$g(t, e[0], e[1]);
			};
		})), w.extend = function(e, t) {
			return e.$i ||= (e(t, E, w), !0), w;
		}, w.locale = C, w.isDayjs = S, w.unix = function(e) {
			return w(1e3 * e);
		}, w.en = b[y], w.Ls = b, w.p = {}, w;
	}));
})), nt = /* @__PURE__ */ oe(((e, t) => {
	(function(n, r) {
		typeof e == "object" && t !== void 0 ? t.exports = r() : typeof define == "function" && define.amd ? define(r) : (n = typeof globalThis < "u" ? globalThis : n || self).dayjs_plugin_customParseFormat = r();
	})(e, (function() {
		var e = {
			LTS: "h:mm:ss A",
			LT: "h:mm A",
			L: "MM/DD/YYYY",
			LL: "MMMM D, YYYY",
			LLL: "MMMM D, YYYY h:mm A",
			LLLL: "dddd, MMMM D, YYYY h:mm A"
		}, t = /(\[[^[]*\])|([-_:/.,()\s]+)|(A|a|Q|YYYY|YY?|ww?|MM?M?M?|Do|DD?|hh?|HH?|mm?|ss?|S{1,3}|z|ZZ?)/g, n = /\d/, r = /\d\d/, i = /\d\d?/, a = /\d*[^-_:/,()\s\d]+/, o = {}, s = function(e) {
			return (e = +e) + (e > 68 ? 1900 : 2e3);
		}, c = function(e) {
			return function(t) {
				this[e] = +t;
			};
		}, l = [/[+-]\d\d:?(\d\d)?|Z/, function(e) {
			(this.zone ||= {}).offset = function(e) {
				if (!e || e === "Z") return 0;
				var t = e.match(/([+-]|\d\d)/g), n = 60 * t[1] + (+t[2] || 0);
				return n === 0 ? 0 : t[0] === "+" ? -n : n;
			}(e);
		}], u = function(e) {
			var t = o[e];
			return t && (t.indexOf ? t : t.s.concat(t.f));
		}, d = function(e, t) {
			var n, r = o.meridiem;
			if (r) {
				for (var i = 1; i <= 24; i += 1) if (e.indexOf(r(i, 0, t)) > -1) {
					n = i > 12;
					break;
				}
			} else n = e === (t ? "pm" : "PM");
			return n;
		}, f = {
			A: [a, function(e) {
				this.afternoon = d(e, !1);
			}],
			a: [a, function(e) {
				this.afternoon = d(e, !0);
			}],
			Q: [n, function(e) {
				this.month = 3 * (e - 1) + 1;
			}],
			S: [n, function(e) {
				this.milliseconds = 100 * e;
			}],
			SS: [r, function(e) {
				this.milliseconds = 10 * e;
			}],
			SSS: [/\d{3}/, function(e) {
				this.milliseconds = +e;
			}],
			s: [i, c("seconds")],
			ss: [i, c("seconds")],
			m: [i, c("minutes")],
			mm: [i, c("minutes")],
			H: [i, c("hours")],
			h: [i, c("hours")],
			HH: [i, c("hours")],
			hh: [i, c("hours")],
			D: [i, c("day")],
			DD: [r, c("day")],
			Do: [a, function(e) {
				var t = o.ordinal, n = e.match(/\d+/);
				if (this.day = n[0], t) for (var r = 1; r <= 31; r += 1) t(r).replace(/\[|\]/g, "") === e && (this.day = r);
			}],
			w: [i, c("week")],
			ww: [r, c("week")],
			M: [i, c("month")],
			MM: [r, c("month")],
			MMM: [a, function(e) {
				var t = u("months"), n = (u("monthsShort") || t.map((function(e) {
					return e.slice(0, 3);
				}))).indexOf(e) + 1;
				if (n < 1) throw Error();
				this.month = n % 12 || n;
			}],
			MMMM: [a, function(e) {
				var t = u("months").indexOf(e) + 1;
				if (t < 1) throw Error();
				this.month = t % 12 || t;
			}],
			Y: [/[+-]?\d+/, c("year")],
			YY: [r, function(e) {
				this.year = s(e);
			}],
			YYYY: [/\d{4}/, c("year")],
			Z: l,
			ZZ: l
		};
		function p(n) {
			for (var r = n, i = o && o.formats, a = (n = r.replace(/(\[[^\]]+])|(LTS?|l{1,4}|L{1,4})/g, (function(t, n, r) {
				var a = r && r.toUpperCase();
				return n || i[r] || e[r] || i[a].replace(/(\[[^\]]+])|(MMMM|MM|DD|dddd)/g, (function(e, t, n) {
					return t || n.slice(1);
				}));
			}))).match(t), s = a.length, c = 0; c < s; c += 1) {
				var l = a[c], u = f[l], d = u && u[0], p = u && u[1];
				a[c] = p ? {
					regex: d,
					parser: p
				} : l.replace(/^\[|\]$/g, "");
			}
			return function(e) {
				for (var t = {}, n = 0, r = 0; n < s; n += 1) {
					var i = a[n];
					if (typeof i == "string") r += i.length;
					else {
						var o = i.regex, c = i.parser, l = e.slice(r), u = o.exec(l)[0];
						c.call(t, u), e = e.replace(u, "");
					}
				}
				return function(e) {
					var t = e.afternoon;
					if (t !== void 0) {
						var n = e.hours;
						t ? n < 12 && (e.hours += 12) : n === 12 && (e.hours = 0), delete e.afternoon;
					}
				}(t), t;
			};
		}
		return function(e, t, n) {
			n.p.customParseFormat = !0, e && e.parseTwoDigitYear && (s = e.parseTwoDigitYear);
			var r = t.prototype, i = r.parse;
			r.parse = function(e) {
				var t = e.date, r = e.utc, a = e.args;
				this.$u = r;
				var s = a[1];
				if (typeof s == "string") {
					var c = !0 === a[2], l = !0 === a[3], u = c || l, d = a[2];
					l && (d = a[2]), o = this.$locale(), !c && d && (o = n.Ls[d]), this.$d = function(e, t, n, r) {
						try {
							if (["x", "X"].indexOf(t) > -1) return /* @__PURE__ */ new Date((t === "X" ? 1e3 : 1) * e);
							var i = p(t)(e), a = i.year, o = i.month, s = i.day, c = i.hours, l = i.minutes, u = i.seconds, d = i.milliseconds, f = i.zone, m = i.week, h = /* @__PURE__ */ new Date(), g = s || (a || o ? 1 : h.getDate()), _ = a || h.getFullYear(), v = 0;
							a && !o || (v = o > 0 ? o - 1 : h.getMonth());
							var y, b = c || 0, x = l || 0, S = u || 0, C = d || 0;
							return f ? new Date(Date.UTC(_, v, g, b, x, S, C + 60 * f.offset * 1e3)) : n ? new Date(Date.UTC(_, v, g, b, x, S, C)) : (y = new Date(_, v, g, b, x, S, C), m && (y = r(y).week(m).toDate()), y);
						} catch {
							return /* @__PURE__ */ new Date("");
						}
					}(t, s, r, n), this.init(), d && !0 !== d && (this.$L = this.locale(d).$L), u && t != this.format(s) && (this.$d = /* @__PURE__ */ new Date("")), o = {};
				} else if (s instanceof Array) for (var f = s.length, m = 1; m <= f; m += 1) {
					a[1] = s[m - 1];
					var h = n.apply(this, a);
					if (h.isValid()) {
						this.$d = h.$d, this.$L = h.$L, this.init();
						break;
					}
					m === f && (this.$d = /* @__PURE__ */ new Date(""));
				}
				else i.call(this, e);
			};
		};
	}));
})), z = /* @__PURE__ */ oe(((e, t) => {
	(function(n, r) {
		typeof e == "object" && t !== void 0 ? t.exports = r() : typeof define == "function" && define.amd ? define(r) : (n = typeof globalThis < "u" ? globalThis : n || self).dayjs_plugin_utc = r();
	})(e, (function() {
		var e = "minute", t = /[+-]\d\d(?::?\d\d)?/g, n = /([+-]|\d\d)/g;
		return function(r, i, a) {
			var o = i.prototype;
			a.utc = function(e) {
				return new i({
					date: e,
					utc: !0,
					args: arguments
				});
			}, o.utc = function(t) {
				var n = a(this.toDate(), {
					locale: this.$L,
					utc: !0
				});
				return t ? n.add(this.utcOffset(), e) : n;
			}, o.local = function() {
				return a(this.toDate(), {
					locale: this.$L,
					utc: !1
				});
			};
			var s = o.parse;
			o.parse = function(e) {
				e.utc && (this.$u = !0), this.$utils().u(e.$offset) || (this.$offset = e.$offset), s.call(this, e);
			};
			var c = o.init;
			o.init = function() {
				if (this.$u) {
					var e = this.$d;
					this.$y = e.getUTCFullYear(), this.$M = e.getUTCMonth(), this.$D = e.getUTCDate(), this.$W = e.getUTCDay(), this.$H = e.getUTCHours(), this.$m = e.getUTCMinutes(), this.$s = e.getUTCSeconds(), this.$ms = e.getUTCMilliseconds();
				} else c.call(this);
			};
			var l = o.utcOffset;
			o.utcOffset = function(r, i) {
				var a = this.$utils().u;
				if (a(r)) return this.$u ? 0 : a(this.$offset) ? l.call(this) : this.$offset;
				if (typeof r == "string" && (r = function(e) {
					e === void 0 && (e = "");
					var r = e.match(t);
					if (!r) return null;
					var i = ("" + r[0]).match(n) || [
						"-",
						0,
						0
					], a = i[0], o = 60 * i[1] + +i[2];
					return o === 0 ? 0 : a === "+" ? o : -o;
				}(r), r === null)) return this;
				var o = Math.abs(r) <= 16 ? 60 * r : r;
				if (o === 0) return this.utc(i);
				var s = this.clone();
				if (i) return s.$offset = o, s.$u = !1, s;
				var c = this.$u ? this.toDate().getTimezoneOffset() : -1 * this.utcOffset();
				return (s = this.local().add(o + c, e)).$offset = o, s.$x.$localOffset = c, s;
			};
			var u = o.format;
			o.format = function(e) {
				var t = e || (this.$u ? "YYYY-MM-DDTHH:mm:ss[Z]" : "");
				return u.call(this, t);
			}, o.valueOf = function() {
				var e = this.$utils().u(this.$offset) ? 0 : this.$offset + (this.$x.$localOffset || this.$d.getTimezoneOffset());
				return this.$d.valueOf() - 6e4 * e;
			}, o.isUTC = function() {
				return !!this.$u;
			}, o.toISOString = function() {
				return this.toDate().toISOString();
			}, o.toString = function() {
				return this.toDate().toUTCString();
			};
			var d = o.toDate;
			o.toDate = function(e) {
				return e === "s" && this.$offset ? a(this.format("YYYY-MM-DD HH:mm:ss:SSS")).toDate() : d.call(this);
			};
			var f = o.diff;
			o.diff = function(e, t, n) {
				if (e && this.$u === e.$u) return f.call(this, e, t, n);
				var r = this.local(), i = a(e).local();
				return f.call(r, i, t, n);
			};
		};
	}));
})), rt = /* @__PURE__ */ ce(tt(), 1), it = /* @__PURE__ */ ce(nt(), 1), at = /* @__PURE__ */ ce(z(), 1);
function ot(e, t) {
	typeof console < "u" && (console.warn("[intlify] " + e), t && console.warn(t.stack));
}
var st = {};
function ct(e) {
	st[e] || (st[e] = !0, ot(e));
}
var lt = typeof window < "u", ut, dt;
if (process.env.NODE_ENV !== "production") {
	let e = lt && window.performance;
	e && e.mark && e.measure && e.clearMarks && e.clearMeasures && (ut = (t) => {
		e.mark(t);
	}, dt = (t, n, r) => {
		e.measure(t, n, r), e.clearMarks(n), e.clearMarks(r);
	});
}
var ft = /\{([0-9a-zA-Z]+)\}/g;
function pt(e, ...t) {
	return t.length === 1 && q(t[0]) && (t = t[0]), (!t || !t.hasOwnProperty) && (t = {}), e.replace(ft, (e, n) => t.hasOwnProperty(n) ? t[n] : "");
}
var mt = (e, t = !1) => t ? Symbol.for(e) : Symbol(e), ht = (e, t, n) => gt({
	l: e,
	k: t,
	s: n
}), gt = (e) => JSON.stringify(e).replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029").replace(/\u0027/g, "\\u0027"), B = (e) => typeof e == "number" && isFinite(e), _t = (e) => Ft(e) === "[object Date]", vt = (e) => Ft(e) === "[object RegExp]", yt = (e) => J(e) && Object.keys(e).length === 0, V = Object.assign, bt = Object.create, H = (e = null) => bt(e), xt, St = () => xt ||= typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : H();
function Ct(e) {
	return e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;").replace(/\//g, "&#x2F;").replace(/=/g, "&#x3D;");
}
function wt(e) {
	return e.replace(/&(?![a-zA-Z0-9#]{2,6};)/g, "&amp;").replace(/"/g, "&quot;").replace(/'/g, "&apos;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
var Tt = /^\s*javascript\s*(?::|&#0*58;?|&#x0*3a;?|&colon;?)/i, Et = /^(?:href|src|action|formaction)$/i;
function Dt(e) {
	return Tt.test(e);
}
function Ot(e) {
	let t = /url\s*\(/gi, n = "", r = 0, i;
	for (; (i = t.exec(e)) !== null;) {
		let a = i.index, o = t.lastIndex - 1, s = o + 1, c = 1, l = null;
		for (; s < e.length; s++) {
			let t = e[s];
			if (l) {
				t === l && (l = null);
				continue;
			}
			if (t === "\"" || t === "'") l = t;
			else if (t === "(") c++;
			else if (t === ")" && (c--, c === 0)) break;
		}
		if (c !== 0) break;
		let u = e.slice(o + 1, s).trim(), d = u.startsWith("\"") && u.endsWith("\"") || u.startsWith("'") && u.endsWith("'") ? u.slice(1, -1).trim() : u;
		n += e.slice(r, a), n += Dt(d) ? "url(about:blank)" : e.slice(a, s + 1), r = s + 1;
	}
	return n + e.slice(r);
}
function kt(e, t) {
	return Et.test(e) && Dt(t) ? "about:blank" : wt(e.toLowerCase() === "style" ? Ot(t) : t);
}
function At(e) {
	return e = e.replace(/([\w:-]+)\s*=\s*"([^"]*)"/g, (e, t, n) => `${t}="${kt(t, n)}"`), e = e.replace(/([\w:-]+)\s*=\s*'([^']*)'/g, (e, t, n) => `${t}='${kt(t, n)}'`), /\s*on\w+\s*=\s*["']?[^"'>]+["']?/gi.test(e) && (process.env.NODE_ENV !== "production" && ot("Potentially dangerous event handlers detected in translation. Consider removing onclick, onerror, etc. from your translation messages."), e = e.replace(/(\s+)(on)(\w+\s*=)/gi, "$1&#111;n$3")), e = e.replace(/(\s+(?:href|src|action|formaction)\s*=\s*)([^\s"'=<>`]+)/gi, (e, t, n) => Dt(n) ? `${t}about:blank` : e), e;
}
var jt = Object.prototype.hasOwnProperty;
function Mt(e, t) {
	return jt.call(e, t);
}
var U = Array.isArray, W = (e) => typeof e == "function", G = (e) => typeof e == "string", K = (e) => typeof e == "boolean", q = (e) => typeof e == "object" && !!e, Nt = (e) => q(e) && W(e.then) && W(e.catch), Pt = Object.prototype.toString, Ft = (e) => Pt.call(e), J = (e) => Ft(e) === "[object Object]", It = (e) => e == null ? "" : U(e) || J(e) && e.toString === Pt ? JSON.stringify(e, null, 2) : String(e);
function Lt(e, t = "") {
	return e.reduce((e, n, r) => r === 0 ? e + n : e + t + n, "");
}
var Rt = 2;
function zt(e, t = 0, n = e.length) {
	let r = e.split(/\r?\n/), i = 0, a = [];
	for (let e = 0; e < r.length; e++) if (i += r[e].length + 1, i >= t) {
		for (let o = e - Rt; o <= e + Rt || n > i; o++) {
			if (o < 0 || o >= r.length) continue;
			let s = o + 1;
			a.push(`${s}${" ".repeat(3 - String(s).length)}|  ${r[o]}`);
			let c = r[o].length;
			if (o === e) {
				let e = t - (i - c) + 1, r = Math.max(1, n > i ? c - e : n - t);
				a.push("   |  " + " ".repeat(e) + "^".repeat(r));
			} else if (o > e) {
				if (n > i) {
					let e = Math.max(Math.min(n - i, c), 1);
					a.push("   |  " + "^".repeat(e));
				}
				i += c + 1;
			}
		}
		break;
	}
	return a.join("\n");
}
function Bt() {
	let e = /* @__PURE__ */ new Map();
	return {
		events: e,
		on(t, n) {
			let r = e.get(t);
			r && r.push(n) || e.set(t, [n]);
		},
		off(t, n) {
			let r = e.get(t);
			r && r.splice(r.indexOf(n) >>> 0, 1);
		},
		emit(t, n) {
			(e.get(t) || []).slice().map((e) => e(n)), (e.get("*") || []).slice().map((e) => e(t, n));
		}
	};
}
var Vt = (e) => !q(e) || U(e);
function Ht(e, t) {
	if (Vt(e) || Vt(t)) throw Error("Invalid value");
	let n = [{
		src: e,
		des: t
	}];
	for (; n.length;) {
		let { src: e, des: t } = n.pop();
		Object.keys(e).forEach((r) => {
			r !== "__proto__" && (q(e[r]) && !q(t[r]) && (t[r] = Array.isArray(e[r]) ? [] : H()), Vt(t[r]) || Vt(e[r]) ? t[r] = e[r] : n.push({
				src: e[r],
				des: t[r]
			}));
		});
	}
}
//#endregion
//#region node_modules/.pnpm/@intlify+message-compiler@11.4.6/node_modules/@intlify/message-compiler/dist/message-compiler.mjs
function Ut(e, t, n) {
	return {
		line: e,
		column: t,
		offset: n
	};
}
function Wt(e, t, n) {
	let r = {
		start: e,
		end: t
	};
	return n != null && (r.source = n), r;
}
var Y = {
	EXPECTED_TOKEN: 1,
	INVALID_TOKEN_IN_PLACEHOLDER: 2,
	UNTERMINATED_SINGLE_QUOTE_IN_PLACEHOLDER: 3,
	UNKNOWN_ESCAPE_SEQUENCE: 4,
	INVALID_UNICODE_ESCAPE_SEQUENCE: 5,
	UNBALANCED_CLOSING_BRACE: 6,
	UNTERMINATED_CLOSING_BRACE: 7,
	EMPTY_PLACEHOLDER: 8,
	NOT_ALLOW_NEST_PLACEHOLDER: 9,
	INVALID_LINKED_FORMAT: 10,
	MUST_HAVE_MESSAGES_IN_PLURAL: 11,
	UNEXPECTED_EMPTY_LINKED_MODIFIER: 12,
	UNEXPECTED_EMPTY_LINKED_KEY: 13,
	UNEXPECTED_LEXICAL_ANALYSIS: 14,
	UNHANDLED_CODEGEN_NODE_TYPE: 15,
	UNHANDLED_MINIFIER_NODE_TYPE: 16
}, Gt = {
	[Y.EXPECTED_TOKEN]: "Expected token: '{0}'",
	[Y.INVALID_TOKEN_IN_PLACEHOLDER]: "Invalid token in placeholder: '{0}'",
	[Y.UNTERMINATED_SINGLE_QUOTE_IN_PLACEHOLDER]: "Unterminated single quote in placeholder",
	[Y.UNKNOWN_ESCAPE_SEQUENCE]: "Unknown escape sequence: \\{0}",
	[Y.INVALID_UNICODE_ESCAPE_SEQUENCE]: "Invalid unicode escape sequence: {0}",
	[Y.UNBALANCED_CLOSING_BRACE]: "Unbalanced closing brace",
	[Y.UNTERMINATED_CLOSING_BRACE]: "Unterminated closing brace",
	[Y.EMPTY_PLACEHOLDER]: "Empty placeholder",
	[Y.NOT_ALLOW_NEST_PLACEHOLDER]: "Not allowed nest placeholder",
	[Y.INVALID_LINKED_FORMAT]: "Invalid linked format",
	[Y.MUST_HAVE_MESSAGES_IN_PLURAL]: "Plural must have messages",
	[Y.UNEXPECTED_EMPTY_LINKED_MODIFIER]: "Unexpected empty linked modifier",
	[Y.UNEXPECTED_EMPTY_LINKED_KEY]: "Unexpected empty linked key",
	[Y.UNEXPECTED_LEXICAL_ANALYSIS]: "Unexpected lexical analysis in token: '{0}'",
	[Y.UNHANDLED_CODEGEN_NODE_TYPE]: "unhandled codegen node type: '{0}'",
	[Y.UNHANDLED_MINIFIER_NODE_TYPE]: "unhandled mimifier node type: '{0}'"
};
function Kt(e, t, n = {}) {
	let { domain: r, messages: i, args: a } = n, o = process.env.NODE_ENV === "production" ? e : pt((i || Gt)[e] || "", ...a || []), s = SyntaxError(String(o));
	return s.code = e, t && (s.location = t), s.domain = r, s;
}
function qt(e) {
	throw e;
}
var Jt = /<\/?[\w\s="/.':;#-\/]+>/, Yt = (e) => Jt.test(e), Xt = " ", Zt = "\r", Qt = "\n", $t = "\u2028", en = "\u2029";
function tn(e) {
	let t = e, n = 0, r = 1, i = 1, a = 0, o = (e) => t[e] === Zt && t[e + 1] === Qt, s = (e) => t[e] === Qt, c = (e) => t[e] === en, l = (e) => t[e] === $t, u = (e) => o(e) || s(e) || c(e) || l(e), d = () => n, f = () => r, p = () => i, m = () => a, h = (e) => o(e) || c(e) || l(e) ? Qt : t[e], g = () => h(n), _ = () => h(n + a);
	function v() {
		return a = 0, u(n) && (r++, i = 0), o(n) && n++, n++, i++, t[n];
	}
	function y() {
		return o(n + a) && a++, a++, t[n + a];
	}
	function b() {
		n = 0, r = 1, i = 1, a = 0;
	}
	function x(e = 0) {
		a = e;
	}
	function S() {
		let e = n + a;
		for (; e !== n;) v();
		a = 0;
	}
	return {
		index: d,
		line: f,
		column: p,
		peekOffset: m,
		charAt: h,
		currentChar: g,
		currentPeek: _,
		next: v,
		peek: y,
		reset: b,
		resetPeek: x,
		skipToPeek: S
	};
}
var nn = void 0, rn = "'", an = "tokenizer";
function on(e, t = {}) {
	let n = t.location !== !1, r = tn(e), i = () => r.index(), a = () => Ut(r.line(), r.column(), r.index()), o = a(), s = i(), c = {
		currentType: 13,
		offset: s,
		startLoc: o,
		endLoc: o,
		lastType: 13,
		lastOffset: s,
		lastStartLoc: o,
		lastEndLoc: o,
		braceNest: 0,
		inLinked: !1,
		text: ""
	}, l = () => c, { onError: u } = t;
	function d(e, t, r, ...i) {
		let a = l();
		if (t.column += r, t.offset += r, u) {
			let r = Kt(e, n ? Wt(a.startLoc, t) : null, {
				domain: an,
				args: i
			});
			u(r);
		}
	}
	function f(e, t, r) {
		e.endLoc = a(), e.currentType = t;
		let i = { type: t };
		return n && (i.loc = Wt(e.startLoc, e.endLoc)), r != null && (i.value = r), i;
	}
	let p = (e) => f(e, 13);
	function m(e, t) {
		return e.currentChar() === t ? (e.next(), t) : (d(Y.EXPECTED_TOKEN, a(), 0, t), "");
	}
	function h(e) {
		let t = "";
		for (; e.currentPeek() === Xt || e.currentPeek() === Qt;) t += e.currentPeek(), e.peek();
		return t;
	}
	function g(e) {
		let t = h(e);
		return e.skipToPeek(), t;
	}
	function _(e) {
		if (e === nn) return !1;
		let t = e.charCodeAt(0);
		return t >= 97 && t <= 122 || t >= 65 && t <= 90 || t === 95;
	}
	function v(e) {
		if (e === nn) return !1;
		let t = e.charCodeAt(0);
		return t >= 48 && t <= 57;
	}
	function y(e, t) {
		let { currentType: n } = t;
		if (n !== 2) return !1;
		h(e);
		let r = _(e.currentPeek());
		return e.resetPeek(), r;
	}
	function b(e, t) {
		let { currentType: n } = t;
		if (n !== 2) return !1;
		h(e);
		let r = v(e.currentPeek() === "-" ? e.peek() : e.currentPeek());
		return e.resetPeek(), r;
	}
	function x(e, t) {
		let { currentType: n } = t;
		if (n !== 2) return !1;
		h(e);
		let r = e.currentPeek() === rn;
		return e.resetPeek(), r;
	}
	function S(e, t) {
		let { currentType: n } = t;
		if (n !== 7) return !1;
		h(e);
		let r = e.currentPeek() === ".";
		return e.resetPeek(), r;
	}
	function C(e, t) {
		let { currentType: n } = t;
		if (n !== 8) return !1;
		h(e);
		let r = _(e.currentPeek());
		return e.resetPeek(), r;
	}
	function w(e, t) {
		let { currentType: n } = t;
		if (!(n === 7 || n === 11)) return !1;
		h(e);
		let r = e.currentPeek() === ":";
		return e.resetPeek(), r;
	}
	function T(e, t) {
		let { currentType: n } = t;
		if (n !== 9) return !1;
		let r = () => {
			let t = e.currentPeek();
			return t === "{" ? _(e.peek()) : t === "@" || t === "|" || t === ":" || t === "." || t === Xt || !t ? !1 : t === Qt ? (e.peek(), r()) : D(e, !1);
		}, i = r();
		return e.resetPeek(), i;
	}
	function E(e) {
		h(e);
		let t = e.currentPeek() === "|";
		return e.resetPeek(), t;
	}
	function D(e, t = !0) {
		let n = (t = !1, r = "") => {
			let i = e.currentPeek();
			return i === "{" || i === "@" || !i ? t : i === "|" ? !(r === Xt || r === Qt) : i === Xt ? (e.peek(), n(!0, Xt)) : i === Qt ? (e.peek(), n(!0, Qt)) : !0;
		}, r = n();
		return t && e.resetPeek(), r;
	}
	function O(e, t) {
		let n = e.currentChar();
		if (n !== nn) return t(n) ? (e.next(), n) : null;
	}
	function k(e) {
		let t = e.charCodeAt(0);
		return t >= 97 && t <= 122 || t >= 65 && t <= 90 || t >= 48 && t <= 57 || t === 95 || t === 36;
	}
	function A(e) {
		return O(e, k);
	}
	function j(e) {
		let t = e.charCodeAt(0);
		return t >= 97 && t <= 122 || t >= 65 && t <= 90 || t >= 48 && t <= 57 || t === 95 || t === 36 || t === 45;
	}
	function M(e) {
		return O(e, j);
	}
	function N(e) {
		let t = e.charCodeAt(0);
		return t >= 48 && t <= 57;
	}
	function P(e) {
		return O(e, N);
	}
	function F(e) {
		let t = e.charCodeAt(0);
		return t >= 48 && t <= 57 || t >= 65 && t <= 70 || t >= 97 && t <= 102;
	}
	function ee(e) {
		return O(e, F);
	}
	function te(e) {
		let t = "", n = "";
		for (; t = P(e);) n += t;
		return n;
	}
	function I(e) {
		let t = "";
		for (;;) {
			let n = e.currentChar();
			if (n === "\\") {
				let r = e.peek();
				r === "{" || r === "}" || r === "@" || r === "|" || r === "\\" ? (t += n + r, e.next(), e.next()) : (e.resetPeek(), t += n, e.next());
			} else if (n === "{" || n === "}" || n === "@" || n === "|" || !n) break;
			else if (n === Xt || n === Qt) if (D(e)) t += n, e.next();
			else if (E(e)) break;
			else t += n, e.next();
			else t += n, e.next();
		}
		return t;
	}
	function ne(e) {
		g(e);
		let t = "", n = "";
		for (; t = M(e);) n += t;
		let r = e.currentChar();
		if (r && r !== "}" && r !== nn && r !== Xt && r !== Qt && r !== "　") {
			let t = ce(e);
			return d(Y.INVALID_TOKEN_IN_PLACEHOLDER, a(), 0, n + t), n + t;
		}
		return e.currentChar() === nn && d(Y.UNTERMINATED_CLOSING_BRACE, a(), 0), n;
	}
	function re(e) {
		g(e);
		let t = "";
		return e.currentChar() === "-" ? (e.next(), t += `-${te(e)}`) : t += te(e), e.currentChar() === nn && d(Y.UNTERMINATED_CLOSING_BRACE, a(), 0), t;
	}
	function ie(e) {
		return e !== rn && e !== Qt;
	}
	function ae(e) {
		g(e), m(e, "'");
		let t = "", n = "";
		for (; t = O(e, ie);) t === "\\" ? n += oe(e) : n += t;
		let r = e.currentChar();
		return r === Qt || r === nn ? (d(Y.UNTERMINATED_SINGLE_QUOTE_IN_PLACEHOLDER, a(), 0), r === Qt && (e.next(), m(e, "'")), n) : (m(e, "'"), n);
	}
	function oe(e) {
		let t = e.currentChar();
		switch (t) {
			case "\\":
			case "'": return e.next(), `\\${t}`;
			case "u": return L(e, t, 4);
			case "U": return L(e, t, 6);
			default: return d(Y.UNKNOWN_ESCAPE_SEQUENCE, a(), 0, t), "";
		}
	}
	function L(e, t, n) {
		m(e, t);
		let r = "";
		for (let i = 0; i < n; i++) {
			let n = ee(e);
			if (!n) {
				d(Y.INVALID_UNICODE_ESCAPE_SEQUENCE, a(), 0, `\\${t}${r}${e.currentChar()}`);
				break;
			}
			r += n;
		}
		return `\\${t}${r}`;
	}
	function se(e) {
		return e !== "{" && e !== "}" && e !== Xt && e !== Qt;
	}
	function ce(e) {
		g(e);
		let t = "", n = "";
		for (; t = O(e, se);) n += t;
		return n;
	}
	function le(e) {
		let t = "", n = "";
		for (; t = A(e);) n += t;
		return n;
	}
	function ue(e) {
		let t = (n) => {
			let r = e.currentChar();
			return r === "{" || r === "@" || r === "|" || r === "(" || r === ")" || !r || r === Xt ? n : (n += r, e.next(), t(n));
		};
		return t("");
	}
	function de(e) {
		g(e);
		let t = m(e, "|");
		return g(e), t;
	}
	function fe(e, t) {
		let n = null;
		switch (e.currentChar()) {
			case "{": return t.braceNest >= 1 && d(Y.NOT_ALLOW_NEST_PLACEHOLDER, a(), 0), e.next(), n = f(t, 2, "{"), g(e), t.braceNest++, n;
			case "}": return t.braceNest > 0 && t.currentType === 2 && d(Y.EMPTY_PLACEHOLDER, a(), 0), e.next(), n = f(t, 3, "}"), t.braceNest--, t.braceNest > 0 && g(e), t.inLinked && t.braceNest === 0 && (t.inLinked = !1), n;
			case "@": return t.braceNest > 0 && d(Y.UNTERMINATED_CLOSING_BRACE, a(), 0), n = pe(e, t) || p(t), t.braceNest = 0, n;
			default: {
				let r = !0, i = !0, o = !0;
				if (E(e)) return t.braceNest > 0 && d(Y.UNTERMINATED_CLOSING_BRACE, a(), 0), n = f(t, 1, de(e)), t.braceNest = 0, t.inLinked = !1, n;
				if (t.braceNest > 0 && (t.currentType === 4 || t.currentType === 5 || t.currentType === 6)) return d(Y.UNTERMINATED_CLOSING_BRACE, a(), 0), t.braceNest = 0, me(e, t);
				if (r = y(e, t)) return n = f(t, 4, ne(e)), g(e), n;
				if (i = b(e, t)) return n = f(t, 5, re(e)), g(e), n;
				if (o = x(e, t)) return n = f(t, 6, ae(e)), g(e), n;
				if (!r && !i && !o) return n = f(t, 12, ce(e)), d(Y.INVALID_TOKEN_IN_PLACEHOLDER, a(), 0, n.value), g(e), n;
				break;
			}
		}
		return n;
	}
	function pe(e, t) {
		let { currentType: n } = t, r = null, i = e.currentChar();
		switch ((n === 7 || n === 8 || n === 11 || n === 9) && (i === Qt || i === Xt) && d(Y.INVALID_LINKED_FORMAT, a(), 0), i) {
			case "@": return e.next(), r = f(t, 7, "@"), t.inLinked = !0, r;
			case ".": return g(e), e.next(), f(t, 8, ".");
			case ":": return g(e), e.next(), f(t, 9, ":");
			default: return E(e) ? (r = f(t, 1, de(e)), t.braceNest = 0, t.inLinked = !1, r) : S(e, t) || w(e, t) ? (g(e), pe(e, t)) : C(e, t) ? (g(e), f(t, 11, le(e))) : T(e, t) ? (g(e), i === "{" ? fe(e, t) || r : f(t, 10, ue(e))) : (n === 7 && d(Y.INVALID_LINKED_FORMAT, a(), 0), t.braceNest = 0, t.inLinked = !1, me(e, t));
		}
	}
	function me(e, t) {
		let n = { type: 13 };
		if (t.braceNest > 0) return fe(e, t) || p(t);
		if (t.inLinked) return pe(e, t) || p(t);
		switch (e.currentChar()) {
			case "{": return fe(e, t) || p(t);
			case "}": return d(Y.UNBALANCED_CLOSING_BRACE, a(), 0), e.next(), f(t, 3, "}");
			case "@": return pe(e, t) || p(t);
			default:
				if (E(e)) return n = f(t, 1, de(e)), t.braceNest = 0, t.inLinked = !1, n;
				if (D(e)) return f(t, 0, I(e));
				break;
		}
		return n;
	}
	function he() {
		let { currentType: e, offset: t, startLoc: n, endLoc: o } = c;
		return c.lastType = e, c.lastOffset = t, c.lastStartLoc = n, c.lastEndLoc = o, c.offset = i(), c.startLoc = a(), r.currentChar() === nn ? f(c, 13) : me(r, c);
	}
	return {
		nextToken: he,
		currentOffset: i,
		currentPosition: a,
		context: l
	};
}
var sn = "parser", cn = /(?:\\\\|\\'|\\u([0-9a-fA-F]{4})|\\U([0-9a-fA-F]{6}))/g, ln = /\\([\\@{}|])/g;
function un(e, t) {
	return t;
}
function dn(e, t, n) {
	switch (e) {
		case "\\\\": return "\\";
		case "\\'": return "'";
		default: {
			let e = parseInt(t || n, 16);
			return e <= 55295 || e >= 57344 ? String.fromCodePoint(e) : "�";
		}
	}
}
function fn(e = {}) {
	let t = e.location !== !1, { onError: n } = e;
	function r(e, r, i, a, ...o) {
		let s = e.currentPosition();
		if (s.offset += a, s.column += a, n) {
			let e = Kt(r, t ? Wt(i, s) : null, {
				domain: sn,
				args: o
			});
			n(e);
		}
	}
	function i(e, n, r) {
		let i = { type: e };
		return t && (i.start = n, i.end = n, i.loc = {
			start: r,
			end: r
		}), i;
	}
	function a(e, n, r, i) {
		t && (e.end = n, e.loc && (e.loc.end = r));
	}
	function o(e, t) {
		let n = e.context(), r = i(3, n.offset, n.startLoc);
		return r.value = t.replace(ln, un), a(r, e.currentOffset(), e.currentPosition()), r;
	}
	function s(e, t) {
		let { lastOffset: n, lastStartLoc: r } = e.context(), o = i(5, n, r);
		return o.index = parseInt(t, 10), e.nextToken(), a(o, e.currentOffset(), e.currentPosition()), o;
	}
	function c(e, t) {
		let { lastOffset: n, lastStartLoc: r } = e.context(), o = i(4, n, r);
		return o.key = t, e.nextToken(), a(o, e.currentOffset(), e.currentPosition()), o;
	}
	function l(e, t) {
		let { lastOffset: n, lastStartLoc: r } = e.context(), o = i(9, n, r);
		return o.value = t.replace(cn, dn), e.nextToken(), a(o, e.currentOffset(), e.currentPosition()), o;
	}
	function u(e) {
		let t = e.nextToken(), n = e.context(), { lastOffset: o, lastStartLoc: s } = n, c = i(8, o, s);
		return t.type === 11 ? (t.value ?? r(e, Y.UNEXPECTED_LEXICAL_ANALYSIS, n.lastStartLoc, 0, pn(t)), c.value = t.value || "", a(c, e.currentOffset(), e.currentPosition()), { node: c }) : (r(e, Y.UNEXPECTED_EMPTY_LINKED_MODIFIER, n.lastStartLoc, 0), c.value = "", a(c, o, s), {
			nextConsumeToken: t,
			node: c
		});
	}
	function d(e, t) {
		let n = e.context(), r = i(7, n.offset, n.startLoc);
		return r.value = t, a(r, e.currentOffset(), e.currentPosition()), r;
	}
	function f(e) {
		let t = e.context(), n = i(6, t.offset, t.startLoc), o = e.nextToken();
		if (o.type === 8) {
			let t = u(e);
			n.modifier = t.node, o = t.nextConsumeToken || e.nextToken();
		}
		switch (o.type !== 9 && r(e, Y.UNEXPECTED_LEXICAL_ANALYSIS, t.lastStartLoc, 0, pn(o)), o = e.nextToken(), o.type === 2 && (o = e.nextToken()), o.type) {
			case 10:
				o.value ?? r(e, Y.UNEXPECTED_LEXICAL_ANALYSIS, t.lastStartLoc, 0, pn(o)), n.key = d(e, o.value || "");
				break;
			case 4:
				o.value ?? r(e, Y.UNEXPECTED_LEXICAL_ANALYSIS, t.lastStartLoc, 0, pn(o)), n.key = c(e, o.value || "");
				break;
			case 5:
				o.value ?? r(e, Y.UNEXPECTED_LEXICAL_ANALYSIS, t.lastStartLoc, 0, pn(o)), n.key = s(e, o.value || "");
				break;
			case 6:
				o.value ?? r(e, Y.UNEXPECTED_LEXICAL_ANALYSIS, t.lastStartLoc, 0, pn(o)), n.key = l(e, o.value || "");
				break;
			default: {
				r(e, Y.UNEXPECTED_EMPTY_LINKED_KEY, t.lastStartLoc, 0);
				let s = e.context(), c = i(7, s.offset, s.startLoc);
				return c.value = "", a(c, s.offset, s.startLoc), n.key = c, a(n, s.offset, s.startLoc), {
					nextConsumeToken: o,
					node: n
				};
			}
		}
		return a(n, e.currentOffset(), e.currentPosition()), { node: n };
	}
	function p(e) {
		let t = e.context(), n = i(2, t.currentType === 1 ? e.currentOffset() : t.offset, t.currentType === 1 ? t.endLoc : t.startLoc);
		n.items = [];
		let u = null;
		do {
			let i = u || e.nextToken();
			switch (u = null, i.type) {
				case 0:
					i.value ?? r(e, Y.UNEXPECTED_LEXICAL_ANALYSIS, t.lastStartLoc, 0, pn(i)), n.items.push(o(e, i.value || ""));
					break;
				case 5:
					i.value ?? r(e, Y.UNEXPECTED_LEXICAL_ANALYSIS, t.lastStartLoc, 0, pn(i)), n.items.push(s(e, i.value || ""));
					break;
				case 4:
					i.value ?? r(e, Y.UNEXPECTED_LEXICAL_ANALYSIS, t.lastStartLoc, 0, pn(i)), n.items.push(c(e, i.value || ""));
					break;
				case 6:
					i.value ?? r(e, Y.UNEXPECTED_LEXICAL_ANALYSIS, t.lastStartLoc, 0, pn(i)), n.items.push(l(e, i.value || ""));
					break;
				case 7: {
					let t = f(e);
					n.items.push(t.node), u = t.nextConsumeToken || null;
					break;
				}
			}
		} while (t.currentType !== 13 && t.currentType !== 1);
		return a(n, t.currentType === 1 ? t.lastOffset : e.currentOffset(), t.currentType === 1 ? t.lastEndLoc : e.currentPosition()), n;
	}
	function m(e, t, n, o) {
		let s = e.context(), c = o.items.length === 0, l = i(1, t, n);
		l.cases = [], l.cases.push(o);
		do {
			let t = p(e);
			c ||= t.items.length === 0, l.cases.push(t);
		} while (s.currentType !== 13);
		return c && r(e, Y.MUST_HAVE_MESSAGES_IN_PLURAL, n, 0), a(l, e.currentOffset(), e.currentPosition()), l;
	}
	function h(e) {
		let t = e.context(), { offset: n, startLoc: r } = t, i = p(e);
		return t.currentType === 13 ? i : m(e, n, r, i);
	}
	function g(n) {
		let o = on(n, V({}, e)), s = o.context(), c = i(0, s.offset, s.startLoc);
		return t && c.loc && (c.loc.source = n), c.body = h(o), e.onCacheKey && (c.cacheKey = e.onCacheKey(n)), s.currentType !== 13 && r(o, Y.UNEXPECTED_LEXICAL_ANALYSIS, s.lastStartLoc, 0, n[s.offset] || ""), a(c, o.currentOffset(), o.currentPosition()), c;
	}
	return { parse: g };
}
function pn(e) {
	if (e.type === 13) return "EOF";
	let t = (e.value || "").replace(/\r?\n/gu, "\\n");
	return t.length > 10 ? t.slice(0, 9) + "…" : t;
}
function mn(e, t = {}) {
	let n = {
		ast: e,
		helpers: /* @__PURE__ */ new Set()
	};
	return {
		context: () => n,
		helper: (e) => (n.helpers.add(e), e)
	};
}
function hn(e, t) {
	for (let n = 0; n < e.length; n++) gn(e[n], t);
}
function gn(e, t) {
	switch (e.type) {
		case 1:
			hn(e.cases, t), t.helper("plural");
			break;
		case 2:
			hn(e.items, t);
			break;
		case 6:
			gn(e.key, t), t.helper("linked"), t.helper("type");
			break;
		case 5:
			t.helper("interpolate"), t.helper("list");
			break;
		case 4:
			t.helper("interpolate"), t.helper("named");
			break;
	}
}
function _n(e, t = {}) {
	let n = mn(e);
	n.helper("normalize"), e.body && gn(e.body, n);
	let r = n.context();
	e.helpers = Array.from(r.helpers);
}
function vn(e) {
	let t = e.body;
	return t.type === 2 ? yn(t) : t.cases.forEach((e) => yn(e)), e;
}
function yn(e) {
	if (e.items.length === 1) {
		let t = e.items[0];
		(t.type === 3 || t.type === 9) && (e.static = t.value, delete t.value);
	} else {
		let t = [];
		for (let n = 0; n < e.items.length; n++) {
			let r = e.items[n];
			if (!(r.type === 3 || r.type === 9) || r.value == null) break;
			t.push(r.value);
		}
		if (t.length === e.items.length) {
			e.static = Lt(t);
			for (let t = 0; t < e.items.length; t++) {
				let n = e.items[t];
				(n.type === 3 || n.type === 9) && delete n.value;
			}
		}
	}
}
var bn = "minifier";
function xn(e) {
	switch (e.t = e.type, e.type) {
		case 0: {
			let t = e;
			xn(t.body), t.b = t.body, delete t.body;
			break;
		}
		case 1: {
			let t = e, n = t.cases;
			for (let e = 0; e < n.length; e++) xn(n[e]);
			t.c = n, delete t.cases;
			break;
		}
		case 2: {
			let t = e, n = t.items;
			for (let e = 0; e < n.length; e++) xn(n[e]);
			t.i = n, delete t.items, t.static && (t.s = t.static, delete t.static);
			break;
		}
		case 3:
		case 9:
		case 8:
		case 7: {
			let t = e;
			t.value && (t.v = t.value, delete t.value);
			break;
		}
		case 6: {
			let t = e;
			xn(t.key), t.k = t.key, delete t.key, t.modifier && (xn(t.modifier), t.m = t.modifier, delete t.modifier);
			break;
		}
		case 5: {
			let t = e;
			t.i = t.index, delete t.index;
			break;
		}
		case 4: {
			let t = e;
			t.k = t.key, delete t.key;
			break;
		}
		default: if (process.env.NODE_ENV !== "production") throw Kt(Y.UNHANDLED_MINIFIER_NODE_TYPE, null, {
			domain: bn,
			args: [e.type]
		});
	}
	delete e.type;
}
var Sn = "parser";
function Cn(e, t) {
	let { filename: n, breakLineCode: r, needIndent: i } = t, a = t.location !== !1, o = {
		filename: n,
		code: "",
		column: 1,
		line: 1,
		offset: 0,
		map: void 0,
		breakLineCode: r,
		needIndent: i,
		indentLevel: 0
	};
	a && e.loc && (o.source = e.loc.source);
	let s = () => o;
	function c(e, t) {
		o.code += e;
	}
	function l(e, t = !0) {
		let n = t ? r : "";
		c(i ? n + "  ".repeat(e) : n);
	}
	function u(e = !0) {
		let t = ++o.indentLevel;
		e && l(t);
	}
	function d(e = !0) {
		let t = --o.indentLevel;
		e && l(t);
	}
	function f() {
		l(o.indentLevel);
	}
	return {
		context: s,
		push: c,
		indent: u,
		deindent: d,
		newline: f,
		helper: (e) => `_${e}`,
		needIndent: () => o.needIndent
	};
}
function wn(e, t) {
	let { helper: n } = e;
	e.push(`${n("linked")}(`), On(e, t.key), t.modifier ? (e.push(", "), On(e, t.modifier), e.push(", _type")) : e.push(", undefined, _type"), e.push(")");
}
function Tn(e, t) {
	let { helper: n, needIndent: r } = e;
	e.push(`${n("normalize")}([`), e.indent(r());
	let i = t.items.length;
	for (let n = 0; n < i && (On(e, t.items[n]), n !== i - 1); n++) e.push(", ");
	e.deindent(r()), e.push("])");
}
function En(e, t) {
	let { helper: n, needIndent: r } = e;
	if (t.cases.length > 1) {
		e.push(`${n("plural")}([`), e.indent(r());
		let i = t.cases.length;
		for (let n = 0; n < i && (On(e, t.cases[n]), n !== i - 1); n++) e.push(", ");
		e.deindent(r()), e.push("])");
	}
}
function Dn(e, t) {
	t.body ? On(e, t.body) : e.push("null");
}
function On(e, t) {
	let { helper: n } = e;
	switch (t.type) {
		case 0:
			Dn(e, t);
			break;
		case 1:
			En(e, t);
			break;
		case 2:
			Tn(e, t);
			break;
		case 6:
			wn(e, t);
			break;
		case 8:
			e.push(JSON.stringify(t.value), t);
			break;
		case 7:
			e.push(JSON.stringify(t.value), t);
			break;
		case 5:
			e.push(`${n("interpolate")}(${n("list")}(${t.index}))`, t);
			break;
		case 4:
			e.push(`${n("interpolate")}(${n("named")}(${JSON.stringify(t.key)}))`, t);
			break;
		case 9:
			e.push(JSON.stringify(t.value), t);
			break;
		case 3:
			e.push(JSON.stringify(t.value), t);
			break;
		default: if (process.env.NODE_ENV !== "production") throw Kt(Y.UNHANDLED_CODEGEN_NODE_TYPE, null, {
			domain: Sn,
			args: [t.type]
		});
	}
}
var kn = (e, t = {}) => {
	let n = G(t.mode) ? t.mode : "normal", r = G(t.filename) ? t.filename : "message.intl";
	t.sourceMap;
	let i = t.breakLineCode == null ? n === "arrow" ? ";" : "\n" : t.breakLineCode, a = t.needIndent ? t.needIndent : n !== "arrow", o = e.helpers || [], s = Cn(e, {
		filename: r,
		breakLineCode: i,
		needIndent: a
	});
	s.push(n === "normal" ? "function __msg__ (ctx) {" : "(ctx) => {"), s.indent(a), o.length > 0 && (s.push(`const { ${Lt(o.map((e) => `${e}: _${e}`), ", ")} } = ctx`), s.newline()), s.push("return "), On(s, e), s.deindent(a), s.push("}"), delete e.helpers;
	let { code: c, map: l } = s.context();
	return {
		ast: e,
		code: c,
		map: l ? l.toJSON() : void 0
	};
};
function An(e, t = {}) {
	let n = V({}, t), r = !!n.jit, i = !!n.minify, a = n.optimize == null || n.optimize, o = fn(n).parse(e);
	return r ? (a && vn(o), i && xn(o), {
		ast: o,
		code: ""
	}) : (_n(o, n), kn(o, n));
}
//#endregion
//#region node_modules/.pnpm/@intlify+core-base@11.4.6/node_modules/@intlify/core-base/dist/core-base.mjs
function jn() {
	typeof __INTLIFY_PROD_DEVTOOLS__ != "boolean" && (St().__INTLIFY_PROD_DEVTOOLS__ = !1), typeof __INTLIFY_DROP_MESSAGE_COMPILER__ != "boolean" && (St().__INTLIFY_DROP_MESSAGE_COMPILER__ = !1);
}
function Mn(e) {
	return q(e) && Hn(e) === 0 && (Mt(e, "b") || Mt(e, "body"));
}
var Nn = ["b", "body"];
function Pn(e) {
	return Yn(e, Nn);
}
var Fn = ["c", "cases"];
function In(e) {
	return Yn(e, Fn, []);
}
var Ln = ["s", "static"];
function Rn(e) {
	return Yn(e, Ln);
}
var zn = ["i", "items"];
function Bn(e) {
	return Yn(e, zn, []);
}
var Vn = ["t", "type"];
function Hn(e) {
	return Yn(e, Vn);
}
var Un = ["v", "value"];
function Wn(e, t) {
	let n = Yn(e, Un);
	if (n != null) return n;
	throw Zn(t);
}
var Gn = ["m", "modifier"];
function Kn(e) {
	return Yn(e, Gn);
}
var qn = ["k", "key"];
function Jn(e) {
	let t = Yn(e, qn);
	if (t) return t;
	throw Zn(6);
}
function Yn(e, t, n) {
	for (let n = 0; n < t.length; n++) {
		let r = t[n];
		if (Mt(e, r) && e[r] != null) return e[r];
	}
	return n;
}
var Xn = [
	...Nn,
	...Fn,
	...Ln,
	...zn,
	...qn,
	...Gn,
	...Un,
	...Vn
];
function Zn(e) {
	return /* @__PURE__ */ Error(`unhandled node type: ${e}`);
}
function Qn(e) {
	return (t) => $n(t, e);
}
function $n(e, t) {
	let n = Pn(t);
	if (n == null) throw Zn(0);
	if (Hn(n) === 1) {
		let t = In(n);
		return e.plural(t.reduce((t, n) => [...t, er(e, n)], []));
	} else return er(e, n);
}
function er(e, t) {
	let n = Rn(t);
	if (n != null) return e.type === "text" ? n : e.normalize([n]);
	{
		let n = Bn(t).reduce((t, n) => [...t, tr(e, n)], []);
		return e.normalize(n);
	}
}
function tr(e, t) {
	let n = Hn(t);
	switch (n) {
		case 3: return Wn(t, n);
		case 9: return Wn(t, n);
		case 4: {
			let r = t;
			if (Mt(r, "k") && r.k) return e.interpolate(e.named(r.k));
			if (Mt(r, "key") && r.key) return e.interpolate(e.named(r.key));
			throw Zn(n);
		}
		case 5: {
			let r = t;
			if (Mt(r, "i") && B(r.i)) return e.interpolate(e.list(r.i));
			if (Mt(r, "index") && B(r.index)) return e.interpolate(e.list(r.index));
			throw Zn(n);
		}
		case 6: {
			let n = t, r = Kn(n), i = Jn(n);
			return e.linked(tr(e, i), r ? tr(e, r) : void 0, e.type);
		}
		case 7: return Wn(t, n);
		case 8: return Wn(t, n);
		default: throw Error(`unhandled node on format message part: ${n}`);
	}
}
var nr = "Detected HTML in '{source}' message. Recommend not using HTML messages to avoid XSS.";
function rr(e, t) {
	t && Yt(e) && ot(pt(nr, { source: e }));
}
var ir = (e) => e, ar = H();
function or(e, t = {}) {
	let n = !1, r = t.onError || qt;
	return t.onError = (e) => {
		n = !0, r(e);
	}, {
		...An(e, t),
		detectError: n
	};
}
/* #__NO_SIDE_EFFECTS__ */
function sr(e, t) {
	if (!__INTLIFY_DROP_MESSAGE_COMPILER__ && G(e)) {
		let n = !K(t.warnHtmlMessage) || t.warnHtmlMessage;
		process.env.NODE_ENV !== "production" && rr(e, n);
		let r = (t.onCacheKey || ir)(e), i = ar[r];
		if (i) return i;
		let { ast: a, detectError: o } = or(e, {
			...t,
			location: process.env.NODE_ENV !== "production",
			jit: !0
		}), s = Qn(a);
		return o ? s : ar[r] = s;
	} else {
		if (process.env.NODE_ENV !== "production" && !Mn(e)) return ot(`the message that is resolve with key '${t.key}' is not supported for jit compilation`), (() => e);
		let n = e.cacheKey;
		return n ? ar[n] || (ar[n] = Qn(e)) : Qn(e);
	}
}
var cr = null;
function lr(e) {
	cr = e;
}
function ur(e, t, n) {
	cr && cr.emit("i18n:init", {
		timestamp: Date.now(),
		i18n: e,
		version: t,
		meta: n
	});
}
var dr = /* #__PURE__*/ fr("function:translate");
function fr(e) {
	return (t) => cr && cr.emit(e, t);
}
var pr = {
	INVALID_ARGUMENT: 17,
	INVALID_DATE_ARGUMENT: 18,
	INVALID_ISO_DATE_ARGUMENT: 19,
	NOT_SUPPORT_NON_STRING_MESSAGE: 20,
	NOT_SUPPORT_LOCALE_PROMISE_VALUE: 21,
	NOT_SUPPORT_LOCALE_ASYNC_FUNCTION: 22,
	NOT_SUPPORT_LOCALE_TYPE: 23
};
function mr(e) {
	return Kt(e, null, process.env.NODE_ENV === "production" ? void 0 : { messages: hr });
}
var hr = {
	[pr.INVALID_ARGUMENT]: "Invalid arguments",
	[pr.INVALID_DATE_ARGUMENT]: "The date provided is an invalid Date object.Make sure your Date represents a valid date.",
	[pr.INVALID_ISO_DATE_ARGUMENT]: "The argument provided is not a valid ISO date string",
	[pr.NOT_SUPPORT_NON_STRING_MESSAGE]: "Not support non-string message",
	[pr.NOT_SUPPORT_LOCALE_PROMISE_VALUE]: "cannot support promise value",
	[pr.NOT_SUPPORT_LOCALE_ASYNC_FUNCTION]: "cannot support async function",
	[pr.NOT_SUPPORT_LOCALE_TYPE]: "cannot support locale type"
};
function gr(e, t) {
	return t.locale == null ? vr(e.locale) : vr(t.locale);
}
var _r;
function vr(e) {
	if (G(e)) return e;
	if (W(e)) {
		if (e.resolvedOnce && _r != null) return _r;
		if (e.constructor.name === "Function") {
			let t = e();
			if (Nt(t)) throw mr(pr.NOT_SUPPORT_LOCALE_PROMISE_VALUE);
			return _r = t;
		} else throw mr(pr.NOT_SUPPORT_LOCALE_ASYNC_FUNCTION);
	} else throw mr(pr.NOT_SUPPORT_LOCALE_TYPE);
}
function yr(e, t, n) {
	return [.../* @__PURE__ */ new Set([n, ...U(t) ? t : q(t) ? Object.keys(t) : G(t) ? [t] : [n]])];
}
function br(e, t, n) {
	let r = G(n) ? n : Lr, i = e;
	i.__localeChainCache ||= /* @__PURE__ */ new Map();
	let a = i.__localeChainCache.get(r);
	if (!a) {
		a = [];
		let e = [n];
		for (; U(e);) e = xr(a, e, t);
		let o = U(t) || !J(t) ? t : t.default ? t.default : null;
		e = G(o) ? [o] : o, U(e) && xr(a, e, !1), i.__localeChainCache.set(r, a);
	}
	return a;
}
function xr(e, t, n) {
	let r = !0;
	for (let i = 0; i < t.length && K(r); i++) {
		let a = t[i];
		G(a) && (r = Sr(e, t[i], n));
	}
	return r;
}
function Sr(e, t, n) {
	let r, i = t.split("-");
	do
		r = Cr(e, i.join("-"), n), i.splice(-1, 1);
	while (i.length && r === !0);
	return r;
}
function Cr(e, t, n) {
	let r = !1;
	if (!e.includes(t) && (r = !0, t)) {
		r = t[t.length - 1] !== "!";
		let i = t.replace(/!/g, "");
		e.push(i), (U(n) || J(n)) && n[i] && (r = n[i]);
	}
	return r;
}
var wr = [];
wr[0] = {
	w: [0],
	i: [3, 0],
	"[": [4],
	o: [7]
}, wr[1] = {
	w: [1],
	".": [2],
	"[": [4],
	o: [7]
}, wr[2] = {
	w: [2],
	i: [3, 0],
	0: [3, 0]
}, wr[3] = {
	i: [3, 0],
	0: [3, 0],
	w: [1, 1],
	".": [2, 1],
	"[": [4, 1],
	o: [7, 1]
}, wr[4] = {
	"'": [5, 0],
	"\"": [6, 0],
	"[": [4, 2],
	"]": [1, 3],
	o: 8,
	l: [4, 0]
}, wr[5] = {
	"'": [4, 0],
	o: 8,
	l: [5, 0]
}, wr[6] = {
	"\"": [4, 0],
	o: 8,
	l: [6, 0]
};
var Tr = /^\s?(?:true|false|-?[\d.]+|'[^']*'|"[^"]*")\s?$/;
function Er(e) {
	return Tr.test(e);
}
function Dr(e) {
	let t = e.charCodeAt(0);
	return t === e.charCodeAt(e.length - 1) && (t === 34 || t === 39) ? e.slice(1, -1) : e;
}
function Or(e) {
	if (e == null) return "o";
	switch (e.charCodeAt(0)) {
		case 91:
		case 93:
		case 46:
		case 34:
		case 39: return e;
		case 95:
		case 36:
		case 45: return "i";
		case 9:
		case 10:
		case 13:
		case 160:
		case 65279:
		case 8232:
		case 8233: return "w";
	}
	return "i";
}
function kr(e) {
	let t = e.trim();
	return e.charAt(0) === "0" && isNaN(parseInt(e)) ? !1 : Er(t) ? Dr(t) : "*" + t;
}
function Ar(e) {
	let t = [], n = -1, r = 0, i = 0, a, o, s, c, l, u, d, f = [];
	f[0] = () => {
		o === void 0 ? o = s : o += s;
	}, f[1] = () => {
		o !== void 0 && (t.push(o), o = void 0);
	}, f[2] = () => {
		f[0](), i++;
	}, f[3] = () => {
		if (i > 0) i--, r = 4, f[0]();
		else {
			if (i = 0, o === void 0 || (o = kr(o), o === !1)) return !1;
			f[1]();
		}
	};
	function p() {
		let t = e[n + 1];
		if (r === 5 && t === "'" || r === 6 && t === "\"") return n++, s = "\\" + t, f[0](), !0;
	}
	for (; r !== null;) if (n++, a = e[n], !(a === "\\" && p())) {
		if (c = Or(a), d = wr[r], l = d[c] || d.l || 8, l === 8 || (r = l[0], l[1] !== void 0 && (u = f[l[1]], u && (s = a, u() === !1)))) return;
		if (r === 7) return t;
	}
}
var jr = /* @__PURE__ */ new Map();
function Mr(e, t) {
	return q(e) ? e[t] : null;
}
function Nr(e, t) {
	if (!q(e)) return null;
	let n = jr.get(t);
	if (n || (n = Ar(t), n && jr.set(t, n)), !n) return null;
	let r = n.length, i = e, a = 0;
	for (; a < r;) {
		let e = n[a];
		if (Xn.includes(e) && Mn(i) || !q(i) || !Mt(i, e)) return null;
		let t = i[e];
		if (t === void 0 || W(i)) return null;
		i = t, a++;
	}
	return i;
}
var X = {
	NOT_FOUND_KEY: 1,
	FALLBACK_TO_TRANSLATE: 2,
	CANNOT_FORMAT_NUMBER: 3,
	FALLBACK_TO_NUMBER_FORMAT: 4,
	CANNOT_FORMAT_DATE: 5,
	FALLBACK_TO_DATE_FORMAT: 6,
	EXPERIMENTAL_CUSTOM_MESSAGE_COMPILER: 7,
	INVALID_NUMBER_ARGUMENT: 8,
	INVALID_DATE_ARGUMENT: 9
}, Pr = {
	[X.NOT_FOUND_KEY]: "Not found '{key}' key in '{locale}' locale messages.",
	[X.FALLBACK_TO_TRANSLATE]: "Fall back to translate '{key}' key with '{target}' locale.",
	[X.CANNOT_FORMAT_NUMBER]: "Cannot format a number value due to not supported Intl.NumberFormat.",
	[X.FALLBACK_TO_NUMBER_FORMAT]: "Fall back to number format '{key}' key with '{target}' locale.",
	[X.CANNOT_FORMAT_DATE]: "Cannot format a date value due to not supported Intl.DateTimeFormat.",
	[X.FALLBACK_TO_DATE_FORMAT]: "Fall back to datetime format '{key}' key with '{target}' locale.",
	[X.EXPERIMENTAL_CUSTOM_MESSAGE_COMPILER]: "This project is using Custom Message Compiler, which is an experimental feature. It may receive breaking changes or be removed in the future.",
	[X.INVALID_NUMBER_ARGUMENT]: "Invalid argument for number formatting: expected a number but received '{value}'.",
	[X.INVALID_DATE_ARGUMENT]: "Invalid argument for datetime formatting: expected a Date, number, or ISO string but received '{value}'."
};
function Fr(e, ...t) {
	return pt(Pr[e], ...t);
}
var Ir = "11.4.6", Lr = "en-US", Rr = (e) => `${e.charAt(0).toLocaleUpperCase()}${e.substr(1)}`;
function zr() {
	return {
		upper: (e, t) => t === "text" && G(e) ? e.toUpperCase() : t === "vnode" && q(e) && "__v_isVNode" in e ? e.children.toUpperCase() : e,
		lower: (e, t) => t === "text" && G(e) ? e.toLowerCase() : t === "vnode" && q(e) && "__v_isVNode" in e ? e.children.toLowerCase() : e,
		capitalize: (e, t) => t === "text" && G(e) ? Rr(e) : t === "vnode" && q(e) && "__v_isVNode" in e ? Rr(e.children) : e
	};
}
var Br;
function Vr(e) {
	Br = e;
}
var Hr;
function Ur(e) {
	Hr = e;
}
var Wr;
function Gr(e) {
	Wr = e;
}
var Kr = null, qr = /* @__NO_SIDE_EFFECTS__ */ () => Kr, Jr = null, Yr = (e) => {
	Jr = e;
}, Xr = () => Jr, Zr = 0;
function Qr(e = {}) {
	let t = W(e.onWarn) ? e.onWarn : ot, n = G(e.version) ? e.version : Ir, r = G(e.locale) || W(e.locale) ? e.locale : Lr, i = W(r) ? Lr : r, a = U(e.fallbackLocale) || J(e.fallbackLocale) || G(e.fallbackLocale) || e.fallbackLocale === !1 ? e.fallbackLocale : i, o = J(e.messages) ? e.messages : $r(i), s = J(e.datetimeFormats) ? e.datetimeFormats : $r(i), c = J(e.numberFormats) ? e.numberFormats : $r(i), l = V(H(), e.modifiers, zr()), u = e.pluralRules || H(), d = W(e.missing) ? e.missing : null, f = K(e.missingWarn) || vt(e.missingWarn) ? e.missingWarn : !0, p = K(e.fallbackWarn) || vt(e.fallbackWarn) ? e.fallbackWarn : !0, m = !!e.fallbackFormat, h = !!e.unresolving, g = W(e.postTranslation) ? e.postTranslation : null, _ = J(e.processor) ? e.processor : null, v = !K(e.warnHtmlMessage) || e.warnHtmlMessage, y = !!e.escapeParameter, b = W(e.messageCompiler) ? e.messageCompiler : Br;
	process.env.NODE_ENV !== "production" && W(e.messageCompiler) && ct(Fr(X.EXPERIMENTAL_CUSTOM_MESSAGE_COMPILER));
	let x = W(e.messageResolver) ? e.messageResolver : Hr || Mr, S = W(e.localeFallbacker) ? e.localeFallbacker : Wr || yr, C = q(e.fallbackContext) ? e.fallbackContext : void 0, w = e, T = q(w.__datetimeFormatters) ? w.__datetimeFormatters : /* @__PURE__ */ new Map(), E = q(w.__numberFormatters) ? w.__numberFormatters : /* @__PURE__ */ new Map(), D = q(w.__meta) ? w.__meta : {};
	Zr++;
	let O = {
		version: n,
		cid: Zr,
		locale: r,
		fallbackLocale: a,
		messages: o,
		modifiers: l,
		pluralRules: u,
		missing: d,
		missingWarn: f,
		fallbackWarn: p,
		fallbackFormat: m,
		unresolving: h,
		postTranslation: g,
		processor: _,
		warnHtmlMessage: v,
		escapeParameter: y,
		messageCompiler: b,
		messageResolver: x,
		localeFallbacker: S,
		fallbackContext: C,
		onWarn: t,
		__meta: D
	};
	return O.datetimeFormats = s, O.numberFormats = c, O.__datetimeFormatters = T, O.__numberFormatters = E, process.env.NODE_ENV !== "production" && (O.__v_emitter = w.__v_emitter == null ? void 0 : w.__v_emitter), (process.env.NODE_ENV !== "production" || __INTLIFY_PROD_DEVTOOLS__) && ur(O, n, D), O;
}
var $r = (e) => ({ [e]: H() });
function ei(e, t) {
	return e instanceof RegExp ? e.test(t) : e;
}
function ti(e, t) {
	return e instanceof RegExp ? e.test(t) : e;
}
function ni(e, t, n, r, i) {
	let { missing: a, onWarn: o } = e;
	if (process.env.NODE_ENV !== "production") {
		let r = e.__v_emitter;
		r && r.emit("missing", {
			locale: n,
			key: t,
			type: i,
			groupId: `${i}:${t}`
		});
	}
	if (a !== null) {
		let r = a(e, n, t, i);
		return G(r) ? r : t;
	} else return process.env.NODE_ENV !== "production" && ti(r, t) && o(Fr(X.NOT_FOUND_KEY, {
		key: t,
		locale: n
	})), t;
}
function ri(e, t, n) {
	let r = e;
	r.__localeChainCache = /* @__PURE__ */ new Map(), e.localeFallbacker(e, n, t);
}
function ii(e, t) {
	return e !== t && e.split("-")[0] === t.split("-")[0];
}
function ai(e, t) {
	let n = t.indexOf(e);
	if (n === -1) return !1;
	for (let r = n + 1; r < t.length; r++) if (ii(e, t[r])) return !0;
	return !1;
}
var oi = typeof Intl < "u", si = {
	dateTimeFormat: oi && Intl.DateTimeFormat !== void 0,
	numberFormat: oi && Intl.NumberFormat !== void 0
};
function ci(e, ...t) {
	let { datetimeFormats: n, unresolving: r, fallbackLocale: i, onWarn: a, localeFallbacker: o } = e, { __datetimeFormatters: s } = e;
	if (process.env.NODE_ENV !== "production" && !si.dateTimeFormat) return a(Fr(X.CANNOT_FORMAT_DATE)), "";
	if (!G(t[0]) && !_t(t[0]) && !B(t[0])) return process.env.NODE_ENV !== "production" && a(Fr(X.INVALID_DATE_ARGUMENT, { value: String(t[0]) })), "";
	let [c, l, u, d] = ui(...t), f = K(u.missingWarn) ? u.missingWarn : e.missingWarn, p = K(u.fallbackWarn) ? u.fallbackWarn : e.fallbackWarn, m = !!u.part, h = gr(e, u), g = o(e, i, h);
	if (!G(c) || c === "") {
		let e = new Intl.DateTimeFormat(h.replace(/!/g, ""), d);
		return m ? e.formatToParts(l) : e.format(l);
	}
	let _ = {}, v, y = null, b = h, x = null, S = "datetime format";
	for (let t = 0; t < g.length; t++) {
		if (v = x = g[t], process.env.NODE_ENV !== "production" && h !== v && ei(p, c) && a(Fr(X.FALLBACK_TO_DATE_FORMAT, {
			key: c,
			target: v
		})), process.env.NODE_ENV !== "production" && h !== v) {
			let t = e.__v_emitter;
			t && t.emit("fallback", {
				type: S,
				key: c,
				from: b,
				to: x,
				groupId: `${S}:${c}`
			});
		}
		if (_ = n[v] || {}, y = _[c], J(y)) break;
		ni(e, c, v, f, S), b = x;
	}
	if (!J(y) || !G(v)) return r ? -1 : c;
	let C = `${v}__${c}`;
	yt(d) || (C = `${C}__${JSON.stringify(d)}`);
	let w = s.get(C);
	return w || (w = new Intl.DateTimeFormat(v, V({}, y, d)), s.set(C, w)), m ? w.formatToParts(l) : w.format(l);
}
var li = [
	"localeMatcher",
	"weekday",
	"era",
	"year",
	"month",
	"day",
	"hour",
	"minute",
	"second",
	"timeZoneName",
	"formatMatcher",
	"hour12",
	"timeZone",
	"dateStyle",
	"timeStyle",
	"calendar",
	"dayPeriod",
	"numberingSystem",
	"hourCycle",
	"fractionalSecondDigits"
];
function ui(...e) {
	let [t, n, r, i] = e, a = H(), o = H(), s;
	if (G(t)) {
		let e = t.match(/(\d{4}-\d{2}-\d{2})(T|\s)?(.*)/);
		if (!e) throw mr(pr.INVALID_ISO_DATE_ARGUMENT);
		let n = e[3] ? e[3].trim().startsWith("T") ? `${e[1].trim()}${e[3].trim()}` : `${e[1].trim()}T${e[3].trim()}` : e[1].trim();
		s = new Date(n);
		try {
			s.toISOString();
		} catch {
			throw mr(pr.INVALID_ISO_DATE_ARGUMENT);
		}
	} else if (_t(t)) {
		if (isNaN(t.getTime())) throw mr(pr.INVALID_DATE_ARGUMENT);
		s = t;
	} else if (B(t)) s = t;
	else throw mr(pr.INVALID_ARGUMENT);
	return G(n) ? a.key = n : J(n) && Object.keys(n).forEach((e) => {
		li.includes(e) ? o[e] = n[e] : a[e] = n[e];
	}), G(r) ? a.locale = r : J(r) && (o = r), J(i) && (o = i), [
		a.key || "",
		s,
		a,
		o
	];
}
function di(e, t, n) {
	let r = e;
	for (let e in n) {
		let n = `${t}__${e}`;
		r.__datetimeFormatters.has(n) && r.__datetimeFormatters.delete(n);
	}
}
function fi(e, ...t) {
	let { numberFormats: n, unresolving: r, fallbackLocale: i, onWarn: a, localeFallbacker: o } = e, { __numberFormatters: s } = e;
	if (process.env.NODE_ENV !== "production" && !si.numberFormat) return a(Fr(X.CANNOT_FORMAT_NUMBER)), "";
	if (!B(t[0])) return process.env.NODE_ENV !== "production" && a(Fr(X.INVALID_NUMBER_ARGUMENT, { value: String(t[0]) })), "";
	let [c, l, u, d] = mi(...t), f = K(u.missingWarn) ? u.missingWarn : e.missingWarn, p = K(u.fallbackWarn) ? u.fallbackWarn : e.fallbackWarn, m = !!u.part, h = gr(e, u), g = o(e, i, h);
	if (!G(c) || c === "") {
		let e = new Intl.NumberFormat(h.replace(/!/g, ""), d);
		return m ? e.formatToParts(l) : e.format(l);
	}
	let _ = {}, v, y = null, b = h, x = null, S = "number format";
	for (let t = 0; t < g.length; t++) {
		if (v = x = g[t], process.env.NODE_ENV !== "production" && h !== v && ei(p, c) && a(Fr(X.FALLBACK_TO_NUMBER_FORMAT, {
			key: c,
			target: v
		})), process.env.NODE_ENV !== "production" && h !== v) {
			let t = e.__v_emitter;
			t && t.emit("fallback", {
				type: S,
				key: c,
				from: b,
				to: x,
				groupId: `${S}:${c}`
			});
		}
		if (_ = n[v] || {}, y = _[c], J(y)) break;
		ni(e, c, v, f, S), b = x;
	}
	if (!J(y) || !G(v)) return r ? -1 : c;
	let C = `${v}__${c}`;
	yt(d) || (C = `${C}__${JSON.stringify(d)}`);
	let w = s.get(C);
	return w || (w = new Intl.NumberFormat(v, V({}, y, d)), s.set(C, w)), m ? w.formatToParts(l) : w.format(l);
}
var pi = [
	"localeMatcher",
	"style",
	"currency",
	"currencyDisplay",
	"currencySign",
	"useGrouping",
	"minimumIntegerDigits",
	"minimumFractionDigits",
	"maximumFractionDigits",
	"minimumSignificantDigits",
	"maximumSignificantDigits",
	"compactDisplay",
	"notation",
	"signDisplay",
	"unit",
	"unitDisplay",
	"roundingMode",
	"roundingPriority",
	"roundingIncrement",
	"trailingZeroDisplay"
];
function mi(...e) {
	let [t, n, r, i] = e, a = H(), o = H();
	if (!B(t)) throw mr(pr.INVALID_ARGUMENT);
	let s = t;
	return G(n) ? a.key = n : J(n) && Object.keys(n).forEach((e) => {
		pi.includes(e) ? o[e] = n[e] : a[e] = n[e];
	}), G(r) ? a.locale = r : J(r) && (o = r), J(i) && (o = i), [
		a.key || "",
		s,
		a,
		o
	];
}
function hi(e, t, n) {
	let r = e;
	for (let e in n) {
		let n = `${t}__${e}`;
		r.__numberFormatters.has(n) && r.__numberFormatters.delete(n);
	}
}
var gi = (e) => e, _i = (e) => "", vi = "text", yi = (e) => e.length === 0 ? "" : Lt(e), bi = It;
function xi(e, t) {
	return e = Math.abs(e), t === 2 ? e === 1 ? 0 : 1 : Math.min(e, 2);
}
function Si(e) {
	let t = B(e.pluralIndex) ? e.pluralIndex : -1;
	return B(e.named?.count) ? e.named.count : B(e.named?.n) ? e.named.n : t;
}
function Ci(e = {}) {
	let t = e.locale, n = Si(e), r = G(t) && W(e.pluralRules?.[t]) ? e.pluralRules[t] : xi, i = r === xi ? void 0 : xi, a = (e) => e[r(n, e.length, i)], o = e.list || [], s = (e) => o[e], c = e.named || H();
	B(e.pluralIndex) && (c.count ||= e.pluralIndex, c.n ||= e.pluralIndex);
	let l = (e) => c[e];
	function u(t, n) {
		return (W(e.messages) ? e.messages(t, !!n) : q(e.messages) ? e.messages[t] : !1) || (e.parent ? e.parent.message(t) : _i);
	}
	let d = (t) => e.modifiers ? e.modifiers[t] : gi, f = W(e.processor?.normalize) ? e.processor.normalize : yi, p = W(e.processor?.interpolate) ? e.processor.interpolate : bi, m = {
		list: s,
		named: l,
		plural: a,
		linked: (e, ...t) => {
			let [n, r] = t, i = "text", a = "";
			t.length === 1 ? q(n) ? (a = n.modifier || a, i = n.type || i) : G(n) && (a = n || a) : t.length === 2 && (G(n) && (a = n || a), G(r) && (i = r || i));
			let o = u(e, !0)(m), s = o === "" || o === void 0 ? e : o, c = i === "vnode" && U(s) && a ? s[0] : s;
			return a ? d(a)(c, i) : c;
		},
		message: u,
		type: G(e.processor?.type) ? e.processor.type : vi,
		interpolate: p,
		normalize: f,
		values: V(H(), o, c)
	};
	return m;
}
var wi = () => "", Ti = (e) => W(e);
function Ei(e, ...t) {
	let { fallbackFormat: n, postTranslation: r, unresolving: i, messageCompiler: a, fallbackLocale: o, messages: s } = e, [c, l] = ji(...t), u = K(l.missingWarn) ? l.missingWarn : e.missingWarn, d = K(l.fallbackWarn) ? l.fallbackWarn : e.fallbackWarn, f = K(l.escapeParameter) ? l.escapeParameter : e.escapeParameter, p = !!l.resolvedMessage, m = G(l.default) || K(l.default) ? K(l.default) ? a ? c : () => c : l.default : n ? a ? c : () => c : null, h = n || m != null && (G(m) || W(m)), g = gr(e, l);
	f && Di(l);
	let [_, v, y] = p ? [
		c,
		g,
		s[g] || H()
	] : Oi(e, c, g, o, d, u), b = _, x = c;
	if (!p && !(G(b) || Mn(b) || Ti(b)) && h && (b = m, x = b), !p && (!(G(b) || Mn(b) || Ti(b)) || !G(v))) return i ? -1 : c;
	if (process.env.NODE_ENV !== "production" && G(b) && e.messageCompiler == null) return ot(`The message format compilation is not supported in this build. Because message compiler isn't included. You need to pre-compilation all message format. So translate function return '${c}'.`), c;
	let S = !1, C = Ti(b) ? b : ki(e, c, v, b, x, () => {
		S = !0;
	});
	if (S) return b;
	let w = Ai(e, C, Ci(Pi(e, v, y, l))), T = r ? r(w, c) : w;
	if (f && G(T) && (T = At(T)), process.env.NODE_ENV !== "production" || __INTLIFY_PROD_DEVTOOLS__) {
		let t = {
			timestamp: Date.now(),
			key: G(c) ? c : Ti(b) ? b.key : "",
			locale: v || (Ti(b) ? b.locale : ""),
			format: G(b) ? b : Ti(b) ? b.source : "",
			message: T
		};
		t.meta = V({}, e.__meta, /* @__PURE__ */ qr() || {}), dr(t);
	}
	return T;
}
function Di(e) {
	U(e.list) ? e.list = e.list.map((e) => G(e) ? Ct(e) : e) : q(e.named) && Object.keys(e.named).forEach((t) => {
		G(e.named[t]) && (e.named[t] = Ct(e.named[t]));
	});
}
function Oi(e, t, n, r, i, a) {
	let { messages: o, onWarn: s, messageResolver: c, localeFallbacker: l } = e, u = l(e, r, n), d = H(), f, p = null, m = n, h = null, g = "translate";
	for (let r = 0; r < u.length; r++) {
		f = h = u[r], process.env.NODE_ENV !== "production" && n !== f && !ii(n, f) && ei(i, t) && s(Fr(X.FALLBACK_TO_TRANSLATE, {
			key: t,
			target: f
		}));
		let l = process.env.NODE_ENV === "production" ? void 0 : e.__v_emitter;
		process.env.NODE_ENV !== "production" && n !== f && l && l.emit("fallback", {
			type: g,
			key: t,
			from: m,
			to: h,
			groupId: `${g}:${t}`
		}), d = o[f] || H();
		let _ = null, v, y;
		if (process.env.NODE_ENV !== "production" && lt && l && (_ = window.performance.now(), v = "intlify-message-resolve-start", y = "intlify-message-resolve-end", ut && ut(v)), (p = c(d, t)) === null && (p = d[t]), process.env.NODE_ENV !== "production" && lt && l) {
			let e = window.performance.now();
			l && _ && p && l.emit("message-resolve", {
				type: "message-resolve",
				key: t,
				message: p,
				time: e - _,
				groupId: `${g}:${t}`
			}), v && y && ut && dt && (ut(y), dt("intlify message resolve", v, y));
		}
		if (G(p) || Mn(p) || Ti(p)) break;
		if (!ai(f, u)) {
			let n = ni(e, t, f, a, g);
			n !== t && (p = n);
		}
		m = h;
	}
	return [
		p,
		f,
		d
	];
}
function ki(e, t, n, r, i, a) {
	let { messageCompiler: o, warnHtmlMessage: s } = e;
	if (Ti(r)) {
		let e = r;
		return e.locale = e.locale || n, e.key = e.key || t, e;
	}
	if (o == null) {
		let e = (() => r);
		return e.locale = n, e.key = t, e;
	}
	let c = process.env.NODE_ENV === "production" ? void 0 : e.__v_emitter, l = null, u, d;
	process.env.NODE_ENV !== "production" && lt && c && (l = window.performance.now(), u = "intlify-message-compilation-start", d = "intlify-message-compilation-end", ut && ut(u));
	let f = o(r, Mi(e, n, i, r, s, a));
	if (process.env.NODE_ENV !== "production" && lt && c) {
		let e = window.performance.now();
		c && l && c.emit("message-compilation", {
			type: "message-compilation",
			message: r,
			time: e - l,
			groupId: `translate:${t}`
		}), u && d && ut && dt && (ut(d), dt("intlify message compilation", u, d));
	}
	return f.locale = n, f.key = t, f.source = r, f;
}
function Ai(e, t, n) {
	let r = process.env.NODE_ENV === "production" ? void 0 : e.__v_emitter, i = null, a, o;
	process.env.NODE_ENV !== "production" && lt && r && (i = window.performance.now(), a = "intlify-message-evaluation-start", o = "intlify-message-evaluation-end", ut && ut(a));
	let s = t(n);
	if (process.env.NODE_ENV !== "production" && lt && r) {
		let e = window.performance.now();
		r && i && r.emit("message-evaluation", {
			type: "message-evaluation",
			value: s,
			time: e - i,
			groupId: `translate:${t.key}`
		}), a && o && ut && dt && (ut(o), dt("intlify message evaluation", a, o));
	}
	return s;
}
function ji(...e) {
	let [t, n, r] = e, i = H();
	if (!G(t) && !B(t) && !Ti(t) && !Mn(t)) throw mr(pr.INVALID_ARGUMENT);
	let a = B(t) ? String(t) : (Ti(t), t);
	return B(n) ? i.plural = n : G(n) ? i.default = n : J(n) && !yt(n) ? i.named = n : U(n) && (i.list = n), B(r) ? i.plural = r : G(r) ? i.default = r : J(r) && V(i, r), [a, i];
}
function Mi(e, t, n, r, i, a) {
	return {
		locale: t,
		key: n,
		warnHtmlMessage: i,
		onError: (t) => {
			if (a && a(t), process.env.NODE_ENV !== "production") {
				let i = Ni(r), a = t.location && i && zt(i, t.location.start.offset, t.location.end.offset), o = e.__v_emitter;
				o && i && o.emit("compile-error", {
					message: i,
					error: t.message,
					start: t.location && t.location.start.offset,
					end: t.location && t.location.end.offset,
					groupId: `translate:${n}`
				});
				let s = `Message compilation error: ${t.message}`;
				throw SyntaxError(a ? `${s}\n${a}` : s);
			}
			throw t;
		},
		onCacheKey: (e) => ht(t, n, e)
	};
}
function Ni(e) {
	if (G(e)) return e;
	if (e.loc && e.loc.source) return e.loc.source;
}
function Pi(e, t, n, r) {
	let { modifiers: i, pluralRules: a, messageResolver: o, fallbackLocale: s, fallbackWarn: c, missingWarn: l, fallbackContext: u } = e, d = {
		locale: t,
		modifiers: i,
		pluralRules: a,
		messages: (r, i) => {
			let a = o(n, r);
			if (a == null && (u || i)) {
				let [n, , i] = Oi(u || e, r, t, s, c, l);
				a = n ?? o(i, r);
			}
			if (G(a) || Mn(a)) {
				let n = !1, i = ki(e, r, t, a, r, () => {
					n = !0;
				});
				return n ? wi : i;
			} else if (Ti(a)) return a;
			else return wi;
		}
	};
	return e.processor && (d.processor = e.processor), r.list && (d.list = r.list), r.named && (d.named = r.named), B(r.plural) && (d.pluralIndex = r.plural), d;
}
jn();
//#endregion
//#region node_modules/.pnpm/vue-i18n@11.4.6_vue@3.5.39_typescript@6.0.3_/node_modules/vue-i18n/dist/vue-i18n.mjs
var Fi = "11.4.6";
function Ii() {
	typeof __VUE_I18N_FULL_INSTALL__ != "boolean" && (St().__VUE_I18N_FULL_INSTALL__ = !0), typeof __VUE_I18N_LEGACY_API__ != "boolean" && (St().__VUE_I18N_LEGACY_API__ = !0), typeof __INTLIFY_DROP_MESSAGE_COMPILER__ != "boolean" && (St().__INTLIFY_DROP_MESSAGE_COMPILER__ = !1), typeof __INTLIFY_PROD_DEVTOOLS__ != "boolean" && (St().__INTLIFY_PROD_DEVTOOLS__ = !1);
}
var Li = {
	UNEXPECTED_RETURN_TYPE: 24,
	INVALID_ARGUMENT: 25,
	MUST_BE_CALL_SETUP_TOP: 26,
	NOT_INSTALLED: 27,
	REQUIRED_VALUE: 28,
	INVALID_VALUE: 29,
	CANNOT_SETUP_VUE_DEVTOOLS_PLUGIN: 30,
	NOT_INSTALLED_WITH_PROVIDE: 31,
	UNEXPECTED_ERROR: 32,
	NOT_COMPATIBLE_LEGACY_VUE_I18N: 33,
	NOT_AVAILABLE_COMPOSITION_IN_LEGACY: 34
};
function Ri(e, ...t) {
	return Kt(e, null, process.env.NODE_ENV === "production" ? void 0 : {
		messages: zi,
		args: t
	});
}
var zi = {
	[Li.UNEXPECTED_RETURN_TYPE]: "Unexpected return type in composer",
	[Li.INVALID_ARGUMENT]: "Invalid argument",
	[Li.MUST_BE_CALL_SETUP_TOP]: "Must be called at the top of a `setup` function",
	[Li.NOT_INSTALLED]: "Need to install with `app.use` function",
	[Li.UNEXPECTED_ERROR]: "Unexpected error",
	[Li.REQUIRED_VALUE]: "Required in value: {0}",
	[Li.INVALID_VALUE]: "Invalid value",
	[Li.CANNOT_SETUP_VUE_DEVTOOLS_PLUGIN]: "Cannot setup vue-devtools plugin",
	[Li.NOT_INSTALLED_WITH_PROVIDE]: "Need to install with `provide` function",
	[Li.NOT_COMPATIBLE_LEGACY_VUE_I18N]: "Not compatible legacy VueI18n.",
	[Li.NOT_AVAILABLE_COMPOSITION_IN_LEGACY]: "Not available Compostion API in Legacy API mode. Please make sure that the legacy API mode is working properly"
}, Bi = /* #__PURE__*/ mt("__translateVNode"), Vi = /* #__PURE__*/ mt("__datetimeParts"), Hi = /* #__PURE__*/ mt("__numberParts"), Ui = /* #__PURE__*/ mt("__enableEmitter"), Wi = /* #__PURE__*/ mt("__disableEmitter"), Gi = mt("__setPluralRules");
mt("__intlifyMeta");
var Ki = /* #__PURE__*/ mt("__injectWithOption"), qi = /* #__PURE__*/ mt("__dispose"), Ji = {
	FALLBACK_TO_ROOT: 10,
	NOT_FOUND_PARENT_SCOPE: 11,
	IGNORE_OBJ_FLATTEN: 12,
	DEPRECATE_LEGACY_MODE: 13,
	DEPRECATE_TRANSLATE_CUSTOME_DIRECTIVE: 14,
	DUPLICATE_USE_I18N_CALLING: 15
}, Yi = {
	[Ji.FALLBACK_TO_ROOT]: "Fall back to {type} '{key}' with root locale.",
	[Ji.NOT_FOUND_PARENT_SCOPE]: "Not found parent scope. use the global scope.",
	[Ji.IGNORE_OBJ_FLATTEN]: "Ignore object flatten: '{key}' key has an string value",
	[Ji.DEPRECATE_LEGACY_MODE]: "Legacy API mode has been deprecated in v11. Use Composition API mode instead.\nAbout how to use the Composition API mode, see https://vue-i18n.intlify.dev/guide/advanced/composition.html",
	[Ji.DEPRECATE_TRANSLATE_CUSTOME_DIRECTIVE]: "'v-t' has been deprecated in v11. Use translate APIs ('t' or '$t') instead.",
	[Ji.DUPLICATE_USE_I18N_CALLING]: "Duplicate `useI18n` calling by local scope. Please don't call it on local scope, due to it does not work properly in component."
};
function Xi(e, ...t) {
	return pt(Yi[e], ...t);
}
function Zi(e) {
	if (!q(e) || Mn(e)) return e;
	for (let t in e) if (Mt(e, t)) if (!t.includes(".")) q(e[t]) && Zi(e[t]);
	else {
		let n = t.split("."), r = n.length - 1, i = e, a = !1;
		for (let e = 0; e < r; e++) {
			if (n[e] === "__proto__") throw Error(`unsafe key: ${n[e]}`);
			if (n[e] in i || (i[n[e]] = H()), !q(i[n[e]])) {
				process.env.NODE_ENV !== "production" && ot(Xi(Ji.IGNORE_OBJ_FLATTEN, { key: n[e] })), a = !0;
				break;
			}
			i = i[n[e]];
		}
		if (a || (Mn(i) ? Xn.includes(n[r]) || delete e[t] : (i[n[r]] = e[t], delete e[t])), !Mn(i)) {
			let e = i[n[r]];
			q(e) && Zi(e);
		}
	}
	return e;
}
function Qi(e, t) {
	let { messages: n, __i18n: r, messageResolver: i, flatJson: a } = t, o = J(n) ? n : U(r) ? H() : { [e]: H() };
	if (U(r) && r.forEach((e) => {
		if ("locale" in e && "resource" in e) {
			let { locale: t, resource: n } = e;
			t ? (o[t] = o[t] || H(), Ht(n, o[t])) : Ht(n, o);
		} else G(e) && Ht(JSON.parse(e), o);
	}), i == null && a) for (let e in o) Mt(o, e) && Zi(o[e]);
	return o;
}
function $i(e) {
	return e.type;
}
function ea(e, t, n) {
	let r = q(t.messages) ? t.messages : H();
	"__i18nGlobal" in n && (r = Qi(e.locale.value, {
		messages: r,
		__i18n: n.__i18nGlobal
	}));
	let i = Object.keys(r);
	if (i.length && i.forEach((t) => {
		e.mergeLocaleMessage(t, r[t]);
	}), q(t.datetimeFormats)) {
		let n = Object.keys(t.datetimeFormats);
		n.length && n.forEach((n) => {
			e.mergeDateTimeFormat(n, t.datetimeFormats[n]);
		});
	}
	if (q(t.numberFormats)) {
		let n = Object.keys(t.numberFormats);
		n.length && n.forEach((n) => {
			e.mergeNumberFormat(n, t.numberFormats[n]);
		});
	}
}
function ta(e) {
	return s(n, null, e, 0);
}
function na() {
	let t = "currentInstance";
	return t in e ? e[t] : e.getCurrentInstance();
}
var ra = () => [], ia = () => !1, aa = 0;
function oa(e) {
	return ((t, n, r, i) => e(n, r, na() || void 0, i));
}
function sa(e = {}) {
	let { __root: t, __injectWithOption: n } = e, i = t === void 0, a = e.flatJson, o = lt ? T : k, s = !K(e.inheritLocale) || e.inheritLocale, c = o(t && s ? t.locale.value : G(e.locale) ? e.locale : Lr), l = o(t && s ? t.fallbackLocale.value : G(e.fallbackLocale) || U(e.fallbackLocale) || J(e.fallbackLocale) || e.fallbackLocale === !1 ? e.fallbackLocale : c.value), u = o(Qi(c.value, e)), d = o(J(e.datetimeFormats) ? e.datetimeFormats : { [c.value]: {} }), f = o(J(e.numberFormats) ? e.numberFormats : { [c.value]: {} }), p = t ? t.missingWarn : K(e.missingWarn) || vt(e.missingWarn) ? e.missingWarn : !0, m = t ? t.fallbackWarn : K(e.fallbackWarn) || vt(e.fallbackWarn) ? e.fallbackWarn : !0, h = t ? t.fallbackRoot : !K(e.fallbackRoot) || e.fallbackRoot, g = !!e.fallbackFormat, _ = W(e.missing) ? e.missing : null, v = W(e.missing) ? oa(e.missing) : null, y = W(e.postTranslation) ? e.postTranslation : null, b = t ? t.warnHtmlMessage : !K(e.warnHtmlMessage) || e.warnHtmlMessage, x = !!e.escapeParameter, S = t ? t.modifiers : J(e.modifiers) ? e.modifiers : {}, C = e.pluralRules || t && t.pluralRules, w;
	w = (() => {
		i && Yr(null);
		let t = {
			version: Fi,
			locale: c.value,
			fallbackLocale: l.value,
			messages: u.value,
			modifiers: S,
			pluralRules: C,
			missing: v === null ? void 0 : v,
			missingWarn: p,
			fallbackWarn: m,
			fallbackFormat: g,
			unresolving: !0,
			postTranslation: y === null ? void 0 : y,
			warnHtmlMessage: b,
			escapeParameter: x,
			messageResolver: e.messageResolver,
			messageCompiler: e.messageCompiler,
			__meta: { framework: "vue" }
		};
		t.datetimeFormats = d.value, t.numberFormats = f.value, t.__datetimeFormatters = J(w) ? w.__datetimeFormatters : void 0, t.__numberFormatters = J(w) ? w.__numberFormatters : void 0, process.env.NODE_ENV !== "production" && (t.__v_emitter = J(w) ? w.__v_emitter : void 0);
		let n = Qr(t);
		return i && Yr(n), n;
	})(), ri(w, c.value, l.value);
	function E() {
		return [
			c.value,
			l.value,
			u.value,
			d.value,
			f.value
		];
	}
	let D = r({
		get: () => c.value,
		set: (e) => {
			w.locale = e, c.value = e;
		}
	}), O = r({
		get: () => l.value,
		set: (e) => {
			w.fallbackLocale = e, l.value = e, ri(w, c.value, e);
		}
	}), A = r(() => u.value), j = /* #__PURE__*/ r(() => d.value), M = /* #__PURE__*/ r(() => f.value);
	function N() {
		return W(y) ? y : null;
	}
	function F(e) {
		y = e, w.postTranslation = e;
	}
	function ee() {
		return _;
	}
	function te(e) {
		e !== null && (v = oa(e)), _ = e, w.missing = v;
	}
	function I(e, t) {
		return e !== "translate" || !t.resolvedMessage;
	}
	let ne = (e, n, r, a, o, s) => {
		E();
		let c;
		try {
			process.env.NODE_ENV !== "production" || __INTLIFY_PROD_DEVTOOLS__, i || (w.fallbackContext = t ? Xr() : void 0), c = e(w);
		} finally {
			process.env.NODE_ENV !== "production" || __INTLIFY_PROD_DEVTOOLS__, i || (w.fallbackContext = void 0);
		}
		if (r !== "translate exists" && B(c) && c === -1 || r === "translate exists" && !c) {
			let [e, i] = n();
			if (process.env.NODE_ENV !== "production" && t && G(e) && I(r, i) && (h && (ei(m, e) || ti(p, e)) && ot(Xi(Ji.FALLBACK_TO_ROOT, {
				key: e,
				type: r
			})), process.env.NODE_ENV !== "production")) {
				let { __v_emitter: t } = w;
				t && h && t.emit("fallback", {
					type: r,
					key: e,
					to: "global",
					groupId: `${r}:${e}`
				});
			}
			return t && h ? a(t) : o(e);
		} else if (s(c)) return c;
		else
 /* istanbul ignore next */
		throw Ri(Li.UNEXPECTED_RETURN_TYPE);
	};
	function re(...e) {
		return ne((t) => Reflect.apply(Ei, null, [t, ...e]), () => ji(...e), "translate", (t) => Reflect.apply(t.t, t, [...e]), (e) => e, (e) => G(e));
	}
	function ie(...e) {
		let [t, n, r] = e;
		if (r && !q(r)) throw Ri(Li.INVALID_ARGUMENT);
		return re(t, n, V({ resolvedMessage: !0 }, r || {}));
	}
	function ae(...e) {
		return ne((t) => Reflect.apply(ci, null, [t, ...e]), () => ui(...e), "datetime format", (t) => Reflect.apply(t.d, t, [...e]), () => "", (e) => G(e) || U(e));
	}
	function oe(...e) {
		return ne((t) => Reflect.apply(fi, null, [t, ...e]), () => mi(...e), "number format", (t) => Reflect.apply(t.n, t, [...e]), () => "", (e) => G(e) || U(e));
	}
	function L(e) {
		return e.map((e) => G(e) || B(e) || K(e) ? ta(String(e)) : e);
	}
	let se = {
		normalize: L,
		interpolate: (e) => e,
		type: "vnode"
	};
	function ce(...e) {
		return ne((t) => {
			let n, r = t;
			try {
				r.processor = se, n = Reflect.apply(Ei, null, [r, ...e]);
			} finally {
				r.processor = null;
			}
			return n;
		}, () => ji(...e), "translate", (t) => t[Bi](...e), (e) => [ta(e)], (e) => U(e));
	}
	function le(...e) {
		return ne((t) => Reflect.apply(fi, null, [t, ...e]), () => mi(...e), "number format", (t) => t[Hi](...e), ra, (e) => G(e) || U(e));
	}
	function ue(...e) {
		return ne((t) => Reflect.apply(ci, null, [t, ...e]), () => ui(...e), "datetime format", (t) => t[Vi](...e), ra, (e) => G(e) || U(e));
	}
	function de(e) {
		C = e, w.pluralRules = C;
	}
	function fe(e, t) {
		return ne(() => {
			if (!e) return !1;
			let n = G(t) ? t : c.value, r = G(t) ? [n] : br(w, l.value, n);
			for (let t = 0; t < r.length; t++) {
				let n = he(r[t]), i = w.messageResolver(n, e);
				if (i === null && (i = n[e]), Mn(i) || Ti(i) || G(i)) return !0;
			}
			return !1;
		}, () => [e], "translate exists", (n) => Reflect.apply(n.te, n, [e, t]), ia, (e) => K(e));
	}
	function pe(e) {
		let t = null, n = br(w, l.value, c.value);
		for (let r = 0; r < n.length; r++) {
			let i = u.value[n[r]] || {}, a = w.messageResolver(i, e);
			if (a != null) {
				t = a;
				break;
			}
		}
		return t;
	}
	function me(e) {
		return pe(e) ?? (t && t.tm(e) || {});
	}
	function he(e) {
		return u.value[e] || {};
	}
	function ge(e, t) {
		if (a) {
			let n = { [e]: t };
			for (let e in n) Mt(n, e) && Zi(n[e]);
			t = n[e];
		}
		u.value[e] = t, w.messages = u.value;
	}
	function _e(e, t) {
		u.value[e] = u.value[e] || {};
		let n = { [e]: t };
		if (a) for (let e in n) Mt(n, e) && Zi(n[e]);
		t = n[e], Ht(t, u.value[e]), w.messages = u.value;
	}
	function ve(e) {
		return d.value[e] || {};
	}
	function ye(e, t) {
		d.value[e] = t, w.datetimeFormats = d.value, di(w, e, t);
	}
	function be(e, t) {
		d.value[e] = V(d.value[e] || {}, t), w.datetimeFormats = d.value, di(w, e, t);
	}
	function xe(e) {
		return f.value[e] || {};
	}
	function Se(e, t) {
		f.value[e] = t, w.numberFormats = f.value, hi(w, e, t);
	}
	function Ce(e, t) {
		f.value[e] = V(f.value[e] || {}, t), w.numberFormats = f.value, hi(w, e, t);
	}
	aa++, t && lt && (P(t.locale, (e) => {
		s && (c.value = e, w.locale = e, ri(w, c.value, l.value));
	}), P(t.fallbackLocale, (e) => {
		s && (l.value = e, w.fallbackLocale = e, ri(w, c.value, l.value));
	}));
	let R = {
		id: aa,
		locale: D,
		fallbackLocale: O,
		get inheritLocale() {
			return s;
		},
		set inheritLocale(e) {
			s = e, e && t && (c.value = t.locale.value, l.value = t.fallbackLocale.value, ri(w, c.value, l.value));
		},
		get availableLocales() {
			return Object.keys(u.value).sort();
		},
		messages: A,
		get modifiers() {
			return S;
		},
		get pluralRules() {
			return C || {};
		},
		get isGlobal() {
			return i;
		},
		get missingWarn() {
			return p;
		},
		set missingWarn(e) {
			p = e, w.missingWarn = p;
		},
		get fallbackWarn() {
			return m;
		},
		set fallbackWarn(e) {
			m = e, w.fallbackWarn = m;
		},
		get fallbackRoot() {
			return h;
		},
		set fallbackRoot(e) {
			h = e;
		},
		get fallbackFormat() {
			return g;
		},
		set fallbackFormat(e) {
			g = e, w.fallbackFormat = g;
		},
		get warnHtmlMessage() {
			return b;
		},
		set warnHtmlMessage(e) {
			b = e, w.warnHtmlMessage = e;
		},
		get escapeParameter() {
			return x;
		},
		set escapeParameter(e) {
			x = e, w.escapeParameter = e;
		},
		t: re,
		getLocaleMessage: he,
		setLocaleMessage: ge,
		mergeLocaleMessage: _e,
		getPostTranslationHandler: N,
		setPostTranslationHandler: F,
		getMissingHandler: ee,
		setMissingHandler: te,
		[Gi]: de
	};
	return R.datetimeFormats = j, R.numberFormats = M, R.rt = ie, R.te = fe, R.tm = me, R.d = ae, R.n = oe, R.getDateTimeFormat = ve, R.setDateTimeFormat = ye, R.mergeDateTimeFormat = be, R.getNumberFormat = xe, R.setNumberFormat = Se, R.mergeNumberFormat = Ce, R[Ki] = n, R[Bi] = ce, R[Vi] = ue, R[Hi] = le, process.env.NODE_ENV !== "production" && (R[Ui] = (e) => {
		w.__v_emitter = e;
	}, R[Wi] = () => {
		w.__v_emitter = void 0;
	}), R;
}
var ca;
function la(e, t) {
	if (ca) {
		let n;
		t && "groupId" in t && (n = t.groupId, delete t.groupId), ca.addTimelineEvent({
			layerId: "vue-i18n-timeline",
			event: {
				title: e,
				groupId: n,
				time: Date.now(),
				meta: {},
				data: t || {},
				logType: e === "compile-error" ? "error" : e === "fallback" || e === "missing" ? "warning" : "default"
			}
		});
	}
}
var ua = {
	tag: { type: [String, Object] },
	locale: { type: String },
	scope: {
		type: String,
		validator: (e) => e === "parent" || e === "global",
		default: "parent"
	},
	i18n: { type: Object }
};
V({
	keypath: {
		type: String,
		required: !0
	},
	plural: {
		type: [Number, String],
		validator: (e) => B(e) || !isNaN(e)
	}
}, ua), V({
	value: {
		type: Number,
		required: !0
	},
	format: { type: [String, Object] }
}, ua);
var da = /* #__PURE__*/ mt("global-vue-i18n");
function fa(e = {}) {
	let t = na();
	if (t == null) throw Ri(Li.MUST_BE_CALL_SETUP_TOP);
	if (!t.isCE && t.appContext.app != null && !t.appContext.app.__VUE_I18N_SYMBOL__) throw Ri(Li.NOT_INSTALLED);
	let n = pa(t), r = ha(n), i = $i(t), a = ma(e, i);
	if (a === "global") return ea(r, e, i), r;
	if (a === "parent") {
		let i = ga(n, t, e.__useComponent);
		return i ??= (process.env.NODE_ENV !== "production" && ot(Xi(Ji.NOT_FOUND_PARENT_SCOPE)), r), i;
	}
	if (a === "isolated") {
		if (n.mode !== "composition") throw Ri(Li.NOT_AVAILABLE_COMPOSITION_IN_LEGACY);
		let i = n, a = V({}, e);
		a.__root = ga(n, t) || r;
		let o = sa(a);
		i.__composerExtend && (o[qi] = i.__composerExtend(o));
		let s = null;
		if (process.env.NODE_ENV !== "production") {
			s = Bt();
			let e = o;
			e[Ui] && e[Ui](s), s.on("*", la);
		}
		return f() && x(() => {
			if (process.env.NODE_ENV !== "production") {
				s && s.off("*", la);
				let e = o;
				e[Wi] && e[Wi]();
			}
			let e = o[qi];
			e && (e(), delete o[qi]);
		}), o;
	}
	let o = n, s = o.__getInstance(t);
	if (s == null) {
		let n = V({}, e);
		"__i18n" in i && (n.__i18n = i.__i18n), r && (n.__root = r), s = sa(n), o.__composerExtend && (s[qi] = o.__composerExtend(s)), va(o, t, s), o.__setInstance(t, s);
	} else process.env.NODE_ENV !== "production" && a === "local" && ot(Xi(Ji.DUPLICATE_USE_I18N_CALLING));
	return s;
}
function pa(e) {
	let t = m(e.isCE ? da : e.appContext.app.__VUE_I18N_SYMBOL__);
	/* istanbul ignore if */
	if (!t) throw Ri(e.isCE ? Li.NOT_INSTALLED_WITH_PROVIDE : Li.UNEXPECTED_ERROR);
	return t;
}
function ma(e, t) {
	return yt(e) ? "__i18n" in t ? "local" : "global" : e.useScope ? e.useScope : "local";
}
function ha(e) {
	return e.mode === "composition" ? e.global : e.global.__composer;
}
function ga(e, t, n = !1) {
	let r = null, i = t.root, a = _a(t, n);
	for (; a != null;) {
		let t = e;
		if (e.mode === "composition") r = t.__getInstance(a);
		else if (__VUE_I18N_LEGACY_API__) {
			let e = t.__getInstance(a);
			e != null && (r = e.__composer, n && r && !r[Ki] && (r = null));
		}
		if (r != null || i === a) break;
		a = a.parent;
	}
	return r;
}
function _a(e, t = !1) {
	return e == null ? null : t && e.vnode.ctx || e.parent;
}
function va(e, t, n) {
	let r = null;
	b(() => {
		if (process.env.NODE_ENV !== "production") {
			t.__VUE_I18N__ = n, r = Bt();
			let e = n;
			e[Ui] && e[Ui](r), r.on("*", la);
		}
	}, t), S(() => {
		let i = n;
		process.env.NODE_ENV !== "production" && (r && r.off("*", la), i[Wi] && i[Wi](), delete t.__VUE_I18N__), e.__deleteInstance(t);
		let a = i[qi];
		a && (a(), delete i[qi]);
	}, t);
}
if (V({
	value: {
		type: [Number, Date],
		required: !0
	},
	format: { type: [String, Object] }
}, ua), Ii(), Vr(sr), Ur(Nr), Gr(br), process.env.NODE_ENV !== "production" || __INTLIFY_PROD_DEVTOOLS__) {
	let e = St();
	e.__INTLIFY__ = !0, lr(e.__INTLIFY_DEVTOOLS_GLOBAL_HOOK__);
}
process.env.NODE_ENV, rt.default.extend(it.default), rt.default.extend(at.default);
function ya() {
	let { t: e } = fa(), t = (t, n) => {
		if (!t) return "";
		let r = (0, rt.default)(t.toString());
		return r.isValid() ? r.format(e(n)) : "";
	}, n = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d+)?(Z|[+-]\d{2}:\d{2})$/;
	return {
		toDate: t,
		toDateISO: (t, r) => {
			let i = t?.toString() || "";
			if (!i) return "";
			if (n.test(i)) return (0, rt.default)(i).isValid() ? i : "";
			let a = rt.default.utc(i, e(r), !0);
			return a.isValid() ? a.toISOString() : "";
		},
		toEmptyRecord: (e) => Object.fromEntries(e.map((e) => [e.name, ""])),
		toDayJs: (e) => {
			let t = e?.toString() || "";
			if (t === "") return null;
			let n = (0, rt.default)(t);
			return n.isValid() ? n : null;
		},
		formatDate: (e, t, n) => {
			let r = e?.toString();
			if (!r) return "";
			let i = n ? (0, rt.default)(r, n, !0) : (0, rt.default)(r);
			return i.isValid() ? i.format(t) : "";
		}
	};
}
//#endregion
//#region src/services/dayjsService.ts
var ba = null;
function xa(e) {
	if (ba !== null) {
		console.warn("[LinID CoreLib] Dayjs instance has already been initialized. Re-initialization is ignored.");
		return;
	}
	ba = e;
}
function Sa() {
	if (ba === null) throw Error("[LinID CoreLib] Dayjs instance is not initialized. Call setDayjsInstance() first.");
	return ba;
}
//#endregion
//#region src/composables/useDayjs.ts
var Ca = "YYYY-MM-DD";
function wa() {
	let e = Sa();
	function t(t, n) {
		return typeof t == "string" ? e(t, n || "YYYY-MM-DD", !0) : e(t);
	}
	function n(e, n) {
		let r = e.map((e) => t(e, n)).filter((e) => e.isValid());
		return r.length === 0 ? null : r.reduce((e, t) => t.isAfter(e) ? t : e);
	}
	function r(e, n) {
		let r = e.map((e) => t(e, n)).filter((e) => e.isValid());
		return r.length === 0 ? null : r.reduce((e, t) => t.isBefore(e) ? t : e);
	}
	return {
		maxDate: n,
		minDate: r,
		toDayjs: t
	};
}
//#endregion
//#region node_modules/.pnpm/interactjs@1.10.27/node_modules/interactjs/dist/interact.min.js
var Ta = /* @__PURE__ */ oe(((e, t) => {
	(function(n, r) {
		typeof e == "object" && t !== void 0 ? t.exports = r() : typeof define == "function" && define.amd ? define(r) : (n = typeof globalThis < "u" ? globalThis : n || self).interact = r();
	})(e, (function() {
		function e(e, t) {
			var n = Object.keys(e);
			if (Object.getOwnPropertySymbols) {
				var r = Object.getOwnPropertySymbols(e);
				t && (r = r.filter((function(t) {
					return Object.getOwnPropertyDescriptor(e, t).enumerable;
				}))), n.push.apply(n, r);
			}
			return n;
		}
		function n(t) {
			for (var n = 1; n < arguments.length; n++) {
				var r = arguments[n] == null ? {} : arguments[n];
				n % 2 ? e(Object(r), !0).forEach((function(e) {
					s(t, e, r[e]);
				})) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(r)) : e(Object(r)).forEach((function(e) {
					Object.defineProperty(t, e, Object.getOwnPropertyDescriptor(r, e));
				}));
			}
			return t;
		}
		function r(e) {
			return r = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
				return typeof e;
			} : function(e) {
				return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
			}, r(e);
		}
		function i(e, t) {
			if (!(e instanceof t)) throw TypeError("Cannot call a class as a function");
		}
		function a(e, t) {
			for (var n = 0; n < t.length; n++) {
				var r = t[n];
				r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, m(r.key), r);
			}
		}
		function o(e, t, n) {
			return t && a(e.prototype, t), n && a(e, n), Object.defineProperty(e, "prototype", { writable: !1 }), e;
		}
		function s(e, t, n) {
			return (t = m(t)) in e ? Object.defineProperty(e, t, {
				value: n,
				enumerable: !0,
				configurable: !0,
				writable: !0
			}) : e[t] = n, e;
		}
		function c(e, t) {
			if (typeof t != "function" && t !== null) throw TypeError("Super expression must either be null or a function");
			e.prototype = Object.create(t && t.prototype, { constructor: {
				value: e,
				writable: !0,
				configurable: !0
			} }), Object.defineProperty(e, "prototype", { writable: !1 }), t && u(e, t);
		}
		function l(e) {
			return l = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(e) {
				return e.__proto__ || Object.getPrototypeOf(e);
			}, l(e);
		}
		function u(e, t) {
			return u = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(e, t) {
				return e.__proto__ = t, e;
			}, u(e, t);
		}
		function d(e) {
			if (e === void 0) throw ReferenceError("this hasn't been initialised - super() hasn't been called");
			return e;
		}
		function f(e) {
			var t = function() {
				if (typeof Reflect > "u" || !Reflect.construct || Reflect.construct.sham) return !1;
				if (typeof Proxy == "function") return !0;
				try {
					return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], (function() {}))), !0;
				} catch {
					return !1;
				}
			}();
			return function() {
				var n, r = l(e);
				if (t) {
					var i = l(this).constructor;
					n = Reflect.construct(r, arguments, i);
				} else n = r.apply(this, arguments);
				return function(e, t) {
					if (t && (typeof t == "object" || typeof t == "function")) return t;
					if (t !== void 0) throw TypeError("Derived constructors may only return object or undefined");
					return d(e);
				}(this, n);
			};
		}
		function p() {
			return p = typeof Reflect < "u" && Reflect.get ? Reflect.get.bind() : function(e, t, n) {
				var r = function(e, t) {
					for (; !Object.prototype.hasOwnProperty.call(e, t) && (e = l(e)) !== null;);
					return e;
				}(e, t);
				if (r) {
					var i = Object.getOwnPropertyDescriptor(r, t);
					return i.get ? i.get.call(arguments.length < 3 ? e : n) : i.value;
				}
			}, p.apply(this, arguments);
		}
		function m(e) {
			var t = function(e, t) {
				if (typeof e != "object" || !e) return e;
				var n = e[Symbol.toPrimitive];
				if (n !== void 0) {
					var r = n.call(e, t || "default");
					if (typeof r != "object") return r;
					throw TypeError("@@toPrimitive must return a primitive value.");
				}
				return (t === "string" ? String : Number)(e);
			}(e, "string");
			return typeof t == "symbol" ? t : t + "";
		}
		var h = function(e) {
			return !(!e || !e.Window) && e instanceof e.Window;
		}, g = void 0, _ = void 0;
		function v(e) {
			g = e;
			var t = e.document.createTextNode("");
			t.ownerDocument !== e.document && typeof e.wrap == "function" && e.wrap(t) === t && (e = e.wrap(e)), _ = e;
		}
		function y(e) {
			return h(e) ? e : (e.ownerDocument || e).defaultView || _.window;
		}
		typeof window < "u" && window && v(window);
		var b = function(e) {
			return !!e && r(e) === "object";
		}, x = function(e) {
			return typeof e == "function";
		}, S = {
			window: function(e) {
				return e === _ || h(e);
			},
			docFrag: function(e) {
				return b(e) && e.nodeType === 11;
			},
			object: b,
			func: x,
			number: function(e) {
				return typeof e == "number";
			},
			bool: function(e) {
				return typeof e == "boolean";
			},
			string: function(e) {
				return typeof e == "string";
			},
			element: function(e) {
				if (!e || r(e) !== "object") return !1;
				var t = y(e) || _;
				return /object|function/.test(typeof Element > "u" ? "undefined" : r(Element)) ? e instanceof Element || e instanceof t.Element : e.nodeType === 1 && typeof e.nodeName == "string";
			},
			plainObject: function(e) {
				return b(e) && !!e.constructor && /function Object\b/.test(e.constructor.toString());
			},
			array: function(e) {
				return b(e) && e.length !== void 0 && x(e.splice);
			}
		};
		function C(e) {
			var t = e.interaction;
			if (t.prepared.name === "drag") {
				var n = t.prepared.axis;
				n === "x" ? (t.coords.cur.page.y = t.coords.start.page.y, t.coords.cur.client.y = t.coords.start.client.y, t.coords.velocity.client.y = 0, t.coords.velocity.page.y = 0) : n === "y" && (t.coords.cur.page.x = t.coords.start.page.x, t.coords.cur.client.x = t.coords.start.client.x, t.coords.velocity.client.x = 0, t.coords.velocity.page.x = 0);
			}
		}
		function w(e) {
			var t = e.iEvent, n = e.interaction;
			if (n.prepared.name === "drag") {
				var r = n.prepared.axis;
				if (r === "x" || r === "y") {
					var i = r === "x" ? "y" : "x";
					t.page[i] = n.coords.start.page[i], t.client[i] = n.coords.start.client[i], t.delta[i] = 0;
				}
			}
		}
		var T = {
			id: "actions/drag",
			install: function(e) {
				var t = e.actions, n = e.Interactable, r = e.defaults;
				n.prototype.draggable = T.draggable, t.map.drag = T, t.methodDict.drag = "draggable", r.actions.drag = T.defaults;
			},
			listeners: {
				"interactions:before-action-move": C,
				"interactions:action-resume": C,
				"interactions:action-move": w,
				"auto-start:check": function(e) {
					var t = e.interaction, n = e.interactable, r = e.buttons, i = n.options.drag;
					if (i && i.enabled && (!t.pointerIsDown || !/mouse|pointer/.test(t.pointerType) || (r & n.options.drag.mouseButtons) != 0)) return e.action = {
						name: "drag",
						axis: i.lockAxis === "start" ? i.startAxis : i.lockAxis
					}, !1;
				}
			},
			draggable: function(e) {
				return S.object(e) ? (this.options.drag.enabled = !1 !== e.enabled, this.setPerAction("drag", e), this.setOnEvents("drag", e), /^(xy|x|y|start)$/.test(e.lockAxis) && (this.options.drag.lockAxis = e.lockAxis), /^(xy|x|y)$/.test(e.startAxis) && (this.options.drag.startAxis = e.startAxis), this) : S.bool(e) ? (this.options.drag.enabled = e, this) : this.options.drag;
			},
			beforeMove: C,
			move: w,
			defaults: {
				startAxis: "xy",
				lockAxis: "xy"
			},
			getCursor: function() {
				return "move";
			},
			filterEventType: function(e) {
				return e.search("drag") === 0;
			}
		}, E = T, D = {
			init: function(e) {
				var t = e;
				D.document = t.document, D.DocumentFragment = t.DocumentFragment || O, D.SVGElement = t.SVGElement || O, D.SVGSVGElement = t.SVGSVGElement || O, D.SVGElementInstance = t.SVGElementInstance || O, D.Element = t.Element || O, D.HTMLElement = t.HTMLElement || D.Element, D.Event = t.Event, D.Touch = t.Touch || O, D.PointerEvent = t.PointerEvent || t.MSPointerEvent;
			},
			document: null,
			DocumentFragment: null,
			SVGElement: null,
			SVGSVGElement: null,
			SVGElementInstance: null,
			Element: null,
			HTMLElement: null,
			Event: null,
			Touch: null,
			PointerEvent: null
		};
		function O() {}
		var k = D, A = {
			init: function(e) {
				var t = k.Element, n = e.navigator || {};
				A.supportsTouch = "ontouchstart" in e || S.func(e.DocumentTouch) && k.document instanceof e.DocumentTouch, A.supportsPointerEvent = !1 !== n.pointerEnabled && !!k.PointerEvent, A.isIOS = /iP(hone|od|ad)/.test(n.platform), A.isIOS7 = /iP(hone|od|ad)/.test(n.platform) && /OS 7[^\d]/.test(n.appVersion), A.isIe9 = /MSIE 9/.test(n.userAgent), A.isOperaMobile = n.appName === "Opera" && A.supportsTouch && /Presto/.test(n.userAgent), A.prefixedMatchesSelector = "matches" in t.prototype ? "matches" : "webkitMatchesSelector" in t.prototype ? "webkitMatchesSelector" : "mozMatchesSelector" in t.prototype ? "mozMatchesSelector" : "oMatchesSelector" in t.prototype ? "oMatchesSelector" : "msMatchesSelector", A.pEventTypes = A.supportsPointerEvent ? k.PointerEvent === e.MSPointerEvent ? {
					up: "MSPointerUp",
					down: "MSPointerDown",
					over: "mouseover",
					out: "mouseout",
					move: "MSPointerMove",
					cancel: "MSPointerCancel"
				} : {
					up: "pointerup",
					down: "pointerdown",
					over: "pointerover",
					out: "pointerout",
					move: "pointermove",
					cancel: "pointercancel"
				} : null, A.wheelEvent = k.document && "onmousewheel" in k.document ? "mousewheel" : "wheel";
			},
			supportsTouch: null,
			supportsPointerEvent: null,
			isIOS7: null,
			isIOS: null,
			isIe9: null,
			isOperaMobile: null,
			prefixedMatchesSelector: null,
			pEventTypes: null,
			wheelEvent: null
		}, j = A;
		function M(e, t) {
			if (e.contains) return e.contains(t);
			for (; t;) {
				if (t === e) return !0;
				t = t.parentNode;
			}
			return !1;
		}
		function N(e, t) {
			for (; S.element(e);) {
				if (F(e, t)) return e;
				e = P(e);
			}
			return null;
		}
		function P(e) {
			var t = e.parentNode;
			if (S.docFrag(t)) {
				for (; (t = t.host) && S.docFrag(t););
				return t;
			}
			return t;
		}
		function F(e, t) {
			return _ !== g && (t = t.replace(/\/deep\//g, " ")), e[j.prefixedMatchesSelector](t);
		}
		var ee = function(e) {
			return e.parentNode || e.host;
		};
		function te(e, t) {
			for (var n, r = [], i = e; (n = ee(i)) && i !== t && n !== i.ownerDocument;) r.unshift(i), i = n;
			return r;
		}
		function I(e, t, n) {
			for (; S.element(e);) {
				if (F(e, t)) return !0;
				if ((e = P(e)) === n) return F(e, t);
			}
			return !1;
		}
		function ne(e) {
			return e.correspondingUseElement || e;
		}
		function re(e) {
			var t = e instanceof k.SVGElement ? e.getBoundingClientRect() : e.getClientRects()[0];
			return t && {
				left: t.left,
				right: t.right,
				top: t.top,
				bottom: t.bottom,
				width: t.width || t.right - t.left,
				height: t.height || t.bottom - t.top
			};
		}
		function ie(e) {
			var t, n = re(e);
			if (!j.isIOS7 && n) {
				var r = {
					x: (t = (t = y(e)) || _).scrollX || t.document.documentElement.scrollLeft,
					y: t.scrollY || t.document.documentElement.scrollTop
				};
				n.left += r.x, n.right += r.x, n.top += r.y, n.bottom += r.y;
			}
			return n;
		}
		function ae(e) {
			for (var t = []; e;) t.push(e), e = P(e);
			return t;
		}
		function oe(e) {
			return !!S.string(e) && (k.document.querySelector(e), !0);
		}
		function L(e, t) {
			for (var n in t) e[n] = t[n];
			return e;
		}
		function se(e, t, n) {
			return e === "parent" ? P(n) : e === "self" ? t.getRect(n) : N(n, e);
		}
		function ce(e, t, n, r) {
			var i = e;
			return S.string(i) ? i = se(i, t, n) : S.func(i) && (i = i.apply(void 0, r)), S.element(i) && (i = ie(i)), i;
		}
		function le(e) {
			return e && {
				x: "x" in e ? e.x : e.left,
				y: "y" in e ? e.y : e.top
			};
		}
		function ue(e) {
			return !e || "x" in e && "y" in e || ((e = L({}, e)).x = e.left || 0, e.y = e.top || 0, e.width = e.width || (e.right || 0) - e.x, e.height = e.height || (e.bottom || 0) - e.y), e;
		}
		function de(e, t, n) {
			e.left && (t.left += n.x), e.right && (t.right += n.x), e.top && (t.top += n.y), e.bottom && (t.bottom += n.y), t.width = t.right - t.left, t.height = t.bottom - t.top;
		}
		function fe(e, t, n) {
			var r = n && e.options[n];
			return le(ce(r && r.origin || e.options.origin, e, t, [e && t])) || {
				x: 0,
				y: 0
			};
		}
		function pe(e, t) {
			var n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : function(e) {
				return !0;
			}, r = arguments.length > 3 ? arguments[3] : void 0;
			if (r ||= {}, S.string(e) && e.search(" ") !== -1 && (e = me(e)), S.array(e)) return e.forEach((function(e) {
				return pe(e, t, n, r);
			})), r;
			if (S.object(e) && (t = e, e = ""), S.func(t) && n(e)) r[e] = r[e] || [], r[e].push(t);
			else if (S.array(t)) for (var i = 0, a = t; i < a.length; i++) {
				var o = a[i];
				pe(e, o, n, r);
			}
			else if (S.object(t)) for (var s in t) pe(me(s).map((function(t) {
				return `${e}${t}`;
			})), t[s], n, r);
			return r;
		}
		function me(e) {
			return e.trim().split(/ +/);
		}
		var he = function(e, t) {
			return Math.sqrt(e * e + t * t);
		}, ge = ["webkit", "moz"];
		function _e(e, t) {
			e.__set ||= {};
			var n = function(n) {
				if (ge.some((function(e) {
					return n.indexOf(e) === 0;
				}))) return 1;
				typeof e[n] != "function" && n !== "__set" && Object.defineProperty(e, n, {
					get: function() {
						return n in e.__set ? e.__set[n] : e.__set[n] = t[n];
					},
					set: function(t) {
						e.__set[n] = t;
					},
					configurable: !0
				});
			};
			for (var r in t) n(r);
			return e;
		}
		function ve(e, t) {
			e.page = e.page || {}, e.page.x = t.page.x, e.page.y = t.page.y, e.client = e.client || {}, e.client.x = t.client.x, e.client.y = t.client.y, e.timeStamp = t.timeStamp;
		}
		function ye(e) {
			e.page.x = 0, e.page.y = 0, e.client.x = 0, e.client.y = 0;
		}
		function be(e) {
			return e instanceof k.Event || e instanceof k.Touch;
		}
		function xe(e, t, n) {
			return e ||= "page", (n ||= {}).x = t[e + "X"], n.y = t[e + "Y"], n;
		}
		function Se(e, t) {
			return t ||= {
				x: 0,
				y: 0
			}, j.isOperaMobile && be(e) ? (xe("screen", e, t), t.x += window.scrollX, t.y += window.scrollY) : xe("page", e, t), t;
		}
		function Ce(e) {
			return S.number(e.pointerId) ? e.pointerId : e.identifier;
		}
		function R(e, t, n) {
			var r = t.length > 1 ? Te(t) : t[0];
			Se(r, e.page), function(e, t) {
				t ||= {}, j.isOperaMobile && be(e) ? xe("screen", e, t) : xe("client", e, t);
			}(r, e.client), e.timeStamp = n;
		}
		function we(e) {
			var t = [];
			return S.array(e) ? (t[0] = e[0], t[1] = e[1]) : e.type === "touchend" ? e.touches.length === 1 ? (t[0] = e.touches[0], t[1] = e.changedTouches[0]) : e.touches.length === 0 && (t[0] = e.changedTouches[0], t[1] = e.changedTouches[1]) : (t[0] = e.touches[0], t[1] = e.touches[1]), t;
		}
		function Te(e) {
			for (var t = {
				pageX: 0,
				pageY: 0,
				clientX: 0,
				clientY: 0,
				screenX: 0,
				screenY: 0
			}, n = 0; n < e.length; n++) {
				var r = e[n];
				for (var i in t) t[i] += r[i];
			}
			for (var a in t) t[a] /= e.length;
			return t;
		}
		function Ee(e) {
			if (!e.length) return null;
			var t = we(e), n = Math.min(t[0].pageX, t[1].pageX), r = Math.min(t[0].pageY, t[1].pageY), i = Math.max(t[0].pageX, t[1].pageX), a = Math.max(t[0].pageY, t[1].pageY);
			return {
				x: n,
				y: r,
				left: n,
				top: r,
				right: i,
				bottom: a,
				width: i - n,
				height: a - r
			};
		}
		function De(e, t) {
			var n = t + "X", r = t + "Y", i = we(e);
			return he(i[0][n] - i[1][n], i[0][r] - i[1][r]);
		}
		function Oe(e, t) {
			var n = t + "X", r = t + "Y", i = we(e), a = i[1][n] - i[0][n], o = i[1][r] - i[0][r];
			return 180 * Math.atan2(o, a) / Math.PI;
		}
		function ke(e) {
			return S.string(e.pointerType) ? e.pointerType : S.number(e.pointerType) ? [
				void 0,
				void 0,
				"touch",
				"pen",
				"mouse"
			][e.pointerType] : /touch/.test(e.type || "") || e instanceof k.Touch ? "touch" : "mouse";
		}
		function Ae(e) {
			var t = S.func(e.composedPath) ? e.composedPath() : e.path;
			return [ne(t ? t[0] : e.target), ne(e.currentTarget)];
		}
		var je = function() {
			function e(t) {
				i(this, e), this.immediatePropagationStopped = !1, this.propagationStopped = !1, this._interaction = t;
			}
			return o(e, [
				{
					key: "preventDefault",
					value: function() {}
				},
				{
					key: "stopPropagation",
					value: function() {
						this.propagationStopped = !0;
					}
				},
				{
					key: "stopImmediatePropagation",
					value: function() {
						this.immediatePropagationStopped = this.propagationStopped = !0;
					}
				}
			]), e;
		}();
		Object.defineProperty(je.prototype, "interaction", {
			get: function() {
				return this._interaction._proxy;
			},
			set: function() {}
		});
		var Me = function(e, t) {
			for (var n = 0; n < t.length; n++) {
				var r = t[n];
				e.push(r);
			}
			return e;
		}, Ne = function(e) {
			return Me([], e);
		}, Pe = function(e, t) {
			for (var n = 0; n < e.length; n++) if (t(e[n], n, e)) return n;
			return -1;
		}, Fe = function(e, t) {
			return e[Pe(e, t)];
		}, Ie = function(e) {
			c(n, e);
			var t = f(n);
			function n(e, r, a) {
				var o;
				i(this, n), (o = t.call(this, r._interaction)).dropzone = void 0, o.dragEvent = void 0, o.relatedTarget = void 0, o.draggable = void 0, o.propagationStopped = !1, o.immediatePropagationStopped = !1;
				var s = a === "dragleave" ? e.prev : e.cur, c = s.element, l = s.dropzone;
				return o.type = a, o.target = c, o.currentTarget = c, o.dropzone = l, o.dragEvent = r, o.relatedTarget = r.target, o.draggable = r.interactable, o.timeStamp = r.timeStamp, o;
			}
			return o(n, [
				{
					key: "reject",
					value: function() {
						var e = this, t = this._interaction.dropState;
						if (this.type === "dropactivate" || this.dropzone && t.cur.dropzone === this.dropzone && t.cur.element === this.target) if (t.prev.dropzone = this.dropzone, t.prev.element = this.target, t.rejected = !0, t.events.enter = null, this.stopImmediatePropagation(), this.type === "dropactivate") {
							var r = t.activeDrops, i = Pe(r, (function(t) {
								var n = t.dropzone, r = t.element;
								return n === e.dropzone && r === e.target;
							}));
							t.activeDrops.splice(i, 1);
							var a = new n(t, this.dragEvent, "dropdeactivate");
							a.dropzone = this.dropzone, a.target = this.target, this.dropzone.fire(a);
						} else this.dropzone.fire(new n(t, this.dragEvent, "dragleave"));
					}
				},
				{
					key: "preventDefault",
					value: function() {}
				},
				{
					key: "stopPropagation",
					value: function() {
						this.propagationStopped = !0;
					}
				},
				{
					key: "stopImmediatePropagation",
					value: function() {
						this.immediatePropagationStopped = this.propagationStopped = !0;
					}
				}
			]), n;
		}(je);
		function Le(e, t) {
			for (var n = 0, r = e.slice(); n < r.length; n++) {
				var i = r[n], a = i.dropzone, o = i.element;
				t.dropzone = a, t.target = o, a.fire(t), t.propagationStopped = t.immediatePropagationStopped = !1;
			}
		}
		function Re(e, t) {
			for (var n = function(e, t) {
				for (var n = [], r = 0, i = e.interactables.list; r < i.length; r++) {
					var a = i[r];
					if (a.options.drop.enabled) {
						var o = a.options.drop.accept;
						if (!(S.element(o) && o !== t || S.string(o) && !F(t, o) || S.func(o) && !o({
							dropzone: a,
							draggableElement: t
						}))) for (var s = 0, c = a.getAllElements(); s < c.length; s++) {
							var l = c[s];
							l !== t && n.push({
								dropzone: a,
								element: l,
								rect: a.getRect(l)
							});
						}
					}
				}
				return n;
			}(e, t), r = 0; r < n.length; r++) {
				var i = n[r];
				i.rect = i.dropzone.getRect(i.element);
			}
			return n;
		}
		function ze(e, t, n) {
			for (var r = e.dropState, i = e.interactable, a = e.element, o = [], s = 0, c = r.activeDrops; s < c.length; s++) {
				var l = c[s], u = l.dropzone, d = l.element, f = l.rect, p = u.dropCheck(t, n, i, a, d, f);
				o.push(p ? d : null);
			}
			var m = function(e) {
				for (var t, n, r, i = [], a = 0; a < e.length; a++) {
					var o = e[a], s = e[t];
					if (o && a !== t) if (s) {
						var c = ee(o), l = ee(s);
						if (c !== o.ownerDocument) if (l !== o.ownerDocument) if (c !== l) {
							i = i.length ? i : te(s);
							var u = void 0;
							if (s instanceof k.HTMLElement && o instanceof k.SVGElement && !(o instanceof k.SVGSVGElement)) {
								if (o === l) continue;
								u = o.ownerSVGElement;
							} else u = o;
							for (var d = te(u, s.ownerDocument), f = 0; d[f] && d[f] === i[f];) f++;
							var p = [
								d[f - 1],
								d[f],
								i[f]
							];
							if (p[0]) for (var m = p[0].lastChild; m;) {
								if (m === p[1]) {
									t = a, i = d;
									break;
								}
								if (m === p[2]) break;
								m = m.previousSibling;
							}
						} else r = s, (parseInt(y(n = o).getComputedStyle(n).zIndex, 10) || 0) >= (parseInt(y(r).getComputedStyle(r).zIndex, 10) || 0) && (t = a);
						else t = a;
					} else t = a;
				}
				return t;
			}(o);
			return r.activeDrops[m] || null;
		}
		function Be(e, t, n) {
			var r = e.dropState, i = {
				enter: null,
				leave: null,
				activate: null,
				deactivate: null,
				move: null,
				drop: null
			};
			return n.type === "dragstart" && (i.activate = new Ie(r, n, "dropactivate"), i.activate.target = null, i.activate.dropzone = null), n.type === "dragend" && (i.deactivate = new Ie(r, n, "dropdeactivate"), i.deactivate.target = null, i.deactivate.dropzone = null), r.rejected || (r.cur.element !== r.prev.element && (r.prev.dropzone && (i.leave = new Ie(r, n, "dragleave"), n.dragLeave = i.leave.target = r.prev.element, n.prevDropzone = i.leave.dropzone = r.prev.dropzone), r.cur.dropzone && (i.enter = new Ie(r, n, "dragenter"), n.dragEnter = r.cur.element, n.dropzone = r.cur.dropzone)), n.type === "dragend" && r.cur.dropzone && (i.drop = new Ie(r, n, "drop"), n.dropzone = r.cur.dropzone, n.relatedTarget = r.cur.element), n.type === "dragmove" && r.cur.dropzone && (i.move = new Ie(r, n, "dropmove"), n.dropzone = r.cur.dropzone)), i;
		}
		function Ve(e, t) {
			var n = e.dropState, r = n.activeDrops, i = n.cur, a = n.prev;
			t.leave && a.dropzone.fire(t.leave), t.enter && i.dropzone.fire(t.enter), t.move && i.dropzone.fire(t.move), t.drop && i.dropzone.fire(t.drop), t.deactivate && Le(r, t.deactivate), n.prev.dropzone = i.dropzone, n.prev.element = i.element;
		}
		function He(e, t) {
			var n = e.interaction, r = e.iEvent, i = e.event;
			if (r.type === "dragmove" || r.type === "dragend") {
				var a = n.dropState;
				t.dynamicDrop && (a.activeDrops = Re(t, n.element));
				var o = r, s = ze(n, o, i);
				a.rejected = a.rejected && !!s && s.dropzone === a.cur.dropzone && s.element === a.cur.element, a.cur.dropzone = s && s.dropzone, a.cur.element = s && s.element, a.events = Be(n, 0, o);
			}
		}
		var Ue = {
			id: "actions/drop",
			install: function(e) {
				var t = e.actions, n = e.interactStatic, r = e.Interactable, i = e.defaults;
				e.usePlugin(E), r.prototype.dropzone = function(e) {
					return function(e, t) {
						if (S.object(t)) {
							if (e.options.drop.enabled = !1 !== t.enabled, t.listeners) {
								var n = pe(t.listeners), r = Object.keys(n).reduce((function(e, t) {
									return e[/^(enter|leave)/.test(t) ? `drag${t}` : /^(activate|deactivate|move)/.test(t) ? `drop${t}` : t] = n[t], e;
								}), {}), i = e.options.drop.listeners;
								i && e.off(i), e.on(r), e.options.drop.listeners = r;
							}
							return S.func(t.ondrop) && e.on("drop", t.ondrop), S.func(t.ondropactivate) && e.on("dropactivate", t.ondropactivate), S.func(t.ondropdeactivate) && e.on("dropdeactivate", t.ondropdeactivate), S.func(t.ondragenter) && e.on("dragenter", t.ondragenter), S.func(t.ondragleave) && e.on("dragleave", t.ondragleave), S.func(t.ondropmove) && e.on("dropmove", t.ondropmove), /^(pointer|center)$/.test(t.overlap) ? e.options.drop.overlap = t.overlap : S.number(t.overlap) && (e.options.drop.overlap = Math.max(Math.min(1, t.overlap), 0)), "accept" in t && (e.options.drop.accept = t.accept), "checker" in t && (e.options.drop.checker = t.checker), e;
						}
						return S.bool(t) ? (e.options.drop.enabled = t, e) : e.options.drop;
					}(this, e);
				}, r.prototype.dropCheck = function(e, t, n, r, i, a) {
					return function(e, t, n, r, i, a, o) {
						var s = !1;
						if (!(o ||= e.getRect(a))) return !!e.options.drop.checker && e.options.drop.checker(t, n, s, e, a, r, i);
						var c = e.options.drop.overlap;
						if (c === "pointer") {
							var l = fe(r, i, "drag"), u = Se(t);
							u.x += l.x, u.y += l.y;
							var d = u.x > o.left && u.x < o.right, f = u.y > o.top && u.y < o.bottom;
							s = d && f;
						}
						var p = r.getRect(i);
						if (p && c === "center") {
							var m = p.left + p.width / 2, h = p.top + p.height / 2;
							s = m >= o.left && m <= o.right && h >= o.top && h <= o.bottom;
						}
						return p && S.number(c) && (s = Math.max(0, Math.min(o.right, p.right) - Math.max(o.left, p.left)) * Math.max(0, Math.min(o.bottom, p.bottom) - Math.max(o.top, p.top)) / (p.width * p.height) >= c), e.options.drop.checker && (s = e.options.drop.checker(t, n, s, e, a, r, i)), s;
					}(this, e, t, n, r, i, a);
				}, n.dynamicDrop = function(t) {
					return S.bool(t) ? (e.dynamicDrop = t, n) : e.dynamicDrop;
				}, L(t.phaselessTypes, {
					dragenter: !0,
					dragleave: !0,
					dropactivate: !0,
					dropdeactivate: !0,
					dropmove: !0,
					drop: !0
				}), t.methodDict.drop = "dropzone", e.dynamicDrop = !1, i.actions.drop = Ue.defaults;
			},
			listeners: {
				"interactions:before-action-start": function(e) {
					var t = e.interaction;
					t.prepared.name === "drag" && (t.dropState = {
						cur: {
							dropzone: null,
							element: null
						},
						prev: {
							dropzone: null,
							element: null
						},
						rejected: null,
						events: null,
						activeDrops: []
					});
				},
				"interactions:after-action-start": function(e, t) {
					var n = e.interaction, r = (e.event, e.iEvent);
					if (n.prepared.name === "drag") {
						var i = n.dropState;
						i.activeDrops = [], i.events = {}, i.activeDrops = Re(t, n.element), i.events = Be(n, 0, r), i.events.activate && (Le(i.activeDrops, i.events.activate), t.fire("actions/drop:start", {
							interaction: n,
							dragEvent: r
						}));
					}
				},
				"interactions:action-move": He,
				"interactions:after-action-move": function(e, t) {
					var n = e.interaction, r = e.iEvent;
					if (n.prepared.name === "drag") {
						var i = n.dropState;
						Ve(n, i.events), t.fire("actions/drop:move", {
							interaction: n,
							dragEvent: r
						}), i.events = {};
					}
				},
				"interactions:action-end": function(e, t) {
					if (e.interaction.prepared.name === "drag") {
						var n = e.interaction, r = e.iEvent;
						He(e, t), Ve(n, n.dropState.events), t.fire("actions/drop:end", {
							interaction: n,
							dragEvent: r
						});
					}
				},
				"interactions:stop": function(e) {
					var t = e.interaction;
					if (t.prepared.name === "drag") {
						var n = t.dropState;
						n && (n.activeDrops = null, n.events = null, n.cur.dropzone = null, n.cur.element = null, n.prev.dropzone = null, n.prev.element = null, n.rejected = !1);
					}
				}
			},
			getActiveDrops: Re,
			getDrop: ze,
			getDropEvents: Be,
			fireDropEvents: Ve,
			filterEventType: function(e) {
				return e.search("drag") === 0 || e.search("drop") === 0;
			},
			defaults: {
				enabled: !1,
				accept: null,
				overlap: "pointer"
			}
		}, We = Ue;
		function Ge(e) {
			var t = e.interaction, n = e.iEvent, r = e.phase;
			if (t.prepared.name === "gesture") {
				var i = t.pointers.map((function(e) {
					return e.pointer;
				})), a = r === "start", o = r === "end", s = t.interactable.options.deltaSource;
				if (n.touches = [i[0], i[1]], a) n.distance = De(i, s), n.box = Ee(i), n.scale = 1, n.ds = 0, n.angle = Oe(i, s), n.da = 0, t.gesture.startDistance = n.distance, t.gesture.startAngle = n.angle;
				else if (o || t.pointers.length < 2) {
					var c = t.prevEvent;
					n.distance = c.distance, n.box = c.box, n.scale = c.scale, n.ds = 0, n.angle = c.angle, n.da = 0;
				} else n.distance = De(i, s), n.box = Ee(i), n.scale = n.distance / t.gesture.startDistance, n.angle = Oe(i, s), n.ds = n.scale - t.gesture.scale, n.da = n.angle - t.gesture.angle;
				t.gesture.distance = n.distance, t.gesture.angle = n.angle, S.number(n.scale) && n.scale !== Infinity && !isNaN(n.scale) && (t.gesture.scale = n.scale);
			}
		}
		var Ke = {
			id: "actions/gesture",
			before: ["actions/drag", "actions/resize"],
			install: function(e) {
				var t = e.actions, n = e.Interactable, r = e.defaults;
				n.prototype.gesturable = function(e) {
					return S.object(e) ? (this.options.gesture.enabled = !1 !== e.enabled, this.setPerAction("gesture", e), this.setOnEvents("gesture", e), this) : S.bool(e) ? (this.options.gesture.enabled = e, this) : this.options.gesture;
				}, t.map.gesture = Ke, t.methodDict.gesture = "gesturable", r.actions.gesture = Ke.defaults;
			},
			listeners: {
				"interactions:action-start": Ge,
				"interactions:action-move": Ge,
				"interactions:action-end": Ge,
				"interactions:new": function(e) {
					e.interaction.gesture = {
						angle: 0,
						distance: 0,
						scale: 1,
						startAngle: 0,
						startDistance: 0
					};
				},
				"auto-start:check": function(e) {
					if (!(e.interaction.pointers.length < 2)) {
						var t = e.interactable.options.gesture;
						if (t && t.enabled) return e.action = { name: "gesture" }, !1;
					}
				}
			},
			defaults: {},
			getCursor: function() {
				return "";
			},
			filterEventType: function(e) {
				return e.search("gesture") === 0;
			}
		}, qe = Ke;
		function Je(e, t, n, r, i, a, o) {
			if (!t) return !1;
			if (!0 === t) {
				var s = S.number(a.width) ? a.width : a.right - a.left, c = S.number(a.height) ? a.height : a.bottom - a.top;
				if (o = Math.min(o, Math.abs((e === "left" || e === "right" ? s : c) / 2)), s < 0 && (e === "left" ? e = "right" : e === "right" && (e = "left")), c < 0 && (e === "top" ? e = "bottom" : e === "bottom" && (e = "top")), e === "left") {
					var l = s >= 0 ? a.left : a.right;
					return n.x < l + o;
				}
				if (e === "top") {
					var u = c >= 0 ? a.top : a.bottom;
					return n.y < u + o;
				}
				if (e === "right") return n.x > (s >= 0 ? a.right : a.left) - o;
				if (e === "bottom") return n.y > (c >= 0 ? a.bottom : a.top) - o;
			}
			return !!S.element(r) && (S.element(t) ? t === r : I(r, t, i));
		}
		function Ye(e) {
			var t = e.iEvent, n = e.interaction;
			if (n.prepared.name === "resize" && n.resizeAxes) {
				var r = t;
				n.interactable.options.resize.square ? (n.resizeAxes === "y" ? r.delta.x = r.delta.y : r.delta.y = r.delta.x, r.axes = "xy") : (r.axes = n.resizeAxes, n.resizeAxes === "x" ? r.delta.y = 0 : n.resizeAxes === "y" && (r.delta.x = 0));
			}
		}
		var Xe, Ze, Qe = {
			id: "actions/resize",
			before: ["actions/drag"],
			install: function(e) {
				var t = e.actions, n = e.browser, r = e.Interactable, i = e.defaults;
				Qe.cursors = function(e) {
					return e.isIe9 ? {
						x: "e-resize",
						y: "s-resize",
						xy: "se-resize",
						top: "n-resize",
						left: "w-resize",
						bottom: "s-resize",
						right: "e-resize",
						topleft: "se-resize",
						bottomright: "se-resize",
						topright: "ne-resize",
						bottomleft: "ne-resize"
					} : {
						x: "ew-resize",
						y: "ns-resize",
						xy: "nwse-resize",
						top: "ns-resize",
						left: "ew-resize",
						bottom: "ns-resize",
						right: "ew-resize",
						topleft: "nwse-resize",
						bottomright: "nwse-resize",
						topright: "nesw-resize",
						bottomleft: "nesw-resize"
					};
				}(n), Qe.defaultMargin = n.supportsTouch || n.supportsPointerEvent ? 20 : 10, r.prototype.resizable = function(t) {
					return function(e, t, n) {
						return S.object(t) ? (e.options.resize.enabled = !1 !== t.enabled, e.setPerAction("resize", t), e.setOnEvents("resize", t), S.string(t.axis) && /^x$|^y$|^xy$/.test(t.axis) ? e.options.resize.axis = t.axis : t.axis === null && (e.options.resize.axis = n.defaults.actions.resize.axis), S.bool(t.preserveAspectRatio) ? e.options.resize.preserveAspectRatio = t.preserveAspectRatio : S.bool(t.square) && (e.options.resize.square = t.square), e) : S.bool(t) ? (e.options.resize.enabled = t, e) : e.options.resize;
					}(this, t, e);
				}, t.map.resize = Qe, t.methodDict.resize = "resizable", i.actions.resize = Qe.defaults;
			},
			listeners: {
				"interactions:new": function(e) {
					e.interaction.resizeAxes = "xy";
				},
				"interactions:action-start": function(e) {
					(function(e) {
						var t = e.iEvent, n = e.interaction;
						if (n.prepared.name === "resize" && n.prepared.edges) {
							var r = t, i = n.rect;
							n._rects = {
								start: L({}, i),
								corrected: L({}, i),
								previous: L({}, i),
								delta: {
									left: 0,
									right: 0,
									width: 0,
									top: 0,
									bottom: 0,
									height: 0
								}
							}, r.edges = n.prepared.edges, r.rect = n._rects.corrected, r.deltaRect = n._rects.delta;
						}
					})(e), Ye(e);
				},
				"interactions:action-move": function(e) {
					(function(e) {
						var t = e.iEvent, n = e.interaction;
						if (n.prepared.name === "resize" && n.prepared.edges) {
							var r = t, i = n.interactable.options.resize.invert, a = i === "reposition" || i === "negate", o = n.rect, s = n._rects, c = s.start, l = s.corrected, u = s.delta, d = s.previous;
							if (L(d, l), a) {
								if (L(l, o), i === "reposition") {
									if (l.top > l.bottom) {
										var f = l.top;
										l.top = l.bottom, l.bottom = f;
									}
									if (l.left > l.right) {
										var p = l.left;
										l.left = l.right, l.right = p;
									}
								}
							} else l.top = Math.min(o.top, c.bottom), l.bottom = Math.max(o.bottom, c.top), l.left = Math.min(o.left, c.right), l.right = Math.max(o.right, c.left);
							for (var m in l.width = l.right - l.left, l.height = l.bottom - l.top, l) u[m] = l[m] - d[m];
							r.edges = n.prepared.edges, r.rect = l, r.deltaRect = u;
						}
					})(e), Ye(e);
				},
				"interactions:action-end": function(e) {
					var t = e.iEvent, n = e.interaction;
					if (n.prepared.name === "resize" && n.prepared.edges) {
						var r = t;
						r.edges = n.prepared.edges, r.rect = n._rects.corrected, r.deltaRect = n._rects.delta;
					}
				},
				"auto-start:check": function(e) {
					var t = e.interaction, n = e.interactable, r = e.element, i = e.rect, a = e.buttons;
					if (i) {
						var o = L({}, t.coords.cur.page), s = n.options.resize;
						if (s && s.enabled && (!t.pointerIsDown || !/mouse|pointer/.test(t.pointerType) || (a & s.mouseButtons) != 0)) {
							if (S.object(s.edges)) {
								var c = {
									left: !1,
									right: !1,
									top: !1,
									bottom: !1
								};
								for (var l in c) c[l] = Je(l, s.edges[l], o, t._latestPointer.eventTarget, r, i, s.margin || Qe.defaultMargin);
								c.left = c.left && !c.right, c.top = c.top && !c.bottom, (c.left || c.right || c.top || c.bottom) && (e.action = {
									name: "resize",
									edges: c
								});
							} else {
								var u = s.axis !== "y" && o.x > i.right - Qe.defaultMargin, d = s.axis !== "x" && o.y > i.bottom - Qe.defaultMargin;
								(u || d) && (e.action = {
									name: "resize",
									axes: (u ? "x" : "") + (d ? "y" : "")
								});
							}
							return !e.action && void 0;
						}
					}
				}
			},
			defaults: {
				square: !1,
				preserveAspectRatio: !1,
				axis: "xy",
				margin: NaN,
				edges: null,
				invert: "none"
			},
			cursors: null,
			getCursor: function(e) {
				var t = e.edges, n = e.axis, r = e.name, i = Qe.cursors, a = null;
				if (n) a = i[r + n];
				else if (t) {
					for (var o = "", s = 0, c = [
						"top",
						"bottom",
						"left",
						"right"
					]; s < c.length; s++) {
						var l = c[s];
						t[l] && (o += l);
					}
					a = i[o];
				}
				return a;
			},
			filterEventType: function(e) {
				return e.search("resize") === 0;
			},
			defaultMargin: null
		}, $e = Qe, et = {
			id: "actions",
			install: function(e) {
				e.usePlugin(qe), e.usePlugin($e), e.usePlugin(E), e.usePlugin(We);
			}
		}, tt = 0, nt = {
			request: function(e) {
				return Xe(e);
			},
			cancel: function(e) {
				return Ze(e);
			},
			init: function(e) {
				if (Xe = e.requestAnimationFrame, Ze = e.cancelAnimationFrame, !Xe) for (var t = [
					"ms",
					"moz",
					"webkit",
					"o"
				], n = 0; n < t.length; n++) {
					var r = t[n];
					Xe = e[`${r}RequestAnimationFrame`], Ze = e[`${r}CancelAnimationFrame`] || e[`${r}CancelRequestAnimationFrame`];
				}
				Xe &&= Xe.bind(e), Ze &&= Ze.bind(e), Xe || (Xe = function(t) {
					var n = Date.now(), r = Math.max(0, 16 - (n - tt)), i = e.setTimeout((function() {
						t(n + r);
					}), r);
					return tt = n + r, i;
				}, Ze = function(e) {
					return clearTimeout(e);
				});
			}
		}, z = {
			defaults: {
				enabled: !1,
				margin: 60,
				container: null,
				speed: 300
			},
			now: Date.now,
			interaction: null,
			i: 0,
			x: 0,
			y: 0,
			isScrolling: !1,
			prevTime: 0,
			margin: 0,
			speed: 0,
			start: function(e) {
				z.isScrolling = !0, nt.cancel(z.i), e.autoScroll = z, z.interaction = e, z.prevTime = z.now(), z.i = nt.request(z.scroll);
			},
			stop: function() {
				z.isScrolling = !1, z.interaction && (z.interaction.autoScroll = null), nt.cancel(z.i);
			},
			scroll: function() {
				var e = z.interaction, t = e.interactable, n = e.element, r = e.prepared.name, i = t.options[r].autoScroll, a = rt(i.container, t, n), o = z.now(), s = (o - z.prevTime) / 1e3, c = i.speed * s;
				if (c >= 1) {
					var l = {
						x: z.x * c,
						y: z.y * c
					};
					if (l.x || l.y) {
						var u = it(a);
						S.window(a) ? a.scrollBy(l.x, l.y) : a && (a.scrollLeft += l.x, a.scrollTop += l.y);
						var d = it(a), f = {
							x: d.x - u.x,
							y: d.y - u.y
						};
						(f.x || f.y) && t.fire({
							type: "autoscroll",
							target: n,
							interactable: t,
							delta: f,
							interaction: e,
							container: a
						});
					}
					z.prevTime = o;
				}
				z.isScrolling && (nt.cancel(z.i), z.i = nt.request(z.scroll));
			},
			check: function(e, t) {
				return e.options[t].autoScroll?.enabled;
			},
			onInteractionMove: function(e) {
				var t = e.interaction, n = e.pointer;
				if (t.interacting() && z.check(t.interactable, t.prepared.name)) if (t.simulation) z.x = z.y = 0;
				else {
					var r, i, a, o, s = t.interactable, c = t.element, l = t.prepared.name, u = s.options[l].autoScroll, d = rt(u.container, s, c);
					if (S.window(d)) o = n.clientX < z.margin, r = n.clientY < z.margin, i = n.clientX > d.innerWidth - z.margin, a = n.clientY > d.innerHeight - z.margin;
					else {
						var f = re(d);
						o = n.clientX < f.left + z.margin, r = n.clientY < f.top + z.margin, i = n.clientX > f.right - z.margin, a = n.clientY > f.bottom - z.margin;
					}
					z.x = i ? 1 : o ? -1 : 0, z.y = a ? 1 : r ? -1 : 0, z.isScrolling || (z.margin = u.margin, z.speed = u.speed, z.start(t));
				}
			}
		};
		function rt(e, t, n) {
			return (S.string(e) ? se(e, t, n) : e) || y(n);
		}
		function it(e) {
			return S.window(e) && (e = window.document.body), {
				x: e.scrollLeft,
				y: e.scrollTop
			};
		}
		var at = {
			id: "auto-scroll",
			install: function(e) {
				var t = e.defaults, n = e.actions;
				e.autoScroll = z, z.now = function() {
					return e.now();
				}, n.phaselessTypes.autoscroll = !0, t.perAction.autoScroll = z.defaults;
			},
			listeners: {
				"interactions:new": function(e) {
					e.interaction.autoScroll = null;
				},
				"interactions:destroy": function(e) {
					e.interaction.autoScroll = null, z.stop(), z.interaction &&= null;
				},
				"interactions:stop": z.stop,
				"interactions:action-move": function(e) {
					return z.onInteractionMove(e);
				}
			}
		};
		function ot(e, t) {
			var n = !1;
			return function() {
				return n ||= (_.console.warn(t), !0), e.apply(this, arguments);
			};
		}
		function st(e, t) {
			return e.name = t.name, e.axis = t.axis, e.edges = t.edges, e;
		}
		function ct(e) {
			return S.bool(e) ? (this.options.styleCursor = e, this) : e === null ? (delete this.options.styleCursor, this) : this.options.styleCursor;
		}
		function lt(e) {
			return S.func(e) ? (this.options.actionChecker = e, this) : e === null ? (delete this.options.actionChecker, this) : this.options.actionChecker;
		}
		var ut = {
			id: "auto-start/interactableMethods",
			install: function(e) {
				var t = e.Interactable;
				t.prototype.getAction = function(t, n, r, i) {
					var a = function(e, t, n, r, i) {
						var a = {
							action: null,
							interactable: e,
							interaction: n,
							element: r,
							rect: e.getRect(r),
							buttons: t.buttons || {
								0: 1,
								1: 4,
								3: 8,
								4: 16
							}[t.button]
						};
						return i.fire("auto-start:check", a), a.action;
					}(this, n, r, i, e);
					return this.options.actionChecker ? this.options.actionChecker(t, n, a, this, i, r) : a;
				}, t.prototype.ignoreFrom = ot((function(e) {
					return this._backCompatOption("ignoreFrom", e);
				}), "Interactable.ignoreFrom() has been deprecated. Use Interactble.draggable({ignoreFrom: newValue})."), t.prototype.allowFrom = ot((function(e) {
					return this._backCompatOption("allowFrom", e);
				}), "Interactable.allowFrom() has been deprecated. Use Interactble.draggable({allowFrom: newValue})."), t.prototype.actionChecker = lt, t.prototype.styleCursor = ct;
			}
		};
		function dt(e, t, n, r, i) {
			return t.testIgnoreAllow(t.options[e.name], n, r) && t.options[e.name].enabled && ht(t, n, e, i) ? e : null;
		}
		function ft(e, t, n, r, i, a, o) {
			for (var s = 0, c = r.length; s < c; s++) {
				var l = r[s], u = i[s], d = l.getAction(t, n, e, u);
				if (d) {
					var f = dt(d, l, u, a, o);
					if (f) return {
						action: f,
						interactable: l,
						element: u
					};
				}
			}
			return {
				action: null,
				interactable: null,
				element: null
			};
		}
		function pt(e, t, n, r, i) {
			var a = [], o = [], s = r;
			function c(e) {
				a.push(e), o.push(s);
			}
			for (; S.element(s);) {
				a = [], o = [], i.interactables.forEachMatch(s, c);
				var l = ft(e, t, n, a, o, r, i);
				if (l.action && !l.interactable.options[l.action.name].manualStart) return l;
				s = P(s);
			}
			return {
				action: null,
				interactable: null,
				element: null
			};
		}
		function mt(e, t, n) {
			var r = t.action, i = t.interactable, a = t.element;
			r ||= { name: null }, e.interactable = i, e.element = a, st(e.prepared, r), e.rect = i && r.name ? i.getRect(a) : null, _t(e, n), n.fire("autoStart:prepared", { interaction: e });
		}
		function ht(e, t, n, r) {
			var i = e.options, a = i[n.name].max, o = i[n.name].maxPerElement, s = r.autoStart.maxInteractions, c = 0, l = 0, u = 0;
			if (!(a && o && s)) return !1;
			for (var d = 0, f = r.interactions.list; d < f.length; d++) {
				var p = f[d], m = p.prepared.name;
				if (p.interacting() && (++c >= s || p.interactable === e && ((l += +(m === n.name)) >= a || p.element === t && (u++, m === n.name && u >= o)))) return !1;
			}
			return s > 0;
		}
		function gt(e, t) {
			return S.number(e) ? (t.autoStart.maxInteractions = e, this) : t.autoStart.maxInteractions;
		}
		function B(e, t, n) {
			var r = n.autoStart.cursorElement;
			r && r !== e && (r.style.cursor = ""), e.ownerDocument.documentElement.style.cursor = t, e.style.cursor = t, n.autoStart.cursorElement = t ? e : null;
		}
		function _t(e, t) {
			var n = e.interactable, r = e.element, i = e.prepared;
			if (e.pointerType === "mouse" && n && n.options.styleCursor) {
				var a = "";
				if (i.name) {
					var o = n.options[i.name].cursorChecker;
					a = S.func(o) ? o(i, n, r, e._interacting) : t.actions.map[i.name].getCursor(i);
				}
				B(e.element, a || "", t);
			} else t.autoStart.cursorElement && B(t.autoStart.cursorElement, "", t);
		}
		var vt = {
			id: "auto-start/base",
			before: ["actions"],
			install: function(e) {
				var t = e.interactStatic, n = e.defaults;
				e.usePlugin(ut), n.base.actionChecker = null, n.base.styleCursor = !0, L(n.perAction, {
					manualStart: !1,
					max: Infinity,
					maxPerElement: 1,
					allowFrom: null,
					ignoreFrom: null,
					mouseButtons: 1
				}), t.maxInteractions = function(t) {
					return gt(t, e);
				}, e.autoStart = {
					maxInteractions: Infinity,
					withinInteractionLimit: ht,
					cursorElement: null
				};
			},
			listeners: {
				"interactions:down": function(e, t) {
					var n = e.interaction, r = e.pointer, i = e.event, a = e.eventTarget;
					n.interacting() || mt(n, pt(n, r, i, a, t), t);
				},
				"interactions:move": function(e, t) {
					(function(e, t) {
						var n = e.interaction, r = e.pointer, i = e.event, a = e.eventTarget;
						n.pointerType !== "mouse" || n.pointerIsDown || n.interacting() || mt(n, pt(n, r, i, a, t), t);
					})(e, t), function(e, t) {
						var n = e.interaction;
						if (n.pointerIsDown && !n.interacting() && n.pointerWasMoved && n.prepared.name) {
							t.fire("autoStart:before-start", e);
							var r = n.interactable, i = n.prepared.name;
							i && r && (r.options[i].manualStart || !ht(r, n.element, n.prepared, t) ? n.stop() : (n.start(n.prepared, r, n.element), _t(n, t)));
						}
					}(e, t);
				},
				"interactions:stop": function(e, t) {
					var n = e.interaction, r = n.interactable;
					r && r.options.styleCursor && B(n.element, "", t);
				}
			},
			maxInteractions: gt,
			withinInteractionLimit: ht,
			validateAction: dt
		}, yt = {
			id: "auto-start/dragAxis",
			listeners: { "autoStart:before-start": function(e, t) {
				var n = e.interaction, r = e.eventTarget, i = e.dx, a = e.dy;
				if (n.prepared.name === "drag") {
					var o = Math.abs(i), s = Math.abs(a), c = n.interactable.options.drag, l = c.startAxis, u = o > s ? "x" : o < s ? "y" : "xy";
					if (n.prepared.axis = c.lockAxis === "start" ? u[0] : c.lockAxis, u !== "xy" && l !== "xy" && l !== u) {
						n.prepared.name = null;
						for (var d = r, f = function(e) {
							if (e !== n.interactable) {
								var i = n.interactable.options.drag;
								if (!i.manualStart && e.testIgnoreAllow(i, d, r)) {
									var a = e.getAction(n.downPointer, n.downEvent, n, d);
									if (a && a.name === "drag" && function(e, t) {
										if (!t) return !1;
										var n = t.options.drag.startAxis;
										return e === "xy" || n === "xy" || n === e;
									}(u, e) && vt.validateAction(a, e, d, r, t)) return e;
								}
							}
						}; S.element(d);) {
							var p = t.interactables.forEachMatch(d, f);
							if (p) {
								n.prepared.name = "drag", n.interactable = p, n.element = d;
								break;
							}
							d = P(d);
						}
					}
				}
			} }
		};
		function V(e) {
			var t = e.prepared && e.prepared.name;
			if (!t) return null;
			var n = e.interactable.options;
			return n[t].hold || n[t].delay;
		}
		var bt = {
			id: "auto-start/hold",
			install: function(e) {
				var t = e.defaults;
				e.usePlugin(vt), t.perAction.hold = 0, t.perAction.delay = 0;
			},
			listeners: {
				"interactions:new": function(e) {
					e.interaction.autoStartHoldTimer = null;
				},
				"autoStart:prepared": function(e) {
					var t = e.interaction, n = V(t);
					n > 0 && (t.autoStartHoldTimer = setTimeout((function() {
						t.start(t.prepared, t.interactable, t.element);
					}), n));
				},
				"interactions:move": function(e) {
					var t = e.interaction, n = e.duplicate;
					t.autoStartHoldTimer && t.pointerWasMoved && !n && (clearTimeout(t.autoStartHoldTimer), t.autoStartHoldTimer = null);
				},
				"autoStart:before-start": function(e) {
					var t = e.interaction;
					V(t) > 0 && (t.prepared.name = null);
				}
			},
			getHoldDuration: V
		}, H = {
			id: "auto-start",
			install: function(e) {
				e.usePlugin(vt), e.usePlugin(bt), e.usePlugin(yt);
			}
		}, xt = function(e) {
			return /^(always|never|auto)$/.test(e) ? (this.options.preventDefault = e, this) : S.bool(e) ? (this.options.preventDefault = e ? "always" : "never", this) : this.options.preventDefault;
		};
		function St(e) {
			var t = e.interaction, n = e.event;
			t.interactable && t.interactable.checkAndPreventDefault(n);
		}
		var Ct = {
			id: "core/interactablePreventDefault",
			install: function(e) {
				var t = e.Interactable;
				t.prototype.preventDefault = xt, t.prototype.checkAndPreventDefault = function(t) {
					return function(e, t, n) {
						var r = e.options.preventDefault;
						if (r !== "never") if (r !== "always") {
							if (t.events.supportsPassive && /^touch(start|move)$/.test(n.type)) {
								var i = y(n.target).document, a = t.getDocOptions(i);
								if (!a || !a.events || !1 !== a.events.passive) return;
							}
							/^(mouse|pointer|touch)*(down|start)/i.test(n.type) || S.element(n.target) && F(n.target, "input,select,textarea,[contenteditable=true],[contenteditable=true] *") || n.preventDefault();
						} else n.preventDefault();
					}(this, e, t);
				}, e.interactions.docEvents.push({
					type: "dragstart",
					listener: function(t) {
						for (var n = 0, r = e.interactions.list; n < r.length; n++) {
							var i = r[n];
							if (i.element && (i.element === t.target || M(i.element, t.target))) return void i.interactable.checkAndPreventDefault(t);
						}
					}
				});
			},
			listeners: [
				"down",
				"move",
				"up",
				"cancel"
			].reduce((function(e, t) {
				return e[`interactions:${t}`] = St, e;
			}), {})
		};
		function wt(e, t) {
			if (t.phaselessTypes[e]) return !0;
			for (var n in t.map) if (e.indexOf(n) === 0 && e.substr(n.length) in t.phases) return !0;
			return !1;
		}
		function Tt(e) {
			var t = {};
			for (var n in e) {
				var r = e[n];
				S.plainObject(r) ? t[n] = Tt(r) : S.array(r) ? t[n] = Ne(r) : t[n] = r;
			}
			return t;
		}
		var Et = function() {
			function e(t) {
				i(this, e), this.states = [], this.startOffset = {
					left: 0,
					right: 0,
					top: 0,
					bottom: 0
				}, this.startDelta = void 0, this.result = void 0, this.endResult = void 0, this.startEdges = void 0, this.edges = void 0, this.interaction = void 0, this.interaction = t, this.result = Dt(), this.edges = {
					left: !1,
					right: !1,
					top: !1,
					bottom: !1
				};
			}
			return o(e, [
				{
					key: "start",
					value: function(e, t) {
						var n, r, i = e.phase, a = this.interaction, o = function(e) {
							var t = e.interactable.options[e.prepared.name], n = t.modifiers;
							return n && n.length ? n : [
								"snap",
								"snapSize",
								"snapEdges",
								"restrict",
								"restrictEdges",
								"restrictSize"
							].map((function(e) {
								var n = t[e];
								return n && n.enabled && {
									options: n,
									methods: n._methods
								};
							})).filter((function(e) {
								return !!e;
							}));
						}(a);
						this.prepareStates(o), this.startEdges = L({}, a.edges), this.edges = L({}, this.startEdges), this.startOffset = (n = a.rect, r = t, n ? {
							left: r.x - n.left,
							top: r.y - n.top,
							right: n.right - r.x,
							bottom: n.bottom - r.y
						} : {
							left: 0,
							top: 0,
							right: 0,
							bottom: 0
						}), this.startDelta = {
							x: 0,
							y: 0
						};
						var s = this.fillArg({
							phase: i,
							pageCoords: t,
							preEnd: !1
						});
						return this.result = Dt(), this.startAll(s), this.result = this.setAll(s);
					}
				},
				{
					key: "fillArg",
					value: function(e) {
						var t = this.interaction;
						return e.interaction = t, e.interactable = t.interactable, e.element = t.element, e.rect ||= t.rect, e.edges ||= this.startEdges, e.startOffset = this.startOffset, e;
					}
				},
				{
					key: "startAll",
					value: function(e) {
						for (var t = 0, n = this.states; t < n.length; t++) {
							var r = n[t];
							r.methods.start && (e.state = r, r.methods.start(e));
						}
					}
				},
				{
					key: "setAll",
					value: function(e) {
						var t = e.phase, n = e.preEnd, r = e.skipModifiers, i = e.rect, a = e.edges;
						e.coords = L({}, e.pageCoords), e.rect = L({}, i), e.edges = L({}, a);
						for (var o = r ? this.states.slice(r) : this.states, s = Dt(e.coords, e.rect), c = 0; c < o.length; c++) {
							var l, u = o[c], d = u.options, f = L({}, e.coords), p = null;
							(l = u.methods) != null && l.set && this.shouldDo(d, n, t) && (e.state = u, p = u.methods.set(e), de(e.edges, e.rect, {
								x: e.coords.x - f.x,
								y: e.coords.y - f.y
							})), s.eventProps.push(p);
						}
						L(this.edges, e.edges), s.delta.x = e.coords.x - e.pageCoords.x, s.delta.y = e.coords.y - e.pageCoords.y, s.rectDelta.left = e.rect.left - i.left, s.rectDelta.right = e.rect.right - i.right, s.rectDelta.top = e.rect.top - i.top, s.rectDelta.bottom = e.rect.bottom - i.bottom;
						var m = this.result.coords, h = this.result.rect;
						return m && h && (s.changed = s.rect.left !== h.left || s.rect.right !== h.right || s.rect.top !== h.top || s.rect.bottom !== h.bottom || m.x !== s.coords.x || m.y !== s.coords.y), s;
					}
				},
				{
					key: "applyToInteraction",
					value: function(e) {
						var t = this.interaction, n = e.phase, r = t.coords.cur, i = t.coords.start, a = this.result, o = this.startDelta, s = a.delta;
						n === "start" && L(this.startDelta, a.delta);
						for (var c = 0, l = [[i, o], [r, s]]; c < l.length; c++) {
							var u = l[c], d = u[0], f = u[1];
							d.page.x += f.x, d.page.y += f.y, d.client.x += f.x, d.client.y += f.y;
						}
						var p = this.result.rectDelta, m = e.rect || t.rect;
						m.left += p.left, m.right += p.right, m.top += p.top, m.bottom += p.bottom, m.width = m.right - m.left, m.height = m.bottom - m.top;
					}
				},
				{
					key: "setAndApply",
					value: function(e) {
						var t = this.interaction, n = e.phase, r = e.preEnd, i = e.skipModifiers, a = this.setAll(this.fillArg({
							preEnd: r,
							phase: n,
							pageCoords: e.modifiedCoords || t.coords.cur.page
						}));
						if (this.result = a, !a.changed && (!i || i < this.states.length) && t.interacting()) return !1;
						if (e.modifiedCoords) {
							var o = t.coords.cur.page, s = {
								x: e.modifiedCoords.x - o.x,
								y: e.modifiedCoords.y - o.y
							};
							a.coords.x += s.x, a.coords.y += s.y, a.delta.x += s.x, a.delta.y += s.y;
						}
						this.applyToInteraction(e);
					}
				},
				{
					key: "beforeEnd",
					value: function(e) {
						var t = e.interaction, n = e.event, r = this.states;
						if (r && r.length) {
							for (var i = !1, a = 0; a < r.length; a++) {
								var o = r[a];
								e.state = o;
								var s = o.options, c = o.methods, l = c.beforeEnd && c.beforeEnd(e);
								if (l) return this.endResult = l, !1;
								i ||= !i && this.shouldDo(s, !0, e.phase, !0);
							}
							i && t.move({
								event: n,
								preEnd: !0
							});
						}
					}
				},
				{
					key: "stop",
					value: function(e) {
						var t = e.interaction;
						if (this.states && this.states.length) {
							var n = L({
								states: this.states,
								interactable: t.interactable,
								element: t.element,
								rect: null
							}, e);
							this.fillArg(n);
							for (var r = 0, i = this.states; r < i.length; r++) {
								var a = i[r];
								n.state = a, a.methods.stop && a.methods.stop(n);
							}
							this.states = null, this.endResult = null;
						}
					}
				},
				{
					key: "prepareStates",
					value: function(e) {
						this.states = [];
						for (var t = 0; t < e.length; t++) {
							var n = e[t], r = n.options, i = n.methods, a = n.name;
							this.states.push({
								options: r,
								methods: i,
								index: t,
								name: a
							});
						}
						return this.states;
					}
				},
				{
					key: "restoreInteractionCoords",
					value: function(e) {
						var t = e.interaction, n = t.coords, r = t.rect, i = t.modification;
						if (i.result) {
							for (var a = i.startDelta, o = i.result, s = o.delta, c = o.rectDelta, l = 0, u = [[n.start, a], [n.cur, s]]; l < u.length; l++) {
								var d = u[l], f = d[0], p = d[1];
								f.page.x -= p.x, f.page.y -= p.y, f.client.x -= p.x, f.client.y -= p.y;
							}
							r.left -= c.left, r.right -= c.right, r.top -= c.top, r.bottom -= c.bottom;
						}
					}
				},
				{
					key: "shouldDo",
					value: function(e, t, n, r) {
						return !(!e || !1 === e.enabled || r && !e.endOnly || e.endOnly && !t || n === "start" && !e.setStart);
					}
				},
				{
					key: "copyFrom",
					value: function(e) {
						this.startOffset = e.startOffset, this.startDelta = e.startDelta, this.startEdges = e.startEdges, this.edges = e.edges, this.states = e.states.map((function(e) {
							return Tt(e);
						})), this.result = Dt(L({}, e.result.coords), L({}, e.result.rect));
					}
				},
				{
					key: "destroy",
					value: function() {
						for (var e in this) this[e] = null;
					}
				}
			]), e;
		}();
		function Dt(e, t) {
			return {
				rect: t,
				coords: e,
				delta: {
					x: 0,
					y: 0
				},
				rectDelta: {
					left: 0,
					right: 0,
					top: 0,
					bottom: 0
				},
				eventProps: [],
				changed: !0
			};
		}
		function Ot(e, t) {
			var n = e.defaults, r = {
				start: e.start,
				set: e.set,
				beforeEnd: e.beforeEnd,
				stop: e.stop
			}, i = function(e) {
				var i = e || {};
				for (var a in i.enabled = !1 !== i.enabled, n) a in i || (i[a] = n[a]);
				var o = {
					options: i,
					methods: r,
					name: t,
					enable: function() {
						return i.enabled = !0, o;
					},
					disable: function() {
						return i.enabled = !1, o;
					}
				};
				return o;
			};
			return t && typeof t == "string" && (i._defaults = n, i._methods = r), i;
		}
		function kt(e) {
			var t = e.iEvent, n = e.interaction.modification.result;
			n && (t.modifiers = n.eventProps);
		}
		var At = {
			id: "modifiers/base",
			before: ["actions"],
			install: function(e) {
				e.defaults.perAction.modifiers = [];
			},
			listeners: {
				"interactions:new": function(e) {
					var t = e.interaction;
					t.modification = new Et(t);
				},
				"interactions:before-action-start": function(e) {
					var t = e.interaction, n = e.interaction.modification;
					n.start(e, t.coords.start.page), t.edges = n.edges, n.applyToInteraction(e);
				},
				"interactions:before-action-move": function(e) {
					var t = e.interaction, n = t.modification, r = n.setAndApply(e);
					return t.edges = n.edges, r;
				},
				"interactions:before-action-end": function(e) {
					var t = e.interaction, n = t.modification, r = n.beforeEnd(e);
					return t.edges = n.startEdges, r;
				},
				"interactions:action-start": kt,
				"interactions:action-move": kt,
				"interactions:action-end": kt,
				"interactions:after-action-start": function(e) {
					return e.interaction.modification.restoreInteractionCoords(e);
				},
				"interactions:after-action-move": function(e) {
					return e.interaction.modification.restoreInteractionCoords(e);
				},
				"interactions:stop": function(e) {
					return e.interaction.modification.stop(e);
				}
			}
		}, jt = {
			base: {
				preventDefault: "auto",
				deltaSource: "page"
			},
			perAction: {
				enabled: !1,
				origin: {
					x: 0,
					y: 0
				}
			},
			actions: {}
		}, Mt = function(e) {
			c(n, e);
			var t = f(n);
			function n(e, r, a, o, s, c, l) {
				var u;
				i(this, n), (u = t.call(this, e)).relatedTarget = null, u.screenX = void 0, u.screenY = void 0, u.button = void 0, u.buttons = void 0, u.ctrlKey = void 0, u.shiftKey = void 0, u.altKey = void 0, u.metaKey = void 0, u.page = void 0, u.client = void 0, u.delta = void 0, u.rect = void 0, u.x0 = void 0, u.y0 = void 0, u.t0 = void 0, u.dt = void 0, u.duration = void 0, u.clientX0 = void 0, u.clientY0 = void 0, u.velocity = void 0, u.speed = void 0, u.swipe = void 0, u.axes = void 0, u.preEnd = void 0, s ||= e.element;
				var f = e.interactable, p = (f && f.options || jt).deltaSource, m = fe(f, s, a), h = o === "start", g = o === "end", _ = h ? d(u) : e.prevEvent, v = h ? e.coords.start : g ? {
					page: _.page,
					client: _.client,
					timeStamp: e.coords.cur.timeStamp
				} : e.coords.cur;
				return u.page = L({}, v.page), u.client = L({}, v.client), u.rect = L({}, e.rect), u.timeStamp = v.timeStamp, g || (u.page.x -= m.x, u.page.y -= m.y, u.client.x -= m.x, u.client.y -= m.y), u.ctrlKey = r.ctrlKey, u.altKey = r.altKey, u.shiftKey = r.shiftKey, u.metaKey = r.metaKey, u.button = r.button, u.buttons = r.buttons, u.target = s, u.currentTarget = s, u.preEnd = c, u.type = l || a + (o || ""), u.interactable = f, u.t0 = h ? e.pointers[e.pointers.length - 1].downTime : _.t0, u.x0 = e.coords.start.page.x - m.x, u.y0 = e.coords.start.page.y - m.y, u.clientX0 = e.coords.start.client.x - m.x, u.clientY0 = e.coords.start.client.y - m.y, u.delta = h || g ? {
					x: 0,
					y: 0
				} : {
					x: u[p].x - _[p].x,
					y: u[p].y - _[p].y
				}, u.dt = e.coords.delta.timeStamp, u.duration = u.timeStamp - u.t0, u.velocity = L({}, e.coords.velocity[p]), u.speed = he(u.velocity.x, u.velocity.y), u.swipe = g || o === "inertiastart" ? u.getSwipe() : null, u;
			}
			return o(n, [
				{
					key: "getSwipe",
					value: function() {
						var e = this._interaction;
						if (e.prevEvent.speed < 600 || this.timeStamp - e.prevEvent.timeStamp > 150) return null;
						var t = 180 * Math.atan2(e.prevEvent.velocityY, e.prevEvent.velocityX) / Math.PI;
						t < 0 && (t += 360);
						var n = 112.5 <= t && t < 247.5, r = 202.5 <= t && t < 337.5;
						return {
							up: r,
							down: !r && 22.5 <= t && t < 157.5,
							left: n,
							right: !n && (292.5 <= t || t < 67.5),
							angle: t,
							speed: e.prevEvent.speed,
							velocity: {
								x: e.prevEvent.velocityX,
								y: e.prevEvent.velocityY
							}
						};
					}
				},
				{
					key: "preventDefault",
					value: function() {}
				},
				{
					key: "stopImmediatePropagation",
					value: function() {
						this.immediatePropagationStopped = this.propagationStopped = !0;
					}
				},
				{
					key: "stopPropagation",
					value: function() {
						this.propagationStopped = !0;
					}
				}
			]), n;
		}(je);
		Object.defineProperties(Mt.prototype, {
			pageX: {
				get: function() {
					return this.page.x;
				},
				set: function(e) {
					this.page.x = e;
				}
			},
			pageY: {
				get: function() {
					return this.page.y;
				},
				set: function(e) {
					this.page.y = e;
				}
			},
			clientX: {
				get: function() {
					return this.client.x;
				},
				set: function(e) {
					this.client.x = e;
				}
			},
			clientY: {
				get: function() {
					return this.client.y;
				},
				set: function(e) {
					this.client.y = e;
				}
			},
			dx: {
				get: function() {
					return this.delta.x;
				},
				set: function(e) {
					this.delta.x = e;
				}
			},
			dy: {
				get: function() {
					return this.delta.y;
				},
				set: function(e) {
					this.delta.y = e;
				}
			},
			velocityX: {
				get: function() {
					return this.velocity.x;
				},
				set: function(e) {
					this.velocity.x = e;
				}
			},
			velocityY: {
				get: function() {
					return this.velocity.y;
				},
				set: function(e) {
					this.velocity.y = e;
				}
			}
		});
		var U = o((function e(t, n, r, a, o) {
			i(this, e), this.id = void 0, this.pointer = void 0, this.event = void 0, this.downTime = void 0, this.downTarget = void 0, this.id = t, this.pointer = n, this.event = r, this.downTime = a, this.downTarget = o;
		})), W = function(e) {
			return e.interactable = "", e.element = "", e.prepared = "", e.pointerIsDown = "", e.pointerWasMoved = "", e._proxy = "", e;
		}({}), G = function(e) {
			return e.start = "", e.move = "", e.end = "", e.stop = "", e.interacting = "", e;
		}({}), K = 0, q = function() {
			function e(t) {
				var n = this, r = t.pointerType, a = t.scopeFire;
				i(this, e), this.interactable = null, this.element = null, this.rect = null, this._rects = void 0, this.edges = null, this._scopeFire = void 0, this.prepared = {
					name: null,
					axis: null,
					edges: null
				}, this.pointerType = void 0, this.pointers = [], this.downEvent = null, this.downPointer = {}, this._latestPointer = {
					pointer: null,
					event: null,
					eventTarget: null
				}, this.prevEvent = null, this.pointerIsDown = !1, this.pointerWasMoved = !1, this._interacting = !1, this._ending = !1, this._stopped = !0, this._proxy = void 0, this.simulation = null, this.doMove = ot((function(e) {
					this.move(e);
				}), "The interaction.doMove() method has been renamed to interaction.move()"), this.coords = {
					start: {
						page: {
							x: 0,
							y: 0
						},
						client: {
							x: 0,
							y: 0
						},
						timeStamp: 0
					},
					prev: {
						page: {
							x: 0,
							y: 0
						},
						client: {
							x: 0,
							y: 0
						},
						timeStamp: 0
					},
					cur: {
						page: {
							x: 0,
							y: 0
						},
						client: {
							x: 0,
							y: 0
						},
						timeStamp: 0
					},
					delta: {
						page: {
							x: 0,
							y: 0
						},
						client: {
							x: 0,
							y: 0
						},
						timeStamp: 0
					},
					velocity: {
						page: {
							x: 0,
							y: 0
						},
						client: {
							x: 0,
							y: 0
						},
						timeStamp: 0
					}
				}, this._id = K++, this._scopeFire = a, this.pointerType = r;
				var o = this;
				this._proxy = {};
				var s = function(e) {
					Object.defineProperty(n._proxy, e, { get: function() {
						return o[e];
					} });
				};
				for (var c in W) s(c);
				var l = function(e) {
					Object.defineProperty(n._proxy, e, { value: function() {
						return o[e].apply(o, arguments);
					} });
				};
				for (var u in G) l(u);
				this._scopeFire("interactions:new", { interaction: this });
			}
			return o(e, [
				{
					key: "pointerMoveTolerance",
					get: function() {
						return 1;
					}
				},
				{
					key: "pointerDown",
					value: function(e, t, n) {
						var r = this.updatePointer(e, t, n, !0), i = this.pointers[r];
						this._scopeFire("interactions:down", {
							pointer: e,
							event: t,
							eventTarget: n,
							pointerIndex: r,
							pointerInfo: i,
							type: "down",
							interaction: this
						});
					}
				},
				{
					key: "start",
					value: function(e, t, n) {
						return !(this.interacting() || !this.pointerIsDown || this.pointers.length < (e.name === "gesture" ? 2 : 1) || !t.options[e.name].enabled) && (st(this.prepared, e), this.interactable = t, this.element = n, this.rect = t.getRect(n), this.edges = this.prepared.edges ? L({}, this.prepared.edges) : {
							left: !0,
							right: !0,
							top: !0,
							bottom: !0
						}, this._stopped = !1, this._interacting = this._doPhase({
							interaction: this,
							event: this.downEvent,
							phase: "start"
						}) && !this._stopped, this._interacting);
					}
				},
				{
					key: "pointerMove",
					value: function(e, t, n) {
						this.simulation || this.modification && this.modification.endResult || this.updatePointer(e, t, n, !1);
						var r, i, a = this.coords.cur.page.x === this.coords.prev.page.x && this.coords.cur.page.y === this.coords.prev.page.y && this.coords.cur.client.x === this.coords.prev.client.x && this.coords.cur.client.y === this.coords.prev.client.y;
						this.pointerIsDown && !this.pointerWasMoved && (r = this.coords.cur.client.x - this.coords.start.client.x, i = this.coords.cur.client.y - this.coords.start.client.y, this.pointerWasMoved = he(r, i) > this.pointerMoveTolerance);
						var o, s, c, l = this.getPointerIndex(e), u = {
							pointer: e,
							pointerIndex: l,
							pointerInfo: this.pointers[l],
							event: t,
							type: "move",
							eventTarget: n,
							dx: r,
							dy: i,
							duplicate: a,
							interaction: this
						};
						a || (o = this.coords.velocity, s = this.coords.delta, c = Math.max(s.timeStamp / 1e3, .001), o.page.x = s.page.x / c, o.page.y = s.page.y / c, o.client.x = s.client.x / c, o.client.y = s.client.y / c, o.timeStamp = c), this._scopeFire("interactions:move", u), a || this.simulation || (this.interacting() && (u.type = null, this.move(u)), this.pointerWasMoved && ve(this.coords.prev, this.coords.cur));
					}
				},
				{
					key: "move",
					value: function(e) {
						e && e.event || ye(this.coords.delta), (e = L({
							pointer: this._latestPointer.pointer,
							event: this._latestPointer.event,
							eventTarget: this._latestPointer.eventTarget,
							interaction: this
						}, e || {})).phase = "move", this._doPhase(e);
					}
				},
				{
					key: "pointerUp",
					value: function(e, t, n, r) {
						var i = this.getPointerIndex(e);
						i === -1 && (i = this.updatePointer(e, t, n, !1));
						var a = /cancel$/i.test(t.type) ? "cancel" : "up";
						this._scopeFire(`interactions:${a}`, {
							pointer: e,
							pointerIndex: i,
							pointerInfo: this.pointers[i],
							event: t,
							eventTarget: n,
							type: a,
							curEventTarget: r,
							interaction: this
						}), this.simulation || this.end(t), this.removePointer(e, t);
					}
				},
				{
					key: "documentBlur",
					value: function(e) {
						this.end(e), this._scopeFire("interactions:blur", {
							event: e,
							type: "blur",
							interaction: this
						});
					}
				},
				{
					key: "end",
					value: function(e) {
						var t;
						this._ending = !0, e ||= this._latestPointer.event, this.interacting() && (t = this._doPhase({
							event: e,
							interaction: this,
							phase: "end"
						})), this._ending = !1, !0 === t && this.stop();
					}
				},
				{
					key: "currentAction",
					value: function() {
						return this._interacting ? this.prepared.name : null;
					}
				},
				{
					key: "interacting",
					value: function() {
						return this._interacting;
					}
				},
				{
					key: "stop",
					value: function() {
						this._scopeFire("interactions:stop", { interaction: this }), this.interactable = this.element = null, this._interacting = !1, this._stopped = !0, this.prepared.name = this.prevEvent = null;
					}
				},
				{
					key: "getPointerIndex",
					value: function(e) {
						var t = Ce(e);
						return this.pointerType === "mouse" || this.pointerType === "pen" ? this.pointers.length - 1 : Pe(this.pointers, (function(e) {
							return e.id === t;
						}));
					}
				},
				{
					key: "getPointerInfo",
					value: function(e) {
						return this.pointers[this.getPointerIndex(e)];
					}
				},
				{
					key: "updatePointer",
					value: function(e, t, n, r) {
						var i, a, o, s = Ce(e), c = this.getPointerIndex(e), l = this.pointers[c];
						return r = !1 !== r && (r || /(down|start)$/i.test(t.type)), l ? l.pointer = e : (l = new U(s, e, t, null, null), c = this.pointers.length, this.pointers.push(l)), R(this.coords.cur, this.pointers.map((function(e) {
							return e.pointer;
						})), this._now()), i = this.coords.delta, a = this.coords.prev, o = this.coords.cur, i.page.x = o.page.x - a.page.x, i.page.y = o.page.y - a.page.y, i.client.x = o.client.x - a.client.x, i.client.y = o.client.y - a.client.y, i.timeStamp = o.timeStamp - a.timeStamp, r && (this.pointerIsDown = !0, l.downTime = this.coords.cur.timeStamp, l.downTarget = n, _e(this.downPointer, e), this.interacting() || (ve(this.coords.start, this.coords.cur), ve(this.coords.prev, this.coords.cur), this.downEvent = t, this.pointerWasMoved = !1)), this._updateLatestPointer(e, t, n), this._scopeFire("interactions:update-pointer", {
							pointer: e,
							event: t,
							eventTarget: n,
							down: r,
							pointerInfo: l,
							pointerIndex: c,
							interaction: this
						}), c;
					}
				},
				{
					key: "removePointer",
					value: function(e, t) {
						var n = this.getPointerIndex(e);
						if (n !== -1) {
							var r = this.pointers[n];
							this._scopeFire("interactions:remove-pointer", {
								pointer: e,
								event: t,
								eventTarget: null,
								pointerIndex: n,
								pointerInfo: r,
								interaction: this
							}), this.pointers.splice(n, 1), this.pointerIsDown = !1;
						}
					}
				},
				{
					key: "_updateLatestPointer",
					value: function(e, t, n) {
						this._latestPointer.pointer = e, this._latestPointer.event = t, this._latestPointer.eventTarget = n;
					}
				},
				{
					key: "destroy",
					value: function() {
						this._latestPointer.pointer = null, this._latestPointer.event = null, this._latestPointer.eventTarget = null;
					}
				},
				{
					key: "_createPreparedEvent",
					value: function(e, t, n, r) {
						return new Mt(this, e, this.prepared.name, t, this.element, n, r);
					}
				},
				{
					key: "_fireEvent",
					value: function(e) {
						var t;
						(t = this.interactable) == null || t.fire(e), (!this.prevEvent || e.timeStamp >= this.prevEvent.timeStamp) && (this.prevEvent = e);
					}
				},
				{
					key: "_doPhase",
					value: function(e) {
						var t = e.event, n = e.phase, r = e.preEnd, i = e.type, a = this.rect;
						if (a && n === "move" && (de(this.edges, a, this.coords.delta[this.interactable.options.deltaSource]), a.width = a.right - a.left, a.height = a.bottom - a.top), !1 === this._scopeFire(`interactions:before-action-${n}`, e)) return !1;
						var o = e.iEvent = this._createPreparedEvent(t, n, r, i);
						return this._scopeFire(`interactions:action-${n}`, e), n === "start" && (this.prevEvent = o), this._fireEvent(o), this._scopeFire(`interactions:after-action-${n}`, e), !0;
					}
				},
				{
					key: "_now",
					value: function() {
						return Date.now();
					}
				}
			]), e;
		}();
		function Nt(e) {
			Pt(e.interaction);
		}
		function Pt(e) {
			if (!function(e) {
				return !(!e.offset.pending.x && !e.offset.pending.y);
			}(e)) return !1;
			var t = e.offset.pending;
			return J(e.coords.cur, t), J(e.coords.delta, t), de(e.edges, e.rect, t), t.x = 0, t.y = 0, !0;
		}
		function Ft(e) {
			var t = e.x, n = e.y;
			this.offset.pending.x += t, this.offset.pending.y += n, this.offset.total.x += t, this.offset.total.y += n;
		}
		function J(e, t) {
			var n = e.page, r = e.client, i = t.x, a = t.y;
			n.x += i, n.y += a, r.x += i, r.y += a;
		}
		G.offsetBy = "";
		var It = {
			id: "offset",
			before: [
				"modifiers",
				"pointer-events",
				"actions",
				"inertia"
			],
			install: function(e) {
				e.Interaction.prototype.offsetBy = Ft;
			},
			listeners: {
				"interactions:new": function(e) {
					e.interaction.offset = {
						total: {
							x: 0,
							y: 0
						},
						pending: {
							x: 0,
							y: 0
						}
					};
				},
				"interactions:update-pointer": function(e) {
					return function(e) {
						e.pointerIsDown && (J(e.coords.cur, e.offset.total), e.offset.pending.x = 0, e.offset.pending.y = 0);
					}(e.interaction);
				},
				"interactions:before-action-start": Nt,
				"interactions:before-action-move": Nt,
				"interactions:before-action-end": function(e) {
					var t = e.interaction;
					if (Pt(t)) return t.move({ offset: !0 }), t.end(), !1;
				},
				"interactions:stop": function(e) {
					var t = e.interaction;
					t.offset.total.x = 0, t.offset.total.y = 0, t.offset.pending.x = 0, t.offset.pending.y = 0;
				}
			}
		}, Lt = function() {
			function e(t) {
				i(this, e), this.active = !1, this.isModified = !1, this.smoothEnd = !1, this.allowResume = !1, this.modification = void 0, this.modifierCount = 0, this.modifierArg = void 0, this.startCoords = void 0, this.t0 = 0, this.v0 = 0, this.te = 0, this.targetOffset = void 0, this.modifiedOffset = void 0, this.currentOffset = void 0, this.lambda_v0 = 0, this.one_ve_v0 = 0, this.timeout = void 0, this.interaction = void 0, this.interaction = t;
			}
			return o(e, [
				{
					key: "start",
					value: function(e) {
						var t = this.interaction, n = Rt(t);
						if (!n || !n.enabled) return !1;
						var r = t.coords.velocity.client, i = he(r.x, r.y), a = this.modification ||= new Et(t);
						if (a.copyFrom(t.modification), this.t0 = t._now(), this.allowResume = n.allowResume, this.v0 = i, this.currentOffset = {
							x: 0,
							y: 0
						}, this.startCoords = t.coords.cur.page, this.modifierArg = a.fillArg({
							pageCoords: this.startCoords,
							preEnd: !0,
							phase: "inertiastart"
						}), this.t0 - t.coords.cur.timeStamp < 50 && i > n.minSpeed && i > n.endSpeed) this.startInertia();
						else {
							if (a.result = a.setAll(this.modifierArg), !a.result.changed) return !1;
							this.startSmoothEnd();
						}
						return t.modification.result.rect = null, t.offsetBy(this.targetOffset), t._doPhase({
							interaction: t,
							event: e,
							phase: "inertiastart"
						}), t.offsetBy({
							x: -this.targetOffset.x,
							y: -this.targetOffset.y
						}), t.modification.result.rect = null, this.active = !0, t.simulation = this, !0;
					}
				},
				{
					key: "startInertia",
					value: function() {
						var e = this, t = this.interaction.coords.velocity.client, n = Rt(this.interaction), r = n.resistance, i = -Math.log(n.endSpeed / this.v0) / r;
						this.targetOffset = {
							x: (t.x - i) / r,
							y: (t.y - i) / r
						}, this.te = i, this.lambda_v0 = r / this.v0, this.one_ve_v0 = 1 - n.endSpeed / this.v0;
						var a = this.modification, o = this.modifierArg;
						o.pageCoords = {
							x: this.startCoords.x + this.targetOffset.x,
							y: this.startCoords.y + this.targetOffset.y
						}, a.result = a.setAll(o), a.result.changed && (this.isModified = !0, this.modifiedOffset = {
							x: this.targetOffset.x + a.result.delta.x,
							y: this.targetOffset.y + a.result.delta.y
						}), this.onNextFrame((function() {
							return e.inertiaTick();
						}));
					}
				},
				{
					key: "startSmoothEnd",
					value: function() {
						var e = this;
						this.smoothEnd = !0, this.isModified = !0, this.targetOffset = {
							x: this.modification.result.delta.x,
							y: this.modification.result.delta.y
						}, this.onNextFrame((function() {
							return e.smoothEndTick();
						}));
					}
				},
				{
					key: "onNextFrame",
					value: function(e) {
						var t = this;
						this.timeout = nt.request((function() {
							t.active && e();
						}));
					}
				},
				{
					key: "inertiaTick",
					value: function() {
						var e, t, n, r, i, a, o, s = this, c = this.interaction, l = Rt(c).resistance, u = (c._now() - this.t0) / 1e3;
						if (u < this.te) {
							var d, f = 1 - (Math.exp(-l * u) - this.lambda_v0) / this.one_ve_v0;
							this.isModified ? (e = 0, t = 0, n = this.targetOffset.x, r = this.targetOffset.y, i = this.modifiedOffset.x, a = this.modifiedOffset.y, d = {
								x: Bt(o = f, e, n, i),
								y: Bt(o, t, r, a)
							}) : d = {
								x: this.targetOffset.x * f,
								y: this.targetOffset.y * f
							};
							var p = {
								x: d.x - this.currentOffset.x,
								y: d.y - this.currentOffset.y
							};
							this.currentOffset.x += p.x, this.currentOffset.y += p.y, c.offsetBy(p), c.move(), this.onNextFrame((function() {
								return s.inertiaTick();
							}));
						} else c.offsetBy({
							x: this.modifiedOffset.x - this.currentOffset.x,
							y: this.modifiedOffset.y - this.currentOffset.y
						}), this.end();
					}
				},
				{
					key: "smoothEndTick",
					value: function() {
						var e = this, t = this.interaction, n = t._now() - this.t0, r = Rt(t).smoothEndDuration;
						if (n < r) {
							var i = {
								x: Vt(n, 0, this.targetOffset.x, r),
								y: Vt(n, 0, this.targetOffset.y, r)
							}, a = {
								x: i.x - this.currentOffset.x,
								y: i.y - this.currentOffset.y
							};
							this.currentOffset.x += a.x, this.currentOffset.y += a.y, t.offsetBy(a), t.move({ skipModifiers: this.modifierCount }), this.onNextFrame((function() {
								return e.smoothEndTick();
							}));
						} else t.offsetBy({
							x: this.targetOffset.x - this.currentOffset.x,
							y: this.targetOffset.y - this.currentOffset.y
						}), this.end();
					}
				},
				{
					key: "resume",
					value: function(e) {
						var t = e.pointer, n = e.event, r = e.eventTarget, i = this.interaction;
						i.offsetBy({
							x: -this.currentOffset.x,
							y: -this.currentOffset.y
						}), i.updatePointer(t, n, r, !0), i._doPhase({
							interaction: i,
							event: n,
							phase: "resume"
						}), ve(i.coords.prev, i.coords.cur), this.stop();
					}
				},
				{
					key: "end",
					value: function() {
						this.interaction.move(), this.interaction.end(), this.stop();
					}
				},
				{
					key: "stop",
					value: function() {
						this.active = this.smoothEnd = !1, this.interaction.simulation = null, nt.cancel(this.timeout);
					}
				}
			]), e;
		}();
		function Rt(e) {
			var t = e.interactable, n = e.prepared;
			return t && t.options && n.name && t.options[n.name].inertia;
		}
		var zt = {
			id: "inertia",
			before: ["modifiers", "actions"],
			install: function(e) {
				var t = e.defaults;
				e.usePlugin(It), e.usePlugin(At), e.actions.phases.inertiastart = !0, e.actions.phases.resume = !0, t.perAction.inertia = {
					enabled: !1,
					resistance: 10,
					minSpeed: 100,
					endSpeed: 10,
					allowResume: !0,
					smoothEndDuration: 300
				};
			},
			listeners: {
				"interactions:new": function(e) {
					var t = e.interaction;
					t.inertia = new Lt(t);
				},
				"interactions:before-action-end": function(e) {
					var t = e.interaction, n = e.event;
					return (!t._interacting || t.simulation || !t.inertia.start(n)) && null;
				},
				"interactions:down": function(e) {
					var t = e.interaction, n = e.eventTarget, r = t.inertia;
					if (r.active) for (var i = n; S.element(i);) {
						if (i === t.element) {
							r.resume(e);
							break;
						}
						i = P(i);
					}
				},
				"interactions:stop": function(e) {
					var t = e.interaction.inertia;
					t.active && t.stop();
				},
				"interactions:before-action-resume": function(e) {
					var t = e.interaction.modification;
					t.stop(e), t.start(e, e.interaction.coords.cur.page), t.applyToInteraction(e);
				},
				"interactions:before-action-inertiastart": function(e) {
					return e.interaction.modification.setAndApply(e);
				},
				"interactions:action-resume": kt,
				"interactions:action-inertiastart": kt,
				"interactions:after-action-inertiastart": function(e) {
					return e.interaction.modification.restoreInteractionCoords(e);
				},
				"interactions:after-action-resume": function(e) {
					return e.interaction.modification.restoreInteractionCoords(e);
				}
			}
		};
		function Bt(e, t, n, r) {
			var i = 1 - e;
			return i * i * t + 2 * i * e * n + e * e * r;
		}
		function Vt(e, t, n, r) {
			return -n * (e /= r) * (e - 2) + t;
		}
		var Ht = zt;
		function Ut(e, t) {
			for (var n = 0; n < t.length; n++) {
				var r = t[n];
				if (e.immediatePropagationStopped) break;
				r(e);
			}
		}
		var Wt = function() {
			function e(t) {
				i(this, e), this.options = void 0, this.types = {}, this.propagationStopped = !1, this.immediatePropagationStopped = !1, this.global = void 0, this.options = L({}, t || {});
			}
			return o(e, [
				{
					key: "fire",
					value: function(e) {
						var t, n = this.global;
						(t = this.types[e.type]) && Ut(e, t), !e.propagationStopped && n && (t = n[e.type]) && Ut(e, t);
					}
				},
				{
					key: "on",
					value: function(e, t) {
						var n = pe(e, t);
						for (e in n) this.types[e] = Me(this.types[e] || [], n[e]);
					}
				},
				{
					key: "off",
					value: function(e, t) {
						var n = pe(e, t);
						for (e in n) {
							var r = this.types[e];
							if (r && r.length) for (var i = 0, a = n[e]; i < a.length; i++) {
								var o = a[i], s = r.indexOf(o);
								s !== -1 && r.splice(s, 1);
							}
						}
					}
				},
				{
					key: "getRect",
					value: function(e) {
						return null;
					}
				}
			]), e;
		}(), Y = function() {
			function e(t) {
				i(this, e), this.currentTarget = void 0, this.originalEvent = void 0, this.type = void 0, this.originalEvent = t, _e(this, t);
			}
			return o(e, [
				{
					key: "preventOriginalDefault",
					value: function() {
						this.originalEvent.preventDefault();
					}
				},
				{
					key: "stopPropagation",
					value: function() {
						this.originalEvent.stopPropagation();
					}
				},
				{
					key: "stopImmediatePropagation",
					value: function() {
						this.originalEvent.stopImmediatePropagation();
					}
				}
			]), e;
		}();
		function Gt(e) {
			return S.object(e) ? {
				capture: !!e.capture,
				passive: !!e.passive
			} : {
				capture: !!e,
				passive: !1
			};
		}
		function Kt(e, t) {
			return e === t || (typeof e == "boolean" ? !!t.capture === e && !!t.passive == 0 : !!e.capture == !!t.capture && !!e.passive == !!t.passive);
		}
		var qt = {
			id: "events",
			install: function(e) {
				var t, n = [], r = {}, i = [], a = {
					add: o,
					remove: s,
					addDelegate: function(e, t, n, a, s) {
						var u = Gt(s);
						if (!r[n]) {
							r[n] = [];
							for (var d = 0; d < i.length; d++) {
								var f = i[d];
								o(f, n, c), o(f, n, l, !0);
							}
						}
						var p = r[n], m = Fe(p, (function(n) {
							return n.selector === e && n.context === t;
						}));
						m || (m = {
							selector: e,
							context: t,
							listeners: []
						}, p.push(m)), m.listeners.push({
							func: a,
							options: u
						});
					},
					removeDelegate: function(e, t, n, i, a) {
						var o, u = Gt(a), d = r[n], f = !1;
						if (d) for (o = d.length - 1; o >= 0; o--) {
							var p = d[o];
							if (p.selector === e && p.context === t) {
								for (var m = p.listeners, h = m.length - 1; h >= 0; h--) {
									var g = m[h];
									if (g.func === i && Kt(g.options, u)) {
										m.splice(h, 1), m.length || (d.splice(o, 1), s(t, n, c), s(t, n, l, !0)), f = !0;
										break;
									}
								}
								if (f) break;
							}
						}
					},
					delegateListener: c,
					delegateUseCapture: l,
					delegatedEvents: r,
					documents: i,
					targets: n,
					supportsOptions: !1,
					supportsPassive: !1
				};
				function o(e, t, r, i) {
					if (e.addEventListener) {
						var o = Gt(i), s = Fe(n, (function(t) {
							return t.eventTarget === e;
						}));
						s || (s = {
							eventTarget: e,
							events: {}
						}, n.push(s)), s.events[t] || (s.events[t] = []), Fe(s.events[t], (function(e) {
							return e.func === r && Kt(e.options, o);
						})) || (e.addEventListener(t, r, a.supportsOptions ? o : o.capture), s.events[t].push({
							func: r,
							options: o
						}));
					}
				}
				function s(e, t, r, i) {
					if (e.addEventListener && e.removeEventListener) {
						var o = Pe(n, (function(t) {
							return t.eventTarget === e;
						})), c = n[o];
						if (c && c.events) if (t !== "all") {
							var l = !1, u = c.events[t];
							if (u) {
								if (r === "all") {
									for (var d = u.length - 1; d >= 0; d--) {
										var f = u[d];
										s(e, t, f.func, f.options);
									}
									return;
								}
								for (var p = Gt(i), m = 0; m < u.length; m++) {
									var h = u[m];
									if (h.func === r && Kt(h.options, p)) {
										e.removeEventListener(t, r, a.supportsOptions ? p : p.capture), u.splice(m, 1), u.length === 0 && (delete c.events[t], l = !0);
										break;
									}
								}
							}
							l && !Object.keys(c.events).length && n.splice(o, 1);
						} else for (t in c.events) c.events.hasOwnProperty(t) && s(e, t, "all");
					}
				}
				function c(e, t) {
					for (var n = Gt(t), i = new Y(e), a = r[e.type], o = Ae(e)[0], s = o; S.element(s);) {
						for (var c = 0; c < a.length; c++) {
							var l = a[c], u = l.selector, d = l.context;
							if (F(s, u) && M(d, o) && M(d, s)) {
								var f = l.listeners;
								i.currentTarget = s;
								for (var p = 0; p < f.length; p++) {
									var m = f[p];
									Kt(m.options, n) && m.func(i);
								}
							}
						}
						s = P(s);
					}
				}
				function l(e) {
					return c(e, !0);
				}
				return (t = e.document) == null || t.createElement("div").addEventListener("test", null, {
					get capture() {
						return a.supportsOptions = !0;
					},
					get passive() {
						return a.supportsPassive = !0;
					}
				}), e.events = a, a;
			}
		}, Jt = {
			methodOrder: [
				"simulationResume",
				"mouseOrPen",
				"hasPointer",
				"idle"
			],
			search: function(e) {
				for (var t = 0, n = Jt.methodOrder; t < n.length; t++) {
					var r = Jt[n[t]](e);
					if (r) return r;
				}
				return null;
			},
			simulationResume: function(e) {
				var t = e.pointerType, n = e.eventType, r = e.eventTarget, i = e.scope;
				if (!/down|start/i.test(n)) return null;
				for (var a = 0, o = i.interactions.list; a < o.length; a++) {
					var s = o[a], c = r;
					if (s.simulation && s.simulation.allowResume && s.pointerType === t) for (; c;) {
						if (c === s.element) return s;
						c = P(c);
					}
				}
				return null;
			},
			mouseOrPen: function(e) {
				var t, n = e.pointerId, r = e.pointerType, i = e.eventType, a = e.scope;
				if (r !== "mouse" && r !== "pen") return null;
				for (var o = 0, s = a.interactions.list; o < s.length; o++) {
					var c = s[o];
					if (c.pointerType === r) {
						if (c.simulation && !Yt(c, n)) continue;
						if (c.interacting()) return c;
						t ||= c;
					}
				}
				if (t) return t;
				for (var l = 0, u = a.interactions.list; l < u.length; l++) {
					var d = u[l];
					if (!(d.pointerType !== r || /down/i.test(i) && d.simulation)) return d;
				}
				return null;
			},
			hasPointer: function(e) {
				for (var t = e.pointerId, n = 0, r = e.scope.interactions.list; n < r.length; n++) {
					var i = r[n];
					if (Yt(i, t)) return i;
				}
				return null;
			},
			idle: function(e) {
				for (var t = e.pointerType, n = 0, r = e.scope.interactions.list; n < r.length; n++) {
					var i = r[n];
					if (i.pointers.length === 1) {
						var a = i.interactable;
						if (a && (!a.options.gesture || !a.options.gesture.enabled)) continue;
					} else if (i.pointers.length >= 2) continue;
					if (!i.interacting() && t === i.pointerType) return i;
				}
				return null;
			}
		};
		function Yt(e, t) {
			return e.pointers.some((function(e) {
				return e.id === t;
			}));
		}
		var Xt = Jt, Zt = [
			"pointerDown",
			"pointerMove",
			"pointerUp",
			"updatePointer",
			"removePointer",
			"windowBlur"
		];
		function Qt(e, t) {
			return function(n) {
				var r = t.interactions.list, i = ke(n), a = Ae(n), o = a[0], s = a[1], c = [];
				if (/^touch/.test(n.type)) {
					t.prevTouchTime = t.now();
					for (var l = 0, u = n.changedTouches; l < u.length; l++) {
						var d = u[l], f = {
							pointer: d,
							pointerId: Ce(d),
							pointerType: i,
							eventType: n.type,
							eventTarget: o,
							curEventTarget: s,
							scope: t
						}, p = $t(f);
						c.push([
							f.pointer,
							f.eventTarget,
							f.curEventTarget,
							p
						]);
					}
				} else {
					var m = !1;
					if (!j.supportsPointerEvent && /mouse/.test(n.type)) {
						for (var h = 0; h < r.length && !m; h++) m = r[h].pointerType !== "mouse" && r[h].pointerIsDown;
						m = m || t.now() - t.prevTouchTime < 500 || n.timeStamp === 0;
					}
					if (!m) {
						var g = {
							pointer: n,
							pointerId: Ce(n),
							pointerType: i,
							eventType: n.type,
							curEventTarget: s,
							eventTarget: o,
							scope: t
						}, _ = $t(g);
						c.push([
							g.pointer,
							g.eventTarget,
							g.curEventTarget,
							_
						]);
					}
				}
				for (var v = 0; v < c.length; v++) {
					var y = c[v], b = y[0], x = y[1], S = y[2];
					y[3][e](b, n, x, S);
				}
			};
		}
		function $t(e) {
			var t = e.pointerType, n = e.scope, r = {
				interaction: Xt.search(e),
				searchDetails: e
			};
			return n.fire("interactions:find", r), r.interaction || n.interactions.new({ pointerType: t });
		}
		function en(e, t) {
			var n = e.doc, r = e.scope, i = e.options, a = r.interactions.docEvents, o = r.events, s = o[t];
			for (var c in r.browser.isIOS && !i.events && (i.events = { passive: !1 }), o.delegatedEvents) s(n, c, o.delegateListener), s(n, c, o.delegateUseCapture, !0);
			for (var l = i && i.events, u = 0; u < a.length; u++) {
				var d = a[u];
				s(n, d.type, d.listener, l);
			}
		}
		var tn = {
			id: "core/interactions",
			install: function(e) {
				for (var t = {}, n = 0; n < Zt.length; n++) {
					var r = Zt[n];
					t[r] = Qt(r, e);
				}
				var a, s = j.pEventTypes;
				function l() {
					for (var t = 0, n = e.interactions.list; t < n.length; t++) {
						var r = n[t];
						if (r.pointerIsDown && r.pointerType === "touch" && !r._interacting) for (var i = function() {
							var t = o[a];
							e.documents.some((function(e) {
								return M(e.doc, t.downTarget);
							})) || r.removePointer(t.pointer, t.event);
						}, a = 0, o = r.pointers; a < o.length; a++) i();
					}
				}
				(a = k.PointerEvent ? [
					{
						type: s.down,
						listener: l
					},
					{
						type: s.down,
						listener: t.pointerDown
					},
					{
						type: s.move,
						listener: t.pointerMove
					},
					{
						type: s.up,
						listener: t.pointerUp
					},
					{
						type: s.cancel,
						listener: t.pointerUp
					}
				] : [
					{
						type: "mousedown",
						listener: t.pointerDown
					},
					{
						type: "mousemove",
						listener: t.pointerMove
					},
					{
						type: "mouseup",
						listener: t.pointerUp
					},
					{
						type: "touchstart",
						listener: l
					},
					{
						type: "touchstart",
						listener: t.pointerDown
					},
					{
						type: "touchmove",
						listener: t.pointerMove
					},
					{
						type: "touchend",
						listener: t.pointerUp
					},
					{
						type: "touchcancel",
						listener: t.pointerUp
					}
				]).push({
					type: "blur",
					listener: function(t) {
						for (var n = 0, r = e.interactions.list; n < r.length; n++) r[n].documentBlur(t);
					}
				}), e.prevTouchTime = 0, e.Interaction = function(t) {
					c(r, t);
					var n = f(r);
					function r() {
						return i(this, r), n.apply(this, arguments);
					}
					return o(r, [{
						key: "pointerMoveTolerance",
						get: function() {
							return e.interactions.pointerMoveTolerance;
						},
						set: function(t) {
							e.interactions.pointerMoveTolerance = t;
						}
					}, {
						key: "_now",
						value: function() {
							return e.now();
						}
					}]), r;
				}(q), e.interactions = {
					list: [],
					new: function(t) {
						t.scopeFire = function(t, n) {
							return e.fire(t, n);
						};
						var n = new e.Interaction(t);
						return e.interactions.list.push(n), n;
					},
					listeners: t,
					docEvents: a,
					pointerMoveTolerance: 1
				}, e.usePlugin(Ct);
			},
			listeners: {
				"scope:add-document": function(e) {
					return en(e, "add");
				},
				"scope:remove-document": function(e) {
					return en(e, "remove");
				},
				"interactable:unset": function(e, t) {
					for (var n = e.interactable, r = t.interactions.list.length - 1; r >= 0; r--) {
						var i = t.interactions.list[r];
						i.interactable === n && (i.stop(), t.fire("interactions:destroy", { interaction: i }), i.destroy(), t.interactions.list.length > 2 && t.interactions.list.splice(r, 1));
					}
				}
			},
			onDocSignal: en,
			doOnInteractions: Qt,
			methodNames: Zt
		}, nn = function(e) {
			return e[e.On = 0] = "On", e[e.Off = 1] = "Off", e;
		}(nn || {}), rn = function() {
			function e(t, n, r, a) {
				i(this, e), this.target = void 0, this.options = void 0, this._actions = void 0, this.events = new Wt(), this._context = void 0, this._win = void 0, this._doc = void 0, this._scopeEvents = void 0, this._actions = n.actions, this.target = t, this._context = n.context || r, this._win = y(oe(t) ? this._context : t), this._doc = this._win.document, this._scopeEvents = a, this.set(n);
			}
			return o(e, [
				{
					key: "_defaults",
					get: function() {
						return {
							base: {},
							perAction: {},
							actions: {}
						};
					}
				},
				{
					key: "setOnEvents",
					value: function(e, t) {
						return S.func(t.onstart) && this.on(`${e}start`, t.onstart), S.func(t.onmove) && this.on(`${e}move`, t.onmove), S.func(t.onend) && this.on(`${e}end`, t.onend), S.func(t.oninertiastart) && this.on(`${e}inertiastart`, t.oninertiastart), this;
					}
				},
				{
					key: "updatePerActionListeners",
					value: function(e, t, n) {
						var r = this, i = this._actions.map[e]?.filterEventType, a = function(e) {
							return (i == null || i(e)) && wt(e, r._actions);
						};
						(S.array(t) || S.object(t)) && this._onOff(nn.Off, e, t, void 0, a), (S.array(n) || S.object(n)) && this._onOff(nn.On, e, n, void 0, a);
					}
				},
				{
					key: "setPerAction",
					value: function(e, t) {
						var n = this._defaults;
						for (var r in t) {
							var i = r, a = this.options[e], o = t[i];
							i === "listeners" && this.updatePerActionListeners(e, a.listeners, o), S.array(o) ? a[i] = Ne(o) : S.plainObject(o) ? (a[i] = L(a[i] || {}, Tt(o)), S.object(n.perAction[i]) && "enabled" in n.perAction[i] && (a[i].enabled = !1 !== o.enabled)) : S.bool(o) && S.object(n.perAction[i]) ? a[i].enabled = o : a[i] = o;
						}
					}
				},
				{
					key: "getRect",
					value: function(e) {
						return e ||= S.element(this.target) ? this.target : null, S.string(this.target) && (e ||= this._context.querySelector(this.target)), ie(e);
					}
				},
				{
					key: "rectChecker",
					value: function(e) {
						var t = this;
						return S.func(e) ? (this.getRect = function(n) {
							var r = L({}, e.apply(t, n));
							return "width" in r || (r.width = r.right - r.left, r.height = r.bottom - r.top), r;
						}, this) : e === null ? (delete this.getRect, this) : this.getRect;
					}
				},
				{
					key: "_backCompatOption",
					value: function(e, t) {
						if (oe(t) || S.object(t)) {
							for (var n in this.options[e] = t, this._actions.map) this.options[n][e] = t;
							return this;
						}
						return this.options[e];
					}
				},
				{
					key: "origin",
					value: function(e) {
						return this._backCompatOption("origin", e);
					}
				},
				{
					key: "deltaSource",
					value: function(e) {
						return e === "page" || e === "client" ? (this.options.deltaSource = e, this) : this.options.deltaSource;
					}
				},
				{
					key: "getAllElements",
					value: function() {
						var e = this.target;
						return S.string(e) ? Array.from(this._context.querySelectorAll(e)) : S.func(e) && e.getAllElements ? e.getAllElements() : S.element(e) ? [e] : [];
					}
				},
				{
					key: "context",
					value: function() {
						return this._context;
					}
				},
				{
					key: "inContext",
					value: function(e) {
						return this._context === e.ownerDocument || M(this._context, e);
					}
				},
				{
					key: "testIgnoreAllow",
					value: function(e, t, n) {
						return !this.testIgnore(e.ignoreFrom, t, n) && this.testAllow(e.allowFrom, t, n);
					}
				},
				{
					key: "testAllow",
					value: function(e, t, n) {
						return !e || !!S.element(n) && (S.string(e) ? I(n, e, t) : !!S.element(e) && M(e, n));
					}
				},
				{
					key: "testIgnore",
					value: function(e, t, n) {
						return !(!e || !S.element(n)) && (S.string(e) ? I(n, e, t) : !!S.element(e) && M(e, n));
					}
				},
				{
					key: "fire",
					value: function(e) {
						return this.events.fire(e), this;
					}
				},
				{
					key: "_onOff",
					value: function(e, t, n, r, i) {
						S.object(t) && !S.array(t) && (r = n, n = null);
						var a = pe(t, n, i);
						for (var o in a) {
							o === "wheel" && (o = j.wheelEvent);
							for (var s = 0, c = a[o]; s < c.length; s++) {
								var l = c[s];
								wt(o, this._actions) ? this.events[e === nn.On ? "on" : "off"](o, l) : S.string(this.target) ? this._scopeEvents[e === nn.On ? "addDelegate" : "removeDelegate"](this.target, this._context, o, l, r) : this._scopeEvents[e === nn.On ? "add" : "remove"](this.target, o, l, r);
							}
						}
						return this;
					}
				},
				{
					key: "on",
					value: function(e, t, n) {
						return this._onOff(nn.On, e, t, n);
					}
				},
				{
					key: "off",
					value: function(e, t, n) {
						return this._onOff(nn.Off, e, t, n);
					}
				},
				{
					key: "set",
					value: function(e) {
						var t = this._defaults;
						for (var n in S.object(e) || (e = {}), this.options = Tt(t.base), this._actions.methodDict) {
							var r = n, i = this._actions.methodDict[r];
							this.options[r] = {}, this.setPerAction(r, L(L({}, t.perAction), t.actions[r])), this[i](e[r]);
						}
						for (var a in e) a === "getRect" ? this.rectChecker(e.getRect) : S.func(this[a]) && this[a](e[a]);
						return this;
					}
				},
				{
					key: "unset",
					value: function() {
						if (S.string(this.target)) for (var e in this._scopeEvents.delegatedEvents) for (var t = this._scopeEvents.delegatedEvents[e], n = t.length - 1; n >= 0; n--) {
							var r = t[n], i = r.selector, a = r.context, o = r.listeners;
							i === this.target && a === this._context && t.splice(n, 1);
							for (var s = o.length - 1; s >= 0; s--) this._scopeEvents.removeDelegate(this.target, this._context, e, o[s][0], o[s][1]);
						}
						else this._scopeEvents.remove(this.target, "all");
					}
				}
			]), e;
		}(), an = function() {
			function e(t) {
				var n = this;
				i(this, e), this.list = [], this.selectorMap = {}, this.scope = void 0, this.scope = t, t.addListeners({ "interactable:unset": function(e) {
					var t = e.interactable, r = t.target, i = S.string(r) ? n.selectorMap[r] : r[n.scope.id], a = Pe(i, (function(e) {
						return e === t;
					}));
					i.splice(a, 1);
				} });
			}
			return o(e, [
				{
					key: "new",
					value: function(e, t) {
						t = L(t || {}, { actions: this.scope.actions });
						var n = new this.scope.Interactable(e, t, this.scope.document, this.scope.events);
						return this.scope.addDocument(n._doc), this.list.push(n), S.string(e) ? (this.selectorMap[e] || (this.selectorMap[e] = []), this.selectorMap[e].push(n)) : (n.target[this.scope.id] || Object.defineProperty(e, this.scope.id, {
							value: [],
							configurable: !0
						}), e[this.scope.id].push(n)), this.scope.fire("interactable:new", {
							target: e,
							options: t,
							interactable: n,
							win: this.scope._win
						}), n;
					}
				},
				{
					key: "getExisting",
					value: function(e, t) {
						var n = t && t.context || this.scope.document, r = S.string(e), i = r ? this.selectorMap[e] : e[this.scope.id];
						if (i) return Fe(i, (function(t) {
							return t._context === n && (r || t.inContext(e));
						}));
					}
				},
				{
					key: "forEachMatch",
					value: function(e, t) {
						for (var n = 0, r = this.list; n < r.length; n++) {
							var i = r[n], a = void 0;
							if ((S.string(i.target) ? S.element(e) && F(e, i.target) : e === i.target) && i.inContext(e) && (a = t(i)), a !== void 0) return a;
						}
					}
				}
			]), e;
		}(), on = function() {
			function e() {
				var t = this;
				i(this, e), this.id = `__interact_scope_${Math.floor(100 * Math.random())}`, this.isInitialized = !1, this.listenerMaps = [], this.browser = j, this.defaults = Tt(jt), this.Eventable = Wt, this.actions = {
					map: {},
					phases: {
						start: !0,
						move: !0,
						end: !0
					},
					methodDict: {},
					phaselessTypes: {}
				}, this.interactStatic = function(e) {
					var t = function t(n, r) {
						var i = e.interactables.getExisting(n, r);
						return i || ((i = e.interactables.new(n, r)).events.global = t.globalEvents), i;
					};
					return t.getPointerAverage = Te, t.getTouchBBox = Ee, t.getTouchDistance = De, t.getTouchAngle = Oe, t.getElementRect = ie, t.getElementClientRect = re, t.matchesSelector = F, t.closest = N, t.globalEvents = {}, t.version = "1.10.27", t.scope = e, t.use = function(e, t) {
						return this.scope.usePlugin(e, t), this;
					}, t.isSet = function(e, t) {
						return !!this.scope.interactables.get(e, t && t.context);
					}, t.on = ot((function(e, t, n) {
						if (S.string(e) && e.search(" ") !== -1 && (e = e.trim().split(/ +/)), S.array(e)) {
							for (var r = 0, i = e; r < i.length; r++) {
								var a = i[r];
								this.on(a, t, n);
							}
							return this;
						}
						if (S.object(e)) {
							for (var o in e) this.on(o, e[o], t);
							return this;
						}
						return wt(e, this.scope.actions) ? this.globalEvents[e] ? this.globalEvents[e].push(t) : this.globalEvents[e] = [t] : this.scope.events.add(this.scope.document, e, t, { options: n }), this;
					}), "The interact.on() method is being deprecated"), t.off = ot((function(e, t, n) {
						if (S.string(e) && e.search(" ") !== -1 && (e = e.trim().split(/ +/)), S.array(e)) {
							for (var r = 0, i = e; r < i.length; r++) {
								var a = i[r];
								this.off(a, t, n);
							}
							return this;
						}
						if (S.object(e)) {
							for (var o in e) this.off(o, e[o], t);
							return this;
						}
						var s;
						return wt(e, this.scope.actions) ? e in this.globalEvents && (s = this.globalEvents[e].indexOf(t)) !== -1 && this.globalEvents[e].splice(s, 1) : this.scope.events.remove(this.scope.document, e, t, n), this;
					}), "The interact.off() method is being deprecated"), t.debug = function() {
						return this.scope;
					}, t.supportsTouch = function() {
						return j.supportsTouch;
					}, t.supportsPointerEvent = function() {
						return j.supportsPointerEvent;
					}, t.stop = function() {
						for (var e = 0, t = this.scope.interactions.list; e < t.length; e++) t[e].stop();
						return this;
					}, t.pointerMoveTolerance = function(e) {
						return S.number(e) ? (this.scope.interactions.pointerMoveTolerance = e, this) : this.scope.interactions.pointerMoveTolerance;
					}, t.addDocument = function(e, t) {
						this.scope.addDocument(e, t);
					}, t.removeDocument = function(e) {
						this.scope.removeDocument(e);
					}, t;
				}(this), this.InteractEvent = Mt, this.Interactable = void 0, this.interactables = new an(this), this._win = void 0, this.document = void 0, this.window = void 0, this.documents = [], this._plugins = {
					list: [],
					map: {}
				}, this.onWindowUnload = function(e) {
					return t.removeDocument(e.target);
				};
				var n = this;
				this.Interactable = function(e) {
					c(r, e);
					var t = f(r);
					function r() {
						return i(this, r), t.apply(this, arguments);
					}
					return o(r, [
						{
							key: "_defaults",
							get: function() {
								return n.defaults;
							}
						},
						{
							key: "set",
							value: function(e) {
								return p(l(r.prototype), "set", this).call(this, e), n.fire("interactable:set", {
									options: e,
									interactable: this
								}), this;
							}
						},
						{
							key: "unset",
							value: function() {
								p(l(r.prototype), "unset", this).call(this);
								var e = n.interactables.list.indexOf(this);
								e < 0 || (n.interactables.list.splice(e, 1), n.fire("interactable:unset", { interactable: this }));
							}
						}
					]), r;
				}(rn);
			}
			return o(e, [
				{
					key: "addListeners",
					value: function(e, t) {
						this.listenerMaps.push({
							id: t,
							map: e
						});
					}
				},
				{
					key: "fire",
					value: function(e, t) {
						for (var n = 0, r = this.listenerMaps; n < r.length; n++) {
							var i = r[n].map[e];
							if (i && !1 === i(t, this, e)) return !1;
						}
					}
				},
				{
					key: "init",
					value: function(e) {
						return this.isInitialized ? this : function(e, t) {
							return e.isInitialized = !0, S.window(t) && v(t), k.init(t), j.init(t), nt.init(t), e.window = t, e.document = t.document, e.usePlugin(tn), e.usePlugin(qt), e;
						}(this, e);
					}
				},
				{
					key: "pluginIsInstalled",
					value: function(e) {
						var t = e.id;
						return t ? !!this._plugins.map[t] : this._plugins.list.indexOf(e) !== -1;
					}
				},
				{
					key: "usePlugin",
					value: function(e, t) {
						if (!this.isInitialized || this.pluginIsInstalled(e)) return this;
						if (e.id && (this._plugins.map[e.id] = e), this._plugins.list.push(e), e.install && e.install(this, t), e.listeners && e.before) {
							for (var n = 0, r = this.listenerMaps.length, i = e.before.reduce((function(e, t) {
								return e[t] = !0, e[sn(t)] = !0, e;
							}), {}); n < r; n++) {
								var a = this.listenerMaps[n].id;
								if (a && (i[a] || i[sn(a)])) break;
							}
							this.listenerMaps.splice(n, 0, {
								id: e.id,
								map: e.listeners
							});
						} else e.listeners && this.listenerMaps.push({
							id: e.id,
							map: e.listeners
						});
						return this;
					}
				},
				{
					key: "addDocument",
					value: function(e, t) {
						if (this.getDocIndex(e) !== -1) return !1;
						var n = y(e);
						t = t ? L({}, t) : {}, this.documents.push({
							doc: e,
							options: t
						}), this.events.documents.push(e), e !== this.document && this.events.add(n, "unload", this.onWindowUnload), this.fire("scope:add-document", {
							doc: e,
							window: n,
							scope: this,
							options: t
						});
					}
				},
				{
					key: "removeDocument",
					value: function(e) {
						var t = this.getDocIndex(e), n = y(e), r = this.documents[t].options;
						this.events.remove(n, "unload", this.onWindowUnload), this.documents.splice(t, 1), this.events.documents.splice(t, 1), this.fire("scope:remove-document", {
							doc: e,
							window: n,
							scope: this,
							options: r
						});
					}
				},
				{
					key: "getDocIndex",
					value: function(e) {
						for (var t = 0; t < this.documents.length; t++) if (this.documents[t].doc === e) return t;
						return -1;
					}
				},
				{
					key: "getDocOptions",
					value: function(e) {
						var t = this.getDocIndex(e);
						return t === -1 ? null : this.documents[t].options;
					}
				},
				{
					key: "now",
					value: function() {
						return (this.window.Date || Date).now();
					}
				}
			]), e;
		}();
		function sn(e) {
			return e && e.replace(/\/.*$/, "");
		}
		var cn = new on(), ln = cn.interactStatic, un = typeof globalThis < "u" ? globalThis : window;
		cn.init(un);
		var dn = Object.freeze({
			__proto__: null,
			edgeTarget: function() {},
			elements: function() {},
			grid: function(e) {
				var t = [
					["x", "y"],
					["left", "top"],
					["right", "bottom"],
					["width", "height"]
				].filter((function(t) {
					var n = t[0], r = t[1];
					return n in e || r in e;
				})), n = function(n, r) {
					for (var i = e.range, a = e.limits, o = a === void 0 ? {
						left: -Infinity,
						right: Infinity,
						top: -Infinity,
						bottom: Infinity
					} : a, s = e.offset, c = s === void 0 ? {
						x: 0,
						y: 0
					} : s, l = {
						range: i,
						grid: e,
						x: null,
						y: null
					}, u = 0; u < t.length; u++) {
						var d = t[u], f = d[0], p = d[1], m = Math.round((n - c.x) / e[f]), h = Math.round((r - c.y) / e[p]);
						l[f] = Math.max(o.left, Math.min(o.right, m * e[f] + c.x)), l[p] = Math.max(o.top, Math.min(o.bottom, h * e[p] + c.y));
					}
					return l;
				};
				return n.grid = e, n.coordFields = t, n;
			}
		}), fn = {
			id: "snappers",
			install: function(e) {
				var t = e.interactStatic;
				t.snappers = L(t.snappers || {}, dn), t.createSnapGrid = t.snappers.grid;
			}
		}, pn = {
			start: function(e) {
				var t = e.state, r = e.rect, i = e.edges, a = e.pageCoords, o = t.options, s = o.ratio, c = o.enabled, l = t.options, u = l.equalDelta, d = l.modifiers;
				s === "preserve" && (s = r.width / r.height), t.startCoords = L({}, a), t.startRect = L({}, r), t.ratio = s, t.equalDelta = u;
				var f = t.linkedEdges = {
					top: i.top || i.left && !i.bottom,
					left: i.left || i.top && !i.right,
					bottom: i.bottom || i.right && !i.top,
					right: i.right || i.bottom && !i.left
				};
				if (t.xIsPrimaryAxis = !(!i.left && !i.right), t.equalDelta) {
					var p = (f.left ? 1 : -1) * (f.top ? 1 : -1);
					t.edgeSign = {
						x: p,
						y: p
					};
				} else t.edgeSign = {
					x: f.left ? -1 : 1,
					y: f.top ? -1 : 1
				};
				if (!1 !== c && L(i, f), d != null && d.length) {
					var m = new Et(e.interaction);
					m.copyFrom(e.interaction.modification), m.prepareStates(d), t.subModification = m, m.startAll(n({}, e));
				}
			},
			set: function(e) {
				var t = e.state, r = e.rect, i = e.coords, a = t.linkedEdges, o = L({}, i), s = t.equalDelta ? mn : hn;
				if (L(e.edges, a), s(t, t.xIsPrimaryAxis, i, r), !t.subModification) return null;
				var c = L({}, r);
				de(a, c, {
					x: i.x - o.x,
					y: i.y - o.y
				});
				var l = t.subModification.setAll(n(n({}, e), {}, {
					rect: c,
					edges: a,
					pageCoords: i,
					prevCoords: i,
					prevRect: c
				})), u = l.delta;
				return l.changed && (s(t, Math.abs(u.x) > Math.abs(u.y), l.coords, l.rect), L(i, l.coords)), l.eventProps;
			},
			defaults: {
				ratio: "preserve",
				equalDelta: !1,
				modifiers: [],
				enabled: !1
			}
		};
		function mn(e, t, n) {
			var r = e.startCoords, i = e.edgeSign;
			t ? n.y = r.y + (n.x - r.x) * i.y : n.x = r.x + (n.y - r.y) * i.x;
		}
		function hn(e, t, n, r) {
			var i = e.startRect, a = e.startCoords, o = e.ratio, s = e.edgeSign;
			if (t) {
				var c = r.width / o;
				n.y = a.y + (c - i.height) * s.y;
			} else {
				var l = r.height * o;
				n.x = a.x + (l - i.width) * s.x;
			}
		}
		var gn = Ot(pn, "aspectRatio"), _n = function() {};
		_n._defaults = {};
		var vn = _n;
		function yn(e, t, n) {
			return S.func(e) ? ce(e, t.interactable, t.element, [
				n.x,
				n.y,
				t
			]) : ce(e, t.interactable, t.element);
		}
		var bn = {
			start: function(e) {
				var t = e.rect, n = e.startOffset, r = e.state, i = e.interaction, a = e.pageCoords, o = r.options, s = o.elementRect, c = L({
					left: 0,
					top: 0,
					right: 0,
					bottom: 0
				}, o.offset || {});
				if (t && s) {
					var l = yn(o.restriction, i, a);
					if (l) {
						var u = l.right - l.left - t.width, d = l.bottom - l.top - t.height;
						u < 0 && (c.left += u, c.right += u), d < 0 && (c.top += d, c.bottom += d);
					}
					c.left += n.left - t.width * s.left, c.top += n.top - t.height * s.top, c.right += n.right - t.width * (1 - s.right), c.bottom += n.bottom - t.height * (1 - s.bottom);
				}
				r.offset = c;
			},
			set: function(e) {
				var t = e.coords, n = e.interaction, r = e.state, i = r.options, a = r.offset, o = yn(i.restriction, n, t);
				if (o) {
					var s = function(e) {
						return !e || "left" in e && "top" in e || ((e = L({}, e)).left = e.x || 0, e.top = e.y || 0, e.right = e.right || e.left + e.width, e.bottom = e.bottom || e.top + e.height), e;
					}(o);
					t.x = Math.max(Math.min(s.right - a.right, t.x), s.left + a.left), t.y = Math.max(Math.min(s.bottom - a.bottom, t.y), s.top + a.top);
				}
			},
			defaults: {
				restriction: null,
				elementRect: null,
				offset: null,
				endOnly: !1,
				enabled: !1
			}
		}, xn = Ot(bn, "restrict"), Sn = {
			top: Infinity,
			left: Infinity,
			bottom: -Infinity,
			right: -Infinity
		}, Cn = {
			top: -Infinity,
			left: -Infinity,
			bottom: Infinity,
			right: Infinity
		};
		function wn(e, t) {
			for (var n = 0, r = [
				"top",
				"left",
				"bottom",
				"right"
			]; n < r.length; n++) {
				var i = r[n];
				i in e || (e[i] = t[i]);
			}
			return e;
		}
		var Tn = {
			noInner: Sn,
			noOuter: Cn,
			start: function(e) {
				var t, n = e.interaction, r = e.startOffset, i = e.state, a = i.options;
				a && (t = le(yn(a.offset, n, n.coords.start.page))), t ||= {
					x: 0,
					y: 0
				}, i.offset = {
					top: t.y + r.top,
					left: t.x + r.left,
					bottom: t.y - r.bottom,
					right: t.x - r.right
				};
			},
			set: function(e) {
				var t = e.coords, n = e.edges, r = e.interaction, i = e.state, a = i.offset, o = i.options;
				if (n) {
					var s = L({}, t), c = yn(o.inner, r, s) || {}, l = yn(o.outer, r, s) || {};
					wn(c, Sn), wn(l, Cn), n.top ? t.y = Math.min(Math.max(l.top + a.top, s.y), c.top + a.top) : n.bottom && (t.y = Math.max(Math.min(l.bottom + a.bottom, s.y), c.bottom + a.bottom)), n.left ? t.x = Math.min(Math.max(l.left + a.left, s.x), c.left + a.left) : n.right && (t.x = Math.max(Math.min(l.right + a.right, s.x), c.right + a.right));
				}
			},
			defaults: {
				inner: null,
				outer: null,
				offset: null,
				endOnly: !1,
				enabled: !1
			}
		}, En = Ot(Tn, "restrictEdges"), Dn = L({
			get elementRect() {
				return {
					top: 0,
					left: 0,
					bottom: 1,
					right: 1
				};
			},
			set elementRect(e) {}
		}, bn.defaults), On = Ot({
			start: bn.start,
			set: bn.set,
			defaults: Dn
		}, "restrictRect"), kn = {
			width: -Infinity,
			height: -Infinity
		}, An = {
			width: Infinity,
			height: Infinity
		}, jn = Ot({
			start: function(e) {
				return Tn.start(e);
			},
			set: function(e) {
				var t = e.interaction, n = e.state, r = e.rect, i = e.edges, a = n.options;
				if (i) {
					var o = ue(yn(a.min, t, e.coords)) || kn, s = ue(yn(a.max, t, e.coords)) || An;
					n.options = {
						endOnly: a.endOnly,
						inner: L({}, Tn.noInner),
						outer: L({}, Tn.noOuter)
					}, i.top ? (n.options.inner.top = r.bottom - o.height, n.options.outer.top = r.bottom - s.height) : i.bottom && (n.options.inner.bottom = r.top + o.height, n.options.outer.bottom = r.top + s.height), i.left ? (n.options.inner.left = r.right - o.width, n.options.outer.left = r.right - s.width) : i.right && (n.options.inner.right = r.left + o.width, n.options.outer.right = r.left + s.width), Tn.set(e), n.options = a;
				}
			},
			defaults: {
				min: null,
				max: null,
				endOnly: !1,
				enabled: !1
			}
		}, "restrictSize"), Mn = {
			start: function(e) {
				var t, n = e.interaction, r = e.interactable, i = e.element, a = e.rect, o = e.state, s = e.startOffset, c = o.options, l = c.offsetWithOrigin ? function(e) {
					var t = e.interaction.element;
					return le(ce(e.state.options.origin, null, null, [t])) || fe(e.interactable, t, e.interaction.prepared.name);
				}(e) : {
					x: 0,
					y: 0
				};
				if (c.offset === "startCoords") t = {
					x: n.coords.start.page.x,
					y: n.coords.start.page.y
				};
				else {
					var u = ce(c.offset, r, i, [n]);
					(t = le(u) || {
						x: 0,
						y: 0
					}).x += l.x, t.y += l.y;
				}
				var d = c.relativePoints;
				o.offsets = a && d && d.length ? d.map((function(e, n) {
					return {
						index: n,
						relativePoint: e,
						x: s.left - a.width * e.x + t.x,
						y: s.top - a.height * e.y + t.y
					};
				})) : [{
					index: 0,
					relativePoint: null,
					x: t.x,
					y: t.y
				}];
			},
			set: function(e) {
				var t = e.interaction, n = e.coords, r = e.state, i = r.options, a = r.offsets, o = fe(t.interactable, t.element, t.prepared.name), s = L({}, n), c = [];
				i.offsetWithOrigin || (s.x -= o.x, s.y -= o.y);
				for (var l = 0, u = a; l < u.length; l++) for (var d = u[l], f = s.x - d.x, p = s.y - d.y, m = 0, h = i.targets.length; m < h; m++) {
					var g = i.targets[m], _ = void 0;
					(_ = S.func(g) ? g(f, p, t._proxy, d, m) : g) && c.push({
						x: (S.number(_.x) ? _.x : f) + d.x,
						y: (S.number(_.y) ? _.y : p) + d.y,
						range: S.number(_.range) ? _.range : i.range,
						source: g,
						index: m,
						offset: d
					});
				}
				for (var v = {
					target: null,
					inRange: !1,
					distance: 0,
					range: 0,
					delta: {
						x: 0,
						y: 0
					}
				}, y = 0; y < c.length; y++) {
					var b = c[y], x = b.range, C = b.x - s.x, w = b.y - s.y, T = he(C, w), E = T <= x;
					x === Infinity && v.inRange && v.range !== Infinity && (E = !1), v.target && !(E ? v.inRange && x !== Infinity ? T / x < v.distance / v.range : x === Infinity && v.range !== Infinity || T < v.distance : !v.inRange && T < v.distance) || (v.target = b, v.distance = T, v.range = x, v.inRange = E, v.delta.x = C, v.delta.y = w);
				}
				return v.inRange && (n.x = v.target.x, n.y = v.target.y), r.closest = v, v;
			},
			defaults: {
				range: Infinity,
				targets: null,
				offset: null,
				offsetWithOrigin: !0,
				origin: null,
				relativePoints: null,
				endOnly: !1,
				enabled: !1
			}
		}, Nn = Ot(Mn, "snap"), Pn = {
			start: function(e) {
				var t = e.state, n = e.edges, r = t.options;
				if (!n) return null;
				e.state = { options: {
					targets: null,
					relativePoints: [{
						x: +!n.left,
						y: +!n.top
					}],
					offset: r.offset || "self",
					origin: {
						x: 0,
						y: 0
					},
					range: r.range
				} }, t.targetFields = t.targetFields || [["width", "height"], ["x", "y"]], Mn.start(e), t.offsets = e.state.offsets, e.state = t;
			},
			set: function(e) {
				var t = e.interaction, n = e.state, r = e.coords, i = n.options, a = n.offsets, o = {
					x: r.x - a[0].x,
					y: r.y - a[0].y
				};
				n.options = L({}, i), n.options.targets = [];
				for (var s = 0, c = i.targets || []; s < c.length; s++) {
					var l = c[s], u = void 0;
					if (u = S.func(l) ? l(o.x, o.y, t) : l) {
						for (var d = 0, f = n.targetFields; d < f.length; d++) {
							var p = f[d], m = p[0], h = p[1];
							if (m in u || h in u) {
								u.x = u[m], u.y = u[h];
								break;
							}
						}
						n.options.targets.push(u);
					}
				}
				var g = Mn.set(e);
				return n.options = i, g;
			},
			defaults: {
				range: Infinity,
				targets: null,
				offset: null,
				endOnly: !1,
				enabled: !1
			}
		}, Fn = Ot(Pn, "snapSize"), In = {
			aspectRatio: gn,
			restrictEdges: En,
			restrict: xn,
			restrictRect: On,
			restrictSize: jn,
			snapEdges: Ot({
				start: function(e) {
					var t = e.edges;
					return t ? (e.state.targetFields = e.state.targetFields || [[t.left ? "left" : "right", t.top ? "top" : "bottom"]], Pn.start(e)) : null;
				},
				set: Pn.set,
				defaults: L(Tt(Pn.defaults), {
					targets: void 0,
					range: void 0,
					offset: {
						x: 0,
						y: 0
					}
				})
			}, "snapEdges"),
			snap: Nn,
			snapSize: Fn,
			spring: vn,
			avoid: vn,
			transform: vn,
			rubberband: vn
		}, Ln = {
			id: "modifiers",
			install: function(e) {
				var t = e.interactStatic;
				for (var n in e.usePlugin(At), e.usePlugin(fn), t.modifiers = In, In) {
					var r = In[n], i = r._defaults;
					i._methods = r._methods, e.defaults.perAction[n] = i;
				}
			}
		}, Rn = function(e) {
			c(n, e);
			var t = f(n);
			function n(e, r, a, o, s, c) {
				var l;
				if (i(this, n), _e(d(l = t.call(this, s)), a), a !== r && _e(d(l), r), l.timeStamp = c, l.originalEvent = a, l.type = e, l.pointerId = Ce(r), l.pointerType = ke(r), l.target = o, l.currentTarget = null, e === "tap") {
					var u = s.getPointerIndex(r);
					l.dt = l.timeStamp - s.pointers[u].downTime;
					var f = l.timeStamp - s.tapTime;
					l.double = !!s.prevTap && s.prevTap.type !== "doubletap" && s.prevTap.target === l.target && f < 500;
				} else e === "doubletap" && (l.dt = r.timeStamp - s.tapTime, l.double = !0);
				return l;
			}
			return o(n, [
				{
					key: "_subtractOrigin",
					value: function(e) {
						var t = e.x, n = e.y;
						return this.pageX -= t, this.pageY -= n, this.clientX -= t, this.clientY -= n, this;
					}
				},
				{
					key: "_addOrigin",
					value: function(e) {
						var t = e.x, n = e.y;
						return this.pageX += t, this.pageY += n, this.clientX += t, this.clientY += n, this;
					}
				},
				{
					key: "preventDefault",
					value: function() {
						this.originalEvent.preventDefault();
					}
				}
			]), n;
		}(je), zn = {
			id: "pointer-events/base",
			before: [
				"inertia",
				"modifiers",
				"auto-start",
				"actions"
			],
			install: function(e) {
				e.pointerEvents = zn, e.defaults.actions.pointerEvents = zn.defaults, L(e.actions.phaselessTypes, zn.types);
			},
			listeners: {
				"interactions:new": function(e) {
					var t = e.interaction;
					t.prevTap = null, t.tapTime = 0;
				},
				"interactions:update-pointer": function(e) {
					var t = e.down, n = e.pointerInfo;
					!t && n.hold || (n.hold = {
						duration: Infinity,
						timeout: null
					});
				},
				"interactions:move": function(e, t) {
					var n = e.interaction, r = e.pointer, i = e.event, a = e.eventTarget;
					e.duplicate || n.pointerIsDown && !n.pointerWasMoved || (n.pointerIsDown && Hn(e), Bn({
						interaction: n,
						pointer: r,
						event: i,
						eventTarget: a,
						type: "move"
					}, t));
				},
				"interactions:down": function(e, t) {
					(function(e, t) {
						for (var n = e.interaction, r = e.pointer, i = e.event, a = e.eventTarget, o = e.pointerIndex, s = n.pointers[o].hold, c = ae(a), l = {
							interaction: n,
							pointer: r,
							event: i,
							eventTarget: a,
							type: "hold",
							targets: [],
							path: c,
							node: null
						}, u = 0; u < c.length; u++) l.node = c[u], t.fire("pointerEvents:collect-targets", l);
						if (l.targets.length) {
							for (var d = Infinity, f = 0, p = l.targets; f < p.length; f++) {
								var m = p[f].eventable.options.holdDuration;
								m < d && (d = m);
							}
							s.duration = d, s.timeout = setTimeout((function() {
								Bn({
									interaction: n,
									eventTarget: a,
									pointer: r,
									event: i,
									type: "hold"
								}, t);
							}), d);
						}
					})(e, t), Bn(e, t);
				},
				"interactions:up": function(e, t) {
					Hn(e), Bn(e, t), function(e, t) {
						var n = e.interaction, r = e.pointer, i = e.event, a = e.eventTarget;
						n.pointerWasMoved || Bn({
							interaction: n,
							eventTarget: a,
							pointer: r,
							event: i,
							type: "tap"
						}, t);
					}(e, t);
				},
				"interactions:cancel": function(e, t) {
					Hn(e), Bn(e, t);
				}
			},
			PointerEvent: Rn,
			fire: Bn,
			collectEventTargets: Vn,
			defaults: {
				holdDuration: 600,
				ignoreFrom: null,
				allowFrom: null,
				origin: {
					x: 0,
					y: 0
				}
			},
			types: {
				down: !0,
				move: !0,
				up: !0,
				cancel: !0,
				tap: !0,
				doubletap: !0,
				hold: !0
			}
		};
		function Bn(e, t) {
			var n = e.interaction, r = e.pointer, i = e.event, a = e.eventTarget, o = e.type, s = e.targets, c = s === void 0 ? Vn(e, t) : s, l = new Rn(o, r, i, a, n, t.now());
			t.fire("pointerEvents:new", { pointerEvent: l });
			for (var u = {
				interaction: n,
				pointer: r,
				event: i,
				eventTarget: a,
				targets: c,
				type: o,
				pointerEvent: l
			}, d = 0; d < c.length; d++) {
				var f = c[d];
				for (var p in f.props || {}) l[p] = f.props[p];
				var m = fe(f.eventable, f.node);
				if (l._subtractOrigin(m), l.eventable = f.eventable, l.currentTarget = f.node, f.eventable.fire(l), l._addOrigin(m), l.immediatePropagationStopped || l.propagationStopped && d + 1 < c.length && c[d + 1].node !== l.currentTarget) break;
			}
			if (t.fire("pointerEvents:fired", u), o === "tap") {
				var h = l.double ? Bn({
					interaction: n,
					pointer: r,
					event: i,
					eventTarget: a,
					type: "doubletap"
				}, t) : l;
				n.prevTap = h, n.tapTime = h.timeStamp;
			}
			return l;
		}
		function Vn(e, t) {
			var n = e.interaction, r = e.pointer, i = e.event, a = e.eventTarget, o = e.type, s = n.getPointerIndex(r), c = n.pointers[s];
			if (o === "tap" && (n.pointerWasMoved || !c || c.downTarget !== a)) return [];
			for (var l = ae(a), u = {
				interaction: n,
				pointer: r,
				event: i,
				eventTarget: a,
				type: o,
				path: l,
				targets: [],
				node: null
			}, d = 0; d < l.length; d++) u.node = l[d], t.fire("pointerEvents:collect-targets", u);
			return o === "hold" && (u.targets = u.targets.filter((function(e) {
				var t, r;
				return e.eventable.options.holdDuration === ((t = n.pointers[s]) == null || (r = t.hold) == null ? void 0 : r.duration);
			}))), u.targets;
		}
		function Hn(e) {
			var t = e.interaction, n = e.pointerIndex, r = t.pointers[n].hold;
			r && r.timeout && (clearTimeout(r.timeout), r.timeout = null);
		}
		var Un = Object.freeze({
			__proto__: null,
			default: zn
		});
		function Wn(e) {
			var t = e.interaction;
			t.holdIntervalHandle &&= (clearInterval(t.holdIntervalHandle), null);
		}
		var Gn = {
			id: "pointer-events/holdRepeat",
			install: function(e) {
				e.usePlugin(zn);
				var t = e.pointerEvents;
				t.defaults.holdRepeatInterval = 0, t.types.holdrepeat = e.actions.phaselessTypes.holdrepeat = !0;
			},
			listeners: [
				"move",
				"up",
				"cancel",
				"endall"
			].reduce((function(e, t) {
				return e[`pointerEvents:${t}`] = Wn, e;
			}), {
				"pointerEvents:new": function(e) {
					var t = e.pointerEvent;
					t.type === "hold" && (t.count = (t.count || 0) + 1);
				},
				"pointerEvents:fired": function(e, t) {
					var n = e.interaction, r = e.pointerEvent, i = e.eventTarget, a = e.targets;
					if (r.type === "hold" && a.length) {
						var o = a[0].eventable.options.holdRepeatInterval;
						o <= 0 || (n.holdIntervalHandle = setTimeout((function() {
							t.pointerEvents.fire({
								interaction: n,
								eventTarget: i,
								type: "hold",
								pointer: r,
								event: r
							}, t);
						}), o));
					}
				}
			})
		}, Kn = {
			id: "pointer-events/interactableTargets",
			install: function(e) {
				var t = e.Interactable;
				t.prototype.pointerEvents = function(e) {
					return L(this.events.options, e), this;
				};
				var n = t.prototype._backCompatOption;
				t.prototype._backCompatOption = function(e, t) {
					var r = n.call(this, e, t);
					return r === this && (this.events.options[e] = t), r;
				};
			},
			listeners: {
				"pointerEvents:collect-targets": function(e, t) {
					var n = e.targets, r = e.node, i = e.type, a = e.eventTarget;
					t.interactables.forEachMatch(r, (function(e) {
						var t = e.events, o = t.options;
						t.types[i] && t.types[i].length && e.testIgnoreAllow(o, r, a) && n.push({
							node: r,
							eventable: t,
							props: { interactable: e }
						});
					}));
				},
				"interactable:new": function(e) {
					var t = e.interactable;
					t.events.getRect = function(e) {
						return t.getRect(e);
					};
				},
				"interactable:set": function(e, t) {
					var n = e.interactable, r = e.options;
					L(n.events.options, t.pointerEvents.defaults), L(n.events.options, r.pointerEvents || {});
				}
			}
		};
		if (ln.use(Ct), ln.use(It), ln.use({
			id: "pointer-events",
			install: function(e) {
				e.usePlugin(Un), e.usePlugin(Gn), e.usePlugin(Kn);
			}
		}), ln.use(Ht), ln.use(Ln), ln.use(H), ln.use(et), ln.use(at), ln.use({
			id: "reflow",
			install: function(e) {
				var t = e.Interactable;
				e.actions.phases.reflow = !0, t.prototype.reflow = function(t) {
					return function(e, t, n) {
						for (var r = e.getAllElements(), i = n.window.Promise, a = i ? [] : null, o = function() {
							var o = r[s], c = e.getRect(o);
							if (!c) return 1;
							var l, u = Fe(n.interactions.list, (function(n) {
								return n.interacting() && n.interactable === e && n.element === o && n.prepared.name === t.name;
							}));
							if (u) u.move(), a && (l = u._reflowPromise || new i((function(e) {
								u._reflowResolve = e;
							})));
							else {
								var d = ue(c);
								l = function(e, t, n, r, i) {
									var a = e.interactions.new({ pointerType: "reflow" }), o = {
										interaction: a,
										event: i,
										pointer: i,
										eventTarget: n,
										phase: "reflow"
									};
									a.interactable = t, a.element = n, a.prevEvent = i, a.updatePointer(i, i, n, !0), ye(a.coords.delta), st(a.prepared, r), a._doPhase(o);
									var s = e.window.Promise, c = s ? new s((function(e) {
										a._reflowResolve = e;
									})) : void 0;
									return a._reflowPromise = c, a.start(r, t, n), a._interacting ? (a.move(o), a.end(i)) : (a.stop(), a._reflowResolve()), a.removePointer(i, i), c;
								}(n, e, o, t, function(e) {
									return {
										coords: e,
										get page() {
											return this.coords.page;
										},
										get client() {
											return this.coords.client;
										},
										get timeStamp() {
											return this.coords.timeStamp;
										},
										get pageX() {
											return this.coords.page.x;
										},
										get pageY() {
											return this.coords.page.y;
										},
										get clientX() {
											return this.coords.client.x;
										},
										get clientY() {
											return this.coords.client.y;
										},
										get pointerId() {
											return this.coords.pointerId;
										},
										get target() {
											return this.coords.target;
										},
										get type() {
											return this.coords.type;
										},
										get pointerType() {
											return this.coords.pointerType;
										},
										get buttons() {
											return this.coords.buttons;
										},
										preventDefault: function() {}
									};
								}({
									page: {
										x: d.x,
										y: d.y
									},
									client: {
										x: d.x,
										y: d.y
									},
									timeStamp: n.now()
								}));
							}
							a && a.push(l);
						}, s = 0; s < r.length && !o(); s++);
						return a && i.all(a).then((function() {
							return e;
						}));
					}(this, t, e);
				};
			},
			listeners: { "interactions:stop": function(e, t) {
				var n = e.interaction;
				n.pointerType === "reflow" && (n._reflowResolve && n._reflowResolve(), function(e, t) {
					e.splice(e.indexOf(t), 1);
				}(t.interactions.list, n));
			} }
		}), ln.default = ln, (t === void 0 ? "undefined" : r(t)) === "object" && t) try {
			t.exports = ln;
		} catch {}
		return ln.default = ln, ln;
	}));
})), Ea = function(e, t) {
	return Ea = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(e, t) {
		e.__proto__ = t;
	} || function(e, t) {
		for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
	}, Ea(e, t);
};
function Da(e, t) {
	if (typeof t != "function" && t !== null) throw TypeError("Class extends value " + String(t) + " is not a constructor or null");
	Ea(e, t);
	function n() {
		this.constructor = e;
	}
	e.prototype = t === null ? Object.create(t) : (n.prototype = t.prototype, new n());
}
function Oa(e) {
	var t = typeof Symbol == "function" && Symbol.iterator, n = t && e[t], r = 0;
	if (n) return n.call(e);
	if (e && typeof e.length == "number") return { next: function() {
		return e && r >= e.length && (e = void 0), {
			value: e && e[r++],
			done: !e
		};
	} };
	throw TypeError(t ? "Object is not iterable." : "Symbol.iterator is not defined.");
}
function ka(e, t) {
	var n = typeof Symbol == "function" && e[Symbol.iterator];
	if (!n) return e;
	var r = n.call(e), i, a = [], o;
	try {
		for (; (t === void 0 || t-- > 0) && !(i = r.next()).done;) a.push(i.value);
	} catch (e) {
		o = { error: e };
	} finally {
		try {
			i && !i.done && (n = r.return) && n.call(r);
		} finally {
			if (o) throw o.error;
		}
	}
	return a;
}
function Aa(e, t, n) {
	if (n || arguments.length === 2) for (var r = 0, i = t.length, a; r < i; r++) (a || !(r in t)) && (a ||= Array.prototype.slice.call(t, 0, r), a[r] = t[r]);
	return e.concat(a || Array.prototype.slice.call(t));
}
//#endregion
//#region node_modules/.pnpm/rxjs@7.8.2/node_modules/rxjs/dist/esm5/internal/util/isFunction.js
function ja(e) {
	return typeof e == "function";
}
//#endregion
//#region node_modules/.pnpm/rxjs@7.8.2/node_modules/rxjs/dist/esm5/internal/util/createErrorClass.js
function Ma(e) {
	var t = e(function(e) {
		Error.call(e), e.stack = (/* @__PURE__ */ Error()).stack;
	});
	return t.prototype = Object.create(Error.prototype), t.prototype.constructor = t, t;
}
//#endregion
//#region node_modules/.pnpm/rxjs@7.8.2/node_modules/rxjs/dist/esm5/internal/util/UnsubscriptionError.js
var Na = Ma(function(e) {
	return function(t) {
		e(this), this.message = t ? t.length + " errors occurred during unsubscription:\n" + t.map(function(e, t) {
			return t + 1 + ") " + e.toString();
		}).join("\n  ") : "", this.name = "UnsubscriptionError", this.errors = t;
	};
});
//#endregion
//#region node_modules/.pnpm/rxjs@7.8.2/node_modules/rxjs/dist/esm5/internal/util/arrRemove.js
function Pa(e, t) {
	if (e) {
		var n = e.indexOf(t);
		0 <= n && e.splice(n, 1);
	}
}
//#endregion
//#region node_modules/.pnpm/rxjs@7.8.2/node_modules/rxjs/dist/esm5/internal/Subscription.js
var Fa = function() {
	function e(e) {
		this.initialTeardown = e, this.closed = !1, this._parentage = null, this._finalizers = null;
	}
	return e.prototype.unsubscribe = function() {
		var e, t, n, r, i;
		if (!this.closed) {
			this.closed = !0;
			var a = this._parentage;
			if (a) if (this._parentage = null, Array.isArray(a)) try {
				for (var o = Oa(a), s = o.next(); !s.done; s = o.next()) s.value.remove(this);
			} catch (t) {
				e = { error: t };
			} finally {
				try {
					s && !s.done && (t = o.return) && t.call(o);
				} finally {
					if (e) throw e.error;
				}
			}
			else a.remove(this);
			var c = this.initialTeardown;
			if (ja(c)) try {
				c();
			} catch (e) {
				i = e instanceof Na ? e.errors : [e];
			}
			var l = this._finalizers;
			if (l) {
				this._finalizers = null;
				try {
					for (var u = Oa(l), d = u.next(); !d.done; d = u.next()) {
						var f = d.value;
						try {
							Ra(f);
						} catch (e) {
							i ??= [], e instanceof Na ? i = Aa(Aa([], ka(i)), ka(e.errors)) : i.push(e);
						}
					}
				} catch (e) {
					n = { error: e };
				} finally {
					try {
						d && !d.done && (r = u.return) && r.call(u);
					} finally {
						if (n) throw n.error;
					}
				}
			}
			if (i) throw new Na(i);
		}
	}, e.prototype.add = function(t) {
		if (t && t !== this) if (this.closed) Ra(t);
		else {
			if (t instanceof e) {
				if (t.closed || t._hasParent(this)) return;
				t._addParent(this);
			}
			(this._finalizers = this._finalizers ?? []).push(t);
		}
	}, e.prototype._hasParent = function(e) {
		var t = this._parentage;
		return t === e || Array.isArray(t) && t.includes(e);
	}, e.prototype._addParent = function(e) {
		var t = this._parentage;
		this._parentage = Array.isArray(t) ? (t.push(e), t) : t ? [t, e] : e;
	}, e.prototype._removeParent = function(e) {
		var t = this._parentage;
		t === e ? this._parentage = null : Array.isArray(t) && Pa(t, e);
	}, e.prototype.remove = function(t) {
		var n = this._finalizers;
		n && Pa(n, t), t instanceof e && t._removeParent(this);
	}, e.EMPTY = (function() {
		var t = new e();
		return t.closed = !0, t;
	})(), e;
}(), Ia = Fa.EMPTY;
function La(e) {
	return e instanceof Fa || e && "closed" in e && ja(e.remove) && ja(e.add) && ja(e.unsubscribe);
}
function Ra(e) {
	ja(e) ? e() : e.unsubscribe();
}
//#endregion
//#region node_modules/.pnpm/rxjs@7.8.2/node_modules/rxjs/dist/esm5/internal/config.js
var za = {
	onUnhandledError: null,
	onStoppedNotification: null,
	Promise: void 0,
	useDeprecatedSynchronousErrorHandling: !1,
	useDeprecatedNextContext: !1
}, Ba = {
	setTimeout: function(e, t) {
		var n = [...arguments].slice(2), r = Ba.delegate;
		return r?.setTimeout ? r.setTimeout.apply(r, Aa([e, t], ka(n))) : setTimeout.apply(void 0, Aa([e, t], ka(n)));
	},
	clearTimeout: function(e) {
		return (Ba.delegate?.clearTimeout || clearTimeout)(e);
	},
	delegate: void 0
};
//#endregion
//#region node_modules/.pnpm/rxjs@7.8.2/node_modules/rxjs/dist/esm5/internal/util/reportUnhandledError.js
function Va(e) {
	Ba.setTimeout(function() {
		var t = za.onUnhandledError;
		if (t) t(e);
		else throw e;
	});
}
//#endregion
//#region node_modules/.pnpm/rxjs@7.8.2/node_modules/rxjs/dist/esm5/internal/util/noop.js
function Ha() {}
//#endregion
//#region node_modules/.pnpm/rxjs@7.8.2/node_modules/rxjs/dist/esm5/internal/NotificationFactories.js
var Ua = (function() {
	return Ka("C", void 0, void 0);
})();
function Wa(e) {
	return Ka("E", void 0, e);
}
function Ga(e) {
	return Ka("N", e, void 0);
}
function Ka(e, t, n) {
	return {
		kind: e,
		value: t,
		error: n
	};
}
//#endregion
//#region node_modules/.pnpm/rxjs@7.8.2/node_modules/rxjs/dist/esm5/internal/util/errorContext.js
var qa = null;
function Ja(e) {
	if (za.useDeprecatedSynchronousErrorHandling) {
		var t = !qa;
		if (t && (qa = {
			errorThrown: !1,
			error: null
		}), e(), t) {
			var n = qa, r = n.errorThrown, i = n.error;
			if (qa = null, r) throw i;
		}
	} else e();
}
function Ya(e) {
	za.useDeprecatedSynchronousErrorHandling && qa && (qa.errorThrown = !0, qa.error = e);
}
//#endregion
//#region node_modules/.pnpm/rxjs@7.8.2/node_modules/rxjs/dist/esm5/internal/Subscriber.js
var Xa = function(e) {
	Da(t, e);
	function t(t) {
		var n = e.call(this) || this;
		return n.isStopped = !1, t ? (n.destination = t, La(t) && t.add(n)) : n.destination = io, n;
	}
	return t.create = function(e, t, n) {
		return new eo(e, t, n);
	}, t.prototype.next = function(e) {
		this.isStopped ? ro(Ga(e), this) : this._next(e);
	}, t.prototype.error = function(e) {
		this.isStopped ? ro(Wa(e), this) : (this.isStopped = !0, this._error(e));
	}, t.prototype.complete = function() {
		this.isStopped ? ro(Ua, this) : (this.isStopped = !0, this._complete());
	}, t.prototype.unsubscribe = function() {
		this.closed || (this.isStopped = !0, e.prototype.unsubscribe.call(this), this.destination = null);
	}, t.prototype._next = function(e) {
		this.destination.next(e);
	}, t.prototype._error = function(e) {
		try {
			this.destination.error(e);
		} finally {
			this.unsubscribe();
		}
	}, t.prototype._complete = function() {
		try {
			this.destination.complete();
		} finally {
			this.unsubscribe();
		}
	}, t;
}(Fa), Za = Function.prototype.bind;
function Qa(e, t) {
	return Za.call(e, t);
}
var $a = function() {
	function e(e) {
		this.partialObserver = e;
	}
	return e.prototype.next = function(e) {
		var t = this.partialObserver;
		if (t.next) try {
			t.next(e);
		} catch (e) {
			to(e);
		}
	}, e.prototype.error = function(e) {
		var t = this.partialObserver;
		if (t.error) try {
			t.error(e);
		} catch (e) {
			to(e);
		}
		else to(e);
	}, e.prototype.complete = function() {
		var e = this.partialObserver;
		if (e.complete) try {
			e.complete();
		} catch (e) {
			to(e);
		}
	}, e;
}(), eo = function(e) {
	Da(t, e);
	function t(t, n, r) {
		var i = e.call(this) || this, a;
		if (ja(t) || !t) a = {
			next: t ?? void 0,
			error: n ?? void 0,
			complete: r ?? void 0
		};
		else {
			var o;
			i && za.useDeprecatedNextContext ? (o = Object.create(t), o.unsubscribe = function() {
				return i.unsubscribe();
			}, a = {
				next: t.next && Qa(t.next, o),
				error: t.error && Qa(t.error, o),
				complete: t.complete && Qa(t.complete, o)
			}) : a = t;
		}
		return i.destination = new $a(a), i;
	}
	return t;
}(Xa);
function to(e) {
	za.useDeprecatedSynchronousErrorHandling ? Ya(e) : Va(e);
}
function no(e) {
	throw e;
}
function ro(e, t) {
	var n = za.onStoppedNotification;
	n && Ba.setTimeout(function() {
		return n(e, t);
	});
}
var io = {
	closed: !0,
	next: Ha,
	error: no,
	complete: Ha
}, ao = (function() {
	return typeof Symbol == "function" && Symbol.observable || "@@observable";
})();
//#endregion
//#region node_modules/.pnpm/rxjs@7.8.2/node_modules/rxjs/dist/esm5/internal/util/identity.js
function oo(e) {
	return e;
}
//#endregion
//#region node_modules/.pnpm/rxjs@7.8.2/node_modules/rxjs/dist/esm5/internal/util/pipe.js
function so(e) {
	return e.length === 0 ? oo : e.length === 1 ? e[0] : function(t) {
		return e.reduce(function(e, t) {
			return t(e);
		}, t);
	};
}
//#endregion
//#region node_modules/.pnpm/rxjs@7.8.2/node_modules/rxjs/dist/esm5/internal/Observable.js
var co = function() {
	function e(e) {
		e && (this._subscribe = e);
	}
	return e.prototype.lift = function(t) {
		var n = new e();
		return n.source = this, n.operator = t, n;
	}, e.prototype.subscribe = function(e, t, n) {
		var r = this, i = fo(e) ? e : new eo(e, t, n);
		return Ja(function() {
			var e = r, t = e.operator, n = e.source;
			i.add(t ? t.call(i, n) : n ? r._subscribe(i) : r._trySubscribe(i));
		}), i;
	}, e.prototype._trySubscribe = function(e) {
		try {
			return this._subscribe(e);
		} catch (t) {
			e.error(t);
		}
	}, e.prototype.forEach = function(e, t) {
		var n = this;
		return t = lo(t), new t(function(t, r) {
			var i = new eo({
				next: function(t) {
					try {
						e(t);
					} catch (e) {
						r(e), i.unsubscribe();
					}
				},
				error: r,
				complete: t
			});
			n.subscribe(i);
		});
	}, e.prototype._subscribe = function(e) {
		return this.source?.subscribe(e);
	}, e.prototype[ao] = function() {
		return this;
	}, e.prototype.pipe = function() {
		return so([...arguments])(this);
	}, e.prototype.toPromise = function(e) {
		var t = this;
		return e = lo(e), new e(function(e, n) {
			var r;
			t.subscribe(function(e) {
				return r = e;
			}, function(e) {
				return n(e);
			}, function() {
				return e(r);
			});
		});
	}, e.create = function(t) {
		return new e(t);
	}, e;
}();
function lo(e) {
	return e ?? za.Promise ?? Promise;
}
function uo(e) {
	return e && ja(e.next) && ja(e.error) && ja(e.complete);
}
function fo(e) {
	return e && e instanceof Xa || uo(e) && La(e);
}
//#endregion
//#region node_modules/.pnpm/rxjs@7.8.2/node_modules/rxjs/dist/esm5/internal/util/ObjectUnsubscribedError.js
var po = Ma(function(e) {
	return function() {
		e(this), this.name = "ObjectUnsubscribedError", this.message = "object unsubscribed";
	};
}), mo = function(e) {
	Da(t, e);
	function t() {
		var t = e.call(this) || this;
		return t.closed = !1, t.currentObservers = null, t.observers = [], t.isStopped = !1, t.hasError = !1, t.thrownError = null, t;
	}
	return t.prototype.lift = function(e) {
		var t = new ho(this, this);
		return t.operator = e, t;
	}, t.prototype._throwIfClosed = function() {
		if (this.closed) throw new po();
	}, t.prototype.next = function(e) {
		var t = this;
		Ja(function() {
			var n, r;
			if (t._throwIfClosed(), !t.isStopped) {
				t.currentObservers ||= Array.from(t.observers);
				try {
					for (var i = Oa(t.currentObservers), a = i.next(); !a.done; a = i.next()) a.value.next(e);
				} catch (e) {
					n = { error: e };
				} finally {
					try {
						a && !a.done && (r = i.return) && r.call(i);
					} finally {
						if (n) throw n.error;
					}
				}
			}
		});
	}, t.prototype.error = function(e) {
		var t = this;
		Ja(function() {
			if (t._throwIfClosed(), !t.isStopped) {
				t.hasError = t.isStopped = !0, t.thrownError = e;
				for (var n = t.observers; n.length;) n.shift().error(e);
			}
		});
	}, t.prototype.complete = function() {
		var e = this;
		Ja(function() {
			if (e._throwIfClosed(), !e.isStopped) {
				e.isStopped = !0;
				for (var t = e.observers; t.length;) t.shift().complete();
			}
		});
	}, t.prototype.unsubscribe = function() {
		this.isStopped = this.closed = !0, this.observers = this.currentObservers = null;
	}, Object.defineProperty(t.prototype, "observed", {
		get: function() {
			return this.observers?.length > 0;
		},
		enumerable: !1,
		configurable: !0
	}), t.prototype._trySubscribe = function(t) {
		return this._throwIfClosed(), e.prototype._trySubscribe.call(this, t);
	}, t.prototype._subscribe = function(e) {
		return this._throwIfClosed(), this._checkFinalizedStatuses(e), this._innerSubscribe(e);
	}, t.prototype._innerSubscribe = function(e) {
		var t = this, n = this, r = n.hasError, i = n.isStopped, a = n.observers;
		return r || i ? Ia : (this.currentObservers = null, a.push(e), new Fa(function() {
			t.currentObservers = null, Pa(a, e);
		}));
	}, t.prototype._checkFinalizedStatuses = function(e) {
		var t = this, n = t.hasError, r = t.thrownError, i = t.isStopped;
		n ? e.error(r) : i && e.complete();
	}, t.prototype.asObservable = function() {
		var e = new co();
		return e.source = this, e;
	}, t.create = function(e, t) {
		return new ho(e, t);
	}, t;
}(co), ho = function(e) {
	Da(t, e);
	function t(t, n) {
		var r = e.call(this) || this;
		return r.destination = t, r.source = n, r;
	}
	return t.prototype.next = function(e) {
		var t, n;
		(n = (t = this.destination)?.next) == null || n.call(t, e);
	}, t.prototype.error = function(e) {
		var t, n;
		(n = (t = this.destination)?.error) == null || n.call(t, e);
	}, t.prototype.complete = function() {
		var e, t;
		(t = (e = this.destination)?.complete) == null || t.call(e);
	}, t.prototype._subscribe = function(e) {
		return this.source?.subscribe(e) ?? Ia;
	}, t;
}(mo), go = /* @__PURE__ */ ce(Ta(), 1), _o = new mo();
//#endregion
//#region src/composables/useDialog.ts
function vo(e, t) {
	let n = T(!1), r = T(null), i, a = null;
	function o(r) {
		if (r.key !== e) return;
		let i = r.data;
		if (i.type === "close") {
			n.value = !1;
			return;
		}
		n.value = !0, t?.(i);
	}
	P(r, (e) => {
		l(), e?.$el && s(e.$el);
	}, { flush: "post" });
	function s(e) {
		a = (0, go.default)(e).draggable({
			allowFrom: ".drag-handle",
			listeners: { move(e) {
				let t = e.target;
				if (!(t instanceof HTMLElement || t instanceof SVGElement)) return;
				let n = c(t.getAttribute("data-x")) + e.dx, r = c(t.getAttribute("data-y")) + e.dy;
				t.style.transform = `translate(${n}px, ${r}px)`, t.setAttribute("data-x", String(n)), t.setAttribute("data-y", String(r));
			} },
			modifiers: [go.default.modifiers.restrictRect({
				restriction: "parent",
				endOnly: !0
			})]
		});
	}
	function c(e) {
		let t = parseFloat(e ?? "");
		return Number.isNaN(t) ? 0 : t;
	}
	function l() {
		a?.unset(), a = null;
	}
	return b(() => {
		i = _o.subscribe(o);
	}), S(() => {
		l(), i?.unsubscribe();
	}), {
		show: n,
		dialogRef: r
	};
}
//#endregion
//#region node_modules/.pnpm/axios@1.18.1/node_modules/axios/lib/helpers/bind.js
function yo(e, t) {
	return function() {
		return e.apply(t, arguments);
	};
}
//#endregion
//#region node_modules/.pnpm/axios@1.18.1/node_modules/axios/lib/utils.js
var { toString: bo } = Object.prototype, { getPrototypeOf: xo } = Object, { iterator: So, toStringTag: Co } = Symbol, wo = (({ hasOwnProperty: e }) => (t, n) => e.call(t, n))(Object.prototype), To = (e, t) => {
	let n = e, r = [];
	for (; n != null && n !== Object.prototype;) {
		if (r.indexOf(n) !== -1) return !1;
		if (r.push(n), wo(n, t)) return !0;
		n = xo(n);
	}
	return !1;
}, Eo = (e, t) => e != null && To(e, t) ? e[t] : void 0, Do = ((e) => (t) => {
	let n = bo.call(t);
	return e[n] || (e[n] = n.slice(8, -1).toLowerCase());
})(Object.create(null)), Oo = (e) => (e = e.toLowerCase(), (t) => Do(t) === e), ko = (e) => (t) => typeof t === e, { isArray: Ao } = Array, jo = ko("undefined");
function Mo(e) {
	return e !== null && !jo(e) && e.constructor !== null && !jo(e.constructor) && Io(e.constructor.isBuffer) && e.constructor.isBuffer(e);
}
var No = Oo("ArrayBuffer");
function Po(e) {
	let t;
	return t = typeof ArrayBuffer < "u" && ArrayBuffer.isView ? ArrayBuffer.isView(e) : e && e.buffer && No(e.buffer), t;
}
var Fo = ko("string"), Io = ko("function"), Lo = ko("number"), Ro = (e) => typeof e == "object" && !!e, zo = (e) => e === !0 || e === !1, Bo = (e) => {
	if (!Ro(e)) return !1;
	let t = xo(e);
	return (t === null || t === Object.prototype || xo(t) === null) && !To(e, Co) && !To(e, So);
}, Vo = (e) => {
	if (!Ro(e) || Mo(e)) return !1;
	try {
		return Object.keys(e).length === 0 && Object.getPrototypeOf(e) === Object.prototype;
	} catch {
		return !1;
	}
}, Ho = Oo("Date"), Uo = Oo("File"), Wo = (e) => !!(e && e.uri !== void 0), Go = (e) => e && e.getParts !== void 0, Ko = Oo("Blob"), qo = Oo("FileList"), Jo = (e) => Ro(e) && Io(e.pipe);
function Yo() {
	return typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {};
}
var Xo = Yo(), Zo = Xo.FormData === void 0 ? void 0 : Xo.FormData, Qo = (e) => {
	if (!e) return !1;
	if (Zo && e instanceof Zo) return !0;
	let t = xo(e);
	if (!t || t === Object.prototype || !Io(e.append)) return !1;
	let n = Do(e);
	return n === "formdata" || n === "object" && Io(e.toString) && e.toString() === "[object FormData]";
}, $o = Oo("URLSearchParams"), [es, ts, ns, rs] = [
	"ReadableStream",
	"Request",
	"Response",
	"Headers"
].map(Oo), is = (e) => e.trim ? e.trim() : e.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
function as(e, t, { allOwnKeys: n = !1 } = {}) {
	if (e == null) return;
	let r, i;
	if (typeof e != "object" && (e = [e]), Ao(e)) for (r = 0, i = e.length; r < i; r++) t.call(null, e[r], r, e);
	else {
		if (Mo(e)) return;
		let i = n ? Object.getOwnPropertyNames(e) : Object.keys(e), a = i.length, o;
		for (r = 0; r < a; r++) o = i[r], t.call(null, e[o], o, e);
	}
}
function os(e, t) {
	if (Mo(e)) return null;
	t = t.toLowerCase();
	let n = Object.keys(e), r = n.length, i;
	for (; r-- > 0;) if (i = n[r], t === i.toLowerCase()) return i;
	return null;
}
var ss = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : global, cs = (e) => !jo(e) && e !== ss;
function ls(...e) {
	let { caseless: t, skipUndefined: n } = cs(this) && this || {}, r = {}, i = (e, i) => {
		if (i === "__proto__" || i === "constructor" || i === "prototype") return;
		let a = t && typeof i == "string" && os(r, i) || i, o = wo(r, a) ? r[a] : void 0;
		Bo(o) && Bo(e) ? r[a] = ls(o, e) : Bo(e) ? r[a] = ls({}, e) : Ao(e) ? r[a] = e.slice() : (!n || !jo(e)) && (r[a] = e);
	};
	for (let t = 0, n = e.length; t < n; t++) {
		let n = e[t];
		if (!n || Mo(n) || (as(n, i), typeof n != "object" || Ao(n))) continue;
		let r = Object.getOwnPropertySymbols(n);
		for (let e = 0; e < r.length; e++) {
			let t = r[e];
			xs.call(n, t) && i(n[t], t);
		}
	}
	return r;
}
var us = (e, t, n, { allOwnKeys: r } = {}) => (as(t, (t, r) => {
	n && Io(t) ? Object.defineProperty(e, r, {
		__proto__: null,
		value: yo(t, n),
		writable: !0,
		enumerable: !0,
		configurable: !0
	}) : Object.defineProperty(e, r, {
		__proto__: null,
		value: t,
		writable: !0,
		enumerable: !0,
		configurable: !0
	});
}, { allOwnKeys: r }), e), ds = (e) => (e.charCodeAt(0) === 65279 && (e = e.slice(1)), e), fs = (e, t, n, r) => {
	e.prototype = Object.create(t.prototype, r), Object.defineProperty(e.prototype, "constructor", {
		__proto__: null,
		value: e,
		writable: !0,
		enumerable: !1,
		configurable: !0
	}), Object.defineProperty(e, "super", {
		__proto__: null,
		value: t.prototype
	}), n && Object.assign(e.prototype, n);
}, ps = (e, t, n, r) => {
	let i, a, o, s = {};
	if (t ||= {}, e == null) return t;
	do {
		for (i = Object.getOwnPropertyNames(e), a = i.length; a-- > 0;) o = i[a], (!r || r(o, e, t)) && !s[o] && (t[o] = e[o], s[o] = !0);
		e = n !== !1 && xo(e);
	} while (e && (!n || n(e, t)) && e !== Object.prototype);
	return t;
}, ms = (e, t, n) => {
	e = String(e), (n === void 0 || n > e.length) && (n = e.length), n -= t.length;
	let r = e.indexOf(t, n);
	return r !== -1 && r === n;
}, hs = (e) => {
	if (!e) return null;
	if (Ao(e)) return e;
	let t = e.length;
	if (!Lo(t)) return null;
	let n = Array(t);
	for (; t-- > 0;) n[t] = e[t];
	return n;
}, gs = ((e) => (t) => e && t instanceof e)(typeof Uint8Array < "u" && xo(Uint8Array)), _s = (e, t) => {
	let n = (e && e[So]).call(e), r;
	for (; (r = n.next()) && !r.done;) {
		let n = r.value;
		t.call(e, n[0], n[1]);
	}
}, vs = (e, t) => {
	let n, r = [];
	for (; (n = e.exec(t)) !== null;) r.push(n);
	return r;
}, ys = Oo("HTMLFormElement"), bs = (e) => e.toLowerCase().replace(/[-_\s]([a-z\d])(\w*)/g, function(e, t, n) {
	return t.toUpperCase() + n;
}), { propertyIsEnumerable: xs } = Object.prototype, Ss = Oo("RegExp"), Cs = (e, t) => {
	let n = Object.getOwnPropertyDescriptors(e), r = {};
	as(n, (n, i) => {
		let a;
		(a = t(n, i, e)) !== !1 && (r[i] = a || n);
	}), Object.defineProperties(e, r);
}, ws = (e) => {
	Cs(e, (t, n) => {
		if (Io(e) && [
			"arguments",
			"caller",
			"callee"
		].includes(n)) return !1;
		let r = e[n];
		if (Io(r)) {
			if (t.enumerable = !1, "writable" in t) {
				t.writable = !1;
				return;
			}
			t.set ||= () => {
				throw Error("Can not rewrite read-only method '" + n + "'");
			};
		}
	});
}, Ts = (e, t) => {
	let n = {}, r = (e) => {
		e.forEach((e) => {
			n[e] = !0;
		});
	};
	return Ao(e) ? r(e) : r(String(e).split(t)), n;
}, Es = () => {}, Ds = (e, t) => e != null && Number.isFinite(e = +e) ? e : t;
function Os(e) {
	return !!(e && Io(e.append) && e[Co] === "FormData" && e[So]);
}
var ks = (e) => {
	let t = /* @__PURE__ */ new WeakSet(), n = (e) => {
		if (Ro(e)) {
			if (t.has(e)) return;
			if (Mo(e)) return e;
			if (!("toJSON" in e)) {
				t.add(e);
				let r = Ao(e) ? [] : {};
				return as(e, (e, t) => {
					let i = n(e);
					!jo(i) && (r[t] = i);
				}), t.delete(e), r;
			}
		}
		return e;
	};
	return n(e);
}, As = Oo("AsyncFunction"), js = (e) => e && (Ro(e) || Io(e)) && Io(e.then) && Io(e.catch), Ms = ((e, t) => e ? setImmediate : t ? ((e, t) => (ss.addEventListener("message", ({ source: n, data: r }) => {
	n === ss && r === e && t.length && t.shift()();
}, !1), (n) => {
	t.push(n), ss.postMessage(e, "*");
}))(`axios@${Math.random()}`, []) : (e) => setTimeout(e))(typeof setImmediate == "function", Io(ss.postMessage)), Ns = typeof queueMicrotask < "u" ? queueMicrotask.bind(ss) : typeof process < "u" && process.nextTick || Ms, Ps = (e) => e != null && Io(e[So]), Z = {
	isArray: Ao,
	isArrayBuffer: No,
	isBuffer: Mo,
	isFormData: Qo,
	isArrayBufferView: Po,
	isString: Fo,
	isNumber: Lo,
	isBoolean: zo,
	isObject: Ro,
	isPlainObject: Bo,
	isEmptyObject: Vo,
	isReadableStream: es,
	isRequest: ts,
	isResponse: ns,
	isHeaders: rs,
	isUndefined: jo,
	isDate: Ho,
	isFile: Uo,
	isReactNativeBlob: Wo,
	isReactNative: Go,
	isBlob: Ko,
	isRegExp: Ss,
	isFunction: Io,
	isStream: Jo,
	isURLSearchParams: $o,
	isTypedArray: gs,
	isFileList: qo,
	forEach: as,
	merge: ls,
	extend: us,
	trim: is,
	stripBOM: ds,
	inherits: fs,
	toFlatObject: ps,
	kindOf: Do,
	kindOfTest: Oo,
	endsWith: ms,
	toArray: hs,
	forEachEntry: _s,
	matchAll: vs,
	isHTMLForm: ys,
	hasOwnProperty: wo,
	hasOwnProp: wo,
	hasOwnInPrototypeChain: To,
	getSafeProp: Eo,
	reduceDescriptors: Cs,
	freezeMethods: ws,
	toObjectSet: Ts,
	toCamelCase: bs,
	noop: Es,
	toFiniteNumber: Ds,
	findKey: os,
	global: ss,
	isContextDefined: cs,
	isSpecCompliantForm: Os,
	toJSONObject: ks,
	isAsyncFn: As,
	isThenable: js,
	setImmediate: Ms,
	asap: Ns,
	isIterable: Ps,
	isSafeIterable: (e) => e != null && To(e, So) && Ps(e)
}, Fs = Z.toObjectSet([
	"age",
	"authorization",
	"content-length",
	"content-type",
	"etag",
	"expires",
	"from",
	"host",
	"if-modified-since",
	"if-unmodified-since",
	"last-modified",
	"location",
	"max-forwards",
	"proxy-authorization",
	"referer",
	"retry-after",
	"user-agent"
]), Is = (e) => {
	let t = {}, n, r, i;
	return e && e.split("\n").forEach(function(e) {
		i = e.indexOf(":"), n = e.substring(0, i).trim().toLowerCase(), r = e.substring(i + 1).trim(), !(!n || t[n] && Fs[n]) && (n === "set-cookie" ? t[n] ? t[n].push(r) : t[n] = [r] : t[n] = t[n] ? t[n] + ", " + r : r);
	}), t;
};
//#endregion
//#region node_modules/.pnpm/axios@1.18.1/node_modules/axios/lib/helpers/sanitizeHeaderValue.js
function Ls(e) {
	let t = 0, n = e.length;
	for (; t < n;) {
		let n = e.charCodeAt(t);
		if (n !== 9 && n !== 32) break;
		t += 1;
	}
	for (; n > t;) {
		let t = e.charCodeAt(n - 1);
		if (t !== 9 && t !== 32) break;
		--n;
	}
	return t === 0 && n === e.length ? e : e.slice(t, n);
}
var Rs = /* @__PURE__ */ RegExp("[\\u0000-\\u0008\\u000a-\\u001f\\u007f]+", "g"), zs = /* @__PURE__ */ RegExp("[^\\u0009\\u0020-\\u007e\\u0080-\\u00ff]+", "g");
function Bs(e, t) {
	return Z.isArray(e) ? e.map((e) => Bs(e, t)) : Ls(String(e).replace(t, ""));
}
var Vs = (e) => Bs(e, Rs), Hs = (e) => Bs(e, zs);
function Us(e) {
	let t = Object.create(null);
	return Z.forEach(e.toJSON(), (e, n) => {
		t[n] = Hs(e);
	}), t;
}
//#endregion
//#region node_modules/.pnpm/axios@1.18.1/node_modules/axios/lib/core/AxiosHeaders.js
var Ws = Symbol("internals");
function Gs(e) {
	return e && String(e).trim().toLowerCase();
}
function Ks(e) {
	return e === !1 || e == null ? e : Z.isArray(e) ? e.map(Ks) : Vs(String(e));
}
function qs(e) {
	let t = Object.create(null), n = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g, r;
	for (; r = n.exec(e);) t[r[1]] = r[2];
	return t;
}
var Js = (e) => /^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(e.trim());
function Ys(e, t, n, r, i) {
	if (Z.isFunction(r)) return r.call(this, t, n);
	if (i && (t = n), Z.isString(t)) {
		if (Z.isString(r)) return t.indexOf(r) !== -1;
		if (Z.isRegExp(r)) return r.test(t);
	}
}
function Xs(e) {
	return e.trim().toLowerCase().replace(/([a-z\d])(\w*)/g, (e, t, n) => t.toUpperCase() + n);
}
function Zs(e, t) {
	let n = Z.toCamelCase(" " + t);
	[
		"get",
		"set",
		"has"
	].forEach((r) => {
		Object.defineProperty(e, r + n, {
			__proto__: null,
			value: function(e, n, i) {
				return this[r].call(this, t, e, n, i);
			},
			configurable: !0
		});
	});
}
var Qs = class {
	constructor(e) {
		e && this.set(e);
	}
	set(e, t, n) {
		let r = this;
		function i(e, t, n) {
			let i = Gs(t);
			if (!i) return;
			let a = Z.findKey(r, i);
			(!a || r[a] === void 0 || n === !0 || n === void 0 && r[a] !== !1) && (r[a || t] = Ks(e));
		}
		let a = (e, t) => Z.forEach(e, (e, n) => i(e, n, t));
		if (Z.isPlainObject(e) || e instanceof this.constructor) a(e, t);
		else if (Z.isString(e) && (e = e.trim()) && !Js(e)) a(Is(e), t);
		else if (Z.isObject(e) && Z.isSafeIterable(e)) {
			let n = Object.create(null), r, i;
			for (let t of e) {
				if (!Z.isArray(t)) throw TypeError("Object iterator must return a key-value pair");
				i = t[0], Z.hasOwnProp(n, i) ? (r = n[i], n[i] = Z.isArray(r) ? [...r, t[1]] : [r, t[1]]) : n[i] = t[1];
			}
			a(n, t);
		} else e != null && i(t, e, n);
		return this;
	}
	get(e, t) {
		if (e = Gs(e), e) {
			let n = Z.findKey(this, e);
			if (n) {
				let e = this[n];
				if (!t) return e;
				if (t === !0) return qs(e);
				if (Z.isFunction(t)) return t.call(this, e, n);
				if (Z.isRegExp(t)) return t.exec(e);
				throw TypeError("parser must be boolean|regexp|function");
			}
		}
	}
	has(e, t) {
		if (e = Gs(e), e) {
			let n = Z.findKey(this, e);
			return !!(n && this[n] !== void 0 && (!t || Ys(this, this[n], n, t)));
		}
		return !1;
	}
	delete(e, t) {
		let n = this, r = !1;
		function i(e) {
			if (e = Gs(e), e) {
				let i = Z.findKey(n, e);
				i && (!t || Ys(n, n[i], i, t)) && (delete n[i], r = !0);
			}
		}
		return Z.isArray(e) ? e.forEach(i) : i(e), r;
	}
	clear(e) {
		let t = Object.keys(this), n = t.length, r = !1;
		for (; n--;) {
			let i = t[n];
			(!e || Ys(this, this[i], i, e, !0)) && (delete this[i], r = !0);
		}
		return r;
	}
	normalize(e) {
		let t = this, n = {};
		return Z.forEach(this, (r, i) => {
			let a = Z.findKey(n, i);
			if (a) {
				t[a] = Ks(r), delete t[i];
				return;
			}
			let o = e ? Xs(i) : String(i).trim();
			o !== i && delete t[i], t[o] = Ks(r), n[o] = !0;
		}), this;
	}
	concat(...e) {
		return this.constructor.concat(this, ...e);
	}
	toJSON(e) {
		let t = Object.create(null);
		return Z.forEach(this, (n, r) => {
			n != null && n !== !1 && (t[r] = e && Z.isArray(n) ? n.join(", ") : n);
		}), t;
	}
	[Symbol.iterator]() {
		return Object.entries(this.toJSON())[Symbol.iterator]();
	}
	toString() {
		return Object.entries(this.toJSON()).map(([e, t]) => e + ": " + t).join("\n");
	}
	getSetCookie() {
		return this.get("set-cookie") || [];
	}
	get [Symbol.toStringTag]() {
		return "AxiosHeaders";
	}
	static from(e) {
		return e instanceof this ? e : new this(e);
	}
	static concat(e, ...t) {
		let n = new this(e);
		return t.forEach((e) => n.set(e)), n;
	}
	static accessor(e) {
		let t = (this[Ws] = this[Ws] = { accessors: {} }).accessors, n = this.prototype;
		function r(e) {
			let r = Gs(e);
			t[r] || (Zs(n, e), t[r] = !0);
		}
		return Z.isArray(e) ? e.forEach(r) : r(e), this;
	}
};
Qs.accessor([
	"Content-Type",
	"Content-Length",
	"Accept",
	"Accept-Encoding",
	"User-Agent",
	"Authorization"
]), Z.reduceDescriptors(Qs.prototype, ({ value: e }, t) => {
	let n = t[0].toUpperCase() + t.slice(1);
	return {
		get: () => e,
		set(e) {
			this[n] = e;
		}
	};
}), Z.freezeMethods(Qs);
//#endregion
//#region node_modules/.pnpm/axios@1.18.1/node_modules/axios/lib/core/AxiosError.js
var $s = "[REDACTED ****]";
function ec(e) {
	if (Z.hasOwnProp(e, "toJSON")) return !0;
	let t = Object.getPrototypeOf(e);
	for (; t && t !== Object.prototype;) {
		if (Z.hasOwnProp(t, "toJSON")) return !0;
		t = Object.getPrototypeOf(t);
	}
	return !1;
}
function tc(e, t) {
	let n = new Set(t.map((e) => String(e).toLowerCase())), r = [], i = (e) => {
		if (typeof e != "object" || !e || Z.isBuffer(e)) return e;
		if (r.indexOf(e) !== -1) return;
		e instanceof Qs && (e = e.toJSON()), r.push(e);
		let t;
		if (Z.isArray(e)) t = [], e.forEach((e, n) => {
			let r = i(e);
			Z.isUndefined(r) || (t[n] = r);
		});
		else {
			if (!Z.isPlainObject(e) && ec(e)) return r.pop(), e;
			t = Object.create(null);
			for (let [r, a] of Object.entries(e)) {
				let e = n.has(r.toLowerCase()) ? $s : i(a);
				Z.isUndefined(e) || (t[r] = e);
			}
		}
		return r.pop(), t;
	};
	return i(e);
}
var Q = class e extends Error {
	static from(t, n, r, i, a, o) {
		let s = new e(t.message, n || t.code, r, i, a);
		return Object.defineProperty(s, "cause", {
			__proto__: null,
			value: t,
			writable: !0,
			enumerable: !1,
			configurable: !0
		}), s.name = t.name, t.status != null && s.status == null && (s.status = t.status), o && Object.assign(s, o), s;
	}
	constructor(e, t, n, r, i) {
		super(e), Object.defineProperty(this, "message", {
			__proto__: null,
			value: e,
			enumerable: !0,
			writable: !0,
			configurable: !0
		}), this.name = "AxiosError", this.isAxiosError = !0, t && (this.code = t), n && (this.config = n), r && (this.request = r), i && (this.response = i, this.status = i.status);
	}
	toJSON() {
		let e = this.config, t = e && Z.hasOwnProp(e, "redact") ? e.redact : void 0, n = Z.isArray(t) && t.length > 0 ? tc(e, t) : Z.toJSONObject(e);
		return {
			message: this.message,
			name: this.name,
			description: this.description,
			number: this.number,
			fileName: this.fileName,
			lineNumber: this.lineNumber,
			columnNumber: this.columnNumber,
			stack: this.stack,
			config: n,
			code: this.code,
			status: this.status
		};
	}
};
Q.ERR_BAD_OPTION_VALUE = "ERR_BAD_OPTION_VALUE", Q.ERR_BAD_OPTION = "ERR_BAD_OPTION", Q.ECONNABORTED = "ECONNABORTED", Q.ETIMEDOUT = "ETIMEDOUT", Q.ECONNREFUSED = "ECONNREFUSED", Q.ERR_NETWORK = "ERR_NETWORK", Q.ERR_FR_TOO_MANY_REDIRECTS = "ERR_FR_TOO_MANY_REDIRECTS", Q.ERR_DEPRECATED = "ERR_DEPRECATED", Q.ERR_BAD_RESPONSE = "ERR_BAD_RESPONSE", Q.ERR_BAD_REQUEST = "ERR_BAD_REQUEST", Q.ERR_CANCELED = "ERR_CANCELED", Q.ERR_NOT_SUPPORT = "ERR_NOT_SUPPORT", Q.ERR_INVALID_URL = "ERR_INVALID_URL", Q.ERR_FORM_DATA_DEPTH_EXCEEDED = "ERR_FORM_DATA_DEPTH_EXCEEDED";
function nc(e) {
	return Z.isPlainObject(e) || Z.isArray(e);
}
function rc(e) {
	return Z.endsWith(e, "[]") ? e.slice(0, -2) : e;
}
function ic(e, t, n) {
	return e ? e.concat(t).map(function(e, t) {
		return e = rc(e), !n && t ? "[" + e + "]" : e;
	}).join(n ? "." : "") : t;
}
function ac(e) {
	return Z.isArray(e) && !e.some(nc);
}
var oc = Z.toFlatObject(Z, {}, null, function(e) {
	return /^is[A-Z]/.test(e);
});
function sc(e, t, n) {
	if (!Z.isObject(e)) throw TypeError("target must be an object");
	t ||= new FormData(), n = Z.toFlatObject(n, {
		metaTokens: !0,
		dots: !1,
		indexes: !1
	}, !1, function(e, t) {
		return !Z.isUndefined(t[e]);
	});
	let r = n.metaTokens, i = n.visitor || m, a = n.dots, o = n.indexes, s = n.Blob || typeof Blob < "u" && Blob, c = n.maxDepth === void 0 ? 100 : n.maxDepth, l = s && Z.isSpecCompliantForm(t), u = [];
	if (!Z.isFunction(i)) throw TypeError("visitor must be a function");
	function d(e) {
		if (e === null) return "";
		if (Z.isDate(e)) return e.toISOString();
		if (Z.isBoolean(e)) return e.toString();
		if (!l && Z.isBlob(e)) throw new Q("Blob is not supported. Use a Buffer instead.");
		if (Z.isArrayBuffer(e) || Z.isTypedArray(e)) {
			if (l && typeof s == "function") return new s([e]);
			if (typeof Buffer < "u") return Buffer.from(e);
			throw new Q("Blob is not supported. Use a Buffer instead.", Q.ERR_NOT_SUPPORT);
		}
		return e;
	}
	function f(e) {
		if (e > c) throw new Q("Object is too deeply nested (" + e + " levels). Max depth: " + c, Q.ERR_FORM_DATA_DEPTH_EXCEEDED);
	}
	function p(e, t) {
		if (c === Infinity) return JSON.stringify(e);
		let n = [];
		return JSON.stringify(e, function(e, r) {
			if (!Z.isObject(r)) return r;
			for (; n.length && n[n.length - 1] !== this;) n.pop();
			return n.push(r), f(t + n.length - 1), r;
		});
	}
	function m(e, n, i) {
		let s = e;
		if (Z.isReactNative(t) && Z.isReactNativeBlob(e)) return t.append(ic(i, n, a), d(e)), !1;
		if (e && !i && typeof e == "object") {
			if (Z.endsWith(n, "{}")) n = r ? n : n.slice(0, -2), e = p(e, 1);
			else if (Z.isArray(e) && ac(e) || (Z.isFileList(e) || Z.endsWith(n, "[]")) && (s = Z.toArray(e))) return n = rc(n), s.forEach(function(e, r) {
				!(Z.isUndefined(e) || e === null) && t.append(o === !0 ? ic([n], r, a) : o === null ? n : n + "[]", d(e));
			}), !1;
		}
		return nc(e) ? !0 : (t.append(ic(i, n, a), d(e)), !1);
	}
	let h = Object.assign(oc, {
		defaultVisitor: m,
		convertValue: d,
		isVisitable: nc
	});
	function g(e, n, r = 0) {
		if (!Z.isUndefined(e)) {
			if (f(r), u.indexOf(e) !== -1) throw Error("Circular reference detected in " + n.join("."));
			u.push(e), Z.forEach(e, function(e, a) {
				(!(Z.isUndefined(e) || e === null) && i.call(t, e, Z.isString(a) ? a.trim() : a, n, h)) === !0 && g(e, n ? n.concat(a) : [a], r + 1);
			}), u.pop();
		}
	}
	if (!Z.isObject(e)) throw TypeError("data must be an object");
	return g(e), t;
}
//#endregion
//#region node_modules/.pnpm/axios@1.18.1/node_modules/axios/lib/helpers/AxiosURLSearchParams.js
function cc(e) {
	let t = {
		"!": "%21",
		"'": "%27",
		"(": "%28",
		")": "%29",
		"~": "%7E",
		"%20": "+"
	};
	return encodeURIComponent(e).replace(/[!'()~]|%20/g, function(e) {
		return t[e];
	});
}
function lc(e, t) {
	this._pairs = [], e && sc(e, this, t);
}
var uc = lc.prototype;
uc.append = function(e, t) {
	this._pairs.push([e, t]);
}, uc.toString = function(e) {
	let t = e ? (t) => e.call(this, t, cc) : cc;
	return this._pairs.map(function(e) {
		return t(e[0]) + "=" + t(e[1]);
	}, "").join("&");
};
//#endregion
//#region node_modules/.pnpm/axios@1.18.1/node_modules/axios/lib/helpers/buildURL.js
function dc(e) {
	return encodeURIComponent(e).replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+");
}
function fc(e, t, n) {
	if (!t) return e;
	e ||= "";
	let r = Z.isFunction(n) ? { serialize: n } : n, i = Z.getSafeProp(r, "encode") || dc, a = Z.getSafeProp(r, "serialize"), o;
	if (o = a ? a(t, r) : Z.isURLSearchParams(t) ? t.toString() : new lc(t, r).toString(i), o) {
		let t = e.indexOf("#");
		t !== -1 && (e = e.slice(0, t)), e += (e.indexOf("?") === -1 ? "?" : "&") + o;
	}
	return e;
}
//#endregion
//#region node_modules/.pnpm/axios@1.18.1/node_modules/axios/lib/core/InterceptorManager.js
var pc = class {
	constructor() {
		this.handlers = [];
	}
	use(e, t, n) {
		return this.handlers.push({
			fulfilled: e,
			rejected: t,
			synchronous: n ? n.synchronous : !1,
			runWhen: n ? n.runWhen : null
		}), this.handlers.length - 1;
	}
	eject(e) {
		this.handlers[e] && (this.handlers[e] = null);
	}
	clear() {
		this.handlers &&= [];
	}
	forEach(e) {
		Z.forEach(this.handlers, function(t) {
			t !== null && e(t);
		});
	}
}, mc = {
	silentJSONParsing: !0,
	forcedJSONParsing: !0,
	clarifyTimeoutError: !1,
	legacyInterceptorReqResOrdering: !0,
	advertiseZstdAcceptEncoding: !1,
	validateStatusUndefinedResolves: !0
}, hc = {
	isBrowser: !0,
	classes: {
		URLSearchParams: typeof URLSearchParams < "u" ? URLSearchParams : lc,
		FormData: typeof FormData < "u" ? FormData : null,
		Blob: typeof Blob < "u" ? Blob : null
	},
	protocols: [
		"http",
		"https",
		"file",
		"blob",
		"url",
		"data"
	]
}, gc = /* @__PURE__ */ L({
	hasBrowserEnv: () => _c,
	hasStandardBrowserEnv: () => yc,
	hasStandardBrowserWebWorkerEnv: () => bc,
	navigator: () => vc,
	origin: () => xc
}), _c = typeof window < "u" && typeof document < "u", vc = typeof navigator == "object" && navigator || void 0, yc = _c && (!vc || [
	"ReactNative",
	"NativeScript",
	"NS"
].indexOf(vc.product) < 0), bc = typeof WorkerGlobalScope < "u" && self instanceof WorkerGlobalScope && typeof self.importScripts == "function", xc = _c && window.location.href || "http://localhost", Sc = {
	...gc,
	...hc
};
//#endregion
//#region node_modules/.pnpm/axios@1.18.1/node_modules/axios/lib/helpers/toURLEncodedForm.js
function Cc(e, t) {
	return sc(e, new Sc.classes.URLSearchParams(), {
		visitor: function(e, t, n, r) {
			return Sc.isNode && Z.isBuffer(e) ? (this.append(t, e.toString("base64")), !1) : r.defaultVisitor.apply(this, arguments);
		},
		...t
	});
}
//#endregion
//#region node_modules/.pnpm/axios@1.18.1/node_modules/axios/lib/helpers/formDataToJSON.js
var wc = 100;
function Tc(e) {
	if (e > wc) throw new Q("FormData field is too deeply nested (" + e + " levels). Max depth: " + wc, Q.ERR_FORM_DATA_DEPTH_EXCEEDED);
}
function Ec(e) {
	let t = [], n = /\w+|\[(\w*)]/g, r;
	for (; (r = n.exec(e)) !== null;) Tc(t.length), t.push(r[0] === "[]" ? "" : r[1] || r[0]);
	return t;
}
function Dc(e) {
	let t = {}, n = Object.keys(e), r, i = n.length, a;
	for (r = 0; r < i; r++) a = n[r], t[a] = e[a];
	return t;
}
function Oc(e) {
	function t(e, n, r, i) {
		Tc(i);
		let a = e[i++];
		if (a === "__proto__") return !0;
		let o = Number.isFinite(+a), s = i >= e.length;
		return a = !a && Z.isArray(r) ? r.length : a, s ? (Z.hasOwnProp(r, a) ? r[a] = Z.isArray(r[a]) ? r[a].concat(n) : [r[a], n] : r[a] = n, !o) : ((!Z.hasOwnProp(r, a) || !Z.isObject(r[a])) && (r[a] = []), t(e, n, r[a], i) && Z.isArray(r[a]) && (r[a] = Dc(r[a])), !o);
	}
	if (Z.isFormData(e) && Z.isFunction(e.entries)) {
		let n = {};
		return Z.forEachEntry(e, (e, r) => {
			t(Ec(e), r, n, 0);
		}), n;
	}
	return null;
}
//#endregion
//#region node_modules/.pnpm/axios@1.18.1/node_modules/axios/lib/defaults/index.js
var kc = (e, t) => e != null && Z.hasOwnProp(e, t) ? e[t] : void 0;
function Ac(e, t, n) {
	if (Z.isString(e)) try {
		return (t || JSON.parse)(e), Z.trim(e);
	} catch (e) {
		if (e.name !== "SyntaxError") throw e;
	}
	return (n || JSON.stringify)(e);
}
var jc = {
	transitional: mc,
	adapter: [
		"xhr",
		"http",
		"fetch"
	],
	transformRequest: [function(e, t) {
		let n = t.getContentType() || "", r = n.indexOf("application/json") > -1, i = Z.isObject(e);
		if (i && Z.isHTMLForm(e) && (e = new FormData(e)), Z.isFormData(e)) return r ? JSON.stringify(Oc(e)) : e;
		if (Z.isArrayBuffer(e) || Z.isBuffer(e) || Z.isStream(e) || Z.isFile(e) || Z.isBlob(e) || Z.isReadableStream(e)) return e;
		if (Z.isArrayBufferView(e)) return e.buffer;
		if (Z.isURLSearchParams(e)) return t.setContentType("application/x-www-form-urlencoded;charset=utf-8", !1), e.toString();
		let a;
		if (i) {
			let t = kc(this, "formSerializer");
			if (n.indexOf("application/x-www-form-urlencoded") > -1) return Cc(e, t).toString();
			if ((a = Z.isFileList(e)) || n.indexOf("multipart/form-data") > -1) {
				let n = kc(this, "env"), r = n && n.FormData;
				return sc(a ? { "files[]": e } : e, r && new r(), t);
			}
		}
		return i || r ? (t.setContentType("application/json", !1), Ac(e)) : e;
	}],
	transformResponse: [function(e) {
		let t = kc(this, "transitional") || jc.transitional, n = t && t.forcedJSONParsing, r = kc(this, "responseType"), i = r === "json";
		if (Z.isResponse(e) || Z.isReadableStream(e)) return e;
		if (e && Z.isString(e) && (n && !r || i)) {
			let n = !(t && t.silentJSONParsing) && i;
			try {
				return JSON.parse(e, kc(this, "parseReviver"));
			} catch (e) {
				if (n) throw e.name === "SyntaxError" ? Q.from(e, Q.ERR_BAD_RESPONSE, this, null, kc(this, "response")) : e;
			}
		}
		return e;
	}],
	timeout: 0,
	xsrfCookieName: "XSRF-TOKEN",
	xsrfHeaderName: "X-XSRF-TOKEN",
	maxContentLength: -1,
	maxBodyLength: -1,
	env: {
		FormData: Sc.classes.FormData,
		Blob: Sc.classes.Blob
	},
	validateStatus: function(e) {
		return e >= 200 && e < 300;
	},
	headers: { common: {
		Accept: "application/json, text/plain, */*",
		"Content-Type": void 0
	} }
};
Z.forEach([
	"delete",
	"get",
	"head",
	"post",
	"put",
	"patch",
	"query"
], (e) => {
	jc.headers[e] = {};
});
//#endregion
//#region node_modules/.pnpm/axios@1.18.1/node_modules/axios/lib/core/transformData.js
function Mc(e, t) {
	let n = this || jc, r = t || n, i = Qs.from(r.headers), a = r.data;
	return Z.forEach(e, function(e) {
		a = e.call(n, a, i.normalize(), t ? t.status : void 0);
	}), i.normalize(), a;
}
//#endregion
//#region node_modules/.pnpm/axios@1.18.1/node_modules/axios/lib/cancel/isCancel.js
function Nc(e) {
	return !!(e && e.__CANCEL__);
}
//#endregion
//#region node_modules/.pnpm/axios@1.18.1/node_modules/axios/lib/cancel/CanceledError.js
var Pc = class extends Q {
	constructor(e, t, n) {
		super(e ?? "canceled", Q.ERR_CANCELED, t, n), this.name = "CanceledError", this.__CANCEL__ = !0;
	}
};
//#endregion
//#region node_modules/.pnpm/axios@1.18.1/node_modules/axios/lib/core/settle.js
function Fc(e, t, n) {
	let r = n.config.validateStatus;
	!n.status || !r || r(n.status) ? e(n) : t(new Q("Request failed with status code " + n.status, n.status >= 400 && n.status < 500 ? Q.ERR_BAD_REQUEST : Q.ERR_BAD_RESPONSE, n.config, n.request, n));
}
//#endregion
//#region node_modules/.pnpm/axios@1.18.1/node_modules/axios/lib/helpers/parseProtocol.js
function Ic(e) {
	let t = /^([-+\w]{1,25}):(?:\/\/)?/.exec(e);
	return t && t[1] || "";
}
//#endregion
//#region node_modules/.pnpm/axios@1.18.1/node_modules/axios/lib/helpers/speedometer.js
function Lc(e, t) {
	e ||= 10;
	let n = Array(e), r = Array(e), i = 0, a = 0, o;
	return t = t === void 0 ? 1e3 : t, function(s) {
		let c = Date.now(), l = r[a];
		o ||= c, n[i] = s, r[i] = c;
		let u = a, d = 0;
		for (; u !== i;) d += n[u++], u %= e;
		if (i = (i + 1) % e, i === a && (a = (a + 1) % e), c - o < t) return;
		let f = l && c - l;
		return f ? Math.round(d * 1e3 / f) : void 0;
	};
}
//#endregion
//#region node_modules/.pnpm/axios@1.18.1/node_modules/axios/lib/helpers/throttle.js
function Rc(e, t) {
	let n = 0, r = 1e3 / t, i, a, o = (t, r = Date.now()) => {
		n = r, i = null, a &&= (clearTimeout(a), null), e(...t);
	};
	return [(...e) => {
		let t = Date.now(), s = t - n;
		s >= r ? o(e, t) : (i = e, a ||= setTimeout(() => {
			a = null, o(i);
		}, r - s));
	}, () => i && o(i)];
}
//#endregion
//#region node_modules/.pnpm/axios@1.18.1/node_modules/axios/lib/helpers/progressEventReducer.js
var zc = (e, t, n = 3) => {
	let r = 0, i = Lc(50, 250);
	return Rc((n) => {
		if (!n || typeof n.loaded != "number") return;
		let a = n.loaded, o = n.lengthComputable ? n.total : void 0, s = o == null ? a : Math.min(a, o), c = Math.max(0, s - r), l = i(c);
		r = Math.max(r, s), e({
			loaded: s,
			total: o,
			progress: o ? s / o : void 0,
			bytes: c,
			rate: l || void 0,
			estimated: l && o ? (o - s) / l : void 0,
			event: n,
			lengthComputable: o != null,
			[t ? "download" : "upload"]: !0
		});
	}, n);
}, Bc = (e, t) => {
	let n = e != null;
	return [(r) => t[0]({
		lengthComputable: n,
		total: e,
		loaded: r
	}), t[1]];
}, Vc = (e) => (...t) => Z.asap(() => e(...t)), Hc = Sc.hasStandardBrowserEnv ? ((e, t) => (n) => (n = new URL(n, Sc.origin), e.protocol === n.protocol && e.host === n.host && (t || e.port === n.port)))(new URL(Sc.origin), Sc.navigator && /(msie|trident)/i.test(Sc.navigator.userAgent)) : () => !0, Uc = Sc.hasStandardBrowserEnv ? {
	write(e, t, n, r, i, a, o) {
		if (typeof document > "u") return;
		let s = [`${e}=${encodeURIComponent(t)}`];
		Z.isNumber(n) && s.push(`expires=${new Date(n).toUTCString()}`), Z.isString(r) && s.push(`path=${r}`), Z.isString(i) && s.push(`domain=${i}`), a === !0 && s.push("secure"), Z.isString(o) && s.push(`SameSite=${o}`), document.cookie = s.join("; ");
	},
	read(e) {
		if (typeof document > "u") return null;
		let t = document.cookie.split(";");
		for (let n = 0; n < t.length; n++) {
			let r = t[n].replace(/^\s+/, ""), i = r.indexOf("=");
			if (i !== -1 && r.slice(0, i) === e) try {
				return decodeURIComponent(r.slice(i + 1));
			} catch {
				return r.slice(i + 1);
			}
		}
		return null;
	},
	remove(e) {
		this.write(e, "", Date.now() - 864e5, "/");
	}
} : {
	write() {},
	read() {
		return null;
	},
	remove() {}
};
//#endregion
//#region node_modules/.pnpm/axios@1.18.1/node_modules/axios/lib/helpers/isAbsoluteURL.js
function Wc(e) {
	return typeof e == "string" && /^([a-z][a-z\d+\-.]*:)?\/\//i.test(e);
}
//#endregion
//#region node_modules/.pnpm/axios@1.18.1/node_modules/axios/lib/helpers/combineURLs.js
function Gc(e, t) {
	return t ? e.replace(/\/?\/$/, "") + "/" + t.replace(/^\/+/, "") : e;
}
//#endregion
//#region node_modules/.pnpm/axios@1.18.1/node_modules/axios/lib/core/buildFullPath.js
var Kc = /^https?:(?!\/\/)/i, qc = /[\t\n\r]/g;
function Jc(e) {
	let t = 0;
	for (; t < e.length && e.charCodeAt(t) <= 32;) t++;
	return e.slice(t);
}
function Yc(e) {
	return Jc(e).replace(qc, "");
}
function Xc(e, t) {
	if (typeof e == "string" && Kc.test(Yc(e))) throw new Q("Invalid URL: missing \"//\" after protocol", Q.ERR_INVALID_URL, t);
}
function Zc(e, t, n, r) {
	Xc(t, r);
	let i = !Wc(t);
	return e && (i || n === !1) ? (Xc(e, r), Gc(e, t)) : t;
}
//#endregion
//#region node_modules/.pnpm/axios@1.18.1/node_modules/axios/lib/core/mergeConfig.js
var Qc = (e) => e instanceof Qs ? { ...e } : e;
function $c(e, t) {
	e ||= {}, t ||= {};
	let n = Object.create(null);
	Object.defineProperty(n, "hasOwnProperty", {
		__proto__: null,
		value: Object.prototype.hasOwnProperty,
		enumerable: !1,
		writable: !0,
		configurable: !0
	});
	function r(e, t, n, r) {
		return Z.isPlainObject(e) && Z.isPlainObject(t) ? Z.merge.call({ caseless: r }, e, t) : Z.isPlainObject(t) ? Z.merge({}, t) : Z.isArray(t) ? t.slice() : t;
	}
	function i(e, t, n, i) {
		if (!Z.isUndefined(t)) return r(e, t, n, i);
		if (!Z.isUndefined(e)) return r(void 0, e, n, i);
	}
	function a(e, t) {
		if (!Z.isUndefined(t)) return r(void 0, t);
	}
	function o(e, t) {
		if (!Z.isUndefined(t)) return r(void 0, t);
		if (!Z.isUndefined(e)) return r(void 0, e);
	}
	function s(n) {
		let r = Z.hasOwnProp(t, "transitional") ? t.transitional : void 0;
		if (!Z.isUndefined(r)) if (Z.isPlainObject(r)) {
			if (Z.hasOwnProp(r, n)) return r[n];
		} else return;
		let i = Z.hasOwnProp(e, "transitional") ? e.transitional : void 0;
		if (Z.isPlainObject(i) && Z.hasOwnProp(i, n)) return i[n];
	}
	function c(n, i, a) {
		if (Z.hasOwnProp(t, a)) return r(n, i);
		if (Z.hasOwnProp(e, a)) return r(void 0, n);
	}
	let l = {
		url: a,
		method: a,
		data: a,
		baseURL: o,
		transformRequest: o,
		transformResponse: o,
		paramsSerializer: o,
		timeout: o,
		timeoutMessage: o,
		withCredentials: o,
		withXSRFToken: o,
		adapter: o,
		responseType: o,
		xsrfCookieName: o,
		xsrfHeaderName: o,
		onUploadProgress: o,
		onDownloadProgress: o,
		decompress: o,
		maxContentLength: o,
		maxBodyLength: o,
		beforeRedirect: o,
		transport: o,
		httpAgent: o,
		httpsAgent: o,
		cancelToken: o,
		socketPath: o,
		allowedSocketPaths: o,
		responseEncoding: o,
		validateStatus: c,
		headers: (e, t, n) => i(Qc(e), Qc(t), n, !0)
	};
	return Z.forEach(Object.keys({
		...e,
		...t
	}), function(r) {
		if (r === "__proto__" || r === "constructor" || r === "prototype") return;
		let a = Z.hasOwnProp(l, r) ? l[r] : i, o = a(Z.hasOwnProp(e, r) ? e[r] : void 0, Z.hasOwnProp(t, r) ? t[r] : void 0, r);
		Z.isUndefined(o) && a !== c || (n[r] = o);
	}), Z.hasOwnProp(t, "validateStatus") && Z.isUndefined(t.validateStatus) && s("validateStatusUndefinedResolves") === !1 && (Z.hasOwnProp(e, "validateStatus") ? n.validateStatus = r(void 0, e.validateStatus) : delete n.validateStatus), n;
}
//#endregion
//#region node_modules/.pnpm/axios@1.18.1/node_modules/axios/lib/helpers/resolveConfig.js
var el = ["content-type", "content-length"];
function tl(e, t, n) {
	if (n !== "content-only") {
		e.set(t);
		return;
	}
	Object.entries(t || {}).forEach(([t, n]) => {
		el.includes(t.toLowerCase()) && e.set(t, n);
	});
}
var nl = (e) => encodeURIComponent(e).replace(/%([0-9A-F]{2})/gi, (e, t) => String.fromCharCode(parseInt(t, 16)));
function rl(e) {
	let t = $c({}, e), n = (e) => Z.hasOwnProp(t, e) ? t[e] : void 0, r = n("data"), i = n("withXSRFToken"), a = n("xsrfHeaderName"), o = n("xsrfCookieName"), s = n("headers"), c = n("auth"), l = n("baseURL"), u = n("allowAbsoluteUrls"), d = n("url");
	if (t.headers = s = Qs.from(s), t.url = fc(Zc(l, d, u, t), n("params"), n("paramsSerializer")), c) {
		let t = Z.getSafeProp(c, "username") || "", n = Z.getSafeProp(c, "password") || "";
		try {
			s.set("Authorization", "Basic " + btoa(t + ":" + (n ? nl(n) : "")));
		} catch (t) {
			throw Q.from(t, Q.ERR_BAD_OPTION_VALUE, e);
		}
	}
	if (Z.isFormData(r) && (Sc.hasStandardBrowserEnv || Sc.hasStandardBrowserWebWorkerEnv || Z.isReactNative(r) ? s.setContentType(void 0) : Z.isFunction(r.getHeaders) && tl(s, r.getHeaders(), n("formDataHeaderPolicy"))), Sc.hasStandardBrowserEnv && (Z.isFunction(i) && (i = i(t)), i === !0 || i == null && Hc(t.url))) {
		let e = a && o && Uc.read(o);
		e && s.set(a, e);
	}
	return t;
}
var il = typeof XMLHttpRequest < "u" && function(e) {
	return new Promise(function(t, n) {
		let r = rl(e), i = r.data, a = Qs.from(r.headers).normalize(), { responseType: o, onUploadProgress: s, onDownloadProgress: c } = r, l, u, d, f, p;
		function m() {
			f && f(), p && p(), r.cancelToken && r.cancelToken.unsubscribe(l), r.signal && r.signal.removeEventListener("abort", l);
		}
		let h = new XMLHttpRequest();
		h.open(r.method.toUpperCase(), r.url, !0), h.timeout = r.timeout;
		function g() {
			if (!h) return;
			let r = Qs.from("getAllResponseHeaders" in h && h.getAllResponseHeaders());
			Fc(function(e) {
				t(e), m();
			}, function(e) {
				n(e), m();
			}, {
				data: !o || o === "text" || o === "json" ? h.responseText : h.response,
				status: h.status,
				statusText: h.statusText,
				headers: r,
				config: e,
				request: h
			}), h = null;
		}
		"onloadend" in h ? h.onloadend = g : h.onreadystatechange = function() {
			!h || h.readyState !== 4 || h.status === 0 && !(h.responseURL && h.responseURL.startsWith("file:")) || setTimeout(g);
		}, h.onabort = function() {
			h &&= (n(new Q("Request aborted", Q.ECONNABORTED, e, h)), m(), null);
		}, h.onerror = function(t) {
			let r = new Q(t && t.message ? t.message : "Network Error", Q.ERR_NETWORK, e, h);
			r.event = t || null, n(r), m(), h = null;
		}, h.ontimeout = function() {
			let t = r.timeout ? "timeout of " + r.timeout + "ms exceeded" : "timeout exceeded", i = r.transitional || mc;
			r.timeoutErrorMessage && (t = r.timeoutErrorMessage), n(new Q(t, i.clarifyTimeoutError ? Q.ETIMEDOUT : Q.ECONNABORTED, e, h)), m(), h = null;
		}, i === void 0 && a.setContentType(null), "setRequestHeader" in h && Z.forEach(Us(a), function(e, t) {
			h.setRequestHeader(t, e);
		}), Z.isUndefined(r.withCredentials) || (h.withCredentials = !!r.withCredentials), o && o !== "json" && (h.responseType = r.responseType), c && ([d, p] = zc(c, !0), h.addEventListener("progress", d)), s && h.upload && ([u, f] = zc(s), h.upload.addEventListener("progress", u), h.upload.addEventListener("loadend", f)), (r.cancelToken || r.signal) && (l = (t) => {
			h &&= (n(!t || t.type ? new Pc(null, e, h) : t), h.abort(), m(), null);
		}, r.cancelToken && r.cancelToken.subscribe(l), r.signal && (r.signal.aborted ? l() : r.signal.addEventListener("abort", l)));
		let _ = Ic(r.url);
		if (_ && !Sc.protocols.includes(_)) {
			n(new Q("Unsupported protocol " + _ + ":", Q.ERR_BAD_REQUEST, e)), m();
			return;
		}
		h.send(i || null);
	});
}, al = (e, t) => {
	if (e = e ? e.filter(Boolean) : [], !t && !e.length) return;
	let n = new AbortController(), r = !1, i = function(e) {
		if (!r) {
			r = !0, o();
			let t = e instanceof Error ? e : this.reason;
			n.abort(t instanceof Q ? t : new Pc(t instanceof Error ? t.message : t));
		}
	}, a = t && setTimeout(() => {
		a = null, i(new Q(`timeout of ${t}ms exceeded`, Q.ETIMEDOUT));
	}, t), o = () => {
		e &&= (a && clearTimeout(a), a = null, e.forEach((e) => {
			e.unsubscribe ? e.unsubscribe(i) : e.removeEventListener("abort", i);
		}), null);
	};
	e.forEach((e) => e.addEventListener("abort", i, { once: !0 }));
	let { signal: s } = n;
	return s.unsubscribe = () => Z.asap(o), s;
}, ol = function* (e, t) {
	let n = e.byteLength;
	if (!t || n < t) {
		yield e;
		return;
	}
	let r = 0, i;
	for (; r < n;) i = r + t, yield e.slice(r, i), r = i;
}, sl = async function* (e, t) {
	for await (let n of cl(e)) yield* ol(n, t);
}, cl = async function* (e) {
	if (e[Symbol.asyncIterator]) {
		yield* e;
		return;
	}
	let t = e.getReader();
	try {
		for (;;) {
			let { done: e, value: n } = await t.read();
			if (e) break;
			yield n;
		}
	} finally {
		await t.cancel();
	}
}, ll = (e, t, n, r) => {
	let i = sl(e, t), a = 0, o, s = (e) => {
		o || (o = !0, r && r(e));
	};
	return new ReadableStream({
		async pull(e) {
			try {
				let { done: t, value: r } = await i.next();
				if (t) {
					s(), e.close();
					return;
				}
				let o = r.byteLength;
				n && n(a += o), e.enqueue(new Uint8Array(r));
			} catch (e) {
				throw s(e), e;
			}
		},
		cancel(e) {
			return s(e), i.return();
		}
	}, { highWaterMark: 2 });
}, ul = (e) => e >= 48 && e <= 57 || e >= 65 && e <= 70 || e >= 97 && e <= 102, dl = (e, t, n) => t + 2 < n && ul(e.charCodeAt(t + 1)) && ul(e.charCodeAt(t + 2));
function fl(e) {
	if (!e || typeof e != "string" || !e.startsWith("data:")) return 0;
	let t = e.indexOf(",");
	if (t < 0) return 0;
	let n = e.slice(5, t), r = e.slice(t + 1);
	if (/;base64/i.test(n)) {
		let e = r.length, t = r.length;
		for (let n = 0; n < t; n++) if (r.charCodeAt(n) === 37 && n + 2 < t) {
			let t = r.charCodeAt(n + 1), i = r.charCodeAt(n + 2);
			ul(t) && ul(i) && (e -= 2, n += 2);
		}
		let n = 0, i = t - 1, a = (e) => e >= 2 && r.charCodeAt(e - 2) === 37 && r.charCodeAt(e - 1) === 51 && (r.charCodeAt(e) === 68 || r.charCodeAt(e) === 100);
		i >= 0 && (r.charCodeAt(i) === 61 ? (n++, i--) : a(i) && (n++, i -= 3)), n === 1 && i >= 0 && (r.charCodeAt(i) === 61 || a(i)) && n++;
		let o = Math.floor(e / 4) * 3 - (n || 0);
		return o > 0 ? o : 0;
	}
	let i = 0;
	for (let e = 0, t = r.length; e < t; e++) {
		let n = r.charCodeAt(e);
		if (n === 37 && dl(r, e, t)) i += 1, e += 2;
		else if (n < 128) i += 1;
		else if (n < 2048) i += 2;
		else if (n >= 55296 && n <= 56319 && e + 1 < t) {
			let t = r.charCodeAt(e + 1);
			t >= 56320 && t <= 57343 ? (i += 4, e++) : i += 3;
		} else i += 3;
	}
	return i;
}
//#endregion
//#region node_modules/.pnpm/axios@1.18.1/node_modules/axios/lib/env/data.js
var pl = "1.18.1", ml = 64 * 1024, { isFunction: hl } = Z, gl = (e) => encodeURIComponent(e).replace(/%([0-9A-F]{2})/gi, (e, t) => String.fromCharCode(parseInt(t, 16))), _l = (e) => {
	if (!Z.isString(e)) return e;
	try {
		return decodeURIComponent(e);
	} catch {
		return e;
	}
}, vl = (e, ...t) => {
	try {
		return !!e(...t);
	} catch {
		return !1;
	}
}, yl = (e) => {
	let t = e.indexOf("://"), n = e;
	return t !== -1 && (n = n.slice(t + 3)), n.includes("@") || n.includes(":");
}, bl = (e) => {
	let t = Z.global !== void 0 && Z.global !== null ? Z.global : globalThis, { ReadableStream: n, TextEncoder: r } = t;
	e = Z.merge.call({ skipUndefined: !0 }, {
		Request: t.Request,
		Response: t.Response
	}, e);
	let { fetch: i, Request: a, Response: o } = e, s = i ? hl(i) : typeof fetch == "function", c = hl(a), l = hl(o);
	if (!s) return !1;
	let u = s && hl(n), d = s && (typeof r == "function" ? ((e) => (t) => e.encode(t))(new r()) : async (e) => new Uint8Array(await new a(e).arrayBuffer())), f = c && u && vl(() => {
		let e = !1, t = new a(Sc.origin, {
			body: new n(),
			method: "POST",
			get duplex() {
				return e = !0, "half";
			}
		}), r = t.headers.has("Content-Type");
		return t.body != null && t.body.cancel(), e && !r;
	}), p = l && u && vl(() => Z.isReadableStream(new o("").body)), m = { stream: p && ((e) => e.body) };
	s && [
		"text",
		"arrayBuffer",
		"blob",
		"formData",
		"stream"
	].forEach((e) => {
		!m[e] && (m[e] = (t, n) => {
			let r = t && t[e];
			if (r) return r.call(t);
			throw new Q(`Response type '${e}' is not supported`, Q.ERR_NOT_SUPPORT, n);
		});
	});
	let h = async (e) => {
		if (e == null) return 0;
		if (Z.isBlob(e)) return e.size;
		if (Z.isSpecCompliantForm(e)) return (await new a(Sc.origin, {
			method: "POST",
			body: e
		}).arrayBuffer()).byteLength;
		if (Z.isArrayBufferView(e) || Z.isArrayBuffer(e)) return e.byteLength;
		if (Z.isURLSearchParams(e) && (e += ""), Z.isString(e)) return (await d(e)).byteLength;
	}, g = async (e, t) => Z.toFiniteNumber(e.getContentLength()) ?? h(t);
	return async (e) => {
		let { url: t, method: n, data: s, signal: l, cancelToken: d, timeout: _, onDownloadProgress: v, onUploadProgress: y, responseType: b, headers: x, withCredentials: S = "same-origin", fetchOptions: C, maxContentLength: w, maxBodyLength: T } = rl(e), E = Z.isNumber(w) && w > -1, D = Z.isNumber(T) && T > -1, O = (t) => Z.hasOwnProp(e, t) ? e[t] : void 0, k = i || fetch;
		b = b ? (b + "").toLowerCase() : "text";
		let A = al([l, d && d.toAbortSignal()], _), j = null, M = A && A.unsubscribe && (() => {
			A.unsubscribe();
		}), N, P = null, F = () => new Q("Request body larger than maxBodyLength limit", Q.ERR_BAD_REQUEST, e, j);
		try {
			let i, l = O("auth");
			if (l && (i = {
				username: Z.getSafeProp(l, "username") || "",
				password: Z.getSafeProp(l, "password") || ""
			}), yl(t)) {
				let e = new URL(t, Sc.origin);
				!i && (e.username || e.password) && (i = {
					username: _l(e.username),
					password: _l(e.password)
				}), (e.username || e.password) && (e.username = "", e.password = "", t = e.href);
			}
			if (i && (x.delete("authorization"), x.set("Authorization", "Basic " + btoa(gl((i.username || "") + ":" + (i.password || ""))))), E && typeof t == "string" && t.startsWith("data:") && fl(t) > w) throw new Q("maxContentLength size of " + w + " exceeded", Q.ERR_BAD_RESPONSE, e, j);
			if (D && n !== "get" && n !== "head") {
				let e = await h(s);
				if (typeof e == "number" && isFinite(e) && (N = e, e > T)) throw F();
			}
			let d = D && (Z.isReadableStream(s) || Z.isStream(s)), _ = (e, t, n) => ll(e, ml, (e) => {
				if (D && e > T) throw P = F();
				t && t(e);
			}, n);
			if (f && n !== "get" && n !== "head" && (y || d)) {
				if (N ??= await g(x, s), N !== 0 || d) {
					let e = new a(t, {
						method: "POST",
						body: s,
						duplex: "half"
					}), n;
					if (Z.isFormData(s) && (n = e.headers.get("content-type")) && x.setContentType(n), e.body) {
						let [t, n] = y && Bc(N, zc(Vc(y))) || [];
						s = _(e.body, t, n);
					}
				}
			} else if (d && !c && u && n !== "get" && n !== "head") s = _(s);
			else if (d && c && !f && n !== "get" && n !== "head") throw new Q("Stream request bodies are not supported by the current fetch implementation", Q.ERR_NOT_SUPPORT, e, j);
			Z.isString(S) || (S = S ? "include" : "omit");
			let ee = c && "credentials" in a.prototype;
			if (Z.isFormData(s)) {
				let e = x.getContentType();
				e && /^multipart\/form-data/i.test(e) && !/boundary=/i.test(e) && x.delete("content-type");
			}
			x.set("User-Agent", "axios/" + pl, !1);
			let te = {
				...C,
				signal: A,
				method: n.toUpperCase(),
				headers: Us(x.normalize()),
				body: s,
				duplex: "half",
				credentials: ee ? S : void 0
			};
			j = c && new a(t, te);
			let I = await (c ? k(j, C) : k(t, te)), ne = Qs.from(I.headers);
			if (E) {
				let t = Z.toFiniteNumber(ne.getContentLength());
				if (t != null && t > w) throw new Q("maxContentLength size of " + w + " exceeded", Q.ERR_BAD_RESPONSE, e, j);
			}
			let re = p && (b === "stream" || b === "response");
			if (p && I.body && (v || E || re && M)) {
				let t = {};
				[
					"status",
					"statusText",
					"headers"
				].forEach((e) => {
					t[e] = I[e];
				});
				let n = Z.toFiniteNumber(ne.getContentLength()), [r, i] = v && Bc(n, zc(Vc(v), !0)) || [], a = 0;
				I = new o(ll(I.body, ml, (t) => {
					if (E && (a = t, a > w)) throw new Q("maxContentLength size of " + w + " exceeded", Q.ERR_BAD_RESPONSE, e, j);
					r && r(t);
				}, () => {
					i && i(), M && M();
				}), t);
			}
			b ||= "text";
			let ie = await m[Z.findKey(m, b) || "text"](I, e);
			if (E && !p && !re) {
				let t;
				if (ie != null && (typeof ie.byteLength == "number" ? t = ie.byteLength : typeof ie.size == "number" ? t = ie.size : typeof ie == "string" && (t = typeof r == "function" ? new r().encode(ie).byteLength : ie.length)), typeof t == "number" && t > w) throw new Q("maxContentLength size of " + w + " exceeded", Q.ERR_BAD_RESPONSE, e, j);
			}
			return !re && M && M(), await new Promise((t, n) => {
				Fc(t, n, {
					data: ie,
					headers: Qs.from(I.headers),
					status: I.status,
					statusText: I.statusText,
					config: e,
					request: j
				});
			});
		} catch (t) {
			if (M && M(), A && A.aborted && A.reason instanceof Q) {
				let n = A.reason;
				throw n.config = e, j && (n.request = j), t !== n && Object.defineProperty(n, "cause", {
					__proto__: null,
					value: t,
					writable: !0,
					enumerable: !1,
					configurable: !0
				}), n;
			}
			if (P) throw j && !P.request && (P.request = j), P;
			if (t instanceof Q) throw j && !t.request && (t.request = j), t;
			if (t && t.name === "TypeError" && /Load failed|fetch/i.test(t.message)) {
				let n = new Q("Network Error", Q.ERR_NETWORK, e, j, t && t.response);
				throw Object.defineProperty(n, "cause", {
					__proto__: null,
					value: t.cause || t,
					writable: !0,
					enumerable: !1,
					configurable: !0
				}), n;
			}
			throw Q.from(t, t && t.code, e, j, t && t.response);
		}
	};
}, xl = /* @__PURE__ */ new Map(), Sl = (e) => {
	let t = e && e.env || {}, { fetch: n, Request: r, Response: i } = t, a = [
		r,
		i,
		n
	], o = a.length, s, c, l = xl;
	for (; o--;) s = a[o], c = l.get(s), c === void 0 && l.set(s, c = o ? /* @__PURE__ */ new Map() : bl(t)), l = c;
	return c;
};
Sl();
//#endregion
//#region node_modules/.pnpm/axios@1.18.1/node_modules/axios/lib/adapters/adapters.js
var Cl = {
	http: null,
	xhr: il,
	fetch: { get: Sl }
};
Z.forEach(Cl, (e, t) => {
	if (e) {
		try {
			Object.defineProperty(e, "name", {
				__proto__: null,
				value: t
			});
		} catch {}
		Object.defineProperty(e, "adapterName", {
			__proto__: null,
			value: t
		});
	}
});
var wl = (e) => `- ${e}`, Tl = (e) => Z.isFunction(e) || e === null || e === !1;
function El(e, t) {
	e = Z.isArray(e) ? e : [e];
	let { length: n } = e, r, i, a = {};
	for (let o = 0; o < n; o++) {
		r = e[o];
		let n;
		if (i = r, !Tl(r) && (i = Cl[(n = String(r)).toLowerCase()], i === void 0)) throw new Q(`Unknown adapter '${n}'`);
		if (i && (Z.isFunction(i) || (i = i.get(t)))) break;
		a[n || "#" + o] = i;
	}
	if (!i) {
		let e = Object.entries(a).map(([e, t]) => `adapter ${e} ` + (t === !1 ? "is not supported by the environment" : "is not available in the build"));
		throw new Q("There is no suitable adapter to dispatch the request " + (n ? e.length > 1 ? "since :\n" + e.map(wl).join("\n") : " " + wl(e[0]) : "as no adapter specified"), Q.ERR_NOT_SUPPORT);
	}
	return i;
}
var Dl = {
	getAdapter: El,
	adapters: Cl
};
//#endregion
//#region node_modules/.pnpm/axios@1.18.1/node_modules/axios/lib/core/dispatchRequest.js
function Ol(e) {
	if (e.cancelToken && e.cancelToken.throwIfRequested(), e.signal && e.signal.aborted) throw new Pc(null, e);
}
function kl(e) {
	return Ol(e), e.headers = Qs.from(e.headers), e.data = Mc.call(e, e.transformRequest), [
		"post",
		"put",
		"patch"
	].indexOf(e.method) !== -1 && e.headers.setContentType("application/x-www-form-urlencoded", !1), Dl.getAdapter(e.adapter || jc.adapter, e)(e).then(function(t) {
		Ol(e), e.response = t;
		try {
			t.data = Mc.call(e, e.transformResponse, t);
		} finally {
			delete e.response;
		}
		return t.headers = Qs.from(t.headers), t;
	}, function(t) {
		if (!Nc(t) && (Ol(e), t && t.response)) {
			e.response = t.response;
			try {
				t.response.data = Mc.call(e, e.transformResponse, t.response);
			} finally {
				delete e.response;
			}
			t.response.headers = Qs.from(t.response.headers);
		}
		return Promise.reject(t);
	});
}
//#endregion
//#region node_modules/.pnpm/axios@1.18.1/node_modules/axios/lib/helpers/validator.js
var Al = {};
[
	"object",
	"boolean",
	"number",
	"function",
	"string",
	"symbol"
].forEach((e, t) => {
	Al[e] = function(n) {
		return typeof n === e || "a" + (t < 1 ? "n " : " ") + e;
	};
});
var jl = {};
Al.transitional = function(e, t, n) {
	function r(e, t) {
		return "[Axios v" + pl + "] Transitional option '" + e + "'" + t + (n ? ". " + n : "");
	}
	return (n, i, a) => {
		if (e === !1) throw new Q(r(i, " has been removed" + (t ? " in " + t : "")), Q.ERR_DEPRECATED);
		return t && !jl[i] && (jl[i] = !0, console.warn(r(i, " has been deprecated since v" + t + " and will be removed in the near future"))), !e || e(n, i, a);
	};
}, Al.spelling = function(e) {
	return (t, n) => (console.warn(`${n} is likely a misspelling of ${e}`), !0);
};
function Ml(e, t, n) {
	if (typeof e != "object" || !e) throw new Q("options must be an object", Q.ERR_BAD_OPTION_VALUE);
	let r = Object.keys(e), i = r.length;
	for (; i-- > 0;) {
		let a = r[i], o = Object.prototype.hasOwnProperty.call(t, a) ? t[a] : void 0;
		if (o) {
			let t = e[a], n = t === void 0 || o(t, a, e);
			if (n !== !0) throw new Q("option " + a + " must be " + n, Q.ERR_BAD_OPTION_VALUE);
			continue;
		}
		if (n !== !0) throw new Q("Unknown option " + a, Q.ERR_BAD_OPTION);
	}
}
var Nl = {
	assertOptions: Ml,
	validators: Al
}, Pl = Nl.validators, Fl = class {
	constructor(e) {
		this.defaults = e || {}, this.interceptors = {
			request: new pc(),
			response: new pc()
		};
	}
	async request(e, t) {
		try {
			return await this._request(e, t);
		} catch (e) {
			if (e instanceof Error) {
				let t = {};
				Error.captureStackTrace ? Error.captureStackTrace(t) : t = /* @__PURE__ */ Error();
				let n = (() => {
					if (!t.stack) return "";
					let e = t.stack.indexOf("\n");
					return e === -1 ? "" : t.stack.slice(e + 1);
				})();
				try {
					if (!e.stack) e.stack = n;
					else if (n) {
						let t = n.indexOf("\n"), r = t === -1 ? -1 : n.indexOf("\n", t + 1), i = r === -1 ? "" : n.slice(r + 1);
						String(e.stack).endsWith(i) || (e.stack += "\n" + n);
					}
				} catch {}
			}
			throw e;
		}
	}
	_request(e, t) {
		typeof e == "string" ? (t ||= {}, t.url = e) : t = e || {}, t = $c(this.defaults, t);
		let { transitional: n, paramsSerializer: r, headers: i } = t;
		n !== void 0 && Nl.assertOptions(n, {
			silentJSONParsing: Pl.transitional(Pl.boolean),
			forcedJSONParsing: Pl.transitional(Pl.boolean),
			clarifyTimeoutError: Pl.transitional(Pl.boolean),
			legacyInterceptorReqResOrdering: Pl.transitional(Pl.boolean),
			advertiseZstdAcceptEncoding: Pl.transitional(Pl.boolean),
			validateStatusUndefinedResolves: Pl.transitional(Pl.boolean)
		}, !1), r != null && (Z.isFunction(r) ? t.paramsSerializer = { serialize: r } : Nl.assertOptions(r, {
			encode: Pl.function,
			serialize: Pl.function
		}, !0)), t.allowAbsoluteUrls !== void 0 || (this.defaults.allowAbsoluteUrls === void 0 ? t.allowAbsoluteUrls = !0 : t.allowAbsoluteUrls = this.defaults.allowAbsoluteUrls), Nl.assertOptions(t, {
			baseUrl: Pl.spelling("baseURL"),
			withXsrfToken: Pl.spelling("withXSRFToken")
		}, !0), t.method = (t.method || this.defaults.method || "get").toLowerCase();
		let a = i && Z.merge(i.common, i[t.method]);
		i && Z.forEach([
			"delete",
			"get",
			"head",
			"post",
			"put",
			"patch",
			"query",
			"common"
		], (e) => {
			delete i[e];
		}), t.headers = Qs.concat(a, i);
		let o = [], s = !0;
		this.interceptors.request.forEach(function(e) {
			if (typeof e.runWhen == "function" && e.runWhen(t) === !1) return;
			s &&= e.synchronous;
			let n = t.transitional || mc;
			n && n.legacyInterceptorReqResOrdering ? o.unshift(e.fulfilled, e.rejected) : o.push(e.fulfilled, e.rejected);
		});
		let c = [];
		this.interceptors.response.forEach(function(e) {
			c.push(e.fulfilled, e.rejected);
		});
		let l, u = 0, d;
		if (!s) {
			let e = [kl.bind(this), void 0];
			for (e.unshift(...o), e.push(...c), d = e.length, l = Promise.resolve(t); u < d;) l = l.then(e[u++], e[u++]);
			return l;
		}
		d = o.length;
		let f = t;
		for (; u < d;) {
			let e = o[u++], t = o[u++];
			try {
				f = e(f);
			} catch (e) {
				t.call(this, e);
				break;
			}
		}
		try {
			l = kl.call(this, f);
		} catch (e) {
			return Promise.reject(e);
		}
		for (u = 0, d = c.length; u < d;) l = l.then(c[u++], c[u++]);
		return l;
	}
	getUri(e) {
		return e = $c(this.defaults, e), fc(Zc(e.baseURL, e.url, e.allowAbsoluteUrls, e), e.params, e.paramsSerializer);
	}
};
Z.forEach([
	"delete",
	"get",
	"head",
	"options"
], function(e) {
	Fl.prototype[e] = function(t, n) {
		return this.request($c(n || {}, {
			method: e,
			url: t,
			data: n && Z.hasOwnProp(n, "data") ? n.data : void 0
		}));
	};
}), Z.forEach([
	"post",
	"put",
	"patch",
	"query"
], function(e) {
	function t(t) {
		return function(n, r, i) {
			return this.request($c(i || {}, {
				method: e,
				headers: t ? { "Content-Type": "multipart/form-data" } : {},
				url: n,
				data: r
			}));
		};
	}
	Fl.prototype[e] = t(), e !== "query" && (Fl.prototype[e + "Form"] = t(!0));
});
//#endregion
//#region node_modules/.pnpm/axios@1.18.1/node_modules/axios/lib/cancel/CancelToken.js
var Il = class e {
	constructor(e) {
		if (typeof e != "function") throw TypeError("executor must be a function.");
		let t;
		this.promise = new Promise(function(e) {
			t = e;
		});
		let n = this;
		this.promise.then((e) => {
			if (!n._listeners) return;
			let t = n._listeners.length;
			for (; t-- > 0;) n._listeners[t](e);
			n._listeners = null;
		}), this.promise.then = (e) => {
			let t, r = new Promise((e) => {
				n.subscribe(e), t = e;
			}).then(e);
			return r.cancel = function() {
				n.unsubscribe(t);
			}, r;
		}, e(function(e, r, i) {
			n.reason || (n.reason = new Pc(e, r, i), t(n.reason));
		});
	}
	throwIfRequested() {
		if (this.reason) throw this.reason;
	}
	subscribe(e) {
		if (this.reason) {
			e(this.reason);
			return;
		}
		this._listeners ? this._listeners.push(e) : this._listeners = [e];
	}
	unsubscribe(e) {
		if (!this._listeners) return;
		let t = this._listeners.indexOf(e);
		t !== -1 && this._listeners.splice(t, 1);
	}
	toAbortSignal() {
		let e = new AbortController(), t = (t) => {
			e.abort(t);
		};
		return this.subscribe(t), e.signal.unsubscribe = () => this.unsubscribe(t), e.signal;
	}
	static source() {
		let t;
		return {
			token: new e(function(e) {
				t = e;
			}),
			cancel: t
		};
	}
};
//#endregion
//#region node_modules/.pnpm/axios@1.18.1/node_modules/axios/lib/helpers/spread.js
function Ll(e) {
	return function(t) {
		return e.apply(null, t);
	};
}
//#endregion
//#region node_modules/.pnpm/axios@1.18.1/node_modules/axios/lib/helpers/isAxiosError.js
function Rl(e) {
	return Z.isObject(e) && e.isAxiosError === !0;
}
//#endregion
//#region node_modules/.pnpm/axios@1.18.1/node_modules/axios/lib/helpers/HttpStatusCode.js
var zl = {
	Continue: 100,
	SwitchingProtocols: 101,
	Processing: 102,
	EarlyHints: 103,
	Ok: 200,
	Created: 201,
	Accepted: 202,
	NonAuthoritativeInformation: 203,
	NoContent: 204,
	ResetContent: 205,
	PartialContent: 206,
	MultiStatus: 207,
	AlreadyReported: 208,
	ImUsed: 226,
	MultipleChoices: 300,
	MovedPermanently: 301,
	Found: 302,
	SeeOther: 303,
	NotModified: 304,
	UseProxy: 305,
	Unused: 306,
	TemporaryRedirect: 307,
	PermanentRedirect: 308,
	BadRequest: 400,
	Unauthorized: 401,
	PaymentRequired: 402,
	Forbidden: 403,
	NotFound: 404,
	MethodNotAllowed: 405,
	NotAcceptable: 406,
	ProxyAuthenticationRequired: 407,
	RequestTimeout: 408,
	Conflict: 409,
	Gone: 410,
	LengthRequired: 411,
	PreconditionFailed: 412,
	PayloadTooLarge: 413,
	UriTooLong: 414,
	UnsupportedMediaType: 415,
	RangeNotSatisfiable: 416,
	ExpectationFailed: 417,
	ImATeapot: 418,
	MisdirectedRequest: 421,
	UnprocessableEntity: 422,
	Locked: 423,
	FailedDependency: 424,
	TooEarly: 425,
	UpgradeRequired: 426,
	PreconditionRequired: 428,
	TooManyRequests: 429,
	RequestHeaderFieldsTooLarge: 431,
	UnavailableForLegalReasons: 451,
	InternalServerError: 500,
	NotImplemented: 501,
	BadGateway: 502,
	ServiceUnavailable: 503,
	GatewayTimeout: 504,
	HttpVersionNotSupported: 505,
	VariantAlsoNegotiates: 506,
	InsufficientStorage: 507,
	LoopDetected: 508,
	NotExtended: 510,
	NetworkAuthenticationRequired: 511,
	WebServerIsDown: 521,
	ConnectionTimedOut: 522,
	OriginIsUnreachable: 523,
	TimeoutOccurred: 524,
	SslHandshakeFailed: 525,
	InvalidSslCertificate: 526
};
Object.entries(zl).forEach(([e, t]) => {
	zl[t] = e;
});
//#endregion
//#region node_modules/.pnpm/axios@1.18.1/node_modules/axios/lib/axios.js
function Bl(e) {
	let t = new Fl(e), n = yo(Fl.prototype.request, t);
	return Z.extend(n, Fl.prototype, t, { allOwnKeys: !0 }), Z.extend(n, t, null, { allOwnKeys: !0 }), n.create = function(t) {
		return Bl($c(e, t));
	}, n;
}
var $ = Bl(jc);
$.Axios = Fl, $.CanceledError = Pc, $.CancelToken = Il, $.isCancel = Nc, $.VERSION = pl, $.toFormData = sc, $.AxiosError = Q, $.Cancel = $.CanceledError, $.all = function(e) {
	return Promise.all(e);
}, $.spread = Ll, $.isAxiosError = Rl, $.mergeConfig = $c, $.AxiosHeaders = Qs, $.formToJSON = (e) => Oc(Z.isHTMLForm(e) ? new FormData(e) : e), $.getAdapter = Dl.getAdapter, $.HttpStatusCode = zl, $.default = $;
//#endregion
//#region node_modules/.pnpm/axios@1.18.1/node_modules/axios/index.js
var { Axios: Vl, AxiosError: Hl, CanceledError: Ul, isCancel: Wl, CancelToken: Gl, VERSION: Kl, all: ql, Cancel: Jl, isAxiosError: Yl, spread: Xl, toFormData: Zl, AxiosHeaders: Ql, HttpStatusCode: $l, formToJSON: eu, getAdapter: tu, mergeConfig: nu, create: ru } = $, iu = null;
function au(e) {
	if (iu !== null) {
		console.warn("[LinID CoreLib] HTTP client has already been initialized. Re-initialization is ignored.");
		return;
	}
	iu = e;
}
function ou() {
	if (iu === null) throw Error("[LinID CoreLib] HTTP client is not initialized. Call setHttpClient() first.");
	return iu;
}
//#endregion
//#region src/services/linidModuleConfigurationService.ts
var su = /* @__PURE__ */ new Map();
function cu(e) {
	su.set(e.instanceId, e);
}
function lu(e) {
	let t = su.get(e);
	if (!t) throw Error(`[LinID CoreLib] No module host configuration found for instanceId: ${e}`);
	return t;
}
//#endregion
//#region src/services/linidEntityService.ts
async function uu(e, t) {
	let n = lu(e);
	return ou().post(`/${n.apiEndpoint}`, t).then(({ data: e }) => e);
}
async function du(e, t, n) {
	let r = lu(e);
	return ou().put(`/${r.apiEndpoint}/${t}`, n).then(({ data: e }) => e);
}
async function fu(e, t, n) {
	let r = lu(e);
	return ou().get(`/${r.apiEndpoint}`, { params: {
		...t,
		...n
	} }).then(({ data: e }) => e);
}
async function pu(e, t) {
	let n = lu(e);
	return ou().get(`/${n.apiEndpoint}/${t}`).then(({ data: e }) => e);
}
async function mu(e, t) {
	let n = lu(e);
	return ou().delete(`/${n.apiEndpoint}/${t}`);
}
async function hu(e, t, n) {
	let r = lu(e);
	await ou().post(`/${r.apiEndpoint}/validate/${t}`, n, { headers: { "Content-Type": "application/json" } });
}
//#endregion
//#region src/services/objectService.ts
function gu(e, t) {
	if (!bu(e) || !bu(t)) return t;
	let n = { ...e };
	for (let r of Object.keys(t)) n[r] = gu(e[r], t[r]);
	return n;
}
function _u(e) {
	let t = {};
	for (let [n, r] of Object.entries(e)) {
		let e = n.split("."), i = t;
		e.forEach((t, n) => {
			n === e.length - 1 ? i[t] = r : (bu(i[t]) || (i[t] = {}), i = i[t]);
		});
	}
	return t;
}
function vu(e, t) {
	return t.split(".").reduce((e, t) => bu(e) ? e[t] : void 0, e);
}
function yu(e, t, n) {
	let [r, ...i] = t.split("."), a = { ...e };
	return i.length === 0 ? a[r] = n : a[r] = yu(bu(a[r]) ? a[r] : {}, i.join("."), n), a;
}
function bu(e) {
	return typeof e == "object" && !!e && !Array.isArray(e);
}
function xu(e, t) {
	return typeof e != "object" || !e ? e : Object.fromEntries(Object.entries(e).map(([e, n]) => [t(e), bu(n) ? xu(n, t) : n]));
}
function Su(e, t) {
	if (e === t || typeof e == "number" && typeof t == "number" && Number.isNaN(e) && Number.isNaN(t)) return !0;
	if (e == null || t == null || typeof e != "object" || typeof t != "object" || Array.isArray(e) !== Array.isArray(t)) return !1;
	let n = Object.keys(e), r = Object.keys(t);
	if (n.length !== r.length) return !1;
	let i = e, a = t;
	return n.every((e) => Object.prototype.hasOwnProperty.call(a, e) && Su(i[e], a[e]));
}
function Cu(e, t) {
	if (Array.isArray(e) && Array.isArray(t)) {
		if (e.length !== t.length) return !1;
		let n = /* @__PURE__ */ new Set();
		return e.every((e) => {
			let r = t.findIndex((t, r) => !n.has(r) && Cu(e, t));
			return r === -1 ? !1 : (n.add(r), !0);
		});
	}
	if (bu(e) && bu(t)) {
		let n = Object.keys(e), r = Object.keys(t);
		return n.length === r.length && n.every((n) => Object.prototype.hasOwnProperty.call(t, n) && Cu(e[n], t[n]));
	}
	return Su(e, t);
}
//#endregion
//#region src/services/i18nService.ts
var wu = null;
function Tu(e) {
	if (wu !== null) {
		console.warn("[LinID CoreLib] I18n has already been initialized. Re-initialization is ignored.");
		return;
	}
	wu = e;
}
function Eu() {
	if (wu === null) throw Error("[LinID CoreLib] I18n is not initialized. Call setI18nInstance() first.");
	return wu;
}
//#endregion
//#region src/stores/linidUiStore.ts
var Du = () => Ou(Ze()), Ou = Je("LinidUiStore", {
	state: () => ({
		mainNavigationItems: [],
		i18n: {
			locale: "",
			languages: []
		}
	}),
	actions: {
		addMainNavigationMenuItems(...e) {
			this.mainNavigationItems.push(...e);
		},
		setAvailableLanguages(e) {
			this.i18n.languages = e;
		},
		setLocale(e) {
			this.i18n.locale = e;
		}
	}
}), ku = () => Au(Ze()), Au = Je("LinidUserPreferenceStore", {
	state: () => ({ userPreferences: {} }),
	actions: {
		setUserPreferences(e) {
			this.userPreferences = e;
		},
		setUserPreference(e, t) {
			this.userPreferences[e] = t;
		},
		removeUserPreference(e) {
			delete this.userPreferences[e];
		}
	}
});
//#endregion
//#region src/composables/useLinidUserPreference.ts
function ju() {
	let e = ku();
	function t() {
		return ou().get("user-preferences").then(({ data: t }) => {
			e.setUserPreferences(t);
		});
	}
	function n(t, n) {
		return ou().post("user-preferences", {
			key: t,
			value: n
		}).then(({ data: t }) => {
			e.setUserPreference(t.key, t.value);
		});
	}
	function r(t) {
		return ou().delete(`user-preferences/${t}`).then(() => {
			e.removeUserPreference(t);
		});
	}
	return {
		init: t,
		saveUserPreference: n,
		deleteUserPreference: r,
		userPreferenceStore: e
	};
}
//#endregion
//#region src/composables/useScopedI18n.ts
function Mu(e) {
	let { t, te: n, tm: r } = fa({
		useScope: "global",
		__i18n: Eu().global
	});
	function i(...n) {
		let [r, i, a] = n;
		return t(`${e}.${r}`, i, a);
	}
	function a(...t) {
		return n(`${e}.${t[0]}`, t[1]);
	}
	function o(...t) {
		return r(`${e}.${t[0]}`);
	}
	function s(e, ...t) {
		return a(t[0]) ? i(...t) : e;
	}
	return {
		t: i,
		te: a,
		tm: o,
		translateOrDefault: s
	};
}
var Nu = "language";
function Pu(e) {
	let t = Du();
	return !!e && t.i18n.languages.includes(e);
}
function Fu() {
	let { userPreferenceStore: e } = ju(), t = Du();
	return [e.userPreferences?.[Nu], localStorage.getItem(Nu)].find(Pu) ?? t.i18n.locale;
}
async function Iu(e) {
	let { userPreferenceStore: t, saveUserPreference: n } = ju(), r = t.userPreferences?.[Nu];
	localStorage.setItem(Nu, e), e !== r && await n(Nu, e);
}
async function Lu(e) {
	let t = Du(), n = Eu();
	n.global.locale.value = e, t.setLocale(e), await Iu(e);
}
//#endregion
//#region src/composables/useFieldValidation.ts
var Ru = /* @__PURE__ */ new Set([$l.BadRequest, $l.NotFound]);
function zu(e) {
	return $.isAxiosError(e) && e.response?.status != null && Ru.has(e.response.status);
}
function Bu(e) {
	let { t } = Mu(e), { toDayjs: n } = wa();
	async function r(e, n, r) {
		try {
			return await hu(e, n, r), !0;
		} catch (e) {
			return zu(e) ? e.response.data.error : t("validation.unknownError");
		}
	}
	function i(e) {
		return e == null || e === "" ? t("validation.required") : !0;
	}
	function a(e) {
		return typeof e != "string" || !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(e) ? t("validation.email") : !0;
	}
	function o(e, n) {
		return e != null && e.length < n ? t("validation.minLength", { min: n }) : !0;
	}
	function s(e, n) {
		return e != null && e.length > n ? t("validation.maxLength", { max: n }) : !0;
	}
	function c(e, n) {
		return n > e ? t("validation.min", { min: n }) : !0;
	}
	function l(e, n) {
		return e > n ? t("validation.max", { max: n }) : !0;
	}
	function u(e, n) {
		return new RegExp(n).test(e) ? !0 : t("validation.pattern", { pattern: n.toString() });
	}
	function d(e, n) {
		return e == null ? !0 : (typeof e == "object" ? n.some((t) => Cu(e, t)) : n.some((t) => t != null && String(t) === String(e))) ? t("validation.unique") : !0;
	}
	function f(e, r) {
		return e == null || e === "" || n(e, r).isValid() ? !0 : t("validation.invalidDate", { format: r || "YYYY-MM-DD" });
	}
	function p(e, r, i) {
		if (e == null || e === "") return !0;
		let a = n(e, i), o = n(r, i);
		return !a.isValid() || !o.isValid() || a.isAfter(o, "day") ? !0 : t("validation.afterDate", { compareTo: o.format(i || "YYYY-MM-DD") });
	}
	function m(e, r, i) {
		if (e == null || e === "") return !0;
		let a = n(e, i), o = n(r, i);
		return !a.isValid() || !o.isValid() || a.isBefore(o, "day") ? !0 : t("validation.beforeDate", { compareTo: o.format(i || "YYYY-MM-DD") });
	}
	function h(e, r, i) {
		if (e == null || e === "") return !0;
		let a = n(e, i), o = n(r, i);
		return !a.isValid() || !o.isValid() || !a.isBefore(o, "day") || t("validation.fromDate", { compareTo: o.format(i || "YYYY-MM-DD") });
	}
	function g(e, r, i) {
		if (e == null || e === "") return !0;
		let a = n(e, i), o = n(r, i);
		return !a.isValid() || !o.isValid() || !a.isAfter(o, "day") || t("validation.upToDate", { compareTo: o.format(i || "YYYY-MM-DD") });
	}
	return {
		validateFromApi: r,
		required: i,
		email: a,
		minLength: o,
		maxLength: s,
		min: c,
		max: l,
		pattern: u,
		unique: d,
		validDate: f,
		afterDate: p,
		beforeDate: m,
		fromDate: h,
		upToDate: g
	};
}
//#endregion
//#region src/types/linidFilter.ts
var Vu = "|", Hu = "not_", Uu = [
	"lk_",
	"gt_",
	"lt_"
], Wu = class e {
	isNegation;
	operator;
	value;
	constructor(e, t, n) {
		this.isNegation = e, this.operator = t, this.value = n;
	}
	static fromString(t) {
		if (typeof t != "string" || t === "") return new e(!1, "", "");
		let n = t, r = !1;
		n.startsWith("not_") && (r = !0, n = n.slice(Hu.length));
		let i = Uu.find((e) => n.startsWith(e)) ?? "";
		return new e(r, i, n.slice(i.length));
	}
	toString() {
		return `${this.isNegation ? Hu : ""}${this.operator}${this.value}`;
	}
}, Gu = class e {
	id;
	name;
	type;
	options;
	values;
	constructor(e, t, n, r) {
		this.id = crypto.randomUUID(), this.name = e, this.type = t, this.options = n, this.values = r;
	}
	static fromString(t, n) {
		let r = typeof n != "string" || n === "" ? [] : n.split("|").map((e) => Wu.fromString(e));
		return new e(t, "text", {}, r);
	}
	toString() {
		return this.values.map((e) => e.toString()).join("|");
	}
};
//#endregion
//#region src/composables/useLinidFilterUrl.ts
function Ku(e, t) {
	function n(n, r) {
		let i = Object.fromEntries(Object.entries(t.query).filter(([e]) => r.includes(e)));
		e.replace({ query: n.reduce((e, t) => {
			let n = t.name, r = t.toString();
			if (r === "") return e;
			e[n] || (e[n] = []);
			let i = e[n];
			return Array.isArray(i) ? i.push(r) : e[n] = [i, r], e;
		}, i) });
	}
	function r(e) {
		let n = [];
		return Object.keys(t.query).map((t) => e.find(({ name: e }) => t === e)).filter((e) => !!e).forEach((e) => {
			let r = t.query[e.name];
			(Array.isArray(r) ? r : [r]).filter((e) => e !== null).forEach((t) => {
				n.push(Gu.fromString(e.name, t));
			});
		}), n;
	}
	return {
		setFiltersInUrl: n,
		getFiltersFromUrl: r
	};
}
//#endregion
//#region src/composables/useNotify.ts
function qu() {
	function e(e) {
		_o.next({
			key: "notify",
			data: e
		});
	}
	return { Notify: e };
}
//#endregion
//#region src/services/nunjucksService.ts
var Ju = null;
function Yu(e) {
	if (Ju !== null) {
		console.warn("[LinID CoreLib] Nunjucks environment has already been initialized. Re-initialization is ignored.");
		return;
	}
	Ju = e;
}
function Xu() {
	if (Ju === null) throw Error("[LinID CoreLib] Nunjucks environment is not initialized. Call setNunjucksEnv() first.");
	return Ju;
}
//#endregion
//#region src/composables/useNunjucks.ts
var Zu = /^\s*\{\{\s*([^{}]+?)\s*\}\}\s*$/, Qu = /^[A-Za-z_$][\w$]*$/, $u = /* @__PURE__ */ new Set([
	"__proto__",
	"constructor",
	"prototype"
]);
function ed(e) {
	return typeof e != "object" || !e ? !1 : Object.getPrototypeOf(A(e)) === Object.prototype;
}
function td(e) {
	let t = Zu.exec(e)?.[1];
	if (t === void 0) return null;
	let n = t.split(".");
	return n.every((e) => Qu.test(e) && !$u.has(e)) ? n : null;
}
function nd(e, t) {
	let n = td(e);
	if (n === null) return null;
	let r = t;
	for (let e of n) {
		if (!ed(r) || !Object.hasOwn(r, e)) return null;
		r = r[e];
	}
	return ed(r) ? structuredClone(A(r)) : null;
}
function rd() {
	let e = Xu();
	function t(n, r) {
		if (typeof n == "string") {
			let t = nd(n, r);
			return t === null ? e.renderString(n, r) : t;
		}
		return Array.isArray(n) ? n.map((e) => t(e, r)) : ed(n) ? Object.fromEntries(Object.entries(n).map(([e, n]) => [e, t(n, r)])) : n;
	}
	function n(t, n) {
		return e.renderString(t, n);
	}
	return {
		render: t,
		renderString: n
	};
}
//#endregion
//#region src/composables/usePagination.ts
function id() {
	function e(e) {
		return {
			page: (e.page || 1) - 1,
			size: e.rowsPerPage || 5,
			sort: e.sortBy || "updateDate",
			direction: e.descending ? "desc" : "asc"
		};
	}
	function t(e) {
		return {
			page: e.number + 1,
			rowsPerPage: e.size,
			rowsNumber: e.totalElements
		};
	}
	return {
		toPagination: e,
		toQuasarPagination: t
	};
}
//#endregion
//#region src/constants/quasarDate.ts
var ad = "YYYY/MM/DD";
//#endregion
//#region src/composables/useQuasarFieldValidation.ts
function od(e) {
	let { validateFromApi: t, required: n, email: r, minLength: i, maxLength: a, min: o, max: s, pattern: c, unique: l, validDate: u, afterDate: d, beforeDate: f, fromDate: p, upToDate: m } = Bu(e);
	return {
		validateFromApi: (e, n) => (r) => t(e, n, r),
		required: n,
		email: r,
		min: (e) => (t) => o(typeof t == "string" ? parseFloat(t) : t, e),
		max: (e) => (t) => s(typeof t == "string" ? parseFloat(t) : t, e),
		minLength: (e) => (t) => i(t, e),
		maxLength: (e) => (t) => a(t, e),
		pattern: (e) => (t) => c(t, e),
		unique: (e) => (t) => l(t, e),
		validDate: (e) => (t) => u(t, e || "YYYY/MM/DD"),
		afterDate: (e, t) => (n) => d(n, e, t || "YYYY/MM/DD"),
		beforeDate: (e, t) => (n) => f(n, e, t || "YYYY/MM/DD"),
		fromDate: (e, t) => (n) => p(n, e, t || "YYYY/MM/DD"),
		upToDate: (e, t) => (n) => m(n, e, t || "YYYY/MM/DD")
	};
}
//#endregion
//#region src/composables/useQuasarRules.ts
function sd(e, t, n, r) {
	let { required: i, email: a, validateFromApi: o, ...s } = od(r), c = t.required ? [i] : [];
	return n.forEach((e) => {
		if (e === "email") c.push(a);
		else if (s[e] && t.inputSettings?.[e] != null) {
			let n = t.inputSettings[e];
			c.push(s[e](n));
		}
	}), t.hasValidations && c.push(o(e, t.name)), c;
}
//#endregion
//#region src/composables/useTree.ts
function cd() {
	function e(t) {
		return t.map((t) => ({
			type: t.type,
			key: t.key,
			value: t.value,
			children: e(t.nodes)
		}));
	}
	return { toQTreeNodes: e };
}
//#endregion
//#region src/services/uiDesignService.ts
var ld = null;
function ud(e) {
	if (ld !== null) {
		console.warn("[LinID CoreLib] UI Design has already been initialized. Re-initialization is ignored.");
		return;
	}
	ld = e;
}
function dd() {
	if (ld === null) throw Error("[LinID CoreLib] UI Design is not initialized. Call setUiDesign() first.");
	return ld;
}
//#endregion
//#region src/types/uiDesign.ts
var fd = [
	"icon",
	"iconRight",
	"noCaps",
	"noWrap",
	"align",
	"stack",
	"stretch",
	"size",
	"outline",
	"flat",
	"unelevated",
	"rounded",
	"push",
	"square",
	"glossy",
	"fab",
	"fabMini",
	"padding",
	"color",
	"textColor",
	"dense",
	"ripple",
	"round"
], pd = [
	"vertical",
	"outsideArrows",
	"mobileArrows",
	"align",
	"breakpoint",
	"leftIcon",
	"rightIcon",
	"stretch",
	"shrink",
	"switchIndicator",
	"narrowIndicator",
	"inlineLabel",
	"noCaps",
	"activeColor",
	"activeBgColor",
	"indicatorColor",
	"contentClass",
	"activeClass",
	"dense"
], md = [
	"icon",
	"activeClass",
	"exactActiveClass",
	"noCaps",
	"alert",
	"contentClass",
	"ripple"
], hd = [
	"reveal",
	"revealOffset",
	"elevated",
	"bordered"
], gd = ["inset"], _d = ["shrink"], vd = [
	"icon",
	"size",
	"fontSize",
	"color",
	"textColor",
	"square",
	"rounded"
], yd = [
	"floating",
	"multiLine",
	"align",
	"color",
	"textColor",
	"transparent",
	"outline",
	"rounded"
], bd = /* @__PURE__ */ "virtualScrollItemSize.virtualScrollStickySizeStart.virtualScrollStickySizeEnd.color.iconFirstPage.iconPrevPage.iconNextPage.iconLastPage.grid.gridHeader.dense.hideHeader.hideBottom.hideSelectedBanner.hideNoData.hidePagination.flat.bordered.square.separator.wrapCells.tableStyle.tableClass.tableHeaderStyle.tableHeaderClass.cardContainerStyle.cardContainerClass.cardStyle.cardClass.titleClass".split("."), xd = [
	"dark",
	"square",
	"flat",
	"bordered"
], Sd = ["align", "vertical"], Cd = [
	"left",
	"right",
	"name",
	"size",
	"color"
], wd = [
	"removeAriaLabel",
	"icon",
	"iconRight",
	"iconRemove",
	"iconSelected",
	"dense",
	"size",
	"dark",
	"color",
	"textColor",
	"square",
	"outline",
	"ripple"
], Td = [
	"toggleOrder",
	"toggleIndeterminate",
	"keepColor",
	"icon",
	"checkedIcon",
	"uncheckedIcon",
	"indeterminateIcon",
	"leftLabel",
	"size",
	"color",
	"dark",
	"dense",
	"iconColor"
], Ed = [
	"toggleOrder",
	"toggleIndeterminate",
	"keepColor",
	"checkedIcon",
	"uncheckedIcon",
	"indeterminateIcon",
	"size",
	"color",
	"dark",
	"dense"
], Dd = [
	"autofocus",
	"stackLabel",
	"hideHint",
	"clearable",
	"clearIcon",
	"counter",
	"autogrow",
	"fillMask",
	"reverseFillMask",
	"unmaskedValue",
	"debounce",
	"labelColor",
	"color",
	"bgColor",
	"dark",
	"filled",
	"outlined",
	"borderless",
	"standout",
	"hideBottomSpace",
	"rounded",
	"square",
	"dense",
	"itemAligned",
	"noErrorIcon"
], Od = [
	"landscape",
	"yearsInMonthView",
	"todayBtn",
	"minimal",
	"defaultView",
	"color",
	"textColor",
	"dark",
	"square",
	"flat",
	"bordered"
], kd = [
	"loading",
	"loadingShowDelay",
	"noSpinner",
	"noNativeMenu",
	"noTransition",
	"draggable",
	"src",
	"srcset",
	"sizes",
	"placeholderSrc",
	"errorSrc",
	"ratio",
	"initialRatio",
	"width",
	"height",
	"fit",
	"position",
	"imgClass",
	"imgStyle",
	"spinnerColor",
	"spinnerSize"
], Ad = [
	"clearable",
	"autofocus",
	"stackLabel",
	"hideHint",
	"clearIcon",
	"counter",
	"labelColor",
	"color",
	"bgColor",
	"dark",
	"filled",
	"outlined",
	"borderless",
	"standout",
	"hideBottomSpace",
	"rounded",
	"square",
	"dense",
	"itemAligned",
	"noErrorIcon"
], jd = [
	"autofocus",
	"stackLabel",
	"hideHint",
	"clearable",
	"clearIcon",
	"useChips",
	"labelColor",
	"color",
	"bgColor",
	"dark",
	"filled",
	"outlined",
	"borderless",
	"standout",
	"hideBottomSpace",
	"rounded",
	"square",
	"dense",
	"itemAligned",
	"inputClass",
	"inputStyle",
	"noErrorIcon"
], Md = /* @__PURE__ */ "virtualScrollHorizontal.clearable.autofocus.hideDropdownIcon.popupNoRouteDismiss.fillInput.transitionShow.transitionHide.transitionDuration.behavior.stackLabel.hideHint.clearIcon.counter.dropdownIcon.useInput.inputDebounce.optionsDense.optionsDark.optionsSelectedClass.optionsCover.menuShrink.disableTabSelection.menuAnchor.menuSelf.menuOffset.displayValueHtml.hideSelected.useChips.labelColor.color.bgColor.dark.filled.outlined.borderless.standout.hideBottomSpace.rounded.square.dense.itemAligned.popupContentClass.popupContentStyle.inputClass.inputStyle.noErrorIcon.virtualScrollSliceSize.virtualScrollSliceRatioBefore.virtualScrollSliceRatioAfter.virtualScrollItemSize.virtualScrollStickySizeStart.virtualScrollStickySizeEnd".split("."), Nd = [
	"persistent",
	"noEscDismiss",
	"noBackdropDismiss",
	"noRouteDismiss",
	"autoClose",
	"noRefocus",
	"noFocus",
	"noShake",
	"allowFocusOutside",
	"seamless",
	"maximized",
	"fullWidth",
	"fullHeight",
	"position",
	"backdropFilter",
	"square",
	"transitionShow",
	"transitionHide",
	"transitionDuration"
], Pd = [
	"size",
	"color",
	"thickness"
], Fd = /* @__PURE__ */ "split.disableMainBtn.disableDropdown.persistent.noEscDismiss.noRouteDismiss.autoClose.noRefocus.noFocus.icon.iconRight.noCaps.noWrap.align.stack.stretch.dropdownIcon.cover.menuAnchor.menuSelf.menuOffset.size.outline.flat.unelevated.rounded.push.square.glossy.fab.fabMini.padding.color.textColor.dense.ripple.noIconAnimation.contentStyle.contentClass.transitionShow.transitionHide.transitionDuration".split("."), Id = ["view", "container"], Ld = [
	"separator",
	"padding",
	"tag",
	"bordered",
	"dense",
	"dark"
], Rd = [
	"insetLevel",
	"tag",
	"activeClass",
	"exactActiveClass",
	"clickable",
	"manualFocus",
	"focused",
	"dark",
	"dense"
], zd = [
	"avatar",
	"thumbnail",
	"side",
	"top",
	"noWrap"
], Bd = [
	"autofocus",
	"noErrorFocus",
	"noResetFocus",
	"greedy"
], Vd = [
	"lines",
	"overline",
	"caption",
	"header"
], Hd = [
	"inlineActions",
	"dense",
	"rounded",
	"dark"
], Ud = [
	"contextMenu",
	"touchPosition",
	"persistent",
	"noEscDismiss",
	"noRouteDismiss",
	"autoClose",
	"separateClosePopup",
	"noRefocus",
	"noFocus",
	"fit",
	"cover",
	"anchor",
	"self",
	"offset",
	"dark",
	"square",
	"maxHeight",
	"maxWidth",
	"transitionShow",
	"transitionHide",
	"transitionDuration"
], Wd = [
	"tickStrategy",
	"noSelectionUnset",
	"defaultExpandAll",
	"accordion",
	"noTransition",
	"noConnectors",
	"color",
	"controlColor",
	"textColor",
	"selectedColor",
	"dense",
	"dark",
	"duration"
], Gd = [
	"horizontal",
	"limits",
	"modelValue",
	"reverse",
	"unit",
	"disable",
	"beforeClass",
	"afterClass",
	"separatorClass",
	"separatorStyle",
	"dark"
], Kd = [
	"spaced",
	"inset",
	"vertical",
	"dark",
	"size",
	"color"
], qd = [
	"keepColor",
	"type",
	"leftLabel",
	"inline",
	"size",
	"color",
	"dark",
	"dense"
], Jd = [
	"visible",
	"delay",
	"dark",
	"verticalOffset",
	"horizontalOffset",
	"barStyle",
	"verticalBarStyle",
	"horizontalBarStyle",
	"thumbStyle",
	"verticalThumbStyle",
	"horizontalThumbStyle",
	"contentStyle",
	"contentActiveStyle"
], Yd = /* @__PURE__ */ "tag.sort.delay.delayOnTouchOnly.touchStartThreshold.disabled.animation.easing.handle.filter.draggable.ghostClass.chosenClass.dragClass.swapThreshold.invertSwap.invertedSwapThreshold.direction.forceFallback.fallbackClass.fallbackOnBody.fallbackTolerance.emptyInsertThreshold.scroll.scrollSensitivity.scrollSpeed".split("."), Xd = {
	"q-avatar": vd,
	"q-badge": yd,
	"q-banner": Hd,
	"q-btn": fd,
	"q-btn-dropdown": Fd,
	"q-card": xd,
	"q-card-actions": Sd,
	"q-checkbox": Ed,
	"q-date": Od,
	"q-dialog": Nd,
	"q-field": Ad,
	"q-file": jd,
	"q-form": Bd,
	"q-header": hd,
	"q-icon": Cd,
	"q-chip": wd,
	"q-img": kd,
	"q-input": Dd,
	"q-item": Rd,
	"q-item-label": Vd,
	"q-item-section": zd,
	"q-layout": Id,
	"q-list": Ld,
	"q-menu": Ud,
	"q-option-group": qd,
	"q-route-tab": md,
	"q-scroll-area": Jd,
	"q-select": Md,
	"q-separator": Kd,
	"q-spinner": Pd,
	"q-splitter": Gd,
	"q-table": bd,
	"q-tabs": pd,
	"q-toggle": Td,
	"q-toolbar": gd,
	"q-toolbar-title": _d,
	"q-tree": Wd
}, Zd = { draggable: Yd }, Qd = {
	...Xd,
	...Zd
};
function $d(e, t) {
	return t.split(".").reduce((e, t) => {
		if (e && typeof e == "object") return e[t];
	}, e);
}
function ef(e, t, n) {
	let r = $d(e, `${t}.${n}`);
	if (r === void 0 && (r = $d(e, `default.${n}`)), typeof r == "object") throw Error(`[UiDesign] Value for '${t}.${n}' is a nested object or null, expected a primitive.`);
	return r;
}
function tf(e) {
	if (!(e in Qd)) throw Error(`[UiDesign] The component '${e}' is not supported for UI design retrieval.`);
	return Qd[e];
}
function nf() {
	let e = r(() => dd());
	function t(t, n, r) {
		let i = tf(n), a = {};
		for (let o of i) {
			let i = r?.[o] ?? ef(e.value, t, `${n}.${String(o)}`);
			i !== void 0 && (a[o] = i);
		}
		return a;
	}
	return { ui: t };
}
//#endregion
//#region src/composables/useValueFormatter.ts
function rf(e) {
	return { toDate: (t, n) => !n?.formatKey || typeof n.formatKey != "string" ? t : e.toDate(t, n.formatKey) };
}
function af() {
	let e = rf(ya());
	function t(t, n, r) {
		return t == null || !n || !Object.hasOwn(e, n) ? t : e[n](t, r);
	}
	return { formatValue: t };
}
//#endregion
//#region src/services/linidConfigurationService.ts
async function of() {
	return (await ou().get("/metadata/entities")).data;
}
async function sf(e) {
	return (await ou().get(`/metadata/entities/${e}`)).data;
}
async function cf() {
	return (await ou().get("/metadata/routes")).data;
}
//#endregion
//#region src/stores/linidConfigurationStore.ts
var lf = () => uf(Ze()), uf = Je("LinidConfigurationStore", {
	state: () => ({
		entities: [],
		apiEndpoints: [],
		loading: !1,
		error: null
	}),
	getters: {
		getEntityByName: (e) => (t) => e.entities.find((e) => e.name === t),
		getApiEndpointsByEntity: (e) => (t) => e.apiEndpoints.filter((e) => e.entity === t)
	},
	actions: { async fetchConfiguration() {
		this.loading = !0, this.error = null;
		try {
			let [e, t] = await Promise.all([of(), cf()]);
			this.entities = e, this.apiEndpoints = t;
		} catch (e) {
			this.error = e instanceof Error ? e.message : "Failed to fetch configuration", console.error("[Linid CoreLib] Failed to fetch configuration:", e);
		} finally {
			this.loading = !1;
		}
	} }
}), df = () => ff(Ze()), ff = Je("LinidUserStore", {
	state: () => ({
		user: {
			username: "",
			email: "",
			fullName: "",
			roles: []
		},
		isAuthenticated: !1
	}),
	actions: { setUserFromClaims(e) {
		let t = e.roles;
		this.user = {
			username: e.sub,
			email: typeof e.email == "string" ? e.email : "",
			fullName: typeof e.name == "string" ? e.name : "",
			roles: Array.isArray(t) ? t.filter((e) => typeof e == "string") : []
		}, this.isAuthenticated = !0;
	} }
}), pf = "&", mf = "=", hf = class e {
	id;
	label;
	filters;
	constructor(e, t, n) {
		this.id = e, this.label = t, this.filters = n;
	}
	static fromString(t, n, r) {
		let i = typeof r != "string" || r === "" ? [] : r.split(pf).filter((e) => e.includes(mf)).map((e) => {
			let t = e.indexOf(mf), n = e.slice(0, t), r = e.slice(t + 1);
			return Gu.fromString(n, r);
		});
		return new e(t, n, i);
	}
	toString() {
		return this.filters.map((e) => `${e.name}${mf}${e.toString()}`).join(pf);
	}
}, gf = /* @__PURE__ */ function(e) {
	return e.SETUP = "setup", e.CONFIGURE = "configure", e.INITIALIZE = "initialize", e.READY = "ready", e.POST_INIT = "postInit", e;
}({}), _f = class {
	id;
	name;
	version;
	description;
	constructor(e, t, n, r) {
		this.id = e, this.name = t, this.version = n, this.description = r;
	}
	async setup() {
		return { success: !0 };
	}
	async configure(e) {
		return { success: !0 };
	}
	async initialize(e) {
		return { success: !0 };
	}
	async ready(e) {
		return { success: !0 };
	}
	async postInit(e) {
		return { success: !0 };
	}
}, vf = class extends _f {
	dialogComponents;
	dialogComponentZone;
	constructor(e) {
		super(e.id, e.name, e.version, e.description), this.dialogComponents = e.dialogComponents ?? [], this.dialogComponentZone = e.dialogZone;
	}
	async postInit(e) {
		let t = Eu().global.t;
		e.options?.addNavigationMenu && Du().addMainNavigationMenuItems({
			id: e.instanceId,
			label: t(`${e.instanceId}.NavigationMenu.label`),
			path: e.basePath
		});
		let n = Qe();
		return this.dialogComponents.forEach((e) => {
			n.registerPluginOnce(this.dialogComponentZone, e);
		}), { success: !0 };
	}
};
function yf(e) {
	return Object.assign(new vf(e), e.hooks);
}
//#endregion
//#region src/lifecycle/linidModuleFederation.ts
async function bf(e, t) {
	return (await Promise.all(e.map(async (e) => {
		try {
			let n = await fetch(e);
			if (!n.ok) return null;
			let r = await n.json();
			return t(r) ? (console.debug(`[LinID CoreLib] Loaded file: ${n.url}`), r) : (console.error(`[LinID CoreLib] Invalid content in file: ${e}`), null);
		} catch {
			return console.error(`[LinID CoreLib] File not found: ${e}`), null;
		}
	}))).filter((e) => e !== null);
}
function xf(e) {
	if (typeof e != "object" || !e) return !1;
	let { zone: t, plugin: n, component: r } = e, i = [n, r];
	return typeof t == "string" && i.every((e) => e === void 0 || typeof e == "string") && i.filter((e) => e !== void 0).length === 1;
}
function Sf(e) {
	if (typeof e != "object" || !e) return !1;
	let t = e;
	return [
		"instanceId",
		"remoteName",
		"lifecycleRemote",
		"routesRemote",
		"i18nRemote",
		"basePath"
	].every((e) => typeof t[e] == "string") && (t.zones === void 0 || Array.isArray(t.zones) && t.zones.every(xf));
}
function Cf(e) {
	return bf(e, Sf);
}
async function wf(e) {
	return (await bf(e, (e) => Array.isArray(e) && e.every(xf))).flat();
}
function Tf(e) {
	let t = Qe();
	e.forEach((e) => {
		"component" in e && e.component ? t.registerComponent(e.zone, e.component, e.props) : "plugin" in e && e.plugin && t.registerPlugin(e.zone, e.plugin, e.props);
	});
}
async function Ef(e) {
	let t = await de().loadRemote(e.routesRemote);
	return !t?.default || t.default.length === 0 ? null : t.default;
}
async function Df(e) {
	let t = await de().loadRemote(e.i18nRemote);
	return t?.default ? t.default : {};
}
function Of(e, t) {
	return {
		name: e.name,
		path: Xu().renderString(e.path, { config: t }),
		component: async () => (await de().loadRemote(Xu().renderString(e.component, { config: t }))).default,
		children: e.children?.map((e) => Of(e, t)) || [],
		meta: e.meta ? kf(e.meta, t) : void 0
	};
}
function kf(e, t) {
	if (typeof e == "string") return Xu().renderString(e, { config: t });
	if (Array.isArray(e)) return e.map((e) => kf(e, t));
	if (typeof e == "object" && e) {
		let n = {};
		for (let r in e) n[r] = kf(e[r], t);
		return n;
	}
	return e;
}
async function Af(e, t, n) {
	return cu(t), e.setup();
}
async function jf(e, t, n) {
	let r = await Ef(t);
	r && r.map((e) => Of(e, t)).forEach((e) => {
		e.name && n.hasRoute(e.name) && n.removeRoute(e.name), n.addRoute(e);
	});
	let i = xu(await Df(t), (e) => Xu().renderString(e, { config: t }));
	if (i) {
		let e = Eu(), t = i, n = e.global.messages.value;
		Object.keys(n).forEach((r) => {
			let i = gu(t[r], n[r]);
			e.global.setLocaleMessage(r, i);
		});
	}
	return e.configure(t);
}
async function Mf(e, t, n) {
	return e.initialize(t);
}
async function Nf(e, t, n) {
	return e.ready(t);
}
async function Pf(e, t, n) {
	return Tf(t.zones ?? []), e.postInit(t);
}
var Ff = {
	[gf.SETUP]: Af,
	[gf.CONFIGURE]: jf,
	[gf.INITIALIZE]: Mf,
	[gf.READY]: Nf,
	[gf.POST_INIT]: Pf
};
async function If(e) {
	let { router: t, remotes: n, modules: r, extraZones: i, localComponents: a } = e, o = { ...Ff };
	Object.entries(e.hooks ?? {}).forEach(([e, t]) => {
		let n = Ff[e];
		o[e] = async (e, r, i) => (await n(e, r, i), t(e, r, i));
	}), ee(n), ue(F()), a && he(a);
	let [s, c] = await Promise.all([Cf(r), wf(i ?? [])]), l = /* @__PURE__ */ new Map();
	for (let e of s) {
		let t = await de().loadRemote(e.lifecycleRemote);
		l.set(e.instanceId, t?.default);
	}
	let u = [
		gf.SETUP,
		gf.CONFIGURE,
		gf.INITIALIZE,
		gf.READY,
		gf.POST_INIT
	];
	for (let e of u) for (let n of s) await o[e](l.get(n.instanceId), n, t);
	Tf(c);
}
var Lf = { init: If };
//#endregion
export { _f as BasicRemoteModule, Ca as DEFAULT_DATE_FORMAT, Hu as LINID_FILTER_NEGATION_PREFIX, Vu as LINID_FILTER_OR_SEPARATOR, Gu as LinidFilter, hf as LinidFilterSet, Wu as LinidFilterValue, et as LinidZoneRenderer, gf as ModuleLifecyclePhase, ad as QDATE_DEFAULT_MASK, Lu as changeLocale, yf as createModulePageLifecycle, Su as deepEqual, Cu as deepEqualUnordered, mu as deleteEntityById, _u as fromDot, cf as getApiEndpointsConfiguration, Sa as getDayjsInstance, fu as getEntities, of as getEntitiesConfiguration, pu as getEntityById, sf as getEntityConfiguration, ou as getHttpClient, Eu as getI18nInstance, de as getModuleFederation, lu as getModuleHostConfiguration, vu as getNestedValue, Xu as getNunjucksEnv, Ze as getPiniaStore, dd as getUiDesign, bu as isObject, Lf as linidModuleFederation, fe as loadAsyncComponent, gu as merge, me as registerLocalComponent, he as registerLocalComponents, cu as registerModuleHostConfiguration, xu as renameKeys, ge as resolveLocalComponent, Fu as resolveLocale, uu as saveEntity, xa as setDayjsInstance, au as setHttpClient, Tu as setI18nInstance, ue as setModuleFederation, yu as setNestedValue, Yu as setNunjucksEnv, Xe as setPiniaStore, ud as setUiDesign, Iu as syncLocale, _o as uiEventSubject, du as updateEntity, ya as useCommonMapper, wa as useDayjs, vo as useDialog, Bu as useFieldValidation, lf as useLinidConfigurationStore, Ku as useLinidFilterUrl, Du as useLinidUiStore, ju as useLinidUserPreference, ku as useLinidUserPreferenceStore, df as useLinidUserStore, Qe as useLinidZoneStore, qu as useNotify, rd as useNunjucks, id as usePagination, od as useQuasarFieldValidation, sd as useQuasarRules, Mu as useScopedI18n, cd as useTree, nf as useUiDesign, af as useValueFormatter };
