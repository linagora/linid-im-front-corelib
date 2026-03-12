import * as En from "vue";
import { defineAsyncComponent as $s, hasInjectionContext as In, inject as xt, getCurrentInstance as Bs, ref as Qt, reactive as js, markRaw as mt, effectScope as Hs, isRef as ht, isReactive as or, toRef as gn, toRaw as qs, nextTick as Or, getCurrentScope as Ws, onScopeDispose as Gs, watch as Pn, computed as Ue, toRefs as Sr, defineComponent as zt, openBlock as bn, createElementBlock as Tr, Fragment as Vt, renderList as Ys, unref as Ar, createBlock as Ks, resolveDynamicComponent as Xs, mergeProps as Js, renderSlot as Qs, createCommentVNode as zs, onMounted as Io, onUnmounted as Po, shallowRef as Zs, h as wo, createVNode as ei, Text as ti } from "vue";
let $t = null;
function Ku(e) {
  if ($t !== null) {
    console.warn(
      "[LinID CoreLib] Module Federation has already been initialized. Re-initialization is ignored."
    );
    return;
  }
  $t = e;
}
function ni() {
  if ($t === null)
    throw new Error(
      "[LinID CoreLib] Module Federation is not initialized. Call setModuleFederation() first."
    );
  return $t;
}
const ri = (e) => $s(
  () => ni().loadRemote(e).then((t) => {
    if (!t?.default)
      throw new Error(`Failed to load component from ${e}`);
    return t.default;
  })
);
const tt = typeof window < "u";
let qe;
const Bt = (e) => qe = e;
process.env.NODE_ENV;
const wn = process.env.NODE_ENV !== "production" ? /* @__PURE__ */ Symbol("pinia") : (
  /* istanbul ignore next */
  /* @__PURE__ */ Symbol()
);
function Ke(e) {
  return e && typeof e == "object" && Object.prototype.toString.call(e) === "[object Object]" && typeof e.toJSON != "function";
}
var _t;
(function(e) {
  e.direct = "direct", e.patchObject = "patch object", e.patchFunction = "patch function";
})(_t || (_t = {}));
function Do(e, t) {
  for (const n in t) {
    const r = t[n];
    if (!(n in e))
      continue;
    const o = e[n];
    Ke(o) && Ke(r) && !ht(r) && !or(r) ? e[n] = Do(o, r) : e[n] = r;
  }
  return e;
}
const ko = () => {
};
function Lr(e, t, n, r = ko) {
  e.add(t);
  const o = () => {
    e.delete(t) && r();
  };
  return !n && Ws() && Gs(o), o;
}
function ze(e, ...t) {
  e.forEach((n) => {
    n(...t);
  });
}
const oi = (e) => e(), Rr = /* @__PURE__ */ Symbol(), yn = /* @__PURE__ */ Symbol();
function Dn(e, t) {
  e instanceof Map && t instanceof Map ? t.forEach((n, r) => e.set(r, n)) : e instanceof Set && t instanceof Set && t.forEach(e.add, e);
  for (const n in t) {
    if (!t.hasOwnProperty(n))
      continue;
    const r = t[n], o = e[n];
    Ke(o) && Ke(r) && e.hasOwnProperty(n) && !ht(r) && !or(r) ? e[n] = Dn(o, r) : e[n] = r;
  }
  return e;
}
const si = process.env.NODE_ENV !== "production" ? /* @__PURE__ */ Symbol("pinia:skipHydration") : (
  /* istanbul ignore next */
  /* @__PURE__ */ Symbol()
);
function ii(e) {
  return !Ke(e) || !Object.prototype.hasOwnProperty.call(e, si);
}
const { assign: _e } = Object;
function vr(e) {
  return !!(ht(e) && e.effect);
}
function Cr(e, t, n, r) {
  const { state: o, actions: s, getters: i } = t, a = n.state.value[e];
  let c;
  function f() {
    !a && (process.env.NODE_ENV === "production" || !r) && (n.state.value[e] = o ? o() : {});
    const u = process.env.NODE_ENV !== "production" && r ? (
      // use ref() to unwrap refs inside state TODO: check if this is still necessary
      Sr(Qt(o ? o() : {}).value)
    ) : Sr(n.state.value[e]);
    return _e(u, s, Object.keys(i || {}).reduce((p, _) => (process.env.NODE_ENV !== "production" && _ in u && console.warn(`[🍍]: A getter cannot have the same name as another state property. Rename one of them. Found with "${_}" in store "${e}".`), p[_] = mt(Ue(() => {
      Bt(n);
      const L = n._s.get(e);
      return i[_].call(L, L);
    })), p), {}));
  }
  return c = kn(e, f, t, n, r, !0), c;
}
function kn(e, t, n = {}, r, o, s) {
  let i;
  const a = _e({ actions: {} }, n);
  if (process.env.NODE_ENV !== "production" && !r._e.active)
    throw new Error("Pinia destroyed");
  const c = { deep: !0 };
  process.env.NODE_ENV !== "production" && (c.onTrigger = (I) => {
    f ? L = I : f == !1 && !h._hotUpdating && (Array.isArray(L) ? L.push(I) : console.error("🍍 debuggerEvents should be an array. This is most likely an internal Pinia bug."));
  });
  let f, u, p = /* @__PURE__ */ new Set(), _ = /* @__PURE__ */ new Set(), L;
  const g = r.state.value[e];
  !s && !g && (process.env.NODE_ENV === "production" || !o) && (r.state.value[e] = {});
  const b = Qt({});
  let N;
  function m(I) {
    let P;
    f = u = !1, process.env.NODE_ENV !== "production" && (L = []), typeof I == "function" ? (I(r.state.value[e]), P = {
      type: _t.patchFunction,
      storeId: e,
      events: L
    }) : (Dn(r.state.value[e], I), P = {
      type: _t.patchObject,
      payload: I,
      storeId: e,
      events: L
    });
    const k = N = /* @__PURE__ */ Symbol();
    Or().then(() => {
      N === k && (f = !0);
    }), u = !0, ze(p, P, r.state.value[e]);
  }
  const O = s ? function() {
    const { state: P } = n, k = P ? P() : {};
    this.$patch((q) => {
      _e(q, k);
    });
  } : (
    /* istanbul ignore next */
    process.env.NODE_ENV !== "production" ? () => {
      throw new Error(`🍍: Store "${e}" is built using the setup syntax and does not implement $reset().`);
    } : ko
  );
  function T() {
    i.stop(), p.clear(), _.clear(), r._s.delete(e);
  }
  const y = (I, P = "") => {
    if (Rr in I)
      return I[yn] = P, I;
    const k = function() {
      Bt(r);
      const q = Array.from(arguments), oe = /* @__PURE__ */ new Set(), Ne = /* @__PURE__ */ new Set();
      function z(Z) {
        oe.add(Z);
      }
      function ke(Z) {
        Ne.add(Z);
      }
      ze(_, {
        args: q,
        name: k[yn],
        store: h,
        after: z,
        onError: ke
      });
      let ee;
      try {
        ee = I.apply(this && this.$id === e ? this : h, q);
      } catch (Z) {
        throw ze(Ne, Z), Z;
      }
      return ee instanceof Promise ? ee.then((Z) => (ze(oe, Z), Z)).catch((Z) => (ze(Ne, Z), Promise.reject(Z))) : (ze(oe, ee), ee);
    };
    return k[Rr] = !0, k[yn] = P, k;
  }, v = /* @__PURE__ */ mt({
    actions: {},
    getters: {},
    state: [],
    hotState: b
  }), C = {
    _p: r,
    // _s: scope,
    $id: e,
    $onAction: Lr.bind(null, _),
    $patch: m,
    $reset: O,
    $subscribe(I, P = {}) {
      const k = Lr(p, I, P.detached, () => q()), q = i.run(() => Pn(() => r.state.value[e], (oe) => {
        (P.flush === "sync" ? u : f) && I({
          storeId: e,
          type: _t.direct,
          events: L
        }, oe);
      }, _e({}, c, P)));
      return k;
    },
    $dispose: T
  }, h = js(process.env.NODE_ENV !== "production" || process.env.NODE_ENV !== "production" && process.env.NODE_ENV !== "test" && tt ? _e(
    {
      _hmrPayload: v,
      _customProperties: mt(/* @__PURE__ */ new Set())
      // devtools custom properties
    },
    C
    // must be added later
    // setupStore
  ) : C);
  r._s.set(e, h);
  const M = (r._a && r._a.runWithContext || oi)(() => r._e.run(() => (i = Hs()).run(() => t({ action: y }))));
  for (const I in M) {
    const P = M[I];
    if (ht(P) && !vr(P) || or(P))
      process.env.NODE_ENV !== "production" && o ? b.value[I] = gn(M, I) : s || (g && ii(P) && (ht(P) ? P.value = g[I] : Dn(P, g[I])), r.state.value[e][I] = P), process.env.NODE_ENV !== "production" && v.state.push(I);
    else if (typeof P == "function") {
      const k = process.env.NODE_ENV !== "production" && o ? P : y(P, I);
      M[I] = k, process.env.NODE_ENV !== "production" && (v.actions[I] = P), a.actions[I] = P;
    } else process.env.NODE_ENV !== "production" && vr(P) && (v.getters[I] = s ? (
      // @ts-expect-error
      n.getters[I]
    ) : P, tt && (M._getters || // @ts-expect-error: same
    (M._getters = mt([]))).push(I));
  }
  if (_e(h, M), _e(qs(h), M), Object.defineProperty(h, "$state", {
    get: () => process.env.NODE_ENV !== "production" && o ? b.value : r.state.value[e],
    set: (I) => {
      if (process.env.NODE_ENV !== "production" && o)
        throw new Error("cannot set hotState");
      m((P) => {
        _e(P, I);
      });
    }
  }), process.env.NODE_ENV !== "production" && (h._hotUpdate = mt((I) => {
    h._hotUpdating = !0, I._hmrPayload.state.forEach((P) => {
      if (P in h.$state) {
        const k = I.$state[P], q = h.$state[P];
        typeof k == "object" && Ke(k) && Ke(q) ? Do(k, q) : I.$state[P] = q;
      }
      h[P] = gn(I.$state, P);
    }), Object.keys(h.$state).forEach((P) => {
      P in I.$state || delete h[P];
    }), f = !1, u = !1, r.state.value[e] = gn(I._hmrPayload, "hotState"), u = !0, Or().then(() => {
      f = !0;
    });
    for (const P in I._hmrPayload.actions) {
      const k = I[P];
      h[P] = //
      y(k, P);
    }
    for (const P in I._hmrPayload.getters) {
      const k = I._hmrPayload.getters[P], q = s ? (
        // special handling of options api
        Ue(() => (Bt(r), k.call(h, h)))
      ) : k;
      h[P] = //
      q;
    }
    Object.keys(h._hmrPayload.getters).forEach((P) => {
      P in I._hmrPayload.getters || delete h[P];
    }), Object.keys(h._hmrPayload.actions).forEach((P) => {
      P in I._hmrPayload.actions || delete h[P];
    }), h._hmrPayload = I._hmrPayload, h._getters = I._getters, h._hotUpdating = !1;
  })), process.env.NODE_ENV !== "production" && process.env.NODE_ENV !== "test" && tt) {
    const I = {
      writable: !0,
      configurable: !0,
      // avoid warning on devtools trying to display this property
      enumerable: !1
    };
    ["_p", "_hmrPayload", "_getters", "_customProperties"].forEach((P) => {
      Object.defineProperty(h, P, _e({ value: h[P] }, I));
    });
  }
  return r._p.forEach((I) => {
    if (process.env.NODE_ENV !== "production" && process.env.NODE_ENV !== "test" && tt) {
      const P = i.run(() => I({
        store: h,
        app: r._a,
        pinia: r,
        options: a
      }));
      Object.keys(P || {}).forEach((k) => h._customProperties.add(k)), _e(h, P);
    } else
      _e(h, i.run(() => I({
        store: h,
        app: r._a,
        pinia: r,
        options: a
      })));
  }), process.env.NODE_ENV !== "production" && h.$state && typeof h.$state == "object" && typeof h.$state.constructor == "function" && !h.$state.constructor.toString().includes("[native code]") && console.warn(`[🍍]: The "state" must be a plain object. It cannot be
	state: () => new MyClass()
Found in store "${h.$id}".`), g && s && n.hydrate && n.hydrate(h.$state, g), f = !0, u = !0, h;
}
// @__NO_SIDE_EFFECTS__
function sr(e, t, n) {
  let r;
  const o = typeof t == "function";
  r = o ? n : t;
  function s(i, a) {
    const c = In();
    if (i = // in test mode, ignore the argument provided as we can always retrieve a
    // pinia instance with getActivePinia()
    (process.env.NODE_ENV === "test" && qe && qe._testing ? null : i) || (c ? xt(wn, null) : null), i && Bt(i), process.env.NODE_ENV !== "production" && !qe)
      throw new Error(`[🍍]: "getActivePinia()" was called but there was no active Pinia. Are you trying to use a store before calling "app.use(pinia)"?
See https://pinia.vuejs.org/core-concepts/outside-component-usage.html for help.
This will fail in production.`);
    i = qe, i._s.has(e) || (o ? kn(e, t, r, i) : Cr(e, r, i), process.env.NODE_ENV !== "production" && (s._pinia = i));
    const f = i._s.get(e);
    if (process.env.NODE_ENV !== "production" && a) {
      const u = "__hot:" + e, p = o ? kn(u, t, r, i, !0) : Cr(u, _e({}, r), i, !0);
      a._hotUpdate(p), delete i.state.value[u], i._s.delete(u);
    }
    if (process.env.NODE_ENV !== "production" && tt) {
      const u = Bs();
      if (u && u.proxy && // avoid adding stores that are just built for hot module replacement
      !a) {
        const p = u.proxy, _ = "_pStores" in p ? p._pStores : p._pStores = {};
        _[e] = f;
      }
    }
    return f;
  }
  return s.$id = e, s;
}
let jt = null;
function Xu(e) {
  if (jt !== null) {
    console.warn(
      "[LinID CoreLib] Pinia store has already been initialized. Re-initialization is ignored."
    );
    return;
  }
  jt = e;
}
function ir() {
  if (jt === null)
    throw new Error(
      "[LinID CoreLib] Pinia store is not initialized. Call setPiniaStore() first."
    );
  return jt;
}
const ai = () => ci(ir()), ci = /* @__PURE__ */ sr("linidZoneStore", {
  state: () => ({
    zones: {}
  }),
  actions: {
    /**
     * Register a new entry in a specified zone.
     * @param zone - The name of the zone.
     * @param entry - The entry to register.
     */
    register(e, t) {
      this.zones[e] || (this.zones[e] = []), this.zones[e].push(t);
    },
    /**
     * Register a new entry only if the plugin
     * is not already registered in the zone.
     * @param zone - The name of the zone.
     * @param entry - The entry to register.
     */
    registerOnce(e, t) {
      this.zones[e]?.some(({ plugin: n }) => n === t.plugin) || this.register(e, t);
    }
  }
}), Ju = /* @__PURE__ */ zt({
  inheritAttrs: !1,
  __name: "LinidZoneRenderer",
  props: {
    zone: {}
  },
  setup(e) {
    const t = e, r = (ai().zones[t.zone] || []).map(
      (o) => ({
        ...o,
        component: ri(o.plugin)
      })
    );
    return (o, s) => (bn(), Tr(Vt, null, [
      (bn(!0), Tr(Vt, null, Ys(Ar(r), (i, a) => (bn(), Ks(Xs(i.component), Js({
        key: i.plugin + a
      }, { ref_for: !0 }, { ...o.$attrs, ...i.props }), null, 16))), 128)),
      Ar(r).length === 0 ? Qs(o.$slots, "default", { key: 0 }) : zs("", !0)
    ], 64));
  }
});
var Fn = function(e, t) {
  return Fn = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(n, r) {
    n.__proto__ = r;
  } || function(n, r) {
    for (var o in r) Object.prototype.hasOwnProperty.call(r, o) && (n[o] = r[o]);
  }, Fn(e, t);
};
function Zt(e, t) {
  if (typeof t != "function" && t !== null)
    throw new TypeError("Class extends value " + String(t) + " is not a constructor or null");
  Fn(e, t);
  function n() {
    this.constructor = e;
  }
  e.prototype = t === null ? Object.create(t) : (n.prototype = t.prototype, new n());
}
function Un(e) {
  var t = typeof Symbol == "function" && Symbol.iterator, n = t && e[t], r = 0;
  if (n) return n.call(e);
  if (e && typeof e.length == "number") return {
    next: function() {
      return e && r >= e.length && (e = void 0), { value: e && e[r++], done: !e };
    }
  };
  throw new TypeError(t ? "Object is not iterable." : "Symbol.iterator is not defined.");
}
function Mn(e, t) {
  var n = typeof Symbol == "function" && e[Symbol.iterator];
  if (!n) return e;
  var r = n.call(e), o, s = [], i;
  try {
    for (; (t === void 0 || t-- > 0) && !(o = r.next()).done; ) s.push(o.value);
  } catch (a) {
    i = { error: a };
  } finally {
    try {
      o && !o.done && (n = r.return) && n.call(r);
    } finally {
      if (i) throw i.error;
    }
  }
  return s;
}
function xn(e, t, n) {
  if (n || arguments.length === 2) for (var r = 0, o = t.length, s; r < o; r++)
    (s || !(r in t)) && (s || (s = Array.prototype.slice.call(t, 0, r)), s[r] = t[r]);
  return e.concat(s || Array.prototype.slice.call(t));
}
function Ce(e) {
  return typeof e == "function";
}
function Fo(e) {
  var t = function(r) {
    Error.call(r), r.stack = new Error().stack;
  }, n = e(t);
  return n.prototype = Object.create(Error.prototype), n.prototype.constructor = n, n;
}
var Nn = Fo(function(e) {
  return function(n) {
    e(this), this.message = n ? n.length + ` errors occurred during unsubscription:
` + n.map(function(r, o) {
      return o + 1 + ") " + r.toString();
    }).join(`
  `) : "", this.name = "UnsubscriptionError", this.errors = n;
  };
});
function Vn(e, t) {
  if (e) {
    var n = e.indexOf(t);
    0 <= n && e.splice(n, 1);
  }
}
var en = (function() {
  function e(t) {
    this.initialTeardown = t, this.closed = !1, this._parentage = null, this._finalizers = null;
  }
  return e.prototype.unsubscribe = function() {
    var t, n, r, o, s;
    if (!this.closed) {
      this.closed = !0;
      var i = this._parentage;
      if (i)
        if (this._parentage = null, Array.isArray(i))
          try {
            for (var a = Un(i), c = a.next(); !c.done; c = a.next()) {
              var f = c.value;
              f.remove(this);
            }
          } catch (b) {
            t = { error: b };
          } finally {
            try {
              c && !c.done && (n = a.return) && n.call(a);
            } finally {
              if (t) throw t.error;
            }
          }
        else
          i.remove(this);
      var u = this.initialTeardown;
      if (Ce(u))
        try {
          u();
        } catch (b) {
          s = b instanceof Nn ? b.errors : [b];
        }
      var p = this._finalizers;
      if (p) {
        this._finalizers = null;
        try {
          for (var _ = Un(p), L = _.next(); !L.done; L = _.next()) {
            var g = L.value;
            try {
              Ir(g);
            } catch (b) {
              s = s ?? [], b instanceof Nn ? s = xn(xn([], Mn(s)), Mn(b.errors)) : s.push(b);
            }
          }
        } catch (b) {
          r = { error: b };
        } finally {
          try {
            L && !L.done && (o = _.return) && o.call(_);
          } finally {
            if (r) throw r.error;
          }
        }
      }
      if (s)
        throw new Nn(s);
    }
  }, e.prototype.add = function(t) {
    var n;
    if (t && t !== this)
      if (this.closed)
        Ir(t);
      else {
        if (t instanceof e) {
          if (t.closed || t._hasParent(this))
            return;
          t._addParent(this);
        }
        (this._finalizers = (n = this._finalizers) !== null && n !== void 0 ? n : []).push(t);
      }
  }, e.prototype._hasParent = function(t) {
    var n = this._parentage;
    return n === t || Array.isArray(n) && n.includes(t);
  }, e.prototype._addParent = function(t) {
    var n = this._parentage;
    this._parentage = Array.isArray(n) ? (n.push(t), n) : n ? [n, t] : t;
  }, e.prototype._removeParent = function(t) {
    var n = this._parentage;
    n === t ? this._parentage = null : Array.isArray(n) && Vn(n, t);
  }, e.prototype.remove = function(t) {
    var n = this._finalizers;
    n && Vn(n, t), t instanceof e && t._removeParent(this);
  }, e.EMPTY = (function() {
    var t = new e();
    return t.closed = !0, t;
  })(), e;
})(), Uo = en.EMPTY;
function Mo(e) {
  return e instanceof en || e && "closed" in e && Ce(e.remove) && Ce(e.add) && Ce(e.unsubscribe);
}
function Ir(e) {
  Ce(e) ? e() : e.unsubscribe();
}
var li = {
  Promise: void 0
}, ui = {
  setTimeout: function(e, t) {
    for (var n = [], r = 2; r < arguments.length; r++)
      n[r - 2] = arguments[r];
    return setTimeout.apply(void 0, xn([e, t], Mn(n)));
  },
  clearTimeout: function(e) {
    return clearTimeout(e);
  },
  delegate: void 0
};
function fi(e) {
  ui.setTimeout(function() {
    throw e;
  });
}
function Pr() {
}
function Dt(e) {
  e();
}
var xo = (function(e) {
  Zt(t, e);
  function t(n) {
    var r = e.call(this) || this;
    return r.isStopped = !1, n ? (r.destination = n, Mo(n) && n.add(r)) : r.destination = mi, r;
  }
  return t.create = function(n, r, o) {
    return new $n(n, r, o);
  }, t.prototype.next = function(n) {
    this.isStopped || this._next(n);
  }, t.prototype.error = function(n) {
    this.isStopped || (this.isStopped = !0, this._error(n));
  }, t.prototype.complete = function() {
    this.isStopped || (this.isStopped = !0, this._complete());
  }, t.prototype.unsubscribe = function() {
    this.closed || (this.isStopped = !0, e.prototype.unsubscribe.call(this), this.destination = null);
  }, t.prototype._next = function(n) {
    this.destination.next(n);
  }, t.prototype._error = function(n) {
    try {
      this.destination.error(n);
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
})(en), di = (function() {
  function e(t) {
    this.partialObserver = t;
  }
  return e.prototype.next = function(t) {
    var n = this.partialObserver;
    if (n.next)
      try {
        n.next(t);
      } catch (r) {
        vt(r);
      }
  }, e.prototype.error = function(t) {
    var n = this.partialObserver;
    if (n.error)
      try {
        n.error(t);
      } catch (r) {
        vt(r);
      }
    else
      vt(t);
  }, e.prototype.complete = function() {
    var t = this.partialObserver;
    if (t.complete)
      try {
        t.complete();
      } catch (n) {
        vt(n);
      }
  }, e;
})(), $n = (function(e) {
  Zt(t, e);
  function t(n, r, o) {
    var s = e.call(this) || this, i;
    return Ce(n) || !n ? i = {
      next: n ?? void 0,
      error: r ?? void 0,
      complete: o ?? void 0
    } : i = n, s.destination = new di(i), s;
  }
  return t;
})(xo);
function vt(e) {
  fi(e);
}
function pi(e) {
  throw e;
}
var mi = {
  closed: !0,
  next: Pr,
  error: pi,
  complete: Pr
}, _i = (function() {
  return typeof Symbol == "function" && Symbol.observable || "@@observable";
})();
function hi(e) {
  return e;
}
function Ei(e) {
  return e.length === 0 ? hi : e.length === 1 ? e[0] : function(n) {
    return e.reduce(function(r, o) {
      return o(r);
    }, n);
  };
}
var wr = (function() {
  function e(t) {
    t && (this._subscribe = t);
  }
  return e.prototype.lift = function(t) {
    var n = new e();
    return n.source = this, n.operator = t, n;
  }, e.prototype.subscribe = function(t, n, r) {
    var o = this, s = bi(t) ? t : new $n(t, n, r);
    return Dt(function() {
      var i = o, a = i.operator, c = i.source;
      s.add(a ? a.call(s, c) : c ? o._subscribe(s) : o._trySubscribe(s));
    }), s;
  }, e.prototype._trySubscribe = function(t) {
    try {
      return this._subscribe(t);
    } catch (n) {
      t.error(n);
    }
  }, e.prototype.forEach = function(t, n) {
    var r = this;
    return n = Dr(n), new n(function(o, s) {
      var i = new $n({
        next: function(a) {
          try {
            t(a);
          } catch (c) {
            s(c), i.unsubscribe();
          }
        },
        error: s,
        complete: o
      });
      r.subscribe(i);
    });
  }, e.prototype._subscribe = function(t) {
    var n;
    return (n = this.source) === null || n === void 0 ? void 0 : n.subscribe(t);
  }, e.prototype[_i] = function() {
    return this;
  }, e.prototype.pipe = function() {
    for (var t = [], n = 0; n < arguments.length; n++)
      t[n] = arguments[n];
    return Ei(t)(this);
  }, e.prototype.toPromise = function(t) {
    var n = this;
    return t = Dr(t), new t(function(r, o) {
      var s;
      n.subscribe(function(i) {
        return s = i;
      }, function(i) {
        return o(i);
      }, function() {
        return r(s);
      });
    });
  }, e.create = function(t) {
    return new e(t);
  }, e;
})();
function Dr(e) {
  var t;
  return (t = e ?? li.Promise) !== null && t !== void 0 ? t : Promise;
}
function gi(e) {
  return e && Ce(e.next) && Ce(e.error) && Ce(e.complete);
}
function bi(e) {
  return e && e instanceof xo || gi(e) && Mo(e);
}
var yi = Fo(function(e) {
  return function() {
    e(this), this.name = "ObjectUnsubscribedError", this.message = "object unsubscribed";
  };
}), Vo = (function(e) {
  Zt(t, e);
  function t() {
    var n = e.call(this) || this;
    return n.closed = !1, n.currentObservers = null, n.observers = [], n.isStopped = !1, n.hasError = !1, n.thrownError = null, n;
  }
  return t.prototype.lift = function(n) {
    var r = new kr(this, this);
    return r.operator = n, r;
  }, t.prototype._throwIfClosed = function() {
    if (this.closed)
      throw new yi();
  }, t.prototype.next = function(n) {
    var r = this;
    Dt(function() {
      var o, s;
      if (r._throwIfClosed(), !r.isStopped) {
        r.currentObservers || (r.currentObservers = Array.from(r.observers));
        try {
          for (var i = Un(r.currentObservers), a = i.next(); !a.done; a = i.next()) {
            var c = a.value;
            c.next(n);
          }
        } catch (f) {
          o = { error: f };
        } finally {
          try {
            a && !a.done && (s = i.return) && s.call(i);
          } finally {
            if (o) throw o.error;
          }
        }
      }
    });
  }, t.prototype.error = function(n) {
    var r = this;
    Dt(function() {
      if (r._throwIfClosed(), !r.isStopped) {
        r.hasError = r.isStopped = !0, r.thrownError = n;
        for (var o = r.observers; o.length; )
          o.shift().error(n);
      }
    });
  }, t.prototype.complete = function() {
    var n = this;
    Dt(function() {
      if (n._throwIfClosed(), !n.isStopped) {
        n.isStopped = !0;
        for (var r = n.observers; r.length; )
          r.shift().complete();
      }
    });
  }, t.prototype.unsubscribe = function() {
    this.isStopped = this.closed = !0, this.observers = this.currentObservers = null;
  }, Object.defineProperty(t.prototype, "observed", {
    get: function() {
      var n;
      return ((n = this.observers) === null || n === void 0 ? void 0 : n.length) > 0;
    },
    enumerable: !1,
    configurable: !0
  }), t.prototype._trySubscribe = function(n) {
    return this._throwIfClosed(), e.prototype._trySubscribe.call(this, n);
  }, t.prototype._subscribe = function(n) {
    return this._throwIfClosed(), this._checkFinalizedStatuses(n), this._innerSubscribe(n);
  }, t.prototype._innerSubscribe = function(n) {
    var r = this, o = this, s = o.hasError, i = o.isStopped, a = o.observers;
    return s || i ? Uo : (this.currentObservers = null, a.push(n), new en(function() {
      r.currentObservers = null, Vn(a, n);
    }));
  }, t.prototype._checkFinalizedStatuses = function(n) {
    var r = this, o = r.hasError, s = r.thrownError, i = r.isStopped;
    o ? n.error(s) : i && n.complete();
  }, t.prototype.asObservable = function() {
    var n = new wr();
    return n.source = this, n;
  }, t.create = function(n, r) {
    return new kr(n, r);
  }, t;
})(wr), kr = (function(e) {
  Zt(t, e);
  function t(n, r) {
    var o = e.call(this) || this;
    return o.destination = n, o.source = r, o;
  }
  return t.prototype.next = function(n) {
    var r, o;
    (o = (r = this.destination) === null || r === void 0 ? void 0 : r.next) === null || o === void 0 || o.call(r, n);
  }, t.prototype.error = function(n) {
    var r, o;
    (o = (r = this.destination) === null || r === void 0 ? void 0 : r.error) === null || o === void 0 || o.call(r, n);
  }, t.prototype.complete = function() {
    var n, r;
    (r = (n = this.destination) === null || n === void 0 ? void 0 : n.complete) === null || r === void 0 || r.call(n);
  }, t.prototype._subscribe = function(n) {
    var r, o;
    return (o = (r = this.source) === null || r === void 0 ? void 0 : r.subscribe(n)) !== null && o !== void 0 ? o : Uo;
  }, t;
})(Vo);
const $o = new Vo();
function Qu(e, t) {
  const n = Qt(!1);
  let r;
  function o(s) {
    if (s.key !== e)
      return;
    const i = s.data;
    if (i.type === "close") {
      n.value = !1;
      return;
    }
    n.value = !0, t?.(i);
  }
  return Io(() => {
    r = $o.subscribe(o);
  }), Po(() => {
    r?.unsubscribe();
  }), { show: n };
}
function Bo(e, t) {
  return function() {
    return e.apply(t, arguments);
  };
}
const { toString: Ni } = Object.prototype, { getPrototypeOf: ar } = Object, { iterator: tn, toStringTag: jo } = Symbol, nn = /* @__PURE__ */ ((e) => (t) => {
  const n = Ni.call(t);
  return e[n] || (e[n] = n.slice(8, -1).toLowerCase());
})(/* @__PURE__ */ Object.create(null)), ye = (e) => (e = e.toLowerCase(), (t) => nn(t) === e), rn = (e) => (t) => typeof t === e, { isArray: it } = Array, nt = rn("undefined");
function Nt(e) {
  return e !== null && !nt(e) && e.constructor !== null && !nt(e.constructor) && ue(e.constructor.isBuffer) && e.constructor.isBuffer(e);
}
const Ho = ye("ArrayBuffer");
function Oi(e) {
  let t;
  return typeof ArrayBuffer < "u" && ArrayBuffer.isView ? t = ArrayBuffer.isView(e) : t = e && e.buffer && Ho(e.buffer), t;
}
const Si = rn("string"), ue = rn("function"), qo = rn("number"), Ot = (e) => e !== null && typeof e == "object", Ti = (e) => e === !0 || e === !1, kt = (e) => {
  if (nn(e) !== "object")
    return !1;
  const t = ar(e);
  return (t === null || t === Object.prototype || Object.getPrototypeOf(t) === null) && !(jo in e) && !(tn in e);
}, Ai = (e) => {
  if (!Ot(e) || Nt(e))
    return !1;
  try {
    return Object.keys(e).length === 0 && Object.getPrototypeOf(e) === Object.prototype;
  } catch {
    return !1;
  }
}, Li = ye("Date"), Ri = ye("File"), vi = (e) => !!(e && typeof e.uri < "u"), Ci = (e) => e && typeof e.getParts < "u", Ii = ye("Blob"), Pi = ye("FileList"), wi = (e) => Ot(e) && ue(e.pipe);
function Di() {
  return typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {};
}
const Fr = Di(), Ur = typeof Fr.FormData < "u" ? Fr.FormData : void 0, ki = (e) => {
  let t;
  return e && (Ur && e instanceof Ur || ue(e.append) && ((t = nn(e)) === "formdata" || // detect form-data instance
  t === "object" && ue(e.toString) && e.toString() === "[object FormData]"));
}, Fi = ye("URLSearchParams"), [Ui, Mi, xi, Vi] = [
  "ReadableStream",
  "Request",
  "Response",
  "Headers"
].map(ye), $i = (e) => e.trim ? e.trim() : e.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
function St(e, t, { allOwnKeys: n = !1 } = {}) {
  if (e === null || typeof e > "u")
    return;
  let r, o;
  if (typeof e != "object" && (e = [e]), it(e))
    for (r = 0, o = e.length; r < o; r++)
      t.call(null, e[r], r, e);
  else {
    if (Nt(e))
      return;
    const s = n ? Object.getOwnPropertyNames(e) : Object.keys(e), i = s.length;
    let a;
    for (r = 0; r < i; r++)
      a = s[r], t.call(null, e[a], a, e);
  }
}
function Wo(e, t) {
  if (Nt(e))
    return null;
  t = t.toLowerCase();
  const n = Object.keys(e);
  let r = n.length, o;
  for (; r-- > 0; )
    if (o = n[r], t === o.toLowerCase())
      return o;
  return null;
}
const We = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : global, Go = (e) => !nt(e) && e !== We;
function Bn() {
  const { caseless: e, skipUndefined: t } = Go(this) && this || {}, n = {}, r = (o, s) => {
    if (s === "__proto__" || s === "constructor" || s === "prototype")
      return;
    const i = e && Wo(n, s) || s;
    kt(n[i]) && kt(o) ? n[i] = Bn(n[i], o) : kt(o) ? n[i] = Bn({}, o) : it(o) ? n[i] = o.slice() : (!t || !nt(o)) && (n[i] = o);
  };
  for (let o = 0, s = arguments.length; o < s; o++)
    arguments[o] && St(arguments[o], r);
  return n;
}
const Bi = (e, t, n, { allOwnKeys: r } = {}) => (St(
  t,
  (o, s) => {
    n && ue(o) ? Object.defineProperty(e, s, {
      value: Bo(o, n),
      writable: !0,
      enumerable: !0,
      configurable: !0
    }) : Object.defineProperty(e, s, {
      value: o,
      writable: !0,
      enumerable: !0,
      configurable: !0
    });
  },
  { allOwnKeys: r }
), e), ji = (e) => (e.charCodeAt(0) === 65279 && (e = e.slice(1)), e), Hi = (e, t, n, r) => {
  e.prototype = Object.create(t.prototype, r), Object.defineProperty(e.prototype, "constructor", {
    value: e,
    writable: !0,
    enumerable: !1,
    configurable: !0
  }), Object.defineProperty(e, "super", {
    value: t.prototype
  }), n && Object.assign(e.prototype, n);
}, qi = (e, t, n, r) => {
  let o, s, i;
  const a = {};
  if (t = t || {}, e == null) return t;
  do {
    for (o = Object.getOwnPropertyNames(e), s = o.length; s-- > 0; )
      i = o[s], (!r || r(i, e, t)) && !a[i] && (t[i] = e[i], a[i] = !0);
    e = n !== !1 && ar(e);
  } while (e && (!n || n(e, t)) && e !== Object.prototype);
  return t;
}, Wi = (e, t, n) => {
  e = String(e), (n === void 0 || n > e.length) && (n = e.length), n -= t.length;
  const r = e.indexOf(t, n);
  return r !== -1 && r === n;
}, Gi = (e) => {
  if (!e) return null;
  if (it(e)) return e;
  let t = e.length;
  if (!qo(t)) return null;
  const n = new Array(t);
  for (; t-- > 0; )
    n[t] = e[t];
  return n;
}, Yi = /* @__PURE__ */ ((e) => (t) => e && t instanceof e)(typeof Uint8Array < "u" && ar(Uint8Array)), Ki = (e, t) => {
  const r = (e && e[tn]).call(e);
  let o;
  for (; (o = r.next()) && !o.done; ) {
    const s = o.value;
    t.call(e, s[0], s[1]);
  }
}, Xi = (e, t) => {
  let n;
  const r = [];
  for (; (n = e.exec(t)) !== null; )
    r.push(n);
  return r;
}, Ji = ye("HTMLFormElement"), Qi = (e) => e.toLowerCase().replace(/[-_\s]([a-z\d])(\w*)/g, function(n, r, o) {
  return r.toUpperCase() + o;
}), Mr = (({ hasOwnProperty: e }) => (t, n) => e.call(t, n))(Object.prototype), zi = ye("RegExp"), Yo = (e, t) => {
  const n = Object.getOwnPropertyDescriptors(e), r = {};
  St(n, (o, s) => {
    let i;
    (i = t(o, s, e)) !== !1 && (r[s] = i || o);
  }), Object.defineProperties(e, r);
}, Zi = (e) => {
  Yo(e, (t, n) => {
    if (ue(e) && ["arguments", "caller", "callee"].indexOf(n) !== -1)
      return !1;
    const r = e[n];
    if (ue(r)) {
      if (t.enumerable = !1, "writable" in t) {
        t.writable = !1;
        return;
      }
      t.set || (t.set = () => {
        throw Error("Can not rewrite read-only method '" + n + "'");
      });
    }
  });
}, ea = (e, t) => {
  const n = {}, r = (o) => {
    o.forEach((s) => {
      n[s] = !0;
    });
  };
  return it(e) ? r(e) : r(String(e).split(t)), n;
}, ta = () => {
}, na = (e, t) => e != null && Number.isFinite(e = +e) ? e : t;
function ra(e) {
  return !!(e && ue(e.append) && e[jo] === "FormData" && e[tn]);
}
const oa = (e) => {
  const t = new Array(10), n = (r, o) => {
    if (Ot(r)) {
      if (t.indexOf(r) >= 0)
        return;
      if (Nt(r))
        return r;
      if (!("toJSON" in r)) {
        t[o] = r;
        const s = it(r) ? [] : {};
        return St(r, (i, a) => {
          const c = n(i, o + 1);
          !nt(c) && (s[a] = c);
        }), t[o] = void 0, s;
      }
    }
    return r;
  };
  return n(e, 0);
}, sa = ye("AsyncFunction"), ia = (e) => e && (Ot(e) || ue(e)) && ue(e.then) && ue(e.catch), Ko = ((e, t) => e ? setImmediate : t ? ((n, r) => (We.addEventListener(
  "message",
  ({ source: o, data: s }) => {
    o === We && s === n && r.length && r.shift()();
  },
  !1
), (o) => {
  r.push(o), We.postMessage(n, "*");
}))(`axios@${Math.random()}`, []) : (n) => setTimeout(n))(typeof setImmediate == "function", ue(We.postMessage)), aa = typeof queueMicrotask < "u" ? queueMicrotask.bind(We) : typeof process < "u" && process.nextTick || Ko, ca = (e) => e != null && ue(e[tn]), E = {
  isArray: it,
  isArrayBuffer: Ho,
  isBuffer: Nt,
  isFormData: ki,
  isArrayBufferView: Oi,
  isString: Si,
  isNumber: qo,
  isBoolean: Ti,
  isObject: Ot,
  isPlainObject: kt,
  isEmptyObject: Ai,
  isReadableStream: Ui,
  isRequest: Mi,
  isResponse: xi,
  isHeaders: Vi,
  isUndefined: nt,
  isDate: Li,
  isFile: Ri,
  isReactNativeBlob: vi,
  isReactNative: Ci,
  isBlob: Ii,
  isRegExp: zi,
  isFunction: ue,
  isStream: wi,
  isURLSearchParams: Fi,
  isTypedArray: Yi,
  isFileList: Pi,
  forEach: St,
  merge: Bn,
  extend: Bi,
  trim: $i,
  stripBOM: ji,
  inherits: Hi,
  toFlatObject: qi,
  kindOf: nn,
  kindOfTest: ye,
  endsWith: Wi,
  toArray: Gi,
  forEachEntry: Ki,
  matchAll: Xi,
  isHTMLForm: Ji,
  hasOwnProperty: Mr,
  hasOwnProp: Mr,
  // an alias to avoid ESLint no-prototype-builtins detection
  reduceDescriptors: Yo,
  freezeMethods: Zi,
  toObjectSet: ea,
  toCamelCase: Qi,
  noop: ta,
  toFiniteNumber: na,
  findKey: Wo,
  global: We,
  isContextDefined: Go,
  isSpecCompliantForm: ra,
  toJSONObject: oa,
  isAsyncFn: sa,
  isThenable: ia,
  setImmediate: Ko,
  asap: aa,
  isIterable: ca
};
let U = class Xo extends Error {
  static from(t, n, r, o, s, i) {
    const a = new Xo(t.message, n || t.code, r, o, s);
    return a.cause = t, a.name = t.name, t.status != null && a.status == null && (a.status = t.status), i && Object.assign(a, i), a;
  }
  /**
   * Create an Error with the specified message, config, error code, request and response.
   *
   * @param {string} message The error message.
   * @param {string} [code] The error code (for example, 'ECONNABORTED').
   * @param {Object} [config] The config.
   * @param {Object} [request] The request.
   * @param {Object} [response] The response.
   *
   * @returns {Error} The created error.
   */
  constructor(t, n, r, o, s) {
    super(t), Object.defineProperty(this, "message", {
      value: t,
      enumerable: !0,
      writable: !0,
      configurable: !0
    }), this.name = "AxiosError", this.isAxiosError = !0, n && (this.code = n), r && (this.config = r), o && (this.request = o), s && (this.response = s, this.status = s.status);
  }
  toJSON() {
    return {
      // Standard
      message: this.message,
      name: this.name,
      // Microsoft
      description: this.description,
      number: this.number,
      // Mozilla
      fileName: this.fileName,
      lineNumber: this.lineNumber,
      columnNumber: this.columnNumber,
      stack: this.stack,
      // Axios
      config: E.toJSONObject(this.config),
      code: this.code,
      status: this.status
    };
  }
};
U.ERR_BAD_OPTION_VALUE = "ERR_BAD_OPTION_VALUE";
U.ERR_BAD_OPTION = "ERR_BAD_OPTION";
U.ECONNABORTED = "ECONNABORTED";
U.ETIMEDOUT = "ETIMEDOUT";
U.ERR_NETWORK = "ERR_NETWORK";
U.ERR_FR_TOO_MANY_REDIRECTS = "ERR_FR_TOO_MANY_REDIRECTS";
U.ERR_DEPRECATED = "ERR_DEPRECATED";
U.ERR_BAD_RESPONSE = "ERR_BAD_RESPONSE";
U.ERR_BAD_REQUEST = "ERR_BAD_REQUEST";
U.ERR_CANCELED = "ERR_CANCELED";
U.ERR_NOT_SUPPORT = "ERR_NOT_SUPPORT";
U.ERR_INVALID_URL = "ERR_INVALID_URL";
const la = null;
function jn(e) {
  return E.isPlainObject(e) || E.isArray(e);
}
function Jo(e) {
  return E.endsWith(e, "[]") ? e.slice(0, -2) : e;
}
function On(e, t, n) {
  return e ? e.concat(t).map(function(o, s) {
    return o = Jo(o), !n && s ? "[" + o + "]" : o;
  }).join(n ? "." : "") : t;
}
function ua(e) {
  return E.isArray(e) && !e.some(jn);
}
const fa = E.toFlatObject(E, {}, null, function(t) {
  return /^is[A-Z]/.test(t);
});
function on(e, t, n) {
  if (!E.isObject(e))
    throw new TypeError("target must be an object");
  t = t || new FormData(), n = E.toFlatObject(
    n,
    {
      metaTokens: !0,
      dots: !1,
      indexes: !1
    },
    !1,
    function(b, N) {
      return !E.isUndefined(N[b]);
    }
  );
  const r = n.metaTokens, o = n.visitor || u, s = n.dots, i = n.indexes, c = (n.Blob || typeof Blob < "u" && Blob) && E.isSpecCompliantForm(t);
  if (!E.isFunction(o))
    throw new TypeError("visitor must be a function");
  function f(g) {
    if (g === null) return "";
    if (E.isDate(g))
      return g.toISOString();
    if (E.isBoolean(g))
      return g.toString();
    if (!c && E.isBlob(g))
      throw new U("Blob is not supported. Use a Buffer instead.");
    return E.isArrayBuffer(g) || E.isTypedArray(g) ? c && typeof Blob == "function" ? new Blob([g]) : Buffer.from(g) : g;
  }
  function u(g, b, N) {
    let m = g;
    if (E.isReactNative(t) && E.isReactNativeBlob(g))
      return t.append(On(N, b, s), f(g)), !1;
    if (g && !N && typeof g == "object") {
      if (E.endsWith(b, "{}"))
        b = r ? b : b.slice(0, -2), g = JSON.stringify(g);
      else if (E.isArray(g) && ua(g) || (E.isFileList(g) || E.endsWith(b, "[]")) && (m = E.toArray(g)))
        return b = Jo(b), m.forEach(function(T, y) {
          !(E.isUndefined(T) || T === null) && t.append(
            // eslint-disable-next-line no-nested-ternary
            i === !0 ? On([b], y, s) : i === null ? b : b + "[]",
            f(T)
          );
        }), !1;
    }
    return jn(g) ? !0 : (t.append(On(N, b, s), f(g)), !1);
  }
  const p = [], _ = Object.assign(fa, {
    defaultVisitor: u,
    convertValue: f,
    isVisitable: jn
  });
  function L(g, b) {
    if (!E.isUndefined(g)) {
      if (p.indexOf(g) !== -1)
        throw Error("Circular reference detected in " + b.join("."));
      p.push(g), E.forEach(g, function(m, O) {
        (!(E.isUndefined(m) || m === null) && o.call(t, m, E.isString(O) ? O.trim() : O, b, _)) === !0 && L(m, b ? b.concat(O) : [O]);
      }), p.pop();
    }
  }
  if (!E.isObject(e))
    throw new TypeError("data must be an object");
  return L(e), t;
}
function xr(e) {
  const t = {
    "!": "%21",
    "'": "%27",
    "(": "%28",
    ")": "%29",
    "~": "%7E",
    "%20": "+",
    "%00": "\0"
  };
  return encodeURIComponent(e).replace(/[!'()~]|%20|%00/g, function(r) {
    return t[r];
  });
}
function cr(e, t) {
  this._pairs = [], e && on(e, this, t);
}
const Qo = cr.prototype;
Qo.append = function(t, n) {
  this._pairs.push([t, n]);
};
Qo.toString = function(t) {
  const n = t ? function(r) {
    return t.call(this, r, xr);
  } : xr;
  return this._pairs.map(function(o) {
    return n(o[0]) + "=" + n(o[1]);
  }, "").join("&");
};
function da(e) {
  return encodeURIComponent(e).replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+");
}
function zo(e, t, n) {
  if (!t)
    return e;
  const r = n && n.encode || da, o = E.isFunction(n) ? {
    serialize: n
  } : n, s = o && o.serialize;
  let i;
  if (s ? i = s(t, o) : i = E.isURLSearchParams(t) ? t.toString() : new cr(t, o).toString(r), i) {
    const a = e.indexOf("#");
    a !== -1 && (e = e.slice(0, a)), e += (e.indexOf("?") === -1 ? "?" : "&") + i;
  }
  return e;
}
class Vr {
  constructor() {
    this.handlers = [];
  }
  /**
   * Add a new interceptor to the stack
   *
   * @param {Function} fulfilled The function to handle `then` for a `Promise`
   * @param {Function} rejected The function to handle `reject` for a `Promise`
   * @param {Object} options The options for the interceptor, synchronous and runWhen
   *
   * @return {Number} An ID used to remove interceptor later
   */
  use(t, n, r) {
    return this.handlers.push({
      fulfilled: t,
      rejected: n,
      synchronous: r ? r.synchronous : !1,
      runWhen: r ? r.runWhen : null
    }), this.handlers.length - 1;
  }
  /**
   * Remove an interceptor from the stack
   *
   * @param {Number} id The ID that was returned by `use`
   *
   * @returns {void}
   */
  eject(t) {
    this.handlers[t] && (this.handlers[t] = null);
  }
  /**
   * Clear all interceptors from the stack
   *
   * @returns {void}
   */
  clear() {
    this.handlers && (this.handlers = []);
  }
  /**
   * Iterate over all the registered interceptors
   *
   * This method is particularly useful for skipping over any
   * interceptors that may have become `null` calling `eject`.
   *
   * @param {Function} fn The function to call for each interceptor
   *
   * @returns {void}
   */
  forEach(t) {
    E.forEach(this.handlers, function(r) {
      r !== null && t(r);
    });
  }
}
const lr = {
  silentJSONParsing: !0,
  forcedJSONParsing: !0,
  clarifyTimeoutError: !1,
  legacyInterceptorReqResOrdering: !0
}, pa = typeof URLSearchParams < "u" ? URLSearchParams : cr, ma = typeof FormData < "u" ? FormData : null, _a = typeof Blob < "u" ? Blob : null, ha = {
  isBrowser: !0,
  classes: {
    URLSearchParams: pa,
    FormData: ma,
    Blob: _a
  },
  protocols: ["http", "https", "file", "blob", "url", "data"]
}, ur = typeof window < "u" && typeof document < "u", Hn = typeof navigator == "object" && navigator || void 0, Ea = ur && (!Hn || ["ReactNative", "NativeScript", "NS"].indexOf(Hn.product) < 0), ga = typeof WorkerGlobalScope < "u" && // eslint-disable-next-line no-undef
self instanceof WorkerGlobalScope && typeof self.importScripts == "function", ba = ur && window.location.href || "http://localhost", ya = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  hasBrowserEnv: ur,
  hasStandardBrowserEnv: Ea,
  hasStandardBrowserWebWorkerEnv: ga,
  navigator: Hn,
  origin: ba
}, Symbol.toStringTag, { value: "Module" })), ce = {
  ...ya,
  ...ha
};
function Na(e, t) {
  return on(e, new ce.classes.URLSearchParams(), {
    visitor: function(n, r, o, s) {
      return ce.isNode && E.isBuffer(n) ? (this.append(r, n.toString("base64")), !1) : s.defaultVisitor.apply(this, arguments);
    },
    ...t
  });
}
function Oa(e) {
  return E.matchAll(/\w+|\[(\w*)]/g, e).map((t) => t[0] === "[]" ? "" : t[1] || t[0]);
}
function Sa(e) {
  const t = {}, n = Object.keys(e);
  let r;
  const o = n.length;
  let s;
  for (r = 0; r < o; r++)
    s = n[r], t[s] = e[s];
  return t;
}
function Zo(e) {
  function t(n, r, o, s) {
    let i = n[s++];
    if (i === "__proto__") return !0;
    const a = Number.isFinite(+i), c = s >= n.length;
    return i = !i && E.isArray(o) ? o.length : i, c ? (E.hasOwnProp(o, i) ? o[i] = [o[i], r] : o[i] = r, !a) : ((!o[i] || !E.isObject(o[i])) && (o[i] = []), t(n, r, o[i], s) && E.isArray(o[i]) && (o[i] = Sa(o[i])), !a);
  }
  if (E.isFormData(e) && E.isFunction(e.entries)) {
    const n = {};
    return E.forEachEntry(e, (r, o) => {
      t(Oa(r), o, n, 0);
    }), n;
  }
  return null;
}
function Ta(e, t, n) {
  if (E.isString(e))
    try {
      return (t || JSON.parse)(e), E.trim(e);
    } catch (r) {
      if (r.name !== "SyntaxError")
        throw r;
    }
  return (n || JSON.stringify)(e);
}
const Tt = {
  transitional: lr,
  adapter: ["xhr", "http", "fetch"],
  transformRequest: [
    function(t, n) {
      const r = n.getContentType() || "", o = r.indexOf("application/json") > -1, s = E.isObject(t);
      if (s && E.isHTMLForm(t) && (t = new FormData(t)), E.isFormData(t))
        return o ? JSON.stringify(Zo(t)) : t;
      if (E.isArrayBuffer(t) || E.isBuffer(t) || E.isStream(t) || E.isFile(t) || E.isBlob(t) || E.isReadableStream(t))
        return t;
      if (E.isArrayBufferView(t))
        return t.buffer;
      if (E.isURLSearchParams(t))
        return n.setContentType("application/x-www-form-urlencoded;charset=utf-8", !1), t.toString();
      let a;
      if (s) {
        if (r.indexOf("application/x-www-form-urlencoded") > -1)
          return Na(t, this.formSerializer).toString();
        if ((a = E.isFileList(t)) || r.indexOf("multipart/form-data") > -1) {
          const c = this.env && this.env.FormData;
          return on(
            a ? { "files[]": t } : t,
            c && new c(),
            this.formSerializer
          );
        }
      }
      return s || o ? (n.setContentType("application/json", !1), Ta(t)) : t;
    }
  ],
  transformResponse: [
    function(t) {
      const n = this.transitional || Tt.transitional, r = n && n.forcedJSONParsing, o = this.responseType === "json";
      if (E.isResponse(t) || E.isReadableStream(t))
        return t;
      if (t && E.isString(t) && (r && !this.responseType || o)) {
        const i = !(n && n.silentJSONParsing) && o;
        try {
          return JSON.parse(t, this.parseReviver);
        } catch (a) {
          if (i)
            throw a.name === "SyntaxError" ? U.from(a, U.ERR_BAD_RESPONSE, this, null, this.response) : a;
        }
      }
      return t;
    }
  ],
  /**
   * A timeout in milliseconds to abort a request. If set to 0 (default) a
   * timeout is not created.
   */
  timeout: 0,
  xsrfCookieName: "XSRF-TOKEN",
  xsrfHeaderName: "X-XSRF-TOKEN",
  maxContentLength: -1,
  maxBodyLength: -1,
  env: {
    FormData: ce.classes.FormData,
    Blob: ce.classes.Blob
  },
  validateStatus: function(t) {
    return t >= 200 && t < 300;
  },
  headers: {
    common: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": void 0
    }
  }
};
E.forEach(["delete", "get", "head", "post", "put", "patch"], (e) => {
  Tt.headers[e] = {};
});
const Aa = E.toObjectSet([
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
]), La = (e) => {
  const t = {};
  let n, r, o;
  return e && e.split(`
`).forEach(function(i) {
    o = i.indexOf(":"), n = i.substring(0, o).trim().toLowerCase(), r = i.substring(o + 1).trim(), !(!n || t[n] && Aa[n]) && (n === "set-cookie" ? t[n] ? t[n].push(r) : t[n] = [r] : t[n] = t[n] ? t[n] + ", " + r : r);
  }), t;
}, $r = /* @__PURE__ */ Symbol("internals");
function dt(e) {
  return e && String(e).trim().toLowerCase();
}
function Ft(e) {
  return e === !1 || e == null ? e : E.isArray(e) ? e.map(Ft) : String(e);
}
function Ra(e) {
  const t = /* @__PURE__ */ Object.create(null), n = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;
  let r;
  for (; r = n.exec(e); )
    t[r[1]] = r[2];
  return t;
}
const va = (e) => /^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(e.trim());
function Sn(e, t, n, r, o) {
  if (E.isFunction(r))
    return r.call(this, t, n);
  if (o && (t = n), !!E.isString(t)) {
    if (E.isString(r))
      return t.indexOf(r) !== -1;
    if (E.isRegExp(r))
      return r.test(t);
  }
}
function Ca(e) {
  return e.trim().toLowerCase().replace(/([a-z\d])(\w*)/g, (t, n, r) => n.toUpperCase() + r);
}
function Ia(e, t) {
  const n = E.toCamelCase(" " + t);
  ["get", "set", "has"].forEach((r) => {
    Object.defineProperty(e, r + n, {
      value: function(o, s, i) {
        return this[r].call(this, t, o, s, i);
      },
      configurable: !0
    });
  });
}
let fe = class {
  constructor(t) {
    t && this.set(t);
  }
  set(t, n, r) {
    const o = this;
    function s(a, c, f) {
      const u = dt(c);
      if (!u)
        throw new Error("header name must be a non-empty string");
      const p = E.findKey(o, u);
      (!p || o[p] === void 0 || f === !0 || f === void 0 && o[p] !== !1) && (o[p || c] = Ft(a));
    }
    const i = (a, c) => E.forEach(a, (f, u) => s(f, u, c));
    if (E.isPlainObject(t) || t instanceof this.constructor)
      i(t, n);
    else if (E.isString(t) && (t = t.trim()) && !va(t))
      i(La(t), n);
    else if (E.isObject(t) && E.isIterable(t)) {
      let a = {}, c, f;
      for (const u of t) {
        if (!E.isArray(u))
          throw TypeError("Object iterator must return a key-value pair");
        a[f = u[0]] = (c = a[f]) ? E.isArray(c) ? [...c, u[1]] : [c, u[1]] : u[1];
      }
      i(a, n);
    } else
      t != null && s(n, t, r);
    return this;
  }
  get(t, n) {
    if (t = dt(t), t) {
      const r = E.findKey(this, t);
      if (r) {
        const o = this[r];
        if (!n)
          return o;
        if (n === !0)
          return Ra(o);
        if (E.isFunction(n))
          return n.call(this, o, r);
        if (E.isRegExp(n))
          return n.exec(o);
        throw new TypeError("parser must be boolean|regexp|function");
      }
    }
  }
  has(t, n) {
    if (t = dt(t), t) {
      const r = E.findKey(this, t);
      return !!(r && this[r] !== void 0 && (!n || Sn(this, this[r], r, n)));
    }
    return !1;
  }
  delete(t, n) {
    const r = this;
    let o = !1;
    function s(i) {
      if (i = dt(i), i) {
        const a = E.findKey(r, i);
        a && (!n || Sn(r, r[a], a, n)) && (delete r[a], o = !0);
      }
    }
    return E.isArray(t) ? t.forEach(s) : s(t), o;
  }
  clear(t) {
    const n = Object.keys(this);
    let r = n.length, o = !1;
    for (; r--; ) {
      const s = n[r];
      (!t || Sn(this, this[s], s, t, !0)) && (delete this[s], o = !0);
    }
    return o;
  }
  normalize(t) {
    const n = this, r = {};
    return E.forEach(this, (o, s) => {
      const i = E.findKey(r, s);
      if (i) {
        n[i] = Ft(o), delete n[s];
        return;
      }
      const a = t ? Ca(s) : String(s).trim();
      a !== s && delete n[s], n[a] = Ft(o), r[a] = !0;
    }), this;
  }
  concat(...t) {
    return this.constructor.concat(this, ...t);
  }
  toJSON(t) {
    const n = /* @__PURE__ */ Object.create(null);
    return E.forEach(this, (r, o) => {
      r != null && r !== !1 && (n[o] = t && E.isArray(r) ? r.join(", ") : r);
    }), n;
  }
  [Symbol.iterator]() {
    return Object.entries(this.toJSON())[Symbol.iterator]();
  }
  toString() {
    return Object.entries(this.toJSON()).map(([t, n]) => t + ": " + n).join(`
`);
  }
  getSetCookie() {
    return this.get("set-cookie") || [];
  }
  get [Symbol.toStringTag]() {
    return "AxiosHeaders";
  }
  static from(t) {
    return t instanceof this ? t : new this(t);
  }
  static concat(t, ...n) {
    const r = new this(t);
    return n.forEach((o) => r.set(o)), r;
  }
  static accessor(t) {
    const r = (this[$r] = this[$r] = {
      accessors: {}
    }).accessors, o = this.prototype;
    function s(i) {
      const a = dt(i);
      r[a] || (Ia(o, i), r[a] = !0);
    }
    return E.isArray(t) ? t.forEach(s) : s(t), this;
  }
};
fe.accessor([
  "Content-Type",
  "Content-Length",
  "Accept",
  "Accept-Encoding",
  "User-Agent",
  "Authorization"
]);
E.reduceDescriptors(fe.prototype, ({ value: e }, t) => {
  let n = t[0].toUpperCase() + t.slice(1);
  return {
    get: () => e,
    set(r) {
      this[n] = r;
    }
  };
});
E.freezeMethods(fe);
function Tn(e, t) {
  const n = this || Tt, r = t || n, o = fe.from(r.headers);
  let s = r.data;
  return E.forEach(e, function(a) {
    s = a.call(n, s, o.normalize(), t ? t.status : void 0);
  }), o.normalize(), s;
}
function es(e) {
  return !!(e && e.__CANCEL__);
}
let At = class extends U {
  /**
   * A `CanceledError` is an object that is thrown when an operation is canceled.
   *
   * @param {string=} message The message.
   * @param {Object=} config The config.
   * @param {Object=} request The request.
   *
   * @returns {CanceledError} The created error.
   */
  constructor(t, n, r) {
    super(t ?? "canceled", U.ERR_CANCELED, n, r), this.name = "CanceledError", this.__CANCEL__ = !0;
  }
};
function ts(e, t, n) {
  const r = n.config.validateStatus;
  !n.status || !r || r(n.status) ? e(n) : t(
    new U(
      "Request failed with status code " + n.status,
      [U.ERR_BAD_REQUEST, U.ERR_BAD_RESPONSE][Math.floor(n.status / 100) - 4],
      n.config,
      n.request,
      n
    )
  );
}
function Pa(e) {
  const t = /^([-+\w]{1,25})(:?\/\/|:)/.exec(e);
  return t && t[1] || "";
}
function wa(e, t) {
  e = e || 10;
  const n = new Array(e), r = new Array(e);
  let o = 0, s = 0, i;
  return t = t !== void 0 ? t : 1e3, function(c) {
    const f = Date.now(), u = r[s];
    i || (i = f), n[o] = c, r[o] = f;
    let p = s, _ = 0;
    for (; p !== o; )
      _ += n[p++], p = p % e;
    if (o = (o + 1) % e, o === s && (s = (s + 1) % e), f - i < t)
      return;
    const L = u && f - u;
    return L ? Math.round(_ * 1e3 / L) : void 0;
  };
}
function Da(e, t) {
  let n = 0, r = 1e3 / t, o, s;
  const i = (f, u = Date.now()) => {
    n = u, o = null, s && (clearTimeout(s), s = null), e(...f);
  };
  return [(...f) => {
    const u = Date.now(), p = u - n;
    p >= r ? i(f, u) : (o = f, s || (s = setTimeout(() => {
      s = null, i(o);
    }, r - p)));
  }, () => o && i(o)];
}
const Ht = (e, t, n = 3) => {
  let r = 0;
  const o = wa(50, 250);
  return Da((s) => {
    const i = s.loaded, a = s.lengthComputable ? s.total : void 0, c = i - r, f = o(c), u = i <= a;
    r = i;
    const p = {
      loaded: i,
      total: a,
      progress: a ? i / a : void 0,
      bytes: c,
      rate: f || void 0,
      estimated: f && a && u ? (a - i) / f : void 0,
      event: s,
      lengthComputable: a != null,
      [t ? "download" : "upload"]: !0
    };
    e(p);
  }, n);
}, Br = (e, t) => {
  const n = e != null;
  return [
    (r) => t[0]({
      lengthComputable: n,
      total: e,
      loaded: r
    }),
    t[1]
  ];
}, jr = (e) => (...t) => E.asap(() => e(...t)), ka = ce.hasStandardBrowserEnv ? /* @__PURE__ */ ((e, t) => (n) => (n = new URL(n, ce.origin), e.protocol === n.protocol && e.host === n.host && (t || e.port === n.port)))(
  new URL(ce.origin),
  ce.navigator && /(msie|trident)/i.test(ce.navigator.userAgent)
) : () => !0, Fa = ce.hasStandardBrowserEnv ? (
  // Standard browser envs support document.cookie
  {
    write(e, t, n, r, o, s, i) {
      if (typeof document > "u") return;
      const a = [`${e}=${encodeURIComponent(t)}`];
      E.isNumber(n) && a.push(`expires=${new Date(n).toUTCString()}`), E.isString(r) && a.push(`path=${r}`), E.isString(o) && a.push(`domain=${o}`), s === !0 && a.push("secure"), E.isString(i) && a.push(`SameSite=${i}`), document.cookie = a.join("; ");
    },
    read(e) {
      if (typeof document > "u") return null;
      const t = document.cookie.match(new RegExp("(?:^|; )" + e + "=([^;]*)"));
      return t ? decodeURIComponent(t[1]) : null;
    },
    remove(e) {
      this.write(e, "", Date.now() - 864e5, "/");
    }
  }
) : (
  // Non-standard browser env (web workers, react-native) lack needed support.
  {
    write() {
    },
    read() {
      return null;
    },
    remove() {
    }
  }
);
function Ua(e) {
  return typeof e != "string" ? !1 : /^([a-z][a-z\d+\-.]*:)?\/\//i.test(e);
}
function Ma(e, t) {
  return t ? e.replace(/\/?\/$/, "") + "/" + t.replace(/^\/+/, "") : e;
}
function ns(e, t, n) {
  let r = !Ua(t);
  return e && (r || n == !1) ? Ma(e, t) : t;
}
const Hr = (e) => e instanceof fe ? { ...e } : e;
function Xe(e, t) {
  t = t || {};
  const n = {};
  function r(f, u, p, _) {
    return E.isPlainObject(f) && E.isPlainObject(u) ? E.merge.call({ caseless: _ }, f, u) : E.isPlainObject(u) ? E.merge({}, u) : E.isArray(u) ? u.slice() : u;
  }
  function o(f, u, p, _) {
    if (E.isUndefined(u)) {
      if (!E.isUndefined(f))
        return r(void 0, f, p, _);
    } else return r(f, u, p, _);
  }
  function s(f, u) {
    if (!E.isUndefined(u))
      return r(void 0, u);
  }
  function i(f, u) {
    if (E.isUndefined(u)) {
      if (!E.isUndefined(f))
        return r(void 0, f);
    } else return r(void 0, u);
  }
  function a(f, u, p) {
    if (p in t)
      return r(f, u);
    if (p in e)
      return r(void 0, f);
  }
  const c = {
    url: s,
    method: s,
    data: s,
    baseURL: i,
    transformRequest: i,
    transformResponse: i,
    paramsSerializer: i,
    timeout: i,
    timeoutMessage: i,
    withCredentials: i,
    withXSRFToken: i,
    adapter: i,
    responseType: i,
    xsrfCookieName: i,
    xsrfHeaderName: i,
    onUploadProgress: i,
    onDownloadProgress: i,
    decompress: i,
    maxContentLength: i,
    maxBodyLength: i,
    beforeRedirect: i,
    transport: i,
    httpAgent: i,
    httpsAgent: i,
    cancelToken: i,
    socketPath: i,
    responseEncoding: i,
    validateStatus: a,
    headers: (f, u, p) => o(Hr(f), Hr(u), p, !0)
  };
  return E.forEach(Object.keys({ ...e, ...t }), function(u) {
    if (u === "__proto__" || u === "constructor" || u === "prototype") return;
    const p = E.hasOwnProp(c, u) ? c[u] : o, _ = p(e[u], t[u], u);
    E.isUndefined(_) && p !== a || (n[u] = _);
  }), n;
}
const rs = (e) => {
  const t = Xe({}, e);
  let { data: n, withXSRFToken: r, xsrfHeaderName: o, xsrfCookieName: s, headers: i, auth: a } = t;
  if (t.headers = i = fe.from(i), t.url = zo(
    ns(t.baseURL, t.url, t.allowAbsoluteUrls),
    e.params,
    e.paramsSerializer
  ), a && i.set(
    "Authorization",
    "Basic " + btoa(
      (a.username || "") + ":" + (a.password ? unescape(encodeURIComponent(a.password)) : "")
    )
  ), E.isFormData(n)) {
    if (ce.hasStandardBrowserEnv || ce.hasStandardBrowserWebWorkerEnv)
      i.setContentType(void 0);
    else if (E.isFunction(n.getHeaders)) {
      const c = n.getHeaders(), f = ["content-type", "content-length"];
      Object.entries(c).forEach(([u, p]) => {
        f.includes(u.toLowerCase()) && i.set(u, p);
      });
    }
  }
  if (ce.hasStandardBrowserEnv && (r && E.isFunction(r) && (r = r(t)), r || r !== !1 && ka(t.url))) {
    const c = o && s && Fa.read(s);
    c && i.set(o, c);
  }
  return t;
}, xa = typeof XMLHttpRequest < "u", Va = xa && function(e) {
  return new Promise(function(n, r) {
    const o = rs(e);
    let s = o.data;
    const i = fe.from(o.headers).normalize();
    let { responseType: a, onUploadProgress: c, onDownloadProgress: f } = o, u, p, _, L, g;
    function b() {
      L && L(), g && g(), o.cancelToken && o.cancelToken.unsubscribe(u), o.signal && o.signal.removeEventListener("abort", u);
    }
    let N = new XMLHttpRequest();
    N.open(o.method.toUpperCase(), o.url, !0), N.timeout = o.timeout;
    function m() {
      if (!N)
        return;
      const T = fe.from(
        "getAllResponseHeaders" in N && N.getAllResponseHeaders()
      ), v = {
        data: !a || a === "text" || a === "json" ? N.responseText : N.response,
        status: N.status,
        statusText: N.statusText,
        headers: T,
        config: e,
        request: N
      };
      ts(
        function(h) {
          n(h), b();
        },
        function(h) {
          r(h), b();
        },
        v
      ), N = null;
    }
    "onloadend" in N ? N.onloadend = m : N.onreadystatechange = function() {
      !N || N.readyState !== 4 || N.status === 0 && !(N.responseURL && N.responseURL.indexOf("file:") === 0) || setTimeout(m);
    }, N.onabort = function() {
      N && (r(new U("Request aborted", U.ECONNABORTED, e, N)), N = null);
    }, N.onerror = function(y) {
      const v = y && y.message ? y.message : "Network Error", C = new U(v, U.ERR_NETWORK, e, N);
      C.event = y || null, r(C), N = null;
    }, N.ontimeout = function() {
      let y = o.timeout ? "timeout of " + o.timeout + "ms exceeded" : "timeout exceeded";
      const v = o.transitional || lr;
      o.timeoutErrorMessage && (y = o.timeoutErrorMessage), r(
        new U(
          y,
          v.clarifyTimeoutError ? U.ETIMEDOUT : U.ECONNABORTED,
          e,
          N
        )
      ), N = null;
    }, s === void 0 && i.setContentType(null), "setRequestHeader" in N && E.forEach(i.toJSON(), function(y, v) {
      N.setRequestHeader(v, y);
    }), E.isUndefined(o.withCredentials) || (N.withCredentials = !!o.withCredentials), a && a !== "json" && (N.responseType = o.responseType), f && ([_, g] = Ht(f, !0), N.addEventListener("progress", _)), c && N.upload && ([p, L] = Ht(c), N.upload.addEventListener("progress", p), N.upload.addEventListener("loadend", L)), (o.cancelToken || o.signal) && (u = (T) => {
      N && (r(!T || T.type ? new At(null, e, N) : T), N.abort(), N = null);
    }, o.cancelToken && o.cancelToken.subscribe(u), o.signal && (o.signal.aborted ? u() : o.signal.addEventListener("abort", u)));
    const O = Pa(o.url);
    if (O && ce.protocols.indexOf(O) === -1) {
      r(
        new U(
          "Unsupported protocol " + O + ":",
          U.ERR_BAD_REQUEST,
          e
        )
      );
      return;
    }
    N.send(s || null);
  });
}, $a = (e, t) => {
  const { length: n } = e = e ? e.filter(Boolean) : [];
  if (t || n) {
    let r = new AbortController(), o;
    const s = function(f) {
      if (!o) {
        o = !0, a();
        const u = f instanceof Error ? f : this.reason;
        r.abort(
          u instanceof U ? u : new At(u instanceof Error ? u.message : u)
        );
      }
    };
    let i = t && setTimeout(() => {
      i = null, s(new U(`timeout of ${t}ms exceeded`, U.ETIMEDOUT));
    }, t);
    const a = () => {
      e && (i && clearTimeout(i), i = null, e.forEach((f) => {
        f.unsubscribe ? f.unsubscribe(s) : f.removeEventListener("abort", s);
      }), e = null);
    };
    e.forEach((f) => f.addEventListener("abort", s));
    const { signal: c } = r;
    return c.unsubscribe = () => E.asap(a), c;
  }
}, Ba = function* (e, t) {
  let n = e.byteLength;
  if (n < t) {
    yield e;
    return;
  }
  let r = 0, o;
  for (; r < n; )
    o = r + t, yield e.slice(r, o), r = o;
}, ja = async function* (e, t) {
  for await (const n of Ha(e))
    yield* Ba(n, t);
}, Ha = async function* (e) {
  if (e[Symbol.asyncIterator]) {
    yield* e;
    return;
  }
  const t = e.getReader();
  try {
    for (; ; ) {
      const { done: n, value: r } = await t.read();
      if (n)
        break;
      yield r;
    }
  } finally {
    await t.cancel();
  }
}, qr = (e, t, n, r) => {
  const o = ja(e, t);
  let s = 0, i, a = (c) => {
    i || (i = !0, r && r(c));
  };
  return new ReadableStream(
    {
      async pull(c) {
        try {
          const { done: f, value: u } = await o.next();
          if (f) {
            a(), c.close();
            return;
          }
          let p = u.byteLength;
          if (n) {
            let _ = s += p;
            n(_);
          }
          c.enqueue(new Uint8Array(u));
        } catch (f) {
          throw a(f), f;
        }
      },
      cancel(c) {
        return a(c), o.return();
      }
    },
    {
      highWaterMark: 2
    }
  );
}, Wr = 64 * 1024, { isFunction: Ct } = E, qa = (({ Request: e, Response: t }) => ({
  Request: e,
  Response: t
}))(E.global), { ReadableStream: Gr, TextEncoder: Yr } = E.global, Kr = (e, ...t) => {
  try {
    return !!e(...t);
  } catch {
    return !1;
  }
}, Wa = (e) => {
  e = E.merge.call(
    {
      skipUndefined: !0
    },
    qa,
    e
  );
  const { fetch: t, Request: n, Response: r } = e, o = t ? Ct(t) : typeof fetch == "function", s = Ct(n), i = Ct(r);
  if (!o)
    return !1;
  const a = o && Ct(Gr), c = o && (typeof Yr == "function" ? /* @__PURE__ */ ((g) => (b) => g.encode(b))(new Yr()) : async (g) => new Uint8Array(await new n(g).arrayBuffer())), f = s && a && Kr(() => {
    let g = !1;
    const b = new n(ce.origin, {
      body: new Gr(),
      method: "POST",
      get duplex() {
        return g = !0, "half";
      }
    }).headers.has("Content-Type");
    return g && !b;
  }), u = i && a && Kr(() => E.isReadableStream(new r("").body)), p = {
    stream: u && ((g) => g.body)
  };
  o && ["text", "arrayBuffer", "blob", "formData", "stream"].forEach((g) => {
    !p[g] && (p[g] = (b, N) => {
      let m = b && b[g];
      if (m)
        return m.call(b);
      throw new U(
        `Response type '${g}' is not supported`,
        U.ERR_NOT_SUPPORT,
        N
      );
    });
  });
  const _ = async (g) => {
    if (g == null)
      return 0;
    if (E.isBlob(g))
      return g.size;
    if (E.isSpecCompliantForm(g))
      return (await new n(ce.origin, {
        method: "POST",
        body: g
      }).arrayBuffer()).byteLength;
    if (E.isArrayBufferView(g) || E.isArrayBuffer(g))
      return g.byteLength;
    if (E.isURLSearchParams(g) && (g = g + ""), E.isString(g))
      return (await c(g)).byteLength;
  }, L = async (g, b) => {
    const N = E.toFiniteNumber(g.getContentLength());
    return N ?? _(b);
  };
  return async (g) => {
    let {
      url: b,
      method: N,
      data: m,
      signal: O,
      cancelToken: T,
      timeout: y,
      onDownloadProgress: v,
      onUploadProgress: C,
      responseType: h,
      headers: x,
      withCredentials: M = "same-origin",
      fetchOptions: I
    } = rs(g), P = t || fetch;
    h = h ? (h + "").toLowerCase() : "text";
    let k = $a(
      [O, T && T.toAbortSignal()],
      y
    ), q = null;
    const oe = k && k.unsubscribe && (() => {
      k.unsubscribe();
    });
    let Ne;
    try {
      if (C && f && N !== "get" && N !== "head" && (Ne = await L(x, m)) !== 0) {
        let le = new n(b, {
          method: "POST",
          body: m,
          duplex: "half"
        }), Oe;
        if (E.isFormData(m) && (Oe = le.headers.get("content-type")) && x.setContentType(Oe), le.body) {
          const [Ve, Fe] = Br(
            Ne,
            Ht(jr(C))
          );
          m = qr(le.body, Wr, Ve, Fe);
        }
      }
      E.isString(M) || (M = M ? "include" : "omit");
      const z = s && "credentials" in n.prototype, ke = {
        ...I,
        signal: k,
        method: N.toUpperCase(),
        headers: x.normalize().toJSON(),
        body: m,
        duplex: "half",
        credentials: z ? M : void 0
      };
      q = s && new n(b, ke);
      let ee = await (s ? P(q, I) : P(b, ke));
      const Z = u && (h === "stream" || h === "response");
      if (u && (v || Z && oe)) {
        const le = {};
        ["status", "statusText", "headers"].forEach((Qe) => {
          le[Qe] = ee[Qe];
        });
        const Oe = E.toFiniteNumber(ee.headers.get("content-length")), [Ve, Fe] = v && Br(
          Oe,
          Ht(jr(v), !0)
        ) || [];
        ee = new r(
          qr(ee.body, Wr, Ve, () => {
            Fe && Fe(), oe && oe();
          }),
          le
        );
      }
      h = h || "text";
      let ge = await p[E.findKey(p, h) || "text"](
        ee,
        g
      );
      return !Z && oe && oe(), await new Promise((le, Oe) => {
        ts(le, Oe, {
          data: ge,
          headers: fe.from(ee.headers),
          status: ee.status,
          statusText: ee.statusText,
          config: g,
          request: q
        });
      });
    } catch (z) {
      throw oe && oe(), z && z.name === "TypeError" && /Load failed|fetch/i.test(z.message) ? Object.assign(
        new U(
          "Network Error",
          U.ERR_NETWORK,
          g,
          q,
          z && z.response
        ),
        {
          cause: z.cause || z
        }
      ) : U.from(z, z && z.code, g, q, z && z.response);
    }
  };
}, Ga = /* @__PURE__ */ new Map(), os = (e) => {
  let t = e && e.env || {};
  const { fetch: n, Request: r, Response: o } = t, s = [r, o, n];
  let i = s.length, a = i, c, f, u = Ga;
  for (; a--; )
    c = s[a], f = u.get(c), f === void 0 && u.set(c, f = a ? /* @__PURE__ */ new Map() : Wa(t)), u = f;
  return f;
};
os();
const fr = {
  http: la,
  xhr: Va,
  fetch: {
    get: os
  }
};
E.forEach(fr, (e, t) => {
  if (e) {
    try {
      Object.defineProperty(e, "name", { value: t });
    } catch {
    }
    Object.defineProperty(e, "adapterName", { value: t });
  }
});
const Xr = (e) => `- ${e}`, Ya = (e) => E.isFunction(e) || e === null || e === !1;
function Ka(e, t) {
  e = E.isArray(e) ? e : [e];
  const { length: n } = e;
  let r, o;
  const s = {};
  for (let i = 0; i < n; i++) {
    r = e[i];
    let a;
    if (o = r, !Ya(r) && (o = fr[(a = String(r)).toLowerCase()], o === void 0))
      throw new U(`Unknown adapter '${a}'`);
    if (o && (E.isFunction(o) || (o = o.get(t))))
      break;
    s[a || "#" + i] = o;
  }
  if (!o) {
    const i = Object.entries(s).map(
      ([c, f]) => `adapter ${c} ` + (f === !1 ? "is not supported by the environment" : "is not available in the build")
    );
    let a = n ? i.length > 1 ? `since :
` + i.map(Xr).join(`
`) : " " + Xr(i[0]) : "as no adapter specified";
    throw new U(
      "There is no suitable adapter to dispatch the request " + a,
      "ERR_NOT_SUPPORT"
    );
  }
  return o;
}
const ss = {
  /**
   * Resolve an adapter from a list of adapter names or functions.
   * @type {Function}
   */
  getAdapter: Ka,
  /**
   * Exposes all known adapters
   * @type {Object<string, Function|Object>}
   */
  adapters: fr
};
function An(e) {
  if (e.cancelToken && e.cancelToken.throwIfRequested(), e.signal && e.signal.aborted)
    throw new At(null, e);
}
function Jr(e) {
  return An(e), e.headers = fe.from(e.headers), e.data = Tn.call(e, e.transformRequest), ["post", "put", "patch"].indexOf(e.method) !== -1 && e.headers.setContentType("application/x-www-form-urlencoded", !1), ss.getAdapter(e.adapter || Tt.adapter, e)(e).then(
    function(r) {
      return An(e), r.data = Tn.call(e, e.transformResponse, r), r.headers = fe.from(r.headers), r;
    },
    function(r) {
      return es(r) || (An(e), r && r.response && (r.response.data = Tn.call(
        e,
        e.transformResponse,
        r.response
      ), r.response.headers = fe.from(r.response.headers))), Promise.reject(r);
    }
  );
}
const is = "1.13.6", sn = {};
["object", "boolean", "number", "function", "string", "symbol"].forEach((e, t) => {
  sn[e] = function(r) {
    return typeof r === e || "a" + (t < 1 ? "n " : " ") + e;
  };
});
const Qr = {};
sn.transitional = function(t, n, r) {
  function o(s, i) {
    return "[Axios v" + is + "] Transitional option '" + s + "'" + i + (r ? ". " + r : "");
  }
  return (s, i, a) => {
    if (t === !1)
      throw new U(
        o(i, " has been removed" + (n ? " in " + n : "")),
        U.ERR_DEPRECATED
      );
    return n && !Qr[i] && (Qr[i] = !0, console.warn(
      o(
        i,
        " has been deprecated since v" + n + " and will be removed in the near future"
      )
    )), t ? t(s, i, a) : !0;
  };
};
sn.spelling = function(t) {
  return (n, r) => (console.warn(`${r} is likely a misspelling of ${t}`), !0);
};
function Xa(e, t, n) {
  if (typeof e != "object")
    throw new U("options must be an object", U.ERR_BAD_OPTION_VALUE);
  const r = Object.keys(e);
  let o = r.length;
  for (; o-- > 0; ) {
    const s = r[o], i = t[s];
    if (i) {
      const a = e[s], c = a === void 0 || i(a, s, e);
      if (c !== !0)
        throw new U(
          "option " + s + " must be " + c,
          U.ERR_BAD_OPTION_VALUE
        );
      continue;
    }
    if (n !== !0)
      throw new U("Unknown option " + s, U.ERR_BAD_OPTION);
  }
}
const Ut = {
  assertOptions: Xa,
  validators: sn
}, me = Ut.validators;
let Ye = class {
  constructor(t) {
    this.defaults = t || {}, this.interceptors = {
      request: new Vr(),
      response: new Vr()
    };
  }
  /**
   * Dispatch a request
   *
   * @param {String|Object} configOrUrl The config specific for this request (merged with this.defaults)
   * @param {?Object} config
   *
   * @returns {Promise} The Promise to be fulfilled
   */
  async request(t, n) {
    try {
      return await this._request(t, n);
    } catch (r) {
      if (r instanceof Error) {
        let o = {};
        Error.captureStackTrace ? Error.captureStackTrace(o) : o = new Error();
        const s = o.stack ? o.stack.replace(/^.+\n/, "") : "";
        try {
          r.stack ? s && !String(r.stack).endsWith(s.replace(/^.+\n.+\n/, "")) && (r.stack += `
` + s) : r.stack = s;
        } catch {
        }
      }
      throw r;
    }
  }
  _request(t, n) {
    typeof t == "string" ? (n = n || {}, n.url = t) : n = t || {}, n = Xe(this.defaults, n);
    const { transitional: r, paramsSerializer: o, headers: s } = n;
    r !== void 0 && Ut.assertOptions(
      r,
      {
        silentJSONParsing: me.transitional(me.boolean),
        forcedJSONParsing: me.transitional(me.boolean),
        clarifyTimeoutError: me.transitional(me.boolean),
        legacyInterceptorReqResOrdering: me.transitional(me.boolean)
      },
      !1
    ), o != null && (E.isFunction(o) ? n.paramsSerializer = {
      serialize: o
    } : Ut.assertOptions(
      o,
      {
        encode: me.function,
        serialize: me.function
      },
      !0
    )), n.allowAbsoluteUrls !== void 0 || (this.defaults.allowAbsoluteUrls !== void 0 ? n.allowAbsoluteUrls = this.defaults.allowAbsoluteUrls : n.allowAbsoluteUrls = !0), Ut.assertOptions(
      n,
      {
        baseUrl: me.spelling("baseURL"),
        withXsrfToken: me.spelling("withXSRFToken")
      },
      !0
    ), n.method = (n.method || this.defaults.method || "get").toLowerCase();
    let i = s && E.merge(s.common, s[n.method]);
    s && E.forEach(["delete", "get", "head", "post", "put", "patch", "common"], (g) => {
      delete s[g];
    }), n.headers = fe.concat(i, s);
    const a = [];
    let c = !0;
    this.interceptors.request.forEach(function(b) {
      if (typeof b.runWhen == "function" && b.runWhen(n) === !1)
        return;
      c = c && b.synchronous;
      const N = n.transitional || lr;
      N && N.legacyInterceptorReqResOrdering ? a.unshift(b.fulfilled, b.rejected) : a.push(b.fulfilled, b.rejected);
    });
    const f = [];
    this.interceptors.response.forEach(function(b) {
      f.push(b.fulfilled, b.rejected);
    });
    let u, p = 0, _;
    if (!c) {
      const g = [Jr.bind(this), void 0];
      for (g.unshift(...a), g.push(...f), _ = g.length, u = Promise.resolve(n); p < _; )
        u = u.then(g[p++], g[p++]);
      return u;
    }
    _ = a.length;
    let L = n;
    for (; p < _; ) {
      const g = a[p++], b = a[p++];
      try {
        L = g(L);
      } catch (N) {
        b.call(this, N);
        break;
      }
    }
    try {
      u = Jr.call(this, L);
    } catch (g) {
      return Promise.reject(g);
    }
    for (p = 0, _ = f.length; p < _; )
      u = u.then(f[p++], f[p++]);
    return u;
  }
  getUri(t) {
    t = Xe(this.defaults, t);
    const n = ns(t.baseURL, t.url, t.allowAbsoluteUrls);
    return zo(n, t.params, t.paramsSerializer);
  }
};
E.forEach(["delete", "get", "head", "options"], function(t) {
  Ye.prototype[t] = function(n, r) {
    return this.request(
      Xe(r || {}, {
        method: t,
        url: n,
        data: (r || {}).data
      })
    );
  };
});
E.forEach(["post", "put", "patch"], function(t) {
  function n(r) {
    return function(s, i, a) {
      return this.request(
        Xe(a || {}, {
          method: t,
          headers: r ? {
            "Content-Type": "multipart/form-data"
          } : {},
          url: s,
          data: i
        })
      );
    };
  }
  Ye.prototype[t] = n(), Ye.prototype[t + "Form"] = n(!0);
});
let Ja = class as {
  constructor(t) {
    if (typeof t != "function")
      throw new TypeError("executor must be a function.");
    let n;
    this.promise = new Promise(function(s) {
      n = s;
    });
    const r = this;
    this.promise.then((o) => {
      if (!r._listeners) return;
      let s = r._listeners.length;
      for (; s-- > 0; )
        r._listeners[s](o);
      r._listeners = null;
    }), this.promise.then = (o) => {
      let s;
      const i = new Promise((a) => {
        r.subscribe(a), s = a;
      }).then(o);
      return i.cancel = function() {
        r.unsubscribe(s);
      }, i;
    }, t(function(s, i, a) {
      r.reason || (r.reason = new At(s, i, a), n(r.reason));
    });
  }
  /**
   * Throws a `CanceledError` if cancellation has been requested.
   */
  throwIfRequested() {
    if (this.reason)
      throw this.reason;
  }
  /**
   * Subscribe to the cancel signal
   */
  subscribe(t) {
    if (this.reason) {
      t(this.reason);
      return;
    }
    this._listeners ? this._listeners.push(t) : this._listeners = [t];
  }
  /**
   * Unsubscribe from the cancel signal
   */
  unsubscribe(t) {
    if (!this._listeners)
      return;
    const n = this._listeners.indexOf(t);
    n !== -1 && this._listeners.splice(n, 1);
  }
  toAbortSignal() {
    const t = new AbortController(), n = (r) => {
      t.abort(r);
    };
    return this.subscribe(n), t.signal.unsubscribe = () => this.unsubscribe(n), t.signal;
  }
  /**
   * Returns an object that contains a new `CancelToken` and a function that, when called,
   * cancels the `CancelToken`.
   */
  static source() {
    let t;
    return {
      token: new as(function(o) {
        t = o;
      }),
      cancel: t
    };
  }
};
function Qa(e) {
  return function(n) {
    return e.apply(null, n);
  };
}
function za(e) {
  return E.isObject(e) && e.isAxiosError === !0;
}
const qn = {
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
Object.entries(qn).forEach(([e, t]) => {
  qn[t] = e;
});
function cs(e) {
  const t = new Ye(e), n = Bo(Ye.prototype.request, t);
  return E.extend(n, Ye.prototype, t, { allOwnKeys: !0 }), E.extend(n, t, null, { allOwnKeys: !0 }), n.create = function(o) {
    return cs(Xe(e, o));
  }, n;
}
const Q = cs(Tt);
Q.Axios = Ye;
Q.CanceledError = At;
Q.CancelToken = Ja;
Q.isCancel = es;
Q.VERSION = is;
Q.toFormData = on;
Q.AxiosError = U;
Q.Cancel = Q.CanceledError;
Q.all = function(t) {
  return Promise.all(t);
};
Q.spread = Qa;
Q.isAxiosError = za;
Q.mergeConfig = Xe;
Q.AxiosHeaders = fe;
Q.formToJSON = (e) => Zo(E.isHTMLForm(e) ? new FormData(e) : e);
Q.getAdapter = ss.getAdapter;
Q.HttpStatusCode = qn;
Q.default = Q;
const {
  Axios: tf,
  AxiosError: nf,
  CanceledError: rf,
  isCancel: of,
  CancelToken: sf,
  VERSION: af,
  all: cf,
  Cancel: lf,
  isAxiosError: uf,
  spread: ff,
  toFormData: df,
  AxiosHeaders: pf,
  HttpStatusCode: zr,
  formToJSON: mf,
  getAdapter: _f,
  mergeConfig: hf
} = Q;
let qt = null;
function Ef(e) {
  if (qt !== null) {
    console.warn(
      "[LinID CoreLib] HTTP client has already been initialized. Re-initialization is ignored."
    );
    return;
  }
  qt = e;
}
function we() {
  if (qt === null)
    throw new Error(
      "[LinID CoreLib] HTTP client is not initialized. Call setHttpClient() first."
    );
  return qt;
}
const ls = /* @__PURE__ */ new Map();
function gf(e) {
  ls.set(e.instanceId, e);
}
function at(e) {
  const t = ls.get(e);
  if (!t)
    throw new Error(
      `[LinID CoreLib] No module host configuration found for instanceId: ${e}`
    );
  return t;
}
async function bf(e, t) {
  const n = at(e);
  return we().post(`/${n.apiEndpoint}`, t).then(({ data: r }) => r);
}
async function yf(e, t, n) {
  const r = at(e);
  return we().put(`/${r.apiEndpoint}/${t}`, n).then(({ data: o }) => o);
}
async function Nf(e, t, n) {
  const r = at(e);
  return we().get(`/${r.apiEndpoint}`, {
    params: { ...t, ...n }
  }).then(({ data: o }) => o);
}
async function Of(e, t) {
  const n = at(e);
  return we().get(`/${n.apiEndpoint}/${t}`).then(({ data: r }) => r);
}
async function Sf(e, t) {
  const n = at(e);
  return we().delete(`/${n.apiEndpoint}/${t}`);
}
async function Za(e, t, n) {
  const r = at(e);
  await we().post(
    `/${r.apiEndpoint}/validate/${t}`,
    n,
    { headers: { "Content-Type": "application/json" } }
  );
}
function ec(e, t) {
  if (!rt(e) || !rt(t))
    return t;
  const n = { ...e };
  for (const r of Object.keys(t))
    n[r] = ec(e[r], t[r]);
  return n;
}
function Tf(e) {
  const t = {};
  for (const [n, r] of Object.entries(e)) {
    const o = n.split(".");
    let s = t;
    o.forEach((i, a) => {
      a === o.length - 1 ? s[i] = r : (rt(s[i]) || (s[i] = {}), s = s[i]);
    });
  }
  return t;
}
function rt(e) {
  return typeof e == "object" && e !== null && !Array.isArray(e);
}
function tc(e, t) {
  return typeof e != "object" || e === null ? e : Object.fromEntries(
    Object.entries(e).map(([n, r]) => {
      const o = t(n), s = rt(r) ? tc(r, t) : r;
      return [o, s];
    })
  );
}
function us(e, t) {
  if (e === t || typeof e == "number" && typeof t == "number" && Number.isNaN(e) && Number.isNaN(t))
    return !0;
  if (e == null || t == null || typeof e != "object" || typeof t != "object" || Array.isArray(e) !== Array.isArray(t))
    return !1;
  const n = Object.keys(e), r = Object.keys(t);
  if (n.length !== r.length)
    return !1;
  const o = e, s = t;
  return n.every(
    (i) => Object.prototype.hasOwnProperty.call(s, i) && us(o[i], s[i])
  );
}
function Wn(e, t) {
  if (Array.isArray(e) && Array.isArray(t)) {
    if (e.length !== t.length)
      return !1;
    const n = /* @__PURE__ */ new Set();
    return e.every((r) => {
      const o = t.findIndex(
        (s, i) => !n.has(i) && Wn(r, s)
      );
      return o === -1 ? !1 : (n.add(o), !0);
    });
  }
  if (rt(e) && rt(t)) {
    const n = Object.keys(e), r = Object.keys(t);
    return n.length !== r.length ? !1 : n.every(
      (o) => Object.prototype.hasOwnProperty.call(t, o) && Wn(e[o], t[o])
    );
  }
  return us(e, t);
}
function Le(e, t) {
  typeof console < "u" && (console.warn("[intlify] " + e), t && console.warn(t.stack));
}
const Zr = {};
function nc(e) {
  Zr[e] || (Zr[e] = !0, Le(e));
}
const Pe = typeof window < "u";
let de, Je;
if (process.env.NODE_ENV !== "production") {
  const e = Pe && window.performance;
  e && e.mark && e.measure && e.clearMarks && // @ts-ignore browser compat
  e.clearMeasures && (de = (t) => {
    e.mark(t);
  }, Je = (t, n, r) => {
    e.measure(t, n, r), e.clearMarks(n), e.clearMarks(r);
  });
}
const rc = /\{([0-9a-zA-Z]+)\}/g;
function an(e, ...t) {
  return t.length === 1 && B(t[0]) && (t = t[0]), (!t || !t.hasOwnProperty) && (t = {}), e.replace(rc, (n, r) => t.hasOwnProperty(r) ? t[r] : "");
}
const De = (e, t = !1) => t ? Symbol.for(e) : Symbol(e), oc = (e, t, n) => sc({ l: e, k: t, s: n }), sc = (e) => JSON.stringify(e).replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029").replace(/\u0027/g, "\\u0027"), ne = (e) => typeof e == "number" && isFinite(e), fs = (e) => dr(e) === "[object Date]", Wt = (e) => dr(e) === "[object RegExp]", cn = (e) => j(e) && Object.keys(e).length === 0, re = Object.assign, ic = Object.create, H = (e = null) => ic(e);
let eo;
const Ge = () => eo || (eo = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : H());
function to(e) {
  return e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;").replace(/\//g, "&#x2F;").replace(/=/g, "&#x3D;");
}
function no(e) {
  return e.replace(/&(?![a-zA-Z0-9#]{2,6};)/g, "&amp;").replace(/"/g, "&quot;").replace(/'/g, "&apos;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
function ac(e) {
  return e = e.replace(/(\w+)\s*=\s*"([^"]*)"/g, (r, o, s) => `${o}="${no(s)}"`), e = e.replace(/(\w+)\s*=\s*'([^']*)'/g, (r, o, s) => `${o}='${no(s)}'`), /\s*on\w+\s*=\s*["']?[^"'>]+["']?/gi.test(e) && (process.env.NODE_ENV !== "production" && Le("Potentially dangerous event handlers detected in translation. Consider removing onclick, onerror, etc. from your translation messages."), e = e.replace(/(\s+)(on)(\w+\s*=)/gi, "$1&#111;n$3")), [
    // In href, src, action, formaction attributes
    /(\s+(?:href|src|action|formaction)\s*=\s*["']?)\s*javascript:/gi,
    // In style attributes within url()
    /(style\s*=\s*["'][^"']*url\s*\(\s*)javascript:/gi
  ].forEach((r) => {
    e = e.replace(r, "$1javascript&#58;");
  }), e;
}
const cc = Object.prototype.hasOwnProperty;
function Ee(e, t) {
  return cc.call(e, t);
}
const J = Array.isArray, G = (e) => typeof e == "function", D = (e) => typeof e == "string", X = (e) => typeof e == "boolean", B = (e) => e !== null && typeof e == "object", lc = (e) => B(e) && G(e.then) && G(e.catch), ds = Object.prototype.toString, dr = (e) => ds.call(e), j = (e) => dr(e) === "[object Object]", uc = (e) => e == null ? "" : J(e) || j(e) && e.toString === ds ? JSON.stringify(e, null, 2) : String(e);
function pr(e, t = "") {
  return e.reduce((n, r, o) => o === 0 ? n + r : n + t + r, "");
}
const ro = 2;
function fc(e, t = 0, n = e.length) {
  const r = e.split(/\r?\n/);
  let o = 0;
  const s = [];
  for (let i = 0; i < r.length; i++)
    if (o += r[i].length + 1, o >= t) {
      for (let a = i - ro; a <= i + ro || n > o; a++) {
        if (a < 0 || a >= r.length)
          continue;
        const c = a + 1;
        s.push(`${c}${" ".repeat(3 - String(c).length)}|  ${r[a]}`);
        const f = r[a].length;
        if (a === i) {
          const u = t - (o - f) + 1, p = Math.max(1, n > o ? f - u : n - t);
          s.push("   |  " + " ".repeat(u) + "^".repeat(p));
        } else if (a > i) {
          if (n > o) {
            const u = Math.max(Math.min(n - o, f), 1);
            s.push("   |  " + "^".repeat(u));
          }
          o += f + 1;
        }
      }
      break;
    }
  return s.join(`
`);
}
function dc() {
  const e = /* @__PURE__ */ new Map();
  return {
    events: e,
    on(n, r) {
      const o = e.get(n);
      o && o.push(r) || e.set(n, [r]);
    },
    off(n, r) {
      const o = e.get(n);
      o && o.splice(o.indexOf(r) >>> 0, 1);
    },
    emit(n, r) {
      (e.get(n) || []).slice().map((o) => o(r)), (e.get("*") || []).slice().map((o) => o(n, r));
    }
  };
}
const It = (e) => !B(e) || J(e);
function Mt(e, t) {
  if (It(e) || It(t))
    throw new Error("Invalid value");
  const n = [{ src: e, des: t }];
  for (; n.length; ) {
    const { src: r, des: o } = n.pop();
    Object.keys(r).forEach((s) => {
      s !== "__proto__" && (B(r[s]) && !B(o[s]) && (o[s] = Array.isArray(r[s]) ? [] : H()), It(o[s]) || It(r[s]) ? o[s] = r[s] : n.push({ src: r[s], des: o[s] }));
    });
  }
}
function pc(e, t, n) {
  return { line: e, column: t, offset: n };
}
function Gn(e, t, n) {
  return { start: e, end: t };
}
const F = {
  // tokenizer error codes
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
  // parser error codes
  MUST_HAVE_MESSAGES_IN_PLURAL: 11,
  UNEXPECTED_EMPTY_LINKED_MODIFIER: 12,
  UNEXPECTED_EMPTY_LINKED_KEY: 13,
  UNEXPECTED_LEXICAL_ANALYSIS: 14,
  // generator error codes
  UNHANDLED_CODEGEN_NODE_TYPE: 15,
  // minifier error codes
  UNHANDLED_MINIFIER_NODE_TYPE: 16
}, mc = 17, _c = {
  // tokenizer error messages
  [F.EXPECTED_TOKEN]: "Expected token: '{0}'",
  [F.INVALID_TOKEN_IN_PLACEHOLDER]: "Invalid token in placeholder: '{0}'",
  [F.UNTERMINATED_SINGLE_QUOTE_IN_PLACEHOLDER]: "Unterminated single quote in placeholder",
  [F.UNKNOWN_ESCAPE_SEQUENCE]: "Unknown escape sequence: \\{0}",
  [F.INVALID_UNICODE_ESCAPE_SEQUENCE]: "Invalid unicode escape sequence: {0}",
  [F.UNBALANCED_CLOSING_BRACE]: "Unbalanced closing brace",
  [F.UNTERMINATED_CLOSING_BRACE]: "Unterminated closing brace",
  [F.EMPTY_PLACEHOLDER]: "Empty placeholder",
  [F.NOT_ALLOW_NEST_PLACEHOLDER]: "Not allowed nest placeholder",
  [F.INVALID_LINKED_FORMAT]: "Invalid linked format",
  // parser error messages
  [F.MUST_HAVE_MESSAGES_IN_PLURAL]: "Plural must have messages",
  [F.UNEXPECTED_EMPTY_LINKED_MODIFIER]: "Unexpected empty linked modifier",
  [F.UNEXPECTED_EMPTY_LINKED_KEY]: "Unexpected empty linked key",
  [F.UNEXPECTED_LEXICAL_ANALYSIS]: "Unexpected lexical analysis in token: '{0}'",
  // generator error messages
  [F.UNHANDLED_CODEGEN_NODE_TYPE]: "unhandled codegen node type: '{0}'",
  // minimizer error messages
  [F.UNHANDLED_MINIFIER_NODE_TYPE]: "unhandled mimifier node type: '{0}'"
};
function ct(e, t, n = {}) {
  const { domain: r, messages: o, args: s } = n, i = process.env.NODE_ENV !== "production" ? an((o || _c)[e] || "", ...s || []) : e, a = new SyntaxError(String(i));
  return a.code = e, t && (a.location = t), a.domain = r, a;
}
function hc(e) {
  throw e;
}
const Ec = /<\/?[\w\s="/.':;#-\/]+>/, gc = (e) => Ec.test(e), Se = " ", bc = "\r", ie = `
`, yc = "\u2028", Nc = "\u2029";
function Oc(e) {
  const t = e;
  let n = 0, r = 1, o = 1, s = 0;
  const i = (h) => t[h] === bc && t[h + 1] === ie, a = (h) => t[h] === ie, c = (h) => t[h] === Nc, f = (h) => t[h] === yc, u = (h) => i(h) || a(h) || c(h) || f(h), p = () => n, _ = () => r, L = () => o, g = () => s, b = (h) => i(h) || c(h) || f(h) ? ie : t[h], N = () => b(n), m = () => b(n + s);
  function O() {
    return s = 0, u(n) && (r++, o = 0), i(n) && n++, n++, o++, t[n];
  }
  function T() {
    return i(n + s) && s++, s++, t[n + s];
  }
  function y() {
    n = 0, r = 1, o = 1, s = 0;
  }
  function v(h = 0) {
    s = h;
  }
  function C() {
    const h = n + s;
    for (; h !== n; )
      O();
    s = 0;
  }
  return {
    index: p,
    line: _,
    column: L,
    peekOffset: g,
    charAt: b,
    currentChar: N,
    currentPeek: m,
    next: O,
    peek: T,
    reset: y,
    resetPeek: v,
    skipToPeek: C
  };
}
const Re = void 0, Sc = ".", oo = "'", Tc = "tokenizer";
function Ac(e, t = {}) {
  const n = t.location !== !1, r = Oc(e), o = () => r.index(), s = () => pc(r.line(), r.column(), r.index()), i = s(), a = o(), c = {
    currentType: 13,
    offset: a,
    startLoc: i,
    endLoc: i,
    lastType: 13,
    lastOffset: a,
    lastStartLoc: i,
    lastEndLoc: i,
    braceNest: 0,
    inLinked: !1,
    text: ""
  }, f = () => c, { onError: u } = t;
  function p(l, d, A, ...w) {
    const W = f();
    if (d.column += A, d.offset += A, u) {
      const K = n ? Gn(W.startLoc, d) : null, V = ct(l, K, {
        domain: Tc,
        args: w
      });
      u(V);
    }
  }
  function _(l, d, A) {
    l.endLoc = s(), l.currentType = d;
    const w = { type: d };
    return n && (w.loc = Gn(l.startLoc, l.endLoc)), A != null && (w.value = A), w;
  }
  const L = (l) => _(
    l,
    13
    /* TokenTypes.EOF */
  );
  function g(l, d) {
    return l.currentChar() === d ? (l.next(), d) : (p(F.EXPECTED_TOKEN, s(), 0, d), "");
  }
  function b(l) {
    let d = "";
    for (; l.currentPeek() === Se || l.currentPeek() === ie; )
      d += l.currentPeek(), l.peek();
    return d;
  }
  function N(l) {
    const d = b(l);
    return l.skipToPeek(), d;
  }
  function m(l) {
    if (l === Re)
      return !1;
    const d = l.charCodeAt(0);
    return d >= 97 && d <= 122 || // a-z
    d >= 65 && d <= 90 || // A-Z
    d === 95;
  }
  function O(l) {
    if (l === Re)
      return !1;
    const d = l.charCodeAt(0);
    return d >= 48 && d <= 57;
  }
  function T(l, d) {
    const { currentType: A } = d;
    if (A !== 2)
      return !1;
    b(l);
    const w = m(l.currentPeek());
    return l.resetPeek(), w;
  }
  function y(l, d) {
    const { currentType: A } = d;
    if (A !== 2)
      return !1;
    b(l);
    const w = l.currentPeek() === "-" ? l.peek() : l.currentPeek(), W = O(w);
    return l.resetPeek(), W;
  }
  function v(l, d) {
    const { currentType: A } = d;
    if (A !== 2)
      return !1;
    b(l);
    const w = l.currentPeek() === oo;
    return l.resetPeek(), w;
  }
  function C(l, d) {
    const { currentType: A } = d;
    if (A !== 7)
      return !1;
    b(l);
    const w = l.currentPeek() === ".";
    return l.resetPeek(), w;
  }
  function h(l, d) {
    const { currentType: A } = d;
    if (A !== 8)
      return !1;
    b(l);
    const w = m(l.currentPeek());
    return l.resetPeek(), w;
  }
  function x(l, d) {
    const { currentType: A } = d;
    if (!(A === 7 || A === 11))
      return !1;
    b(l);
    const w = l.currentPeek() === ":";
    return l.resetPeek(), w;
  }
  function M(l, d) {
    const { currentType: A } = d;
    if (A !== 9)
      return !1;
    const w = () => {
      const K = l.currentPeek();
      return K === "{" ? m(l.peek()) : K === "@" || K === "|" || K === ":" || K === "." || K === Se || !K ? !1 : K === ie ? (l.peek(), w()) : P(l, !1);
    }, W = w();
    return l.resetPeek(), W;
  }
  function I(l) {
    b(l);
    const d = l.currentPeek() === "|";
    return l.resetPeek(), d;
  }
  function P(l, d = !0) {
    const A = (W = !1, K = "") => {
      const V = l.currentPeek();
      return V === "{" || V === "@" || !V ? W : V === "|" ? !(K === Se || K === ie) : V === Se ? (l.peek(), A(!0, Se)) : V === ie ? (l.peek(), A(!0, ie)) : !0;
    }, w = A();
    return d && l.resetPeek(), w;
  }
  function k(l, d) {
    const A = l.currentChar();
    return A === Re ? Re : d(A) ? (l.next(), A) : null;
  }
  function q(l) {
    const d = l.charCodeAt(0);
    return d >= 97 && d <= 122 || // a-z
    d >= 65 && d <= 90 || // A-Z
    d >= 48 && d <= 57 || // 0-9
    d === 95 || // _
    d === 36;
  }
  function oe(l) {
    return k(l, q);
  }
  function Ne(l) {
    const d = l.charCodeAt(0);
    return d >= 97 && d <= 122 || // a-z
    d >= 65 && d <= 90 || // A-Z
    d >= 48 && d <= 57 || // 0-9
    d === 95 || // _
    d === 36 || // $
    d === 45;
  }
  function z(l) {
    return k(l, Ne);
  }
  function ke(l) {
    const d = l.charCodeAt(0);
    return d >= 48 && d <= 57;
  }
  function ee(l) {
    return k(l, ke);
  }
  function Z(l) {
    const d = l.charCodeAt(0);
    return d >= 48 && d <= 57 || // 0-9
    d >= 65 && d <= 70 || // A-F
    d >= 97 && d <= 102;
  }
  function ge(l) {
    return k(l, Z);
  }
  function le(l) {
    let d = "", A = "";
    for (; d = ee(l); )
      A += d;
    return A;
  }
  function Oe(l) {
    let d = "";
    for (; ; ) {
      const A = l.currentChar();
      if (A === "\\") {
        const w = l.peek();
        w === "{" || w === "}" || w === "@" || w === "|" || w === "\\" ? (d += A + w, l.next(), l.next()) : (l.resetPeek(), d += A, l.next());
      } else {
        if (A === "{" || A === "}" || A === "@" || A === "|" || !A)
          break;
        if (A === Se || A === ie)
          if (P(l))
            d += A, l.next();
          else {
            if (I(l))
              break;
            d += A, l.next();
          }
        else
          d += A, l.next();
      }
    }
    return d;
  }
  function Ve(l) {
    N(l);
    let d = "", A = "";
    for (; d = z(l); )
      A += d;
    const w = l.currentChar();
    if (w && w !== "}" && w !== Re && w !== Se && w !== ie && w !== "　") {
      const W = Rt(l);
      return p(F.INVALID_TOKEN_IN_PLACEHOLDER, s(), 0, A + W), A + W;
    }
    return l.currentChar() === Re && p(F.UNTERMINATED_CLOSING_BRACE, s(), 0), A;
  }
  function Fe(l) {
    N(l);
    let d = "";
    return l.currentChar() === "-" ? (l.next(), d += `-${le(l)}`) : d += le(l), l.currentChar() === Re && p(F.UNTERMINATED_CLOSING_BRACE, s(), 0), d;
  }
  function Qe(l) {
    return l !== oo && l !== ie;
  }
  function yr(l) {
    N(l), g(l, "'");
    let d = "", A = "";
    for (; d = k(l, Qe); )
      d === "\\" ? A += dn(l) : A += d;
    const w = l.currentChar();
    return w === ie || w === Re ? (p(F.UNTERMINATED_SINGLE_QUOTE_IN_PLACEHOLDER, s(), 0), w === ie && (l.next(), g(l, "'")), A) : (g(l, "'"), A);
  }
  function dn(l) {
    const d = l.currentChar();
    switch (d) {
      case "\\":
      case "'":
        return l.next(), `\\${d}`;
      case "u":
        return Lt(l, d, 4);
      case "U":
        return Lt(l, d, 6);
      default:
        return p(F.UNKNOWN_ESCAPE_SEQUENCE, s(), 0, d), "";
    }
  }
  function Lt(l, d, A) {
    g(l, d);
    let w = "";
    for (let W = 0; W < A; W++) {
      const K = ge(l);
      if (!K) {
        p(F.INVALID_UNICODE_ESCAPE_SEQUENCE, s(), 0, `\\${d}${w}${l.currentChar()}`);
        break;
      }
      w += K;
    }
    return `\\${d}${w}`;
  }
  function pn(l) {
    return l !== "{" && l !== "}" && l !== Se && l !== ie;
  }
  function Rt(l) {
    N(l);
    let d = "", A = "";
    for (; d = k(l, pn); )
      A += d;
    return A;
  }
  function mn(l) {
    let d = "", A = "";
    for (; d = oe(l); )
      A += d;
    return A;
  }
  function _n(l) {
    const d = (A) => {
      const w = l.currentChar();
      return w === "{" || w === "@" || w === "|" || w === "(" || w === ")" || !w || w === Se ? A : (A += w, l.next(), d(A));
    };
    return d("");
  }
  function lt(l) {
    N(l);
    const d = g(
      l,
      "|"
      /* TokenChars.Pipe */
    );
    return N(l), d;
  }
  function ut(l, d) {
    let A = null;
    switch (l.currentChar()) {
      case "{":
        return d.braceNest >= 1 && p(F.NOT_ALLOW_NEST_PLACEHOLDER, s(), 0), l.next(), A = _(
          d,
          2,
          "{"
          /* TokenChars.BraceLeft */
        ), N(l), d.braceNest++, A;
      case "}":
        return d.braceNest > 0 && d.currentType === 2 && p(F.EMPTY_PLACEHOLDER, s(), 0), l.next(), A = _(
          d,
          3,
          "}"
          /* TokenChars.BraceRight */
        ), d.braceNest--, d.braceNest > 0 && N(l), d.inLinked && d.braceNest === 0 && (d.inLinked = !1), A;
      case "@":
        return d.braceNest > 0 && p(F.UNTERMINATED_CLOSING_BRACE, s(), 0), A = $e(l, d) || L(d), d.braceNest = 0, A;
      default: {
        let W = !0, K = !0, V = !0;
        if (I(l))
          return d.braceNest > 0 && p(F.UNTERMINATED_CLOSING_BRACE, s(), 0), A = _(d, 1, lt(l)), d.braceNest = 0, d.inLinked = !1, A;
        if (d.braceNest > 0 && (d.currentType === 4 || d.currentType === 5 || d.currentType === 6))
          return p(F.UNTERMINATED_CLOSING_BRACE, s(), 0), d.braceNest = 0, ft(l, d);
        if (W = T(l, d))
          return A = _(d, 4, Ve(l)), N(l), A;
        if (K = y(l, d))
          return A = _(d, 5, Fe(l)), N(l), A;
        if (V = v(l, d))
          return A = _(d, 6, yr(l)), N(l), A;
        if (!W && !K && !V)
          return A = _(d, 12, Rt(l)), p(F.INVALID_TOKEN_IN_PLACEHOLDER, s(), 0, A.value), N(l), A;
        break;
      }
    }
    return A;
  }
  function $e(l, d) {
    const { currentType: A } = d;
    let w = null;
    const W = l.currentChar();
    switch ((A === 7 || A === 8 || A === 11 || A === 9) && (W === ie || W === Se) && p(F.INVALID_LINKED_FORMAT, s(), 0), W) {
      case "@":
        return l.next(), w = _(
          d,
          7,
          "@"
          /* TokenChars.LinkedAlias */
        ), d.inLinked = !0, w;
      case ".":
        return N(l), l.next(), _(
          d,
          8,
          "."
          /* TokenChars.LinkedDot */
        );
      case ":":
        return N(l), l.next(), _(
          d,
          9,
          ":"
          /* TokenChars.LinkedDelimiter */
        );
      default:
        return I(l) ? (w = _(d, 1, lt(l)), d.braceNest = 0, d.inLinked = !1, w) : C(l, d) || x(l, d) ? (N(l), $e(l, d)) : h(l, d) ? (N(l), _(d, 11, mn(l))) : M(l, d) ? (N(l), W === "{" ? ut(l, d) || w : _(d, 10, _n(l))) : (A === 7 && p(F.INVALID_LINKED_FORMAT, s(), 0), d.braceNest = 0, d.inLinked = !1, ft(l, d));
    }
  }
  function ft(l, d) {
    let A = {
      type: 13
      /* TokenTypes.EOF */
    };
    if (d.braceNest > 0)
      return ut(l, d) || L(d);
    if (d.inLinked)
      return $e(l, d) || L(d);
    switch (l.currentChar()) {
      case "{":
        return ut(l, d) || L(d);
      case "}":
        return p(F.UNBALANCED_CLOSING_BRACE, s(), 0), l.next(), _(
          d,
          3,
          "}"
          /* TokenChars.BraceRight */
        );
      case "@":
        return $e(l, d) || L(d);
      default: {
        if (I(l))
          return A = _(d, 1, lt(l)), d.braceNest = 0, d.inLinked = !1, A;
        if (P(l))
          return _(d, 0, Oe(l));
        break;
      }
    }
    return A;
  }
  function hn() {
    const { currentType: l, offset: d, startLoc: A, endLoc: w } = c;
    return c.lastType = l, c.lastOffset = d, c.lastStartLoc = A, c.lastEndLoc = w, c.offset = o(), c.startLoc = s(), r.currentChar() === Re ? _(
      c,
      13
      /* TokenTypes.EOF */
    ) : ft(r, c);
  }
  return {
    nextToken: hn,
    currentOffset: o,
    currentPosition: s,
    context: f
  };
}
const Lc = "parser", Rc = /(?:\\\\|\\'|\\u([0-9a-fA-F]{4})|\\U([0-9a-fA-F]{6}))/g, vc = /\\([\\@{}|])/g;
function Cc(e, t) {
  return t;
}
function Ic(e, t, n) {
  switch (e) {
    case "\\\\":
      return "\\";
    // eslint-disable-next-line no-useless-escape
    case "\\'":
      return "'";
    default: {
      const r = parseInt(t || n, 16);
      return r <= 55295 || r >= 57344 ? String.fromCodePoint(r) : "�";
    }
  }
}
function Pc(e = {}) {
  const t = e.location !== !1, { onError: n } = e;
  function r(m, O, T, y, ...v) {
    const C = m.currentPosition();
    if (C.offset += y, C.column += y, n) {
      const h = t ? Gn(T, C) : null, x = ct(O, h, {
        domain: Lc,
        args: v
      });
      n(x);
    }
  }
  function o(m, O, T) {
    const y = { type: m };
    return t && (y.start = O, y.end = O, y.loc = { start: T, end: T }), y;
  }
  function s(m, O, T, y) {
    t && (m.end = O, m.loc && (m.loc.end = T));
  }
  function i(m, O) {
    const T = m.context(), y = o(3, T.offset, T.startLoc);
    return y.value = O.replace(vc, Cc), s(y, m.currentOffset(), m.currentPosition()), y;
  }
  function a(m, O) {
    const T = m.context(), { lastOffset: y, lastStartLoc: v } = T, C = o(5, y, v);
    return C.index = parseInt(O, 10), m.nextToken(), s(C, m.currentOffset(), m.currentPosition()), C;
  }
  function c(m, O) {
    const T = m.context(), { lastOffset: y, lastStartLoc: v } = T, C = o(4, y, v);
    return C.key = O, m.nextToken(), s(C, m.currentOffset(), m.currentPosition()), C;
  }
  function f(m, O) {
    const T = m.context(), { lastOffset: y, lastStartLoc: v } = T, C = o(9, y, v);
    return C.value = O.replace(Rc, Ic), m.nextToken(), s(C, m.currentOffset(), m.currentPosition()), C;
  }
  function u(m) {
    const O = m.nextToken(), T = m.context(), { lastOffset: y, lastStartLoc: v } = T, C = o(8, y, v);
    return O.type !== 11 ? (r(m, F.UNEXPECTED_EMPTY_LINKED_MODIFIER, T.lastStartLoc, 0), C.value = "", s(C, y, v), {
      nextConsumeToken: O,
      node: C
    }) : (O.value == null && r(m, F.UNEXPECTED_LEXICAL_ANALYSIS, T.lastStartLoc, 0, Te(O)), C.value = O.value || "", s(C, m.currentOffset(), m.currentPosition()), {
      node: C
    });
  }
  function p(m, O) {
    const T = m.context(), y = o(7, T.offset, T.startLoc);
    return y.value = O, s(y, m.currentOffset(), m.currentPosition()), y;
  }
  function _(m) {
    const O = m.context(), T = o(6, O.offset, O.startLoc);
    let y = m.nextToken();
    if (y.type === 8) {
      const v = u(m);
      T.modifier = v.node, y = v.nextConsumeToken || m.nextToken();
    }
    switch (y.type !== 9 && r(m, F.UNEXPECTED_LEXICAL_ANALYSIS, O.lastStartLoc, 0, Te(y)), y = m.nextToken(), y.type === 2 && (y = m.nextToken()), y.type) {
      case 10:
        y.value == null && r(m, F.UNEXPECTED_LEXICAL_ANALYSIS, O.lastStartLoc, 0, Te(y)), T.key = p(m, y.value || "");
        break;
      case 4:
        y.value == null && r(m, F.UNEXPECTED_LEXICAL_ANALYSIS, O.lastStartLoc, 0, Te(y)), T.key = c(m, y.value || "");
        break;
      case 5:
        y.value == null && r(m, F.UNEXPECTED_LEXICAL_ANALYSIS, O.lastStartLoc, 0, Te(y)), T.key = a(m, y.value || "");
        break;
      case 6:
        y.value == null && r(m, F.UNEXPECTED_LEXICAL_ANALYSIS, O.lastStartLoc, 0, Te(y)), T.key = f(m, y.value || "");
        break;
      default: {
        r(m, F.UNEXPECTED_EMPTY_LINKED_KEY, O.lastStartLoc, 0);
        const v = m.context(), C = o(7, v.offset, v.startLoc);
        return C.value = "", s(C, v.offset, v.startLoc), T.key = C, s(T, v.offset, v.startLoc), {
          nextConsumeToken: y,
          node: T
        };
      }
    }
    return s(T, m.currentOffset(), m.currentPosition()), {
      node: T
    };
  }
  function L(m) {
    const O = m.context(), T = O.currentType === 1 ? m.currentOffset() : O.offset, y = O.currentType === 1 ? O.endLoc : O.startLoc, v = o(2, T, y);
    v.items = [];
    let C = null;
    do {
      const M = C || m.nextToken();
      switch (C = null, M.type) {
        case 0:
          M.value == null && r(m, F.UNEXPECTED_LEXICAL_ANALYSIS, O.lastStartLoc, 0, Te(M)), v.items.push(i(m, M.value || ""));
          break;
        case 5:
          M.value == null && r(m, F.UNEXPECTED_LEXICAL_ANALYSIS, O.lastStartLoc, 0, Te(M)), v.items.push(a(m, M.value || ""));
          break;
        case 4:
          M.value == null && r(m, F.UNEXPECTED_LEXICAL_ANALYSIS, O.lastStartLoc, 0, Te(M)), v.items.push(c(m, M.value || ""));
          break;
        case 6:
          M.value == null && r(m, F.UNEXPECTED_LEXICAL_ANALYSIS, O.lastStartLoc, 0, Te(M)), v.items.push(f(m, M.value || ""));
          break;
        case 7: {
          const I = _(m);
          v.items.push(I.node), C = I.nextConsumeToken || null;
          break;
        }
      }
    } while (O.currentType !== 13 && O.currentType !== 1);
    const h = O.currentType === 1 ? O.lastOffset : m.currentOffset(), x = O.currentType === 1 ? O.lastEndLoc : m.currentPosition();
    return s(v, h, x), v;
  }
  function g(m, O, T, y) {
    const v = m.context();
    let C = y.items.length === 0;
    const h = o(1, O, T);
    h.cases = [], h.cases.push(y);
    do {
      const x = L(m);
      C || (C = x.items.length === 0), h.cases.push(x);
    } while (v.currentType !== 13);
    return C && r(m, F.MUST_HAVE_MESSAGES_IN_PLURAL, T, 0), s(h, m.currentOffset(), m.currentPosition()), h;
  }
  function b(m) {
    const O = m.context(), { offset: T, startLoc: y } = O, v = L(m);
    return O.currentType === 13 ? v : g(m, T, y, v);
  }
  function N(m) {
    const O = Ac(m, re({}, e)), T = O.context(), y = o(0, T.offset, T.startLoc);
    return t && y.loc && (y.loc.source = m), y.body = b(O), e.onCacheKey && (y.cacheKey = e.onCacheKey(m)), T.currentType !== 13 && r(O, F.UNEXPECTED_LEXICAL_ANALYSIS, T.lastStartLoc, 0, m[T.offset] || ""), s(y, O.currentOffset(), O.currentPosition()), y;
  }
  return { parse: N };
}
function Te(e) {
  if (e.type === 13)
    return "EOF";
  const t = (e.value || "").replace(/\r?\n/gu, "\\n");
  return t.length > 10 ? t.slice(0, 9) + "…" : t;
}
function wc(e, t = {}) {
  const n = {
    ast: e,
    helpers: /* @__PURE__ */ new Set()
  };
  return { context: () => n, helper: (s) => (n.helpers.add(s), s) };
}
function so(e, t) {
  for (let n = 0; n < e.length; n++)
    mr(e[n], t);
}
function mr(e, t) {
  switch (e.type) {
    case 1:
      so(e.cases, t), t.helper(
        "plural"
        /* HelperNameMap.PLURAL */
      );
      break;
    case 2:
      so(e.items, t);
      break;
    case 6: {
      mr(e.key, t), t.helper(
        "linked"
        /* HelperNameMap.LINKED */
      ), t.helper(
        "type"
        /* HelperNameMap.TYPE */
      );
      break;
    }
    case 5:
      t.helper(
        "interpolate"
        /* HelperNameMap.INTERPOLATE */
      ), t.helper(
        "list"
        /* HelperNameMap.LIST */
      );
      break;
    case 4:
      t.helper(
        "interpolate"
        /* HelperNameMap.INTERPOLATE */
      ), t.helper(
        "named"
        /* HelperNameMap.NAMED */
      );
      break;
  }
}
function Dc(e, t = {}) {
  const n = wc(e);
  n.helper(
    "normalize"
    /* HelperNameMap.NORMALIZE */
  ), e.body && mr(e.body, n);
  const r = n.context();
  e.helpers = Array.from(r.helpers);
}
function kc(e) {
  const t = e.body;
  return t.type === 2 ? io(t) : t.cases.forEach((n) => io(n)), e;
}
function io(e) {
  if (e.items.length === 1) {
    const t = e.items[0];
    (t.type === 3 || t.type === 9) && (e.static = t.value, delete t.value);
  } else {
    const t = [];
    for (let n = 0; n < e.items.length; n++) {
      const r = e.items[n];
      if (!(r.type === 3 || r.type === 9) || r.value == null)
        break;
      t.push(r.value);
    }
    if (t.length === e.items.length) {
      e.static = pr(t);
      for (let n = 0; n < e.items.length; n++) {
        const r = e.items[n];
        (r.type === 3 || r.type === 9) && delete r.value;
      }
    }
  }
}
const Fc = "minifier";
function et(e) {
  switch (e.t = e.type, e.type) {
    case 0: {
      const t = e;
      et(t.body), t.b = t.body, delete t.body;
      break;
    }
    case 1: {
      const t = e, n = t.cases;
      for (let r = 0; r < n.length; r++)
        et(n[r]);
      t.c = n, delete t.cases;
      break;
    }
    case 2: {
      const t = e, n = t.items;
      for (let r = 0; r < n.length; r++)
        et(n[r]);
      t.i = n, delete t.items, t.static && (t.s = t.static, delete t.static);
      break;
    }
    case 3:
    case 9:
    case 8:
    case 7: {
      const t = e;
      t.value && (t.v = t.value, delete t.value);
      break;
    }
    case 6: {
      const t = e;
      et(t.key), t.k = t.key, delete t.key, t.modifier && (et(t.modifier), t.m = t.modifier, delete t.modifier);
      break;
    }
    case 5: {
      const t = e;
      t.i = t.index, delete t.index;
      break;
    }
    case 4: {
      const t = e;
      t.k = t.key, delete t.key;
      break;
    }
    default:
      if (process.env.NODE_ENV !== "production")
        throw ct(F.UNHANDLED_MINIFIER_NODE_TYPE, null, {
          domain: Fc,
          args: [e.type]
        });
  }
  delete e.type;
}
const Uc = "parser";
function Mc(e, t) {
  const { filename: n, breakLineCode: r, needIndent: o } = t, s = t.location !== !1, i = {
    filename: n,
    code: "",
    column: 1,
    line: 1,
    offset: 0,
    map: void 0,
    breakLineCode: r,
    needIndent: o,
    indentLevel: 0
  };
  s && e.loc && (i.source = e.loc.source);
  const a = () => i;
  function c(b, N) {
    i.code += b;
  }
  function f(b, N = !0) {
    const m = N ? r : "";
    c(o ? m + "  ".repeat(b) : m);
  }
  function u(b = !0) {
    const N = ++i.indentLevel;
    b && f(N);
  }
  function p(b = !0) {
    const N = --i.indentLevel;
    b && f(N);
  }
  function _() {
    f(i.indentLevel);
  }
  return {
    context: a,
    push: c,
    indent: u,
    deindent: p,
    newline: _,
    helper: (b) => `_${b}`,
    needIndent: () => i.needIndent
  };
}
function xc(e, t) {
  const { helper: n } = e;
  e.push(`${n(
    "linked"
    /* HelperNameMap.LINKED */
  )}(`), ot(e, t.key), t.modifier ? (e.push(", "), ot(e, t.modifier), e.push(", _type")) : e.push(", undefined, _type"), e.push(")");
}
function Vc(e, t) {
  const { helper: n, needIndent: r } = e;
  e.push(`${n(
    "normalize"
    /* HelperNameMap.NORMALIZE */
  )}([`), e.indent(r());
  const o = t.items.length;
  for (let s = 0; s < o && (ot(e, t.items[s]), s !== o - 1); s++)
    e.push(", ");
  e.deindent(r()), e.push("])");
}
function $c(e, t) {
  const { helper: n, needIndent: r } = e;
  if (t.cases.length > 1) {
    e.push(`${n(
      "plural"
      /* HelperNameMap.PLURAL */
    )}([`), e.indent(r());
    const o = t.cases.length;
    for (let s = 0; s < o && (ot(e, t.cases[s]), s !== o - 1); s++)
      e.push(", ");
    e.deindent(r()), e.push("])");
  }
}
function Bc(e, t) {
  t.body ? ot(e, t.body) : e.push("null");
}
function ot(e, t) {
  const { helper: n } = e;
  switch (t.type) {
    case 0:
      Bc(e, t);
      break;
    case 1:
      $c(e, t);
      break;
    case 2:
      Vc(e, t);
      break;
    case 6:
      xc(e, t);
      break;
    case 8:
      e.push(JSON.stringify(t.value), t);
      break;
    case 7:
      e.push(JSON.stringify(t.value), t);
      break;
    case 5:
      e.push(`${n(
        "interpolate"
        /* HelperNameMap.INTERPOLATE */
      )}(${n(
        "list"
        /* HelperNameMap.LIST */
      )}(${t.index}))`, t);
      break;
    case 4:
      e.push(`${n(
        "interpolate"
        /* HelperNameMap.INTERPOLATE */
      )}(${n(
        "named"
        /* HelperNameMap.NAMED */
      )}(${JSON.stringify(t.key)}))`, t);
      break;
    case 9:
      e.push(JSON.stringify(t.value), t);
      break;
    case 3:
      e.push(JSON.stringify(t.value), t);
      break;
    default:
      if (process.env.NODE_ENV !== "production")
        throw ct(F.UNHANDLED_CODEGEN_NODE_TYPE, null, {
          domain: Uc,
          args: [t.type]
        });
  }
}
const jc = (e, t = {}) => {
  const n = D(t.mode) ? t.mode : "normal", r = D(t.filename) ? t.filename : "message.intl";
  t.sourceMap;
  const o = t.breakLineCode != null ? t.breakLineCode : n === "arrow" ? ";" : `
`, s = t.needIndent ? t.needIndent : n !== "arrow", i = e.helpers || [], a = Mc(e, {
    filename: r,
    breakLineCode: o,
    needIndent: s
  });
  a.push(n === "normal" ? "function __msg__ (ctx) {" : "(ctx) => {"), a.indent(s), i.length > 0 && (a.push(`const { ${pr(i.map((u) => `${u}: _${u}`), ", ")} } = ctx`), a.newline()), a.push("return "), ot(a, e), a.deindent(s), a.push("}"), delete e.helpers;
  const { code: c, map: f } = a.context();
  return {
    ast: e,
    code: c,
    map: f ? f.toJSON() : void 0
    // eslint-disable-line @typescript-eslint/no-explicit-any
  };
};
function Hc(e, t = {}) {
  const n = re({}, t), r = !!n.jit, o = !!n.minify, s = n.optimize == null ? !0 : n.optimize, a = Pc(n).parse(e);
  return r ? (s && kc(a), o && et(a), { ast: a, code: "" }) : (Dc(a, n), jc(a, n));
}
function qc() {
  typeof __INTLIFY_PROD_DEVTOOLS__ != "boolean" && (Ge().__INTLIFY_PROD_DEVTOOLS__ = !1), typeof __INTLIFY_DROP_MESSAGE_COMPILER__ != "boolean" && (Ge().__INTLIFY_DROP_MESSAGE_COMPILER__ = !1);
}
function be(e) {
  return B(e) && _r(e) === 0 && (Ee(e, "b") || Ee(e, "body"));
}
const ps = ["b", "body"];
function Wc(e) {
  return Me(e, ps);
}
const ms = ["c", "cases"];
function Gc(e) {
  return Me(e, ms, []);
}
const _s = ["s", "static"];
function Yc(e) {
  return Me(e, _s);
}
const hs = ["i", "items"];
function Kc(e) {
  return Me(e, hs, []);
}
const Es = ["t", "type"];
function _r(e) {
  return Me(e, Es);
}
const gs = ["v", "value"];
function Pt(e, t) {
  const n = Me(e, gs);
  if (n != null)
    return n;
  throw Et(t);
}
const bs = ["m", "modifier"];
function Xc(e) {
  return Me(e, bs);
}
const ys = ["k", "key"];
function Jc(e) {
  const t = Me(e, ys);
  if (t)
    return t;
  throw Et(
    6
    /* NodeTypes.Linked */
  );
}
function Me(e, t, n) {
  for (let r = 0; r < t.length; r++) {
    const o = t[r];
    if (Ee(e, o) && e[o] != null)
      return e[o];
  }
  return n;
}
const Ns = [
  ...ps,
  ...ms,
  ..._s,
  ...hs,
  ...ys,
  ...bs,
  ...gs,
  ...Es
];
function Et(e) {
  return new Error(`unhandled node type: ${e}`);
}
function Ln(e) {
  return (n) => Qc(n, e);
}
function Qc(e, t) {
  const n = Wc(t);
  if (n == null)
    throw Et(
      0
      /* NodeTypes.Resource */
    );
  if (_r(n) === 1) {
    const s = Gc(n);
    return e.plural(s.reduce((i, a) => [
      ...i,
      ao(e, a)
    ], []));
  } else
    return ao(e, n);
}
function ao(e, t) {
  const n = Yc(t);
  if (n != null)
    return e.type === "text" ? n : e.normalize([n]);
  {
    const r = Kc(t).reduce((o, s) => [...o, Yn(e, s)], []);
    return e.normalize(r);
  }
}
function Yn(e, t) {
  const n = _r(t);
  switch (n) {
    case 3:
      return Pt(t, n);
    case 9:
      return Pt(t, n);
    case 4: {
      const r = t;
      if (Ee(r, "k") && r.k)
        return e.interpolate(e.named(r.k));
      if (Ee(r, "key") && r.key)
        return e.interpolate(e.named(r.key));
      throw Et(n);
    }
    case 5: {
      const r = t;
      if (Ee(r, "i") && ne(r.i))
        return e.interpolate(e.list(r.i));
      if (Ee(r, "index") && ne(r.index))
        return e.interpolate(e.list(r.index));
      throw Et(n);
    }
    case 6: {
      const r = t, o = Xc(r), s = Jc(r);
      return e.linked(Yn(e, s), o ? Yn(e, o) : void 0, e.type);
    }
    case 7:
      return Pt(t, n);
    case 8:
      return Pt(t, n);
    default:
      throw new Error(`unhandled node on format message part: ${n}`);
  }
}
const zc = "Detected HTML in '{source}' message. Recommend not using HTML messages to avoid XSS.";
function Zc(e, t) {
  t && gc(e) && Le(an(zc, { source: e }));
}
const el = (e) => e;
let wt = H();
function tl(e, t = {}) {
  let n = !1;
  const r = t.onError || hc;
  return t.onError = (o) => {
    n = !0, r(o);
  }, { ...Hc(e, t), detectError: n };
}
// @__NO_SIDE_EFFECTS__
function nl(e, t) {
  if (!__INTLIFY_DROP_MESSAGE_COMPILER__ && D(e)) {
    const n = X(t.warnHtmlMessage) ? t.warnHtmlMessage : !0;
    process.env.NODE_ENV !== "production" && Zc(e, n);
    const o = (t.onCacheKey || el)(e), s = wt[o];
    if (s)
      return s;
    const { ast: i, detectError: a } = tl(e, {
      ...t,
      location: process.env.NODE_ENV !== "production",
      jit: !0
    }), c = Ln(i);
    return a ? c : wt[o] = c;
  } else {
    if (process.env.NODE_ENV !== "production" && !be(e))
      return Le(`the message that is resolve with key '${t.key}' is not supported for jit compilation`), (() => e);
    const n = e.cacheKey;
    if (n) {
      const r = wt[n];
      return r || (wt[n] = Ln(e));
    } else
      return Ln(e);
  }
}
let gt = null;
function rl(e) {
  gt = e;
}
function ol(e, t, n) {
  gt && gt.emit("i18n:init", {
    timestamp: Date.now(),
    i18n: e,
    version: t,
    meta: n
  });
}
const sl = /* @__PURE__ */ il("function:translate");
function il(e) {
  return (t) => gt && gt.emit(e, t);
}
const ae = {
  INVALID_ARGUMENT: mc,
  // 17
  INVALID_DATE_ARGUMENT: 18,
  INVALID_ISO_DATE_ARGUMENT: 19,
  NOT_SUPPORT_NON_STRING_MESSAGE: 20,
  NOT_SUPPORT_LOCALE_PROMISE_VALUE: 21,
  NOT_SUPPORT_LOCALE_ASYNC_FUNCTION: 22,
  NOT_SUPPORT_LOCALE_TYPE: 23
}, al = 24;
function ve(e) {
  return ct(e, null, process.env.NODE_ENV !== "production" ? { messages: cl } : void 0);
}
const cl = {
  [ae.INVALID_ARGUMENT]: "Invalid arguments",
  [ae.INVALID_DATE_ARGUMENT]: "The date provided is an invalid Date object.Make sure your Date represents a valid date.",
  [ae.INVALID_ISO_DATE_ARGUMENT]: "The argument provided is not a valid ISO date string",
  [ae.NOT_SUPPORT_NON_STRING_MESSAGE]: "Not support non-string message",
  [ae.NOT_SUPPORT_LOCALE_PROMISE_VALUE]: "cannot support promise value",
  [ae.NOT_SUPPORT_LOCALE_ASYNC_FUNCTION]: "cannot support async function",
  [ae.NOT_SUPPORT_LOCALE_TYPE]: "cannot support locale type"
};
function hr(e, t) {
  return t.locale != null ? co(t.locale) : co(e.locale);
}
let Rn;
function co(e) {
  if (D(e))
    return e;
  if (G(e)) {
    if (e.resolvedOnce && Rn != null)
      return Rn;
    if (e.constructor.name === "Function") {
      const t = e();
      if (lc(t))
        throw ve(ae.NOT_SUPPORT_LOCALE_PROMISE_VALUE);
      return Rn = t;
    } else
      throw ve(ae.NOT_SUPPORT_LOCALE_ASYNC_FUNCTION);
  } else
    throw ve(ae.NOT_SUPPORT_LOCALE_TYPE);
}
function ll(e, t, n) {
  return [.../* @__PURE__ */ new Set([
    n,
    ...J(t) ? t : B(t) ? Object.keys(t) : D(t) ? [t] : [n]
  ])];
}
function Kn(e, t, n) {
  const r = D(n) ? n : Gt, o = e;
  o.__localeChainCache || (o.__localeChainCache = /* @__PURE__ */ new Map());
  let s = o.__localeChainCache.get(r);
  if (!s) {
    s = [];
    let i = [n];
    for (; J(i); )
      i = lo(s, i, t);
    const a = J(t) || !j(t) ? t : t.default ? t.default : null;
    i = D(a) ? [a] : a, J(i) && lo(s, i, !1), o.__localeChainCache.set(r, s);
  }
  return s;
}
function lo(e, t, n) {
  let r = !0;
  for (let o = 0; o < t.length && X(r); o++) {
    const s = t[o];
    D(s) && (r = ul(e, t[o], n));
  }
  return r;
}
function ul(e, t, n) {
  let r;
  const o = t.split("-");
  do {
    const s = o.join("-");
    r = fl(e, s, n), o.splice(-1, 1);
  } while (o.length && r === !0);
  return r;
}
function fl(e, t, n) {
  let r = !1;
  if (!e.includes(t) && (r = !0, t)) {
    r = t[t.length - 1] !== "!";
    const o = t.replace(/!/g, "");
    e.push(o), (J(n) || j(n)) && n[o] && (r = n[o]);
  }
  return r;
}
const xe = [];
xe[
  0
  /* States.BEFORE_PATH */
] = {
  w: [
    0
    /* States.BEFORE_PATH */
  ],
  i: [
    3,
    0
    /* Actions.APPEND */
  ],
  "[": [
    4
    /* States.IN_SUB_PATH */
  ],
  o: [
    7
    /* States.AFTER_PATH */
  ]
};
xe[
  1
  /* States.IN_PATH */
] = {
  w: [
    1
    /* States.IN_PATH */
  ],
  ".": [
    2
    /* States.BEFORE_IDENT */
  ],
  "[": [
    4
    /* States.IN_SUB_PATH */
  ],
  o: [
    7
    /* States.AFTER_PATH */
  ]
};
xe[
  2
  /* States.BEFORE_IDENT */
] = {
  w: [
    2
    /* States.BEFORE_IDENT */
  ],
  i: [
    3,
    0
    /* Actions.APPEND */
  ],
  0: [
    3,
    0
    /* Actions.APPEND */
  ]
};
xe[
  3
  /* States.IN_IDENT */
] = {
  i: [
    3,
    0
    /* Actions.APPEND */
  ],
  0: [
    3,
    0
    /* Actions.APPEND */
  ],
  w: [
    1,
    1
    /* Actions.PUSH */
  ],
  ".": [
    2,
    1
    /* Actions.PUSH */
  ],
  "[": [
    4,
    1
    /* Actions.PUSH */
  ],
  o: [
    7,
    1
    /* Actions.PUSH */
  ]
};
xe[
  4
  /* States.IN_SUB_PATH */
] = {
  "'": [
    5,
    0
    /* Actions.APPEND */
  ],
  '"': [
    6,
    0
    /* Actions.APPEND */
  ],
  "[": [
    4,
    2
    /* Actions.INC_SUB_PATH_DEPTH */
  ],
  "]": [
    1,
    3
    /* Actions.PUSH_SUB_PATH */
  ],
  o: 8,
  l: [
    4,
    0
    /* Actions.APPEND */
  ]
};
xe[
  5
  /* States.IN_SINGLE_QUOTE */
] = {
  "'": [
    4,
    0
    /* Actions.APPEND */
  ],
  o: 8,
  l: [
    5,
    0
    /* Actions.APPEND */
  ]
};
xe[
  6
  /* States.IN_DOUBLE_QUOTE */
] = {
  '"': [
    4,
    0
    /* Actions.APPEND */
  ],
  o: 8,
  l: [
    6,
    0
    /* Actions.APPEND */
  ]
};
const dl = /^\s?(?:true|false|-?[\d.]+|'[^']*'|"[^"]*")\s?$/;
function pl(e) {
  return dl.test(e);
}
function ml(e) {
  const t = e.charCodeAt(0), n = e.charCodeAt(e.length - 1);
  return t === n && (t === 34 || t === 39) ? e.slice(1, -1) : e;
}
function _l(e) {
  if (e == null)
    return "o";
  switch (e.charCodeAt(0)) {
    case 91:
    // [
    case 93:
    // ]
    case 46:
    // .
    case 34:
    // "
    case 39:
      return e;
    case 95:
    // _
    case 36:
    // $
    case 45:
      return "i";
    case 9:
    // Tab (HT)
    case 10:
    // Newline (LF)
    case 13:
    // Return (CR)
    case 160:
    // No-break space (NBSP)
    case 65279:
    // Byte Order Mark (BOM)
    case 8232:
    // Line Separator (LS)
    case 8233:
      return "w";
  }
  return "i";
}
function hl(e) {
  const t = e.trim();
  return e.charAt(0) === "0" && isNaN(parseInt(e)) ? !1 : pl(t) ? ml(t) : "*" + t;
}
function El(e) {
  const t = [];
  let n = -1, r = 0, o = 0, s, i, a, c, f, u, p;
  const _ = [];
  _[
    0
    /* Actions.APPEND */
  ] = () => {
    i === void 0 ? i = a : i += a;
  }, _[
    1
    /* Actions.PUSH */
  ] = () => {
    i !== void 0 && (t.push(i), i = void 0);
  }, _[
    2
    /* Actions.INC_SUB_PATH_DEPTH */
  ] = () => {
    _[
      0
      /* Actions.APPEND */
    ](), o++;
  }, _[
    3
    /* Actions.PUSH_SUB_PATH */
  ] = () => {
    if (o > 0)
      o--, r = 4, _[
        0
        /* Actions.APPEND */
      ]();
    else {
      if (o = 0, i === void 0 || (i = hl(i), i === !1))
        return !1;
      _[
        1
        /* Actions.PUSH */
      ]();
    }
  };
  function L() {
    const g = e[n + 1];
    if (r === 5 && g === "'" || r === 6 && g === '"')
      return n++, a = "\\" + g, _[
        0
        /* Actions.APPEND */
      ](), !0;
  }
  for (; r !== null; )
    if (n++, s = e[n], !(s === "\\" && L())) {
      if (c = _l(s), p = xe[r], f = p[c] || p.l || 8, f === 8 || (r = f[0], f[1] !== void 0 && (u = _[f[1]], u && (a = s, u() === !1))))
        return;
      if (r === 7)
        return t;
    }
}
const uo = /* @__PURE__ */ new Map();
function gl(e, t) {
  return B(e) ? e[t] : null;
}
function bl(e, t) {
  if (!B(e))
    return null;
  let n = uo.get(t);
  if (n || (n = El(t), n && uo.set(t, n)), !n)
    return null;
  const r = n.length;
  let o = e, s = 0;
  for (; s < r; ) {
    const i = n[s];
    if (Ns.includes(i) && be(o) || !B(o) || !Ee(o, i))
      return null;
    const a = o[i];
    if (a === void 0 || G(o))
      return null;
    o = a, s++;
  }
  return o;
}
const te = {
  NOT_FOUND_KEY: 1,
  FALLBACK_TO_TRANSLATE: 2,
  CANNOT_FORMAT_NUMBER: 3,
  FALLBACK_TO_NUMBER_FORMAT: 4,
  CANNOT_FORMAT_DATE: 5,
  FALLBACK_TO_DATE_FORMAT: 6,
  EXPERIMENTAL_CUSTOM_MESSAGE_COMPILER: 7,
  INVALID_NUMBER_ARGUMENT: 8,
  INVALID_DATE_ARGUMENT: 9
}, Ze = 10, yl = {
  [te.NOT_FOUND_KEY]: "Not found '{key}' key in '{locale}' locale messages.",
  [te.FALLBACK_TO_TRANSLATE]: "Fall back to translate '{key}' key with '{target}' locale.",
  [te.CANNOT_FORMAT_NUMBER]: "Cannot format a number value due to not supported Intl.NumberFormat.",
  [te.FALLBACK_TO_NUMBER_FORMAT]: "Fall back to number format '{key}' key with '{target}' locale.",
  [te.CANNOT_FORMAT_DATE]: "Cannot format a date value due to not supported Intl.DateTimeFormat.",
  [te.FALLBACK_TO_DATE_FORMAT]: "Fall back to datetime format '{key}' key with '{target}' locale.",
  [te.EXPERIMENTAL_CUSTOM_MESSAGE_COMPILER]: "This project is using Custom Message Compiler, which is an experimental feature. It may receive breaking changes or be removed in the future.",
  [te.INVALID_NUMBER_ARGUMENT]: "Invalid argument for number formatting: expected a number but received '{value}'.",
  [te.INVALID_DATE_ARGUMENT]: "Invalid argument for datetime formatting: expected a Date, number, or ISO string but received '{value}'."
};
function Ie(e, ...t) {
  return an(yl[e], ...t);
}
const Nl = "11.3.0", ln = -1, Gt = "en-US", st = "", fo = (e) => `${e.charAt(0).toLocaleUpperCase()}${e.substr(1)}`;
function Ol() {
  return {
    upper: (e, t) => t === "text" && D(e) ? e.toUpperCase() : t === "vnode" && B(e) && "__v_isVNode" in e ? e.children.toUpperCase() : e,
    lower: (e, t) => t === "text" && D(e) ? e.toLowerCase() : t === "vnode" && B(e) && "__v_isVNode" in e ? e.children.toLowerCase() : e,
    capitalize: (e, t) => t === "text" && D(e) ? fo(e) : t === "vnode" && B(e) && "__v_isVNode" in e ? fo(e.children) : e
  };
}
let Os;
function Sl(e) {
  Os = e;
}
let Ss;
function Tl(e) {
  Ss = e;
}
let Ts;
function Al(e) {
  Ts = e;
}
let As = null;
const Ll = /* @__NO_SIDE_EFFECTS__ */ (e) => {
  As = e;
}, Rl = /* @__NO_SIDE_EFFECTS__ */ () => As;
let Ls = null;
const po = (e) => {
  Ls = e;
}, vl = () => Ls;
let mo = 0;
function Cl(e = {}) {
  const t = G(e.onWarn) ? e.onWarn : Le, n = D(e.version) ? e.version : Nl, r = D(e.locale) || G(e.locale) ? e.locale : Gt, o = G(r) ? Gt : r, s = J(e.fallbackLocale) || j(e.fallbackLocale) || D(e.fallbackLocale) || e.fallbackLocale === !1 ? e.fallbackLocale : o, i = j(e.messages) ? e.messages : vn(o), a = j(e.datetimeFormats) ? e.datetimeFormats : vn(o), c = j(e.numberFormats) ? e.numberFormats : vn(o), f = re(H(), e.modifiers, Ol()), u = e.pluralRules || H(), p = G(e.missing) ? e.missing : null, _ = X(e.missingWarn) || Wt(e.missingWarn) ? e.missingWarn : !0, L = X(e.fallbackWarn) || Wt(e.fallbackWarn) ? e.fallbackWarn : !0, g = !!e.fallbackFormat, b = !!e.unresolving, N = G(e.postTranslation) ? e.postTranslation : null, m = j(e.processor) ? e.processor : null, O = X(e.warnHtmlMessage) ? e.warnHtmlMessage : !0, T = !!e.escapeParameter, y = G(e.messageCompiler) ? e.messageCompiler : Os;
  process.env.NODE_ENV !== "production" && G(e.messageCompiler) && nc(Ie(te.EXPERIMENTAL_CUSTOM_MESSAGE_COMPILER));
  const v = G(e.messageResolver) ? e.messageResolver : Ss || gl, C = G(e.localeFallbacker) ? e.localeFallbacker : Ts || ll, h = B(e.fallbackContext) ? e.fallbackContext : void 0, x = e, M = B(x.__datetimeFormatters) ? x.__datetimeFormatters : /* @__PURE__ */ new Map(), I = B(x.__numberFormatters) ? x.__numberFormatters : /* @__PURE__ */ new Map(), P = B(x.__meta) ? x.__meta : {};
  mo++;
  const k = {
    version: n,
    cid: mo,
    locale: r,
    fallbackLocale: s,
    messages: i,
    modifiers: f,
    pluralRules: u,
    missing: p,
    missingWarn: _,
    fallbackWarn: L,
    fallbackFormat: g,
    unresolving: b,
    postTranslation: N,
    processor: m,
    warnHtmlMessage: O,
    escapeParameter: T,
    messageCompiler: y,
    messageResolver: v,
    localeFallbacker: C,
    fallbackContext: h,
    onWarn: t,
    __meta: P
  };
  return k.datetimeFormats = a, k.numberFormats = c, k.__datetimeFormatters = M, k.__numberFormatters = I, process.env.NODE_ENV !== "production" && (k.__v_emitter = x.__v_emitter != null ? x.__v_emitter : void 0), (process.env.NODE_ENV !== "production" || __INTLIFY_PROD_DEVTOOLS__) && ol(k, n, P), k;
}
const vn = (e) => ({ [e]: H() });
function un(e, t) {
  return e instanceof RegExp ? e.test(t) : e;
}
function Rs(e, t) {
  return e instanceof RegExp ? e.test(t) : e;
}
function Er(e, t, n, r, o) {
  const { missing: s, onWarn: i } = e;
  if (process.env.NODE_ENV !== "production") {
    const a = e.__v_emitter;
    a && a.emit("missing", {
      locale: n,
      key: t,
      type: o,
      groupId: `${o}:${t}`
    });
  }
  if (s !== null) {
    const a = s(e, n, t, o);
    return D(a) ? a : t;
  } else
    return process.env.NODE_ENV !== "production" && Rs(r, t) && i(Ie(te.NOT_FOUND_KEY, { key: t, locale: n })), t;
}
function pt(e, t, n) {
  const r = e;
  r.__localeChainCache = /* @__PURE__ */ new Map(), e.localeFallbacker(e, n, t);
}
function vs(e, t) {
  return e === t ? !1 : e.split("-")[0] === t.split("-")[0];
}
function Il(e, t) {
  const n = t.indexOf(e);
  if (n === -1)
    return !1;
  for (let r = n + 1; r < t.length; r++)
    if (vs(e, t[r]))
      return !0;
  return !1;
}
const _o = typeof Intl < "u", Cs = {
  dateTimeFormat: _o && typeof Intl.DateTimeFormat < "u",
  numberFormat: _o && typeof Intl.NumberFormat < "u"
};
function ho(e, ...t) {
  const { datetimeFormats: n, unresolving: r, fallbackLocale: o, onWarn: s, localeFallbacker: i } = e, { __datetimeFormatters: a } = e;
  if (process.env.NODE_ENV !== "production" && !Cs.dateTimeFormat)
    return s(Ie(te.CANNOT_FORMAT_DATE)), st;
  if (!D(t[0]) && !fs(t[0]) && !ne(t[0]))
    return process.env.NODE_ENV !== "production" && s(Ie(te.INVALID_DATE_ARGUMENT, {
      value: String(t[0])
    })), st;
  const [c, f, u, p] = Xn(...t), _ = X(u.missingWarn) ? u.missingWarn : e.missingWarn, L = X(u.fallbackWarn) ? u.fallbackWarn : e.fallbackWarn, g = !!u.part, b = hr(e, u), N = i(
    e,
    // eslint-disable-line @typescript-eslint/no-explicit-any
    o,
    b
  );
  if (!D(c) || c === "")
    return new Intl.DateTimeFormat(b.replace(/!/g, ""), p).format(f);
  let m = {}, O, T = null, y = b, v = null;
  const C = "datetime format";
  for (let M = 0; M < N.length; M++) {
    if (O = v = N[M], process.env.NODE_ENV !== "production" && b !== O && un(L, c) && s(Ie(te.FALLBACK_TO_DATE_FORMAT, {
      key: c,
      target: O
    })), process.env.NODE_ENV !== "production" && b !== O) {
      const I = e.__v_emitter;
      I && I.emit("fallback", {
        type: C,
        key: c,
        from: y,
        to: v,
        groupId: `${C}:${c}`
      });
    }
    if (m = n[O] || {}, T = m[c], j(T))
      break;
    Er(e, c, O, _, C), y = v;
  }
  if (!j(T) || !D(O))
    return r ? ln : c;
  let h = `${O}__${c}`;
  cn(p) || (h = `${h}__${JSON.stringify(p)}`);
  let x = a.get(h);
  return x || (x = new Intl.DateTimeFormat(O, re({}, T, p)), a.set(h, x)), g ? x.formatToParts(f) : x.format(f);
}
const Is = [
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
function Xn(...e) {
  const [t, n, r, o] = e, s = H();
  let i = H(), a;
  if (D(t)) {
    const c = t.match(/(\d{4}-\d{2}-\d{2})(T|\s)?(.*)/);
    if (!c)
      throw ve(ae.INVALID_ISO_DATE_ARGUMENT);
    const f = c[3] ? c[3].trim().startsWith("T") ? `${c[1].trim()}${c[3].trim()}` : `${c[1].trim()}T${c[3].trim()}` : c[1].trim();
    a = new Date(f);
    try {
      a.toISOString();
    } catch {
      throw ve(ae.INVALID_ISO_DATE_ARGUMENT);
    }
  } else if (fs(t)) {
    if (isNaN(t.getTime()))
      throw ve(ae.INVALID_DATE_ARGUMENT);
    a = t;
  } else if (ne(t))
    a = t;
  else
    throw ve(ae.INVALID_ARGUMENT);
  return D(n) ? s.key = n : j(n) && Object.keys(n).forEach((c) => {
    Is.includes(c) ? i[c] = n[c] : s[c] = n[c];
  }), D(r) ? s.locale = r : j(r) && (i = r), j(o) && (i = o), [s.key || "", a, s, i];
}
function Eo(e, t, n) {
  const r = e;
  for (const o in n) {
    const s = `${t}__${o}`;
    r.__datetimeFormatters.has(s) && r.__datetimeFormatters.delete(s);
  }
}
function go(e, ...t) {
  const { numberFormats: n, unresolving: r, fallbackLocale: o, onWarn: s, localeFallbacker: i } = e, { __numberFormatters: a } = e;
  if (process.env.NODE_ENV !== "production" && !Cs.numberFormat)
    return s(Ie(te.CANNOT_FORMAT_NUMBER)), st;
  if (!ne(t[0]))
    return process.env.NODE_ENV !== "production" && s(Ie(te.INVALID_NUMBER_ARGUMENT, {
      value: String(t[0])
    })), st;
  const [c, f, u, p] = Jn(...t), _ = X(u.missingWarn) ? u.missingWarn : e.missingWarn, L = X(u.fallbackWarn) ? u.fallbackWarn : e.fallbackWarn, g = !!u.part, b = hr(e, u), N = i(
    e,
    // eslint-disable-line @typescript-eslint/no-explicit-any
    o,
    b
  );
  if (!D(c) || c === "")
    return new Intl.NumberFormat(b.replace(/!/g, ""), p).format(f);
  let m = {}, O, T = null, y = b, v = null;
  const C = "number format";
  for (let M = 0; M < N.length; M++) {
    if (O = v = N[M], process.env.NODE_ENV !== "production" && b !== O && un(L, c) && s(Ie(te.FALLBACK_TO_NUMBER_FORMAT, {
      key: c,
      target: O
    })), process.env.NODE_ENV !== "production" && b !== O) {
      const I = e.__v_emitter;
      I && I.emit("fallback", {
        type: C,
        key: c,
        from: y,
        to: v,
        groupId: `${C}:${c}`
      });
    }
    if (m = n[O] || {}, T = m[c], j(T))
      break;
    Er(e, c, O, _, C), y = v;
  }
  if (!j(T) || !D(O))
    return r ? ln : c;
  let h = `${O}__${c}`;
  cn(p) || (h = `${h}__${JSON.stringify(p)}`);
  let x = a.get(h);
  return x || (x = new Intl.NumberFormat(O, re({}, T, p)), a.set(h, x)), g ? x.formatToParts(f) : x.format(f);
}
const Ps = [
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
function Jn(...e) {
  const [t, n, r, o] = e, s = H();
  let i = H();
  if (!ne(t))
    throw ve(ae.INVALID_ARGUMENT);
  const a = t;
  return D(n) ? s.key = n : j(n) && Object.keys(n).forEach((c) => {
    Ps.includes(c) ? i[c] = n[c] : s[c] = n[c];
  }), D(r) ? s.locale = r : j(r) && (i = r), j(o) && (i = o), [s.key || "", a, s, i];
}
function bo(e, t, n) {
  const r = e;
  for (const o in n) {
    const s = `${t}__${o}`;
    r.__numberFormatters.has(s) && r.__numberFormatters.delete(s);
  }
}
const Pl = (e) => e, wl = (e) => "", Dl = "text", kl = (e) => e.length === 0 ? "" : pr(e), Fl = uc;
function Cn(e, t) {
  return e = Math.abs(e), t === 2 ? e === 1 ? 0 : 1 : Math.min(e, 2);
}
function Ul(e) {
  const t = ne(e.pluralIndex) ? e.pluralIndex : -1;
  return ne(e.named?.count) ? e.named.count : ne(e.named?.n) ? e.named.n : t;
}
function Ml(e = {}) {
  const t = e.locale, n = Ul(e), r = D(t) && G(e.pluralRules?.[t]) ? e.pluralRules[t] : Cn, o = r === Cn ? void 0 : Cn, s = (m) => m[r(n, m.length, o)], i = e.list || [], a = (m) => i[m], c = e.named || H();
  ne(e.pluralIndex) && (c.count ||= e.pluralIndex, c.n ||= e.pluralIndex);
  const f = (m) => c[m];
  function u(m, O) {
    const T = G(e.messages) ? e.messages(m, !!O) : B(e.messages) ? e.messages[m] : !1;
    return T || (e.parent ? e.parent.message(m) : wl);
  }
  const p = (m) => e.modifiers ? e.modifiers[m] : Pl, _ = G(e.processor?.normalize) ? e.processor.normalize : kl, L = G(e.processor?.interpolate) ? e.processor.interpolate : Fl, g = D(e.processor?.type) ? e.processor.type : Dl, N = {
    list: a,
    named: f,
    plural: s,
    linked: (m, ...O) => {
      const [T, y] = O;
      let v = "text", C = "";
      O.length === 1 ? B(T) ? (C = T.modifier || C, v = T.type || v) : D(T) && (C = T || C) : O.length === 2 && (D(T) && (C = T || C), D(y) && (v = y || v));
      const h = u(m, !0)(N), x = h === "" || h === void 0 ? m : h, M = (
        // The message in vnode resolved with linked are returned as an array by processor.nomalize
        v === "vnode" && J(x) && C ? x[0] : x
      );
      return C ? p(C)(M, v) : M;
    },
    message: u,
    type: g,
    interpolate: L,
    normalize: _,
    values: re(H(), i, c)
  };
  return N;
}
const yo = () => "", he = (e) => G(e);
function No(e, ...t) {
  const { fallbackFormat: n, postTranslation: r, unresolving: o, messageCompiler: s, fallbackLocale: i, messages: a } = e, [c, f] = Qn(...t), u = X(f.missingWarn) ? f.missingWarn : e.missingWarn, p = X(f.fallbackWarn) ? f.fallbackWarn : e.fallbackWarn, _ = X(f.escapeParameter) ? f.escapeParameter : e.escapeParameter, L = !!f.resolvedMessage, g = D(f.default) || X(f.default) ? X(f.default) ? s ? c : () => c : f.default : n ? s ? c : () => c : null, b = n || g != null && (D(g) || G(g)), N = hr(e, f);
  _ && xl(f);
  let [m, O, T] = L ? [
    c,
    N,
    a[N] || H()
  ] : ws(e, c, N, i, p, u), y = m, v = c;
  if (!L && !(D(y) || be(y) || he(y)) && b && (y = g, v = y), !L && (!(D(y) || be(y) || he(y)) || !D(O)))
    return o ? ln : c;
  if (process.env.NODE_ENV !== "production" && D(y) && e.messageCompiler == null)
    return Le(`The message format compilation is not supported in this build. Because message compiler isn't included. You need to pre-compilation all message format. So translate function return '${c}'.`), c;
  let C = !1;
  const h = () => {
    C = !0;
  }, x = he(y) ? y : Ds(e, c, O, y, v, h);
  if (C)
    return y;
  const M = jl(e, O, T, f), I = Ml(M), P = Vl(e, x, I);
  let k = r ? r(P, c) : P;
  if (_ && D(k) && (k = ac(k)), process.env.NODE_ENV !== "production" || __INTLIFY_PROD_DEVTOOLS__) {
    const q = {
      timestamp: Date.now(),
      key: D(c) ? c : he(y) ? y.key : "",
      locale: O || (he(y) ? y.locale : ""),
      format: D(y) ? y : he(y) ? y.source : "",
      message: k
    };
    q.meta = re({}, e.__meta, /* @__PURE__ */ Rl() || {}), sl(q);
  }
  return k;
}
function xl(e) {
  J(e.list) ? e.list = e.list.map((t) => D(t) ? to(t) : t) : B(e.named) && Object.keys(e.named).forEach((t) => {
    D(e.named[t]) && (e.named[t] = to(e.named[t]));
  });
}
function ws(e, t, n, r, o, s) {
  const { messages: i, onWarn: a, messageResolver: c, localeFallbacker: f } = e, u = f(e, r, n);
  let p = H(), _, L = null, g = n, b = null;
  const N = "translate";
  for (let m = 0; m < u.length; m++) {
    if (_ = b = u[m], process.env.NODE_ENV !== "production" && n !== _ && !vs(n, _) && un(o, t) && a(Ie(te.FALLBACK_TO_TRANSLATE, {
      key: t,
      target: _
    })), process.env.NODE_ENV !== "production" && n !== _) {
      const v = e.__v_emitter;
      v && v.emit("fallback", {
        type: N,
        key: t,
        from: g,
        to: b,
        groupId: `${N}:${t}`
      });
    }
    p = i[_] || H();
    let O = null, T, y;
    if (process.env.NODE_ENV !== "production" && Pe && (O = window.performance.now(), T = "intlify-message-resolve-start", y = "intlify-message-resolve-end", de && de(T)), (L = c(p, t)) === null && (L = p[t]), process.env.NODE_ENV !== "production" && Pe) {
      const v = window.performance.now(), C = e.__v_emitter;
      C && O && L && C.emit("message-resolve", {
        type: "message-resolve",
        key: t,
        message: L,
        time: v - O,
        groupId: `${N}:${t}`
      }), T && y && de && Je && (de(y), Je("intlify message resolve", T, y));
    }
    if (D(L) || be(L) || he(L))
      break;
    if (!Il(_, u)) {
      const v = Er(
        e,
        // eslint-disable-line @typescript-eslint/no-explicit-any
        t,
        _,
        s,
        N
      );
      v !== t && (L = v);
    }
    g = b;
  }
  return [L, _, p];
}
function Ds(e, t, n, r, o, s) {
  const { messageCompiler: i, warnHtmlMessage: a } = e;
  if (he(r)) {
    const _ = r;
    return _.locale = _.locale || n, _.key = _.key || t, _;
  }
  if (i == null) {
    const _ = (() => r);
    return _.locale = n, _.key = t, _;
  }
  let c = null, f, u;
  process.env.NODE_ENV !== "production" && Pe && (c = window.performance.now(), f = "intlify-message-compilation-start", u = "intlify-message-compilation-end", de && de(f));
  const p = i(r, $l(e, n, o, r, a, s));
  if (process.env.NODE_ENV !== "production" && Pe) {
    const _ = window.performance.now(), L = e.__v_emitter;
    L && c && L.emit("message-compilation", {
      type: "message-compilation",
      message: r,
      time: _ - c,
      groupId: `translate:${t}`
    }), f && u && de && Je && (de(u), Je("intlify message compilation", f, u));
  }
  return p.locale = n, p.key = t, p.source = r, p;
}
function Vl(e, t, n) {
  let r = null, o, s;
  process.env.NODE_ENV !== "production" && Pe && (r = window.performance.now(), o = "intlify-message-evaluation-start", s = "intlify-message-evaluation-end", de && de(o));
  const i = t(n);
  if (process.env.NODE_ENV !== "production" && Pe) {
    const a = window.performance.now(), c = e.__v_emitter;
    c && r && c.emit("message-evaluation", {
      type: "message-evaluation",
      value: i,
      time: a - r,
      groupId: `translate:${t.key}`
    }), o && s && de && Je && (de(s), Je("intlify message evaluation", o, s));
  }
  return i;
}
function Qn(...e) {
  const [t, n, r] = e, o = H();
  if (!D(t) && !ne(t) && !he(t) && !be(t))
    throw ve(ae.INVALID_ARGUMENT);
  const s = ne(t) ? String(t) : (he(t), t);
  return ne(n) ? o.plural = n : D(n) ? o.default = n : j(n) && !cn(n) ? o.named = n : J(n) && (o.list = n), ne(r) ? o.plural = r : D(r) ? o.default = r : j(r) && re(o, r), [s, o];
}
function $l(e, t, n, r, o, s) {
  return {
    locale: t,
    key: n,
    warnHtmlMessage: o,
    onError: (i) => {
      if (s && s(i), process.env.NODE_ENV !== "production") {
        const a = Bl(r), c = i.location && a && fc(a, i.location.start.offset, i.location.end.offset), f = e.__v_emitter;
        f && a && f.emit("compile-error", {
          message: a,
          error: i.message,
          start: i.location && i.location.start.offset,
          end: i.location && i.location.end.offset,
          groupId: `translate:${n}`
        });
        const u = `Message compilation error: ${i.message}`;
        throw new SyntaxError(c ? `${u}
${c}` : u);
      }
      throw i;
    },
    onCacheKey: (i) => oc(t, n, i)
  };
}
function Bl(e) {
  if (D(e))
    return e;
  if (e.loc && e.loc.source)
    return e.loc.source;
}
function jl(e, t, n, r) {
  const { modifiers: o, pluralRules: s, messageResolver: i, fallbackLocale: a, fallbackWarn: c, missingWarn: f, fallbackContext: u } = e, _ = {
    locale: t,
    modifiers: o,
    pluralRules: s,
    messages: (L, g) => {
      let b = i(n, L);
      if (b == null && (u || g)) {
        const [, , N] = ws(
          u || e,
          // NOTE: if has fallbackContext, fallback to root, else if use linked, fallback to local context
          L,
          t,
          a,
          c,
          f
        );
        b = i(N, L);
      }
      if (D(b) || be(b)) {
        let N = !1;
        const O = Ds(e, L, t, b, L, () => {
          N = !0;
        });
        return N ? yo : O;
      } else return he(b) ? b : yo;
    }
  };
  return e.processor && (_.processor = e.processor), r.list && (_.list = r.list), r.named && (_.named = r.named), ne(r.plural) && (_.pluralIndex = r.plural), _;
}
qc();
const Hl = "11.3.0";
function ql() {
  typeof __VUE_I18N_FULL_INSTALL__ != "boolean" && (Ge().__VUE_I18N_FULL_INSTALL__ = !0), typeof __VUE_I18N_LEGACY_API__ != "boolean" && (Ge().__VUE_I18N_LEGACY_API__ = !0), typeof __INTLIFY_DROP_MESSAGE_COMPILER__ != "boolean" && (Ge().__INTLIFY_DROP_MESSAGE_COMPILER__ = !1), typeof __INTLIFY_PROD_DEVTOOLS__ != "boolean" && (Ge().__INTLIFY_PROD_DEVTOOLS__ = !1);
}
const se = {
  // composer module errors
  UNEXPECTED_RETURN_TYPE: al,
  // 24
  // legacy module errors
  INVALID_ARGUMENT: 25,
  // i18n module errors
  MUST_BE_CALL_SETUP_TOP: 26,
  NOT_INSTALLED: 27,
  // directive module errors
  REQUIRED_VALUE: 28,
  INVALID_VALUE: 29,
  // vue-devtools errors
  CANNOT_SETUP_VUE_DEVTOOLS_PLUGIN: 30,
  NOT_INSTALLED_WITH_PROVIDE: 31,
  // unexpected error
  UNEXPECTED_ERROR: 32,
  // not compatible legacy vue-i18n constructor
  NOT_COMPATIBLE_LEGACY_VUE_I18N: 33,
  // Not available Compostion API in Legacy API mode. Please make sure that the legacy API mode is working properly
  NOT_AVAILABLE_COMPOSITION_IN_LEGACY: 34
};
function bt(e, ...t) {
  return ct(e, null, process.env.NODE_ENV !== "production" ? { messages: Wl, args: t } : void 0);
}
const Wl = {
  [se.UNEXPECTED_RETURN_TYPE]: "Unexpected return type in composer",
  [se.INVALID_ARGUMENT]: "Invalid argument",
  [se.MUST_BE_CALL_SETUP_TOP]: "Must be called at the top of a `setup` function",
  [se.NOT_INSTALLED]: "Need to install with `app.use` function",
  [se.UNEXPECTED_ERROR]: "Unexpected error",
  [se.REQUIRED_VALUE]: "Required in value: {0}",
  [se.INVALID_VALUE]: "Invalid value",
  [se.CANNOT_SETUP_VUE_DEVTOOLS_PLUGIN]: "Cannot setup vue-devtools plugin",
  [se.NOT_INSTALLED_WITH_PROVIDE]: "Need to install with `provide` function",
  [se.NOT_COMPATIBLE_LEGACY_VUE_I18N]: "Not compatible legacy VueI18n.",
  [se.NOT_AVAILABLE_COMPOSITION_IN_LEGACY]: "Not available Compostion API in Legacy API mode. Please make sure that the legacy API mode is working properly"
}, zn = /* @__PURE__ */ De("__translateVNode"), Zn = /* @__PURE__ */ De("__datetimeParts"), er = /* @__PURE__ */ De("__numberParts"), tr = /* @__PURE__ */ De("__enableEmitter"), nr = /* @__PURE__ */ De("__disableEmitter"), Gl = De("__setPluralRules"), ks = /* @__PURE__ */ De("__injectWithOption"), rr = /* @__PURE__ */ De("__dispose"), Ae = {
  FALLBACK_TO_ROOT: Ze,
  // 10
  NOT_FOUND_PARENT_SCOPE: Ze + 1,
  IGNORE_OBJ_FLATTEN: Ze + 2,
  /**
   * @deprecated will be removed at vue-i18n v12
   */
  DEPRECATE_LEGACY_MODE: Ze + 3,
  /**
   * @deprecated will be removed at vue-i18n v12
   */
  DEPRECATE_TRANSLATE_CUSTOME_DIRECTIVE: Ze + 4,
  // duplicate `useI18n` calling
  DUPLICATE_USE_I18N_CALLING: Ze + 5
}, Yl = {
  [Ae.FALLBACK_TO_ROOT]: "Fall back to {type} '{key}' with root locale.",
  [Ae.NOT_FOUND_PARENT_SCOPE]: "Not found parent scope. use the global scope.",
  [Ae.IGNORE_OBJ_FLATTEN]: "Ignore object flatten: '{key}' key has an string value",
  /**
   * @deprecated will be removed at vue-i18n v12
   */
  [Ae.DEPRECATE_LEGACY_MODE]: `Legacy API mode has been deprecated in v11. Use Composition API mode instead.
About how to use the Composition API mode, see https://vue-i18n.intlify.dev/guide/advanced/composition.html`,
  /**
   * @deprecated will be removed at vue-i18n v12
   */
  [Ae.DEPRECATE_TRANSLATE_CUSTOME_DIRECTIVE]: "'v-t' has been deprecated in v11. Use translate APIs ('t' or '$t') instead.",
  [Ae.DUPLICATE_USE_I18N_CALLING]: "Duplicate `useI18n` calling by local scope. Please don't call it on local scope, due to it does not work properly in component."
};
function Yt(e, ...t) {
  return an(Yl[e], ...t);
}
function yt(e) {
  if (!B(e) || be(e))
    return e;
  for (const t in e)
    if (Ee(e, t))
      if (!t.includes("."))
        B(e[t]) && yt(e[t]);
      else {
        const n = t.split("."), r = n.length - 1;
        let o = e, s = !1;
        for (let i = 0; i < r; i++) {
          if (n[i] === "__proto__")
            throw new Error(`unsafe key: ${n[i]}`);
          if (n[i] in o || (o[n[i]] = H()), !B(o[n[i]])) {
            process.env.NODE_ENV !== "production" && Le(Yt(Ae.IGNORE_OBJ_FLATTEN, {
              key: n[i]
            })), s = !0;
            break;
          }
          o = o[n[i]];
        }
        if (s || (be(o) ? Ns.includes(n[r]) || delete e[t] : (o[n[r]] = e[t], delete e[t])), !be(o)) {
          const i = o[n[r]];
          B(i) && yt(i);
        }
      }
  return e;
}
function Fs(e, t) {
  const { messages: n, __i18n: r, messageResolver: o, flatJson: s } = t, i = j(n) ? n : J(r) ? H() : { [e]: H() };
  if (J(r) && r.forEach((a) => {
    if ("locale" in a && "resource" in a) {
      const { locale: c, resource: f } = a;
      c ? (i[c] = i[c] || H(), Mt(f, i[c])) : Mt(f, i);
    } else
      D(a) && Mt(JSON.parse(a), i);
  }), o == null && s)
    for (const a in i)
      Ee(i, a) && yt(i[a]);
  return i;
}
function Us(e) {
  return e.type;
}
function Kl(e, t, n) {
  let r = B(t.messages) ? t.messages : H();
  "__i18nGlobal" in n && (r = Fs(e.locale.value, {
    messages: r,
    __i18n: n.__i18nGlobal
  }));
  const o = Object.keys(r);
  o.length && o.forEach((s) => {
    e.mergeLocaleMessage(s, r[s]);
  });
  {
    if (B(t.datetimeFormats)) {
      const s = Object.keys(t.datetimeFormats);
      s.length && s.forEach((i) => {
        e.mergeDateTimeFormat(i, t.datetimeFormats[i]);
      });
    }
    if (B(t.numberFormats)) {
      const s = Object.keys(t.numberFormats);
      s.length && s.forEach((i) => {
        e.mergeNumberFormat(i, t.numberFormats[i]);
      });
    }
  }
}
function Oo(e) {
  return ei(ti, null, e, 0);
}
function gr() {
  const e = "currentInstance";
  return e in En ? En[e] : En.getCurrentInstance();
}
const So = "__INTLIFY_META__", To = () => [], Xl = () => !1;
let Ao = 0;
function Lo(e) {
  return ((t, n, r, o) => e(n, r, gr() || void 0, o));
}
const Jl = /* @__NO_SIDE_EFFECTS__ */ () => {
  const e = gr();
  let t = null;
  return e && (t = Us(e)[So]) ? { [So]: t } : null;
};
function Ql(e = {}) {
  const { __root: t, __injectWithOption: n } = e, r = t === void 0, o = e.flatJson, s = Pe ? Qt : Zs;
  let i = X(e.inheritLocale) ? e.inheritLocale : !0;
  const a = s(
    // prettier-ignore
    t && i ? t.locale.value : D(e.locale) ? e.locale : Gt
  ), c = s(
    // prettier-ignore
    t && i ? t.fallbackLocale.value : D(e.fallbackLocale) || J(e.fallbackLocale) || j(e.fallbackLocale) || e.fallbackLocale === !1 ? e.fallbackLocale : a.value
  ), f = s(Fs(a.value, e)), u = s(j(e.datetimeFormats) ? e.datetimeFormats : { [a.value]: {} }), p = s(j(e.numberFormats) ? e.numberFormats : { [a.value]: {} });
  let _ = t ? t.missingWarn : X(e.missingWarn) || Wt(e.missingWarn) ? e.missingWarn : !0, L = t ? t.fallbackWarn : X(e.fallbackWarn) || Wt(e.fallbackWarn) ? e.fallbackWarn : !0, g = t ? t.fallbackRoot : X(e.fallbackRoot) ? e.fallbackRoot : !0, b = !!e.fallbackFormat, N = G(e.missing) ? e.missing : null, m = G(e.missing) ? Lo(e.missing) : null, O = G(e.postTranslation) ? e.postTranslation : null, T = t ? t.warnHtmlMessage : X(e.warnHtmlMessage) ? e.warnHtmlMessage : !0, y = !!e.escapeParameter;
  const v = t ? t.modifiers : j(e.modifiers) ? e.modifiers : {};
  let C = e.pluralRules || t && t.pluralRules, h;
  h = (() => {
    r && po(null);
    const S = {
      version: Hl,
      locale: a.value,
      fallbackLocale: c.value,
      messages: f.value,
      modifiers: v,
      pluralRules: C,
      missing: m === null ? void 0 : m,
      missingWarn: _,
      fallbackWarn: L,
      fallbackFormat: b,
      unresolving: !0,
      postTranslation: O === null ? void 0 : O,
      warnHtmlMessage: T,
      escapeParameter: y,
      messageResolver: e.messageResolver,
      messageCompiler: e.messageCompiler,
      __meta: { framework: "vue" }
    };
    S.datetimeFormats = u.value, S.numberFormats = p.value, S.__datetimeFormatters = j(h) ? h.__datetimeFormatters : void 0, S.__numberFormatters = j(h) ? h.__numberFormatters : void 0, process.env.NODE_ENV !== "production" && (S.__v_emitter = j(h) ? h.__v_emitter : void 0);
    const R = Cl(S);
    return r && po(R), R;
  })(), pt(h, a.value, c.value);
  function M() {
    return [
      a.value,
      c.value,
      f.value,
      u.value,
      p.value
    ];
  }
  const I = Ue({
    get: () => a.value,
    set: (S) => {
      h.locale = S, a.value = S;
    }
  }), P = Ue({
    get: () => c.value,
    set: (S) => {
      h.fallbackLocale = S, c.value = S, pt(h, a.value, S);
    }
  }), k = Ue(() => f.value), q = /* @__PURE__ */ Ue(() => u.value), oe = /* @__PURE__ */ Ue(() => p.value);
  function Ne() {
    return G(O) ? O : null;
  }
  function z(S) {
    O = S, h.postTranslation = S;
  }
  function ke() {
    return N;
  }
  function ee(S) {
    S !== null && (m = Lo(S)), N = S, h.missing = m;
  }
  function Z(S, R) {
    return S !== "translate" || !R.resolvedMessage;
  }
  const ge = (S, R, $, Y, Be, je) => {
    M();
    let pe;
    try {
      process.env.NODE_ENV !== "production" || __INTLIFY_PROD_DEVTOOLS__, r || (h.fallbackContext = t ? vl() : void 0), pe = S(h);
    } finally {
      process.env.NODE_ENV !== "production" || __INTLIFY_PROD_DEVTOOLS__, r || (h.fallbackContext = void 0);
    }
    if ($ !== "translate exists" && // for not `te` (e.g `t`)
    ne(pe) && pe === ln || $ === "translate exists" && !pe) {
      const [He, Vs] = R();
      if (process.env.NODE_ENV !== "production" && t && D(He) && Z($, Vs) && (g && (un(L, He) || Rs(_, He)) && Le(Yt(Ae.FALLBACK_TO_ROOT, {
        key: He,
        type: $
      })), process.env.NODE_ENV !== "production")) {
        const { __v_emitter: Nr } = h;
        Nr && g && Nr.emit("fallback", {
          type: $,
          key: He,
          to: "global",
          groupId: `${$}:${He}`
        });
      }
      return t && g ? Y(t) : Be(He);
    } else {
      if (je(pe))
        return pe;
      throw bt(se.UNEXPECTED_RETURN_TYPE);
    }
  };
  function le(...S) {
    return ge((R) => Reflect.apply(No, null, [R, ...S]), () => Qn(...S), "translate", (R) => Reflect.apply(R.t, R, [...S]), (R) => R, (R) => D(R));
  }
  function Oe(...S) {
    const [R, $, Y] = S;
    if (Y && !B(Y))
      throw bt(se.INVALID_ARGUMENT);
    return le(R, $, re({ resolvedMessage: !0 }, Y || {}));
  }
  function Ve(...S) {
    return ge((R) => Reflect.apply(ho, null, [R, ...S]), () => Xn(...S), "datetime format", (R) => Reflect.apply(R.d, R, [...S]), () => st, (R) => D(R) || J(R));
  }
  function Fe(...S) {
    return ge((R) => Reflect.apply(go, null, [R, ...S]), () => Jn(...S), "number format", (R) => Reflect.apply(R.n, R, [...S]), () => st, (R) => D(R) || J(R));
  }
  function Qe(S) {
    return S.map((R) => D(R) || ne(R) || X(R) ? Oo(String(R)) : R);
  }
  const dn = {
    normalize: Qe,
    interpolate: (S) => S,
    type: "vnode"
  };
  function Lt(...S) {
    return ge((R) => {
      let $;
      const Y = R;
      try {
        Y.processor = dn, $ = Reflect.apply(No, null, [Y, ...S]);
      } finally {
        Y.processor = null;
      }
      return $;
    }, () => Qn(...S), "translate", (R) => R[zn](...S), (R) => [Oo(R)], (R) => J(R));
  }
  function pn(...S) {
    return ge((R) => Reflect.apply(go, null, [R, ...S]), () => Jn(...S), "number format", (R) => R[er](...S), To, (R) => D(R) || J(R));
  }
  function Rt(...S) {
    return ge((R) => Reflect.apply(ho, null, [R, ...S]), () => Xn(...S), "datetime format", (R) => R[Zn](...S), To, (R) => D(R) || J(R));
  }
  function mn(S) {
    C = S, h.pluralRules = C;
  }
  function _n(S, R) {
    return ge(() => {
      if (!S)
        return !1;
      const $ = D(R) ? R : a.value, Y = D(R) ? [$] : Kn(h, c.value, $);
      for (let Be = 0; Be < Y.length; Be++) {
        const je = $e(Y[Be]);
        let pe = h.messageResolver(je, S);
        if (pe === null && (pe = je[S]), be(pe) || he(pe) || D(pe))
          return !0;
      }
      return !1;
    }, () => [S], "translate exists", ($) => Reflect.apply($.te, $, [S, R]), Xl, ($) => X($));
  }
  function lt(S) {
    let R = null;
    const $ = Kn(h, c.value, a.value);
    for (let Y = 0; Y < $.length; Y++) {
      const Be = f.value[$[Y]] || {}, je = h.messageResolver(Be, S);
      if (je != null) {
        R = je;
        break;
      }
    }
    return R;
  }
  function ut(S) {
    const R = lt(S);
    return R ?? (t ? t.tm(S) || {} : {});
  }
  function $e(S) {
    return f.value[S] || {};
  }
  function ft(S, R) {
    if (o) {
      const $ = { [S]: R };
      for (const Y in $)
        Ee($, Y) && yt($[Y]);
      R = $[S];
    }
    f.value[S] = R, h.messages = f.value;
  }
  function hn(S, R) {
    f.value[S] = f.value[S] || {};
    const $ = { [S]: R };
    if (o)
      for (const Y in $)
        Ee($, Y) && yt($[Y]);
    R = $[S], Mt(R, f.value[S]), h.messages = f.value;
  }
  function l(S) {
    return u.value[S] || {};
  }
  function d(S, R) {
    u.value[S] = R, h.datetimeFormats = u.value, Eo(h, S, R);
  }
  function A(S, R) {
    u.value[S] = re(u.value[S] || {}, R), h.datetimeFormats = u.value, Eo(h, S, R);
  }
  function w(S) {
    return p.value[S] || {};
  }
  function W(S, R) {
    p.value[S] = R, h.numberFormats = p.value, bo(h, S, R);
  }
  function K(S, R) {
    p.value[S] = re(p.value[S] || {}, R), h.numberFormats = p.value, bo(h, S, R);
  }
  Ao++, t && Pe && (Pn(t.locale, (S) => {
    i && (a.value = S, h.locale = S, pt(h, a.value, c.value));
  }), Pn(t.fallbackLocale, (S) => {
    i && (c.value = S, h.fallbackLocale = S, pt(h, a.value, c.value));
  }));
  const V = {
    id: Ao,
    locale: I,
    fallbackLocale: P,
    get inheritLocale() {
      return i;
    },
    set inheritLocale(S) {
      i = S, S && t && (a.value = t.locale.value, c.value = t.fallbackLocale.value, pt(h, a.value, c.value));
    },
    get availableLocales() {
      return Object.keys(f.value).sort();
    },
    messages: k,
    get modifiers() {
      return v;
    },
    get pluralRules() {
      return C || {};
    },
    get isGlobal() {
      return r;
    },
    get missingWarn() {
      return _;
    },
    set missingWarn(S) {
      _ = S, h.missingWarn = _;
    },
    get fallbackWarn() {
      return L;
    },
    set fallbackWarn(S) {
      L = S, h.fallbackWarn = L;
    },
    get fallbackRoot() {
      return g;
    },
    set fallbackRoot(S) {
      g = S;
    },
    get fallbackFormat() {
      return b;
    },
    set fallbackFormat(S) {
      b = S, h.fallbackFormat = b;
    },
    get warnHtmlMessage() {
      return T;
    },
    set warnHtmlMessage(S) {
      T = S, h.warnHtmlMessage = S;
    },
    get escapeParameter() {
      return y;
    },
    set escapeParameter(S) {
      y = S, h.escapeParameter = S;
    },
    t: le,
    getLocaleMessage: $e,
    setLocaleMessage: ft,
    mergeLocaleMessage: hn,
    getPostTranslationHandler: Ne,
    setPostTranslationHandler: z,
    getMissingHandler: ke,
    setMissingHandler: ee,
    [Gl]: mn
  };
  return V.datetimeFormats = q, V.numberFormats = oe, V.rt = Oe, V.te = _n, V.tm = ut, V.d = Ve, V.n = Fe, V.getDateTimeFormat = l, V.setDateTimeFormat = d, V.mergeDateTimeFormat = A, V.getNumberFormat = w, V.setNumberFormat = W, V.mergeNumberFormat = K, V[ks] = n, V[zn] = Lt, V[Zn] = Rt, V[er] = pn, process.env.NODE_ENV !== "production" && (V[tr] = (S) => {
    h.__v_emitter = S;
  }, V[nr] = () => {
    h.__v_emitter = void 0;
  }), V;
}
function Ro(e, t) {
}
const br = {
  tag: {
    type: [String, Object]
  },
  locale: {
    type: String
  },
  scope: {
    type: String,
    // NOTE: avoid https://github.com/microsoft/rushstack/issues/1050
    validator: (e) => e === "parent" || e === "global",
    default: "parent"
    /* ComponentI18nScope */
  },
  i18n: {
    type: Object
  }
};
function zl({ slots: e }, t) {
  return t.length === 1 && t[0] === "default" ? (e.default ? e.default() : []).reduce((r, o) => [
    ...r,
    // prettier-ignore
    ...o.type === Vt ? o.children : [o]
  ], []) : t.reduce((n, r) => {
    const o = e[r];
    return o && (n[r] = o()), n;
  }, H());
}
function Ms() {
  return Vt;
}
re({
  keypath: {
    type: String,
    required: !0
  },
  plural: {
    type: [Number, String],
    validator: (e) => ne(e) || !isNaN(e)
  }
}, br);
function Zl(e) {
  return J(e) && !D(e[0]);
}
function xs(e, t, n, r) {
  const { slots: o, attrs: s } = t;
  return () => {
    const i = { part: !0 };
    let a = H();
    e.locale && (i.locale = e.locale), D(e.format) ? i.key = e.format : B(e.format) && (D(e.format.key) && (i.key = e.format.key), a = Object.keys(e.format).reduce((_, L) => n.includes(L) ? re(H(), _, { [L]: e.format[L] }) : _, H()));
    const c = r(e.value, i, a);
    let f = [i.key];
    J(c) ? f = c.map((_, L) => {
      const g = o[_.type], b = g ? g({ [_.type]: _.value, index: L, parts: c }) : [_.value];
      return Zl(b) && (b[0].key = `${_.type}-${L}`), b;
    }) : D(c) && (f = [c]);
    const u = re(H(), s), p = D(e.tag) || B(e.tag) ? e.tag : Ms();
    return wo(p, u, f);
  };
}
re({
  value: {
    type: Number,
    required: !0
  },
  format: {
    type: [String, Object]
  }
}, br);
const eu = /* @__PURE__ */ De("global-vue-i18n");
function fn(e = {}) {
  const t = gr();
  if (t == null)
    throw bt(se.MUST_BE_CALL_SETUP_TOP);
  if (!t.isCE && t.appContext.app != null && !t.appContext.app.__VUE_I18N_SYMBOL__)
    throw bt(se.NOT_INSTALLED);
  const n = tu(t), r = ru(n), o = Us(t), s = nu(e, o);
  if (s === "global")
    return Kl(r, e, o), r;
  if (s === "parent") {
    let c = ou(n, t, e.__useComponent);
    return c == null && (process.env.NODE_ENV !== "production" && Le(Yt(Ae.NOT_FOUND_PARENT_SCOPE)), c = r), c;
  }
  const i = n;
  let a = i.__getInstance(t);
  if (a == null) {
    const c = re({}, e);
    "__i18n" in o && (c.__i18n = o.__i18n), r && (c.__root = r), a = Ql(c), i.__composerExtend && (a[rr] = i.__composerExtend(a)), iu(i, t, a), i.__setInstance(t, a);
  } else
    process.env.NODE_ENV !== "production" && s === "local" && Le(Yt(Ae.DUPLICATE_USE_I18N_CALLING));
  return a;
}
function tu(e) {
  const t = xt(e.isCE ? eu : e.appContext.app.__VUE_I18N_SYMBOL__);
  if (!t)
    throw bt(e.isCE ? se.NOT_INSTALLED_WITH_PROVIDE : se.UNEXPECTED_ERROR);
  return t;
}
function nu(e, t) {
  return cn(e) ? "__i18n" in t ? "local" : "global" : e.useScope ? e.useScope : "local";
}
function ru(e) {
  return e.mode === "composition" ? e.global : e.global.__composer;
}
function ou(e, t, n = !1) {
  let r = null;
  const o = t.root;
  let s = su(t, n);
  for (; s != null; ) {
    const i = e;
    if (e.mode === "composition")
      r = i.__getInstance(s);
    else if (__VUE_I18N_LEGACY_API__) {
      const a = i.__getInstance(s);
      a != null && (r = a.__composer, n && r && !r[ks] && (r = null));
    }
    if (r != null || o === s)
      break;
    s = s.parent;
  }
  return r;
}
function su(e, t = !1) {
  return e == null ? null : t && e.vnode.ctx || e.parent;
}
function iu(e, t, n) {
  let r = null;
  Io(() => {
    if (process.env.NODE_ENV !== "production") {
      t.__VUE_I18N__ = n, r = dc();
      const o = n;
      o[tr] && o[tr](r), r.on("*", Ro);
    }
  }, t), Po(() => {
    const o = n;
    process.env.NODE_ENV !== "production" && (r && r.off("*", Ro), o[nr] && o[nr](), delete t.__VUE_I18N__), e.__deleteInstance(t);
    const s = o[rr];
    s && (s(), delete o[rr]);
  }, t);
}
re({
  value: {
    type: [Number, Date],
    required: !0
  },
  format: {
    type: [String, Object]
  }
}, br);
ql();
Sl(nl);
Tl(bl);
Al(Kn);
if (process.env.NODE_ENV !== "production" || __INTLIFY_PROD_DEVTOOLS__) {
  const e = Ge();
  e.__INTLIFY__ = !0, rl(e.__INTLIFY_DEVTOOLS_GLOBAL_HOOK__);
}
process.env.NODE_ENV;
let Kt = null;
function Af(e) {
  if (Kt !== null) {
    console.warn(
      "[LinID CoreLib] I18n has already been initialized. Re-initialization is ignored."
    );
    return;
  }
  Kt = e;
}
function au() {
  if (Kt === null)
    throw new Error(
      "[LinID CoreLib] I18n is not initialized. Call setI18nInstance() first."
    );
  return Kt;
}
function cu(e) {
  const { t, te: n, tm: r } = fn({
    useScope: "global",
    __i18n: au().global
  });
  function o(...c) {
    const [f, u, p] = c;
    return t(typeof u == "number" ? `${e}.${f}` : `${e}.${f}`, u, p);
  }
  function s(c) {
    return n(`${e}.${c}`);
  }
  function i(c) {
    return r(`${e}.${c}`);
  }
  function a(c, ...f) {
    return s(f[0]) ? o(...f) : c;
  }
  return {
    t: o,
    te: s,
    tm: i,
    translateOrDefault: a
  };
}
const lu = /* @__PURE__ */ new Set([
  zr.BadRequest,
  zr.NotFound
]);
function uu(e) {
  return Q.isAxiosError(e) && e.response?.status != null && lu.has(e.response.status);
}
function fu(e, t) {
  const { t: n } = cu(`${e}.fields.${t}`);
  async function r(p) {
    try {
      return await Za(e, t, p), !0;
    } catch (_) {
      return uu(_) ? _.response.data.error : n("validation.unknownError");
    }
  }
  function o(p) {
    return p == null || p === "" ? n("validation.required") : !0;
  }
  function s(p, _) {
    return p != null && p.length < _ ? n("validation.minLength", { min: _ }) : !0;
  }
  function i(p, _) {
    return p != null && p.length > _ ? n("validation.maxLength", { max: _ }) : !0;
  }
  function a(p, _) {
    return _ > p ? n("validation.min", { min: _ }) : !0;
  }
  function c(p, _) {
    return p > _ ? n("validation.max", { max: _ }) : !0;
  }
  function f(p, _) {
    return new RegExp(_).test(p) ? !0 : n("validation.pattern", { pattern: _.toString() });
  }
  function u(p, _) {
    return p == null ? !0 : (typeof p == "object" ? _.some((g) => Wn(p, g)) : _.some((g) => g != null && String(g) === String(p))) ? n("validation.unique") : !0;
  }
  return {
    validateFromApi: r,
    required: o,
    minLength: s,
    maxLength: i,
    min: a,
    max: c,
    pattern: f,
    unique: u
  };
}
function Lf() {
  function e(t) {
    $o.next({
      key: "notify",
      data: t
    });
  }
  return { Notify: e };
}
function Rf() {
  function e(n) {
    return {
      page: (n.page || 1) - 1,
      size: n.rowsPerPage || 5,
      sort: n.sortBy || "updateDate",
      direction: n.descending ? "desc" : "asc"
    };
  }
  function t(n) {
    return {
      page: n.number + 1,
      rowsPerPage: n.size,
      rowsNumber: n.totalElements
    };
  }
  return {
    toPagination: e,
    toQuasarPagination: t
  };
}
function du(e, t) {
  const {
    validateFromApi: n,
    required: r,
    minLength: o,
    maxLength: s,
    min: i,
    max: a,
    pattern: c,
    unique: f
  } = fu(e, t);
  return {
    validateFromApi: n,
    required: r,
    min: (u) => (p) => i(typeof p == "string" ? parseFloat(p) : p, u),
    max: (u) => (p) => a(typeof p == "string" ? parseFloat(p) : p, u),
    minLength: (u) => (p) => o(p, u),
    maxLength: (u) => (p) => s(p, u),
    pattern: (u) => (p) => c(p, u),
    unique: (u) => (p) => f(p, u)
  };
}
function vf(e, t, n) {
  if (!t.hasValidations)
    return [];
  const { required: r, validateFromApi: o, ...s } = du(e, t.name), i = n.filter((a) => t.inputSettings?.[a] != null).map(
    (a) => s[a]?.(
      t.inputSettings?.[a]
    )
  ).filter(Boolean);
  return [
    ...t.required ? [r] : [],
    ...i,
    o
  ];
}
let Xt = null;
function Cf(e) {
  if (Xt !== null) {
    console.warn(
      "[LinID CoreLib] UI Design has already been initialized. Re-initialization is ignored."
    );
    return;
  }
  Xt = e;
}
function pu() {
  if (Xt === null)
    throw new Error(
      "[LinID CoreLib] UI Design is not initialized. Call setUiDesign() first."
    );
  return Xt;
}
const mu = [
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
], _u = [
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
], hu = [
  "icon",
  "activeClass",
  "exactActiveClass",
  "noCaps",
  "alert",
  "contentClass",
  "ripple"
], Eu = [
  "reveal",
  "revealOffset",
  "elevated",
  "bordered"
], gu = ["inset"], bu = ["shrink"], yu = [
  "icon",
  "size",
  "fontSize",
  "color",
  "textColor",
  "square",
  "rounded"
], Nu = [
  "floating",
  "multiLine",
  "align",
  "color",
  "textColor",
  "transparent",
  "outline",
  "rounded"
], Ou = [
  "virtualScrollItemSize",
  "virtualScrollStickySizeStart",
  "virtualScrollStickySizeEnd",
  "color",
  "iconFirstPage",
  "iconPrevPage",
  "iconNextPage",
  "iconLastPage",
  "grid",
  "gridHeader",
  "dense",
  "hideHeader",
  "hideBottom",
  "hideSelectedBanner",
  "hideNoData",
  "hidePagination",
  "flat",
  "bordered",
  "square",
  "separator",
  "wrapCells",
  "tableStyle",
  "tableClass",
  "tableHeaderStyle",
  "tableHeaderClass",
  "cardContainerStyle",
  "cardContainerClass",
  "cardStyle",
  "cardClass",
  "titleClass"
], Su = ["dark", "square", "flat", "bordered"], Tu = ["align", "vertical"], Au = ["left", "right", "name", "size", "color"], Lu = [
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
], Ru = [
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
], vu = [
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
], Cu = [
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
], Iu = [
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
], Pu = [
  "virtualScrollHorizontal",
  "clearable",
  "autofocus",
  "hideDropdownIcon",
  "popupNoRouteDismiss",
  "fillInput",
  "transitionShow",
  "transitionHide",
  "transitionDuration",
  "behavior",
  "stackLabel",
  "hideHint",
  "clearIcon",
  "counter",
  "dropdownIcon",
  "useInput",
  "inputDebounce",
  "optionsDense",
  "optionsDark",
  "optionsSelectedClass",
  "optionsCover",
  "menuShrink",
  "disableTabSelection",
  "menuAnchor",
  "menuSelf",
  "menuOffset",
  "displayValueHtml",
  "hideSelected",
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
  "popupContentClass",
  "popupContentStyle",
  "inputClass",
  "inputStyle",
  "noErrorIcon",
  "virtualScrollSliceSize",
  "virtualScrollSliceRatioBefore",
  "virtualScrollSliceRatioAfter",
  "virtualScrollItemSize",
  "virtualScrollStickySizeStart",
  "virtualScrollStickySizeEnd"
], wu = [
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
], Du = ["size", "color", "thickness"], ku = [
  "split",
  "disableMainBtn",
  "disableDropdown",
  "persistent",
  "noEscDismiss",
  "noRouteDismiss",
  "autoClose",
  "noRefocus",
  "noFocus",
  "icon",
  "iconRight",
  "noCaps",
  "noWrap",
  "align",
  "stack",
  "stretch",
  "dropdownIcon",
  "cover",
  "menuAnchor",
  "menuSelf",
  "menuOffset",
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
  "noIconAnimation",
  "contentStyle",
  "contentClass",
  "transitionShow",
  "transitionHide",
  "transitionDuration"
], Fu = [
  "separator",
  "padding",
  "tag",
  "bordered",
  "dense",
  "dark"
], Uu = [
  "insetLevel",
  "tag",
  "activeClass",
  "exactActiveClass",
  "clickable",
  "manualFocus",
  "focused",
  "dark",
  "dense"
], Mu = [
  "avatar",
  "thumbnail",
  "side",
  "top",
  "noWrap"
], xu = [
  "autofocus",
  "noErrorFocus",
  "noResetFocus",
  "greedy"
], Vu = ["lines", "overline", "caption", "header"], vo = {
  "q-avatar": yu,
  "q-badge": Nu,
  "q-btn": mu,
  "q-btn-dropdown": ku,
  "q-card": Su,
  "q-card-actions": Tu,
  "q-date": vu,
  "q-dialog": wu,
  "q-file": Iu,
  "q-form": xu,
  "q-header": Eu,
  "q-icon": Au,
  "q-img": Cu,
  "q-input": Ru,
  "q-item": Uu,
  "q-item-label": Vu,
  "q-item-section": Mu,
  "q-list": Fu,
  "q-route-tab": hu,
  "q-select": Pu,
  "q-spinner": Du,
  "q-table": Ou,
  "q-tabs": _u,
  "q-toggle": Lu,
  "q-toolbar": gu,
  "q-toolbar-title": bu
};
function Co(e, t) {
  return t.split(".").reduce((n, r) => {
    if (n && typeof n == "object")
      return n[r];
  }, e);
}
function $u(e, t, n) {
  let r = Co(e, `${t}.${n}`);
  if (r === void 0 && (r = Co(e, `default.${n}`)), typeof r == "object")
    throw new Error(
      `[UiDesign] Value for '${t}.${n}' is a nested object or null, expected a primitive.`
    );
  return r;
}
function Bu(e) {
  if (!(e in vo))
    throw new Error(
      `[UiDesign] The component '${e}' is not supported for UI design retrieval.`
    );
  return vo[e];
}
function If() {
  const e = Ue(() => pu());
  function t(n, r, o) {
    const s = Bu(r), i = {};
    for (const a of s) {
      const c = o?.[a] ?? $u(e.value, n, `${r}.${String(a)}`);
      c !== void 0 && (i[a] = c);
    }
    return i;
  }
  return { ui: t };
}
async function ju() {
  return (await we().get("/metadata/entities")).data;
}
async function Pf(e) {
  return (await we().get(
    `/metadata/entities/${e}`
  )).data;
}
async function Hu() {
  return (await we().get(
    "/metadata/routes"
  )).data;
}
const wf = () => qu(ir()), qu = /* @__PURE__ */ sr("LinidConfigurationStore", {
  state: () => ({
    entities: [],
    apiEndpoints: [],
    loading: !1,
    error: null
  }),
  getters: {
    /**
     * Returns an entity configuration by name.
     * @param state - The store state.
     * @returns A function that takes an entity name and returns the configuration.
     */
    getEntityByName: (e) => (t) => e.entities.find((n) => n.name === t),
    /**
     * Returns all api endpoints for a specific entity.
     * @param state - The store state.
     * @returns A function that takes an entity name and returns its api endpoints.
     */
    getApiEndpointsByEntity: (e) => (t) => e.apiEndpoints.filter(
      (n) => n.entity === t
    )
  },
  actions: {
    /**
     * Fetches all entity and api endpoint configurations from the backend.
     */
    async fetchConfiguration() {
      this.loading = !0, this.error = null;
      try {
        const [e, t] = await Promise.all([
          ju(),
          Hu()
        ]);
        this.entities = e, this.apiEndpoints = t;
      } catch (e) {
        this.error = e instanceof Error ? e.message : "Failed to fetch configuration", console.error("[Linid CoreLib] Failed to fetch configuration:", e);
      } finally {
        this.loading = !1;
      }
    }
  }
}), Df = () => Wu(ir()), Wu = /* @__PURE__ */ sr("LinidUiStore", {
  state: () => ({
    mainNavigationItems: []
  }),
  actions: {
    /**
     * Add items to the main navigation menu.
     * @param items - The navigation menu items to add.
     */
    addMainNavigationMenuItems(...e) {
      this.mainNavigationItems.push(...e);
    }
  }
});
let Jt = null;
function kf(e) {
  if (Jt !== null) {
    console.warn(
      "[LinID CoreLib] Nunjucks environment has already been initialized. Re-initialization is ignored."
    );
    return;
  }
  Jt = e;
}
function Ff() {
  if (Jt === null)
    throw new Error(
      "[LinID CoreLib] Nunjucks environment is not initialized. Call setNunjucksEnv() first."
    );
  return Jt;
}
var Gu = /* @__PURE__ */ ((e) => (e.SETUP = "setup", e.CONFIGURE = "configure", e.INITIALIZE = "initialize", e.READY = "ready", e.POST_INIT = "postInit", e))(Gu || {});
class Uf {
  /**
   * Unique identifier for the module.
   *
   * Must match the ID in the host configuration.
   */
  id;
  /**
   * Human-readable name of the module.
   */
  name;
  /**
   * Version of the module (semantic versioning).
   */
  version;
  /**
   * Optional description of what the module does.
   */
  description;
  /**
   * Creates a new remote module instance.
   * @param id - Unique module identifier (kebab-case).
   * @param name - Human-readable module name.
   * @param version - Module version (semver).
   * @param description - Optional module description.
   */
  constructor(t, n, r, o) {
    this.id = t, this.name = n, this.version = r, this.description = o;
  }
  /**
   * Setup phase - validate dependencies and prepare the module.
   *
   * This is called first, before any other lifecycle phase.
   * Use it to check if all required dependencies are available.
   *
   * Default implementation returns success.
   * Override this method to add custom setup logic.
   * @returns Promise resolving to the lifecycle result.
   */
  async setup() {
    return { success: !0 };
  }
  /**
   * Configure phase - receive and validate host configuration.
   *
   * This is called after setup, before initialization.
   * Use it to receive and validate the configuration from the host.
   *
   * Default implementation returns success.
   * Override this method to add custom configuration logic.
   * @param config - Module-specific configuration from host.
   *                 Contains module-specific options of type T.
   * @returns Promise resolving to the lifecycle result.
   */
  async configure(t) {
    return { success: !0 };
  }
  /**
   * Initialize phase - register stores and initialize resources.
   *
   * This is called after configuration.
   * Use it to initialize module resources.
   *
   * Default implementation returns success.
   * Override this method to add custom initialization logic.
   * @param config - Module-specific configuration from host.
   *                 Contains module-specific options of type T.
   * @returns Promise resolving to the lifecycle result.
   */
  async initialize(t) {
    return { success: !0 };
  }
  /**
   * Ready phase - signal that the module is ready for use.
   *
   * This is called after all modules are initialized.
   * Use it to perform final checks and emit ready state.
   *
   * Default implementation returns success.
   * Override this method to add custom ready logic.
   * @param config - Module-specific configuration from host.
   *                 Contains module-specific options of type T.
   * @returns Promise resolving to the lifecycle result.
   */
  async ready(t) {
    return { success: !0 };
  }
  /**
   * Post-initialization phase - cross-module integrations.
   *
   * This is called after all modules are ready.
   * Use it for cross-module integrations and final setup.
   *
   * Default implementation returns success.
   * Override this method to add custom post-init logic.
   * @param config - Module-specific configuration from host.
   *                 Contains module-specific options of type T.
   * @returns Promise resolving to the lifecycle result.
   */
  async postInit(t) {
    return { success: !0 };
  }
}
export {
  Uf as BasicRemoteModule,
  Ju as LinidZoneRenderer,
  Gu as ModuleLifecyclePhase,
  us as deepEqual,
  Wn as deepEqualUnordered,
  Sf as deleteEntityById,
  Tf as fromDot,
  Hu as getApiEndpointsConfiguration,
  Nf as getEntities,
  ju as getEntitiesConfiguration,
  Of as getEntityById,
  Pf as getEntityConfiguration,
  we as getHttpClient,
  au as getI18nInstance,
  ni as getModuleFederation,
  at as getModuleHostConfiguration,
  Ff as getNunjucksEnv,
  ir as getPiniaStore,
  pu as getUiDesign,
  rt as isObject,
  ri as loadAsyncComponent,
  ec as merge,
  gf as registerModuleHostConfiguration,
  tc as renameKeys,
  bf as saveEntity,
  Ef as setHttpClient,
  Af as setI18nInstance,
  Ku as setModuleFederation,
  kf as setNunjucksEnv,
  Xu as setPiniaStore,
  Cf as setUiDesign,
  $o as uiEventSubject,
  yf as updateEntity,
  Qu as useDialog,
  fu as useFieldValidation,
  wf as useLinidConfigurationStore,
  Df as useLinidUiStore,
  ai as useLinidZoneStore,
  Lf as useNotify,
  Rf as usePagination,
  du as useQuasarFieldValidation,
  vf as useQuasarRules,
  cu as useScopedI18n,
  If as useUiDesign
};
