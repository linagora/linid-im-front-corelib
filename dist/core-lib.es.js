import * as e from "vue";
import { Fragment as t, KeepAlive as n, Teleport as r, Text as i, Transition as a, computed as o, createApp as s, createBlock as c, createCommentVNode as l, createElementBlock as u, createVNode as d, defineAsyncComponent as f, defineComponent as p, effectScope as m, getCurrentInstance as h, getCurrentScope as g, h as _, hasInjectionContext as v, inject as y, isReactive as b, isRef as x, markRaw as S, mergeProps as C, nextTick as w, onActivated as T, onBeforeMount as E, onBeforeUnmount as D, onBeforeUpdate as O, onDeactivated as k, onMounted as A, onScopeDispose as j, onUnmounted as M, onUpdated as N, openBlock as P, provide as F, reactive as I, ref as L, renderList as R, renderSlot as z, resolveDynamicComponent as B, shallowReactive as V, shallowRef as ee, toRaw as te, toRef as H, toRefs as U, unref as W, vShow as ne, watch as G, withDirectives as re } from "vue";
//#region \0rolldown/runtime.js
var ie = Object.create, K = Object.defineProperty, ae = Object.getOwnPropertyDescriptor, oe = Object.getOwnPropertyNames, se = Object.getPrototypeOf, ce = Object.prototype.hasOwnProperty, le = (e, t) => () => (t || (e((t = { exports: {} }).exports, t), e = null), t.exports), ue = (e, t) => {
	let n = {};
	for (var r in e) K(n, r, {
		get: e[r],
		enumerable: !0
	});
	return t || K(n, Symbol.toStringTag, { value: "Module" }), n;
}, de = (e, t, n, r) => {
	if (t && typeof t == "object" || typeof t == "function") for (var i = oe(t), a = 0, o = i.length, s; a < o; a++) s = i[a], !ce.call(e, s) && s !== n && K(e, s, {
		get: ((e) => t[e]).bind(null, s),
		enumerable: !(r = ae(t, s)) || r.enumerable
	});
	return e;
}, fe = (e, t, n) => (n = e == null ? {} : ie(se(e)), de(t || !e || !e.__esModule ? K(n, "default", {
	value: e,
	enumerable: !0
}) : n, e)), pe = null;
function me(e) {
	if (pe !== null) {
		console.warn("[LinID CoreLib] Module Federation has already been initialized. Re-initialization is ignored.");
		return;
	}
	pe = e;
}
function he() {
	if (pe === null) throw Error("[LinID CoreLib] Module Federation is not initialized. Call setModuleFederation() first.");
	return pe;
}
var ge = (e) => f(() => he().loadRemote(e).then((t) => {
	if (!t?.default) throw Error(`Failed to load component from ${e}`);
	return t.default;
})), _e = typeof window < "u", ve, ye = (e) => ve = e;
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
function we(e, { autoBom: t = !1 } = {}) {
	return t && /^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(e.type) ? new Blob(["﻿", e], { type: e.type }) : e;
}
function Te(e, t, n) {
	let r = new XMLHttpRequest();
	r.open("GET", e), r.responseType = "blob", r.onload = function() {
		Ae(r.response, t, n);
	}, r.onerror = function() {
		console.error("could not download file");
	}, r.send();
}
function Ee(e) {
	let t = new XMLHttpRequest();
	t.open("HEAD", e, !1);
	try {
		t.send();
	} catch {}
	return t.status >= 200 && t.status <= 299;
}
function De(e) {
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
var Oe = typeof navigator == "object" ? navigator : { userAgent: "" }, ke = /Macintosh/.test(Oe.userAgent) && /AppleWebKit/.test(Oe.userAgent) && !/Safari/.test(Oe.userAgent), Ae = _e ? typeof HTMLAnchorElement < "u" && "download" in HTMLAnchorElement.prototype && !ke ? je : "msSaveOrOpenBlob" in Oe ? Me : Ne : () => {};
function je(e, t = "download", n) {
	let r = document.createElement("a");
	r.download = t, r.rel = "noopener", typeof e == "string" ? (r.href = e, r.origin === location.origin ? De(r) : Ee(r.href) ? Te(e, t, n) : (r.target = "_blank", De(r))) : (r.href = URL.createObjectURL(e), setTimeout(function() {
		URL.revokeObjectURL(r.href);
	}, 4e4), setTimeout(function() {
		De(r);
	}, 0));
}
function Me(e, t = "download", n) {
	if (typeof e == "string") if (Ee(e)) Te(e, t, n);
	else {
		let t = document.createElement("a");
		t.href = e, t.target = "_blank", setTimeout(function() {
			De(t);
		});
	}
	else navigator.msSaveOrOpenBlob(we(e, n), t);
}
function Ne(e, t, n, r) {
	if (r ||= open("", "_blank"), r && (r.document.title = r.document.body.innerText = "downloading..."), typeof e == "string") return Te(e, t, n);
	let i = e.type === "application/octet-stream", a = /constructor/i.test(String(Ce.HTMLElement)) || "safari" in Ce, o = /CriOS\/[\d]+/.test(navigator.userAgent);
	if ((o || i && a || ke) && typeof FileReader < "u") {
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
var { assign: Pe } = Object;
function Fe(e, t) {
	for (let n in t) {
		let r = t[n];
		if (!(n in e)) continue;
		let i = e[n];
		xe(i) && xe(r) && !x(r) && !b(r) ? e[n] = Fe(i, r) : e[n] = r;
	}
	return e;
}
var Ie = () => {};
function Le(e, t, n, r = Ie) {
	e.add(t);
	let i = () => {
		e.delete(t) && r();
	};
	return !n && g() && j(i), i;
}
function Re(e, ...t) {
	e.forEach((e) => {
		e(...t);
	});
}
var ze = (e) => e(), Be = Symbol(), Ve = Symbol();
function He(e, t) {
	e instanceof Map && t instanceof Map ? t.forEach((t, n) => e.set(n, t)) : e instanceof Set && t instanceof Set && t.forEach(e.add, e);
	for (let n in t) {
		if (!t.hasOwnProperty(n)) continue;
		let r = t[n], i = e[n];
		xe(i) && xe(r) && e.hasOwnProperty(n) && !x(r) && !b(r) ? e[n] = He(i, r) : e[n] = r;
	}
	return e;
}
var Ue = process.env.NODE_ENV === "production" ? Symbol() : Symbol("pinia:skipHydration");
function We(e) {
	return !xe(e) || !Object.prototype.hasOwnProperty.call(e, Ue);
}
var { assign: Ge } = Object;
function Ke(e) {
	return !!(x(e) && e.effect);
}
function qe(e, t, n, r) {
	let { state: i, actions: a, getters: s } = t, c = n.state.value[e], l;
	function u() {
		!c && (process.env.NODE_ENV === "production" || !r) && (n.state.value[e] = i ? i() : {});
		let t = process.env.NODE_ENV !== "production" && r ? U(L(i ? i() : {}).value) : U(n.state.value[e]);
		return Ge(t, a, Object.keys(s || {}).reduce((r, i) => (process.env.NODE_ENV !== "production" && i in t && console.warn(`[🍍]: A getter cannot have the same name as another state property. Rename one of them. Found with "${i}" in store "${e}".`), r[i] = S(o(() => {
			ye(n);
			let t = n._s.get(e);
			return s[i].call(t, t);
		})), r), {}));
	}
	return l = Je(e, u, t, n, r, !0), l;
}
function Je(e, t, n = {}, r, i, a) {
	let s, c = Ge({ actions: {} }, n);
	/* istanbul ignore if */
	if (process.env.NODE_ENV !== "production" && !r._e.active) throw Error("Pinia destroyed");
	let l = { deep: !0 };
	/* istanbul ignore else */
	process.env.NODE_ENV !== "production" && (l.onTrigger = (e) => {
		/* istanbul ignore else */
		u ? h = e : u == 0 && !k._hotUpdating && (Array.isArray(h) ? h.push(e) : console.error("🍍 debuggerEvents should be an array. This is most likely an internal Pinia bug."));
	});
	let u, d, f = /* @__PURE__ */ new Set(), p = /* @__PURE__ */ new Set(), h, g = r.state.value[e];
	!a && !g && (process.env.NODE_ENV === "production" || !i) && (r.state.value[e] = {});
	let _ = L({}), v;
	function y(t) {
		let n;
		u = d = !1, process.env.NODE_ENV !== "production" && (h = []), typeof t == "function" ? (t(r.state.value[e]), n = {
			type: Se.patchFunction,
			storeId: e,
			events: h
		}) : (He(r.state.value[e], t), n = {
			type: Se.patchObject,
			payload: t,
			storeId: e,
			events: h
		});
		let i = v = Symbol();
		w().then(() => {
			v === i && (u = !0);
		}), d = !0, Re(f, n, r.state.value[e]);
	}
	let C = a ? function() {
		let { state: e } = n, t = e ? e() : {};
		this.$patch((e) => {
			Ge(e, t);
		});
	} : process.env.NODE_ENV === "production" ? Ie : () => {
		throw Error(`🍍: Store "${e}" is built using the setup syntax and does not implement $reset().`);
	};
	function T() {
		s.stop(), f.clear(), p.clear(), r._s.delete(e);
	}
	let E = (t, n = "") => {
		if (Be in t) return t[Ve] = n, t;
		let i = function() {
			ye(r);
			let n = Array.from(arguments), a = /* @__PURE__ */ new Set(), o = /* @__PURE__ */ new Set();
			function s(e) {
				a.add(e);
			}
			function c(e) {
				o.add(e);
			}
			Re(p, {
				args: n,
				name: i[Ve],
				store: k,
				after: s,
				onError: c
			});
			let l;
			try {
				l = t.apply(this && this.$id === e ? this : k, n);
			} catch (e) {
				throw Re(o, e), e;
			}
			return l instanceof Promise ? l.then((e) => (Re(a, e), e)).catch((e) => (Re(o, e), Promise.reject(e))) : (Re(a, l), l);
		};
		return i[Be] = !0, i[Ve] = n, i;
	}, D = /*#__PURE__*/ S({
		actions: {},
		getters: {},
		state: [],
		hotState: _
	}), O = {
		_p: r,
		$id: e,
		$onAction: Le.bind(null, p),
		$patch: y,
		$reset: C,
		$subscribe(t, n = {}) {
			let i = Le(f, t, n.detached, () => a()), a = s.run(() => G(() => r.state.value[e], (r) => {
				(n.flush === "sync" ? d : u) && t({
					storeId: e,
					type: Se.direct,
					events: h
				}, r);
			}, Ge({}, l, n)));
			return i;
		},
		$dispose: T
	}, k = I(process.env.NODE_ENV !== "production" || process.env.NODE_ENV !== "production" && process.env.NODE_ENV !== "test" && _e ? Ge({
		_hmrPayload: D,
		_customProperties: S(/* @__PURE__ */ new Set())
	}, O) : O);
	r._s.set(e, k);
	let A = (r._a && r._a.runWithContext || ze)(() => r._e.run(() => (s = m()).run(() => t({ action: E }))));
	for (let t in A) {
		let o = A[t];
		x(o) && !Ke(o) || b(o) ? (process.env.NODE_ENV !== "production" && i ? _.value[t] = H(A, t) : a || (g && We(o) && (x(o) ? o.value = g[t] : He(o, g[t])), r.state.value[e][t] = o), process.env.NODE_ENV !== "production" && D.state.push(t)) : typeof o == "function" ? (A[t] = process.env.NODE_ENV !== "production" && i ? o : E(o, t), process.env.NODE_ENV !== "production" && (D.actions[t] = o), c.actions[t] = o) : process.env.NODE_ENV !== "production" && Ke(o) && (D.getters[t] = a ? n.getters[t] : o, _e && (A._getters ||= S([])).push(t));
	}
	if (Ge(k, A), Ge(te(k), A), Object.defineProperty(k, "$state", {
		get: () => process.env.NODE_ENV !== "production" && i ? _.value : r.state.value[e],
		set: (e) => {
			/* istanbul ignore if */
			if (process.env.NODE_ENV !== "production" && i) throw Error("cannot set hotState");
			y((t) => {
				Ge(t, e);
			});
		}
	}), process.env.NODE_ENV !== "production" && (k._hotUpdate = S((t) => {
		k._hotUpdating = !0, t._hmrPayload.state.forEach((e) => {
			if (e in k.$state) {
				let n = t.$state[e], r = k.$state[e];
				typeof n == "object" && xe(n) && xe(r) ? Fe(n, r) : t.$state[e] = r;
			}
			k[e] = H(t.$state, e);
		}), Object.keys(k.$state).forEach((e) => {
			e in t.$state || delete k[e];
		}), u = !1, d = !1, r.state.value[e] = H(t._hmrPayload, "hotState"), d = !0, w().then(() => {
			u = !0;
		});
		for (let e in t._hmrPayload.actions) {
			let n = t[e];
			k[e] = E(n, e);
		}
		for (let e in t._hmrPayload.getters) {
			let n = t._hmrPayload.getters[e], i = a ? o(() => (ye(r), n.call(k, k))) : n;
			k[e] = i;
		}
		Object.keys(k._hmrPayload.getters).forEach((e) => {
			e in t._hmrPayload.getters || delete k[e];
		}), Object.keys(k._hmrPayload.actions).forEach((e) => {
			e in t._hmrPayload.actions || delete k[e];
		}), k._hmrPayload = t._hmrPayload, k._getters = t._getters, k._hotUpdating = !1;
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
			Object.defineProperty(k, t, Ge({ value: k[t] }, e));
		});
	}
	return r._p.forEach((e) => {
		/* istanbul ignore else */
		if (process.env.NODE_ENV !== "production" && process.env.NODE_ENV !== "test" && _e) {
			let t = s.run(() => e({
				store: k,
				app: r._a,
				pinia: r,
				options: c
			}));
			Object.keys(t || {}).forEach((e) => k._customProperties.add(e)), Ge(k, t);
		} else Ge(k, s.run(() => e({
			store: k,
			app: r._a,
			pinia: r,
			options: c
		})));
	}), process.env.NODE_ENV !== "production" && k.$state && typeof k.$state == "object" && typeof k.$state.constructor == "function" && !k.$state.constructor.toString().includes("[native code]") && console.warn(`[🍍]: The "state" must be a plain object. It cannot be
	state: () => new MyClass()
Found in store "${k.$id}".`), g && a && n.hydrate && n.hydrate(k.$state, g), u = !0, d = !0, k;
}
function q(e, t, n) {
	let r, i = typeof t == "function";
	r = i ? n : t;
	function a(n, o) {
		let s = v();
		if (n = (process.env.NODE_ENV === "test" && ve && ve._testing ? null : n) || (s ? y(be, null) : null), n && ye(n), process.env.NODE_ENV !== "production" && !ve) throw Error("[🍍]: \"getActivePinia()\" was called but there was no active Pinia. Are you trying to use a store before calling \"app.use(pinia)\"?\nSee https://pinia.vuejs.org/core-concepts/outside-component-usage.html for help.\nThis will fail in production.");
		n = ve, n._s.has(e) || (i ? Je(e, t, r, n) : qe(e, r, n), process.env.NODE_ENV !== "production" && (a._pinia = n));
		let c = n._s.get(e);
		if (process.env.NODE_ENV !== "production" && o) {
			let a = "__hot:" + e, s = i ? Je(a, t, r, n, !0) : qe(a, Ge({}, r), n, !0);
			o._hotUpdate(s), delete n.state.value[a], n._s.delete(a);
		}
		if (process.env.NODE_ENV !== "production" && _e) {
			let t = h();
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
var Qe = () => $e(Ze()), $e = q("linidZoneStore", {
	state: () => ({ zones: {} }),
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
				component: S(t),
				props: n
			});
		}
	}
}), et = /* @__PURE__ */ p({
	inheritAttrs: !1,
	__name: "LinidZoneRenderer",
	props: { zone: {} },
	setup(e) {
		let n = e, r = (Qe().zones[n.zone] || []).map((e) => ({
			props: e.props,
			component: e.type === "federated" ? ge(e.plugin) : e.component
		}));
		return (e, n) => (P(), u(t, null, [(P(!0), u(t, null, R(W(r), (t, n) => (P(), c(B(t.component), C({ key: n }, { ref_for: !0 }, {
			...e.$attrs,
			...t.props
		}), null, 16))), 128)), W(r).length === 0 ? z(e.$slots, "default", { key: 0 }) : l("", !0)], 64));
	}
}), tt = null;
function nt(e) {
	if (tt !== null) {
		console.warn("[LinID CoreLib] Dayjs instance has already been initialized. Re-initialization is ignored.");
		return;
	}
	tt = e;
}
function rt() {
	if (tt === null) throw Error("[LinID CoreLib] Dayjs instance is not initialized. Call setDayjsInstance() first.");
	return tt;
}
//#endregion
//#region src/composables/useDayjs.ts
var it = "YYYY-MM-DD";
function at() {
	let e = rt();
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
//#region node_modules/.pnpm/dayjs@1.11.21/node_modules/dayjs/dayjs.min.js
var ot = /* @__PURE__ */ le(((e, t) => {
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
})), st = /* @__PURE__ */ le(((e, t) => {
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
})), ct = /* @__PURE__ */ le(((e, t) => {
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
})), lt = /* @__PURE__ */ fe(ot(), 1), ut = /* @__PURE__ */ fe(st(), 1), dt = /* @__PURE__ */ fe(ct(), 1);
function ft(e, t) {
	typeof console < "u" && (console.warn("[intlify] " + e), t && console.warn(t.stack));
}
var pt = {};
function mt(e) {
	pt[e] || (pt[e] = !0, ft(e));
}
var ht = typeof window < "u", gt, _t;
if (process.env.NODE_ENV !== "production") {
	let e = ht && window.performance;
	e && e.mark && e.measure && e.clearMarks && e.clearMeasures && (gt = (t) => {
		e.mark(t);
	}, _t = (t, n, r) => {
		e.measure(t, n, r), e.clearMarks(n), e.clearMarks(r);
	});
}
var vt = /\{([0-9a-zA-Z]+)\}/g;
function yt(e, ...t) {
	return t.length === 1 && Gt(t[0]) && (t = t[0]), (!t || !t.hasOwnProperty) && (t = {}), e.replace(vt, (e, n) => t.hasOwnProperty(n) ? t[n] : "");
}
var bt = (e, t = !1) => t ? Symbol.for(e) : Symbol(e), xt = (e, t, n) => St({
	l: e,
	k: t,
	s: n
}), St = (e) => JSON.stringify(e).replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029").replace(/\u0027/g, "\\u0027"), Ct = (e) => typeof e == "number" && isFinite(e), wt = (e) => Jt(e) === "[object Date]", Tt = (e) => Jt(e) === "[object RegExp]", Et = (e) => Yt(e) && Object.keys(e).length === 0, Dt = Object.assign, Ot = Object.create, kt = (e = null) => Ot(e), At, jt = () => At ||= typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : kt();
function Mt(e) {
	return e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;").replace(/\//g, "&#x2F;").replace(/=/g, "&#x3D;");
}
function Nt(e) {
	return e.replace(/&(?![a-zA-Z0-9#]{2,6};)/g, "&amp;").replace(/"/g, "&quot;").replace(/'/g, "&apos;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
var Pt = /^\s*javascript\s*(?::|&#0*58;?|&#x0*3a;?|&colon;?)/i, Ft = /^(?:href|src|action|formaction)$/i;
function It(e) {
	return Pt.test(e);
}
function Lt(e) {
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
		n += e.slice(r, a), n += It(d) ? "url(about:blank)" : e.slice(a, s + 1), r = s + 1;
	}
	return n + e.slice(r);
}
function Rt(e, t) {
	return Ft.test(e) && It(t) ? "about:blank" : Nt(e.toLowerCase() === "style" ? Lt(t) : t);
}
function zt(e) {
	return e = e.replace(/([\w:-]+)\s*=\s*"([^"]*)"/g, (e, t, n) => `${t}="${Rt(t, n)}"`), e = e.replace(/([\w:-]+)\s*=\s*'([^']*)'/g, (e, t, n) => `${t}='${Rt(t, n)}'`), /\s*on\w+\s*=\s*["']?[^"'>]+["']?/gi.test(e) && (process.env.NODE_ENV !== "production" && ft("Potentially dangerous event handlers detected in translation. Consider removing onclick, onerror, etc. from your translation messages."), e = e.replace(/(\s+)(on)(\w+\s*=)/gi, "$1&#111;n$3")), e = e.replace(/(\s+(?:href|src|action|formaction)\s*=\s*)([^\s"'=<>`]+)/gi, (e, t, n) => It(n) ? `${t}about:blank` : e), e;
}
var Bt = Object.prototype.hasOwnProperty;
function Vt(e, t) {
	return Bt.call(e, t);
}
var Ht = Array.isArray, Ut = (e) => typeof e == "function", J = (e) => typeof e == "string", Wt = (e) => typeof e == "boolean", Gt = (e) => typeof e == "object" && !!e, Kt = (e) => Gt(e) && Ut(e.then) && Ut(e.catch), qt = Object.prototype.toString, Jt = (e) => qt.call(e), Yt = (e) => Jt(e) === "[object Object]", Xt = (e) => e == null ? "" : Ht(e) || Yt(e) && e.toString === qt ? JSON.stringify(e, null, 2) : String(e);
function Zt(e, t = "") {
	return e.reduce((e, n, r) => r === 0 ? e + n : e + t + n, "");
}
var Qt = 2;
function $t(e, t = 0, n = e.length) {
	let r = e.split(/\r?\n/), i = 0, a = [];
	for (let e = 0; e < r.length; e++) if (i += r[e].length + 1, i >= t) {
		for (let o = e - Qt; o <= e + Qt || n > i; o++) {
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
function en() {
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
var tn = (e) => !Gt(e) || Ht(e);
function nn(e, t) {
	if (tn(e) || tn(t)) throw Error("Invalid value");
	let n = [{
		src: e,
		des: t
	}];
	for (; n.length;) {
		let { src: e, des: t } = n.pop();
		Object.keys(e).forEach((r) => {
			r !== "__proto__" && (Gt(e[r]) && !Gt(t[r]) && (t[r] = Array.isArray(e[r]) ? [] : kt()), tn(t[r]) || tn(e[r]) ? t[r] = e[r] : n.push({
				src: e[r],
				des: t[r]
			}));
		});
	}
}
//#endregion
//#region node_modules/.pnpm/@intlify+message-compiler@11.4.6/node_modules/@intlify/message-compiler/dist/message-compiler.mjs
function rn(e, t, n) {
	return {
		line: e,
		column: t,
		offset: n
	};
}
function an(e, t, n) {
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
}, on = {
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
function sn(e, t, n = {}) {
	let { domain: r, messages: i, args: a } = n, o = process.env.NODE_ENV === "production" ? e : yt((i || on)[e] || "", ...a || []), s = SyntaxError(String(o));
	return s.code = e, t && (s.location = t), s.domain = r, s;
}
function cn(e) {
	throw e;
}
var ln = /<\/?[\w\s="/.':;#-\/]+>/, un = (e) => ln.test(e), dn = " ", fn = "\r", pn = "\n", mn = "\u2028", hn = "\u2029";
function gn(e) {
	let t = e, n = 0, r = 1, i = 1, a = 0, o = (e) => t[e] === fn && t[e + 1] === pn, s = (e) => t[e] === pn, c = (e) => t[e] === hn, l = (e) => t[e] === mn, u = (e) => o(e) || s(e) || c(e) || l(e), d = () => n, f = () => r, p = () => i, m = () => a, h = (e) => o(e) || c(e) || l(e) ? pn : t[e], g = () => h(n), _ = () => h(n + a);
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
var _n = void 0, vn = "'", yn = "tokenizer";
function bn(e, t = {}) {
	let n = t.location !== !1, r = gn(e), i = () => r.index(), a = () => rn(r.line(), r.column(), r.index()), o = a(), s = i(), c = {
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
			let r = sn(e, n ? an(a.startLoc, t) : null, {
				domain: yn,
				args: i
			});
			u(r);
		}
	}
	function f(e, t, r) {
		e.endLoc = a(), e.currentType = t;
		let i = { type: t };
		return n && (i.loc = an(e.startLoc, e.endLoc)), r != null && (i.value = r), i;
	}
	let p = (e) => f(e, 13);
	function m(e, t) {
		return e.currentChar() === t ? (e.next(), t) : (d(Y.EXPECTED_TOKEN, a(), 0, t), "");
	}
	function h(e) {
		let t = "";
		for (; e.currentPeek() === dn || e.currentPeek() === pn;) t += e.currentPeek(), e.peek();
		return t;
	}
	function g(e) {
		let t = h(e);
		return e.skipToPeek(), t;
	}
	function _(e) {
		if (e === _n) return !1;
		let t = e.charCodeAt(0);
		return t >= 97 && t <= 122 || t >= 65 && t <= 90 || t === 95;
	}
	function v(e) {
		if (e === _n) return !1;
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
		let r = e.currentPeek() === vn;
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
			return t === "{" ? _(e.peek()) : t === "@" || t === "|" || t === ":" || t === "." || t === dn || !t ? !1 : t === pn ? (e.peek(), r()) : D(e, !1);
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
			return i === "{" || i === "@" || !i ? t : i === "|" ? !(r === dn || r === pn) : i === dn ? (e.peek(), n(!0, dn)) : i === pn ? (e.peek(), n(!0, pn)) : !0;
		}, r = n();
		return t && e.resetPeek(), r;
	}
	function O(e, t) {
		let n = e.currentChar();
		if (n !== _n) return t(n) ? (e.next(), n) : null;
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
	function I(e) {
		return O(e, F);
	}
	function L(e) {
		let t = "", n = "";
		for (; t = P(e);) n += t;
		return n;
	}
	function R(e) {
		let t = "";
		for (;;) {
			let n = e.currentChar();
			if (n === "\\") {
				let r = e.peek();
				r === "{" || r === "}" || r === "@" || r === "|" || r === "\\" ? (t += n + r, e.next(), e.next()) : (e.resetPeek(), t += n, e.next());
			} else if (n === "{" || n === "}" || n === "@" || n === "|" || !n) break;
			else if (n === dn || n === pn) if (D(e)) t += n, e.next();
			else if (E(e)) break;
			else t += n, e.next();
			else t += n, e.next();
		}
		return t;
	}
	function z(e) {
		g(e);
		let t = "", n = "";
		for (; t = M(e);) n += t;
		let r = e.currentChar();
		if (r && r !== "}" && r !== _n && r !== dn && r !== pn && r !== "　") {
			let t = W(e);
			return d(Y.INVALID_TOKEN_IN_PLACEHOLDER, a(), 0, n + t), n + t;
		}
		return e.currentChar() === _n && d(Y.UNTERMINATED_CLOSING_BRACE, a(), 0), n;
	}
	function B(e) {
		g(e);
		let t = "";
		return e.currentChar() === "-" ? (e.next(), t += `-${L(e)}`) : t += L(e), e.currentChar() === _n && d(Y.UNTERMINATED_CLOSING_BRACE, a(), 0), t;
	}
	function V(e) {
		return e !== vn && e !== pn;
	}
	function ee(e) {
		g(e), m(e, "'");
		let t = "", n = "";
		for (; t = O(e, V);) t === "\\" ? n += te(e) : n += t;
		let r = e.currentChar();
		return r === pn || r === _n ? (d(Y.UNTERMINATED_SINGLE_QUOTE_IN_PLACEHOLDER, a(), 0), r === pn && (e.next(), m(e, "'")), n) : (m(e, "'"), n);
	}
	function te(e) {
		let t = e.currentChar();
		switch (t) {
			case "\\":
			case "'": return e.next(), `\\${t}`;
			case "u": return H(e, t, 4);
			case "U": return H(e, t, 6);
			default: return d(Y.UNKNOWN_ESCAPE_SEQUENCE, a(), 0, t), "";
		}
	}
	function H(e, t, n) {
		m(e, t);
		let r = "";
		for (let i = 0; i < n; i++) {
			let n = I(e);
			if (!n) {
				d(Y.INVALID_UNICODE_ESCAPE_SEQUENCE, a(), 0, `\\${t}${r}${e.currentChar()}`);
				break;
			}
			r += n;
		}
		return `\\${t}${r}`;
	}
	function U(e) {
		return e !== "{" && e !== "}" && e !== dn && e !== pn;
	}
	function W(e) {
		g(e);
		let t = "", n = "";
		for (; t = O(e, U);) n += t;
		return n;
	}
	function ne(e) {
		let t = "", n = "";
		for (; t = A(e);) n += t;
		return n;
	}
	function G(e) {
		let t = (n) => {
			let r = e.currentChar();
			return r === "{" || r === "@" || r === "|" || r === "(" || r === ")" || !r || r === dn ? n : (n += r, e.next(), t(n));
		};
		return t("");
	}
	function re(e) {
		g(e);
		let t = m(e, "|");
		return g(e), t;
	}
	function ie(e, t) {
		let n = null;
		switch (e.currentChar()) {
			case "{": return t.braceNest >= 1 && d(Y.NOT_ALLOW_NEST_PLACEHOLDER, a(), 0), e.next(), n = f(t, 2, "{"), g(e), t.braceNest++, n;
			case "}": return t.braceNest > 0 && t.currentType === 2 && d(Y.EMPTY_PLACEHOLDER, a(), 0), e.next(), n = f(t, 3, "}"), t.braceNest--, t.braceNest > 0 && g(e), t.inLinked && t.braceNest === 0 && (t.inLinked = !1), n;
			case "@": return t.braceNest > 0 && d(Y.UNTERMINATED_CLOSING_BRACE, a(), 0), n = K(e, t) || p(t), t.braceNest = 0, n;
			default: {
				let r = !0, i = !0, o = !0;
				if (E(e)) return t.braceNest > 0 && d(Y.UNTERMINATED_CLOSING_BRACE, a(), 0), n = f(t, 1, re(e)), t.braceNest = 0, t.inLinked = !1, n;
				if (t.braceNest > 0 && (t.currentType === 4 || t.currentType === 5 || t.currentType === 6)) return d(Y.UNTERMINATED_CLOSING_BRACE, a(), 0), t.braceNest = 0, ae(e, t);
				if (r = y(e, t)) return n = f(t, 4, z(e)), g(e), n;
				if (i = b(e, t)) return n = f(t, 5, B(e)), g(e), n;
				if (o = x(e, t)) return n = f(t, 6, ee(e)), g(e), n;
				if (!r && !i && !o) return n = f(t, 12, W(e)), d(Y.INVALID_TOKEN_IN_PLACEHOLDER, a(), 0, n.value), g(e), n;
				break;
			}
		}
		return n;
	}
	function K(e, t) {
		let { currentType: n } = t, r = null, i = e.currentChar();
		switch ((n === 7 || n === 8 || n === 11 || n === 9) && (i === pn || i === dn) && d(Y.INVALID_LINKED_FORMAT, a(), 0), i) {
			case "@": return e.next(), r = f(t, 7, "@"), t.inLinked = !0, r;
			case ".": return g(e), e.next(), f(t, 8, ".");
			case ":": return g(e), e.next(), f(t, 9, ":");
			default: return E(e) ? (r = f(t, 1, re(e)), t.braceNest = 0, t.inLinked = !1, r) : S(e, t) || w(e, t) ? (g(e), K(e, t)) : C(e, t) ? (g(e), f(t, 11, ne(e))) : T(e, t) ? (g(e), i === "{" ? ie(e, t) || r : f(t, 10, G(e))) : (n === 7 && d(Y.INVALID_LINKED_FORMAT, a(), 0), t.braceNest = 0, t.inLinked = !1, ae(e, t));
		}
	}
	function ae(e, t) {
		let n = { type: 13 };
		if (t.braceNest > 0) return ie(e, t) || p(t);
		if (t.inLinked) return K(e, t) || p(t);
		switch (e.currentChar()) {
			case "{": return ie(e, t) || p(t);
			case "}": return d(Y.UNBALANCED_CLOSING_BRACE, a(), 0), e.next(), f(t, 3, "}");
			case "@": return K(e, t) || p(t);
			default:
				if (E(e)) return n = f(t, 1, re(e)), t.braceNest = 0, t.inLinked = !1, n;
				if (D(e)) return f(t, 0, R(e));
				break;
		}
		return n;
	}
	function oe() {
		let { currentType: e, offset: t, startLoc: n, endLoc: o } = c;
		return c.lastType = e, c.lastOffset = t, c.lastStartLoc = n, c.lastEndLoc = o, c.offset = i(), c.startLoc = a(), r.currentChar() === _n ? f(c, 13) : ae(r, c);
	}
	return {
		nextToken: oe,
		currentOffset: i,
		currentPosition: a,
		context: l
	};
}
var xn = "parser", Sn = /(?:\\\\|\\'|\\u([0-9a-fA-F]{4})|\\U([0-9a-fA-F]{6}))/g, Cn = /\\([\\@{}|])/g;
function wn(e, t) {
	return t;
}
function Tn(e, t, n) {
	switch (e) {
		case "\\\\": return "\\";
		case "\\'": return "'";
		default: {
			let e = parseInt(t || n, 16);
			return e <= 55295 || e >= 57344 ? String.fromCodePoint(e) : "�";
		}
	}
}
function En(e = {}) {
	let t = e.location !== !1, { onError: n } = e;
	function r(e, r, i, a, ...o) {
		let s = e.currentPosition();
		if (s.offset += a, s.column += a, n) {
			let e = sn(r, t ? an(i, s) : null, {
				domain: xn,
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
		return r.value = t.replace(Cn, wn), a(r, e.currentOffset(), e.currentPosition()), r;
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
		return o.value = t.replace(Sn, Tn), e.nextToken(), a(o, e.currentOffset(), e.currentPosition()), o;
	}
	function u(e) {
		let t = e.nextToken(), n = e.context(), { lastOffset: o, lastStartLoc: s } = n, c = i(8, o, s);
		return t.type === 11 ? (t.value ?? r(e, Y.UNEXPECTED_LEXICAL_ANALYSIS, n.lastStartLoc, 0, Dn(t)), c.value = t.value || "", a(c, e.currentOffset(), e.currentPosition()), { node: c }) : (r(e, Y.UNEXPECTED_EMPTY_LINKED_MODIFIER, n.lastStartLoc, 0), c.value = "", a(c, o, s), {
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
		switch (o.type !== 9 && r(e, Y.UNEXPECTED_LEXICAL_ANALYSIS, t.lastStartLoc, 0, Dn(o)), o = e.nextToken(), o.type === 2 && (o = e.nextToken()), o.type) {
			case 10:
				o.value ?? r(e, Y.UNEXPECTED_LEXICAL_ANALYSIS, t.lastStartLoc, 0, Dn(o)), n.key = d(e, o.value || "");
				break;
			case 4:
				o.value ?? r(e, Y.UNEXPECTED_LEXICAL_ANALYSIS, t.lastStartLoc, 0, Dn(o)), n.key = c(e, o.value || "");
				break;
			case 5:
				o.value ?? r(e, Y.UNEXPECTED_LEXICAL_ANALYSIS, t.lastStartLoc, 0, Dn(o)), n.key = s(e, o.value || "");
				break;
			case 6:
				o.value ?? r(e, Y.UNEXPECTED_LEXICAL_ANALYSIS, t.lastStartLoc, 0, Dn(o)), n.key = l(e, o.value || "");
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
					i.value ?? r(e, Y.UNEXPECTED_LEXICAL_ANALYSIS, t.lastStartLoc, 0, Dn(i)), n.items.push(o(e, i.value || ""));
					break;
				case 5:
					i.value ?? r(e, Y.UNEXPECTED_LEXICAL_ANALYSIS, t.lastStartLoc, 0, Dn(i)), n.items.push(s(e, i.value || ""));
					break;
				case 4:
					i.value ?? r(e, Y.UNEXPECTED_LEXICAL_ANALYSIS, t.lastStartLoc, 0, Dn(i)), n.items.push(c(e, i.value || ""));
					break;
				case 6:
					i.value ?? r(e, Y.UNEXPECTED_LEXICAL_ANALYSIS, t.lastStartLoc, 0, Dn(i)), n.items.push(l(e, i.value || ""));
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
		let o = bn(n, Dt({}, e)), s = o.context(), c = i(0, s.offset, s.startLoc);
		return t && c.loc && (c.loc.source = n), c.body = h(o), e.onCacheKey && (c.cacheKey = e.onCacheKey(n)), s.currentType !== 13 && r(o, Y.UNEXPECTED_LEXICAL_ANALYSIS, s.lastStartLoc, 0, n[s.offset] || ""), a(c, o.currentOffset(), o.currentPosition()), c;
	}
	return { parse: g };
}
function Dn(e) {
	if (e.type === 13) return "EOF";
	let t = (e.value || "").replace(/\r?\n/gu, "\\n");
	return t.length > 10 ? t.slice(0, 9) + "…" : t;
}
function On(e, t = {}) {
	let n = {
		ast: e,
		helpers: /* @__PURE__ */ new Set()
	};
	return {
		context: () => n,
		helper: (e) => (n.helpers.add(e), e)
	};
}
function kn(e, t) {
	for (let n = 0; n < e.length; n++) An(e[n], t);
}
function An(e, t) {
	switch (e.type) {
		case 1:
			kn(e.cases, t), t.helper("plural");
			break;
		case 2:
			kn(e.items, t);
			break;
		case 6:
			An(e.key, t), t.helper("linked"), t.helper("type");
			break;
		case 5:
			t.helper("interpolate"), t.helper("list");
			break;
		case 4:
			t.helper("interpolate"), t.helper("named");
			break;
	}
}
function jn(e, t = {}) {
	let n = On(e);
	n.helper("normalize"), e.body && An(e.body, n);
	let r = n.context();
	e.helpers = Array.from(r.helpers);
}
function Mn(e) {
	let t = e.body;
	return t.type === 2 ? Nn(t) : t.cases.forEach((e) => Nn(e)), e;
}
function Nn(e) {
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
			e.static = Zt(t);
			for (let t = 0; t < e.items.length; t++) {
				let n = e.items[t];
				(n.type === 3 || n.type === 9) && delete n.value;
			}
		}
	}
}
var Pn = "minifier";
function Fn(e) {
	switch (e.t = e.type, e.type) {
		case 0: {
			let t = e;
			Fn(t.body), t.b = t.body, delete t.body;
			break;
		}
		case 1: {
			let t = e, n = t.cases;
			for (let e = 0; e < n.length; e++) Fn(n[e]);
			t.c = n, delete t.cases;
			break;
		}
		case 2: {
			let t = e, n = t.items;
			for (let e = 0; e < n.length; e++) Fn(n[e]);
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
			Fn(t.key), t.k = t.key, delete t.key, t.modifier && (Fn(t.modifier), t.m = t.modifier, delete t.modifier);
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
		default: if (process.env.NODE_ENV !== "production") throw sn(Y.UNHANDLED_MINIFIER_NODE_TYPE, null, {
			domain: Pn,
			args: [e.type]
		});
	}
	delete e.type;
}
var In = "parser";
function Ln(e, t) {
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
function Rn(e, t) {
	let { helper: n } = e;
	e.push(`${n("linked")}(`), Hn(e, t.key), t.modifier ? (e.push(", "), Hn(e, t.modifier), e.push(", _type")) : e.push(", undefined, _type"), e.push(")");
}
function zn(e, t) {
	let { helper: n, needIndent: r } = e;
	e.push(`${n("normalize")}([`), e.indent(r());
	let i = t.items.length;
	for (let n = 0; n < i && (Hn(e, t.items[n]), n !== i - 1); n++) e.push(", ");
	e.deindent(r()), e.push("])");
}
function Bn(e, t) {
	let { helper: n, needIndent: r } = e;
	if (t.cases.length > 1) {
		e.push(`${n("plural")}([`), e.indent(r());
		let i = t.cases.length;
		for (let n = 0; n < i && (Hn(e, t.cases[n]), n !== i - 1); n++) e.push(", ");
		e.deindent(r()), e.push("])");
	}
}
function Vn(e, t) {
	t.body ? Hn(e, t.body) : e.push("null");
}
function Hn(e, t) {
	let { helper: n } = e;
	switch (t.type) {
		case 0:
			Vn(e, t);
			break;
		case 1:
			Bn(e, t);
			break;
		case 2:
			zn(e, t);
			break;
		case 6:
			Rn(e, t);
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
		default: if (process.env.NODE_ENV !== "production") throw sn(Y.UNHANDLED_CODEGEN_NODE_TYPE, null, {
			domain: In,
			args: [t.type]
		});
	}
}
var Un = (e, t = {}) => {
	let n = J(t.mode) ? t.mode : "normal", r = J(t.filename) ? t.filename : "message.intl";
	t.sourceMap;
	let i = t.breakLineCode == null ? n === "arrow" ? ";" : "\n" : t.breakLineCode, a = t.needIndent ? t.needIndent : n !== "arrow", o = e.helpers || [], s = Ln(e, {
		filename: r,
		breakLineCode: i,
		needIndent: a
	});
	s.push(n === "normal" ? "function __msg__ (ctx) {" : "(ctx) => {"), s.indent(a), o.length > 0 && (s.push(`const { ${Zt(o.map((e) => `${e}: _${e}`), ", ")} } = ctx`), s.newline()), s.push("return "), Hn(s, e), s.deindent(a), s.push("}"), delete e.helpers;
	let { code: c, map: l } = s.context();
	return {
		ast: e,
		code: c,
		map: l ? l.toJSON() : void 0
	};
};
function Wn(e, t = {}) {
	let n = Dt({}, t), r = !!n.jit, i = !!n.minify, a = n.optimize == null || n.optimize, o = En(n).parse(e);
	return r ? (a && Mn(o), i && Fn(o), {
		ast: o,
		code: ""
	}) : (jn(o, n), Un(o, n));
}
//#endregion
//#region node_modules/.pnpm/@intlify+core-base@11.4.6/node_modules/@intlify/core-base/dist/core-base.mjs
function Gn() {
	typeof __INTLIFY_PROD_DEVTOOLS__ != "boolean" && (jt().__INTLIFY_PROD_DEVTOOLS__ = !1), typeof __INTLIFY_DROP_MESSAGE_COMPILER__ != "boolean" && (jt().__INTLIFY_DROP_MESSAGE_COMPILER__ = !1);
}
function Kn(e) {
	return Gt(e) && nr(e) === 0 && (Vt(e, "b") || Vt(e, "body"));
}
var qn = ["b", "body"];
function Jn(e) {
	return lr(e, qn);
}
var Yn = ["c", "cases"];
function Xn(e) {
	return lr(e, Yn, []);
}
var Zn = ["s", "static"];
function Qn(e) {
	return lr(e, Zn);
}
var $n = ["i", "items"];
function er(e) {
	return lr(e, $n, []);
}
var tr = ["t", "type"];
function nr(e) {
	return lr(e, tr);
}
var rr = ["v", "value"];
function ir(e, t) {
	let n = lr(e, rr);
	if (n != null) return n;
	throw dr(t);
}
var ar = ["m", "modifier"];
function or(e) {
	return lr(e, ar);
}
var sr = ["k", "key"];
function cr(e) {
	let t = lr(e, sr);
	if (t) return t;
	throw dr(6);
}
function lr(e, t, n) {
	for (let n = 0; n < t.length; n++) {
		let r = t[n];
		if (Vt(e, r) && e[r] != null) return e[r];
	}
	return n;
}
var ur = [
	...qn,
	...Yn,
	...Zn,
	...$n,
	...sr,
	...ar,
	...rr,
	...tr
];
function dr(e) {
	return /* @__PURE__ */ Error(`unhandled node type: ${e}`);
}
function fr(e) {
	return (t) => pr(t, e);
}
function pr(e, t) {
	let n = Jn(t);
	if (n == null) throw dr(0);
	if (nr(n) === 1) {
		let t = Xn(n);
		return e.plural(t.reduce((t, n) => [...t, mr(e, n)], []));
	} else return mr(e, n);
}
function mr(e, t) {
	let n = Qn(t);
	if (n != null) return e.type === "text" ? n : e.normalize([n]);
	{
		let n = er(t).reduce((t, n) => [...t, hr(e, n)], []);
		return e.normalize(n);
	}
}
function hr(e, t) {
	let n = nr(t);
	switch (n) {
		case 3: return ir(t, n);
		case 9: return ir(t, n);
		case 4: {
			let r = t;
			if (Vt(r, "k") && r.k) return e.interpolate(e.named(r.k));
			if (Vt(r, "key") && r.key) return e.interpolate(e.named(r.key));
			throw dr(n);
		}
		case 5: {
			let r = t;
			if (Vt(r, "i") && Ct(r.i)) return e.interpolate(e.list(r.i));
			if (Vt(r, "index") && Ct(r.index)) return e.interpolate(e.list(r.index));
			throw dr(n);
		}
		case 6: {
			let n = t, r = or(n), i = cr(n);
			return e.linked(hr(e, i), r ? hr(e, r) : void 0, e.type);
		}
		case 7: return ir(t, n);
		case 8: return ir(t, n);
		default: throw Error(`unhandled node on format message part: ${n}`);
	}
}
var gr = "Detected HTML in '{source}' message. Recommend not using HTML messages to avoid XSS.";
function _r(e, t) {
	t && un(e) && ft(yt(gr, { source: e }));
}
var vr = (e) => e, yr = kt();
function br(e, t = {}) {
	let n = !1, r = t.onError || cn;
	return t.onError = (e) => {
		n = !0, r(e);
	}, {
		...Wn(e, t),
		detectError: n
	};
}
/* #__NO_SIDE_EFFECTS__ */
function xr(e, t) {
	if (!__INTLIFY_DROP_MESSAGE_COMPILER__ && J(e)) {
		let n = !Wt(t.warnHtmlMessage) || t.warnHtmlMessage;
		process.env.NODE_ENV !== "production" && _r(e, n);
		let r = (t.onCacheKey || vr)(e), i = yr[r];
		if (i) return i;
		let { ast: a, detectError: o } = br(e, {
			...t,
			location: process.env.NODE_ENV !== "production",
			jit: !0
		}), s = fr(a);
		return o ? s : yr[r] = s;
	} else {
		if (process.env.NODE_ENV !== "production" && !Kn(e)) return ft(`the message that is resolve with key '${t.key}' is not supported for jit compilation`), (() => e);
		let n = e.cacheKey;
		return n ? yr[n] || (yr[n] = fr(e)) : fr(e);
	}
}
var Sr = null;
function Cr(e) {
	Sr = e;
}
function wr(e, t, n) {
	Sr && Sr.emit("i18n:init", {
		timestamp: Date.now(),
		i18n: e,
		version: t,
		meta: n
	});
}
var Tr = /* #__PURE__*/ Er("function:translate");
function Er(e) {
	return (t) => Sr && Sr.emit(e, t);
}
var Dr = {
	INVALID_ARGUMENT: 17,
	INVALID_DATE_ARGUMENT: 18,
	INVALID_ISO_DATE_ARGUMENT: 19,
	NOT_SUPPORT_NON_STRING_MESSAGE: 20,
	NOT_SUPPORT_LOCALE_PROMISE_VALUE: 21,
	NOT_SUPPORT_LOCALE_ASYNC_FUNCTION: 22,
	NOT_SUPPORT_LOCALE_TYPE: 23
};
function Or(e) {
	return sn(e, null, process.env.NODE_ENV === "production" ? void 0 : { messages: kr });
}
var kr = {
	[Dr.INVALID_ARGUMENT]: "Invalid arguments",
	[Dr.INVALID_DATE_ARGUMENT]: "The date provided is an invalid Date object.Make sure your Date represents a valid date.",
	[Dr.INVALID_ISO_DATE_ARGUMENT]: "The argument provided is not a valid ISO date string",
	[Dr.NOT_SUPPORT_NON_STRING_MESSAGE]: "Not support non-string message",
	[Dr.NOT_SUPPORT_LOCALE_PROMISE_VALUE]: "cannot support promise value",
	[Dr.NOT_SUPPORT_LOCALE_ASYNC_FUNCTION]: "cannot support async function",
	[Dr.NOT_SUPPORT_LOCALE_TYPE]: "cannot support locale type"
};
function Ar(e, t) {
	return t.locale == null ? Mr(e.locale) : Mr(t.locale);
}
var jr;
function Mr(e) {
	if (J(e)) return e;
	if (Ut(e)) {
		if (e.resolvedOnce && jr != null) return jr;
		if (e.constructor.name === "Function") {
			let t = e();
			if (Kt(t)) throw Or(Dr.NOT_SUPPORT_LOCALE_PROMISE_VALUE);
			return jr = t;
		} else throw Or(Dr.NOT_SUPPORT_LOCALE_ASYNC_FUNCTION);
	} else throw Or(Dr.NOT_SUPPORT_LOCALE_TYPE);
}
function Nr(e, t, n) {
	return [.../* @__PURE__ */ new Set([n, ...Ht(t) ? t : Gt(t) ? Object.keys(t) : J(t) ? [t] : [n]])];
}
function Pr(e, t, n) {
	let r = J(n) ? n : Qr, i = e;
	i.__localeChainCache ||= /* @__PURE__ */ new Map();
	let a = i.__localeChainCache.get(r);
	if (!a) {
		a = [];
		let e = [n];
		for (; Ht(e);) e = Fr(a, e, t);
		let o = Ht(t) || !Yt(t) ? t : t.default ? t.default : null;
		e = J(o) ? [o] : o, Ht(e) && Fr(a, e, !1), i.__localeChainCache.set(r, a);
	}
	return a;
}
function Fr(e, t, n) {
	let r = !0;
	for (let i = 0; i < t.length && Wt(r); i++) {
		let a = t[i];
		J(a) && (r = Ir(e, t[i], n));
	}
	return r;
}
function Ir(e, t, n) {
	let r, i = t.split("-");
	do
		r = Lr(e, i.join("-"), n), i.splice(-1, 1);
	while (i.length && r === !0);
	return r;
}
function Lr(e, t, n) {
	let r = !1;
	if (!e.includes(t) && (r = !0, t)) {
		r = t[t.length - 1] !== "!";
		let i = t.replace(/!/g, "");
		e.push(i), (Ht(n) || Yt(n)) && n[i] && (r = n[i]);
	}
	return r;
}
var Rr = [];
Rr[0] = {
	w: [0],
	i: [3, 0],
	"[": [4],
	o: [7]
}, Rr[1] = {
	w: [1],
	".": [2],
	"[": [4],
	o: [7]
}, Rr[2] = {
	w: [2],
	i: [3, 0],
	0: [3, 0]
}, Rr[3] = {
	i: [3, 0],
	0: [3, 0],
	w: [1, 1],
	".": [2, 1],
	"[": [4, 1],
	o: [7, 1]
}, Rr[4] = {
	"'": [5, 0],
	"\"": [6, 0],
	"[": [4, 2],
	"]": [1, 3],
	o: 8,
	l: [4, 0]
}, Rr[5] = {
	"'": [4, 0],
	o: 8,
	l: [5, 0]
}, Rr[6] = {
	"\"": [4, 0],
	o: 8,
	l: [6, 0]
};
var zr = /^\s?(?:true|false|-?[\d.]+|'[^']*'|"[^"]*")\s?$/;
function Br(e) {
	return zr.test(e);
}
function Vr(e) {
	let t = e.charCodeAt(0);
	return t === e.charCodeAt(e.length - 1) && (t === 34 || t === 39) ? e.slice(1, -1) : e;
}
function Hr(e) {
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
function Ur(e) {
	let t = e.trim();
	return e.charAt(0) === "0" && isNaN(parseInt(e)) ? !1 : Br(t) ? Vr(t) : "*" + t;
}
function Wr(e) {
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
			if (i = 0, o === void 0 || (o = Ur(o), o === !1)) return !1;
			f[1]();
		}
	};
	function p() {
		let t = e[n + 1];
		if (r === 5 && t === "'" || r === 6 && t === "\"") return n++, s = "\\" + t, f[0](), !0;
	}
	for (; r !== null;) if (n++, a = e[n], !(a === "\\" && p())) {
		if (c = Hr(a), d = Rr[r], l = d[c] || d.l || 8, l === 8 || (r = l[0], l[1] !== void 0 && (u = f[l[1]], u && (s = a, u() === !1)))) return;
		if (r === 7) return t;
	}
}
var Gr = /* @__PURE__ */ new Map();
function Kr(e, t) {
	return Gt(e) ? e[t] : null;
}
function qr(e, t) {
	if (!Gt(e)) return null;
	let n = Gr.get(t);
	if (n || (n = Wr(t), n && Gr.set(t, n)), !n) return null;
	let r = n.length, i = e, a = 0;
	for (; a < r;) {
		let e = n[a];
		if (ur.includes(e) && Kn(i) || !Gt(i) || !Vt(i, e)) return null;
		let t = i[e];
		if (t === void 0 || Ut(i)) return null;
		i = t, a++;
	}
	return i;
}
var Jr = {
	NOT_FOUND_KEY: 1,
	FALLBACK_TO_TRANSLATE: 2,
	CANNOT_FORMAT_NUMBER: 3,
	FALLBACK_TO_NUMBER_FORMAT: 4,
	CANNOT_FORMAT_DATE: 5,
	FALLBACK_TO_DATE_FORMAT: 6,
	EXPERIMENTAL_CUSTOM_MESSAGE_COMPILER: 7,
	INVALID_NUMBER_ARGUMENT: 8,
	INVALID_DATE_ARGUMENT: 9
}, Yr = {
	[Jr.NOT_FOUND_KEY]: "Not found '{key}' key in '{locale}' locale messages.",
	[Jr.FALLBACK_TO_TRANSLATE]: "Fall back to translate '{key}' key with '{target}' locale.",
	[Jr.CANNOT_FORMAT_NUMBER]: "Cannot format a number value due to not supported Intl.NumberFormat.",
	[Jr.FALLBACK_TO_NUMBER_FORMAT]: "Fall back to number format '{key}' key with '{target}' locale.",
	[Jr.CANNOT_FORMAT_DATE]: "Cannot format a date value due to not supported Intl.DateTimeFormat.",
	[Jr.FALLBACK_TO_DATE_FORMAT]: "Fall back to datetime format '{key}' key with '{target}' locale.",
	[Jr.EXPERIMENTAL_CUSTOM_MESSAGE_COMPILER]: "This project is using Custom Message Compiler, which is an experimental feature. It may receive breaking changes or be removed in the future.",
	[Jr.INVALID_NUMBER_ARGUMENT]: "Invalid argument for number formatting: expected a number but received '{value}'.",
	[Jr.INVALID_DATE_ARGUMENT]: "Invalid argument for datetime formatting: expected a Date, number, or ISO string but received '{value}'."
};
function Xr(e, ...t) {
	return yt(Yr[e], ...t);
}
var Zr = "11.4.6", Qr = "en-US", $r = (e) => `${e.charAt(0).toLocaleUpperCase()}${e.substr(1)}`;
function ei() {
	return {
		upper: (e, t) => t === "text" && J(e) ? e.toUpperCase() : t === "vnode" && Gt(e) && "__v_isVNode" in e ? e.children.toUpperCase() : e,
		lower: (e, t) => t === "text" && J(e) ? e.toLowerCase() : t === "vnode" && Gt(e) && "__v_isVNode" in e ? e.children.toLowerCase() : e,
		capitalize: (e, t) => t === "text" && J(e) ? $r(e) : t === "vnode" && Gt(e) && "__v_isVNode" in e ? $r(e.children) : e
	};
}
var ti;
function ni(e) {
	ti = e;
}
var ri;
function ii(e) {
	ri = e;
}
var ai;
function oi(e) {
	ai = e;
}
var si = null, ci = /* @__NO_SIDE_EFFECTS__ */ () => si, li = null, ui = (e) => {
	li = e;
}, di = () => li, fi = 0;
function pi(e = {}) {
	let t = Ut(e.onWarn) ? e.onWarn : ft, n = J(e.version) ? e.version : Zr, r = J(e.locale) || Ut(e.locale) ? e.locale : Qr, i = Ut(r) ? Qr : r, a = Ht(e.fallbackLocale) || Yt(e.fallbackLocale) || J(e.fallbackLocale) || e.fallbackLocale === !1 ? e.fallbackLocale : i, o = Yt(e.messages) ? e.messages : mi(i), s = Yt(e.datetimeFormats) ? e.datetimeFormats : mi(i), c = Yt(e.numberFormats) ? e.numberFormats : mi(i), l = Dt(kt(), e.modifiers, ei()), u = e.pluralRules || kt(), d = Ut(e.missing) ? e.missing : null, f = Wt(e.missingWarn) || Tt(e.missingWarn) ? e.missingWarn : !0, p = Wt(e.fallbackWarn) || Tt(e.fallbackWarn) ? e.fallbackWarn : !0, m = !!e.fallbackFormat, h = !!e.unresolving, g = Ut(e.postTranslation) ? e.postTranslation : null, _ = Yt(e.processor) ? e.processor : null, v = !Wt(e.warnHtmlMessage) || e.warnHtmlMessage, y = !!e.escapeParameter, b = Ut(e.messageCompiler) ? e.messageCompiler : ti;
	process.env.NODE_ENV !== "production" && Ut(e.messageCompiler) && mt(Xr(Jr.EXPERIMENTAL_CUSTOM_MESSAGE_COMPILER));
	let x = Ut(e.messageResolver) ? e.messageResolver : ri || Kr, S = Ut(e.localeFallbacker) ? e.localeFallbacker : ai || Nr, C = Gt(e.fallbackContext) ? e.fallbackContext : void 0, w = e, T = Gt(w.__datetimeFormatters) ? w.__datetimeFormatters : /* @__PURE__ */ new Map(), E = Gt(w.__numberFormatters) ? w.__numberFormatters : /* @__PURE__ */ new Map(), D = Gt(w.__meta) ? w.__meta : {};
	fi++;
	let O = {
		version: n,
		cid: fi,
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
	return O.datetimeFormats = s, O.numberFormats = c, O.__datetimeFormatters = T, O.__numberFormatters = E, process.env.NODE_ENV !== "production" && (O.__v_emitter = w.__v_emitter == null ? void 0 : w.__v_emitter), (process.env.NODE_ENV !== "production" || __INTLIFY_PROD_DEVTOOLS__) && wr(O, n, D), O;
}
var mi = (e) => ({ [e]: kt() });
function hi(e, t) {
	return e instanceof RegExp ? e.test(t) : e;
}
function gi(e, t) {
	return e instanceof RegExp ? e.test(t) : e;
}
function _i(e, t, n, r, i) {
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
		return J(r) ? r : t;
	} else return process.env.NODE_ENV !== "production" && gi(r, t) && o(Xr(Jr.NOT_FOUND_KEY, {
		key: t,
		locale: n
	})), t;
}
function vi(e, t, n) {
	let r = e;
	r.__localeChainCache = /* @__PURE__ */ new Map(), e.localeFallbacker(e, n, t);
}
function yi(e, t) {
	return e !== t && e.split("-")[0] === t.split("-")[0];
}
function bi(e, t) {
	let n = t.indexOf(e);
	if (n === -1) return !1;
	for (let r = n + 1; r < t.length; r++) if (yi(e, t[r])) return !0;
	return !1;
}
var xi = typeof Intl < "u", Si = {
	dateTimeFormat: xi && Intl.DateTimeFormat !== void 0,
	numberFormat: xi && Intl.NumberFormat !== void 0
};
function Ci(e, ...t) {
	let { datetimeFormats: n, unresolving: r, fallbackLocale: i, onWarn: a, localeFallbacker: o } = e, { __datetimeFormatters: s } = e;
	if (process.env.NODE_ENV !== "production" && !Si.dateTimeFormat) return a(Xr(Jr.CANNOT_FORMAT_DATE)), "";
	if (!J(t[0]) && !wt(t[0]) && !Ct(t[0])) return process.env.NODE_ENV !== "production" && a(Xr(Jr.INVALID_DATE_ARGUMENT, { value: String(t[0]) })), "";
	let [c, l, u, d] = Ti(...t), f = Wt(u.missingWarn) ? u.missingWarn : e.missingWarn, p = Wt(u.fallbackWarn) ? u.fallbackWarn : e.fallbackWarn, m = !!u.part, h = Ar(e, u), g = o(e, i, h);
	if (!J(c) || c === "") {
		let e = new Intl.DateTimeFormat(h.replace(/!/g, ""), d);
		return m ? e.formatToParts(l) : e.format(l);
	}
	let _ = {}, v, y = null, b = h, x = null, S = "datetime format";
	for (let t = 0; t < g.length; t++) {
		if (v = x = g[t], process.env.NODE_ENV !== "production" && h !== v && hi(p, c) && a(Xr(Jr.FALLBACK_TO_DATE_FORMAT, {
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
		if (_ = n[v] || {}, y = _[c], Yt(y)) break;
		_i(e, c, v, f, S), b = x;
	}
	if (!Yt(y) || !J(v)) return r ? -1 : c;
	let C = `${v}__${c}`;
	Et(d) || (C = `${C}__${JSON.stringify(d)}`);
	let w = s.get(C);
	return w || (w = new Intl.DateTimeFormat(v, Dt({}, y, d)), s.set(C, w)), m ? w.formatToParts(l) : w.format(l);
}
var wi = [
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
function Ti(...e) {
	let [t, n, r, i] = e, a = kt(), o = kt(), s;
	if (J(t)) {
		let e = t.match(/(\d{4}-\d{2}-\d{2})(T|\s)?(.*)/);
		if (!e) throw Or(Dr.INVALID_ISO_DATE_ARGUMENT);
		let n = e[3] ? e[3].trim().startsWith("T") ? `${e[1].trim()}${e[3].trim()}` : `${e[1].trim()}T${e[3].trim()}` : e[1].trim();
		s = new Date(n);
		try {
			s.toISOString();
		} catch {
			throw Or(Dr.INVALID_ISO_DATE_ARGUMENT);
		}
	} else if (wt(t)) {
		if (isNaN(t.getTime())) throw Or(Dr.INVALID_DATE_ARGUMENT);
		s = t;
	} else if (Ct(t)) s = t;
	else throw Or(Dr.INVALID_ARGUMENT);
	return J(n) ? a.key = n : Yt(n) && Object.keys(n).forEach((e) => {
		wi.includes(e) ? o[e] = n[e] : a[e] = n[e];
	}), J(r) ? a.locale = r : Yt(r) && (o = r), Yt(i) && (o = i), [
		a.key || "",
		s,
		a,
		o
	];
}
function Ei(e, t, n) {
	let r = e;
	for (let e in n) {
		let n = `${t}__${e}`;
		r.__datetimeFormatters.has(n) && r.__datetimeFormatters.delete(n);
	}
}
function Di(e, ...t) {
	let { numberFormats: n, unresolving: r, fallbackLocale: i, onWarn: a, localeFallbacker: o } = e, { __numberFormatters: s } = e;
	if (process.env.NODE_ENV !== "production" && !Si.numberFormat) return a(Xr(Jr.CANNOT_FORMAT_NUMBER)), "";
	if (!Ct(t[0])) return process.env.NODE_ENV !== "production" && a(Xr(Jr.INVALID_NUMBER_ARGUMENT, { value: String(t[0]) })), "";
	let [c, l, u, d] = ki(...t), f = Wt(u.missingWarn) ? u.missingWarn : e.missingWarn, p = Wt(u.fallbackWarn) ? u.fallbackWarn : e.fallbackWarn, m = !!u.part, h = Ar(e, u), g = o(e, i, h);
	if (!J(c) || c === "") {
		let e = new Intl.NumberFormat(h.replace(/!/g, ""), d);
		return m ? e.formatToParts(l) : e.format(l);
	}
	let _ = {}, v, y = null, b = h, x = null, S = "number format";
	for (let t = 0; t < g.length; t++) {
		if (v = x = g[t], process.env.NODE_ENV !== "production" && h !== v && hi(p, c) && a(Xr(Jr.FALLBACK_TO_NUMBER_FORMAT, {
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
		if (_ = n[v] || {}, y = _[c], Yt(y)) break;
		_i(e, c, v, f, S), b = x;
	}
	if (!Yt(y) || !J(v)) return r ? -1 : c;
	let C = `${v}__${c}`;
	Et(d) || (C = `${C}__${JSON.stringify(d)}`);
	let w = s.get(C);
	return w || (w = new Intl.NumberFormat(v, Dt({}, y, d)), s.set(C, w)), m ? w.formatToParts(l) : w.format(l);
}
var Oi = [
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
function ki(...e) {
	let [t, n, r, i] = e, a = kt(), o = kt();
	if (!Ct(t)) throw Or(Dr.INVALID_ARGUMENT);
	let s = t;
	return J(n) ? a.key = n : Yt(n) && Object.keys(n).forEach((e) => {
		Oi.includes(e) ? o[e] = n[e] : a[e] = n[e];
	}), J(r) ? a.locale = r : Yt(r) && (o = r), Yt(i) && (o = i), [
		a.key || "",
		s,
		a,
		o
	];
}
function Ai(e, t, n) {
	let r = e;
	for (let e in n) {
		let n = `${t}__${e}`;
		r.__numberFormatters.has(n) && r.__numberFormatters.delete(n);
	}
}
var ji = (e) => e, Mi = (e) => "", Ni = "text", Pi = (e) => e.length === 0 ? "" : Zt(e), Fi = Xt;
function Ii(e, t) {
	return e = Math.abs(e), t === 2 ? e === 1 ? 0 : 1 : Math.min(e, 2);
}
function Li(e) {
	let t = Ct(e.pluralIndex) ? e.pluralIndex : -1;
	return Ct(e.named?.count) ? e.named.count : Ct(e.named?.n) ? e.named.n : t;
}
function Ri(e = {}) {
	let t = e.locale, n = Li(e), r = J(t) && Ut(e.pluralRules?.[t]) ? e.pluralRules[t] : Ii, i = r === Ii ? void 0 : Ii, a = (e) => e[r(n, e.length, i)], o = e.list || [], s = (e) => o[e], c = e.named || kt();
	Ct(e.pluralIndex) && (c.count ||= e.pluralIndex, c.n ||= e.pluralIndex);
	let l = (e) => c[e];
	function u(t, n) {
		return (Ut(e.messages) ? e.messages(t, !!n) : Gt(e.messages) ? e.messages[t] : !1) || (e.parent ? e.parent.message(t) : Mi);
	}
	let d = (t) => e.modifiers ? e.modifiers[t] : ji, f = Ut(e.processor?.normalize) ? e.processor.normalize : Pi, p = Ut(e.processor?.interpolate) ? e.processor.interpolate : Fi, m = {
		list: s,
		named: l,
		plural: a,
		linked: (e, ...t) => {
			let [n, r] = t, i = "text", a = "";
			t.length === 1 ? Gt(n) ? (a = n.modifier || a, i = n.type || i) : J(n) && (a = n || a) : t.length === 2 && (J(n) && (a = n || a), J(r) && (i = r || i));
			let o = u(e, !0)(m), s = o === "" || o === void 0 ? e : o, c = i === "vnode" && Ht(s) && a ? s[0] : s;
			return a ? d(a)(c, i) : c;
		},
		message: u,
		type: J(e.processor?.type) ? e.processor.type : Ni,
		interpolate: p,
		normalize: f,
		values: Dt(kt(), o, c)
	};
	return m;
}
var zi = () => "", Bi = (e) => Ut(e);
function Vi(e, ...t) {
	let { fallbackFormat: n, postTranslation: r, unresolving: i, messageCompiler: a, fallbackLocale: o, messages: s } = e, [c, l] = Ki(...t), u = Wt(l.missingWarn) ? l.missingWarn : e.missingWarn, d = Wt(l.fallbackWarn) ? l.fallbackWarn : e.fallbackWarn, f = Wt(l.escapeParameter) ? l.escapeParameter : e.escapeParameter, p = !!l.resolvedMessage, m = J(l.default) || Wt(l.default) ? Wt(l.default) ? a ? c : () => c : l.default : n ? a ? c : () => c : null, h = n || m != null && (J(m) || Ut(m)), g = Ar(e, l);
	f && Hi(l);
	let [_, v, y] = p ? [
		c,
		g,
		s[g] || kt()
	] : Ui(e, c, g, o, d, u), b = _, x = c;
	if (!p && !(J(b) || Kn(b) || Bi(b)) && h && (b = m, x = b), !p && (!(J(b) || Kn(b) || Bi(b)) || !J(v))) return i ? -1 : c;
	if (process.env.NODE_ENV !== "production" && J(b) && e.messageCompiler == null) return ft(`The message format compilation is not supported in this build. Because message compiler isn't included. You need to pre-compilation all message format. So translate function return '${c}'.`), c;
	let S = !1, C = Bi(b) ? b : Wi(e, c, v, b, x, () => {
		S = !0;
	});
	if (S) return b;
	let w = Gi(e, C, Ri(Yi(e, v, y, l))), T = r ? r(w, c) : w;
	if (f && J(T) && (T = zt(T)), process.env.NODE_ENV !== "production" || __INTLIFY_PROD_DEVTOOLS__) {
		let t = {
			timestamp: Date.now(),
			key: J(c) ? c : Bi(b) ? b.key : "",
			locale: v || (Bi(b) ? b.locale : ""),
			format: J(b) ? b : Bi(b) ? b.source : "",
			message: T
		};
		t.meta = Dt({}, e.__meta, /* @__PURE__ */ ci() || {}), Tr(t);
	}
	return T;
}
function Hi(e) {
	Ht(e.list) ? e.list = e.list.map((e) => J(e) ? Mt(e) : e) : Gt(e.named) && Object.keys(e.named).forEach((t) => {
		J(e.named[t]) && (e.named[t] = Mt(e.named[t]));
	});
}
function Ui(e, t, n, r, i, a) {
	let { messages: o, onWarn: s, messageResolver: c, localeFallbacker: l } = e, u = l(e, r, n), d = kt(), f, p = null, m = n, h = null, g = "translate";
	for (let r = 0; r < u.length; r++) {
		f = h = u[r], process.env.NODE_ENV !== "production" && n !== f && !yi(n, f) && hi(i, t) && s(Xr(Jr.FALLBACK_TO_TRANSLATE, {
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
		}), d = o[f] || kt();
		let _ = null, v, y;
		if (process.env.NODE_ENV !== "production" && ht && l && (_ = window.performance.now(), v = "intlify-message-resolve-start", y = "intlify-message-resolve-end", gt && gt(v)), (p = c(d, t)) === null && (p = d[t]), process.env.NODE_ENV !== "production" && ht && l) {
			let e = window.performance.now();
			l && _ && p && l.emit("message-resolve", {
				type: "message-resolve",
				key: t,
				message: p,
				time: e - _,
				groupId: `${g}:${t}`
			}), v && y && gt && _t && (gt(y), _t("intlify message resolve", v, y));
		}
		if (J(p) || Kn(p) || Bi(p)) break;
		if (!bi(f, u)) {
			let n = _i(e, t, f, a, g);
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
function Wi(e, t, n, r, i, a) {
	let { messageCompiler: o, warnHtmlMessage: s } = e;
	if (Bi(r)) {
		let e = r;
		return e.locale = e.locale || n, e.key = e.key || t, e;
	}
	if (o == null) {
		let e = (() => r);
		return e.locale = n, e.key = t, e;
	}
	let c = process.env.NODE_ENV === "production" ? void 0 : e.__v_emitter, l = null, u, d;
	process.env.NODE_ENV !== "production" && ht && c && (l = window.performance.now(), u = "intlify-message-compilation-start", d = "intlify-message-compilation-end", gt && gt(u));
	let f = o(r, qi(e, n, i, r, s, a));
	if (process.env.NODE_ENV !== "production" && ht && c) {
		let e = window.performance.now();
		c && l && c.emit("message-compilation", {
			type: "message-compilation",
			message: r,
			time: e - l,
			groupId: `translate:${t}`
		}), u && d && gt && _t && (gt(d), _t("intlify message compilation", u, d));
	}
	return f.locale = n, f.key = t, f.source = r, f;
}
function Gi(e, t, n) {
	let r = process.env.NODE_ENV === "production" ? void 0 : e.__v_emitter, i = null, a, o;
	process.env.NODE_ENV !== "production" && ht && r && (i = window.performance.now(), a = "intlify-message-evaluation-start", o = "intlify-message-evaluation-end", gt && gt(a));
	let s = t(n);
	if (process.env.NODE_ENV !== "production" && ht && r) {
		let e = window.performance.now();
		r && i && r.emit("message-evaluation", {
			type: "message-evaluation",
			value: s,
			time: e - i,
			groupId: `translate:${t.key}`
		}), a && o && gt && _t && (gt(o), _t("intlify message evaluation", a, o));
	}
	return s;
}
function Ki(...e) {
	let [t, n, r] = e, i = kt();
	if (!J(t) && !Ct(t) && !Bi(t) && !Kn(t)) throw Or(Dr.INVALID_ARGUMENT);
	let a = Ct(t) ? String(t) : (Bi(t), t);
	return Ct(n) ? i.plural = n : J(n) ? i.default = n : Yt(n) && !Et(n) ? i.named = n : Ht(n) && (i.list = n), Ct(r) ? i.plural = r : J(r) ? i.default = r : Yt(r) && Dt(i, r), [a, i];
}
function qi(e, t, n, r, i, a) {
	return {
		locale: t,
		key: n,
		warnHtmlMessage: i,
		onError: (t) => {
			if (a && a(t), process.env.NODE_ENV !== "production") {
				let i = Ji(r), a = t.location && i && $t(i, t.location.start.offset, t.location.end.offset), o = e.__v_emitter;
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
		onCacheKey: (e) => xt(t, n, e)
	};
}
function Ji(e) {
	if (J(e)) return e;
	if (e.loc && e.loc.source) return e.loc.source;
}
function Yi(e, t, n, r) {
	let { modifiers: i, pluralRules: a, messageResolver: o, fallbackLocale: s, fallbackWarn: c, missingWarn: l, fallbackContext: u } = e, d = {
		locale: t,
		modifiers: i,
		pluralRules: a,
		messages: (r, i) => {
			let a = o(n, r);
			if (a == null && (u || i)) {
				let [n, , i] = Ui(u || e, r, t, s, c, l);
				a = n ?? o(i, r);
			}
			if (J(a) || Kn(a)) {
				let n = !1, i = Wi(e, r, t, a, r, () => {
					n = !0;
				});
				return n ? zi : i;
			} else if (Bi(a)) return a;
			else return zi;
		}
	};
	return e.processor && (d.processor = e.processor), r.list && (d.list = r.list), r.named && (d.named = r.named), Ct(r.plural) && (d.pluralIndex = r.plural), d;
}
Gn();
//#endregion
//#region node_modules/.pnpm/vue-i18n@11.4.6_vue@3.5.39_typescript@6.0.3_/node_modules/vue-i18n/dist/vue-i18n.mjs
var Xi = "11.4.6";
function Zi() {
	typeof __VUE_I18N_FULL_INSTALL__ != "boolean" && (jt().__VUE_I18N_FULL_INSTALL__ = !0), typeof __VUE_I18N_LEGACY_API__ != "boolean" && (jt().__VUE_I18N_LEGACY_API__ = !0), typeof __INTLIFY_DROP_MESSAGE_COMPILER__ != "boolean" && (jt().__INTLIFY_DROP_MESSAGE_COMPILER__ = !1), typeof __INTLIFY_PROD_DEVTOOLS__ != "boolean" && (jt().__INTLIFY_PROD_DEVTOOLS__ = !1);
}
var Qi = {
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
function $i(e, ...t) {
	return sn(e, null, process.env.NODE_ENV === "production" ? void 0 : {
		messages: ea,
		args: t
	});
}
var ea = {
	[Qi.UNEXPECTED_RETURN_TYPE]: "Unexpected return type in composer",
	[Qi.INVALID_ARGUMENT]: "Invalid argument",
	[Qi.MUST_BE_CALL_SETUP_TOP]: "Must be called at the top of a `setup` function",
	[Qi.NOT_INSTALLED]: "Need to install with `app.use` function",
	[Qi.UNEXPECTED_ERROR]: "Unexpected error",
	[Qi.REQUIRED_VALUE]: "Required in value: {0}",
	[Qi.INVALID_VALUE]: "Invalid value",
	[Qi.CANNOT_SETUP_VUE_DEVTOOLS_PLUGIN]: "Cannot setup vue-devtools plugin",
	[Qi.NOT_INSTALLED_WITH_PROVIDE]: "Need to install with `provide` function",
	[Qi.NOT_COMPATIBLE_LEGACY_VUE_I18N]: "Not compatible legacy VueI18n.",
	[Qi.NOT_AVAILABLE_COMPOSITION_IN_LEGACY]: "Not available Compostion API in Legacy API mode. Please make sure that the legacy API mode is working properly"
}, ta = /* #__PURE__*/ bt("__translateVNode"), na = /* #__PURE__*/ bt("__datetimeParts"), ra = /* #__PURE__*/ bt("__numberParts"), ia = /* #__PURE__*/ bt("__enableEmitter"), aa = /* #__PURE__*/ bt("__disableEmitter"), oa = bt("__setPluralRules");
bt("__intlifyMeta");
var sa = /* #__PURE__*/ bt("__injectWithOption"), ca = /* #__PURE__*/ bt("__dispose"), la = {
	FALLBACK_TO_ROOT: 10,
	NOT_FOUND_PARENT_SCOPE: 11,
	IGNORE_OBJ_FLATTEN: 12,
	DEPRECATE_LEGACY_MODE: 13,
	DEPRECATE_TRANSLATE_CUSTOME_DIRECTIVE: 14,
	DUPLICATE_USE_I18N_CALLING: 15
}, ua = {
	[la.FALLBACK_TO_ROOT]: "Fall back to {type} '{key}' with root locale.",
	[la.NOT_FOUND_PARENT_SCOPE]: "Not found parent scope. use the global scope.",
	[la.IGNORE_OBJ_FLATTEN]: "Ignore object flatten: '{key}' key has an string value",
	[la.DEPRECATE_LEGACY_MODE]: "Legacy API mode has been deprecated in v11. Use Composition API mode instead.\nAbout how to use the Composition API mode, see https://vue-i18n.intlify.dev/guide/advanced/composition.html",
	[la.DEPRECATE_TRANSLATE_CUSTOME_DIRECTIVE]: "'v-t' has been deprecated in v11. Use translate APIs ('t' or '$t') instead.",
	[la.DUPLICATE_USE_I18N_CALLING]: "Duplicate `useI18n` calling by local scope. Please don't call it on local scope, due to it does not work properly in component."
};
function da(e, ...t) {
	return yt(ua[e], ...t);
}
function fa(e) {
	if (!Gt(e) || Kn(e)) return e;
	for (let t in e) if (Vt(e, t)) if (!t.includes(".")) Gt(e[t]) && fa(e[t]);
	else {
		let n = t.split("."), r = n.length - 1, i = e, a = !1;
		for (let e = 0; e < r; e++) {
			if (n[e] === "__proto__") throw Error(`unsafe key: ${n[e]}`);
			if (n[e] in i || (i[n[e]] = kt()), !Gt(i[n[e]])) {
				process.env.NODE_ENV !== "production" && ft(da(la.IGNORE_OBJ_FLATTEN, { key: n[e] })), a = !0;
				break;
			}
			i = i[n[e]];
		}
		if (a || (Kn(i) ? ur.includes(n[r]) || delete e[t] : (i[n[r]] = e[t], delete e[t])), !Kn(i)) {
			let e = i[n[r]];
			Gt(e) && fa(e);
		}
	}
	return e;
}
function pa(e, t) {
	let { messages: n, __i18n: r, messageResolver: i, flatJson: a } = t, o = Yt(n) ? n : Ht(r) ? kt() : { [e]: kt() };
	if (Ht(r) && r.forEach((e) => {
		if ("locale" in e && "resource" in e) {
			let { locale: t, resource: n } = e;
			t ? (o[t] = o[t] || kt(), nn(n, o[t])) : nn(n, o);
		} else J(e) && nn(JSON.parse(e), o);
	}), i == null && a) for (let e in o) Vt(o, e) && fa(o[e]);
	return o;
}
function ma(e) {
	return e.type;
}
function ha(e, t, n) {
	let r = Gt(t.messages) ? t.messages : kt();
	"__i18nGlobal" in n && (r = pa(e.locale.value, {
		messages: r,
		__i18n: n.__i18nGlobal
	}));
	let i = Object.keys(r);
	if (i.length && i.forEach((t) => {
		e.mergeLocaleMessage(t, r[t]);
	}), Gt(t.datetimeFormats)) {
		let n = Object.keys(t.datetimeFormats);
		n.length && n.forEach((n) => {
			e.mergeDateTimeFormat(n, t.datetimeFormats[n]);
		});
	}
	if (Gt(t.numberFormats)) {
		let n = Object.keys(t.numberFormats);
		n.length && n.forEach((n) => {
			e.mergeNumberFormat(n, t.numberFormats[n]);
		});
	}
}
function ga(e) {
	return d(i, null, e, 0);
}
function _a() {
	let t = "currentInstance";
	return t in e ? e[t] : e.getCurrentInstance();
}
var va = () => [], ya = () => !1, ba = 0;
function xa(e) {
	return ((t, n, r, i) => e(n, r, _a() || void 0, i));
}
function Sa(e = {}) {
	let { __root: t, __injectWithOption: n } = e, r = t === void 0, i = e.flatJson, a = ht ? L : ee, s = !Wt(e.inheritLocale) || e.inheritLocale, c = a(t && s ? t.locale.value : J(e.locale) ? e.locale : Qr), l = a(t && s ? t.fallbackLocale.value : J(e.fallbackLocale) || Ht(e.fallbackLocale) || Yt(e.fallbackLocale) || e.fallbackLocale === !1 ? e.fallbackLocale : c.value), u = a(pa(c.value, e)), d = a(Yt(e.datetimeFormats) ? e.datetimeFormats : { [c.value]: {} }), f = a(Yt(e.numberFormats) ? e.numberFormats : { [c.value]: {} }), p = t ? t.missingWarn : Wt(e.missingWarn) || Tt(e.missingWarn) ? e.missingWarn : !0, m = t ? t.fallbackWarn : Wt(e.fallbackWarn) || Tt(e.fallbackWarn) ? e.fallbackWarn : !0, h = t ? t.fallbackRoot : !Wt(e.fallbackRoot) || e.fallbackRoot, g = !!e.fallbackFormat, _ = Ut(e.missing) ? e.missing : null, v = Ut(e.missing) ? xa(e.missing) : null, y = Ut(e.postTranslation) ? e.postTranslation : null, b = t ? t.warnHtmlMessage : !Wt(e.warnHtmlMessage) || e.warnHtmlMessage, x = !!e.escapeParameter, S = t ? t.modifiers : Yt(e.modifiers) ? e.modifiers : {}, C = e.pluralRules || t && t.pluralRules, w;
	w = (() => {
		r && ui(null);
		let t = {
			version: Xi,
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
		t.datetimeFormats = d.value, t.numberFormats = f.value, t.__datetimeFormatters = Yt(w) ? w.__datetimeFormatters : void 0, t.__numberFormatters = Yt(w) ? w.__numberFormatters : void 0, process.env.NODE_ENV !== "production" && (t.__v_emitter = Yt(w) ? w.__v_emitter : void 0);
		let n = pi(t);
		return r && ui(n), n;
	})(), vi(w, c.value, l.value);
	function T() {
		return [
			c.value,
			l.value,
			u.value,
			d.value,
			f.value
		];
	}
	let E = o({
		get: () => c.value,
		set: (e) => {
			w.locale = e, c.value = e;
		}
	}), D = o({
		get: () => l.value,
		set: (e) => {
			w.fallbackLocale = e, l.value = e, vi(w, c.value, e);
		}
	}), O = o(() => u.value), k = /* #__PURE__*/ o(() => d.value), A = /* #__PURE__*/ o(() => f.value);
	function j() {
		return Ut(y) ? y : null;
	}
	function M(e) {
		y = e, w.postTranslation = e;
	}
	function N() {
		return _;
	}
	function P(e) {
		e !== null && (v = xa(e)), _ = e, w.missing = v;
	}
	function F(e, t) {
		return e !== "translate" || !t.resolvedMessage;
	}
	let I = (e, n, i, a, o, s) => {
		T();
		let c;
		try {
			process.env.NODE_ENV !== "production" || __INTLIFY_PROD_DEVTOOLS__, r || (w.fallbackContext = t ? di() : void 0), c = e(w);
		} finally {
			process.env.NODE_ENV !== "production" || __INTLIFY_PROD_DEVTOOLS__, r || (w.fallbackContext = void 0);
		}
		if (i !== "translate exists" && Ct(c) && c === -1 || i === "translate exists" && !c) {
			let [e, r] = n();
			if (process.env.NODE_ENV !== "production" && t && J(e) && F(i, r) && (h && (hi(m, e) || gi(p, e)) && ft(da(la.FALLBACK_TO_ROOT, {
				key: e,
				type: i
			})), process.env.NODE_ENV !== "production")) {
				let { __v_emitter: t } = w;
				t && h && t.emit("fallback", {
					type: i,
					key: e,
					to: "global",
					groupId: `${i}:${e}`
				});
			}
			return t && h ? a(t) : o(e);
		} else if (s(c)) return c;
		else
 /* istanbul ignore next */
		throw $i(Qi.UNEXPECTED_RETURN_TYPE);
	};
	function R(...e) {
		return I((t) => Reflect.apply(Vi, null, [t, ...e]), () => Ki(...e), "translate", (t) => Reflect.apply(t.t, t, [...e]), (e) => e, (e) => J(e));
	}
	function z(...e) {
		let [t, n, r] = e;
		if (r && !Gt(r)) throw $i(Qi.INVALID_ARGUMENT);
		return R(t, n, Dt({ resolvedMessage: !0 }, r || {}));
	}
	function B(...e) {
		return I((t) => Reflect.apply(Ci, null, [t, ...e]), () => Ti(...e), "datetime format", (t) => Reflect.apply(t.d, t, [...e]), () => "", (e) => J(e) || Ht(e));
	}
	function V(...e) {
		return I((t) => Reflect.apply(Di, null, [t, ...e]), () => ki(...e), "number format", (t) => Reflect.apply(t.n, t, [...e]), () => "", (e) => J(e) || Ht(e));
	}
	function te(e) {
		return e.map((e) => J(e) || Ct(e) || Wt(e) ? ga(String(e)) : e);
	}
	let H = {
		normalize: te,
		interpolate: (e) => e,
		type: "vnode"
	};
	function U(...e) {
		return I((t) => {
			let n, r = t;
			try {
				r.processor = H, n = Reflect.apply(Vi, null, [r, ...e]);
			} finally {
				r.processor = null;
			}
			return n;
		}, () => Ki(...e), "translate", (t) => t[ta](...e), (e) => [ga(e)], (e) => Ht(e));
	}
	function W(...e) {
		return I((t) => Reflect.apply(Di, null, [t, ...e]), () => ki(...e), "number format", (t) => t[ra](...e), va, (e) => J(e) || Ht(e));
	}
	function ne(...e) {
		return I((t) => Reflect.apply(Ci, null, [t, ...e]), () => Ti(...e), "datetime format", (t) => t[na](...e), va, (e) => J(e) || Ht(e));
	}
	function re(e) {
		C = e, w.pluralRules = C;
	}
	function ie(e, t) {
		return I(() => {
			if (!e) return !1;
			let n = J(t) ? t : c.value, r = J(t) ? [n] : Pr(w, l.value, n);
			for (let t = 0; t < r.length; t++) {
				let n = oe(r[t]), i = w.messageResolver(n, e);
				if (i === null && (i = n[e]), Kn(i) || Bi(i) || J(i)) return !0;
			}
			return !1;
		}, () => [e], "translate exists", (n) => Reflect.apply(n.te, n, [e, t]), ya, (e) => Wt(e));
	}
	function K(e) {
		let t = null, n = Pr(w, l.value, c.value);
		for (let r = 0; r < n.length; r++) {
			let i = u.value[n[r]] || {}, a = w.messageResolver(i, e);
			if (a != null) {
				t = a;
				break;
			}
		}
		return t;
	}
	function ae(e) {
		return K(e) ?? (t && t.tm(e) || {});
	}
	function oe(e) {
		return u.value[e] || {};
	}
	function se(e, t) {
		if (i) {
			let n = { [e]: t };
			for (let e in n) Vt(n, e) && fa(n[e]);
			t = n[e];
		}
		u.value[e] = t, w.messages = u.value;
	}
	function ce(e, t) {
		u.value[e] = u.value[e] || {};
		let n = { [e]: t };
		if (i) for (let e in n) Vt(n, e) && fa(n[e]);
		t = n[e], nn(t, u.value[e]), w.messages = u.value;
	}
	function le(e) {
		return d.value[e] || {};
	}
	function ue(e, t) {
		d.value[e] = t, w.datetimeFormats = d.value, Ei(w, e, t);
	}
	function de(e, t) {
		d.value[e] = Dt(d.value[e] || {}, t), w.datetimeFormats = d.value, Ei(w, e, t);
	}
	function fe(e) {
		return f.value[e] || {};
	}
	function pe(e, t) {
		f.value[e] = t, w.numberFormats = f.value, Ai(w, e, t);
	}
	function me(e, t) {
		f.value[e] = Dt(f.value[e] || {}, t), w.numberFormats = f.value, Ai(w, e, t);
	}
	ba++, t && ht && (G(t.locale, (e) => {
		s && (c.value = e, w.locale = e, vi(w, c.value, l.value));
	}), G(t.fallbackLocale, (e) => {
		s && (l.value = e, w.fallbackLocale = e, vi(w, c.value, l.value));
	}));
	let he = {
		id: ba,
		locale: E,
		fallbackLocale: D,
		get inheritLocale() {
			return s;
		},
		set inheritLocale(e) {
			s = e, e && t && (c.value = t.locale.value, l.value = t.fallbackLocale.value, vi(w, c.value, l.value));
		},
		get availableLocales() {
			return Object.keys(u.value).sort();
		},
		messages: O,
		get modifiers() {
			return S;
		},
		get pluralRules() {
			return C || {};
		},
		get isGlobal() {
			return r;
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
		t: R,
		getLocaleMessage: oe,
		setLocaleMessage: se,
		mergeLocaleMessage: ce,
		getPostTranslationHandler: j,
		setPostTranslationHandler: M,
		getMissingHandler: N,
		setMissingHandler: P,
		[oa]: re
	};
	return he.datetimeFormats = k, he.numberFormats = A, he.rt = z, he.te = ie, he.tm = ae, he.d = B, he.n = V, he.getDateTimeFormat = le, he.setDateTimeFormat = ue, he.mergeDateTimeFormat = de, he.getNumberFormat = fe, he.setNumberFormat = pe, he.mergeNumberFormat = me, he[sa] = n, he[ta] = U, he[na] = ne, he[ra] = W, process.env.NODE_ENV !== "production" && (he[ia] = (e) => {
		w.__v_emitter = e;
	}, he[aa] = () => {
		w.__v_emitter = void 0;
	}), he;
}
var Ca;
function wa(e, t) {
	if (Ca) {
		let n;
		t && "groupId" in t && (n = t.groupId, delete t.groupId), Ca.addTimelineEvent({
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
var Ta = {
	tag: { type: [String, Object] },
	locale: { type: String },
	scope: {
		type: String,
		validator: (e) => e === "parent" || e === "global",
		default: "parent"
	},
	i18n: { type: Object }
};
Dt({
	keypath: {
		type: String,
		required: !0
	},
	plural: {
		type: [Number, String],
		validator: (e) => Ct(e) || !isNaN(e)
	}
}, Ta), Dt({
	value: {
		type: Number,
		required: !0
	},
	format: { type: [String, Object] }
}, Ta);
var Ea = /* #__PURE__*/ bt("global-vue-i18n");
function Da(e = {}) {
	let t = _a();
	if (t == null) throw $i(Qi.MUST_BE_CALL_SETUP_TOP);
	if (!t.isCE && t.appContext.app != null && !t.appContext.app.__VUE_I18N_SYMBOL__) throw $i(Qi.NOT_INSTALLED);
	let n = Oa(t), r = Aa(n), i = ma(t), a = ka(e, i);
	if (a === "global") return ha(r, e, i), r;
	if (a === "parent") {
		let i = ja(n, t, e.__useComponent);
		return i ??= (process.env.NODE_ENV !== "production" && ft(da(la.NOT_FOUND_PARENT_SCOPE)), r), i;
	}
	if (a === "isolated") {
		if (n.mode !== "composition") throw $i(Qi.NOT_AVAILABLE_COMPOSITION_IN_LEGACY);
		let i = n, a = Dt({}, e);
		a.__root = ja(n, t) || r;
		let o = Sa(a);
		i.__composerExtend && (o[ca] = i.__composerExtend(o));
		let s = null;
		if (process.env.NODE_ENV !== "production") {
			s = en();
			let e = o;
			e[ia] && e[ia](s), s.on("*", wa);
		}
		return g() && j(() => {
			if (process.env.NODE_ENV !== "production") {
				s && s.off("*", wa);
				let e = o;
				e[aa] && e[aa]();
			}
			let e = o[ca];
			e && (e(), delete o[ca]);
		}), o;
	}
	let o = n, s = o.__getInstance(t);
	if (s == null) {
		let n = Dt({}, e);
		"__i18n" in i && (n.__i18n = i.__i18n), r && (n.__root = r), s = Sa(n), o.__composerExtend && (s[ca] = o.__composerExtend(s)), Na(o, t, s), o.__setInstance(t, s);
	} else process.env.NODE_ENV !== "production" && a === "local" && ft(da(la.DUPLICATE_USE_I18N_CALLING));
	return s;
}
function Oa(e) {
	let t = y(e.isCE ? Ea : e.appContext.app.__VUE_I18N_SYMBOL__);
	/* istanbul ignore if */
	if (!t) throw $i(e.isCE ? Qi.NOT_INSTALLED_WITH_PROVIDE : Qi.UNEXPECTED_ERROR);
	return t;
}
function ka(e, t) {
	return Et(e) ? "__i18n" in t ? "local" : "global" : e.useScope ? e.useScope : "local";
}
function Aa(e) {
	return e.mode === "composition" ? e.global : e.global.__composer;
}
function ja(e, t, n = !1) {
	let r = null, i = t.root, a = Ma(t, n);
	for (; a != null;) {
		let t = e;
		if (e.mode === "composition") r = t.__getInstance(a);
		else if (__VUE_I18N_LEGACY_API__) {
			let e = t.__getInstance(a);
			e != null && (r = e.__composer, n && r && !r[sa] && (r = null));
		}
		if (r != null || i === a) break;
		a = a.parent;
	}
	return r;
}
function Ma(e, t = !1) {
	return e == null ? null : t && e.vnode.ctx || e.parent;
}
function Na(e, t, n) {
	let r = null;
	A(() => {
		if (process.env.NODE_ENV !== "production") {
			t.__VUE_I18N__ = n, r = en();
			let e = n;
			e[ia] && e[ia](r), r.on("*", wa);
		}
	}, t), M(() => {
		let i = n;
		process.env.NODE_ENV !== "production" && (r && r.off("*", wa), i[aa] && i[aa](), delete t.__VUE_I18N__), e.__deleteInstance(t);
		let a = i[ca];
		a && (a(), delete i[ca]);
	}, t);
}
if (Dt({
	value: {
		type: [Number, Date],
		required: !0
	},
	format: { type: [String, Object] }
}, Ta), Zi(), ni(xr), ii(qr), oi(Pr), process.env.NODE_ENV !== "production" || __INTLIFY_PROD_DEVTOOLS__) {
	let e = jt();
	e.__INTLIFY__ = !0, Cr(e.__INTLIFY_DEVTOOLS_GLOBAL_HOOK__);
}
process.env.NODE_ENV, lt.default.extend(ut.default), lt.default.extend(dt.default);
function Pa() {
	let { t: e } = Da(), t = (t, n) => {
		if (!t) return "";
		let r = (0, lt.default)(t.toString());
		return r.isValid() ? r.format(e(`${n}`)) : "";
	}, n = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d+)?(Z|[+-]\d{2}:\d{2})$/;
	return {
		toDate: t,
		toDateISO: (t, r) => {
			let i = t?.toString() || "";
			if (!i) return "";
			if (n.test(i)) return (0, lt.default)(i).isValid() ? i : "";
			let a = lt.default.utc(i, e(`${r}`), !0);
			return a.isValid() ? a.toISOString() : "";
		},
		toEmptyRecord: (e) => Object.fromEntries(e.map((e) => [e.name, ""])),
		toDayJs: (e) => {
			let t = e?.toString() || "";
			if (t === "") return null;
			let n = (0, lt.default)(t);
			return n.isValid() ? n : null;
		}
	};
}
//#endregion
//#region node_modules/.pnpm/interactjs@1.10.27/node_modules/interactjs/dist/interact.min.js
var Fa = /* @__PURE__ */ le(((e, t) => {
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
		var I = function(e) {
			return e.parentNode || e.host;
		};
		function L(e, t) {
			for (var n, r = [], i = e; (n = I(i)) && i !== t && n !== i.ownerDocument;) r.unshift(i), i = n;
			return r;
		}
		function R(e, t, n) {
			for (; S.element(e);) {
				if (F(e, t)) return !0;
				if ((e = P(e)) === n) return F(e, t);
			}
			return !1;
		}
		function z(e) {
			return e.correspondingUseElement || e;
		}
		function B(e) {
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
		function V(e) {
			var t, n = B(e);
			if (!j.isIOS7 && n) {
				var r = {
					x: (t = (t = y(e)) || _).scrollX || t.document.documentElement.scrollLeft,
					y: t.scrollY || t.document.documentElement.scrollTop
				};
				n.left += r.x, n.right += r.x, n.top += r.y, n.bottom += r.y;
			}
			return n;
		}
		function ee(e) {
			for (var t = []; e;) t.push(e), e = P(e);
			return t;
		}
		function te(e) {
			return !!S.string(e) && (k.document.querySelector(e), !0);
		}
		function H(e, t) {
			for (var n in t) e[n] = t[n];
			return e;
		}
		function U(e, t, n) {
			return e === "parent" ? P(n) : e === "self" ? t.getRect(n) : N(n, e);
		}
		function W(e, t, n, r) {
			var i = e;
			return S.string(i) ? i = U(i, t, n) : S.func(i) && (i = i.apply(void 0, r)), S.element(i) && (i = V(i)), i;
		}
		function ne(e) {
			return e && {
				x: "x" in e ? e.x : e.left,
				y: "y" in e ? e.y : e.top
			};
		}
		function G(e) {
			return !e || "x" in e && "y" in e || ((e = H({}, e)).x = e.left || 0, e.y = e.top || 0, e.width = e.width || (e.right || 0) - e.x, e.height = e.height || (e.bottom || 0) - e.y), e;
		}
		function re(e, t, n) {
			e.left && (t.left += n.x), e.right && (t.right += n.x), e.top && (t.top += n.y), e.bottom && (t.bottom += n.y), t.width = t.right - t.left, t.height = t.bottom - t.top;
		}
		function ie(e, t, n) {
			var r = n && e.options[n];
			return ne(W(r && r.origin || e.options.origin, e, t, [e && t])) || {
				x: 0,
				y: 0
			};
		}
		function K(e, t) {
			var n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : function(e) {
				return !0;
			}, r = arguments.length > 3 ? arguments[3] : void 0;
			if (r ||= {}, S.string(e) && e.search(" ") !== -1 && (e = ae(e)), S.array(e)) return e.forEach((function(e) {
				return K(e, t, n, r);
			})), r;
			if (S.object(e) && (t = e, e = ""), S.func(t) && n(e)) r[e] = r[e] || [], r[e].push(t);
			else if (S.array(t)) for (var i = 0, a = t; i < a.length; i++) {
				var o = a[i];
				K(e, o, n, r);
			}
			else if (S.object(t)) for (var s in t) K(ae(s).map((function(t) {
				return `${e}${t}`;
			})), t[s], n, r);
			return r;
		}
		function ae(e) {
			return e.trim().split(/ +/);
		}
		var oe = function(e, t) {
			return Math.sqrt(e * e + t * t);
		}, se = ["webkit", "moz"];
		function ce(e, t) {
			e.__set ||= {};
			var n = function(n) {
				if (se.some((function(e) {
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
		function le(e, t) {
			e.page = e.page || {}, e.page.x = t.page.x, e.page.y = t.page.y, e.client = e.client || {}, e.client.x = t.client.x, e.client.y = t.client.y, e.timeStamp = t.timeStamp;
		}
		function ue(e) {
			e.page.x = 0, e.page.y = 0, e.client.x = 0, e.client.y = 0;
		}
		function de(e) {
			return e instanceof k.Event || e instanceof k.Touch;
		}
		function fe(e, t, n) {
			return e ||= "page", (n ||= {}).x = t[e + "X"], n.y = t[e + "Y"], n;
		}
		function pe(e, t) {
			return t ||= {
				x: 0,
				y: 0
			}, j.isOperaMobile && de(e) ? (fe("screen", e, t), t.x += window.scrollX, t.y += window.scrollY) : fe("page", e, t), t;
		}
		function me(e) {
			return S.number(e.pointerId) ? e.pointerId : e.identifier;
		}
		function he(e, t, n) {
			var r = t.length > 1 ? _e(t) : t[0];
			pe(r, e.page), function(e, t) {
				t ||= {}, j.isOperaMobile && de(e) ? fe("screen", e, t) : fe("client", e, t);
			}(r, e.client), e.timeStamp = n;
		}
		function ge(e) {
			var t = [];
			return S.array(e) ? (t[0] = e[0], t[1] = e[1]) : e.type === "touchend" ? e.touches.length === 1 ? (t[0] = e.touches[0], t[1] = e.changedTouches[0]) : e.touches.length === 0 && (t[0] = e.changedTouches[0], t[1] = e.changedTouches[1]) : (t[0] = e.touches[0], t[1] = e.touches[1]), t;
		}
		function _e(e) {
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
		function ve(e) {
			if (!e.length) return null;
			var t = ge(e), n = Math.min(t[0].pageX, t[1].pageX), r = Math.min(t[0].pageY, t[1].pageY), i = Math.max(t[0].pageX, t[1].pageX), a = Math.max(t[0].pageY, t[1].pageY);
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
		function ye(e, t) {
			var n = t + "X", r = t + "Y", i = ge(e);
			return oe(i[0][n] - i[1][n], i[0][r] - i[1][r]);
		}
		function be(e, t) {
			var n = t + "X", r = t + "Y", i = ge(e), a = i[1][n] - i[0][n], o = i[1][r] - i[0][r];
			return 180 * Math.atan2(o, a) / Math.PI;
		}
		function xe(e) {
			return S.string(e.pointerType) ? e.pointerType : S.number(e.pointerType) ? [
				void 0,
				void 0,
				"touch",
				"pen",
				"mouse"
			][e.pointerType] : /touch/.test(e.type || "") || e instanceof k.Touch ? "touch" : "mouse";
		}
		function Se(e) {
			var t = S.func(e.composedPath) ? e.composedPath() : e.path;
			return [z(t ? t[0] : e.target), z(e.currentTarget)];
		}
		var Ce = function() {
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
		Object.defineProperty(Ce.prototype, "interaction", {
			get: function() {
				return this._interaction._proxy;
			},
			set: function() {}
		});
		var we = function(e, t) {
			for (var n = 0; n < t.length; n++) {
				var r = t[n];
				e.push(r);
			}
			return e;
		}, Te = function(e) {
			return we([], e);
		}, Ee = function(e, t) {
			for (var n = 0; n < e.length; n++) if (t(e[n], n, e)) return n;
			return -1;
		}, De = function(e, t) {
			return e[Ee(e, t)];
		}, Oe = function(e) {
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
							var r = t.activeDrops, i = Ee(r, (function(t) {
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
		}(Ce);
		function ke(e, t) {
			for (var n = 0, r = e.slice(); n < r.length; n++) {
				var i = r[n], a = i.dropzone, o = i.element;
				t.dropzone = a, t.target = o, a.fire(t), t.propagationStopped = t.immediatePropagationStopped = !1;
			}
		}
		function Ae(e, t) {
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
		function je(e, t, n) {
			for (var r = e.dropState, i = e.interactable, a = e.element, o = [], s = 0, c = r.activeDrops; s < c.length; s++) {
				var l = c[s], u = l.dropzone, d = l.element, f = l.rect, p = u.dropCheck(t, n, i, a, d, f);
				o.push(p ? d : null);
			}
			var m = function(e) {
				for (var t, n, r, i = [], a = 0; a < e.length; a++) {
					var o = e[a], s = e[t];
					if (o && a !== t) if (s) {
						var c = I(o), l = I(s);
						if (c !== o.ownerDocument) if (l !== o.ownerDocument) if (c !== l) {
							i = i.length ? i : L(s);
							var u = void 0;
							if (s instanceof k.HTMLElement && o instanceof k.SVGElement && !(o instanceof k.SVGSVGElement)) {
								if (o === l) continue;
								u = o.ownerSVGElement;
							} else u = o;
							for (var d = L(u, s.ownerDocument), f = 0; d[f] && d[f] === i[f];) f++;
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
		function Me(e, t, n) {
			var r = e.dropState, i = {
				enter: null,
				leave: null,
				activate: null,
				deactivate: null,
				move: null,
				drop: null
			};
			return n.type === "dragstart" && (i.activate = new Oe(r, n, "dropactivate"), i.activate.target = null, i.activate.dropzone = null), n.type === "dragend" && (i.deactivate = new Oe(r, n, "dropdeactivate"), i.deactivate.target = null, i.deactivate.dropzone = null), r.rejected || (r.cur.element !== r.prev.element && (r.prev.dropzone && (i.leave = new Oe(r, n, "dragleave"), n.dragLeave = i.leave.target = r.prev.element, n.prevDropzone = i.leave.dropzone = r.prev.dropzone), r.cur.dropzone && (i.enter = new Oe(r, n, "dragenter"), n.dragEnter = r.cur.element, n.dropzone = r.cur.dropzone)), n.type === "dragend" && r.cur.dropzone && (i.drop = new Oe(r, n, "drop"), n.dropzone = r.cur.dropzone, n.relatedTarget = r.cur.element), n.type === "dragmove" && r.cur.dropzone && (i.move = new Oe(r, n, "dropmove"), n.dropzone = r.cur.dropzone)), i;
		}
		function Ne(e, t) {
			var n = e.dropState, r = n.activeDrops, i = n.cur, a = n.prev;
			t.leave && a.dropzone.fire(t.leave), t.enter && i.dropzone.fire(t.enter), t.move && i.dropzone.fire(t.move), t.drop && i.dropzone.fire(t.drop), t.deactivate && ke(r, t.deactivate), n.prev.dropzone = i.dropzone, n.prev.element = i.element;
		}
		function Pe(e, t) {
			var n = e.interaction, r = e.iEvent, i = e.event;
			if (r.type === "dragmove" || r.type === "dragend") {
				var a = n.dropState;
				t.dynamicDrop && (a.activeDrops = Ae(t, n.element));
				var o = r, s = je(n, o, i);
				a.rejected = a.rejected && !!s && s.dropzone === a.cur.dropzone && s.element === a.cur.element, a.cur.dropzone = s && s.dropzone, a.cur.element = s && s.element, a.events = Me(n, 0, o);
			}
		}
		var Fe = {
			id: "actions/drop",
			install: function(e) {
				var t = e.actions, n = e.interactStatic, r = e.Interactable, i = e.defaults;
				e.usePlugin(E), r.prototype.dropzone = function(e) {
					return function(e, t) {
						if (S.object(t)) {
							if (e.options.drop.enabled = !1 !== t.enabled, t.listeners) {
								var n = K(t.listeners), r = Object.keys(n).reduce((function(e, t) {
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
							var l = ie(r, i, "drag"), u = pe(t);
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
				}, H(t.phaselessTypes, {
					dragenter: !0,
					dragleave: !0,
					dropactivate: !0,
					dropdeactivate: !0,
					dropmove: !0,
					drop: !0
				}), t.methodDict.drop = "dropzone", e.dynamicDrop = !1, i.actions.drop = Fe.defaults;
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
						i.activeDrops = [], i.events = {}, i.activeDrops = Ae(t, n.element), i.events = Me(n, 0, r), i.events.activate && (ke(i.activeDrops, i.events.activate), t.fire("actions/drop:start", {
							interaction: n,
							dragEvent: r
						}));
					}
				},
				"interactions:action-move": Pe,
				"interactions:after-action-move": function(e, t) {
					var n = e.interaction, r = e.iEvent;
					if (n.prepared.name === "drag") {
						var i = n.dropState;
						Ne(n, i.events), t.fire("actions/drop:move", {
							interaction: n,
							dragEvent: r
						}), i.events = {};
					}
				},
				"interactions:action-end": function(e, t) {
					if (e.interaction.prepared.name === "drag") {
						var n = e.interaction, r = e.iEvent;
						Pe(e, t), Ne(n, n.dropState.events), t.fire("actions/drop:end", {
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
			getActiveDrops: Ae,
			getDrop: je,
			getDropEvents: Me,
			fireDropEvents: Ne,
			filterEventType: function(e) {
				return e.search("drag") === 0 || e.search("drop") === 0;
			},
			defaults: {
				enabled: !1,
				accept: null,
				overlap: "pointer"
			}
		}, Ie = Fe;
		function Le(e) {
			var t = e.interaction, n = e.iEvent, r = e.phase;
			if (t.prepared.name === "gesture") {
				var i = t.pointers.map((function(e) {
					return e.pointer;
				})), a = r === "start", o = r === "end", s = t.interactable.options.deltaSource;
				if (n.touches = [i[0], i[1]], a) n.distance = ye(i, s), n.box = ve(i), n.scale = 1, n.ds = 0, n.angle = be(i, s), n.da = 0, t.gesture.startDistance = n.distance, t.gesture.startAngle = n.angle;
				else if (o || t.pointers.length < 2) {
					var c = t.prevEvent;
					n.distance = c.distance, n.box = c.box, n.scale = c.scale, n.ds = 0, n.angle = c.angle, n.da = 0;
				} else n.distance = ye(i, s), n.box = ve(i), n.scale = n.distance / t.gesture.startDistance, n.angle = be(i, s), n.ds = n.scale - t.gesture.scale, n.da = n.angle - t.gesture.angle;
				t.gesture.distance = n.distance, t.gesture.angle = n.angle, S.number(n.scale) && n.scale !== Infinity && !isNaN(n.scale) && (t.gesture.scale = n.scale);
			}
		}
		var Re = {
			id: "actions/gesture",
			before: ["actions/drag", "actions/resize"],
			install: function(e) {
				var t = e.actions, n = e.Interactable, r = e.defaults;
				n.prototype.gesturable = function(e) {
					return S.object(e) ? (this.options.gesture.enabled = !1 !== e.enabled, this.setPerAction("gesture", e), this.setOnEvents("gesture", e), this) : S.bool(e) ? (this.options.gesture.enabled = e, this) : this.options.gesture;
				}, t.map.gesture = Re, t.methodDict.gesture = "gesturable", r.actions.gesture = Re.defaults;
			},
			listeners: {
				"interactions:action-start": Le,
				"interactions:action-move": Le,
				"interactions:action-end": Le,
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
		}, ze = Re;
		function Be(e, t, n, r, i, a, o) {
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
			return !!S.element(r) && (S.element(t) ? t === r : R(r, t, i));
		}
		function Ve(e) {
			var t = e.iEvent, n = e.interaction;
			if (n.prepared.name === "resize" && n.resizeAxes) {
				var r = t;
				n.interactable.options.resize.square ? (n.resizeAxes === "y" ? r.delta.x = r.delta.y : r.delta.y = r.delta.x, r.axes = "xy") : (r.axes = n.resizeAxes, n.resizeAxes === "x" ? r.delta.y = 0 : n.resizeAxes === "y" && (r.delta.x = 0));
			}
		}
		var He, Ue, We = {
			id: "actions/resize",
			before: ["actions/drag"],
			install: function(e) {
				var t = e.actions, n = e.browser, r = e.Interactable, i = e.defaults;
				We.cursors = function(e) {
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
				}(n), We.defaultMargin = n.supportsTouch || n.supportsPointerEvent ? 20 : 10, r.prototype.resizable = function(t) {
					return function(e, t, n) {
						return S.object(t) ? (e.options.resize.enabled = !1 !== t.enabled, e.setPerAction("resize", t), e.setOnEvents("resize", t), S.string(t.axis) && /^x$|^y$|^xy$/.test(t.axis) ? e.options.resize.axis = t.axis : t.axis === null && (e.options.resize.axis = n.defaults.actions.resize.axis), S.bool(t.preserveAspectRatio) ? e.options.resize.preserveAspectRatio = t.preserveAspectRatio : S.bool(t.square) && (e.options.resize.square = t.square), e) : S.bool(t) ? (e.options.resize.enabled = t, e) : e.options.resize;
					}(this, t, e);
				}, t.map.resize = We, t.methodDict.resize = "resizable", i.actions.resize = We.defaults;
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
								start: H({}, i),
								corrected: H({}, i),
								previous: H({}, i),
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
					})(e), Ve(e);
				},
				"interactions:action-move": function(e) {
					(function(e) {
						var t = e.iEvent, n = e.interaction;
						if (n.prepared.name === "resize" && n.prepared.edges) {
							var r = t, i = n.interactable.options.resize.invert, a = i === "reposition" || i === "negate", o = n.rect, s = n._rects, c = s.start, l = s.corrected, u = s.delta, d = s.previous;
							if (H(d, l), a) {
								if (H(l, o), i === "reposition") {
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
					})(e), Ve(e);
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
						var o = H({}, t.coords.cur.page), s = n.options.resize;
						if (s && s.enabled && (!t.pointerIsDown || !/mouse|pointer/.test(t.pointerType) || (a & s.mouseButtons) != 0)) {
							if (S.object(s.edges)) {
								var c = {
									left: !1,
									right: !1,
									top: !1,
									bottom: !1
								};
								for (var l in c) c[l] = Be(l, s.edges[l], o, t._latestPointer.eventTarget, r, i, s.margin || We.defaultMargin);
								c.left = c.left && !c.right, c.top = c.top && !c.bottom, (c.left || c.right || c.top || c.bottom) && (e.action = {
									name: "resize",
									edges: c
								});
							} else {
								var u = s.axis !== "y" && o.x > i.right - We.defaultMargin, d = s.axis !== "x" && o.y > i.bottom - We.defaultMargin;
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
				var t = e.edges, n = e.axis, r = e.name, i = We.cursors, a = null;
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
		}, Ge = We, Ke = {
			id: "actions",
			install: function(e) {
				e.usePlugin(ze), e.usePlugin(Ge), e.usePlugin(E), e.usePlugin(Ie);
			}
		}, qe = 0, Je = {
			request: function(e) {
				return He(e);
			},
			cancel: function(e) {
				return Ue(e);
			},
			init: function(e) {
				if (He = e.requestAnimationFrame, Ue = e.cancelAnimationFrame, !He) for (var t = [
					"ms",
					"moz",
					"webkit",
					"o"
				], n = 0; n < t.length; n++) {
					var r = t[n];
					He = e[`${r}RequestAnimationFrame`], Ue = e[`${r}CancelAnimationFrame`] || e[`${r}CancelRequestAnimationFrame`];
				}
				He &&= He.bind(e), Ue &&= Ue.bind(e), He || (He = function(t) {
					var n = Date.now(), r = Math.max(0, 16 - (n - qe)), i = e.setTimeout((function() {
						t(n + r);
					}), r);
					return qe = n + r, i;
				}, Ue = function(e) {
					return clearTimeout(e);
				});
			}
		}, q = {
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
				q.isScrolling = !0, Je.cancel(q.i), e.autoScroll = q, q.interaction = e, q.prevTime = q.now(), q.i = Je.request(q.scroll);
			},
			stop: function() {
				q.isScrolling = !1, q.interaction && (q.interaction.autoScroll = null), Je.cancel(q.i);
			},
			scroll: function() {
				var e = q.interaction, t = e.interactable, n = e.element, r = e.prepared.name, i = t.options[r].autoScroll, a = Ye(i.container, t, n), o = q.now(), s = (o - q.prevTime) / 1e3, c = i.speed * s;
				if (c >= 1) {
					var l = {
						x: q.x * c,
						y: q.y * c
					};
					if (l.x || l.y) {
						var u = Xe(a);
						S.window(a) ? a.scrollBy(l.x, l.y) : a && (a.scrollLeft += l.x, a.scrollTop += l.y);
						var d = Xe(a), f = {
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
					q.prevTime = o;
				}
				q.isScrolling && (Je.cancel(q.i), q.i = Je.request(q.scroll));
			},
			check: function(e, t) {
				return e.options[t].autoScroll?.enabled;
			},
			onInteractionMove: function(e) {
				var t = e.interaction, n = e.pointer;
				if (t.interacting() && q.check(t.interactable, t.prepared.name)) if (t.simulation) q.x = q.y = 0;
				else {
					var r, i, a, o, s = t.interactable, c = t.element, l = t.prepared.name, u = s.options[l].autoScroll, d = Ye(u.container, s, c);
					if (S.window(d)) o = n.clientX < q.margin, r = n.clientY < q.margin, i = n.clientX > d.innerWidth - q.margin, a = n.clientY > d.innerHeight - q.margin;
					else {
						var f = B(d);
						o = n.clientX < f.left + q.margin, r = n.clientY < f.top + q.margin, i = n.clientX > f.right - q.margin, a = n.clientY > f.bottom - q.margin;
					}
					q.x = i ? 1 : o ? -1 : 0, q.y = a ? 1 : r ? -1 : 0, q.isScrolling || (q.margin = u.margin, q.speed = u.speed, q.start(t));
				}
			}
		};
		function Ye(e, t, n) {
			return (S.string(e) ? U(e, t, n) : e) || y(n);
		}
		function Xe(e) {
			return S.window(e) && (e = window.document.body), {
				x: e.scrollLeft,
				y: e.scrollTop
			};
		}
		var Ze = {
			id: "auto-scroll",
			install: function(e) {
				var t = e.defaults, n = e.actions;
				e.autoScroll = q, q.now = function() {
					return e.now();
				}, n.phaselessTypes.autoscroll = !0, t.perAction.autoScroll = q.defaults;
			},
			listeners: {
				"interactions:new": function(e) {
					e.interaction.autoScroll = null;
				},
				"interactions:destroy": function(e) {
					e.interaction.autoScroll = null, q.stop(), q.interaction &&= null;
				},
				"interactions:stop": q.stop,
				"interactions:action-move": function(e) {
					return q.onInteractionMove(e);
				}
			}
		};
		function Qe(e, t) {
			var n = !1;
			return function() {
				return n ||= (_.console.warn(t), !0), e.apply(this, arguments);
			};
		}
		function $e(e, t) {
			return e.name = t.name, e.axis = t.axis, e.edges = t.edges, e;
		}
		function et(e) {
			return S.bool(e) ? (this.options.styleCursor = e, this) : e === null ? (delete this.options.styleCursor, this) : this.options.styleCursor;
		}
		function tt(e) {
			return S.func(e) ? (this.options.actionChecker = e, this) : e === null ? (delete this.options.actionChecker, this) : this.options.actionChecker;
		}
		var nt = {
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
				}, t.prototype.ignoreFrom = Qe((function(e) {
					return this._backCompatOption("ignoreFrom", e);
				}), "Interactable.ignoreFrom() has been deprecated. Use Interactble.draggable({ignoreFrom: newValue})."), t.prototype.allowFrom = Qe((function(e) {
					return this._backCompatOption("allowFrom", e);
				}), "Interactable.allowFrom() has been deprecated. Use Interactble.draggable({allowFrom: newValue})."), t.prototype.actionChecker = tt, t.prototype.styleCursor = et;
			}
		};
		function rt(e, t, n, r, i) {
			return t.testIgnoreAllow(t.options[e.name], n, r) && t.options[e.name].enabled && st(t, n, e, i) ? e : null;
		}
		function it(e, t, n, r, i, a, o) {
			for (var s = 0, c = r.length; s < c; s++) {
				var l = r[s], u = i[s], d = l.getAction(t, n, e, u);
				if (d) {
					var f = rt(d, l, u, a, o);
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
		function at(e, t, n, r, i) {
			var a = [], o = [], s = r;
			function c(e) {
				a.push(e), o.push(s);
			}
			for (; S.element(s);) {
				a = [], o = [], i.interactables.forEachMatch(s, c);
				var l = it(e, t, n, a, o, r, i);
				if (l.action && !l.interactable.options[l.action.name].manualStart) return l;
				s = P(s);
			}
			return {
				action: null,
				interactable: null,
				element: null
			};
		}
		function ot(e, t, n) {
			var r = t.action, i = t.interactable, a = t.element;
			r ||= { name: null }, e.interactable = i, e.element = a, $e(e.prepared, r), e.rect = i && r.name ? i.getRect(a) : null, ut(e, n), n.fire("autoStart:prepared", { interaction: e });
		}
		function st(e, t, n, r) {
			var i = e.options, a = i[n.name].max, o = i[n.name].maxPerElement, s = r.autoStart.maxInteractions, c = 0, l = 0, u = 0;
			if (!(a && o && s)) return !1;
			for (var d = 0, f = r.interactions.list; d < f.length; d++) {
				var p = f[d], m = p.prepared.name;
				if (p.interacting() && (++c >= s || p.interactable === e && ((l += +(m === n.name)) >= a || p.element === t && (u++, m === n.name && u >= o)))) return !1;
			}
			return s > 0;
		}
		function ct(e, t) {
			return S.number(e) ? (t.autoStart.maxInteractions = e, this) : t.autoStart.maxInteractions;
		}
		function lt(e, t, n) {
			var r = n.autoStart.cursorElement;
			r && r !== e && (r.style.cursor = ""), e.ownerDocument.documentElement.style.cursor = t, e.style.cursor = t, n.autoStart.cursorElement = t ? e : null;
		}
		function ut(e, t) {
			var n = e.interactable, r = e.element, i = e.prepared;
			if (e.pointerType === "mouse" && n && n.options.styleCursor) {
				var a = "";
				if (i.name) {
					var o = n.options[i.name].cursorChecker;
					a = S.func(o) ? o(i, n, r, e._interacting) : t.actions.map[i.name].getCursor(i);
				}
				lt(e.element, a || "", t);
			} else t.autoStart.cursorElement && lt(t.autoStart.cursorElement, "", t);
		}
		var dt = {
			id: "auto-start/base",
			before: ["actions"],
			install: function(e) {
				var t = e.interactStatic, n = e.defaults;
				e.usePlugin(nt), n.base.actionChecker = null, n.base.styleCursor = !0, H(n.perAction, {
					manualStart: !1,
					max: Infinity,
					maxPerElement: 1,
					allowFrom: null,
					ignoreFrom: null,
					mouseButtons: 1
				}), t.maxInteractions = function(t) {
					return ct(t, e);
				}, e.autoStart = {
					maxInteractions: Infinity,
					withinInteractionLimit: st,
					cursorElement: null
				};
			},
			listeners: {
				"interactions:down": function(e, t) {
					var n = e.interaction, r = e.pointer, i = e.event, a = e.eventTarget;
					n.interacting() || ot(n, at(n, r, i, a, t), t);
				},
				"interactions:move": function(e, t) {
					(function(e, t) {
						var n = e.interaction, r = e.pointer, i = e.event, a = e.eventTarget;
						n.pointerType !== "mouse" || n.pointerIsDown || n.interacting() || ot(n, at(n, r, i, a, t), t);
					})(e, t), function(e, t) {
						var n = e.interaction;
						if (n.pointerIsDown && !n.interacting() && n.pointerWasMoved && n.prepared.name) {
							t.fire("autoStart:before-start", e);
							var r = n.interactable, i = n.prepared.name;
							i && r && (r.options[i].manualStart || !st(r, n.element, n.prepared, t) ? n.stop() : (n.start(n.prepared, r, n.element), ut(n, t)));
						}
					}(e, t);
				},
				"interactions:stop": function(e, t) {
					var n = e.interaction, r = n.interactable;
					r && r.options.styleCursor && lt(n.element, "", t);
				}
			},
			maxInteractions: ct,
			withinInteractionLimit: st,
			validateAction: rt
		}, ft = {
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
									}(u, e) && dt.validateAction(a, e, d, r, t)) return e;
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
		function pt(e) {
			var t = e.prepared && e.prepared.name;
			if (!t) return null;
			var n = e.interactable.options;
			return n[t].hold || n[t].delay;
		}
		var mt = {
			id: "auto-start/hold",
			install: function(e) {
				var t = e.defaults;
				e.usePlugin(dt), t.perAction.hold = 0, t.perAction.delay = 0;
			},
			listeners: {
				"interactions:new": function(e) {
					e.interaction.autoStartHoldTimer = null;
				},
				"autoStart:prepared": function(e) {
					var t = e.interaction, n = pt(t);
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
					pt(t) > 0 && (t.prepared.name = null);
				}
			},
			getHoldDuration: pt
		}, ht = {
			id: "auto-start",
			install: function(e) {
				e.usePlugin(dt), e.usePlugin(mt), e.usePlugin(ft);
			}
		}, gt = function(e) {
			return /^(always|never|auto)$/.test(e) ? (this.options.preventDefault = e, this) : S.bool(e) ? (this.options.preventDefault = e ? "always" : "never", this) : this.options.preventDefault;
		};
		function _t(e) {
			var t = e.interaction, n = e.event;
			t.interactable && t.interactable.checkAndPreventDefault(n);
		}
		var vt = {
			id: "core/interactablePreventDefault",
			install: function(e) {
				var t = e.Interactable;
				t.prototype.preventDefault = gt, t.prototype.checkAndPreventDefault = function(t) {
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
				return e[`interactions:${t}`] = _t, e;
			}), {})
		};
		function yt(e, t) {
			if (t.phaselessTypes[e]) return !0;
			for (var n in t.map) if (e.indexOf(n) === 0 && e.substr(n.length) in t.phases) return !0;
			return !1;
		}
		function bt(e) {
			var t = {};
			for (var n in e) {
				var r = e[n];
				S.plainObject(r) ? t[n] = bt(r) : S.array(r) ? t[n] = Te(r) : t[n] = r;
			}
			return t;
		}
		var xt = function() {
			function e(t) {
				i(this, e), this.states = [], this.startOffset = {
					left: 0,
					right: 0,
					top: 0,
					bottom: 0
				}, this.startDelta = void 0, this.result = void 0, this.endResult = void 0, this.startEdges = void 0, this.edges = void 0, this.interaction = void 0, this.interaction = t, this.result = St(), this.edges = {
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
						this.prepareStates(o), this.startEdges = H({}, a.edges), this.edges = H({}, this.startEdges), this.startOffset = (n = a.rect, r = t, n ? {
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
						return this.result = St(), this.startAll(s), this.result = this.setAll(s);
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
						e.coords = H({}, e.pageCoords), e.rect = H({}, i), e.edges = H({}, a);
						for (var o = r ? this.states.slice(r) : this.states, s = St(e.coords, e.rect), c = 0; c < o.length; c++) {
							var l, u = o[c], d = u.options, f = H({}, e.coords), p = null;
							(l = u.methods) != null && l.set && this.shouldDo(d, n, t) && (e.state = u, p = u.methods.set(e), re(e.edges, e.rect, {
								x: e.coords.x - f.x,
								y: e.coords.y - f.y
							})), s.eventProps.push(p);
						}
						H(this.edges, e.edges), s.delta.x = e.coords.x - e.pageCoords.x, s.delta.y = e.coords.y - e.pageCoords.y, s.rectDelta.left = e.rect.left - i.left, s.rectDelta.right = e.rect.right - i.right, s.rectDelta.top = e.rect.top - i.top, s.rectDelta.bottom = e.rect.bottom - i.bottom;
						var m = this.result.coords, h = this.result.rect;
						return m && h && (s.changed = s.rect.left !== h.left || s.rect.right !== h.right || s.rect.top !== h.top || s.rect.bottom !== h.bottom || m.x !== s.coords.x || m.y !== s.coords.y), s;
					}
				},
				{
					key: "applyToInteraction",
					value: function(e) {
						var t = this.interaction, n = e.phase, r = t.coords.cur, i = t.coords.start, a = this.result, o = this.startDelta, s = a.delta;
						n === "start" && H(this.startDelta, a.delta);
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
							var n = H({
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
							return bt(e);
						})), this.result = St(H({}, e.result.coords), H({}, e.result.rect));
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
		function St(e, t) {
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
		function Ct(e, t) {
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
		function wt(e) {
			var t = e.iEvent, n = e.interaction.modification.result;
			n && (t.modifiers = n.eventProps);
		}
		var Tt = {
			id: "modifiers/base",
			before: ["actions"],
			install: function(e) {
				e.defaults.perAction.modifiers = [];
			},
			listeners: {
				"interactions:new": function(e) {
					var t = e.interaction;
					t.modification = new xt(t);
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
				"interactions:action-start": wt,
				"interactions:action-move": wt,
				"interactions:action-end": wt,
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
		}, Et = {
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
		}, Dt = function(e) {
			c(n, e);
			var t = f(n);
			function n(e, r, a, o, s, c, l) {
				var u;
				i(this, n), (u = t.call(this, e)).relatedTarget = null, u.screenX = void 0, u.screenY = void 0, u.button = void 0, u.buttons = void 0, u.ctrlKey = void 0, u.shiftKey = void 0, u.altKey = void 0, u.metaKey = void 0, u.page = void 0, u.client = void 0, u.delta = void 0, u.rect = void 0, u.x0 = void 0, u.y0 = void 0, u.t0 = void 0, u.dt = void 0, u.duration = void 0, u.clientX0 = void 0, u.clientY0 = void 0, u.velocity = void 0, u.speed = void 0, u.swipe = void 0, u.axes = void 0, u.preEnd = void 0, s ||= e.element;
				var f = e.interactable, p = (f && f.options || Et).deltaSource, m = ie(f, s, a), h = o === "start", g = o === "end", _ = h ? d(u) : e.prevEvent, v = h ? e.coords.start : g ? {
					page: _.page,
					client: _.client,
					timeStamp: e.coords.cur.timeStamp
				} : e.coords.cur;
				return u.page = H({}, v.page), u.client = H({}, v.client), u.rect = H({}, e.rect), u.timeStamp = v.timeStamp, g || (u.page.x -= m.x, u.page.y -= m.y, u.client.x -= m.x, u.client.y -= m.y), u.ctrlKey = r.ctrlKey, u.altKey = r.altKey, u.shiftKey = r.shiftKey, u.metaKey = r.metaKey, u.button = r.button, u.buttons = r.buttons, u.target = s, u.currentTarget = s, u.preEnd = c, u.type = l || a + (o || ""), u.interactable = f, u.t0 = h ? e.pointers[e.pointers.length - 1].downTime : _.t0, u.x0 = e.coords.start.page.x - m.x, u.y0 = e.coords.start.page.y - m.y, u.clientX0 = e.coords.start.client.x - m.x, u.clientY0 = e.coords.start.client.y - m.y, u.delta = h || g ? {
					x: 0,
					y: 0
				} : {
					x: u[p].x - _[p].x,
					y: u[p].y - _[p].y
				}, u.dt = e.coords.delta.timeStamp, u.duration = u.timeStamp - u.t0, u.velocity = H({}, e.coords.velocity[p]), u.speed = oe(u.velocity.x, u.velocity.y), u.swipe = g || o === "inertiastart" ? u.getSwipe() : null, u;
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
		}(Ce);
		Object.defineProperties(Dt.prototype, {
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
		var Ot = o((function e(t, n, r, a, o) {
			i(this, e), this.id = void 0, this.pointer = void 0, this.event = void 0, this.downTime = void 0, this.downTarget = void 0, this.id = t, this.pointer = n, this.event = r, this.downTime = a, this.downTarget = o;
		})), kt = function(e) {
			return e.interactable = "", e.element = "", e.prepared = "", e.pointerIsDown = "", e.pointerWasMoved = "", e._proxy = "", e;
		}({}), At = function(e) {
			return e.start = "", e.move = "", e.end = "", e.stop = "", e.interacting = "", e;
		}({}), jt = 0, Mt = function() {
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
				}, this.prevEvent = null, this.pointerIsDown = !1, this.pointerWasMoved = !1, this._interacting = !1, this._ending = !1, this._stopped = !0, this._proxy = void 0, this.simulation = null, this.doMove = Qe((function(e) {
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
				}, this._id = jt++, this._scopeFire = a, this.pointerType = r;
				var o = this;
				this._proxy = {};
				var s = function(e) {
					Object.defineProperty(n._proxy, e, { get: function() {
						return o[e];
					} });
				};
				for (var c in kt) s(c);
				var l = function(e) {
					Object.defineProperty(n._proxy, e, { value: function() {
						return o[e].apply(o, arguments);
					} });
				};
				for (var u in At) l(u);
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
						return !(this.interacting() || !this.pointerIsDown || this.pointers.length < (e.name === "gesture" ? 2 : 1) || !t.options[e.name].enabled) && ($e(this.prepared, e), this.interactable = t, this.element = n, this.rect = t.getRect(n), this.edges = this.prepared.edges ? H({}, this.prepared.edges) : {
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
						this.pointerIsDown && !this.pointerWasMoved && (r = this.coords.cur.client.x - this.coords.start.client.x, i = this.coords.cur.client.y - this.coords.start.client.y, this.pointerWasMoved = oe(r, i) > this.pointerMoveTolerance);
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
						a || (o = this.coords.velocity, s = this.coords.delta, c = Math.max(s.timeStamp / 1e3, .001), o.page.x = s.page.x / c, o.page.y = s.page.y / c, o.client.x = s.client.x / c, o.client.y = s.client.y / c, o.timeStamp = c), this._scopeFire("interactions:move", u), a || this.simulation || (this.interacting() && (u.type = null, this.move(u)), this.pointerWasMoved && le(this.coords.prev, this.coords.cur));
					}
				},
				{
					key: "move",
					value: function(e) {
						e && e.event || ue(this.coords.delta), (e = H({
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
						var t = me(e);
						return this.pointerType === "mouse" || this.pointerType === "pen" ? this.pointers.length - 1 : Ee(this.pointers, (function(e) {
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
						var i, a, o, s = me(e), c = this.getPointerIndex(e), l = this.pointers[c];
						return r = !1 !== r && (r || /(down|start)$/i.test(t.type)), l ? l.pointer = e : (l = new Ot(s, e, t, null, null), c = this.pointers.length, this.pointers.push(l)), he(this.coords.cur, this.pointers.map((function(e) {
							return e.pointer;
						})), this._now()), i = this.coords.delta, a = this.coords.prev, o = this.coords.cur, i.page.x = o.page.x - a.page.x, i.page.y = o.page.y - a.page.y, i.client.x = o.client.x - a.client.x, i.client.y = o.client.y - a.client.y, i.timeStamp = o.timeStamp - a.timeStamp, r && (this.pointerIsDown = !0, l.downTime = this.coords.cur.timeStamp, l.downTarget = n, ce(this.downPointer, e), this.interacting() || (le(this.coords.start, this.coords.cur), le(this.coords.prev, this.coords.cur), this.downEvent = t, this.pointerWasMoved = !1)), this._updateLatestPointer(e, t, n), this._scopeFire("interactions:update-pointer", {
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
						return new Dt(this, e, this.prepared.name, t, this.element, n, r);
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
						if (a && n === "move" && (re(this.edges, a, this.coords.delta[this.interactable.options.deltaSource]), a.width = a.right - a.left, a.height = a.bottom - a.top), !1 === this._scopeFire(`interactions:before-action-${n}`, e)) return !1;
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
			return It(e.coords.cur, t), It(e.coords.delta, t), re(e.edges, e.rect, t), t.x = 0, t.y = 0, !0;
		}
		function Ft(e) {
			var t = e.x, n = e.y;
			this.offset.pending.x += t, this.offset.pending.y += n, this.offset.total.x += t, this.offset.total.y += n;
		}
		function It(e, t) {
			var n = e.page, r = e.client, i = t.x, a = t.y;
			n.x += i, n.y += a, r.x += i, r.y += a;
		}
		At.offsetBy = "";
		var Lt = {
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
						e.pointerIsDown && (It(e.coords.cur, e.offset.total), e.offset.pending.x = 0, e.offset.pending.y = 0);
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
		}, Rt = function() {
			function e(t) {
				i(this, e), this.active = !1, this.isModified = !1, this.smoothEnd = !1, this.allowResume = !1, this.modification = void 0, this.modifierCount = 0, this.modifierArg = void 0, this.startCoords = void 0, this.t0 = 0, this.v0 = 0, this.te = 0, this.targetOffset = void 0, this.modifiedOffset = void 0, this.currentOffset = void 0, this.lambda_v0 = 0, this.one_ve_v0 = 0, this.timeout = void 0, this.interaction = void 0, this.interaction = t;
			}
			return o(e, [
				{
					key: "start",
					value: function(e) {
						var t = this.interaction, n = zt(t);
						if (!n || !n.enabled) return !1;
						var r = t.coords.velocity.client, i = oe(r.x, r.y), a = this.modification ||= new xt(t);
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
						var e = this, t = this.interaction.coords.velocity.client, n = zt(this.interaction), r = n.resistance, i = -Math.log(n.endSpeed / this.v0) / r;
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
						this.timeout = Je.request((function() {
							t.active && e();
						}));
					}
				},
				{
					key: "inertiaTick",
					value: function() {
						var e, t, n, r, i, a, o, s = this, c = this.interaction, l = zt(c).resistance, u = (c._now() - this.t0) / 1e3;
						if (u < this.te) {
							var d, f = 1 - (Math.exp(-l * u) - this.lambda_v0) / this.one_ve_v0;
							this.isModified ? (e = 0, t = 0, n = this.targetOffset.x, r = this.targetOffset.y, i = this.modifiedOffset.x, a = this.modifiedOffset.y, d = {
								x: Vt(o = f, e, n, i),
								y: Vt(o, t, r, a)
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
						var e = this, t = this.interaction, n = t._now() - this.t0, r = zt(t).smoothEndDuration;
						if (n < r) {
							var i = {
								x: Ht(n, 0, this.targetOffset.x, r),
								y: Ht(n, 0, this.targetOffset.y, r)
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
						}), le(i.coords.prev, i.coords.cur), this.stop();
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
						this.active = this.smoothEnd = !1, this.interaction.simulation = null, Je.cancel(this.timeout);
					}
				}
			]), e;
		}();
		function zt(e) {
			var t = e.interactable, n = e.prepared;
			return t && t.options && n.name && t.options[n.name].inertia;
		}
		var Bt = {
			id: "inertia",
			before: ["modifiers", "actions"],
			install: function(e) {
				var t = e.defaults;
				e.usePlugin(Lt), e.usePlugin(Tt), e.actions.phases.inertiastart = !0, e.actions.phases.resume = !0, t.perAction.inertia = {
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
					t.inertia = new Rt(t);
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
				"interactions:action-resume": wt,
				"interactions:action-inertiastart": wt,
				"interactions:after-action-inertiastart": function(e) {
					return e.interaction.modification.restoreInteractionCoords(e);
				},
				"interactions:after-action-resume": function(e) {
					return e.interaction.modification.restoreInteractionCoords(e);
				}
			}
		};
		function Vt(e, t, n, r) {
			var i = 1 - e;
			return i * i * t + 2 * i * e * n + e * e * r;
		}
		function Ht(e, t, n, r) {
			return -n * (e /= r) * (e - 2) + t;
		}
		var Ut = Bt;
		function J(e, t) {
			for (var n = 0; n < t.length; n++) {
				var r = t[n];
				if (e.immediatePropagationStopped) break;
				r(e);
			}
		}
		var Wt = function() {
			function e(t) {
				i(this, e), this.options = void 0, this.types = {}, this.propagationStopped = !1, this.immediatePropagationStopped = !1, this.global = void 0, this.options = H({}, t || {});
			}
			return o(e, [
				{
					key: "fire",
					value: function(e) {
						var t, n = this.global;
						(t = this.types[e.type]) && J(e, t), !e.propagationStopped && n && (t = n[e.type]) && J(e, t);
					}
				},
				{
					key: "on",
					value: function(e, t) {
						var n = K(e, t);
						for (e in n) this.types[e] = we(this.types[e] || [], n[e]);
					}
				},
				{
					key: "off",
					value: function(e, t) {
						var n = K(e, t);
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
		}(), Gt = function() {
			function e(t) {
				i(this, e), this.currentTarget = void 0, this.originalEvent = void 0, this.type = void 0, this.originalEvent = t, ce(this, t);
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
		function Kt(e) {
			return S.object(e) ? {
				capture: !!e.capture,
				passive: !!e.passive
			} : {
				capture: !!e,
				passive: !1
			};
		}
		function qt(e, t) {
			return e === t || (typeof e == "boolean" ? !!t.capture === e && !!t.passive == 0 : !!e.capture == !!t.capture && !!e.passive == !!t.passive);
		}
		var Jt = {
			id: "events",
			install: function(e) {
				var t, n = [], r = {}, i = [], a = {
					add: o,
					remove: s,
					addDelegate: function(e, t, n, a, s) {
						var u = Kt(s);
						if (!r[n]) {
							r[n] = [];
							for (var d = 0; d < i.length; d++) {
								var f = i[d];
								o(f, n, c), o(f, n, l, !0);
							}
						}
						var p = r[n], m = De(p, (function(n) {
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
						var o, u = Kt(a), d = r[n], f = !1;
						if (d) for (o = d.length - 1; o >= 0; o--) {
							var p = d[o];
							if (p.selector === e && p.context === t) {
								for (var m = p.listeners, h = m.length - 1; h >= 0; h--) {
									var g = m[h];
									if (g.func === i && qt(g.options, u)) {
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
						var o = Kt(i), s = De(n, (function(t) {
							return t.eventTarget === e;
						}));
						s || (s = {
							eventTarget: e,
							events: {}
						}, n.push(s)), s.events[t] || (s.events[t] = []), De(s.events[t], (function(e) {
							return e.func === r && qt(e.options, o);
						})) || (e.addEventListener(t, r, a.supportsOptions ? o : o.capture), s.events[t].push({
							func: r,
							options: o
						}));
					}
				}
				function s(e, t, r, i) {
					if (e.addEventListener && e.removeEventListener) {
						var o = Ee(n, (function(t) {
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
								for (var p = Kt(i), m = 0; m < u.length; m++) {
									var h = u[m];
									if (h.func === r && qt(h.options, p)) {
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
					for (var n = Kt(t), i = new Gt(e), a = r[e.type], o = Se(e)[0], s = o; S.element(s);) {
						for (var c = 0; c < a.length; c++) {
							var l = a[c], u = l.selector, d = l.context;
							if (F(s, u) && M(d, o) && M(d, s)) {
								var f = l.listeners;
								i.currentTarget = s;
								for (var p = 0; p < f.length; p++) {
									var m = f[p];
									qt(m.options, n) && m.func(i);
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
		}, Yt = {
			methodOrder: [
				"simulationResume",
				"mouseOrPen",
				"hasPointer",
				"idle"
			],
			search: function(e) {
				for (var t = 0, n = Yt.methodOrder; t < n.length; t++) {
					var r = Yt[n[t]](e);
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
						if (c.simulation && !Xt(c, n)) continue;
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
					if (Xt(i, t)) return i;
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
		function Xt(e, t) {
			return e.pointers.some((function(e) {
				return e.id === t;
			}));
		}
		var Zt = Yt, Qt = [
			"pointerDown",
			"pointerMove",
			"pointerUp",
			"updatePointer",
			"removePointer",
			"windowBlur"
		];
		function $t(e, t) {
			return function(n) {
				var r = t.interactions.list, i = xe(n), a = Se(n), o = a[0], s = a[1], c = [];
				if (/^touch/.test(n.type)) {
					t.prevTouchTime = t.now();
					for (var l = 0, u = n.changedTouches; l < u.length; l++) {
						var d = u[l], f = {
							pointer: d,
							pointerId: me(d),
							pointerType: i,
							eventType: n.type,
							eventTarget: o,
							curEventTarget: s,
							scope: t
						}, p = en(f);
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
							pointerId: me(n),
							pointerType: i,
							eventType: n.type,
							curEventTarget: s,
							eventTarget: o,
							scope: t
						}, _ = en(g);
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
		function en(e) {
			var t = e.pointerType, n = e.scope, r = {
				interaction: Zt.search(e),
				searchDetails: e
			};
			return n.fire("interactions:find", r), r.interaction || n.interactions.new({ pointerType: t });
		}
		function tn(e, t) {
			var n = e.doc, r = e.scope, i = e.options, a = r.interactions.docEvents, o = r.events, s = o[t];
			for (var c in r.browser.isIOS && !i.events && (i.events = { passive: !1 }), o.delegatedEvents) s(n, c, o.delegateListener), s(n, c, o.delegateUseCapture, !0);
			for (var l = i && i.events, u = 0; u < a.length; u++) {
				var d = a[u];
				s(n, d.type, d.listener, l);
			}
		}
		var nn = {
			id: "core/interactions",
			install: function(e) {
				for (var t = {}, n = 0; n < Qt.length; n++) {
					var r = Qt[n];
					t[r] = $t(r, e);
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
				}(Mt), e.interactions = {
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
				}, e.usePlugin(vt);
			},
			listeners: {
				"scope:add-document": function(e) {
					return tn(e, "add");
				},
				"scope:remove-document": function(e) {
					return tn(e, "remove");
				},
				"interactable:unset": function(e, t) {
					for (var n = e.interactable, r = t.interactions.list.length - 1; r >= 0; r--) {
						var i = t.interactions.list[r];
						i.interactable === n && (i.stop(), t.fire("interactions:destroy", { interaction: i }), i.destroy(), t.interactions.list.length > 2 && t.interactions.list.splice(r, 1));
					}
				}
			},
			onDocSignal: tn,
			doOnInteractions: $t,
			methodNames: Qt
		}, rn = function(e) {
			return e[e.On = 0] = "On", e[e.Off = 1] = "Off", e;
		}(rn || {}), an = function() {
			function e(t, n, r, a) {
				i(this, e), this.target = void 0, this.options = void 0, this._actions = void 0, this.events = new Wt(), this._context = void 0, this._win = void 0, this._doc = void 0, this._scopeEvents = void 0, this._actions = n.actions, this.target = t, this._context = n.context || r, this._win = y(te(t) ? this._context : t), this._doc = this._win.document, this._scopeEvents = a, this.set(n);
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
							return (i == null || i(e)) && yt(e, r._actions);
						};
						(S.array(t) || S.object(t)) && this._onOff(rn.Off, e, t, void 0, a), (S.array(n) || S.object(n)) && this._onOff(rn.On, e, n, void 0, a);
					}
				},
				{
					key: "setPerAction",
					value: function(e, t) {
						var n = this._defaults;
						for (var r in t) {
							var i = r, a = this.options[e], o = t[i];
							i === "listeners" && this.updatePerActionListeners(e, a.listeners, o), S.array(o) ? a[i] = Te(o) : S.plainObject(o) ? (a[i] = H(a[i] || {}, bt(o)), S.object(n.perAction[i]) && "enabled" in n.perAction[i] && (a[i].enabled = !1 !== o.enabled)) : S.bool(o) && S.object(n.perAction[i]) ? a[i].enabled = o : a[i] = o;
						}
					}
				},
				{
					key: "getRect",
					value: function(e) {
						return e ||= S.element(this.target) ? this.target : null, S.string(this.target) && (e ||= this._context.querySelector(this.target)), V(e);
					}
				},
				{
					key: "rectChecker",
					value: function(e) {
						var t = this;
						return S.func(e) ? (this.getRect = function(n) {
							var r = H({}, e.apply(t, n));
							return "width" in r || (r.width = r.right - r.left, r.height = r.bottom - r.top), r;
						}, this) : e === null ? (delete this.getRect, this) : this.getRect;
					}
				},
				{
					key: "_backCompatOption",
					value: function(e, t) {
						if (te(t) || S.object(t)) {
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
						return !e || !!S.element(n) && (S.string(e) ? R(n, e, t) : !!S.element(e) && M(e, n));
					}
				},
				{
					key: "testIgnore",
					value: function(e, t, n) {
						return !(!e || !S.element(n)) && (S.string(e) ? R(n, e, t) : !!S.element(e) && M(e, n));
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
						var a = K(t, n, i);
						for (var o in a) {
							o === "wheel" && (o = j.wheelEvent);
							for (var s = 0, c = a[o]; s < c.length; s++) {
								var l = c[s];
								yt(o, this._actions) ? this.events[e === rn.On ? "on" : "off"](o, l) : S.string(this.target) ? this._scopeEvents[e === rn.On ? "addDelegate" : "removeDelegate"](this.target, this._context, o, l, r) : this._scopeEvents[e === rn.On ? "add" : "remove"](this.target, o, l, r);
							}
						}
						return this;
					}
				},
				{
					key: "on",
					value: function(e, t, n) {
						return this._onOff(rn.On, e, t, n);
					}
				},
				{
					key: "off",
					value: function(e, t, n) {
						return this._onOff(rn.Off, e, t, n);
					}
				},
				{
					key: "set",
					value: function(e) {
						var t = this._defaults;
						for (var n in S.object(e) || (e = {}), this.options = bt(t.base), this._actions.methodDict) {
							var r = n, i = this._actions.methodDict[r];
							this.options[r] = {}, this.setPerAction(r, H(H({}, t.perAction), t.actions[r])), this[i](e[r]);
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
		}(), Y = function() {
			function e(t) {
				var n = this;
				i(this, e), this.list = [], this.selectorMap = {}, this.scope = void 0, this.scope = t, t.addListeners({ "interactable:unset": function(e) {
					var t = e.interactable, r = t.target, i = S.string(r) ? n.selectorMap[r] : r[n.scope.id], a = Ee(i, (function(e) {
						return e === t;
					}));
					i.splice(a, 1);
				} });
			}
			return o(e, [
				{
					key: "new",
					value: function(e, t) {
						t = H(t || {}, { actions: this.scope.actions });
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
						if (i) return De(i, (function(t) {
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
				i(this, e), this.id = `__interact_scope_${Math.floor(100 * Math.random())}`, this.isInitialized = !1, this.listenerMaps = [], this.browser = j, this.defaults = bt(Et), this.Eventable = Wt, this.actions = {
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
					return t.getPointerAverage = _e, t.getTouchBBox = ve, t.getTouchDistance = ye, t.getTouchAngle = be, t.getElementRect = V, t.getElementClientRect = B, t.matchesSelector = F, t.closest = N, t.globalEvents = {}, t.version = "1.10.27", t.scope = e, t.use = function(e, t) {
						return this.scope.usePlugin(e, t), this;
					}, t.isSet = function(e, t) {
						return !!this.scope.interactables.get(e, t && t.context);
					}, t.on = Qe((function(e, t, n) {
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
						return yt(e, this.scope.actions) ? this.globalEvents[e] ? this.globalEvents[e].push(t) : this.globalEvents[e] = [t] : this.scope.events.add(this.scope.document, e, t, { options: n }), this;
					}), "The interact.on() method is being deprecated"), t.off = Qe((function(e, t, n) {
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
						return yt(e, this.scope.actions) ? e in this.globalEvents && (s = this.globalEvents[e].indexOf(t)) !== -1 && this.globalEvents[e].splice(s, 1) : this.scope.events.remove(this.scope.document, e, t, n), this;
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
				}(this), this.InteractEvent = Dt, this.Interactable = void 0, this.interactables = new Y(this), this._win = void 0, this.document = void 0, this.window = void 0, this.documents = [], this._plugins = {
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
				}(an);
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
							return e.isInitialized = !0, S.window(t) && v(t), k.init(t), j.init(t), Je.init(t), e.window = t, e.document = t.document, e.usePlugin(nn), e.usePlugin(Jt), e;
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
						t = t ? H({}, t) : {}, this.documents.push({
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
				t.snappers = H(t.snappers || {}, dn), t.createSnapGrid = t.snappers.grid;
			}
		}, pn = {
			start: function(e) {
				var t = e.state, r = e.rect, i = e.edges, a = e.pageCoords, o = t.options, s = o.ratio, c = o.enabled, l = t.options, u = l.equalDelta, d = l.modifiers;
				s === "preserve" && (s = r.width / r.height), t.startCoords = H({}, a), t.startRect = H({}, r), t.ratio = s, t.equalDelta = u;
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
				if (!1 !== c && H(i, f), d != null && d.length) {
					var m = new xt(e.interaction);
					m.copyFrom(e.interaction.modification), m.prepareStates(d), t.subModification = m, m.startAll(n({}, e));
				}
			},
			set: function(e) {
				var t = e.state, r = e.rect, i = e.coords, a = t.linkedEdges, o = H({}, i), s = t.equalDelta ? mn : hn;
				if (H(e.edges, a), s(t, t.xIsPrimaryAxis, i, r), !t.subModification) return null;
				var c = H({}, r);
				re(a, c, {
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
				return l.changed && (s(t, Math.abs(u.x) > Math.abs(u.y), l.coords, l.rect), H(i, l.coords)), l.eventProps;
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
		var gn = Ct(pn, "aspectRatio"), _n = function() {};
		_n._defaults = {};
		var vn = _n;
		function yn(e, t, n) {
			return S.func(e) ? W(e, t.interactable, t.element, [
				n.x,
				n.y,
				t
			]) : W(e, t.interactable, t.element);
		}
		var bn = {
			start: function(e) {
				var t = e.rect, n = e.startOffset, r = e.state, i = e.interaction, a = e.pageCoords, o = r.options, s = o.elementRect, c = H({
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
						return !e || "left" in e && "top" in e || ((e = H({}, e)).left = e.x || 0, e.top = e.y || 0, e.right = e.right || e.left + e.width, e.bottom = e.bottom || e.top + e.height), e;
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
		}, xn = Ct(bn, "restrict"), Sn = {
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
				a && (t = ne(yn(a.offset, n, n.coords.start.page))), t ||= {
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
					var s = H({}, t), c = yn(o.inner, r, s) || {}, l = yn(o.outer, r, s) || {};
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
		}, En = Ct(Tn, "restrictEdges"), Dn = H({
			get elementRect() {
				return {
					top: 0,
					left: 0,
					bottom: 1,
					right: 1
				};
			},
			set elementRect(e) {}
		}, bn.defaults), On = Ct({
			start: bn.start,
			set: bn.set,
			defaults: Dn
		}, "restrictRect"), kn = {
			width: -Infinity,
			height: -Infinity
		}, An = {
			width: Infinity,
			height: Infinity
		}, jn = Ct({
			start: function(e) {
				return Tn.start(e);
			},
			set: function(e) {
				var t = e.interaction, n = e.state, r = e.rect, i = e.edges, a = n.options;
				if (i) {
					var o = G(yn(a.min, t, e.coords)) || kn, s = G(yn(a.max, t, e.coords)) || An;
					n.options = {
						endOnly: a.endOnly,
						inner: H({}, Tn.noInner),
						outer: H({}, Tn.noOuter)
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
					return ne(W(e.state.options.origin, null, null, [t])) || ie(e.interactable, t, e.interaction.prepared.name);
				}(e) : {
					x: 0,
					y: 0
				};
				if (c.offset === "startCoords") t = {
					x: n.coords.start.page.x,
					y: n.coords.start.page.y
				};
				else {
					var u = W(c.offset, r, i, [n]);
					(t = ne(u) || {
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
				var t = e.interaction, n = e.coords, r = e.state, i = r.options, a = r.offsets, o = ie(t.interactable, t.element, t.prepared.name), s = H({}, n), c = [];
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
					var b = c[y], x = b.range, C = b.x - s.x, w = b.y - s.y, T = oe(C, w), E = T <= x;
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
		}, Nn = Ct(Mn, "snap"), Pn = {
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
				n.options = H({}, i), n.options.targets = [];
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
		}, Fn = Ct(Pn, "snapSize"), In = {
			aspectRatio: gn,
			restrictEdges: En,
			restrict: xn,
			restrictRect: On,
			restrictSize: jn,
			snapEdges: Ct({
				start: function(e) {
					var t = e.edges;
					return t ? (e.state.targetFields = e.state.targetFields || [[t.left ? "left" : "right", t.top ? "top" : "bottom"]], Pn.start(e)) : null;
				},
				set: Pn.set,
				defaults: H(bt(Pn.defaults), {
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
				for (var n in e.usePlugin(Tt), e.usePlugin(fn), t.modifiers = In, In) {
					var r = In[n], i = r._defaults;
					i._methods = r._methods, e.defaults.perAction[n] = i;
				}
			}
		}, Rn = function(e) {
			c(n, e);
			var t = f(n);
			function n(e, r, a, o, s, c) {
				var l;
				if (i(this, n), ce(d(l = t.call(this, s)), a), a !== r && ce(d(l), r), l.timeStamp = c, l.originalEvent = a, l.type = e, l.pointerId = me(r), l.pointerType = xe(r), l.target = o, l.currentTarget = null, e === "tap") {
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
		}(Ce), zn = {
			id: "pointer-events/base",
			before: [
				"inertia",
				"modifiers",
				"auto-start",
				"actions"
			],
			install: function(e) {
				e.pointerEvents = zn, e.defaults.actions.pointerEvents = zn.defaults, H(e.actions.phaselessTypes, zn.types);
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
						for (var n = e.interaction, r = e.pointer, i = e.event, a = e.eventTarget, o = e.pointerIndex, s = n.pointers[o].hold, c = ee(a), l = {
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
				var m = ie(f.eventable, f.node);
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
			for (var l = ee(a), u = {
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
					return H(this.events.options, e), this;
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
					H(n.events.options, t.pointerEvents.defaults), H(n.events.options, r.pointerEvents || {});
				}
			}
		};
		if (ln.use(vt), ln.use(Lt), ln.use({
			id: "pointer-events",
			install: function(e) {
				e.usePlugin(Un), e.usePlugin(Gn), e.usePlugin(Kn);
			}
		}), ln.use(Ut), ln.use(Ln), ln.use(ht), ln.use(Ke), ln.use(Ze), ln.use({
			id: "reflow",
			install: function(e) {
				var t = e.Interactable;
				e.actions.phases.reflow = !0, t.prototype.reflow = function(t) {
					return function(e, t, n) {
						for (var r = e.getAllElements(), i = n.window.Promise, a = i ? [] : null, o = function() {
							var o = r[s], c = e.getRect(o);
							if (!c) return 1;
							var l, u = De(n.interactions.list, (function(n) {
								return n.interacting() && n.interactable === e && n.element === o && n.prepared.name === t.name;
							}));
							if (u) u.move(), a && (l = u._reflowPromise || new i((function(e) {
								u._reflowResolve = e;
							})));
							else {
								var d = G(c);
								l = function(e, t, n, r, i) {
									var a = e.interactions.new({ pointerType: "reflow" }), o = {
										interaction: a,
										event: i,
										pointer: i,
										eventTarget: n,
										phase: "reflow"
									};
									a.interactable = t, a.element = n, a.prevEvent = i, a.updatePointer(i, i, n, !0), ue(a.coords.delta), $e(a.prepared, r), a._doPhase(o);
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
})), Ia = function(e, t) {
	return Ia = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(e, t) {
		e.__proto__ = t;
	} || function(e, t) {
		for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
	}, Ia(e, t);
};
function La(e, t) {
	if (typeof t != "function" && t !== null) throw TypeError("Class extends value " + String(t) + " is not a constructor or null");
	Ia(e, t);
	function n() {
		this.constructor = e;
	}
	e.prototype = t === null ? Object.create(t) : (n.prototype = t.prototype, new n());
}
function Ra(e) {
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
function za(e, t) {
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
function Ba(e, t, n) {
	if (n || arguments.length === 2) for (var r = 0, i = t.length, a; r < i; r++) (a || !(r in t)) && (a ||= Array.prototype.slice.call(t, 0, r), a[r] = t[r]);
	return e.concat(a || Array.prototype.slice.call(t));
}
//#endregion
//#region node_modules/.pnpm/rxjs@7.8.2/node_modules/rxjs/dist/esm5/internal/util/isFunction.js
function Va(e) {
	return typeof e == "function";
}
//#endregion
//#region node_modules/.pnpm/rxjs@7.8.2/node_modules/rxjs/dist/esm5/internal/util/createErrorClass.js
function Ha(e) {
	var t = e(function(e) {
		Error.call(e), e.stack = (/* @__PURE__ */ Error()).stack;
	});
	return t.prototype = Object.create(Error.prototype), t.prototype.constructor = t, t;
}
//#endregion
//#region node_modules/.pnpm/rxjs@7.8.2/node_modules/rxjs/dist/esm5/internal/util/UnsubscriptionError.js
var Ua = Ha(function(e) {
	return function(t) {
		e(this), this.message = t ? t.length + " errors occurred during unsubscription:\n" + t.map(function(e, t) {
			return t + 1 + ") " + e.toString();
		}).join("\n  ") : "", this.name = "UnsubscriptionError", this.errors = t;
	};
});
//#endregion
//#region node_modules/.pnpm/rxjs@7.8.2/node_modules/rxjs/dist/esm5/internal/util/arrRemove.js
function Wa(e, t) {
	if (e) {
		var n = e.indexOf(t);
		0 <= n && e.splice(n, 1);
	}
}
//#endregion
//#region node_modules/.pnpm/rxjs@7.8.2/node_modules/rxjs/dist/esm5/internal/Subscription.js
var Ga = function() {
	function e(e) {
		this.initialTeardown = e, this.closed = !1, this._parentage = null, this._finalizers = null;
	}
	return e.prototype.unsubscribe = function() {
		var e, t, n, r, i;
		if (!this.closed) {
			this.closed = !0;
			var a = this._parentage;
			if (a) if (this._parentage = null, Array.isArray(a)) try {
				for (var o = Ra(a), s = o.next(); !s.done; s = o.next()) s.value.remove(this);
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
			if (Va(c)) try {
				c();
			} catch (e) {
				i = e instanceof Ua ? e.errors : [e];
			}
			var l = this._finalizers;
			if (l) {
				this._finalizers = null;
				try {
					for (var u = Ra(l), d = u.next(); !d.done; d = u.next()) {
						var f = d.value;
						try {
							Ja(f);
						} catch (e) {
							i ??= [], e instanceof Ua ? i = Ba(Ba([], za(i)), za(e.errors)) : i.push(e);
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
			if (i) throw new Ua(i);
		}
	}, e.prototype.add = function(t) {
		if (t && t !== this) if (this.closed) Ja(t);
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
		t === e ? this._parentage = null : Array.isArray(t) && Wa(t, e);
	}, e.prototype.remove = function(t) {
		var n = this._finalizers;
		n && Wa(n, t), t instanceof e && t._removeParent(this);
	}, e.EMPTY = (function() {
		var t = new e();
		return t.closed = !0, t;
	})(), e;
}(), Ka = Ga.EMPTY;
function qa(e) {
	return e instanceof Ga || e && "closed" in e && Va(e.remove) && Va(e.add) && Va(e.unsubscribe);
}
function Ja(e) {
	Va(e) ? e() : e.unsubscribe();
}
//#endregion
//#region node_modules/.pnpm/rxjs@7.8.2/node_modules/rxjs/dist/esm5/internal/config.js
var Ya = {
	onUnhandledError: null,
	onStoppedNotification: null,
	Promise: void 0,
	useDeprecatedSynchronousErrorHandling: !1,
	useDeprecatedNextContext: !1
}, Xa = {
	setTimeout: function(e, t) {
		var n = [...arguments].slice(2), r = Xa.delegate;
		return r?.setTimeout ? r.setTimeout.apply(r, Ba([e, t], za(n))) : setTimeout.apply(void 0, Ba([e, t], za(n)));
	},
	clearTimeout: function(e) {
		return (Xa.delegate?.clearTimeout || clearTimeout)(e);
	},
	delegate: void 0
};
//#endregion
//#region node_modules/.pnpm/rxjs@7.8.2/node_modules/rxjs/dist/esm5/internal/util/reportUnhandledError.js
function Za(e) {
	Xa.setTimeout(function() {
		var t = Ya.onUnhandledError;
		if (t) t(e);
		else throw e;
	});
}
//#endregion
//#region node_modules/.pnpm/rxjs@7.8.2/node_modules/rxjs/dist/esm5/internal/util/noop.js
function Qa() {}
//#endregion
//#region node_modules/.pnpm/rxjs@7.8.2/node_modules/rxjs/dist/esm5/internal/NotificationFactories.js
var $a = (function() {
	return no("C", void 0, void 0);
})();
function eo(e) {
	return no("E", void 0, e);
}
function to(e) {
	return no("N", e, void 0);
}
function no(e, t, n) {
	return {
		kind: e,
		value: t,
		error: n
	};
}
//#endregion
//#region node_modules/.pnpm/rxjs@7.8.2/node_modules/rxjs/dist/esm5/internal/util/errorContext.js
var ro = null;
function io(e) {
	if (Ya.useDeprecatedSynchronousErrorHandling) {
		var t = !ro;
		if (t && (ro = {
			errorThrown: !1,
			error: null
		}), e(), t) {
			var n = ro, r = n.errorThrown, i = n.error;
			if (ro = null, r) throw i;
		}
	} else e();
}
function ao(e) {
	Ya.useDeprecatedSynchronousErrorHandling && ro && (ro.errorThrown = !0, ro.error = e);
}
//#endregion
//#region node_modules/.pnpm/rxjs@7.8.2/node_modules/rxjs/dist/esm5/internal/Subscriber.js
var oo = function(e) {
	La(t, e);
	function t(t) {
		var n = e.call(this) || this;
		return n.isStopped = !1, t ? (n.destination = t, qa(t) && t.add(n)) : n.destination = ho, n;
	}
	return t.create = function(e, t, n) {
		return new uo(e, t, n);
	}, t.prototype.next = function(e) {
		this.isStopped ? mo(to(e), this) : this._next(e);
	}, t.prototype.error = function(e) {
		this.isStopped ? mo(eo(e), this) : (this.isStopped = !0, this._error(e));
	}, t.prototype.complete = function() {
		this.isStopped ? mo($a, this) : (this.isStopped = !0, this._complete());
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
}(Ga), so = Function.prototype.bind;
function co(e, t) {
	return so.call(e, t);
}
var lo = function() {
	function e(e) {
		this.partialObserver = e;
	}
	return e.prototype.next = function(e) {
		var t = this.partialObserver;
		if (t.next) try {
			t.next(e);
		} catch (e) {
			fo(e);
		}
	}, e.prototype.error = function(e) {
		var t = this.partialObserver;
		if (t.error) try {
			t.error(e);
		} catch (e) {
			fo(e);
		}
		else fo(e);
	}, e.prototype.complete = function() {
		var e = this.partialObserver;
		if (e.complete) try {
			e.complete();
		} catch (e) {
			fo(e);
		}
	}, e;
}(), uo = function(e) {
	La(t, e);
	function t(t, n, r) {
		var i = e.call(this) || this, a;
		if (Va(t) || !t) a = {
			next: t ?? void 0,
			error: n ?? void 0,
			complete: r ?? void 0
		};
		else {
			var o;
			i && Ya.useDeprecatedNextContext ? (o = Object.create(t), o.unsubscribe = function() {
				return i.unsubscribe();
			}, a = {
				next: t.next && co(t.next, o),
				error: t.error && co(t.error, o),
				complete: t.complete && co(t.complete, o)
			}) : a = t;
		}
		return i.destination = new lo(a), i;
	}
	return t;
}(oo);
function fo(e) {
	Ya.useDeprecatedSynchronousErrorHandling ? ao(e) : Za(e);
}
function po(e) {
	throw e;
}
function mo(e, t) {
	var n = Ya.onStoppedNotification;
	n && Xa.setTimeout(function() {
		return n(e, t);
	});
}
var ho = {
	closed: !0,
	next: Qa,
	error: po,
	complete: Qa
}, go = (function() {
	return typeof Symbol == "function" && Symbol.observable || "@@observable";
})();
//#endregion
//#region node_modules/.pnpm/rxjs@7.8.2/node_modules/rxjs/dist/esm5/internal/util/identity.js
function _o(e) {
	return e;
}
//#endregion
//#region node_modules/.pnpm/rxjs@7.8.2/node_modules/rxjs/dist/esm5/internal/util/pipe.js
function vo(e) {
	return e.length === 0 ? _o : e.length === 1 ? e[0] : function(t) {
		return e.reduce(function(e, t) {
			return t(e);
		}, t);
	};
}
//#endregion
//#region node_modules/.pnpm/rxjs@7.8.2/node_modules/rxjs/dist/esm5/internal/Observable.js
var yo = function() {
	function e(e) {
		e && (this._subscribe = e);
	}
	return e.prototype.lift = function(t) {
		var n = new e();
		return n.source = this, n.operator = t, n;
	}, e.prototype.subscribe = function(e, t, n) {
		var r = this, i = So(e) ? e : new uo(e, t, n);
		return io(function() {
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
		return t = bo(t), new t(function(t, r) {
			var i = new uo({
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
	}, e.prototype[go] = function() {
		return this;
	}, e.prototype.pipe = function() {
		return vo([...arguments])(this);
	}, e.prototype.toPromise = function(e) {
		var t = this;
		return e = bo(e), new e(function(e, n) {
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
function bo(e) {
	return e ?? Ya.Promise ?? Promise;
}
function xo(e) {
	return e && Va(e.next) && Va(e.error) && Va(e.complete);
}
function So(e) {
	return e && e instanceof oo || xo(e) && qa(e);
}
//#endregion
//#region node_modules/.pnpm/rxjs@7.8.2/node_modules/rxjs/dist/esm5/internal/util/ObjectUnsubscribedError.js
var Co = Ha(function(e) {
	return function() {
		e(this), this.name = "ObjectUnsubscribedError", this.message = "object unsubscribed";
	};
}), wo = function(e) {
	La(t, e);
	function t() {
		var t = e.call(this) || this;
		return t.closed = !1, t.currentObservers = null, t.observers = [], t.isStopped = !1, t.hasError = !1, t.thrownError = null, t;
	}
	return t.prototype.lift = function(e) {
		var t = new To(this, this);
		return t.operator = e, t;
	}, t.prototype._throwIfClosed = function() {
		if (this.closed) throw new Co();
	}, t.prototype.next = function(e) {
		var t = this;
		io(function() {
			var n, r;
			if (t._throwIfClosed(), !t.isStopped) {
				t.currentObservers ||= Array.from(t.observers);
				try {
					for (var i = Ra(t.currentObservers), a = i.next(); !a.done; a = i.next()) a.value.next(e);
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
		io(function() {
			if (t._throwIfClosed(), !t.isStopped) {
				t.hasError = t.isStopped = !0, t.thrownError = e;
				for (var n = t.observers; n.length;) n.shift().error(e);
			}
		});
	}, t.prototype.complete = function() {
		var e = this;
		io(function() {
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
		return r || i ? Ka : (this.currentObservers = null, a.push(e), new Ga(function() {
			t.currentObservers = null, Wa(a, e);
		}));
	}, t.prototype._checkFinalizedStatuses = function(e) {
		var t = this, n = t.hasError, r = t.thrownError, i = t.isStopped;
		n ? e.error(r) : i && e.complete();
	}, t.prototype.asObservable = function() {
		var e = new yo();
		return e.source = this, e;
	}, t.create = function(e, t) {
		return new To(e, t);
	}, t;
}(yo), To = function(e) {
	La(t, e);
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
		return this.source?.subscribe(e) ?? Ka;
	}, t;
}(wo), Eo = /* @__PURE__ */ fe(Fa(), 1), Do = new wo();
//#endregion
//#region src/composables/useDialog.ts
function Oo(e, t) {
	let n = L(!1), r = L(null), i, a = null;
	function o(r) {
		if (r.key !== e) return;
		let i = r.data;
		if (i.type === "close") {
			n.value = !1;
			return;
		}
		n.value = !0, t?.(i);
	}
	G(r, (e) => {
		l(), e?.$el && s(e.$el);
	}, { flush: "post" });
	function s(e) {
		a = (0, Eo.default)(e).draggable({
			allowFrom: ".drag-handle",
			listeners: { move(e) {
				let t = e.target;
				if (!(t instanceof HTMLElement || t instanceof SVGElement)) return;
				let n = c(t.getAttribute("data-x")) + e.dx, r = c(t.getAttribute("data-y")) + e.dy;
				t.style.transform = `translate(${n}px, ${r}px)`, t.setAttribute("data-x", String(n)), t.setAttribute("data-y", String(r));
			} },
			modifiers: [Eo.default.modifiers.restrictRect({
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
	return A(() => {
		i = Do.subscribe(o);
	}), M(() => {
		l(), i?.unsubscribe();
	}), {
		show: n,
		dialogRef: r
	};
}
//#endregion
//#region node_modules/.pnpm/axios@1.18.1/node_modules/axios/lib/helpers/bind.js
function ko(e, t) {
	return function() {
		return e.apply(t, arguments);
	};
}
//#endregion
//#region node_modules/.pnpm/axios@1.18.1/node_modules/axios/lib/utils.js
var { toString: Ao } = Object.prototype, { getPrototypeOf: jo } = Object, { iterator: Mo, toStringTag: No } = Symbol, Po = (({ hasOwnProperty: e }) => (t, n) => e.call(t, n))(Object.prototype), Fo = (e, t) => {
	let n = e, r = [];
	for (; n != null && n !== Object.prototype;) {
		if (r.indexOf(n) !== -1) return !1;
		if (r.push(n), Po(n, t)) return !0;
		n = jo(n);
	}
	return !1;
}, Io = (e, t) => e != null && Fo(e, t) ? e[t] : void 0, Lo = ((e) => (t) => {
	let n = Ao.call(t);
	return e[n] || (e[n] = n.slice(8, -1).toLowerCase());
})(Object.create(null)), Ro = (e) => (e = e.toLowerCase(), (t) => Lo(t) === e), zo = (e) => (t) => typeof t === e, { isArray: Bo } = Array, Vo = zo("undefined");
function Ho(e) {
	return e !== null && !Vo(e) && e.constructor !== null && !Vo(e.constructor) && Ko(e.constructor.isBuffer) && e.constructor.isBuffer(e);
}
var Uo = Ro("ArrayBuffer");
function Wo(e) {
	let t;
	return t = typeof ArrayBuffer < "u" && ArrayBuffer.isView ? ArrayBuffer.isView(e) : e && e.buffer && Uo(e.buffer), t;
}
var Go = zo("string"), Ko = zo("function"), qo = zo("number"), Jo = (e) => typeof e == "object" && !!e, Yo = (e) => e === !0 || e === !1, Xo = (e) => {
	if (!Jo(e)) return !1;
	let t = jo(e);
	return (t === null || t === Object.prototype || jo(t) === null) && !Fo(e, No) && !Fo(e, Mo);
}, Zo = (e) => {
	if (!Jo(e) || Ho(e)) return !1;
	try {
		return Object.keys(e).length === 0 && Object.getPrototypeOf(e) === Object.prototype;
	} catch {
		return !1;
	}
}, Qo = Ro("Date"), $o = Ro("File"), es = (e) => !!(e && e.uri !== void 0), ts = (e) => e && e.getParts !== void 0, ns = Ro("Blob"), rs = Ro("FileList"), is = (e) => Jo(e) && Ko(e.pipe);
function as() {
	return typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {};
}
var os = as(), ss = os.FormData === void 0 ? void 0 : os.FormData, cs = (e) => {
	if (!e) return !1;
	if (ss && e instanceof ss) return !0;
	let t = jo(e);
	if (!t || t === Object.prototype || !Ko(e.append)) return !1;
	let n = Lo(e);
	return n === "formdata" || n === "object" && Ko(e.toString) && e.toString() === "[object FormData]";
}, ls = Ro("URLSearchParams"), [us, ds, fs, ps] = [
	"ReadableStream",
	"Request",
	"Response",
	"Headers"
].map(Ro), ms = (e) => e.trim ? e.trim() : e.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
function hs(e, t, { allOwnKeys: n = !1 } = {}) {
	if (e == null) return;
	let r, i;
	if (typeof e != "object" && (e = [e]), Bo(e)) for (r = 0, i = e.length; r < i; r++) t.call(null, e[r], r, e);
	else {
		if (Ho(e)) return;
		let i = n ? Object.getOwnPropertyNames(e) : Object.keys(e), a = i.length, o;
		for (r = 0; r < a; r++) o = i[r], t.call(null, e[o], o, e);
	}
}
function gs(e, t) {
	if (Ho(e)) return null;
	t = t.toLowerCase();
	let n = Object.keys(e), r = n.length, i;
	for (; r-- > 0;) if (i = n[r], t === i.toLowerCase()) return i;
	return null;
}
var _s = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : global, vs = (e) => !Vo(e) && e !== _s;
function ys(...e) {
	let { caseless: t, skipUndefined: n } = vs(this) && this || {}, r = {}, i = (e, i) => {
		if (i === "__proto__" || i === "constructor" || i === "prototype") return;
		let a = t && typeof i == "string" && gs(r, i) || i, o = Po(r, a) ? r[a] : void 0;
		Xo(o) && Xo(e) ? r[a] = ys(o, e) : Xo(e) ? r[a] = ys({}, e) : Bo(e) ? r[a] = e.slice() : (!n || !Vo(e)) && (r[a] = e);
	};
	for (let t = 0, n = e.length; t < n; t++) {
		let n = e[t];
		if (!n || Ho(n) || (hs(n, i), typeof n != "object" || Bo(n))) continue;
		let r = Object.getOwnPropertySymbols(n);
		for (let e = 0; e < r.length; e++) {
			let t = r[e];
			js.call(n, t) && i(n[t], t);
		}
	}
	return r;
}
var bs = (e, t, n, { allOwnKeys: r } = {}) => (hs(t, (t, r) => {
	n && Ko(t) ? Object.defineProperty(e, r, {
		__proto__: null,
		value: ko(t, n),
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
}, { allOwnKeys: r }), e), xs = (e) => (e.charCodeAt(0) === 65279 && (e = e.slice(1)), e), Ss = (e, t, n, r) => {
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
}, Cs = (e, t, n, r) => {
	let i, a, o, s = {};
	if (t ||= {}, e == null) return t;
	do {
		for (i = Object.getOwnPropertyNames(e), a = i.length; a-- > 0;) o = i[a], (!r || r(o, e, t)) && !s[o] && (t[o] = e[o], s[o] = !0);
		e = n !== !1 && jo(e);
	} while (e && (!n || n(e, t)) && e !== Object.prototype);
	return t;
}, ws = (e, t, n) => {
	e = String(e), (n === void 0 || n > e.length) && (n = e.length), n -= t.length;
	let r = e.indexOf(t, n);
	return r !== -1 && r === n;
}, Ts = (e) => {
	if (!e) return null;
	if (Bo(e)) return e;
	let t = e.length;
	if (!qo(t)) return null;
	let n = Array(t);
	for (; t-- > 0;) n[t] = e[t];
	return n;
}, Es = ((e) => (t) => e && t instanceof e)(typeof Uint8Array < "u" && jo(Uint8Array)), Ds = (e, t) => {
	let n = (e && e[Mo]).call(e), r;
	for (; (r = n.next()) && !r.done;) {
		let n = r.value;
		t.call(e, n[0], n[1]);
	}
}, Os = (e, t) => {
	let n, r = [];
	for (; (n = e.exec(t)) !== null;) r.push(n);
	return r;
}, ks = Ro("HTMLFormElement"), As = (e) => e.toLowerCase().replace(/[-_\s]([a-z\d])(\w*)/g, function(e, t, n) {
	return t.toUpperCase() + n;
}), { propertyIsEnumerable: js } = Object.prototype, Ms = Ro("RegExp"), Ns = (e, t) => {
	let n = Object.getOwnPropertyDescriptors(e), r = {};
	hs(n, (n, i) => {
		let a;
		(a = t(n, i, e)) !== !1 && (r[i] = a || n);
	}), Object.defineProperties(e, r);
}, Ps = (e) => {
	Ns(e, (t, n) => {
		if (Ko(e) && [
			"arguments",
			"caller",
			"callee"
		].includes(n)) return !1;
		let r = e[n];
		if (Ko(r)) {
			if (t.enumerable = !1, "writable" in t) {
				t.writable = !1;
				return;
			}
			t.set ||= () => {
				throw Error("Can not rewrite read-only method '" + n + "'");
			};
		}
	});
}, Fs = (e, t) => {
	let n = {}, r = (e) => {
		e.forEach((e) => {
			n[e] = !0;
		});
	};
	return Bo(e) ? r(e) : r(String(e).split(t)), n;
}, Is = () => {}, Ls = (e, t) => e != null && Number.isFinite(e = +e) ? e : t;
function Rs(e) {
	return !!(e && Ko(e.append) && e[No] === "FormData" && e[Mo]);
}
var zs = (e) => {
	let t = /* @__PURE__ */ new WeakSet(), n = (e) => {
		if (Jo(e)) {
			if (t.has(e)) return;
			if (Ho(e)) return e;
			if (!("toJSON" in e)) {
				t.add(e);
				let r = Bo(e) ? [] : {};
				return hs(e, (e, t) => {
					let i = n(e);
					!Vo(i) && (r[t] = i);
				}), t.delete(e), r;
			}
		}
		return e;
	};
	return n(e);
}, Bs = Ro("AsyncFunction"), Vs = (e) => e && (Jo(e) || Ko(e)) && Ko(e.then) && Ko(e.catch), Hs = ((e, t) => e ? setImmediate : t ? ((e, t) => (_s.addEventListener("message", ({ source: n, data: r }) => {
	n === _s && r === e && t.length && t.shift()();
}, !1), (n) => {
	t.push(n), _s.postMessage(e, "*");
}))(`axios@${Math.random()}`, []) : (e) => setTimeout(e))(typeof setImmediate == "function", Ko(_s.postMessage)), Us = typeof queueMicrotask < "u" ? queueMicrotask.bind(_s) : typeof process < "u" && process.nextTick || Hs, Ws = (e) => e != null && Ko(e[Mo]), X = {
	isArray: Bo,
	isArrayBuffer: Uo,
	isBuffer: Ho,
	isFormData: cs,
	isArrayBufferView: Wo,
	isString: Go,
	isNumber: qo,
	isBoolean: Yo,
	isObject: Jo,
	isPlainObject: Xo,
	isEmptyObject: Zo,
	isReadableStream: us,
	isRequest: ds,
	isResponse: fs,
	isHeaders: ps,
	isUndefined: Vo,
	isDate: Qo,
	isFile: $o,
	isReactNativeBlob: es,
	isReactNative: ts,
	isBlob: ns,
	isRegExp: Ms,
	isFunction: Ko,
	isStream: is,
	isURLSearchParams: ls,
	isTypedArray: Es,
	isFileList: rs,
	forEach: hs,
	merge: ys,
	extend: bs,
	trim: ms,
	stripBOM: xs,
	inherits: Ss,
	toFlatObject: Cs,
	kindOf: Lo,
	kindOfTest: Ro,
	endsWith: ws,
	toArray: Ts,
	forEachEntry: Ds,
	matchAll: Os,
	isHTMLForm: ks,
	hasOwnProperty: Po,
	hasOwnProp: Po,
	hasOwnInPrototypeChain: Fo,
	getSafeProp: Io,
	reduceDescriptors: Ns,
	freezeMethods: Ps,
	toObjectSet: Fs,
	toCamelCase: As,
	noop: Is,
	toFiniteNumber: Ls,
	findKey: gs,
	global: _s,
	isContextDefined: vs,
	isSpecCompliantForm: Rs,
	toJSONObject: zs,
	isAsyncFn: Bs,
	isThenable: Vs,
	setImmediate: Hs,
	asap: Us,
	isIterable: Ws,
	isSafeIterable: (e) => e != null && Fo(e, Mo) && Ws(e)
}, Gs = X.toObjectSet([
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
]), Ks = (e) => {
	let t = {}, n, r, i;
	return e && e.split("\n").forEach(function(e) {
		i = e.indexOf(":"), n = e.substring(0, i).trim().toLowerCase(), r = e.substring(i + 1).trim(), !(!n || t[n] && Gs[n]) && (n === "set-cookie" ? t[n] ? t[n].push(r) : t[n] = [r] : t[n] = t[n] ? t[n] + ", " + r : r);
	}), t;
};
//#endregion
//#region node_modules/.pnpm/axios@1.18.1/node_modules/axios/lib/helpers/sanitizeHeaderValue.js
function qs(e) {
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
var Js = /* @__PURE__ */ RegExp("[\\u0000-\\u0008\\u000a-\\u001f\\u007f]+", "g"), Ys = /* @__PURE__ */ RegExp("[^\\u0009\\u0020-\\u007e\\u0080-\\u00ff]+", "g");
function Xs(e, t) {
	return X.isArray(e) ? e.map((e) => Xs(e, t)) : qs(String(e).replace(t, ""));
}
var Zs = (e) => Xs(e, Js), Qs = (e) => Xs(e, Ys);
function $s(e) {
	let t = Object.create(null);
	return X.forEach(e.toJSON(), (e, n) => {
		t[n] = Qs(e);
	}), t;
}
//#endregion
//#region node_modules/.pnpm/axios@1.18.1/node_modules/axios/lib/core/AxiosHeaders.js
var ec = Symbol("internals");
function tc(e) {
	return e && String(e).trim().toLowerCase();
}
function nc(e) {
	return e === !1 || e == null ? e : X.isArray(e) ? e.map(nc) : Zs(String(e));
}
function rc(e) {
	let t = Object.create(null), n = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g, r;
	for (; r = n.exec(e);) t[r[1]] = r[2];
	return t;
}
var ic = (e) => /^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(e.trim());
function ac(e, t, n, r, i) {
	if (X.isFunction(r)) return r.call(this, t, n);
	if (i && (t = n), X.isString(t)) {
		if (X.isString(r)) return t.indexOf(r) !== -1;
		if (X.isRegExp(r)) return r.test(t);
	}
}
function oc(e) {
	return e.trim().toLowerCase().replace(/([a-z\d])(\w*)/g, (e, t, n) => t.toUpperCase() + n);
}
function sc(e, t) {
	let n = X.toCamelCase(" " + t);
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
var cc = class {
	constructor(e) {
		e && this.set(e);
	}
	set(e, t, n) {
		let r = this;
		function i(e, t, n) {
			let i = tc(t);
			if (!i) return;
			let a = X.findKey(r, i);
			(!a || r[a] === void 0 || n === !0 || n === void 0 && r[a] !== !1) && (r[a || t] = nc(e));
		}
		let a = (e, t) => X.forEach(e, (e, n) => i(e, n, t));
		if (X.isPlainObject(e) || e instanceof this.constructor) a(e, t);
		else if (X.isString(e) && (e = e.trim()) && !ic(e)) a(Ks(e), t);
		else if (X.isObject(e) && X.isSafeIterable(e)) {
			let n = Object.create(null), r, i;
			for (let t of e) {
				if (!X.isArray(t)) throw TypeError("Object iterator must return a key-value pair");
				i = t[0], X.hasOwnProp(n, i) ? (r = n[i], n[i] = X.isArray(r) ? [...r, t[1]] : [r, t[1]]) : n[i] = t[1];
			}
			a(n, t);
		} else e != null && i(t, e, n);
		return this;
	}
	get(e, t) {
		if (e = tc(e), e) {
			let n = X.findKey(this, e);
			if (n) {
				let e = this[n];
				if (!t) return e;
				if (t === !0) return rc(e);
				if (X.isFunction(t)) return t.call(this, e, n);
				if (X.isRegExp(t)) return t.exec(e);
				throw TypeError("parser must be boolean|regexp|function");
			}
		}
	}
	has(e, t) {
		if (e = tc(e), e) {
			let n = X.findKey(this, e);
			return !!(n && this[n] !== void 0 && (!t || ac(this, this[n], n, t)));
		}
		return !1;
	}
	delete(e, t) {
		let n = this, r = !1;
		function i(e) {
			if (e = tc(e), e) {
				let i = X.findKey(n, e);
				i && (!t || ac(n, n[i], i, t)) && (delete n[i], r = !0);
			}
		}
		return X.isArray(e) ? e.forEach(i) : i(e), r;
	}
	clear(e) {
		let t = Object.keys(this), n = t.length, r = !1;
		for (; n--;) {
			let i = t[n];
			(!e || ac(this, this[i], i, e, !0)) && (delete this[i], r = !0);
		}
		return r;
	}
	normalize(e) {
		let t = this, n = {};
		return X.forEach(this, (r, i) => {
			let a = X.findKey(n, i);
			if (a) {
				t[a] = nc(r), delete t[i];
				return;
			}
			let o = e ? oc(i) : String(i).trim();
			o !== i && delete t[i], t[o] = nc(r), n[o] = !0;
		}), this;
	}
	concat(...e) {
		return this.constructor.concat(this, ...e);
	}
	toJSON(e) {
		let t = Object.create(null);
		return X.forEach(this, (n, r) => {
			n != null && n !== !1 && (t[r] = e && X.isArray(n) ? n.join(", ") : n);
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
		let t = (this[ec] = this[ec] = { accessors: {} }).accessors, n = this.prototype;
		function r(e) {
			let r = tc(e);
			t[r] || (sc(n, e), t[r] = !0);
		}
		return X.isArray(e) ? e.forEach(r) : r(e), this;
	}
};
cc.accessor([
	"Content-Type",
	"Content-Length",
	"Accept",
	"Accept-Encoding",
	"User-Agent",
	"Authorization"
]), X.reduceDescriptors(cc.prototype, ({ value: e }, t) => {
	let n = t[0].toUpperCase() + t.slice(1);
	return {
		get: () => e,
		set(e) {
			this[n] = e;
		}
	};
}), X.freezeMethods(cc);
//#endregion
//#region node_modules/.pnpm/axios@1.18.1/node_modules/axios/lib/core/AxiosError.js
var lc = "[REDACTED ****]";
function uc(e) {
	if (X.hasOwnProp(e, "toJSON")) return !0;
	let t = Object.getPrototypeOf(e);
	for (; t && t !== Object.prototype;) {
		if (X.hasOwnProp(t, "toJSON")) return !0;
		t = Object.getPrototypeOf(t);
	}
	return !1;
}
function dc(e, t) {
	let n = new Set(t.map((e) => String(e).toLowerCase())), r = [], i = (e) => {
		if (typeof e != "object" || !e || X.isBuffer(e)) return e;
		if (r.indexOf(e) !== -1) return;
		e instanceof cc && (e = e.toJSON()), r.push(e);
		let t;
		if (X.isArray(e)) t = [], e.forEach((e, n) => {
			let r = i(e);
			X.isUndefined(r) || (t[n] = r);
		});
		else {
			if (!X.isPlainObject(e) && uc(e)) return r.pop(), e;
			t = Object.create(null);
			for (let [r, a] of Object.entries(e)) {
				let e = n.has(r.toLowerCase()) ? lc : i(a);
				X.isUndefined(e) || (t[r] = e);
			}
		}
		return r.pop(), t;
	};
	return i(e);
}
var Z = class e extends Error {
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
		let e = this.config, t = e && X.hasOwnProp(e, "redact") ? e.redact : void 0, n = X.isArray(t) && t.length > 0 ? dc(e, t) : X.toJSONObject(e);
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
Z.ERR_BAD_OPTION_VALUE = "ERR_BAD_OPTION_VALUE", Z.ERR_BAD_OPTION = "ERR_BAD_OPTION", Z.ECONNABORTED = "ECONNABORTED", Z.ETIMEDOUT = "ETIMEDOUT", Z.ECONNREFUSED = "ECONNREFUSED", Z.ERR_NETWORK = "ERR_NETWORK", Z.ERR_FR_TOO_MANY_REDIRECTS = "ERR_FR_TOO_MANY_REDIRECTS", Z.ERR_DEPRECATED = "ERR_DEPRECATED", Z.ERR_BAD_RESPONSE = "ERR_BAD_RESPONSE", Z.ERR_BAD_REQUEST = "ERR_BAD_REQUEST", Z.ERR_CANCELED = "ERR_CANCELED", Z.ERR_NOT_SUPPORT = "ERR_NOT_SUPPORT", Z.ERR_INVALID_URL = "ERR_INVALID_URL", Z.ERR_FORM_DATA_DEPTH_EXCEEDED = "ERR_FORM_DATA_DEPTH_EXCEEDED";
function fc(e) {
	return X.isPlainObject(e) || X.isArray(e);
}
function pc(e) {
	return X.endsWith(e, "[]") ? e.slice(0, -2) : e;
}
function mc(e, t, n) {
	return e ? e.concat(t).map(function(e, t) {
		return e = pc(e), !n && t ? "[" + e + "]" : e;
	}).join(n ? "." : "") : t;
}
function hc(e) {
	return X.isArray(e) && !e.some(fc);
}
var gc = X.toFlatObject(X, {}, null, function(e) {
	return /^is[A-Z]/.test(e);
});
function _c(e, t, n) {
	if (!X.isObject(e)) throw TypeError("target must be an object");
	t ||= new FormData(), n = X.toFlatObject(n, {
		metaTokens: !0,
		dots: !1,
		indexes: !1
	}, !1, function(e, t) {
		return !X.isUndefined(t[e]);
	});
	let r = n.metaTokens, i = n.visitor || m, a = n.dots, o = n.indexes, s = n.Blob || typeof Blob < "u" && Blob, c = n.maxDepth === void 0 ? 100 : n.maxDepth, l = s && X.isSpecCompliantForm(t), u = [];
	if (!X.isFunction(i)) throw TypeError("visitor must be a function");
	function d(e) {
		if (e === null) return "";
		if (X.isDate(e)) return e.toISOString();
		if (X.isBoolean(e)) return e.toString();
		if (!l && X.isBlob(e)) throw new Z("Blob is not supported. Use a Buffer instead.");
		if (X.isArrayBuffer(e) || X.isTypedArray(e)) {
			if (l && typeof s == "function") return new s([e]);
			if (typeof Buffer < "u") return Buffer.from(e);
			throw new Z("Blob is not supported. Use a Buffer instead.", Z.ERR_NOT_SUPPORT);
		}
		return e;
	}
	function f(e) {
		if (e > c) throw new Z("Object is too deeply nested (" + e + " levels). Max depth: " + c, Z.ERR_FORM_DATA_DEPTH_EXCEEDED);
	}
	function p(e, t) {
		if (c === Infinity) return JSON.stringify(e);
		let n = [];
		return JSON.stringify(e, function(e, r) {
			if (!X.isObject(r)) return r;
			for (; n.length && n[n.length - 1] !== this;) n.pop();
			return n.push(r), f(t + n.length - 1), r;
		});
	}
	function m(e, n, i) {
		let s = e;
		if (X.isReactNative(t) && X.isReactNativeBlob(e)) return t.append(mc(i, n, a), d(e)), !1;
		if (e && !i && typeof e == "object") {
			if (X.endsWith(n, "{}")) n = r ? n : n.slice(0, -2), e = p(e, 1);
			else if (X.isArray(e) && hc(e) || (X.isFileList(e) || X.endsWith(n, "[]")) && (s = X.toArray(e))) return n = pc(n), s.forEach(function(e, r) {
				!(X.isUndefined(e) || e === null) && t.append(o === !0 ? mc([n], r, a) : o === null ? n : n + "[]", d(e));
			}), !1;
		}
		return fc(e) ? !0 : (t.append(mc(i, n, a), d(e)), !1);
	}
	let h = Object.assign(gc, {
		defaultVisitor: m,
		convertValue: d,
		isVisitable: fc
	});
	function g(e, n, r = 0) {
		if (!X.isUndefined(e)) {
			if (f(r), u.indexOf(e) !== -1) throw Error("Circular reference detected in " + n.join("."));
			u.push(e), X.forEach(e, function(e, a) {
				(!(X.isUndefined(e) || e === null) && i.call(t, e, X.isString(a) ? a.trim() : a, n, h)) === !0 && g(e, n ? n.concat(a) : [a], r + 1);
			}), u.pop();
		}
	}
	if (!X.isObject(e)) throw TypeError("data must be an object");
	return g(e), t;
}
//#endregion
//#region node_modules/.pnpm/axios@1.18.1/node_modules/axios/lib/helpers/AxiosURLSearchParams.js
function vc(e) {
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
function yc(e, t) {
	this._pairs = [], e && _c(e, this, t);
}
var bc = yc.prototype;
bc.append = function(e, t) {
	this._pairs.push([e, t]);
}, bc.toString = function(e) {
	let t = e ? (t) => e.call(this, t, vc) : vc;
	return this._pairs.map(function(e) {
		return t(e[0]) + "=" + t(e[1]);
	}, "").join("&");
};
//#endregion
//#region node_modules/.pnpm/axios@1.18.1/node_modules/axios/lib/helpers/buildURL.js
function xc(e) {
	return encodeURIComponent(e).replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+");
}
function Sc(e, t, n) {
	if (!t) return e;
	e ||= "";
	let r = X.isFunction(n) ? { serialize: n } : n, i = X.getSafeProp(r, "encode") || xc, a = X.getSafeProp(r, "serialize"), o;
	if (o = a ? a(t, r) : X.isURLSearchParams(t) ? t.toString() : new yc(t, r).toString(i), o) {
		let t = e.indexOf("#");
		t !== -1 && (e = e.slice(0, t)), e += (e.indexOf("?") === -1 ? "?" : "&") + o;
	}
	return e;
}
//#endregion
//#region node_modules/.pnpm/axios@1.18.1/node_modules/axios/lib/core/InterceptorManager.js
var Cc = class {
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
		X.forEach(this.handlers, function(t) {
			t !== null && e(t);
		});
	}
}, wc = {
	silentJSONParsing: !0,
	forcedJSONParsing: !0,
	clarifyTimeoutError: !1,
	legacyInterceptorReqResOrdering: !0,
	advertiseZstdAcceptEncoding: !1,
	validateStatusUndefinedResolves: !0
}, Tc = {
	isBrowser: !0,
	classes: {
		URLSearchParams: typeof URLSearchParams < "u" ? URLSearchParams : yc,
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
}, Ec = /* @__PURE__ */ ue({
	hasBrowserEnv: () => Dc,
	hasStandardBrowserEnv: () => kc,
	hasStandardBrowserWebWorkerEnv: () => Ac,
	navigator: () => Oc,
	origin: () => jc
}), Dc = typeof window < "u" && typeof document < "u", Oc = typeof navigator == "object" && navigator || void 0, kc = Dc && (!Oc || [
	"ReactNative",
	"NativeScript",
	"NS"
].indexOf(Oc.product) < 0), Ac = typeof WorkerGlobalScope < "u" && self instanceof WorkerGlobalScope && typeof self.importScripts == "function", jc = Dc && window.location.href || "http://localhost", Mc = {
	...Ec,
	...Tc
};
//#endregion
//#region node_modules/.pnpm/axios@1.18.1/node_modules/axios/lib/helpers/toURLEncodedForm.js
function Nc(e, t) {
	return _c(e, new Mc.classes.URLSearchParams(), {
		visitor: function(e, t, n, r) {
			return Mc.isNode && X.isBuffer(e) ? (this.append(t, e.toString("base64")), !1) : r.defaultVisitor.apply(this, arguments);
		},
		...t
	});
}
//#endregion
//#region node_modules/.pnpm/axios@1.18.1/node_modules/axios/lib/helpers/formDataToJSON.js
var Pc = 100;
function Fc(e) {
	if (e > Pc) throw new Z("FormData field is too deeply nested (" + e + " levels). Max depth: " + Pc, Z.ERR_FORM_DATA_DEPTH_EXCEEDED);
}
function Ic(e) {
	let t = [], n = /\w+|\[(\w*)]/g, r;
	for (; (r = n.exec(e)) !== null;) Fc(t.length), t.push(r[0] === "[]" ? "" : r[1] || r[0]);
	return t;
}
function Lc(e) {
	let t = {}, n = Object.keys(e), r, i = n.length, a;
	for (r = 0; r < i; r++) a = n[r], t[a] = e[a];
	return t;
}
function Rc(e) {
	function t(e, n, r, i) {
		Fc(i);
		let a = e[i++];
		if (a === "__proto__") return !0;
		let o = Number.isFinite(+a), s = i >= e.length;
		return a = !a && X.isArray(r) ? r.length : a, s ? (X.hasOwnProp(r, a) ? r[a] = X.isArray(r[a]) ? r[a].concat(n) : [r[a], n] : r[a] = n, !o) : ((!X.hasOwnProp(r, a) || !X.isObject(r[a])) && (r[a] = []), t(e, n, r[a], i) && X.isArray(r[a]) && (r[a] = Lc(r[a])), !o);
	}
	if (X.isFormData(e) && X.isFunction(e.entries)) {
		let n = {};
		return X.forEachEntry(e, (e, r) => {
			t(Ic(e), r, n, 0);
		}), n;
	}
	return null;
}
//#endregion
//#region node_modules/.pnpm/axios@1.18.1/node_modules/axios/lib/defaults/index.js
var zc = (e, t) => e != null && X.hasOwnProp(e, t) ? e[t] : void 0;
function Bc(e, t, n) {
	if (X.isString(e)) try {
		return (t || JSON.parse)(e), X.trim(e);
	} catch (e) {
		if (e.name !== "SyntaxError") throw e;
	}
	return (n || JSON.stringify)(e);
}
var Vc = {
	transitional: wc,
	adapter: [
		"xhr",
		"http",
		"fetch"
	],
	transformRequest: [function(e, t) {
		let n = t.getContentType() || "", r = n.indexOf("application/json") > -1, i = X.isObject(e);
		if (i && X.isHTMLForm(e) && (e = new FormData(e)), X.isFormData(e)) return r ? JSON.stringify(Rc(e)) : e;
		if (X.isArrayBuffer(e) || X.isBuffer(e) || X.isStream(e) || X.isFile(e) || X.isBlob(e) || X.isReadableStream(e)) return e;
		if (X.isArrayBufferView(e)) return e.buffer;
		if (X.isURLSearchParams(e)) return t.setContentType("application/x-www-form-urlencoded;charset=utf-8", !1), e.toString();
		let a;
		if (i) {
			let t = zc(this, "formSerializer");
			if (n.indexOf("application/x-www-form-urlencoded") > -1) return Nc(e, t).toString();
			if ((a = X.isFileList(e)) || n.indexOf("multipart/form-data") > -1) {
				let n = zc(this, "env"), r = n && n.FormData;
				return _c(a ? { "files[]": e } : e, r && new r(), t);
			}
		}
		return i || r ? (t.setContentType("application/json", !1), Bc(e)) : e;
	}],
	transformResponse: [function(e) {
		let t = zc(this, "transitional") || Vc.transitional, n = t && t.forcedJSONParsing, r = zc(this, "responseType"), i = r === "json";
		if (X.isResponse(e) || X.isReadableStream(e)) return e;
		if (e && X.isString(e) && (n && !r || i)) {
			let n = !(t && t.silentJSONParsing) && i;
			try {
				return JSON.parse(e, zc(this, "parseReviver"));
			} catch (e) {
				if (n) throw e.name === "SyntaxError" ? Z.from(e, Z.ERR_BAD_RESPONSE, this, null, zc(this, "response")) : e;
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
		FormData: Mc.classes.FormData,
		Blob: Mc.classes.Blob
	},
	validateStatus: function(e) {
		return e >= 200 && e < 300;
	},
	headers: { common: {
		Accept: "application/json, text/plain, */*",
		"Content-Type": void 0
	} }
};
X.forEach([
	"delete",
	"get",
	"head",
	"post",
	"put",
	"patch",
	"query"
], (e) => {
	Vc.headers[e] = {};
});
//#endregion
//#region node_modules/.pnpm/axios@1.18.1/node_modules/axios/lib/core/transformData.js
function Hc(e, t) {
	let n = this || Vc, r = t || n, i = cc.from(r.headers), a = r.data;
	return X.forEach(e, function(e) {
		a = e.call(n, a, i.normalize(), t ? t.status : void 0);
	}), i.normalize(), a;
}
//#endregion
//#region node_modules/.pnpm/axios@1.18.1/node_modules/axios/lib/cancel/isCancel.js
function Uc(e) {
	return !!(e && e.__CANCEL__);
}
//#endregion
//#region node_modules/.pnpm/axios@1.18.1/node_modules/axios/lib/cancel/CanceledError.js
var Wc = class extends Z {
	constructor(e, t, n) {
		super(e ?? "canceled", Z.ERR_CANCELED, t, n), this.name = "CanceledError", this.__CANCEL__ = !0;
	}
};
//#endregion
//#region node_modules/.pnpm/axios@1.18.1/node_modules/axios/lib/core/settle.js
function Gc(e, t, n) {
	let r = n.config.validateStatus;
	!n.status || !r || r(n.status) ? e(n) : t(new Z("Request failed with status code " + n.status, n.status >= 400 && n.status < 500 ? Z.ERR_BAD_REQUEST : Z.ERR_BAD_RESPONSE, n.config, n.request, n));
}
//#endregion
//#region node_modules/.pnpm/axios@1.18.1/node_modules/axios/lib/helpers/parseProtocol.js
function Kc(e) {
	let t = /^([-+\w]{1,25}):(?:\/\/)?/.exec(e);
	return t && t[1] || "";
}
//#endregion
//#region node_modules/.pnpm/axios@1.18.1/node_modules/axios/lib/helpers/speedometer.js
function qc(e, t) {
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
function Jc(e, t) {
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
var Yc = (e, t, n = 3) => {
	let r = 0, i = qc(50, 250);
	return Jc((n) => {
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
}, Xc = (e, t) => {
	let n = e != null;
	return [(r) => t[0]({
		lengthComputable: n,
		total: e,
		loaded: r
	}), t[1]];
}, Zc = (e) => (...t) => X.asap(() => e(...t)), Qc = Mc.hasStandardBrowserEnv ? ((e, t) => (n) => (n = new URL(n, Mc.origin), e.protocol === n.protocol && e.host === n.host && (t || e.port === n.port)))(new URL(Mc.origin), Mc.navigator && /(msie|trident)/i.test(Mc.navigator.userAgent)) : () => !0, $c = Mc.hasStandardBrowserEnv ? {
	write(e, t, n, r, i, a, o) {
		if (typeof document > "u") return;
		let s = [`${e}=${encodeURIComponent(t)}`];
		X.isNumber(n) && s.push(`expires=${new Date(n).toUTCString()}`), X.isString(r) && s.push(`path=${r}`), X.isString(i) && s.push(`domain=${i}`), a === !0 && s.push("secure"), X.isString(o) && s.push(`SameSite=${o}`), document.cookie = s.join("; ");
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
function el(e) {
	return typeof e == "string" && /^([a-z][a-z\d+\-.]*:)?\/\//i.test(e);
}
//#endregion
//#region node_modules/.pnpm/axios@1.18.1/node_modules/axios/lib/helpers/combineURLs.js
function tl(e, t) {
	return t ? e.replace(/\/?\/$/, "") + "/" + t.replace(/^\/+/, "") : e;
}
//#endregion
//#region node_modules/.pnpm/axios@1.18.1/node_modules/axios/lib/core/buildFullPath.js
var nl = /^https?:(?!\/\/)/i, rl = /[\t\n\r]/g;
function il(e) {
	let t = 0;
	for (; t < e.length && e.charCodeAt(t) <= 32;) t++;
	return e.slice(t);
}
function al(e) {
	return il(e).replace(rl, "");
}
function ol(e, t) {
	if (typeof e == "string" && nl.test(al(e))) throw new Z("Invalid URL: missing \"//\" after protocol", Z.ERR_INVALID_URL, t);
}
function sl(e, t, n, r) {
	ol(t, r);
	let i = !el(t);
	return e && (i || n === !1) ? (ol(e, r), tl(e, t)) : t;
}
//#endregion
//#region node_modules/.pnpm/axios@1.18.1/node_modules/axios/lib/core/mergeConfig.js
var cl = (e) => e instanceof cc ? { ...e } : e;
function ll(e, t) {
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
		return X.isPlainObject(e) && X.isPlainObject(t) ? X.merge.call({ caseless: r }, e, t) : X.isPlainObject(t) ? X.merge({}, t) : X.isArray(t) ? t.slice() : t;
	}
	function i(e, t, n, i) {
		if (!X.isUndefined(t)) return r(e, t, n, i);
		if (!X.isUndefined(e)) return r(void 0, e, n, i);
	}
	function a(e, t) {
		if (!X.isUndefined(t)) return r(void 0, t);
	}
	function o(e, t) {
		if (!X.isUndefined(t)) return r(void 0, t);
		if (!X.isUndefined(e)) return r(void 0, e);
	}
	function s(n) {
		let r = X.hasOwnProp(t, "transitional") ? t.transitional : void 0;
		if (!X.isUndefined(r)) if (X.isPlainObject(r)) {
			if (X.hasOwnProp(r, n)) return r[n];
		} else return;
		let i = X.hasOwnProp(e, "transitional") ? e.transitional : void 0;
		if (X.isPlainObject(i) && X.hasOwnProp(i, n)) return i[n];
	}
	function c(n, i, a) {
		if (X.hasOwnProp(t, a)) return r(n, i);
		if (X.hasOwnProp(e, a)) return r(void 0, n);
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
		headers: (e, t, n) => i(cl(e), cl(t), n, !0)
	};
	return X.forEach(Object.keys({
		...e,
		...t
	}), function(r) {
		if (r === "__proto__" || r === "constructor" || r === "prototype") return;
		let a = X.hasOwnProp(l, r) ? l[r] : i, o = a(X.hasOwnProp(e, r) ? e[r] : void 0, X.hasOwnProp(t, r) ? t[r] : void 0, r);
		X.isUndefined(o) && a !== c || (n[r] = o);
	}), X.hasOwnProp(t, "validateStatus") && X.isUndefined(t.validateStatus) && s("validateStatusUndefinedResolves") === !1 && (X.hasOwnProp(e, "validateStatus") ? n.validateStatus = r(void 0, e.validateStatus) : delete n.validateStatus), n;
}
//#endregion
//#region node_modules/.pnpm/axios@1.18.1/node_modules/axios/lib/helpers/resolveConfig.js
var ul = ["content-type", "content-length"];
function dl(e, t, n) {
	if (n !== "content-only") {
		e.set(t);
		return;
	}
	Object.entries(t || {}).forEach(([t, n]) => {
		ul.includes(t.toLowerCase()) && e.set(t, n);
	});
}
var fl = (e) => encodeURIComponent(e).replace(/%([0-9A-F]{2})/gi, (e, t) => String.fromCharCode(parseInt(t, 16)));
function pl(e) {
	let t = ll({}, e), n = (e) => X.hasOwnProp(t, e) ? t[e] : void 0, r = n("data"), i = n("withXSRFToken"), a = n("xsrfHeaderName"), o = n("xsrfCookieName"), s = n("headers"), c = n("auth"), l = n("baseURL"), u = n("allowAbsoluteUrls"), d = n("url");
	if (t.headers = s = cc.from(s), t.url = Sc(sl(l, d, u, t), n("params"), n("paramsSerializer")), c) {
		let t = X.getSafeProp(c, "username") || "", n = X.getSafeProp(c, "password") || "";
		try {
			s.set("Authorization", "Basic " + btoa(t + ":" + (n ? fl(n) : "")));
		} catch (t) {
			throw Z.from(t, Z.ERR_BAD_OPTION_VALUE, e);
		}
	}
	if (X.isFormData(r) && (Mc.hasStandardBrowserEnv || Mc.hasStandardBrowserWebWorkerEnv || X.isReactNative(r) ? s.setContentType(void 0) : X.isFunction(r.getHeaders) && dl(s, r.getHeaders(), n("formDataHeaderPolicy"))), Mc.hasStandardBrowserEnv && (X.isFunction(i) && (i = i(t)), i === !0 || i == null && Qc(t.url))) {
		let e = a && o && $c.read(o);
		e && s.set(a, e);
	}
	return t;
}
var ml = typeof XMLHttpRequest < "u" && function(e) {
	return new Promise(function(t, n) {
		let r = pl(e), i = r.data, a = cc.from(r.headers).normalize(), { responseType: o, onUploadProgress: s, onDownloadProgress: c } = r, l, u, d, f, p;
		function m() {
			f && f(), p && p(), r.cancelToken && r.cancelToken.unsubscribe(l), r.signal && r.signal.removeEventListener("abort", l);
		}
		let h = new XMLHttpRequest();
		h.open(r.method.toUpperCase(), r.url, !0), h.timeout = r.timeout;
		function g() {
			if (!h) return;
			let r = cc.from("getAllResponseHeaders" in h && h.getAllResponseHeaders());
			Gc(function(e) {
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
			h &&= (n(new Z("Request aborted", Z.ECONNABORTED, e, h)), m(), null);
		}, h.onerror = function(t) {
			let r = new Z(t && t.message ? t.message : "Network Error", Z.ERR_NETWORK, e, h);
			r.event = t || null, n(r), m(), h = null;
		}, h.ontimeout = function() {
			let t = r.timeout ? "timeout of " + r.timeout + "ms exceeded" : "timeout exceeded", i = r.transitional || wc;
			r.timeoutErrorMessage && (t = r.timeoutErrorMessage), n(new Z(t, i.clarifyTimeoutError ? Z.ETIMEDOUT : Z.ECONNABORTED, e, h)), m(), h = null;
		}, i === void 0 && a.setContentType(null), "setRequestHeader" in h && X.forEach($s(a), function(e, t) {
			h.setRequestHeader(t, e);
		}), X.isUndefined(r.withCredentials) || (h.withCredentials = !!r.withCredentials), o && o !== "json" && (h.responseType = r.responseType), c && ([d, p] = Yc(c, !0), h.addEventListener("progress", d)), s && h.upload && ([u, f] = Yc(s), h.upload.addEventListener("progress", u), h.upload.addEventListener("loadend", f)), (r.cancelToken || r.signal) && (l = (t) => {
			h &&= (n(!t || t.type ? new Wc(null, e, h) : t), h.abort(), m(), null);
		}, r.cancelToken && r.cancelToken.subscribe(l), r.signal && (r.signal.aborted ? l() : r.signal.addEventListener("abort", l)));
		let _ = Kc(r.url);
		if (_ && !Mc.protocols.includes(_)) {
			n(new Z("Unsupported protocol " + _ + ":", Z.ERR_BAD_REQUEST, e)), m();
			return;
		}
		h.send(i || null);
	});
}, hl = (e, t) => {
	if (e = e ? e.filter(Boolean) : [], !t && !e.length) return;
	let n = new AbortController(), r = !1, i = function(e) {
		if (!r) {
			r = !0, o();
			let t = e instanceof Error ? e : this.reason;
			n.abort(t instanceof Z ? t : new Wc(t instanceof Error ? t.message : t));
		}
	}, a = t && setTimeout(() => {
		a = null, i(new Z(`timeout of ${t}ms exceeded`, Z.ETIMEDOUT));
	}, t), o = () => {
		e &&= (a && clearTimeout(a), a = null, e.forEach((e) => {
			e.unsubscribe ? e.unsubscribe(i) : e.removeEventListener("abort", i);
		}), null);
	};
	e.forEach((e) => e.addEventListener("abort", i, { once: !0 }));
	let { signal: s } = n;
	return s.unsubscribe = () => X.asap(o), s;
}, gl = function* (e, t) {
	let n = e.byteLength;
	if (!t || n < t) {
		yield e;
		return;
	}
	let r = 0, i;
	for (; r < n;) i = r + t, yield e.slice(r, i), r = i;
}, _l = async function* (e, t) {
	for await (let n of vl(e)) yield* gl(n, t);
}, vl = async function* (e) {
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
}, yl = (e, t, n, r) => {
	let i = _l(e, t), a = 0, o, s = (e) => {
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
}, bl = (e) => e >= 48 && e <= 57 || e >= 65 && e <= 70 || e >= 97 && e <= 102, xl = (e, t, n) => t + 2 < n && bl(e.charCodeAt(t + 1)) && bl(e.charCodeAt(t + 2));
function Sl(e) {
	if (!e || typeof e != "string" || !e.startsWith("data:")) return 0;
	let t = e.indexOf(",");
	if (t < 0) return 0;
	let n = e.slice(5, t), r = e.slice(t + 1);
	if (/;base64/i.test(n)) {
		let e = r.length, t = r.length;
		for (let n = 0; n < t; n++) if (r.charCodeAt(n) === 37 && n + 2 < t) {
			let t = r.charCodeAt(n + 1), i = r.charCodeAt(n + 2);
			bl(t) && bl(i) && (e -= 2, n += 2);
		}
		let n = 0, i = t - 1, a = (e) => e >= 2 && r.charCodeAt(e - 2) === 37 && r.charCodeAt(e - 1) === 51 && (r.charCodeAt(e) === 68 || r.charCodeAt(e) === 100);
		i >= 0 && (r.charCodeAt(i) === 61 ? (n++, i--) : a(i) && (n++, i -= 3)), n === 1 && i >= 0 && (r.charCodeAt(i) === 61 || a(i)) && n++;
		let o = Math.floor(e / 4) * 3 - (n || 0);
		return o > 0 ? o : 0;
	}
	let i = 0;
	for (let e = 0, t = r.length; e < t; e++) {
		let n = r.charCodeAt(e);
		if (n === 37 && xl(r, e, t)) i += 1, e += 2;
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
var Cl = "1.18.1", wl = 64 * 1024, { isFunction: Tl } = X, El = (e) => encodeURIComponent(e).replace(/%([0-9A-F]{2})/gi, (e, t) => String.fromCharCode(parseInt(t, 16))), Dl = (e) => {
	if (!X.isString(e)) return e;
	try {
		return decodeURIComponent(e);
	} catch {
		return e;
	}
}, Ol = (e, ...t) => {
	try {
		return !!e(...t);
	} catch {
		return !1;
	}
}, kl = (e) => {
	let t = e.indexOf("://"), n = e;
	return t !== -1 && (n = n.slice(t + 3)), n.includes("@") || n.includes(":");
}, Al = (e) => {
	let t = X.global !== void 0 && X.global !== null ? X.global : globalThis, { ReadableStream: n, TextEncoder: r } = t;
	e = X.merge.call({ skipUndefined: !0 }, {
		Request: t.Request,
		Response: t.Response
	}, e);
	let { fetch: i, Request: a, Response: o } = e, s = i ? Tl(i) : typeof fetch == "function", c = Tl(a), l = Tl(o);
	if (!s) return !1;
	let u = s && Tl(n), d = s && (typeof r == "function" ? ((e) => (t) => e.encode(t))(new r()) : async (e) => new Uint8Array(await new a(e).arrayBuffer())), f = c && u && Ol(() => {
		let e = !1, t = new a(Mc.origin, {
			body: new n(),
			method: "POST",
			get duplex() {
				return e = !0, "half";
			}
		}), r = t.headers.has("Content-Type");
		return t.body != null && t.body.cancel(), e && !r;
	}), p = l && u && Ol(() => X.isReadableStream(new o("").body)), m = { stream: p && ((e) => e.body) };
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
			throw new Z(`Response type '${e}' is not supported`, Z.ERR_NOT_SUPPORT, n);
		});
	});
	let h = async (e) => {
		if (e == null) return 0;
		if (X.isBlob(e)) return e.size;
		if (X.isSpecCompliantForm(e)) return (await new a(Mc.origin, {
			method: "POST",
			body: e
		}).arrayBuffer()).byteLength;
		if (X.isArrayBufferView(e) || X.isArrayBuffer(e)) return e.byteLength;
		if (X.isURLSearchParams(e) && (e += ""), X.isString(e)) return (await d(e)).byteLength;
	}, g = async (e, t) => X.toFiniteNumber(e.getContentLength()) ?? h(t);
	return async (e) => {
		let { url: t, method: n, data: s, signal: l, cancelToken: d, timeout: _, onDownloadProgress: v, onUploadProgress: y, responseType: b, headers: x, withCredentials: S = "same-origin", fetchOptions: C, maxContentLength: w, maxBodyLength: T } = pl(e), E = X.isNumber(w) && w > -1, D = X.isNumber(T) && T > -1, O = (t) => X.hasOwnProp(e, t) ? e[t] : void 0, k = i || fetch;
		b = b ? (b + "").toLowerCase() : "text";
		let A = hl([l, d && d.toAbortSignal()], _), j = null, M = A && A.unsubscribe && (() => {
			A.unsubscribe();
		}), N, P = null, F = () => new Z("Request body larger than maxBodyLength limit", Z.ERR_BAD_REQUEST, e, j);
		try {
			let i, l = O("auth");
			if (l && (i = {
				username: X.getSafeProp(l, "username") || "",
				password: X.getSafeProp(l, "password") || ""
			}), kl(t)) {
				let e = new URL(t, Mc.origin);
				!i && (e.username || e.password) && (i = {
					username: Dl(e.username),
					password: Dl(e.password)
				}), (e.username || e.password) && (e.username = "", e.password = "", t = e.href);
			}
			if (i && (x.delete("authorization"), x.set("Authorization", "Basic " + btoa(El((i.username || "") + ":" + (i.password || ""))))), E && typeof t == "string" && t.startsWith("data:") && Sl(t) > w) throw new Z("maxContentLength size of " + w + " exceeded", Z.ERR_BAD_RESPONSE, e, j);
			if (D && n !== "get" && n !== "head") {
				let e = await h(s);
				if (typeof e == "number" && isFinite(e) && (N = e, e > T)) throw F();
			}
			let d = D && (X.isReadableStream(s) || X.isStream(s)), _ = (e, t, n) => yl(e, wl, (e) => {
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
					if (X.isFormData(s) && (n = e.headers.get("content-type")) && x.setContentType(n), e.body) {
						let [t, n] = y && Xc(N, Yc(Zc(y))) || [];
						s = _(e.body, t, n);
					}
				}
			} else if (d && !c && u && n !== "get" && n !== "head") s = _(s);
			else if (d && c && !f && n !== "get" && n !== "head") throw new Z("Stream request bodies are not supported by the current fetch implementation", Z.ERR_NOT_SUPPORT, e, j);
			X.isString(S) || (S = S ? "include" : "omit");
			let I = c && "credentials" in a.prototype;
			if (X.isFormData(s)) {
				let e = x.getContentType();
				e && /^multipart\/form-data/i.test(e) && !/boundary=/i.test(e) && x.delete("content-type");
			}
			x.set("User-Agent", "axios/" + Cl, !1);
			let L = {
				...C,
				signal: A,
				method: n.toUpperCase(),
				headers: $s(x.normalize()),
				body: s,
				duplex: "half",
				credentials: I ? S : void 0
			};
			j = c && new a(t, L);
			let R = await (c ? k(j, C) : k(t, L)), z = cc.from(R.headers);
			if (E) {
				let t = X.toFiniteNumber(z.getContentLength());
				if (t != null && t > w) throw new Z("maxContentLength size of " + w + " exceeded", Z.ERR_BAD_RESPONSE, e, j);
			}
			let B = p && (b === "stream" || b === "response");
			if (p && R.body && (v || E || B && M)) {
				let t = {};
				[
					"status",
					"statusText",
					"headers"
				].forEach((e) => {
					t[e] = R[e];
				});
				let n = X.toFiniteNumber(z.getContentLength()), [r, i] = v && Xc(n, Yc(Zc(v), !0)) || [], a = 0;
				R = new o(yl(R.body, wl, (t) => {
					if (E && (a = t, a > w)) throw new Z("maxContentLength size of " + w + " exceeded", Z.ERR_BAD_RESPONSE, e, j);
					r && r(t);
				}, () => {
					i && i(), M && M();
				}), t);
			}
			b ||= "text";
			let V = await m[X.findKey(m, b) || "text"](R, e);
			if (E && !p && !B) {
				let t;
				if (V != null && (typeof V.byteLength == "number" ? t = V.byteLength : typeof V.size == "number" ? t = V.size : typeof V == "string" && (t = typeof r == "function" ? new r().encode(V).byteLength : V.length)), typeof t == "number" && t > w) throw new Z("maxContentLength size of " + w + " exceeded", Z.ERR_BAD_RESPONSE, e, j);
			}
			return !B && M && M(), await new Promise((t, n) => {
				Gc(t, n, {
					data: V,
					headers: cc.from(R.headers),
					status: R.status,
					statusText: R.statusText,
					config: e,
					request: j
				});
			});
		} catch (t) {
			if (M && M(), A && A.aborted && A.reason instanceof Z) {
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
			if (t instanceof Z) throw j && !t.request && (t.request = j), t;
			if (t && t.name === "TypeError" && /Load failed|fetch/i.test(t.message)) {
				let n = new Z("Network Error", Z.ERR_NETWORK, e, j, t && t.response);
				throw Object.defineProperty(n, "cause", {
					__proto__: null,
					value: t.cause || t,
					writable: !0,
					enumerable: !1,
					configurable: !0
				}), n;
			}
			throw Z.from(t, t && t.code, e, j, t && t.response);
		}
	};
}, jl = /* @__PURE__ */ new Map(), Ml = (e) => {
	let t = e && e.env || {}, { fetch: n, Request: r, Response: i } = t, a = [
		r,
		i,
		n
	], o = a.length, s, c, l = jl;
	for (; o--;) s = a[o], c = l.get(s), c === void 0 && l.set(s, c = o ? /* @__PURE__ */ new Map() : Al(t)), l = c;
	return c;
};
Ml();
//#endregion
//#region node_modules/.pnpm/axios@1.18.1/node_modules/axios/lib/adapters/adapters.js
var Nl = {
	http: null,
	xhr: ml,
	fetch: { get: Ml }
};
X.forEach(Nl, (e, t) => {
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
var Pl = (e) => `- ${e}`, Fl = (e) => X.isFunction(e) || e === null || e === !1;
function Il(e, t) {
	e = X.isArray(e) ? e : [e];
	let { length: n } = e, r, i, a = {};
	for (let o = 0; o < n; o++) {
		r = e[o];
		let n;
		if (i = r, !Fl(r) && (i = Nl[(n = String(r)).toLowerCase()], i === void 0)) throw new Z(`Unknown adapter '${n}'`);
		if (i && (X.isFunction(i) || (i = i.get(t)))) break;
		a[n || "#" + o] = i;
	}
	if (!i) {
		let e = Object.entries(a).map(([e, t]) => `adapter ${e} ` + (t === !1 ? "is not supported by the environment" : "is not available in the build"));
		throw new Z("There is no suitable adapter to dispatch the request " + (n ? e.length > 1 ? "since :\n" + e.map(Pl).join("\n") : " " + Pl(e[0]) : "as no adapter specified"), Z.ERR_NOT_SUPPORT);
	}
	return i;
}
var Ll = {
	getAdapter: Il,
	adapters: Nl
};
//#endregion
//#region node_modules/.pnpm/axios@1.18.1/node_modules/axios/lib/core/dispatchRequest.js
function Rl(e) {
	if (e.cancelToken && e.cancelToken.throwIfRequested(), e.signal && e.signal.aborted) throw new Wc(null, e);
}
function zl(e) {
	return Rl(e), e.headers = cc.from(e.headers), e.data = Hc.call(e, e.transformRequest), [
		"post",
		"put",
		"patch"
	].indexOf(e.method) !== -1 && e.headers.setContentType("application/x-www-form-urlencoded", !1), Ll.getAdapter(e.adapter || Vc.adapter, e)(e).then(function(t) {
		Rl(e), e.response = t;
		try {
			t.data = Hc.call(e, e.transformResponse, t);
		} finally {
			delete e.response;
		}
		return t.headers = cc.from(t.headers), t;
	}, function(t) {
		if (!Uc(t) && (Rl(e), t && t.response)) {
			e.response = t.response;
			try {
				t.response.data = Hc.call(e, e.transformResponse, t.response);
			} finally {
				delete e.response;
			}
			t.response.headers = cc.from(t.response.headers);
		}
		return Promise.reject(t);
	});
}
//#endregion
//#region node_modules/.pnpm/axios@1.18.1/node_modules/axios/lib/helpers/validator.js
var Bl = {};
[
	"object",
	"boolean",
	"number",
	"function",
	"string",
	"symbol"
].forEach((e, t) => {
	Bl[e] = function(n) {
		return typeof n === e || "a" + (t < 1 ? "n " : " ") + e;
	};
});
var Vl = {};
Bl.transitional = function(e, t, n) {
	function r(e, t) {
		return "[Axios v" + Cl + "] Transitional option '" + e + "'" + t + (n ? ". " + n : "");
	}
	return (n, i, a) => {
		if (e === !1) throw new Z(r(i, " has been removed" + (t ? " in " + t : "")), Z.ERR_DEPRECATED);
		return t && !Vl[i] && (Vl[i] = !0, console.warn(r(i, " has been deprecated since v" + t + " and will be removed in the near future"))), !e || e(n, i, a);
	};
}, Bl.spelling = function(e) {
	return (t, n) => (console.warn(`${n} is likely a misspelling of ${e}`), !0);
};
function Hl(e, t, n) {
	if (typeof e != "object" || !e) throw new Z("options must be an object", Z.ERR_BAD_OPTION_VALUE);
	let r = Object.keys(e), i = r.length;
	for (; i-- > 0;) {
		let a = r[i], o = Object.prototype.hasOwnProperty.call(t, a) ? t[a] : void 0;
		if (o) {
			let t = e[a], n = t === void 0 || o(t, a, e);
			if (n !== !0) throw new Z("option " + a + " must be " + n, Z.ERR_BAD_OPTION_VALUE);
			continue;
		}
		if (n !== !0) throw new Z("Unknown option " + a, Z.ERR_BAD_OPTION);
	}
}
var Ul = {
	assertOptions: Hl,
	validators: Bl
}, Wl = Ul.validators, Gl = class {
	constructor(e) {
		this.defaults = e || {}, this.interceptors = {
			request: new Cc(),
			response: new Cc()
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
		typeof e == "string" ? (t ||= {}, t.url = e) : t = e || {}, t = ll(this.defaults, t);
		let { transitional: n, paramsSerializer: r, headers: i } = t;
		n !== void 0 && Ul.assertOptions(n, {
			silentJSONParsing: Wl.transitional(Wl.boolean),
			forcedJSONParsing: Wl.transitional(Wl.boolean),
			clarifyTimeoutError: Wl.transitional(Wl.boolean),
			legacyInterceptorReqResOrdering: Wl.transitional(Wl.boolean),
			advertiseZstdAcceptEncoding: Wl.transitional(Wl.boolean),
			validateStatusUndefinedResolves: Wl.transitional(Wl.boolean)
		}, !1), r != null && (X.isFunction(r) ? t.paramsSerializer = { serialize: r } : Ul.assertOptions(r, {
			encode: Wl.function,
			serialize: Wl.function
		}, !0)), t.allowAbsoluteUrls !== void 0 || (this.defaults.allowAbsoluteUrls === void 0 ? t.allowAbsoluteUrls = !0 : t.allowAbsoluteUrls = this.defaults.allowAbsoluteUrls), Ul.assertOptions(t, {
			baseUrl: Wl.spelling("baseURL"),
			withXsrfToken: Wl.spelling("withXSRFToken")
		}, !0), t.method = (t.method || this.defaults.method || "get").toLowerCase();
		let a = i && X.merge(i.common, i[t.method]);
		i && X.forEach([
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
		}), t.headers = cc.concat(a, i);
		let o = [], s = !0;
		this.interceptors.request.forEach(function(e) {
			if (typeof e.runWhen == "function" && e.runWhen(t) === !1) return;
			s &&= e.synchronous;
			let n = t.transitional || wc;
			n && n.legacyInterceptorReqResOrdering ? o.unshift(e.fulfilled, e.rejected) : o.push(e.fulfilled, e.rejected);
		});
		let c = [];
		this.interceptors.response.forEach(function(e) {
			c.push(e.fulfilled, e.rejected);
		});
		let l, u = 0, d;
		if (!s) {
			let e = [zl.bind(this), void 0];
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
			l = zl.call(this, f);
		} catch (e) {
			return Promise.reject(e);
		}
		for (u = 0, d = c.length; u < d;) l = l.then(c[u++], c[u++]);
		return l;
	}
	getUri(e) {
		return e = ll(this.defaults, e), Sc(sl(e.baseURL, e.url, e.allowAbsoluteUrls, e), e.params, e.paramsSerializer);
	}
};
X.forEach([
	"delete",
	"get",
	"head",
	"options"
], function(e) {
	Gl.prototype[e] = function(t, n) {
		return this.request(ll(n || {}, {
			method: e,
			url: t,
			data: n && X.hasOwnProp(n, "data") ? n.data : void 0
		}));
	};
}), X.forEach([
	"post",
	"put",
	"patch",
	"query"
], function(e) {
	function t(t) {
		return function(n, r, i) {
			return this.request(ll(i || {}, {
				method: e,
				headers: t ? { "Content-Type": "multipart/form-data" } : {},
				url: n,
				data: r
			}));
		};
	}
	Gl.prototype[e] = t(), e !== "query" && (Gl.prototype[e + "Form"] = t(!0));
});
//#endregion
//#region node_modules/.pnpm/axios@1.18.1/node_modules/axios/lib/cancel/CancelToken.js
var Kl = class e {
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
			n.reason || (n.reason = new Wc(e, r, i), t(n.reason));
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
function ql(e) {
	return function(t) {
		return e.apply(null, t);
	};
}
//#endregion
//#region node_modules/.pnpm/axios@1.18.1/node_modules/axios/lib/helpers/isAxiosError.js
function Jl(e) {
	return X.isObject(e) && e.isAxiosError === !0;
}
//#endregion
//#region node_modules/.pnpm/axios@1.18.1/node_modules/axios/lib/helpers/HttpStatusCode.js
var Yl = {
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
Object.entries(Yl).forEach(([e, t]) => {
	Yl[t] = e;
});
//#endregion
//#region node_modules/.pnpm/axios@1.18.1/node_modules/axios/lib/axios.js
function Xl(e) {
	let t = new Gl(e), n = ko(Gl.prototype.request, t);
	return X.extend(n, Gl.prototype, t, { allOwnKeys: !0 }), X.extend(n, t, null, { allOwnKeys: !0 }), n.create = function(t) {
		return Xl(ll(e, t));
	}, n;
}
var Zl = Xl(Vc);
Zl.Axios = Gl, Zl.CanceledError = Wc, Zl.CancelToken = Kl, Zl.isCancel = Uc, Zl.VERSION = Cl, Zl.toFormData = _c, Zl.AxiosError = Z, Zl.Cancel = Zl.CanceledError, Zl.all = function(e) {
	return Promise.all(e);
}, Zl.spread = ql, Zl.isAxiosError = Jl, Zl.mergeConfig = ll, Zl.AxiosHeaders = cc, Zl.formToJSON = (e) => Rc(X.isHTMLForm(e) ? new FormData(e) : e), Zl.getAdapter = Ll.getAdapter, Zl.HttpStatusCode = Yl, Zl.default = Zl;
//#endregion
//#region node_modules/.pnpm/axios@1.18.1/node_modules/axios/index.js
var { Axios: Ql, AxiosError: $l, CanceledError: eu, isCancel: tu, CancelToken: nu, VERSION: ru, all: iu, Cancel: au, isAxiosError: ou, spread: su, toFormData: cu, AxiosHeaders: lu, HttpStatusCode: uu, formToJSON: du, getAdapter: fu, mergeConfig: pu, create: mu } = Zl, hu = null;
function gu(e) {
	if (hu !== null) {
		console.warn("[LinID CoreLib] HTTP client has already been initialized. Re-initialization is ignored.");
		return;
	}
	hu = e;
}
function _u() {
	if (hu === null) throw Error("[LinID CoreLib] HTTP client is not initialized. Call setHttpClient() first.");
	return hu;
}
//#endregion
//#region src/services/linidModuleConfigurationService.ts
var vu = /* @__PURE__ */ new Map();
function yu(e) {
	vu.set(e.instanceId, e);
}
function bu(e) {
	let t = vu.get(e);
	if (!t) throw Error(`[LinID CoreLib] No module host configuration found for instanceId: ${e}`);
	return t;
}
//#endregion
//#region src/services/linidEntityService.ts
async function xu(e, t) {
	let n = bu(e);
	return _u().post(`/${n.apiEndpoint}`, t).then(({ data: e }) => e);
}
async function Su(e, t, n) {
	let r = bu(e);
	return _u().put(`/${r.apiEndpoint}/${t}`, n).then(({ data: e }) => e);
}
async function Cu(e, t, n) {
	let r = bu(e);
	return _u().get(`/${r.apiEndpoint}`, { params: {
		...t,
		...n
	} }).then(({ data: e }) => e);
}
async function wu(e, t) {
	let n = bu(e);
	return _u().get(`/${n.apiEndpoint}/${t}`).then(({ data: e }) => e);
}
async function Tu(e, t) {
	let n = bu(e);
	return _u().delete(`/${n.apiEndpoint}/${t}`);
}
async function Eu(e, t, n) {
	let r = bu(e);
	await _u().post(`/${r.apiEndpoint}/validate/${t}`, n, { headers: { "Content-Type": "application/json" } });
}
//#endregion
//#region src/services/objectService.ts
function Du(e, t) {
	if (!ku(e) || !ku(t)) return t;
	let n = { ...e };
	for (let r of Object.keys(t)) n[r] = Du(e[r], t[r]);
	return n;
}
function Ou(e) {
	let t = {};
	for (let [n, r] of Object.entries(e)) {
		let e = n.split("."), i = t;
		e.forEach((t, n) => {
			n === e.length - 1 ? i[t] = r : (ku(i[t]) || (i[t] = {}), i = i[t]);
		});
	}
	return t;
}
function ku(e) {
	return typeof e == "object" && !!e && !Array.isArray(e);
}
function Au(e, t) {
	return typeof e != "object" || !e ? e : Object.fromEntries(Object.entries(e).map(([e, n]) => [t(e), ku(n) ? Au(n, t) : n]));
}
function ju(e, t) {
	if (e === t || typeof e == "number" && typeof t == "number" && Number.isNaN(e) && Number.isNaN(t)) return !0;
	if (e == null || t == null || typeof e != "object" || typeof t != "object" || Array.isArray(e) !== Array.isArray(t)) return !1;
	let n = Object.keys(e), r = Object.keys(t);
	if (n.length !== r.length) return !1;
	let i = e, a = t;
	return n.every((e) => Object.prototype.hasOwnProperty.call(a, e) && ju(i[e], a[e]));
}
function Mu(e, t) {
	if (Array.isArray(e) && Array.isArray(t)) {
		if (e.length !== t.length) return !1;
		let n = /* @__PURE__ */ new Set();
		return e.every((e) => {
			let r = t.findIndex((t, r) => !n.has(r) && Mu(e, t));
			return r === -1 ? !1 : (n.add(r), !0);
		});
	}
	if (ku(e) && ku(t)) {
		let n = Object.keys(e), r = Object.keys(t);
		return n.length === r.length && n.every((n) => Object.prototype.hasOwnProperty.call(t, n) && Mu(e[n], t[n]));
	}
	return ju(e, t);
}
//#endregion
//#region src/services/i18nService.ts
var Nu = null;
function Pu(e) {
	if (Nu !== null) {
		console.warn("[LinID CoreLib] I18n has already been initialized. Re-initialization is ignored.");
		return;
	}
	Nu = e;
}
function Fu() {
	if (Nu === null) throw Error("[LinID CoreLib] I18n is not initialized. Call setI18nInstance() first.");
	return Nu;
}
//#endregion
//#region src/stores/linidUiStore.ts
var Iu = () => Lu(Ze()), Lu = q("LinidUiStore", {
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
}), Ru = () => zu(Ze()), zu = q("LinidUserPreferenceStore", {
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
function Bu() {
	let e = Ru();
	function t() {
		return _u().get("user-preferences").then(({ data: t }) => {
			e.setUserPreferences(t);
		});
	}
	function n(t, n) {
		return _u().post("user-preferences", {
			key: t,
			value: n
		}).then(({ data: t }) => {
			e.setUserPreference(t.key, t.value);
		});
	}
	function r(t) {
		return _u().delete(`user-preferences/${t}`).then(() => {
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
function Vu(e) {
	let { t, te: n, tm: r } = Da({
		useScope: "global",
		__i18n: Fu().global
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
var Hu = "language";
function Uu(e) {
	let t = Iu();
	return !!e && t.i18n.languages.includes(e);
}
function Wu() {
	let { userPreferenceStore: e } = Bu(), t = Iu();
	return [e.userPreferences?.[Hu], localStorage.getItem(Hu)].find(Uu) ?? t.i18n.locale;
}
async function Gu(e) {
	let { userPreferenceStore: t, saveUserPreference: n } = Bu(), r = t.userPreferences?.[Hu];
	localStorage.setItem(Hu, e), e !== r && await n(Hu, e);
}
async function Ku(e) {
	let t = Iu(), n = Fu();
	n.global.locale.value = e, t.setLocale(e), await Gu(e);
}
//#endregion
//#region src/composables/useFieldValidation.ts
var qu = /* @__PURE__ */ new Set([uu.BadRequest, uu.NotFound]);
function Ju(e) {
	return Zl.isAxiosError(e) && e.response?.status != null && qu.has(e.response.status);
}
function Yu(e) {
	let { t } = Vu(e), { toDayjs: n } = at();
	async function r(e, n, r) {
		try {
			return await Eu(e, n, r), !0;
		} catch (e) {
			return Ju(e) ? e.response.data.error : t("validation.unknownError");
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
		return e == null ? !0 : (typeof e == "object" ? n.some((t) => Mu(e, t)) : n.some((t) => t != null && String(t) === String(e))) ? t("validation.unique") : !0;
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
//#region src/composables/useNotify.ts
function Xu() {
	function e(e) {
		Do.next({
			key: "notify",
			data: e
		});
	}
	return { Notify: e };
}
//#endregion
//#region src/services/nunjucksService.ts
var Zu = null;
function Qu(e) {
	if (Zu !== null) {
		console.warn("[LinID CoreLib] Nunjucks environment has already been initialized. Re-initialization is ignored.");
		return;
	}
	Zu = e;
}
function $u() {
	if (Zu === null) throw Error("[LinID CoreLib] Nunjucks environment is not initialized. Call setNunjucksEnv() first.");
	return Zu;
}
//#endregion
//#region src/composables/useNunjucks.ts
function ed() {
	let e = $u();
	function t(n, r) {
		return typeof n == "string" ? e.renderString(n, r) : Array.isArray(n) ? n.map((e) => t(e, r)) : typeof n == "object" && n && Object.getPrototypeOf(n) === Object.prototype ? Object.fromEntries(Object.entries(n).map(([e, n]) => [e, t(n, r)])) : n;
	}
	return { render: t };
}
//#endregion
//#region src/composables/usePagination.ts
function td() {
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
//#region node_modules/.pnpm/quasar@2.21.1/node_modules/quasar/dist/quasar.client.js
var nd = null;
function rd() {
	return nd === null ? nd = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {} : nd;
}
typeof __QUASAR_SSR__ != "boolean" && (rd().__QUASAR_SSR__ = !1), typeof __QUASAR_SSR_CLIENT__ != "boolean" && (rd().__QUASAR_SSR_CLIENT__ = !1), typeof __QUASAR_SSR_PWA__ != "boolean" && (rd().__QUASAR_SSR_PWA__ = !1);
function id(e, t, n, r) {
	return Object.defineProperty(e, t, {
		get: n,
		set: r,
		enumerable: !0
	}), e;
}
function ad(e, t) {
	for (let n in t) id(e, n, t[n]);
	return e;
}
var od = L(__QUASAR_SSR_CLIENT__ && (!__QUASAR_SSR_PWA__ || "serverRendered" in document.body.dataset)), sd;
function cd(e, t) {
	let n = /(edg|edge|edga|edgios)\/([\w.]+)/.exec(e) || /(opr)[\/]([\w.]+)/.exec(e) || /(vivaldi)[\/]([\w.]+)/.exec(e) || /(chrome|crios)[\/]([\w.]+)/.exec(e) || /(version)(applewebkit)[\/]([\w.]+).*(safari)[\/]([\w.]+)/.exec(e) || /(webkit)[\/]([\w.]+).*(version)[\/]([\w.]+).*(safari)[\/]([\w.]+)/.exec(e) || /(firefox|fxios)[\/]([\w.]+)/.exec(e) || /(webkit)[\/]([\w.]+)/.exec(e) || /(opera)(?:.*version|)[\/]([\w.]+)/.exec(e) || [];
	return {
		browser: n[5] || n[3] || n[1] || "",
		version: n[4] || n[2] || "0",
		platform: t[0] || ""
	};
}
function ld(e) {
	return /(ipad)/.exec(e) || /(ipod)/.exec(e) || /(windows phone)/.exec(e) || /(iphone)/.exec(e) || /(kindle)/.exec(e) || /(silk)/.exec(e) || /(android)/.exec(e) || /(win)/.exec(e) || /(mac)/.exec(e) || /(linux)/.exec(e) || /(cros)/.exec(e) || /(playbook)/.exec(e) || /(bb)/.exec(e) || /(blackberry)/.exec(e) || [];
}
var ud = "ontouchstart" in window || window.navigator.maxTouchPoints > 0;
function dd(e) {
	let t = e.toLowerCase(), n = cd(t, ld(t)), r = {
		mobile: !1,
		desktop: !1,
		cordova: !1,
		capacitor: !1,
		nativeMobile: !1,
		electron: !1,
		bex: !1,
		linux: !1,
		mac: !1,
		win: !1,
		cros: !1,
		chrome: !1,
		firefox: !1,
		opera: !1,
		safari: !1,
		vivaldi: !1,
		edge: !1,
		edgeChromium: !1,
		ie: !1,
		webkit: !1,
		android: !1,
		ios: !1,
		ipad: !1,
		iphone: !1,
		ipod: !1,
		kindle: !1,
		winphone: !1,
		blackberry: !1,
		playbook: !1,
		silk: !1
	};
	n.browser && (r[n.browser] = !0, r.version = n.version, r.versionNumber = Number.parseInt(n.version, 10)), n.platform && (r[n.platform] = !0);
	let i = r.android || r.ios || r.bb || r.blackberry || r.ipad || r.iphone || r.ipod || r.kindle || r.playbook || r.silk || r["windows phone"];
	if (i === !0 || t.includes("mobile") ? r.mobile = !0 : r.desktop = !0, r["windows phone"] && (r.winphone = !0, delete r["windows phone"]), r.edga || r.edgios || r.edg ? (r.edge = !0, n.browser = "edge") : r.crios ? (r.chrome = !0, n.browser = "chrome") : r.fxios && (r.firefox = !0, n.browser = "firefox"), (r.ipod || r.ipad || r.iphone) && (r.ios = !0), r.vivaldi &&= (n.browser = "vivaldi", !0), (r.chrome || r.opr || r.safari || r.vivaldi || r.mobile && !r.ios && !i) && (r.webkit = !0), r.opr && (n.browser = "opera", r.opera = !0), r.safari && (r.blackberry || r.bb ? (n.browser = "blackberry", r.blackberry = !0) : r.playbook ? (n.browser = "playbook", r.playbook = !0) : r.android ? (n.browser = "android", r.android = !0) : r.kindle ? (n.browser = "kindle", r.kindle = !0) : r.silk &&= (n.browser = "silk", !0)), r.name = n.browser, r.platform = n.platform, t.includes("electron")) r.electron = !0;
	else if (document.location.href.includes("-extension://")) r.bex = !0;
	else {
		if (window.Capacitor === void 0 ? (window._cordovaNative !== void 0 || window.cordova !== void 0) && (r.cordova = !0, r.nativeMobile = !0, r.nativeMobileWrapper = "cordova") : (r.capacitor = !0, r.nativeMobile = !0, r.nativeMobileWrapper = "capacitor"), od.value && (sd = { is: { ...r } }), ud && r.mac && (r.desktop && r.safari || r.nativeMobile && !r.android && !r.ios && !r.ipad)) {
			delete r.mac, delete r.desktop;
			let e = Math.min(window.innerHeight, window.innerWidth) > 414 ? "ipad" : "iphone";
			Object.assign(r, {
				mobile: !0,
				ios: !0,
				platform: e,
				[e]: !0
			});
		}
		!r.mobile && window.navigator.userAgentData && window.navigator.userAgentData.mobile && (delete r.desktop, r.mobile = !0);
	}
	return r;
}
var fd = navigator.userAgent || navigator.vendor || window.opera, pd = {
	has: {
		touch: !1,
		webStorage: !1
	},
	within: { iframe: !1 }
}, md = {
	userAgent: fd,
	is: dd(fd),
	has: { touch: ud },
	within: { iframe: window.self !== window.top }
}, hd = { install(e) {
	let { $q: t } = e;
	od.value ? (e.onSSRHydrated.push(() => {
		Object.assign(t.platform, md), od.value = !1;
	}), t.platform = I(this)) : t.platform = this;
} };
{
	let e;
	id(md.has, "webStorage", () => {
		if (e !== void 0) return e;
		try {
			if (window.localStorage) return e = !0, !0;
		} catch {}
		return e = !1, !1;
	}), Object.assign(hd, md), od.value && (Object.assign(hd, sd, pd), sd = null);
}
function Q(e) {
	return S(p(e));
}
function gd(e) {
	return S(e);
}
var _d = (e, t) => {
	let n = I(e);
	for (let r in e) id(t, r, () => n[r], (e) => {
		n[r] = e;
	});
	return t;
}, vd = {
	hasPassive: !1,
	passiveCapture: !0,
	notPassiveCapture: !0
};
try {
	let e = Object.defineProperty({}, "passive", { get() {
		Object.assign(vd, {
			hasPassive: !0,
			passive: { passive: !0 },
			notPassive: { passive: !1 },
			passiveCapture: {
				passive: !0,
				capture: !0
			},
			notPassiveCapture: {
				passive: !1,
				capture: !0
			}
		});
	} });
	window.addEventListener("qtest", null, e), window.removeEventListener("qtest", null, e);
} catch {}
function yd() {}
function bd(e) {
	return e.button === 0;
}
function xd(e) {
	return e.touches && e.touches[0] ? e = e.touches[0] : e.changedTouches && e.changedTouches[0] ? e = e.changedTouches[0] : e.targetTouches && e.targetTouches[0] && (e = e.targetTouches[0]), {
		top: e.clientY,
		left: e.clientX
	};
}
function Sd(e) {
	e.stopPropagation();
}
function Cd(e) {
	e.cancelable !== !1 && e.preventDefault();
}
function wd(e) {
	e.cancelable !== !1 && e.preventDefault(), e.stopPropagation();
}
function Td(e, t) {
	if (e === void 0 || t && e.__dragPrevented) return;
	let n = t ? (e) => {
		e.__dragPrevented = !0, e.addEventListener("dragstart", Cd, vd.notPassiveCapture);
	} : (e) => {
		delete e.__dragPrevented, e.removeEventListener("dragstart", Cd, vd.notPassiveCapture);
	};
	e.querySelectorAll("a, img").forEach(n);
}
function Ed(e, t, n) {
	let r = `__q_${t}_evt`;
	e[r] = [...e[r] ?? [], ...n], n.forEach((t) => {
		t[0].addEventListener(t[1], e[t[2]], vd[t[3]]);
	});
}
function Dd(e, t) {
	let n = `__q_${t}_evt`;
	e[n] !== void 0 && (e[n].forEach((t) => {
		t[0].removeEventListener(t[1], e[t[2]], vd[t[3]]);
	}), e[n] = void 0);
}
function Od(e, t = 250, n) {
	let r = null;
	function i(...i) {
		r === null ? n && e.apply(this, i) : clearTimeout(r), r = setTimeout(() => {
			r = null, n || e.apply(this, i);
		}, t);
	}
	return i.cancel = () => {
		r !== null && clearTimeout(r);
	}, i;
}
var kd = [
	"sm",
	"md",
	"lg",
	"xl"
], { passive: Ad } = vd;
_d({
	width: 0,
	height: 0,
	name: "xs",
	sizes: {
		sm: 600,
		md: 1024,
		lg: 1440,
		xl: 1920
	},
	lt: {
		sm: !0,
		md: !0,
		lg: !0,
		xl: !0
	},
	gt: {
		xs: !1,
		sm: !1,
		md: !1,
		lg: !1
	},
	xs: !0,
	sm: !1,
	md: !1,
	lg: !1,
	xl: !1
}, {
	setSizes: yd,
	setDebounce: yd,
	install({ $q: e, onSSRHydrated: t }) {
		if (e.screen = this, this.__installed) {
			e.config.screen !== void 0 && (e.config.screen.bodyClasses ? this.__update(!0) : document.body.classList.remove(`screen--${this.name}`));
			return;
		}
		let { visualViewport: n } = window, r = n || window, i = document.scrollingElement || document.documentElement, a = n === void 0 || md.is.mobile ? () => [Math.max(window.innerWidth, i.clientWidth), Math.max(window.innerHeight, i.clientHeight)] : () => [n.width * n.scale + window.innerWidth - i.clientWidth, n.height * n.scale + window.innerHeight - i.clientHeight], o = e.config.screen?.bodyClasses === !0;
		this.__update = (e) => {
			let [t, n] = a();
			if (n !== this.height && (this.height = n), t !== this.width) this.width = t;
			else if (e !== !0) return;
			let r = this.sizes;
			this.gt.xs = t >= r.sm, this.gt.sm = t >= r.md, this.gt.md = t >= r.lg, this.gt.lg = t >= r.xl, this.lt.sm = t < r.sm, this.lt.md = t < r.md, this.lt.lg = t < r.lg, this.lt.xl = t < r.xl, this.xs = this.lt.sm, this.sm = this.gt.xs && this.lt.md, this.md = this.gt.sm && this.lt.lg, this.lg = this.gt.md && this.lt.xl, this.xl = this.gt.lg, r = this.xs && "xs" || this.sm && "sm" || this.md && "md" || this.lg && "lg" || "xl", r !== this.name && (o && (document.body.classList.remove(`screen--${this.name}`), document.body.classList.add(`screen--${r}`)), this.name = r);
		};
		let s, c = {}, l = 16;
		this.setSizes = (e) => {
			kd.forEach((t) => {
				e[t] !== void 0 && (c[t] = e[t]);
			});
		}, this.setDebounce = (e) => {
			l = e;
		};
		let u = () => {
			let e = getComputedStyle(document.body);
			e.getPropertyValue("--q-size-sm") && kd.forEach((t) => {
				this.sizes[t] = Number.parseInt(e.getPropertyValue(`--q-size-${t}`), 10);
			}), this.setSizes = (e) => {
				kd.forEach((t) => {
					e[t] && (this.sizes[t] = e[t]);
				}), this.__update(!0);
			}, this.setDebounce = (e) => {
				s !== void 0 && r.removeEventListener("resize", s, Ad), s = e > 0 ? Od(this.__update, e) : this.__update, r.addEventListener("resize", s, Ad);
			}, this.setDebounce(l), Object.keys(c).length === 0 ? this.__update() : (this.setSizes(c), c = void 0), o && this.name === "xs" && document.body.classList.add("screen--xs");
		};
		od.value ? t.push(u) : u();
	}
});
var jd = _d({
	isActive: !1,
	mode: !1
}, {
	__media: void 0,
	set(e) {
		jd.mode = e, e === "auto" ? (jd.__media === void 0 && (jd.__media = window.matchMedia("(prefers-color-scheme: dark)"), jd.__updateMedia = () => {
			jd.set("auto");
		}, jd.__media.addListener(jd.__updateMedia)), e = jd.__media.matches) : jd.__media !== void 0 && (jd.__media.removeListener(jd.__updateMedia), jd.__media = void 0), jd.isActive = e === !0, document.body.classList.remove(`body--${e === !0 ? "light" : "dark"}`), document.body.classList.add(`body--${e === !0 ? "dark" : "light"}`);
	},
	toggle() {
		jd.set(!jd.isActive);
	},
	install({ $q: e, ssrContext: t }) {
		let n = __QUASAR_SSR_CLIENT__ ? document.body.classList.contains("body--dark") : e.config.dark;
		e.dark = this, this.__installed || this.set(n !== void 0 && n);
	}
}), Md = !1;
function Nd(e) {
	return Md || e !== Object(e) || e.isComposing || e.qKeyEvent;
}
function Pd(e, t) {
	return !Nd(e) && [t].flat().includes(e.keyCode);
}
var Fd = () => !0;
function Id(e) {
	return typeof e == "string" && e !== "" && e !== "/" && e !== "#/";
}
function Ld(e) {
	return e.startsWith("#") && (e = e.slice(1)), e.startsWith("/") || (e = "/" + e), e.endsWith("/") && (e = e.slice(0, -1)), "#" + e;
}
function Rd(e) {
	if (e.backButtonExit === !1) return () => !1;
	if (e.backButtonExit === "*") return Fd;
	let t = ["#/"];
	return Array.isArray(e.backButtonExit) && t.push(...e.backButtonExit.filter(Id).map(Ld)), () => t.includes(window.location.hash);
}
var zd = {
	__history: [],
	add: yd,
	remove: yd,
	install({ $q: e }) {
		if (this.__installed) return;
		let { cordova: t, capacitor: n } = md.is;
		if (!t && !n) return;
		let r = e.config[t ? "cordova" : "capacitor"];
		if (r?.backButton === !1 || n && (window.Capacitor === void 0 || window.Capacitor.Plugins.App === void 0)) return;
		this.add = (e) => {
			e.condition === void 0 && (e.condition = Fd), this.__history.push(e);
		}, this.remove = (e) => {
			let t = this.__history.indexOf(e);
			t !== -1 && this.__history.splice(t, 1);
		};
		let i = Rd({
			backButtonExit: !0,
			...r
		}), a = () => {
			if (this.__history.length !== 0) {
				let e = this.__history.at(-1);
				e.condition() && (this.__history.pop(), e.handler());
			} else i() ? navigator.app.exitApp() : window.history.back();
		};
		t ? document.addEventListener("deviceready", () => {
			document.addEventListener("backbutton", a, !1);
		}) : window.Capacitor.Plugins.App.addListener("backButton", a);
	}
}, Bd = {
	isoName: "en-US",
	nativeName: "English (US)",
	label: {
		clear: "Clear",
		ok: "OK",
		cancel: "Cancel",
		close: "Close",
		set: "Set",
		select: "Select",
		reset: "Reset",
		remove: "Remove",
		update: "Update",
		create: "Create",
		search: "Search",
		filter: "Filter",
		refresh: "Refresh",
		expand: (e) => e ? `Expand "${e}"` : "Expand",
		collapse: (e) => e ? `Collapse "${e}"` : "Collapse"
	},
	date: {
		days: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),
		daysShort: "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),
		months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"),
		monthsShort: "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),
		firstDayOfWeek: 0,
		format24h: !1,
		pluralDay: "days",
		prevMonth: "Previous month",
		nextMonth: "Next month",
		prevYear: "Previous year",
		nextYear: "Next year",
		today: "Today",
		prevRangeYears: (e) => `Previous ${e} years`,
		nextRangeYears: (e) => `Next ${e} years`
	},
	table: {
		noData: "No data available",
		noResults: "No matching records found",
		loading: "Loading...",
		selectedRecords: (e) => e === 1 ? "1 record selected." : (e === 0 ? "No" : e) + " records selected.",
		recordsPerPage: "Records per page:",
		allRows: "All",
		pagination: (e, t, n) => e + " - " + t + " of " + n,
		columns: "Columns"
	},
	pagination: {
		first: "First page",
		prev: "Previous page",
		next: "Next page",
		last: "Last page"
	},
	editor: {
		url: "URL",
		bold: "Bold",
		italic: "Italic",
		strikethrough: "Strikethrough",
		underline: "Underline",
		unorderedList: "Unordered List",
		orderedList: "Ordered List",
		subscript: "Subscript",
		superscript: "Superscript",
		hyperlink: "Hyperlink",
		toggleFullscreen: "Toggle Fullscreen",
		quote: "Quote",
		left: "Left align",
		center: "Center align",
		right: "Right align",
		justify: "Justify align",
		print: "Print",
		outdent: "Decrease indentation",
		indent: "Increase indentation",
		removeFormat: "Remove formatting",
		formatting: "Formatting",
		fontSize: "Font Size",
		align: "Align",
		hr: "Insert Horizontal Rule",
		undo: "Undo",
		redo: "Redo",
		heading1: "Heading 1",
		heading2: "Heading 2",
		heading3: "Heading 3",
		heading4: "Heading 4",
		heading5: "Heading 5",
		heading6: "Heading 6",
		paragraph: "Paragraph",
		code: "Code",
		size1: "Very small",
		size2: "A bit small",
		size3: "Normal",
		size4: "Medium-large",
		size5: "Big",
		size6: "Very big",
		size7: "Maximum",
		defaultFont: "Default Font",
		viewSource: "View Source"
	},
	tree: {
		noNodes: "No nodes available",
		noResults: "No matching nodes found"
	}
};
function Vd() {
	let e = Array.isArray(navigator.languages) && navigator.languages.length !== 0 ? navigator.languages[0] : navigator.language;
	if (typeof e == "string") return e.split(/[-_]/).map((e, t) => t === 0 ? e.toLowerCase() : t > 1 || e.length < 4 ? e.toUpperCase() : e[0].toUpperCase() + e.slice(1).toLowerCase()).join("-");
}
var Hd = _d({ __qLang: {} }, {
	getLocale: Vd,
	set(e = Bd, t) {
		let n = {
			...e,
			rtl: e.rtl === !0,
			getLocale: Vd
		};
		if (n.set = Hd.set, Hd.__langConfig === void 0 || !Hd.__langConfig.noHtmlAttrs) {
			let e = document.documentElement;
			e.setAttribute("dir", n.rtl ? "rtl" : "ltr"), e.setAttribute("lang", n.isoName);
		}
		Object.assign(Hd.__qLang, n);
	},
	install({ $q: e, lang: t, ssrContext: n }) {
		e.lang = Hd.__qLang, Hd.__langConfig = e.config.lang, this.__installed ? t !== void 0 && this.set(t) : (this.props = new Proxy(this.__qLang, {
			get: Reflect.get,
			ownKeys(e) {
				return Reflect.ownKeys(e).filter((e) => e !== "set" && e !== "getLocale");
			}
		}), this.set(t || Bd));
	}
}), Ud = {
	name: "material-icons",
	type: {
		positive: "check_circle",
		negative: "warning",
		info: "info",
		warning: "priority_high"
	},
	arrow: {
		up: "arrow_upward",
		right: "arrow_forward",
		down: "arrow_downward",
		left: "arrow_back",
		dropdown: "arrow_drop_down"
	},
	chevron: {
		left: "chevron_left",
		right: "chevron_right"
	},
	colorPicker: {
		spectrum: "gradient",
		tune: "tune",
		palette: "style"
	},
	pullToRefresh: { icon: "refresh" },
	carousel: {
		left: "chevron_left",
		right: "chevron_right",
		up: "keyboard_arrow_up",
		down: "keyboard_arrow_down",
		navigationIcon: "lens"
	},
	chip: {
		remove: "cancel",
		selected: "check"
	},
	datetime: {
		arrowLeft: "chevron_left",
		arrowRight: "chevron_right",
		now: "access_time",
		today: "today"
	},
	editor: {
		bold: "format_bold",
		italic: "format_italic",
		strikethrough: "strikethrough_s",
		underline: "format_underlined",
		unorderedList: "format_list_bulleted",
		orderedList: "format_list_numbered",
		subscript: "vertical_align_bottom",
		superscript: "vertical_align_top",
		hyperlink: "link",
		toggleFullscreen: "fullscreen",
		quote: "format_quote",
		left: "format_align_left",
		center: "format_align_center",
		right: "format_align_right",
		justify: "format_align_justify",
		print: "print",
		outdent: "format_indent_decrease",
		indent: "format_indent_increase",
		removeFormat: "format_clear",
		formatting: "text_format",
		fontSize: "format_size",
		align: "format_align_left",
		hr: "remove",
		undo: "undo",
		redo: "redo",
		heading: "format_size",
		code: "code",
		size: "format_size",
		font: "font_download",
		viewSource: "code"
	},
	expansionItem: {
		icon: "keyboard_arrow_down",
		denseIcon: "arrow_drop_down"
	},
	fab: {
		icon: "add",
		activeIcon: "close"
	},
	field: {
		clear: "cancel",
		error: "error"
	},
	pagination: {
		first: "first_page",
		prev: "keyboard_arrow_left",
		next: "keyboard_arrow_right",
		last: "last_page"
	},
	rating: { icon: "grade" },
	stepper: {
		done: "check",
		active: "edit",
		error: "warning"
	},
	tabs: {
		left: "chevron_left",
		right: "chevron_right",
		up: "keyboard_arrow_up",
		down: "keyboard_arrow_down"
	},
	table: {
		arrowUp: "arrow_upward",
		warning: "warning",
		firstPage: "first_page",
		prevPage: "chevron_left",
		nextPage: "chevron_right",
		lastPage: "last_page"
	},
	tree: { icon: "play_arrow" },
	uploader: {
		done: "done",
		clear: "clear",
		add: "add_box",
		upload: "cloud_upload",
		removeQueue: "clear_all",
		removeUploaded: "done_all"
	}
}, Wd = _d({
	iconMapFn: null,
	__qIconSet: {}
}, {
	set(e, t) {
		let n = { ...e };
		n.set = Wd.set, Object.assign(Wd.__qIconSet, n);
	},
	install({ $q: e, iconSet: t, ssrContext: n }) {
		e.config.iconMapFn !== void 0 && (this.iconMapFn = e.config.iconMapFn), e.iconSet = this.__qIconSet, id(e, "iconMapFn", () => this.iconMapFn, (e) => {
			this.iconMapFn = e;
		}), this.__installed ? t !== void 0 && this.set(t) : (this.props = new Proxy(this.__qIconSet, {
			get: Reflect.get,
			ownKeys(e) {
				return Reflect.ownKeys(e).filter((e) => e !== "set");
			}
		}), this.set(t || Ud));
	}
}), Gd = "_q_t_", Kd = "_q_s_", qd = "_q_l_", Jd = "_q_pc_", Yd = "_q_f_", Xd = "_q_fo_", Zd = "_q_tabs_", Qd = "_q_u_";
function $d() {}
function ef(e, t) {
	if (e === t) return !0;
	if (e !== null && t !== null && typeof e == "object" && typeof t == "object") {
		if (e.constructor !== t.constructor) return !1;
		let n, r;
		if (e.constructor === Array) {
			if (n = e.length, n !== t.length) return !1;
			for (r = n; r-- !== 0;) if (!ef(e[r], t[r])) return !1;
			return !0;
		}
		if (e.constructor === Map) {
			if (e.size !== t.size) return !1;
			let n = e.entries();
			for (r = n.next(); !r.done;) {
				if (!t.has(r.value[0])) return !1;
				r = n.next();
			}
			for (n = e.entries(), r = n.next(); !r.done;) {
				if (!ef(r.value[1], t.get(r.value[0]))) return !1;
				r = n.next();
			}
			return !0;
		}
		if (e.constructor === Set) {
			if (e.size !== t.size) return !1;
			let n = e.entries();
			for (r = n.next(); !r.done;) {
				if (!t.has(r.value[0])) return !1;
				r = n.next();
			}
			return !0;
		}
		if (e.buffer != null && e.buffer.constructor === ArrayBuffer) {
			if (n = e.length, n !== t.length) return !1;
			for (r = n; r-- !== 0;) if (e[r] !== t[r]) return !1;
			return !0;
		}
		if (e.constructor === RegExp) return e.source === t.source && e.flags === t.flags;
		if (e.valueOf !== Object.prototype.valueOf) return e.valueOf() === t.valueOf();
		if (e.toString !== Object.prototype.toString) return e.toString() === t.toString();
		let i = Object.keys(e).filter((t) => e[t] !== void 0);
		if (n = i.length, n !== Object.keys(t).filter((e) => t[e] !== void 0).length) return !1;
		for (r = n; r-- !== 0;) {
			let n = i[r];
			if (!ef(e[n], t[n])) return !1;
		}
		return !0;
	}
	return e !== e && t !== t;
}
function tf(e) {
	return typeof e == "object" && !!e && !Array.isArray(e);
}
function nf(e) {
	return Object.prototype.toString.call(e) === "[object Date]";
}
function rf(e) {
	return Object.prototype.toString.call(e) === "[object RegExp]";
}
function af(e) {
	return typeof e == "number" && Number.isFinite(e);
}
var of = {};
function sf(e, t) {
	let n = s(e);
	n.config.globalProperties = t.config.globalProperties;
	let { reload: r, ...i } = t._context;
	return Object.assign(n._context, i), n;
}
var cf = [
	"B",
	"KB",
	"MB",
	"GB",
	"TB",
	"PB"
];
function lf(e, t = 1) {
	let n = 0;
	for (; Number.parseInt(e, 10) >= 1024 && n < cf.length - 1;) e /= 1024, ++n;
	return `${e.toFixed(t)}${cf[n]}`;
}
function uf(e) {
	return e.at(0).toUpperCase() + e.slice(1);
}
function df(e, t, n) {
	return n <= t ? t : Math.min(n, Math.max(t, e));
}
function ff(e, t, n) {
	if (n <= t) return t;
	let r = n - t + 1, i = t + (e - t) % r;
	return i < t && (i = r + i), i === 0 ? 0 : i;
}
function pf(e, t = 2, n = "0") {
	return e == null ? e : String(e).padStart(t, n);
}
var mf = XMLHttpRequest, hf = mf.prototype.open, gf = [
	"top",
	"right",
	"bottom",
	"left"
], _f = [], vf = 0;
function yf({ p: e, pos: t, active: n, horiz: r, reverse: i, dir: a }) {
	let o = 1, s = 1;
	return r ? (i && (o = -1), t === "bottom" && (s = -1), { transform: `translate3d(${o * (e - 100)}%,${n ? 0 : s * -200}%,0)` }) : (i && (s = -1), t === "right" && (o = -1), { transform: `translate3d(${n ? 0 : a * o * -200}%,${s * (e - 100)}%,0)` });
}
function bf(e, t) {
	return typeof t != "number" && (t = e < 25 ? Math.random() * 3 + 3 : e < 65 ? Math.random() * 3 : e < 85 ? Math.random() * 2 : e < 99 ? .6 : 0), df(e + t, 0, 100);
}
function xf(e) {
	vf++, _f.push(e), !(vf > 1) && (mf.prototype.open = function(e, t, ...n) {
		let r = [];
		this.addEventListener("loadstart", () => {
			_f.forEach((e) => {
				(e.hijackFilter.value === null || e.hijackFilter.value(t)) && (e.start(), r.push(e.stop));
			});
		}, { once: !0 }), this.addEventListener("loadend", () => {
			r.forEach((e) => {
				e();
			});
		}, { once: !0 }), hf.call(this, e, t, ...n);
	});
}
function Sf(e) {
	_f = _f.filter((t) => t.start !== e), vf = Math.max(0, vf - 1), vf === 0 && (mf.prototype.open = hf);
}
var Cf = Q({
	name: "QAjaxBar",
	props: {
		position: {
			type: String,
			default: "top",
			validator: (e) => gf.includes(e)
		},
		size: {
			type: String,
			default: "2px"
		},
		color: String,
		skipHijack: Boolean,
		reverse: Boolean,
		hijackFilter: Function
	},
	emits: ["start", "stop"],
	setup(e, { emit: t }) {
		let { proxy: n } = h(), r = L(0), i = L(!1), a = L(!0), s = 0, c = null, l, u = o(() => `q-loading-bar q-loading-bar--${e.position}` + (e.color === void 0 ? "" : ` bg-${e.color}`) + (a.value ? "" : " no-transition")), d = o(() => e.position === "top" || e.position === "bottom"), f = o(() => d.value ? "height" : "width"), p = o(() => {
			let t = i.value, a = yf({
				p: r.value,
				pos: e.position,
				active: t,
				horiz: d.value,
				reverse: n.$q.lang.rtl && ["top", "bottom"].includes(e.position) ? !e.reverse : e.reverse,
				dir: n.$q.lang.rtl ? -1 : 1
			});
			return a[f.value] = e.size, a.opacity = +!!t, a;
		}), m = o(() => i.value ? {
			role: "progressbar",
			"aria-valuemin": 0,
			"aria-valuemax": 100,
			"aria-valuenow": r.value
		} : { "aria-hidden": "true" });
		function g(e = 300) {
			let n = l;
			return l = Math.max(0, e) || 0, s++, s > 1 ? (n === 0 && e > 0 ? b() : c !== null && n > 0 && e <= 0 && (clearTimeout(c), c = null), s) : (c !== null && clearTimeout(c), t("start"), r.value = 0, c = setTimeout(() => {
				c = null, a.value = !0, e > 0 && b();
			}, i._value === !0 ? 500 : 1), i._value !== !0 && (i.value = !0, a.value = !1), s);
		}
		function v(e) {
			return s > 0 && (r.value = bf(r.value, e)), s;
		}
		function y() {
			if (s = Math.max(0, s - 1), s > 0) return s;
			c !== null && (clearTimeout(c), c = null), t("stop");
			let e = () => {
				a.value = !0, r.value = 100, c = setTimeout(() => {
					c = null, i.value = !1;
				}, 1e3);
			};
			return r.value === 0 ? c = setTimeout(e, 1) : e(), s;
		}
		function b() {
			r.value < 100 && (c = setTimeout(() => {
				c = null, v(), b();
			}, l));
		}
		let x = !1;
		return A(() => {
			e.skipHijack || (x = !0, xf({
				start: g,
				stop: y,
				hijackFilter: o(() => e.hijackFilter || null)
			}));
		}), D(() => {
			c !== null && clearTimeout(c), x && Sf(g);
		}), Object.assign(n, {
			start: g,
			stop: y,
			increment: v
		}), () => _("div", {
			class: u.value,
			style: p.value,
			...m.value
		});
	}
}), wf = {
	xs: 18,
	sm: 24,
	md: 32,
	lg: 38,
	xl: 46
}, Tf = { size: String };
function Ef(e, t = wf) {
	return o(() => e.size === void 0 ? null : { fontSize: e.size in t ? `${t[e.size]}px` : e.size });
}
function $(e, t) {
	return e === void 0 ? t : e() || t;
}
function Df(e, t) {
	if (e !== void 0) {
		let t = e();
		if (t != null) return [...t];
	}
	return t;
}
function Of(e, t) {
	return e === void 0 ? t : t.concat(e());
}
function kf(e, t) {
	return e === void 0 ? t : t === void 0 ? e() : t.concat(e());
}
function Af(e, t, n, r, i, a) {
	t.key = r + i;
	let o = _(e, t, n);
	return i ? re(o, a()) : o;
}
var jf = "0 0 24 24", Mf = (e) => e, Nf = (e) => `ionicons ${e}`, Pf = {
	"mdi-": (e) => `mdi ${e}`,
	"icon-": Mf,
	"bt-": (e) => `bt ${e}`,
	"eva-": (e) => `eva ${e}`,
	"ion-md": Nf,
	"ion-ios": Nf,
	"ion-logo": Nf,
	"iconfont ": Mf,
	"ti-": (e) => `themify-icon ${e}`,
	"bi-": (e) => `bootstrap-icons ${e}`,
	"i-": Mf
}, Ff = {
	o_: "-outlined",
	r_: "-round",
	s_: "-sharp"
}, If = {
	sym_o_: "-outlined",
	sym_r_: "-rounded",
	sym_s_: "-sharp"
}, Lf = RegExp("^(" + Object.keys(Pf).join("|") + ")"), Rf = RegExp("^(" + Object.keys(Ff).join("|") + ")"), zf = RegExp("^(" + Object.keys(If).join("|") + ")"), Bf = /^[Mm]\s?[-+]?\.?\d/, Vf = /^img:/, Hf = /^svguse:/, Uf = /^ion-/, Wf = /^(fa-(classic|sharp|solid|regular|light|brands|duotone|thin)|[lf]a[srlbdk]?) /, Gf = Q({
	name: "QIcon",
	props: {
		...Tf,
		tag: {
			type: String,
			default: "i"
		},
		name: String,
		color: String,
		left: Boolean,
		right: Boolean
	},
	setup(e, { slots: t }) {
		let { proxy: { $q: n } } = h(), r = Ef(e), i = o(() => "q-icon" + (e.left ? " on-left" : "") + (e.right ? " on-right" : "") + (e.color === void 0 ? "" : ` text-${e.color}`)), a = o(() => {
			let t, r = e.name;
			if (r === "none" || !r) return { none: !0 };
			if (n.iconMapFn !== null) {
				let e = n.iconMapFn(r);
				if (e !== void 0) if (e.icon !== void 0) {
					if (r = e.icon, r === "none" || !r) return { none: !0 };
				} else return {
					cls: e.cls,
					content: e.content === void 0 ? " " : e.content
				};
			}
			if (Bf.test(r)) {
				let [e, t = jf] = r.split("|");
				return {
					svg: !0,
					viewBox: t,
					nodes: e.split("&&").map((e) => {
						let [t, n, r] = e.split("@@");
						return _("path", {
							style: n,
							d: t,
							transform: r
						});
					})
				};
			}
			if (Vf.test(r)) return {
				img: !0,
				src: r.slice(4)
			};
			if (Hf.test(r)) {
				let [e, t = jf] = r.split("|");
				return {
					svguse: !0,
					src: e.slice(7),
					viewBox: t
				};
			}
			let i = " ", a = r.match(Lf);
			if (a !== null) t = Pf[a[1]](r);
			else if (Wf.test(r)) t = r;
			else if (Uf.test(r)) t = `ionicons ion-${n.platform.is.ios ? "ios" : "md"}${r.slice(3)}`;
			else if (zf.test(r)) {
				t = "notranslate material-symbols";
				let e = r.match(zf);
				e !== null && (r = r.slice(6), t += If[e[1]]), i = r;
			} else {
				t = "notranslate material-icons";
				let e = r.match(Rf);
				e !== null && (r = r.slice(2), t += Ff[e[1]]), i = r;
			}
			return {
				cls: t,
				content: i
			};
		});
		return () => {
			let n = {
				class: i.value,
				style: r.value,
				"aria-hidden": "true"
			};
			return a.value.none ? _(e.tag, n, $(t.default)) : a.value.img ? _(e.tag, n, Of(t.default, [_("img", { src: a.value.src })])) : a.value.svg ? _(e.tag, n, Of(t.default, [_("svg", { viewBox: a.value.viewBox || "0 0 24 24" }, a.value.nodes)])) : a.value.svguse ? _(e.tag, n, Of(t.default, [_("svg", { viewBox: a.value.viewBox }, [_("use", { "xlink:href": a.value.src })])])) : (a.value.cls !== void 0 && (n.class += " " + a.value.cls), _(e.tag, n, Of(t.default, [a.value.content])));
		};
	}
});
Q({
	name: "QAvatar",
	props: {
		...Tf,
		fontSize: String,
		color: String,
		textColor: String,
		icon: String,
		square: Boolean,
		rounded: Boolean
	},
	setup(e, { slots: t }) {
		let n = Ef(e), r = o(() => "q-avatar" + (e.color ? ` bg-${e.color}` : "") + (e.textColor ? ` text-${e.textColor} q-chip--colored` : "") + (e.square ? " q-avatar--square" : e.rounded ? " rounded-borders" : "")), i = o(() => e.fontSize ? { fontSize: e.fontSize } : null);
		return () => {
			let a = e.icon === void 0 ? void 0 : [_(Gf, { name: e.icon })];
			return _("div", {
				class: r.value,
				style: n.value
			}, [_("div", {
				class: "q-avatar__content row flex-center overflow-hidden",
				style: i.value
			}, kf(t.default, a))]);
		};
	}
});
var Kf = [
	"top",
	"middle",
	"bottom"
];
Q({
	name: "QBadge",
	props: {
		color: String,
		textColor: String,
		floating: Boolean,
		transparent: Boolean,
		multiLine: Boolean,
		outline: Boolean,
		rounded: Boolean,
		label: [Number, String],
		align: {
			type: String,
			validator: (e) => Kf.includes(e)
		}
	},
	setup(e, { slots: t }) {
		let n = o(() => e.align === void 0 ? null : { verticalAlign: e.align }), r = o(() => {
			let t = e.outline && e.color || e.textColor;
			return `q-badge flex inline items-center no-wrap q-badge--${e.multiLine ? "multi" : "single"}-line` + (e.outline ? " q-badge--outline" : e.color === void 0 ? "" : ` bg-${e.color}`) + (t === void 0 ? "" : ` text-${t}`) + (e.floating ? " q-badge--floating" : "") + (e.rounded ? " q-badge--rounded" : "") + (e.transparent ? " q-badge--transparent" : "");
		});
		return () => _("div", {
			class: r.value,
			style: n.value,
			role: "status",
			"aria-label": e.label
		}, Of(t.default, e.label === void 0 ? [] : [e.label]));
	}
});
var qf = { dark: {
	type: Boolean,
	default: null
} };
function Jf(e, t) {
	return o(() => e.dark === null ? t.dark.isActive : e.dark);
}
Q({
	name: "QBanner",
	props: {
		...qf,
		inlineActions: Boolean,
		dense: Boolean,
		rounded: Boolean
	},
	setup(e, { slots: t }) {
		let { proxy: { $q: n } } = h(), r = Jf(e, n), i = o(() => "q-banner row items-center" + (e.dense ? " q-banner--dense" : "") + (r.value ? " q-banner--dark q-dark" : "") + (e.rounded ? " rounded-borders" : "")), a = o(() => `q-banner__actions row items-center justify-end col-${e.inlineActions ? "auto" : "all"}`);
		return () => {
			let n = [_("div", { class: "q-banner__avatar col-auto row items-center self-start" }, $(t.avatar)), _("div", { class: "q-banner__content col text-body2" }, $(t.default))], r = $(t.action);
			return r !== void 0 && n.push(_("div", { class: a.value }, r)), _("div", {
				class: i.value + (!e.inlineActions && r !== void 0 ? " q-banner--top-padding" : ""),
				role: "alert"
			}, n);
		};
	}
}), Q({
	name: "QBar",
	props: {
		...qf,
		dense: Boolean
	},
	setup(e, { slots: t }) {
		let { proxy: { $q: n } } = h(), r = Jf(e, n), i = o(() => `q-bar row no-wrap items-center q-bar--${e.dense ? "dense" : "standard"}  q-bar--${r.value ? "dark" : "light"}`);
		return () => _("div", {
			class: i.value,
			role: "toolbar"
		}, $(t.default));
	}
});
var Yf = {
	left: "start",
	center: "center",
	right: "end",
	between: "between",
	around: "around",
	evenly: "evenly",
	stretch: "stretch"
}, Xf = Object.keys(Yf), Zf = { align: {
	type: String,
	validator: (e) => Xf.includes(e)
} };
function Qf(e) {
	return o(() => {
		let t = e.align === void 0 ? e.vertical ? "stretch" : "left" : e.align;
		return `${e.vertical ? "items" : "justify"}-${Yf[t]}`;
	});
}
function $f(e) {
	if (Object(e.$parent) === e.$parent) return e.$parent;
	let { parent: t } = e.$;
	for (; Object(t) === t;) {
		if (Object(t.proxy) === t.proxy) return t.proxy;
		t = t.parent;
	}
}
function ep(e, t) {
	typeof t.type == "symbol" ? Array.isArray(t.children) && t.children.forEach((t) => {
		ep(e, t);
	}) : e.add(t);
}
function tp(e) {
	let t = /* @__PURE__ */ new Set();
	return e.forEach((e) => {
		ep(t, e);
	}), [...t];
}
function np(e) {
	return e.appContext.config.globalProperties.$router !== void 0;
}
function rp(e) {
	return e.isUnmounted === !0 || e.isDeactivated === !0;
}
var ip = ["", !0];
Q({
	name: "QBreadcrumbs",
	props: {
		...Zf,
		separator: {
			type: String,
			default: "/"
		},
		separatorColor: String,
		activeColor: {
			type: String,
			default: "primary"
		},
		gutter: {
			type: String,
			validator: (e) => [
				"none",
				"xs",
				"sm",
				"md",
				"lg",
				"xl"
			].includes(e),
			default: "sm"
		}
	},
	setup(e, { slots: t }) {
		let n = Qf(e), r = o(() => `flex items-center ${n.value}${e.gutter === "none" ? "" : ` q-gutter-${e.gutter}`}`), i = o(() => e.separatorColor ? ` text-${e.separatorColor}` : ""), a = o(() => ` text-${e.activeColor}`);
		return () => {
			if (t.default === void 0) return;
			let n = tp($(t.default));
			if (n.length === 0) return;
			let o = 1, s = [], c = n.filter((e) => e.type?.name === "QBreadcrumbsEl").length, l = t.separator === void 0 ? () => e.separator : t.separator;
			return n.forEach((e) => {
				if (e.type?.name === "QBreadcrumbsEl") {
					let t = o < c, n = e.props !== null && ip.includes(e.props.disable), r = (t ? "" : " q-breadcrumbs--last") + (!n && t ? a.value : "");
					o++, s.push(_("div", { class: `flex items-center${r}` }, [e])), t && s.push(_("div", { class: "q-breadcrumbs__separator" + i.value }, l()));
				} else s.push(e);
			}), _("div", { class: "q-breadcrumbs" }, [_("div", { class: r.value }, s)]);
		};
	}
});
function ap(e) {
	return e ? e.aliasOf ? e.aliasOf.path : e.path : "";
}
function op(e, t) {
	return (e.aliasOf || e) === (t.aliasOf || t);
}
function sp(e, t) {
	for (let n in t) {
		let r = t[n], i = e[n];
		if (typeof r == "string") {
			if (r !== i) return !1;
		} else if (!Array.isArray(i) || i.length !== r.length || r.some((e, t) => e !== i[t])) return !1;
	}
	return !0;
}
function cp(e, t) {
	return Array.isArray(t) ? e.length === t.length && e.every((e, n) => e === t[n]) : e.length === 1 && e[0] === t;
}
function lp(e, t) {
	return Array.isArray(e) ? cp(e, t) : Array.isArray(t) ? cp(t, e) : e === t;
}
function up(e, t) {
	if (Object.keys(e).length !== Object.keys(t).length) return !1;
	for (let n in e) if (!lp(e[n], t[n])) return !1;
	return !0;
}
var dp = {
	to: [String, Object],
	replace: Boolean,
	href: String,
	target: String,
	disable: Boolean
}, fp = {
	...dp,
	exact: Boolean,
	activeClass: {
		type: String,
		default: "q-router-link--active"
	},
	exactActiveClass: {
		type: String,
		default: "q-router-link--exact-active"
	}
};
function pp({ fallbackTag: e, useDisableForRouterLinkProps: t = !0 } = {}) {
	let n = h(), { props: r, proxy: i, emit: a } = n, s = np(n), c = o(() => !r.disable && r.href !== void 0), l = o(t ? () => s && !r.disable && !c.value && r.to !== void 0 && r.to !== null && r.to !== "" : () => s && !c.value && r.to !== void 0 && r.to !== null && r.to !== ""), u = o(() => l.value ? b(r.to) : null), d = o(() => u.value !== null), f = o(() => c.value || d.value), p = o(() => r.type === "a" || f.value ? "a" : r.tag || e || "div"), m = o(() => c.value ? {
		href: r.href,
		target: r.target
	} : d.value ? {
		href: u.value.href,
		target: r.target
	} : {}), g = o(() => {
		if (!d.value) return -1;
		let { matched: e } = u.value, { length: t } = e, n = e[t - 1];
		if (n === void 0) return -1;
		let r = i.$route.matched;
		if (r.length === 0) return -1;
		let a = r.findIndex(op.bind(null, n));
		if (a !== -1) return a;
		let o = ap(e[t - 2]);
		return t > 1 && ap(n) === o && r.at(-1).path !== o ? r.findIndex(op.bind(null, e[t - 2])) : a;
	}), _ = o(() => d.value && g.value !== -1 && sp(i.$route.params, u.value.params)), v = o(() => _.value && g.value === i.$route.matched.length - 1 && up(i.$route.params, u.value.params)), y = o(() => d.value ? v.value ? ` ${r.exactActiveClass} ${r.activeClass}` : r.exact ? "" : _.value ? ` ${r.activeClass}` : "" : "");
	function b(e) {
		try {
			return i.$router.resolve(e);
		} catch {}
		return null;
	}
	function x(e, { returnRouterError: t, to: n = r.to, replace: a = r.replace } = {}) {
		if (r.disable) return e.preventDefault(), Promise.resolve(!1);
		if (e.metaKey || e.altKey || e.ctrlKey || e.shiftKey || e.button !== void 0 && e.button !== 0 || r.target === "_blank") return Promise.resolve(!1);
		e.preventDefault();
		let o = i.$router[a ? "replace" : "push"](n);
		return t ? o : o.then(() => {}).catch(() => {});
	}
	function S(e) {
		if (d.value) {
			let t = (t) => x(e, t);
			a("click", e, t), e.defaultPrevented || t();
		} else a("click", e);
	}
	return {
		hasRouterLink: d,
		hasHrefLink: c,
		hasLink: f,
		linkTag: p,
		resolvedLink: u,
		linkIsActive: _,
		linkIsExactActive: v,
		linkClass: y,
		linkAttrs: m,
		getLink: b,
		navigateToRouterLink: x,
		navigateOnClick: S
	};
}
Q({
	name: "QBreadcrumbsEl",
	props: {
		...fp,
		label: String,
		icon: String,
		tag: {
			type: String,
			default: "span"
		}
	},
	emits: ["click"],
	setup(e, { slots: t }) {
		let { linkTag: n, linkAttrs: r, linkClass: i, navigateOnClick: a } = pp(), s = o(() => ({
			class: "q-breadcrumbs__el q-link flex inline items-center relative-position " + (e.disable ? "q-breadcrumbs__el--disable" : "q-link--focusable" + i.value),
			...r.value,
			onClick: a
		})), c = o(() => "q-breadcrumbs__el-icon" + (e.label === void 0 ? "" : " q-breadcrumbs__el-icon--with-label"));
		return () => {
			let r = [];
			return e.icon !== void 0 && r.push(_(Gf, {
				class: c.value,
				name: e.icon
			})), e.label !== void 0 && r.push(e.label), _(n.value, { ...s.value }, Of(t.default, r));
		};
	}
});
var mp = {
	size: {
		type: [String, Number],
		default: "1em"
	},
	color: String
};
function hp(e) {
	return {
		cSize: o(() => e.size in wf ? `${wf[e.size]}px` : e.size),
		classes: o(() => "q-spinner" + (e.color ? ` text-${e.color}` : ""))
	};
}
var gp = Q({
	name: "QSpinner",
	props: {
		...mp,
		thickness: {
			type: Number,
			default: 5
		}
	},
	setup(e) {
		let { cSize: t, classes: n } = hp(e);
		return () => _("svg", {
			class: n.value + " q-spinner-mat",
			width: t.value,
			height: t.value,
			viewBox: "25 25 50 50"
		}, [_("circle", {
			class: "path",
			cx: "50",
			cy: "50",
			r: "20",
			fill: "none",
			stroke: "currentColor",
			"stroke-width": e.thickness,
			"stroke-miterlimit": "10"
		})]);
	}
});
function _p(e) {
	if (e === window) return {
		top: 0,
		left: 0
	};
	let { top: t, left: n } = e.getBoundingClientRect();
	return {
		top: t,
		left: n
	};
}
function vp(e) {
	return e === window ? window.innerHeight : e.getBoundingClientRect().height;
}
function yp(e, t) {
	let n = e.style;
	for (let e in t) n[e] = t[e];
}
function bp(e) {
	if (e == null) return;
	if (typeof e == "string") try {
		return document.querySelector(e) || void 0;
	} catch {
		return;
	}
	let t = W(e);
	if (t) return t.$el || t;
}
function xp(e, t) {
	if (e == null || e.contains(t)) return !0;
	for (let n = e.nextElementSibling; n !== null; n = n.nextElementSibling) if (n.contains(t)) return !0;
	return !1;
}
function Sp(e, t = 250) {
	let n = !1, r;
	return function(...i) {
		return n || (n = !0, setTimeout(() => {
			n = !1;
		}, t), r = e.apply(this, i)), r;
	};
}
function Cp(e, t, n, r) {
	n.modifiers.stop && Sd(e);
	let i = n.modifiers.color, a = n.modifiers.center || r === !0, o = document.createElement("span"), s = document.createElement("span"), c = xd(e), { left: l, top: u, width: d, height: f } = t.getBoundingClientRect(), p = Math.hypot(d, f), m = p / 2, h = `${(d - p) / 2}px`, g = a ? h : `${c.left - l - m}px`, _ = `${(f - p) / 2}px`, v = a ? _ : `${c.top - u - m}px`;
	s.className = "q-ripple__inner", yp(s, {
		height: `${p}px`,
		width: `${p}px`,
		transform: `translate3d(${g},${v},0) scale3d(.2,.2,1)`,
		opacity: 0
	}), o.className = `q-ripple${i ? " text-" + i : ""}`, o.setAttribute("dir", "ltr"), o.append(s), t.append(o);
	let y = () => {
		o.remove(), clearTimeout(b);
	};
	n.abort.push(y);
	let b = setTimeout(() => {
		s.classList.add("q-ripple__inner--enter"), s.style.transform = `translate3d(${h},${_},0) scale3d(1,1,1)`, s.style.opacity = .2, b = setTimeout(() => {
			s.classList.remove("q-ripple__inner--enter"), s.classList.add("q-ripple__inner--leave"), s.style.opacity = 0, b = setTimeout(() => {
				o.remove(), n.abort.splice(n.abort.indexOf(y), 1);
			}, 275);
		}, 250);
	}, 50);
}
function wp(e, { modifiers: t, value: n, arg: r }) {
	let i = {
		...e.cfg.ripple,
		...t,
		...n
	};
	e.modifiers = {
		early: i.early === !0,
		stop: i.stop === !0,
		center: i.center === !0,
		color: i.color || r,
		keyCodes: [i.keyCodes || 13].flat()
	};
}
var Tp = gd({
	name: "ripple",
	beforeMount(e, t) {
		let n = t.instance.$.appContext.config.globalProperties.$q.config || {};
		if (n.ripple === !1) return;
		let r = {
			cfg: n,
			enabled: t.value !== !1,
			modifiers: {},
			abort: [],
			start(t) {
				r.enabled && !t.qSkipRipple && t.type === (r.modifiers.early ? "pointerdown" : "click") && Cp(t, e, r, t.qKeyEvent === !0);
			},
			keystart: Sp((t) => {
				r.enabled && !t.qSkipRipple && Pd(t, r.modifiers.keyCodes) && t.type === `key${r.modifiers.early ? "down" : "up"}` && Cp(t, e, r, !0);
			}, 300)
		};
		wp(r, t), e.__qripple = r, Ed(r, "main", [
			[
				e,
				"pointerdown",
				"start",
				"passive"
			],
			[
				e,
				"click",
				"start",
				"passive"
			],
			[
				e,
				"keydown",
				"keystart",
				"passive"
			],
			[
				e,
				"keyup",
				"keystart",
				"passive"
			]
		]);
	},
	updated(e, t) {
		if (t.oldValue !== t.value) {
			let n = e.__qripple;
			n !== void 0 && (n.enabled = t.value !== !1, n.enabled && Object(t.value) === t.value && wp(n, t));
		}
	},
	beforeUnmount(e) {
		let t = e.__qripple;
		t !== void 0 && (t.abort.forEach((e) => {
			e();
		}), Dd(t, "main"), delete e.__qripple);
	}
}), Ep = {
	none: 0,
	xs: 4,
	sm: 8,
	md: 16,
	lg: 24,
	xl: 32
}, Dp = {
	xs: 8,
	sm: 10,
	md: 14,
	lg: 20,
	xl: 24
}, Op = [
	"button",
	"submit",
	"reset"
], kp = /[^\s]\/[^\s]/, Ap = [
	"flat",
	"outline",
	"push",
	"unelevated"
];
function jp(e, t) {
	return e.flat ? "flat" : e.outline ? "outline" : e.push ? "push" : e.unelevated ? "unelevated" : t;
}
function Mp(e) {
	let t = jp(e);
	return t === void 0 ? {} : { [t]: !0 };
}
var Np = {
	...Tf,
	...dp,
	type: {
		type: String,
		default: "button"
	},
	label: [Number, String],
	icon: String,
	iconRight: String,
	...Ap.reduce((e, t) => (e[t] = Boolean) && e, {}),
	square: Boolean,
	rounded: Boolean,
	glossy: Boolean,
	size: String,
	fab: Boolean,
	fabMini: Boolean,
	padding: String,
	color: String,
	textColor: String,
	noCaps: Boolean,
	noWrap: Boolean,
	dense: Boolean,
	tabindex: [Number, String],
	ripple: {
		type: [Boolean, Object],
		default: !0
	},
	align: {
		...Zf.align,
		default: "center"
	},
	stack: Boolean,
	stretch: Boolean,
	loading: {
		type: Boolean,
		default: null
	},
	disable: Boolean
}, Pp = {
	...Np,
	round: Boolean
};
function Fp(e) {
	let t = Ef(e, Dp), n = Qf(e), { hasRouterLink: r, hasLink: i, linkTag: a, linkAttrs: s, navigateOnClick: c } = pp({ fallbackTag: "button" }), l = o(() => {
		let n = e.fab || e.fabMini ? {} : t.value;
		return e.padding === void 0 ? n : {
			...n,
			padding: e.padding.split(/\s+/).map((e) => e in Ep ? Ep[e] + "px" : e).join(" "),
			minWidth: "0",
			minHeight: "0"
		};
	}), u = o(() => e.rounded || e.fab || e.fabMini), d = o(() => !e.disable && !e.loading), f = o(() => d.value ? e.tabindex || 0 : -1), p = o(() => jp(e, "standard")), m = o(() => {
		let t = { tabindex: f.value };
		return i.value ? Object.assign(t, s.value) : Op.includes(e.type) && (t.type = e.type), a.value === "a" ? (e.disable ? t["aria-disabled"] = "true" : t.href === void 0 && (t.role = "button"), !r.value && kp.test(e.type) && (t.type = e.type)) : e.disable && (t.disabled = "", t["aria-disabled"] = "true"), e.loading && e.percentage !== void 0 && Object.assign(t, {
			role: "progressbar",
			"aria-valuemin": 0,
			"aria-valuemax": 100,
			"aria-valuenow": e.percentage
		}), t;
	});
	return {
		classes: o(() => {
			let t;
			e.color === void 0 ? e.textColor && (t = `text-${e.textColor}`) : t = e.flat || e.outline ? `text-${e.textColor || e.color}` : `bg-${e.color} text-${e.textColor || "white"}`;
			let n = e.round ? "round" : `rectangle${u.value ? " q-btn--rounded" : e.square ? " q-btn--square" : ""}`;
			return `q-btn--${p.value} q-btn--${n}` + (t === void 0 ? "" : " " + t) + (d.value ? " q-btn--actionable q-focusable q-hoverable" : e.disable ? " disabled" : "") + (e.fab ? " q-btn--fab" : e.fabMini ? " q-btn--fab-mini" : "") + (e.noCaps ? " q-btn--no-uppercase" : "") + (e.dense ? " q-btn--dense" : "") + (e.stretch ? " no-border-radius self-stretch" : "") + (e.glossy ? " glossy" : "") + (e.square ? " q-btn--square" : "");
		}),
		style: l,
		innerClasses: o(() => n.value + (e.stack ? " column" : " row") + (e.noWrap ? " no-wrap text-no-wrap" : "") + (e.loading ? " q-btn__content--hidden" : "")),
		attributes: m,
		hasLink: i,
		linkTag: a,
		navigateOnClick: c,
		isActionable: d
	};
}
var { passiveCapture: Ip } = vd, Lp = null, Rp = null, zp = null;
function Bp(e) {
	wd(e), e.qSkipRipple = !0;
}
var Vp = Q({
	name: "QBtn",
	props: {
		...Pp,
		percentage: Number,
		darkPercentage: Boolean,
		onTouchstart: [Function, Array]
	},
	emits: [
		"click",
		"keydown",
		"mousedown",
		"keyup"
	],
	setup(e, { slots: t, emit: n }) {
		let { proxy: r } = h(), { classes: i, style: s, innerClasses: c, attributes: l, hasLink: u, linkTag: d, navigateOnClick: f, isActionable: p } = Fp(e), m = L(null), g = L(null), v = null, y, b = null, x = o(() => e.label !== void 0 && e.label !== null && e.label !== ""), S = o(() => e.disable || e.ripple === !1 ? !1 : {
			keyCodes: u.value ? [13, 32] : [13],
			...e.ripple === !0 ? {} : e.ripple
		}), C = o(() => ({ center: e.round })), w = o(() => {
			let t = Math.max(0, Math.min(100, e.percentage));
			return t > 0 ? {
				transition: "transform 0.6s",
				transform: `translateX(${t - 100}%)`
			} : {};
		}), T = o(() => {
			if (e.loading) return {
				onMousedown: Bp,
				onTouchstart: Bp,
				onClick: Bp,
				onKeydown: Bp,
				onKeyup: Bp
			};
			if (p.value) {
				let t = {
					onClick: O,
					onKeydown: k,
					onMousedown: j
				};
				if (r.$q.platform.has.touch) {
					let n = e.onTouchstart === void 0 ? "Passive" : "";
					t[`onTouchstart${n}`] = A;
				}
				return t;
			}
			return { onClick: wd };
		}), E = o(() => ({
			ref: m,
			class: "q-btn q-btn-item non-selectable no-outline " + i.value,
			style: s.value,
			...l.value,
			...T.value
		}));
		function O(t) {
			if (m.value !== null) {
				if (t !== void 0) {
					if (t.defaultPrevented) return;
					let n = document.activeElement;
					if (e.type === "submit" && n !== document.body && !m.value.contains(n) && !n.contains(m.value)) {
						t.qAvoidFocus || m.value.focus();
						let e = () => {
							document.removeEventListener("keydown", wd, !0), document.removeEventListener("keyup", e, Ip), m.value?.removeEventListener("blur", e, Ip);
						};
						document.addEventListener("keydown", wd, !0), document.addEventListener("keyup", e, Ip), m.value.addEventListener("blur", e, Ip);
					}
				}
				f(t);
			}
		}
		function k(e) {
			m.value !== null && (n("keydown", e), Pd(e, [13, 32]) && Rp !== m.value && (Rp !== null && N(), e.defaultPrevented || (e.qAvoidFocus || m.value.focus(), Rp = m.value, m.value.classList.add("q-btn--active"), document.addEventListener("keyup", M, !0), m.value.addEventListener("blur", M, Ip)), wd(e)));
		}
		function A(e) {
			m.value !== null && (n("touchstart", e), !e.defaultPrevented && (Lp !== m.value && (Lp !== null && N(), Lp = m.value, v = e.target, v.addEventListener("touchcancel", M, Ip), v.addEventListener("touchend", M, Ip)), y = !0, b !== null && clearTimeout(b), b = setTimeout(() => {
				b = null, y = !1;
			}, 200)));
		}
		function j(e) {
			m.value !== null && (e.qSkipRipple = y === !0, n("mousedown", e), !e.defaultPrevented && zp !== m.value && (zp !== null && N(), zp = m.value, m.value.classList.add("q-btn--active"), document.addEventListener("mouseup", M, Ip)));
		}
		function M(e) {
			if (m.value !== null && !(e?.type === "blur" && document.activeElement === m.value)) {
				if (e?.type === "keyup") {
					if (Rp === m.value && Pd(e, [13, 32])) {
						let t = new MouseEvent("click", e);
						t.qKeyEvent = !0, e.defaultPrevented && Cd(t), e.cancelBubble && Sd(t), m.value.dispatchEvent(t), wd(e), e.qKeyEvent = !0;
					}
					n("keyup", e);
				}
				N();
			}
		}
		function N(e) {
			let t = g.value;
			!e && (Lp === m.value || zp === m.value) && t !== null && t !== document.activeElement && (t.setAttribute("tabindex", -1), t.focus()), Lp === m.value && (v !== null && (v.removeEventListener("touchcancel", M, Ip), v.removeEventListener("touchend", M, Ip)), Lp = v = null), zp === m.value && (document.removeEventListener("mouseup", M, Ip), zp = null), Rp === m.value && (document.removeEventListener("keyup", M, !0), m.value?.removeEventListener("blur", M, Ip), Rp = null), m.value?.classList.remove("q-btn--active");
		}
		return D(() => {
			N(!0);
		}), Object.assign(r, { click: (e) => {
			p.value && O(e);
		} }), () => {
			let n = [];
			e.icon !== void 0 && n.push(_(Gf, {
				name: e.icon,
				left: !e.stack && x.value,
				role: "img"
			})), x.value && n.push(_("span", { class: "block" }, [e.label])), n = Of(t.default, n), e.iconRight !== void 0 && !e.round && n.push(_(Gf, {
				name: e.iconRight,
				right: !e.stack && x.value,
				role: "img"
			}));
			let r = [_("span", {
				class: "q-focus-helper",
				ref: g
			})];
			return e.loading && e.percentage !== void 0 && r.push(_("span", { class: "q-btn__progress absolute-full overflow-hidden" + (e.darkPercentage ? " q-btn__progress--dark" : "") }, [_("span", {
				class: "q-btn__progress-indicator fit block",
				style: w.value
			})])), r.push(_("span", { class: "q-btn__content text-center col items-center q-anchor--skip " + c.value }, n)), e.loading !== null && r.push(_(a, { name: "q-transition--fade" }, () => e.loading ? [_("span", {
				key: "loading",
				class: "absolute-full flex flex-center"
			}, t.loading === void 0 ? [_(gp)] : t.loading())] : null)), re(_(d.value, E.value, r), [[
				Tp,
				S.value,
				void 0,
				C.value
			]]);
		};
	}
}), Hp = Q({
	name: "QBtnGroup",
	props: {
		unelevated: Boolean,
		outline: Boolean,
		flat: Boolean,
		rounded: Boolean,
		square: Boolean,
		push: Boolean,
		stretch: Boolean,
		glossy: Boolean,
		spread: Boolean
	},
	setup(e, { slots: t }) {
		let n = o(() => {
			let t = [
				"unelevated",
				"outline",
				"flat",
				"rounded",
				"square",
				"push",
				"stretch",
				"glossy"
			].filter((t) => e[t]).map((e) => `q-btn-group--${e}`).join(" ");
			return `q-btn-group row no-wrap${t.length === 0 ? "" : " " + t}` + (e.spread ? " q-btn-group--spread" : " inline");
		});
		return () => _("div", { class: n.value }, $(t.default));
	}
});
function Up() {
	if (window.getSelection !== void 0) {
		let e = window.getSelection();
		e.empty === void 0 ? e.removeAllRanges !== void 0 && (e.removeAllRanges(), hd.is.mobile || e.addRange(document.createRange())) : e.empty();
	} else document.selection !== void 0 && document.selection.empty();
}
var Wp = {
	target: {
		type: [
			Boolean,
			String,
			Element
		],
		default: !0
	},
	noParentEvent: Boolean
}, Gp = {
	...Wp,
	contextMenu: Boolean
};
function Kp({ showing: e, avoidEmit: t, configureAnchorEl: n }) {
	let { props: r, proxy: i, emit: a } = h(), o = L(null), s = null;
	function c(e) {
		return o.value === null ? !1 : e === void 0 || e.touches === void 0 || e.touches.length <= 1;
	}
	let l = {};
	n === void 0 && (Object.assign(l, {
		hide(e) {
			i.hide(e);
		},
		toggle(e) {
			i.toggle(e), e.qAnchorHandled = !0;
		},
		toggleKey(e) {
			Pd(e, 13) && l.toggle(e);
		},
		contextClick(e) {
			i.hide(e), Cd(e), w(() => {
				i.show(e), e.qAnchorHandled = !0;
			});
		},
		prevent: Cd,
		mobileTouch(e) {
			if (l.mobileCleanup(e), !c(e)) return;
			i.hide(e), o.value.classList.add("non-selectable");
			let t = e.target;
			Ed(l, "anchor", [
				[
					t,
					"touchmove",
					"mobileCleanup",
					"passive"
				],
				[
					t,
					"touchend",
					"mobileCleanup",
					"passive"
				],
				[
					t,
					"touchcancel",
					"mobileCleanup",
					"passive"
				],
				[
					o.value,
					"contextmenu",
					"prevent",
					"notPassive"
				]
			]), s = setTimeout(() => {
				s = null, i.show(e), e.qAnchorHandled = !0;
			}, 300);
		},
		mobileCleanup(t) {
			o.value.classList.remove("non-selectable"), s !== null && (clearTimeout(s), s = null), e.value && t !== void 0 && Up();
		}
	}), n = function(e = r.contextMenu) {
		if (r.noParentEvent || o.value === null) return;
		let t = e ? i.$q.platform.is.mobile ? [[
			o.value,
			"touchstart",
			"mobileTouch",
			"passive"
		]] : [[
			o.value,
			"mousedown",
			"hide",
			"passive"
		], [
			o.value,
			"contextmenu",
			"contextClick",
			"notPassive"
		]] : [[
			o.value,
			"click",
			"toggle",
			"passive"
		], [
			o.value,
			"keyup",
			"toggleKey",
			"passive"
		]];
		Ed(l, "anchor", t);
	});
	function u() {
		Dd(l, "anchor");
	}
	function d(e) {
		for (o.value = e; o.value.classList.contains("q-anchor--skip");) o.value = o.value.parentNode;
		n();
	}
	function f() {
		if (r.target === !1 || r.target === "" || i.$el.parentNode === null) o.value = null;
		else if (r.target === !0) d(i.$el.parentNode);
		else {
			let e = r.target;
			if (typeof r.target == "string") try {
				e = document.querySelector(r.target);
			} catch {
				e = void 0;
			}
			e == null ? (o.value = null, console.error(`Anchor: target "${r.target}" not found`)) : (o.value = e.$el || e, n());
		}
	}
	return G(() => r.contextMenu, (e) => {
		o.value !== null && (u(), n(e));
	}), G(() => r.target, () => {
		o.value !== null && u(), f();
	}), G(() => r.noParentEvent, (e) => {
		o.value !== null && (e ? u() : n());
	}), A(() => {
		f(), !t && r.modelValue && o.value === null && a("update:modelValue", !1);
	}), D(() => {
		s !== null && clearTimeout(s), u();
	}), {
		anchorEl: o,
		canShow: c,
		anchorEvents: l
	};
}
function qp(e, t) {
	let n = L(null), r;
	function i(e, t) {
		let n = `${t === void 0 ? "remove" : "add"}EventListener`, i = t === void 0 ? r : t;
		e !== window && e[n]("scroll", i, vd.passive), window[n]("scroll", i, vd.passive), r = t;
	}
	function a() {
		n.value !== null && (i(n.value), n.value = null);
	}
	return D(G(() => e.noParentEvent, () => {
		n.value !== null && (a(), t());
	})), {
		localScrollTarget: n,
		unconfigureScrollTarget: a,
		changeScrollEvent: i
	};
}
var Jp = {
	modelValue: {
		type: Boolean,
		default: null
	},
	"onUpdate:modelValue": [Function, Array]
}, Yp = [
	"beforeShow",
	"show",
	"beforeHide",
	"hide"
];
function Xp({ showing: e, canShow: t, hideOnRouteChange: n, handleShow: r, handleHide: i, processOnMount: a }) {
	let o = h(), { props: s, emit: c, proxy: l } = o, u;
	function d(t) {
		e.value ? m(t) : f(t);
	}
	function f(e) {
		if (s.disable || e?.qAnchorHandled === !0 || t !== void 0 && !t(e)) return;
		let n = s["onUpdate:modelValue"] !== void 0;
		n && (c("update:modelValue", !0), u = e, w(() => {
			u === e && (u = void 0);
		})), (s.modelValue === null || !n) && p(e);
	}
	function p(t) {
		e.value || (e.value = !0, c("beforeShow", t), r === void 0 ? c("show", t) : r(t));
	}
	function m(e) {
		if (s.disable) return;
		let t = s["onUpdate:modelValue"] !== void 0;
		t && (c("update:modelValue", !1), u = e, w(() => {
			u === e && (u = void 0);
		})), (s.modelValue === null || !t) && g(e);
	}
	function g(t) {
		e.value && (e.value = !1, c("beforeHide", t), i === void 0 ? c("hide", t) : i(t));
	}
	function _(t) {
		s.disable && t ? s["onUpdate:modelValue"] !== void 0 && c("update:modelValue", !1) : t === !0 !== e.value && (t ? p : g)(u);
	}
	G(() => s.modelValue, _), n !== void 0 && np(o) && G(() => l.$route.fullPath, () => {
		n.value && e.value && m();
	}), a && A(() => {
		_(s.modelValue);
	});
	let v = {
		show: f,
		hide: m,
		toggle: d
	};
	return Object.assign(l, v), v;
}
var Zp = [];
function Qp(e) {
	return Zp.find((t) => t.contentEl !== null && t.contentEl.contains(e));
}
function $p(e, t) {
	do {
		if (e.$options.name === "QMenu") {
			if (e.hide(t), e.$props.separateClosePopup) return $f(e);
		} else if (e.__qPortal) {
			let n = $f(e);
			return n?.$options.name === "QPopupProxy" ? (e.hide(t), n) : e;
		}
		e = $f(e);
	} while (e != null);
}
function em(e, t, n) {
	for (; n !== 0 && e != null;) {
		if (e.__qPortal) {
			if (n--, e.$options.name === "QMenu") {
				e = $p(e, t);
				continue;
			}
			e.hide(t);
		}
		e = $f(e);
	}
}
var tm = [], nm = [];
function rm(e) {
	nm = nm.filter((t) => t !== e);
}
function im(e) {
	rm(e), nm.push(e);
}
function am(e) {
	rm(e), nm.length === 0 && tm.length !== 0 && (tm.at(-1)(), tm = []);
}
function om(e) {
	nm.length === 0 ? e() : tm.push(e);
}
function sm(e) {
	tm = tm.filter((t) => t !== e);
}
var cm = [], lm = [], um = 1, dm = document.body;
function fm(e, t) {
	let n = document.createElement("div");
	if (n.id = t === void 0 ? e : `q-portal--${t}--${um++}`, of.globalNodes !== void 0) {
		let e = of.globalNodes.class;
		e !== void 0 && (n.className = e);
	}
	return dm.append(n), cm.push(n), lm.push(t), n;
}
function pm(e) {
	let t = cm.indexOf(e);
	cm.splice(t, 1), lm.splice(t, 1), e.remove();
}
function mm(e) {
	if (e === dm) return;
	if (dm = e, dm === document.body || lm.reduce((e, t) => t === "dialog" ? e + 1 : e, 0) < 2) {
		cm.forEach((e) => {
			e.contains(dm) || dm.append(e);
		});
		return;
	}
	let t = lm.lastIndexOf("dialog");
	for (let e = 0; e < cm.length; e++) {
		let n = cm[e];
		(e === t || lm[e] !== "dialog") && !n.contains(dm) && dm.append(n);
	}
}
var hm = Q({
	name: "QPortal",
	setup(e, { slots: t }) {
		return () => t.default();
	}
});
function gm(e) {
	for (e = e.parent; e != null;) {
		if (e.type.name === "QGlobalDialog") return !0;
		if (e.type.name === "QDialog" || e.type.name === "QMenu") return !1;
		e = e.parent;
	}
	return !1;
}
function _m(e, t, n, i) {
	let a = L(!1), o = L(!1), s = null, c = {}, l = i === "dialog" && gm(e);
	function u(t) {
		if (t) {
			am(c), o.value = !0;
			return;
		}
		o.value = !1, a.value || (!l && s === null && (s = fm(!1, i)), a.value = !0, Zp.push(e.proxy), im(c));
	}
	function d(t) {
		if (o.value = !1, !t) return;
		am(c), a.value = !1;
		let n = Zp.indexOf(e.proxy);
		n !== -1 && Zp.splice(n, 1), s !== null && (pm(s), s = null);
	}
	return M(() => {
		d(!0);
	}), e.proxy.__qPortal = !0, id(e.proxy, "contentEl", () => t.value), {
		showPortal: u,
		hidePortal: d,
		portalIsActive: a,
		portalIsAccessible: o,
		renderPortal: () => l ? n() : a.value ? [_(r, { to: s }, _(hm, n))] : void 0
	};
}
var vm = {
	transitionShow: {
		type: String,
		default: "fade"
	},
	transitionHide: {
		type: String,
		default: "fade"
	},
	transitionDuration: {
		type: [String, Number],
		default: 300
	}
};
function ym(e, t = () => {}, n = () => {}) {
	return {
		transitionProps: o(() => {
			let r = `q-transition--${e.transitionShow || t()}`, i = `q-transition--${e.transitionHide || n()}`;
			return {
				appear: !0,
				enterFromClass: `${r}-enter-from`,
				enterActiveClass: `${r}-enter-active`,
				enterToClass: `${r}-enter-to`,
				leaveFromClass: `${i}-leave-from`,
				leaveActiveClass: `${i}-leave-active`,
				leaveToClass: `${i}-leave-to`
			};
		}),
		transitionStyle: o(() => `--q-transition-duration: ${e.transitionDuration}ms`)
	};
}
function bm() {
	let e, t = h();
	function n() {
		e = void 0;
	}
	return k(n), D(n), {
		removeTick: n,
		registerTick(n) {
			e = n, w(() => {
				e === n && (rp(t) || e(), e = void 0);
			});
		}
	};
}
function xm() {
	let e = null, t = h();
	function n() {
		e !== null && (clearTimeout(e), e = null);
	}
	return k(n), D(n), {
		removeTimeout: n,
		registerTimeout(r, i) {
			n(), rp(t) || (e = setTimeout(() => {
				e = null, r();
			}, i));
		}
	};
}
var Sm = [Element, String], Cm = [
	null,
	document,
	document.body,
	document.scrollingElement,
	document.documentElement
];
function wm(e, t) {
	let n = bp(t);
	if (n === void 0) {
		if (e == null) return window;
		n = e.closest(".scroll,.scroll-y,.overflow-auto");
	}
	return Cm.includes(n) ? window : n;
}
function Tm(e) {
	return (e === window ? document.body : e).scrollHeight;
}
function Em(e) {
	return e === window ? window.pageYOffset || window.scrollY || document.body.scrollTop || 0 : e.scrollTop;
}
function Dm(e) {
	return e === window ? window.pageXOffset || window.scrollX || document.body.scrollLeft || 0 : e.scrollLeft;
}
function Om(e, t, n = 0, r) {
	let i = r === void 0 ? performance.now() : r, a = Em(e);
	if (n <= 0) {
		a !== t && Am(e, t);
		return;
	}
	requestAnimationFrame((r) => {
		let o = r - i, s = a + (t - a) / Math.max(o, n) * o;
		Am(e, s), s !== t && Om(e, t, n - o, r);
	});
}
function km(e, t, n = 0, r) {
	let i = r === void 0 ? performance.now() : r, a = Dm(e);
	if (n <= 0) {
		a !== t && jm(e, t);
		return;
	}
	requestAnimationFrame((r) => {
		let o = r - i, s = a + (t - a) / Math.max(o, n) * o;
		jm(e, s), s !== t && km(e, t, n - o, r);
	});
}
function Am(e, t) {
	if (e === window) {
		window.scrollTo(window.pageXOffset || window.scrollX || document.body.scrollLeft || 0, t);
		return;
	}
	e.scrollTop = t;
}
function jm(e, t) {
	if (e === window) {
		window.scrollTo(t, window.pageYOffset || window.scrollY || document.body.scrollTop || 0);
		return;
	}
	e.scrollLeft = t;
}
function Mm(e, t, n) {
	if (n) {
		Om(e, t, n);
		return;
	}
	Am(e, t);
}
function Nm(e, t, n) {
	if (n) {
		km(e, t, n);
		return;
	}
	jm(e, t);
}
var Pm;
function Fm() {
	if (Pm !== void 0) return Pm;
	let e = document.createElement("p"), t = document.createElement("div");
	yp(e, {
		width: "100%",
		height: "200px"
	}), yp(t, {
		position: "absolute",
		top: "0px",
		left: "0px",
		visibility: "hidden",
		width: "200px",
		height: "150px",
		overflow: "hidden"
	}), t.append(e), document.body.append(t);
	let n = e.offsetWidth;
	t.style.overflow = "scroll";
	let r = e.offsetWidth;
	return n === r && (r = t.clientWidth), t.remove(), Pm = n - r, Pm;
}
var Im = [], Lm;
function Rm(e) {
	Lm = e.keyCode === 27;
}
function zm() {
	Lm &&= !1;
}
function Bm(e) {
	Lm && (Lm = !1, Pd(e, 27) && Im.at(-1)(e));
}
function Vm(e) {
	window[e]("keydown", Rm), window[e]("blur", zm), window[e]("keyup", Bm), Lm = !1;
}
function Hm(e) {
	md.is.desktop && (Im.push(e), Im.length === 1 && Vm("addEventListener"));
}
function Um(e) {
	let t = Im.indexOf(e);
	t !== -1 && (Im.splice(t, 1), Im.length === 0 && Vm("removeEventListener"));
}
var Wm = [];
function Gm(e) {
	Wm.at(-1)(e);
}
function Km(e) {
	md.is.desktop && (Wm.push(e), Wm.length === 1 && document.body.addEventListener("focusin", Gm));
}
function qm(e) {
	let t = Wm.indexOf(e);
	t !== -1 && (Wm.splice(t, 1), Wm.length === 0 && document.body.removeEventListener("focusin", Gm));
}
var Jm = null, { notPassiveCapture: Ym } = vd, Xm = [];
function Zm(e) {
	Jm !== null && (clearTimeout(Jm), Jm = null);
	let t = e.target;
	if (t === void 0 || t.nodeType === 8 || t.classList.contains("no-pointer-events")) return;
	let n = Zp.length - 1;
	for (; n >= 0;) {
		let e = Zp[n].$;
		if (e.type.name === "QTooltip") {
			n--;
			continue;
		}
		if (e.type.name !== "QDialog") break;
		if (!e.props.seamless) return;
		n--;
	}
	for (let n = Xm.length - 1; n >= 0; n--) {
		let r = Xm[n];
		if ((r.anchorEl.value === null || !r.anchorEl.value.contains(t)) && (t === document.body || r.innerRef.value !== null && !r.innerRef.value.contains(t))) e.qClickOutside = !0, r.onClickOutside(e);
		else return;
	}
}
function Qm(e) {
	Xm.push(e), Xm.length === 1 && (document.addEventListener("mousedown", Zm, Ym), document.addEventListener("touchstart", Zm, Ym));
}
function $m(e) {
	let t = Xm.indexOf(e);
	t !== -1 && (Xm.splice(t, 1), Xm.length === 0 && (Jm !== null && (clearTimeout(Jm), Jm = null), document.removeEventListener("mousedown", Zm, Ym), document.removeEventListener("touchstart", Zm, Ym)));
}
var eh, th, nh = [
	"top",
	"center",
	"bottom"
], rh = [
	"left",
	"middle",
	"right",
	"start",
	"end"
];
function ih(e) {
	let t = e.split(" ");
	return t.length === 2 ? nh.includes(t[0]) ? rh.includes(t[1]) ? !0 : (console.error("Anchor/Self position must end with one of left/middle/right/start/end"), !1) : (console.error("Anchor/Self position must start with one of top/center/bottom"), !1) : !1;
}
function ah(e) {
	return !e || !(e.length !== 2 || typeof e[0] != "number" || typeof e[1] != "number");
}
var oh = {
	"start#ltr": "left",
	"start#rtl": "right",
	"end#ltr": "right",
	"end#rtl": "left"
};
[
	"left",
	"middle",
	"right"
].forEach((e) => {
	oh[`${e}#ltr`] = e, oh[`${e}#rtl`] = e;
});
function sh(e, t) {
	let n = e.split(" ");
	return {
		vertical: n[0],
		horizontal: oh[`${n[1]}#${t ? "rtl" : "ltr"}`]
	};
}
function ch(e, t) {
	let { top: n, left: r, right: i, bottom: a, width: o, height: s } = e.getBoundingClientRect();
	return t !== void 0 && (n -= t[1], r -= t[0], a += t[1], i += t[0], o += t[0], s += t[1]), {
		top: n,
		bottom: a,
		height: s,
		left: r,
		right: i,
		width: o,
		middle: r + (i - r) / 2,
		center: n + (a - n) / 2
	};
}
function lh(e, t, n) {
	let { top: r, left: i } = e.getBoundingClientRect();
	return r += t.top, i += t.left, n !== void 0 && (r += n[1], i += n[0]), {
		top: r,
		bottom: r + 1,
		height: 1,
		left: i,
		right: i + 1,
		width: 1,
		middle: i,
		center: r
	};
}
function uh(e, t) {
	return {
		top: 0,
		center: t / 2,
		bottom: t,
		left: 0,
		middle: e / 2,
		right: e
	};
}
function dh(e, t, n, r) {
	return {
		top: e[n.vertical] - t[r.vertical],
		left: e[n.horizontal] - t[r.horizontal]
	};
}
function fh(e, t = 0) {
	if (e.targetEl === null || e.anchorEl === null || t > 5) return;
	if (e.targetEl.offsetHeight === 0 || e.targetEl.offsetWidth === 0) {
		setTimeout(() => {
			fh(e, t + 1);
		}, 10);
		return;
	}
	let { targetEl: n, offset: r, anchorEl: i, anchorOrigin: a, selfOrigin: o, absoluteOffset: s, fit: c, cover: l, maxHeight: u, maxWidth: d } = e;
	if (md.is.ios && window.visualViewport !== void 0) {
		let e = document.body.style, { offsetLeft: t, offsetTop: n } = window.visualViewport;
		t !== eh && (e.setProperty("--q-pe-left", t + "px"), eh = t), n !== th && (e.setProperty("--q-pe-top", n + "px"), th = n);
	}
	let { scrollLeft: f, scrollTop: p } = n, m = s === void 0 ? ch(i, l ? [0, 0] : r) : lh(i, s, r);
	Object.assign(n.style, {
		top: 0,
		left: 0,
		minWidth: null,
		minHeight: null,
		maxWidth: d,
		maxHeight: u,
		visibility: "visible"
	});
	let { offsetWidth: h, offsetHeight: g } = n, { elWidth: _, elHeight: v } = c || l ? {
		elWidth: Math.max(m.width, h),
		elHeight: l ? Math.max(m.height, g) : g
	} : {
		elWidth: h,
		elHeight: g
	}, y = {
		maxWidth: d,
		maxHeight: u
	};
	(c || l) && (y.minWidth = m.width + "px", l && (y.minHeight = m.height + "px")), Object.assign(n.style, y);
	let b = uh(_, v), x = dh(m, b, a, o);
	if (s === void 0 || r === void 0) ph(x, m, b, a, o);
	else {
		let { top: e, left: t } = x;
		ph(x, m, b, a, o);
		let n = !1;
		if (x.top !== e) {
			n = !0;
			let e = 2 * r[1];
			m.center = m.top -= e, m.bottom -= e + 2;
		}
		if (x.left !== t) {
			n = !0;
			let e = 2 * r[0];
			m.middle = m.left -= e, m.right -= e + 2;
		}
		n && (x = dh(m, b, a, o), ph(x, m, b, a, o));
	}
	y = {
		top: x.top + "px",
		left: x.left + "px"
	}, x.maxHeight !== void 0 && (y.maxHeight = x.maxHeight + "px", m.height > x.maxHeight && (y.minHeight = y.maxHeight)), x.maxWidth !== void 0 && (y.maxWidth = x.maxWidth + "px", m.width > x.maxWidth && (y.minWidth = y.maxWidth)), Object.assign(n.style, y), n.scrollTop !== p && (n.scrollTop = p), n.scrollLeft !== f && (n.scrollLeft = f);
}
function ph(e, t, n, r, i) {
	let a = n.bottom, o = n.right, s = Fm(), c = window.innerHeight - s, l = document.body.clientWidth;
	if (e.top < 0 || e.top + a > c) if (i.vertical === "center") e.top = t[r.vertical] > c / 2 ? Math.max(0, c - a) : 0, e.maxHeight = Math.min(a, c);
	else if (t[r.vertical] > c / 2) {
		let n = Math.min(c, r.vertical === "center" ? t.center : r.vertical === i.vertical ? t.bottom : t.top);
		e.maxHeight = Math.min(a, n), e.top = Math.max(0, n - a);
	} else e.top = Math.max(0, r.vertical === "center" ? t.center : r.vertical === i.vertical ? t.top : t.bottom), e.maxHeight = Math.min(a, c - e.top);
	if (e.left < 0 || e.left + o > l) if (e.maxWidth = Math.min(o, l), i.horizontal === "middle") e.left = t[r.horizontal] > l / 2 ? Math.max(0, l - o) : 0;
	else if (t[r.horizontal] > l / 2) {
		let n = Math.min(l, r.horizontal === "middle" ? t.middle : r.horizontal === i.horizontal ? t.right : t.left);
		e.maxWidth = Math.min(o, n), e.left = Math.max(0, n - e.maxWidth);
	} else e.left = Math.max(0, r.horizontal === "middle" ? t.middle : r.horizontal === i.horizontal ? t.left : t.right), e.maxWidth = Math.min(o, l - e.left);
}
var mh = Q({
	name: "QMenu",
	inheritAttrs: !1,
	props: {
		...Gp,
		...Jp,
		...qf,
		...vm,
		persistent: Boolean,
		autoClose: Boolean,
		separateClosePopup: Boolean,
		noEscDismiss: Boolean,
		noRouteDismiss: Boolean,
		noRefocus: Boolean,
		noFocus: Boolean,
		fit: Boolean,
		cover: Boolean,
		square: Boolean,
		anchor: {
			type: String,
			validator: ih
		},
		self: {
			type: String,
			validator: ih
		},
		offset: {
			type: Array,
			validator: ah
		},
		scrollTarget: Sm,
		touchPosition: Boolean,
		maxHeight: {
			type: String,
			default: null
		},
		maxWidth: {
			type: String,
			default: null
		}
	},
	emits: [
		...Yp,
		"click",
		"escapeKey"
	],
	setup(e, { slots: t, emit: n, attrs: r }) {
		let i = null, s, c, l, u = h(), { proxy: d } = u, { $q: f } = d, p = L(null), m = L(!1), g = o(() => !e.persistent && !e.noRouteDismiss), v = Jf(e, f), { registerTick: y, removeTick: b } = bm(), { registerTimeout: x } = xm(), { transitionProps: S, transitionStyle: C } = ym(e), { localScrollTarget: w, changeScrollEvent: T, unconfigureScrollTarget: E } = qp(e, U), { anchorEl: O, canShow: k } = Kp({ showing: m }), { hide: A } = Xp({
			showing: m,
			canShow: k,
			handleShow: ee,
			handleHide: te,
			hideOnRouteChange: g,
			processOnMount: !0
		}), { showPortal: j, hidePortal: M, renderPortal: N } = _m(u, p, K, "menu"), P = {
			anchorEl: O,
			innerRef: p,
			onClickOutside(t) {
				if (!e.persistent && m.value) return A(t), (t.type === "touchstart" || t.target.classList.contains("q-dialog__backdrop")) && wd(t), !0;
			}
		}, F = o(() => sh(e.anchor || (e.cover ? "center middle" : "bottom start"), f.lang.rtl)), I = o(() => e.cover ? F.value : sh(e.self || "top start", f.lang.rtl)), R = o(() => (e.square ? " q-menu--square" : "") + (v.value ? " q-menu--dark q-dark" : "")), z = o(() => e.autoClose ? { onClick: W } : {}), B = o(() => m.value && !e.persistent);
		G(B, (e) => {
			e ? (Hm(re), Qm(P)) : (Um(re), $m(P));
		});
		function V() {
			om(() => {
				let e = p.value;
				e && !e.contains(document.activeElement) && (e = e.querySelector("[autofocus][tabindex], [data-autofocus][tabindex]") || e.querySelector("[autofocus] [tabindex], [data-autofocus] [tabindex]") || e.querySelector("[autofocus], [data-autofocus]") || e, e.focus({ preventScroll: !0 }));
			});
		}
		function ee(t) {
			if (i = e.noRefocus ? null : document.activeElement, Km(ne), j(), U(), s = void 0, t !== void 0 && (e.touchPosition || e.contextMenu)) {
				let e = xd(t);
				if (e.left !== void 0) {
					let { top: t, left: n } = O.value.getBoundingClientRect();
					s = {
						left: e.left - n,
						top: e.top - t
					};
				}
			}
			c === void 0 && (c = G(() => f.screen.width + "|" + f.screen.height + "|" + e.self + "|" + e.anchor + "|" + f.lang.rtl, ie)), e.noFocus || document.activeElement.blur(), y(() => {
				ie(), e.noFocus || V();
			}), x(() => {
				f.platform.is.ios && (l = e.autoClose, p.value.click()), ie(), j(!0), n("show", t);
			}, e.transitionDuration);
		}
		function te(t) {
			b(), M(), H(!0), i !== null && (t === void 0 || !t.qClickOutside) && (((t?.type.indexOf("key") === 0 ? i.closest("[tabindex]:not([tabindex^=\"-\"])") : void 0) || i).focus(), i = null), x(() => {
				M(!0), n("hide", t);
			}, e.transitionDuration);
		}
		function H(e) {
			s = void 0, c !== void 0 && (c(), c = void 0), (e || m.value) && (qm(ne), E(), $m(P), Um(re)), e || (i = null);
		}
		function U() {
			(O.value !== null || e.scrollTarget !== void 0) && (w.value = wm(O.value, e.scrollTarget), T(w.value, ie));
		}
		function W(e) {
			l ? l = !1 : ($p(d, e), n("click", e));
		}
		function ne(t) {
			B.value && !e.noFocus && !xp(p.value, t.target) && V();
		}
		function re(t) {
			e.noEscDismiss || (n("escapeKey"), A(t));
		}
		function ie() {
			fh({
				targetEl: p.value,
				offset: e.offset,
				anchorEl: O.value,
				anchorOrigin: F.value,
				selfOrigin: I.value,
				absoluteOffset: s,
				fit: e.fit,
				cover: e.cover,
				maxHeight: e.maxHeight,
				maxWidth: e.maxWidth
			});
		}
		function K() {
			return _(a, S.value, () => m.value ? _("div", {
				role: "menu",
				...r,
				ref: p,
				tabindex: -1,
				class: ["q-menu q-position-engine scroll" + R.value, r.class],
				style: [r.style, C.value],
				...z.value
			}, $(t.default)) : null);
		}
		return D(() => {
			H();
		}), Object.assign(d, {
			focus: V,
			updatePosition: ie
		}), N;
	}
});
function hh() {
	if (typeof crypto > "u") return () => {
		throw Error("[Quasar uid()] Secure RNG not available. Cannot generate collision-resistant UUID.");
	};
	if (crypto.randomUUID) return () => crypto.randomUUID();
	let e = Array.from({ length: 256 }, (e, t) => (t + 256).toString(16).slice(1)), t, n;
	return () => {
		(t === void 0 || n + 16 > 4096) && (n = 0, t = /* @__PURE__ */ new Uint8Array(4096), crypto.getRandomValues(t));
		let r = n;
		return n += 16, t[r + 6] = t[r + 6] & 15 | 64, t[r + 8] = t[r + 8] & 63 | 128, e[t[r]] + e[t[r + 1]] + e[t[r + 2]] + e[t[r + 3]] + "-" + e[t[r + 4]] + e[t[r + 5]] + "-" + e[t[r + 6]] + e[t[r + 7]] + "-" + e[t[r + 8]] + e[t[r + 9]] + "-" + e[t[r + 10]] + e[t[r + 11]] + e[t[r + 12]] + e[t[r + 13]] + e[t[r + 14]] + e[t[r + 15]];
	};
}
var gh = hh();
function _h(e) {
	return e ?? null;
}
function vh(e, t) {
	return e ?? (t ? `f_${gh()}` : null);
}
function yh({ getValue: e, required: t = !0 } = {}) {
	if (od.value) {
		let n = L(e === void 0 ? null : _h(e()));
		return t && n.value === null && A(() => {
			n.value = `f_${gh()}`;
		}), e !== void 0 && G(e, (e) => {
			n.value = vh(e, t);
		}), n;
	}
	return e === void 0 ? L(`f_${gh()}`) : o(() => vh(e(), t));
}
var bh = Object.keys(Np);
function xh(e) {
	return bh.reduce((t, n) => {
		let r = e[n];
		return r !== void 0 && (t[n] = r), t;
	}, {});
}
var Sh = Q({
	name: "QBtnDropdown",
	props: {
		...Np,
		...vm,
		modelValue: Boolean,
		split: Boolean,
		dropdownIcon: String,
		contentClass: [
			Array,
			String,
			Object
		],
		contentStyle: [
			Array,
			String,
			Object
		],
		cover: Boolean,
		persistent: Boolean,
		noEscDismiss: Boolean,
		noRouteDismiss: Boolean,
		autoClose: Boolean,
		noRefocus: Boolean,
		noFocus: Boolean,
		menuAnchor: {
			type: String,
			default: "bottom end"
		},
		menuSelf: {
			type: String,
			default: "top end"
		},
		menuOffset: Array,
		disableMainBtn: Boolean,
		disableDropdown: Boolean,
		noIconAnimation: Boolean,
		toggleAriaLabel: String
	},
	emits: [
		"update:modelValue",
		"click",
		"beforeShow",
		"show",
		"beforeHide",
		"hide"
	],
	setup(e, { slots: t, emit: n }) {
		let { proxy: r } = h(), i = L(e.modelValue), a = L(null), s = yh(), c = o(() => {
			let t = {
				"aria-expanded": i.value ? "true" : "false",
				"aria-haspopup": "true",
				"aria-controls": s.value,
				"aria-label": e.toggleAriaLabel || r.$q.lang.label[i.value ? "collapse" : "expand"](e.label)
			};
			return (e.disable || !e.split && e.disableMainBtn || e.disableDropdown) && (t["aria-disabled"] = "true"), t;
		}), l = o(() => "q-btn-dropdown__arrow" + (i.value && !e.noIconAnimation ? " rotate-180" : "") + (e.split ? "" : " q-btn-dropdown__arrow-container")), u = o(() => Mp(e)), d = o(() => xh(e));
		G(() => e.modelValue, (e) => {
			a.value?.[e ? "show" : "hide"]();
		}), G(() => e.split, S);
		function f(e) {
			i.value = !0, n("beforeShow", e);
		}
		function p(e) {
			n("show", e), n("update:modelValue", !0);
		}
		function m(e) {
			i.value = !1, n("beforeHide", e);
		}
		function g(e) {
			n("hide", e), n("update:modelValue", !1);
		}
		function v(e) {
			n("click", e);
		}
		function y(e) {
			Sd(e), S(), n("click", e);
		}
		function b(e) {
			a.value?.toggle(e);
		}
		function x(e) {
			a.value?.show(e);
		}
		function S(e) {
			a.value?.hide(e);
		}
		return Object.assign(r, {
			show: x,
			hide: S,
			toggle: b
		}), A(() => {
			e.modelValue && x();
		}), () => {
			let n = [_(Gf, {
				class: l.value,
				name: e.dropdownIcon || r.$q.iconSet.arrow.dropdown
			})];
			return e.disableDropdown || n.push(_(mh, {
				ref: a,
				id: s.value,
				class: e.contentClass,
				style: e.contentStyle,
				cover: e.cover,
				fit: !0,
				persistent: e.persistent,
				noEscDismiss: e.noEscDismiss,
				noRouteDismiss: e.noRouteDismiss,
				autoClose: e.autoClose,
				noFocus: e.noFocus,
				noRefocus: e.noRefocus,
				anchor: e.menuAnchor,
				self: e.menuSelf,
				offset: e.menuOffset,
				separateClosePopup: !0,
				transitionShow: e.transitionShow,
				transitionHide: e.transitionHide,
				transitionDuration: e.transitionDuration,
				onBeforeShow: f,
				onShow: p,
				onBeforeHide: m,
				onHide: g
			}, t.default)), e.split ? _(Hp, {
				class: "q-btn-dropdown q-btn-dropdown--split no-wrap q-btn-item",
				rounded: e.rounded,
				square: e.square,
				...u.value,
				glossy: e.glossy,
				stretch: e.stretch
			}, () => [_(Vp, {
				class: "q-btn-dropdown--current",
				...d.value,
				disable: e.disable || e.disableMainBtn,
				noWrap: !0,
				round: !1,
				onClick: y
			}, {
				default: t.label,
				loading: t.loading
			}), _(Vp, {
				class: "q-btn-dropdown__arrow-container q-anchor--skip",
				...c.value,
				...u.value,
				disable: e.disable || e.disableDropdown,
				rounded: e.rounded,
				color: e.color,
				textColor: e.textColor,
				dense: e.dense,
				size: e.size,
				padding: e.padding,
				ripple: e.ripple
			}, () => n)]) : _(Vp, {
				class: "q-btn-dropdown q-btn-dropdown--simple",
				...d.value,
				...c.value,
				disable: e.disable || e.disableMainBtn,
				noWrap: !0,
				round: !1,
				onClick: v
			}, {
				default: () => $(t.label, []).concat(n),
				loading: t.loading
			});
		};
	}
}), Ch = { name: String };
function wh(e) {
	return o(() => ({
		type: "hidden",
		name: e.name,
		value: e.modelValue
	}));
}
function Th(e = {}) {
	return (t, n, r) => {
		t[n](_("input", {
			class: "hidden" + (r || ""),
			...e.value
		}));
	};
}
function Eh(e) {
	return o(() => e.name || e.for);
}
Q({
	name: "QBtnToggle",
	props: {
		...Ch,
		modelValue: { required: !0 },
		options: {
			type: Array,
			required: !0,
			validator: (e) => e.every((e) => ("label" in e || "icon" in e || "slot" in e) && "value" in e)
		},
		color: String,
		textColor: String,
		toggleColor: {
			type: String,
			default: "primary"
		},
		toggleTextColor: String,
		outline: Boolean,
		flat: Boolean,
		unelevated: Boolean,
		rounded: Boolean,
		push: Boolean,
		glossy: Boolean,
		size: String,
		padding: String,
		noCaps: Boolean,
		noWrap: Boolean,
		dense: Boolean,
		readonly: Boolean,
		disable: Boolean,
		stack: Boolean,
		stretch: Boolean,
		spread: Boolean,
		clearable: Boolean,
		ripple: {
			type: [Boolean, Object],
			default: !0
		}
	},
	emits: [
		"update:modelValue",
		"clear",
		"click"
	],
	setup(e, { slots: t, emit: n }) {
		let r = o(() => e.options.find((t) => t.value === e.modelValue) !== void 0), i = Th(o(() => ({
			type: "hidden",
			name: e.name,
			value: e.modelValue
		}))), a = o(() => Mp(e)), s = o(() => ({
			rounded: e.rounded,
			dense: e.dense,
			...a.value
		})), c = o(() => e.options.map((t, n) => {
			let { attrs: r, value: i, slot: a, ...o } = t;
			return {
				slot: a,
				props: {
					key: n,
					"aria-pressed": i === e.modelValue ? "true" : "false",
					...r,
					...o,
					...s.value,
					disable: e.disable || o.disable === !0,
					color: i === e.modelValue ? u(o, "toggleColor") : u(o, "color"),
					textColor: i === e.modelValue ? u(o, "toggleTextColor") : u(o, "textColor"),
					noCaps: u(o, "noCaps") === !0,
					noWrap: u(o, "noWrap") === !0,
					size: u(o, "size"),
					padding: u(o, "padding"),
					ripple: u(o, "ripple"),
					stack: u(o, "stack") === !0,
					stretch: u(o, "stretch") === !0,
					onClick(e) {
						l(i, t, e);
					}
				}
			};
		}));
		function l(t, r, i) {
			e.readonly || (e.modelValue === t ? e.clearable && (n("update:modelValue", null, null), n("clear")) : n("update:modelValue", t, r), n("click", i));
		}
		function u(t, n) {
			return t[n] === void 0 ? e[n] : t[n];
		}
		function d() {
			let n = c.value.map((e) => _(Vp, e.props, e.slot === void 0 ? void 0 : t[e.slot]));
			return e.name !== void 0 && !e.disable && r.value && i(n, "push"), Of(t.default, n);
		}
		return () => _(Hp, {
			class: "q-btn-toggle",
			...a.value,
			rounded: e.rounded,
			stretch: e.stretch,
			glossy: e.glossy,
			spread: e.spread
		}, d);
	}
});
var Dh = Q({
	name: "QCard",
	props: {
		...qf,
		tag: {
			type: String,
			default: "div"
		},
		square: Boolean,
		flat: Boolean,
		bordered: Boolean
	},
	setup(e, { slots: t }) {
		let { proxy: { $q: n } } = h(), r = Jf(e, n), i = o(() => "q-card" + (r.value ? " q-card--dark q-dark" : "") + (e.bordered ? " q-card--bordered" : "") + (e.square ? " q-card--square no-border-radius" : "") + (e.flat ? " q-card--flat no-shadow" : ""));
		return () => _(e.tag, { class: i.value }, $(t.default));
	}
}), Oh = Q({
	name: "QCardSection",
	props: {
		tag: {
			type: String,
			default: "div"
		},
		horizontal: Boolean
	},
	setup(e, { slots: t }) {
		let n = o(() => `q-card__section q-card__section--${e.horizontal ? "horiz row no-wrap" : "vert"}`);
		return () => _(e.tag, { class: n.value }, $(t.default));
	}
}), kh = Q({
	name: "QCardActions",
	props: {
		...Zf,
		vertical: Boolean
	},
	setup(e, { slots: t }) {
		let n = Qf(e), r = o(() => `q-card__actions ${n.value} q-card__actions--${e.vertical ? "vert column" : "horiz row"}`);
		return () => _("div", { class: r.value }, $(t.default));
	}
}), Ah = {
	left: !0,
	right: !0,
	up: !0,
	down: !0,
	horizontal: !0,
	vertical: !0
}, jh = Object.keys(Ah);
Ah.all = !0;
function Mh(e) {
	let t = {};
	for (let n of jh) e[n] && (t[n] = !0);
	return Object.keys(t).length === 0 ? Ah : (t.horizontal ? t.left = t.right = !0 : t.left && t.right && (t.horizontal = !0), t.vertical ? t.up = t.down = !0 : t.up && t.down && (t.vertical = !0), t.horizontal && t.vertical && (t.all = !0), t);
}
var Nh = ["INPUT", "TEXTAREA"];
function Ph(e, t) {
	return t.event === void 0 && e.target !== void 0 && !e.target.draggable && typeof t.handler == "function" && !Nh.includes(e.target.nodeName.toUpperCase()) && (e.qClonedBy === void 0 || !e.qClonedBy.includes(t.uid));
}
function Fh(e) {
	let t = [
		.06,
		6,
		50
	];
	return typeof e == "string" && e.length !== 0 && e.split(":").forEach((e, n) => {
		let r = Number.parseFloat(e);
		r && (t[n] = r);
	}), t;
}
function Ih() {
	document.body.classList.remove("no-pointer-events--children");
}
var Lh = gd({
	name: "touch-swipe",
	beforeMount(e, { value: t, arg: n, modifiers: r }) {
		if (!r.mouse && !md.has.touch) return;
		let i = r.mouseCapture || r.mousecapture ? "Capture" : "", a = {
			handler: t,
			sensitivity: Fh(n),
			direction: Mh(r),
			noop: yd,
			mouseStart(e) {
				Ph(e, a) && bd(e) && (Ed(a, "temp", [[
					document,
					"mousemove",
					"move",
					`notPassive${i}`
				], [
					document,
					"mouseup",
					"end",
					"notPassiveCapture"
				]]), a.start(e, !0));
			},
			touchStart(e) {
				if (Ph(e, a)) {
					let t = e.target;
					Ed(a, "temp", [
						[
							t,
							"touchmove",
							"move",
							"notPassiveCapture"
						],
						[
							t,
							"touchcancel",
							"end",
							"notPassiveCapture"
						],
						[
							t,
							"touchend",
							"end",
							"notPassiveCapture"
						]
					]), a.start(e);
				}
			},
			start(t, n) {
				md.is.firefox && Td(e, !0);
				let r = xd(t);
				a.event = {
					x: r.left,
					y: r.top,
					time: Date.now(),
					mouse: n === !0,
					dir: !1
				};
			},
			move(e) {
				if (a.event === void 0) return;
				if (a.event.dir !== !1) {
					wd(e);
					return;
				}
				let t = Date.now() - a.event.time;
				if (t === 0) return;
				let n = xd(e), r = n.left - a.event.x, i = Math.abs(r), o = n.top - a.event.y, s = Math.abs(o);
				if (!a.event.mouse) {
					if (i < a.sensitivity[1] && s < a.sensitivity[1]) {
						a.end(e);
						return;
					}
				} else if (window.getSelection().toString() !== "") {
					a.end(e);
					return;
				} else if (i < a.sensitivity[2] && s < a.sensitivity[2]) return;
				let c = i / t, l = s / t;
				a.direction.vertical && i < s && i < 100 && l > a.sensitivity[0] && (a.event.dir = o < 0 ? "up" : "down"), a.direction.horizontal && i > s && s < 100 && c > a.sensitivity[0] && (a.event.dir = r < 0 ? "left" : "right"), a.direction.up && i < s && o < 0 && i < 100 && l > a.sensitivity[0] && (a.event.dir = "up"), a.direction.down && i < s && o > 0 && i < 100 && l > a.sensitivity[0] && (a.event.dir = "down"), a.direction.left && i > s && r < 0 && s < 100 && c > a.sensitivity[0] && (a.event.dir = "left"), a.direction.right && i > s && r > 0 && s < 100 && c > a.sensitivity[0] && (a.event.dir = "right"), a.event.dir === !1 ? a.end(e) : (wd(e), a.event.mouse && (document.body.classList.add("no-pointer-events--children", "non-selectable"), Up(), a.styleCleanup = (e) => {
					a.styleCleanup = void 0, document.body.classList.remove("non-selectable"), e === !0 ? setTimeout(Ih, 50) : Ih();
				}), a.handler({
					evt: e,
					touch: a.event.mouse !== !0,
					mouse: a.event.mouse,
					direction: a.event.dir,
					duration: t,
					distance: {
						x: i,
						y: s
					}
				}));
			},
			end(t) {
				a.event !== void 0 && (Dd(a, "temp"), md.is.firefox && Td(e, !1), a.styleCleanup?.(!0), t !== void 0 && a.event.dir !== !1 && wd(t), a.event = void 0);
			}
		};
		e.__qtouchswipe = a, r.mouse && Ed(a, "main", [[
			e,
			"mousedown",
			"mouseStart",
			`passive${r.mouseCapture || r.mousecapture ? "Capture" : ""}`
		]]), md.has.touch && Ed(a, "main", [[
			e,
			"touchstart",
			"touchStart",
			`passive${r.capture ? "Capture" : ""}`
		], [
			e,
			"touchmove",
			"noop",
			"notPassiveCapture"
		]]);
	},
	updated(e, t) {
		let n = e.__qtouchswipe;
		n !== void 0 && (t.oldValue !== t.value && (typeof t.value != "function" && n.end(), n.handler = t.value), n.direction = Mh(t.modifiers));
	},
	beforeUnmount(e) {
		let t = e.__qtouchswipe;
		t !== void 0 && (Dd(t, "main"), Dd(t, "temp"), md.is.firefox && Td(e, !1), t.styleCleanup?.(), delete e.__qtouchswipe);
	}
});
function Rh() {
	let e = Object.create(null);
	return {
		getCache: (t, n) => e[t] === void 0 ? e[t] = typeof n == "function" ? n() : n : e[t],
		setCache(t, n) {
			e[t] = n;
		},
		hasCache(t) {
			return Object.hasOwn(e, t);
		},
		clearCache(t) {
			t === void 0 ? e = Object.create(null) : delete e[t];
		}
	};
}
var zh = {
	name: { required: !0 },
	disable: Boolean
}, Bh = { setup(e, { slots: t }) {
	return () => _("div", {
		class: "q-panel scroll",
		role: "tabpanel"
	}, $(t.default));
} }, Vh = {
	modelValue: { required: !0 },
	animated: Boolean,
	infinite: Boolean,
	swipeable: Boolean,
	vertical: Boolean,
	transitionPrev: String,
	transitionNext: String,
	transitionDuration: {
		type: [String, Number],
		default: 300
	},
	keepAlive: Boolean,
	keepAliveInclude: [
		String,
		Array,
		RegExp
	],
	keepAliveExclude: [
		String,
		Array,
		RegExp
	],
	keepAliveMax: Number
}, Hh = [
	"update:modelValue",
	"beforeTransition",
	"transition"
];
function Uh(e) {
	return e != null && e !== "";
}
function Wh() {
	let { props: e, emit: t, proxy: r } = h(), { getCache: i } = Rh(), { registerTimeout: s } = xm(), c, l, u = L(null), d = { value: null };
	function f(t) {
		let n = e.vertical ? "up" : "left";
		O((r.$q.lang.rtl ? -1 : 1) * (t.direction === n ? 1 : -1));
	}
	let p = o(() => [[
		Lh,
		f,
		void 0,
		{
			horizontal: !e.vertical,
			vertical: e.vertical,
			mouse: !0
		}
	]]), m = o(() => e.transitionPrev || `slide-${e.vertical ? "down" : "right"}`), g = o(() => e.transitionNext || `slide-${e.vertical ? "up" : "left"}`), v = o(() => `--q-transition-duration: ${e.transitionDuration}ms`), y = o(() => typeof e.modelValue == "string" || typeof e.modelValue == "number" ? e.modelValue : String(e.modelValue)), b = o(() => ({
		include: e.keepAliveInclude,
		exclude: e.keepAliveExclude,
		max: e.keepAliveMax
	})), x = o(() => e.keepAliveInclude !== void 0 || e.keepAliveExclude !== void 0);
	G(() => e.modelValue, (n, r) => {
		let i = Uh(n) ? T(n) : -1;
		l || D(i === -1 ? 0 : i < T(r) ? -1 : 1), d.value !== i && (d.value = i, t("beforeTransition", n, r), s(() => {
			t("transition", n, r);
		}, e.transitionDuration));
	});
	function S() {
		O(1);
	}
	function C() {
		O(-1);
	}
	function w(e) {
		t("update:modelValue", e);
	}
	function T(e) {
		return c.findIndex((t) => t.props.name === e && t.props.disable !== "" && t.props.disable !== !0);
	}
	function E() {
		return c.filter((e) => e.props.disable !== "" && e.props.disable !== !0);
	}
	function D(t) {
		let n = t !== 0 && e.animated && d.value !== -1 ? "q-transition--" + (t === -1 ? m.value : g.value) : null;
		u.value !== n && (u.value = n);
	}
	function O(n, r = d.value) {
		let i = r + n;
		for (; i !== -1 && i < c.length;) {
			let e = c[i];
			if (e !== void 0 && e.props.disable !== "" && e.props.disable !== !0) {
				D(n), l = !0, t("update:modelValue", e.props.name), setTimeout(() => {
					l = !1;
				});
				return;
			}
			i += n;
		}
		e.infinite && c.length !== 0 && r !== -1 && r !== c.length && O(n, n === -1 ? c.length : -1);
	}
	function k() {
		let t = T(e.modelValue);
		return d.value !== t && (d.value = t), !0;
	}
	function A() {
		let t = Uh(e.modelValue) && k() && c[d.value];
		return e.keepAlive ? [_(n, b.value, [_(x.value ? i(y.value, () => ({
			...Bh,
			name: y.value
		})) : Bh, {
			key: y.value,
			style: v.value
		}, () => t)])] : [_("div", {
			class: "q-panel scroll",
			style: v.value,
			key: y.value,
			role: "tabpanel"
		}, [t])];
	}
	function j() {
		if (c.length !== 0) return e.animated ? [_(a, { name: u.value }, A)] : A();
	}
	function M(e) {
		return c = tp($(e.default, [])).filter((e) => e.props !== null && e.props.slot === void 0 && Uh(e.props.name)), c.length;
	}
	function N() {
		return c;
	}
	return Object.assign(r, {
		next: S,
		previous: C,
		goTo: w
	}), {
		panelIndex: d,
		panelDirectives: p,
		updatePanelsList: M,
		updatePanelIndex: k,
		getPanelContent: j,
		getEnabledPanels: E,
		getPanels: N,
		isValidPanelName: Uh,
		keepAliveProps: b,
		needsUniqueKeepAliveWrapper: x,
		goToPanelByOffset: O,
		goToPanel: w,
		nextPanel: S,
		previousPanel: C
	};
}
var Gh = 0, Kh = {
	fullscreen: Boolean,
	noRouteFullscreenExit: Boolean
}, qh = ["update:fullscreen", "fullscreen"];
function Jh() {
	let e = h(), { props: t, emit: n, proxy: r } = e, i, a, o = L(!1);
	np(e) && G(() => r.$route.fullPath, () => {
		t.noRouteFullscreenExit || l();
	}), G(() => t.fullscreen, (e) => {
		o.value !== e && s();
	}), G(o, (e) => {
		n("update:fullscreen", e), n("fullscreen", e);
	});
	function s() {
		o.value ? l() : c();
	}
	function c() {
		o.value || (o.value = !0, r.$el.replaceWith(a), document.body.append(r.$el), Gh++, Gh === 1 && document.body.classList.add("q-body--fullscreen-mixin"), i = { handler: l }, zd.add(i));
	}
	function l() {
		o.value && (i !== void 0 && (zd.remove(i), i = void 0), a.replaceWith(r.$el), o.value = !1, Gh = Math.max(0, Gh - 1), Gh === 0 && (document.body.classList.remove("q-body--fullscreen-mixin"), r.$el.scrollIntoView !== void 0 && setTimeout(() => {
			r.$el.scrollIntoView();
		})));
	}
	return E(() => {
		a = document.createElement("span");
	}), A(() => {
		t.fullscreen && c();
	}), D(l), Object.assign(r, {
		toggleFullscreen: s,
		setFullscreen: c,
		exitFullscreen: l
	}), {
		inFullscreen: o,
		toggleFullscreen: s
	};
}
var Yh = [
	"top",
	"right",
	"bottom",
	"left"
], Xh = [
	"regular",
	"flat",
	"outline",
	"push",
	"unelevated"
];
Q({
	name: "QCarousel",
	props: {
		...qf,
		...Vh,
		...Kh,
		transitionPrev: {
			type: String,
			default: "fade"
		},
		transitionNext: {
			type: String,
			default: "fade"
		},
		height: String,
		padding: Boolean,
		controlColor: String,
		controlTextColor: String,
		controlType: {
			type: String,
			validator: (e) => Xh.includes(e),
			default: "flat"
		},
		autoplay: [Number, Boolean],
		arrows: Boolean,
		prevIcon: String,
		nextIcon: String,
		navigation: Boolean,
		navigationPosition: {
			type: String,
			validator: (e) => Yh.includes(e)
		},
		navigationIcon: String,
		navigationActiveIcon: String,
		thumbnails: Boolean
	},
	emits: [...qh, ...Hh],
	setup(e, { slots: t }) {
		let { proxy: { $q: n } } = h(), r = Jf(e, n), i = null, a, { updatePanelsList: s, getPanelContent: c, panelDirectives: l, goToPanel: u, previousPanel: d, nextPanel: f, getEnabledPanels: p, panelIndex: m } = Wh(), { inFullscreen: g } = Jh(), v = o(() => !g.value && e.height !== void 0 ? { height: e.height } : {}), y = o(() => e.vertical ? "vertical" : "horizontal"), b = o(() => e.navigationPosition || (e.vertical ? "right" : "bottom")), x = o(() => `q-carousel q-panel-parent q-carousel--with${e.padding ? "" : "out"}-padding` + (g.value ? " fullscreen" : "") + (r.value ? " q-carousel--dark q-dark" : "") + (e.arrows ? ` q-carousel--arrows-${y.value}` : "") + (e.navigation ? ` q-carousel--navigation-${b.value}` : "")), S = o(() => {
			let t = [e.prevIcon || n.iconSet.carousel[e.vertical ? "up" : "left"], e.nextIcon || n.iconSet.carousel[e.vertical ? "down" : "right"]];
			return !e.vertical && n.lang.rtl ? t.reverse() : t;
		}), C = o(() => e.navigationIcon || n.iconSet.carousel.navigationIcon), w = o(() => e.navigationActiveIcon || C.value), T = o(() => ({
			color: e.controlColor,
			textColor: e.controlTextColor,
			round: !0,
			[e.controlType]: !0,
			dense: !0
		}));
		G(() => e.modelValue, () => {
			e.autoplay && E();
		}), G(() => e.autoplay, (e) => {
			e ? E() : i !== null && (clearTimeout(i), i = null);
		});
		function E() {
			let t = af(e.autoplay) ? Math.abs(e.autoplay) : 5e3;
			i !== null && clearTimeout(i), i = setTimeout(() => {
				i = null, t >= 0 ? f() : d();
			}, t);
		}
		A(() => {
			e.autoplay && E();
		}), D(() => {
			i !== null && clearTimeout(i);
		});
		function O(t, n) {
			return _("div", { class: `q-carousel__control q-carousel__navigation no-wrap absolute flex q-carousel__navigation--${t} q-carousel__navigation--${b.value}` + (e.controlColor === void 0 ? "" : ` text-${e.controlColor}`) }, [_("div", { class: "q-carousel__navigation-inner flex flex-center no-wrap" }, p().map(n))]);
		}
		function k() {
			let n = [];
			if (e.navigation) {
				let e = t["navigation-icon"] === void 0 ? (e) => _(Vp, {
					key: "nav" + e.name,
					class: `q-carousel__navigation-icon q-carousel__navigation-icon--${e.active === !0 ? "" : "in"}active`,
					...e.btnProps,
					onClick: e.onClick
				}) : t["navigation-icon"], r = a - 1;
				n.push(O("buttons", (t, n) => {
					let i = t.props.name, a = m.value === n;
					return e({
						index: n,
						maxIndex: r,
						name: i,
						active: a,
						btnProps: {
							icon: a ? w.value : C.value,
							size: "sm",
							...T.value
						},
						onClick: () => {
							u(i);
						}
					});
				}));
			} else if (e.thumbnails) {
				let t = e.controlColor === void 0 ? "" : ` text-${e.controlColor}`;
				n.push(O("thumbnails", (n) => {
					let r = n.props;
					return _("img", {
						key: "tmb#" + r.name,
						class: `q-carousel__thumbnail q-carousel__thumbnail--${r.name === e.modelValue ? "" : "in"}active` + t,
						src: r.imgSrc || r["img-src"],
						onClick: () => {
							u(r.name);
						}
					});
				}));
			}
			return e.arrows && m.value >= 0 && ((e.infinite || m.value > 0) && n.push(_("div", {
				key: "prev",
				class: `q-carousel__control q-carousel__arrow q-carousel__prev-arrow q-carousel__prev-arrow--${y.value} absolute flex flex-center`
			}, [_(Vp, {
				icon: S.value[0],
				...T.value,
				onClick: d
			})])), (e.infinite || m.value < a - 1) && n.push(_("div", {
				key: "next",
				class: `q-carousel__control q-carousel__arrow q-carousel__next-arrow q-carousel__next-arrow--${y.value} absolute flex flex-center`
			}, [_(Vp, {
				icon: S.value[1],
				...T.value,
				onClick: f
			})]))), Of(t.control, n);
		}
		return () => (a = s(t), _("div", {
			class: x.value,
			style: v.value
		}, [Af("div", { class: "q-carousel__slides-container" }, c(), "sl-cont", e.swipeable, () => l.value), ...k()]));
	}
}), Q({
	name: "QCarouselSlide",
	props: {
		...zh,
		imgSrc: String
	},
	setup(e, { slots: t }) {
		let n = o(() => e.imgSrc ? { backgroundImage: `url("${e.imgSrc}")` } : {});
		return () => _("div", {
			class: "q-carousel__slide",
			style: n.value
		}, $(t.default));
	}
}), Q({
	name: "QCarouselControl",
	props: {
		position: {
			type: String,
			default: "bottom-right",
			validator: (e) => [
				"top-right",
				"top-left",
				"bottom-right",
				"bottom-left",
				"top",
				"right",
				"bottom",
				"left"
			].includes(e)
		},
		offset: {
			type: Array,
			default: () => [18, 18],
			validator: (e) => e.length === 2
		}
	},
	setup(e, { slots: t }) {
		let n = o(() => `q-carousel__control absolute absolute-${e.position}`), r = o(() => ({ margin: `${e.offset[1]}px ${e.offset[0]}px` }));
		return () => _("div", {
			class: n.value,
			style: r.value
		}, $(t.default));
	}
}), Q({
	name: "QChatMessage",
	props: {
		sent: Boolean,
		label: String,
		bgColor: String,
		textColor: String,
		name: String,
		avatar: String,
		text: Array,
		stamp: String,
		size: String,
		labelHtml: Boolean,
		nameHtml: Boolean,
		textHtml: Boolean,
		stampHtml: Boolean
	},
	setup(e, { slots: t }) {
		let n = o(() => e.sent ? "sent" : "received"), r = o(() => `q-message-text-content q-message-text-content--${n.value}` + (e.textColor === void 0 ? "" : ` text-${e.textColor}`)), i = o(() => `q-message-text q-message-text--${n.value}` + (e.bgColor === void 0 ? "" : ` text-${e.bgColor}`)), a = o(() => "q-message-container row items-end no-wrap" + (e.sent ? " reverse" : "")), s = o(() => e.size === void 0 ? "" : `col-${e.size}`), c = o(() => ({
			msg: e.textHtml ? "innerHTML" : "textContent",
			stamp: e.stampHtml ? "innerHTML" : "textContent",
			name: e.nameHtml ? "innerHTML" : "textContent",
			label: e.labelHtml ? "innerHTML" : "textContent"
		}));
		function l(n) {
			return t.stamp === void 0 ? e.stamp ? [n, _("div", {
				class: "q-message-stamp",
				[c.value.stamp]: e.stamp
			})] : [n] : [n, _("div", { class: "q-message-stamp" }, t.stamp())];
		}
		function u(e, t) {
			let n = t ? e.length > 1 ? (e) => e : (e) => _("div", [e]) : (e) => _("div", { [c.value.msg]: e });
			return e.map((e, t) => _("div", {
				key: t,
				class: i.value
			}, [_("div", { class: r.value }, l(n(e)))]));
		}
		return () => {
			let r = [];
			t.avatar === void 0 ? e.avatar !== void 0 && r.push(_("img", {
				class: `q-message-avatar q-message-avatar--${n.value}`,
				src: e.avatar,
				"aria-hidden": "true"
			})) : r.push(t.avatar());
			let i = [];
			t.name === void 0 ? e.name !== void 0 && i.push(_("div", {
				class: `q-message-name q-message-name--${n.value}`,
				[c.value.name]: e.name
			})) : i.push(_("div", { class: `q-message-name q-message-name--${n.value}` }, t.name())), t.default === void 0 ? e.text !== void 0 && i.push(u(e.text, !1)) : i.push(u(tp(t.default()), !0)), r.push(_("div", { class: s.value }, i));
			let o = [];
			return t.label === void 0 ? e.label !== void 0 && o.push(_("div", {
				class: "q-message-label",
				[c.value.label]: e.label
			})) : o.push(_("div", { class: "q-message-label" }, t.label())), o.push(_("div", { class: a.value }, r)), _("div", { class: `q-message q-message-${n.value}` }, o);
		};
	}
});
function Zh(e, t) {
	let n = L(null), r = o(() => e.disable ? null : _("span", {
		ref: n,
		class: "no-outline",
		tabindex: -1
	}));
	function i(e) {
		let r = t.value;
		e?.qAvoidFocus !== !0 && (e?.type.indexOf("key") === 0 ? document.activeElement !== r && r?.contains(document.activeElement) === !0 && r.focus() : n.value !== null && (e === void 0 || r?.contains(e.target) === !0) && n.value.focus());
	}
	return {
		refocusTargetEl: r,
		refocusTarget: i
	};
}
var Qh = {
	xs: 30,
	sm: 35,
	md: 40,
	lg: 50,
	xl: 60
}, $h = {
	...qf,
	...Tf,
	...Ch,
	modelValue: {
		required: !0,
		default: null
	},
	val: {},
	trueValue: { default: !0 },
	falseValue: { default: !1 },
	indeterminateValue: { default: null },
	checkedIcon: String,
	uncheckedIcon: String,
	indeterminateIcon: String,
	toggleOrder: {
		type: String,
		validator: (e) => e === "tf" || e === "ft"
	},
	toggleIndeterminate: Boolean,
	label: String,
	leftLabel: Boolean,
	color: String,
	keepColor: Boolean,
	dense: Boolean,
	disable: Boolean,
	tabindex: [String, Number]
}, eg = ["update:modelValue"];
function tg(e) {
	(e.keyCode === 13 || e.keyCode === 32) && wd(e);
}
function ng(e, t) {
	let { props: n, slots: r, emit: i, proxy: a } = h(), { $q: s } = a, c = Jf(n, s), l = L(null), { refocusTargetEl: u, refocusTarget: d } = Zh(n, l), f = Ef(n, Qh), p = o(() => n.val !== void 0 && Array.isArray(n.modelValue)), m = o(() => {
		let e = te(n.val);
		return p.value ? n.modelValue.findIndex((t) => te(t) === e) : -1;
	}), g = o(() => p.value ? m.value !== -1 : te(n.modelValue) === te(n.trueValue)), v = o(() => p.value ? m.value === -1 : te(n.modelValue) === te(n.falseValue)), y = o(() => !g.value && !v.value), b = o(() => n.disable ? -1 : n.tabindex || 0), x = o(() => `q-${e} cursor-pointer no-outline row inline no-wrap items-center` + (n.disable ? " disabled" : "") + (c.value ? ` q-${e}--dark` : "") + (n.dense ? ` q-${e}--dense` : "") + (n.leftLabel ? " reverse" : "")), S = o(() => `q-${e}__inner relative-position non-selectable q-${e}__inner--${g.value ? "truthy" : v.value ? "falsy" : "indet"}${n.color !== void 0 && (n.keepColor || (e === "toggle" ? g.value : !v.value)) ? ` text-${n.color}` : ""}`), C = Th(o(() => {
		let e = { type: "checkbox" };
		return n.name !== void 0 && Object.assign(e, {
			".checked": g.value,
			"^checked": g.value ? "checked" : void 0,
			name: n.name,
			value: p.value ? n.val : n.trueValue
		}), e;
	})), w = o(() => {
		let t = {
			tabindex: b.value,
			role: e === "toggle" ? "switch" : "checkbox",
			"aria-label": n.label,
			"aria-checked": y.value ? "mixed" : g.value ? "true" : "false"
		};
		return n.disable && (t["aria-disabled"] = "true"), t;
	});
	function T(e) {
		e !== void 0 && (wd(e), d(e)), n.disable || i("update:modelValue", E(), e);
	}
	function E() {
		if (p.value) {
			if (g.value) {
				let e = [...n.modelValue];
				return e.splice(m.value, 1), e;
			}
			return [...n.modelValue, n.val];
		}
		if (g.value) {
			if (n.toggleOrder !== "ft" || !n.toggleIndeterminate) return n.falseValue;
		} else if (v.value) {
			if (n.toggleOrder === "ft" || !n.toggleIndeterminate) return n.trueValue;
		} else return n.toggleOrder === "ft" ? n.falseValue : n.trueValue;
		return n.indeterminateValue;
	}
	function D(e) {
		(e.keyCode === 13 || e.keyCode === 32) && T(e);
	}
	let O = t(g, y);
	return Object.assign(a, { toggle: T }), () => {
		let t = O();
		n.disable || C(t, "unshift", ` q-${e}__native absolute q-ma-none q-pa-none`);
		let i = [_("div", {
			class: S.value,
			style: f.value,
			"aria-hidden": "true"
		}, t)];
		u.value !== null && i.push(u.value);
		let a = n.label === void 0 ? $(r.default) : Of(r.default, [n.label]);
		return a !== void 0 && i.push(_("div", { class: `q-${e}__label q-anchor--skip` }, a)), _("div", {
			ref: l,
			class: x.value,
			...w.value,
			onClick: T,
			onKeydown: tg,
			onKeyup: D
		}, i);
	};
}
var rg = () => _("div", {
	key: "svg",
	class: "q-checkbox__bg absolute"
}, [_("svg", {
	class: "q-checkbox__svg fit absolute-full",
	viewBox: "0 0 24 24"
}, [_("path", {
	class: "q-checkbox__truthy",
	fill: "none",
	d: "M1.73,12.91 8.1,19.28 22.79,4.59"
}), _("path", {
	class: "q-checkbox__indet",
	d: "M4,14H20V10H4"
})])]), ig = Q({
	name: "QCheckbox",
	props: $h,
	emits: eg,
	setup(e) {
		let t = rg();
		function n(n, r) {
			let i = o(() => (n.value ? e.checkedIcon : r.value ? e.indeterminateIcon : e.uncheckedIcon) || null);
			return () => i.value === null ? [t] : [_("div", {
				key: "icon",
				class: "q-checkbox__icon-container absolute-full flex flex-center no-wrap"
			}, [_(Gf, {
				class: "q-checkbox__icon",
				name: i.value
			})])];
		}
		return ng("checkbox", n);
	}
}), ag = {
	xs: 8,
	sm: 10,
	md: 14,
	lg: 20,
	xl: 24
}, og = Q({
	name: "QChip",
	props: {
		...qf,
		...Tf,
		dense: Boolean,
		icon: String,
		iconRight: String,
		iconRemove: String,
		iconSelected: String,
		label: [String, Number],
		color: String,
		textColor: String,
		modelValue: {
			type: Boolean,
			default: !0
		},
		selected: {
			type: Boolean,
			default: null
		},
		square: Boolean,
		outline: Boolean,
		clickable: Boolean,
		removable: Boolean,
		removeAriaLabel: String,
		tabindex: [String, Number],
		disable: Boolean,
		ripple: {
			type: [Boolean, Object],
			default: !0
		}
	},
	emits: [
		"update:modelValue",
		"update:selected",
		"remove",
		"click"
	],
	setup(e, { slots: t, emit: n }) {
		let { proxy: { $q: r } } = h(), i = Jf(e, r), a = Ef(e, ag), s = o(() => e.selected || e.icon !== void 0), c = o(() => e.selected ? e.iconSelected || r.iconSet.chip.selected : e.icon), l = o(() => e.iconRemove || r.iconSet.chip.remove), u = o(() => !e.disable && (e.clickable || e.selected !== null)), d = o(() => {
			let t = e.outline && e.color || e.textColor;
			return "q-chip row inline no-wrap items-center" + (!e.outline && e.color !== void 0 ? ` bg-${e.color}` : "") + (t ? ` text-${t} q-chip--colored` : "") + (e.disable ? " disabled" : "") + (e.dense ? " q-chip--dense" : "") + (e.outline ? " q-chip--outline" : "") + (e.selected ? " q-chip--selected" : "") + (u.value ? " q-chip--clickable cursor-pointer non-selectable q-hoverable" : "") + (e.square ? " q-chip--square" : "") + (i.value ? " q-chip--dark q-dark" : "");
		}), f = o(() => {
			let t = e.disable ? {
				tabindex: -1,
				"aria-disabled": "true"
			} : { tabindex: e.tabindex || 0 };
			return {
				chip: t,
				remove: {
					...t,
					role: "button",
					"aria-hidden": "false",
					"aria-label": e.removeAriaLabel || r.lang.label.remove
				}
			};
		});
		function p(e) {
			e.keyCode === 13 && m(e);
		}
		function m(t) {
			e.disable || (n("update:selected", !e.selected), n("click", t));
		}
		function g(t) {
			(t.keyCode === void 0 || t.keyCode === 13) && (wd(t), e.disable || (n("update:modelValue", !1), n("remove")));
		}
		function v() {
			let n = [];
			u.value && n.push(_("div", { class: "q-focus-helper" })), s.value && n.push(_(Gf, {
				class: "q-chip__icon q-chip__icon--left",
				name: c.value
			}));
			let r = e.label === void 0 ? void 0 : [_("div", { class: "ellipsis" }, [e.label])];
			return n.push(_("div", { class: "q-chip__content col row no-wrap items-center q-anchor--skip" }, kf(t.default, r))), e.iconRight && n.push(_(Gf, {
				class: "q-chip__icon q-chip__icon--right",
				name: e.iconRight
			})), e.removable && n.push(_(Gf, {
				class: "q-chip__icon q-chip__icon--remove cursor-pointer",
				name: l.value,
				...f.value.remove,
				onClick: g,
				onKeyup: g
			})), n;
		}
		return () => {
			if (!e.modelValue) return;
			let t = {
				class: d.value,
				style: a.value
			};
			return u.value && Object.assign(t, f.value.chip, {
				onClick: m,
				onKeyup: p
			}), Af("div", t, v(), "ripple", e.ripple !== !1 && !e.disable, () => [[Tp, e.ripple]]);
		};
	}
}), sg = {
	...Tf,
	min: {
		type: Number,
		default: 0
	},
	max: {
		type: Number,
		default: 100
	},
	color: String,
	centerColor: String,
	trackColor: String,
	fontSize: String,
	rounded: Boolean,
	thickness: {
		type: Number,
		default: .2,
		validator: (e) => e >= 0 && e <= 1
	},
	angle: {
		type: Number,
		default: 0
	},
	showValue: Boolean,
	reverse: Boolean,
	instantFeedback: Boolean
}, cg = 50, lg = 2 * cg, ug = lg * Math.PI, dg = Math.round(ug * 1e3) / 1e3, fg = Q({
	name: "QCircularProgress",
	props: {
		...sg,
		value: {
			type: Number,
			default: 0
		},
		animationSpeed: {
			type: [String, Number],
			default: 600
		},
		indeterminate: Boolean
	},
	setup(e, { slots: t }) {
		let { proxy: { $q: n } } = h(), r = Ef(e), i = o(() => {
			let t = (n.lang.rtl ? -1 : 1) * e.angle;
			return { transform: e.reverse === (n.lang.rtl === !0) ? `rotate3d(0, 0, 1, ${t - 90}deg)` : `scale3d(-1, 1, 1) rotate3d(0, 0, 1, ${-90 - t}deg)` };
		}), a = o(() => !e.instantFeedback && !e.indeterminate ? { transition: `stroke-dashoffset ${e.animationSpeed}ms ease 0s, stroke ${e.animationSpeed}ms ease` } : ""), s = o(() => lg / (1 - e.thickness / 2)), c = o(() => `${s.value / 2} ${s.value / 2} ${s.value} ${s.value}`), l = o(() => df(e.value, e.min, e.max)), u = o(() => e.max - e.min), d = o(() => e.thickness / 2 * s.value), f = o(() => {
			let t = (e.max - l.value) / u.value, n = e.rounded && l.value < e.max && t < .25 ? d.value / 2 * (1 - t / .25) : 0;
			return ug * t + n;
		});
		function p({ thickness: e, offset: t, color: n, cls: r, rounded: i }) {
			return _("circle", {
				class: "q-circular-progress__" + r + (n === void 0 ? "" : ` text-${n}`),
				style: a.value,
				fill: "transparent",
				stroke: "currentColor",
				"stroke-width": e,
				"stroke-dasharray": dg,
				"stroke-dashoffset": t,
				"stroke-linecap": i,
				cx: s.value,
				cy: s.value,
				r: cg
			});
		}
		return () => {
			let n = [];
			e.centerColor !== void 0 && e.centerColor !== "transparent" && n.push(_("circle", {
				class: `q-circular-progress__center text-${e.centerColor}`,
				fill: "currentColor",
				r: cg - d.value / 2,
				cx: s.value,
				cy: s.value
			})), e.trackColor !== void 0 && e.trackColor !== "transparent" && n.push(p({
				cls: "track",
				thickness: d.value,
				offset: 0,
				color: e.trackColor
			})), n.push(p({
				cls: "circle",
				thickness: d.value,
				offset: f.value,
				color: e.color,
				rounded: e.rounded ? "round" : void 0
			}));
			let a = [_("svg", {
				class: "q-circular-progress__svg",
				style: i.value,
				viewBox: c.value,
				"aria-hidden": "true"
			}, n)];
			return e.showValue && a.push(_("div", {
				class: "q-circular-progress__text absolute-full row flex-center content-center",
				style: { fontSize: e.fontSize }
			}, t.default === void 0 ? [_("div", l.value)] : t.default())), _("div", {
				class: `q-circular-progress q-circular-progress--${e.indeterminate ? "in" : ""}determinate`,
				style: r.value,
				role: "progressbar",
				"aria-valuemin": e.min,
				"aria-valuemax": e.max,
				"aria-valuenow": e.indeterminate ? void 0 : l.value
			}, kf(t.internal, a));
		};
	}
});
function pg(e, t, n) {
	let r = xd(e), i, a = r.left - t.event.x, o = r.top - t.event.y, s = Math.abs(a), c = Math.abs(o), l = t.direction;
	l.horizontal && !l.vertical ? i = a < 0 ? "left" : "right" : !l.horizontal && l.vertical ? i = o < 0 ? "up" : "down" : l.up && o < 0 ? (i = "up", s > c && (l.left && a < 0 ? i = "left" : l.right && a > 0 && (i = "right"))) : l.down && o > 0 ? (i = "down", s > c && (l.left && a < 0 ? i = "left" : l.right && a > 0 && (i = "right"))) : l.left && a < 0 ? (i = "left", s < c && (l.up && o < 0 ? i = "up" : l.down && o > 0 && (i = "down"))) : l.right && a > 0 && (i = "right", s < c && (l.up && o < 0 ? i = "up" : l.down && o > 0 && (i = "down")));
	let u = !1;
	if (i === void 0 && n === !1) {
		if (t.event.isFirst || t.event.lastDir === void 0) return {};
		i = t.event.lastDir, u = !0, i === "left" || i === "right" ? (r.left -= a, s = 0, a = 0) : (r.top -= o, c = 0, o = 0);
	}
	return {
		synthetic: u,
		payload: {
			evt: e,
			touch: t.event.mouse !== !0,
			mouse: t.event.mouse === !0,
			position: r,
			direction: i,
			isFirst: t.event.isFirst,
			isFinal: n === !0,
			duration: Date.now() - t.event.time,
			distance: {
				x: s,
				y: c
			},
			offset: {
				x: a,
				y: o
			},
			delta: {
				x: r.left - t.event.lastX,
				y: r.top - t.event.lastY
			}
		}
	};
}
function mg() {
	document.body.classList.remove("no-pointer-events--children");
}
var hg = 0, gg = gd({
	name: "touch-pan",
	beforeMount(e, { value: t, modifiers: n }) {
		if (!n.mouse && !md.has.touch) return;
		function r(e, t) {
			n.mouse && t ? wd(e) : (n.stop && Sd(e), n.prevent && Cd(e));
		}
		let i = {
			uid: "qvtp_" + hg++,
			handler: t,
			modifiers: n,
			direction: Mh(n),
			noop: yd,
			mouseStart(e) {
				Ph(e, i) && bd(e) && (Ed(i, "temp", [[
					document,
					"mousemove",
					"move",
					"notPassiveCapture"
				], [
					document,
					"mouseup",
					"end",
					"passiveCapture"
				]]), i.start(e, !0));
			},
			touchStart(e) {
				if (Ph(e, i)) {
					let t = e.target;
					Ed(i, "temp", [
						[
							t,
							"touchmove",
							"move",
							"notPassiveCapture"
						],
						[
							t,
							"touchcancel",
							"end",
							"passiveCapture"
						],
						[
							t,
							"touchend",
							"end",
							"passiveCapture"
						]
					]), i.start(e);
				}
			},
			start(t, r) {
				if (md.is.firefox && Td(e, !0), i.lastEvt = t, r || n.stop) {
					if (!i.direction.all && (!r || !i.modifiers.mouseAllDir && !i.modifiers.mousealldir)) {
						let e = t.type.includes("mouse") ? new MouseEvent(t.type, t) : new TouchEvent(t.type, t);
						t.defaultPrevented && Cd(e), t.cancelBubble && Sd(e), Object.assign(e, {
							qKeyEvent: t.qKeyEvent,
							qClickOutside: t.qClickOutside,
							qAnchorHandled: t.qAnchorHandled,
							qClonedBy: t.qClonedBy === void 0 ? [i.uid] : t.qClonedBy.concat(i.uid)
						}), i.initialEvent = {
							target: t.target,
							event: e
						};
					}
					Sd(t);
				}
				let { left: a, top: o } = xd(t);
				i.event = {
					x: a,
					y: o,
					time: Date.now(),
					mouse: r === !0,
					detected: !1,
					isFirst: !0,
					isFinal: !1,
					lastX: a,
					lastY: o
				};
			},
			move(e) {
				if (i.event === void 0) return;
				let t = xd(e), a = t.left - i.event.x, o = t.top - i.event.y;
				if (a === 0 && o === 0) return;
				i.lastEvt = e;
				let s = i.event.mouse === !0, c = () => {
					r(e, s);
					let t;
					!n.preserveCursor && !n.preservecursor && (t = document.documentElement.style.cursor || "", document.documentElement.style.cursor = "grabbing"), s && document.body.classList.add("no-pointer-events--children"), document.body.classList.add("non-selectable"), Up(), i.styleCleanup = (e) => {
						i.styleCleanup = void 0, t !== void 0 && (document.documentElement.style.cursor = t), document.body.classList.remove("non-selectable"), s ? e === void 0 ? mg() : setTimeout(() => {
							mg(), e();
						}, 50) : e !== void 0 && e();
					};
				};
				if (i.event.detected) {
					i.event.isFirst || r(e, i.event.mouse);
					let { payload: t, synthetic: n } = pg(e, i, !1);
					t !== void 0 && (i.handler(t) === !1 ? i.end(e) : (i.styleCleanup === void 0 && i.event.isFirst && c(), i.event.lastX = t.position.left, i.event.lastY = t.position.top, i.event.lastDir = n ? void 0 : t.direction, i.event.isFirst = !1));
					return;
				}
				if (i.direction.all || s && (i.modifiers.mouseAllDir || i.modifiers.mousealldir)) {
					c(), i.event.detected = !0, i.move(e);
					return;
				}
				let l = Math.abs(a), u = Math.abs(o);
				l !== u && (i.direction.horizontal && l > u || i.direction.vertical && l < u || i.direction.up && l < u && o < 0 || i.direction.down && l < u && o > 0 || i.direction.left && l > u && a < 0 || i.direction.right && l > u && a > 0 ? (i.event.detected = !0, i.move(e)) : i.end(e, !0));
			},
			end(t, n) {
				if (i.event !== void 0) {
					if (Dd(i, "temp"), md.is.firefox && Td(e, !1), n) i.styleCleanup?.(), !i.event.detected && i.initialEvent !== void 0 && i.initialEvent.target.dispatchEvent(i.initialEvent.event);
					else if (i.event.detected) {
						i.event.isFirst && i.handler(pg(t === void 0 ? i.lastEvt : t, i).payload);
						let { payload: e } = pg(t === void 0 ? i.lastEvt : t, i, !0), n = () => {
							i.handler(e);
						};
						i.styleCleanup === void 0 ? n() : i.styleCleanup(n);
					}
					i.event = void 0, i.initialEvent = void 0, i.lastEvt = void 0;
				}
			}
		};
		e.__qtouchpan = i, n.mouse && Ed(i, "main", [[
			e,
			"mousedown",
			"mouseStart",
			`passive${n.mouseCapture || n.mousecapture ? "Capture" : ""}`
		]]), md.has.touch && Ed(i, "main", [[
			e,
			"touchstart",
			"touchStart",
			`passive${n.capture ? "Capture" : ""}`
		], [
			e,
			"touchmove",
			"noop",
			"notPassiveCapture"
		]]);
	},
	updated(e, t) {
		let n = e.__qtouchpan;
		n !== void 0 && (t.oldValue !== t.value && (typeof value != "function" && n.end(), n.handler = t.value), n.direction = Mh(t.modifiers));
	},
	beforeUnmount(e) {
		let t = e.__qtouchpan;
		t !== void 0 && (t.event !== void 0 && t.end(), Dd(t, "main"), Dd(t, "temp"), md.is.firefox && Td(e, !1), t.styleCleanup?.(), delete e.__qtouchpan);
	}
}), _g = "q-slider__marker-labels", vg = (e) => ({ value: e }), yg = ({ marker: e }) => _("div", {
	key: e.value,
	style: e.style,
	class: e.classes
}, e.label), bg = [
	34,
	37,
	40,
	33,
	39,
	38
], xg = {
	...qf,
	...Ch,
	min: {
		type: Number,
		default: 0
	},
	max: {
		type: Number,
		default: 100
	},
	innerMin: Number,
	innerMax: Number,
	step: {
		type: Number,
		default: 1,
		validator: (e) => e >= 0
	},
	snap: Boolean,
	vertical: Boolean,
	reverse: Boolean,
	color: String,
	markerLabelsClass: String,
	label: Boolean,
	labelColor: String,
	labelTextColor: String,
	labelAlways: Boolean,
	switchLabelSide: Boolean,
	markers: [Boolean, Number],
	markerLabels: [
		Boolean,
		Array,
		Object,
		Function
	],
	switchMarkerLabelsSide: Boolean,
	trackImg: String,
	trackColor: String,
	innerTrackImg: String,
	innerTrackColor: String,
	selectionColor: String,
	selectionImg: String,
	thumbSize: {
		type: String,
		default: "20px"
	},
	trackSize: {
		type: String,
		default: "4px"
	},
	disable: Boolean,
	readonly: Boolean,
	dense: Boolean,
	tabindex: [String, Number],
	thumbColor: String,
	thumbPath: {
		type: String,
		default: "M 4, 10 a 6,6 0 1,0 12,0 a 6,6 0 1,0 -12,0"
	}
}, Sg = [
	"pan",
	"update:modelValue",
	"change"
];
function Cg({ updateValue: e, updatePosition: t, getDragging: n, formAttrs: r }) {
	let { props: i, emit: a, slots: s, proxy: { $q: c } } = h(), l = Jf(i, c), u = Th(r), d = L(!1), f = L(!1), p = L(!1), m = L(!1), g = o(() => i.vertical ? "--v" : "--h"), v = o(() => "-" + (i.switchLabelSide ? "switched" : "standard")), y = o(() => i.vertical ? i.reverse : i.reverse !== (c.lang.rtl === !0)), b = o(() => !Number.isFinite(i.innerMin) || i.innerMin < i.min ? i.min : i.innerMin), x = o(() => !Number.isFinite(i.innerMax) || i.innerMax > i.max ? i.max : i.innerMax), S = o(() => !i.disable && !i.readonly && b.value < x.value), C = o(() => {
		if (i.step === 0) return (e) => e;
		let e = (String(i.step).trim().split(".")[1] || "").length;
		return (t) => Number.parseFloat(t.toFixed(e));
	}), w = o(() => i.step === 0 ? 1 : i.step), T = o(() => S.value ? i.tabindex || 0 : -1), E = o(() => i.max - i.min), O = o(() => x.value - b.value), k = o(() => ae(b.value)), A = o(() => ae(x.value)), j = o(() => i.vertical ? y.value ? "bottom" : "top" : y.value ? "right" : "left"), M = o(() => i.vertical ? "height" : "width"), N = o(() => i.vertical ? "width" : "height"), P = o(() => i.vertical ? "vertical" : "horizontal"), F = o(() => {
		let e = {
			role: "slider",
			"aria-valuemin": b.value,
			"aria-valuemax": x.value,
			"aria-orientation": P.value,
			"data-step": i.step
		};
		return i.disable ? e["aria-disabled"] = "true" : i.readonly && (e["aria-readonly"] = "true"), e;
	}), I = o(() => `q-slider q-slider${g.value} q-slider--${d.value ? "" : "in"}active inline no-wrap ` + (i.vertical ? "row" : "column") + (i.disable ? " disabled" : " q-slider--enabled" + (S.value ? " q-slider--editable" : "")) + (p.value === "both" ? " q-slider--focus" : "") + (i.label || i.labelAlways ? " q-slider--label" : "") + (i.labelAlways ? " q-slider--label-always" : "") + (l.value ? " q-slider--dark" : "") + (i.dense ? " q-slider--dense q-slider--dense" + g.value : ""));
	function R(e) {
		let t = "q-slider__" + e;
		return `${t} ${t}${g.value} ${t}${g.value}${v.value}`;
	}
	function z(e) {
		let t = "q-slider__" + e;
		return `${t} ${t}${g.value}`;
	}
	let B = o(() => {
		let e = i.selectionColor || i.color;
		return "q-slider__selection absolute" + (e === void 0 ? "" : ` text-${e}`);
	}), V = o(() => z("markers") + " absolute overflow-hidden"), ee = o(() => z("track-container")), te = o(() => R("pin")), H = o(() => R("label")), U = o(() => R("text-container")), W = o(() => R("marker-labels-container") + (i.markerLabelsClass === void 0 ? "" : ` ${i.markerLabelsClass}`)), ne = o(() => "q-slider__track relative-position no-outline" + (i.trackColor === void 0 ? "" : ` bg-${i.trackColor}`)), G = o(() => {
		let e = { [N.value]: i.trackSize };
		return i.trackImg !== void 0 && (e.backgroundImage = `url(${i.trackImg}) !important`), e;
	}), re = o(() => "q-slider__inner absolute" + (i.innerTrackColor === void 0 ? "" : ` bg-${i.innerTrackColor}`)), ie = o(() => {
		let e = A.value - k.value, t = {
			[j.value]: `${100 * k.value}%`,
			[M.value]: e === 0 ? "2px" : `${100 * e}%`
		};
		return i.innerTrackImg !== void 0 && (t.backgroundImage = `url(${i.innerTrackImg}) !important`), t;
	});
	function K(e) {
		let { min: t, max: n, step: r } = i, a = t + e * (n - t);
		if (r > 0) {
			let e = (a - b.value) % r;
			a += (Math.abs(e) >= r / 2 ? (e < 0 ? -1 : 1) * r : 0) - e;
		}
		return a = C.value(a), df(a, b.value, x.value);
	}
	function ae(e) {
		return E.value === 0 ? 0 : (e - i.min) / E.value;
	}
	function oe(e, t) {
		let n = xd(e), r = i.vertical ? df((n.top - t.top) / t.height, 0, 1) : df((n.left - t.left) / t.width, 0, 1);
		return df(y.value ? 1 - r : r, k.value, A.value);
	}
	let se = o(() => af(i.markers) ? i.markers : w.value), ce = o(() => {
		let e = [], t = se.value, n = i.max, r = i.min;
		do
			e.push(r), r += t;
		while (r < n);
		return e.push(n), e;
	}), le = o(() => {
		let e = ` ${_g}${g.value}-`;
		return `q-slider__marker-labels${e}${i.switchMarkerLabelsSide ? "switched" : "standard"}${e}${y.value ? "rtl" : "ltr"}`;
	}), ue = o(() => i.markerLabels === !1 ? null : pe(i.markerLabels).map((e, t) => ({
		index: t,
		value: e.value,
		label: e.label || e.value,
		classes: le.value + (e.classes === void 0 ? "" : " " + e.classes),
		style: {
			...me(e.value),
			...e.style
		}
	}))), de = o(() => ({
		markerList: ue.value,
		markerMap: he.value,
		classes: le.value,
		getStyle: me
	})), fe = o(() => {
		let e = O.value === 0 ? "2px" : 100 * se.value / O.value;
		return {
			...ie.value,
			backgroundSize: i.vertical ? `2px ${e}%` : `${e}% 2px`
		};
	});
	function pe(e) {
		if (e === !1) return null;
		if (e === !0) return ce.value.map(vg);
		if (typeof e == "function") return ce.value.map((t) => {
			let n = e(t);
			return tf(n) ? {
				...n,
				value: t
			} : {
				value: t,
				label: n
			};
		});
		let t = ({ value: e }) => e >= i.min && e <= i.max;
		return Array.isArray(e) ? e.map((e) => tf(e) ? e : { value: e }).filter(t) : Object.keys(e).map((t) => {
			let n = e[t], r = Number(t);
			return tf(n) ? {
				...n,
				value: r
			} : {
				value: r,
				label: n
			};
		}).filter(t);
	}
	function me(e) {
		return { [j.value]: `${100 * (e - i.min) / E.value}%` };
	}
	let he = o(() => {
		if (i.markerLabels === !1) return null;
		let e = {};
		return ue.value.forEach((t) => {
			e[t.value] = t;
		}), e;
	});
	function ge() {
		if (s["marker-label-group"] !== void 0) return s["marker-label-group"](de.value);
		let e = s["marker-label"] || yg;
		return ue.value.map((t) => e({
			marker: t,
			...de.value
		}));
	}
	let _e = o(() => [[
		gg,
		ve,
		void 0,
		{
			[P.value]: !0,
			prevent: !0,
			stop: !0,
			mouse: !0,
			mouseAllDir: !0
		}
	]]);
	function ve(r) {
		r.isFinal ? (m.value !== void 0 && (t(r.evt), r.touch && e(!0), m.value = void 0, a("pan", "end")), d.value = !1, p.value = !1) : r.isFirst ? (m.value = n(r.evt), t(r.evt), e(), d.value = !0, a("pan", "start")) : (t(r.evt), e());
	}
	function ye() {
		p.value = !1;
	}
	function be(r) {
		t(r, n(r)), e(), f.value = !0, d.value = !0, document.addEventListener("mouseup", xe, !0);
	}
	function xe() {
		f.value = !1, d.value = !1, e(!0), ye(), document.removeEventListener("mouseup", xe, !0);
	}
	function Se(r) {
		t(r, n(r)), e(!0);
	}
	function Ce(t) {
		bg.includes(t.keyCode) && e(!0);
	}
	function we(e) {
		if (i.vertical) return null;
		let t = c.lang.rtl === i.reverse ? e : 1 - e;
		return { transform: `translateX(calc(${2 * t - 1} * ${i.thumbSize} / 2 + ${50 - 100 * t}%))` };
	}
	function Te(e) {
		let t = o(() => !f.value && (p.value === e.focusValue || p.value === "both") ? " q-slider--focus" : ""), n = o(() => `q-slider__thumb q-slider__thumb${g.value} q-slider__thumb${g.value}-${y.value ? "rtl" : "ltr"} absolute non-selectable` + t.value + (e.thumbColor.value === void 0 ? "" : ` text-${e.thumbColor.value}`)), r = o(() => ({
			width: i.thumbSize,
			height: i.thumbSize,
			[j.value]: `${100 * e.ratio.value}%`,
			zIndex: p.value === e.focusValue ? 2 : void 0
		})), a = o(() => e.labelColor.value === void 0 ? "" : ` text-${e.labelColor.value}`), s = o(() => we(e.ratio.value)), c = o(() => "q-slider__text" + (e.labelTextColor.value === void 0 ? "" : ` text-${e.labelTextColor.value}`));
		return () => {
			let t = [_("svg", {
				class: "q-slider__thumb-shape absolute-full",
				viewBox: "0 0 20 20",
				"aria-hidden": "true"
			}, [_("path", { d: i.thumbPath })]), _("div", { class: "q-slider__focus-ring fit" })];
			return (i.label || i.labelAlways) && (t.push(_("div", { class: te.value + " absolute fit no-pointer-events" + a.value }, [_("div", {
				class: H.value,
				style: { minWidth: i.thumbSize }
			}, [_("div", {
				class: U.value,
				style: s.value
			}, [_("span", { class: c.value }, e.label.value)])])])), i.name !== void 0 && !i.disable && u(t, "push")), _("div", {
				class: n.value,
				style: r.value,
				...e.getNodeData()
			}, t);
		};
	}
	function Ee(e, t, n, r) {
		let a = [];
		i.innerTrackColor !== "transparent" && a.push(_("div", {
			key: "inner",
			class: re.value,
			style: ie.value
		})), i.selectionColor !== "transparent" && a.push(_("div", {
			key: "selection",
			class: B.value,
			style: e.value
		})), i.markers !== !1 && a.push(_("div", {
			key: "marker",
			class: V.value,
			style: fe.value
		})), r(a);
		let o = [Af("div", {
			key: "trackC",
			class: ee.value,
			tabindex: t.value,
			...n.value
		}, [_("div", {
			class: ne.value,
			style: G.value
		}, a)], "slide", S.value, () => _e.value)];
		return i.markerLabels !== !1 && o[i.switchMarkerLabelsSide ? "unshift" : "push"](_("div", {
			key: "markerL",
			class: W.value
		}, ge())), o;
	}
	return D(() => {
		document.removeEventListener("mouseup", xe, !0);
	}), {
		state: {
			active: d,
			focus: p,
			preventFocus: f,
			dragging: m,
			editable: S,
			classes: I,
			tabindex: T,
			attributes: F,
			roundValueFn: C,
			keyStep: w,
			trackLen: E,
			innerMin: b,
			innerMinRatio: k,
			innerMax: x,
			innerMaxRatio: A,
			positionProp: j,
			sizeProp: M,
			isReversed: y
		},
		methods: {
			onActivate: be,
			onMobileClick: Se,
			onBlur: ye,
			onKeyup: Ce,
			getContent: Ee,
			getThumbRenderFn: Te,
			convertRatioToModel: K,
			convertModelToRatio: ae,
			getDraggingRatio: oe
		}
	};
}
var wg = () => ({}), Tg = Q({
	name: "QSlider",
	props: {
		...xg,
		modelValue: {
			required: !0,
			default: null,
			validator: (e) => typeof e == "number" || e === null
		},
		labelValue: [String, Number]
	},
	emits: Sg,
	setup(e, { emit: t }) {
		let { proxy: { $q: n } } = h(), { state: r, methods: i } = Cg({
			updateValue: g,
			updatePosition: y,
			getDragging: v,
			formAttrs: wh(e)
		}), a = L(null), s = L(0), c = L(0);
		function l() {
			c.value = e.modelValue === null ? r.innerMin.value : df(e.modelValue, r.innerMin.value, r.innerMax.value);
		}
		G(() => `${e.modelValue}|${r.innerMin.value}|${r.innerMax.value}`, l, { immediate: !0 });
		let u = o(() => i.convertModelToRatio(c.value)), d = o(() => r.active.value ? s.value : u.value), f = o(() => {
			let t = {
				[r.positionProp.value]: `${100 * r.innerMinRatio.value}%`,
				[r.sizeProp.value]: `${100 * (d.value - r.innerMinRatio.value)}%`
			};
			return e.selectionImg !== void 0 && (t.backgroundImage = `url(${e.selectionImg}) !important`), t;
		}), p = i.getThumbRenderFn({
			focusValue: !0,
			getNodeData: wg,
			ratio: d,
			label: o(() => e.labelValue === void 0 ? c.value : e.labelValue),
			thumbColor: o(() => e.thumbColor || e.color),
			labelColor: o(() => e.labelColor),
			labelTextColor: o(() => e.labelTextColor)
		}), m = o(() => r.editable.value ? n.platform.is.mobile ? { onClick: i.onMobileClick } : {
			onMousedown: i.onActivate,
			onFocus: b,
			onBlur: i.onBlur,
			onKeydown: x,
			onKeyup: i.onKeyup
		} : {});
		function g(n) {
			c.value !== e.modelValue && t("update:modelValue", c.value), n && t("change", c.value);
		}
		function v() {
			return a.value.getBoundingClientRect();
		}
		function y(t, n = r.dragging.value) {
			let a = i.getDraggingRatio(t, n);
			c.value = i.convertRatioToModel(a), s.value = !e.snap || e.step === 0 ? a : i.convertModelToRatio(c.value);
		}
		function b() {
			r.focus.value = !0;
		}
		function x(t) {
			if (!bg.includes(t.keyCode)) return;
			wd(t);
			let n = ([34, 33].includes(t.keyCode) ? 10 : 1) * r.keyStep.value, i = ([
				34,
				37,
				40
			].includes(t.keyCode) ? -1 : 1) * (r.isReversed.value ? -1 : 1) * (e.vertical ? -1 : 1) * n;
			c.value = df(r.roundValueFn.value(c.value + i), r.innerMin.value, r.innerMax.value), g();
		}
		return () => {
			let t = i.getContent(f, r.tabindex, m, (e) => {
				e.push(p());
			});
			return _("div", {
				ref: a,
				class: r.classes.value + (e.modelValue === null ? " q-slider--no-value" : ""),
				...r.attributes.value,
				"aria-valuenow": e.modelValue
			}, t);
		};
	}
});
function Eg() {
	let e = L(!od.value);
	return e.value || A(() => {
		e.value = !0;
	}), { isHydrated: e };
}
var Dg = typeof ResizeObserver < "u", Og = Dg ? {} : {
	style: "display:block;position:absolute;top:0;left:0;right:0;bottom:0;height:100%;width:100%;overflow:hidden;pointer-events:none;z-index:-1;",
	url: "about:blank"
}, kg = Q({
	name: "QResizeObserver",
	props: { debounce: {
		type: [String, Number],
		default: 100
	} },
	emits: ["resize"],
	setup(e, { emit: t }) {
		let n = null, r, i = {
			width: -1,
			height: -1
		};
		function a(t) {
			t === !0 || e.debounce === 0 || e.debounce === "0" ? o() : n === null && (n = setTimeout(o, e.debounce));
		}
		function o() {
			if (n !== null && (clearTimeout(n), n = null), r) {
				let { offsetWidth: e, offsetHeight: n } = r;
				(e !== i.width || n !== i.height) && (i = {
					width: e,
					height: n
				}, t("resize", i));
			}
		}
		let { proxy: s } = h();
		if (s.trigger = a, Dg) {
			let e, t = (n) => {
				r = s.$el.parentNode, r ? (e = new ResizeObserver(a), e.observe(r), o()) : n || w(() => {
					t(!0);
				});
			};
			return A(() => {
				t();
			}), D(() => {
				n !== null && clearTimeout(n), e !== void 0 && (e.disconnect === void 0 ? r && e.unobserve(r) : e.disconnect());
			}), yd;
		}
		let { isHydrated: c } = Eg(), l, u = () => {
			n !== null && (clearTimeout(n), n = null), l !== void 0 && (l.removeEventListener !== void 0 && l.removeEventListener("resize", a, vd.passive), l = void 0);
		}, d = () => {
			u(), r?.contentDocument && (l = r.contentDocument.defaultView, l.addEventListener("resize", a, vd.passive), o());
		};
		return A(() => {
			w(() => {
				r = s.$el, r && d();
			});
		}), D(u), () => {
			if (c.value) return _("object", {
				class: "q--avoid-card-border",
				style: Og.style,
				tabindex: -1,
				type: "text/html",
				data: Og.url,
				"aria-hidden": "true",
				onLoad: d
			});
		};
	}
}), Ag = !1;
if (!__QUASAR_SSR__) {
	let e = document.createElement("div");
	e.setAttribute("dir", "rtl"), Object.assign(e.style, {
		width: "1px",
		height: "1px",
		overflow: "auto"
	});
	let t = document.createElement("div");
	Object.assign(t.style, {
		width: "1000px",
		height: "1px"
	}), document.body.append(e), e.append(t), e.scrollLeft = -1e3, Ag = e.scrollLeft >= 0, e.remove();
}
function jg(e, t, n) {
	let r = n ? ["left", "right"] : ["top", "bottom"];
	return `absolute-${t ? r[0] : r[1]}${e ? ` text-${e}` : ""}`;
}
function Mg(e, t) {
	for (let n in e) if (e[n] !== t[n]) return !1;
	return !0;
}
var Ng = [
	"left",
	"center",
	"right",
	"justify"
], Pg = Q({
	name: "QTabs",
	props: {
		modelValue: [Number, String],
		align: {
			type: String,
			default: "center",
			validator: (e) => Ng.includes(e)
		},
		breakpoint: {
			type: [String, Number],
			default: 600
		},
		vertical: Boolean,
		shrink: Boolean,
		stretch: Boolean,
		activeClass: String,
		activeColor: String,
		activeBgColor: String,
		indicatorColor: String,
		leftIcon: String,
		rightIcon: String,
		outsideArrows: Boolean,
		mobileArrows: Boolean,
		switchIndicator: Boolean,
		narrowIndicator: Boolean,
		inlineLabel: Boolean,
		noCaps: Boolean,
		dense: Boolean,
		contentClass: String,
		"onUpdate:modelValue": [Function, Array]
	},
	setup(e, { slots: t, emit: n }) {
		let { proxy: r } = h(), { $q: i } = r, { registerTick: a } = bm(), { registerTick: s } = bm(), { registerTick: c } = bm(), { registerTimeout: l, removeTimeout: u } = xm(), { registerTimeout: d, removeTimeout: f } = xm(), p = L(null), m = L(null), g = L(e.modelValue), v = L(!1), y = L(!0), b = L(!1), x = L(!1), S = [], C = L(0), w = L(!1), E = null, O = null, A, j = o(() => ({
			activeClass: e.activeClass,
			activeColor: e.activeColor,
			activeBgColor: e.activeBgColor,
			indicatorClass: jg(e.indicatorColor, e.switchIndicator, e.vertical),
			narrowIndicator: e.narrowIndicator,
			inlineLabel: e.inlineLabel,
			noCaps: e.noCaps
		})), M = o(() => {
			let e = C.value, t = g.value;
			for (let n = 0; n < e; n++) if (S[n].name.value === t) return !0;
			return !1;
		}), N = o(() => `q-tabs__content--align-${v.value ? "left" : x.value ? "justify" : e.align}`), P = o(() => `q-tabs row no-wrap items-center q-tabs--${v.value ? "" : "not-"}scrollable q-tabs--${e.vertical ? "vertical" : "horizontal"} q-tabs__arrows--${e.outsideArrows ? "outside" : "inside"} q-tabs--mobile-with${e.mobileArrows ? "" : "out"}-arrows` + (e.dense ? " q-tabs--dense" : "") + (e.shrink ? " col-shrink" : "") + (e.stretch ? " self-stretch" : "")), I = o(() => "q-tabs__content scroll--mobile row no-wrap items-center self-stretch hide-scrollbar relative-position " + N.value + (e.contentClass === void 0 ? "" : ` ${e.contentClass}`)), R = o(() => e.vertical ? {
			container: "height",
			content: "offsetHeight",
			scroll: "scrollHeight"
		} : {
			container: "width",
			content: "offsetWidth",
			scroll: "scrollWidth"
		}), z = o(() => !e.vertical && i.lang.rtl === !0), B = o(() => !Ag && z.value);
		G(z, W), G(() => e.modelValue, (e) => {
			V({
				name: e,
				setCurrent: !0,
				skipEmit: !0
			});
		}), G(() => e.outsideArrows, ee);
		function V({ name: t, setCurrent: r, skipEmit: i }) {
			g.value !== t && (!i && e["onUpdate:modelValue"] !== void 0 && n("update:modelValue", t), (r || e["onUpdate:modelValue"] === void 0) && (H(g.value, t), g.value = t));
		}
		function ee() {
			a(() => {
				p.value && te({
					width: p.value.offsetWidth,
					height: p.value.offsetHeight
				});
			});
		}
		function te(t) {
			if (R.value === void 0 || m.value === null) return;
			let n = t[R.value.container], r = Math.min(m.value[R.value.scroll], Array.prototype.reduce.call(m.value.children, (e, t) => e + (t[R.value.content] || 0), 0)), i = n > 0 && r > n;
			v.value = i, i && s(W), x.value = n < Number.parseInt(e.breakpoint, 10);
		}
		function H(t, n) {
			let r = t != null && t !== "" ? S.find((e) => e.name.value === t) : null, i = n != null && n !== "" ? S.find((e) => e.name.value === n) : null;
			if (ve) ve = !1;
			else if (r && i) {
				let t = r.tabIndicatorRef.value, n = i.tabIndicatorRef.value;
				E !== null && (clearTimeout(E), E = null), t.style.transition = "none", t.style.transform = "none", n.style.transition = "none", n.style.transform = "none";
				let a = t.getBoundingClientRect(), o = n.getBoundingClientRect();
				n.style.transform = e.vertical ? `translate3d(0,${a.top - o.top}px,0) scale3d(1,${o.height ? a.height / o.height : 1},1)` : `translate3d(${a.left - o.left}px,0,0) scale3d(${o.width ? a.width / o.width : 1},1,1)`, c(() => {
					E = setTimeout(() => {
						E = null, n.style.transition = "transform .25s cubic-bezier(.4, 0, .2, 1)", n.style.transform = "none";
					}, 70);
				});
			}
			i && v.value && U(i.rootRef.value);
		}
		function U(t) {
			let { left: n, width: r, top: i, height: a } = m.value.getBoundingClientRect(), o = t.getBoundingClientRect(), s = e.vertical ? o.top - i : o.left - n;
			if (s < 0) {
				m.value[e.vertical ? "scrollTop" : "scrollLeft"] += Math.floor(s), W();
				return;
			}
			s += e.vertical ? o.height - a : o.width - r, s > 0 && (m.value[e.vertical ? "scrollTop" : "scrollLeft"] += Math.ceil(s), W());
		}
		function W() {
			let t = m.value;
			if (t === null) return;
			let n = t.getBoundingClientRect(), r = e.vertical ? t.scrollTop : Math.abs(t.scrollLeft);
			z.value ? (y.value = Math.ceil(r + n.width) < t.scrollWidth - 1, b.value = r > 0) : (y.value = r > 0, b.value = e.vertical ? Math.ceil(r + n.height) < t.scrollHeight : Math.ceil(r + n.width) < t.scrollWidth);
		}
		function ne(e) {
			O !== null && clearInterval(O), O = setInterval(() => {
				se(e) && K();
			}, 5);
		}
		function re() {
			ne(B.value ? 2 ** 53 - 1 : 0);
		}
		function ie() {
			ne(B.value ? 0 : 2 ** 53 - 1);
		}
		function K() {
			O !== null && (clearInterval(O), O = null);
		}
		function ae(t, n) {
			let r = Array.prototype.filter.call(m.value.children, (e) => e === n || e.matches?.(".q-tab.q-focusable")), i = r.length;
			if (i === 0) return;
			if (t === 36) return U(r[0]), r[0].focus(), !0;
			if (t === 35) return U(r[i - 1]), r[i - 1].focus(), !0;
			let a = t === (e.vertical ? 38 : 37), o = t === (e.vertical ? 40 : 39), s = a ? -1 : o ? 1 : void 0;
			if (s !== void 0) {
				let e = z.value ? -1 : 1, t = r.indexOf(n) + s * e;
				return t >= 0 && t < i && (U(r[t]), r[t].focus({ preventScroll: !0 })), !0;
			}
		}
		let oe = o(() => B.value ? {
			get: (e) => Math.abs(e.scrollLeft),
			set: (e, t) => {
				e.scrollLeft = -t;
			}
		} : e.vertical ? {
			get: (e) => e.scrollTop,
			set: (e, t) => {
				e.scrollTop = t;
			}
		} : {
			get: (e) => e.scrollLeft,
			set: (e, t) => {
				e.scrollLeft = t;
			}
		});
		function se(e) {
			let t = m.value, { get: n, set: r } = oe.value, i = !1, a = n(t), o = e < a ? -1 : 1;
			return a += o * 5, a < 0 ? (i = !0, a = 0) : (o === -1 && a <= e || o === 1 && a >= e) && (i = !0, a = e), r(t, a), W(), i;
		}
		function ce() {
			let e = null, t = {
				matchedLen: 0,
				queryDiff: 9999,
				hrefLen: 0
			}, n = S.filter((e) => e.routeData?.hasRouterLink.value === !0), { hash: i, query: a } = r.$route, o = Object.keys(a).length;
			for (let r of n) {
				let n = r.routeData.exact.value === !0;
				if (!r.routeData[n ? "linkIsExactActive" : "linkIsActive"].value) continue;
				let { hash: s, query: c, matched: l, href: u } = r.routeData.resolvedLink.value, d = Object.keys(c).length;
				if (n) {
					if (s !== i || d !== o || !Mg(a, c)) continue;
					e = r.name.value;
					break;
				}
				if (s !== "" && s !== i || d !== 0 && !Mg(c, a)) continue;
				let f = {
					matchedLen: l.length,
					queryDiff: o - d,
					hrefLen: u.length - s.length
				};
				if (f.matchedLen > t.matchedLen) {
					e = r.name.value, t = f;
					continue;
				} else if (f.matchedLen !== t.matchedLen) continue;
				if (f.queryDiff < t.queryDiff) e = r.name.value, t = f;
				else if (f.queryDiff !== t.queryDiff) continue;
				f.hrefLen > t.hrefLen && (e = r.name.value, t = f);
			}
			if (e === null && S.some((e) => e.routeData === void 0 && e.name.value === g.value)) {
				ve = !1;
				return;
			}
			V({
				name: e,
				setCurrent: !0
			});
		}
		function le(e) {
			if (u(), !w.value && p.value !== null && e.target && typeof e.target.closest == "function") {
				let t = e.target.closest(".q-tab");
				t && p.value.contains(t) && (w.value = !0, v.value && U(t));
			}
		}
		function ue() {
			l(() => {
				w.value = !1;
			}, 30);
		}
		function de() {
			he.avoidRouteWatcher === !1 ? d(ce) : f();
		}
		function fe() {
			if (A === void 0) {
				let e = G(() => r.$route.fullPath, de);
				A = () => {
					e(), A = void 0;
				};
			}
		}
		function pe(e) {
			S.push(e), C.value++, ee(), e.routeData === void 0 || r.$route === void 0 ? d(() => {
				if (v.value) {
					let e = g.value, t = e != null && e !== "" ? S.find((t) => t.name.value === e) : null;
					t && U(t.rootRef.value);
				}
			}) : (fe(), e.routeData.hasRouterLink.value && de());
		}
		function me(e) {
			S.splice(S.indexOf(e), 1), C.value--, ee(), A !== void 0 && e.routeData !== void 0 && (S.every((e) => e.routeData === void 0) && A(), de());
		}
		let he = {
			currentModel: g,
			tabProps: j,
			hasFocus: w,
			hasActiveTab: M,
			registerTab: pe,
			unregisterTab: me,
			verifyRouteModel: de,
			updateModel: V,
			onKbdNavigate: ae,
			avoidRouteWatcher: !1
		};
		F(Zd, he);
		function ge() {
			E !== null && clearTimeout(E), K(), A?.();
		}
		let _e = !1, ve = !1;
		return D(ge), k(() => {
			_e = A !== void 0, ge();
		}), T(() => {
			_e && (fe(), ve = !0, de()), ee();
		}), () => _("div", {
			ref: p,
			class: P.value,
			role: "tablist",
			onFocusin: le,
			onFocusout: ue
		}, [
			_(kg, { onResize: te }),
			_("div", {
				ref: m,
				class: I.value,
				onScroll: W
			}, $(t.default)),
			_(Gf, {
				class: "q-tabs__arrow q-tabs__arrow--left absolute q-tab__icon" + (y.value ? "" : " q-tabs__arrow--faded"),
				name: e.leftIcon || i.iconSet.tabs[e.vertical ? "up" : "left"],
				onMousedownPassive: re,
				onTouchstartPassive: re,
				onMouseupPassive: K,
				onMouseleavePassive: K,
				onTouchendPassive: K
			}),
			_(Gf, {
				class: "q-tabs__arrow q-tabs__arrow--right absolute q-tab__icon" + (b.value ? "" : " q-tabs__arrow--faded"),
				name: e.rightIcon || i.iconSet.tabs[e.vertical ? "down" : "right"],
				onMousedownPassive: ie,
				onTouchstartPassive: ie,
				onMouseupPassive: K,
				onMouseleavePassive: K,
				onTouchendPassive: K
			})
		]);
	}
}), Fg = 0, Ig = ["click", "keydown"], Lg = {
	icon: String,
	label: [Number, String],
	alert: [Boolean, String],
	alertIcon: String,
	name: {
		type: [Number, String],
		default: () => `t_${Fg++}`
	},
	noCaps: Boolean,
	tabindex: [String, Number],
	disable: Boolean,
	contentClass: String,
	ripple: {
		type: [Boolean, Object],
		default: !0
	}
};
function Rg(e, t, n, r) {
	let i = y(Zd, $d);
	if (i === $d) return console.error("QTab/QRouteTab component needs to be child of QTabs"), $d;
	let { proxy: a } = h(), s = L(null), c = L(null), l = L(null), u = o(() => e.disable || e.ripple === !1 ? !1 : {
		keyCodes: [13, 32],
		early: !0,
		...e.ripple === !0 ? {} : e.ripple
	}), d = o(() => i.currentModel.value === e.name), f = o(() => "q-tab relative-position self-stretch flex flex-center text-center" + (d.value ? " q-tab--active" + (i.tabProps.value.activeClass ? " " + i.tabProps.value.activeClass : "") + (i.tabProps.value.activeColor ? ` text-${i.tabProps.value.activeColor}` : "") + (i.tabProps.value.activeBgColor ? ` bg-${i.tabProps.value.activeBgColor}` : "") : " q-tab--inactive") + (e.icon && e.label && !i.tabProps.value.inlineLabel ? " q-tab--full" : "") + (e.noCaps || i.tabProps.value.noCaps ? " q-tab--no-caps" : "") + (e.disable ? " disabled" : " q-focusable q-hoverable cursor-pointer") + (r === void 0 ? "" : r.linkClass.value)), p = o(() => "q-tab__content self-stretch flex-center relative-position q-anchor--skip non-selectable " + (i.tabProps.value.inlineLabel ? "row no-wrap q-tab__content--inline" : "column") + (e.contentClass === void 0 ? "" : ` ${e.contentClass}`)), m = o(() => e.disable || i.hasFocus.value || !d.value && i.hasActiveTab.value ? -1 : e.tabindex || 0);
	function g(t, a) {
		if (!a && !t?.qAvoidFocus && s.value?.focus(), e.disable) {
			r?.hasRouterLink.value === !0 && wd(t);
			return;
		}
		if (r === void 0) {
			i.updateModel({ name: e.name }), n("click", t);
			return;
		}
		if (r.hasRouterLink.value) {
			let a = (n = {}) => {
				let a, o = n.to === void 0 || ef(n.to, e.to) ? i.avoidRouteWatcher = gh() : null;
				return r.navigateToRouterLink(t, {
					...n,
					returnRouterError: !0
				}).catch((e) => {
					a = e;
				}).then((t) => {
					if (o === i.avoidRouteWatcher && (i.avoidRouteWatcher = !1, a === void 0 && (t === void 0 || t.message?.startsWith("Avoided redundant navigation") === !0) && i.updateModel({ name: e.name })), n.returnRouterError) return a === void 0 ? t : Promise.reject(a);
				});
			};
			n("click", t, a), t.defaultPrevented || a();
			return;
		}
		n("click", t);
	}
	function v(e) {
		Pd(e, [13, 32]) ? g(e, !0) : !Nd(e) && e.keyCode >= 35 && e.keyCode <= 40 && !e.altKey && !e.metaKey && i.onKbdNavigate(e.keyCode, a.$el) && wd(e), n("keydown", e);
	}
	function b() {
		let n = i.tabProps.value.narrowIndicator, r = [], a = _("div", {
			ref: l,
			class: ["q-tab__indicator", i.tabProps.value.indicatorClass]
		});
		e.icon !== void 0 && r.push(_(Gf, {
			class: "q-tab__icon",
			name: e.icon
		})), e.label !== void 0 && r.push(_("div", { class: "q-tab__label" }, e.label)), e.alert && r.push(e.alertIcon === void 0 ? _("div", { class: "q-tab__alert" + (e.alert === !0 ? "" : ` text-${e.alert}`) }) : _(Gf, {
			class: "q-tab__alert-icon",
			color: e.alert === !0 ? void 0 : e.alert,
			name: e.alertIcon
		})), n && r.push(a);
		let o = [_("div", {
			class: "q-focus-helper",
			tabindex: -1,
			ref: s
		}), _("div", { class: p.value }, Of(t.default, r))];
		return n || o.push(a), o;
	}
	let x = {
		name: o(() => e.name),
		rootRef: c,
		tabIndicatorRef: l,
		routeData: r
	};
	D(() => {
		i.unregisterTab(x);
	}), A(() => {
		i.registerTab(x);
	});
	function S(t, n) {
		return re(_(t, {
			ref: c,
			class: f.value,
			tabindex: m.value,
			role: "tab",
			"aria-selected": d.value ? "true" : "false",
			"aria-disabled": e.disable ? "true" : void 0,
			onClick: g,
			onKeydown: v,
			...n
		}, b()), [[Tp, u.value]]);
	}
	return {
		renderTab: S,
		$tabs: i
	};
}
var zg = Q({
	name: "QTab",
	props: Lg,
	emits: Ig,
	setup(e, { slots: t, emit: n }) {
		let { renderTab: r } = Rg(e, t, n);
		return () => r("div");
	}
}), Bg = Q({
	name: "QTabPanels",
	props: {
		...Vh,
		...qf
	},
	emits: Hh,
	setup(e, { slots: t }) {
		let n = Jf(e, h().proxy.$q), { updatePanelsList: r, getPanelContent: i, panelDirectives: a } = Wh(), s = o(() => "q-tab-panels q-panel-parent" + (n.value ? " q-tab-panels--dark q-dark" : ""));
		return () => (r(t), Af("div", { class: s.value }, i(), "pan", e.swipeable, () => a.value));
	}
}), Vg = Q({
	name: "QTabPanel",
	props: zh,
	setup(e, { slots: t }) {
		return () => _("div", {
			class: "q-tab-panel",
			role: "tabpanel"
		}, $(t.default));
	}
}), Hg = /^#[0-9a-fA-F]{3}([0-9a-fA-F]{3})?$/, Ug = /^#[0-9a-fA-F]{4}([0-9a-fA-F]{4})?$/, Wg = /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/, Gg = /^rgb\(((0|[1-9][\d]?|1[\d]{0,2}|2[\d]?|2[0-4][\d]|25[0-5]),){2}(0|[1-9][\d]?|1[\d]{0,2}|2[\d]?|2[0-4][\d]|25[0-5])\)$/, Kg = /^rgba\(((0|[1-9][\d]?|1[\d]{0,2}|2[\d]?|2[0-4][\d]|25[0-5]),){2}(0|[1-9][\d]?|1[\d]{0,2}|2[\d]?|2[0-4][\d]|25[0-5]),(0|0\.[0-9]+[1-9]|0\.[1-9]+|1)\)$/, qg = /^-?[\d]+\/[0-1]\d\/[0-3]\d$/, Jg = /^([0-1]?\d|2[0-3]):[0-5]\d$/, Yg = /^([0-1]?\d|2[0-3]):[0-5]\d:[0-5]\d$/, Xg = /^([0-1]?\d|2[0-3]):[0-5]\d(:[0-5]\d)?$/, Zg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, Qg = {
	date: (e) => qg.test(e),
	time: (e) => Jg.test(e),
	fulltime: (e) => Yg.test(e),
	timeOrFulltime: (e) => Xg.test(e),
	email: (e) => Zg.test(e),
	hexColor: (e) => Hg.test(e),
	hexaColor: (e) => Ug.test(e),
	hexOrHexaColor: (e) => Wg.test(e),
	rgbColor: (e) => Gg.test(e),
	rgbaColor: (e) => Kg.test(e),
	rgbOrRgbaColor: (e) => Gg.test(e) || Kg.test(e),
	hexOrRgbColor: (e) => Hg.test(e) || Gg.test(e),
	hexaOrRgbaColor: (e) => Ug.test(e) || Kg.test(e),
	anyColor: (e) => Wg.test(e) || Gg.test(e) || Kg.test(e)
}, $g = /^rgb(a)?\((\d{1,3}),(\d{1,3}),(\d{1,3}),?([01]?\.?\d*?)?\)$/;
function e_({ r: e, g: t, b: n, a: r }) {
	let i = r !== void 0;
	if (e = Math.round(e), t = Math.round(t), n = Math.round(n), e > 255 || t > 255 || n > 255 || i && r > 100) throw TypeError("Expected 3 numbers below 256 (and optionally one below 100)");
	return r = i ? (Math.round(255 * r / 100) | 256).toString(16).slice(1) : "", "#" + (n | t << 8 | e << 16 | 1 << 24).toString(16).slice(1) + r;
}
function t_({ r: e, g: t, b: n, a: r }) {
	return `rgb${r === void 0 ? "" : "a"}(${e},${t},${n}${r === void 0 ? "" : "," + r / 100})`;
}
function n_(e) {
	if (typeof e != "string") throw TypeError("Expected a string");
	e = e.replace(/^#/, ""), e.length === 3 ? e = e[0] + e[0] + e[1] + e[1] + e[2] + e[2] : e.length === 4 && (e = e[0] + e[0] + e[1] + e[1] + e[2] + e[2] + e[3] + e[3]);
	let t = Number.parseInt(e, 16);
	return e.length > 6 ? {
		r: t >> 24 & 255,
		g: t >> 16 & 255,
		b: t >> 8 & 255,
		a: Math.round((t & 255) / 2.55)
	} : {
		r: t >> 16,
		g: t >> 8 & 255,
		b: t & 255
	};
}
function r_({ h: e, s: t, v: n, a: r }) {
	let i, a, o;
	t /= 100, n /= 100, e /= 360;
	let s = Math.floor(e * 6), c = e * 6 - s, l = n * (1 - t), u = n * (1 - c * t), d = n * (1 - (1 - c) * t);
	switch (s % 6) {
		case 0:
			i = n, a = d, o = l;
			break;
		case 1:
			i = u, a = n, o = l;
			break;
		case 2:
			i = l, a = n, o = d;
			break;
		case 3:
			i = l, a = u, o = n;
			break;
		case 4:
			i = d, a = l, o = n;
			break;
		case 5:
			i = n, a = l, o = u;
			break;
	}
	return {
		r: Math.round(i * 255),
		g: Math.round(a * 255),
		b: Math.round(o * 255),
		a: r
	};
}
function i_({ r: e, g: t, b: n, a: r }) {
	let i = Math.max(e, t, n), a = Math.min(e, t, n), o = i - a, s = i === 0 ? 0 : o / i, c = i / 255, l;
	switch (i) {
		case a:
			l = 0;
			break;
		case e:
			l = t - n + o * (t < n ? 6 : 0), l /= 6 * o;
			break;
		case t:
			l = n - e + o * 2, l /= 6 * o;
			break;
		case n:
			l = e - t + o * 4, l /= 6 * o;
			break;
	}
	return {
		h: Math.round(l * 360),
		s: Math.round(s * 100),
		v: Math.round(c * 100),
		a: r
	};
}
function a_(e) {
	if (typeof e != "string") throw TypeError("Expected a string");
	let t = e.replaceAll(" ", ""), n = $g.exec(t);
	if (n === null) return n_(t);
	let r = {
		r: Math.min(255, Math.max(0, Number.parseInt(n[2], 10))),
		g: Math.min(255, Math.max(0, Number.parseInt(n[3], 10))),
		b: Math.min(255, Math.max(0, Number.parseInt(n[4], 10)))
	};
	if (n[1]) {
		let e = Number.parseFloat(n[5]);
		r.a = Math.round((Number.isFinite(e) ? Math.max(0, Math.min(1, e)) : 1) * 100);
	}
	return r;
}
function o_(e) {
	if (typeof e != "string" && (!e || e.r === void 0)) throw TypeError("Expected a string or a {r, g, b} object as color");
	let t = typeof e == "string" ? a_(e) : e, n = t.r / 255, r = t.g / 255, i = t.b / 255, a = n <= .03928 ? n / 12.92 : ((n + .055) / 1.055) ** 2.4, o = r <= .03928 ? r / 12.92 : ((r + .055) / 1.055) ** 2.4, s = i <= .03928 ? i / 12.92 : ((i + .055) / 1.055) ** 2.4;
	return .2126 * a + .7152 * o + .0722 * s;
}
var s_ = /* @__PURE__ */ "rgb(255,204,204).rgb(255,230,204).rgb(255,255,204).rgb(204,255,204).rgb(204,255,230).rgb(204,255,255).rgb(204,230,255).rgb(204,204,255).rgb(230,204,255).rgb(255,204,255).rgb(255,153,153).rgb(255,204,153).rgb(255,255,153).rgb(153,255,153).rgb(153,255,204).rgb(153,255,255).rgb(153,204,255).rgb(153,153,255).rgb(204,153,255).rgb(255,153,255).rgb(255,102,102).rgb(255,179,102).rgb(255,255,102).rgb(102,255,102).rgb(102,255,179).rgb(102,255,255).rgb(102,179,255).rgb(102,102,255).rgb(179,102,255).rgb(255,102,255).rgb(255,51,51).rgb(255,153,51).rgb(255,255,51).rgb(51,255,51).rgb(51,255,153).rgb(51,255,255).rgb(51,153,255).rgb(51,51,255).rgb(153,51,255).rgb(255,51,255).rgb(255,0,0).rgb(255,128,0).rgb(255,255,0).rgb(0,255,0).rgb(0,255,128).rgb(0,255,255).rgb(0,128,255).rgb(0,0,255).rgb(128,0,255).rgb(255,0,255).rgb(245,0,0).rgb(245,123,0).rgb(245,245,0).rgb(0,245,0).rgb(0,245,123).rgb(0,245,245).rgb(0,123,245).rgb(0,0,245).rgb(123,0,245).rgb(245,0,245).rgb(214,0,0).rgb(214,108,0).rgb(214,214,0).rgb(0,214,0).rgb(0,214,108).rgb(0,214,214).rgb(0,108,214).rgb(0,0,214).rgb(108,0,214).rgb(214,0,214).rgb(163,0,0).rgb(163,82,0).rgb(163,163,0).rgb(0,163,0).rgb(0,163,82).rgb(0,163,163).rgb(0,82,163).rgb(0,0,163).rgb(82,0,163).rgb(163,0,163).rgb(92,0,0).rgb(92,46,0).rgb(92,92,0).rgb(0,92,0).rgb(0,92,46).rgb(0,92,92).rgb(0,46,92).rgb(0,0,92).rgb(46,0,92).rgb(92,0,92).rgb(255,255,255).rgb(205,205,205).rgb(178,178,178).rgb(153,153,153).rgb(127,127,127).rgb(102,102,102).rgb(76,76,76).rgb(51,51,51).rgb(25,25,25).rgb(0,0,0)".split("."), c_ = "M5 5 h10 v10 h-10 v-10 z", l_ = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAAH0lEQVQoU2NkYGAwZkAFZ5G5jPRRgOYEVDeB3EBjBQBOZwTVugIGyAAAAABJRU5ErkJggg==", u_ = /^[0-9]+$/, d_ = /^#[0-9A-Fa-f]+$/, f_ = /^rgb\([0-9]{1,3},[0-9]{1,3},[0-9]{1,3}\)$/, p_ = /^rgba\([0-9]{1,3},[0-9]{1,3},[0-9]{1,3},(0|0\.[0-9]+[1-9]|0\.[1-9]+|1)\)$/;
Q({
	name: "QColor",
	props: {
		...qf,
		...Ch,
		modelValue: String,
		defaultValue: String,
		defaultView: {
			type: String,
			default: "spectrum",
			validator: (e) => [
				"spectrum",
				"tune",
				"palette"
			].includes(e)
		},
		formatModel: {
			type: String,
			default: "auto",
			validator: (e) => [
				"auto",
				"hex",
				"rgb",
				"hexa",
				"rgba"
			].includes(e)
		},
		palette: Array,
		noHeader: Boolean,
		noHeaderTabs: Boolean,
		noFooter: Boolean,
		square: Boolean,
		flat: Boolean,
		bordered: Boolean,
		disable: Boolean,
		readonly: Boolean
	},
	emits: ["update:modelValue", "change"],
	setup(e, { emit: t }) {
		let { proxy: n } = h(), { $q: r } = n, i = Jf(e, r), { getCache: a } = Rh(), s = L(null), c = L(null), l = o(() => e.formatModel === "auto" ? null : e.formatModel.includes("hex")), u = o(() => e.formatModel === "auto" ? null : e.formatModel.includes("a")), d = L(e.formatModel === "auto" ? e.modelValue === void 0 || e.modelValue === null || e.modelValue === "" || e.modelValue.startsWith("#") ? "hex" : "rgb" : e.formatModel.startsWith("hex") ? "hex" : "rgb"), f = L(e.defaultView), p = L(j(e.modelValue || e.defaultValue)), m = o(() => !e.disable && !e.readonly), g = o(() => e.modelValue === void 0 || e.modelValue === null || e.modelValue === "" || e.modelValue.startsWith("#")), v = o(() => l.value === null ? g.value : l.value), y = Th(o(() => ({
			type: "hidden",
			name: e.name,
			value: p.value[v.value ? "hex" : "rgb"]
		}))), b = o(() => u.value === null ? p.value.a !== void 0 : u.value), x = o(() => ({ backgroundColor: p.value.rgb || "#000" })), S = o(() => `q-color-picker__header-content q-color-picker__header-content--${p.value.a !== void 0 && p.value.a < 65 || o_(p.value) > .4 ? "light" : "dark"}`), C = o(() => ({ background: `hsl(${p.value.h},100%,50%)` })), T = o(() => ({
			top: `${100 - p.value.v}%`,
			[r.lang.rtl ? "right" : "left"]: `${p.value.s}%`
		})), E = o(() => e.palette !== void 0 && e.palette.length !== 0 ? e.palette : s_), D = o(() => "q-color-picker" + (e.bordered ? " q-color-picker--bordered" : "") + (e.square ? " q-color-picker--square no-border-radius" : "") + (e.flat ? " q-color-picker--flat no-shadow" : "") + (e.disable ? " disabled" : "") + (i.value ? " q-color-picker--dark q-dark" : "")), O = o(() => e.disable ? { "aria-disabled": "true" } : {}), k = o(() => [[
			gg,
			z,
			void 0,
			{
				prevent: !0,
				stop: !0,
				mouse: !0
			}
		]]);
		G(() => e.modelValue, (t) => {
			let n = j(t || e.defaultValue);
			n.hex !== p.value.hex && (p.value = n);
		}), G(() => e.defaultValue, (t) => {
			if (!e.modelValue && t) {
				let e = j(t);
				e.hex !== p.value.hex && (p.value = e);
			}
		});
		function A(e, n) {
			p.value.hex = e_(e), p.value.rgb = t_(e), p.value.r = e.r, p.value.g = e.g, p.value.b = e.b, p.value.a = e.a;
			let r = p.value[v.value ? "hex" : "rgb"];
			t("update:modelValue", r), n && t("change", r);
		}
		function j(t) {
			let n = u.value === void 0 ? e.formatModel === "auto" ? null : e.formatModel.includes("a") : u.value;
			if (typeof t != "string" || t.length === 0 || !Qg.anyColor(t.replaceAll(" ", ""))) return {
				h: 0,
				s: 0,
				v: 0,
				r: 0,
				g: 0,
				b: 0,
				a: n ? 100 : void 0,
				hex: void 0,
				rgb: void 0
			};
			let r = a_(t);
			return n && r.a === void 0 && (r.a = 100), r.hex = e_(r), r.rgb = t_(r), Object.assign(r, i_(r));
		}
		function M(e, t, n) {
			let i = s.value;
			if (i === null) return;
			let a = i.clientWidth, o = i.clientHeight, c = i.getBoundingClientRect(), l = Math.min(a, Math.max(0, e - c.left));
			r.lang.rtl && (l = a - l);
			let u = Math.min(o, Math.max(0, t - c.top)), d = Math.round(100 * l / a), f = Math.round(100 * Math.max(0, Math.min(1, -(u / o) + 1))), m = r_({
				h: p.value.h,
				s: d,
				v: f,
				a: b.value ? p.value.a : void 0
			});
			p.value.s = d, p.value.v = f, A(m, n);
		}
		function N(e, t) {
			let n = Math.round(e), r = r_({
				h: n,
				s: p.value.s,
				v: p.value.v,
				a: b.value ? p.value.a : void 0
			});
			p.value.h = n, A(r, t);
		}
		function P(e) {
			N(e, !0);
		}
		function F(e, t, r, i, a) {
			if (i !== void 0 && Sd(i), !u_.test(e)) {
				a && n.$forceUpdate();
				return;
			}
			let o = Math.floor(Number(e));
			if (o < 0 || o > r) {
				a && n.$forceUpdate();
				return;
			}
			let s = {
				r: t === "r" ? o : p.value.r,
				g: t === "g" ? o : p.value.g,
				b: t === "b" ? o : p.value.b,
				a: b.value ? t === "a" ? o : p.value.a : void 0
			};
			if (t !== "a") {
				let e = i_(s);
				p.value.h = e.h, p.value.s = e.s, p.value.v = e.v;
			}
			if (A(s, a), !a && i?.target.selectionEnd !== void 0) {
				let e = i.target.selectionEnd;
				w(() => {
					i.target.setSelectionRange(e, e);
				});
			}
		}
		function I(e, t) {
			let n, r = e.target.value;
			if (Sd(e), d.value === "hex") {
				if (r.length !== (b.value ? 9 : 7) || !d_.test(r)) return !0;
				n = n_(r);
			} else {
				let e;
				if (!r.endsWith(")")) return !0;
				if (!b.value && r.startsWith("rgb(")) {
					if (e = r.slice(4, -1).split(",").map((e) => Number.parseInt(e, 10)), e.length !== 3 || !f_.test(r)) return !0;
				} else if (b.value && r.startsWith("rgba(")) {
					if (e = r.slice(5, -1).split(","), e.length !== 4 || !p_.test(r)) return !0;
					for (let t = 0; t < 3; t++) {
						let n = Number.parseInt(e[t], 10);
						if (n < 0 || n > 255) return !0;
						e[t] = n;
					}
					let t = Number.parseFloat(e[3]);
					if (t < 0 || t > 1) return !0;
					e[3] = t;
				} else return !0;
				if (e[0] < 0 || e[0] > 255 || e[1] < 0 || e[1] > 255 || e[2] < 0 || e[2] > 255 || b.value && (e[3] < 0 || e[3] > 1)) return !0;
				n = {
					r: e[0],
					g: e[1],
					b: e[2],
					a: b.value ? e[3] * 100 : void 0
				};
			}
			let i = i_(n);
			if (p.value.h = i.h, p.value.s = i.s, p.value.v = i.v, A(n, t), !t) {
				let t = e.target.selectionEnd;
				w(() => {
					e.target.setSelectionRange(t, t);
				});
			}
		}
		function R(e) {
			let t = j(e), n = {
				r: t.r,
				g: t.g,
				b: t.b,
				a: t.a
			};
			n.a === void 0 && (n.a = p.value.a), p.value.h = t.h, p.value.s = t.s, p.value.v = t.v, A(n, !0);
		}
		function z(e) {
			e.isFinal ? M(e.position.left, e.position.top, !0) : B(e);
		}
		let B = Sp((e) => {
			M(e.position.left, e.position.top);
		}, 20);
		function V(e) {
			M(e.pageX - window.pageXOffset, e.pageY - window.pageYOffset, !0);
		}
		function ee(e) {
			M(e.pageX - window.pageXOffset, e.pageY - window.pageYOffset);
		}
		function te(e) {
			c.value !== null && (c.value.$el.style.opacity = +!!e);
		}
		function H(e) {
			d.value = e;
		}
		function U() {
			let t = [];
			return e.noHeaderTabs || t.push(_(Pg, {
				class: "q-color-picker__header-tabs",
				modelValue: d.value,
				dense: !0,
				align: "justify",
				"onUpdate:modelValue": H
			}, () => [_(zg, {
				label: "HEX" + (b.value ? "A" : ""),
				name: "hex",
				ripple: !1
			}), _(zg, {
				label: "RGB" + (b.value ? "A" : ""),
				name: "rgb",
				ripple: !1
			})])), t.push(_("div", { class: "q-color-picker__header-banner row flex-center no-wrap" }, [_("input", {
				class: "fit",
				value: p.value[d.value],
				...m.value ? {} : { readonly: !0 },
				...a("topIn", {
					onInput: (e) => {
						te(I(e));
					},
					onChange: Sd,
					onBlur: (e) => {
						I(e, !0) && n.$forceUpdate(), te(!1);
					}
				})
			}), _(Gf, {
				ref: c,
				class: "q-color-picker__error-icon absolute no-pointer-events",
				name: r.iconSet.type.negative
			})])), _("div", { class: "q-color-picker__header relative-position overflow-hidden" }, [_("div", { class: "q-color-picker__header-bg absolute-full" }), _("div", {
				class: S.value,
				style: x.value
			}, t)]);
		}
		function W() {
			return _(Bg, {
				modelValue: f.value,
				animated: !0
			}, () => [
				_(Vg, {
					class: "q-color-picker__spectrum-tab overflow-hidden",
					name: "spectrum"
				}, ie),
				_(Vg, {
					class: "q-pa-md q-color-picker__tune-tab",
					name: "tune"
				}, K),
				_(Vg, {
					class: "q-color-picker__palette-tab",
					name: "palette"
				}, ae)
			]);
		}
		function ne(e) {
			f.value = e;
		}
		function re() {
			return _("div", { class: "q-color-picker__footer relative-position overflow-hidden" }, [_(Pg, {
				class: "absolute-full",
				modelValue: f.value,
				dense: !0,
				align: "justify",
				"onUpdate:modelValue": ne
			}, () => [
				_(zg, {
					icon: r.iconSet.colorPicker.spectrum,
					name: "spectrum",
					ripple: !1
				}),
				_(zg, {
					icon: r.iconSet.colorPicker.tune,
					name: "tune",
					ripple: !1
				}),
				_(zg, {
					icon: r.iconSet.colorPicker.palette,
					name: "palette",
					ripple: !1
				})
			])]);
		}
		function ie() {
			let e = {
				ref: s,
				class: "q-color-picker__spectrum non-selectable relative-position cursor-pointer" + (m.value ? "" : " readonly"),
				style: C.value,
				...m.value ? {
					onClick: V,
					onMousedown: ee
				} : {}
			}, t = [
				_("div", { style: { paddingBottom: "100%" } }),
				_("div", { class: "q-color-picker__spectrum-white absolute-full" }),
				_("div", { class: "q-color-picker__spectrum-black absolute-full" }),
				_("div", {
					class: "absolute",
					style: T.value
				}, [p.value.hex === void 0 ? null : _("div", { class: "q-color-picker__spectrum-circle" })])
			], n = [_(Tg, {
				class: "q-color-picker__hue non-selectable",
				modelValue: p.value.h,
				min: 0,
				max: 360,
				trackSize: "8px",
				innerTrackColor: "transparent",
				selectionColor: "transparent",
				readonly: !m.value,
				thumbPath: c_,
				"onUpdate:modelValue": N,
				onChange: P
			})];
			return b.value && n.push(_(Tg, {
				class: "q-color-picker__alpha non-selectable",
				modelValue: p.value.a,
				min: 0,
				max: 100,
				trackSize: "8px",
				trackColor: "white",
				innerTrackColor: "transparent",
				selectionColor: "transparent",
				trackImg: l_,
				readonly: !m.value,
				hideSelection: !0,
				thumbPath: c_,
				...a("alphaSlide", {
					"onUpdate:modelValue": (e) => F(e, "a", 100),
					onChange: (e) => F(e, "a", 100, void 0, !0)
				})
			})), [Af("div", e, t, "spec", m.value, () => k.value), _("div", { class: "q-color-picker__sliders" }, n)];
		}
		function K() {
			return [
				_("div", { class: "row items-center no-wrap" }, [
					_("div", "R"),
					_(Tg, {
						modelValue: p.value.r,
						min: 0,
						max: 255,
						color: "red",
						dark: i.value,
						readonly: !m.value,
						...a("rSlide", {
							"onUpdate:modelValue": (e) => F(e, "r", 255),
							onChange: (e) => F(e, "r", 255, void 0, !0)
						})
					}),
					_("input", {
						value: p.value.r,
						maxlength: 3,
						readonly: !m.value,
						onChange: Sd,
						...a("rIn", {
							onInput: (e) => F(e.target.value, "r", 255, e),
							onBlur: (e) => F(e.target.value, "r", 255, e, !0)
						})
					})
				]),
				_("div", { class: "row items-center no-wrap" }, [
					_("div", "G"),
					_(Tg, {
						modelValue: p.value.g,
						min: 0,
						max: 255,
						color: "green",
						dark: i.value,
						readonly: !m.value,
						...a("gSlide", {
							"onUpdate:modelValue": (e) => F(e, "g", 255),
							onChange: (e) => F(e, "g", 255, void 0, !0)
						})
					}),
					_("input", {
						value: p.value.g,
						maxlength: 3,
						readonly: !m.value,
						onChange: Sd,
						...a("gIn", {
							onInput: (e) => F(e.target.value, "g", 255, e),
							onBlur: (e) => F(e.target.value, "g", 255, e, !0)
						})
					})
				]),
				_("div", { class: "row items-center no-wrap" }, [
					_("div", "B"),
					_(Tg, {
						modelValue: p.value.b,
						min: 0,
						max: 255,
						color: "blue",
						readonly: !m.value,
						dark: i.value,
						...a("bSlide", {
							"onUpdate:modelValue": (e) => F(e, "b", 255),
							onChange: (e) => F(e, "b", 255, void 0, !0)
						})
					}),
					_("input", {
						value: p.value.b,
						maxlength: 3,
						readonly: !m.value,
						onChange: Sd,
						...a("bIn", {
							onInput: (e) => F(e.target.value, "b", 255, e),
							onBlur: (e) => F(e.target.value, "b", 255, e, !0)
						})
					})
				]),
				b.value ? _("div", { class: "row items-center no-wrap" }, [
					_("div", "A"),
					_(Tg, {
						modelValue: p.value.a,
						color: "grey",
						readonly: !m.value,
						dark: i.value,
						...a("aSlide", {
							"onUpdate:modelValue": (e) => F(e, "a", 100),
							onChange: (e) => F(e, "a", 100, void 0, !0)
						})
					}),
					_("input", {
						value: p.value.a,
						maxlength: 3,
						readonly: !m.value,
						onChange: Sd,
						...a("aIn", {
							onInput: (e) => F(e.target.value, "a", 100, e),
							onBlur: (e) => F(e.target.value, "a", 100, e, !0)
						})
					})
				]) : null
			];
		}
		function ae() {
			return [_("div", { class: "row items-center q-color-picker__palette-rows" + (m.value ? " q-color-picker__palette-rows--editable" : "") }, E.value.map((e) => _("div", {
				class: "q-color-picker__cube col-auto",
				style: { backgroundColor: e },
				...m.value ? a("palette#" + e, { onClick: () => {
					R(e);
				} }) : {}
			})))];
		}
		return () => {
			let t = [W()];
			return e.name !== void 0 && !e.disable && y(t, "push"), e.noHeader || t.unshift(U()), e.noFooter || t.push(re()), _("div", {
				class: D.value,
				...O.value
			}, t);
		};
	}
});
var m_ = [
	-61,
	9,
	38,
	199,
	426,
	686,
	756,
	818,
	1111,
	1181,
	1210,
	1635,
	2060,
	2097,
	2192,
	2262,
	2324,
	2394,
	2456,
	3178
];
function h_(e, t, n) {
	return Object.prototype.toString.call(e) === "[object Date]" && (n = e.getDate(), t = e.getMonth() + 1, e = e.getFullYear()), S_(C_(e, t, n));
}
function g_(e, t, n) {
	return w_(x_(e, t, n));
}
function __(e) {
	return y_(e) === 0;
}
function v_(e, t) {
	return t <= 6 ? 31 : t <= 11 || __(e) ? 30 : 29;
}
function y_(e) {
	let t = m_.length, n = m_[0], r, i, a, o, s;
	if (e < n || e >= m_[t - 1]) throw Error("Invalid Jalaali year " + e);
	for (s = 1; s < t && (r = m_[s], i = r - n, !(e < r)); s += 1) n = r;
	return o = e - n, i - o < 6 && (o = o - i + T_(i + 4, 33) * 33), a = E_(E_(o + 1, 33) - 1, 4), a === -1 && (a = 4), a;
}
function b_(e, t) {
	let n = m_.length, r = e + 621, i = -14, a = m_[0], o, s, c, l, u;
	if (e < a || e >= m_[n - 1]) throw Error("Invalid Jalaali year " + e);
	for (u = 1; u < n && (o = m_[u], s = o - a, !(e < o)); u += 1) i = i + T_(s, 33) * 8 + T_(E_(s, 33), 4), a = o;
	l = e - a, i = i + T_(l, 33) * 8 + T_(E_(l, 33) + 3, 4), E_(s, 33) === 4 && s - l === 4 && (i += 1);
	let d = T_(r, 4) - T_((T_(r, 100) + 1) * 3, 4) - 150, f = 20 + i - d;
	return t || (s - l < 6 && (l = l - s + T_(s + 4, 33) * 33), c = E_(E_(l + 1, 33) - 1, 4), c === -1 && (c = 4)), {
		leap: c,
		gy: r,
		march: f
	};
}
function x_(e, t, n) {
	let r = b_(e, !0);
	return C_(r.gy, 3, r.march) + (t - 1) * 31 - T_(t, 7) * (t - 7) + n - 1;
}
function S_(e) {
	let t = w_(e).gy, n = t - 621, r, i, a, o = b_(n, !1);
	if (a = e - C_(t, 3, o.march), a >= 0) {
		if (a <= 185) return i = 1 + T_(a, 31), r = E_(a, 31) + 1, {
			jy: n,
			jm: i,
			jd: r
		};
		a -= 186;
	} else --n, a += 179, o.leap === 1 && (a += 1);
	return i = 7 + T_(a, 30), r = E_(a, 30) + 1, {
		jy: n,
		jm: i,
		jd: r
	};
}
function C_(e, t, n) {
	let r = T_((e + T_(t - 8, 6) + 100100) * 1461, 4) + T_(153 * E_(t + 9, 12) + 2, 5) + n - 34840408;
	return r = r - T_(T_(e + 100100 + T_(t - 8, 6), 100) * 3, 4) + 752, r;
}
function w_(e) {
	let t = 4 * e + 139361631;
	t = t + T_(T_(4 * e + 183187720, 146097) * 3, 4) * 4 - 3908;
	let n = T_(E_(t, 1461), 4) * 5 + 308, r = T_(E_(n, 153), 5) + 1, i = E_(T_(n, 153), 12) + 1;
	return {
		gy: T_(t, 1461) - 100100 + T_(8 - i, 6),
		gm: i,
		gd: r
	};
}
function T_(e, t) {
	return Math.trunc(e / t);
}
function E_(e, t) {
	return e - Math.trunc(e / t) * t;
}
var D_ = ["gregorian", "persian"], O_ = {
	mask: { type: String },
	locale: Object,
	calendar: {
		type: String,
		validator: (e) => D_.includes(e),
		default: "gregorian"
	},
	landscape: Boolean,
	color: String,
	textColor: String,
	square: Boolean,
	flat: Boolean,
	bordered: Boolean,
	readonly: Boolean,
	disable: Boolean
}, k_ = ["update:modelValue"];
function A_(e) {
	return e.year + "/" + pf(e.month) + "/" + pf(e.day);
}
function j_(e, t) {
	let n = o(() => !e.disable && !e.readonly), r = o(() => n.value ? 0 : -1), i = o(() => {
		let t = [];
		return e.color !== void 0 && t.push(`bg-${e.color}`), e.textColor !== void 0 && t.push(`text-${e.textColor}`), t.join(" ");
	});
	function a() {
		return e.locale === void 0 ? t.lang.date : {
			...t.lang.date,
			...e.locale
		};
	}
	function s(t) {
		let n = /* @__PURE__ */ new Date(), r = t ? null : 0;
		if (e.calendar === "persian") {
			let e = h_(n);
			return {
				year: e.jy,
				month: e.jm,
				day: e.jd
			};
		}
		return {
			year: n.getFullYear(),
			month: n.getMonth() + 1,
			day: n.getDate(),
			hour: r,
			minute: r,
			second: r,
			millisecond: r
		};
	}
	return {
		editable: n,
		tabindex: r,
		headerClass: i,
		getLocale: a,
		getCurrentDate: s
	};
}
var M_ = 864e5, N_ = 36e5, P_ = 6e4, F_ = "YYYY-MM-DDTHH:mm:ss.SSSZ", I_ = /\[((?:[^\]\\]|\\]|\\)*)\]|do|d{1,4}|Mo|M{1,4}|m{1,2}|wo|w{1,2}|Qo|Do|DDDo|D{1,4}|YY(?:YY)?|H{1,2}|h{1,2}|s{1,2}|S{1,3}|Z{1,2}|a{1,2}|[AQExX]/g, L_ = /(\[[^\]]*\])|do|d{1,4}|Mo|M{1,4}|m{1,2}|wo|w{1,2}|Qo|Do|DDDo|D{1,4}|YY(?:YY)?|H{1,2}|h{1,2}|s{1,2}|S{1,3}|Z{1,2}|a{1,2}|[AQExX]|([.*+:?^,\s${}()|\\]+)/g, R_ = {};
function z_(e, t) {
	let n = "(" + t.days.join("|") + ")", r = e + n;
	if (R_[r] !== void 0) return R_[r];
	let i = "(" + t.daysShort.join("|") + ")", a = "(" + t.months.join("|") + ")", o = "(" + t.monthsShort.join("|") + ")", s = {}, c = 0, l = e.replace(L_, (e) => {
		switch (c++, e) {
			case "YY": return s.YY = c, String.raw`(-?\d{1,2})`;
			case "YYYY": return s.YYYY = c, String.raw`(-?\d{1,4})`;
			case "M": return s.M = c, String.raw`(\d{1,2})`;
			case "Mo": return s.M = c++, String.raw`(\d{1,2}(st|nd|rd|th))`;
			case "MM": return s.M = c, String.raw`(\d{2})`;
			case "MMM": return s.MMM = c, o;
			case "MMMM": return s.MMMM = c, a;
			case "D": return s.D = c, String.raw`(\d{1,2})`;
			case "Do": return s.D = c++, String.raw`(\d{1,2}(st|nd|rd|th))`;
			case "DD": return s.D = c, String.raw`(\d{2})`;
			case "H": return s.H = c, String.raw`(\d{1,2})`;
			case "HH": return s.H = c, String.raw`(\d{2})`;
			case "h": return s.h = c, String.raw`(\d{1,2})`;
			case "hh": return s.h = c, String.raw`(\d{2})`;
			case "m": return s.m = c, String.raw`(\d{1,2})`;
			case "mm": return s.m = c, String.raw`(\d{2})`;
			case "s": return s.s = c, String.raw`(\d{1,2})`;
			case "ss": return s.s = c, String.raw`(\d{2})`;
			case "S": return s.S = c, String.raw`(\d{1})`;
			case "SS": return s.S = c, String.raw`(\d{2})`;
			case "SSS": return s.S = c, String.raw`(\d{3})`;
			case "A": return s.A = c, "(AM|PM)";
			case "a": return s.a = c, "(am|pm)";
			case "aa": return s.aa = c, String.raw`(a\.m\.|p\.m\.)`;
			case "ddd": return i;
			case "dddd": return n;
			case "Q":
			case "d":
			case "E": return String.raw`(\d{1})`;
			case "do": return c++, String.raw`(\d{1}(st|nd|rd|th))`;
			case "Qo": return "(1st|2nd|3rd|4th)";
			case "DDD":
			case "DDDD": return String.raw`(\d{1,3})`;
			case "DDDo": return c++, String.raw`(\d{1,3}(st|nd|rd|th))`;
			case "w": return String.raw`(\d{1,2})`;
			case "wo": return c++, String.raw`(\d{1,2}(st|nd|rd|th))`;
			case "ww": return String.raw`(\d{2})`;
			case "Z": return s.Z = c, String.raw`(Z|[+-]\d{2}:\d{2})`;
			case "ZZ": return s.ZZ = c, String.raw`(Z|[+-]\d{2}\d{2})`;
			case "X": return s.X = c, String.raw`(-?\d+)`;
			case "x": return s.x = c, String.raw`(-?\d{4,})`;
			default: return c--, e[0] === "[" && (e = e.slice(1, -1)), e.replaceAll(/[.*+?^${}()|[\]\\]/g, String.raw`\$&`);
		}
	}), u = {
		map: s,
		regex: RegExp("^" + l)
	};
	return R_[r] = u, u;
}
function B_(e, t) {
	return e === void 0 ? t === void 0 ? Bd.date : t.date : e;
}
function V_(e, t = "") {
	let n = e > 0 ? "-" : "+", r = Math.abs(e), i = Math.floor(r / 60), a = r % 60;
	return n + pf(i) + t + pf(a);
}
function H_(e, t, n) {
	let r = e.getFullYear(), i = e.getMonth(), a = e.getDate();
	return t.year !== void 0 && (r += n * t.year, delete t.year), t.month !== void 0 && (i += n * t.month, delete t.month), e.setDate(1), e.setMonth(2), e.setFullYear(r), e.setMonth(i), e.setDate(Math.min(a, mv(e))), t.date !== void 0 && (e.setDate(e.getDate() + n * t.date), delete t.date), e;
}
function U_(e, t, n) {
	let r = t.year === void 0 ? e[`get${n}FullYear`]() : t.year, i = t.month === void 0 ? e[`get${n}Month`]() : t.month - 1, a = new Date(r, i + 1, 0).getDate(), o = Math.min(a, t.date === void 0 ? e[`get${n}Date`]() : t.date);
	return e[`set${n}Date`](1), e[`set${n}Month`](2), e[`set${n}FullYear`](r), e[`set${n}Month`](i), e[`set${n}Date`](o), delete t.year, delete t.month, delete t.date, e;
}
function W_(e, t, n) {
	let r = G_(t), i = new Date(e), a = r.year !== void 0 || r.month !== void 0 || r.date !== void 0 ? H_(i, r, n) : i;
	for (let e in r) {
		let t = uf(e);
		a[`set${t}`](a[`get${t}`]() + n * r[e]);
	}
	return a;
}
function G_(e) {
	let t = { ...e };
	return e.years !== void 0 && (t.year = e.years, delete t.years), e.months !== void 0 && (t.month = e.months, delete t.months), e.days !== void 0 && (t.date = e.days, delete t.days), e.day !== void 0 && (t.date = e.day, delete t.day), e.hour !== void 0 && (t.hours = e.hour, delete t.hour), e.minute !== void 0 && (t.minutes = e.minute, delete t.minute), e.second !== void 0 && (t.seconds = e.second, delete t.second), e.millisecond !== void 0 && (t.milliseconds = e.millisecond, delete t.millisecond), t;
}
function K_(e, t, n) {
	let r = G_(t), i = n ? "UTC" : "", a = new Date(e), o = r.year !== void 0 || r.month !== void 0 || r.date !== void 0 ? U_(a, r, i) : a;
	for (let e in r) o[`set${i}${e.at(0).toUpperCase() + e.slice(1)}`](r[e]);
	return o;
}
function q_(e, t, n) {
	let r = J_(e, t, n), i = new Date(r.year, r.month === null ? null : r.month - 1, r.day === null ? 1 : r.day, r.hour, r.minute, r.second, r.millisecond), a = i.getTimezoneOffset();
	return r.timezoneOffset === null || r.timezoneOffset === a ? i : W_(i, { minutes: r.timezoneOffset - a }, 1);
}
function J_(e, t, n, r, i) {
	let a = {
		year: null,
		month: null,
		day: null,
		hour: null,
		minute: null,
		second: null,
		millisecond: null,
		timezoneOffset: null,
		dateHash: null,
		timeHash: null
	};
	if (i !== void 0 && Object.assign(a, i), e == null || e === "" || typeof e != "string") return a;
	t === void 0 && (t = F_);
	let o = B_(n, Hd.props), s = o.months, c = o.monthsShort, { regex: l, map: u } = z_(t, o), d = e.match(l);
	if (d === null) return a;
	let f = "";
	if (u.X !== void 0 || u.x !== void 0) {
		let e = Number.parseInt(d[u.X ?? u.x], 10);
		if (Number.isNaN(e) || e < 0) return a;
		let t = /* @__PURE__ */ new Date(e * (u.X === void 0 ? 1 : 1e3));
		a.year = t.getFullYear(), a.month = t.getMonth() + 1, a.day = t.getDate(), a.hour = t.getHours(), a.minute = t.getMinutes(), a.second = t.getSeconds(), a.millisecond = t.getMilliseconds();
	} else {
		if (u.YYYY !== void 0) a.year = Number.parseInt(d[u.YYYY], 10);
		else if (u.YY !== void 0) {
			let e = Number.parseInt(d[u.YY], 10);
			a.year = e < 0 ? e : 2e3 + e;
		}
		if (u.M !== void 0) {
			if (a.month = Number.parseInt(d[u.M], 10), a.month < 1 || a.month > 12) return a;
		} else u.MMM === void 0 ? u.MMMM !== void 0 && (a.month = s.indexOf(d[u.MMMM]) + 1) : a.month = c.indexOf(d[u.MMM]) + 1;
		if (u.D !== void 0) {
			if (a.day = Number.parseInt(d[u.D], 10), a.year === null || a.month === null || a.day < 1) return a;
			let e = r === "persian" ? v_(a.year, a.month) : new Date(a.year, a.month, 0).getDate();
			if (a.day > e) return a;
		}
		u.H === void 0 ? u.h !== void 0 && (a.hour = Number.parseInt(d[u.h], 10) % 12, (u.A && d[u.A] === "PM" || u.a && d[u.a] === "pm" || u.aa && d[u.aa] === "p.m.") && (a.hour += 12), a.hour %= 24) : a.hour = Number.parseInt(d[u.H], 10) % 24, u.m !== void 0 && (a.minute = Number.parseInt(d[u.m], 10) % 60), u.s !== void 0 && (a.second = Number.parseInt(d[u.s], 10) % 60), u.S !== void 0 && (a.millisecond = Number.parseInt(d[u.S], 10) * 10 ** (3 - d[u.S].length)), (u.Z !== void 0 || u.ZZ !== void 0) && (f = u.Z === void 0 ? d[u.ZZ] : d[u.Z].replace(":", ""), a.timezoneOffset = (f[0] === "+" ? -1 : 1) * (60 * f.slice(1, 3) + Number(f.slice(3, 5))));
	}
	return a.dateHash = pf(a.year, 4) + "/" + pf(a.month) + "/" + pf(a.day), a.timeHash = pf(a.hour) + ":" + pf(a.minute) + ":" + pf(a.second) + f, a;
}
function Y_(e) {
	return Number.isFinite(e) || Number.isFinite(Date.parse(e));
}
function X_(e, t) {
	return K_(/* @__PURE__ */ new Date(), e, t);
}
function Z_(e) {
	let t = new Date(e).getDay();
	return t === 0 ? 7 : t;
}
function Q_(e) {
	let t = new Date(e.getFullYear(), e.getMonth(), e.getDate());
	t.setDate(t.getDate() - (t.getDay() + 6) % 7 + 3);
	let n = new Date(t.getFullYear(), 0, 4);
	n.setDate(n.getDate() - (n.getDay() + 6) % 7 + 3);
	let r = t.getTimezoneOffset() - n.getTimezoneOffset();
	t.setHours(t.getHours() - r);
	let i = (t - n) / (M_ * 7);
	return 1 + Math.floor(i);
}
function $_(e) {
	return e.getFullYear() * 1e4 + e.getMonth() * 100 + e.getDate();
}
function ev(e, t) {
	let n = new Date(e);
	return t ? $_(n) : n.getTime();
}
function tv(e, t, n, r = {}) {
	let i = ev(t, r.onlyDate), a = ev(n, r.onlyDate), o = ev(e, r.onlyDate);
	return (o > i || r.inclusiveFrom && o === i) && (o < a || r.inclusiveTo && o === a);
}
function nv(e, t) {
	return W_(e, t, 1);
}
function rv(e, t) {
	return W_(e, t, -1);
}
function iv(e, t, n) {
	let r = new Date(e), i = `set${n ? "UTC" : ""}`;
	switch (t) {
		case "year":
		case "years": r[`${i}Month`](0);
		case "month":
		case "months": r[`${i}Date`](1);
		case "day":
		case "days":
		case "date": r[`${i}Hours`](0);
		case "hour":
		case "hours": r[`${i}Minutes`](0);
		case "minute":
		case "minutes": r[`${i}Seconds`](0);
		case "second":
		case "seconds": r[`${i}Milliseconds`](0);
	}
	return r;
}
function av(e, t, n) {
	let r = new Date(e), i = `set${n ? "UTC" : ""}`;
	switch (t) {
		case "year":
		case "years": r[`${i}Month`](11);
		case "month":
		case "months": r[`${i}Date`](mv(r));
		case "day":
		case "days":
		case "date": r[`${i}Hours`](23);
		case "hour":
		case "hours": r[`${i}Minutes`](59);
		case "minute":
		case "minutes": r[`${i}Seconds`](59);
		case "second":
		case "seconds": r[`${i}Milliseconds`](999);
	}
	return r;
}
function ov(e, ...t) {
	let n = Math.max(new Date(e).getTime(), ...t.map((e) => new Date(e).getTime()));
	return new Date(n);
}
function sv(e, ...t) {
	let n = Math.min(new Date(e).getTime(), ...t.map((e) => new Date(e).getTime()));
	return new Date(n);
}
function cv(e, t, n) {
	return (e.getTime() - e.getTimezoneOffset() * P_ - (t.getTime() - t.getTimezoneOffset() * P_)) / n;
}
function lv(e, t, n = "days") {
	let r = new Date(e), i = new Date(t);
	switch (n) {
		case "years":
		case "year": return r.getFullYear() - i.getFullYear();
		case "months":
		case "month": return (r.getFullYear() - i.getFullYear()) * 12 + r.getMonth() - i.getMonth();
		case "days":
		case "day":
		case "date": return cv(iv(r, "day"), iv(i, "day"), M_);
		case "hours":
		case "hour": return cv(iv(r, "hour"), iv(i, "hour"), N_);
		case "minutes":
		case "minute": return cv(iv(r, "minute"), iv(i, "minute"), P_);
		case "seconds":
		case "second": return cv(iv(r, "second"), iv(i, "second"), 1e3);
	}
}
function uv(e) {
	return lv(e, iv(e, "year"), "days") + 1;
}
function dv(e) {
	return nf(e) ? "date" : typeof e == "number" ? "number" : "string";
}
function fv(e, t, n) {
	let r = new Date(e);
	if (t) {
		let e = new Date(t);
		if (r < e) return e;
	}
	if (n) {
		let e = new Date(n);
		if (r > e) return e;
	}
	return r;
}
function pv(e, t, n) {
	let r = new Date(e), i = new Date(t);
	if (n === void 0) return r.getTime() === i.getTime();
	switch (n) {
		case "second":
		case "seconds": if (r.getSeconds() !== i.getSeconds()) return !1;
		case "minute":
		case "minutes": if (r.getMinutes() !== i.getMinutes()) return !1;
		case "hour":
		case "hours": if (r.getHours() !== i.getHours()) return !1;
		case "day":
		case "days":
		case "date": if (r.getDate() !== i.getDate()) return !1;
		case "month":
		case "months": if (r.getMonth() !== i.getMonth()) return !1;
		case "year":
		case "years":
			if (r.getFullYear() !== i.getFullYear()) return !1;
			break;
		default: throw Error(`date isSameDate unknown unit ${n}`);
	}
	return !0;
}
function mv(e) {
	return new Date(e.getFullYear(), e.getMonth() + 1, 0).getDate();
}
function hv(e) {
	if (e >= 11 && e <= 13) return `${e}th`;
	switch (e % 10) {
		case 1: return `${e}st`;
		case 2: return `${e}nd`;
		case 3: return `${e}rd`;
	}
	return `${e}th`;
}
var gv = {
	YY(e, t, n) {
		let r = this.YYYY(e, t, n) % 100;
		return r >= 0 ? pf(r) : "-" + pf(Math.abs(r));
	},
	YYYY(e, t, n) {
		return n ?? e.getFullYear();
	},
	M(e) {
		return e.getMonth() + 1;
	},
	Mo(e) {
		return hv(e.getMonth() + 1);
	},
	MM(e) {
		return pf(e.getMonth() + 1);
	},
	MMM(e, t) {
		return t.monthsShort[e.getMonth()];
	},
	MMMM(e, t) {
		return t.months[e.getMonth()];
	},
	Q(e) {
		return Math.ceil((e.getMonth() + 1) / 3);
	},
	Qo(e) {
		return hv(this.Q(e));
	},
	D(e) {
		return e.getDate();
	},
	Do(e) {
		return hv(e.getDate());
	},
	DD(e) {
		return pf(e.getDate());
	},
	DDD(e) {
		return uv(e);
	},
	DDDo(e) {
		return hv(uv(e));
	},
	DDDD(e) {
		return pf(uv(e), 3);
	},
	d(e) {
		return e.getDay();
	},
	do(e) {
		return hv(e.getDay());
	},
	dd(e, t) {
		return t.days[e.getDay()].slice(0, 2);
	},
	ddd(e, t) {
		return t.daysShort[e.getDay()];
	},
	dddd(e, t) {
		return t.days[e.getDay()];
	},
	E(e) {
		return e.getDay() || 7;
	},
	w(e) {
		return Q_(e);
	},
	wo(e) {
		return hv(Q_(e));
	},
	ww(e) {
		return pf(Q_(e));
	},
	H(e) {
		return e.getHours();
	},
	HH(e) {
		return pf(e.getHours());
	},
	h(e) {
		let t = e.getHours();
		return t === 0 ? 12 : t > 12 ? t % 12 : t;
	},
	hh(e) {
		return pf(this.h(e));
	},
	m(e) {
		return e.getMinutes();
	},
	mm(e) {
		return pf(e.getMinutes());
	},
	s(e) {
		return e.getSeconds();
	},
	ss(e) {
		return pf(e.getSeconds());
	},
	S(e) {
		return Math.floor(e.getMilliseconds() / 100);
	},
	SS(e) {
		return pf(Math.floor(e.getMilliseconds() / 10));
	},
	SSS(e) {
		return pf(e.getMilliseconds(), 3);
	},
	A(e) {
		return e.getHours() < 12 ? "AM" : "PM";
	},
	a(e) {
		return e.getHours() < 12 ? "am" : "pm";
	},
	aa(e) {
		return e.getHours() < 12 ? "a.m." : "p.m.";
	},
	Z(e, t, n, r) {
		return V_(r ?? e.getTimezoneOffset(), ":");
	},
	ZZ(e, t, n, r) {
		return V_(r ?? e.getTimezoneOffset());
	},
	X(e) {
		return Math.floor(e.getTime() / 1e3);
	},
	x(e) {
		return e.getTime();
	}
};
function _v(e, t, n, r, i) {
	if (e !== 0 && !e || e === Infinity || e === -Infinity) return;
	let a = new Date(e);
	if (Number.isNaN(a)) return;
	t === void 0 && (t = F_);
	let o = B_(n, Hd.props);
	return t.replace(I_, (e, t) => e in gv ? gv[e](a, o, r, i) : t === void 0 ? e : t.split(String.raw`\]`).join("]"));
}
function vv(e) {
	return nf(e) ? new Date(e) : e;
}
var yv = {
	isValid: Y_,
	extractDate: q_,
	buildDate: X_,
	getDayOfWeek: Z_,
	getWeekOfYear: Q_,
	isBetweenDates: tv,
	addToDate: nv,
	subtractFromDate: rv,
	adjustDate: K_,
	startOfDate: iv,
	endOfDate: av,
	getMaxDate: ov,
	getMinDate: sv,
	getDateDiff: lv,
	getDayOfYear: uv,
	inferDateFormat: dv,
	getDateBetween: fv,
	isSameDate: pv,
	daysInMonth: mv,
	formatDate: _v,
	clone: vv
}, bv = 20, xv = [
	"Calendar",
	"Years",
	"Months"
], Sv = (e) => xv.includes(e), Cv = /^-?[\d]+\/[0-1]\d$/, wv = (e) => Cv.test(e), Tv = " — ";
function Ev(e) {
	return e.year + "/" + pf(e.month);
}
function Dv(e) {
	return {
		year: e.year,
		month: e.month,
		day: e.day
	};
}
Q({
	name: "QDate",
	props: {
		...O_,
		...Ch,
		...qf,
		modelValue: {
			required: !0,
			validator: (e) => typeof e == "string" || Array.isArray(e) || Object(e) === e || e === null
		},
		multiple: Boolean,
		range: Boolean,
		title: String,
		subtitle: String,
		mask: {
			...O_.mask,
			default: "YYYY/MM/DD"
		},
		defaultYearMonth: {
			type: String,
			validator: wv
		},
		yearsInMonthView: Boolean,
		events: [Array, Function],
		eventColor: [String, Function],
		emitImmediately: Boolean,
		options: [Array, Function],
		navigationMinYearMonth: {
			type: String,
			validator: wv
		},
		navigationMaxYearMonth: {
			type: String,
			validator: wv
		},
		noUnset: Boolean,
		firstDayOfWeek: [String, Number],
		todayBtn: Boolean,
		minimal: Boolean,
		defaultView: {
			type: String,
			default: "Calendar",
			validator: Sv
		}
	},
	emits: [
		...k_,
		"rangeStart",
		"rangeEnd",
		"navigation"
	],
	setup(e, { slots: t, emit: n }) {
		let { proxy: r } = h(), { $q: i } = r, s = Jf(e, i), { getCache: c } = Rh(), { tabindex: l, headerClass: u, getLocale: d, getCurrentDate: f } = j_(e, i), p, m = Th(wh(e)), g = L(null), v = L(we()), y = L(d()), b = o(() => we()), x = o(() => d()), S = o(() => f()), C = L(Ee(v.value, y.value)), T = L(e.defaultView), E = o(() => i.lang.rtl ? "right" : "left"), D = L(E.value), O = L(E.value), k = C.value.year, A = L(k - k % bv - (k < 0 ? bv : 0)), j = L(null), M = o(() => {
			let t = e.landscape ? "landscape" : "portrait";
			return `q-date q-date--${t} q-date--${t}-${e.minimal ? "minimal" : "standard"}` + (s.value ? " q-date--dark q-dark" : "") + (e.bordered ? " q-date--bordered" : "") + (e.square ? " q-date--square no-border-radius" : "") + (e.flat ? " q-date--flat no-shadow" : "") + (e.disable ? " disabled" : e.readonly ? " q-date--readonly" : "");
		}), N = o(() => e.color || "primary"), P = o(() => e.textColor || "white"), F = o(() => e.emitImmediately && !e.multiple && !e.range), I = o(() => Array.isArray(e.modelValue) ? e.modelValue : e.modelValue !== null && e.modelValue !== void 0 ? [e.modelValue] : []), R = o(() => I.value.filter((e) => typeof e == "string").map((e) => Te(e, v.value, y.value)).filter((e) => e.dateHash !== null && e.day !== null && e.month !== null && e.year !== null)), z = o(() => {
			let e = (e) => Te(e, v.value, y.value);
			return I.value.filter((e) => tf(e) && e.from !== void 0 && e.to !== void 0).map((t) => ({
				from: e(t.from),
				to: e(t.to)
			})).filter((e) => e.from.dateHash !== null && e.to.dateHash !== null && e.from.dateHash < e.to.dateHash);
		}), B = o(() => e.calendar === "persian" ? (e) => {
			let t = g_(e.year, e.month, e.day);
			return new Date(t.gy, t.gm - 1, t.gd);
		} : (e) => new Date(e.year, e.month - 1, e.day)), V = o(() => e.calendar === "persian" ? A_ : (e, t, n) => _v(new Date(e.year, e.month - 1, e.day, e.hour, e.minute, e.second, e.millisecond), t === void 0 ? v.value : t, n === void 0 ? y.value : n, e.year, e.timezoneOffset)), ee = o(() => R.value.length + z.value.reduce((e, t) => e + 1 + lv(B.value(t.to), B.value(t.from)), 0)), te = o(() => {
			if (e.title !== void 0 && e.title !== null && e.title.length !== 0) return e.title;
			if (j.value !== null) {
				let e = j.value.init, t = B.value(e);
				return y.value.daysShort[t.getDay()] + ", " + y.value.monthsShort[e.month - 1] + " " + e.day + " — ?";
			}
			if (ee.value === 0) return Tv;
			if (ee.value > 1) return `${ee.value} ${y.value.pluralDay}`;
			let t = R.value[0], n = B.value(t);
			return Number.isNaN(n.valueOf()) ? Tv : y.value.headerTitle === void 0 ? y.value.daysShort[n.getDay()] + ", " + y.value.monthsShort[t.month - 1] + " " + t.day : y.value.headerTitle(n, t);
		}), H = o(() => [...R.value, ...z.value.map((e) => e.from)].sort((e, t) => e.year - t.year || e.month - t.month)[0]), U = o(() => [...R.value, ...z.value.map((e) => e.to)].sort((e, t) => t.year - e.year || t.month - e.month)[0]), W = o(() => {
			if (e.subtitle !== void 0 && e.subtitle !== null && e.subtitle.length !== 0) return e.subtitle;
			if (ee.value === 0) return Tv;
			if (ee.value > 1) {
				let e = H.value, t = U.value, n = y.value.monthsShort;
				return n[e.month - 1] + (e.year === t.year ? e.month === t.month ? "" : Tv + n[t.month - 1] : " " + e.year + Tv + n[t.month - 1] + " ") + " " + t.year;
			}
			return R.value[0].year;
		}), ne = o(() => {
			let e = [i.iconSet.datetime.arrowLeft, i.iconSet.datetime.arrowRight];
			return i.lang.rtl ? e.reverse() : e;
		}), re = o(() => e.firstDayOfWeek === void 0 ? y.value.firstDayOfWeek : Number(e.firstDayOfWeek)), ie = o(() => {
			let e = y.value.daysShort, t = re.value;
			return t > 0 ? [...e.slice(t, 7), ...e.slice(0, t)] : e;
		}), K = o(() => {
			let t = C.value;
			return e.calendar === "persian" ? v_(t.year, t.month) : new Date(t.year, t.month, 0).getDate();
		}), ae = o(() => typeof e.eventColor == "function" ? e.eventColor : () => e.eventColor), oe = o(() => {
			if (e.navigationMinYearMonth === void 0) return null;
			let t = e.navigationMinYearMonth.split("/");
			return {
				year: Number.parseInt(t[0], 10),
				month: Number.parseInt(t[1], 10)
			};
		}), se = o(() => {
			if (e.navigationMaxYearMonth === void 0) return null;
			let t = e.navigationMaxYearMonth.split("/");
			return {
				year: Number.parseInt(t[0], 10),
				month: Number.parseInt(t[1], 10)
			};
		}), ce = o(() => {
			let e = {
				month: {
					prev: !0,
					next: !0
				},
				year: {
					prev: !0,
					next: !0
				}
			};
			return oe.value !== null && oe.value.year >= C.value.year && (e.year.prev = !1, oe.value.year === C.value.year && oe.value.month >= C.value.month && (e.month.prev = !1)), se.value !== null && se.value.year <= C.value.year && (e.year.next = !1, se.value.year === C.value.year && se.value.month <= C.value.month && (e.month.next = !1)), e;
		}), le = o(() => {
			let e = {};
			return R.value.forEach((t) => {
				let n = Ev(t);
				e[n] === void 0 && (e[n] = []), e[n].push(t.day);
			}), e;
		}), ue = o(() => {
			let e = {};
			return z.value.forEach((t) => {
				let n = Ev(t.from), r = Ev(t.to);
				if (e[n] === void 0 && (e[n] = []), e[n].push({
					from: t.from.day,
					to: n === r ? t.to.day : void 0,
					range: t
				}), n < r) {
					let n, { year: i, month: a } = t.from, o = a < 12 ? {
						year: i,
						month: a + 1
					} : {
						year: i + 1,
						month: 1
					};
					for (; (n = Ev(o)) <= r;) e[n] === void 0 && (e[n] = []), e[n].push({
						from: void 0,
						to: n === r ? t.to.day : void 0,
						range: t
					}), o.month++, o.month > 12 && (o.year++, o.month = 1);
				}
			}), e;
		}), de = o(() => {
			if (j.value === null) return;
			let { init: e, initHash: t, final: n, finalHash: r } = j.value, [i, a] = t <= r ? [e, n] : [n, e], o = Ev(i), s = Ev(a);
			if (o !== fe.value && s !== fe.value) return;
			let c = {};
			return o === fe.value ? (c.from = i.day, c.includeFrom = !0) : c.from = 1, s === fe.value ? (c.to = a.day, c.includeTo = !0) : c.to = K.value, c;
		}), fe = o(() => Ev(C.value)), pe = o(() => {
			let t = {};
			if (e.options === void 0) {
				for (let e = 1; e <= K.value; e++) t[e] = !0;
				return t;
			}
			let n = typeof e.options == "function" ? e.options : (t) => e.options.includes(t);
			for (let e = 1; e <= K.value; e++) t[e] = n(fe.value + "/" + pf(e));
			return t;
		}), me = o(() => {
			let t = {};
			if (e.events === void 0) for (let e = 1; e <= K.value; e++) t[e] = !1;
			else {
				let n = typeof e.events == "function" ? e.events : (t) => e.events.includes(t);
				for (let e = 1; e <= K.value; e++) {
					let r = fe.value + "/" + pf(e);
					t[e] = n(r) && ae.value(r);
				}
			}
			return t;
		}), he = o(() => {
			let t, n, { year: r, month: i } = C.value;
			if (e.calendar !== "persian") t = new Date(r, i - 1, 1), n = new Date(r, i - 1, 0).getDate();
			else {
				let e = g_(r, i, 1);
				t = new Date(e.gy, e.gm - 1, e.gd);
				let a = i - 1, o = r;
				a === 0 && (a = 12, o--), n = v_(o, a);
			}
			return {
				days: t.getDay() - re.value - 1,
				endDay: n
			};
		}), ge = o(() => {
			let e = [], { days: t, endDay: n } = he.value, r = t < 0 ? t + 7 : t;
			if (r < 6) for (let t = n - r; t <= n; t++) e.push({
				i: t,
				fill: !0
			});
			let i = e.length;
			for (let t = 1; t <= K.value; t++) {
				let n = {
					i: t,
					event: me.value[t],
					classes: []
				};
				pe.value[t] && (n.in = !0, n.flat = !0), e.push(n);
			}
			if (le.value[fe.value] !== void 0 && le.value[fe.value].forEach((t) => {
				let n = i + t - 1;
				Object.assign(e[n], {
					selected: !0,
					unelevated: !0,
					flat: !1,
					color: N.value,
					textColor: P.value
				});
			}), ue.value[fe.value] !== void 0 && ue.value[fe.value].forEach((t) => {
				if (t.from !== void 0) {
					let n = i + t.from - 1, r = i + (t.to || K.value) - 1;
					for (let i = n; i <= r; i++) Object.assign(e[i], {
						range: t.range,
						unelevated: !0,
						color: N.value,
						textColor: P.value
					});
					Object.assign(e[n], {
						rangeFrom: !0,
						flat: !1
					}), t.to !== void 0 && Object.assign(e[r], {
						rangeTo: !0,
						flat: !1
					});
				} else if (t.to !== void 0) {
					let n = i + t.to - 1;
					for (let r = i; r <= n; r++) Object.assign(e[r], {
						range: t.range,
						unelevated: !0,
						color: N.value,
						textColor: P.value
					});
					Object.assign(e[n], {
						flat: !1,
						rangeTo: !0
					});
				} else {
					let n = i + K.value - 1;
					for (let r = i; r <= n; r++) Object.assign(e[r], {
						range: t.range,
						unelevated: !0,
						color: N.value,
						textColor: P.value
					});
				}
			}), de.value !== void 0) {
				let t = i + de.value.from - 1, n = i + de.value.to - 1;
				for (let r = t; r <= n; r++) e[r].color = N.value, e[r].editRange = !0;
				de.value.includeFrom && (e[t].editRangeFrom = !0), de.value.includeTo && (e[n].editRangeTo = !0);
			}
			C.value.year === S.value.year && C.value.month === S.value.month && (e[i + S.value.day - 1].today = !0);
			let a = e.length % 7;
			if (a > 0) {
				let t = 7 - a;
				for (let n = 1; n <= t; n++) e.push({
					i: n,
					fill: !0
				});
			}
			return e.forEach((e) => {
				let t = "q-date__calendar-item ";
				e.fill ? t += "q-date__calendar-item--fill" : (t += `q-date__calendar-item--${e.in ? "in" : "out"}`, e.range !== void 0 && (t += ` q-date__range${e.rangeTo ? "-to" : e.rangeFrom ? "-from" : ""}`), e.editRange && (t += ` q-date__edit-range${e.editRangeFrom ? "-from" : ""}${e.editRangeTo ? "-to" : ""}`), (e.range !== void 0 || e.editRange) && (t += ` text-${e.color}`)), e.classes = t;
			}), e;
		}), _e = o(() => e.disable ? { "aria-disabled": "true" } : {});
		G(() => e.modelValue, (e) => {
			if (p === JSON.stringify(e)) p = 0;
			else {
				let e = Ee(v.value, y.value);
				Ne(e.year, e.month, e);
			}
		}), G(T, () => {
			g.value !== null && r.$el.contains(document.activeElement) && g.value.focus();
		}), G(() => C.value.year + "|" + C.value.month, () => {
			n("navigation", {
				year: C.value.year,
				month: C.value.month
			});
		}), G(b, (e) => {
			Be(e, y.value, "mask"), v.value = e;
		}), G(x, (e) => {
			Be(v.value, e, "locale"), y.value = e;
		});
		function ve(e) {
			p = JSON.stringify(e);
		}
		function ye() {
			let { year: e, month: t, day: n } = S.value, r = {
				...C.value,
				year: e,
				month: t,
				day: n
			}, i = le.value[Ev(r)];
			(i === void 0 || !i.includes(r.day)) && Re(r), Se(r.year, r.month);
		}
		function be(e) {
			Sv(e) && (T.value = e);
		}
		function xe(e, t) {
			["month", "year"].includes(e) && (e === "month" ? Oe : ke)(t ? -1 : 1);
		}
		function Se(e, t) {
			T.value = "Calendar", Ne(e, t);
		}
		function Ce(t, n) {
			if (!e.range || !t) {
				j.value = null;
				return;
			}
			let r = {
				...C.value,
				...t
			}, i = n === void 0 ? r : {
				...C.value,
				...n
			};
			j.value = {
				init: r,
				initHash: A_(r),
				final: i,
				finalHash: A_(i)
			}, Se(r.year, r.month);
		}
		function we() {
			return e.calendar === "persian" ? "YYYY/MM/DD" : e.mask;
		}
		function Te(t, n, r) {
			return J_(t, n, r, e.calendar, {
				hour: 0,
				minute: 0,
				second: 0,
				millisecond: 0
			});
		}
		function Ee(t, n) {
			let r = Array.isArray(e.modelValue) ? e.modelValue : e.modelValue ? [e.modelValue] : [];
			if (r.length === 0) return De();
			let i = r.at(-1), a = Te(i.from === void 0 ? i : i.from, t, n);
			return a.dateHash === null ? De() : a;
		}
		function De() {
			let t, n;
			if (e.defaultYearMonth !== void 0) {
				let r = e.defaultYearMonth.split("/");
				t = Number.parseInt(r[0], 10), n = Number.parseInt(r[1], 10);
			} else {
				let e = S.value === void 0 ? f() : S.value;
				t = e.year, n = e.month;
			}
			return {
				year: t,
				month: n,
				day: 1,
				hour: 0,
				minute: 0,
				second: 0,
				millisecond: 0,
				dateHash: t + "/" + pf(n) + "/01"
			};
		}
		function Oe(e) {
			let t = C.value.year, n = Number(C.value.month) + e;
			n === 13 ? (n = 1, t++) : n === 0 && (n = 12, t--), Ne(t, n), F.value && Fe("month");
		}
		function ke(e) {
			Ne(Number(C.value.year) + e, C.value.month), F.value && Fe("year");
		}
		function Ae(t) {
			Ne(t, C.value.month), T.value = e.defaultView === "Years" ? "Months" : "Calendar", F.value && Fe("year");
		}
		function je(e) {
			Ne(C.value.year, e), T.value = "Calendar", F.value && Fe("month");
		}
		function Me(e, t) {
			(le.value[t]?.includes(e.day) === !0 ? ze : Re)(e);
		}
		function Ne(e, t, n) {
			if (oe.value !== null && e <= oe.value.year && ((t < oe.value.month || e < oe.value.year) && (t = oe.value.month), e = oe.value.year), se.value !== null && e >= se.value.year && ((t > se.value.month || e > se.value.year) && (t = se.value.month), e = se.value.year), n !== void 0) {
				let { hour: e, minute: t, second: r, millisecond: i, timezoneOffset: a, timeHash: o } = n;
				Object.assign(C.value, {
					hour: e,
					minute: t,
					second: r,
					millisecond: i,
					timezoneOffset: a,
					timeHash: o
				});
			}
			let r = e + "/" + pf(t) + "/01";
			r !== C.value.dateHash && (D.value = C.value.dateHash < r == (i.lang.rtl !== !0) ? "left" : "right", e !== C.value.year && (O.value = D.value), w(() => {
				A.value = e - e % bv - (e < 0 ? bv : 0), Object.assign(C.value, {
					year: e,
					month: t,
					day: 1,
					dateHash: r
				});
			}));
		}
		function Pe(t, r, i) {
			let a = t !== null && t.length === 1 && !e.multiple ? t[0] : t, { reason: o, details: s } = Ie(r, i);
			ve(a), n("update:modelValue", a, o, s);
		}
		function Fe(t) {
			let r = R.value[0] !== void 0 && R.value[0].dateHash !== null ? { ...R.value[0] } : { ...C.value };
			w(() => {
				r.year = C.value.year, r.month = C.value.month;
				let i = e.calendar === "persian" ? v_(r.year, r.month) : new Date(r.year, r.month, 0).getDate();
				r.day = Math.min(Math.max(1, r.day), i);
				let a = Le(r), { details: o } = Ie("", r);
				ve(a), n("update:modelValue", a, t, o);
			});
		}
		function Ie(e, t) {
			return t.from === void 0 ? {
				reason: `${e}-day`,
				details: Dv(t)
			} : {
				reason: `${e}-range`,
				details: {
					...Dv(t.target),
					from: Dv(t.from),
					to: Dv(t.to)
				}
			};
		}
		function Le(e, t, n) {
			return e.from === void 0 ? V.value(e, t, n) : {
				from: V.value(e.from, t, n),
				to: V.value(e.to, t, n)
			};
		}
		function Re(t) {
			let n;
			if (e.multiple) if (t.from !== void 0) {
				let e = A_(t.from), r = A_(t.to), i = R.value.filter((t) => t.dateHash < e || t.dateHash > r), a = z.value.filter(({ from: t, to: n }) => n.dateHash < e || t.dateHash > r);
				n = [
					...i,
					...a,
					t
				].map((e) => Le(e));
			} else n = [...I.value, Le(t)];
			else n = Le(t);
			Pe(n, "add", t);
		}
		function ze(t) {
			if (e.noUnset) return;
			let n = null;
			if (e.multiple && Array.isArray(e.modelValue)) {
				let r = Le(t);
				n = t.from === void 0 ? e.modelValue.filter((e) => e !== r) : e.modelValue.filter((e) => e.from === void 0 || e.from !== r.from && e.to !== r.to), n.length === 0 && (n = null);
			}
			Pe(n, "remove", t);
		}
		function Be(t, r, i) {
			let a = [...R.value, ...z.value].map((e) => Le(e, t, r)).filter((e) => e.from === void 0 ? e.dateHash !== null : e.from.dateHash !== null && e.to.dateHash !== null), o = (e.multiple ? a : a[0]) || null;
			ve(o), n("update:modelValue", o, i);
		}
		function Ve() {
			if (!e.minimal) return _("div", { class: "q-date__header " + u.value }, [_("div", { class: "relative-position" }, [_(a, { name: "q-transition--fade" }, () => _("div", {
				key: "h-yr-" + W.value,
				class: "q-date__header-subtitle q-date__header-link " + (T.value === "Years" ? "q-date__header-link--active" : "cursor-pointer"),
				tabindex: l.value,
				...c("vY", {
					onClick() {
						T.value = "Years";
					},
					onKeyup(e) {
						e.keyCode === 13 && (T.value = "Years");
					}
				})
			}, [W.value]))]), _("div", { class: "q-date__header-title relative-position flex no-wrap" }, [_("div", { class: "relative-position col" }, [_(a, { name: "q-transition--fade" }, () => _("div", {
				key: "h-sub" + te.value,
				class: "q-date__header-title-label q-date__header-link " + (T.value === "Calendar" ? "q-date__header-link--active" : "cursor-pointer"),
				tabindex: l.value,
				...c("vC", {
					onClick() {
						T.value = "Calendar";
					},
					onKeyup(e) {
						e.keyCode === 13 && (T.value = "Calendar");
					}
				})
			}, [te.value]))]), e.todayBtn ? _(Vp, {
				class: "q-date__header-today self-start",
				icon: i.iconSet.datetime.today,
				"aria-label": i.lang.date.today,
				flat: !0,
				size: "sm",
				round: !0,
				tabindex: l.value,
				onClick: ye
			}) : null])]);
		}
		function He({ label: e, type: t, key: n, dir: r, goTo: o, boundaries: s, cls: u }) {
			return [
				_("div", { class: "row items-center q-date__arrow" }, [_(Vp, {
					round: !0,
					dense: !0,
					size: "sm",
					flat: !0,
					icon: ne.value[0],
					"aria-label": t === "Years" ? i.lang.date.prevYear : i.lang.date.prevMonth,
					tabindex: l.value,
					disable: !s.prev,
					...c("go-#" + t, { onClick() {
						o(-1);
					} })
				})]),
				_("div", { class: "relative-position overflow-hidden flex flex-center" + u }, [_(a, { name: "q-transition--jump-" + r }, () => _("div", { key: n }, [_(Vp, {
					flat: !0,
					dense: !0,
					noCaps: !0,
					label: e,
					tabindex: l.value,
					...c("view#" + t, { onClick: () => {
						T.value = t;
					} })
				})]))]),
				_("div", { class: "row items-center q-date__arrow" }, [_(Vp, {
					round: !0,
					dense: !0,
					size: "sm",
					flat: !0,
					icon: ne.value[1],
					"aria-label": t === "Years" ? i.lang.date.nextYear : i.lang.date.nextMonth,
					tabindex: l.value,
					disable: !s.next,
					...c("go+#" + t, { onClick() {
						o(1);
					} })
				})])
			];
		}
		let Ue = {
			Calendar: () => [_("div", {
				key: "calendar-view",
				class: "q-date__view q-date__calendar"
			}, [
				_("div", { class: "q-date__navigation row items-center no-wrap" }, [...He({
					label: y.value.months[C.value.month - 1],
					type: "Months",
					key: C.value.month,
					dir: D.value,
					goTo: Oe,
					boundaries: ce.value.month,
					cls: " col"
				}), ...He({
					label: C.value.year,
					type: "Years",
					key: C.value.year,
					dir: O.value,
					goTo: ke,
					boundaries: ce.value.year,
					cls: ""
				})]),
				_("div", { class: "q-date__calendar-weekdays row items-center no-wrap" }, ie.value.map((e) => _("div", { class: "q-date__calendar-item" }, [_("div", e)]))),
				_("div", { class: "q-date__calendar-days-container relative-position overflow-hidden" }, [_(a, { name: "q-transition--slide-" + D.value }, () => _("div", {
					key: fe.value,
					class: "q-date__calendar-days fit"
				}, ge.value.map((e) => _("div", { class: e.classes }, [e.in ? _(Vp, {
					class: e.today ? "q-date__today" : "",
					dense: !0,
					flat: e.flat,
					unelevated: e.unelevated,
					color: e.color,
					textColor: e.textColor,
					label: e.i,
					tabindex: l.value,
					...c("day#" + e.i, {
						onClick: () => {
							We(e.i);
						},
						onMouseover: () => {
							Ge(e.i);
						}
					})
				}, e.event ? () => _("div", { class: "q-date__event bg-" + e.event }) : null) : _("div", String(e.i))]))))])
			])],
			Months() {
				let t = C.value.year === S.value.year, n = (e) => oe.value !== null && C.value.year === oe.value.year && oe.value.month > e || se.value !== null && C.value.year === se.value.year && se.value.month < e, r = y.value.monthsShort.map((e, r) => {
					let i = C.value.month === r + 1;
					return _("div", { class: "q-date__months-item flex flex-center" }, [_(Vp, {
						class: t && S.value.month === r + 1 ? "q-date__today" : null,
						flat: !i,
						label: e,
						unelevated: i,
						color: i ? N.value : null,
						textColor: i ? P.value : null,
						tabindex: l.value,
						disable: n(r + 1),
						...c("month#" + r, { onClick: () => {
							je(r + 1);
						} })
					})]);
				});
				return e.yearsInMonthView && r.unshift(_("div", { class: "row no-wrap full-width" }, [He({
					label: C.value.year,
					type: "Years",
					key: C.value.year,
					dir: O.value,
					goTo: ke,
					boundaries: ce.value.year,
					cls: " col"
				})])), _("div", {
					key: "months-view",
					class: "q-date__view q-date__months flex flex-center"
				}, r);
			},
			Years() {
				let e = A.value, t = e + bv, n = [], r = (e) => oe.value !== null && oe.value.year > e || se.value !== null && se.value.year < e;
				for (let i = e; i <= t; i++) {
					let e = C.value.year === i;
					n.push(_("div", { class: "q-date__years-item flex flex-center" }, [_(Vp, {
						key: "yr" + i,
						class: S.value.year === i ? "q-date__today" : null,
						flat: !e,
						label: i,
						dense: !0,
						unelevated: e,
						color: e ? N.value : null,
						textColor: e ? P.value : null,
						tabindex: l.value,
						disable: r(i),
						...c("yr#" + i, { onClick: () => {
							Ae(i);
						} })
					})]));
				}
				return _("div", { class: "q-date__view q-date__years flex flex-center" }, [
					_("div", { class: "col-auto" }, [_(Vp, {
						round: !0,
						dense: !0,
						flat: !0,
						icon: ne.value[0],
						"aria-label": i.lang.date.prevRangeYears(bv),
						tabindex: l.value,
						disable: r(e),
						...c("y-", { onClick: () => {
							A.value -= bv;
						} })
					})]),
					_("div", { class: "q-date__years-content col self-stretch row items-center" }, n),
					_("div", { class: "col-auto" }, [_(Vp, {
						round: !0,
						dense: !0,
						flat: !0,
						icon: ne.value[1],
						"aria-label": i.lang.date.nextRangeYears(bv),
						tabindex: l.value,
						disable: r(t),
						...c("y+", { onClick: () => {
							A.value += bv;
						} })
					})])
				]);
			}
		};
		function We(t) {
			let r = {
				...C.value,
				day: t
			};
			if (!e.range) {
				Me(r, fe.value);
				return;
			}
			if (j.value === null) {
				let i = ge.value.find((e) => !e.fill && e.i === t);
				if (!e.noUnset && i.range !== void 0) {
					ze({
						target: r,
						from: i.range.from,
						to: i.range.to
					});
					return;
				}
				if (i.selected) {
					ze(r);
					return;
				}
				let a = A_(r);
				j.value = {
					init: r,
					initHash: a,
					final: r,
					finalHash: a
				}, n("rangeStart", Dv(r));
			} else {
				let e = j.value.initHash, t = A_(r), i = e <= t ? {
					from: j.value.init,
					to: r
				} : {
					from: r,
					to: j.value.init
				};
				j.value = null, Re(e === t ? r : {
					target: r,
					...i
				}), n("rangeEnd", {
					from: Dv(i.from),
					to: Dv(i.to)
				});
			}
		}
		function Ge(e) {
			if (j.value !== null) {
				let t = {
					...C.value,
					day: e
				};
				Object.assign(j.value, {
					final: t,
					finalHash: A_(t)
				});
			}
		}
		return Object.assign(r, {
			setToday: ye,
			setView: be,
			offsetCalendar: xe,
			setCalendarTo: Se,
			setEditingRange: Ce
		}), () => {
			let n = [_("div", { class: "q-date__content col relative-position" }, [_(a, { name: "q-transition--fade" }, Ue[T.value])])], r = $(t.default);
			return r !== void 0 && n.push(_("div", { class: "q-date__actions" }, r)), e.name !== void 0 && !e.disable && m(n, "push"), _("div", {
				class: M.value,
				..._e.value
			}, [Ve(), _("div", {
				ref: g,
				class: "q-date__main col column",
				tabindex: -1
			}, n)]);
		};
	}
});
function Ov(e, t, n) {
	let r;
	function i() {
		r !== void 0 && (zd.remove(r), r = void 0);
	}
	return D(() => {
		e.value && i();
	}), {
		removeFromHistory: i,
		addToHistory() {
			r = {
				condition: () => n.value,
				handler: t
			}, zd.add(r);
		}
	};
}
var kv = 0, Av, jv, Mv, Nv = !1, Pv, Fv, Iv, Lv = null;
function Rv(e) {
	e.target === document && (document.scrollingElement.scrollTop = document.scrollingElement.scrollTop);
}
function zv(e) {
	Nv || (Nv = !0, requestAnimationFrame(() => {
		Nv = !1;
		let { height: t } = e.target, { clientHeight: n, scrollTop: r } = document.scrollingElement;
		(Mv === void 0 || t !== window.innerHeight) && (Mv = n - t, document.scrollingElement.scrollTop = r), r > Mv && (document.scrollingElement.scrollTop -= Math.ceil((r - Mv) / 8));
	}));
}
function Bv(e) {
	let t = document.body, n = window.visualViewport !== void 0;
	if (e === "add") {
		let { overflowY: e, overflowX: r } = window.getComputedStyle(t);
		Av = Dm(window), jv = Em(window), Pv = t.style.left, Fv = t.style.top, Iv = window.location.href, t.style.left = `-${Av}px`, t.style.top = `-${jv}px`, r !== "hidden" && (r === "scroll" || t.scrollWidth > window.innerWidth) && t.classList.add("q-body--force-scrollbar-x"), e !== "hidden" && (e === "scroll" || t.scrollHeight > window.innerHeight) && t.classList.add("q-body--force-scrollbar-y"), document.documentElement.classList.add("q-document--prevent-scroll"), document.qScrollPrevented = !0, md.is.ios && (n ? (window.scrollTo(0, 0), window.visualViewport.addEventListener("resize", zv, vd.passiveCapture), window.visualViewport.addEventListener("scroll", zv, vd.passiveCapture), window.scrollTo(0, 0)) : window.addEventListener("scroll", Rv, vd.passiveCapture));
	} else md.is.ios && (n ? (window.visualViewport.removeEventListener("resize", zv, vd.passiveCapture), window.visualViewport.removeEventListener("scroll", zv, vd.passiveCapture)) : window.removeEventListener("scroll", Rv, vd.passiveCapture)), document.documentElement.classList.remove("q-document--prevent-scroll"), t.classList.remove("q-body--force-scrollbar-x", "q-body--force-scrollbar-y"), document.qScrollPrevented = !1, t.style.left = Pv, t.style.top = Fv, window.location.href === Iv && window.scrollTo(Av, jv), Mv = void 0;
}
function Vv(e) {
	let t = "add";
	if (e === !0) {
		if (kv++, Lv !== null) {
			clearTimeout(Lv), Lv = null;
			return;
		}
		if (kv > 1) return;
	} else {
		if (kv === 0 || (kv--, kv > 0)) return;
		if (t = "remove", md.is.ios && md.is.nativeMobile) {
			Lv !== null && clearTimeout(Lv), Lv = setTimeout(() => {
				Bv(t), Lv = null;
			}, 100);
			return;
		}
	}
	Bv(t);
}
function Hv() {
	let e;
	return { preventBodyScroll(t) {
		t !== e && (e !== void 0 || t) && (e = t, Vv(t));
	} };
}
var Uv = 0, Wv = {
	standard: "fixed-full flex-center",
	top: "fixed-top justify-center",
	bottom: "fixed-bottom justify-center",
	right: "fixed-right items-center",
	left: "fixed-left items-center"
}, Gv = {
	standard: ["scale", "scale"],
	top: ["slide-down", "slide-up"],
	bottom: ["slide-up", "slide-down"],
	right: ["slide-left", "slide-right"],
	left: ["slide-right", "slide-left"]
}, Kv = Q({
	name: "QDialog",
	inheritAttrs: !1,
	props: {
		...Jp,
		...vm,
		transitionShow: String,
		transitionHide: String,
		persistent: Boolean,
		autoClose: Boolean,
		allowFocusOutside: Boolean,
		noEscDismiss: Boolean,
		noBackdropDismiss: Boolean,
		noRouteDismiss: Boolean,
		noRefocus: Boolean,
		noFocus: Boolean,
		noShake: Boolean,
		seamless: Boolean,
		maximized: Boolean,
		fullWidth: Boolean,
		fullHeight: Boolean,
		square: Boolean,
		backdropFilter: String,
		position: {
			type: String,
			default: "standard",
			validator: (e) => [
				"standard",
				"top",
				"bottom",
				"left",
				"right"
			].includes(e)
		}
	},
	emits: [
		...Yp,
		"shake",
		"click",
		"escapeKey"
	],
	setup(e, { slots: t, emit: n, attrs: r }) {
		let i = h(), s = L(null), c = L(!1), l = L(!1), u = null, d = null, f = !1, p = !1, m = o(() => !e.persistent && !e.noRouteDismiss && !e.seamless), { preventBodyScroll: g } = Hv(), { registerTimeout: v } = xm(), { registerTick: y, removeTick: b } = bm(), { transitionProps: x, transitionStyle: S } = ym(e, () => Gv[e.position][0], () => Gv[e.position][1]), C = o(() => S.value + (e.backdropFilter === void 0 ? "" : `;backdrop-filter:${e.backdropFilter};-webkit-backdrop-filter:${e.backdropFilter}`)), { showPortal: w, hidePortal: T, portalIsAccessible: E, renderPortal: O } = _m(i, s, ne, "dialog"), { hide: k } = Xp({
			showing: c,
			hideOnRouteChange: m,
			handleShow: I,
			handleHide: R,
			processOnMount: !0
		}), { addToHistory: A, removeFromHistory: j } = Ov(c, k, m), M = o(() => `q-dialog__inner flex no-pointer-events q-dialog__inner--${e.maximized ? "maximized" : "minimized"} q-dialog__inner--${e.position} ${Wv[e.position]}` + (l.value ? " q-dialog__inner--animating" : "") + (e.fullWidth ? " q-dialog__inner--fullwidth" : "") + (e.fullHeight ? " q-dialog__inner--fullheight" : "") + (e.square ? " q-dialog__inner--square" : "")), N = o(() => c.value && !e.seamless), P = o(() => e.autoClose ? { onClick: H } : {}), F = o(() => [`q-dialog fullscreen no-pointer-events q-dialog--${N.value ? "modal" : "seamless"}`, r.class]);
		G(() => e.maximized, (e) => {
			c.value && te(e);
		}), G(N, (e) => {
			g(e), e ? (Km(W), Hm(V)) : (qm(W), Um(V));
		});
		function I(t) {
			A(), d = !e.noRefocus && document.activeElement !== null ? document.activeElement : null, te(e.maximized), w(), l.value = !0, e.noFocus ? b() : (document.activeElement?.blur(), y(z)), v(() => {
				if (i.proxy.$q.platform.is.ios) {
					if (!e.seamless && document.activeElement) {
						let { top: e, bottom: t } = document.activeElement.getBoundingClientRect(), { innerHeight: n } = window, r = window.visualViewport === void 0 ? n : window.visualViewport.height;
						e > 0 && t > r / 2 && (document.scrollingElement.scrollTop = Math.min(document.scrollingElement.scrollHeight - r, t >= n ? Infinity : Math.ceil(document.scrollingElement.scrollTop + t - r / 2))), document.activeElement.scrollIntoView();
					}
					p = !0, s.value.click(), p = !1;
				}
				w(!0), l.value = !1, n("show", t);
			}, e.transitionDuration);
		}
		function R(t) {
			b(), j(), ee(!0), l.value = !0, T(), d !== null && (((t?.type.indexOf("key") === 0 ? d.closest("[tabindex]:not([tabindex^=\"-\"])") : void 0) || d).focus(), d = null), v(() => {
				T(!0), l.value = !1, n("hide", t);
			}, e.transitionDuration);
		}
		function z(e) {
			om(() => {
				let t = s.value;
				if (t !== null) {
					if (e !== void 0) {
						let n = t.querySelector(e);
						if (n !== null) {
							n.focus({ preventScroll: !0 });
							return;
						}
					}
					t.contains(document.activeElement) || (t = t.querySelector("[autofocus][tabindex], [data-autofocus][tabindex]") || t.querySelector("[autofocus] [tabindex], [data-autofocus] [tabindex]") || t.querySelector("[autofocus], [data-autofocus]") || t, t.focus({ preventScroll: !0 }));
				}
			});
		}
		function B(e) {
			e && typeof e.focus == "function" ? e.focus({ preventScroll: !0 }) : z(), n("shake");
			let t = s.value;
			t !== null && (t.classList.remove("q-animate--scale"), t.classList.add("q-animate--scale"), u !== null && clearTimeout(u), u = setTimeout(() => {
				u = null, s.value !== null && (t.classList.remove("q-animate--scale"), z());
			}, 170));
		}
		function V() {
			e.seamless || (e.persistent || e.noEscDismiss ? !e.maximized && !e.noShake && B() : (n("escapeKey"), k()));
		}
		function ee(t) {
			u !== null && (clearTimeout(u), u = null), (t || c.value) && (te(!1), e.seamless || (g(!1), qm(W), Um(V))), t || (d = null);
		}
		function te(e) {
			e ? f ||= (Uv < 1 && document.body.classList.add("q-body--dialog"), Uv++, !0) : f &&= (Uv < 2 && document.body.classList.remove("q-body--dialog"), Uv--, !1);
		}
		function H(e) {
			p || (k(e), n("click", e));
		}
		function U(t) {
			!e.persistent && !e.noBackdropDismiss ? k(t) : e.noShake || B();
		}
		function W(t) {
			!e.allowFocusOutside && E.value && !xp(s.value, t.target) && z("[tabindex]:not([tabindex=\"-1\"])");
		}
		Object.assign(i.proxy, {
			focus: z,
			shake: B,
			__updateRefocusTarget(e) {
				d = e || null;
			}
		}), D(ee);
		function ne() {
			return _("div", {
				role: "dialog",
				"aria-modal": N.value ? "true" : "false",
				...r,
				class: F.value
			}, [_(a, {
				name: "q-transition--fade",
				appear: !0
			}, () => N.value ? _("div", {
				class: "q-dialog__backdrop fixed-full",
				style: C.value,
				"aria-hidden": "true",
				onClick: U
			}) : null), _(a, x.value, () => c.value ? _("div", {
				ref: s,
				class: M.value,
				style: S.value,
				tabindex: -1,
				...P.value
			}, $(t.default)) : null)]);
		}
		return O;
	}
}), qv = 150;
function Jv(e, t) {
	e.value !== t && (e.value = t);
}
Q({
	name: "QDrawer",
	inheritAttrs: !1,
	props: {
		...Jp,
		...qf,
		side: {
			type: String,
			default: "left",
			validator: (e) => ["left", "right"].includes(e)
		},
		width: {
			type: Number,
			default: 300
		},
		mini: Boolean,
		miniToOverlay: Boolean,
		miniWidth: {
			type: Number,
			default: 57
		},
		noMiniAnimation: Boolean,
		breakpoint: {
			type: Number,
			default: 1023
		},
		showIfAbove: Boolean,
		behavior: {
			type: String,
			validator: (e) => [
				"default",
				"desktop",
				"mobile"
			].includes(e),
			default: "default"
		},
		bordered: Boolean,
		elevated: Boolean,
		overlay: Boolean,
		persistent: Boolean,
		noSwipeOpen: Boolean,
		noSwipeClose: Boolean,
		noSwipeBackdrop: Boolean
	},
	emits: [
		...Yp,
		"onLayout",
		"miniState"
	],
	setup(e, { slots: t, emit: n, attrs: r }) {
		let i = h(), { proxy: { $q: a } } = i, s = Jf(e, a), { preventBodyScroll: c } = Hv(), { registerTimeout: l, removeTimeout: u } = xm(), d = y(qd, $d);
		if (d === $d) return console.error("QDrawer needs to be child of QLayout"), $d;
		let f, p = null, m, g = L(e.behavior === "mobile" || e.behavior !== "desktop" && d.totalWidth.value <= e.breakpoint), v = o(() => e.mini && !g.value), b = o(() => v.value ? e.miniWidth : e.width), x = o(() => e.overlay || e.miniToOverlay || d.view.value.includes(I.value ? "R" : "L") || a.platform.is.ios && d.isContainer.value), S = L(e.showIfAbove && !g.value || e.modelValue === !0), C = o(() => !e.overlay && S.value && !g.value), T = o(() => e.overlay && S.value && !g.value), E = o(() => !e.persistent && (g.value || T.value));
		function O(e, t) {
			if (N(), e !== !1 && d.animate(), fe(0), g.value) {
				let e = d.instances[te.value];
				e?.belowBreakpoint === !0 && e.hide(!1), pe(1), d.isContainer.value || c(!0);
			} else pe(0), e !== !1 && me(!1);
			l(() => {
				e !== !1 && me(!0), t || n("show", e);
			}, qv);
		}
		function k(e, t) {
			P(), e !== !1 && d.animate(), pe(0), fe(R.value * b.value), ve(), t ? u() : l(() => {
				n("hide", e);
			}, qv);
		}
		let { show: j, hide: M } = Xp({
			showing: S,
			hideOnRouteChange: E,
			handleShow: O,
			handleHide: k
		}), { addToHistory: N, removeFromHistory: P } = Ov(S, M, E), F = {
			belowBreakpoint: g,
			hide: M
		}, I = o(() => e.side === "right"), R = o(() => (a.lang.rtl ? -1 : 1) * (I.value ? 1 : -1)), z = L(0), B = L(!1), V = L(!1), ee = L(b.value * R.value), te = o(() => I.value ? "left" : "right"), H = o(() => S.value && !g.value && !e.overlay ? e.miniToOverlay ? e.miniWidth : b.value : 0), U = o(() => "fullscreen q-drawer__backdrop" + (!S.value && !B.value ? " hidden" : "")), W = o(() => ({ backgroundColor: `rgba(0,0,0,${z.value * .4})` })), ne = o(() => I.value ? d.rows.value.top[2] === "r" : d.rows.value.top[0] === "l"), ie = o(() => I.value ? d.rows.value.bottom[2] === "r" : d.rows.value.bottom[0] === "l"), K = o(() => {
			let e = {};
			return d.header.space && !ne.value && (x.value ? e.top = `${d.header.offset}px` : d.header.space && (e.top = `${d.header.size}px`)), d.footer.space && !ie.value && (x.value ? e.bottom = `${d.footer.offset}px` : d.footer.space && (e.bottom = `${d.footer.size}px`)), e;
		}), ae = o(() => {
			let e = {
				width: `${b.value}px`,
				transform: `translateX(${ee.value}px)`
			};
			return g.value ? e : Object.assign(e, K.value);
		}), oe = o(() => "q-drawer__content fit " + (d.isContainer.value ? "overflow-auto" : "scroll")), se = o(() => `q-drawer q-drawer--${e.side}` + (V.value ? " q-drawer--mini-animate" : "") + (e.bordered ? " q-drawer--bordered" : "") + (s.value ? " q-drawer--dark q-dark" : "") + (B.value ? " no-transition" : S.value ? "" : " q-layout--prevent-focus") + (g.value ? " fixed q-drawer--on-top q-drawer--mobile q-drawer--top-padding" : ` q-drawer--${v.value ? "mini" : "standard"}` + (x.value || !C.value ? " fixed" : "") + (e.overlay || e.miniToOverlay ? " q-drawer--on-top" : "") + (ne.value ? " q-drawer--top-padding" : ""))), ce = o(() => [[
			gg,
			ge,
			void 0,
			{
				[a.lang.rtl ? e.side : te.value]: !0,
				mouse: !0
			}
		]]), le = o(() => [[
			gg,
			_e,
			void 0,
			{
				[a.lang.rtl ? te.value : e.side]: !0,
				mouse: !0
			}
		]]), ue = o(() => [[
			gg,
			_e,
			void 0,
			{
				[a.lang.rtl ? te.value : e.side]: !0,
				mouse: !0,
				mouseAllDir: !0
			}
		]]);
		function de() {
			Jv(g, e.behavior === "mobile" || e.behavior !== "desktop" && d.totalWidth.value <= e.breakpoint);
		}
		G(g, (t) => {
			t ? (f = S.value, S.value && M(!1)) : !e.overlay && e.behavior !== "mobile" && f !== !1 && (S.value ? (fe(0), pe(0), ve()) : j(!1));
		}), G(() => e.side, (e, t) => {
			d.instances[t] === F && (d.instances[t] = void 0, d[t].space = !1, d[t].offset = 0), d.instances[e] = F, d[e].size = b.value, d[e].space = C.value, d[e].offset = H.value;
		}), G(d.totalWidth, () => {
			(d.isContainer.value || !document.qScrollPrevented) && de();
		}), G(() => e.behavior + e.breakpoint, de), G(d.isContainer, (e) => {
			S.value && c(!e), e && de();
		}), G(d.scrollbarWidth, () => {
			fe(S.value ? 0 : void 0);
		}), G(H, (e) => {
			ye("offset", e);
		}), G(C, (e) => {
			n("onLayout", e), ye("space", e);
		}), G(I, () => {
			fe();
		}), G(b, (t) => {
			fe(), be(e.miniToOverlay, t);
		}), G(() => e.miniToOverlay, (e) => {
			be(e, b.value);
		}), G(() => a.lang.rtl, () => {
			fe();
		}), G(() => e.mini, () => {
			e.noMiniAnimation || e.modelValue && (he(), d.animate());
		}), G(v, (e) => {
			n("miniState", e);
		});
		function fe(e) {
			e === void 0 ? w(() => {
				e = S.value ? 0 : b.value, fe(R.value * e);
			}) : (d.isContainer.value && I.value && (g.value || Math.abs(e) === b.value) && (e += R.value * d.scrollbarWidth.value), ee.value = e);
		}
		function pe(e) {
			z.value = e;
		}
		function me(e) {
			let t = e ? "remove" : d.isContainer.value ? "" : "add";
			t !== "" && document.body.classList[t]("q-body--drawer-toggle");
		}
		function he() {
			p !== null && clearTimeout(p), i.proxy && i.proxy.$el && i.proxy.$el.classList.add("q-drawer--mini-animate"), V.value = !0, p = setTimeout(() => {
				p = null, V.value = !1, i?.proxy?.$el?.classList.remove("q-drawer--mini-animate");
			}, 150);
		}
		function ge(e) {
			if (S.value) return;
			let t = b.value, n = df(e.distance.x, 0, t);
			if (e.isFinal) {
				n >= Math.min(75, t) ? j() : (d.animate(), pe(0), fe(R.value * t)), B.value = !1;
				return;
			}
			fe((a.lang.rtl ? !I.value : I.value) ? Math.max(t - n, 0) : Math.min(0, n - t)), pe(df(n / t, 0, 1)), e.isFirst && (B.value = !0);
		}
		function _e(t) {
			if (!S.value) return;
			let n = b.value, r = t.direction === e.side, i = (a.lang.rtl ? !r : r) ? df(t.distance.x, 0, n) : 0;
			if (t.isFinal) {
				Math.abs(i) < Math.min(75, n) ? (d.animate(), pe(1), fe(0)) : M(), B.value = !1;
				return;
			}
			fe(R.value * i), pe(df(1 - i / n, 0, 1)), t.isFirst && (B.value = !0);
		}
		function ve() {
			c(!1), me(!0);
		}
		function ye(t, n) {
			d.update(e.side, t, n);
		}
		function be(t, n) {
			ye("size", t ? e.miniWidth : n);
		}
		return d.instances[e.side] = F, be(e.miniToOverlay, b.value), ye("space", C.value), ye("offset", H.value), e.showIfAbove && !e.modelValue && S.value && e["onUpdate:modelValue"] !== void 0 && n("update:modelValue", !0), A(() => {
			n("onLayout", C.value), n("miniState", v.value), f = e.showIfAbove;
			let t = () => {
				(S.value ? O : k)(!1, !0);
			};
			if (d.totalWidth.value !== 0) {
				w(t);
				return;
			}
			m = G(d.totalWidth, () => {
				m(), m = void 0, !S.value && e.showIfAbove && !g.value ? j(!1) : t();
			});
		}), D(() => {
			m?.(), p !== null && (clearTimeout(p), p = null), S.value && ve(), d.instances[e.side] === F && (d.instances[e.side] = void 0, ye("size", 0), ye("offset", 0), ye("space", !1));
		}), () => {
			let n = [];
			g.value && (e.noSwipeOpen || n.push(re(_("div", {
				key: "open",
				class: `q-drawer__opener fixed-${e.side}`,
				"aria-hidden": "true"
			}), ce.value)), n.push(Af("div", {
				ref: "backdrop",
				class: U.value,
				style: W.value,
				"aria-hidden": "true",
				onClick: M
			}, void 0, "backdrop", !e.noSwipeBackdrop && S.value, () => ue.value)));
			let i = v.value && t.mini !== void 0, a = [_("div", {
				...r,
				key: String(i),
				class: [oe.value, r.class]
			}, i ? t.mini() : $(t.default))];
			return e.elevated && S.value && a.push(_("div", { class: "q-layout__shadow absolute-full overflow-hidden no-pointer-events" })), n.push(Af("aside", {
				ref: "content",
				class: se.value,
				style: ae.value
			}, a, "contentclose", !e.noSwipeClose && g.value, () => le.value)), _("div", { class: "q-drawer-container" }, n);
		};
	}
});
var Yv = [
	"div",
	"li",
	"ul",
	"ol",
	"blockquote"
];
function Xv(e, t) {
	if (t && e === t) return null;
	let n = e.nodeName.toLowerCase();
	if (Yv.includes(n)) return e;
	let r = (window.getComputedStyle ? window.getComputedStyle(e) : e.currentStyle).display;
	return r === "block" || r === "table" ? e : Xv(e.parentNode);
}
function Zv(e, t, n) {
	return !e || e === document.body ? !1 : n && e === t || (t === document ? document.body : t).contains(e.parentNode);
}
function Qv(e, t, n) {
	if (n || (n = document.createRange(), n.selectNode(e), n.setStart(e, 0)), t.count === 0) n.setEnd(e, t.count);
	else if (t.count > 0) if (e.nodeType === Node.TEXT_NODE) e.textContent.length < t.count ? t.count -= e.textContent.length : (n.setEnd(e, t.count), t.count = 0);
	else for (let r = 0; t.count !== 0 && r < e.childNodes.length; r++) n = Qv(e.childNodes[r], t, n);
	return n;
}
var $v = /^https?:\/\//, ey = class {
	constructor(e, t) {
		this.el = e, this.eVm = t, this._range = null;
	}
	get selection() {
		if (this.el) {
			let e = document.getSelection();
			if (Zv(e.anchorNode, this.el, !0) && Zv(e.focusNode, this.el, !0)) return e;
		}
		return null;
	}
	get hasSelection() {
		return this.selection !== null && this.selection.toString().length !== 0;
	}
	get range() {
		let e = this.selection;
		return e?.rangeCount ? e.getRangeAt(0) : this._range;
	}
	get parent() {
		let e = this.range;
		if (e !== null) {
			let t = e.startContainer;
			return t.nodeType === document.ELEMENT_NODE ? t : t.parentNode;
		}
		return null;
	}
	get blockParent() {
		let e = this.parent;
		return e === null ? null : Xv(e, this.el);
	}
	save(e = this.range) {
		e !== null && (this._range = e);
	}
	restore(e = this._range) {
		let t = document.createRange(), n = document.getSelection();
		e === null ? (n.selectAllChildren(this.el), n.collapseToEnd()) : (t.setStart(e.startContainer, e.startOffset), t.setEnd(e.endContainer, e.endOffset), n.removeAllRanges(), n.addRange(t));
	}
	savePosition() {
		let e = -1, t, n = document.getSelection(), r = this.el.parentNode;
		if (n.focusNode && Zv(n.focusNode, r)) for (t = n.focusNode, e = n.focusOffset; t && t !== r;) t !== this.el && t.previousSibling ? (t = t.previousSibling, e += t.textContent.length) : t = t.parentNode;
		this.savedPos = e;
	}
	restorePosition(e = 0) {
		if (this.savedPos > 0 && this.savedPos < e) {
			let e = window.getSelection(), t = Qv(this.el, { count: this.savedPos });
			t && (t.collapse(!1), e.removeAllRanges(), e.addRange(t));
		}
	}
	hasParent(e, t) {
		let n = t ? this.parent : this.blockParent;
		return n !== null && n.nodeName.toLowerCase() === e.toLowerCase();
	}
	hasParents(e, t, n = this.parent) {
		return n === null ? !1 : e.includes(n.nodeName.toLowerCase()) ? !0 : t ? this.hasParents(e, t, n.parentNode) : !1;
	}
	is(e, t) {
		if (this.selection === null) return !1;
		switch (e) {
			case "formatBlock": return t === "DIV" && this.parent === this.el || this.hasParent(t, t === "PRE");
			case "link": return this.hasParent("A", !0);
			case "fontSize": return document.queryCommandValue(e) === t;
			case "fontName": {
				let n = document.queryCommandValue(e);
				return n === `"${t}"` || n === t;
			}
			case "fullscreen": return this.eVm.inFullscreen.value;
			case "viewsource": return this.eVm.isViewingSource.value;
			case void 0: return !1;
			default: {
				let n = document.queryCommandState(e);
				return t === void 0 ? n : n === t;
			}
		}
	}
	getParentAttribute(e) {
		return this.parent === null ? null : this.parent.getAttribute(e);
	}
	can(e) {
		if (e === "outdent") return this.hasParents(["blockquote", "li"], !0);
		if (e === "indent") return this.hasParents(["li"], !0);
		if (e === "link") return this.selection !== null || this.is("link");
	}
	apply(e, t, n = yd) {
		if (e === "formatBlock") [
			"BLOCKQUOTE",
			"H1",
			"H2",
			"H3",
			"H4",
			"H5",
			"H6"
		].includes(t) && this.is(e, t) && (e = "outdent", t = null), t === "PRE" && this.is(e, "PRE") && (t = "P");
		else if (e === "print") {
			n();
			let e = window.open();
			e.document.write(`
        <!doctype html>
        <html>
          <head>
            <title>Print - ${document.title}</title>
          </head>
          <body>
            <div>${this.el.innerHTML}</div>
          </body>
        </html>
      `), e.print(), e.close();
			return;
		} else if (e === "link") {
			let e = this.getParentAttribute("href");
			if (e === null) {
				let e = this.selectWord(this.selection), t = e ? e.toString() : "";
				if (t.length === 0 && (!this.range || !this.range.cloneContents().querySelector("img"))) return;
				this.eVm.editLinkUrl.value = $v.test(t) ? t : "https://", this.save(e.getRangeAt(0)), document.execCommand("createLink", !1, this.eVm.editLinkUrl.value);
			} else this.eVm.editLinkUrl.value = e, this.range.selectNodeContents(this.parent), this.save();
			return;
		} else if (e === "fullscreen") {
			this.eVm.toggleFullscreen(), n();
			return;
		} else if (e === "viewsource") {
			this.eVm.isViewingSource.value = !this.eVm.isViewingSource.value, this.eVm.setContent(this.eVm.props.modelValue), n();
			return;
		}
		document.execCommand(e, !1, t), n();
	}
	selectWord(e) {
		if (e === null || !e.isCollapsed) return e;
		let t = document.createRange();
		t.setStart(e.anchorNode, e.anchorOffset), t.setEnd(e.focusNode, e.focusOffset);
		let n = t.collapsed ? ["backward", "forward"] : ["forward", "backward"];
		t.detach();
		let r = e.focusNode, i = e.focusOffset;
		return e.collapse(e.anchorNode, e.anchorOffset), e.modify("move", n[0], "character"), e.modify("move", n[1], "word"), e.extend(r, i), e.modify("extend", n[1], "character"), e.modify("extend", n[0], "word"), e;
	}
}, ty = Q({
	name: "QTooltip",
	inheritAttrs: !1,
	props: {
		...Wp,
		...Jp,
		...vm,
		maxHeight: {
			type: String,
			default: null
		},
		maxWidth: {
			type: String,
			default: null
		},
		transitionShow: {
			...vm.transitionShow,
			default: "jump-down"
		},
		transitionHide: {
			...vm.transitionHide,
			default: "jump-up"
		},
		anchor: {
			type: String,
			default: "bottom middle",
			validator: ih
		},
		self: {
			type: String,
			default: "top middle",
			validator: ih
		},
		offset: {
			type: Array,
			default: () => [14, 14],
			validator: ah
		},
		scrollTarget: Sm,
		delay: {
			type: Number,
			default: 0
		},
		hideDelay: {
			type: Number,
			default: 0
		},
		persistent: Boolean
	},
	emits: [...Yp],
	setup(e, { slots: t, emit: n, attrs: r }) {
		let i, s, c = h(), { proxy: { $q: l } } = c, u = L(null), d = L(!1), f = o(() => sh(e.anchor, l.lang.rtl)), p = o(() => sh(e.self, l.lang.rtl)), m = o(() => !e.persistent), { registerTick: g, removeTick: v } = bm(), { registerTimeout: y } = xm(), { transitionProps: b, transitionStyle: x } = ym(e), { localScrollTarget: S, changeScrollEvent: C, unconfigureScrollTarget: w } = qp(e, ee), { anchorEl: T, canShow: E, anchorEvents: O } = Kp({
			showing: d,
			configureAnchorEl: V
		}), { show: k, hide: A } = Xp({
			showing: d,
			canShow: E,
			handleShow: P,
			handleHide: F,
			hideOnRouteChange: m,
			processOnMount: !0
		});
		Object.assign(O, {
			delayShow: z,
			delayHide: B
		});
		let { showPortal: j, hidePortal: M, renderPortal: N } = _m(c, u, H, "tooltip");
		if (l.platform.is.mobile) {
			let t = {
				anchorEl: T,
				innerRef: u,
				onClickOutside(e) {
					return A(e), e.target.classList.contains("q-dialog__backdrop") && wd(e), !0;
				}
			};
			G(o(() => e.modelValue === null && !e.persistent && d.value), (e) => {
				(e ? Qm : $m)(t);
			}), D(() => {
				$m(t);
			});
		}
		function P(t) {
			j(), g(() => {
				if (s?.disconnect(), u.value === null) {
					s = void 0;
					return;
				}
				s = new MutationObserver(() => R()), s.observe(u.value, {
					attributes: !1,
					childList: !0,
					characterData: !0,
					subtree: !0
				}), R(), ee();
			}), i === void 0 && (i = G(() => l.screen.width + "|" + l.screen.height + "|" + e.self + "|" + e.anchor + "|" + l.lang.rtl, R)), y(() => {
				j(!0), n("show", t);
			}, e.transitionDuration);
		}
		function F(t) {
			v(), M(), I(), y(() => {
				M(!0), n("hide", t);
			}, e.transitionDuration);
		}
		function I() {
			s !== void 0 && (s.disconnect(), s = void 0), i !== void 0 && (i(), i = void 0), w(), Dd(O, "tooltipTemp");
		}
		function R() {
			fh({
				targetEl: u.value,
				offset: e.offset,
				anchorEl: T.value,
				anchorOrigin: f.value,
				selfOrigin: p.value,
				maxHeight: e.maxHeight,
				maxWidth: e.maxWidth
			});
		}
		function z(t) {
			if (l.platform.is.mobile) {
				Up(), document.body.classList.add("non-selectable");
				let e = T.value, t = [
					"touchmove",
					"touchcancel",
					"touchend",
					"click"
				].map((t) => [
					e,
					t,
					"delayHide",
					"passiveCapture"
				]);
				Ed(O, "tooltipTemp", t);
			}
			y(() => {
				k(t);
			}, e.delay);
		}
		function B(t) {
			l.platform.is.mobile && (Dd(O, "tooltipTemp"), Up(), setTimeout(() => {
				document.body.classList.remove("non-selectable");
			}, 10)), y(() => {
				A(t);
			}, e.hideDelay);
		}
		function V() {
			if (e.noParentEvent || T.value === null) return;
			let t = l.platform.is.mobile ? [[
				T.value,
				"touchstart",
				"delayShow",
				"passive"
			]] : [[
				T.value,
				"mouseenter",
				"delayShow",
				"passive"
			], [
				T.value,
				"mouseleave",
				"delayHide",
				"passive"
			]];
			Ed(O, "anchor", t);
		}
		function ee() {
			if (T.value !== null || e.scrollTarget !== void 0) {
				S.value = wm(T.value, e.scrollTarget);
				let t = e.noParentEvent ? R : A;
				C(S.value, t);
			}
		}
		function te() {
			return d.value ? _("div", {
				...r,
				ref: u,
				class: ["q-tooltip q-tooltip--style q-position-engine no-pointer-events", r.class],
				style: [r.style, x.value],
				role: "tooltip"
			}, $(t.default)) : null;
		}
		function H() {
			return _(a, b.value, te);
		}
		return D(I), Object.assign(c.proxy, { updatePosition: R }), N;
	}
}), ny = Q({
	name: "QItem",
	props: {
		...qf,
		...fp,
		tag: {
			type: String,
			default: "div"
		},
		active: {
			type: Boolean,
			default: null
		},
		clickable: Boolean,
		dense: Boolean,
		insetLevel: Number,
		tabindex: [String, Number],
		focused: Boolean,
		manualFocus: Boolean
	},
	emits: ["click", "keyup"],
	setup(e, { slots: t, emit: n }) {
		let { proxy: { $q: r } } = h(), i = Jf(e, r), { hasLink: a, linkAttrs: s, linkClass: c, linkTag: l, navigateOnClick: u } = pp(), d = L(null), f = L(null), p = o(() => e.clickable || a.value || e.tag === "label"), m = o(() => !e.disable && p.value), g = o(() => "q-item q-item-type row no-wrap" + (e.dense ? " q-item--dense" : "") + (i.value ? " q-item--dark" : "") + (a.value && e.active === null ? c.value : e.active ? ` q-item--active${e.activeClass === void 0 ? "" : ` ${e.activeClass}`}` : "") + (e.disable ? " disabled" : "") + (m.value ? " q-item--clickable q-link cursor-pointer " + (e.manualFocus ? "q-manual-focusable" : "q-focusable q-hoverable") + (e.focused ? " q-manual-focusable--focused" : "") : "")), v = o(() => e.insetLevel === void 0 ? null : { ["padding" + (r.lang.rtl ? "Right" : "Left")]: 16 + e.insetLevel * 56 + "px" });
		function y(e) {
			m.value && (f.value !== null && !e.qAvoidFocus && (!e.qKeyEvent && document.activeElement === d.value ? f.value.focus() : document.activeElement === f.value && d.value.focus()), u(e));
		}
		function b(e) {
			if (m.value && Pd(e, [13, 32])) {
				wd(e), e.qKeyEvent = !0;
				let t = new MouseEvent("click", e);
				t.qKeyEvent = !0, d.value.dispatchEvent(t);
			}
			n("keyup", e);
		}
		function x() {
			let e = Df(t.default, []);
			return m.value && e.unshift(_("div", {
				class: "q-focus-helper",
				tabindex: -1,
				ref: f
			})), e;
		}
		return () => {
			let t = {
				ref: d,
				class: g.value,
				style: v.value,
				role: "listitem",
				onClick: y,
				onKeyup: b
			};
			return m.value ? (t.tabindex = e.tabindex || "0", Object.assign(t, s.value)) : p.value && (t["aria-disabled"] = "true"), _(l.value, t, x());
		};
	}
}), ry = Q({
	name: "QItemSection",
	props: {
		avatar: Boolean,
		thumbnail: Boolean,
		side: Boolean,
		top: Boolean,
		noWrap: Boolean
	},
	setup(e, { slots: t }) {
		let n = o(() => `q-item__section column q-item__section--${e.avatar || e.side || e.thumbnail ? "side" : "main"}` + (e.top ? " q-item__section--top justify-start" : " justify-center") + (e.avatar ? " q-item__section--avatar" : "") + (e.thumbnail ? " q-item__section--thumbnail" : "") + (e.noWrap ? " q-item__section--nowrap" : ""));
		return () => _("div", { class: n.value }, $(t.default));
	}
});
function iy(e, t, n) {
	t.handler ? t.handler(e, n, n.caret) : n.runCmd(t.cmd, t.param);
}
function ay(e) {
	return _("div", { class: "q-editor__toolbar-group" }, e);
}
function oy(e, t, n, r = !1) {
	let i = r || (t.type === "toggle" ? t.toggled ? t.toggled(e) : t.cmd && e.caret.is(t.cmd, t.param) : !1), a = [];
	if (e.$q.platform.is.desktop && (t.tip || t.htmlTip)) {
		let e = t.key ? _("div", [_("small", `(CTRL + ${String.fromCodePoint(t.key)})`)]) : null;
		a.push(_(ty, { delay: 1e3 }, () => [_("div", t.htmlTip ? { innerHTML: t.htmlTip } : t.tip), e]));
	}
	return _(Vp, {
		...e.buttonProps.value,
		icon: t.icon === null ? void 0 : t.icon,
		color: i ? t.toggleColor || e.props.toolbarToggleColor : t.color || e.props.toolbarColor,
		textColor: i && !e.props.toolbarPush ? null : t.textColor || e.props.toolbarTextColor,
		label: t.label,
		"aria-label": t.label === null ? t.tip : void 0,
		disable: t.disable ? typeof t.disable != "function" || t.disable(e) : !1,
		size: "sm",
		onClick(r) {
			n?.(), iy(r, t, e);
		}
	}, () => a);
}
function sy(e, t) {
	let n = t.list === "only-icons", r = t.label, i = t.icon === null ? void 0 : t.icon, a, o;
	function s() {
		l.component.proxy.hide();
	}
	if (n) o = t.options.map((t) => {
		let n = t.type === void 0 && e.caret.is(t.cmd, t.param);
		return n && (r = t.tip, i = t.icon === null ? void 0 : t.icon), oy(e, t, s, n);
	}), a = e.toolbarBackgroundClass.value, o = [ay(o)];
	else {
		let n = e.props.toolbarToggleColor === void 0 ? null : `text-${e.props.toolbarToggleColor}`, c = e.props.toolbarTextColor === void 0 ? null : `text-${e.props.toolbarTextColor}`, l = t.list === "no-icons";
		o = t.options.map((t) => {
			let a = t.disable ? t.disable(e) : !1, o = t.type === void 0 && e.caret.is(t.cmd, t.param);
			o && (r = t.tip, i = t.icon === null ? void 0 : t.icon);
			let u = t.htmlTip;
			return _(ny, {
				active: o,
				activeClass: n,
				clickable: !0,
				disable: a,
				dense: !0,
				onClick(n) {
					s(), n?.qAvoidFocus !== !0 && e.contentRef.value?.focus(), e.caret.restore(), iy(n, t, e);
				}
			}, () => [l ? null : _(ry, {
				class: o ? n : c,
				side: !0
			}, () => _(Gf, { name: t.icon === null ? void 0 : t.icon })), _(ry, u ? () => _("div", {
				class: "text-no-wrap",
				innerHTML: t.htmlTip
			}) : t.tip ? () => _("div", { class: "text-no-wrap" }, t.tip) : void 0)]);
		}), a = [e.toolbarBackgroundClass.value, c];
	}
	let c = t.highlight && r !== t.label, l = _(Sh, {
		...e.buttonProps.value,
		noCaps: !0,
		noWrap: !0,
		color: c ? e.props.toolbarToggleColor : e.props.toolbarColor,
		textColor: c && !e.props.toolbarPush ? null : e.props.toolbarTextColor,
		label: t.fixedLabel ? t.label : r,
		icon: t.fixedIcon ? t.icon === null ? void 0 : t.icon : i,
		contentClass: a,
		onShow: (t) => e.emit("dropdownShow", t),
		onHide: (t) => e.emit("dropdownHide", t),
		onBeforeShow: (t) => e.emit("dropdownBeforeShow", t),
		onBeforeHide: (t) => e.emit("dropdownBeforeHide", t)
	}, () => o);
	return l;
}
function cy(e) {
	if (e.caret) return e.buttons.value.filter((t) => !e.isViewingSource.value || t.find((e) => e.cmd === "viewsource")).map((t) => ay(t.map((t) => e.isViewingSource.value && t.cmd !== "viewsource" ? !1 : t.type === "slot" ? $(e.slots[t.slot]) : t.type === "dropdown" ? sy(e, t) : oy(e, t))));
}
function ly(e, t, n, r = {}) {
	let i = Object.keys(r);
	if (i.length === 0) return {};
	let a = { default_font: {
		cmd: "fontName",
		param: e,
		icon: n,
		tip: t
	} };
	return i.forEach((e) => {
		let t = r[e];
		a[e] = {
			cmd: "fontName",
			param: t,
			icon: n,
			tip: t,
			htmlTip: `<font face="${t}">${t}</font>`
		};
	}), a;
}
function uy(e) {
	if (e.caret) {
		let t = e.props.toolbarColor || e.props.toolbarTextColor, n = e.editLinkUrl.value, r = () => {
			e.caret.restore(), n !== e.editLinkUrl.value && document.execCommand("createLink", !1, n === "" ? " " : n), e.editLinkUrl.value = null;
		};
		return [
			_("div", { class: `q-mx-xs text-${t}` }, `${e.$q.lang.editor.url}: `),
			_("input", {
				key: "qedt_btm_input",
				class: "col q-editor__link-input",
				value: n,
				onInput: (e) => {
					Sd(e), n = e.target.value;
				},
				onKeydown: (t) => {
					if (!Nd(t)) switch (t.keyCode) {
						case 13: return Cd(t), r();
						case 27:
							Cd(t), e.caret.restore(), (!e.editLinkUrl.value || e.editLinkUrl.value === "https://") && document.execCommand("unlink"), e.editLinkUrl.value = null;
							break;
					}
				}
			}),
			ay([_(Vp, {
				key: "qedt_btm_rem",
				...e.buttonProps.value,
				label: e.$q.lang.label.remove,
				noCaps: !0,
				onClick: () => {
					e.caret.restore(), document.execCommand("unlink"), e.editLinkUrl.value = null;
				}
			}), _(Vp, {
				key: "qedt_btm_upd",
				...e.buttonProps.value,
				label: e.$q.lang.label.update,
				noCaps: !0,
				onClick: r
			})])
		];
	}
}
var dy = /^on[A-Z]/;
function fy() {
	let { attrs: e, vnode: t } = h(), n = {
		listeners: L({}),
		attributes: L({})
	};
	function r() {
		let r = {}, i = {};
		for (let t in e) t !== "class" && t !== "style" && !dy.test(t) && (r[t] = e[t]);
		for (let e in t.props) dy.test(e) && (i[e] = t.props[e]);
		n.attributes.value = r, n.listeners.value = i;
	}
	return O(r), r(), n;
}
var py = Object.prototype.toString, my = Object.prototype.hasOwnProperty, hy = new Set([
	"Boolean",
	"Number",
	"String",
	"Function",
	"Array",
	"Date",
	"RegExp"
].map((e) => "[object " + e + "]"));
function gy(e) {
	if (e !== Object(e) || hy.has(py.call(e)) || e.constructor && !my.call(e, "constructor") && !my.call(e.constructor.prototype, "isPrototypeOf")) return !1;
	let t;
	for (t in e);
	return t === void 0 || my.call(e, t);
}
function _y(...e) {
	let t, n, r, i, a, o, s = e[0] || {}, c = 1, l = !1, u = e.length;
	for (typeof s == "boolean" && (l = s, s = e[1] || {}, c = 2), Object(s) !== s && typeof s != "function" && (s = {}), u === c && (s = this, c--); c < u; c++) if ((t = e[c]) !== null) for (n in t) r = s[n], i = t[n], s !== i && (l && i && ((a = Array.isArray(i)) || gy(i)) ? (o = a ? Array.isArray(r) ? r : [] : gy(r) ? r : {}, s[n] = _y(l, o, i)) : i !== void 0 && (s[n] = i));
	return s;
}
Q({
	name: "QEditor",
	props: {
		...qf,
		...Kh,
		modelValue: {
			type: String,
			required: !0
		},
		readonly: Boolean,
		disable: Boolean,
		minHeight: {
			type: String,
			default: "10rem"
		},
		maxHeight: String,
		height: String,
		definitions: Object,
		fonts: Object,
		placeholder: String,
		toolbar: {
			type: Array,
			validator: (e) => e.every((e) => e.length),
			default: () => [
				[
					"left",
					"center",
					"right",
					"justify"
				],
				[
					"bold",
					"italic",
					"underline",
					"strike"
				],
				["undo", "redo"]
			]
		},
		toolbarColor: String,
		toolbarBg: String,
		toolbarTextColor: String,
		toolbarToggleColor: {
			type: String,
			default: "primary"
		},
		toolbarOutline: Boolean,
		toolbarPush: Boolean,
		toolbarRounded: Boolean,
		paragraphTag: {
			type: String,
			validator: (e) => ["div", "p"].includes(e),
			default: "div"
		},
		contentStyle: Object,
		contentClass: [
			Object,
			Array,
			String
		],
		square: Boolean,
		flat: Boolean,
		dense: Boolean
	},
	emits: [
		...qh,
		"update:modelValue",
		"keydown",
		"click",
		"focus",
		"blur",
		"dropdownShow",
		"dropdownHide",
		"dropdownBeforeShow",
		"dropdownBeforeHide",
		"linkShow",
		"linkHide"
	],
	setup(e, { slots: t, emit: n }) {
		let { proxy: r } = h(), { $q: i } = r, a = Jf(e, i), { inFullscreen: s, toggleFullscreen: c } = Jh(), l = fy(), u = L(null), d = L(null), f = L(null), p = L(!1), m = o(() => !e.readonly && !e.disable), g, v, y = e.modelValue;
		document.execCommand("defaultParagraphSeparator", !1, e.paragraphTag), g = window.getComputedStyle(document.body).fontFamily;
		let b = o(() => e.toolbarBg ? ` bg-${e.toolbarBg}` : ""), x = o(() => ({
			type: "a",
			flat: !e.toolbarOutline && !e.toolbarPush,
			noWrap: !0,
			outline: e.toolbarOutline,
			push: e.toolbarPush,
			rounded: e.toolbarRounded,
			dense: !0,
			color: e.toolbarColor,
			disable: !m.value,
			size: "sm"
		})), S = o(() => {
			let t = i.lang.editor, n = i.iconSet.editor;
			return {
				bold: {
					cmd: "bold",
					icon: n.bold,
					tip: t.bold,
					key: 66
				},
				italic: {
					cmd: "italic",
					icon: n.italic,
					tip: t.italic,
					key: 73
				},
				strike: {
					cmd: "strikeThrough",
					icon: n.strikethrough,
					tip: t.strikethrough,
					key: 83
				},
				underline: {
					cmd: "underline",
					icon: n.underline,
					tip: t.underline,
					key: 85
				},
				unordered: {
					cmd: "insertUnorderedList",
					icon: n.unorderedList,
					tip: t.unorderedList
				},
				ordered: {
					cmd: "insertOrderedList",
					icon: n.orderedList,
					tip: t.orderedList
				},
				subscript: {
					cmd: "subscript",
					icon: n.subscript,
					tip: t.subscript,
					htmlTip: "x<subscript>2</subscript>"
				},
				superscript: {
					cmd: "superscript",
					icon: n.superscript,
					tip: t.superscript,
					htmlTip: "x<superscript>2</superscript>"
				},
				link: {
					cmd: "link",
					disable: (e) => e.caret && !e.caret.can("link"),
					icon: n.hyperlink,
					tip: t.hyperlink,
					key: 76
				},
				fullscreen: {
					cmd: "fullscreen",
					icon: n.toggleFullscreen,
					tip: t.toggleFullscreen,
					key: 70
				},
				viewsource: {
					cmd: "viewsource",
					icon: n.viewSource,
					tip: t.viewSource
				},
				quote: {
					cmd: "formatBlock",
					param: "BLOCKQUOTE",
					icon: n.quote,
					tip: t.quote,
					key: 81
				},
				left: {
					cmd: "justifyLeft",
					icon: n.left,
					tip: t.left
				},
				center: {
					cmd: "justifyCenter",
					icon: n.center,
					tip: t.center
				},
				right: {
					cmd: "justifyRight",
					icon: n.right,
					tip: t.right
				},
				justify: {
					cmd: "justifyFull",
					icon: n.justify,
					tip: t.justify
				},
				print: {
					type: "no-state",
					cmd: "print",
					icon: n.print,
					tip: t.print,
					key: 80
				},
				outdent: {
					type: "no-state",
					disable: (e) => e.caret && !e.caret.can("outdent"),
					cmd: "outdent",
					icon: n.outdent,
					tip: t.outdent
				},
				indent: {
					type: "no-state",
					disable: (e) => e.caret && !e.caret.can("indent"),
					cmd: "indent",
					icon: n.indent,
					tip: t.indent
				},
				removeFormat: {
					type: "no-state",
					cmd: "removeFormat",
					icon: n.removeFormat,
					tip: t.removeFormat
				},
				hr: {
					type: "no-state",
					cmd: "insertHorizontalRule",
					icon: n.hr,
					tip: t.hr
				},
				undo: {
					type: "no-state",
					cmd: "undo",
					icon: n.undo,
					tip: t.undo,
					key: 90
				},
				redo: {
					type: "no-state",
					cmd: "redo",
					icon: n.redo,
					tip: t.redo,
					key: 89
				},
				h1: {
					cmd: "formatBlock",
					param: "H1",
					icon: n.heading1 || n.heading,
					tip: t.heading1,
					htmlTip: `<h1 class="q-ma-none">${t.heading1}</h1>`
				},
				h2: {
					cmd: "formatBlock",
					param: "H2",
					icon: n.heading2 || n.heading,
					tip: t.heading2,
					htmlTip: `<h2 class="q-ma-none">${t.heading2}</h2>`
				},
				h3: {
					cmd: "formatBlock",
					param: "H3",
					icon: n.heading3 || n.heading,
					tip: t.heading3,
					htmlTip: `<h3 class="q-ma-none">${t.heading3}</h3>`
				},
				h4: {
					cmd: "formatBlock",
					param: "H4",
					icon: n.heading4 || n.heading,
					tip: t.heading4,
					htmlTip: `<h4 class="q-ma-none">${t.heading4}</h4>`
				},
				h5: {
					cmd: "formatBlock",
					param: "H5",
					icon: n.heading5 || n.heading,
					tip: t.heading5,
					htmlTip: `<h5 class="q-ma-none">${t.heading5}</h5>`
				},
				h6: {
					cmd: "formatBlock",
					param: "H6",
					icon: n.heading6 || n.heading,
					tip: t.heading6,
					htmlTip: `<h6 class="q-ma-none">${t.heading6}</h6>`
				},
				p: {
					cmd: "formatBlock",
					param: e.paragraphTag,
					icon: n.heading,
					tip: t.paragraph
				},
				code: {
					cmd: "formatBlock",
					param: "PRE",
					icon: n.code,
					htmlTip: `<code>${t.code}</code>`
				},
				"size-1": {
					cmd: "fontSize",
					param: "1",
					icon: n.size1 || n.size,
					tip: t.size1,
					htmlTip: `<font size="1">${t.size1}</font>`
				},
				"size-2": {
					cmd: "fontSize",
					param: "2",
					icon: n.size2 || n.size,
					tip: t.size2,
					htmlTip: `<font size="2">${t.size2}</font>`
				},
				"size-3": {
					cmd: "fontSize",
					param: "3",
					icon: n.size3 || n.size,
					tip: t.size3,
					htmlTip: `<font size="3">${t.size3}</font>`
				},
				"size-4": {
					cmd: "fontSize",
					param: "4",
					icon: n.size4 || n.size,
					tip: t.size4,
					htmlTip: `<font size="4">${t.size4}</font>`
				},
				"size-5": {
					cmd: "fontSize",
					param: "5",
					icon: n.size5 || n.size,
					tip: t.size5,
					htmlTip: `<font size="5">${t.size5}</font>`
				},
				"size-6": {
					cmd: "fontSize",
					param: "6",
					icon: n.size6 || n.size,
					tip: t.size6,
					htmlTip: `<font size="6">${t.size6}</font>`
				},
				"size-7": {
					cmd: "fontSize",
					param: "7",
					icon: n.size7 || n.size,
					tip: t.size7,
					htmlTip: `<font size="7">${t.size7}</font>`
				}
			};
		}), C = o(() => {
			let t = e.definitions || {}, n = e.definitions || e.fonts ? _y(!0, {}, S.value, t, ly(g, i.lang.editor.defaultFont, i.iconSet.editor.font, e.fonts)) : S.value;
			return e.toolbar.map((e) => e.map((e) => {
				if (e.options) return {
					type: "dropdown",
					icon: e.icon,
					label: e.label,
					size: "sm",
					dense: !0,
					fixedLabel: e.fixedLabel,
					fixedIcon: e.fixedIcon,
					highlight: e.highlight,
					list: e.list,
					options: e.options.map((e) => n[e])
				};
				let r = n[e];
				return r ? r.type === "no-state" || t[e] && (r.cmd === void 0 || S.value[r.cmd] && S.value[r.cmd].type === "no-state") ? r : {
					type: "toggle",
					...r
				} : {
					type: "slot",
					slot: e
				};
			}));
		}), T = {
			$q: i,
			props: e,
			slots: t,
			emit: n,
			inFullscreen: s,
			toggleFullscreen: c,
			runCmd: U,
			isViewingSource: p,
			editLinkUrl: f,
			toolbarBackgroundClass: b,
			buttonProps: x,
			contentRef: d,
			buttons: C,
			setContent: H
		};
		G(() => e.modelValue, (e) => {
			y !== e && (y = e, H(e, !0));
		}), G(f, (e) => {
			n(`link${e ? "Show" : "Hide"}`);
		});
		let E = o(() => e.toolbar && e.toolbar.length !== 0), O = o(() => {
			let e = {}, t = (t) => {
				t.key && (e[t.key] = {
					cmd: t.cmd,
					param: t.param
				});
			};
			return C.value.forEach((e) => {
				e.forEach((e) => {
					e.options ? e.options.forEach(t) : t(e);
				});
			}), e;
		}), k = o(() => s.value ? e.contentStyle : [{
			minHeight: e.minHeight,
			height: e.height,
			maxHeight: e.maxHeight
		}, e.contentStyle]), j = o(() => `q-editor q-editor--${p.value ? "source" : "default"}` + (e.disable ? " disabled" : "") + (s.value ? " fullscreen column" : "") + (e.square ? " q-editor--square no-border-radius" : "") + (e.flat ? " q-editor--flat" : "") + (e.dense ? " q-editor--dense" : "") + (a.value ? " q-editor--dark q-dark" : "")), M = o(() => [
			e.contentClass,
			"q-editor__content",
			{
				col: s.value,
				"overflow-auto": s.value || e.maxHeight
			}
		]), N = o(() => e.disable ? { "aria-disabled": "true" } : {});
		function P() {
			if (d.value !== null) {
				let t = `inner${p.value ? "Text" : "HTML"}`, r = d.value[t];
				r !== e.modelValue && (y = r, n("update:modelValue", r));
			}
		}
		function F(e) {
			if (n("keydown", e), !e.ctrlKey || Nd(e)) {
				W();
				return;
			}
			let t = e.keyCode, r = O.value[t];
			if (r !== void 0) {
				let { cmd: t, param: n } = r;
				wd(e), U(t, n, !1);
			}
		}
		function I(e) {
			W(), n("click", e);
		}
		function R(e) {
			if (d.value !== null) {
				let { scrollTop: e, scrollHeight: t } = d.value;
				v = t - e;
			}
			T.caret.save(), n("blur", e);
		}
		function z(e) {
			w(() => {
				d.value !== null && v !== void 0 && (d.value.scrollTop = d.value.scrollHeight - v);
			}), n("focus", e);
		}
		function B(e) {
			let t = u.value;
			if (t !== null && t.contains(e.target) && (e.relatedTarget === null || !t.contains(e.relatedTarget))) {
				let e = `inner${p.value ? "Text" : "HTML"}`;
				T.caret.restorePosition(d.value[e].length), W();
			}
		}
		function V(e) {
			let t = u.value;
			t !== null && t.contains(e.target) && (e.relatedTarget === null || !t.contains(e.relatedTarget)) && (T.caret.savePosition(), W());
		}
		function ee() {
			v = void 0;
		}
		function te() {
			T.caret.save();
		}
		function H(e, t) {
			if (d.value !== null) {
				t && T.caret.savePosition();
				let n = `inner${p.value ? "Text" : "HTML"}`;
				d.value[n] = e, t && (T.caret.restorePosition(d.value[n].length), W());
			}
		}
		function U(e, t, n = !0) {
			ne(), T.caret.restore(), T.caret.apply(e, t, () => {
				ne(), T.caret.save(), n && W();
			});
		}
		function W() {
			setTimeout(() => {
				f.value = null, r.$forceUpdate();
			}, 1);
		}
		function ne() {
			om(() => {
				d.value?.focus({ preventScroll: !0 });
			});
		}
		function re() {
			return d.value;
		}
		return A(() => {
			T.caret = r.caret = new ey(d.value, T), H(e.modelValue), W(), document.addEventListener("selectionchange", te);
		}), D(() => {
			document.removeEventListener("selectionchange", te);
		}), Object.assign(r, {
			runCmd: U,
			refreshToolbar: W,
			focus: ne,
			getContentEl: re
		}), () => {
			let t;
			if (E.value) {
				let e = [_("div", {
					key: "qedt_top",
					class: "q-editor__toolbar row no-wrap scroll-x" + b.value
				}, cy(T))];
				f.value !== null && e.push(_("div", {
					key: "qedt_btm",
					class: "q-editor__toolbar row no-wrap items-center scroll-x" + b.value
				}, uy(T))), t = _("div", {
					key: "toolbar_ctainer",
					class: "q-editor__toolbars-container"
				}, e);
			}
			return _("div", {
				ref: u,
				class: j.value,
				style: { height: s.value ? "100%" : null },
				...N.value,
				onFocusin: B,
				onFocusout: V
			}, [t, _("div", {
				ref: d,
				style: k.value,
				class: M.value,
				contenteditable: m.value,
				placeholder: e.placeholder,
				...l.listeners.value,
				onInput: P,
				onKeydown: F,
				onClick: I,
				onBlur: R,
				onFocus: z,
				onMousedown: ee,
				onTouchstartPassive: ee
			})]);
		};
	}
});
var vy = Q({
	name: "QItemLabel",
	props: {
		overline: Boolean,
		caption: Boolean,
		header: Boolean,
		lines: [Number, String]
	},
	setup(e, { slots: t }) {
		let n = o(() => Number.parseInt(e.lines, 10)), r = o(() => "q-item__label" + (e.overline ? " q-item__label--overline text-overline" : "") + (e.caption ? " q-item__label--caption text-caption" : "") + (e.header ? " q-item__label--header" : "") + (n.value === 1 ? " ellipsis" : "")), i = o(() => e.lines !== void 0 && n.value > 1 ? {
			overflow: "hidden",
			display: "-webkit-box",
			"-webkit-box-orient": "vertical",
			"-webkit-line-clamp": n.value
		} : null);
		return () => _("div", {
			style: i.value,
			class: r.value
		}, $(t.default));
	}
}), yy = Q({
	name: "QSlideTransition",
	props: {
		appear: Boolean,
		duration: {
			type: Number,
			default: 300
		}
	},
	emits: ["show", "hide"],
	setup(e, { slots: t, emit: n }) {
		let r = !1, i, o, s = null, c = null, l, u;
		function d() {
			i?.(), i = null, r = !1, s !== null && (clearTimeout(s), s = null), c !== null && (clearTimeout(c), c = null), o?.removeEventListener("transitionend", l), l = null;
		}
		function f(t, n, a) {
			n !== void 0 && (t.style.height = `${n}px`), t.style.transition = `height ${e.duration}ms cubic-bezier(.25, .8, .50, 1)`, r = !0, i = a;
		}
		function p(e, t) {
			e.style.overflowY = null, e.style.height = null, e.style.transition = null, d(), t !== u && n(t);
		}
		function m(t, n) {
			let i = 0;
			o = t, r ? (d(), i = t.offsetHeight === t.scrollHeight ? 0 : void 0) : (u = "hide", t.style.overflowY = "hidden"), f(t, i, n), s = setTimeout(() => {
				s = null, t.style.height = `${t.scrollHeight}px`, l = (e) => {
					c = null, (Object(e) !== e || e.target === t) && p(t, "show");
				}, t.addEventListener("transitionend", l), c = setTimeout(l, e.duration * 1.1);
			}, 100);
		}
		function h(t, n) {
			let i;
			o = t, r ? d() : (u = "show", t.style.overflowY = "hidden", i = t.scrollHeight), f(t, i, n), s = setTimeout(() => {
				s = null, t.style.height = 0, l = (e) => {
					c = null, (Object(e) !== e || e.target === t) && p(t, "hide");
				}, t.addEventListener("transitionend", l), c = setTimeout(l, e.duration * 1.1);
			}, 100);
		}
		return D(() => {
			r && d();
		}), () => _(a, {
			css: !1,
			appear: e.appear,
			onEnter: m,
			onLeave: h
		}, t.default);
	}
}), by = {
	true: "inset",
	item: "item-inset",
	"item-thumbnail": "item-thumbnail-inset"
}, xy = {
	xs: 2,
	sm: 4,
	md: 8,
	lg: 16,
	xl: 24
}, Sy = Q({
	name: "QSeparator",
	props: {
		...qf,
		spaced: [Boolean, String],
		inset: [Boolean, String],
		vertical: Boolean,
		color: String,
		size: String
	},
	setup(e) {
		let t = Jf(e, h().proxy.$q), n = o(() => e.vertical ? "vertical" : "horizontal"), r = o(() => ` q-separator--${n.value}`), i = o(() => e.inset ? `${r.value}-${by[e.inset]}` : ""), a = o(() => `q-separator${r.value}${i.value}` + (e.color === void 0 ? "" : ` bg-${e.color}`) + (t.value ? " q-separator--dark" : "")), s = o(() => {
			let t = {};
			if (e.size !== void 0 && (t[e.vertical ? "width" : "height"] = e.size), e.spaced) {
				let n = e.spaced === !0 ? `${xy.md}px` : e.spaced in xy ? `${xy[e.spaced]}px` : e.spaced, r = e.vertical ? ["Left", "Right"] : ["Top", "Bottom"];
				t[`margin${r[0]}`] = t[`margin${r[1]}`] = n;
			}
			return t;
		});
		return () => _("hr", {
			class: a.value,
			style: s.value,
			"aria-orientation": n.value
		});
	}
}), Cy = V({}), wy = Object.keys(fp);
Q({
	name: "QExpansionItem",
	props: {
		...fp,
		...Jp,
		...qf,
		icon: String,
		label: String,
		labelLines: [Number, String],
		caption: String,
		captionLines: [Number, String],
		dense: Boolean,
		toggleAriaLabel: String,
		expandIcon: String,
		expandedIcon: String,
		expandIconClass: [
			Array,
			String,
			Object
		],
		duration: {},
		headerInsetLevel: Number,
		contentInsetLevel: Number,
		expandSeparator: Boolean,
		defaultOpened: Boolean,
		hideExpandIcon: Boolean,
		expandIconToggle: Boolean,
		switchToggleSide: Boolean,
		denseToggle: Boolean,
		group: String,
		popup: Boolean,
		headerStyle: [
			Array,
			String,
			Object
		],
		headerClass: [
			Array,
			String,
			Object
		]
	},
	emits: [
		...Yp,
		"click",
		"afterShow",
		"afterHide"
	],
	setup(e, { slots: t, emit: n }) {
		let { proxy: { $q: r } } = h(), i = Jf(e, r), a = L(e.modelValue === null ? e.defaultOpened : e.modelValue), s = L(null), c = yh(), { show: l, hide: u, toggle: d } = Xp({ showing: a }), f, p, m = o(() => `q-expansion-item q-item-type q-expansion-item--${a.value ? "expanded" : "collapsed"} q-expansion-item--${e.popup ? "popup" : "standard"}`), g = o(() => e.contentInsetLevel === void 0 ? null : { ["padding" + (r.lang.rtl ? "Right" : "Left")]: e.contentInsetLevel * 56 + "px" }), v = o(() => !e.disable && (e.href !== void 0 || e.to !== void 0 && e.to !== null && e.to !== "")), y = o(() => {
			let t = {};
			return wy.forEach((n) => {
				t[n] = e[n];
			}), t;
		}), b = o(() => v.value || !e.expandIconToggle), x = o(() => e.expandedIcon !== void 0 && a.value ? e.expandedIcon : e.expandIcon || r.iconSet.expansionItem[e.denseToggle ? "denseIcon" : "icon"]), S = o(() => !e.disable && (v.value || e.expandIconToggle)), C = o(() => ({
			expanded: a.value,
			detailsId: c.value,
			toggle: d,
			show: l,
			hide: u
		})), w = o(() => {
			let t = e.toggleAriaLabel === void 0 ? r.lang.label[a.value ? "collapse" : "expand"](e.label) : e.toggleAriaLabel;
			return {
				role: "button",
				"aria-expanded": a.value ? "true" : "false",
				"aria-controls": c.value,
				"aria-label": t
			};
		});
		G(() => e.group, (e) => {
			p?.(), e !== void 0 && j();
		});
		function T(e) {
			v.value || d(e), n("click", e);
		}
		function E(e) {
			e.keyCode === 13 && O(e, !0);
		}
		function O(e, t) {
			!t && !e.qAvoidFocus && s.value?.focus(), d(e), wd(e);
		}
		function k() {
			n("afterShow");
		}
		function A() {
			n("afterHide");
		}
		function j() {
			f === void 0 && (f = gh()), a.value && (Cy[e.group] = f);
			let t = G(a, (t) => {
				t ? Cy[e.group] = f : Cy[e.group] === f && delete Cy[e.group];
			}), n = G(() => Cy[e.group], (e, t) => {
				t === f && e !== void 0 && e !== f && u();
			});
			p = () => {
				t(), n(), Cy[e.group] === f && delete Cy[e.group], p = void 0;
			};
		}
		function M() {
			let t = {
				class: [`q-focusable relative-position cursor-pointer${e.denseToggle && e.switchToggleSide ? " items-end" : ""}`, e.expandIconClass],
				side: !e.switchToggleSide,
				avatar: e.switchToggleSide
			}, n = [_(Gf, {
				class: "q-expansion-item__toggle-icon" + (e.expandedIcon === void 0 && a.value ? " q-expansion-item__toggle-icon--rotated" : ""),
				name: x.value
			})];
			return S.value && (Object.assign(t, {
				tabindex: 0,
				...w.value,
				onClick: O,
				onKeyup: E
			}), n.unshift(_("div", {
				ref: s,
				class: "q-expansion-item__toggle-focus q-icon q-focus-helper q-focus-helper--rounded",
				tabindex: -1
			}))), _(ry, t, () => n);
		}
		function N() {
			let n;
			return t.header === void 0 ? (n = [_(ry, () => [_(vy, { lines: e.labelLines }, () => e.label || ""), e.caption ? _(vy, {
				lines: e.captionLines,
				caption: !0
			}, () => e.caption) : null])], e.icon && n[e.switchToggleSide ? "push" : "unshift"](_(ry, {
				side: e.switchToggleSide,
				avatar: !e.switchToggleSide
			}, () => _(Gf, { name: e.icon })))) : n = [t.header(C.value)].flat(), !e.disable && !e.hideExpandIcon && n[e.switchToggleSide ? "unshift" : "push"](M()), n;
		}
		function P() {
			let t = {
				ref: "item",
				style: e.headerStyle,
				class: e.headerClass,
				dark: i.value,
				disable: e.disable,
				dense: e.dense,
				insetLevel: e.headerInsetLevel
			};
			return b.value && (t.clickable = !0, t.onClick = T, Object.assign(t, v.value ? y.value : w.value)), _(ny, t, N);
		}
		function F() {
			return re(_("div", {
				key: "e-content",
				class: "q-expansion-item__content relative-position",
				style: g.value,
				id: c.value
			}, $(t.default)), [[ne, a.value]]);
		}
		function I() {
			let t = [P(), _(yy, {
				duration: e.duration,
				onShow: k,
				onHide: A
			}, F)];
			return e.expandSeparator && t.push(_(Sy, {
				class: "q-expansion-item__border q-expansion-item__border--top absolute-top",
				dark: i.value
			}), _(Sy, {
				class: "q-expansion-item__border q-expansion-item__border--bottom absolute-bottom",
				dark: i.value
			})), t;
		}
		return e.group !== void 0 && j(), D(() => {
			p?.();
		}), () => _("div", { class: m.value }, [_("div", { class: "q-expansion-item__container relative-position" }, I())]);
	}
});
var Ty = [
	"top",
	"right",
	"bottom",
	"left"
], Ey = {
	type: {
		type: String,
		default: "a"
	},
	outline: Boolean,
	push: Boolean,
	flat: Boolean,
	unelevated: Boolean,
	color: String,
	textColor: String,
	glossy: Boolean,
	square: Boolean,
	padding: String,
	label: {
		type: [String, Number],
		default: ""
	},
	labelPosition: {
		type: String,
		default: "right",
		validator: (e) => Ty.includes(e)
	},
	externalLabel: Boolean,
	hideLabel: { type: Boolean },
	labelClass: [
		Array,
		String,
		Object
	],
	labelStyle: [
		Array,
		String,
		Object
	],
	disable: Boolean,
	tabindex: [Number, String]
};
function Dy(e, t) {
	return {
		formClass: o(() => `q-fab--form-${e.square ? "square" : "rounded"}`),
		stacked: o(() => !e.externalLabel && ["top", "bottom"].includes(e.labelPosition)),
		labelProps: o(() => {
			if (e.externalLabel) {
				let n = e.hideLabel === null ? !t.value : e.hideLabel;
				return {
					action: "push",
					data: {
						class: [e.labelClass, `q-fab__label q-tooltip--style q-fab__label--external q-fab__label--external-${e.labelPosition}` + (n ? " q-fab__label--external-hidden" : "")],
						style: e.labelStyle
					}
				};
			}
			return {
				action: ["left", "top"].includes(e.labelPosition) ? "unshift" : "push",
				data: {
					class: [e.labelClass, `q-fab__label q-fab__label--internal q-fab__label--internal-${e.labelPosition}` + (e.hideLabel ? " q-fab__label--internal-hidden" : "")],
					style: e.labelStyle
				}
			};
		})
	};
}
var Oy = [
	"up",
	"right",
	"down",
	"left"
], ky = [
	"left",
	"center",
	"right"
];
Q({
	name: "QFab",
	props: {
		...Ey,
		...Jp,
		icon: String,
		activeIcon: String,
		hideIcon: Boolean,
		hideLabel: {
			...Ey.hideLabel,
			default: null
		},
		direction: {
			type: String,
			default: "right",
			validator: (e) => Oy.includes(e)
		},
		persistent: Boolean,
		verticalActionsAlign: {
			type: String,
			default: "center",
			validator: (e) => ky.includes(e)
		}
	},
	emits: Yp,
	setup(e, { slots: t }) {
		let n = L(null), r = L(e.modelValue === !0), i = yh(), { proxy: { $q: a } } = h(), { formClass: s, labelProps: c } = Dy(e, r), { hide: l, toggle: u } = Xp({
			showing: r,
			hideOnRouteChange: o(() => !e.persistent)
		}), d = o(() => ({ opened: r.value })), f = o(() => `q-fab z-fab row inline justify-center q-fab--align-${e.verticalActionsAlign} ${s.value}` + (r.value ? " q-fab--opened" : " q-fab--closed")), p = o(() => `q-fab__actions flex no-wrap inline q-fab__actions--${e.direction} q-fab__actions--${r.value ? "opened" : "closed"}`), m = o(() => {
			let e = {
				id: i.value,
				role: "menu"
			};
			return r.value || (e["aria-hidden"] = "true"), e;
		}), g = o(() => `q-fab__icon-holder  q-fab__icon-holder--${r.value ? "opened" : "closed"}`);
		function v(n, r) {
			let i = t[n], o = `q-fab__${n} absolute-full`;
			return i === void 0 ? _(Gf, {
				class: o,
				name: e[r] || a.iconSet.fab[r]
			}) : _("div", { class: o }, i(d.value));
		}
		function y() {
			let n = [];
			return e.hideIcon || n.push(_("div", { class: g.value }, [v("icon", "icon"), v("active-icon", "activeIcon")])), (e.label !== "" || t.label !== void 0) && n[c.value.action](_("div", c.value.data, t.label === void 0 ? [e.label] : t.label(d.value))), Of(t.tooltip, n);
		}
		return F(Yd, {
			showing: r,
			onChildClick(e) {
				l(e), e?.qAvoidFocus !== !0 && n.value?.$el.focus();
			}
		}), () => _("div", { class: f.value }, [_(Vp, {
			ref: n,
			class: s.value,
			...e,
			noWrap: !0,
			stack: e.stacked,
			align: void 0,
			icon: void 0,
			label: void 0,
			noCaps: !0,
			fab: !0,
			"aria-expanded": r.value ? "true" : "false",
			"aria-haspopup": "true",
			"aria-controls": i.value,
			onClick: u
		}, y), _("div", {
			class: p.value,
			...m.value
		}, $(t.default))]);
	}
});
var Ay = {
	start: "self-end",
	center: "self-center",
	end: "self-start"
}, jy = Object.keys(Ay);
Q({
	name: "QFabAction",
	props: {
		...Ey,
		icon: {
			type: String,
			default: ""
		},
		anchor: {
			type: String,
			validator: (e) => jy.includes(e)
		},
		to: [String, Object],
		replace: Boolean
	},
	emits: ["click"],
	setup(e, { slots: t, emit: n }) {
		let r = y(Yd, () => ({
			showing: { value: !0 },
			onChildClick: yd
		})), { formClass: i, labelProps: a } = Dy(e, r.showing), s = o(() => {
			let t = Ay[e.anchor];
			return i.value + (t === void 0 ? "" : ` ${t}`);
		}), c = o(() => e.disable || !r.showing.value);
		function l(e) {
			r.onChildClick(e), n("click", e);
		}
		function u() {
			let n = [];
			return t.icon === void 0 ? e.icon !== "" && n.push(_(Gf, { name: e.icon })) : n.push(t.icon()), (e.label !== "" || t.label !== void 0) && n[a.value.action](_("div", a.value.data, t.label === void 0 ? [e.label] : t.label())), Of(t.default, n);
		}
		let d = h();
		return Object.assign(d.proxy, { click: l }), () => _(Vp, {
			class: s.value,
			...e,
			noWrap: !0,
			stack: e.stacked,
			icon: void 0,
			label: void 0,
			noCaps: !0,
			fabMini: !0,
			disable: c.value,
			onClick: l
		}, u);
	}
});
function My({ validate: e, resetValidation: t, requiresQForm: n }) {
	let r = y(Xd, !1);
	if (r !== !1) {
		let { props: n, proxy: i } = h();
		Object.assign(i, {
			validate: e,
			resetValidation: t
		}), G(() => n.disable, (e) => {
			e ? (typeof t == "function" && t(), r.unbindComponent(i)) : r.bindComponent(i);
		}), A(() => {
			n.disable || r.bindComponent(i);
		}), D(() => {
			n.disable || r.unbindComponent(i);
		});
	} else n && console.error("Parent QForm not found on useFormChild()!");
}
var Ny = [
	!0,
	!1,
	"ondemand"
], Py = {
	modelValue: {},
	error: {
		type: Boolean,
		default: null
	},
	errorMessage: String,
	noErrorIcon: Boolean,
	rules: Array,
	reactiveRules: Boolean,
	lazyRules: {
		type: [Boolean, String],
		default: !1,
		validator: (e) => Ny.includes(e)
	}
};
function Fy(e, t) {
	let { props: n, proxy: r } = h(), i = L(!1), a = L(null), s = L(!1);
	My({
		validate: _,
		resetValidation: g
	});
	let c = 0, l, u = o(() => n.rules !== void 0 && n.rules !== null && n.rules.length !== 0), d = o(() => !n.disable && u.value && !t.value), f = o(() => n.error === !0 || i.value), p = o(() => typeof n.errorMessage == "string" && n.errorMessage.length !== 0 ? n.errorMessage : a.value);
	G(() => n.modelValue, () => {
		s.value = !0, d.value && n.lazyRules === !1 && v();
	});
	function m() {
		n.lazyRules !== "ondemand" && d.value && s.value && v();
	}
	G(() => n.reactiveRules, (e) => {
		e ? l === void 0 && (l = G(() => n.rules, m, {
			immediate: !0,
			deep: !0
		})) : l !== void 0 && (l(), l = void 0);
	}, { immediate: !0 }), G(() => n.lazyRules, m), G(e, (e) => {
		e ? s.value = !0 : d.value && n.lazyRules !== "ondemand" && v();
	});
	function g() {
		c++, t.value = !1, s.value = !1, i.value = !1, a.value = null, v.cancel();
	}
	function _(e = n.modelValue) {
		if (n.disable || !u.value) return !0;
		let r = ++c, o = t.value ? () => {} : () => {
			s.value = !0;
		}, l = (e, n) => {
			e && o(), i.value = e, a.value = n || null, t.value = !1;
		}, d = [];
		for (let t = 0; t < n.rules.length; t++) {
			let r = n.rules[t], i;
			if (typeof r == "function" ? i = r(e, Qg) : typeof r == "string" && Qg[r] !== void 0 && (i = Qg[r](e)), i === !1 || typeof i == "string") return l(!0, i), !1;
			i !== !0 && i !== void 0 && d.push(i);
		}
		return d.length === 0 ? (l(!1), !0) : (t.value = !0, Promise.all(d).then((e) => {
			if (e === void 0 || !Array.isArray(e) || e.length === 0) return r === c && l(!1), !0;
			let t = e.find((e) => e === !1 || typeof e == "string");
			return r === c && l(t !== void 0, t), t === void 0;
		}, (e) => (r === c && (console.error(e), l(!0)), !1)));
	}
	let v = Od(_, 0);
	return D(() => {
		l?.(), v.cancel();
	}), Object.assign(r, {
		resetValidation: g,
		validate: _
	}), id(r, "hasError", () => f.value), {
		isDirtyModel: s,
		hasRules: u,
		hasError: f,
		errorMessage: p,
		validate: _,
		resetValidation: g
	};
}
function Iy(e) {
	return e != null && String(e).length !== 0;
}
var Ly = {
	...qf,
	...Py,
	label: String,
	stackLabel: Boolean,
	hint: String,
	hideHint: Boolean,
	prefix: String,
	suffix: String,
	labelColor: String,
	color: String,
	bgColor: String,
	filled: Boolean,
	outlined: Boolean,
	borderless: Boolean,
	standout: [Boolean, String],
	square: Boolean,
	loading: Boolean,
	labelSlot: Boolean,
	bottomSlots: Boolean,
	hideBottomSpace: Boolean,
	rounded: Boolean,
	dense: Boolean,
	itemAligned: Boolean,
	counter: Boolean,
	clearable: Boolean,
	clearIcon: String,
	disable: Boolean,
	readonly: Boolean,
	autofocus: Boolean,
	for: String
}, Ry = {
	...Ly,
	maxlength: [Number, String]
}, zy = [
	"update:modelValue",
	"clear",
	"focus",
	"blur"
];
function By({ requiredForAttr: e = !0, tagProp: t, changeEvent: n = !1 } = {}) {
	let { props: r, proxy: i } = h(), a = Jf(r, i.$q), s = yh({
		required: e,
		getValue: () => r.for
	});
	return {
		requiredForAttr: e,
		changeEvent: n,
		tag: t ? o(() => r.tag) : { value: "label" },
		isDark: a,
		editable: o(() => !r.disable && !r.readonly),
		innerLoading: L(!1),
		focused: L(!1),
		hasPopupOpen: !1,
		splitAttrs: fy(),
		targetUid: s,
		rootRef: L(null),
		targetRef: L(null),
		controlRef: L(null)
	};
}
function Vy(e, t) {
	return t === null ? null : _("div", {
		key: e,
		class: "q-field__append q-field__marginal row no-wrap items-center q-anchor--skip"
	}, t);
}
function Hy(e) {
	let { props: t, emit: n, slots: r, attrs: i, proxy: s } = h(), { $q: c } = s, l = null;
	e.hasValue === void 0 && (e.hasValue = o(() => Iy(t.modelValue))), e.emitValue === void 0 && (e.emitValue = (e) => {
		n("update:modelValue", e);
	}), e.controlEvents === void 0 && (e.controlEvents = {
		onFocusin: P,
		onFocusout: F
	}), Object.assign(e, {
		clearValue: I,
		onControlFocusin: P,
		onControlFocusout: F,
		focus: M
	}), e.computedCounter === void 0 && (e.computedCounter = o(() => {
		if (t.counter) {
			let e = typeof t.modelValue == "string" || typeof t.modelValue == "number" ? String(t.modelValue).length : Array.isArray(t.modelValue) ? t.modelValue.length : 0, n = t.maxlength === void 0 ? t.maxValues : t.maxlength;
			return e + (n === void 0 ? "" : " / " + n);
		}
	}));
	let { isDirtyModel: u, hasRules: d, hasError: f, errorMessage: p, resetValidation: m } = Fy(e.focused, e.innerLoading), g = e.floatingLabel === void 0 ? o(() => t.stackLabel || e.focused.value || e.hasValue.value) : o(() => t.stackLabel || e.focused.value || e.floatingLabel.value), v = o(() => t.bottomSlots || t.hint !== void 0 || d.value || t.counter || t.error !== null), y = o(() => t.filled ? "filled" : t.outlined ? "outlined" : t.borderless ? "borderless" : t.standout ? "standout" : "standard"), b = o(() => `q-field row no-wrap items-start q-field--${y.value}` + (e.fieldClass === void 0 ? "" : ` ${e.fieldClass.value}`) + (t.rounded ? " q-field--rounded" : "") + (t.square ? " q-field--square" : "") + (g.value ? " q-field--float" : "") + (S.value ? " q-field--labeled" : "") + (t.dense ? " q-field--dense" : "") + (t.itemAligned ? " q-field--item-aligned q-item-type" : "") + (e.isDark.value ? " q-field--dark" : "") + (e.getControl === void 0 ? " q-field--auto-height" : "") + (e.focused.value ? " q-field--focused" : "") + (f.value ? " q-field--error" : "") + (f.value || e.focused.value ? " q-field--highlighted" : "") + (!t.hideBottomSpace && v.value ? " q-field--with-bottom" : "") + (t.disable ? " q-field--disabled" : t.readonly ? " q-field--readonly" : "")), x = o(() => "q-field__control relative-position row no-wrap" + (t.bgColor === void 0 ? "" : ` bg-${t.bgColor}`) + (f.value ? " text-negative" : typeof t.standout == "string" && t.standout.length !== 0 && e.focused.value ? ` ${t.standout}` : t.color === void 0 ? "" : ` text-${t.color}`)), S = o(() => t.labelSlot || t.label !== void 0), C = o(() => "q-field__label no-pointer-events absolute ellipsis" + (t.labelColor !== void 0 && !f.value ? ` text-${t.labelColor}` : "")), E = o(() => ({
		id: e.targetUid.value,
		editable: e.editable.value,
		focused: e.focused.value,
		floatingLabel: g.value,
		modelValue: t.modelValue,
		emitValue: e.emitValue
	})), O = o(() => {
		let n = {};
		return e.targetUid.value && (n.for = e.targetUid.value), t.disable && (n["aria-disabled"] = "true"), n;
	});
	function j() {
		let t = document.activeElement, n = e.targetRef?.value;
		n && (t === null || t.id !== e.targetUid.value) && (n.hasAttribute("tabindex") || (n = n.querySelector("[tabindex]")), n !== t && n?.focus({ preventScroll: !0 }));
	}
	function M() {
		om(j);
	}
	function N() {
		sm(j);
		let t = document.activeElement;
		t !== null && e.rootRef.value.contains(t) && t.blur();
	}
	function P(t) {
		l !== null && (clearTimeout(l), l = null), e.editable.value && !e.focused.value && (e.focused.value = !0, n("focus", t));
	}
	function F(t, r) {
		l !== null && clearTimeout(l), l = setTimeout(() => {
			l = null, !(document.hasFocus() && (e.hasPopupOpen || e.controlRef === void 0 || e.controlRef.value === null || e.controlRef.value.contains(document.activeElement))) && (e.focused.value && (e.focused.value = !1, n("blur", t)), r?.());
		});
	}
	function I(r) {
		wd(r), c.platform.is.mobile ? e.rootRef.value.contains(document.activeElement) && document.activeElement.blur() : (e.targetRef?.value || e.rootRef.value).focus(), t.type === "file" && (e.inputRef.value.value = null), n("update:modelValue", null), e.changeEvent && n("change", null), n("clear", t.modelValue), w(() => {
			let e = u.value;
			m(), u.value = e;
		});
	}
	function L(e) {
		[13, 32].includes(e.keyCode) && I(e);
	}
	function R() {
		let n = [];
		return r.prepend !== void 0 && n.push(_("div", {
			class: "q-field__prepend q-field__marginal row no-wrap items-center",
			key: "prepend",
			onClick: Cd
		}, r.prepend())), n.push(_("div", { class: "q-field__control-container col relative-position row no-wrap q-anchor--skip" }, z())), f.value && !t.noErrorIcon && n.push(Vy("error", [_(Gf, {
			name: c.iconSet.field.error,
			color: "negative"
		})])), t.loading || e.innerLoading.value ? n.push(Vy("inner-loading-append", r.loading === void 0 ? [_(gp, { color: t.color })] : r.loading())) : t.clearable && e.hasValue.value && e.editable.value && n.push(Vy("inner-clearable-append", [_(Gf, {
			class: "q-field__focusable-action",
			name: t.clearIcon || c.iconSet.field.clear,
			tabindex: 0,
			role: "button",
			"aria-hidden": "false",
			"aria-label": c.lang.label.clear,
			onKeyup: L,
			onClick: I
		})])), r.append !== void 0 && n.push(_("div", {
			class: "q-field__append q-field__marginal row no-wrap items-center",
			key: "append",
			onClick: Cd
		}, r.append())), e.getInnerAppend !== void 0 && n.push(Vy("inner-append", e.getInnerAppend())), e.getControlChild !== void 0 && n.push(e.getControlChild()), n;
	}
	function z() {
		let n = [];
		return t.prefix !== void 0 && t.prefix !== null && n.push(_("div", { class: "q-field__prefix no-pointer-events row items-center" }, t.prefix)), e.getShadowControl !== void 0 && e.hasShadow.value && n.push(e.getShadowControl()), S.value && n.push(_("div", { class: C.value }, $(r.label, t.label))), e.getControl === void 0 ? r.rawControl === void 0 ? r.control !== void 0 && n.push(_("div", {
			ref: e.targetRef,
			class: "q-field__native row",
			tabindex: -1,
			...e.splitAttrs.attributes.value,
			"data-autofocus": t.autofocus || void 0
		}, r.control(E.value))) : n.push(r.rawControl()) : n.push(e.getControl()), t.suffix !== void 0 && t.suffix !== null && n.push(_("div", { class: "q-field__suffix no-pointer-events row items-center" }, t.suffix)), n.concat($(r.default));
	}
	function B() {
		let n, i;
		f.value ? p.value === null ? (n = $(r.error), i = "q--slot-error") : (n = [_("div", { role: "alert" }, p.value)], i = `q--slot-error-${p.value}`) : (!t.hideHint || e.focused.value) && (t.hint === void 0 ? (n = $(r.hint), i = "q--slot-hint") : (n = [_("div", t.hint)], i = `q--slot-hint-${t.hint}`));
		let o = t.counter || r.counter !== void 0;
		if (t.hideBottomSpace && !o && n === void 0) return;
		let s = _("div", {
			key: i,
			class: "q-field__messages col"
		}, n);
		return _("div", {
			class: "q-field__bottom row items-start q-field__bottom--" + (t.hideBottomSpace ? "stale" : "animated"),
			onClick: Cd
		}, [t.hideBottomSpace ? s : _(a, { name: "q-transition--field-message" }, () => s), o ? _("div", { class: "q-field__counter" }, r.counter === void 0 ? e.computedCounter.value : r.counter()) : null]);
	}
	let V = !1;
	return k(() => {
		V = !0;
	}), T(() => {
		V && t.autofocus && s.focus();
	}), t.autofocus && A(() => {
		s.focus();
	}), D(() => {
		l !== null && clearTimeout(l);
	}), Object.assign(s, {
		focus: M,
		blur: N
	}), function() {
		let n = e.getControl === void 0 && r.control === void 0 ? {
			...e.splitAttrs.attributes.value,
			"data-autofocus": t.autofocus || void 0,
			...O.value
		} : O.value;
		return _(e.tag.value, {
			ref: e.rootRef,
			class: [b.value, i.class],
			style: i.style,
			...n
		}, [
			r.before === void 0 ? null : _("div", {
				class: "q-field__before q-field__marginal row no-wrap items-center",
				onClick: Cd
			}, r.before()),
			_("div", { class: "q-field__inner relative-position col self-stretch" }, [_("div", {
				ref: e.controlRef,
				class: x.value,
				tabindex: -1,
				...e.controlEvents
			}, R()), v.value ? B() : null]),
			r.after === void 0 ? null : _("div", {
				class: "q-field__after q-field__marginal row no-wrap items-center",
				onClick: Cd
			}, r.after())
		]);
	};
}
var Uy = Q({
	name: "QField",
	inheritAttrs: !1,
	props: {
		...Ry,
		tag: {
			type: String,
			default: "label"
		}
	},
	emits: zy,
	setup() {
		return Hy(By({ tagProp: !0 }));
	}
});
function Wy(e, t, n, r) {
	let i = [];
	return e.forEach((e) => {
		r(e) ? i.push(e) : t.push({
			failedPropValidation: n,
			file: e
		});
	}), i;
}
function Gy(e) {
	e?.dataTransfer && (e.dataTransfer.dropEffect = "copy"), wd(e);
}
var Ky = {
	multiple: Boolean,
	accept: String,
	capture: String,
	maxFileSize: [Number, String],
	maxTotalSize: [Number, String],
	maxFiles: [Number, String],
	filter: Function
}, qy = ["rejected"];
function Jy({ editable: e, dnd: t, getFileInput: n, addFilesToQueue: r }) {
	let { props: i, emit: a, proxy: s } = h(), c = L(null), l = o(() => i.accept === void 0 ? null : i.accept.split(",").map((e) => (e = e.trim(), e === "*" ? "*/" : (e.endsWith("/*") && (e = e.slice(0, -1)), e.toUpperCase())))), u = o(() => Number.parseInt(i.maxFiles, 10)), d = o(() => Number.parseInt(i.maxTotalSize, 10));
	function f(t) {
		if (e.value) if (t !== Object(t) && (t = { target: null }), t.target?.matches("input[type=\"file\"]") === !0) t.clientX === 0 && t.clientY === 0 && Sd(t);
		else {
			let e = n();
			e !== t.target && e?.click(t);
		}
	}
	function p(t) {
		e.value && t && r(null, t);
	}
	function m(e, t, n, r) {
		let o = [...t || e.target.files], s = [], c = () => {
			s.length !== 0 && a("rejected", s);
		};
		if (i.accept !== void 0 && !l.value.includes("*/") && (o = Wy(o, s, "accept", (e) => l.value.some((t) => e.type.toUpperCase().startsWith(t) || e.name.toUpperCase().endsWith(t))), o.length === 0)) return c();
		if (i.maxFileSize !== void 0) {
			let e = Number.parseInt(i.maxFileSize, 10);
			if (o = Wy(o, s, "max-file-size", (t) => t.size <= e), o.length === 0) return c();
		}
		if (!i.multiple && o.length !== 0 && (o = [o[0]]), o.forEach((e) => {
			e.__key = e.webkitRelativePath + e.lastModified + e.name + e.size;
		}), r) {
			let e = n.map((e) => e.__key);
			o = Wy(o, s, "duplicate", (t) => !e.includes(t.__key));
		}
		if (o.length === 0) return c();
		if (i.maxTotalSize !== void 0) {
			let e = r ? n.reduce((e, t) => e + t.size, 0) : 0;
			if (o = Wy(o, s, "max-total-size", (t) => (e += t.size, e <= d.value)), o.length === 0) return c();
		}
		if (typeof i.filter == "function") {
			let e = i.filter(o);
			o = Wy(o, s, "filter", (t) => e.includes(t));
		}
		if (i.maxFiles !== void 0) {
			let e = r ? n.length : 0;
			if (o = Wy(o, s, "max-files", () => (e++, e <= u.value)), o.length === 0) return c();
		}
		if (c(), o.length !== 0) return o;
	}
	function g(e) {
		Gy(e), t.value ||= !0;
	}
	function v(e) {
		wd(e), (e.relatedTarget !== null || !md.is.safari ? e.relatedTarget !== c.value : !document.elementsFromPoint(e.clientX, e.clientY).includes(c.value)) && (t.value = !1);
	}
	function y(e) {
		Gy(e);
		let n = e.dataTransfer.files;
		n.length !== 0 && r(null, n), t.value = !1;
	}
	function b(e) {
		if (t.value) return _("div", {
			ref: c,
			class: `q-${e}__dnd absolute-full`,
			onDragenter: Gy,
			onDragover: Gy,
			onDragleave: v,
			onDrop: y
		});
	}
	return Object.assign(s, {
		pickFiles: f,
		addFiles: p
	}), {
		pickFiles: f,
		addFiles: p,
		onDragover: g,
		onDragleave: v,
		processFiles: m,
		getDndNode: b,
		maxFilesNumber: u,
		maxTotalSizeNumber: d
	};
}
function Yy(e, t) {
	function n() {
		let t = e.modelValue;
		try {
			let e = "DataTransfer" in window ? new DataTransfer() : "ClipboardEvent" in window ? new ClipboardEvent("").clipboardData : void 0;
			return Object(t) === t && ("length" in t ? [...t] : [t]).forEach((t) => {
				e.items.add(t);
			}), { files: e.files };
		} catch {
			return { files: void 0 };
		}
	}
	return o(t ? () => {
		if (e.type === "file") return n();
	} : n);
}
function Xy(e) {
	e.keyCode === 13 && Cd(e);
}
Q({
	name: "QFile",
	inheritAttrs: !1,
	props: {
		...Ly,
		...Ch,
		...Ky,
		modelValue: [
			File,
			FileList,
			Array
		],
		append: Boolean,
		useChips: Boolean,
		displayValue: [String, Number],
		tabindex: {
			type: [String, Number],
			default: 0
		},
		counterLabel: Function,
		inputClass: [
			Array,
			String,
			Object
		],
		inputStyle: [
			Array,
			String,
			Object
		]
	},
	emits: [...zy, ...qy],
	setup(e, { slots: t, emit: n, attrs: r }) {
		let { proxy: i } = h(), a = By(), s = L(null), c = L(!1), l = Eh(e), { pickFiles: u, onDragover: d, onDragleave: f, processFiles: p, getDndNode: m } = Jy({
			editable: a.editable,
			dnd: c,
			getFileInput: A,
			addFilesToQueue: j
		}), g = Yy(e), v = o(() => Object(e.modelValue) === e.modelValue ? "length" in e.modelValue ? [...e.modelValue] : [e.modelValue] : []), y = o(() => Iy(v.value)), b = o(() => v.value.map((e) => e.name).join(", ")), x = o(() => lf(v.value.reduce((e, t) => e + t.size, 0))), S = o(() => ({
			totalSize: x.value,
			filesNumber: v.value.length,
			maxFiles: e.maxFiles
		})), C = o(() => ({
			tabindex: -1,
			type: "file",
			title: "",
			accept: e.accept,
			capture: e.capture,
			name: l.value,
			...r,
			id: a.targetUid.value,
			disabled: !a.editable.value
		})), w = o(() => "q-file q-field--auto-height" + (c.value ? " q-file--dnd" : "")), T = o(() => e.multiple && e.append);
		function E(e) {
			let t = [...v.value];
			t.splice(e, 1), O(t);
		}
		function D(e) {
			let t = v.value.indexOf(e);
			t !== -1 && E(t);
		}
		function O(t) {
			n("update:modelValue", e.multiple ? t : t[0]);
		}
		function k(e) {
			(e.keyCode === 13 || e.keyCode === 32) && u(e);
		}
		function A() {
			return s.value;
		}
		function j(t, n) {
			let r = p(t, n, v.value, T.value), i = A();
			i != null && (i.value = ""), r !== void 0 && ((e.multiple ? e.modelValue && r.every((e) => v.value.includes(e)) : e.modelValue === r[0]) || O(T.value ? [...v.value, ...r] : r));
		}
		function M() {
			return [_("input", {
				class: [e.inputClass, "q-file__filler"],
				style: e.inputStyle
			})];
		}
		function N() {
			if (t.file !== void 0) return v.value.length === 0 ? M() : v.value.map((e, n) => t.file({
				index: n,
				file: e,
				ref: this
			}));
			if (t.selected !== void 0) return v.value.length === 0 ? M() : t.selected({
				files: v.value,
				ref: this
			});
			if (e.useChips) return v.value.length === 0 ? M() : v.value.map((t, n) => _(og, {
				key: "file-" + n,
				removable: a.editable.value,
				dense: !0,
				textColor: e.color,
				tabindex: e.tabindex,
				onRemove: () => {
					E(n);
				}
			}, () => _("span", {
				class: "ellipsis",
				textContent: t.name
			})));
			let n = e.displayValue === void 0 ? b.value : e.displayValue;
			return n.length === 0 ? M() : [_("div", {
				class: e.inputClass,
				style: e.inputStyle,
				textContent: n
			})];
		}
		function P() {
			let t = {
				ref: s,
				...C.value,
				...g.value,
				class: "q-field__input fit absolute-full cursor-pointer",
				onChange: j
			};
			return e.multiple && (t.multiple = !0), _("input", t);
		}
		return Object.assign(a, {
			fieldClass: w,
			emitValue: O,
			hasValue: y,
			inputRef: s,
			innerValue: v,
			floatingLabel: o(() => y.value || Iy(e.displayValue)),
			computedCounter: o(() => {
				if (e.counterLabel !== void 0) return e.counterLabel(S.value);
				let t = e.maxFiles;
				return `${v.value.length}${t === void 0 ? "" : " / " + t} (${x.value})`;
			}),
			getControlChild: () => m("file"),
			getControl: () => {
				let t = {
					ref: a.targetRef,
					class: "q-field__native row items-center cursor-pointer",
					tabindex: e.tabindex
				};
				return a.editable.value && Object.assign(t, {
					onDragover: d,
					onDragleave: f,
					onKeydown: Xy,
					onKeyup: k
				}), _("div", t, [P()].concat(N()));
			}
		}), Object.assign(i, {
			removeAtIndex: E,
			removeFile: D,
			getNativeElement: () => s.value
		}), id(i, "nativeEl", () => s.value), Hy(a);
	}
});
function Zy(e, t) {
	e.value !== t && (e.value = t);
}
Q({
	name: "QFooter",
	props: {
		modelValue: {
			type: Boolean,
			default: !0
		},
		reveal: Boolean,
		bordered: Boolean,
		elevated: Boolean,
		heightHint: {
			type: [String, Number],
			default: 50
		}
	},
	emits: ["reveal", "focusin"],
	setup(e, { slots: t, emit: n }) {
		let { proxy: { $q: r } } = h(), i = y(qd, $d);
		if (i === $d) return console.error("QFooter needs to be child of QLayout"), $d;
		let a = L(Number.parseInt(e.heightHint, 10)), s = L(!0), c = L(od.value || i.isContainer.value ? 0 : window.innerHeight), l = o(() => e.reveal || i.view.value.includes("F") || r.platform.is.ios && i.isContainer.value), u = o(() => i.isContainer.value ? i.containerHeight.value : c.value), d = o(() => {
			if (!e.modelValue) return 0;
			if (l.value) return s.value ? a.value : 0;
			let t = i.scroll.value.position + u.value + a.value - i.height.value;
			return Math.max(t, 0);
		}), f = o(() => !e.modelValue || l.value && !s.value), p = o(() => e.modelValue && f.value && e.reveal), m = o(() => "q-footer q-layout__section--marginal " + (l.value ? "fixed" : "absolute") + "-bottom" + (e.bordered ? " q-footer--bordered" : "") + (f.value ? " q-footer--hidden" : "") + (e.modelValue ? "" : " q-layout--prevent-focus" + (l.value ? "" : " hidden"))), g = o(() => {
			let e = i.rows.value.bottom, t = {};
			return e[0] === "l" && i.left.space && (t[r.lang.rtl ? "right" : "left"] = `${i.left.size}px`), e[2] === "r" && i.right.space && (t[r.lang.rtl ? "left" : "right"] = `${i.right.size}px`), t;
		});
		function v(e, t) {
			i.update("footer", e, t);
		}
		function b({ height: e }) {
			Zy(a, e), v("size", e);
		}
		function x() {
			if (!e.reveal) return;
			let { direction: t, position: n, inflectionPoint: r } = i.scroll.value;
			Zy(s, t === "up" || n - r < 100 || i.height.value - u.value - n - a.value < 300);
		}
		function S(e) {
			p.value && Zy(s, !0), n("focusin", e);
		}
		G(() => e.modelValue, (e) => {
			v("space", e), Zy(s, !0), i.animate();
		}), G(d, (e) => {
			v("offset", e);
		}), G(() => e.reveal, (t) => {
			t || Zy(s, e.modelValue);
		}), G(s, (e) => {
			i.animate(), n("reveal", e);
		}), G([
			a,
			i.scroll,
			i.height
		], x), G(() => r.screen.height, (e) => {
			i.isContainer.value || Zy(c, e);
		});
		let C = {};
		return i.instances.footer = C, e.modelValue && v("size", a.value), v("space", e.modelValue), v("offset", d.value), D(() => {
			i.instances.footer === C && (i.instances.footer = void 0, v("size", 0), v("offset", 0), v("space", !1));
		}), () => {
			let n = Of(t.default, [_(kg, {
				debounce: 0,
				onResize: b
			})]);
			return e.elevated && n.push(_("div", { class: "q-layout__shadow absolute-full overflow-hidden no-pointer-events" })), _("footer", {
				class: m.value,
				style: g.value,
				onFocusin: S
			}, n);
		};
	}
});
function Qy(e) {
	let t = e.validate();
	return typeof t.then == "function" ? t.then((t) => ({
		valid: t,
		comp: e
	}), (t) => ({
		valid: !1,
		comp: e,
		err: t
	})) : Promise.resolve({
		valid: t,
		comp: e
	});
}
Q({
	name: "QForm",
	props: {
		autofocus: Boolean,
		noErrorFocus: Boolean,
		noResetFocus: Boolean,
		greedy: Boolean,
		onSubmit: Function
	},
	emits: [
		"reset",
		"validationSuccess",
		"validationError"
	],
	setup(e, { slots: t, emit: n }) {
		let r = h(), i = L(null), a = 0, o = [];
		function s(t) {
			let r = typeof t == "boolean" ? t : !e.noErrorFocus, i = ++a, s = (e, t) => {
				n(`validation${e ? "Success" : "Error"}`, t);
			};
			return (e.greedy ? Promise.all(o.map(Qy)).then((e) => e.filter((e) => !e.valid)) : o.reduce((e, t) => e.then(() => Qy(t)).then((e) => {
				if (!e.valid) throw e;
			}), Promise.resolve()).catch((e) => [e])).then((e) => {
				if (e === void 0 || e.length === 0) return i === a && s(!0), !0;
				if (i === a) {
					let { comp: t, err: n } = e[0];
					if (n !== void 0 && console.error(n), s(!1, t), r) {
						let t = e.find(({ comp: e }) => typeof e.focus == "function" && !rp(e.$));
						t !== void 0 && t.comp.focus();
					}
				}
				return !1;
			});
		}
		function c() {
			a++, o.forEach((e) => {
				typeof e.resetValidation == "function" && e.resetValidation();
			});
		}
		function l(t) {
			t !== void 0 && wd(t);
			let r = a + 1;
			s().then((i) => {
				r === a && i && (e.onSubmit === void 0 ? t?.target !== void 0 && typeof t.target.submit == "function" && t.target.submit() : n("submit", t));
			});
		}
		function u(t) {
			t !== void 0 && wd(t), n("reset"), w(() => {
				c(), e.autofocus && !e.noResetFocus && d();
			});
		}
		function d() {
			om(() => {
				i.value !== null && (i.value.querySelector("[autofocus][tabindex], [data-autofocus][tabindex]") || i.value.querySelector("[autofocus] [tabindex], [data-autofocus] [tabindex]") || i.value.querySelector("[autofocus], [data-autofocus]") || Array.prototype.find.call(i.value.querySelectorAll("[tabindex]"), (e) => e.tabIndex !== -1))?.focus({ preventScroll: !0 });
			});
		}
		F(Xd, {
			bindComponent(e) {
				o.push(e);
			},
			unbindComponent(e) {
				let t = o.indexOf(e);
				t !== -1 && o.splice(t, 1);
			}
		});
		let f = !1;
		return k(() => {
			f = !0;
		}), T(() => {
			f && e.autofocus && d();
		}), A(() => {
			e.autofocus && d();
		}), Object.assign(r.proxy, {
			validate: s,
			resetValidation: c,
			submit: l,
			reset: u,
			focus: d,
			getValidationComponents: () => o
		}), () => _("form", {
			class: "q-form",
			ref: i,
			onSubmit: l,
			onReset: u
		}, $(t.default));
	}
});
function $y(e, t) {
	e.value !== t && (e.value = t);
}
Q({
	name: "QHeader",
	props: {
		modelValue: {
			type: Boolean,
			default: !0
		},
		reveal: Boolean,
		revealOffset: {
			type: Number,
			default: 250
		},
		bordered: Boolean,
		elevated: Boolean,
		heightHint: {
			type: [String, Number],
			default: 50
		}
	},
	emits: ["reveal", "focusin"],
	setup(e, { slots: t, emit: n }) {
		let { proxy: { $q: r } } = h(), i = y(qd, $d);
		if (i === $d) return console.error("QHeader needs to be child of QLayout"), $d;
		let a = L(Number.parseInt(e.heightHint, 10)), s = L(!0), c = o(() => e.reveal || i.view.value.includes("H") || r.platform.is.ios && i.isContainer.value), l = o(() => {
			if (!e.modelValue) return 0;
			if (c.value) return s.value ? a.value : 0;
			let t = a.value - i.scroll.value.position;
			return Math.max(t, 0);
		}), u = o(() => !e.modelValue || c.value && !s.value), d = o(() => e.modelValue && u.value && e.reveal), f = o(() => "q-header q-layout__section--marginal " + (c.value ? "fixed" : "absolute") + "-top" + (e.bordered ? " q-header--bordered" : "") + (u.value ? " q-header--hidden" : "") + (e.modelValue ? "" : " q-layout--prevent-focus")), p = o(() => {
			let e = i.rows.value.top, t = {};
			return e[0] === "l" && i.left.space && (t[r.lang.rtl ? "right" : "left"] = `${i.left.size}px`), e[2] === "r" && i.right.space && (t[r.lang.rtl ? "left" : "right"] = `${i.right.size}px`), t;
		});
		function m(e, t) {
			i.update("header", e, t);
		}
		function g({ height: e }) {
			$y(a, e), m("size", e);
		}
		function v(e) {
			d.value && $y(s, !0), n("focusin", e);
		}
		G(() => e.modelValue, (e) => {
			m("space", e), $y(s, !0), i.animate();
		}), G(l, (e) => {
			m("offset", e);
		}), G(() => e.reveal, (t) => {
			t || $y(s, e.modelValue);
		}), G(s, (e) => {
			i.animate(), n("reveal", e);
		}), G(i.scroll, (t) => {
			e.reveal && $y(s, t.direction === "up" || t.position <= e.revealOffset || t.position - t.inflectionPoint < 100);
		});
		let b = {};
		return i.instances.header = b, e.modelValue && m("size", a.value), m("space", e.modelValue), m("offset", l.value), D(() => {
			i.instances.header === b && (i.instances.header = void 0, m("size", 0), m("offset", 0), m("space", !1));
		}), () => {
			let n = Df(t.default, []);
			return e.elevated && n.push(_("div", { class: "q-layout__shadow absolute-full overflow-hidden no-pointer-events" })), n.push(_(kg, {
				debounce: 0,
				onResize: g
			})), _("header", {
				class: f.value,
				style: p.value,
				onFocusin: v
			}, n);
		};
	}
});
var eb = { ratio: [String, Number] };
function tb(e, t) {
	return o(() => {
		let n = e.ratio || t?.value;
		if (typeof n == "string" && n.trim() === "") return null;
		let r = Number(n);
		return Number.isFinite(r) && r > 0 ? { paddingBottom: `${100 / r}%` } : null;
	});
}
var nb = 1.7778;
Q({
	name: "QImg",
	props: {
		...eb,
		src: String,
		srcset: String,
		sizes: String,
		alt: String,
		crossorigin: String,
		decoding: String,
		referrerpolicy: String,
		draggable: Boolean,
		loading: {
			type: String,
			default: "lazy"
		},
		loadingShowDelay: {
			type: [Number, String],
			default: 0
		},
		fetchpriority: {
			type: String,
			default: "auto"
		},
		width: String,
		height: String,
		initialRatio: {
			type: [Number, String],
			default: nb
		},
		placeholderSrc: String,
		errorSrc: String,
		fit: {
			type: String,
			default: "cover"
		},
		position: {
			type: String,
			default: "50% 50%"
		},
		imgClass: String,
		imgStyle: Object,
		noSpinner: Boolean,
		noNativeMenu: Boolean,
		noTransition: Boolean,
		spinnerColor: String,
		spinnerSize: String
	},
	emits: ["load", "error"],
	setup(e, { slots: t, emit: n }) {
		let r = L(e.initialRatio), i = tb(e, r), s = h(), { registerTimeout: c, removeTimeout: l } = xm(), { registerTimeout: u, removeTimeout: d } = xm(), f = o(() => e.placeholderSrc === void 0 ? null : { src: e.placeholderSrc }), p = o(() => e.errorSrc === void 0 ? null : {
			src: e.errorSrc,
			__qerror: !0
		}), m = [L(null), L(f.value)], g = L(0), v = L(!1), y = L(!1), b = o(() => `q-img q-img--${e.noNativeMenu ? "no-" : ""}menu`), x = o(() => ({
			width: e.width,
			height: e.height
		})), S = o(() => `q-img__image ${e.imgClass === void 0 ? "" : e.imgClass + " "}q-img__image--with${e.noTransition ? "out" : ""}-transition q-img__image--`), C = o(() => ({
			...e.imgStyle,
			objectFit: e.fit,
			objectPosition: e.position
		}));
		function w() {
			if (d(), e.loadingShowDelay === 0) {
				v.value = !0;
				return;
			}
			u(() => {
				v.value = !0;
			}, e.loadingShowDelay);
		}
		function T() {
			d(), v.value = !1;
		}
		function E({ target: e }) {
			rp(s) || (l(), r.value = e.naturalHeight === 0 ? .5 : e.naturalWidth / e.naturalHeight, D(e, 1));
		}
		function D(e, t) {
			t === 1e3 || rp(s) || (e.complete ? O(e) : c(() => {
				D(e, t + 1);
			}, 50));
		}
		function O(e) {
			rp(s) || (g.value ^= 1, m[g.value].value = null, T(), e.getAttribute("__qerror") !== "true" && (y.value = !1), n("load", e.currentSrc || e.src));
		}
		function k(e) {
			l(), T(), y.value = !0, m[g.value].value = p.value, m[g.value ^ 1].value = f.value, n("error", e);
		}
		function j(t) {
			let n = m[t].value, r = {
				key: "img_" + t,
				class: S.value,
				style: C.value,
				alt: e.alt,
				crossorigin: e.crossorigin,
				decoding: e.decoding,
				referrerpolicy: e.referrerpolicy,
				height: e.height,
				width: e.width,
				loading: e.loading,
				fetchpriority: e.fetchpriority,
				"aria-hidden": "true",
				draggable: e.draggable,
				...n
			};
			return g.value === t ? Object.assign(r, {
				class: r.class + "current",
				onLoad: E,
				onError: k
			}) : r.class += "loaded", _("div", {
				class: "q-img__container absolute-full",
				key: "img" + t
			}, _("img", r));
		}
		function M() {
			return v.value ? _("div", {
				key: "loading",
				class: "q-img__loading absolute-full flex flex-center"
			}, t.loading === void 0 ? e.noSpinner ? void 0 : [_(gp, {
				color: e.spinnerColor,
				size: e.spinnerSize
			})] : t.loading()) : _("div", {
				key: "content",
				class: "q-img__content absolute-full q-anchor--skip"
			}, $(t[y.value ? "error" : "default"]));
		}
		{
			let t = () => {
				G(() => e.src || e.srcset || e.sizes ? {
					src: e.src,
					srcset: e.srcset,
					sizes: e.sizes
				} : null, (e) => {
					l(), y.value = !1, e === null ? (T(), m[g.value ^ 1].value = f.value) : w(), m[g.value].value = e;
				}, { immediate: !0 });
			};
			od.value ? A(t) : t();
		}
		return () => {
			let t = [];
			return i.value !== null && t.push(_("div", {
				key: "filler",
				style: i.value
			})), m[0].value !== null && t.push(j(0)), m[1].value !== null && t.push(j(1)), t.push(_(a, { name: "q-transition--fade" }, M)), _("div", {
				key: "main",
				class: b.value,
				style: x.value,
				role: "img",
				"aria-label": e.alt
			}, t);
		};
	}
});
var { passive: rb } = vd;
Q({
	name: "QInfiniteScroll",
	props: {
		offset: {
			type: Number,
			default: 500
		},
		debounce: {
			type: [String, Number],
			default: 100
		},
		scrollTarget: Sm,
		initialIndex: {
			type: Number,
			default: 0
		},
		disable: Boolean,
		reverse: Boolean
	},
	emits: ["load"],
	setup(e, { slots: t, emit: n }) {
		let r = L(!1), i = L(!0), a = L(null), s = L(null), c = e.initialIndex, l, u, d = o(() => "q-infinite-scroll__loading" + (r.value ? "" : " invisible"));
		function f() {
			if (e.disable || r.value || !i.value) return;
			let t = Tm(l), n = Em(l), a = vp(l);
			e.reverse ? Math.round(n) <= e.offset && p() : Math.round(n + a + e.offset) >= Math.round(t) && p();
		}
		function p() {
			if (e.disable || r.value || !i.value) return;
			c++, r.value = !0;
			let t = Tm(l);
			n("load", c, (n) => {
				i.value && (r.value = !1, w(() => {
					if (e.reverse) {
						let e = Tm(l), n = Em(l), r = e - t;
						Mm(l, n + r);
					}
					n === !0 ? v() : a.value?.closest("body") && u();
				}));
			});
		}
		function m() {
			c = 0;
		}
		function g() {
			i.value || (i.value = !0, l.addEventListener("scroll", u, rb)), f();
		}
		function v() {
			i.value && (i.value = !1, r.value = !1, l.removeEventListener("scroll", u, rb), u?.cancel?.());
		}
		function y() {
			if (l && i.value && l.removeEventListener("scroll", u, rb), l = wm(a.value, e.scrollTarget), i.value) {
				if (l.addEventListener("scroll", u, rb), e.reverse) {
					let e = Tm(l), t = vp(l);
					Mm(l, e - t);
				}
				f();
			}
		}
		function b(e) {
			c = e;
		}
		function x(e) {
			e = Number.parseInt(e, 10);
			let t = u;
			u = e <= 0 ? f : Od(f, Number.isNaN(e) ? 100 : e), l && i.value && (t !== void 0 && l.removeEventListener("scroll", t, rb), l.addEventListener("scroll", u, rb));
		}
		function S(e) {
			if (C.value) {
				if (s.value === null) {
					e || w(() => {
						S(!0);
					});
					return;
				}
				let t = `${r.value ? "un" : ""}pauseAnimations`;
				[...s.value.getElementsByTagName("svg")].forEach((e) => {
					e[t]();
				});
			}
		}
		let C = o(() => !e.disable && i.value);
		G([r, C], () => {
			S();
		}), G(() => e.disable, (e) => {
			e ? v() : g();
		}), G(() => e.reverse, () => {
			!r.value && i.value && f();
		}), G(() => e.scrollTarget, y), G(() => e.debounce, x);
		let E = !1;
		T(() => {
			E !== !1 && l && Mm(l, E);
		}), k(() => {
			E = l ? Em(l) : !1;
		}), D(() => {
			i.value && l.removeEventListener("scroll", u, rb);
		}), A(() => {
			x(e.debounce), y(), r.value || S();
		});
		let O = h();
		return Object.assign(O.proxy, {
			poll: () => {
				u?.();
			},
			trigger: p,
			stop: v,
			reset: m,
			resume: g,
			setIndex: b,
			updateScrollTarget: y
		}), () => {
			let n = Df(t.default, []);
			return C.value && n[e.reverse ? "unshift" : "push"](_("div", {
				ref: s,
				class: d.value
			}, $(t.loading))), _("div", {
				class: "q-infinite-scroll",
				ref: a
			}, n);
		};
	}
}), Q({
	name: "QInnerLoading",
	props: {
		...qf,
		...vm,
		showing: Boolean,
		color: String,
		size: {
			type: [String, Number],
			default: "42px"
		},
		label: String,
		labelClass: String,
		labelStyle: [
			String,
			Array,
			Object
		]
	},
	setup(e, { slots: t }) {
		let n = Jf(e, h().proxy.$q), { transitionProps: r, transitionStyle: i } = ym(e), s = o(() => "q-inner-loading q--avoid-card-border absolute-full column flex-center" + (n.value ? " q-inner-loading--dark" : "")), c = o(() => "q-inner-loading__label" + (e.labelClass === void 0 ? "" : ` ${e.labelClass}`));
		function l() {
			let t = [_(gp, {
				size: e.size,
				color: e.color
			})];
			return e.label !== void 0 && t.push(_("div", {
				class: c.value,
				style: e.labelStyle
			}, [e.label])), t;
		}
		function u() {
			return e.showing ? _("div", {
				class: s.value,
				style: i.value
			}, t.default === void 0 ? l() : t.default()) : null;
		}
		return () => _(a, r.value, u);
	}
});
var ib = {
	date: "####/##/##",
	datetime: "####/##/## ##:##",
	time: "##:##",
	fulltime: "##:##:##",
	phone: "(###) ### - ####",
	card: "#### #### #### ####"
}, { tokenMap: ab, tokenKeys: ob } = sb({
	"#": {
		pattern: "[\\d]",
		negate: "[^\\d]"
	},
	S: {
		pattern: "[a-zA-Z]",
		negate: "[^a-zA-Z]"
	},
	N: {
		pattern: "[0-9a-zA-Z]",
		negate: "[^0-9a-zA-Z]"
	},
	A: {
		pattern: "[a-zA-Z]",
		negate: "[^a-zA-Z]",
		transform: (e) => e.toLocaleUpperCase()
	},
	a: {
		pattern: "[a-zA-Z]",
		negate: "[^a-zA-Z]",
		transform: (e) => e.toLocaleLowerCase()
	},
	X: {
		pattern: "[0-9a-zA-Z]",
		negate: "[^0-9a-zA-Z]",
		transform: (e) => e.toLocaleUpperCase()
	},
	x: {
		pattern: "[0-9a-zA-Z]",
		negate: "[^0-9a-zA-Z]",
		transform: (e) => e.toLocaleLowerCase()
	}
});
function sb(e) {
	let t = Object.keys(e), n = {};
	return t.forEach((t) => {
		let r = e[t];
		n[t] = {
			...r,
			regex: new RegExp(r.pattern)
		};
	}), {
		tokenMap: n,
		tokenKeys: t
	};
}
function cb(e) {
	return RegExp("\\\\([^.*+?^${}()|([\\]])|([.*+?^${}()|[\\]])|([" + e.join("") + "])|(.)", "g");
}
var lb = /[.*+?^${}()|[\]\\]/g, ub = cb(ob), db = String.fromCodePoint(1), fb = {
	mask: String,
	reverseFillMask: Boolean,
	fillMask: [Boolean, String],
	unmaskedValue: Boolean,
	maskTokens: Object
};
function pb(e, t, n, r) {
	let i, a, s, c, l, u, d = o(() => {
		if (e.maskTokens === void 0 || e.maskTokens === null) return {
			tokenMap: ab,
			tokenRegexMask: ub
		};
		let { tokenMap: t } = sb(e.maskTokens), n = {
			...ab,
			...t
		};
		return {
			tokenMap: n,
			tokenRegexMask: cb(Object.keys(n))
		};
	}), f = L(null), p = L(h());
	function m() {
		return e.autogrow || [
			"textarea",
			"text",
			"search",
			"url",
			"tel",
			"password"
		].includes(e.type);
	}
	G(() => e.type + e.autogrow, _), G(() => e.mask, (n) => {
		if (n !== void 0) v(p.value, !0);
		else {
			let n = E(p.value);
			_(), e.modelValue !== n && t("update:modelValue", n);
		}
	}), G(() => e.fillMask + e.reverseFillMask, () => {
		f.value && v(p.value, !0);
	}), G(() => e.unmaskedValue, () => {
		f.value && v(p.value);
	});
	function h() {
		if (_(), f.value) {
			let t = C(E(e.modelValue));
			return e.fillMask === !1 ? t : D(t);
		}
		return e.modelValue;
	}
	function g(e) {
		if (e < i.length) return i.slice(-e);
		let t = "", n = i, r = n.indexOf(db);
		if (r !== -1) {
			for (let r = e - n.length; r > 0; r--) t += db;
			n = n.slice(0, r) + t + n.slice(r);
		}
		return n;
	}
	function _() {
		if (f.value = e.mask !== void 0 && e.mask.length !== 0 && m(), !f.value) {
			c = void 0, i = "", a = "";
			return;
		}
		let t = ib[e.mask] === void 0 ? e.mask : ib[e.mask], n = typeof e.fillMask == "string" && e.fillMask.length !== 0 ? e.fillMask.slice(0, 1) : "_", r = n.replace(lb, String.raw`\$&`), o = [], l = [], u = [], p = e.reverseFillMask, h = "", g = "";
		t.replace(d.value.tokenRegexMask, (e, t, n, r, i) => {
			if (r !== void 0) {
				let e = d.value.tokenMap[r];
				u.push(e), g = e.negate, p &&= (l.push("(?:" + g + "+)?(" + e.pattern + "+)?(?:" + g + "+)?(" + e.pattern + "+)?"), !1), l.push("(?:" + g + "+)?(" + e.pattern + ")?");
				return;
			}
			if (n !== void 0) h = "\\" + (n === "\\" ? "" : n), u.push(n);
			else {
				let e = t === void 0 ? i : t;
				h = e === "\\" ? String.raw`\\\\` : e.replace(lb, String.raw`\\$&`), u.push(e);
			}
			o.push("([^" + h + "]+)?" + h + "?");
		});
		let _ = RegExp("^" + o.join("") + "(" + (h === "" ? "." : "[^" + h + "]") + "+)?" + (h === "" ? "" : "[" + h + "]*") + "$"), v = l.length - 1, y = l.map((t, n) => n === 0 && e.reverseFillMask ? RegExp("^" + r + "*" + t) : RegExp(n === v ? "^" + t + "(" + (g === "" ? "." : g) + "+)?" + (e.reverseFillMask ? "$" : r + "*") : "^" + t));
		s = u, c = (t) => {
			let n = _.exec(e.reverseFillMask ? t : t.slice(0, u.length + 1));
			n !== null && (t = n.slice(1).join(""));
			let r = [], i = y.length;
			for (let e = 0, n = t; e < i; e++) {
				let t = y[e].exec(n);
				if (t === null) break;
				n = n.slice(t.shift().length), r.push(...t);
			}
			return r.length === 0 ? t : r.join("");
		}, i = u.map((e) => typeof e == "string" ? e : db).join(""), a = i.split(db).join(n);
	}
	function v(t, o, s) {
		let c = r.value, u = c.selectionEnd, d = c.value.length - u, f = E(t);
		o === !0 && _();
		let m = C(f, o), h = e.fillMask === !1 ? m : D(m), g = p.value !== h;
		c.value !== h && (c.value = h), g && (p.value = h), document.activeElement === c && w(() => {
			if (h === a) {
				let t = e.reverseFillMask ? a.length : 0;
				c.setSelectionRange(t, t, "forward");
				return;
			}
			if (s === "insertFromPaste" && !e.reverseFillMask) {
				let e = c.selectionEnd, t = u - 1;
				for (let n = l; n <= t && n < e; n++) i[n] !== db && t++;
				b.right(c, t);
				return;
			}
			if (["deleteContentBackward", "deleteContentForward"].includes(s)) {
				let t = e.reverseFillMask ? u === 0 ? +(h.length > m.length) : Math.max(0, h.length - (h === a ? 0 : Math.min(m.length, d) + 1)) + 1 : u;
				c.setSelectionRange(t, t, "forward");
				return;
			}
			if (e.reverseFillMask) if (g) {
				let e = Math.max(0, h.length - (h === a ? 0 : Math.min(m.length, d + 1)));
				e === 1 && u === 1 ? c.setSelectionRange(e, e, "forward") : b.rightReverse(c, e);
			} else {
				let e = h.length - d;
				c.setSelectionRange(e, e, "backward");
			}
			else if (g) {
				let e = Math.max(0, i.indexOf(db), Math.min(m.length, u) - 1);
				b.right(c, e);
			} else {
				let e = u - 1;
				b.right(c, e);
			}
		});
		let v = e.unmaskedValue ? E(h) : h;
		String(e.modelValue) !== v && (e.modelValue !== null || v !== "") && n(v, !0);
	}
	function y(e, t, n) {
		let r = C(E(e.value));
		t = Math.max(0, i.indexOf(db), Math.min(r.length, t)), l = t, e.setSelectionRange(t, n, "forward");
	}
	let b = {
		left(e, t) {
			let n = !i.slice(t - 1).includes(db), r = Math.max(0, t - 1);
			for (; r >= 0; r--) if (i[r] === db) {
				t = r, n && t++;
				break;
			}
			if (r < 0 && i[t] !== void 0 && i[t] !== db) return b.right(e, 0);
			t >= 0 && e.setSelectionRange(t, t, "backward");
		},
		right(e, t) {
			let n = e.value.length, r = Math.min(n, t + 1);
			for (; r <= n; r++) if (i[r] === db) {
				t = r;
				break;
			} else i[r - 1] === db && (t = r);
			if (r > n && i[t - 1] !== void 0 && i[t - 1] !== db) return b.left(e, n);
			e.setSelectionRange(t, t, "forward");
		},
		leftReverse(e, t) {
			let n = g(e.value.length), r = Math.max(0, t - 1);
			for (; r >= 0; r--) if (n[r - 1] === db) {
				t = r;
				break;
			} else if (n[r] === db && (t = r, r === 0)) break;
			if (r < 0 && n[t] !== void 0 && n[t] !== db) return b.rightReverse(e, 0);
			t >= 0 && e.setSelectionRange(t, t, "backward");
		},
		rightReverse(e, t) {
			let n = e.value.length, r = g(n), i = !r.slice(0, t + 1).includes(db), a = Math.min(n, t + 1);
			for (; a <= n; a++) if (r[a - 1] === db) {
				t = a, t > 0 && i && t--;
				break;
			}
			if (a > n && r[t - 1] !== void 0 && r[t - 1] !== db) return b.leftReverse(e, n);
			e.setSelectionRange(t, t, "forward");
		}
	};
	function x(e) {
		t("click", e), u = void 0;
	}
	function S(n) {
		if (t("keydown", n), Nd(n) || n.altKey) return;
		let i = r.value, a = i.selectionStart, o = i.selectionEnd;
		if (n.shiftKey || (u = void 0), n.keyCode === 37 || n.keyCode === 39) {
			n.shiftKey && u === void 0 && (u = i.selectionDirection === "forward" ? a : o);
			let t = b[(n.keyCode === 39 ? "right" : "left") + (e.reverseFillMask ? "Reverse" : "")];
			if (n.preventDefault(), t(i, u === a ? o : a), n.shiftKey) {
				let e = i.selectionStart;
				i.setSelectionRange(Math.min(u, e), Math.max(u, e), "forward");
			}
		} else n.keyCode === 8 && !e.reverseFillMask && a === o ? (b.left(i, a), i.setSelectionRange(i.selectionStart, o, "backward")) : n.keyCode === 46 && e.reverseFillMask && a === o && (b.rightReverse(i, o), i.setSelectionRange(a, i.selectionEnd, "forward"));
	}
	function C(t, n) {
		if (t == null || t === "") return "";
		if (e.reverseFillMask) return T(t, n);
		let r = s, i = 0, a = "";
		for (let e = 0; e < r.length; e++) {
			let o = t[i], s = r[e];
			if (typeof s == "string") a += s, n === !0 && o === s && i++;
			else if (o !== void 0 && s.regex.test(o)) a += s.transform === void 0 ? o : s.transform(o), i++;
			else return a;
		}
		return a;
	}
	function T(e, t) {
		let n = s, r = i.indexOf(db), a = e.length - 1, o = "";
		for (let i = n.length - 1; i >= 0 && a !== -1; i--) {
			let s = n[i], c = e[a];
			if (typeof s == "string") o = s + o, t === !0 && c === s && a--;
			else if (c !== void 0 && s.regex.test(c)) do
				o = (s.transform === void 0 ? c : s.transform(c)) + o, a--, c = e[a];
			while (r === i && c !== void 0 && s.regex.test(c));
			else return o;
		}
		return o;
	}
	function E(e) {
		return typeof e != "string" || c === void 0 ? typeof e == "number" ? c(String(e)) : e : c(e);
	}
	function D(t) {
		return a.length - t.length <= 0 ? t : e.reverseFillMask && t.length !== 0 ? a.slice(0, -t.length) + t : t + a.slice(t.length);
	}
	return {
		innerValue: p,
		hasMask: f,
		moveCursorForPaste: y,
		updateMaskValue: v,
		onMaskedKeydown: S,
		onMaskedClick: x
	};
}
var mb = /[\u3000-\u303F\u3040-\u309F\u30A0-\u30FF\uFF00-\uFF9F\u4E00-\u9FAF\u3400-\u4DBF]/, hb = /[\u4E00-\u9FFF\u3400-\u4DBF\u{20000}-\u{2A6DF}\u{2A700}-\u{2B73F}\u{2B740}-\u{2B81F}\u{2B820}-\u{2CEAF}\uF900-\uFAFF\u3300-\u33FF\uFE30-\uFE4F\uF900-\uFAFF\u{2F800}-\u{2FA1F}]/u, gb = /[\u3131-\u314E\u314F-\u3163\uAC00-\uD7A3]/, _b = /[a-z0-9_ -]$/i;
function vb(e) {
	return function(t) {
		if (t.type === "compositionend" || t.type === "change") {
			if (!t.target.qComposing) return;
			t.target.qComposing = !1, e(t);
		} else t.type === "compositionupdate" && !t.target.qComposing && typeof t.data == "string" && (md.is.firefox ? !_b.test(t.data) : mb.test(t.data) || hb.test(t.data) || gb.test(t.data)) && (t.target.qComposing = !0);
	};
}
var yb = Q({
	name: "QInput",
	inheritAttrs: !1,
	props: {
		...Ry,
		...fb,
		...Ch,
		modelValue: [
			String,
			Number,
			FileList
		],
		shadowText: String,
		type: {
			type: String,
			default: "text"
		},
		debounce: [String, Number],
		autogrow: Boolean,
		inputClass: [
			Array,
			String,
			Object
		],
		inputStyle: [
			Array,
			String,
			Object
		]
	},
	emits: [
		...zy,
		"paste",
		"change",
		"keydown",
		"click",
		"animationend"
	],
	setup(e, { emit: t, attrs: n }) {
		let { proxy: r } = h(), { $q: i } = r, a = {}, s = NaN, c = !1, l = !1, u = null, d, f = L(null), p = Eh(e), { innerValue: m, hasMask: g, moveCursorForPaste: v, updateMaskValue: y, onMaskedKeydown: b, onMaskedClick: x } = pb(e, t, z, f), S = Yy(e, !0), C = o(() => Iy(m.value)), T = vb(I), E = By({ changeEvent: !0 }), O = o(() => e.type === "textarea" || e.autogrow), k = o(() => O.value || [
			"text",
			"search",
			"url",
			"tel",
			"password"
		].includes(e.type)), j = o(() => {
			let t = {
				...E.splitAttrs.listeners.value,
				onInput: I,
				onPaste: F,
				onChange: V,
				onBlur: ee,
				onFocus: Sd
			};
			return t.onCompositionstart = t.onCompositionupdate = t.onCompositionend = T, g.value && (t.onKeydown = b, t.onClick = x), e.autogrow && (t.onAnimationend = R), t;
		}), M = o(() => {
			let t = {
				tabindex: 0,
				"data-autofocus": e.autofocus || void 0,
				rows: e.type === "textarea" ? 6 : void 0,
				"aria-label": e.label,
				name: p.value,
				...E.splitAttrs.attributes.value,
				id: E.targetUid.value,
				maxlength: e.maxlength,
				disabled: e.disable,
				readonly: e.readonly
			};
			return O.value || (t.type = e.type), e.autogrow && (t.rows = 1), t;
		});
		G(() => e.type, () => {
			f.value && (f.value.value = e.modelValue);
		}), G(() => e.modelValue, (t) => {
			if (g.value) {
				if (l && (l = !1, String(t) === s)) return;
				y(t);
			} else m.value !== t && (m.value = t, e.type === "number" && Object.hasOwn(a, "value") && (c ? c = !1 : delete a.value));
			e.autogrow && w(B);
		}), G(() => e.autogrow, (e) => {
			e ? w(B) : f.value !== null && n.rows > 0 && (f.value.style.height = "auto");
		}), G(() => e.dense, () => {
			e.autogrow && w(B);
		});
		function N() {
			om(() => {
				let e = document.activeElement;
				f.value !== null && f.value !== e && (e === null || e.id !== E.targetUid.value) && f.value.focus({ preventScroll: !0 });
			});
		}
		function P() {
			f.value?.select();
		}
		function F(n) {
			if (g.value && e.reverseFillMask !== !0) {
				let e = n.target;
				v(e, e.selectionStart, e.selectionEnd);
			}
			t("paste", n);
		}
		function I(n) {
			if (!n || !n.target) return;
			if (e.type === "file") {
				t("update:modelValue", n.target.files);
				return;
			}
			let r = n.target.value;
			if (n.target.qComposing) {
				a.value = r;
				return;
			}
			if (g.value) y(r, !1, n.inputType);
			else if (z(r), k.value && n.target === document.activeElement) {
				let { selectionStart: e, selectionEnd: t } = n.target;
				e !== void 0 && t !== void 0 && w(() => {
					n.target === document.activeElement && r.indexOf(n.target.value) === 0 && n.target.setSelectionRange(e, t);
				});
			}
			e.autogrow && B();
		}
		function R(e) {
			t("animationend", e), B();
		}
		function z(n, r) {
			d = () => {
				u = null, e.type !== "number" && Object.hasOwn(a, "value") && delete a.value, e.modelValue !== n && s !== n && (s = n, r === !0 && (l = !0), t("update:modelValue", n), w(() => {
					s === n && (s = NaN);
				})), d = void 0;
			}, e.type === "number" && (c = !0, a.value = n), e.debounce === void 0 ? d() : (u !== null && clearTimeout(u), a.value = n, u = setTimeout(d, e.debounce));
		}
		function B() {
			requestAnimationFrame(() => {
				let e = f.value;
				if (e !== null) {
					let t = e.parentNode.style, { scrollTop: n } = e, { overflowY: r, maxHeight: a } = i.platform.is.firefox ? {} : window.getComputedStyle(e), o = r !== void 0 && r !== "scroll";
					o && (e.style.overflowY = "hidden"), t.marginBottom = e.scrollHeight - 1 + "px", e.style.height = "1px", e.style.height = e.scrollHeight + "px", o && (e.style.overflowY = Number.parseInt(a, 10) < e.scrollHeight ? "auto" : "hidden"), t.marginBottom = "", e.scrollTop = n;
				}
			});
		}
		function V(e) {
			T(e), u !== null && (clearTimeout(u), u = null), d?.(), t("change", e.target.value);
		}
		function ee(t) {
			t !== void 0 && Sd(t), u !== null && (clearTimeout(u), u = null), d?.(), c = !1, l = !1, delete a.value, e.type !== "file" && setTimeout(() => {
				f.value !== null && (f.value.value = m.value === void 0 ? "" : m.value);
			});
		}
		function te() {
			return Object.hasOwn(a, "value") ? a.value : m.value === void 0 ? "" : m.value;
		}
		D(() => {
			ee();
		}), A(() => {
			e.autogrow && B();
		}), Object.assign(E, {
			innerValue: m,
			fieldClass: o(() => `q-${O.value ? "textarea" : "input"}` + (e.autogrow ? " q-textarea--autogrow" : "")),
			hasShadow: o(() => e.type !== "file" && typeof e.shadowText == "string" && e.shadowText.length !== 0),
			inputRef: f,
			emitValue: z,
			hasValue: C,
			floatingLabel: o(() => C.value && (e.type !== "number" || Number.isFinite(Number(m.value))) || Iy(e.displayValue)),
			getControl: () => _(O.value ? "textarea" : "input", {
				ref: f,
				class: ["q-field__native q-placeholder", e.inputClass],
				style: e.inputStyle,
				...M.value,
				...j.value,
				...e.type === "file" ? S.value : { value: te() }
			}),
			getShadowControl: () => _("div", { class: "q-field__native q-field__shadow absolute-bottom no-pointer-events" + (O.value ? "" : " text-no-wrap") }, [_("span", { class: "invisible" }, te()), _("span", e.shadowText)])
		});
		let H = Hy(E);
		return Object.assign(r, {
			focus: N,
			select: P,
			getNativeElement: () => f.value
		}), id(r, "nativeEl", () => f.value), H;
	}
}), bb = {
	threshold: 0,
	root: null,
	rootMargin: "0px"
};
function xb(e, t, n) {
	let r, i, a;
	typeof n == "function" ? (r = n, i = bb, a = t.cfg === void 0) : (r = n.handler, i = {
		...bb,
		...n.cfg
	}, a = t.cfg === void 0 || !ef(t.cfg, i)), t.handler !== r && (t.handler = r), a && (t.cfg = i, t.observer?.unobserve(e), t.observer = new IntersectionObserver(([n]) => {
		if (typeof t.handler == "function") {
			if (n.rootBounds === null && document.body.contains(e)) {
				t.observer.unobserve(e), t.observer.observe(e);
				return;
			}
			(t.handler(n, t.observer) === !1 || t.once && n.isIntersecting) && Sb(e);
		}
	}, i), t.observer.observe(e));
}
function Sb(e) {
	let t = e.__qvisible;
	t !== void 0 && (t.observer?.unobserve(e), delete e.__qvisible);
}
var Cb = gd({
	name: "intersection",
	mounted(e, { modifiers: t, value: n }) {
		let r = { once: t.once === !0 };
		xb(e, r, n), e.__qvisible = r;
	},
	updated(e, t) {
		let n = e.__qvisible;
		n !== void 0 && xb(e, n, t.value);
	},
	beforeUnmount: Sb
});
Q({
	name: "QIntersection",
	props: {
		tag: {
			type: String,
			default: "div"
		},
		once: Boolean,
		transition: String,
		transitionDuration: {
			type: [String, Number],
			default: 300
		},
		ssrPrerender: Boolean,
		margin: String,
		threshold: [Number, Array],
		root: { default: null },
		disable: Boolean,
		onVisibility: Function
	},
	setup(e, { slots: t, emit: n }) {
		let r = L(od.value ? e.ssrPrerender : !1), i = o(() => e.root !== void 0 || e.margin !== void 0 || e.threshold !== void 0 ? {
			handler: u,
			cfg: {
				root: e.root,
				rootMargin: e.margin,
				threshold: e.threshold
			}
		} : u), s = o(() => !e.disable && (!od.value || !e.once || !e.ssrPrerender)), c = o(() => [[
			Cb,
			i.value,
			void 0,
			{ once: e.once }
		]]), l = o(() => `--q-transition-duration: ${e.transitionDuration}ms`);
		function u(t) {
			r.value !== t.isIntersecting && (r.value = t.isIntersecting, e.onVisibility !== void 0 && n("visibility", r.value));
		}
		function d() {
			if (r.value) return [_("div", {
				key: "content",
				style: l.value
			}, $(t.default))];
			if (t.hidden !== void 0) return [_("div", {
				key: "hidden",
				style: l.value
			}, t.hidden())];
		}
		return () => {
			let t = e.transition ? [_(a, { name: "q-transition--" + e.transition }, d)] : d();
			return Af(e.tag, { class: "q-intersection" }, t, "main", s.value, () => c.value);
		};
	}
});
var wb = ["ul", "ol"], Tb = Q({
	name: "QList",
	props: {
		...qf,
		bordered: Boolean,
		dense: Boolean,
		separator: Boolean,
		padding: Boolean,
		tag: {
			type: String,
			default: "div"
		}
	},
	setup(e, { slots: t }) {
		let n = Jf(e, h().proxy.$q), r = o(() => wb.includes(e.tag) ? null : "list"), i = o(() => "q-list" + (e.bordered ? " q-list--bordered" : "") + (e.dense ? " q-list--dense" : "") + (e.separator ? " q-list--separator" : "") + (n.value ? " q-list--dark" : "") + (e.padding ? " q-list--padding" : ""));
		return () => _(e.tag, {
			class: i.value,
			role: r.value
		}, $(t.default));
	}
}), Eb = [
	34,
	37,
	40,
	33,
	39,
	38
], Db = Object.keys(sg);
Q({
	name: "QKnob",
	props: {
		...Ch,
		...sg,
		modelValue: {
			type: Number,
			required: !0
		},
		innerMin: Number,
		innerMax: Number,
		step: {
			type: Number,
			default: 1,
			validator: (e) => e >= 0
		},
		tabindex: {
			type: [Number, String],
			default: 0
		},
		disable: Boolean,
		readonly: Boolean
	},
	emits: [
		"update:modelValue",
		"change",
		"dragValue"
	],
	setup(e, { slots: t, emit: n }) {
		let { proxy: r } = h(), { $q: i } = r, a = L(e.modelValue), s = L(!1), c = o(() => !Number.isFinite(e.innerMin) || e.innerMin < e.min ? e.min : e.innerMin), l = o(() => !Number.isFinite(e.innerMax) || e.innerMax > e.max ? e.max : e.innerMax), u;
		function d() {
			a.value = e.modelValue === null ? c.value : df(e.modelValue, c.value, l.value), A(!0);
		}
		G(() => `${e.modelValue}|${c.value}|${l.value}`, d), d();
		let f = o(() => !e.disable && !e.readonly), p = o(() => "q-knob non-selectable" + (f.value ? " q-knob--editable" : e.disable ? " disabled" : "")), m = o(() => (String(e.step).trim().split(".")[1] || "").length), g = o(() => e.step === 0 ? 1 : e.step), v = o(() => e.instantFeedback || s.value), y = i.platform.is.mobile ? o(() => f.value ? { onClick: E } : {}) : o(() => f.value ? {
			onMousedown: T,
			onClick: E,
			onKeydown: D,
			onKeyup: k
		} : {}), b = o(() => f.value ? { tabindex: e.tabindex } : { [`aria-${e.disable ? "disabled" : "readonly"}`]: "true" }), x = o(() => {
			let t = {};
			return Db.forEach((n) => {
				t[n] = e[n];
			}), t;
		});
		function S(e) {
			if (e.isFinal) {
				O(e.evt, !0), s.value = !1;
				return;
			}
			e.isFirst && (w(), s.value = !0), O(e.evt, !1);
		}
		let C = o(() => [[
			gg,
			S,
			void 0,
			{
				prevent: !0,
				stop: !0,
				mouse: !0
			}
		]]);
		function w() {
			let { top: e, left: t, width: n, height: i } = r.$el.getBoundingClientRect();
			u = {
				top: e + i / 2,
				left: t + n / 2
			};
		}
		function T(e) {
			w(), O(e, !1);
		}
		function E(e) {
			w(), O(e, !0);
		}
		function D(e) {
			if (!Eb.includes(e.keyCode)) return;
			wd(e);
			let t = ([34, 33].includes(e.keyCode) ? 10 : 1) * g.value, n = [
				34,
				37,
				40
			].includes(e.keyCode) ? -t : t;
			a.value = df(Number.parseFloat((a.value + n).toFixed(m.value)), c.value, l.value), A(!1);
		}
		function O(t, r) {
			let o = xd(t), s = Math.abs(o.top - u.top), d = Math.hypot(s, o.left - u.left), f = Math.asin(s / d) * (180 / Math.PI);
			f = o.top < u.top ? u.left < o.left ? 90 - f : 270 + f : u.left < o.left ? f + 90 : 270 - f, i.lang.rtl ? f = ff(-f - e.angle, 0, 360) : e.angle && (f = ff(f - e.angle, 0, 360)), e.reverse && (f = 360 - f);
			let p = e.min + f / 360 * (e.max - e.min);
			if (g.value !== 0) {
				let e = p % g.value;
				p = p - e + (Math.abs(e) >= g.value / 2 ? (e < 0 ? -1 : 1) * g.value : 0), p = Number.parseFloat(p.toFixed(m.value));
			}
			p = df(p, c.value, l.value), n("dragValue", p), a.value !== p && (a.value = p), A(r);
		}
		function k(e) {
			Eb.includes(e.keyCode) && A(!0);
		}
		function A(t) {
			e.modelValue !== a.value && n("update:modelValue", a.value), t && n("change", a.value);
		}
		let j = wh(e);
		function M() {
			return _("input", j.value);
		}
		return () => {
			let n = {
				class: p.value,
				role: "slider",
				"aria-valuemin": c.value,
				"aria-valuemax": l.value,
				"aria-valuenow": e.modelValue,
				...b.value,
				...x.value,
				value: a.value,
				instantFeedback: v.value,
				...y.value
			}, r = { default: t.default };
			return f.value && e.name !== void 0 && (r.internal = M), Af(fg, n, r, "knob", f.value, () => C.value);
		};
	}
});
var { passive: Ob } = vd, kb = [
	"both",
	"horizontal",
	"vertical"
], Ab = Q({
	name: "QScrollObserver",
	props: {
		axis: {
			type: String,
			validator: (e) => kb.includes(e),
			default: "vertical"
		},
		debounce: [String, Number],
		scrollTarget: Sm
	},
	emits: ["scroll"],
	setup(e, { emit: t }) {
		let n = {
			position: {
				top: 0,
				left: 0
			},
			direction: "down",
			directionChanged: !1,
			delta: {
				top: 0,
				left: 0
			},
			inflectionPoint: {
				top: 0,
				left: 0
			}
		}, r = null, i, a;
		G(() => e.scrollTarget, () => {
			c(), s();
		});
		function o() {
			r?.();
			let a = Math.max(0, Em(i)), o = Dm(i), s = {
				top: a - n.position.top,
				left: o - n.position.left
			};
			if (e.axis === "vertical" && s.top === 0 || e.axis === "horizontal" && s.left === 0) return;
			let c = Math.abs(s.top) >= Math.abs(s.left) ? s.top < 0 ? "up" : "down" : s.left < 0 ? "left" : "right";
			n.position = {
				top: a,
				left: o
			}, n.directionChanged = n.direction !== c, n.delta = s, n.directionChanged && (n.direction = c, n.inflectionPoint = n.position), t("scroll", { ...n });
		}
		function s() {
			i = wm(a, e.scrollTarget), i.addEventListener("scroll", l, Ob), l(!0);
		}
		function c() {
			i !== void 0 && (i.removeEventListener("scroll", l, Ob), i = void 0);
		}
		function l(t) {
			if (t === !0 || e.debounce === 0 || e.debounce === "0") o();
			else if (r === null) {
				let [t, n] = e.debounce ? [setTimeout(o, e.debounce), clearTimeout] : [requestAnimationFrame(o), cancelAnimationFrame];
				r = () => {
					n(t), r = null;
				};
			}
		}
		let { proxy: u } = h();
		return G(() => u.$q.lang.rtl, o), A(() => {
			a = u.$el.parentNode, s();
		}), D(() => {
			r?.(), c();
		}), Object.assign(u, {
			trigger: l,
			getPosition: () => n
		}), yd;
	}
}), jb = /^(h|l)h(h|r) lpr (f|l)f(f|r)$/;
Q({
	name: "QLayout",
	props: {
		container: Boolean,
		view: {
			type: String,
			default: "hhh lpr fff",
			validator: (e) => jb.test(e.toLowerCase())
		},
		onScroll: Function,
		onScrollHeight: Function,
		onResize: Function
	},
	setup(e, { slots: t, emit: n }) {
		let { proxy: { $q: r } } = h(), i = L(null), a = L(r.screen.height), s = L(e.container ? 0 : r.screen.width), c = L({
			position: 0,
			direction: "down",
			inflectionPoint: 0
		}), l = L(0), u = L(od.value ? 0 : Fm()), d = o(() => "q-layout q-layout--" + (e.container ? "containerized" : "standard")), f = o(() => e.container ? null : { minHeight: r.screen.height + "px" }), p = o(() => u.value === 0 ? null : { [r.lang.rtl ? "left" : "right"]: `${u.value}px` }), m = o(() => u.value === 0 ? null : {
			[r.lang.rtl ? "right" : "left"]: 0,
			[r.lang.rtl ? "left" : "right"]: `-${u.value}px`,
			width: `calc(100% + ${u.value}px)`
		});
		function g(t) {
			if (e.container || !document.qScrollPrevented) {
				let r = {
					position: t.position.top,
					direction: t.direction,
					directionChanged: t.directionChanged,
					inflectionPoint: t.inflectionPoint.top,
					delta: t.delta.top
				};
				c.value = r, e.onScroll !== void 0 && n("scroll", r);
			}
		}
		function v(t) {
			let { height: r, width: i } = t, o = !1;
			a.value !== r && (o = !0, a.value = r, e.onScrollHeight !== void 0 && n("scrollHeight", r), b()), s.value !== i && (o = !0, s.value = i), o && e.onResize !== void 0 && n("resize", t);
		}
		function y({ height: e }) {
			l.value !== e && (l.value = e, b());
		}
		function b() {
			if (e.container) {
				let e = a.value > l.value ? Fm() : 0;
				u.value !== e && (u.value = e);
			}
		}
		let x = null, S = {
			instances: {},
			view: o(() => e.view),
			isContainer: o(() => e.container),
			rootRef: i,
			height: a,
			containerHeight: l,
			scrollbarWidth: u,
			totalWidth: o(() => s.value + u.value),
			rows: o(() => {
				let t = e.view.toLowerCase().split(" ");
				return {
					top: [...t[0]],
					middle: [...t[1]],
					bottom: [...t[2]]
				};
			}),
			header: I({
				size: 0,
				offset: 0,
				space: !1
			}),
			right: I({
				size: 300,
				offset: 0,
				space: !1
			}),
			footer: I({
				size: 0,
				offset: 0,
				space: !1
			}),
			left: I({
				size: 300,
				offset: 0,
				space: !1
			}),
			scroll: c,
			animate() {
				x === null ? document.body.classList.add("q-body--layout-animate") : clearTimeout(x), x = setTimeout(() => {
					x = null, document.body.classList.remove("q-body--layout-animate");
				}, 155);
			},
			update(e, t, n) {
				S[e][t] = n;
			}
		};
		if (F(qd, S), Fm() > 0) {
			let t = null, n = document.body, i = () => {
				t = null, n.classList.remove("hide-scrollbar");
			}, a = () => {
				if (t === null) {
					if (n.scrollHeight > r.screen.height) return;
					n.classList.add("hide-scrollbar");
				} else clearTimeout(t);
				t = setTimeout(i, 300);
			}, o = (e) => {
				t !== null && e === "remove" && (clearTimeout(t), i()), window[`${e}EventListener`]("resize", a);
			};
			G(() => e.container ? "remove" : "add", o), e.container || o("add"), M(() => {
				o("remove");
			});
		}
		return () => {
			let n = Of(t.default, [_(Ab, { onScroll: g }), _(kg, { onResize: v })]), r = _("div", {
				class: d.value,
				style: f.value,
				ref: e.container ? void 0 : i,
				tabindex: -1
			}, n);
			return e.container ? _("div", {
				class: "q-layout-container overflow-hidden",
				ref: i
			}, [_(kg, { onResize: y }), _("div", {
				class: "absolute-full",
				style: p.value
			}, [_("div", {
				class: "scroll",
				style: m.value
			}, [r])])]) : r;
		};
	}
});
var Mb = {
	xs: 2,
	sm: 4,
	md: 6,
	lg: 10,
	xl: 14
};
function Nb(e, t, n) {
	return { transform: t ? `translateX(${n.lang.rtl ? "-" : ""}100%) scale3d(${-e},1,1)` : `scale3d(${e},1,1)` };
}
var Pb = Q({
	name: "QLinearProgress",
	props: {
		...qf,
		...Tf,
		value: {
			type: Number,
			default: 0
		},
		buffer: Number,
		color: String,
		trackColor: String,
		reverse: Boolean,
		stripe: Boolean,
		indeterminate: Boolean,
		query: Boolean,
		rounded: Boolean,
		animationSpeed: {
			type: [String, Number],
			default: 2100
		},
		instantFeedback: Boolean
	},
	setup(e, { slots: t }) {
		let { proxy: n } = h(), r = Jf(e, n.$q), i = Ef(e, Mb), a = o(() => e.indeterminate || e.query), s = o(() => e.reverse !== e.query), c = o(() => ({
			...i.value === null ? {} : i.value,
			"--q-linear-progress-speed": `${e.animationSpeed}ms`
		})), l = o(() => "q-linear-progress" + (e.color === void 0 ? "" : ` text-${e.color}`) + (e.reverse || e.query ? " q-linear-progress--reverse" : "") + (e.rounded ? " rounded-borders" : "")), u = o(() => Nb(e.buffer === void 0 ? 1 : e.buffer, s.value, n.$q)), d = o(() => `with${e.instantFeedback ? "out" : ""}-transition`), f = o(() => `q-linear-progress__track absolute-full q-linear-progress__track--${d.value} q-linear-progress__track--${r.value ? "dark" : "light"}` + (e.trackColor === void 0 ? "" : ` bg-${e.trackColor}`)), p = o(() => Nb(a.value ? 1 : e.value, s.value, n.$q)), m = o(() => `q-linear-progress__model absolute-full q-linear-progress__model--${d.value} q-linear-progress__model--${a.value ? "in" : ""}determinate`), g = o(() => ({ width: `${e.value * 100}%` })), v = o(() => `q-linear-progress__stripe absolute-${e.reverse ? "right" : "left"} q-linear-progress__stripe--${d.value}`);
		return () => {
			let n = [_("div", {
				class: f.value,
				style: u.value
			}), _("div", {
				class: m.value,
				style: p.value
			})];
			return e.stripe && !a.value && n.push(_("div", {
				class: v.value,
				style: g.value
			})), _("div", {
				class: l.value,
				style: c.value,
				role: "progressbar",
				"aria-valuemin": 0,
				"aria-valuemax": 1,
				"aria-valuenow": e.indeterminate ? void 0 : e.value
			}, Of(t.default, n));
		};
	}
}), Fb = [
	"horizontal",
	"vertical",
	"cell",
	"none"
], Ib = Q({
	name: "QMarkupTable",
	props: {
		...qf,
		dense: Boolean,
		flat: Boolean,
		bordered: Boolean,
		square: Boolean,
		wrapCells: Boolean,
		separator: {
			type: String,
			default: "horizontal",
			validator: (e) => Fb.includes(e)
		}
	},
	setup(e, { slots: t }) {
		let n = Jf(e, h().proxy.$q), r = o(() => `q-markup-table q-table__container q-table__card q-table--${e.separator}-separator` + (n.value ? " q-table--dark q-table__card--dark q-dark" : "") + (e.dense ? " q-table--dense" : "") + (e.flat ? " q-table--flat" : "") + (e.bordered ? " q-table--bordered" : "") + (e.square ? " q-table--square" : "") + (e.wrapCells ? "" : " q-table--no-wrap"));
		return () => _("div", { class: r.value }, [_("table", { class: "q-table" }, $(t.default))]);
	}
});
Q({
	name: "QNoSsr",
	props: {
		tag: {
			type: String,
			default: "div"
		},
		placeholder: String
	},
	setup(e, { slots: t }) {
		let { isHydrated: n } = Eg();
		return () => {
			if (n.value) {
				let n = $(t.default);
				return n === void 0 ? n : n.length > 1 ? _(e.tag, {}, n) : n[0];
			}
			let r = { class: "q-no-ssr-placeholder" }, i = $(t.placeholder);
			if (i !== void 0) return i.length > 1 ? _(e.tag, r, i) : i[0];
			if (e.placeholder !== void 0) return _(e.tag, r, e.placeholder);
		};
	}
});
var Lb = () => _("svg", {
	key: "svg",
	class: "q-radio__bg absolute non-selectable",
	viewBox: "0 0 24 24"
}, [_("path", { d: "M12,22a10,10 0 0 1 -10,-10a10,10 0 0 1 10,-10a10,10 0 0 1 10,10a10,10 0 0 1 -10,10m0,-22a12,12 0 0 0 -12,12a12,12 0 0 0 12,12a12,12 0 0 0 12,-12a12,12 0 0 0 -12,-12" }), _("path", {
	class: "q-radio__check",
	d: "M12,6a6,6 0 0 0 -6,6a6,6 0 0 0 6,6a6,6 0 0 0 6,-6a6,6 0 0 0 -6,-6"
})]);
function Rb(e) {
	(e.keyCode === 13 || e.keyCode === 32) && wd(e);
}
var zb = {
	radio: Q({
		name: "QRadio",
		props: {
			...qf,
			...Tf,
			...Ch,
			modelValue: { required: !0 },
			val: { required: !0 },
			label: String,
			leftLabel: Boolean,
			checkedIcon: String,
			uncheckedIcon: String,
			color: String,
			keepColor: Boolean,
			dense: Boolean,
			disable: Boolean,
			tabindex: [String, Number]
		},
		emits: ["update:modelValue"],
		setup(e, { slots: t, emit: n }) {
			let { proxy: r } = h(), i = Jf(e, r.$q), a = Ef(e, Qh), s = L(null), { refocusTargetEl: c, refocusTarget: l } = Zh(e, s), u = o(() => te(e.modelValue) === te(e.val)), d = o(() => "q-radio cursor-pointer no-outline row inline no-wrap items-center" + (e.disable ? " disabled" : "") + (i.value ? " q-radio--dark" : "") + (e.dense ? " q-radio--dense" : "") + (e.leftLabel ? " reverse" : "")), f = o(() => {
				let t = e.color !== void 0 && (e.keepColor || u.value) ? ` text-${e.color}` : "";
				return `q-radio__inner relative-position q-radio__inner--${u.value ? "truthy" : "falsy"}${t}`;
			}), p = o(() => (u.value ? e.checkedIcon : e.uncheckedIcon) || null), m = o(() => e.disable ? -1 : e.tabindex || 0), g = Th(o(() => {
				let t = { type: "radio" };
				return e.name !== void 0 && Object.assign(t, {
					".checked": u.value,
					"^checked": u.value ? "checked" : void 0,
					name: e.name,
					value: e.val
				}), t;
			}));
			function v(t) {
				t !== void 0 && (wd(t), l(t)), !e.disable && !u.value && n("update:modelValue", e.val, t);
			}
			function y(e) {
				(e.keyCode === 13 || e.keyCode === 32) && v(e);
			}
			Object.assign(r, { set: v });
			let b = Lb();
			return () => {
				let n = p.value === null ? [b] : [_("div", {
					key: "icon",
					class: "q-radio__icon-container absolute-full flex flex-center no-wrap"
				}, [_(Gf, {
					class: "q-radio__icon",
					name: p.value
				})])];
				e.disable || g(n, "unshift", " q-radio__native q-ma-none q-pa-none");
				let r = [_("div", {
					class: f.value,
					style: a.value,
					"aria-hidden": "true"
				}, n)];
				c.value !== null && r.push(c.value);
				let i = e.label === void 0 ? $(t.default) : Of(t.default, [e.label]);
				return i !== void 0 && r.push(_("div", { class: "q-radio__label q-anchor--skip" }, i)), _("div", {
					ref: s,
					class: d.value,
					tabindex: m.value,
					role: "radio",
					"aria-label": e.label,
					"aria-checked": u.value ? "true" : "false",
					"aria-disabled": e.disable ? "true" : void 0,
					onClick: v,
					onKeydown: Rb,
					onKeyup: y
				}, r);
			};
		}
	}),
	checkbox: ig,
	toggle: Q({
		name: "QToggle",
		props: {
			...$h,
			icon: String,
			iconColor: String
		},
		emits: eg,
		setup(e) {
			function t(t, n) {
				let r = o(() => (t.value ? e.checkedIcon : n.value ? e.indeterminateIcon : e.uncheckedIcon) || e.icon), i = o(() => t.value ? e.iconColor : null);
				return () => [_("div", { class: "q-toggle__track" }), _("div", { class: "q-toggle__thumb absolute flex flex-center no-wrap" }, r.value === void 0 ? void 0 : [_(Gf, {
					name: r.value,
					color: i.value
				})])];
			}
			return ng("toggle", t);
		}
	})
}, Bb = Object.keys(zb);
function Vb(e, t) {
	if (typeof e == "function") return e;
	let n = e === void 0 ? t : e;
	return (e) => e[n];
}
var Hb = Q({
	name: "QOptionGroup",
	props: {
		...qf,
		modelValue: { required: !0 },
		options: {
			type: Array,
			validator: (e) => e.every(tf),
			default: () => []
		},
		optionValue: [Function, String],
		optionLabel: [Function, String],
		optionDisable: [Function, String],
		name: String,
		type: {
			type: String,
			default: "radio",
			validator: (e) => Bb.includes(e)
		},
		color: String,
		keepColor: Boolean,
		dense: Boolean,
		size: String,
		leftLabel: Boolean,
		inline: Boolean,
		disable: Boolean
	},
	emits: ["update:modelValue"],
	setup(e, { emit: t, slots: n }) {
		let { proxy: { $q: r } } = h(), i = Array.isArray(e.modelValue);
		e.type === "radio" ? i && console.error("q-option-group: model should not be array") : i || console.error("q-option-group: model should be array in your case");
		let a = Jf(e, r), s = o(() => zb[e.type]), c = o(() => Vb(e.optionValue, "value")), l = o(() => Vb(e.optionLabel, "label")), u = o(() => Vb(e.optionDisable, "disable")), d = o(() => e.options.map((t) => ({
			val: c.value(t),
			name: t.name === void 0 ? e.name : t.name,
			disable: e.disable || u.value(t),
			leftLabel: t.leftLabel === void 0 ? e.leftLabel : t.leftLabel,
			color: t.color === void 0 ? e.color : t.color,
			checkedIcon: t.checkedIcon,
			uncheckedIcon: t.uncheckedIcon,
			dark: t.dark === void 0 ? a.value : t.dark,
			size: t.size === void 0 ? e.size : t.size,
			dense: e.dense,
			keepColor: t.keepColor === void 0 ? e.keepColor : t.keepColor
		}))), f = o(() => "q-option-group q-gutter-x-sm" + (e.inline ? " q-option-group--inline" : "")), p = o(() => {
			let t = { role: "group" };
			return e.type === "radio" && (t.role = "radiogroup", e.disable && (t["aria-disabled"] = "true")), t;
		});
		function m(e) {
			t("update:modelValue", e);
		}
		return () => _("div", {
			class: f.value,
			...p.value
		}, e.options.map((t, r) => {
			let i = n["label-" + r] === void 0 ? n.label === void 0 ? void 0 : () => n.label(t) : () => n["label-" + r](t);
			return _("div", [_(s.value, {
				label: i === void 0 ? l.value(t) : null,
				modelValue: e.modelValue,
				"onUpdate:modelValue": m,
				...d.value[r]
			}, i)]);
		}));
	}
});
Q({
	name: "QPage",
	props: {
		padding: Boolean,
		styleFn: Function
	},
	setup(e, { slots: t }) {
		let { proxy: { $q: n } } = h(), r = y(qd, $d);
		if (r === $d) return console.error("QPage needs to be a deep child of QLayout"), $d;
		if (y("_q_pc_", $d) === $d) return console.error("QPage needs to be child of QPageContainer"), $d;
		let i = o(() => {
			let t = (r.header.space ? r.header.size : 0) + (r.footer.space ? r.footer.size : 0);
			if (typeof e.styleFn == "function") {
				let i = r.isContainer.value ? r.containerHeight.value : n.screen.height;
				return e.styleFn(t, i);
			}
			return { minHeight: r.isContainer.value ? r.containerHeight.value - t + "px" : n.screen.height === 0 ? t === 0 ? "100vh" : `calc(100vh - ${t}px)` : n.screen.height - t + "px" };
		}), a = o(() => `q-page${e.padding ? " q-layout-padding" : ""}`);
		return () => _("main", {
			class: a.value,
			style: i.value
		}, $(t.default));
	}
}), Q({
	name: "QPageContainer",
	setup(e, { slots: t }) {
		let { proxy: { $q: n } } = h(), r = y(qd, $d);
		if (r === $d) return console.error("QPageContainer needs to be child of QLayout"), $d;
		F(Jd, !0);
		let i = o(() => {
			let e = {};
			return r.header.space && (e.paddingTop = `${r.header.size}px`), r.right.space && (e[`padding${n.lang.rtl ? "Left" : "Right"}`] = `${r.right.size}px`), r.footer.space && (e.paddingBottom = `${r.footer.size}px`), r.left.space && (e[`padding${n.lang.rtl ? "Right" : "Left"}`] = `${r.left.size}px`), e;
		});
		return () => _("div", {
			class: "q-page-container",
			style: i.value
		}, $(t.default));
	}
});
var Ub = {
	position: {
		type: String,
		default: "bottom-right",
		validator: (e) => [
			"top-right",
			"top-left",
			"bottom-right",
			"bottom-left",
			"top",
			"right",
			"bottom",
			"left"
		].includes(e)
	},
	offset: {
		type: Array,
		validator: (e) => e.length === 2
	},
	expand: Boolean
};
function Wb() {
	let { props: e, proxy: { $q: t } } = h(), n = y(qd, $d);
	if (n === $d) return console.error("QPageSticky needs to be child of QLayout"), $d;
	let r = o(() => {
		let t = e.position;
		return {
			top: t.includes("top"),
			right: t.includes("right"),
			bottom: t.includes("bottom"),
			left: t.includes("left"),
			vertical: t === "top" || t === "bottom",
			horizontal: t === "left" || t === "right"
		};
	}), i = o(() => n.header.offset), a = o(() => n.right.offset), s = o(() => n.footer.offset), c = o(() => n.left.offset), l = o(() => {
		let n = 0, o = 0, l = r.value, u = t.lang.rtl ? -1 : 1;
		l.top && i.value !== 0 ? o = `${i.value}px` : l.bottom && s.value !== 0 && (o = `${-s.value}px`), l.left && c.value !== 0 ? n = `${u * c.value}px` : l.right && a.value !== 0 && (n = `${-u * a.value}px`);
		let d = { transform: `translate(${n}, ${o})` };
		return e.offset && (d.margin = `${e.offset[1]}px ${e.offset[0]}px`), l.vertical ? (c.value !== 0 && (d[t.lang.rtl ? "right" : "left"] = `${c.value}px`), a.value !== 0 && (d[t.lang.rtl ? "left" : "right"] = `${a.value}px`)) : l.horizontal && (i.value !== 0 && (d.top = `${i.value}px`), s.value !== 0 && (d.bottom = `${s.value}px`)), d;
	}), u = o(() => `q-page-sticky row flex-center fixed-${e.position} q-page-sticky--${e.expand ? "expand" : "shrink"}`);
	function d(t) {
		let n = $(t.default);
		return _("div", {
			class: u.value,
			style: l.value
		}, e.expand ? n : [_("div", n)]);
	}
	return {
		$layout: n,
		getStickyContent: d
	};
}
Q({
	name: "QPageScroller",
	props: {
		...Ub,
		scrollOffset: {
			type: Number,
			default: 1e3
		},
		reverse: Boolean,
		duration: {
			type: Number,
			default: 300
		},
		offset: {
			...Ub.offset,
			default: () => [18, 18]
		}
	},
	emits: ["click"],
	setup(e, { slots: t, emit: n }) {
		let { proxy: { $q: r } } = h(), { $layout: i, getStickyContent: s } = Wb(), c = L(null), l, u = o(() => i.height.value - (i.isContainer.value ? i.containerHeight.value : r.screen.height));
		function d() {
			return e.reverse ? u.value - i.scroll.value.position > e.scrollOffset : i.scroll.value.position > e.scrollOffset;
		}
		let f = L(d());
		function p() {
			let e = d();
			f.value !== e && (f.value = e);
		}
		function m() {
			e.reverse ? l === void 0 && (l = G(u, p)) : g();
		}
		G(i.scroll, p), G(() => e.reverse, m);
		function g() {
			l !== void 0 && (l(), l = void 0);
		}
		function v(t) {
			Mm(wm(i.isContainer.value ? c.value : i.rootRef.value), e.reverse ? i.height.value : 0, e.duration), n("click", t);
		}
		function y() {
			return f.value ? _("div", {
				ref: c,
				class: "q-page-scroller",
				onClick: v
			}, s(t)) : null;
		}
		return m(), D(g), () => _(a, { name: "q-transition--fade" }, y);
	}
}), Q({
	name: "QPageSticky",
	props: Ub,
	setup(e, { slots: t }) {
		let { getStickyContent: n } = Wb();
		return () => n(t);
	}
});
function Gb(e, t) {
	return e === !0 || e === !1 ? e : t;
}
Q({
	name: "QPagination",
	props: {
		...qf,
		modelValue: {
			type: Number,
			required: !0
		},
		min: {
			type: [Number, String],
			default: 1
		},
		max: {
			type: [Number, String],
			required: !0
		},
		maxPages: {
			type: [Number, String],
			default: 0,
			validator: (e) => (typeof e == "string" ? Number.parseInt(e, 10) : e) >= 0
		},
		inputStyle: [
			Array,
			String,
			Object
		],
		inputClass: [
			Array,
			String,
			Object
		],
		size: String,
		disable: Boolean,
		input: Boolean,
		iconPrev: String,
		iconNext: String,
		iconFirst: String,
		iconLast: String,
		toFn: Function,
		boundaryLinks: {
			type: Boolean,
			default: null
		},
		boundaryNumbers: {
			type: Boolean,
			default: null
		},
		directionLinks: {
			type: Boolean,
			default: null
		},
		ellipses: {
			type: Boolean,
			default: null
		},
		ripple: {
			type: [Boolean, Object],
			default: null
		},
		round: Boolean,
		rounded: Boolean,
		flat: Boolean,
		outline: Boolean,
		unelevated: Boolean,
		push: Boolean,
		glossy: Boolean,
		color: {
			type: String,
			default: "primary"
		},
		textColor: String,
		activeDesign: {
			type: String,
			default: "",
			values: (e) => e === "" || Ap.includes(e)
		},
		activeColor: String,
		activeTextColor: String,
		gutter: String,
		padding: {
			type: String,
			default: "3px 2px"
		}
	},
	emits: ["update:modelValue"],
	setup(e, { emit: t }) {
		let { proxy: n } = h(), { $q: r } = n, i = Jf(e, r), a = o(() => Number.parseInt(e.min, 10)), s = o(() => Number.parseInt(e.max, 10)), c = o(() => Number.parseInt(e.maxPages, 10)), l = o(() => g.value + " / " + s.value), u = o(() => Gb(e.boundaryLinks, e.input)), d = o(() => Gb(e.boundaryNumbers, !e.input)), f = o(() => Gb(e.directionLinks, e.input)), p = o(() => Gb(e.ellipses, !e.input)), m = L(null), g = o({
			get: () => e.modelValue,
			set: (n) => {
				if (n = Number.parseInt(n, 10), e.disable || !Number.isFinite(n)) return;
				let r = df(n, a.value, s.value);
				e.modelValue !== r && t("update:modelValue", r);
			}
		});
		G(() => `${a.value}|${s.value}`, () => {
			g.value = e.modelValue;
		});
		let v = o(() => "q-pagination row no-wrap items-center" + (e.disable ? " disabled" : "")), y = o(() => e.gutter in Ep ? `${Ep[e.gutter]}px` : e.gutter || null), b = o(() => y.value === null ? null : `--q-pagination-gutter-parent:-${y.value};--q-pagination-gutter-child:${y.value}`), x = o(() => {
			let t = [
				e.iconFirst || r.iconSet.pagination.first,
				e.iconPrev || r.iconSet.pagination.prev,
				e.iconNext || r.iconSet.pagination.next,
				e.iconLast || r.iconSet.pagination.last
			];
			return r.lang.rtl ? t.reverse() : t;
		}), S = o(() => ({
			"aria-disabled": e.disable ? "true" : "false",
			role: "navigation"
		})), C = o(() => jp(e, "flat")), w = o(() => ({
			[C.value]: !0,
			round: e.round,
			rounded: e.rounded,
			padding: e.padding,
			color: e.color,
			textColor: e.textColor,
			size: e.size,
			ripple: e.ripple === null || e.ripple
		})), T = o(() => {
			let t = { [C.value]: !1 };
			return e.activeDesign !== "" && (t[e.activeDesign] = !0), t;
		}), E = o(() => ({
			...T.value,
			color: e.activeColor || e.color,
			textColor: e.activeTextColor || e.textColor
		})), D = o(() => {
			let t = Math.max(c.value, 1 + (p.value ? 2 : 0) + (d.value ? 2 : 0)), n = {
				pgFrom: a.value,
				pgTo: s.value,
				ellipsesStart: !1,
				ellipsesEnd: !1,
				boundaryStart: !1,
				boundaryEnd: !1,
				marginalStyle: { minWidth: `${Math.max(2, String(s.value).length)}em` }
			};
			return c.value && t < s.value - a.value + 1 && (t = 1 + Math.floor(t / 2) * 2, n.pgFrom = Math.max(a.value, Math.min(s.value - t + 1, e.modelValue - Math.floor(t / 2))), n.pgTo = Math.min(s.value, n.pgFrom + t - 1), d.value && (n.boundaryStart = !0, n.pgFrom++), p.value && n.pgFrom > a.value + +!!d.value && (n.ellipsesStart = !0, n.pgFrom++), d.value && (n.boundaryEnd = !0, n.pgTo--), p.value && n.pgTo < s.value - +!!d.value && (n.ellipsesEnd = !0, n.pgTo--)), n;
		});
		function O(e) {
			g.value = e;
		}
		function k(e) {
			g.value += e;
		}
		function A() {
			g.value = m.value, m.value = null, r.platform.is.mobile && document.activeElement.blur();
		}
		function j(e) {
			m.value = e;
		}
		function M(e) {
			Pd(e, 13) && A();
		}
		function N(t, n, r) {
			let i = {
				"aria-label": n,
				"aria-current": "false",
				...w.value,
				...t
			};
			return r && Object.assign(i, {
				"aria-current": "true",
				...E.value
			}), n !== void 0 && (e.toFn === void 0 ? i.onClick = () => {
				O(n);
			} : i.to = e.toFn(n)), _(Vp, i);
		}
		return Object.assign(n, {
			set: O,
			setByOffset: k
		}), () => {
			let t = [], n = [], o;
			if (u.value && (t.push(N({
				key: "bls",
				disable: e.disable || e.modelValue <= a.value,
				icon: x.value[0],
				"aria-label": r.lang.pagination.first
			}, a.value)), n.unshift(N({
				key: "ble",
				disable: e.disable || e.modelValue >= s.value,
				icon: x.value[3],
				"aria-label": r.lang.pagination.last
			}, s.value))), f.value && (t.push(N({
				key: "bdp",
				disable: e.disable || e.modelValue <= a.value,
				icon: x.value[1],
				"aria-label": r.lang.pagination.prev
			}, e.modelValue - 1)), n.unshift(N({
				key: "bdn",
				disable: e.disable || e.modelValue >= s.value,
				icon: x.value[2],
				"aria-label": r.lang.pagination.next
			}, e.modelValue + 1))), !e.input) {
				o = [];
				let { pgFrom: r, pgTo: i, marginalStyle: c } = D.value;
				D.value.boundaryStart && t.push(N({
					key: "bns",
					style: c,
					disable: e.disable,
					label: a.value
				}, a.value, a.value === e.modelValue)), D.value.boundaryEnd && n.unshift(N({
					key: "bne",
					style: c,
					disable: e.disable,
					label: s.value
				}, s.value, s.value === e.modelValue)), D.value.ellipsesStart && t.push(N({
					key: "bes",
					style: c,
					disable: e.disable,
					label: "…",
					ripple: !1
				}, r - 1)), D.value.ellipsesEnd && n.unshift(N({
					key: "bee",
					style: c,
					disable: e.disable,
					label: "…",
					ripple: !1
				}, i + 1));
				for (let t = r; t <= i; t++) o.push(N({
					key: `bpg${t}`,
					style: c,
					disable: e.disable,
					label: t
				}, t, t === e.modelValue));
			}
			return _("div", {
				class: v.value,
				...S.value
			}, [_("div", {
				class: "q-pagination__content row no-wrap items-center",
				style: b.value
			}, [
				...t,
				e.input ? _(yb, {
					class: "inline",
					style: { width: `${l.value.length / 1.5}em` },
					type: "number",
					dense: !0,
					value: m.value,
					disable: e.disable,
					dark: i.value,
					borderless: !0,
					inputClass: e.inputClass,
					inputStyle: e.inputStyle,
					placeholder: l.value,
					min: a.value,
					max: s.value,
					"onUpdate:modelValue": j,
					onKeyup: M,
					onBlur: A
				}) : _("div", { class: "q-pagination__middle row justify-center" }, o),
				...n
			])]);
		};
	}
});
function Kb(e) {
	let t = null, n = null, r = null;
	function i(...i) {
		n = i, r = this, t === null && (t = window.requestAnimationFrame(() => {
			e.apply(r, n), t = null, n = null, r = null;
		}));
	}
	return i.cancel = () => {
		t !== null && (window.cancelAnimationFrame(t), t = null), n = null, r = null;
	}, i;
}
var { passive: qb } = vd, Jb = [
	"load",
	"loadstart",
	"loadedmetadata"
];
Q({
	name: "QParallax",
	props: {
		src: String,
		height: {
			type: Number,
			default: 500
		},
		speed: {
			type: Number,
			default: 1,
			validator: (e) => e >= 0 && e <= 1
		},
		scrollTarget: Sm,
		onScroll: Function
	},
	setup(e, { slots: t, emit: n }) {
		let r = L(0), i = L(null), a = L(null), o = L(null), s = !1, c, l, u, d, f;
		G(() => e.height, () => {
			s && m();
		}), G(() => e.scrollTarget, () => {
			s && (y(), v());
		});
		let p = (t) => {
			r.value = t, e.onScroll !== void 0 && n("scroll", t);
		};
		function m() {
			let t, n, r;
			f === window ? (t = 0, r = n = window.innerHeight) : (t = _p(f).top, n = vp(f), r = t + n);
			let a = _p(i.value).top, o = a + e.height;
			if (d !== void 0 || o > t && a < r) {
				let t = (r - a) / (e.height + n);
				h((l - e.height) * t * e.speed), p(t);
			}
		}
		let h = (e) => {
			c.style.transform = `translate3d(-50%,${Math.round(e)}px,0)`;
		};
		function g() {
			l = c.naturalHeight || c.videoHeight || vp(c), s && m();
		}
		function v() {
			s = !0, f = wm(i.value, e.scrollTarget), f.addEventListener("scroll", m, qb), window.addEventListener("resize", u, qb), m();
		}
		function y() {
			s && (s = !1, f.removeEventListener("scroll", m, qb), window.removeEventListener("resize", u, qb), f = void 0, h.cancel(), p.cancel(), u.cancel());
		}
		return A(() => {
			h = Kb(h), p = Kb(p), u = Kb(g), c = t.media === void 0 ? o.value : a.value.children[0], Jb.forEach((e) => {
				c.addEventListener(e, g);
			}), g(), c.style.display = "initial", window.IntersectionObserver === void 0 ? v() : (d = new IntersectionObserver((e) => {
				(e[0].isIntersecting ? v : y)();
			}), d.observe(i.value));
		}), D(() => {
			y(), d?.disconnect(), Jb.forEach((e) => {
				c.removeEventListener(e, g);
			});
		}), () => _("div", {
			ref: i,
			class: "q-parallax",
			style: { height: `${e.height}px` }
		}, [_("div", {
			ref: a,
			class: "q-parallax__media absolute-full"
		}, t.media === void 0 ? [_("img", {
			ref: o,
			src: e.src
		})] : t.media()), _("div", { class: "q-parallax__content absolute-full column flex-center" }, t.content === void 0 ? $(t.default) : t.content({ percentScrolled: r.value }))]);
	}
});
function Yb(e, t = /* @__PURE__ */ new WeakMap()) {
	if (Object(e) !== e) return e;
	if (t.has(e)) return t.get(e);
	let n = e instanceof Date ? new Date(e) : e instanceof RegExp ? new RegExp(e.source, e.flags) : e instanceof Set ? /* @__PURE__ */ new Set() : e instanceof Map ? /* @__PURE__ */ new Map() : typeof e.constructor == "function" ? e.prototype !== void 0 && typeof e.prototype.constructor == "function" ? e : new e.constructor() : Object.create(null);
	if (typeof e.constructor == "function" && typeof e.valueOf == "function") {
		let n = e.valueOf();
		if (Object(n) !== n) {
			let r = new e.constructor(n);
			return t.set(e, r), r;
		}
	}
	return t.set(e, n), e instanceof Set ? e.forEach((e) => {
		n.add(Yb(e, t));
	}) : e instanceof Map && e.forEach((e, r) => {
		n.set(r, Yb(e, t));
	}), Object.assign(n, ...Object.keys(e).map((n) => ({ [n]: Yb(e[n], t) })));
}
Q({
	name: "QPopupEdit",
	props: {
		modelValue: { required: !0 },
		title: String,
		buttons: Boolean,
		labelSet: String,
		labelCancel: String,
		color: {
			type: String,
			default: "primary"
		},
		validate: {
			type: Function,
			default: () => !0
		},
		autoSave: Boolean,
		cover: {
			type: Boolean,
			default: !0
		},
		disable: Boolean
	},
	emits: [
		"update:modelValue",
		"save",
		"cancel",
		"beforeShow",
		"show",
		"beforeHide",
		"hide"
	],
	setup(e, { slots: t, emit: n }) {
		let { proxy: r } = h(), { $q: i } = r, a = L(null), s = L(""), c = L(""), l = !1, u = o(() => id({
			initialValue: s.value,
			validate: e.validate,
			set: d,
			cancel: f,
			updatePosition: p
		}, "value", () => c.value, (e) => {
			c.value = e;
		}));
		function d() {
			e.validate(c.value) && (m() && (n("save", c.value, s.value), n("update:modelValue", c.value)), g());
		}
		function f() {
			m() && n("cancel", c.value, s.value), g();
		}
		function p() {
			w(() => {
				a.value.updatePosition();
			});
		}
		function m() {
			return !ef(c.value, s.value);
		}
		function g() {
			l = !0, a.value.hide();
		}
		function v() {
			l = !1, s.value = Yb(e.modelValue), c.value = Yb(e.modelValue), n("beforeShow");
		}
		function y() {
			n("show");
		}
		function b() {
			!l && m() && (e.autoSave && e.validate(c.value) ? (n("save", c.value, s.value), n("update:modelValue", c.value)) : n("cancel", c.value, s.value)), n("beforeHide");
		}
		function x() {
			n("hide");
		}
		function S() {
			let n = t.default === void 0 ? [] : [t.default(u.value)].flat();
			return e.title && n.unshift(_("div", { class: "q-dialog__title q-mt-sm q-mb-sm" }, e.title)), e.buttons && n.push(_("div", { class: "q-popup-edit__buttons row justify-center no-wrap" }, [_(Vp, {
				flat: !0,
				color: e.color,
				label: e.labelCancel || i.lang.label.cancel,
				onClick: f
			}), _(Vp, {
				flat: !0,
				color: e.color,
				label: e.labelSet || i.lang.label.set,
				onClick: d
			})])), n;
		}
		return Object.assign(r, {
			set: d,
			cancel: f,
			show(e) {
				a.value?.show(e);
			},
			hide(e) {
				a.value?.hide(e);
			},
			updatePosition: p
		}), () => {
			if (!e.disable) return _(mh, {
				ref: a,
				class: "q-popup-edit",
				cover: e.cover,
				onBeforeShow: v,
				onShow: y,
				onBeforeHide: b,
				onHide: x,
				onEscapeKey: f
			}, S);
		};
	}
}), Q({
	name: "QPopupProxy",
	props: {
		...Gp,
		breakpoint: {
			type: [String, Number],
			default: 450
		}
	},
	emits: ["show", "hide"],
	setup(e, { slots: t, emit: n, attrs: r }) {
		let { proxy: i } = h(), { $q: a } = i, s = L(!1), c = L(null), l = o(() => Number.parseInt(e.breakpoint, 10)), { canShow: u } = Kp({
			showing: s,
			avoidEmit: !0
		});
		function d() {
			return a.screen.width < l.value || a.screen.height < l.value ? "dialog" : "menu";
		}
		let f = L(d()), p = o(() => f.value === "menu" ? { maxHeight: "99vh" } : {});
		G(() => d(), (e) => {
			s.value || (f.value = e);
		});
		function m(e) {
			s.value = !0, n("show", e);
		}
		function g(e) {
			s.value = !1, f.value = d(), n("hide", e);
		}
		return Object.assign(i, {
			show(e) {
				u(e) && c.value.show(e);
			},
			hide(e) {
				c.value.hide(e);
			},
			toggle(e) {
				c.value.toggle(e);
			}
		}), id(i, "currentComponent", () => ({
			type: f.value,
			ref: c.value
		})), () => {
			let n = {
				ref: c,
				...p.value,
				...r,
				onShow: m,
				onHide: g
			}, i;
			return f.value === "dialog" ? i = Kv : (i = mh, Object.assign(n, {
				target: e.target,
				contextMenu: e.contextMenu,
				noParentEvent: !0,
				separateClosePopup: !0
			})), _(i, n, t.default);
		};
	}
});
var Xb = 40, Zb = 20;
Q({
	name: "QPullToRefresh",
	props: {
		color: String,
		bgColor: String,
		icon: String,
		noMouse: Boolean,
		disable: Boolean,
		scrollTarget: Sm
	},
	emits: ["refresh"],
	setup(e, { slots: t, emit: n }) {
		let { proxy: r } = h(), { $q: i } = r, a = L("pull"), s = L(0), c = L(!1), l = L(-40), u = L(!1), d = L({}), f = o(() => ({
			opacity: s.value,
			transform: `translateY(${l.value}px) rotate(${s.value * 360}deg)`
		})), p = o(() => "q-pull-to-refresh__puller row flex-center" + (u.value ? " q-pull-to-refresh__puller--animating" : "") + (e.bgColor === void 0 ? "" : ` bg-${e.bgColor}`));
		function m(e) {
			if (e.isFinal) {
				c.value && (c.value = !1, a.value === "pulled" ? (a.value = "refreshing", S({ pos: Zb }), y()) : a.value === "pull" && S({
					pos: -40,
					ratio: 0
				}));
				return;
			}
			if (u.value || a.value === "refreshing") return !1;
			if (e.isFirst) {
				if (Em(b) !== 0 || e.direction !== "down") return c.value && (c.value = !1, a.value = "pull", S({
					pos: -40,
					ratio: 0
				})), !1;
				c.value = !0;
				let { top: t, left: n } = r.$el.getBoundingClientRect();
				d.value = {
					top: t + "px",
					left: n + "px",
					width: window.getComputedStyle(r.$el).getPropertyValue("width")
				};
			}
			Cd(e.evt);
			let t = Math.min(140, Math.max(0, e.distance.y));
			l.value = t - Xb, s.value = df(t / 60, 0, 1);
			let n = l.value > Zb ? "pulled" : "pull";
			a.value !== n && (a.value = n);
		}
		let g = o(() => {
			let t = { down: !0 };
			return e.noMouse || (t.mouse = !0), [[
				gg,
				m,
				void 0,
				t
			]];
		}), v = o(() => `q-pull-to-refresh__content${c.value ? " no-pointer-events" : ""}`);
		function y() {
			n("refresh", () => {
				S({
					pos: -40,
					ratio: 0
				}, () => {
					a.value = "pull";
				});
			});
		}
		let b, x = null;
		function S({ pos: e, ratio: t }, n) {
			u.value = !0, l.value = e, t !== void 0 && (s.value = t), x !== null && clearTimeout(x), x = setTimeout(() => {
				x = null, u.value = !1, n?.();
			}, 300);
		}
		function C() {
			b = wm(r.$el, e.scrollTarget);
		}
		return G(() => e.scrollTarget, C), A(C), D(() => {
			x !== null && clearTimeout(x);
		}), Object.assign(r, {
			trigger: y,
			updateScrollTarget: C
		}), () => Af("div", { class: "q-pull-to-refresh" }, [_("div", { class: v.value }, $(t.default)), _("div", {
			class: "q-pull-to-refresh__puller-container fixed row flex-center no-pointer-events z-top",
			style: d.value
		}, [_("div", {
			class: p.value,
			style: f.value
		}, [a.value === "refreshing" ? _(gp, {
			size: "24px",
			color: e.color
		}) : _(Gf, {
			name: e.icon || i.iconSet.pullToRefresh.icon,
			color: e.color,
			size: "32px"
		})])])], "main", !e.disable, () => g.value);
	}
});
var Qb = {
	MIN: 0,
	RANGE: 1,
	MAX: 2
};
Q({
	name: "QRange",
	props: {
		...xg,
		modelValue: {
			type: Object,
			default: () => ({
				min: null,
				max: null
			}),
			validator: (e) => "min" in e && "max" in e
		},
		dragRange: Boolean,
		dragOnlyRange: Boolean,
		leftLabelColor: String,
		leftLabelTextColor: String,
		rightLabelColor: String,
		rightLabelTextColor: String,
		leftLabelValue: [String, Number],
		rightLabelValue: [String, Number],
		leftThumbColor: String,
		rightThumbColor: String
	},
	emits: Sg,
	setup(e, { emit: t }) {
		let { proxy: { $q: n } } = h(), { state: r, methods: i } = Cg({
			updateValue: D,
			updatePosition: k,
			getDragging: O,
			formAttrs: o(() => ({
				type: "hidden",
				name: e.name,
				value: `${e.modelValue.min}|${e.modelValue.max}`
			}))
		}), a = L(null), s = L(0), c = L(0), l = L({
			min: 0,
			max: 0
		});
		function u() {
			l.value.min = e.modelValue.min === null ? r.innerMin.value : df(e.modelValue.min, r.innerMin.value, r.innerMax.value), l.value.max = e.modelValue.max === null ? r.innerMax.value : df(e.modelValue.max, r.innerMin.value, r.innerMax.value);
		}
		G(() => `${e.modelValue.min}|${e.modelValue.max}|${r.innerMin.value}|${r.innerMax.value}`, u), u();
		let d = o(() => i.convertModelToRatio(l.value.min)), f = o(() => i.convertModelToRatio(l.value.max)), p = o(() => r.active.value ? s.value : d.value), m = o(() => r.active.value ? c.value : f.value), g = o(() => {
			let t = {
				[r.positionProp.value]: `${100 * p.value}%`,
				[r.sizeProp.value]: `${100 * (m.value - p.value)}%`
			};
			return e.selectionImg !== void 0 && (t.backgroundImage = `url(${e.selectionImg}) !important`), t;
		}), v = o(() => {
			if (!r.editable.value) return {};
			if (n.platform.is.mobile) return { onClick: i.onMobileClick };
			let t = { onMousedown: i.onActivate };
			return (e.dragRange || e.dragOnlyRange) && Object.assign(t, {
				onFocus: () => {
					r.focus.value = "both";
				},
				onBlur: i.onBlur,
				onKeydown: A,
				onKeyup: i.onKeyup
			}), t;
		});
		function y(t) {
			return !n.platform.is.mobile && r.editable.value && !e.dragOnlyRange ? {
				onFocus: () => {
					r.focus.value = t;
				},
				onBlur: i.onBlur,
				onKeydown: A,
				onKeyup: i.onKeyup
			} : {};
		}
		let b = o(() => e.dragOnlyRange ? null : r.tabindex.value), x = o(() => !n.platform.is.mobile && (e.dragRange || e.dragOnlyRange) ? r.tabindex.value : null), S = L(null), C = o(() => y("min")), w = i.getThumbRenderFn({
			focusValue: "min",
			getNodeData: () => ({
				ref: S,
				key: "tmin",
				...C.value,
				tabindex: b.value
			}),
			ratio: p,
			label: o(() => e.leftLabelValue === void 0 ? l.value.min : e.leftLabelValue),
			thumbColor: o(() => e.leftThumbColor || e.thumbColor || e.color),
			labelColor: o(() => e.leftLabelColor || e.labelColor),
			labelTextColor: o(() => e.leftLabelTextColor || e.labelTextColor)
		}), T = o(() => y("max")), E = i.getThumbRenderFn({
			focusValue: "max",
			getNodeData: () => ({
				...T.value,
				key: "tmax",
				tabindex: b.value
			}),
			ratio: m,
			label: o(() => e.rightLabelValue === void 0 ? l.value.max : e.rightLabelValue),
			thumbColor: o(() => e.rightThumbColor || e.thumbColor || e.color),
			labelColor: o(() => e.rightLabelColor || e.labelColor),
			labelTextColor: o(() => e.rightLabelTextColor || e.labelTextColor)
		});
		function D(n) {
			(l.value.min !== e.modelValue.min || l.value.max !== e.modelValue.max) && t("update:modelValue", { ...l.value }), n && t("change", { ...l.value });
		}
		function O(t) {
			let { left: n, top: r, width: o, height: s } = a.value.getBoundingClientRect(), c = e.dragOnlyRange ? 0 : e.vertical ? S.value.offsetHeight / (2 * s) : S.value.offsetWidth / (2 * o), u = {
				left: n,
				top: r,
				width: o,
				height: s,
				valueMin: l.value.min,
				valueMax: l.value.max,
				ratioMin: d.value,
				ratioMax: f.value
			}, p = i.getDraggingRatio(t, u);
			return !e.dragOnlyRange && p < u.ratioMin + c ? u.type = Qb.MIN : e.dragOnlyRange || p < u.ratioMax - c ? e.dragRange || e.dragOnlyRange ? (u.type = Qb.RANGE, Object.assign(u, {
				offsetRatio: p,
				offsetModel: i.convertRatioToModel(p),
				rangeValue: u.valueMax - u.valueMin,
				rangeRatio: u.ratioMax - u.ratioMin
			})) : u.type = u.ratioMax - p < p - u.ratioMin ? Qb.MAX : Qb.MIN : u.type = Qb.MAX, u;
		}
		function k(t, n = r.dragging.value) {
			let a, o = i.getDraggingRatio(t, n), u = i.convertRatioToModel(o);
			switch (n.type) {
				case Qb.MIN:
					o <= n.ratioMax ? (a = {
						minR: o,
						maxR: n.ratioMax,
						min: u,
						max: n.valueMax
					}, r.focus.value = "min") : (a = {
						minR: n.ratioMax,
						maxR: o,
						min: n.valueMax,
						max: u
					}, r.focus.value = "max");
					break;
				case Qb.MAX:
					o >= n.ratioMin ? (a = {
						minR: n.ratioMin,
						maxR: o,
						min: n.valueMin,
						max: u
					}, r.focus.value = "max") : (a = {
						minR: o,
						maxR: n.ratioMin,
						min: u,
						max: n.valueMin
					}, r.focus.value = "min");
					break;
				case Qb.RANGE: {
					let e = o - n.offsetRatio, t = df(n.ratioMin + e, r.innerMinRatio.value, r.innerMaxRatio.value - n.rangeRatio), i = u - n.offsetModel, s = df(n.valueMin + i, r.innerMin.value, r.innerMax.value - n.rangeValue);
					a = {
						minR: t,
						maxR: t + n.rangeRatio,
						min: r.roundValueFn.value(s),
						max: r.roundValueFn.value(s + n.rangeValue)
					}, r.focus.value = "both";
					break;
				}
			}
			l.value = l.value.min === null || l.value.max === null ? {
				min: a.min || e.min,
				max: a.max || e.max
			} : {
				min: a.min,
				max: a.max
			}, !e.snap || e.step === 0 ? (s.value = a.minR, c.value = a.maxR) : (s.value = i.convertModelToRatio(l.value.min), c.value = i.convertModelToRatio(l.value.max));
		}
		function A(t) {
			if (!bg.includes(t.keyCode)) return;
			wd(t);
			let n = ([34, 33].includes(t.keyCode) ? 10 : 1) * r.keyStep.value, i = ([
				34,
				37,
				40
			].includes(t.keyCode) ? -1 : 1) * (r.isReversed.value ? -1 : 1) * (e.vertical ? -1 : 1) * n;
			if (r.focus.value === "both") {
				let e = l.value.max - l.value.min, t = df(r.roundValueFn.value(l.value.min + i), r.innerMin.value, r.innerMax.value - e);
				l.value = {
					min: t,
					max: r.roundValueFn.value(t + e)
				};
			} else if (r.focus.value) {
				let e = r.focus.value;
				l.value = {
					...l.value,
					[e]: df(r.roundValueFn.value(l.value[e] + i), e === "min" ? r.innerMin.value : l.value.min, e === "max" ? r.innerMax.value : l.value.max)
				};
			} else return;
			D();
		}
		return () => {
			let t = i.getContent(g, x, v, (e) => {
				e.push(w(), E());
			});
			return _("div", {
				ref: a,
				class: "q-range " + r.classes.value + (e.modelValue.min === null || e.modelValue.max === null ? " q-slider--no-value" : ""),
				...r.attributes.value,
				"aria-valuenow": e.modelValue.min + "|" + e.modelValue.max
			}, t);
		};
	}
}), Q({
	name: "QRating",
	props: {
		...Tf,
		...Ch,
		modelValue: {
			type: Number,
			required: !0
		},
		max: {
			type: [String, Number],
			default: 5
		},
		icon: [String, Array],
		iconHalf: [String, Array],
		iconSelected: [String, Array],
		iconAriaLabel: [String, Array],
		color: [String, Array],
		colorHalf: [String, Array],
		colorSelected: [String, Array],
		noReset: Boolean,
		noDimming: Boolean,
		readonly: Boolean,
		disable: Boolean
	},
	emits: ["update:modelValue"],
	setup(e, { slots: t, emit: n }) {
		let { proxy: { $q: r } } = h(), i = Ef(e), a = Th(wh(e)), s = L(0), c = {}, l = o(() => !e.readonly && !e.disable), u = o(() => `q-rating row inline items-center q-rating--${l.value ? "" : "non-"}editable` + (e.noDimming ? " q-rating--no-dimming" : "") + (e.disable ? " disabled" : "") + (e.color !== void 0 && !Array.isArray(e.color) ? ` text-${e.color}` : "")), d = o(() => {
			let t = Array.isArray(e.icon) ? e.icon.length : 0, n = Array.isArray(e.iconSelected) ? e.iconSelected.length : 0, r = Array.isArray(e.iconHalf) ? e.iconHalf.length : 0, i = Array.isArray(e.color) ? e.color.length : 0, a = Array.isArray(e.colorSelected) ? e.colorSelected.length : 0, o = Array.isArray(e.colorHalf) ? e.colorHalf.length : 0;
			return {
				iconLen: t,
				icon: t > 0 ? e.icon[t - 1] : e.icon,
				selIconLen: n,
				selIcon: n > 0 ? e.iconSelected[n - 1] : e.iconSelected,
				halfIconLen: r,
				halfIcon: r > 0 ? e.iconHalf[n - 1] : e.iconHalf,
				colorLen: i,
				color: i > 0 ? e.color[i - 1] : e.color,
				selColorLen: a,
				selColor: a > 0 ? e.colorSelected[a - 1] : e.colorSelected,
				halfColorLen: o,
				halfColor: o > 0 ? e.colorHalf[o - 1] : e.colorHalf
			};
		}), f = o(() => {
			if (typeof e.iconAriaLabel == "string") {
				let t = e.iconAriaLabel.length === 0 ? "" : `${e.iconAriaLabel} `;
				return (e) => `${t}${e}`;
			}
			if (Array.isArray(e.iconAriaLabel)) {
				let t = e.iconAriaLabel.length;
				if (t > 0) return (n) => e.iconAriaLabel[Math.min(n, t) - 1];
			}
			return (e, t) => `${t} ${e}`;
		}), p = o(() => {
			let t = [], n = d.value, i = Math.ceil(e.modelValue), a = l.value ? 0 : null, o = e.iconHalf === void 0 || i === e.modelValue ? -1 : i;
			for (let c = 1; c <= e.max; c++) {
				let l = s.value === 0 && e.modelValue >= c || s.value > 0 && s.value >= c, u = o === c && s.value < c, d = s.value > 0 && (u ? i : e.modelValue) >= c && s.value < c, p = u ? c <= n.halfColorLen ? e.colorHalf[c - 1] : n.halfColor : n.selColor !== void 0 && l ? c <= n.selColorLen ? e.colorSelected[c - 1] : n.selColor : c <= n.colorLen ? e.color[c - 1] : n.color, m = (u ? c <= n.halfIconLen ? e.iconHalf[c - 1] : n.halfIcon : n.selIcon !== void 0 && (l || d) ? c <= n.selIconLen ? e.iconSelected[c - 1] : n.selIcon : c <= n.iconLen ? e.icon[c - 1] : n.icon) || r.iconSet.rating.icon;
				t.push({
					name: (u ? c <= n.halfIconLen ? e.iconHalf[c - 1] : n.halfIcon : n.selIcon !== void 0 && (l || d) ? c <= n.selIconLen ? e.iconSelected[c - 1] : n.selIcon : c <= n.iconLen ? e.icon[c - 1] : n.icon) || r.iconSet.rating.icon,
					attrs: {
						tabindex: a,
						role: "radio",
						"aria-checked": e.modelValue === c ? "true" : "false",
						"aria-label": f.value(c, m)
					},
					iconClass: "q-rating__icon" + (l || u ? " q-rating__icon--active" : "") + (d ? " q-rating__icon--exselected" : "") + (s.value === c ? " q-rating__icon--hovered" : "") + (p === void 0 ? "" : ` text-${p}`)
				});
			}
			return t;
		}), m = o(() => {
			let t = { role: "radiogroup" };
			return e.disable && (t["aria-disabled"] = "true"), e.readonly && (t["aria-readonly"] = "true"), t;
		});
		function g(t) {
			if (l.value) {
				let r = df(Number.parseInt(t, 10), 1, Number.parseInt(e.max, 10)), i = !e.noReset && e.modelValue === r ? 0 : r;
				i !== e.modelValue && n("update:modelValue", i), s.value = 0;
			}
		}
		function v(e) {
			l.value && (s.value = e);
		}
		function y(e, t) {
			switch (e.keyCode) {
				case 13:
				case 32: return g(t), wd(e);
				case 37:
				case 40: return c[`rt${t - 1}`] && c[`rt${t - 1}`].focus(), wd(e);
				case 39:
				case 38: return c[`rt${t + 1}`] && c[`rt${t + 1}`].focus(), wd(e);
			}
		}
		function b() {
			s.value = 0;
		}
		return O(() => {
			c = {};
		}), () => {
			let n = [];
			return p.value.forEach(({ iconClass: e, name: r, attrs: i }, a) => {
				let o = a + 1;
				n.push(_("div", {
					key: o,
					ref: (e) => {
						c[`rt${o}`] = e;
					},
					class: "q-rating__icon-container flex flex-center",
					...i,
					onClick() {
						g(o);
					},
					onMouseover() {
						v(o);
					},
					onMouseout: b,
					onFocus() {
						v(o);
					},
					onBlur: b,
					onKeyup(e) {
						y(e, o);
					}
				}, Of(t[`tip-${o}`], [_(Gf, {
					class: e,
					name: r
				})])));
			}), e.name !== void 0 && !e.disable && a(n, "push"), _("div", {
				class: u.value,
				style: i.value,
				...m.value
			}, n);
		};
	}
}), Q({
	name: "QResponsive",
	props: eb,
	setup(e, { slots: t }) {
		let n = tb(e);
		return () => _("div", { class: "q-responsive" }, [_("div", { class: "q-responsive__filler overflow-hidden" }, [_("div", { style: n.value })]), _("div", { class: "q-responsive__content absolute-full fit" }, $(t.default))]);
	}
});
var $b = Q({
	props: [
		"store",
		"barStyle",
		"verticalBarStyle",
		"horizontalBarStyle"
	],
	setup(e) {
		return () => [
			_("div", {
				class: e.store.scroll.vertical.barClass.value,
				style: [e.barStyle, e.verticalBarStyle],
				"aria-hidden": "true",
				onMousedown: e.store.onVerticalMousedown
			}),
			_("div", {
				class: e.store.scroll.horizontal.barClass.value,
				style: [e.barStyle, e.horizontalBarStyle],
				"aria-hidden": "true",
				onMousedown: e.store.onHorizontalMousedown
			}),
			re(_("div", {
				ref: e.store.scroll.vertical.ref,
				class: e.store.scroll.vertical.thumbClass.value,
				style: e.store.scroll.vertical.style.value,
				"aria-hidden": "true"
			}), e.store.thumbVertDir),
			re(_("div", {
				ref: e.store.scroll.horizontal.ref,
				class: e.store.scroll.horizontal.thumbClass.value,
				style: e.store.scroll.horizontal.style.value,
				"aria-hidden": "true"
			}), e.store.thumbHorizDir)
		];
	}
}), ex = ["vertical", "horizontal"], tx = {
	vertical: {
		offset: "offsetY",
		scroll: "scrollTop",
		dir: "down",
		dist: "y"
	},
	horizontal: {
		offset: "offsetX",
		scroll: "scrollLeft",
		dir: "right",
		dist: "x"
	}
}, nx = {
	prevent: !0,
	mouse: !0,
	mouseAllDir: !0
}, rx = (e) => e >= 250 ? 50 : Math.ceil(e / 5);
Q({
	name: "QScrollArea",
	props: {
		...qf,
		thumbStyle: Object,
		verticalThumbStyle: Object,
		horizontalThumbStyle: Object,
		barStyle: [
			Array,
			String,
			Object
		],
		verticalBarStyle: [
			Array,
			String,
			Object
		],
		horizontalBarStyle: [
			Array,
			String,
			Object
		],
		verticalOffset: {
			type: Array,
			default: [0, 0]
		},
		horizontalOffset: {
			type: Array,
			default: [0, 0]
		},
		contentStyle: [
			Array,
			String,
			Object
		],
		contentActiveStyle: [
			Array,
			String,
			Object
		],
		delay: {
			type: [String, Number],
			default: 1e3
		},
		visible: {
			type: Boolean,
			default: null
		},
		tabindex: [String, Number],
		onScroll: Function
	},
	setup(e, { slots: t, emit: n }) {
		let r = L(!1), i = L(!1), a = L(!1), s = {
			vertical: L(0),
			horizontal: L(0)
		}, c = {
			vertical: {
				ref: L(null),
				position: L(0),
				size: L(0)
			},
			horizontal: {
				ref: L(null),
				position: L(0),
				size: L(0)
			}
		}, { proxy: l } = h(), u = Jf(e, l.$q), d = null, f, p = L(null), m = o(() => "q-scrollarea" + (u.value ? " q-scrollarea--dark" : ""));
		Object.assign(s, {
			verticalInner: o(() => s.vertical.value - e.verticalOffset[0] - e.verticalOffset[1]),
			horizontalInner: o(() => s.horizontal.value - e.horizontalOffset[0] - e.horizontalOffset[1])
		}), c.vertical.percentage = o(() => {
			let e = c.vertical.size.value - s.vertical.value;
			if (e <= 0) return 0;
			let t = df(c.vertical.position.value / e, 0, 1);
			return Math.round(t * 1e4) / 1e4;
		}), c.vertical.thumbHidden = o(() => !(e.visible === null ? a.value : e.visible) && !r.value && !i.value || c.vertical.size.value <= s.vertical.value + 1), c.vertical.thumbStart = o(() => e.verticalOffset[0] + c.vertical.percentage.value * (s.verticalInner.value - c.vertical.thumbSize.value)), c.vertical.thumbSize = o(() => Math.round(df(s.verticalInner.value * s.verticalInner.value / c.vertical.size.value, rx(s.verticalInner.value), s.verticalInner.value))), c.vertical.style = o(() => ({
			...e.thumbStyle,
			...e.verticalThumbStyle,
			top: `${c.vertical.thumbStart.value}px`,
			height: `${c.vertical.thumbSize.value}px`,
			right: `${e.horizontalOffset[1]}px`
		})), c.vertical.thumbClass = o(() => "q-scrollarea__thumb q-scrollarea__thumb--v absolute-right" + (c.vertical.thumbHidden.value ? " q-scrollarea__thumb--invisible" : "")), c.vertical.barClass = o(() => "q-scrollarea__bar q-scrollarea__bar--v absolute-right" + (c.vertical.thumbHidden.value ? " q-scrollarea__bar--invisible" : "")), c.horizontal.percentage = o(() => {
			let e = c.horizontal.size.value - s.horizontal.value;
			if (e <= 0) return 0;
			let t = df(Math.abs(c.horizontal.position.value) / e, 0, 1);
			return Math.round(t * 1e4) / 1e4;
		}), c.horizontal.thumbHidden = o(() => !(e.visible === null ? a.value : e.visible) && !r.value && !i.value || c.horizontal.size.value <= s.horizontal.value + 1), c.horizontal.thumbStart = o(() => e.horizontalOffset[0] + c.horizontal.percentage.value * (s.horizontalInner.value - c.horizontal.thumbSize.value)), c.horizontal.thumbSize = o(() => Math.round(df(s.horizontalInner.value * s.horizontalInner.value / c.horizontal.size.value, rx(s.horizontalInner.value), s.horizontalInner.value))), c.horizontal.style = o(() => ({
			...e.thumbStyle,
			...e.horizontalThumbStyle,
			[l.$q.lang.rtl ? "right" : "left"]: `${c.horizontal.thumbStart.value}px`,
			width: `${c.horizontal.thumbSize.value}px`,
			bottom: `${e.verticalOffset[1]}px`
		})), c.horizontal.thumbClass = o(() => "q-scrollarea__thumb q-scrollarea__thumb--h absolute-bottom" + (c.horizontal.thumbHidden.value ? " q-scrollarea__thumb--invisible" : "")), c.horizontal.barClass = o(() => "q-scrollarea__bar q-scrollarea__bar--h absolute-bottom" + (c.horizontal.thumbHidden.value ? " q-scrollarea__bar--invisible" : ""));
		let g = o(() => c.vertical.thumbHidden.value && c.horizontal.thumbHidden.value ? e.contentStyle : e.contentActiveStyle);
		function v() {
			let e = {};
			return ex.forEach((t) => {
				let n = c[t];
				Object.assign(e, {
					[t + "Position"]: n.position.value,
					[t + "Percentage"]: n.percentage.value,
					[t + "Size"]: n.size.value,
					[t + "ContainerSize"]: s[t].value,
					[t + "ContainerInnerSize"]: s[t + "Inner"].value
				});
			}), e;
		}
		let y = Od(() => {
			let e = v();
			e.ref = l, n("scroll", e);
		}, 0);
		function b(e, t, n) {
			if (!ex.includes(e)) {
				console.error("[QScrollArea]: wrong first param of setScrollPosition (vertical/horizontal)");
				return;
			}
			(e === "vertical" ? Mm : Nm)(p.value, t, n);
		}
		function x({ height: e, width: t }) {
			let n = !1;
			s.vertical.value !== e && (s.vertical.value = e, n = !0), s.horizontal.value !== t && (s.horizontal.value = t, n = !0), n && O();
		}
		function S({ position: e }) {
			let t = !1;
			c.vertical.position.value !== e.top && (c.vertical.position.value = e.top, t = !0), c.horizontal.position.value !== e.left && (c.horizontal.position.value = e.left, t = !0), t && O();
		}
		function C({ height: e, width: t }) {
			c.horizontal.size.value !== t && (c.horizontal.size.value = t, O()), c.vertical.size.value !== e && (c.vertical.size.value = e, O());
		}
		function w(e, t) {
			let n = c[t];
			if (e.isFirst) {
				if (n.thumbHidden.value) return;
				f = n.position.value, i.value = !0;
			} else if (!i.value) return;
			e.isFinal && (i.value = !1);
			let r = tx[t], a = (n.size.value - s[t].value) / (s[t + "Inner"].value - n.thumbSize.value), o = e.distance[r.dist];
			A(f + (e.direction === r.dir ? 1 : -1) * o * a, t);
		}
		function E(t, n) {
			let r = c[n];
			if (!r.thumbHidden.value) {
				let i = n === "vertical" ? e.verticalOffset[0] : e.horizontalOffset[0], a = t[tx[n].offset] - i, o = r.thumbStart.value - i;
				(a < o || a > o + r.thumbSize.value) && A(df((a - r.thumbSize.value / 2) / (s[n + "Inner"].value - r.thumbSize.value), 0, 1) * Math.max(0, r.size.value - s[n].value), n), r.ref.value !== null && r.ref.value.dispatchEvent(new MouseEvent(t.type, t));
			}
		}
		function O() {
			r.value = !0, d !== null && clearTimeout(d), d = setTimeout(() => {
				d = null, r.value = !1;
			}, e.delay), e.onScroll !== void 0 && y();
		}
		function A(e, t) {
			p.value[tx[t].scroll] = e;
		}
		let j = null;
		function M() {
			j !== null && clearTimeout(j), j = setTimeout(() => {
				j = null, a.value = !0;
			}, l.$q.platform.is.ios ? 50 : 0);
		}
		function N() {
			j !== null && (clearTimeout(j), j = null), a.value = !1;
		}
		let P = null;
		G(() => l.$q.lang.rtl, (e) => {
			p.value !== null && Nm(p.value, Math.abs(c.horizontal.position.value) * (e ? -1 : 1));
		}), k(() => {
			P = {
				top: c.vertical.position.value,
				left: c.horizontal.position.value
			};
		}), T(() => {
			if (P === null) return;
			let e = p.value;
			e !== null && (Nm(e, P.left), Mm(e, P.top));
		}), D(y.cancel), Object.assign(l, {
			getScrollTarget: () => p.value,
			getScroll: v,
			getScrollPosition: () => ({
				top: c.vertical.position.value,
				left: c.horizontal.position.value
			}),
			getScrollPercentage: () => ({
				top: c.vertical.percentage.value,
				left: c.horizontal.percentage.value
			}),
			setScrollPosition: b,
			setScrollPercentage(e, t, n) {
				b(e, t * (c[e].size.value - s[e].value) * (e === "horizontal" && l.$q.lang.rtl ? -1 : 1), n);
			}
		});
		let F = {
			scroll: c,
			thumbVertDir: [[
				gg,
				(e) => {
					w(e, "vertical");
				},
				void 0,
				{
					vertical: !0,
					...nx
				}
			]],
			thumbHorizDir: [[
				gg,
				(e) => {
					w(e, "horizontal");
				},
				void 0,
				{
					horizontal: !0,
					...nx
				}
			]],
			onVerticalMousedown(e) {
				E(e, "vertical");
			},
			onHorizontalMousedown(e) {
				E(e, "horizontal");
			}
		};
		return () => _("div", {
			class: m.value,
			onMouseenter: M,
			onMouseleave: N
		}, [
			_("div", {
				ref: p,
				class: "q-scrollarea__container scroll relative-position fit hide-scrollbar",
				tabindex: e.tabindex === void 0 ? void 0 : e.tabindex
			}, [_("div", {
				class: "q-scrollarea__content absolute",
				style: g.value
			}, Of(t.default, [_(kg, {
				debounce: 0,
				onResize: C
			})])), _(Ab, {
				axis: "both",
				onScroll: S
			})]),
			_(kg, {
				debounce: 0,
				onResize: x
			}),
			_($b, {
				store: F,
				barStyle: e.barStyle,
				verticalBarStyle: e.verticalBarStyle,
				horizontalBarStyle: e.horizontalBarStyle
			})
		]);
	}
});
var ix = 1e3, ax = [
	"start",
	"center",
	"end",
	"start-force",
	"center-force",
	"end-force"
], ox = Array.prototype.filter, sx = __QUASAR_SSR__ || window.getComputedStyle(document.body).overflowAnchor === void 0 ? yd : function(e, t) {
	e !== null && (e._qOverflowAnimationFrame !== void 0 && cancelAnimationFrame(e._qOverflowAnimationFrame), e._qOverflowAnimationFrame = requestAnimationFrame(() => {
		if (e === null) return;
		e._qOverflowAnimationFrame = void 0;
		let n = e.children || [];
		ox.call(n, (e) => e.dataset && e.dataset.qVsAnchor !== void 0).forEach((e) => {
			delete e.dataset.qVsAnchor;
		});
		let r = n[t];
		r?.dataset && (r.dataset.qVsAnchor = "");
	}));
};
function cx(e, t) {
	return e + t;
}
function lx(e, t, n, r, i, a, o, s) {
	let c = e === window ? document.scrollingElement || document.documentElement : e, l = i ? "offsetWidth" : "offsetHeight", u = {
		scrollStart: 0,
		scrollViewSize: -o - s,
		scrollMaxSize: 0,
		offsetStart: -o,
		offsetEnd: -s
	};
	if (i ? (e === window ? (u.scrollStart = window.pageXOffset || window.scrollX || document.body.scrollLeft || 0, u.scrollViewSize += document.documentElement.clientWidth) : (u.scrollStart = c.scrollLeft, u.scrollViewSize += c.clientWidth), u.scrollMaxSize = c.scrollWidth, a && (u.scrollStart = (Ag ? u.scrollMaxSize - u.scrollViewSize : 0) - u.scrollStart)) : (e === window ? (u.scrollStart = window.pageYOffset || window.scrollY || document.body.scrollTop || 0, u.scrollViewSize += document.documentElement.clientHeight) : (u.scrollStart = c.scrollTop, u.scrollViewSize += c.clientHeight), u.scrollMaxSize = c.scrollHeight), n !== null) for (let e = n.previousElementSibling; e !== null; e = e.previousElementSibling) e.classList.contains("q-virtual-scroll--skip") || (u.offsetStart += e[l]);
	if (r !== null) for (let e = r.nextElementSibling; e !== null; e = e.nextElementSibling) e.classList.contains("q-virtual-scroll--skip") || (u.offsetEnd += e[l]);
	if (t !== e) {
		let n = c.getBoundingClientRect(), r = t.getBoundingClientRect();
		i ? (u.offsetStart += r.left - n.left, u.offsetEnd -= r.width) : (u.offsetStart += r.top - n.top, u.offsetEnd -= r.height), e !== window && (u.offsetStart += u.scrollStart), u.offsetEnd += u.scrollMaxSize - u.offsetStart;
	}
	return u;
}
function ux(e, t, n, r) {
	t === "end" && (t = (e === window ? document.body : e)[n ? "scrollWidth" : "scrollHeight"]), e === window ? n ? (r && (t = (Ag ? document.body.scrollWidth - document.documentElement.clientWidth : 0) - t), window.scrollTo(t, window.pageYOffset || window.scrollY || document.body.scrollTop || 0)) : window.scrollTo(window.pageXOffset || window.scrollX || document.body.scrollLeft || 0, t) : n ? (r && (t = (Ag ? e.scrollWidth - e.offsetWidth : 0) - t), e.scrollLeft = t) : e.scrollTop = t;
}
function dx(e, t, n, r) {
	if (n >= r) return 0;
	let i = t.length, a = Math.floor(n / ix), o = Math.floor((r - 1) / ix) + 1, s = e.slice(a, o).reduce(cx, 0);
	return n % ix !== 0 && (s -= t.slice(a * ix, n).reduce(cx, 0)), r % ix !== 0 && r !== i && (s -= t.slice(r, o * ix).reduce(cx, 0)), s;
}
var fx = {
	virtualScrollSliceSize: {
		type: [Number, String],
		default: 10
	},
	virtualScrollSliceRatioBefore: {
		type: [Number, String],
		default: 1
	},
	virtualScrollSliceRatioAfter: {
		type: [Number, String],
		default: 1
	},
	virtualScrollItemSize: {
		type: [Number, String],
		default: 24
	},
	virtualScrollStickySizeStart: {
		type: [Number, String],
		default: 0
	},
	virtualScrollStickySizeEnd: {
		type: [Number, String],
		default: 0
	},
	tableColspan: [Number, String]
}, px = Object.keys(fx), mx = {
	virtualScrollHorizontal: Boolean,
	onVirtualScroll: Function,
	...fx
};
function hx({ virtualScrollLength: e, getVirtualScrollTarget: t, getVirtualScrollEl: n, virtualScrollItemSizeComputed: r }) {
	let { props: i, emit: a, proxy: s } = h(), { $q: c } = s, l, u, d, f = [], p, m = L(0), g = L(0), v = L({}), y = L(null), b = L(null), x = L(null), S = L({
		from: 0,
		to: 0
	}), C = o(() => i.tableColspan === void 0 ? 100 : i.tableColspan);
	r === void 0 && (r = o(() => i.virtualScrollItemSize));
	let O = o(() => r.value + ";" + i.virtualScrollHorizontal);
	G(o(() => O.value + ";" + i.virtualScrollSliceRatioBefore + ";" + i.virtualScrollSliceRatioAfter), () => {
		z();
	}), G(O, A);
	function A() {
		R(u, !0);
	}
	function j(e) {
		R(e === void 0 ? u : e);
	}
	function M(r, a) {
		let o = t();
		if (o == null || o.nodeType === 8) return;
		let s = lx(o, n(), y.value, b.value, i.virtualScrollHorizontal, c.lang.rtl, i.virtualScrollStickySizeStart, i.virtualScrollStickySizeEnd);
		d !== s.scrollViewSize && z(s.scrollViewSize), P(o, s, Math.min(e.value - 1, Math.max(0, Number.parseInt(r, 10) || 0)), 0, ax.includes(a) ? a : u !== -1 && r > u ? "end" : "start");
	}
	function N() {
		let r = t();
		if (r == null || r.nodeType === 8) return;
		let a = lx(r, n(), y.value, b.value, i.virtualScrollHorizontal, c.lang.rtl, i.virtualScrollStickySizeStart, i.virtualScrollStickySizeEnd), o = e.value - 1, s = a.scrollMaxSize - a.offsetStart - a.offsetEnd - g.value;
		if (l === a.scrollStart) return;
		if (a.scrollMaxSize <= 0) {
			P(r, a, 0, 0);
			return;
		}
		d !== a.scrollViewSize && z(a.scrollViewSize), F(S.value.from);
		let u = Math.floor(a.scrollMaxSize - Math.max(a.scrollViewSize, a.offsetEnd) - Math.min(p[o], a.scrollViewSize / 2));
		if (u > 0 && Math.ceil(a.scrollStart) >= u) {
			P(r, a, o, a.scrollMaxSize - a.offsetEnd - f.reduce(cx, 0));
			return;
		}
		let h = 0, _ = a.scrollStart - a.offsetStart, v = _;
		if (_ <= s && _ + a.scrollViewSize >= m.value) _ -= m.value, h = S.value.from, v = _;
		else for (let e = 0; _ >= f[e] && h < o; e++) _ -= f[e], h += ix;
		for (; _ > 0 && h < o;) _ -= p[h], _ > -a.scrollViewSize ? (h++, v = _) : v = p[h] + _;
		P(r, a, h, v);
	}
	function P(t, n, r, a, o) {
		let s = typeof o == "string" && o.includes("-force"), u = s ? o.replace("-force", "") : o, d = u === void 0 ? "start" : u, h = Math.max(0, r - v.value[d]), _ = h + v.value.total;
		_ > e.value && (_ = e.value, h = Math.max(0, _ - v.value.total)), l = n.scrollStart;
		let y = h !== S.value.from || _ !== S.value.to;
		if (!y && u === void 0) {
			V(r);
			return;
		}
		let { activeElement: b } = document, C = x.value;
		y && C !== null && C !== b && C.contains(b) && (C.addEventListener("focusout", I), setTimeout(() => {
			C?.removeEventListener("focusout", I);
		})), sx(C, r - h);
		let w = u === void 0 ? 0 : p.slice(h, r).reduce(cx, 0);
		if (y) {
			let t = _ >= S.value.from && h <= S.value.to ? S.value.to : _;
			S.value = {
				from: h,
				to: t
			}, m.value = dx(f, p, 0, h), g.value = dx(f, p, _, e.value), requestAnimationFrame(() => {
				S.value.to !== _ && l === n.scrollStart && (S.value = {
					from: S.value.from,
					to: _
				}, g.value = dx(f, p, _, e.value));
			});
		}
		requestAnimationFrame(() => {
			if (l !== n.scrollStart) return;
			y && F(h);
			let e = p.slice(h, r).reduce(cx, 0), o = e + n.offsetStart + m.value, d = o + p[r], f = o + a;
			if (u !== void 0) {
				let t = e - w, i = n.scrollStart + t;
				f = !s && i < o && d < i + n.scrollViewSize ? i : u === "end" ? d - n.scrollViewSize : o - (u === "start" ? 0 : Math.round((n.scrollViewSize - p[r]) / 2));
			}
			l = f, ux(t, f, i.virtualScrollHorizontal, c.lang.rtl), V(r);
		});
	}
	function F(e) {
		let t = x.value;
		if (t) {
			let n = ox.call(t.children, (e) => e.classList && !e.classList.contains("q-virtual-scroll--skip")), r = n.length, a = i.virtualScrollHorizontal ? (e) => e.getBoundingClientRect().width : (e) => e.offsetHeight, o = e, s, c;
			for (let e = 0; e < r;) {
				for (s = a(n[e]), e++; e < r && n[e].classList.contains("q-virtual-scroll--with-prev");) s += a(n[e]), e++;
				c = s - p[o], c !== 0 && (p[o] += c, f[Math.floor(o / ix)] += c), o++;
			}
		}
	}
	function I() {
		x.value?.focus();
	}
	function R(t, n) {
		let i = Number(r.value);
		(n || !Array.isArray(p)) && (p = []);
		let a = p.length;
		p.length = e.value;
		for (let t = e.value - 1; t >= a; t--) p[t] = i;
		let o = Math.floor((e.value - 1) / ix);
		f = [];
		for (let t = 0; t <= o; t++) {
			let n = 0, r = Math.min((t + 1) * ix, e.value);
			for (let e = t * ix; e < r; e++) n += p[e];
			f.push(n);
		}
		u = -1, l = void 0, m.value = dx(f, p, 0, S.value.from), g.value = dx(f, p, S.value.to, e.value), t >= 0 ? (F(S.value.from), w(() => {
			M(t);
		})) : ee();
	}
	function z(e) {
		if (e === void 0 && typeof window < "u") {
			let r = t();
			r != null && r.nodeType !== 8 && (e = lx(r, n(), y.value, b.value, i.virtualScrollHorizontal, c.lang.rtl, i.virtualScrollStickySizeStart, i.virtualScrollStickySizeEnd).scrollViewSize);
		}
		d = e;
		let a = Number.parseFloat(i.virtualScrollSliceRatioBefore) || 0, o = Number.parseFloat(i.virtualScrollSliceRatioAfter) || 0, s = 1 + a + o, l = e === void 0 || e <= 0 ? 1 : Math.ceil(e / r.value), u = Math.max(1, l, Math.ceil((i.virtualScrollSliceSize > 0 ? i.virtualScrollSliceSize : 10) / s));
		v.value = {
			total: Math.ceil(u * s),
			start: Math.ceil(u * a),
			center: Math.ceil(u * (.5 + a)),
			end: Math.ceil(u * (1 + a)),
			view: l
		};
	}
	function B(e, t) {
		let n = i.virtualScrollHorizontal ? "width" : "height", a = { ["--q-virtual-scroll-item-" + n]: r.value + "px" };
		return [
			e === "tbody" ? _(e, {
				class: "q-virtual-scroll__padding",
				key: "before",
				ref: y
			}, [_("tr", [_("td", {
				style: {
					[n]: `${m.value}px`,
					...a
				},
				colspan: C.value
			})])]) : _(e, {
				class: "q-virtual-scroll__padding",
				key: "before",
				ref: y,
				style: {
					[n]: `${m.value}px`,
					...a
				}
			}),
			_(e, {
				class: "q-virtual-scroll__content",
				key: "content",
				ref: x,
				tabindex: -1
			}, t.flat()),
			e === "tbody" ? _(e, {
				class: "q-virtual-scroll__padding",
				key: "after",
				ref: b
			}, [_("tr", [_("td", {
				style: {
					[n]: `${g.value}px`,
					...a
				},
				colspan: C.value
			})])]) : _(e, {
				class: "q-virtual-scroll__padding",
				key: "after",
				ref: b,
				style: {
					[n]: `${g.value}px`,
					...a
				}
			})
		];
	}
	function V(e) {
		u !== e && (i.onVirtualScroll !== void 0 && a("virtualScroll", {
			index: e,
			from: S.value.from,
			to: S.value.to - 1,
			direction: e < u ? "decrease" : "increase",
			ref: s
		}), u = e);
	}
	z();
	let ee = Od(N, c.platform.is.ios ? 120 : 35);
	E(() => {
		z();
	});
	let te = !1;
	return k(() => {
		te = !0;
	}), T(() => {
		if (!te) return;
		let e = t();
		l !== void 0 && e != null && e.nodeType !== 8 ? ux(e, l, i.virtualScrollHorizontal, c.lang.rtl) : M(u);
	}), __QUASAR_SSR__ || D(() => {
		ee.cancel();
	}), Object.assign(s, {
		scrollTo: M,
		reset: A,
		refresh: j
	}), {
		virtualScrollSliceRange: S,
		virtualScrollSliceSizeComputed: v,
		setVirtualScrollSize: z,
		onVirtualScrollEvt: ee,
		localResetVirtualScroll: R,
		padVirtualScroll: B,
		scrollTo: M,
		reset: A,
		refresh: j
	};
}
var gx = (e) => [
	"add",
	"add-unique",
	"toggle"
].includes(e), _x = ".*+?^${}()|[]\\", vx = Object.keys(Ry);
function yx(e, t) {
	if (typeof e == "function") return e;
	let n = e === void 0 ? t : e;
	return (e) => typeof e == "object" && e && n in e ? e[n] : e;
}
var bx = Q({
	name: "QSelect",
	inheritAttrs: !1,
	props: {
		...mx,
		...Ch,
		...Ry,
		modelValue: { required: !0 },
		multiple: Boolean,
		displayValue: [String, Number],
		displayValueHtml: Boolean,
		dropdownIcon: String,
		options: {
			type: Array,
			default: () => []
		},
		optionValue: [Function, String],
		optionLabel: [Function, String],
		optionDisable: [Function, String],
		hideSelected: Boolean,
		hideDropdownIcon: Boolean,
		fillInput: Boolean,
		maxValues: [Number, String],
		optionsDense: Boolean,
		optionsDark: {
			type: Boolean,
			default: null
		},
		optionsSelectedClass: String,
		optionsHtml: Boolean,
		optionsCover: Boolean,
		menuShrink: Boolean,
		menuAnchor: String,
		menuSelf: String,
		menuOffset: Array,
		popupContentClass: String,
		popupContentStyle: [
			String,
			Array,
			Object
		],
		popupNoRouteDismiss: Boolean,
		useInput: Boolean,
		useChips: Boolean,
		newValueMode: {
			type: String,
			validator: gx
		},
		mapOptions: Boolean,
		emitValue: Boolean,
		disableTabSelection: Boolean,
		inputDebounce: {
			type: [Number, String],
			default: 500
		},
		inputClass: [
			Array,
			String,
			Object
		],
		inputStyle: [
			Array,
			String,
			Object
		],
		tabindex: {
			type: [String, Number],
			default: 0
		},
		autocomplete: String,
		transitionShow: {},
		transitionHide: {},
		transitionDuration: {},
		behavior: {
			type: String,
			validator: (e) => [
				"default",
				"menu",
				"dialog"
			].includes(e),
			default: "default"
		},
		virtualScrollItemSize: mx.virtualScrollItemSize.type,
		onNewValue: Function,
		onFilter: Function
	},
	emits: [
		...zy,
		"add",
		"remove",
		"inputValue",
		"keyup",
		"keypress",
		"keydown",
		"popupShow",
		"popupHide",
		"filterAbort"
	],
	setup(e, { slots: t, emit: n }) {
		let { proxy: r } = h(), { $q: i } = r, a = L(!1), s = L(!1), c = L(-1), l = L(""), u = L(!1), d = L(!1), f = null, p = null, m, g, v, y = null, b, x, S, C, T = L(null), E = L(null), k = L(null), A = L(null), j = L(null), M = Eh(e), P = vb(He), F = o(() => Array.isArray(e.options) ? e.options.length : 0), { virtualScrollSliceRange: I, virtualScrollSliceSizeComputed: R, localResetVirtualScroll: z, padVirtualScroll: B, onVirtualScrollEvt: V, scrollTo: ee, setVirtualScrollSize: te } = hx({
			virtualScrollLength: F,
			getVirtualScrollTarget: Re,
			getVirtualScrollEl: Le,
			virtualScrollItemSizeComputed: o(() => e.virtualScrollItemSize === void 0 ? e.optionsDense ? 24 : 48 : e.virtualScrollItemSize)
		}), H = By(), U = o(() => {
			let t = e.mapOptions && !e.multiple, n = e.modelValue !== void 0 && (e.modelValue !== null || t) ? e.multiple && Array.isArray(e.modelValue) ? e.modelValue : [e.modelValue] : [];
			if (e.mapOptions && Array.isArray(e.options)) {
				let r = e.mapOptions && m !== void 0 ? m : [], i = n.map((e) => Ae(e, r));
				return e.modelValue === null && t ? i.filter((e) => e !== null) : i;
			}
			return n;
		}), W = o(() => {
			let t = {};
			return vx.forEach((n) => {
				let r = e[n];
				r !== void 0 && (t[n] = r);
			}), t;
		}), ne = o(() => e.optionsDark === null ? H.isDark.value : e.optionsDark), re = o(() => Iy(U.value)), ie = o(() => {
			let t = "q-field__input q-placeholder col";
			return e.hideSelected || U.value.length === 0 ? [t, e.inputClass] : (t += " q-field__input--padding", e.inputClass === void 0 ? t : [t, e.inputClass]);
		}), K = o(() => (e.virtualScrollHorizontal ? "q-virtual-scroll--horizontal" : "") + (e.popupContentClass ? " " + e.popupContentClass : "")), ae = o(() => F.value === 0), oe = o(() => U.value.map((e) => ye.value(e)).join(", ")), se = o(() => e.displayValue === void 0 ? oe.value : e.displayValue), ce = o(() => e.optionsHtml ? () => !0 : (e) => e?.html === !0), le = o(() => e.displayValueHtml || e.displayValue === void 0 && (e.optionsHtml || U.value.some(ce.value))), ue = o(() => H.focused.value ? e.tabindex : -1), de = o(() => {
			let t = {
				tabindex: e.tabindex,
				role: "combobox",
				"aria-label": e.label,
				"aria-readonly": e.readonly ? "true" : "false",
				"aria-autocomplete": e.useInput ? "list" : "none",
				"aria-expanded": a.value ? "true" : "false",
				"aria-controls": `${H.targetUid.value}_lb`
			};
			return c.value >= 0 && (t["aria-activedescendant"] = `${H.targetUid.value}_${c.value}`), t;
		}), fe = o(() => ({
			id: `${H.targetUid.value}_lb`,
			role: "listbox",
			"aria-multiselectable": e.multiple ? "true" : "false"
		})), pe = o(() => U.value.map((e, t) => ({
			index: t,
			opt: e,
			html: ce.value(e),
			selected: !0,
			removeAtIndex: Te,
			toggleOption: De,
			tabindex: ue.value
		}))), me = o(() => {
			if (F.value === 0) return [];
			let { from: t, to: n } = I.value;
			return e.options.slice(t, n).map((n, r) => {
				let o = be.value(n) === !0, s = je(n), l = t + r, u = {
					clickable: !0,
					active: s,
					activeClass: _e.value,
					manualFocus: !0,
					focused: !1,
					disable: o,
					tabindex: -1,
					dense: e.optionsDense,
					dark: ne.value,
					role: "option",
					"aria-selected": s ? "true" : "false",
					id: `${H.targetUid.value}_${l}`,
					onClick: () => {
						De(n);
					}
				};
				return o || (c.value === l && (u.focused = !0), i.platform.is.desktop && (u.onMousemove = () => {
					a.value && Oe(l);
				})), {
					index: l,
					opt: n,
					html: ce.value(n),
					label: ye.value(n),
					selected: u.active,
					focused: u.focused,
					toggleOption: De,
					setOptionIndex: Oe,
					itemProps: u
				};
			});
		}), he = o(() => e.dropdownIcon === void 0 ? i.iconSet.arrow.dropdown : e.dropdownIcon), ge = o(() => !e.optionsCover && !e.outlined && !e.standout && !e.borderless && !e.rounded), _e = o(() => e.optionsSelectedClass === void 0 ? e.color === void 0 ? "" : `text-${e.color}` : e.optionsSelectedClass), ve = o(() => yx(e.optionValue, "value")), ye = o(() => yx(e.optionLabel, "label")), be = o(() => yx(e.optionDisable, "disable")), xe = o(() => U.value.map(ve.value)), Se = o(() => {
			let e = {
				onInput: He,
				onChange: P,
				onKeydown: Ie,
				onKeyup: Pe,
				onKeypress: Fe,
				onFocus: Me,
				onClick(e) {
					g && Sd(e);
				}
			};
			return e.onCompositionstart = e.onCompositionupdate = e.onCompositionend = P, e;
		});
		G(U, (t) => {
			m = t, e.useInput && e.fillInput && !e.multiple && !H.innerLoading.value && (!s.value && !a.value || !re.value) && (v || rt(), (s.value || a.value) && Ge(""));
		}, { immediate: !0 }), G(() => e.fillInput, rt), G(a, it), G(F, at);
		function Ce(t) {
			return e.emitValue ? ve.value(t) : t;
		}
		function we(t) {
			if (t !== -1 && t < U.value.length) if (e.multiple) {
				let r = [...e.modelValue];
				n("remove", {
					index: t,
					value: r.splice(t, 1)[0]
				}), n("update:modelValue", r);
			} else n("update:modelValue", null);
		}
		function Te(e) {
			we(e), H.focus();
		}
		function Ee(t, r) {
			let i = Ce(t);
			if (!e.multiple) {
				e.fillInput && We(ye.value(t), !0, !0), n("update:modelValue", i);
				return;
			}
			if (U.value.length === 0) {
				n("add", {
					index: 0,
					value: i
				}), n("update:modelValue", e.multiple ? [i] : i);
				return;
			}
			if (r && je(t) || e.maxValues !== void 0 && e.modelValue.length >= e.maxValues) return;
			let a = [...e.modelValue];
			n("add", {
				index: a.length,
				value: i
			}), a.push(i), n("update:modelValue", a);
		}
		function De(t, r) {
			if (!H.editable.value || t === void 0 || be.value(t) === !0) return;
			let i = ve.value(t);
			if (!e.multiple) {
				r || (We(e.fillInput ? ye.value(t) : "", !0, !0), nt()), E.value?.focus(), (U.value.length === 0 || !ef(ve.value(U.value[0]), i)) && n("update:modelValue", e.emitValue ? i : t);
				return;
			}
			if ((!g || u.value) && H.focus(), Me(), U.value.length === 0) {
				let r = e.emitValue ? i : t;
				n("add", {
					index: 0,
					value: r
				}), n("update:modelValue", e.multiple ? [r] : r);
				return;
			}
			let a = [...e.modelValue], o = xe.value.findIndex((e) => ef(e, i));
			if (o !== -1) n("remove", {
				index: o,
				value: a.splice(o, 1)[0]
			});
			else {
				if (e.maxValues !== void 0 && a.length >= e.maxValues) return;
				let r = e.emitValue ? i : t;
				n("add", {
					index: a.length,
					value: r
				}), a.push(r);
			}
			n("update:modelValue", a);
		}
		function Oe(e) {
			if (!i.platform.is.desktop) return;
			let t = e !== -1 && e < F.value ? e : -1;
			c.value !== t && (c.value = t);
		}
		function ke(t = 1, n) {
			if (a.value) {
				let r = c.value;
				do
					r = ff(r + t, -1, F.value - 1);
				while (r !== -1 && r !== c.value && be.value(e.options[r]) === !0);
				c.value !== r && (Oe(r), ee(r), !n && e.useInput && e.fillInput && Ue(r >= 0 ? ye.value(e.options[r]) : b, !0));
			}
		}
		function Ae(t, n) {
			let r = (e) => ef(ve.value(e), t);
			return e.options.find(r) || n.find(r) || t;
		}
		function je(e) {
			let t = ve.value(e);
			return xe.value.find((e) => ef(e, t)) !== void 0;
		}
		function Me(t) {
			e.useInput && E.value !== null && (t === void 0 || E.value === t.target && t.target.value === oe.value) && E.value.select();
		}
		function Ne(e) {
			Pd(e, 27) && a.value && (Sd(e), nt(), rt()), n("keyup", e);
		}
		function Pe(t) {
			let { value: n } = t.target;
			if (t.keyCode !== void 0) {
				Ne(t);
				return;
			}
			if (t.target.value = "", f !== null && (clearTimeout(f), f = null), p !== null && (clearTimeout(p), p = null), rt(), typeof n == "string" && n.length !== 0) {
				let t = n.toLocaleLowerCase(), r = (n) => {
					let r = e.options.find((e) => String(n.value(e)).toLocaleLowerCase() === t);
					return r === void 0 ? !1 : (U.value.includes(r) ? nt() : De(r), !0);
				}, i = (e) => {
					!r(ve) && !e && !r(ye) && Ge(n, !0, () => i(!0));
				};
				i();
			} else H.clearValue(t);
		}
		function Fe(e) {
			n("keypress", e);
		}
		function Ie(t) {
			if (n("keydown", t), Nd(t)) return;
			let r = l.value.length !== 0 && (e.newValueMode !== void 0 || e.onNewValue !== void 0), i = !t.shiftKey && !e.disableTabSelection && !e.multiple && (c.value !== -1 || r);
			if (t.keyCode === 27) {
				Cd(t);
				return;
			}
			if (t.keyCode === 9 && !i) {
				et();
				return;
			}
			if (t.target === void 0 || t.target.id !== H.targetUid.value || !H.editable.value) return;
			if (t.keyCode === 40 && !H.innerLoading.value && !a.value) {
				wd(t), tt();
				return;
			}
			if (t.keyCode === 8 && (e.useChips || e.clearable) && !e.hideSelected && l.value.length === 0) {
				e.multiple && Array.isArray(e.modelValue) ? we(e.modelValue.length - 1) : !e.multiple && e.modelValue !== null && n("update:modelValue", null);
				return;
			}
			(t.keyCode === 35 || t.keyCode === 36) && (typeof l.value != "string" || l.value.length === 0) && (wd(t), c.value = -1, ke(t.keyCode === 36 ? 1 : -1, e.multiple)), (t.keyCode === 33 || t.keyCode === 34) && R.value !== void 0 && (wd(t), c.value = Math.max(-1, Math.min(F.value, c.value + (t.keyCode === 33 ? -1 : 1) * R.value.view)), ke(t.keyCode === 33 ? 1 : -1, e.multiple)), (t.keyCode === 38 || t.keyCode === 40) && (wd(t), ke(t.keyCode === 38 ? -1 : 1, e.multiple));
			let o = F.value;
			if ((S === void 0 || C < Date.now()) && (S = ""), o > 0 && !e.useInput && t.key !== void 0 && t.key.length === 1 && !t.altKey && !t.ctrlKey && !t.metaKey && (t.keyCode !== 32 || S.length !== 0)) {
				a.value || tt(t);
				let n = t.key.toLocaleLowerCase(), r = S.length === 1 && S[0] === n;
				C = Date.now() + 1500, r || (wd(t), S += n);
				let i = RegExp("^" + [...S].map((e) => _x.includes(e) ? "\\" + e : e).join(".*"), "i"), s = c.value;
				if (r || s < 0 || !i.test(ye.value(e.options[s]))) do
					s = ff(s + 1, -1, o - 1);
				while (s !== c.value && (be.value(e.options[s]) === !0 || !i.test(ye.value(e.options[s]))));
				c.value !== s && w(() => {
					Oe(s), ee(s), s >= 0 && e.useInput && e.fillInput && Ue(ye.value(e.options[s]), !0);
				});
				return;
			}
			if (!(t.keyCode !== 13 && (t.keyCode !== 32 || e.useInput || S !== "") && (t.keyCode !== 9 || !i))) {
				if (t.keyCode !== 9 && wd(t), c.value !== -1 && c.value < o) {
					De(e.options[c.value]);
					return;
				}
				if (r) {
					let t = (t, n) => {
						if (n) {
							if (!gx(n)) return;
						} else n = e.newValueMode;
						We("", !e.multiple, !0), t != null && ((n === "toggle" ? De : Ee)(t, n === "add-unique"), e.multiple || (E.value?.focus(), nt()));
					};
					if (e.onNewValue === void 0 ? t(l.value) : n("newValue", l.value, t), !e.multiple) return;
				}
				a.value ? et() : H.innerLoading.value || tt();
			}
		}
		function Le() {
			return g ? j.value : k.value !== null && k.value.contentEl !== null ? k.value.contentEl : void 0;
		}
		function Re() {
			return Le();
		}
		function ze() {
			return e.hideSelected ? [] : t["selected-item"] === void 0 ? t.selected === void 0 ? e.useChips ? pe.value.map((t, n) => _(og, {
				key: "option-" + n,
				removable: H.editable.value && be.value(t.opt) !== !0,
				dense: !0,
				textColor: e.color,
				tabindex: ue.value,
				onRemove() {
					t.removeAtIndex(n);
				}
			}, () => _("span", {
				class: "ellipsis",
				[t.html ? "innerHTML" : "textContent"]: ye.value(t.opt)
			}))) : [_("span", {
				class: "ellipsis",
				[le.value ? "innerHTML" : "textContent"]: se.value
			})] : [t.selected()].flat() : pe.value.map((e) => t["selected-item"](e));
		}
		function Be() {
			if (ae.value) return t["no-option"] === void 0 ? void 0 : t["no-option"]({ inputValue: l.value });
			let e = t.option === void 0 ? (e) => _(ny, {
				key: e.index,
				...e.itemProps
			}, () => _(ry, () => _(vy, () => _("span", { [e.html ? "innerHTML" : "textContent"]: e.label })))) : t.option, n = B("div", me.value.map(e));
			return t["before-options"] !== void 0 && (n = [t["before-options"](), ...n].flat()), Of(t["after-options"], n);
		}
		function Ve(t, n) {
			let r = n ? {
				...de.value,
				...H.splitAttrs.attributes.value
			} : void 0, i = {
				ref: n ? E : void 0,
				key: "i_t",
				class: ie.value,
				style: e.inputStyle,
				value: l.value === void 0 ? "" : l.value,
				type: "search",
				...r,
				id: n ? H.targetUid.value : void 0,
				maxlength: e.maxlength,
				autocomplete: e.autocomplete,
				"data-autofocus": t === !0 || e.autofocus || void 0,
				disabled: e.disable,
				readonly: e.readonly,
				...Se.value
			};
			return !t && g && (Array.isArray(i.class) ? i.class = [...i.class, "no-pointer-events"] : i.class += " no-pointer-events"), _("input", i);
		}
		function He(t) {
			f !== null && (clearTimeout(f), f = null), p !== null && (clearTimeout(p), p = null), !t?.target?.qComposing && (Ue(t.target.value || ""), v = !0, b = l.value, !H.focused.value && (!g || u.value) && H.focus(), e.onFilter !== void 0 && (f = setTimeout(() => {
				f = null, Ge(l.value);
			}, e.inputDebounce)));
		}
		function Ue(t, r) {
			l.value !== t && (l.value = t, r || e.inputDebounce === 0 || e.inputDebounce === "0" ? n("inputValue", t) : p = setTimeout(() => {
				p = null, n("inputValue", t);
			}, e.inputDebounce));
		}
		function We(t, n, r) {
			v = r !== !0, e.useInput && (Ue(t, !0), (n || v) && (b = t), n || Ge(t));
		}
		function Ge(t, i, o) {
			if (e.onFilter === void 0 || !i && !H.focused.value) return;
			H.innerLoading.value ? n("filterAbort") : (H.innerLoading.value = !0, d.value = !0), t !== "" && !e.multiple && U.value.length !== 0 && !v && t === ye.value(U.value[0]) && (t = "");
			let s = setTimeout(() => {
				a.value &&= !1;
			}, 10);
			y !== null && clearTimeout(y), y = s, n("filter", t, (e, t) => {
				(i || H.focused.value) && y === s && (clearTimeout(y), typeof e == "function" && e(), d.value = !1, w(() => {
					H.innerLoading.value = !1, H.editable.value && (i ? a.value && nt() : a.value ? it(!0) : a.value = !0), typeof t == "function" && w(() => {
						t(r);
					}), typeof o == "function" && w(() => {
						o(r);
					});
				}));
			}, () => {
				H.focused.value && y === s && (clearTimeout(y), H.innerLoading.value = !1, d.value = !1), a.value &&= !1;
			});
		}
		function Ke() {
			return _(mh, {
				ref: k,
				class: K.value,
				style: e.popupContentStyle,
				modelValue: a.value,
				fit: !e.menuShrink,
				cover: e.optionsCover && !ae.value && !e.useInput,
				anchor: e.menuAnchor,
				self: e.menuSelf,
				offset: e.menuOffset,
				dark: ne.value,
				noParentEvent: !0,
				noRefocus: !0,
				noFocus: !0,
				noRouteDismiss: e.popupNoRouteDismiss,
				square: ge.value,
				transitionShow: e.transitionShow,
				transitionHide: e.transitionHide,
				transitionDuration: e.transitionDuration,
				separateClosePopup: !0,
				...fe.value,
				onScrollPassive: V,
				onBeforeShow: st,
				onBeforeHide: qe,
				onShow: Je
			}, Be);
		}
		function qe(e) {
			ct(e), et();
		}
		function Je() {
			te();
		}
		function q(e) {
			Sd(e), E.value?.focus(), u.value = !0, window.scrollTo(window.pageXOffset || window.scrollX || document.body.scrollLeft || 0, 0);
		}
		function Ye(e) {
			Sd(e), w(() => {
				u.value = !1;
			});
		}
		function Xe() {
			let n = [_(Uy, {
				class: `col-auto ${H.fieldClass.value}`,
				...W.value,
				for: H.targetUid.value,
				dark: ne.value,
				square: !0,
				loading: d.value,
				itemAligned: !1,
				filled: !0,
				stackLabel: l.value.length !== 0,
				...H.splitAttrs.listeners.value,
				onFocus: q,
				onBlur: Ye
			}, {
				...t,
				rawControl: () => H.getControl(!0),
				before: void 0,
				after: void 0
			})];
			return a.value && n.push(_("div", {
				ref: j,
				class: K.value + " scroll",
				style: e.popupContentStyle,
				...fe.value,
				onClick: Cd,
				onScrollPassive: V
			}, Be())), _(Kv, {
				ref: A,
				modelValue: s.value,
				position: e.useInput ? "top" : void 0,
				transitionShow: x,
				transitionHide: e.transitionHide,
				transitionDuration: e.transitionDuration,
				noRouteDismiss: e.popupNoRouteDismiss,
				onBeforeShow: st,
				onBeforeHide: Ze,
				onHide: Qe,
				onShow: $e
			}, () => _("div", { class: "q-select__dialog" + (ne.value ? " q-select__dialog--dark q-dark" : "") + (u.value ? " q-select__dialog--focused" : "") }, n));
		}
		function Ze(e) {
			ct(e), A.value !== null && A.value.__updateRefocusTarget(H.rootRef.value.querySelector(".q-field__native > [tabindex]:last-child")), H.focused.value = !1;
		}
		function Qe(e) {
			nt(), H.focused.value || n("blur", e), rt();
		}
		function $e() {
			let e = document.activeElement;
			(e === null || e.id !== H.targetUid.value) && E.value !== null && E.value !== e && E.value.focus(), te();
		}
		function et() {
			s.value || (c.value = -1, a.value &&= !1, H.focused.value || (y !== null && (clearTimeout(y), y = null), H.innerLoading.value && (n("filterAbort"), H.innerLoading.value = !1, d.value = !1)));
		}
		function tt(n) {
			H.editable.value && (g ? (H.onControlFocusin(n), s.value = !0, w(() => {
				H.focus();
			})) : H.focus(), e.onFilter === void 0 ? (!ae.value || t["no-option"] !== void 0) && (a.value = !0) : Ge(l.value));
		}
		function nt() {
			s.value = !1, et();
		}
		function rt() {
			e.useInput && We(!e.multiple && e.fillInput && U.value.length !== 0 && ye.value(U.value[0]) || "", !0, !0);
		}
		function it(t) {
			let n = -1;
			if (t) {
				if (U.value.length !== 0) {
					let t = ve.value(U.value[0]);
					n = e.options.findIndex((e) => ef(ve.value(e), t));
				}
				z(n);
			}
			Oe(n);
		}
		function at(e, t) {
			a.value && !H.innerLoading.value && (z(-1, !0), w(() => {
				a.value && !H.innerLoading.value && (e > t ? z() : it(!0));
			}));
		}
		function ot() {
			s.value || k.value?.updatePosition();
		}
		function st(e) {
			e !== void 0 && Sd(e), n("popupShow", e), H.hasPopupOpen = !0, H.onControlFocusin(e);
		}
		function ct(e) {
			e !== void 0 && Sd(e), n("popupHide", e), H.hasPopupOpen = !1, H.onControlFocusout(e);
		}
		function lt() {
			g = !i.platform.is.mobile && e.behavior !== "dialog" ? !1 : e.behavior !== "menu" && (!e.useInput || t["no-option"] !== void 0 || e.onFilter !== void 0 || !ae.value), x = i.platform.is.ios && g && e.useInput ? "fade" : e.transitionShow;
		}
		return O(lt), N(ot), lt(), D(() => {
			f !== null && clearTimeout(f), p !== null && clearTimeout(p);
		}), Object.assign(r, {
			showPopup: tt,
			hidePopup: nt,
			removeAtIndex: we,
			add: Ee,
			toggleOption: De,
			getOptionIndex: () => c.value,
			setOptionIndex: Oe,
			moveOptionSelection: ke,
			filter: Ge,
			updateMenuPosition: ot,
			updateInputValue: We,
			isOptionSelected: je,
			getEmittingOptionValue: Ce,
			isOptionDisabled: (...e) => be.value(...e) === !0,
			getOptionValue: (...e) => ve.value(...e),
			getOptionLabel: (...e) => ye.value(...e)
		}), Object.assign(H, {
			innerValue: U,
			fieldClass: o(() => `q-select q-field--auto-height q-select--with${e.useInput ? "" : "out"}-input q-select--with${e.useChips ? "" : "out"}-chips q-select--${e.multiple ? "multiple" : "single"}`),
			inputRef: T,
			targetRef: E,
			hasValue: re,
			showPopup: tt,
			floatingLabel: o(() => !e.hideSelected && re.value || typeof l.value == "number" || l.value.length !== 0 || Iy(e.displayValue)),
			getControlChild: () => {
				if (H.editable.value && (s.value || !ae.value || t["no-option"] !== void 0)) return g ? Xe() : Ke();
				H.hasPopupOpen &&= !1;
			},
			controlEvents: {
				onFocusin(e) {
					H.onControlFocusin(e);
				},
				onFocusout(e) {
					H.onControlFocusout(e, () => {
						rt(), et();
					});
				},
				onClick(e) {
					if (Cd(e), !g && a.value) {
						et(), E.value?.focus();
						return;
					}
					tt(e);
				}
			},
			getControl: (t) => {
				let n = ze(), r = t === !0 || !s.value || !g;
				if (e.useInput) n.push(Ve(t, r));
				else if (H.editable.value) {
					let i = r ? de.value : void 0;
					n.push(_("input", {
						ref: r ? E : void 0,
						key: "d_t",
						class: "q-select__focus-target",
						id: r ? H.targetUid.value : void 0,
						value: se.value,
						readonly: !0,
						"data-autofocus": t === !0 || e.autofocus || void 0,
						...i,
						onKeydown: Ie,
						onKeyup: Ne,
						onKeypress: Fe
					})), r && typeof e.autocomplete == "string" && e.autocomplete.length !== 0 && n.push(_("input", {
						class: "q-select__autocomplete-input",
						autocomplete: e.autocomplete,
						tabindex: -1,
						onKeyup: Pe
					}));
				}
				if (M.value !== void 0 && !e.disable && xe.value.length !== 0) {
					let t = xe.value.map((e) => _("option", {
						value: e,
						selected: !0
					}));
					n.push(_("select", {
						class: "hidden",
						name: M.value,
						multiple: e.multiple
					}, t));
				}
				return _("div", {
					class: "q-field__native row items-center",
					...e.useInput || !r ? void 0 : H.splitAttrs.attributes.value,
					...H.splitAttrs.listeners.value
				}, n);
			},
			getInnerAppend: () => !e.loading && !d.value && !e.hideDropdownIcon ? [_(Gf, {
				class: "q-select__dropdown-icon" + (a.value ? " rotate-180" : ""),
				name: he.value
			})] : null
		}), Hy(H);
	}
}), xx = [
	"text",
	"rect",
	"circle",
	"QBtn",
	"QBadge",
	"QChip",
	"QToolbar",
	"QCheckbox",
	"QRadio",
	"QToggle",
	"QSlider",
	"QRange",
	"QInput",
	"QAvatar"
], Sx = [
	"wave",
	"pulse",
	"pulse-x",
	"pulse-y",
	"fade",
	"blink",
	"none"
];
Q({
	name: "QSkeleton",
	props: {
		...qf,
		tag: {
			type: String,
			default: "div"
		},
		type: {
			type: String,
			validator: (e) => xx.includes(e),
			default: "rect"
		},
		animation: {
			type: String,
			validator: (e) => Sx.includes(e),
			default: "wave"
		},
		animationSpeed: {
			type: [String, Number],
			default: 1500
		},
		square: Boolean,
		bordered: Boolean,
		size: String,
		width: String,
		height: String
	},
	setup(e, { slots: t }) {
		let n = Jf(e, h().proxy.$q), r = o(() => {
			let t = e.size === void 0 ? [e.width, e.height] : [e.size, e.size];
			return {
				"--q-skeleton-speed": `${e.animationSpeed}ms`,
				width: t[0],
				height: t[1]
			};
		}), i = o(() => `q-skeleton q-skeleton--${n.value ? "dark" : "light"} q-skeleton--type-${e.type}` + (e.animation === "none" ? "" : ` q-skeleton--anim q-skeleton--anim-${e.animation}`) + (e.square ? " q-skeleton--square" : "") + (e.bordered ? " q-skeleton--bordered" : ""));
		return () => _(e.tag, {
			class: i.value,
			style: r.value
		}, $(t.default));
	}
});
var Cx = [
	[
		"left",
		"center",
		"start",
		"width"
	],
	[
		"right",
		"center",
		"end",
		"width"
	],
	[
		"top",
		"start",
		"center",
		"height"
	],
	[
		"bottom",
		"end",
		"center",
		"height"
	]
];
Q({
	name: "QSlideItem",
	props: {
		...qf,
		leftColor: String,
		rightColor: String,
		topColor: String,
		bottomColor: String,
		onSlide: Function
	},
	emits: [
		"action",
		"top",
		"right",
		"bottom",
		"left"
	],
	setup(e, { slots: t, emit: n }) {
		let { proxy: r } = h(), { $q: i } = r, a = Jf(e, i), { getCache: s } = Rh(), c = L(null), l = null, u = {}, d = {}, f = {}, p = o(() => i.lang.rtl ? {
			left: "right",
			right: "left"
		} : {
			left: "left",
			right: "right"
		}), m = o(() => "q-slide-item q-item-type overflow-hidden" + (a.value ? " q-slide-item--dark q-dark" : ""));
		function g() {
			c.value.style.transform = "translate(0,0)";
		}
		function v(t, r, i) {
			e.onSlide !== void 0 && n("slide", {
				side: t,
				ratio: r,
				isReset: i
			});
		}
		function y(e) {
			let r = c.value;
			if (e.isFirst) u = {
				dir: null,
				size: {
					left: 0,
					right: 0,
					top: 0,
					bottom: 0
				},
				scale: 0
			}, r.classList.add("no-transition"), Cx.forEach((e) => {
				if (t[e[0]] !== void 0) {
					let t = f[e[0]];
					t.style.transform = "scale(1)", u.size[e[0]] = t.getBoundingClientRect()[e[3]];
				}
			}), u.axis = e.direction === "up" || e.direction === "down" ? "Y" : "X";
			else if (e.isFinal) {
				r.classList.remove("no-transition"), u.scale === 1 ? (r.style.transform = `translate${u.axis}(${u.dir * 100}%)`, l !== null && clearTimeout(l), l = setTimeout(() => {
					l = null, n(u.showing, { reset: g }), n("action", {
						side: u.showing,
						reset: g
					});
				}, 230)) : (r.style.transform = "translate(0,0)", v(u.showing, 0, !0));
				return;
			} else e.direction = u.axis === "X" ? e.offset.x < 0 ? "left" : "right" : e.offset.y < 0 ? "up" : "down";
			if (t.left === void 0 && e.direction === p.value.right || t.right === void 0 && e.direction === p.value.left || t.top === void 0 && e.direction === "down" || t.bottom === void 0 && e.direction === "up") {
				r.style.transform = "translate(0,0)";
				return;
			}
			let i, a, o;
			u.axis === "X" ? (a = e.direction === "left" ? -1 : 1, i = a === 1 ? p.value.left : p.value.right, o = e.distance.x) : (a = e.direction === "up" ? -2 : 2, i = a === 2 ? "top" : "bottom", o = e.distance.y), !(u.dir !== null && Math.abs(a) !== Math.abs(u.dir)) && (u.dir !== a && ([
				"left",
				"right",
				"top",
				"bottom"
			].forEach((e) => {
				d[e] && (d[e].style.visibility = i === e ? "visible" : "hidden");
			}), u.showing = i, u.dir = a), u.scale = Math.max(0, Math.min(1, (o - 40) / u.size[i])), r.style.transform = `translate${u.axis}(${o * a / Math.abs(a)}px)`, f[i].style.transform = `scale(${u.scale})`, v(i, u.scale, !1));
		}
		return O(() => {
			d = {}, f = {};
		}), D(() => {
			l !== null && clearTimeout(l);
		}), Object.assign(r, { reset: g }), () => {
			let n = [], r = {
				left: t[p.value.right] !== void 0,
				right: t[p.value.left] !== void 0,
				up: t.bottom !== void 0,
				down: t.top !== void 0
			}, i = Object.keys(r).filter((e) => r[e]);
			Cx.forEach((r) => {
				let i = r[0];
				t[i] !== void 0 && n.push(_("div", {
					key: i,
					ref: (e) => {
						d[i] = e;
					},
					class: `q-slide-item__${i} absolute-full row no-wrap items-${r[1]} justify-${r[2]}` + (e[i + "Color"] === void 0 ? "" : ` bg-${e[i + "Color"]}`)
				}, [_("div", { ref: (e) => {
					f[i] = e;
				} }, t[i]())]));
			});
			let a = _("div", {
				key: `${i.length === 0 ? "only-" : ""} content`,
				ref: c,
				class: "q-slide-item__content"
			}, $(t.default));
			return i.length === 0 ? n.push(a) : n.push(re(a, s("dir#" + i.join(""), () => {
				let e = {
					prevent: !0,
					stop: !0,
					mouse: !0
				};
				return i.forEach((t) => {
					e[t] = !0;
				}), [[
					gg,
					y,
					void 0,
					e
				]];
			}))), _("div", { class: m.value }, n);
		};
	}
}), Q({
	name: "QSpace",
	setup() {
		let e = _("div", { class: "q-space" });
		return () => e;
	}
});
var wx = "<g transform=\"matrix(1 0 0 -1 0 80)\"><rect width=\"10\" height=\"20\" rx=\"3\"><animate attributeName=\"height\" begin=\"0s\" dur=\"4.3s\" values=\"20;45;57;80;64;32;66;45;64;23;66;13;64;56;34;34;2;23;76;79;20\" calcMode=\"linear\" repeatCount=\"indefinite\"></animate></rect><rect x=\"15\" width=\"10\" height=\"80\" rx=\"3\"><animate attributeName=\"height\" begin=\"0s\" dur=\"2s\" values=\"80;55;33;5;75;23;73;33;12;14;60;80\" calcMode=\"linear\" repeatCount=\"indefinite\"></animate></rect><rect x=\"30\" width=\"10\" height=\"50\" rx=\"3\"><animate attributeName=\"height\" begin=\"0s\" dur=\"1.4s\" values=\"50;34;78;23;56;23;34;76;80;54;21;50\" calcMode=\"linear\" repeatCount=\"indefinite\"></animate></rect><rect x=\"45\" width=\"10\" height=\"30\" rx=\"3\"><animate attributeName=\"height\" begin=\"0s\" dur=\"2s\" values=\"30;45;13;80;56;72;45;76;34;23;67;30\" calcMode=\"linear\" repeatCount=\"indefinite\"></animate></rect></g>";
Q({
	name: "QSpinnerAudio",
	props: mp,
	setup(e) {
		let { cSize: t, classes: n } = hp(e);
		return () => _("svg", {
			class: n.value,
			fill: "currentColor",
			width: t.value,
			height: t.value,
			viewBox: "0 0 55 80",
			xmlns: "http://www.w3.org/2000/svg",
			innerHTML: wx
		});
	}
});
var Tx = "<g transform=\"translate(1 1)\" stroke-width=\"2\" fill=\"none\" fill-rule=\"evenodd\"><circle cx=\"5\" cy=\"50\" r=\"5\"><animate attributeName=\"cy\" begin=\"0s\" dur=\"2.2s\" values=\"50;5;50;50\" calcMode=\"linear\" repeatCount=\"indefinite\"></animate><animate attributeName=\"cx\" begin=\"0s\" dur=\"2.2s\" values=\"5;27;49;5\" calcMode=\"linear\" repeatCount=\"indefinite\"></animate></circle><circle cx=\"27\" cy=\"5\" r=\"5\"><animate attributeName=\"cy\" begin=\"0s\" dur=\"2.2s\" from=\"5\" to=\"5\" values=\"5;50;50;5\" calcMode=\"linear\" repeatCount=\"indefinite\"></animate><animate attributeName=\"cx\" begin=\"0s\" dur=\"2.2s\" from=\"27\" to=\"27\" values=\"27;49;5;27\" calcMode=\"linear\" repeatCount=\"indefinite\"></animate></circle><circle cx=\"49\" cy=\"50\" r=\"5\"><animate attributeName=\"cy\" begin=\"0s\" dur=\"2.2s\" values=\"50;50;5;50\" calcMode=\"linear\" repeatCount=\"indefinite\"></animate><animate attributeName=\"cx\" from=\"49\" to=\"49\" begin=\"0s\" dur=\"2.2s\" values=\"49;5;27;49\" calcMode=\"linear\" repeatCount=\"indefinite\"></animate></circle></g>";
Q({
	name: "QSpinnerBall",
	props: mp,
	setup(e) {
		let { cSize: t, classes: n } = hp(e);
		return () => _("svg", {
			class: n.value,
			stroke: "currentColor",
			width: t.value,
			height: t.value,
			viewBox: "0 0 57 57",
			xmlns: "http://www.w3.org/2000/svg",
			innerHTML: Tx
		});
	}
});
var Ex = "<rect y=\"10\" width=\"15\" height=\"120\" rx=\"6\"><animate attributeName=\"height\" begin=\"0.5s\" dur=\"1s\" values=\"120;110;100;90;80;70;60;50;40;140;120\" calcMode=\"linear\" repeatCount=\"indefinite\"></animate><animate attributeName=\"y\" begin=\"0.5s\" dur=\"1s\" values=\"10;15;20;25;30;35;40;45;50;0;10\" calcMode=\"linear\" repeatCount=\"indefinite\"></animate></rect><rect x=\"30\" y=\"10\" width=\"15\" height=\"120\" rx=\"6\"><animate attributeName=\"height\" begin=\"0.25s\" dur=\"1s\" values=\"120;110;100;90;80;70;60;50;40;140;120\" calcMode=\"linear\" repeatCount=\"indefinite\"></animate><animate attributeName=\"y\" begin=\"0.25s\" dur=\"1s\" values=\"10;15;20;25;30;35;40;45;50;0;10\" calcMode=\"linear\" repeatCount=\"indefinite\"></animate></rect><rect x=\"60\" width=\"15\" height=\"140\" rx=\"6\"><animate attributeName=\"height\" begin=\"0s\" dur=\"1s\" values=\"120;110;100;90;80;70;60;50;40;140;120\" calcMode=\"linear\" repeatCount=\"indefinite\"></animate><animate attributeName=\"y\" begin=\"0s\" dur=\"1s\" values=\"10;15;20;25;30;35;40;45;50;0;10\" calcMode=\"linear\" repeatCount=\"indefinite\"></animate></rect><rect x=\"90\" y=\"10\" width=\"15\" height=\"120\" rx=\"6\"><animate attributeName=\"height\" begin=\"0.25s\" dur=\"1s\" values=\"120;110;100;90;80;70;60;50;40;140;120\" calcMode=\"linear\" repeatCount=\"indefinite\"></animate><animate attributeName=\"y\" begin=\"0.25s\" dur=\"1s\" values=\"10;15;20;25;30;35;40;45;50;0;10\" calcMode=\"linear\" repeatCount=\"indefinite\"></animate></rect><rect x=\"120\" y=\"10\" width=\"15\" height=\"120\" rx=\"6\"><animate attributeName=\"height\" begin=\"0.5s\" dur=\"1s\" values=\"120;110;100;90;80;70;60;50;40;140;120\" calcMode=\"linear\" repeatCount=\"indefinite\"></animate><animate attributeName=\"y\" begin=\"0.5s\" dur=\"1s\" values=\"10;15;20;25;30;35;40;45;50;0;10\" calcMode=\"linear\" repeatCount=\"indefinite\"></animate></rect>";
Q({
	name: "QSpinnerBars",
	props: mp,
	setup(e) {
		let { cSize: t, classes: n } = hp(e);
		return () => _("svg", {
			class: n.value,
			fill: "currentColor",
			width: t.value,
			height: t.value,
			viewBox: "0 0 135 140",
			xmlns: "http://www.w3.org/2000/svg",
			innerHTML: Ex
		});
	}
});
var Dx = "<rect x=\"25\" y=\"25\" width=\"50\" height=\"50\" fill=\"none\" stroke-width=\"4\" stroke=\"currentColor\"><animateTransform id=\"spinnerBox\" attributeName=\"transform\" type=\"rotate\" from=\"0 50 50\" to=\"180 50 50\" dur=\"0.5s\" begin=\"rectBox.end\"></animateTransform></rect><rect x=\"27\" y=\"27\" width=\"46\" height=\"50\" fill=\"currentColor\"><animate id=\"rectBox\" attributeName=\"height\" begin=\"0s;spinnerBox.end\" dur=\"1.3s\" from=\"50\" to=\"0\" fill=\"freeze\"></animate></rect>";
Q({
	name: "QSpinnerBox",
	props: mp,
	setup(e) {
		let { cSize: t, classes: n } = hp(e);
		return () => _("svg", {
			class: n.value,
			width: t.value,
			height: t.value,
			viewBox: "0 0 100 100",
			preserveAspectRatio: "xMidYMid",
			xmlns: "http://www.w3.org/2000/svg",
			innerHTML: Dx
		});
	}
});
var Ox = "<circle cx=\"50\" cy=\"50\" r=\"48\" fill=\"none\" stroke-width=\"4\" stroke-miterlimit=\"10\" stroke=\"currentColor\"></circle><line stroke-linecap=\"round\" stroke-width=\"4\" stroke-miterlimit=\"10\" stroke=\"currentColor\" x1=\"50\" y1=\"50\" x2=\"85\" y2=\"50.5\"><animateTransform attributeName=\"transform\" type=\"rotate\" from=\"0 50 50\" to=\"360 50 50\" dur=\"2s\" repeatCount=\"indefinite\"></animateTransform></line><line stroke-linecap=\"round\" stroke-width=\"4\" stroke-miterlimit=\"10\" stroke=\"currentColor\" x1=\"50\" y1=\"50\" x2=\"49.5\" y2=\"74\"><animateTransform attributeName=\"transform\" type=\"rotate\" from=\"0 50 50\" to=\"360 50 50\" dur=\"15s\" repeatCount=\"indefinite\"></animateTransform></line>";
Q({
	name: "QSpinnerClock",
	props: mp,
	setup(e) {
		let { cSize: t, classes: n } = hp(e);
		return () => _("svg", {
			class: n.value,
			width: t.value,
			height: t.value,
			viewBox: "0 0 100 100",
			preserveAspectRatio: "xMidYMid",
			xmlns: "http://www.w3.org/2000/svg",
			innerHTML: Ox
		});
	}
});
var kx = "<rect x=\"0\" y=\"0\" width=\"100\" height=\"100\" fill=\"none\"></rect><path d=\"M78,19H22c-6.6,0-12,5.4-12,12v31c0,6.6,5.4,12,12,12h37.2c0.4,3,1.8,5.6,3.7,7.6c2.4,2.5,5.1,4.1,9.1,4 c-1.4-2.1-2-7.2-2-10.3c0-0.4,0-0.8,0-1.3h8c6.6,0,12-5.4,12-12V31C90,24.4,84.6,19,78,19z\" fill=\"currentColor\"></path><circle cx=\"30\" cy=\"47\" r=\"5\" fill=\"#fff\"><animate attributeName=\"opacity\" from=\"0\" to=\"1\" values=\"0;1;1\" keyTimes=\"0;0.2;1\" dur=\"1s\" repeatCount=\"indefinite\"></animate></circle><circle cx=\"50\" cy=\"47\" r=\"5\" fill=\"#fff\"><animate attributeName=\"opacity\" from=\"0\" to=\"1\" values=\"0;0;1;1\" keyTimes=\"0;0.2;0.4;1\" dur=\"1s\" repeatCount=\"indefinite\"></animate></circle><circle cx=\"70\" cy=\"47\" r=\"5\" fill=\"#fff\"><animate attributeName=\"opacity\" from=\"0\" to=\"1\" values=\"0;0;1;1\" keyTimes=\"0;0.4;0.6;1\" dur=\"1s\" repeatCount=\"indefinite\"></animate></circle>";
Q({
	name: "QSpinnerComment",
	props: mp,
	setup(e) {
		let { cSize: t, classes: n } = hp(e);
		return () => _("svg", {
			class: n.value,
			width: t.value,
			height: t.value,
			xmlns: "http://www.w3.org/2000/svg",
			viewBox: "0 0 100 100",
			preserveAspectRatio: "xMidYMid",
			innerHTML: kx
		});
	}
});
var Ax = "<rect x=\"0\" y=\"0\" width=\"100\" height=\"100\" fill=\"none\"></rect><g transform=\"translate(25 25)\"><rect x=\"-20\" y=\"-20\" width=\"40\" height=\"40\" fill=\"currentColor\" opacity=\"0.9\"><animateTransform attributeName=\"transform\" type=\"scale\" from=\"1.5\" to=\"1\" repeatCount=\"indefinite\" begin=\"0s\" dur=\"1s\" calcMode=\"spline\" keySplines=\"0.2 0.8 0.2 0.8\" keyTimes=\"0;1\"></animateTransform></rect></g><g transform=\"translate(75 25)\"><rect x=\"-20\" y=\"-20\" width=\"40\" height=\"40\" fill=\"currentColor\" opacity=\"0.8\"><animateTransform attributeName=\"transform\" type=\"scale\" from=\"1.5\" to=\"1\" repeatCount=\"indefinite\" begin=\"0.1s\" dur=\"1s\" calcMode=\"spline\" keySplines=\"0.2 0.8 0.2 0.8\" keyTimes=\"0;1\"></animateTransform></rect></g><g transform=\"translate(25 75)\"><rect x=\"-20\" y=\"-20\" width=\"40\" height=\"40\" fill=\"currentColor\" opacity=\"0.7\"><animateTransform attributeName=\"transform\" type=\"scale\" from=\"1.5\" to=\"1\" repeatCount=\"indefinite\" begin=\"0.3s\" dur=\"1s\" calcMode=\"spline\" keySplines=\"0.2 0.8 0.2 0.8\" keyTimes=\"0;1\"></animateTransform></rect></g><g transform=\"translate(75 75)\"><rect x=\"-20\" y=\"-20\" width=\"40\" height=\"40\" fill=\"currentColor\" opacity=\"0.6\"><animateTransform attributeName=\"transform\" type=\"scale\" from=\"1.5\" to=\"1\" repeatCount=\"indefinite\" begin=\"0.2s\" dur=\"1s\" calcMode=\"spline\" keySplines=\"0.2 0.8 0.2 0.8\" keyTimes=\"0;1\"></animateTransform></rect></g>";
Q({
	name: "QSpinnerCube",
	props: mp,
	setup(e) {
		let { cSize: t, classes: n } = hp(e);
		return () => _("svg", {
			class: n.value,
			width: t.value,
			height: t.value,
			xmlns: "http://www.w3.org/2000/svg",
			viewBox: "0 0 100 100",
			preserveAspectRatio: "xMidYMid",
			innerHTML: Ax
		});
	}
});
var jx = "<circle cx=\"15\" cy=\"15\" r=\"15\"><animate attributeName=\"r\" from=\"15\" to=\"15\" begin=\"0s\" dur=\"0.8s\" values=\"15;9;15\" calcMode=\"linear\" repeatCount=\"indefinite\"></animate><animate attributeName=\"fill-opacity\" from=\"1\" to=\"1\" begin=\"0s\" dur=\"0.8s\" values=\"1;.5;1\" calcMode=\"linear\" repeatCount=\"indefinite\"></animate></circle><circle cx=\"60\" cy=\"15\" r=\"9\" fill-opacity=\".3\"><animate attributeName=\"r\" from=\"9\" to=\"9\" begin=\"0s\" dur=\"0.8s\" values=\"9;15;9\" calcMode=\"linear\" repeatCount=\"indefinite\"></animate><animate attributeName=\"fill-opacity\" from=\".5\" to=\".5\" begin=\"0s\" dur=\"0.8s\" values=\".5;1;.5\" calcMode=\"linear\" repeatCount=\"indefinite\"></animate></circle><circle cx=\"105\" cy=\"15\" r=\"15\"><animate attributeName=\"r\" from=\"15\" to=\"15\" begin=\"0s\" dur=\"0.8s\" values=\"15;9;15\" calcMode=\"linear\" repeatCount=\"indefinite\"></animate><animate attributeName=\"fill-opacity\" from=\"1\" to=\"1\" begin=\"0s\" dur=\"0.8s\" values=\"1;.5;1\" calcMode=\"linear\" repeatCount=\"indefinite\"></animate></circle>";
Q({
	name: "QSpinnerDots",
	props: mp,
	setup(e) {
		let { cSize: t, classes: n } = hp(e);
		return () => _("svg", {
			class: n.value,
			fill: "currentColor",
			width: t.value,
			height: t.value,
			viewBox: "0 0 120 30",
			xmlns: "http://www.w3.org/2000/svg",
			innerHTML: jx
		});
	}
});
var Mx = "<g transform=\"translate(20 50)\"><rect x=\"-10\" y=\"-30\" width=\"20\" height=\"60\" fill=\"currentColor\" opacity=\"0.6\"><animateTransform attributeName=\"transform\" type=\"scale\" from=\"2\" to=\"1\" begin=\"0s\" repeatCount=\"indefinite\" dur=\"1s\" calcMode=\"spline\" keySplines=\"0.1 0.9 0.4 1\" keyTimes=\"0;1\" values=\"2;1\"></animateTransform></rect></g><g transform=\"translate(50 50)\"><rect x=\"-10\" y=\"-30\" width=\"20\" height=\"60\" fill=\"currentColor\" opacity=\"0.8\"><animateTransform attributeName=\"transform\" type=\"scale\" from=\"2\" to=\"1\" begin=\"0.1s\" repeatCount=\"indefinite\" dur=\"1s\" calcMode=\"spline\" keySplines=\"0.1 0.9 0.4 1\" keyTimes=\"0;1\" values=\"2;1\"></animateTransform></rect></g><g transform=\"translate(80 50)\"><rect x=\"-10\" y=\"-30\" width=\"20\" height=\"60\" fill=\"currentColor\" opacity=\"0.9\"><animateTransform attributeName=\"transform\" type=\"scale\" from=\"2\" to=\"1\" begin=\"0.2s\" repeatCount=\"indefinite\" dur=\"1s\" calcMode=\"spline\" keySplines=\"0.1 0.9 0.4 1\" keyTimes=\"0;1\" values=\"2;1\"></animateTransform></rect></g>";
Q({
	name: "QSpinnerFacebook",
	props: mp,
	setup(e) {
		let { cSize: t, classes: n } = hp(e);
		return () => _("svg", {
			class: n.value,
			width: t.value,
			height: t.value,
			viewBox: "0 0 100 100",
			xmlns: "http://www.w3.org/2000/svg",
			preserveAspectRatio: "xMidYMid",
			innerHTML: Mx
		});
	}
});
var Nx = "<g transform=\"translate(-20,-20)\"><path d=\"M79.9,52.6C80,51.8,80,50.9,80,50s0-1.8-0.1-2.6l-5.1-0.4c-0.3-2.4-0.9-4.6-1.8-6.7l4.2-2.9c-0.7-1.6-1.6-3.1-2.6-4.5 L70,35c-1.4-1.9-3.1-3.5-4.9-4.9l2.2-4.6c-1.4-1-2.9-1.9-4.5-2.6L59.8,27c-2.1-0.9-4.4-1.5-6.7-1.8l-0.4-5.1C51.8,20,50.9,20,50,20 s-1.8,0-2.6,0.1l-0.4,5.1c-2.4,0.3-4.6,0.9-6.7,1.8l-2.9-4.1c-1.6,0.7-3.1,1.6-4.5,2.6l2.1,4.6c-1.9,1.4-3.5,3.1-5,4.9l-4.5-2.1 c-1,1.4-1.9,2.9-2.6,4.5l4.1,2.9c-0.9,2.1-1.5,4.4-1.8,6.8l-5,0.4C20,48.2,20,49.1,20,50s0,1.8,0.1,2.6l5,0.4 c0.3,2.4,0.9,4.7,1.8,6.8l-4.1,2.9c0.7,1.6,1.6,3.1,2.6,4.5l4.5-2.1c1.4,1.9,3.1,3.5,5,4.9l-2.1,4.6c1.4,1,2.9,1.9,4.5,2.6l2.9-4.1 c2.1,0.9,4.4,1.5,6.7,1.8l0.4,5.1C48.2,80,49.1,80,50,80s1.8,0,2.6-0.1l0.4-5.1c2.3-0.3,4.6-0.9,6.7-1.8l2.9,4.2 c1.6-0.7,3.1-1.6,4.5-2.6L65,69.9c1.9-1.4,3.5-3,4.9-4.9l4.6,2.2c1-1.4,1.9-2.9,2.6-4.5L73,59.8c0.9-2.1,1.5-4.4,1.8-6.7L79.9,52.6 z M50,65c-8.3,0-15-6.7-15-15c0-8.3,6.7-15,15-15s15,6.7,15,15C65,58.3,58.3,65,50,65z\" fill=\"currentColor\"><animateTransform attributeName=\"transform\" type=\"rotate\" from=\"90 50 50\" to=\"0 50 50\" dur=\"1s\" repeatCount=\"indefinite\"></animateTransform></path></g><g transform=\"translate(20,20) rotate(15 50 50)\"><path d=\"M79.9,52.6C80,51.8,80,50.9,80,50s0-1.8-0.1-2.6l-5.1-0.4c-0.3-2.4-0.9-4.6-1.8-6.7l4.2-2.9c-0.7-1.6-1.6-3.1-2.6-4.5 L70,35c-1.4-1.9-3.1-3.5-4.9-4.9l2.2-4.6c-1.4-1-2.9-1.9-4.5-2.6L59.8,27c-2.1-0.9-4.4-1.5-6.7-1.8l-0.4-5.1C51.8,20,50.9,20,50,20 s-1.8,0-2.6,0.1l-0.4,5.1c-2.4,0.3-4.6,0.9-6.7,1.8l-2.9-4.1c-1.6,0.7-3.1,1.6-4.5,2.6l2.1,4.6c-1.9,1.4-3.5,3.1-5,4.9l-4.5-2.1 c-1,1.4-1.9,2.9-2.6,4.5l4.1,2.9c-0.9,2.1-1.5,4.4-1.8,6.8l-5,0.4C20,48.2,20,49.1,20,50s0,1.8,0.1,2.6l5,0.4 c0.3,2.4,0.9,4.7,1.8,6.8l-4.1,2.9c0.7,1.6,1.6,3.1,2.6,4.5l4.5-2.1c1.4,1.9,3.1,3.5,5,4.9l-2.1,4.6c1.4,1,2.9,1.9,4.5,2.6l2.9-4.1 c2.1,0.9,4.4,1.5,6.7,1.8l0.4,5.1C48.2,80,49.1,80,50,80s1.8,0,2.6-0.1l0.4-5.1c2.3-0.3,4.6-0.9,6.7-1.8l2.9,4.2 c1.6-0.7,3.1-1.6,4.5-2.6L65,69.9c1.9-1.4,3.5-3,4.9-4.9l4.6,2.2c1-1.4,1.9-2.9,2.6-4.5L73,59.8c0.9-2.1,1.5-4.4,1.8-6.7L79.9,52.6 z M50,65c-8.3,0-15-6.7-15-15c0-8.3,6.7-15,15-15s15,6.7,15,15C65,58.3,58.3,65,50,65z\" fill=\"currentColor\"><animateTransform attributeName=\"transform\" type=\"rotate\" from=\"0 50 50\" to=\"90 50 50\" dur=\"1s\" repeatCount=\"indefinite\"></animateTransform></path></g>";
Q({
	name: "QSpinnerGears",
	props: mp,
	setup(e) {
		let { cSize: t, classes: n } = hp(e);
		return () => _("svg", {
			class: n.value,
			width: t.value,
			height: t.value,
			viewBox: "0 0 100 100",
			preserveAspectRatio: "xMidYMid",
			xmlns: "http://www.w3.org/2000/svg",
			innerHTML: Nx
		});
	}
});
var Px = "<circle cx=\"12.5\" cy=\"12.5\" r=\"12.5\"><animate attributeName=\"fill-opacity\" begin=\"0s\" dur=\"1s\" values=\"1;.2;1\" calcMode=\"linear\" repeatCount=\"indefinite\"></animate></circle><circle cx=\"12.5\" cy=\"52.5\" r=\"12.5\" fill-opacity=\".5\"><animate attributeName=\"fill-opacity\" begin=\"100ms\" dur=\"1s\" values=\"1;.2;1\" calcMode=\"linear\" repeatCount=\"indefinite\"></animate></circle><circle cx=\"52.5\" cy=\"12.5\" r=\"12.5\"><animate attributeName=\"fill-opacity\" begin=\"300ms\" dur=\"1s\" values=\"1;.2;1\" calcMode=\"linear\" repeatCount=\"indefinite\"></animate></circle><circle cx=\"52.5\" cy=\"52.5\" r=\"12.5\"><animate attributeName=\"fill-opacity\" begin=\"600ms\" dur=\"1s\" values=\"1;.2;1\" calcMode=\"linear\" repeatCount=\"indefinite\"></animate></circle><circle cx=\"92.5\" cy=\"12.5\" r=\"12.5\"><animate attributeName=\"fill-opacity\" begin=\"800ms\" dur=\"1s\" values=\"1;.2;1\" calcMode=\"linear\" repeatCount=\"indefinite\"></animate></circle><circle cx=\"92.5\" cy=\"52.5\" r=\"12.5\"><animate attributeName=\"fill-opacity\" begin=\"400ms\" dur=\"1s\" values=\"1;.2;1\" calcMode=\"linear\" repeatCount=\"indefinite\"></animate></circle><circle cx=\"12.5\" cy=\"92.5\" r=\"12.5\"><animate attributeName=\"fill-opacity\" begin=\"700ms\" dur=\"1s\" values=\"1;.2;1\" calcMode=\"linear\" repeatCount=\"indefinite\"></animate></circle><circle cx=\"52.5\" cy=\"92.5\" r=\"12.5\"><animate attributeName=\"fill-opacity\" begin=\"500ms\" dur=\"1s\" values=\"1;.2;1\" calcMode=\"linear\" repeatCount=\"indefinite\"></animate></circle><circle cx=\"92.5\" cy=\"92.5\" r=\"12.5\"><animate attributeName=\"fill-opacity\" begin=\"200ms\" dur=\"1s\" values=\"1;.2;1\" calcMode=\"linear\" repeatCount=\"indefinite\"></animate></circle>";
Q({
	name: "QSpinnerGrid",
	props: mp,
	setup(e) {
		let { cSize: t, classes: n } = hp(e);
		return () => _("svg", {
			class: n.value,
			fill: "currentColor",
			width: t.value,
			height: t.value,
			viewBox: "0 0 105 105",
			xmlns: "http://www.w3.org/2000/svg",
			innerHTML: Px
		});
	}
});
var Fx = "<path d=\"M30.262 57.02L7.195 40.723c-5.84-3.976-7.56-12.06-3.842-18.063 3.715-6 11.467-7.65 17.306-3.68l4.52 3.76 2.6-5.274c3.716-6.002 11.47-7.65 17.304-3.68 5.84 3.97 7.56 12.054 3.842 18.062L34.49 56.118c-.897 1.512-2.793 1.915-4.228.9z\" fill-opacity=\".5\"><animate attributeName=\"fill-opacity\" begin=\"0s\" dur=\"1.4s\" values=\"0.5;1;0.5\" calcMode=\"linear\" repeatCount=\"indefinite\"></animate></path><path d=\"M105.512 56.12l-14.44-24.272c-3.716-6.008-1.996-14.093 3.843-18.062 5.835-3.97 13.588-2.322 17.306 3.68l2.6 5.274 4.52-3.76c5.84-3.97 13.593-2.32 17.308 3.68 3.718 6.003 1.998 14.088-3.842 18.064L109.74 57.02c-1.434 1.014-3.33.61-4.228-.9z\" fill-opacity=\".5\"><animate attributeName=\"fill-opacity\" begin=\"0.7s\" dur=\"1.4s\" values=\"0.5;1;0.5\" calcMode=\"linear\" repeatCount=\"indefinite\"></animate></path><path d=\"M67.408 57.834l-23.01-24.98c-5.864-6.15-5.864-16.108 0-22.248 5.86-6.14 15.37-6.14 21.234 0L70 16.168l4.368-5.562c5.863-6.14 15.375-6.14 21.235 0 5.863 6.14 5.863 16.098 0 22.247l-23.007 24.98c-1.43 1.556-3.757 1.556-5.188 0z\"></path>";
Q({
	name: "QSpinnerHearts",
	props: mp,
	setup(e) {
		let { cSize: t, classes: n } = hp(e);
		return () => _("svg", {
			class: n.value,
			fill: "currentColor",
			width: t.value,
			height: t.value,
			viewBox: "0 0 140 64",
			xmlns: "http://www.w3.org/2000/svg",
			innerHTML: Fx
		});
	}
});
var Ix = "<g><path fill=\"none\" stroke=\"currentColor\" stroke-width=\"5\" stroke-miterlimit=\"10\" d=\"M58.4,51.7c-0.9-0.9-1.4-2-1.4-2.3s0.5-0.4,1.4-1.4 C70.8,43.8,79.8,30.5,80,15.5H70H30H20c0.2,15,9.2,28.1,21.6,32.3c0.9,0.9,1.4,1.2,1.4,1.5s-0.5,1.6-1.4,2.5 C29.2,56.1,20.2,69.5,20,85.5h10h40h10C79.8,69.5,70.8,55.9,58.4,51.7z\"></path><clipPath id=\"uil-hourglass-clip1\"><rect x=\"15\" y=\"20\" width=\"70\" height=\"25\"><animate attributeName=\"height\" from=\"25\" to=\"0\" dur=\"1s\" repeatCount=\"indefinite\" values=\"25;0;0\" keyTimes=\"0;0.5;1\"></animate><animate attributeName=\"y\" from=\"20\" to=\"45\" dur=\"1s\" repeatCount=\"indefinite\" values=\"20;45;45\" keyTimes=\"0;0.5;1\"></animate></rect></clipPath><clipPath id=\"uil-hourglass-clip2\"><rect x=\"15\" y=\"55\" width=\"70\" height=\"25\"><animate attributeName=\"height\" from=\"0\" to=\"25\" dur=\"1s\" repeatCount=\"indefinite\" values=\"0;25;25\" keyTimes=\"0;0.5;1\"></animate><animate attributeName=\"y\" from=\"80\" to=\"55\" dur=\"1s\" repeatCount=\"indefinite\" values=\"80;55;55\" keyTimes=\"0;0.5;1\"></animate></rect></clipPath><path d=\"M29,23c3.1,11.4,11.3,19.5,21,19.5S67.9,34.4,71,23H29z\" clip-path=\"url(#uil-hourglass-clip1)\" fill=\"currentColor\"></path><path d=\"M71.6,78c-3-11.6-11.5-20-21.5-20s-18.5,8.4-21.5,20H71.6z\" clip-path=\"url(#uil-hourglass-clip2)\" fill=\"currentColor\"></path><animateTransform attributeName=\"transform\" type=\"rotate\" from=\"0 50 50\" to=\"180 50 50\" repeatCount=\"indefinite\" dur=\"1s\" values=\"0 50 50;0 50 50;180 50 50\" keyTimes=\"0;0.7;1\"></animateTransform></g>";
Q({
	name: "QSpinnerHourglass",
	props: mp,
	setup(e) {
		let { cSize: t, classes: n } = hp(e);
		return () => _("svg", {
			class: n.value,
			width: t.value,
			height: t.value,
			viewBox: "0 0 100 100",
			preserveAspectRatio: "xMidYMid",
			xmlns: "http://www.w3.org/2000/svg",
			innerHTML: Ix
		});
	}
});
var Lx = "<path d=\"M24.3,30C11.4,30,5,43.3,5,50s6.4,20,19.3,20c19.3,0,32.1-40,51.4-40C88.6,30,95,43.3,95,50s-6.4,20-19.3,20C56.4,70,43.6,30,24.3,30z\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"8\" stroke-dasharray=\"10.691205342610678 10.691205342610678\" stroke-dashoffset=\"0\"><animate attributeName=\"stroke-dashoffset\" from=\"0\" to=\"21.382410685221355\" begin=\"0\" dur=\"2s\" repeatCount=\"indefinite\" fill=\"freeze\"></animate></path>";
Q({
	name: "QSpinnerInfinity",
	props: mp,
	setup(e) {
		let { cSize: t, classes: n } = hp(e);
		return () => _("svg", {
			class: n.value,
			width: t.value,
			height: t.value,
			viewBox: "0 0 100 100",
			preserveAspectRatio: "xMidYMid",
			innerHTML: Lx
		});
	}
});
var Rx = "<g stroke-width=\"4\" stroke-linecap=\"round\"><line y1=\"17\" y2=\"29\" transform=\"translate(32,32) rotate(180)\"><animate attributeName=\"stroke-opacity\" dur=\"750ms\" values=\"1;.85;.7;.65;.55;.45;.35;.25;.15;.1;0;1\" repeatCount=\"indefinite\"></animate></line><line y1=\"17\" y2=\"29\" transform=\"translate(32,32) rotate(210)\"><animate attributeName=\"stroke-opacity\" dur=\"750ms\" values=\"0;1;.85;.7;.65;.55;.45;.35;.25;.15;.1;0\" repeatCount=\"indefinite\"></animate></line><line y1=\"17\" y2=\"29\" transform=\"translate(32,32) rotate(240)\"><animate attributeName=\"stroke-opacity\" dur=\"750ms\" values=\".1;0;1;.85;.7;.65;.55;.45;.35;.25;.15;.1\" repeatCount=\"indefinite\"></animate></line><line y1=\"17\" y2=\"29\" transform=\"translate(32,32) rotate(270)\"><animate attributeName=\"stroke-opacity\" dur=\"750ms\" values=\".15;.1;0;1;.85;.7;.65;.55;.45;.35;.25;.15\" repeatCount=\"indefinite\"></animate></line><line y1=\"17\" y2=\"29\" transform=\"translate(32,32) rotate(300)\"><animate attributeName=\"stroke-opacity\" dur=\"750ms\" values=\".25;.15;.1;0;1;.85;.7;.65;.55;.45;.35;.25\" repeatCount=\"indefinite\"></animate></line><line y1=\"17\" y2=\"29\" transform=\"translate(32,32) rotate(330)\"><animate attributeName=\"stroke-opacity\" dur=\"750ms\" values=\".35;.25;.15;.1;0;1;.85;.7;.65;.55;.45;.35\" repeatCount=\"indefinite\"></animate></line><line y1=\"17\" y2=\"29\" transform=\"translate(32,32) rotate(0)\"><animate attributeName=\"stroke-opacity\" dur=\"750ms\" values=\".45;.35;.25;.15;.1;0;1;.85;.7;.65;.55;.45\" repeatCount=\"indefinite\"></animate></line><line y1=\"17\" y2=\"29\" transform=\"translate(32,32) rotate(30)\"><animate attributeName=\"stroke-opacity\" dur=\"750ms\" values=\".55;.45;.35;.25;.15;.1;0;1;.85;.7;.65;.55\" repeatCount=\"indefinite\"></animate></line><line y1=\"17\" y2=\"29\" transform=\"translate(32,32) rotate(60)\"><animate attributeName=\"stroke-opacity\" dur=\"750ms\" values=\".65;.55;.45;.35;.25;.15;.1;0;1;.85;.7;.65\" repeatCount=\"indefinite\"></animate></line><line y1=\"17\" y2=\"29\" transform=\"translate(32,32) rotate(90)\"><animate attributeName=\"stroke-opacity\" dur=\"750ms\" values=\".7;.65;.55;.45;.35;.25;.15;.1;0;1;.85;.7\" repeatCount=\"indefinite\"></animate></line><line y1=\"17\" y2=\"29\" transform=\"translate(32,32) rotate(120)\"><animate attributeName=\"stroke-opacity\" dur=\"750ms\" values=\".85;.7;.65;.55;.45;.35;.25;.15;.1;0;1;.85\" repeatCount=\"indefinite\"></animate></line><line y1=\"17\" y2=\"29\" transform=\"translate(32,32) rotate(150)\"><animate attributeName=\"stroke-opacity\" dur=\"750ms\" values=\"1;.85;.7;.65;.55;.45;.35;.25;.15;.1;0;1\" repeatCount=\"indefinite\"></animate></line></g>";
Q({
	name: "QSpinnerIos",
	props: mp,
	setup(e) {
		let { cSize: t, classes: n } = hp(e);
		return () => _("svg", {
			class: n.value,
			width: t.value,
			height: t.value,
			stroke: "currentColor",
			fill: "currentColor",
			viewBox: "0 0 64 64",
			innerHTML: Rx
		});
	}
});
var zx = "<circle cx=\"50\" cy=\"50\" r=\"44\" fill=\"none\" stroke-width=\"4\" stroke-opacity=\".5\" stroke=\"currentColor\"></circle><circle cx=\"8\" cy=\"54\" r=\"6\" fill=\"currentColor\" stroke-width=\"3\" stroke=\"currentColor\"><animateTransform attributeName=\"transform\" type=\"rotate\" from=\"0 50 48\" to=\"360 50 52\" dur=\"2s\" repeatCount=\"indefinite\"></animateTransform></circle>";
Q({
	name: "QSpinnerOrbit",
	props: mp,
	setup(e) {
		let { cSize: t, classes: n } = hp(e);
		return () => _("svg", {
			class: n.value,
			width: t.value,
			height: t.value,
			viewBox: "0 0 100 100",
			preserveAspectRatio: "xMidYMid",
			xmlns: "http://www.w3.org/2000/svg",
			innerHTML: zx
		});
	}
});
var Bx = "<g transform=\"translate(1 1)\" stroke-width=\"2\" fill=\"none\" fill-rule=\"evenodd\"><circle stroke-opacity=\".5\" cx=\"18\" cy=\"18\" r=\"18\"></circle><path d=\"M36 18c0-9.94-8.06-18-18-18\"><animateTransform attributeName=\"transform\" type=\"rotate\" from=\"0 18 18\" to=\"360 18 18\" dur=\"1s\" repeatCount=\"indefinite\"></animateTransform></path></g>";
Q({
	name: "QSpinnerOval",
	props: mp,
	setup(e) {
		let { cSize: t, classes: n } = hp(e);
		return () => _("svg", {
			class: n.value,
			stroke: "currentColor",
			width: t.value,
			height: t.value,
			viewBox: "0 0 38 38",
			xmlns: "http://www.w3.org/2000/svg",
			innerHTML: Bx
		});
	}
});
var Vx = "<path d=\"M0 50A50 50 0 0 1 50 0L50 50L0 50\" fill=\"currentColor\" opacity=\"0.5\"><animateTransform attributeName=\"transform\" type=\"rotate\" from=\"0 50 50\" to=\"360 50 50\" dur=\"0.8s\" repeatCount=\"indefinite\"></animateTransform></path><path d=\"M50 0A50 50 0 0 1 100 50L50 50L50 0\" fill=\"currentColor\" opacity=\"0.5\"><animateTransform attributeName=\"transform\" type=\"rotate\" from=\"0 50 50\" to=\"360 50 50\" dur=\"1.6s\" repeatCount=\"indefinite\"></animateTransform></path><path d=\"M100 50A50 50 0 0 1 50 100L50 50L100 50\" fill=\"currentColor\" opacity=\"0.5\"><animateTransform attributeName=\"transform\" type=\"rotate\" from=\"0 50 50\" to=\"360 50 50\" dur=\"2.4s\" repeatCount=\"indefinite\"></animateTransform></path><path d=\"M50 100A50 50 0 0 1 0 50L50 50L50 100\" fill=\"currentColor\" opacity=\"0.5\"><animateTransform attributeName=\"transform\" type=\"rotate\" from=\"0 50 50\" to=\"360 50 50\" dur=\"3.2s\" repeatCount=\"indefinite\"></animateTransform></path>";
Q({
	name: "QSpinnerPie",
	props: mp,
	setup(e) {
		let { cSize: t, classes: n } = hp(e);
		return () => _("svg", {
			class: n.value,
			width: t.value,
			height: t.value,
			viewBox: "0 0 100 100",
			preserveAspectRatio: "xMidYMid",
			xmlns: "http://www.w3.org/2000/svg",
			innerHTML: Vx
		});
	}
});
var Hx = "<g fill=\"none\" fill-rule=\"evenodd\" stroke-width=\"2\"><circle cx=\"22\" cy=\"22\" r=\"1\"><animate attributeName=\"r\" begin=\"0s\" dur=\"1.8s\" values=\"1; 20\" calcMode=\"spline\" keyTimes=\"0; 1\" keySplines=\"0.165, 0.84, 0.44, 1\" repeatCount=\"indefinite\"></animate><animate attributeName=\"stroke-opacity\" begin=\"0s\" dur=\"1.8s\" values=\"1; 0\" calcMode=\"spline\" keyTimes=\"0; 1\" keySplines=\"0.3, 0.61, 0.355, 1\" repeatCount=\"indefinite\"></animate></circle><circle cx=\"22\" cy=\"22\" r=\"1\"><animate attributeName=\"r\" begin=\"-0.9s\" dur=\"1.8s\" values=\"1; 20\" calcMode=\"spline\" keyTimes=\"0; 1\" keySplines=\"0.165, 0.84, 0.44, 1\" repeatCount=\"indefinite\"></animate><animate attributeName=\"stroke-opacity\" begin=\"-0.9s\" dur=\"1.8s\" values=\"1; 0\" calcMode=\"spline\" keyTimes=\"0; 1\" keySplines=\"0.3, 0.61, 0.355, 1\" repeatCount=\"indefinite\"></animate></circle></g>";
Q({
	name: "QSpinnerPuff",
	props: mp,
	setup(e) {
		let { cSize: t, classes: n } = hp(e);
		return () => _("svg", {
			class: n.value,
			stroke: "currentColor",
			width: t.value,
			height: t.value,
			viewBox: "0 0 44 44",
			xmlns: "http://www.w3.org/2000/svg",
			innerHTML: Hx
		});
	}
});
var Ux = "<g transform=\"scale(0.55)\"><circle cx=\"30\" cy=\"150\" r=\"30\" fill=\"currentColor\"><animate attributeName=\"opacity\" from=\"0\" to=\"1\" dur=\"1s\" begin=\"0\" repeatCount=\"indefinite\" keyTimes=\"0;0.5;1\" values=\"0;1;1\"></animate></circle><path d=\"M90,150h30c0-49.7-40.3-90-90-90v30C63.1,90,90,116.9,90,150z\" fill=\"currentColor\"><animate attributeName=\"opacity\" from=\"0\" to=\"1\" dur=\"1s\" begin=\"0.1\" repeatCount=\"indefinite\" keyTimes=\"0;0.5;1\" values=\"0;1;1\"></animate></path><path d=\"M150,150h30C180,67.2,112.8,0,30,0v30C96.3,30,150,83.7,150,150z\" fill=\"currentColor\"><animate attributeName=\"opacity\" from=\"0\" to=\"1\" dur=\"1s\" begin=\"0.2\" repeatCount=\"indefinite\" keyTimes=\"0;0.5;1\" values=\"0;1;1\"></animate></path></g>";
Q({
	name: "QSpinnerRadio",
	props: mp,
	setup(e) {
		let { cSize: t, classes: n } = hp(e);
		return () => _("svg", {
			class: n.value,
			width: t.value,
			height: t.value,
			viewBox: "0 0 100 100",
			preserveAspectRatio: "xMidYMid",
			xmlns: "http://www.w3.org/2000/svg",
			innerHTML: Ux
		});
	}
});
var Wx = "<g fill=\"none\" fill-rule=\"evenodd\" transform=\"translate(1 1)\" stroke-width=\"2\"><circle cx=\"22\" cy=\"22\" r=\"6\"><animate attributeName=\"r\" begin=\"1.5s\" dur=\"3s\" values=\"6;22\" calcMode=\"linear\" repeatCount=\"indefinite\"></animate><animate attributeName=\"stroke-opacity\" begin=\"1.5s\" dur=\"3s\" values=\"1;0\" calcMode=\"linear\" repeatCount=\"indefinite\"></animate><animate attributeName=\"stroke-width\" begin=\"1.5s\" dur=\"3s\" values=\"2;0\" calcMode=\"linear\" repeatCount=\"indefinite\"></animate></circle><circle cx=\"22\" cy=\"22\" r=\"6\"><animate attributeName=\"r\" begin=\"3s\" dur=\"3s\" values=\"6;22\" calcMode=\"linear\" repeatCount=\"indefinite\"></animate><animate attributeName=\"stroke-opacity\" begin=\"3s\" dur=\"3s\" values=\"1;0\" calcMode=\"linear\" repeatCount=\"indefinite\"></animate><animate attributeName=\"stroke-width\" begin=\"3s\" dur=\"3s\" values=\"2;0\" calcMode=\"linear\" repeatCount=\"indefinite\"></animate></circle><circle cx=\"22\" cy=\"22\" r=\"8\"><animate attributeName=\"r\" begin=\"0s\" dur=\"1.5s\" values=\"6;1;2;3;4;5;6\" calcMode=\"linear\" repeatCount=\"indefinite\"></animate></circle></g>";
Q({
	name: "QSpinnerRings",
	props: mp,
	setup(e) {
		let { cSize: t, classes: n } = hp(e);
		return () => _("svg", {
			class: n.value,
			stroke: "currentColor",
			width: t.value,
			height: t.value,
			viewBox: "0 0 45 45",
			xmlns: "http://www.w3.org/2000/svg",
			innerHTML: Wx
		});
	}
});
var Gx = "<defs><linearGradient x1=\"8.042%\" y1=\"0%\" x2=\"65.682%\" y2=\"23.865%\" id=\"a\"><stop stop-color=\"currentColor\" stop-opacity=\"0\" offset=\"0%\"></stop><stop stop-color=\"currentColor\" stop-opacity=\".631\" offset=\"63.146%\"></stop><stop stop-color=\"currentColor\" offset=\"100%\"></stop></linearGradient></defs><g transform=\"translate(1 1)\" fill=\"none\" fill-rule=\"evenodd\"><path d=\"M36 18c0-9.94-8.06-18-18-18\" stroke=\"url(#a)\" stroke-width=\"2\"><animateTransform attributeName=\"transform\" type=\"rotate\" from=\"0 18 18\" to=\"360 18 18\" dur=\"0.9s\" repeatCount=\"indefinite\"></animateTransform></path><circle fill=\"currentColor\" cx=\"36\" cy=\"18\" r=\"1\"><animateTransform attributeName=\"transform\" type=\"rotate\" from=\"0 18 18\" to=\"360 18 18\" dur=\"0.9s\" repeatCount=\"indefinite\"></animateTransform></circle></g>";
Q({
	name: "QSpinnerTail",
	props: mp,
	setup(e) {
		let { cSize: t, classes: n } = hp(e);
		return () => _("svg", {
			class: n.value,
			width: t.value,
			height: t.value,
			viewBox: "0 0 38 38",
			xmlns: "http://www.w3.org/2000/svg",
			innerHTML: Gx
		});
	}
}), Q({
	name: "QSplitter",
	props: {
		...qf,
		modelValue: {
			type: Number,
			required: !0
		},
		reverse: Boolean,
		unit: {
			type: String,
			default: "%",
			validator: (e) => ["%", "px"].includes(e)
		},
		limits: {
			type: Array,
			validator: (e) => e.length !== 2 || typeof e[0] != "number" || typeof e[1] != "number" ? !1 : e[0] >= 0 && e[0] <= e[1]
		},
		emitImmediately: Boolean,
		horizontal: Boolean,
		disable: Boolean,
		beforeClass: [
			Array,
			String,
			Object
		],
		afterClass: [
			Array,
			String,
			Object
		],
		separatorClass: [
			Array,
			String,
			Object
		],
		separatorStyle: [
			Array,
			String,
			Object
		]
	},
	emits: ["update:modelValue"],
	setup(e, { slots: t, emit: n }) {
		let { proxy: { $q: r } } = h(), i = Jf(e, r), a = L(null), s = {
			before: L(null),
			after: L(null)
		}, c = o(() => `q-splitter no-wrap ${e.horizontal ? "q-splitter--horizontal column" : "q-splitter--vertical row"} q-splitter--${e.disable ? "disabled" : "workable"}` + (i.value ? " q-splitter--dark" : "")), l = o(() => e.horizontal ? "height" : "width"), u = o(() => e.reverse ? "after" : "before"), d = o(() => e.limits === void 0 ? e.unit === "%" ? [10, 90] : [50, Infinity] : e.limits);
		function f(t) {
			return (e.unit === "%" ? t : Math.round(t)) + e.unit;
		}
		let p = o(() => ({ [u.value]: { [l.value]: f(e.modelValue) } })), m, g, v, y, b;
		function x(t) {
			if (t.isFirst) {
				let t = a.value.getBoundingClientRect()[l.value];
				m = e.horizontal ? "up" : "left", g = e.unit === "%" ? 100 : t, v = Math.min(g, d.value[1], Math.max(d.value[0], e.modelValue)), y = (e.reverse ? -1 : 1) * (e.horizontal ? 1 : r.lang.rtl ? -1 : 1) * (e.unit === "%" ? t === 0 ? 0 : 100 / t : 1), a.value.classList.add("q-splitter--active");
				return;
			}
			if (t.isFinal) {
				b !== e.modelValue && n("update:modelValue", b), a.value.classList.remove("q-splitter--active");
				return;
			}
			let i = v + y * (t.direction === m ? -1 : 1) * t.distance[e.horizontal ? "y" : "x"];
			b = Math.min(g, d.value[1], Math.max(d.value[0], i)), s[u.value].value.style[l.value] = f(b), e.emitImmediately && e.modelValue !== b && n("update:modelValue", b);
		}
		let S = o(() => [[
			gg,
			x,
			void 0,
			{
				[e.horizontal ? "vertical" : "horizontal"]: !0,
				prevent: !0,
				stop: !0,
				mouse: !0,
				mouseAllDir: !0
			}
		]]);
		function C(e, t) {
			e < t[0] ? n("update:modelValue", t[0]) : e > t[1] && n("update:modelValue", t[1]);
		}
		return G(() => e.modelValue, (e) => {
			C(e, d.value);
		}), G(() => e.limits, () => {
			w(() => {
				C(e.modelValue, d.value);
			});
		}), () => {
			let n = [
				_("div", {
					ref: s.before,
					class: ["q-splitter__panel q-splitter__before" + (e.reverse ? " col" : ""), e.beforeClass],
					style: p.value.before
				}, $(t.before)),
				_("div", {
					class: ["q-splitter__separator", e.separatorClass],
					style: e.separatorStyle,
					"aria-disabled": e.disable ? "true" : void 0
				}, [Af("div", { class: "q-splitter__separator-area absolute-full" }, $(t.separator), "sep", !e.disable, () => S.value)]),
				_("div", {
					ref: s.after,
					class: ["q-splitter__panel q-splitter__after" + (e.reverse ? "" : " col"), e.afterClass],
					style: p.value.after
				}, $(t.after))
			];
			return _("div", {
				class: c.value,
				ref: a
			}, Of(t.default, n));
		};
	}
});
var Kx = Q({
	name: "StepHeader",
	props: {
		stepper: {},
		step: {},
		goToPanel: Function
	},
	setup(e, { attrs: t }) {
		let { proxy: { $q: n } } = h(), r = L(null), i = o(() => e.stepper.modelValue === e.step.name), a = o(() => {
			let t = e.step.disable;
			return t === !0 || t === "";
		}), s = o(() => {
			let t = e.step.error;
			return t === !0 || t === "";
		}), c = o(() => {
			let t = e.step.done;
			return !a.value && (t === !0 || t === "");
		}), l = o(() => {
			let t = e.step.headerNav;
			return !a.value && e.stepper.headerNav && (t === !0 || t === "" || t === void 0);
		}), u = o(() => e.step.prefix && (!i.value || e.stepper.activeIcon === "none") && (!s.value || e.stepper.errorIcon === "none") && (!c.value || e.stepper.doneIcon === "none")), d = o(() => {
			let t = e.step.icon || e.stepper.inactiveIcon;
			if (i.value) {
				let r = e.step.activeIcon || e.stepper.activeIcon;
				return r === "none" ? t : r || n.iconSet.stepper.active;
			}
			if (s.value) {
				let r = e.step.errorIcon || e.stepper.errorIcon;
				return r === "none" ? t : r || n.iconSet.stepper.error;
			}
			if (!a.value && c.value) {
				let r = e.step.doneIcon || e.stepper.doneIcon;
				return r === "none" ? t : r || n.iconSet.stepper.done;
			}
			return t;
		}), f = o(() => {
			let t = s.value ? e.step.errorColor || e.stepper.errorColor : void 0;
			if (i.value) {
				let n = e.step.activeColor || e.stepper.activeColor || e.step.color;
				return n === void 0 ? t : n;
			}
			return t === void 0 ? !a.value && c.value ? e.step.doneColor || e.stepper.doneColor || e.step.color || e.stepper.inactiveColor : e.step.color || e.stepper.inactiveColor : t;
		}), p = o(() => "q-stepper__tab col-grow flex items-center no-wrap relative-position" + (f.value === void 0 ? "" : ` text-${f.value}`) + (s.value ? " q-stepper__tab--error q-stepper__tab--error-with-" + (u.value ? "prefix" : "icon") : "") + (i.value ? " q-stepper__tab--active" : "") + (c.value ? " q-stepper__tab--done" : "") + (l.value ? " q-stepper__tab--navigation q-focusable q-hoverable" : "") + (a.value ? " q-stepper__tab--disabled" : "")), m = o(() => e.stepper.headerNav && l.value);
		function g() {
			r.value?.focus(), i.value || e.goToPanel(e.step.name);
		}
		function v(t) {
			t.keyCode === 13 && !i.value && e.goToPanel(e.step.name);
		}
		return () => {
			let n = { class: p.value };
			l.value && (n.onClick = g, n.onKeyup = v, Object.assign(n, a.value ? {
				tabindex: -1,
				"aria-disabled": "true"
			} : { tabindex: t.tabindex || 0 }));
			let i = [_("div", {
				class: "q-focus-helper",
				tabindex: -1,
				ref: r
			}), _("div", { class: "q-stepper__dot row flex-center q-stepper__line relative-position" }, [_("span", { class: "row flex-center" }, [u.value ? e.step.prefix : _(Gf, { name: d.value })])])];
			if (e.step.title !== void 0 && e.step.title !== null) {
				let t = [_("div", { class: "q-stepper__title" }, e.step.title)];
				e.step.caption !== void 0 && e.step.caption !== null && t.push(_("div", { class: "q-stepper__caption" }, e.step.caption)), i.push(_("div", { class: "q-stepper__label q-stepper__line relative-position" }, t));
			}
			return re(_("div", n, i), [[Tp, m.value]]);
		};
	}
});
function qx(e) {
	return _("div", { class: "q-stepper__step-content" }, [_("div", { class: "q-stepper__step-inner" }, $(e.default))]);
}
var Jx = { setup(e, { slots: t }) {
	return () => qx(t);
} };
Q({
	name: "QStep",
	props: {
		...zh,
		icon: String,
		color: String,
		title: {
			type: String,
			required: !0
		},
		caption: String,
		prefix: [String, Number],
		doneIcon: String,
		doneColor: String,
		activeIcon: String,
		activeColor: String,
		errorIcon: String,
		errorColor: String,
		headerNav: {
			type: Boolean,
			default: !0
		},
		done: Boolean,
		error: Boolean,
		onScroll: [Function, Array]
	},
	setup(e, { slots: t, emit: r }) {
		let { proxy: { $q: i } } = h(), a = y(Kd, $d);
		if (a === $d) return console.error("QStep needs to be a child of QStepper"), $d;
		let { getCache: s } = Rh(), c = L(null), l = o(() => a.value.modelValue === e.name), u = o(() => !i.platform.is.ios && i.platform.is.chrome || !l.value || !a.value.vertical ? {} : { onScroll(t) {
			let { target: n } = t;
			n.scrollTop > 0 && (n.scrollTop = 0), e.onScroll !== void 0 && r("scroll", t);
		} }), d = o(() => typeof e.name == "string" || typeof e.name == "number" ? e.name : String(e.name));
		function f() {
			let e = a.value.vertical;
			return e && a.value.keepAlive ? _(n, a.value.keepAliveProps.value, l.value ? [_(a.value.needsUniqueKeepAliveWrapper.value ? s(d.value, () => ({
				...Jx,
				name: d.value
			})) : Jx, { key: d.value }, t.default)] : void 0) : !e || l.value ? qx(t) : void 0;
		}
		return () => _("div", {
			ref: c,
			class: "q-stepper__step",
			role: "tabpanel",
			...u.value
		}, a.value.vertical ? [_(Kx, {
			stepper: a.value,
			step: e,
			goToPanel: a.value.goToPanel
		}), a.value.animated ? _(yy, f) : f()] : [f()]);
	}
});
var Yx = /(-\w)/g;
function Xx(e) {
	let t = {};
	for (let n in e) {
		let r = n.replace(Yx, (e) => e[1].toUpperCase());
		t[r] = e[n];
	}
	return t;
}
Q({
	name: "QStepper",
	props: {
		...qf,
		...Vh,
		flat: Boolean,
		bordered: Boolean,
		alternativeLabels: Boolean,
		headerNav: Boolean,
		contracted: Boolean,
		headerClass: String,
		inactiveColor: String,
		inactiveIcon: String,
		doneIcon: String,
		doneColor: String,
		activeIcon: String,
		activeColor: String,
		errorIcon: String,
		errorColor: String
	},
	emits: Hh,
	setup(e, { slots: t }) {
		let n = Jf(e, h().proxy.$q), { updatePanelsList: r, isValidPanelName: i, updatePanelIndex: a, getPanelContent: s, getPanels: c, panelDirectives: l, goToPanel: u, keepAliveProps: d, needsUniqueKeepAliveWrapper: f } = Wh();
		F(Kd, o(() => ({
			goToPanel: u,
			keepAliveProps: d,
			needsUniqueKeepAliveWrapper: f,
			...e
		})));
		let p = o(() => `q-stepper q-stepper--${e.vertical ? "vertical" : "horizontal"}` + (e.flat ? " q-stepper--flat" : "") + (e.bordered ? " q-stepper--bordered" : "") + (n.value ? " q-stepper--dark q-dark" : "")), m = o(() => `q-stepper__header row items-stretch justify-between q-stepper__header--${e.alternativeLabels ? "alternative" : "standard"}-labels` + (e.bordered || !e.flat ? " q-stepper__header--border" : "") + (e.contracted ? " q-stepper__header--contracted" : "") + (e.headerClass === void 0 ? "" : ` ${e.headerClass}`));
		function g() {
			let n = $(t.message, []);
			if (e.vertical) {
				i(e.modelValue) && a();
				let r = _("div", { class: "q-stepper__content" }, $(t.default));
				return n === void 0 ? [r] : n.concat(r);
			}
			return [
				_("div", { class: m.value }, c().map((t) => {
					let n = Xx(t.props);
					return _(Kx, {
						key: n.name,
						stepper: e,
						step: n,
						goToPanel: u
					});
				})),
				n,
				Af("div", { class: "q-stepper__content q-panel-parent" }, s(), "cont", e.swipeable, () => l.value)
			];
		}
		return () => (r(t), _("div", { class: p.value }, Of(t.navigation, g())));
	}
}), Q({
	name: "QStepperNavigation",
	setup(e, { slots: t }) {
		return () => _("div", { class: "q-stepper__nav" }, $(t.default));
	}
});
var Zx = Q({
	name: "QTh",
	props: {
		props: Object,
		autoWidth: Boolean
	},
	emits: ["click"],
	setup(e, { slots: t, emit: n }) {
		let r = h(), { proxy: { $q: i } } = r, a = (e) => {
			n("click", e);
		};
		return () => {
			if (e.props === void 0) return _("th", {
				class: e.autoWidth ? "q-table--col-auto-width" : "",
				onClick: a
			}, $(t.default));
			let n, o, s = r.vnode.key;
			if (s) {
				if (n = e.props.colsMap[s], n === void 0) return;
			} else n = e.props.col;
			if (n.sortable) {
				let e = n.align === "right" ? "unshift" : "push";
				o = Df(t.default, []), o[e](_(Gf, {
					class: n.__iconClass,
					name: i.iconSet.table.arrowUp
				}));
			} else o = $(t.default);
			return _("th", {
				class: n.__thClass + (e.autoWidth ? " q-table--col-auto-width" : ""),
				style: n.headerStyle,
				onClick: (t) => {
					n.sortable && e.props.sort(n), a(t);
				}
			}, o);
		};
	}
});
function Qx(e, t) {
	return _("div", e, [_("table", { class: "q-table" }, t)]);
}
var $x = {
	list: Tb,
	table: Ib
}, eS = [
	"list",
	"table",
	"__qtable"
], tS = Q({
	name: "QVirtualScroll",
	props: {
		...mx,
		type: {
			type: String,
			default: "list",
			validator: (e) => eS.includes(e)
		},
		items: {
			type: Array,
			default: () => []
		},
		itemsFn: Function,
		itemsSize: Number,
		scrollTarget: Sm
	},
	setup(e, { slots: t, attrs: n }) {
		let r, i = L(null), a = o(() => e.itemsSize >= 0 && e.itemsFn !== void 0 ? Number.parseInt(e.itemsSize, 10) : Array.isArray(e.items) ? e.items.length : 0), { virtualScrollSliceRange: s, localResetVirtualScroll: c, padVirtualScroll: l, onVirtualScrollEvt: u } = hx({
			virtualScrollLength: a,
			getVirtualScrollTarget: h,
			getVirtualScrollEl: m
		}), d = o(() => {
			if (a.value === 0) return [];
			let t = (e, t) => ({
				index: s.value.from + t,
				item: e
			});
			return e.itemsFn === void 0 ? e.items.slice(s.value.from, s.value.to).map(t) : e.itemsFn(s.value.from, s.value.to - s.value.from).map(t);
		}), f = o(() => "q-virtual-scroll q-virtual-scroll" + (e.virtualScrollHorizontal ? "--horizontal" : "--vertical") + (e.scrollTarget === void 0 ? " scroll" : "")), p = o(() => e.scrollTarget === void 0 ? { tabindex: 0 } : {});
		G(a, () => {
			c();
		}), G(() => e.scrollTarget, () => {
			v(), g();
		});
		function m() {
			return i.value.$el || i.value;
		}
		function h() {
			return r;
		}
		function g() {
			r = wm(m(), e.scrollTarget), r.addEventListener("scroll", u, vd.passive);
		}
		function v() {
			r !== void 0 && (r.removeEventListener("scroll", u, vd.passive), r = void 0);
		}
		function y() {
			let n = l(e.type === "list" ? "div" : "tbody", d.value.map(t.default));
			return t.before !== void 0 && (n = t.before().concat(n)), Of(t.after, n);
		}
		return E(() => {
			c();
		}), A(() => {
			g();
		}), T(() => {
			g();
		}), k(() => {
			v();
		}), D(() => {
			v();
		}), () => {
			if (t.default === void 0) {
				console.error("QVirtualScroll: default scoped slot is required for rendering");
				return;
			}
			return e.type === "__qtable" ? Qx({
				ref: i,
				class: "q-table__middle " + f.value
			}, y()) : _($x[e.type], {
				...n,
				ref: i,
				class: [n.class, f.value],
				...p.value
			}, y);
		};
	}
});
function nS(e, t) {
	return new Date(e) - new Date(t);
}
var rS = {
	sortMethod: Function,
	binaryStateSort: Boolean,
	columnSortOrder: {
		type: String,
		validator: (e) => e === "ad" || e === "da",
		default: "ad"
	}
};
function iS(e, t, n, r) {
	let i = o(() => {
		let { sortBy: e } = t.value;
		return e && n.value.find((t) => t.name === e) || null;
	}), a = o(() => e.sortMethod === void 0 ? (e, t, r) => {
		let i = n.value.find((e) => e.name === t);
		if (i === void 0 || i.field === void 0) return e;
		let a = r ? -1 : 1, o = typeof i.field == "function" ? (e) => i.field(e) : (e) => e[i.field];
		return e.sort((e, t) => {
			let n = o(e), r = o(t);
			return i.rawSort === void 0 ? n == null ? -1 * a : r == null ? Number(a) : i.sort === void 0 ? af(n) && af(r) ? (n - r) * a : nf(n) && nf(r) ? nS(n, r) * a : typeof n == "boolean" && typeof r == "boolean" ? (n - r) * a : ([n, r] = [n, r].map((e) => String(e).toLocaleString().toLowerCase()), n < r ? -1 * a : n === r ? 0 : a) : i.sort(n, r, e, t) * a : i.rawSort(n, r, e, t) * a;
		});
	} : e.sortMethod);
	function s(i) {
		let a = e.columnSortOrder;
		if (tf(i)) i.sortOrder && (a = i.sortOrder), i = i.name;
		else {
			let e = n.value.find((e) => e.name === i);
			e?.sortOrder && (a = e.sortOrder);
		}
		let { sortBy: o, descending: s } = t.value;
		o === i ? e.binaryStateSort ? s = !s : s ? a === "ad" ? o = null : s = !1 : a === "ad" ? s = !0 : o = null : (o = i, s = a === "da"), r({
			sortBy: o,
			descending: s,
			page: 1
		});
	}
	return {
		columnToSort: i,
		computedSortMethod: a,
		sort: s
	};
}
var aS = {
	filter: [String, Object],
	filterMethod: Function
};
function oS(e, t) {
	let n = o(() => e.filterMethod === void 0 ? (e, t, n, r) => {
		let i = t ? t.toLowerCase() : "";
		return e.filter((e) => n.some((t) => {
			let n = String(r(t, e));
			return (n === "undefined" || n === "null" ? "" : n.toLowerCase()).includes(i);
		}));
	} : e.filterMethod);
	return G(() => e.filter, () => {
		w(() => {
			t({ page: 1 }, !0);
		});
	}, { deep: !0 }), { computedFilterMethod: n };
}
function sS(e, t) {
	for (let n in t) if (t[n] !== e[n]) return !1;
	return !0;
}
function cS(e) {
	return e.page < 1 && (e.page = 1), e.rowsPerPage !== void 0 && e.rowsPerPage < 1 && (e.rowsPerPage = 0), e;
}
var lS = {
	pagination: Object,
	rowsPerPageOptions: {
		type: Array,
		default: () => [
			5,
			7,
			10,
			15,
			20,
			25,
			50,
			0
		]
	},
	"onUpdate:pagination": [Function, Array]
};
function uS(e, t) {
	let { props: n, emit: r } = e, i = L({
		sortBy: null,
		descending: !1,
		page: 1,
		rowsPerPage: n.rowsPerPageOptions.length === 0 ? 5 : n.rowsPerPageOptions[0],
		...n.pagination
	}), a = o(() => cS(n["onUpdate:pagination"] === void 0 ? i.value : {
		...i.value,
		...n.pagination
	})), s = o(() => a.value.rowsNumber !== void 0);
	function c(e) {
		l({
			pagination: e,
			filter: n.filter
		});
	}
	function l(e = {}) {
		w(() => {
			r("request", {
				pagination: e.pagination || a.value,
				filter: e.filter || n.filter,
				getCellValue: t
			});
		});
	}
	function u(e, t) {
		let o = cS({
			...a.value,
			...e
		});
		if (sS(a.value, o)) {
			s.value && t && c(o);
			return;
		}
		if (s.value) {
			c(o);
			return;
		}
		n.pagination !== void 0 && n["onUpdate:pagination"] !== void 0 ? r("update:pagination", o) : i.value = o;
	}
	return {
		innerPagination: i,
		computedPagination: a,
		isServerSide: s,
		requestServerInteraction: l,
		setPagination: u
	};
}
function dS(e, t, n, r, i, a) {
	let { props: s, emit: c, proxy: { $q: l } } = e, u = o(() => r.value ? n.value.rowsNumber || 0 : a.value), d = o(() => {
		let { page: e, rowsPerPage: t } = n.value;
		return (e - 1) * t;
	}), f = o(() => {
		let { page: e, rowsPerPage: t } = n.value;
		return e * t;
	}), p = o(() => n.value.page === 1), m = o(() => n.value.rowsPerPage === 0 ? 1 : Math.max(1, Math.ceil(u.value / n.value.rowsPerPage))), h = o(() => f.value === 0 || n.value.page >= m.value), g = o(() => (s.rowsPerPageOptions.includes(t.value.rowsPerPage) ? s.rowsPerPageOptions : [t.value.rowsPerPage, ...s.rowsPerPageOptions]).map((e) => ({
		label: e === 0 ? l.lang.table.allRows : String(e),
		value: e
	})));
	G(m, (e, t) => {
		if (e === t) return;
		let r = n.value.page;
		e && !r ? i({ page: 1 }) : e < r && i({ page: e });
	});
	function _() {
		i({ page: 1 });
	}
	function v() {
		let { page: e } = n.value;
		e > 1 && i({ page: e - 1 });
	}
	function y() {
		let { page: e, rowsPerPage: t } = n.value;
		f.value > 0 && e * t < u.value && i({ page: e + 1 });
	}
	function b() {
		i({ page: m.value });
	}
	return s["onUpdate:pagination"] !== void 0 && c("update:pagination", { ...n.value }), {
		firstRowIndex: d,
		lastRowIndex: f,
		isFirstPage: p,
		isLastPage: h,
		pagesNumber: m,
		computedRowsPerPageOptions: g,
		computedRowsNumber: u,
		firstPage: _,
		prevPage: v,
		nextPage: y,
		lastPage: b
	};
}
var fS = {
	selection: {
		type: String,
		default: "none",
		validator: (e) => [
			"single",
			"multiple",
			"none"
		].includes(e)
	},
	selected: {
		type: Array,
		default: () => []
	}
}, pS = ["update:selected", "selection"];
function mS(e, t, n, r) {
	let i = o(() => {
		let t = {};
		return e.selected.map(r.value).forEach((e) => {
			t[e] = !0;
		}), t;
	}), a = o(() => e.selection !== "none"), s = o(() => e.selection === "single"), c = o(() => e.selection === "multiple"), l = o(() => n.value.length !== 0 && n.value.every((e) => i.value[r.value(e)])), u = o(() => !l.value && n.value.some((e) => i.value[r.value(e)])), d = o(() => e.selected.length);
	function f(e) {
		return i.value[e] === !0;
	}
	function p() {
		t("update:selected", []);
	}
	function m(n, i, a, o) {
		t("selection", {
			rows: i,
			added: a,
			keys: n,
			evt: o
		}), t("update:selected", s.value ? a ? i : [] : a ? [...e.selected, ...i] : e.selected.filter((e) => !n.includes(r.value(e))));
	}
	return {
		hasSelectionMode: a,
		singleSelection: s,
		multipleSelection: c,
		allRowsSelected: l,
		someRowsSelected: u,
		rowsSelectedNumber: d,
		isRowSelected: f,
		clearSelection: p,
		updateSelection: m
	};
}
function hS(e) {
	return Array.isArray(e) ? [...e] : [];
}
var gS = { expanded: Array }, _S = ["update:expanded"];
function vS(e, t) {
	let n = L(hS(e.expanded));
	G(() => e.expanded, (e) => {
		n.value = hS(e);
	});
	function r(e) {
		return n.value.includes(e);
	}
	function i(r) {
		e.expanded === void 0 ? n.value = r : t("update:expanded", r);
	}
	function a(e, t) {
		let r = [...n.value], a = r.indexOf(e);
		t ? a === -1 && (r.push(e), i(r)) : a !== -1 && (r.splice(a, 1), i(r));
	}
	return {
		isRowExpanded: r,
		setExpanded: i,
		updateExpanded: a
	};
}
var yS = { visibleColumns: Array };
function bS(e, t, n) {
	let r = o(() => {
		if (e.columns !== void 0) return e.columns;
		let t = e.rows[0];
		return t === void 0 ? [] : Object.keys(t).map((e) => ({
			name: e,
			label: e.toUpperCase(),
			field: e,
			align: af(t[e]) ? "right" : "left",
			sortable: !0
		}));
	}), i = o(() => {
		let { sortBy: n, descending: i } = t.value;
		return (e.visibleColumns === void 0 ? r.value : r.value.filter((t) => t.required || e.visibleColumns.includes(t.name))).map((e) => {
			let t = e.align || "right", r = `text-${t}`;
			return {
				...e,
				align: t,
				__iconClass: `q-table__sort-icon q-table__sort-icon--${t}`,
				__thClass: r + (e.headerClasses === void 0 ? "" : " " + e.headerClasses) + (e.sortable ? " sortable" : "") + (e.name === n ? ` sorted ${i ? "sort-desc" : ""}` : ""),
				__tdStyle: e.style === void 0 ? () => null : typeof e.style == "function" ? e.style : () => e.style,
				__tdClass: e.classes === void 0 ? () => r : typeof e.classes == "function" ? (t) => r + " " + e.classes(t) : () => r + " " + e.classes
			};
		});
	});
	return {
		colList: r,
		computedCols: i,
		computedColsMap: o(() => {
			let e = {};
			return i.value.forEach((t) => {
				e[t.name] = t;
			}), e;
		}),
		computedColspan: o(() => e.tableColspan === void 0 ? i.value.length + +!!n.value : e.tableColspan)
	};
}
var xS = "q-table__bottom row items-center", SS = {};
px.forEach((e) => {
	SS[e] = {};
});
function CS(e, t) {
	let n = typeof e.field == "function" ? e.field(t) : t[e.field];
	return e.format === void 0 ? n : e.format(n, t);
}
Q({
	name: "QTable",
	props: {
		rows: {
			type: Array,
			required: !0
		},
		rowKey: {
			type: [String, Function],
			default: "id"
		},
		columns: Array,
		loading: Boolean,
		iconFirstPage: String,
		iconPrevPage: String,
		iconNextPage: String,
		iconLastPage: String,
		title: String,
		hideHeader: Boolean,
		grid: Boolean,
		gridHeader: Boolean,
		dense: Boolean,
		flat: Boolean,
		bordered: Boolean,
		square: Boolean,
		separator: {
			type: String,
			default: "horizontal",
			validator: (e) => [
				"horizontal",
				"vertical",
				"cell",
				"none"
			].includes(e)
		},
		wrapCells: Boolean,
		virtualScroll: Boolean,
		virtualScrollTarget: {},
		...SS,
		noDataLabel: String,
		noResultsLabel: String,
		loadingLabel: String,
		selectedRowsLabel: Function,
		rowsPerPageLabel: String,
		paginationLabel: Function,
		color: {
			type: String,
			default: "grey-8"
		},
		titleClass: [
			String,
			Array,
			Object
		],
		tableStyle: [
			String,
			Array,
			Object
		],
		tableClass: [
			String,
			Array,
			Object
		],
		tableHeaderStyle: [
			String,
			Array,
			Object
		],
		tableHeaderClass: [
			String,
			Array,
			Object
		],
		tableRowStyleFn: Function,
		tableRowClassFn: Function,
		cardContainerClass: [
			String,
			Array,
			Object
		],
		cardContainerStyle: [
			String,
			Array,
			Object
		],
		cardStyle: [
			String,
			Array,
			Object
		],
		cardClass: [
			String,
			Array,
			Object
		],
		cardStyleFn: Function,
		cardClassFn: Function,
		hideBottom: Boolean,
		hideSelectedBanner: Boolean,
		hideNoData: Boolean,
		hidePagination: Boolean,
		onRowClick: Function,
		onRowDblclick: Function,
		onRowContextmenu: Function,
		...qf,
		...Kh,
		...yS,
		...aS,
		...lS,
		...gS,
		...fS,
		...rS
	},
	emits: [
		"request",
		"virtualScroll",
		...qh,
		..._S,
		...pS
	],
	setup(e, { slots: t, emit: n }) {
		let r = h(), { proxy: { $q: i } } = r, a = Jf(e, i), { inFullscreen: s, toggleFullscreen: c } = Jh(), l = o(() => typeof e.rowKey == "function" ? e.rowKey : (t) => t[e.rowKey]), u = L(null), d = L(null), f = o(() => !e.grid && e.virtualScroll), p = o(() => " q-table__card" + (a.value ? " q-table__card--dark q-dark" : "") + (e.square ? " q-table--square" : "") + (e.flat ? " q-table--flat" : "") + (e.bordered ? " q-table--bordered" : "")), m = o(() => `q-table__container q-table--${e.separator}-separator column no-wrap` + (e.grid ? " q-table--grid" : p.value) + (a.value ? " q-table--dark" : "") + (e.dense ? " q-table--dense" : "") + (e.wrapCells ? "" : " q-table--no-wrap") + (s.value ? " fullscreen scroll" : "")), g = o(() => m.value + (e.loading ? " q-table--loading" : ""));
		G(() => e.tableStyle + e.tableClass + e.tableHeaderStyle + e.tableHeaderClass + m.value, () => {
			f.value && d.value?.reset();
		});
		let { innerPagination: v, computedPagination: y, isServerSide: b, requestServerInteraction: x, setPagination: S } = uS(r, CS), { computedFilterMethod: C } = oS(e, S), { isRowExpanded: w, setExpanded: T, updateExpanded: E } = vS(e, n), D = o(() => {
			let t = e.rows;
			if (b.value || t.length === 0) return t;
			let { sortBy: n, descending: r } = y.value;
			return e.filter && (t = C.value(t, e.filter, V.value, CS)), H.value !== null && (t = U.value(e.rows === t ? [...t] : t, n, r)), t;
		}), O = o(() => D.value.length), k = o(() => {
			let t = D.value;
			if (b.value) return t;
			let { rowsPerPage: n } = y.value;
			return n !== 0 && (ne.value === 0 && e.rows !== t ? t.length > re.value && (t = t.slice(0, re.value)) : t = t.slice(ne.value, re.value)), t;
		}), { hasSelectionMode: A, singleSelection: j, multipleSelection: M, allRowsSelected: N, someRowsSelected: P, rowsSelectedNumber: F, isRowSelected: I, clearSelection: R, updateSelection: z } = mS(e, n, k, l), { colList: B, computedCols: V, computedColsMap: ee, computedColspan: te } = bS(e, y, A), { columnToSort: H, computedSortMethod: U, sort: W } = iS(e, y, B, S), { firstRowIndex: ne, lastRowIndex: re, isFirstPage: ie, isLastPage: K, pagesNumber: ae, computedRowsPerPageOptions: oe, computedRowsNumber: se, firstPage: ce, prevPage: le, nextPage: ue, lastPage: de } = dS(r, v, y, b, S, O), fe = o(() => k.value.length === 0), pe = o(() => {
			let t = {};
			return px.forEach((n) => {
				t[n] = e[n];
			}), t.virtualScrollItemSize === void 0 && (t.virtualScrollItemSize = e.dense ? 28 : 48), t;
		});
		function me() {
			f.value && d.value.reset();
		}
		function he() {
			if (e.grid) return Le();
			let n = e.hideHeader ? null : Oe;
			if (f.value) {
				let r = t["top-row"], i = t["bottom-row"], a = { default: (e) => ye(e.item, t.body, e.index) };
				if (r !== void 0) {
					let e = _("tbody", r({ cols: V.value }));
					a.before = n === null ? () => e : () => [n(), e];
				} else n !== null && (a.before = n);
				return i !== void 0 && (a.after = () => _("tbody", i({ cols: V.value }))), _(tS, {
					ref: d,
					class: e.tableClass,
					style: e.tableStyle,
					...pe.value,
					scrollTarget: e.virtualScrollTarget,
					items: k.value,
					type: "__qtable",
					tableColspan: te.value,
					onVirtualScroll: _e
				}, a);
			}
			let r = [be()];
			return n !== null && r.unshift(n()), Qx({
				class: ["q-table__middle scroll", e.tableClass],
				style: e.tableStyle
			}, r);
		}
		function ge(t, r) {
			if (d.value !== null) {
				d.value.scrollTo(t, r);
				return;
			}
			t = Number.parseInt(t, 10);
			let i = u.value.querySelector(`tbody tr:nth-of-type(${t + 1})`);
			if (i !== null) {
				let r = u.value.querySelector(".q-table__middle.scroll"), a = i.offsetTop - e.virtualScrollStickySizeStart, o = a < r.scrollTop ? "decrease" : "increase";
				r.scrollTop = a, n("virtualScroll", {
					index: t,
					from: 0,
					to: v.value.rowsPerPage - 1,
					direction: o
				});
			}
		}
		function _e(e) {
			n("virtualScroll", e);
		}
		function ve() {
			return [_(Pb, {
				class: "q-table__linear-progress",
				color: e.color,
				dark: a.value,
				indeterminate: !0,
				trackColor: "transparent"
			})];
		}
		function ye(r, i, o) {
			let s = l.value(r), c = I(s);
			if (i !== void 0) {
				let t = {
					key: s,
					row: r,
					pageIndex: o,
					__trClass: c ? "selected" : ""
				};
				if (e.tableRowStyleFn !== void 0 && (t.__trStyle = e.tableRowStyleFn(r)), e.tableRowClassFn !== void 0) {
					let n = e.tableRowClassFn(r);
					n && (t.__trClass = `${n} ${t.__trClass}`);
				}
				return i(xe(t));
			}
			let u = t["body-cell"], d = V.value.map((e) => {
				let n = t[`body-cell-${e.name}`], i = n === void 0 ? u : n;
				return i === void 0 ? _("td", {
					class: e.__tdClass(r),
					style: e.__tdStyle(r)
				}, CS(e, r)) : i(Se({
					key: s,
					row: r,
					pageIndex: o,
					col: e
				}));
			});
			if (A.value) {
				let n = t["body-selection"], i = n === void 0 ? [_(ig, {
					modelValue: c,
					color: e.color,
					dark: a.value,
					dense: e.dense,
					"onUpdate:modelValue": (e, t) => {
						z([s], [r], e, t);
					}
				})] : n(Ce({
					key: s,
					row: r,
					pageIndex: o
				}));
				d.unshift(_("td", { class: "q-table--col-auto-width" }, i));
			}
			let f = {
				key: s,
				class: { selected: c }
			};
			if (e.onRowClick !== void 0 && (f.class["cursor-pointer"] = !0, f.onClick = (e) => {
				n("rowClick", e, r, o);
			}), e.onRowDblclick !== void 0 && (f.class["cursor-pointer"] = !0, f.onDblclick = (e) => {
				n("rowDblclick", e, r, o);
			}), e.onRowContextmenu !== void 0 && (f.class["cursor-pointer"] = !0, f.onContextmenu = (e) => {
				n("rowContextmenu", e, r, o);
			}), e.tableRowStyleFn !== void 0 && (f.style = e.tableRowStyleFn(r)), e.tableRowClassFn !== void 0) {
				let t = e.tableRowClassFn(r);
				t && (f.class[t] = !0);
			}
			return _("tr", f, d);
		}
		function be() {
			let e = t.body, n = t["top-row"], r = t["bottom-row"], i = k.value.map((t, n) => ye(t, e, n));
			return _("tbody", [
				n?.({ cols: V.value }),
				...i,
				r?.({ cols: V.value })
			].flat());
		}
		function xe(e) {
			return we(e), e.cols = e.cols.map((t) => id({ ...t }, "value", () => CS(t, e.row))), e;
		}
		function Se(e) {
			return we(e), id(e, "value", () => CS(e.col, e.row)), e;
		}
		function Ce(e) {
			return we(e), e;
		}
		function we(t) {
			Object.assign(t, {
				cols: V.value,
				colsMap: ee.value,
				sort: W,
				rowIndex: ne.value + t.pageIndex,
				color: e.color,
				dark: a.value,
				dense: e.dense
			}), A.value && id(t, "selected", () => I(t.key), (e, n) => {
				z([t.key], [t.row], e, n);
			}), id(t, "expand", () => w(t.key), (e) => {
				E(t.key, e);
			});
		}
		let Te = o(() => ({
			pagination: y.value,
			pagesNumber: ae.value,
			isFirstPage: ie.value,
			isLastPage: K.value,
			firstPage: ce,
			prevPage: le,
			nextPage: ue,
			lastPage: de,
			inFullscreen: s.value,
			toggleFullscreen: c
		}));
		function Ee() {
			let n = t.top, r = t["top-left"], i = t["top-right"], a = t["top-selection"], o = A.value && a !== void 0 && F.value > 0, s = "q-table__top relative-position row items-center";
			if (n !== void 0) return _("div", { class: s }, [n(Te.value)]);
			let c;
			if (o ? c = [a(Te.value)].flat() : (c = [], r === void 0 ? e.title && c.push(_("div", { class: "q-table__control" }, [_("div", { class: ["q-table__title", e.titleClass] }, e.title)])) : c.push(_("div", { class: "q-table__control" }, [r(Te.value)]))), i !== void 0 && c.push(_("div", { class: "q-table__separator col" }), _("div", { class: "q-table__control" }, [i(Te.value)])), c.length !== 0) return _("div", { class: s }, c);
		}
		let De = o(() => P.value ? null : N.value);
		function Oe() {
			let n = ke();
			return e.loading && t.loading === void 0 && n.push(_("tr", { class: "q-table__progress" }, [_("th", {
				class: "relative-position",
				colspan: te.value
			}, ve())])), _("thead", n);
		}
		function ke() {
			let n = t.header, r = t["header-cell"];
			if (n !== void 0) return [n(Ae({ header: !0 }))].flat();
			let i = V.value.map((e) => {
				let n = t[`header-cell-${e.name}`], i = n === void 0 ? r : n, a = Ae({ col: e });
				return i === void 0 ? _(Zx, {
					key: e.name,
					props: a
				}, () => e.label) : i(a);
			});
			if (j.value && !e.grid) i.unshift(_("th", { class: "q-table--col-auto-width" }, " "));
			else if (M.value) {
				let n = t["header-selection"], r = n === void 0 ? [_(ig, {
					color: e.color,
					modelValue: De.value,
					dark: a.value,
					dense: e.dense,
					"onUpdate:modelValue": je
				})] : n(Ae({}));
				i.unshift(_("th", { class: "q-table--col-auto-width" }, r));
			}
			return [_("tr", {
				class: e.tableHeaderClass,
				style: e.tableHeaderStyle
			}, i)];
		}
		function Ae(t) {
			return Object.assign(t, {
				cols: V.value,
				sort: W,
				colsMap: ee.value,
				color: e.color,
				dark: a.value,
				dense: e.dense
			}), M.value && id(t, "selected", () => De.value, je), t;
		}
		function je(e) {
			P.value && (e = !1), z(k.value.map(l.value), k.value, e);
		}
		let Me = o(() => {
			let t = [
				e.iconFirstPage || i.iconSet.table.firstPage,
				e.iconPrevPage || i.iconSet.table.prevPage,
				e.iconNextPage || i.iconSet.table.nextPage,
				e.iconLastPage || i.iconSet.table.lastPage
			];
			return i.lang.rtl ? t.reverse() : t;
		});
		function Ne() {
			if (e.hideBottom) return;
			if (fe.value) {
				if (e.hideNoData) return;
				let n = e.loading ? e.loadingLabel || i.lang.table.loading : e.filter ? e.noResultsLabel || i.lang.table.noResults : e.noDataLabel || i.lang.table.noData, r = t["no-data"];
				return _("div", { class: "q-table__bottom row items-center q-table__bottom--nodata" }, r === void 0 ? [_(Gf, {
					class: "q-table__bottom-nodata-icon",
					name: i.iconSet.table.warning
				}), n] : [r({
					message: n,
					icon: i.iconSet.table.warning,
					filter: e.filter
				})]);
			}
			let n = t.bottom;
			if (n !== void 0) return _("div", { class: xS }, [n(Te.value)]);
			let r = !e.hideSelectedBanner && A.value && F.value > 0 ? [_("div", { class: "q-table__control" }, [_("div", [(e.selectedRowsLabel || i.lang.table.selectedRecords)(F.value)])])] : [];
			if (!e.hidePagination) return _("div", { class: "q-table__bottom row items-center justify-end" }, Fe(r));
			if (r.length !== 0) return _("div", { class: xS }, r);
		}
		function Pe(e) {
			S({
				page: 1,
				rowsPerPage: e.value
			});
		}
		function Fe(n) {
			let r, { rowsPerPage: o } = y.value, s = e.paginationLabel || i.lang.table.pagination, c = t.pagination, l = e.rowsPerPageOptions.length > 1;
			if (n.push(_("div", { class: "q-table__separator col" })), l && n.push(_("div", { class: "q-table__control" }, [_("span", { class: "q-table__bottom-item" }, [e.rowsPerPageLabel || i.lang.table.recordsPerPage]), _(bx, {
				class: "q-table__select inline q-table__bottom-item",
				color: e.color,
				modelValue: o,
				options: oe.value,
				displayValue: o === 0 ? i.lang.table.allRows : o,
				dark: a.value,
				borderless: !0,
				dense: !0,
				optionsDense: !0,
				optionsCover: !0,
				"onUpdate:modelValue": Pe
			})])), c !== void 0) r = c(Te.value);
			else if (r = [_("span", o === 0 ? {} : { class: "q-table__bottom-item" }, [o ? s(ne.value + 1, Math.min(re.value, se.value), se.value) : s(1, O.value, se.value)])], o !== 0 && ae.value > 1) {
				let t = {
					color: e.color,
					round: !0,
					dense: !0,
					flat: !0
				};
				e.dense && (t.size = "sm"), ae.value > 2 && r.push(_(Vp, {
					key: "pgFirst",
					...t,
					icon: Me.value[0],
					disable: ie.value,
					"aria-label": i.lang.pagination.first,
					onClick: ce
				})), r.push(_(Vp, {
					key: "pgPrev",
					...t,
					icon: Me.value[1],
					disable: ie.value,
					"aria-label": i.lang.pagination.prev,
					onClick: le
				}), _(Vp, {
					key: "pgNext",
					...t,
					icon: Me.value[2],
					disable: K.value,
					"aria-label": i.lang.pagination.next,
					onClick: ue
				})), ae.value > 2 && r.push(_(Vp, {
					key: "pgLast",
					...t,
					icon: Me.value[3],
					disable: K.value,
					"aria-label": i.lang.pagination.last,
					onClick: de
				}));
			}
			return n.push(_("div", { class: "q-table__control" }, r)), n;
		}
		function Ie() {
			return _("div", { class: "q-table__middle" }, e.gridHeader ? [_("table", { class: "q-table" }, [Oe(_)])] : e.loading && t.loading === void 0 ? ve(_) : void 0);
		}
		function Le() {
			let r = t.item === void 0 ? (r) => {
				let i = r.cols.map((e) => _("div", { class: "q-table__grid-item-row" }, [_("div", { class: "q-table__grid-item-title" }, [e.label]), _("div", { class: "q-table__grid-item-value" }, [e.value])]));
				if (A.value) {
					let n = t["body-selection"], o = n === void 0 ? [_(ig, {
						modelValue: r.selected,
						color: e.color,
						dark: a.value,
						dense: e.dense,
						"onUpdate:modelValue": (e, t) => {
							z([r.key], [r.row], e, t);
						}
					})] : n(r);
					i.unshift(_("div", { class: "q-table__grid-item-row" }, o), _(Sy, { dark: a.value }));
				}
				let o = {
					class: ["q-table__grid-item-card" + p.value, e.cardClass],
					style: e.cardStyle
				};
				if (e.cardStyleFn !== void 0 && (o.style = [o.style, e.cardStyleFn(r.row)]), e.cardClassFn !== void 0) {
					let t = e.cardClassFn(r.row);
					t && (o.class[0] += ` ${t}`);
				}
				return (e.onRowClick !== void 0 || e.onRowDblclick !== void 0 || e.onRowContextmenu !== void 0) && (o.class[0] += " cursor-pointer", e.onRowClick !== void 0 && (o.onClick = (e) => {
					n("RowClick", e, r.row, r.pageIndex);
				}), e.onRowDblclick !== void 0 && (o.onDblclick = (e) => {
					n("RowDblclick", e, r.row, r.pageIndex);
				}), e.onRowContextmenu !== void 0 && (o.onContextmenu = (e) => {
					n("rowContextmenu", e, r.row, r.pageIndex);
				})), _("div", { class: "q-table__grid-item col-xs-12 col-sm-6 col-md-4 col-lg-3" + (r.selected ? " q-table__grid-item--selected" : "") }, [_("div", o, i)]);
			} : t.item;
			return _("div", {
				class: ["q-table__grid-content row", e.cardContainerClass],
				style: e.cardContainerStyle
			}, k.value.map((e, t) => r(xe({
				key: l.value(e),
				row: e,
				pageIndex: t
			}))));
		}
		return Object.assign(r.proxy, {
			requestServerInteraction: x,
			setPagination: S,
			firstPage: ce,
			prevPage: le,
			nextPage: ue,
			lastPage: de,
			isRowSelected: I,
			clearSelection: R,
			isRowExpanded: w,
			setExpanded: T,
			sort: W,
			resetVirtualScroll: me,
			scrollTo: ge,
			getCellValue: (e, t) => {
				let n = ee.value[e];
				if (n !== void 0) return CS(n, t);
			}
		}), ad(r.proxy, {
			filteredSortedRows: () => D.value,
			computedRows: () => k.value,
			computedRowsNumber: () => se.value
		}), () => {
			let n = [Ee()], r = {
				ref: u,
				class: g.value
			};
			return e.grid ? n.push(Ie()) : Object.assign(r, {
				class: [r.class, e.cardClass],
				style: e.cardStyle
			}), n.push(he(), Ne()), e.loading && t.loading !== void 0 && n.push(t.loading()), _("div", r, n);
		};
	}
}), Q({
	name: "QTr",
	props: {
		props: Object,
		noHover: Boolean
	},
	setup(e, { slots: t }) {
		let n = o(() => "q-tr" + (e.props === void 0 || e.props.header ? "" : " " + e.props.__trClass) + (e.noHover ? " q-tr--no-hover" : ""));
		return () => _("tr", {
			style: e.props?.__trStyle,
			class: n.value
		}, $(t.default));
	}
}), Q({
	name: "QTd",
	props: {
		props: Object,
		autoWidth: Boolean,
		noHover: Boolean
	},
	setup(e, { slots: t }) {
		let n = h(), r = o(() => "q-td" + (e.autoWidth ? " q-table--col-auto-width" : "") + (e.noHover ? " q-td--no-hover" : "") + " ");
		return () => {
			if (e.props === void 0) return _("td", { class: r.value }, $(t.default));
			let i = n.vnode.key, a = (e.props.colsMap === void 0 ? null : e.props.colsMap[i]) || e.props.col;
			if (a === void 0) return;
			let { row: o } = e.props;
			return _("td", {
				class: r.value + a.__tdClass(o),
				style: a.__tdStyle(o)
			}, $(t.default));
		};
	}
}), Q({
	name: "QRouteTab",
	props: {
		...fp,
		...Lg
	},
	emits: Ig,
	setup(e, { slots: t, emit: n }) {
		let r = pp({ useDisableForRouterLinkProps: !1 }), { renderTab: i, $tabs: a } = Rg(e, t, n, {
			exact: o(() => e.exact),
			...r
		});
		return G(() => `${e.name} | ${e.exact} | ${(r.resolvedLink.value || {}).href}`, a.verifyRouteModel), () => i(r.linkTag.value, r.linkAttrs.value);
	}
});
var wS = /^-?[\d]+\/[0-1]\d\/[0-3]\d$/;
function TS(e, t) {
	if (e.hour !== null) {
		if (e.minute === null) return "minute";
		if (t && e.second === null) return "second";
	}
	return "hour";
}
function ES() {
	let e = /* @__PURE__ */ new Date();
	return {
		hour: e.getHours(),
		minute: e.getMinutes(),
		second: e.getSeconds(),
		millisecond: e.getMilliseconds()
	};
}
function DS(e, t, n) {
	let r = Math.abs(e - t);
	return Math.min(r, n - r);
}
function OS(e, t, n) {
	let r = Array.from({ length: t + 1 }, (t, n) => n + e).filter((e) => n(e));
	return {
		min: r[0],
		max: r.at(-1),
		values: r,
		threshold: t + 1
	};
}
Q({
	name: "QTime",
	props: {
		...qf,
		...Ch,
		...O_,
		modelValue: {
			required: !0,
			validator: (e) => typeof e == "string" || e === null
		},
		mask: {
			...O_.mask,
			default: null
		},
		format24h: {
			type: Boolean,
			default: null
		},
		defaultDate: {
			type: String,
			validator: (e) => wS.test(e)
		},
		options: Function,
		hourOptions: Array,
		minuteOptions: Array,
		secondOptions: Array,
		withSeconds: Boolean,
		nowBtn: Boolean
	},
	emits: k_,
	setup(e, { slots: t, emit: n }) {
		let r = h(), { $q: i } = r.proxy, s = Jf(e, i), { tabindex: c, headerClass: l, getLocale: u, getCurrentDate: d } = j_(e, i), f = Th(wh(e)), p, m, g = L(null), v = o(() => H()), y = o(() => u()), b = o(() => U()), x = J_(e.modelValue, v.value, y.value, e.calendar, b.value), S = L(TS(x)), C = L(x), T = L(x.hour === null || x.hour < 12), E = o(() => e.format24h === null ? i.lang.date.format24h : e.format24h), D = o(() => `q-time q-time--${e.landscape ? "landscape" : "portrait"}` + (s.value ? " q-time--dark q-dark" : "") + (e.disable ? " disabled" : e.readonly ? " q-time--readonly" : "") + (e.bordered ? " q-time--bordered" : "") + (e.square ? " q-time--square no-border-radius" : "") + (e.flat ? " q-time--flat no-shadow" : "")), O = o(() => {
			let e = C.value;
			return {
				hour: e.hour === null ? "--" : E.value ? pf(e.hour) : String(T.value ? e.hour === 0 ? 12 : e.hour : e.hour > 12 ? e.hour - 12 : e.hour),
				minute: e.minute === null ? "--" : pf(e.minute),
				second: e.second === null ? "--" : pf(e.second)
			};
		}), k = o(() => {
			let e = S.value === "hour", t = e ? 12 : 60, n = C.value[S.value], r = `rotate(${Math.round(360 / t * n) - 180}deg) translateX(-50%)`;
			return e && E.value && C.value.hour >= 12 && (r += " scale(.7)"), { transform: r };
		}), A = o(() => C.value.hour !== null), j = o(() => A.value && C.value.minute !== null), M = o(() => e.hourOptions === void 0 ? e.options === void 0 ? null : (t) => e.options(t, null, null) : (t) => e.hourOptions.includes(t)), N = o(() => e.minuteOptions === void 0 ? e.options === void 0 ? null : (t) => e.options(C.value.hour, t, null) : (t) => e.minuteOptions.includes(t)), P = o(() => e.secondOptions === void 0 ? e.options === void 0 ? null : (t) => e.options(C.value.hour, C.value.minute, t) : (t) => e.secondOptions.includes(t)), F = o(() => {
			if (M.value === null) return null;
			let e = OS(0, 11, M.value), t = OS(12, 11, M.value);
			return {
				am: e,
				pm: t,
				values: [...e.values, ...t.values]
			};
		}), I = o(() => N.value === null ? null : OS(0, 59, N.value)), R = o(() => P.value === null ? null : OS(0, 59, P.value)), z = o(() => {
			switch (S.value) {
				case "hour": return F.value;
				case "minute": return I.value;
				case "second": return R.value;
			}
		}), B = o(() => {
			let e, t = 0, n = 1, r = z.value === null ? void 0 : z.value.values;
			S.value === "hour" ? E.value ? e = 23 : (e = 11, T.value || (t = 12)) : (e = 55, n = 5);
			let i = [];
			for (let a = 0, o = 0; a <= e; a += n, o++) {
				let e = a + t, n = r?.includes(e) === !1, s = S.value === "hour" && a === 0 ? E.value ? "00" : "12" : a;
				i.push({
					val: e,
					index: o,
					disable: n,
					label: s
				});
			}
			return i;
		}), V = o(() => [[
			gg,
			ie,
			void 0,
			{
				stop: !0,
				prevent: !0,
				mouse: !0
			}
		]]);
		G(() => e.modelValue, (t) => {
			let n = J_(t, v.value, y.value, e.calendar, b.value);
			(n.dateHash !== C.value.dateHash || n.timeHash !== C.value.timeHash) && (C.value = n, n.hour === null ? S.value = "hour" : T.value = n.hour < 12);
		}), G([v, y], () => {
			w(() => {
				Se();
			});
		});
		function ee() {
			let e = {
				...d(),
				...ES()
			};
			Se(e), Object.assign(C.value, e), S.value = "hour";
		}
		function te(e, { min: t, max: n, values: r, threshold: i }) {
			if (e === t) return t;
			if (e < t || e > n) return DS(e, t, i) <= DS(e, n, i) ? t : n;
			let a = r.findIndex((t) => e <= t), o = r[a - 1], s = r[a];
			return e - o <= s - e ? o : s;
		}
		function H() {
			return e.calendar !== "persian" && e.mask !== null ? e.mask : `HH:mm${e.withSeconds ? ":ss" : ""}`;
		}
		function U() {
			if (typeof e.defaultDate != "string") {
				let e = d(!0);
				return e.dateHash = A_(e), e;
			}
			return J_(e.defaultDate, "YYYY/MM/DD", void 0, e.calendar);
		}
		function W() {
			return rp(r) || z.value !== null && (z.value.values.length === 0 || S.value === "hour" && !E.value && F.value[T.value ? "am" : "pm"].values.length === 0);
		}
		function ne() {
			let { top: e, left: t, width: n } = g.value.getBoundingClientRect(), r = n / 2;
			return {
				top: e + r,
				left: t + r,
				dist: r * .7
			};
		}
		function ie(e) {
			if (!W()) {
				if (e.isFirst) {
					p = ne(), m = ae(e.evt, p);
					return;
				}
				m = ae(e.evt, p, m), e.isFinal && (p = !1, m = null, K());
			}
		}
		function K() {
			S.value === "hour" ? S.value = "minute" : e.withSeconds && S.value === "minute" && (S.value = "second");
		}
		function ae(e, t, n) {
			let r = xd(e), i = Math.abs(r.top - t.top), a = Math.hypot(r.top - t.top, r.left - t.left), o, s = Math.asin(i / a) * (180 / Math.PI);
			if (s = r.top < t.top ? t.left < r.left ? 90 - s : 270 + s : t.left < r.left ? s + 90 : 270 - s, S.value === "hour") {
				if (o = s / 30, F.value !== null) {
					let e = E.value ? F.value.am.values.length !== 0 && F.value.pm.values.length !== 0 ? a >= t.dist : F.value.am.values.length !== 0 : T.value;
					o = te(o + (e ? 0 : 12), F.value[e ? "am" : "pm"]);
				} else o = Math.round(o), E.value ? a < t.dist ? o < 12 && (o += 12) : o === 12 && (o = 0) : T.value && o === 12 ? o = 0 : !T.value && o !== 12 && (o += 12);
				E.value && (T.value = o < 12);
			} else o = Math.round(s / 6) % 60, S.value === "minute" && I.value !== null ? o = te(o, I.value) : S.value === "second" && R.value !== null && (o = te(o, R.value));
			return n !== o && _e[S.value](o), o;
		}
		let oe = {
			hour() {
				S.value = "hour";
			},
			minute() {
				S.value = "minute";
			},
			second() {
				S.value = "second";
			}
		};
		function se(e) {
			e.keyCode === 13 && ve();
		}
		function ce(e) {
			e.keyCode === 13 && ye();
		}
		function le(e) {
			W() || (i.platform.is.desktop || ae(e, ne()), K());
		}
		function ue(e) {
			W() || ae(e, ne());
		}
		function de(e) {
			if (e.keyCode === 13) S.value = "hour";
			else if ([37, 39].includes(e.keyCode)) {
				let t = e.keyCode === 37 ? -1 : 1;
				if (F.value !== null) {
					let e = E.value ? F.value.values : F.value[T.value ? "am" : "pm"].values;
					if (e.length === 0) return;
					C.value.hour === null ? me(e[0]) : me(e[(e.length + e.indexOf(C.value.hour) + t) % e.length]);
				} else {
					let e = E.value ? 24 : 12;
					me((!E.value && !T.value ? 12 : 0) + (24 + (C.value.hour === null ? -t : C.value.hour) + t) % e);
				}
			}
		}
		function fe(e) {
			if (e.keyCode === 13) S.value = "minute";
			else if ([37, 39].includes(e.keyCode)) {
				let t = e.keyCode === 37 ? -1 : 1;
				if (I.value !== null) {
					let e = I.value.values;
					if (e.length === 0) return;
					C.value.minute === null ? he(e[0]) : he(e[(e.length + e.indexOf(C.value.minute) + t) % e.length]);
				} else he((60 + (C.value.minute === null ? -t : C.value.minute) + t) % 60);
			}
		}
		function pe(e) {
			if (e.keyCode === 13) S.value = "second";
			else if ([37, 39].includes(e.keyCode)) {
				let t = e.keyCode === 37 ? -1 : 1;
				if (R.value !== null) {
					let e = R.value.values;
					if (e.length === 0) return;
					C.value.seconds === null ? ge(e[0]) : ge(e[(e.length + e.indexOf(C.value.second) + t) % e.length]);
				} else ge((60 + (C.value.second === null ? -t : C.value.second) + t) % 60);
			}
		}
		function me(e) {
			C.value.hour !== e && (C.value.hour = e, xe());
		}
		function he(e) {
			C.value.minute !== e && (C.value.minute = e, xe());
		}
		function ge(e) {
			C.value.second !== e && (C.value.second = e, xe());
		}
		let _e = {
			hour: me,
			minute: he,
			second: ge
		};
		function ve() {
			T.value || (T.value = !0, C.value.hour !== null && (C.value.hour -= 12, xe()));
		}
		function ye() {
			T.value && (T.value = !1, C.value.hour !== null && (C.value.hour += 12, xe()));
		}
		function be(t) {
			let n = e.modelValue;
			S.value !== t && n != null && n !== "" && typeof n != "string" && (S.value = t);
		}
		function xe() {
			if (M.value !== null && !M.value(C.value.hour)) {
				C.value = J_(), be("hour");
				return;
			}
			if (N.value !== null && !N.value(C.value.minute)) {
				C.value.minute = null, C.value.second = null, be("minute");
				return;
			}
			if (e.withSeconds && P.value !== null && !P.value(C.value.second)) {
				C.value.second = null, be("second");
				return;
			}
			C.value.hour === null || C.value.minute === null || e.withSeconds && C.value.second === null || Se();
		}
		function Se(t) {
			let r = {
				...C.value,
				...t
			}, i = e.calendar === "persian" ? pf(r.hour) + ":" + pf(r.minute) + (e.withSeconds ? ":" + pf(r.second) : "") : _v(new Date(r.year, r.month === null ? null : r.month - 1, r.day, r.hour, r.minute, r.second, r.millisecond), v.value, y.value, r.year, r.timezoneOffset);
			r.changed = i !== e.modelValue, n("update:modelValue", i, r);
		}
		function Ce() {
			let t = [
				_("div", {
					class: "q-time__link " + (S.value === "hour" ? "q-time__link--active" : "cursor-pointer"),
					tabindex: c.value,
					onClick: oe.hour,
					onKeyup: de
				}, O.value.hour),
				_("div", ":"),
				_("div", A.value ? {
					class: "q-time__link " + (S.value === "minute" ? "q-time__link--active" : "cursor-pointer"),
					tabindex: c.value,
					onKeyup: fe,
					onClick: oe.minute
				} : { class: "q-time__link" }, O.value.minute)
			];
			e.withSeconds && t.push(_("div", ":"), _("div", j.value ? {
				class: "q-time__link " + (S.value === "second" ? "q-time__link--active" : "cursor-pointer"),
				tabindex: c.value,
				onKeyup: pe,
				onClick: oe.second
			} : { class: "q-time__link" }, O.value.second));
			let n = [_("div", {
				class: "q-time__header-label row items-center no-wrap",
				dir: "ltr"
			}, t)];
			return E.value || n.push(_("div", { class: "q-time__header-ampm column items-between no-wrap" }, [_("div", {
				class: "q-time__link " + (T.value ? "q-time__link--active" : "cursor-pointer"),
				tabindex: c.value,
				onClick: ve,
				onKeyup: se
			}, "AM"), _("div", {
				class: "q-time__link " + (T.value ? "cursor-pointer" : "q-time__link--active"),
				tabindex: c.value,
				onClick: ye,
				onKeyup: ce
			}, "PM")])), _("div", { class: "q-time__header flex flex-center no-wrap " + l.value }, n);
		}
		function we() {
			let t = C.value[S.value];
			return _("div", { class: "q-time__content col relative-position" }, [_(a, { name: "q-transition--scale" }, () => _("div", {
				key: "clock" + S.value,
				class: "q-time__container-parent absolute-full"
			}, [_("div", {
				ref: g,
				class: "q-time__container-child fit overflow-hidden"
			}, [re(_("div", {
				class: "q-time__clock cursor-pointer non-selectable",
				onClick: le,
				onMousedown: ue
			}, [_("div", { class: "q-time__clock-circle fit" }, [_("div", {
				class: "q-time__clock-pointer" + (C.value[S.value] === null ? " hidden" : e.color === void 0 ? "" : ` text-${e.color}`),
				style: k.value
			}), B.value.map((e) => _("div", { class: `q-time__clock-position row flex-center q-time__clock-pos-${e.index}` + (e.val === t ? " q-time__clock-position--active " + l.value : e.disable ? " q-time__clock-position--disable" : "") }, [_("span", e.label)]))])]), V.value)])])), e.nowBtn ? _(Vp, {
				class: "q-time__now-button absolute",
				icon: i.iconSet.datetime.now,
				unelevated: !0,
				size: "sm",
				round: !0,
				color: e.color,
				textColor: e.textColor,
				tabindex: c.value,
				onClick: ee
			}) : null]);
		}
		return r.proxy.setNow = ee, () => {
			let n = [we()], r = $(t.default);
			return r !== void 0 && n.push(_("div", { class: "q-time__actions" }, r)), e.name !== void 0 && !e.disable && f(n, "push"), _("div", {
				class: D.value,
				tabindex: -1
			}, [Ce(), _("div", { class: "q-time__main col overflow-auto" }, n)]);
		};
	}
});
var kS = ["left", "right"], AS = [
	"dense",
	"comfortable",
	"loose"
];
Q({
	name: "QTimeline",
	props: {
		...qf,
		color: {
			type: String,
			default: "primary"
		},
		side: {
			type: String,
			default: "right",
			validator: (e) => kS.includes(e)
		},
		layout: {
			type: String,
			default: "dense",
			validator: (e) => AS.includes(e)
		}
	},
	setup(e, { slots: t }) {
		let n = Jf(e, h().proxy.$q);
		F(Gd, e);
		let r = o(() => `q-timeline q-timeline--${e.layout} q-timeline--${e.layout}--${e.side}` + (n.value ? " q-timeline--dark" : ""));
		return () => _("ul", { class: r.value }, $(t.default));
	}
}), Q({
	name: "QTimelineEntry",
	props: {
		heading: Boolean,
		tag: {
			type: String,
			default: "h3"
		},
		side: {
			type: String,
			default: "right",
			validator: (e) => ["left", "right"].includes(e)
		},
		icon: String,
		avatar: String,
		color: String,
		title: String,
		subtitle: String,
		body: String
	},
	setup(e, { slots: t }) {
		let n = y(Gd, $d);
		if (n === $d) return console.error("QTimelineEntry needs to be child of QTimeline"), $d;
		let r = o(() => `q-timeline__entry q-timeline__entry--${e.side}` + (e.icon !== void 0 || e.avatar !== void 0 ? " q-timeline__entry--icon" : "")), i = o(() => `q-timeline__dot text-${e.color || n.color}`), a = o(() => n.layout === "comfortable" && n.side === "left");
		return () => {
			let n = Df(t.default, []);
			if (e.body !== void 0 && n.unshift(e.body), e.heading) {
				let t = [
					_("div"),
					_("div"),
					_(e.tag, { class: "q-timeline__heading-title" }, n)
				];
				return _("div", { class: "q-timeline__heading" }, a.value ? t.reverse() : t);
			}
			let o;
			e.icon === void 0 ? e.avatar !== void 0 && (o = [_("img", {
				class: "q-timeline__dot-img",
				src: e.avatar
			})]) : o = [_(Gf, {
				class: "row items-center justify-center",
				name: e.icon
			})];
			let s = [
				_("div", { class: "q-timeline__subtitle" }, [_("span", {}, $(t.subtitle, [e.subtitle]))]),
				_("div", { class: i.value }, o),
				_("div", { class: "q-timeline__content" }, [_("h6", { class: "q-timeline__title" }, $(t.title, [e.title]))].concat(n))
			];
			return _("li", { class: r.value }, a.value ? s.reverse() : s);
		};
	}
}), Q({
	name: "QToolbar",
	props: { inset: Boolean },
	setup(e, { slots: t }) {
		let n = o(() => "q-toolbar row no-wrap items-center" + (e.inset ? " q-toolbar--inset" : ""));
		return () => _("div", {
			class: n.value,
			role: "toolbar"
		}, $(t.default));
	}
}), Q({
	name: "QToolbarTitle",
	props: { shrink: Boolean },
	setup(e, { slots: t }) {
		let n = o(() => "q-toolbar__title ellipsis" + (e.shrink ? " col-shrink" : ""));
		return () => _("div", { class: n.value }, $(t.default));
	}
});
var jS = [
	"none",
	"strict",
	"leaf",
	"leaf-filtered"
];
function MS(e) {
	if (e.icon !== void 0) return _(Gf, {
		class: "q-tree__icon q-mr-sm",
		name: e.icon,
		color: e.iconColor
	});
	let t = e.img || e.avatar;
	if (t) return _("img", {
		class: `q-tree__${e.img ? "img" : "avatar"} q-mr-sm`,
		src: t
	});
}
Q({
	name: "QTree",
	props: {
		...qf,
		nodes: {
			type: Array,
			required: !0
		},
		nodeKey: {
			type: String,
			required: !0
		},
		labelKey: {
			type: String,
			default: "label"
		},
		childrenKey: {
			type: String,
			default: "children"
		},
		dense: Boolean,
		color: String,
		controlColor: String,
		textColor: String,
		selectedColor: String,
		icon: String,
		tickStrategy: {
			type: String,
			default: "none",
			validator: (e) => jS.includes(e)
		},
		ticked: Array,
		expanded: Array,
		selected: {},
		noSelectionUnset: Boolean,
		defaultExpandAll: Boolean,
		accordion: Boolean,
		filter: String,
		filterMethod: Function,
		duration: {},
		noConnectors: Boolean,
		noTransition: Boolean,
		noNodesLabel: String,
		noResultsLabel: String
	},
	emits: [
		"update:expanded",
		"update:ticked",
		"update:selected",
		"lazyLoad",
		"afterShow",
		"afterHide"
	],
	setup(e, { slots: t, emit: n }) {
		let { proxy: r } = h(), { $q: i } = r, a = Jf(e, i), s = L({}), c = L(e.ticked || []), l = L(e.expanded || []), u = {};
		O(() => {
			u = {};
		});
		let d = o(() => `q-tree q-tree--${e.dense ? "dense" : "standard"}` + (e.noConnectors ? " q-tree--no-connectors" : "") + (a.value ? " q-tree--dark" : "") + (e.color === void 0 ? "" : ` text-${e.color}`)), f = o(() => e.selected !== void 0), p = o(() => e.icon || i.iconSet.tree.icon), m = o(() => e.controlColor || e.color), g = o(() => e.textColor === void 0 ? "" : ` text-${e.textColor}`), v = o(() => {
			let t = e.selectedColor || e.color;
			return t ? ` text-${t}` : "";
		}), y = o(() => e.filterMethod === void 0 ? (t, n) => {
			let r = n.toLowerCase();
			return t[e.labelKey] && t[e.labelKey].toLowerCase().includes(r);
		} : e.filterMethod), b = o(() => {
			let t = {}, n = (r, i) => {
				let a = r.tickStrategy || (i ? i.tickStrategy : e.tickStrategy), o = r[e.nodeKey], u = r[e.childrenKey] && Array.isArray(r[e.childrenKey]) && r[e.childrenKey].length !== 0, d = !r.disabled && f.value && r.selectable !== !1, p = !r.disabled && r.expandable !== !1, m = a !== "none", h = a === "strict", g = a === "leaf-filtered", _ = a === "leaf" || a === "leaf-filtered", v = !r.disabled && r.tickable !== !1;
				_ && v === !0 && i && i.tickable !== !0 && (v = !1);
				let b = r.lazy;
				b === !0 && s.value[o] !== void 0 && Array.isArray(r[e.childrenKey]) && (b = s.value[o]);
				let x = {
					key: o,
					parent: i,
					isParent: u,
					lazy: b,
					disabled: r.disabled,
					link: !r.disabled && (d || p && (u || b === !0)),
					children: [],
					matchesFilter: !e.filter || y.value(r, e.filter),
					selected: o === e.selected && d,
					selectable: d,
					expanded: u ? l.value.includes(o) : !1,
					expandable: p,
					noTick: r.noTick === !0 || !h && b && b !== "loaded",
					tickable: v,
					tickStrategy: a,
					hasTicking: m,
					strictTicking: h,
					leafFilteredTicking: g,
					leafTicking: _,
					ticked: (h || !u) && c.value.includes(o)
				};
				if (t[o] = x, u && (x.children = r[e.childrenKey].map((e) => n(e, x)), e.filter && (x.matchesFilter === !0 ? x.noTick !== !0 && x.disabled !== !0 && x.tickable === !0 && g && x.children.every((e) => e.matchesFilter !== !0 || e.noTick === !0 || e.tickable !== !0) && (x.tickable = !1) : x.matchesFilter = x.children.some((e) => e.matchesFilter)), x.matchesFilter === !0 && (x.noTick !== !0 && h !== !0 && x.children.every((e) => e.noTick) && (x.noTick = !0), _))) {
					if (x.ticked = !1, x.indeterminate = x.children.some((e) => e.indeterminate === !0), x.tickable = x.tickable === !0 && x.children.some((e) => e.tickable), x.indeterminate !== !0) {
						let e = x.children.reduce((e, t) => t.ticked === !0 ? e + 1 : e, 0);
						e === x.children.length ? x.ticked = !0 : e > 0 && (x.indeterminate = !0);
					}
					x.indeterminate === !0 && (x.indeterminateNextState = x.children.every((e) => e.tickable !== !0 || e.ticked !== !0));
				}
				return x;
			};
			return e.nodes.forEach((e) => n(e, null)), t;
		});
		G(() => e.ticked, (e) => {
			c.value = e;
		}), G(() => e.expanded, (e) => {
			l.value = e;
		});
		function x(t) {
			let n = (r, i) => {
				if (r || !i) return r;
				if (Array.isArray(i)) return i.reduce(n, r);
				if (i[e.nodeKey] === t) return i;
				if (i[e.childrenKey]) return n(null, i[e.childrenKey]);
			};
			return n(null, e.nodes);
		}
		function S() {
			return c.value.map((e) => x(e));
		}
		function C() {
			return l.value.map((e) => x(e));
		}
		function T(e) {
			return e && b.value[e] ? b.value[e].expanded : !1;
		}
		function E() {
			e.expanded === void 0 ? l.value = [] : n("update:expanded", []);
		}
		function D() {
			let t = [], r = (n) => {
				n[e.childrenKey] && n[e.childrenKey].length !== 0 && n.expandable !== !1 && n.disabled !== !0 && (t.push(n[e.nodeKey]), n[e.childrenKey].forEach(r));
			};
			e.nodes.forEach(r), e.expanded === void 0 ? l.value = t : n("update:expanded", t);
		}
		function k(t, r, i = x(t), a = b.value[t]) {
			if (a.lazy && a.lazy !== "loaded") {
				if (a.lazy === "loading") return;
				s.value[t] = "loading", Array.isArray(i[e.childrenKey]) || (i[e.childrenKey] = []), n("lazyLoad", {
					node: i,
					key: t,
					done: (n) => {
						s.value[t] = "loaded", i[e.childrenKey] = Array.isArray(n) ? n : [], w(() => {
							b.value[t]?.isParent === !0 && A(t, !0);
						});
					},
					fail: () => {
						delete s.value[t], i[e.childrenKey].length === 0 && delete i[e.childrenKey];
					}
				});
			} else a.isParent === !0 && a.expandable === !0 && A(t, r);
		}
		function A(t, r) {
			let i = l.value, a = e.expanded !== void 0;
			if (a && (i = [...i]), r) {
				if (e.accordion && b.value[t]) {
					let n = [];
					b.value[t].parent ? b.value[t].parent.children.forEach((e) => {
						e.key !== t && e.expandable === !0 && n.push(e.key);
					}) : e.nodes.forEach((r) => {
						let i = r[e.nodeKey];
						i !== t && n.push(i);
					}), n.length !== 0 && (i = i.filter((e) => !n.includes(e)));
				}
				i = [...i, t].filter((e, t, n) => n.indexOf(e) === t);
			} else i = i.filter((e) => e !== t);
			a ? n("update:expanded", i) : l.value = i;
		}
		function j(e) {
			return e && b.value[e] ? b.value[e].ticked : !1;
		}
		function M(t, r) {
			let i = c.value, a = e.ticked !== void 0;
			a && (i = [...i]), i = r ? [...i, ...t].filter((e, t, n) => n.indexOf(e) === t) : i.filter((e) => !t.includes(e)), a && n("update:ticked", i);
		}
		function N(t, n, i) {
			let o = {
				tree: r,
				node: t,
				key: i,
				color: e.color,
				dark: a.value
			};
			return id(o, "expanded", () => n.expanded, (e) => {
				e !== n.expanded && k(i, e);
			}), id(o, "ticked", () => n.ticked, (e) => {
				e !== n.ticked && M([i], e);
			}), o;
		}
		function P(t) {
			return (e.filter ? t.filter((t) => b.value[t[e.nodeKey]].matchesFilter) : t).map((e) => R(e));
		}
		function F() {
			n("afterShow");
		}
		function I() {
			n("afterHide");
		}
		function R(n) {
			let r = n[e.nodeKey], i = b.value[r], o = n.header && t[`header-${n.header}`] || t["default-header"], s = i.isParent === !0 ? P(n[e.childrenKey]) : [], c = s.length !== 0 || i.lazy && i.lazy !== "loaded", l = n.body && t[`body-${n.body}`] || t["default-body"], d = o !== void 0 || l !== void 0 ? N(n, i, r) : null;
			return l !== void 0 && (l = _("div", { class: "q-tree__node-body relative-position" }, [_("div", { class: g.value }, [l(d)])])), _("div", {
				key: r,
				class: `q-tree__node relative-position q-tree__node--${c ? "parent" : "child"}`
			}, [_("div", {
				class: "q-tree__node-header relative-position row no-wrap items-center" + (i.link === !0 ? " q-tree__node--link q-hoverable q-focusable" : "") + (i.selected === !0 ? " q-tree__node--selected" : "") + (i.disabled === !0 ? " q-tree__node--disabled" : ""),
				tabindex: i.link === !0 ? 0 : -1,
				ariaExpanded: s.length === 0 ? null : i.expanded,
				role: "treeitem",
				onClick: (e) => {
					B(n, i, e);
				},
				onKeypress(e) {
					Nd(e) !== !0 && (e.keyCode === 13 ? B(n, i, e, !0) : e.keyCode === 32 && V(n, i, e, !0));
				}
			}, [
				_("div", {
					class: "q-focus-helper",
					tabindex: -1,
					ref: (e) => {
						u[i.key] = e;
					}
				}),
				i.lazy === "loading" ? _(gp, {
					class: "q-tree__spinner",
					color: m.value
				}) : c ? _(Gf, {
					class: "q-tree__arrow" + (i.expanded === !0 ? " q-tree__arrow--rotate" : ""),
					name: p.value,
					onClick(e) {
						V(n, i, e);
					}
				}) : null,
				i.hasTicking === !0 && i.noTick !== !0 ? _(ig, {
					class: "q-tree__tickbox",
					modelValue: i.indeterminate === !0 ? null : i.ticked,
					color: m.value,
					dark: a.value,
					dense: !0,
					keepColor: !0,
					disable: i.tickable !== !0,
					onKeydown: wd,
					"onUpdate:modelValue": (e) => {
						ee(i, e);
					}
				}) : null,
				_("div", { class: "q-tree__node-header-content col row no-wrap items-center" + (i.selected === !0 ? v.value : g.value) }, [o ? o(d) : [MS(n), _("div", n[e.labelKey])]])
			]), c ? e.noTransition ? i.expanded === !0 ? _("div", {
				class: "q-tree__node-collapsible" + g.value,
				key: `${r}__q`
			}, [l, _("div", {
				class: "q-tree__children" + (i.disabled === !0 ? " q-tree__node--disabled" : ""),
				role: "group"
			}, s)]) : null : _(yy, {
				duration: e.duration,
				onShow: F,
				onHide: I
			}, () => re(_("div", {
				class: "q-tree__node-collapsible" + g.value,
				key: `${r}__q`
			}, [l, _("div", {
				class: "q-tree__children" + (i.disabled === !0 ? " q-tree__node--disabled" : ""),
				role: "group"
			}, s)]), [[ne, i.expanded]])) : l]);
		}
		function z(e) {
			u[e]?.focus();
		}
		function B(t, r, i, a) {
			a !== !0 && r.selectable !== !1 && z(r.key), f.value && r.selectable ? e.noSelectionUnset ? r.key !== e.selected && n("update:selected", r.key === void 0 ? null : r.key) : n("update:selected", r.key === e.selected ? null : r.key) : V(t, r, i, a), typeof t.handler == "function" && t.handler(t);
		}
		function V(e, t, n, r) {
			n !== void 0 && wd(n), r !== !0 && t.selectable !== !1 && z(t.key), k(t.key, !t.expanded, e, t);
		}
		function ee(e, t) {
			if (e.indeterminate === !0 && (t = e.indeterminateNextState), e.strictTicking) M([e.key], t);
			else if (e.leafTicking) {
				let n = [], r = (e) => {
					e.isParent ? (t !== !0 && e.noTick !== !0 && e.tickable === !0 && n.push(e.key), e.leafTicking === !0 && e.children.forEach(r)) : e.noTick !== !0 && e.tickable === !0 && (e.leafFilteredTicking !== !0 || e.matchesFilter === !0) && n.push(e.key);
				};
				r(e), M(n, t);
			}
		}
		return e.defaultExpandAll && D(), Object.assign(r, {
			getNodeByKey: x,
			getTickedNodes: S,
			getExpandedNodes: C,
			isExpanded: T,
			collapseAll: E,
			expandAll: D,
			setExpanded: k,
			isTicked: j,
			setTicked: M
		}), () => {
			let t = P(e.nodes);
			return _("div", {
				class: d.value,
				role: "tree"
			}, t.length === 0 ? e.filter ? e.noResultsLabel || i.lang.tree.noResults : e.noNodesLabel || i.lang.tree.noNodes : t);
		};
	}
});
function NS(e) {
	return (e * 100).toFixed(2) + "%";
}
var PS = {
	...qf,
	...Ky,
	label: String,
	color: String,
	textColor: String,
	square: Boolean,
	flat: Boolean,
	bordered: Boolean,
	noThumbnails: Boolean,
	thumbnailFit: {
		type: String,
		default: "cover"
	},
	autoUpload: Boolean,
	hideUploadBtn: Boolean,
	disable: Boolean,
	readonly: Boolean
}, FS = [
	...qy,
	"start",
	"finish",
	"added",
	"removed"
];
function IS(e, t) {
	let n = h(), { props: r, slots: i, emit: a, proxy: s } = n, { $q: c } = s, l = Jf(r, c);
	function u(e, t, n) {
		if (e.__status = t, t === "idle") {
			e.__uploaded = 0, e.__progress = 0, e.__sizeLabel = lf(e.size), e.__progressLabel = "0.00%";
			return;
		}
		if (t === "failed") {
			s.$forceUpdate();
			return;
		}
		e.__uploaded = t === "uploaded" ? e.size : n, e.__progress = t === "uploaded" ? 1 : Math.min(.9999, e.__uploaded / e.size), e.__progressLabel = NS(e.__progress), s.$forceUpdate();
	}
	let d = o(() => !r.disable && !r.readonly), f = L(!1), p = L(null), m = L(null), g = {
		files: L([]),
		queuedFiles: L([]),
		uploadedFiles: L([]),
		uploadedSize: L(0),
		updateFileStatus: u,
		isAlive: () => !rp(n)
	}, { pickFiles: v, addFiles: y, onDragover: b, onDragleave: S, processFiles: C, getDndNode: w, maxFilesNumber: T, maxTotalSizeNumber: E } = Jy({
		editable: d,
		dnd: f,
		getFileInput: H,
		addFilesToQueue: U
	});
	Object.assign(g, e({
		props: r,
		slots: i,
		emit: a,
		helpers: g,
		exposeApi: (e) => {
			Object.assign(g, e);
		}
	})), g.isBusy === void 0 && (g.isBusy = L(!1));
	let O = L(0), k = o(() => O.value === 0 ? 0 : g.uploadedSize.value / O.value), A = o(() => NS(k.value)), j = o(() => lf(O.value)), M = o(() => d.value && !g.isUploading.value && (r.multiple || g.queuedFiles.value.length === 0) && (r.maxFiles === void 0 || g.files.value.length < T.value) && (r.maxTotalSize === void 0 || O.value < E.value)), N = o(() => d.value && !g.isBusy.value && !g.isUploading.value && g.queuedFiles.value.length !== 0);
	F(Qd, re);
	let P = o(() => "q-uploader column no-wrap" + (l.value ? " q-uploader--dark q-dark" : "") + (r.bordered ? " q-uploader--bordered" : "") + (r.square ? " q-uploader--square no-border-radius" : "") + (r.flat ? " q-uploader--flat no-shadow" : "") + (r.disable ? " disabled q-uploader--disable" : "") + (f.value ? " q-uploader--dnd" : "")), I = o(() => "q-uploader__header" + (r.color === void 0 ? "" : ` bg-${r.color}`) + (r.textColor === void 0 ? "" : ` text-${r.textColor}`));
	G(g.isUploading, (e, t) => {
		!t && e ? a("start") : t && !e && a("finish");
	});
	function R() {
		r.disable || (g.abort(), g.uploadedSize.value = 0, O.value = 0, te(), g.files.value = [], g.queuedFiles.value = [], g.uploadedFiles.value = []);
	}
	function z() {
		r.disable || V(["uploaded"], () => {
			g.uploadedFiles.value = [];
		});
	}
	function B() {
		V(["idle", "failed"], ({ size: e }) => {
			O.value -= e, g.queuedFiles.value = [];
		});
	}
	function V(e, t) {
		if (r.disable) return;
		let n = {
			files: [],
			size: 0
		}, i = g.files.value.filter((t) => e.includes(t.__status) ? (n.size += t.size, n.files.push(t), t.__img !== void 0 && window.URL.revokeObjectURL(t.__img.src), !1) : !0);
		n.files.length !== 0 && (g.files.value = i, t(n), a("removed", n.files));
	}
	function ee(e) {
		r.disable || (e.__status === "uploaded" ? g.uploadedFiles.value = g.uploadedFiles.value.filter((t) => t.__key !== e.__key) : e.__status === "uploading" ? e.__abort() : O.value -= e.size, g.files.value = g.files.value.filter((t) => t.__key === e.__key ? (t.__img !== void 0 && window.URL.revokeObjectURL(t.__img.src), !1) : !0), g.queuedFiles.value = g.queuedFiles.value.filter((t) => t.__key !== e.__key), a("removed", [e]));
	}
	function te() {
		g.files.value.forEach((e) => {
			e.__img !== void 0 && window.URL.revokeObjectURL(e.__img.src);
		});
	}
	function H() {
		return m.value || p.value.getElementsByClassName("q-uploader__input")[0];
	}
	function U(e, t) {
		let n = C(e, t, g.files.value, !0), i = H();
		i != null && (i.value = ""), n !== void 0 && (n.forEach((e) => {
			if (g.updateFileStatus(e, "idle"), O.value += e.size, !r.noThumbnails && e.type.toUpperCase().startsWith("IMAGE")) {
				let t = new Image();
				t.src = window.URL.createObjectURL(e), e.__img = t;
			}
		}), g.files.value.push(...n), g.queuedFiles.value.push(...n), a("added", n), r.autoUpload && g.upload());
	}
	function W() {
		N.value && g.upload();
	}
	function ne(e, t, n) {
		if (e) {
			let e = {
				type: "a",
				key: t,
				icon: c.iconSet.uploader[t],
				flat: !0,
				dense: !0
			}, r;
			return t === "add" ? (e.onClick = v, r = re) : e.onClick = n, _(Vp, e, r);
		}
	}
	function re() {
		return _("input", {
			ref: m,
			class: "q-uploader__input overflow-hidden absolute-full",
			tabindex: -1,
			type: "file",
			title: "",
			accept: r.accept,
			multiple: r.multiple ? "multiple" : void 0,
			capture: r.capture,
			onMousedown: Sd,
			onClick: v,
			onChange: U
		});
	}
	function ie() {
		return i.header === void 0 ? [_("div", { class: "q-uploader__header-content column" }, [_("div", { class: "flex flex-center no-wrap q-gutter-xs" }, [
			ne(g.queuedFiles.value.length !== 0, "removeQueue", B),
			ne(g.uploadedFiles.value.length !== 0, "removeUploaded", z),
			g.isUploading.value ? _(gp, { class: "q-uploader__spinner" }) : null,
			_("div", { class: "col column justify-center" }, [r.label === void 0 ? null : _("div", { class: "q-uploader__title" }, [r.label]), _("div", { class: "q-uploader__subtitle" }, [j.value + " / " + A.value])]),
			ne(M.value, "add"),
			ne(!r.hideUploadBtn && N.value, "upload", g.upload),
			ne(g.isUploading.value, "clear", g.abort)
		])])] : i.header(ae);
	}
	function K() {
		return i.list === void 0 ? g.files.value.map((e) => _("div", {
			key: e.__key,
			class: "q-uploader__file relative-position" + (!r.noThumbnails && e.__img !== void 0 ? " q-uploader__file--img" : "") + (e.__status === "failed" ? " q-uploader__file--failed" : e.__status === "uploaded" ? " q-uploader__file--uploaded" : ""),
			style: !r.noThumbnails && e.__img !== void 0 ? {
				backgroundImage: "url(\"" + e.__img.src + "\")",
				backgroundSize: r.thumbnailFit
			} : null
		}, [_("div", { class: "q-uploader__file-header row flex-center no-wrap" }, [
			e.__status === "failed" ? _(Gf, {
				class: "q-uploader__file-status",
				name: c.iconSet.type.negative,
				color: "negative"
			}) : null,
			_("div", { class: "q-uploader__file-header-content col" }, [_("div", { class: "q-uploader__title" }, [e.name]), _("div", { class: "q-uploader__subtitle row items-center no-wrap" }, [e.__sizeLabel + " / " + e.__progressLabel])]),
			e.__status === "uploading" ? _(fg, {
				value: e.__progress,
				min: 0,
				max: 1,
				indeterminate: e.__progress === 0
			}) : _(Vp, {
				round: !0,
				dense: !0,
				flat: !0,
				icon: c.iconSet.uploader[e.__status === "uploaded" ? "done" : "clear"],
				onClick: () => {
					ee(e);
				}
			})
		])])) : i.list(ae);
	}
	D(() => {
		g.isUploading.value && g.abort(), g.files.value.length !== 0 && te();
	});
	let ae = {};
	for (let e in g) x(g[e]) ? id(ae, e, () => g[e].value) : ae[e] = g[e];
	return Object.assign(ae, {
		upload: W,
		reset: R,
		removeUploadedFiles: z,
		removeQueuedFiles: B,
		removeFile: ee,
		pickFiles: v,
		addFiles: y
	}), ad(ae, {
		canAddFiles: () => M.value,
		canUpload: () => N.value,
		uploadSizeLabel: () => j.value,
		uploadProgressLabel: () => A.value
	}), t({
		...g,
		upload: W,
		reset: R,
		removeUploadedFiles: z,
		removeQueuedFiles: B,
		removeFile: ee,
		pickFiles: v,
		addFiles: y,
		canAddFiles: M,
		canUpload: N,
		uploadSizeLabel: j,
		uploadProgressLabel: A
	}), () => {
		let e = [
			_("div", { class: I.value }, ie()),
			_("div", { class: "q-uploader__list scroll" }, K()),
			w("uploader")
		];
		g.isBusy.value && e.push(_("div", { class: "q-uploader__overlay absolute-full flex flex-center" }, [_(gp)]));
		let t = {
			ref: p,
			class: P.value
		};
		return M.value && Object.assign(t, {
			onDragover: b,
			onDragleave: S
		}), _("div", t, e);
	};
}
var LS = () => !0;
function RS(e) {
	let t = {};
	return e.forEach((e) => {
		t[e] = LS;
	}), t;
}
var zS = RS(FS);
function BS({ name: e, props: t, emits: n, injectPlugin: r }) {
	return Q({
		name: e,
		props: {
			...PS,
			...t
		},
		emits: tf(n) ? {
			...zS,
			...n
		} : [...FS, ...n],
		setup(e, { expose: t }) {
			return IS(r, t);
		}
	});
}
function VS(e) {
	return typeof e == "function" ? e : () => e;
}
var HS = "QUploader", US = {
	url: [Function, String],
	method: {
		type: [Function, String],
		default: "POST"
	},
	fieldName: {
		type: [Function, String],
		default: () => (e) => e.name
	},
	headers: [Function, Array],
	formFields: [Function, Array],
	withCredentials: [Function, Boolean],
	sendRaw: [Function, Boolean],
	batch: [Function, Boolean],
	factory: Function
}, WS = [
	"factoryFailed",
	"uploaded",
	"failed",
	"uploading"
];
function GS({ props: e, emit: t, helpers: n }) {
	let r = L([]), i = L([]), a = L(0), s = o(() => ({
		url: VS(e.url),
		method: VS(e.method),
		headers: VS(e.headers),
		formFields: VS(e.formFields),
		fieldName: VS(e.fieldName),
		withCredentials: VS(e.withCredentials),
		sendRaw: VS(e.sendRaw),
		batch: VS(e.batch)
	})), c = o(() => a.value > 0), l = o(() => i.value.length !== 0), u;
	function d() {
		r.value.forEach((e) => {
			e.abort();
		}), i.value.length !== 0 && (u = !0);
	}
	function f() {
		let e = [...n.queuedFiles.value];
		n.queuedFiles.value = [], s.value.batch(e) ? p(e) : e.forEach((e) => {
			p([e]);
		});
	}
	function p(r) {
		if (a.value++, typeof e.factory != "function") {
			m(r, {});
			return;
		}
		let o = e.factory(r);
		if (!o) t("factoryFailed", /* @__PURE__ */ Error("QUploader: factory() does not return properly"), r), a.value--;
		else if (typeof o.catch == "function" && typeof o.then == "function") {
			i.value.push(o);
			let e = (e) => {
				n.isAlive() && (i.value = i.value.filter((e) => e !== o), i.value.length === 0 && (u = !1), n.queuedFiles.value.push(...r), r.forEach((e) => {
					n.updateFileStatus(e, "failed");
				}), t("factoryFailed", e, r), a.value--);
			};
			o.then((t) => {
				u ? e(/* @__PURE__ */ Error("Aborted")) : n.isAlive() && (i.value = i.value.filter((e) => e !== o), m(r, t));
			}).catch(e);
		} else m(r, o || {});
	}
	function m(e, i) {
		let o = new FormData(), c = new XMLHttpRequest(), l = (e, t) => i[e] === void 0 ? s.value[e](t) : VS(i[e])(t), u = l("url", e);
		if (!u) {
			console.error("q-uploader: invalid or no URL specified"), a.value--;
			return;
		}
		let d = l("formFields", e);
		d !== void 0 && d.forEach((e) => {
			o.append(e.name, e.value);
		});
		let f = 0, p = 0, m = 0, h = 0, g;
		c.upload.addEventListener("progress", (t) => {
			if (g) return;
			let r = Math.min(h, t.loaded);
			n.uploadedSize.value += r - m, m = r;
			let i = m - p;
			for (let t = f; i > 0 && t < e.length; t++) {
				let r = e[t];
				if (i > r.size) i -= r.size, f++, p += r.size, n.updateFileStatus(r, "uploading", r.size);
				else {
					n.updateFileStatus(r, "uploading", i);
					return;
				}
			}
		}, !1), c.addEventListener("readystatechange", () => {
			c.readyState < 4 || (c.status && c.status < 400 ? (n.uploadedFiles.value.push(...e), e.forEach((e) => {
				n.updateFileStatus(e, "uploaded");
			}), t("uploaded", {
				files: e,
				xhr: c
			})) : (g = !0, n.uploadedSize.value -= m, n.queuedFiles.value.push(...e), e.forEach((e) => {
				n.updateFileStatus(e, "failed");
			}), t("failed", {
				files: e,
				xhr: c
			})), a.value--, r.value = r.value.filter((e) => e !== c));
		}), c.open(l("method", e), u), l("withCredentials", e) === !0 && (c.withCredentials = !0);
		let _ = l("headers", e);
		_ !== void 0 && _.forEach((e) => {
			c.setRequestHeader(e.name, e.value);
		});
		let v = l("sendRaw", e);
		e.forEach((e) => {
			n.updateFileStatus(e, "uploading", 0), v !== !0 && o.append(l("fieldName", e), e, e.name), e.xhr = c, e.__abort = () => {
				c.abort();
			}, h += e.size;
		}), t("uploading", {
			files: e,
			xhr: c
		}), r.value.push(c), v === !0 ? c.send(new Blob(e)) : c.send(o);
	}
	return {
		isUploading: c,
		isBusy: l,
		abort: d,
		upload: f
	};
}
BS({
	name: HS,
	props: US,
	emits: WS,
	injectPlugin: GS
}), Q({
	name: "QUploaderAddTrigger",
	setup() {
		let e = y(Qd, $d);
		return e === $d && console.error("QUploaderAddTrigger needs to be child of QUploader"), e;
	}
}), Q({
	name: "QVideo",
	props: {
		...eb,
		src: {
			type: String,
			required: !0
		},
		title: String,
		fetchpriority: {
			type: String,
			default: "auto"
		},
		loading: {
			type: String,
			default: "eager"
		},
		referrerpolicy: {
			type: String,
			default: "strict-origin-when-cross-origin"
		}
	},
	setup(e) {
		let t = tb(e), n = o(() => "q-video" + (e.ratio === void 0 ? "" : " q-video--responsive"));
		return () => _("div", {
			class: n.value,
			style: t.value
		}, [_("iframe", {
			src: e.src,
			title: e.title,
			fetchpriority: e.fetchpriority,
			loading: e.loading,
			referrerpolicy: e.referrerpolicy,
			frameborder: "0",
			allowfullscreen: !0
		})]);
	}
});
function KS(e) {
	return e === !1 ? 0 : e === !0 || e === void 0 ? 1 : Number.parseInt(e, 10) || 0;
}
gd({
	name: "close-popup",
	beforeMount(e, { value: t }) {
		let n = {
			depth: KS(t),
			handler(t) {
				n.depth !== 0 && setTimeout(() => {
					let r = Qp(e);
					r !== void 0 && em(r, t, n.depth);
				});
			},
			handlerKey(e) {
				Pd(e, 13) && n.handler(e);
			}
		};
		e.__qclosepopup = n, e.addEventListener("click", n.handler), e.addEventListener("keyup", n.handlerKey);
	},
	updated(e, { value: t, oldValue: n }) {
		t !== n && (e.__qclosepopup.depth = KS(t));
	},
	beforeUnmount(e) {
		let t = e.__qclosepopup;
		e.removeEventListener("click", t.handler), e.removeEventListener("keyup", t.handlerKey), delete e.__qclosepopup;
	}
});
var qS = 0, JS = void 0;
function YS() {
	return !1;
}
function XS(e, t) {
	JS === void 0 && (JS = document.createElement("div"), JS.style.cssText = "position: absolute; left: 0; top: 0", document.body.append(JS));
	let n = e.getBoundingClientRect(), r = JS.getBoundingClientRect(), { marginLeft: i, marginRight: a, marginTop: o, marginBottom: s } = window.getComputedStyle(e), c = Number.parseInt(i, 10) + Number.parseInt(a, 10), l = Number.parseInt(o, 10) + Number.parseInt(s, 10);
	return {
		left: n.left - r.left,
		top: n.top - r.top,
		width: n.right - n.left,
		height: n.bottom - n.top,
		widthM: n.right - n.left + (t ? 0 : c),
		heightM: n.bottom - n.top + (t ? 0 : l),
		marginH: t ? c : 0,
		marginV: t ? l : 0
	};
}
function ZS(e) {
	return {
		width: e.scrollWidth,
		height: e.scrollHeight
	};
}
var QS = [
	"Top",
	"Right",
	"Bottom",
	"Left"
], $S = [
	"borderTopLeftRadius",
	"borderTopRightRadius",
	"borderBottomRightRadius",
	"borderBottomLeftRadius"
], eC = /-block|-inline|block-|inline-/, tC = /(-block|-inline|block-|inline-).*:/;
function nC(e, t) {
	let n = window.getComputedStyle(e), r = {};
	for (let e = 0; e < t.length; e++) {
		let i = t[e];
		if (n[i] === "") if (i === "cssText") {
			let e = n.length, t = "";
			for (let r = 0; r < e; r++) eC.test(n[r]) || (t += n[r] + ": " + n[n[r]] + "; ");
			r[i] = t;
		} else if ([
			"borderWidth",
			"borderStyle",
			"borderColor"
		].includes(i)) {
			let e = i.replace("border", ""), t = "";
			for (let r = 0; r < QS.length; r++) {
				let i = "border" + QS[r] + e;
				t += n[i] + " ";
			}
			r[i] = t;
		} else if (i === "borderRadius") {
			let e = "", t = "";
			for (let r = 0; r < $S.length; r++) {
				let i = n[$S[r]].split(" ");
				e += i[0] + " ", t += (i[1] === void 0 ? i[0] : i[1]) + " ";
			}
			r[i] = e + "/ " + t;
		} else r[i] = n[i];
		else i === "cssText" ? r[i] = n[i].split(";").filter((e) => !tC.test(e)).join(";") : r[i] = n[i];
	}
	return r;
}
var rC = [
	"absolute",
	"fixed",
	"relative",
	"sticky"
];
function iC(e) {
	let t = e, n = 0;
	for (; t !== null && t !== document;) {
		let { position: r, zIndex: i } = window.getComputedStyle(t), a = Number(i);
		a > n && (t === e || rC.includes(r)) && (n = a), t = t.parentNode;
	}
	return n;
}
function aC(e) {
	return {
		from: e.from,
		to: e.to === void 0 ? e.from : e.to
	};
}
function oC(e, t) {
	let n = Number.parseFloat(e);
	return Number.isFinite(n) ? Math.max(0, Math.min(1, n)) : t;
}
function sC(e) {
	typeof e == "number" ? e = { duration: e } : typeof e == "function" && (e = { onEnd: e });
	let t = Number.parseInt(e.duration, 10), n = Number.parseInt(e.delay, 10);
	return {
		...e,
		waitFor: e.waitFor === void 0 ? 0 : e.waitFor,
		duration: Number.isNaN(t) ? 300 : t,
		delay: Number.isNaN(n) ? 0 : n,
		easing: typeof e.easing == "string" && e.easing.length !== 0 ? e.easing : "ease-in-out",
		fill: typeof e.fill == "string" && e.fill.length !== 0 ? e.fill : "none",
		resize: e.resize === !0,
		useCSS: e.useCSS === !0 || e.usecss === !0,
		hideFromClone: e.hideFromClone === !0 || e.hidefromclone === !0,
		keepToClone: e.keepToClone === !0 || e.keeptoclone === !0,
		tween: e.tween === !0,
		tweenFromOpacity: oC(e.tweenFromOpacity, .6),
		tweenToOpacity: oC(e.tweenToOpacity, .5)
	};
}
function cC(e) {
	let t = typeof e;
	return t === "function" ? e() : t === "string" ? document.querySelector(e) : e;
}
function lC(e) {
	return e && e.ownerDocument === document && e.parentNode !== null;
}
function uC(e) {
	let t = YS, n = !1, r = !0, i = aC(e), a = sC(e), o = cC(i.from);
	if (!lC(o)) return t;
	typeof o.qMorphCancel == "function" && o.qMorphCancel();
	let s, c, l, u, d = o.parentNode, f = o.nextElementSibling, p = XS(o, a.resize), { width: m, height: h } = ZS(d), { borderWidth: g, borderStyle: _, borderColor: v, borderRadius: y, backgroundColor: b, transform: x, position: S, cssText: C } = nC(o, [
		"borderWidth",
		"borderStyle",
		"borderColor",
		"borderRadius",
		"backgroundColor",
		"transform",
		"position",
		"cssText"
	]), w = o.classList.toString(), T = o.style.cssText, E = o.cloneNode(!0), D = a.tween === !0 ? o.cloneNode(!0) : void 0;
	return D !== void 0 && (D.className = D.classList.toString().split(" ").filter((e) => !e.startsWith("bg-")).join(" ")), a.hideFromClone === !0 && E.classList.add("q-morph--internal"), E.setAttribute("aria-hidden", "true"), E.style.transition = "none", E.style.animation = "none", E.style.pointerEvents = "none", d.insertBefore(E, f), o.qMorphCancel = () => {
		n = !0, E.remove(), D?.remove(), a.hideFromClone === !0 && E.classList.remove("q-morph--internal"), o.qMorphCancel = void 0;
	}, typeof e.onToggle == "function" && e.onToggle(), requestAnimationFrame(() => {
		let e = cC(i.to);
		if (n === !0 || !lC(e)) {
			typeof o.qMorphCancel == "function" && o.qMorphCancel();
			return;
		}
		o !== e && typeof e.qMorphCancel == "function" && e.qMorphCancel(), a.keepToClone !== !0 && e.classList.add("q-morph--internal"), E.classList.add("q-morph--internal");
		let { width: f, height: O } = ZS(d), { width: k, height: A } = ZS(e.parentNode);
		a.hideFromClone !== !0 && E.classList.remove("q-morph--internal"), e.qMorphCancel = () => {
			n = !0, E.remove(), D?.remove(), a.hideFromClone === !0 && E.classList.remove("q-morph--internal"), a.keepToClone !== !0 && e.classList.remove("q-morph--internal"), o.qMorphCancel = void 0, e.qMorphCancel = void 0;
		};
		let j = () => {
			if (n === !0) {
				typeof e.qMorphCancel == "function" && e.qMorphCancel();
				return;
			}
			a.hideFromClone !== !0 && (E.classList.add("q-morph--internal"), E.innerHTML = "", E.style.left = 0, E.style.right = "unset", E.style.top = 0, E.style.bottom = "unset", E.style.transform = "none"), a.keepToClone !== !0 && e.classList.remove("q-morph--internal");
			let i = e.parentNode, { width: j, height: M } = ZS(i), N = e.cloneNode(a.keepToClone);
			N.setAttribute("aria-hidden", "true"), a.keepToClone !== !0 && (N.style.left = 0, N.style.right = "unset", N.style.top = 0, N.style.bottom = "unset", N.style.transform = "none", N.style.pointerEvents = "none"), N.classList.add("q-morph--internal");
			let P = e === o && d === i ? E : e.nextElementSibling;
			i.insertBefore(N, P);
			let { borderWidth: F, borderStyle: I, borderColor: L, borderRadius: R, backgroundColor: z, transform: B, position: V, cssText: ee } = nC(e, [
				"borderWidth",
				"borderStyle",
				"borderColor",
				"borderRadius",
				"backgroundColor",
				"transform",
				"position",
				"cssText"
			]), te = e.classList.toString(), H = e.style.cssText;
			e.style.cssText = ee, e.style.transform = "none", e.style.animation = "none", e.style.transition = "none", e.className = te.split(" ").filter((e) => !e.startsWith("bg-")).join(" ");
			let U = XS(e, a.resize), W = p.left - U.left, ne = p.top - U.top, G = p.width / (U.width > 0 ? U.width : 10), re = p.height / (U.height > 0 ? U.height : 100), ie = m - f, K = h - O, ae = j - k, oe = M - A, se = Math.max(p.widthM, ie), ce = Math.max(p.heightM, K), le = Math.max(U.widthM, ae), ue = Math.max(U.heightM, oe), de = o === e && !["absolute", "fixed"].includes(V) && !["absolute", "fixed"].includes(S), fe = V === "fixed", pe = i;
			for (; !fe && pe !== document;) fe = window.getComputedStyle(pe).position === "fixed", pe = pe.parentNode;
			if (a.hideFromClone !== !0 && (E.style.display = "block", E.style.flex = "0 0 auto", E.style.opacity = 0, E.style.minWidth = "unset", E.style.maxWidth = "unset", E.style.minHeight = "unset", E.style.maxHeight = "unset", E.classList.remove("q-morph--internal")), a.keepToClone !== !0 && (N.style.display = "block", N.style.flex = "0 0 auto", N.style.opacity = 0, N.style.minWidth = "unset", N.style.maxWidth = "unset", N.style.minHeight = "unset", N.style.maxHeight = "unset"), N.classList.remove("q-morph--internal"), typeof a.classes == "string" && (e.className += " " + a.classes), typeof a.style == "string") e.style.cssText += " " + a.style;
			else if (tf(a.style)) for (let t in a.style) e.style[t] = a.style[t];
			let me = iC(E), he = iC(e), ge = fe ? document.documentElement : {
				scrollLeft: 0,
				scrollTop: 0
			};
			e.style.position = fe ? "fixed" : "absolute", e.style.left = `${U.left - ge.scrollLeft}px`, e.style.right = "unset", e.style.top = `${U.top - ge.scrollTop}px`, e.style.margin = 0, a.resize === !0 && (e.style.minWidth = "unset", e.style.maxWidth = "unset", e.style.minHeight = "unset", e.style.maxHeight = "unset", e.style.overflow = "hidden", e.style.overflowX = "hidden", e.style.overflowY = "hidden"), document.body.append(e), D !== void 0 && (D.style.cssText = C, D.style.transform = "none", D.style.animation = "none", D.style.transition = "none", D.style.position = e.style.position, D.style.left = `${p.left - ge.scrollLeft}px`, D.style.right = "unset", D.style.top = `${p.top - ge.scrollTop}px`, D.style.margin = 0, D.style.pointerEvents = "none", a.resize === !0 && (D.style.minWidth = "unset", D.style.maxWidth = "unset", D.style.minHeight = "unset", D.style.maxHeight = "unset", D.style.overflow = "hidden", D.style.overflowX = "hidden", D.style.overflowY = "hidden"), document.body.append(D));
			let _e = (n) => {
				o === e && r !== !0 ? (e.style.cssText = T, e.className = w) : (e.style.cssText = H, e.className = te), N.parentNode === i && N.before(e), E.remove(), N.remove(), D?.remove(), t = YS, o.qMorphCancel = void 0, e.qMorphCancel = void 0, typeof a.onEnd == "function" && a.onEnd(r === !0 ? "to" : "from", n === !0);
			};
			if (a.useCSS !== !0 && typeof e.animate == "function") {
				let i = a.resize === !0 ? {
					transform: `translate(${W}px, ${ne}px)`,
					width: `${se}px`,
					height: `${ce}px`
				} : { transform: `translate(${W}px, ${ne}px) scale(${G}, ${re})` }, d = a.resize === !0 ? {
					width: `${le}px`,
					height: `${ue}px`
				} : {}, f = a.resize === !0 ? {
					width: `${se}px`,
					height: `${ce}px`
				} : {}, m = a.resize === !0 ? {
					transform: `translate(${-1 * W}px, ${-1 * ne}px)`,
					width: `${le}px`,
					height: `${ue}px`
				} : { transform: `translate(${-1 * W}px, ${-1 * ne}px) scale(${1 / G}, ${1 / re})` }, h = D === void 0 ? { backgroundColor: b } : { opacity: a.tweenToOpacity }, S = D === void 0 ? { backgroundColor: z } : { opacity: 1 };
				u = e.animate([{
					margin: 0,
					borderWidth: g,
					borderStyle: _,
					borderColor: v,
					borderRadius: y,
					zIndex: me,
					transformOrigin: "0 0",
					...i,
					...h
				}, {
					margin: 0,
					borderWidth: F,
					borderStyle: I,
					borderColor: L,
					borderRadius: R,
					zIndex: he,
					transformOrigin: "0 0",
					transform: B,
					...d,
					...S
				}], {
					duration: a.duration,
					easing: a.easing,
					fill: a.fill,
					delay: a.delay
				}), c = D === void 0 ? void 0 : D.animate([{
					opacity: a.tweenFromOpacity,
					margin: 0,
					borderWidth: g,
					borderStyle: _,
					borderColor: v,
					borderRadius: y,
					zIndex: me,
					transformOrigin: "0 0",
					transform: x,
					...f
				}, {
					opacity: 0,
					margin: 0,
					borderWidth: F,
					borderStyle: I,
					borderColor: L,
					borderRadius: R,
					zIndex: he,
					transformOrigin: "0 0",
					...m
				}], {
					duration: a.duration,
					easing: a.easing,
					fill: a.fill,
					delay: a.delay
				}), s = a.hideFromClone === !0 || de === !0 ? void 0 : E.animate([{
					margin: `${K < 0 ? K / 2 : 0}px ${ie < 0 ? ie / 2 : 0}px`,
					width: `${se + p.marginH}px`,
					height: `${ce + p.marginV}px`
				}, {
					margin: 0,
					width: 0,
					height: 0
				}], {
					duration: a.duration,
					easing: a.easing,
					fill: a.fill,
					delay: a.delay
				}), l = a.keepToClone === !0 ? void 0 : N.animate([de === !0 ? {
					margin: `${K < 0 ? K / 2 : 0}px ${ie < 0 ? ie / 2 : 0}px`,
					width: `${se + p.marginH}px`,
					height: `${ce + p.marginV}px`
				} : {
					margin: 0,
					width: 0,
					height: 0
				}, {
					margin: `${oe < 0 ? oe / 2 : 0}px ${ae < 0 ? ae / 2 : 0}px`,
					width: `${le + U.marginH}px`,
					height: `${ue + U.marginV}px`
				}], {
					duration: a.duration,
					easing: a.easing,
					fill: a.fill,
					delay: a.delay
				});
				let C = (e) => {
					s?.cancel(), c?.cancel(), l?.cancel(), u.cancel(), u.removeEventListener("finish", C), u.removeEventListener("cancel", C), _e(e), s = void 0, c = void 0, l = void 0, u = void 0;
				};
				o.qMorphCancel = () => {
					o.qMorphCancel = void 0, n = !0, C();
				}, e.qMorphCancel = () => {
					e.qMorphCancel = void 0, n = !0, C();
				}, u.addEventListener("finish", C), u.addEventListener("cancel", C), t = (e) => n === !0 || u === void 0 ? !1 : e === !0 ? (C(!0), !0) : (r = r !== !0, s?.reverse(), c?.reverse(), l?.reverse(), u.reverse(), !0);
			} else {
				let i = `q-morph-anim-${++qS}`, s = document.createElement("style"), c = a.resize === !0 ? `
            transform: translate(${W}px, ${ne}px);
            width: ${se}px;
            height: ${ce}px;
          ` : `transform: translate(${W}px, ${ne}px) scale(${G}, ${re});`, l = a.resize === !0 ? `
            width: ${le}px;
            height: ${ue}px;
          ` : "", u = a.resize === !0 ? `
            width: ${se}px;
            height: ${ce}px;
          ` : "", d = a.resize === !0 ? `
            transform: translate(${-1 * W}px, ${-1 * ne}px);
            width: ${le}px;
            height: ${ue}px;
          ` : `transform: translate(${-1 * W}px, ${-1 * ne}px) scale(${1 / G}, ${1 / re});`, f = D === void 0 ? `background-color: ${b};` : `opacity: ${a.tweenToOpacity};`, m = D === void 0 ? `background-color: ${z};` : "opacity: 1;", h = D === void 0 ? "" : `
            @keyframes ${i}-from-tween {
              0% {
                opacity: ${a.tweenFromOpacity};
                margin: 0;
                border-width: ${g};
                border-style: ${_};
                border-color: ${v};
                border-radius: ${y};
                z-index: ${me};
                transform-origin: 0 0;
                transform: ${x};
                ${u}
              }

              100% {
                opacity: 0;
                margin: 0;
                border-width: ${F};
                border-style: ${I};
                border-color: ${L};
                border-radius: ${R};
                z-index: ${he};
                transform-origin: 0 0;
                ${d}
              }
            }
          `, S = a.hideFromClone === !0 || de === !0 ? "" : `
            @keyframes ${i}-from {
              0% {
                margin: ${K < 0 ? K / 2 : 0}px ${ie < 0 ? ie / 2 : 0}px;
                width: ${se + p.marginH}px;
                height: ${ce + p.marginV}px;
              }

              100% {
                margin: 0;
                width: 0;
                height: 0;
              }
            }
          `, C = de === !0 ? `
            margin: ${K < 0 ? K / 2 : 0}px ${ie < 0 ? ie / 2 : 0}px;
            width: ${se + p.marginH}px;
            height: ${ce + p.marginV}px;
          ` : "\n            margin: 0;\n            width: 0;\n            height: 0;\n          ", w = a.keepToClone === !0 ? "" : `
            @keyframes ${i}-to {
              0% {
                ${C}
              }

              100% {
                margin: ${oe < 0 ? oe / 2 : 0}px ${ae < 0 ? ae / 2 : 0}px;
                width: ${le + U.marginH}px;
                height: ${ue + U.marginV}px;
              }
            }
          `;
				s.innerHTML = `
          @keyframes ${i} {
            0% {
              margin: 0;
              border-width: ${g};
              border-style: ${_};
              border-color: ${v};
              border-radius: ${y};
              background-color: ${b};
              z-index: ${me};
              transform-origin: 0 0;
              ${c}
              ${f}
            }

            100% {
              margin: 0;
              border-width: ${F};
              border-style: ${I};
              border-color: ${L};
              border-radius: ${R};
              background-color: ${z};
              z-index: ${he};
              transform-origin: 0 0;
              transform: ${B};
              ${l}
              ${m}
            }
          }

          ${S}

          ${h}

          ${w}
        `, document.head.append(s);
				let T = "normal";
				E.style.animation = `${a.duration}ms ${a.easing} ${a.delay}ms ${T} ${a.fill} ${i}-from`, D !== void 0 && (D.style.animation = `${a.duration}ms ${a.easing} ${a.delay}ms ${T} ${a.fill} ${i}-from-tween`), N.style.animation = `${a.duration}ms ${a.easing} ${a.delay}ms ${T} ${a.fill} ${i}-to`, e.style.animation = `${a.duration}ms ${a.easing} ${a.delay}ms ${T} ${a.fill} ${i}`;
				let O = (t) => {
					t === Object(t) && t.animationName !== i || (e.removeEventListener("animationend", O), e.removeEventListener("animationcancel", O), _e(), s.remove());
				};
				o.qMorphCancel = () => {
					o.qMorphCancel = void 0, n = !0, O();
				}, e.qMorphCancel = () => {
					e.qMorphCancel = void 0, n = !0, O();
				}, e.addEventListener("animationend", O), e.addEventListener("animationcancel", O), t = (t) => n === !0 || !e || !E || !N ? !1 : t === !0 ? (O(), !0) : (r = r !== !0, T = T === "normal" ? "reverse" : "normal", E.style.animationDirection = T, D.style.animationDirection = T, N.style.animationDirection = T, e.style.animationDirection = T, !0);
			}
		};
		a.waitFor > 0 || a.waitFor === "transitionend" || a.waitFor === Object(a.waitFor) && typeof a.waitFor.then == "function" ? (a.waitFor > 0 ? new Promise((e) => {
			setTimeout(e, a.waitFor);
		}) : a.waitFor === "transitionend" ? new Promise((t) => {
			let n = () => {
				r !== null && (clearTimeout(r), r = null), e && (e.removeEventListener("transitionend", n), e.removeEventListener("transitioncancel", n)), t?.(), t = null;
			}, r = setTimeout(n, 400);
			e.addEventListener("transitionend", n), e.addEventListener("transitioncancel", n);
		}) : a.waitFor).then(j).catch(() => {
			typeof e.qMorphCancel == "function" && e.qMorphCancel();
		}) : j();
	}), (e) => t(e);
}
var dC = {}, fC = [
	"duration",
	"delay",
	"easing",
	"fill",
	"classes",
	"style",
	"duration",
	"resize",
	"useCSS",
	"hideFromClone",
	"keepToClone",
	"tween",
	"tweenFromOpacity",
	"tweenToOpacity",
	"waitFor",
	"onEnd"
], pC = [
	"resize",
	"useCSS",
	"hideFromClone",
	"keepToClone",
	"tween"
];
function mC(e, t) {
	e.clsAction !== t && (e.clsAction = t, e.el.classList[t]("q-morph--invisible"));
}
function hC(e) {
	if (e.animating || e.queue.length < 2) return;
	let [t, n] = e.queue;
	e.animating = !0, t.animating = !0, n.animating = !0, mC(t, "remove"), mC(n, "remove");
	let r = uC({
		from: t.el,
		to: n.el,
		onToggle() {
			mC(t, "add"), mC(n, "remove");
		},
		...n.opts,
		onEnd(r, i) {
			n.opts.onEnd?.(r, i), !i && (t.animating = !1, n.animating = !1, e.animating = !1, e.cancel = void 0, e.queue.shift(), hC(e));
		}
	});
	e.cancel = () => {
		r(!0), e.cancel = void 0;
	};
}
function gC(e, t) {
	let n = t.opts;
	pC.forEach((t) => {
		n[t] = e[t] === !0;
	});
}
function _C(e, t) {
	let n = typeof e == "string" && e.length !== 0 ? e.split(":") : [];
	t.name = n[0], t.group = n[1];
	let r = Number.parseFloat(n[2]);
	Object.assign(t.opts, {
		duration: Number.isFinite(r) ? r : 300,
		waitFor: n[3]
	});
}
function vC(e, t) {
	e.group !== void 0 && (t.group = e.group), e.name !== void 0 && (t.name = e.name);
	let n = t.opts;
	fC.forEach((t) => {
		e[t] !== void 0 && (n[t] = e[t]);
	});
}
function yC(e, t) {
	if (t.name === e) {
		let n = dC[t.group];
		n === void 0 ? (dC[t.group] = {
			name: t.group,
			model: e,
			queue: [t],
			animating: !1
		}, mC(t, "remove")) : n.model !== e && (n.model = e, n.queue.push(t), !n.animating && n.queue.length === 2 && hC(n));
		return;
	}
	t.animating || mC(t, "add");
}
function bC(e, t) {
	let n;
	Object(t) === t ? (n = String(t.model), vC(t, e), gC(t, e)) : n = String(t), n === e.model ? !e.animating && e.clsAction !== void 0 && e.el.classList[e.clsAction]("q-morph--invisible") : (e.model = n, yC(n, e));
}
gd({
	name: "morph",
	mounted(e, t) {
		let n = {
			el: e,
			animating: !1,
			opts: {}
		};
		gC(t.modifiers, n), _C(t.arg, n), bC(n, t.value), e.__qmorph = n;
	},
	updated(e, t) {
		bC(e.__qmorph, t.value);
	},
	beforeUnmount(e) {
		let t = e.__qmorph, n = dC[t.group];
		n?.queue.includes(t) && (n.queue = n.queue.filter((e) => e !== t), n.queue.length === 0 && (n.cancel?.(), delete dC[t.group])), t.clsAction === "add" && e.classList.remove("q-morph--invisible"), delete e.__qmorph;
	}
});
var xC = {
	childList: !0,
	subtree: !0,
	attributes: !0,
	characterData: !0,
	attributeOldValue: !0,
	characterDataOldValue: !0
};
function SC(e, t, n) {
	t.handler = n, t.observer?.disconnect(), t.observer = new MutationObserver((n) => {
		typeof t.handler == "function" && (t.handler(n) === !1 || t.once === !0) && CC(e);
	}), t.observer.observe(e, t.opts);
}
function CC(e) {
	let t = e.__qmutation;
	t !== void 0 && (t.observer?.disconnect(), delete e.__qmutation);
}
gd({
	name: "mutation",
	mounted(e, { modifiers: { once: t, ...n }, value: r }) {
		let i = {
			once: t,
			opts: Object.keys(n).length === 0 ? xC : n
		};
		SC(e, i, r), e.__qmutation = i;
	},
	updated(e, { oldValue: t, value: n }) {
		let r = e.__qmutation;
		r !== void 0 && t !== n && SC(e, r, n);
	},
	beforeUnmount: CC
});
var { passive: wC } = vd;
function TC(e, { value: t, oldValue: n }) {
	if (typeof t != "function") {
		e.scrollTarget.removeEventListener("scroll", e.scroll, wC);
		return;
	}
	e.handler = t, typeof n != "function" && (e.scrollTarget.addEventListener("scroll", e.scroll, wC), e.scroll());
}
gd({
	name: "scroll-fire",
	mounted(e, t) {
		let n = {
			scrollTarget: wm(e),
			scroll: Od(() => {
				let t, r;
				n.scrollTarget === window ? (r = e.getBoundingClientRect().bottom, t = window.innerHeight) : (r = _p(e).top + vp(e), t = _p(n.scrollTarget).top + vp(n.scrollTarget)), r > 0 && r < t && (n.scrollTarget.removeEventListener("scroll", n.scroll, wC), n.handler(e));
			}, 25)
		};
		TC(n, t), e.__qscrollfire = n;
	},
	updated(e, t) {
		t.value !== t.oldValue && TC(e.__qscrollfire, t);
	},
	beforeUnmount(e) {
		let t = e.__qscrollfire;
		t.scrollTarget.removeEventListener("scroll", t.scroll, wC), t.scroll.cancel(), delete e.__qscrollfire;
	}
});
function EC(e, { value: t, oldValue: n }) {
	if (typeof t != "function") {
		e.scrollTarget.removeEventListener("scroll", e.scroll, vd.passive);
		return;
	}
	e.handler = t, typeof n != "function" && e.scrollTarget.addEventListener("scroll", e.scroll, vd.passive);
}
gd({
	name: "scroll",
	mounted(e, t) {
		let n = {
			scrollTarget: wm(e),
			scroll() {
				n.handler(Em(n.scrollTarget), Dm(n.scrollTarget));
			}
		};
		EC(n, t), e.__qscroll = n;
	},
	updated(e, t) {
		e.__qscroll !== void 0 && t.oldValue !== t.value && EC(e.__qscroll, t);
	},
	beforeUnmount(e) {
		let t = e.__qscroll;
		t.scrollTarget.removeEventListener("scroll", t.scroll, vd.passive), delete e.__qscroll;
	}
});
function DC() {
	document.body.classList.remove("non-selectable");
}
gd({
	name: "touch-hold",
	beforeMount(e, t) {
		let { modifiers: n } = t;
		if (!n.mouse && !md.has.touch) return;
		let r = {
			handler: t.value,
			noop: yd,
			mouseStart(e) {
				typeof r.handler == "function" && bd(e) && (Ed(r, "temp", [[
					document,
					"mousemove",
					"move",
					"passiveCapture"
				], [
					document,
					"click",
					"end",
					"notPassiveCapture"
				]]), r.start(e, !0));
			},
			touchStart(e) {
				if (e.target !== void 0 && typeof r.handler == "function") {
					let t = e.target;
					Ed(r, "temp", [
						[
							t,
							"touchmove",
							"move",
							"passiveCapture"
						],
						[
							t,
							"touchcancel",
							"end",
							"notPassiveCapture"
						],
						[
							t,
							"touchend",
							"end",
							"notPassiveCapture"
						]
					]), r.start(e);
				}
			},
			start(e, t) {
				r.origin = xd(e);
				let n = Date.now();
				md.is.mobile && (document.body.classList.add("non-selectable"), Up(), r.styleCleanup = (e) => {
					r.styleCleanup = void 0, e === !0 ? (Up(), setTimeout(DC, 10)) : DC();
				}), r.triggered = !1, r.sensitivity = t ? r.mouseSensitivity : r.touchSensitivity, r.timer = setTimeout(() => {
					r.timer = void 0, Up(), r.triggered = !0, r.handler({
						evt: e,
						touch: !t,
						mouse: t === !0,
						position: r.origin,
						duration: Date.now() - n
					});
				}, r.duration);
			},
			move(e) {
				let { top: t, left: n } = xd(e);
				r.timer !== void 0 && (Math.abs(n - r.origin.left) >= r.sensitivity || Math.abs(t - r.origin.top) >= r.sensitivity) && (clearTimeout(r.timer), r.timer = void 0);
			},
			end(e) {
				Dd(r, "temp"), r.styleCleanup?.(r.triggered), r.triggered ? e !== void 0 && wd(e) : r.timer !== void 0 && (clearTimeout(r.timer), r.timer = void 0);
			}
		}, i = [
			600,
			5,
			7
		];
		typeof t.arg == "string" && t.arg.length !== 0 && t.arg.split(":").forEach((e, t) => {
			let n = Number.parseInt(e, 10);
			n && (i[t] = n);
		}), [r.duration, r.touchSensitivity, r.mouseSensitivity] = i, e.__qtouchhold = r, n.mouse && Ed(r, "main", [[
			e,
			"mousedown",
			"mouseStart",
			`passive${n.mouseCapture || n.mousecapture ? "Capture" : ""}`
		]]), md.has.touch && Ed(r, "main", [[
			e,
			"touchstart",
			"touchStart",
			`passive${n.capture ? "Capture" : ""}`
		], [
			e,
			"touchend",
			"noop",
			"notPassiveCapture"
		]]);
	},
	updated(e, t) {
		let n = e.__qtouchhold;
		n !== void 0 && t.oldValue !== t.value && (typeof t.value != "function" && n.end(), n.handler = t.value);
	},
	beforeUnmount(e) {
		let t = e.__qtouchhold;
		t !== void 0 && (Dd(t, "main"), Dd(t, "temp"), t.timer !== void 0 && clearTimeout(t.timer), t.styleCleanup?.(), delete e.__qtouchhold);
	}
});
var OC = {
	esc: 27,
	tab: 9,
	enter: 13,
	space: 32,
	up: 38,
	left: 37,
	right: 39,
	down: 40,
	delete: [8, 46]
}, kC = RegExp(`^([\\d+]+|${Object.keys(OC).join("|")})$`, "i");
function AC(e, t) {
	let { top: n, left: r } = xd(e);
	return Math.abs(r - t.left) >= 7 || Math.abs(n - t.top) >= 7;
}
function jC() {
	document.body.classList.remove("non-selectable");
}
gd({
	name: "touch-repeat",
	beforeMount(e, { modifiers: t, value: n, arg: r }) {
		let i = Object.keys(t).reduce((e, t) => {
			if (kC.test(t)) {
				let n = Number.parseInt(t, 10), r = Number.isNaN(n) ? OC[t.toLowerCase()] : n;
				r >= 0 && e.push(r);
			}
			return e;
		}, []);
		if (!t.mouse && !md.has.touch && i.length === 0) return;
		let a = typeof r == "string" && r.length !== 0 ? r.split(":").map((e) => Number.parseInt(e, 10)) : [
			0,
			600,
			300
		], o = a.length - 1, s = {
			keyboard: i,
			handler: n,
			noop: yd,
			mouseStart(e) {
				s.event === void 0 && typeof s.handler == "function" && bd(e) && (Ed(s, "temp", [[
					document,
					"mousemove",
					"move",
					"passiveCapture"
				], [
					document,
					"click",
					"end",
					"notPassiveCapture"
				]]), s.start(e, !0));
			},
			keyboardStart(t) {
				if (typeof s.handler == "function" && Pd(t, i)) {
					if ((a[0] === 0 || s.event !== void 0) && (wd(t), e.focus(), s.event !== void 0)) return;
					Ed(s, "temp", [[
						document,
						"keyup",
						"end",
						"notPassiveCapture"
					], [
						document,
						"click",
						"end",
						"notPassiveCapture"
					]]), s.start(t, !1, !0);
				}
			},
			touchStart(e) {
				if (e.target !== void 0 && typeof s.handler == "function") {
					let t = e.target;
					Ed(s, "temp", [
						[
							t,
							"touchmove",
							"move",
							"passiveCapture"
						],
						[
							t,
							"touchcancel",
							"end",
							"notPassiveCapture"
						],
						[
							t,
							"touchend",
							"end",
							"notPassiveCapture"
						]
					]), s.start(e);
				}
			},
			start(e, t, n) {
				n || (s.origin = xd(e));
				function r(e) {
					s.styleCleanup = void 0, document.documentElement.style.cursor = "", e === !0 ? (Up(), setTimeout(jC, 10)) : jC();
				}
				md.is.mobile && (document.body.classList.add("non-selectable"), Up(), s.styleCleanup = r), s.event = {
					touch: !t && !n,
					mouse: t === !0,
					keyboard: n === !0,
					startTime: Date.now(),
					repeatCount: 0
				};
				let i = () => {
					if (s.timer = void 0, s.event === void 0) return;
					s.event.repeatCount === 0 && (s.event.evt = e, n ? s.event.keyCode = e.keyCode : s.event.position = xd(e), md.is.mobile || (document.documentElement.style.cursor = "pointer", document.body.classList.add("non-selectable"), Up(), s.styleCleanup = r)), s.event.duration = Date.now() - s.event.startTime, s.event.repeatCount += 1, s.handler(s.event);
					let t = o < s.event.repeatCount ? o : s.event.repeatCount;
					s.timer = setTimeout(i, a[t]);
				};
				a[0] === 0 ? i() : s.timer = setTimeout(i, a[0]);
			},
			move(e) {
				s.event !== void 0 && s.timer !== void 0 && AC(e, s.origin) && (clearTimeout(s.timer), s.timer = void 0);
			},
			end(e) {
				s.event !== void 0 && (s.styleCleanup?.(!0), e !== void 0 && s.event.repeatCount > 0 && wd(e), Dd(s, "temp"), s.timer !== void 0 && (clearTimeout(s.timer), s.timer = void 0), s.event = void 0);
			}
		};
		e.__qtouchrepeat = s, t.mouse && Ed(s, "main", [[
			e,
			"mousedown",
			"mouseStart",
			`passive${t.mouseCapture || t.mousecapture ? "Capture" : ""}`
		]]), md.has.touch && Ed(s, "main", [[
			e,
			"touchstart",
			"touchStart",
			`passive${t.capture ? "Capture" : ""}`
		], [
			e,
			"touchend",
			"noop",
			"passiveCapture"
		]]), i.length !== 0 && Ed(s, "main", [[
			e,
			"keydown",
			"keyboardStart",
			`notPassive${t.keyCapture || t.keycapture ? "Capture" : ""}`
		]]);
	},
	updated(e, { oldValue: t, value: n }) {
		let r = e.__qtouchrepeat;
		r !== void 0 && t !== n && (typeof n != "function" && r.end(), r.handler = n);
	},
	beforeUnmount(e) {
		let t = e.__qtouchrepeat;
		t !== void 0 && (t.timer !== void 0 && clearTimeout(t.timer), Dd(t, "main"), Dd(t, "temp"), t.styleCleanup?.(), delete e.__qtouchrepeat);
	}
}), md.is.mobile && (md.is.nativeMobile || md.is.winphone || md.is.safari || md.is.webkit || md.is.vivaldi);
var MC = {};
function NC(e) {
	Object.assign(RC, {
		request: e,
		exit: e,
		toggle: e
	});
}
function PC() {
	return document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement || document.msFullscreenElement || null;
}
function FC() {
	let e = RC.activeEl = RC.isActive ? PC() : null;
	mm(e === null || e === document.documentElement ? document.body : e);
}
function IC() {
	RC.isActive = !RC.isActive, FC();
}
function LC(e, t) {
	try {
		let n = e[t]();
		return n === void 0 ? Promise.resolve() : n;
	} catch (e) {
		return Promise.reject(e);
	}
}
var RC = _d({
	isActive: !1,
	activeEl: null
}, {
	isCapable: !1,
	install({ $q: e }) {
		e.fullscreen = this;
	}
});
MC.request = [
	"requestFullscreen",
	"msRequestFullscreen",
	"mozRequestFullScreen",
	"webkitRequestFullscreen"
].find((e) => document.documentElement[e] !== void 0), RC.isCapable = MC.request !== void 0, RC.isCapable ? (Object.assign(RC, {
	request(e) {
		let t = e || document.documentElement, { activeEl: n } = RC;
		return t === n ? Promise.resolve() : (n !== null && t.contains(n) ? RC.exit() : Promise.resolve()).finally(() => LC(t, MC.request));
	},
	exit() {
		return RC.isActive ? LC(document, MC.exit) : Promise.resolve();
	},
	toggle(e) {
		return RC.isActive ? RC.exit() : RC.request(e);
	}
}), MC.exit = [
	"exitFullscreen",
	"msExitFullscreen",
	"mozCancelFullScreen",
	"webkitExitFullscreen"
].find((e) => document[e]), RC.isActive = !!PC(), RC.isActive && FC(), [
	"onfullscreenchange",
	"onmsfullscreenchange",
	"onwebkitfullscreenchange"
].forEach((e) => {
	document[e] = IC;
})) : NC(() => Promise.reject(/* @__PURE__ */ Error("Not capable")));
var zC = _d({ appVisible: !0 }, { install({ $q: e }) {
	id(e, "appVisible", () => this.appVisible);
} });
{
	let e, t;
	document.hidden === void 0 ? document.msHidden === void 0 ? document.webkitHidden !== void 0 && (e = "webkitHidden", t = "webkitvisibilitychange") : (e = "msHidden", t = "msvisibilitychange") : (e = "hidden", t = "visibilitychange"), t && document[e] !== void 0 && document.addEventListener(t, () => {
		zC.appVisible = !document[e];
	}, !1);
}
Q({
	name: "BottomSheetComponent",
	props: {
		...qf,
		title: String,
		message: String,
		actions: Array,
		grid: Boolean,
		cardClass: [
			String,
			Array,
			Object
		],
		cardStyle: [
			String,
			Array,
			Object
		]
	},
	emits: ["ok", "hide"],
	setup(e, { emit: t }) {
		let { proxy: n } = h(), r = Jf(e, n.$q), i = L(null);
		function a() {
			i.value.show();
		}
		function o() {
			i.value.hide();
		}
		function s(e) {
			t("ok", e), o();
		}
		function c() {
			t("hide");
		}
		function l() {
			return e.actions.map((e) => {
				let t = e.avatar || e.img;
				return e.label === void 0 ? _(Sy, {
					class: "col-all",
					dark: r.value
				}) : _("div", {
					class: ["q-bottom-sheet__item q-hoverable q-focusable cursor-pointer relative-position", e.class],
					style: e.style,
					tabindex: 0,
					role: "listitem",
					onClick() {
						s(e);
					},
					onKeyup(t) {
						t.keyCode === 13 && s(e);
					}
				}, [
					_("div", { class: "q-focus-helper" }),
					e.icon ? _(Gf, {
						name: e.icon,
						color: e.color
					}) : t ? _("img", {
						class: e.avatar ? "q-bottom-sheet__avatar" : "",
						src: t
					}) : _("div", { class: "q-bottom-sheet__empty-icon" }),
					_("div", e.label)
				]);
			});
		}
		function u() {
			return e.actions.map((e) => {
				let t = e.avatar || e.img;
				return e.label === void 0 ? _(Sy, {
					spaced: !0,
					dark: r.value
				}) : _(ny, {
					class: ["q-bottom-sheet__item", e.classes],
					style: e.style,
					tabindex: 0,
					clickable: !0,
					dark: r.value,
					onClick() {
						s(e);
					}
				}, () => [_(ry, { avatar: !0 }, () => e.icon ? _(Gf, {
					name: e.icon,
					color: e.color
				}) : t ? _("img", {
					class: e.avatar ? "q-bottom-sheet__avatar" : "",
					src: t
				}) : null), _(ry, () => e.label)]);
			});
		}
		function d() {
			let t = [];
			return e.title && t.push(_(Oh, { class: "q-dialog__title" }, () => e.title)), e.message && t.push(_(Oh, { class: "q-dialog__message" }, () => e.message)), t.push(e.grid ? _("div", {
				class: "row items-stretch justify-start",
				role: "list"
			}, l()) : _("div", { role: "list" }, u())), t;
		}
		function f() {
			return [_(Dh, {
				class: [`q-bottom-sheet q-bottom-sheet--${e.grid ? "grid" : "list"}` + (r.value ? " q-bottom-sheet--dark q-dark" : ""), e.cardClass],
				style: e.cardStyle
			}, d)];
		}
		return Object.assign(n, {
			show: a,
			hide: o
		}), () => _(Kv, {
			ref: i,
			position: "bottom",
			onHide: c
		}, f);
	}
});
function BC(e) {
	return encodeURIComponent(e === Object(e) ? JSON.stringify(e) : String(e));
}
function VC(e) {
	if (e === "") return e;
	e.indexOf("\"") === 0 && (e = e.slice(1, -1).replaceAll(String.raw`\"`, "\"").replaceAll(String.raw`\\`, "\\")), e = decodeURIComponent(e.replaceAll("+", " "));
	try {
		let t = JSON.parse(e);
		(t === Object(t) || Array.isArray(t)) && (e = t);
	} catch {}
	return e;
}
var HC = /(\d+)([dhms])/g, UC = {
	d: 86400,
	h: 3600,
	m: 60,
	s: 1
};
function WC(e) {
	let t = 0, n = !1, r = e.matchAll(HC);
	for (let e of r) {
		n = !0;
		let r = Number.parseInt(e[1], 10), i = e[2];
		t += r * UC[i];
	}
	return n ? t : void 0;
}
function GC(e, t, n = {}, r) {
	let i, a = !1;
	n.expires !== void 0 && (Number.isFinite(n.expires) ? i = Math.round(n.expires * 86400) : n.expires instanceof Date ? i = Math.round((n.expires.getTime() - Date.now()) / 1e3) : typeof n.expires == "string" && (i = WC(n.expires)), i !== void 0 && (a = i <= 0));
	let o = `${encodeURIComponent(e)}=${BC(t)}`, s = [
		o,
		i === void 0 ? "" : `; Max-Age=${i}`,
		n.path ? `; Path=${n.path}` : "",
		n.domain ? `; Domain=${n.domain}` : "",
		n.sameSite ? `; SameSite=${n.sameSite}` : "",
		n.httpOnly ? "; HttpOnly" : "",
		n.secure ? "; Secure" : "",
		n.other ? `; ${n.other}` : ""
	].join("");
	if (r) {
		r.req.qCookies ? r.req.qCookies.push(s) : r.req.qCookies = [s], r.res.setHeader("Set-Cookie", r.req.qCookies);
		let t = r.req.headers.cookie || "";
		if (i !== void 0 && a) {
			let n = KC(e, r);
			n !== void 0 && (t = t.replace(`${e}=${n}; `, "").replace(`; ${e}=${n}`, "").replace(`${e}=${n}`, ""));
		} else t = t ? `${o}; ${t}` : o;
		r.req.headers.cookie = t;
	} else document.cookie = s;
}
function KC(e, t) {
	let n = t ? t.req.headers : document, r = n.cookie ? n.cookie.split("; ") : [], i = r.length, a = e ? null : {}, o = 0, s, c, l;
	for (; o < i; o++) if (s = r[o].split("="), c = decodeURIComponent(s.shift()), l = s.join("="), !e) a[c] = l;
	else if (e === c) {
		a = VC(l);
		break;
	}
	return a;
}
function qC(e, t, n) {
	GC(e, "", {
		expires: -1,
		...t
	}, n);
}
function JC(e, t) {
	return KC(e, t) !== null;
}
function YC(e) {
	return {
		get: (t) => KC(t, e),
		set: (t, n, r) => GC(t, n, r, e),
		has: (t) => JC(t, e),
		remove: (t, n) => qC(t, n, e),
		getAll: () => KC(null, e)
	};
}
var XC = { install({ $q: e, ssrContext: t }) {
	e.cookies = this;
} };
__QUASAR_SSR__ && (XC.parseSSR = (e) => {
	if (e !== void 0) return YC(e);
}), Object.assign(XC, YC()), Q({
	name: "DialogPluginComponent",
	props: {
		...qf,
		title: String,
		message: String,
		prompt: Object,
		options: Object,
		progress: [Boolean, Object],
		html: Boolean,
		ok: {
			type: [
				String,
				Object,
				Boolean
			],
			default: !0
		},
		cancel: [
			String,
			Object,
			Boolean
		],
		focus: {
			type: String,
			default: "ok",
			validator: (e) => [
				"ok",
				"cancel",
				"none"
			].includes(e)
		},
		stackButtons: Boolean,
		color: String,
		cardClass: [
			String,
			Array,
			Object
		],
		cardStyle: [
			String,
			Array,
			Object
		]
	},
	emits: ["ok", "hide"],
	setup(e, { emit: t }) {
		let { proxy: n } = h(), { $q: r } = n, i = Jf(e, r), a = L(null), s = L(e.prompt === void 0 ? e.options === void 0 ? void 0 : e.options.model : e.prompt.model), c = o(() => "q-dialog-plugin" + (i.value ? " q-dialog-plugin--dark q-dark" : "") + (e.progress === !1 ? "" : " q-dialog-plugin--progress")), l = o(() => e.color || (i.value ? "amber" : "primary")), u = o(() => e.progress === !1 ? null : tf(e.progress) ? {
			component: e.progress.spinner || gp,
			props: { color: e.progress.color || l.value }
		} : {
			component: gp,
			props: { color: l.value }
		}), d = o(() => e.prompt !== void 0 || e.options !== void 0), f = o(() => {
			if (!d.value) return {};
			let { model: t, isValid: n, items: r, ...i } = e.prompt === void 0 ? e.options : e.prompt;
			return i;
		}), p = o(() => tf(e.ok) || e.ok === !0 ? r.lang.label.ok : e.ok), m = o(() => tf(e.cancel) || e.cancel === !0 ? r.lang.label.cancel : e.cancel), g = o(() => e.prompt === void 0 ? e.options !== void 0 && e.options.isValid !== void 0 && !e.options.isValid(s.value) : e.prompt.isValid !== void 0 && !e.prompt.isValid(s.value)), v = o(() => ({
			color: l.value,
			label: p.value,
			ripple: !1,
			disable: g.value,
			...tf(e.ok) ? e.ok : { flat: !0 },
			"data-autofocus": e.focus === "ok" && !d.value || void 0,
			onClick: S
		})), y = o(() => ({
			color: l.value,
			label: m.value,
			ripple: !1,
			...tf(e.cancel) ? e.cancel : { flat: !0 },
			"data-autofocus": e.focus === "cancel" && !d.value || void 0,
			onClick: C
		}));
		G(() => e.prompt && e.prompt.model, T), G(() => e.options && e.options.model, T);
		function b() {
			a.value.show();
		}
		function x() {
			a.value.hide();
		}
		function S() {
			t("ok", te(s.value)), x();
		}
		function C() {
			x();
		}
		function w() {
			t("hide");
		}
		function T(e) {
			s.value = e;
		}
		function E(t) {
			!g.value && e.prompt.type !== "textarea" && Pd(t, 13) && S();
		}
		function D(t, n) {
			return e.html ? _(Oh, {
				class: t,
				innerHTML: n
			}) : _(Oh, { class: t }, () => n);
		}
		function O() {
			return [_(yb, {
				color: l.value,
				dense: !0,
				autofocus: !0,
				dark: i.value,
				...f.value,
				modelValue: s.value,
				"onUpdate:modelValue": T,
				onKeyup: E
			})];
		}
		function k() {
			return [_(Hb, {
				color: l.value,
				options: e.options.items,
				dark: i.value,
				...f.value,
				modelValue: s.value,
				"onUpdate:modelValue": T
			})];
		}
		function A() {
			let t = [];
			return e.cancel && t.push(_(Vp, y.value)), e.ok && t.push(_(Vp, v.value)), _(kh, {
				class: e.stackButtons ? "items-end" : "",
				vertical: e.stackButtons,
				align: "right"
			}, () => t);
		}
		function j() {
			let t = [];
			return e.title && t.push(D("q-dialog__title", e.title)), e.progress !== !1 && t.push(_(Oh, { class: "q-dialog__progress" }, () => _(u.value.component, u.value.props))), e.message && t.push(D("q-dialog__message", e.message)), e.prompt === void 0 ? e.options !== void 0 && t.push(_(Sy, { dark: i.value }), _(Oh, { class: "scroll q-dialog-plugin__form" }, k), _(Sy, { dark: i.value })) : t.push(_(Oh, { class: "scroll q-dialog-plugin__form" }, O)), (e.ok || e.cancel) && t.push(A()), t;
		}
		function M() {
			return [_(Dh, {
				class: [c.value, e.cardClass],
				style: e.cardStyle,
				dark: i.value
			}, j)];
		}
		return Object.assign(n, {
			show: b,
			hide: x
		}), () => _(Kv, {
			ref: a,
			onHide: w
		}, M);
	}
});
var ZC, QC, $C = 0, ew = null, tw = {}, nw = {}, rw = {
	group: "__default_quasar_group__",
	delay: 0,
	message: !1,
	html: !1,
	spinnerSize: 80,
	spinnerColor: "",
	messageColor: "",
	backgroundColor: "",
	boxClass: "",
	spinner: gp,
	customClass: ""
}, iw = { ...rw };
function aw(e) {
	if (e?.group !== void 0 && nw[e.group] !== void 0) return Object.assign(nw[e.group], e);
	let t = tf(e) && e.ignoreDefaults ? {
		...rw,
		...e
	} : {
		...iw,
		...e
	};
	return nw[t.group] = t, t;
}
var ow = _d({ isActive: !1 }, {
	show(e) {
		tw = aw(e);
		let { group: t } = tw;
		return ow.isActive = !0, ZC === void 0 ? (tw.uid = ++$C, ew !== null && clearTimeout(ew), ew = setTimeout(() => {
			ew = null;
			let e = fm("q-loading");
			ZC = sf({
				name: "QLoading",
				setup() {
					A(() => {
						Vv(!0);
					});
					function t() {
						!ow.isActive && ZC !== void 0 && (Vv(!1), ZC.unmount(e), pm(e), ZC = void 0, QC = void 0);
					}
					function n() {
						if (!ow.isActive) return null;
						let e = [_(tw.spinner, {
							class: "q-loading__spinner",
							color: tw.spinnerColor,
							size: tw.spinnerSize
						})];
						return tw.message && e.push(_("div", {
							class: "q-loading__message" + (tw.messageColor ? ` text-${tw.messageColor}` : ""),
							[tw.html ? "innerHTML" : "textContent"]: tw.message
						})), _("div", {
							class: "q-loading fullscreen flex flex-center z-max " + tw.customClass.trim(),
							key: tw.uid
						}, [_("div", { class: "q-loading__backdrop" + (tw.backgroundColor ? ` bg-${tw.backgroundColor}` : "") }), _("div", { class: "q-loading__box column items-center " + tw.boxClass }, e)]);
					}
					return () => _(a, {
						name: "q-transition--fade",
						appear: !0,
						onAfterLeave: t
					}, n);
				}
			}, ow.__parentApp), QC = ZC.mount(e);
		}, tw.delay)) : (tw.uid = $C, QC.$forceUpdate()), (e) => {
			if (e === void 0 || Object(e) !== e) {
				ow.hide(t);
				return;
			}
			ow.show({
				...e,
				group: t
			});
		};
	},
	hide(e) {
		if (ow.isActive) {
			if (e === void 0) nw = {};
			else if (nw[e] === void 0) return;
			else {
				delete nw[e];
				let t = Object.keys(nw);
				if (t.length !== 0) {
					let e = t.at(-1);
					ow.show({ group: e });
					return;
				}
			}
			ew !== null && (clearTimeout(ew), ew = null), ow.isActive = !1;
		}
	},
	setDefaults(e) {
		tf(e) && Object.assign(iw, e);
	},
	install({ $q: e, parentApp: t }) {
		e.loading = this, ow.__parentApp = t, e.config.loading !== void 0 && this.setDefaults(e.config.loading);
	}
}), sw = L(null), cw = _d({ isActive: !1 }, {
	start: yd,
	stop: yd,
	increment: yd,
	setDefaults: yd,
	install({ $q: e, parentApp: t }) {
		if (e.loadingBar = this, this.__installed) {
			e.config.loadingBar !== void 0 && this.setDefaults(e.config.loadingBar);
			return;
		}
		let n = L(e.config.loadingBar === void 0 ? {} : { ...e.config.loadingBar });
		function r() {
			cw.isActive = !0;
		}
		function i() {
			cw.isActive = !1;
		}
		let a = fm("q-loading-bar");
		sf({
			name: "LoadingBar",
			devtools: { hide: !0 },
			setup: () => () => _(Cf, {
				...n.value,
				onStart: r,
				onStop: i,
				ref: sw
			})
		}, t).mount(a), Object.assign(this, {
			start(e) {
				sw.value.start(e);
			},
			stop() {
				sw.value.stop();
			},
			increment(...e) {
				sw.value.increment(...e);
			},
			setDefaults(e) {
				tf(e) && Object.assign(n.value, e);
			}
		});
	}
});
function lw(e) {
	return nf(e) ? "__q_date|" + e.getTime() : rf(e) ? "__q_expr|" + e.source : typeof e == "number" ? "__q_numb|" + e : typeof e == "boolean" ? "__q_bool|" + (e ? "1" : "0") : typeof e == "string" ? "__q_strn|" + e : typeof e == "function" ? "__q_strn|" + e.toString() : e === Object(e) ? "__q_objt|" + JSON.stringify(e) : e;
}
var uw = /^-?\d+$/;
function dw(e) {
	if (e.length < 9) return e;
	let t = e.slice(0, 8), n = e.slice(9);
	switch (t) {
		case "__q_date": return new Date(uw.test(n) ? Number.parseInt(n, 10) : n);
		case "__q_expr": return new RegExp(n);
		case "__q_numb": return Number(n);
		case "__q_bool": return n === "1";
		case "__q_strn": return String(n);
		case "__q_objt": return JSON.parse(n);
		default: return e;
	}
}
function fw() {
	return {
		has: () => !1,
		hasItem: () => !1,
		getLength: () => 0,
		getItem: () => null,
		getIndex: () => null,
		getKey: () => null,
		getAll: () => ({}),
		getAllKeys: () => [],
		set: yd,
		setItem: yd,
		remove: yd,
		removeItem: yd,
		clear: yd,
		isEmpty: () => !0
	};
}
function pw(e) {
	let t = window[e + "Storage"], n = (e) => {
		let n = t.getItem(e);
		return n ? dw(n) : null;
	}, r = (e) => t.getItem(e) !== null, i = (e, n) => {
		t.setItem(e, lw(n));
	}, a = (e) => {
		t.removeItem(e);
	};
	return {
		has: r,
		hasItem: r,
		getLength: () => t.length,
		getItem: n,
		getIndex: (e) => e < t.length ? n(t.key(e)) : null,
		getKey: (e) => e < t.length ? t.key(e) : null,
		getAll: () => {
			let e, r = {}, i = t.length;
			for (let a = 0; a < i; a++) e = t.key(a), r[e] = n(e);
			return r;
		},
		getAllKeys: () => {
			let e = [], n = t.length;
			for (let r = 0; r < n; r++) e.push(t.key(r));
			return e;
		},
		set: i,
		setItem: i,
		remove: a,
		removeItem: a,
		clear: () => {
			t.clear();
		},
		isEmpty: () => t.length === 0
	};
}
({ ...md.has.webStorage ? pw("local") : fw() }), { ...md.has.webStorage ? pw("session") : fw() };
function mw() {
	let { emit: e, proxy: t } = h(), n = L(null);
	function r() {
		n.value.show();
	}
	function i() {
		n.value.hide();
	}
	function a(t) {
		e("ok", t), i();
	}
	function o() {
		e("hide");
	}
	return Object.assign(t, {
		show: r,
		hide: i
	}), {
		dialogRef: n,
		onDialogHide: o,
		onDialogOK: a,
		onDialogCancel: i
	};
}
var hw = ["ok", "hide"];
mw.emits = hw, mw.emitsObject = RS(hw);
//#endregion
//#region src/composables/useQuasarDate.ts
var gw = "YYYY/MM/DD";
function _w() {
	function e(e, t) {
		return yv.formatDate(yv.extractDate(e, t || "YYYY/MM/DD"), gw);
	}
	function t(e, t) {
		return e == null ? "" : yv.formatDate(e, t || "YYYY/MM/DD");
	}
	return {
		toQDateFormat: e,
		formatQDate: t
	};
}
//#endregion
//#region src/composables/useQuasarFieldValidation.ts
function vw(e) {
	let { validateFromApi: t, required: n, email: r, minLength: i, maxLength: a, min: o, max: s, pattern: c, unique: l, validDate: u, afterDate: d, beforeDate: f, fromDate: p, upToDate: m } = Yu(e);
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
function yw(e, t, n, r) {
	let { required: i, email: a, validateFromApi: o, ...s } = vw(r), c = t.required ? [i] : [];
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
function bw() {
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
var xw = null;
function Sw(e) {
	if (xw !== null) {
		console.warn("[LinID CoreLib] UI Design has already been initialized. Re-initialization is ignored.");
		return;
	}
	xw = e;
}
function Cw() {
	if (xw === null) throw Error("[LinID CoreLib] UI Design is not initialized. Call setUiDesign() first.");
	return xw;
}
//#endregion
//#region src/types/uiDesign.ts
var ww = [
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
], Tw = [
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
], Ew = [
	"icon",
	"activeClass",
	"exactActiveClass",
	"noCaps",
	"alert",
	"contentClass",
	"ripple"
], Dw = [
	"reveal",
	"revealOffset",
	"elevated",
	"bordered"
], Ow = ["inset"], kw = ["shrink"], Aw = [
	"icon",
	"size",
	"fontSize",
	"color",
	"textColor",
	"square",
	"rounded"
], jw = [
	"floating",
	"multiLine",
	"align",
	"color",
	"textColor",
	"transparent",
	"outline",
	"rounded"
], Mw = /* @__PURE__ */ "virtualScrollItemSize.virtualScrollStickySizeStart.virtualScrollStickySizeEnd.color.iconFirstPage.iconPrevPage.iconNextPage.iconLastPage.grid.gridHeader.dense.hideHeader.hideBottom.hideSelectedBanner.hideNoData.hidePagination.flat.bordered.square.separator.wrapCells.tableStyle.tableClass.tableHeaderStyle.tableHeaderClass.cardContainerStyle.cardContainerClass.cardStyle.cardClass.titleClass".split("."), Nw = [
	"dark",
	"square",
	"flat",
	"bordered"
], Pw = ["align", "vertical"], Fw = [
	"left",
	"right",
	"name",
	"size",
	"color"
], Iw = [
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
], Lw = [
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
], Rw = [
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
], zw = [
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
], Bw = [
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
], Vw = [
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
], Hw = [
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
], Uw = [
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
], Ww = /* @__PURE__ */ "virtualScrollHorizontal.clearable.autofocus.hideDropdownIcon.popupNoRouteDismiss.fillInput.transitionShow.transitionHide.transitionDuration.behavior.stackLabel.hideHint.clearIcon.counter.dropdownIcon.useInput.inputDebounce.optionsDense.optionsDark.optionsSelectedClass.optionsCover.menuShrink.disableTabSelection.menuAnchor.menuSelf.menuOffset.displayValueHtml.hideSelected.useChips.labelColor.color.bgColor.dark.filled.outlined.borderless.standout.hideBottomSpace.rounded.square.dense.itemAligned.popupContentClass.popupContentStyle.inputClass.inputStyle.noErrorIcon.virtualScrollSliceSize.virtualScrollSliceRatioBefore.virtualScrollSliceRatioAfter.virtualScrollItemSize.virtualScrollStickySizeStart.virtualScrollStickySizeEnd".split("."), Gw = {
	"q-avatar": Aw,
	"q-badge": jw,
	"q-banner": [
		"inlineActions",
		"dense",
		"rounded",
		"dark"
	],
	"q-btn": ww,
	"q-btn-dropdown": /* @__PURE__ */ "split.disableMainBtn.disableDropdown.persistent.noEscDismiss.noRouteDismiss.autoClose.noRefocus.noFocus.icon.iconRight.noCaps.noWrap.align.stack.stretch.dropdownIcon.cover.menuAnchor.menuSelf.menuOffset.size.outline.flat.unelevated.rounded.push.square.glossy.fab.fabMini.padding.color.textColor.dense.ripple.noIconAnimation.contentStyle.contentClass.transitionShow.transitionHide.transitionDuration".split("."),
	"q-card": Nw,
	"q-card-actions": Pw,
	"q-checkbox": Rw,
	"q-date": Bw,
	"q-dialog": [
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
	],
	"q-field": Hw,
	"q-file": Uw,
	"q-form": [
		"autofocus",
		"noErrorFocus",
		"noResetFocus",
		"greedy"
	],
	"q-header": Dw,
	"q-icon": Fw,
	"q-chip": Iw,
	"q-img": Vw,
	"q-input": zw,
	"q-item": [
		"insetLevel",
		"tag",
		"activeClass",
		"exactActiveClass",
		"clickable",
		"manualFocus",
		"focused",
		"dark",
		"dense"
	],
	"q-item-label": [
		"lines",
		"overline",
		"caption",
		"header"
	],
	"q-item-section": [
		"avatar",
		"thumbnail",
		"side",
		"top",
		"noWrap"
	],
	"q-layout": ["view", "container"],
	"q-list": [
		"separator",
		"padding",
		"tag",
		"bordered",
		"dense",
		"dark"
	],
	"q-menu": [
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
	],
	"q-option-group": [
		"keepColor",
		"type",
		"leftLabel",
		"inline",
		"size",
		"color",
		"dark",
		"dense"
	],
	"q-route-tab": Ew,
	"q-select": Ww,
	"q-separator": [
		"spaced",
		"inset",
		"vertical",
		"dark",
		"size",
		"color"
	],
	"q-spinner": [
		"size",
		"color",
		"thickness"
	],
	"q-splitter": [
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
	],
	"q-table": Mw,
	"q-tabs": Tw,
	"q-toggle": Lw,
	"q-toolbar": Ow,
	"q-toolbar-title": kw,
	"q-tree": [
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
	]
};
//#endregion
//#region src/composables/useUiDesign.ts
function Kw(e, t) {
	return t.split(".").reduce((e, t) => {
		if (e && typeof e == "object") return e[t];
	}, e);
}
function qw(e, t, n) {
	let r = Kw(e, `${t}.${n}`);
	if (r === void 0 && (r = Kw(e, `default.${n}`)), typeof r == "object") throw Error(`[UiDesign] Value for '${t}.${n}' is a nested object or null, expected a primitive.`);
	return r;
}
function Jw(e) {
	if (!(e in Gw)) throw Error(`[UiDesign] The component '${e}' is not supported for UI design retrieval.`);
	return Gw[e];
}
function Yw() {
	let e = o(() => Cw());
	function t(t, n, r) {
		let i = Jw(n), a = {};
		for (let o of i) {
			let i = r?.[o] ?? qw(e.value, t, `${n}.${String(o)}`);
			i !== void 0 && (a[o] = i);
		}
		return a;
	}
	return { ui: t };
}
//#endregion
//#region src/types/linidFilter.ts
var Xw = "|", Zw = "not_", Qw = [
	"lk_",
	"gt_",
	"lt_"
], $w = class e {
	isNegation;
	operator;
	value;
	constructor(e, t, n) {
		this.isNegation = e, this.operator = t, this.value = n;
	}
	static fromString(t) {
		if (typeof t != "string" || t === "") return new e(!1, "", "");
		let n = t, r = !1;
		n.startsWith("not_") && (r = !0, n = n.slice(Zw.length));
		let i = Qw.find((e) => n.startsWith(e)) ?? "";
		return new e(r, i, n.slice(i.length));
	}
	toString() {
		return `${this.isNegation ? Zw : ""}${this.operator}${this.value}`;
	}
}, eT = class e {
	id;
	name;
	type;
	options;
	values;
	constructor(e, t, n, r) {
		this.id = crypto.randomUUID(), this.name = e, this.type = t, this.options = n, this.values = r;
	}
	static fromString(t, n) {
		let r = typeof n != "string" || n === "" ? [] : n.split("|").map((e) => $w.fromString(e));
		return new e(t, "text", {}, r);
	}
	toString() {
		return this.values.map((e) => e.toString()).join("|");
	}
};
//#endregion
//#region src/composables/useLinidFilterUrl.ts
function tT(e, t) {
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
				n.push(eT.fromString(e.name, t));
			});
		}), n;
	}
	return {
		setFiltersInUrl: n,
		getFiltersFromUrl: r
	};
}
//#endregion
//#region src/services/linidConfigurationService.ts
async function nT() {
	return (await _u().get("/metadata/entities")).data;
}
async function rT(e) {
	return (await _u().get(`/metadata/entities/${e}`)).data;
}
async function iT() {
	return (await _u().get("/metadata/routes")).data;
}
//#endregion
//#region src/stores/linidConfigurationStore.ts
var aT = () => oT(Ze()), oT = q("LinidConfigurationStore", {
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
			let [e, t] = await Promise.all([nT(), iT()]);
			this.entities = e, this.apiEndpoints = t;
		} catch (e) {
			this.error = e instanceof Error ? e.message : "Failed to fetch configuration", console.error("[Linid CoreLib] Failed to fetch configuration:", e);
		} finally {
			this.loading = !1;
		}
	} }
}), sT = () => cT(Ze()), cT = q("LinidUserStore", {
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
}), lT = "&", uT = "=", dT = class e {
	id;
	label;
	filters;
	constructor(e, t, n) {
		this.id = e, this.label = t, this.filters = n;
	}
	static fromString(t, n, r) {
		let i = typeof r != "string" || r === "" ? [] : r.split(lT).filter((e) => e.includes(uT)).map((e) => {
			let t = e.indexOf(uT), n = e.slice(0, t), r = e.slice(t + 1);
			return eT.fromString(n, r);
		});
		return new e(t, n, i);
	}
	toString() {
		return this.filters.map((e) => `${e.name}${uT}${e.toString()}`).join(lT);
	}
}, fT = /* @__PURE__ */ function(e) {
	return e.SETUP = "setup", e.CONFIGURE = "configure", e.INITIALIZE = "initialize", e.READY = "ready", e.POST_INIT = "postInit", e;
}({}), pT = class {
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
};
//#endregion
export { pT as BasicRemoteModule, it as DEFAULT_DATE_FORMAT, Zw as LINID_FILTER_NEGATION_PREFIX, Xw as LINID_FILTER_OR_SEPARATOR, eT as LinidFilter, dT as LinidFilterSet, $w as LinidFilterValue, et as LinidZoneRenderer, fT as ModuleLifecyclePhase, gw as QDATE_DEFAULT_MASK, Ku as changeLocale, ju as deepEqual, Mu as deepEqualUnordered, Tu as deleteEntityById, Ou as fromDot, iT as getApiEndpointsConfiguration, rt as getDayjsInstance, Cu as getEntities, nT as getEntitiesConfiguration, wu as getEntityById, rT as getEntityConfiguration, _u as getHttpClient, Fu as getI18nInstance, he as getModuleFederation, bu as getModuleHostConfiguration, $u as getNunjucksEnv, Ze as getPiniaStore, Cw as getUiDesign, ku as isObject, ge as loadAsyncComponent, Du as merge, yu as registerModuleHostConfiguration, Au as renameKeys, Wu as resolveLocale, xu as saveEntity, nt as setDayjsInstance, gu as setHttpClient, Pu as setI18nInstance, me as setModuleFederation, Qu as setNunjucksEnv, Xe as setPiniaStore, Sw as setUiDesign, Gu as syncLocale, Do as uiEventSubject, Su as updateEntity, Pa as useCommonMapper, at as useDayjs, Oo as useDialog, Yu as useFieldValidation, aT as useLinidConfigurationStore, tT as useLinidFilterUrl, Iu as useLinidUiStore, Bu as useLinidUserPreference, Ru as useLinidUserPreferenceStore, sT as useLinidUserStore, Qe as useLinidZoneStore, Xu as useNotify, ed as useNunjucks, td as usePagination, _w as useQuasarDate, vw as useQuasarFieldValidation, yw as useQuasarRules, Vu as useScopedI18n, bw as useTree, Yw as useUiDesign };
