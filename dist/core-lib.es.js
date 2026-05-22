import * as Nn from "vue";
import { defineAsyncComponent as Yo, hasInjectionContext as kn, inject as qt, getCurrentInstance as Go, ref as rn, reactive as Ko, markRaw as Nt, effectScope as Xo, isRef as St, isReactive as lr, toRef as On, toRaw as Qo, nextTick as Tr, getCurrentScope as Jo, onScopeDispose as zo, watch as Mn, computed as Ye, toRefs as Ar, defineComponent as sn, openBlock as Sn, createElementBlock as vr, Fragment as Wt, renderList as Zo, unref as Lr, createBlock as ei, resolveDynamicComponent as ti, mergeProps as ni, renderSlot as ri, createCommentVNode as si, onMounted as ks, onUnmounted as Ms, shallowRef as oi, h as Fs, createVNode as ii, Text as ai } from "vue";
let Yt = null;
function uf(e) {
  if (Yt !== null) {
    console.warn(
      "[LinID CoreLib] Module Federation has already been initialized. Re-initialization is ignored."
    );
    return;
  }
  Yt = e;
}
function ci() {
  if (Yt === null)
    throw new Error(
      "[LinID CoreLib] Module Federation is not initialized. Call setModuleFederation() first."
    );
  return Yt;
}
const li = (e) => Yo(
  () => ci().loadRemote(e).then((t) => {
    if (!t?.default)
      throw new Error(`Failed to load component from ${e}`);
    return t.default;
  })
);
const lt = typeof window < "u";
let Ze;
const Gt = (e) => Ze = e;
process.env.NODE_ENV;
const Fn = process.env.NODE_ENV !== "production" ? /* @__PURE__ */ Symbol("pinia") : (
  /* istanbul ignore next */
  /* @__PURE__ */ Symbol()
);
function rt(e) {
  return e && typeof e == "object" && Object.prototype.toString.call(e) === "[object Object]" && typeof e.toJSON != "function";
}
var Ot;
(function(e) {
  e.direct = "direct", e.patchObject = "patch object", e.patchFunction = "patch function";
})(Ot || (Ot = {}));
function Us(e, t) {
  for (const n in t) {
    const r = t[n];
    if (!(n in e))
      continue;
    const s = e[n];
    rt(s) && rt(r) && !St(r) && !lr(r) ? e[n] = Us(s, r) : e[n] = r;
  }
  return e;
}
const $s = () => {
};
function Rr(e, t, n, r = $s) {
  e.add(t);
  const s = () => {
    e.delete(t) && r();
  };
  return !n && Jo() && zo(s), s;
}
function it(e, ...t) {
  e.forEach((n) => {
    n(...t);
  });
}
const ui = (e) => e(), Cr = /* @__PURE__ */ Symbol(), Tn = /* @__PURE__ */ Symbol();
function Un(e, t) {
  e instanceof Map && t instanceof Map ? t.forEach((n, r) => e.set(r, n)) : e instanceof Set && t instanceof Set && t.forEach(e.add, e);
  for (const n in t) {
    if (!t.hasOwnProperty(n))
      continue;
    const r = t[n], s = e[n];
    rt(s) && rt(r) && e.hasOwnProperty(n) && !St(r) && !lr(r) ? e[n] = Un(s, r) : e[n] = r;
  }
  return e;
}
const fi = process.env.NODE_ENV !== "production" ? /* @__PURE__ */ Symbol("pinia:skipHydration") : (
  /* istanbul ignore next */
  /* @__PURE__ */ Symbol()
);
function di(e) {
  return !rt(e) || !Object.prototype.hasOwnProperty.call(e, fi);
}
const { assign: Te } = Object;
function Ir(e) {
  return !!(St(e) && e.effect);
}
function Pr(e, t, n, r) {
  const { state: s, actions: o, getters: i } = t, a = n.state.value[e];
  let c;
  function l() {
    !a && (process.env.NODE_ENV === "production" || !r) && (n.state.value[e] = s ? s() : {});
    const f = process.env.NODE_ENV !== "production" && r ? (
      // use ref() to unwrap refs inside state TODO: check if this is still necessary
      Ar(rn(s ? s() : {}).value)
    ) : Ar(n.state.value[e]);
    return Te(f, o, Object.keys(i || {}).reduce((m, E) => (process.env.NODE_ENV !== "production" && E in f && console.warn(`[🍍]: A getter cannot have the same name as another state property. Rename one of them. Found with "${E}" in store "${e}".`), m[E] = Nt(Ye(() => {
      Gt(n);
      const _ = n._s.get(e);
      return i[E].call(_, _);
    })), m), {}));
  }
  return c = $n(e, l, t, n, r, !0), c;
}
function $n(e, t, n = {}, r, s, o) {
  let i;
  const a = Te({ actions: {} }, n);
  if (process.env.NODE_ENV !== "production" && !r._e.active)
    throw new Error("Pinia destroyed");
  const c = { deep: !0 };
  process.env.NODE_ENV !== "production" && (c.onTrigger = (R) => {
    l ? _ = R : l == !1 && !g._hotUpdating && (Array.isArray(_) ? _.push(R) : console.error("🍍 debuggerEvents should be an array. This is most likely an internal Pinia bug."));
  });
  let l, f, m = /* @__PURE__ */ new Set(), E = /* @__PURE__ */ new Set(), _;
  const p = r.state.value[e];
  !o && !p && (process.env.NODE_ENV === "production" || !s) && (r.state.value[e] = {});
  const b = rn({});
  let N;
  function h(R) {
    let v;
    l = f = !1, process.env.NODE_ENV !== "production" && (_ = []), typeof R == "function" ? (R(r.state.value[e]), v = {
      type: Ot.patchFunction,
      storeId: e,
      events: _
    }) : (Un(r.state.value[e], R), v = {
      type: Ot.patchObject,
      payload: R,
      storeId: e,
      events: _
    });
    const V = N = /* @__PURE__ */ Symbol();
    Tr().then(() => {
      N === V && (l = !0);
    }), f = !0, it(m, v, r.state.value[e]);
  }
  const S = o ? function() {
    const { state: v } = n, V = v ? v() : {};
    this.$patch((z) => {
      Te(z, V);
    });
  } : (
    /* istanbul ignore next */
    process.env.NODE_ENV !== "production" ? () => {
      throw new Error(`🍍: Store "${e}" is built using the setup syntax and does not implement $reset().`);
    } : $s
  );
  function A() {
    i.stop(), m.clear(), E.clear(), r._s.delete(e);
  }
  const O = (R, v = "") => {
    if (Cr in R)
      return R[Tn] = v, R;
    const V = function() {
      Gt(r);
      const z = Array.from(arguments), U = /* @__PURE__ */ new Set(), k = /* @__PURE__ */ new Set();
      function I(x) {
        U.add(x);
      }
      function $(x) {
        k.add(x);
      }
      it(E, {
        args: z,
        name: V[Tn],
        store: g,
        after: I,
        onError: $
      });
      let w;
      try {
        w = R.apply(this && this.$id === e ? this : g, z);
      } catch (x) {
        throw it(k, x), x;
      }
      return w instanceof Promise ? w.then((x) => (it(U, x), x)).catch((x) => (it(k, x), Promise.reject(x))) : (it(U, w), w);
    };
    return V[Cr] = !0, V[Tn] = v, V;
  }, C = /* @__PURE__ */ Nt({
    actions: {},
    getters: {},
    state: [],
    hotState: b
  }), D = {
    _p: r,
    // _s: scope,
    $id: e,
    $onAction: Rr.bind(null, E),
    $patch: h,
    $reset: S,
    $subscribe(R, v = {}) {
      const V = Rr(m, R, v.detached, () => z()), z = i.run(() => Mn(() => r.state.value[e], (U) => {
        (v.flush === "sync" ? f : l) && R({
          storeId: e,
          type: Ot.direct,
          events: _
        }, U);
      }, Te({}, c, v)));
      return V;
    },
    $dispose: A
  }, g = Ko(process.env.NODE_ENV !== "production" || process.env.NODE_ENV !== "production" && process.env.NODE_ENV !== "test" && lt ? Te(
    {
      _hmrPayload: C,
      _customProperties: Nt(/* @__PURE__ */ new Set())
      // devtools custom properties
    },
    D
    // must be added later
    // setupStore
  ) : D);
  r._s.set(e, g);
  const B = (r._a && r._a.runWithContext || ui)(() => r._e.run(() => (i = Xo()).run(() => t({ action: O }))));
  for (const R in B) {
    const v = B[R];
    if (St(v) && !Ir(v) || lr(v))
      process.env.NODE_ENV !== "production" && s ? b.value[R] = On(B, R) : o || (p && di(v) && (St(v) ? v.value = p[R] : Un(v, p[R])), r.state.value[e][R] = v), process.env.NODE_ENV !== "production" && C.state.push(R);
    else if (typeof v == "function") {
      const V = process.env.NODE_ENV !== "production" && s ? v : O(v, R);
      B[R] = V, process.env.NODE_ENV !== "production" && (C.actions[R] = v), a.actions[R] = v;
    } else process.env.NODE_ENV !== "production" && Ir(v) && (C.getters[R] = o ? (
      // @ts-expect-error
      n.getters[R]
    ) : v, lt && (B._getters || // @ts-expect-error: same
    (B._getters = Nt([]))).push(R));
  }
  if (Te(g, B), Te(Qo(g), B), Object.defineProperty(g, "$state", {
    get: () => process.env.NODE_ENV !== "production" && s ? b.value : r.state.value[e],
    set: (R) => {
      if (process.env.NODE_ENV !== "production" && s)
        throw new Error("cannot set hotState");
      h((v) => {
        Te(v, R);
      });
    }
  }), process.env.NODE_ENV !== "production" && (g._hotUpdate = Nt((R) => {
    g._hotUpdating = !0, R._hmrPayload.state.forEach((v) => {
      if (v in g.$state) {
        const V = R.$state[v], z = g.$state[v];
        typeof V == "object" && rt(V) && rt(z) ? Us(V, z) : R.$state[v] = z;
      }
      g[v] = On(R.$state, v);
    }), Object.keys(g.$state).forEach((v) => {
      v in R.$state || delete g[v];
    }), l = !1, f = !1, r.state.value[e] = On(R._hmrPayload, "hotState"), f = !0, Tr().then(() => {
      l = !0;
    });
    for (const v in R._hmrPayload.actions) {
      const V = R[v];
      g[v] = //
      O(V, v);
    }
    for (const v in R._hmrPayload.getters) {
      const V = R._hmrPayload.getters[v], z = o ? (
        // special handling of options api
        Ye(() => (Gt(r), V.call(g, g)))
      ) : V;
      g[v] = //
      z;
    }
    Object.keys(g._hmrPayload.getters).forEach((v) => {
      v in R._hmrPayload.getters || delete g[v];
    }), Object.keys(g._hmrPayload.actions).forEach((v) => {
      v in R._hmrPayload.actions || delete g[v];
    }), g._hmrPayload = R._hmrPayload, g._getters = R._getters, g._hotUpdating = !1;
  })), process.env.NODE_ENV !== "production" && process.env.NODE_ENV !== "test" && lt) {
    const R = {
      writable: !0,
      configurable: !0,
      // avoid warning on devtools trying to display this property
      enumerable: !1
    };
    ["_p", "_hmrPayload", "_getters", "_customProperties"].forEach((v) => {
      Object.defineProperty(g, v, Te({ value: g[v] }, R));
    });
  }
  return r._p.forEach((R) => {
    if (process.env.NODE_ENV !== "production" && process.env.NODE_ENV !== "test" && lt) {
      const v = i.run(() => R({
        store: g,
        app: r._a,
        pinia: r,
        options: a
      }));
      Object.keys(v || {}).forEach((V) => g._customProperties.add(V)), Te(g, v);
    } else
      Te(g, i.run(() => R({
        store: g,
        app: r._a,
        pinia: r,
        options: a
      })));
  }), process.env.NODE_ENV !== "production" && g.$state && typeof g.$state == "object" && typeof g.$state.constructor == "function" && !g.$state.constructor.toString().includes("[native code]") && console.warn(`[🍍]: The "state" must be a plain object. It cannot be
	state: () => new MyClass()
Found in store "${g.$id}".`), p && o && n.hydrate && n.hydrate(g.$state, p), l = !0, f = !0, g;
}
// @__NO_SIDE_EFFECTS__
function on(e, t, n) {
  let r;
  const s = typeof t == "function";
  r = s ? n : t;
  function o(i, a) {
    const c = kn();
    if (i = // in test mode, ignore the argument provided as we can always retrieve a
    // pinia instance with getActivePinia()
    (process.env.NODE_ENV === "test" && Ze && Ze._testing ? null : i) || (c ? qt(Fn, null) : null), i && Gt(i), process.env.NODE_ENV !== "production" && !Ze)
      throw new Error(`[🍍]: "getActivePinia()" was called but there was no active Pinia. Are you trying to use a store before calling "app.use(pinia)"?
See https://pinia.vuejs.org/core-concepts/outside-component-usage.html for help.
This will fail in production.`);
    i = Ze, i._s.has(e) || (s ? $n(e, t, r, i) : Pr(e, r, i), process.env.NODE_ENV !== "production" && (o._pinia = i));
    const l = i._s.get(e);
    if (process.env.NODE_ENV !== "production" && a) {
      const f = "__hot:" + e, m = s ? $n(f, t, r, i, !0) : Pr(f, Te({}, r), i, !0);
      a._hotUpdate(m), delete i.state.value[f], i._s.delete(f);
    }
    if (process.env.NODE_ENV !== "production" && lt) {
      const f = Go();
      if (f && f.proxy && // avoid adding stores that are just built for hot module replacement
      !a) {
        const m = f.proxy, E = "_pStores" in m ? m._pStores : m._pStores = {};
        E[e] = l;
      }
    }
    return l;
  }
  return o.$id = e, o;
}
let Kt = null;
function ff(e) {
  if (Kt !== null) {
    console.warn(
      "[LinID CoreLib] Pinia store has already been initialized. Re-initialization is ignored."
    );
    return;
  }
  Kt = e;
}
function an() {
  if (Kt === null)
    throw new Error(
      "[LinID CoreLib] Pinia store is not initialized. Call setPiniaStore() first."
    );
  return Kt;
}
const pi = () => mi(an()), mi = /* @__PURE__ */ on("linidZoneStore", {
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
}), df = /* @__PURE__ */ sn({
  inheritAttrs: !1,
  __name: "LinidZoneRenderer",
  props: {
    zone: {}
  },
  setup(e) {
    const t = e, r = (pi().zones[t.zone] || []).map(
      (s) => ({
        ...s,
        component: li(s.plugin)
      })
    );
    return (s, o) => (Sn(), vr(Wt, null, [
      (Sn(!0), vr(Wt, null, Zo(Lr(r), (i, a) => (Sn(), ei(ti(i.component), ni({
        key: i.plugin + a
      }, { ref_for: !0 }, { ...s.$attrs, ...i.props }), null, 16))), 128)),
      Lr(r).length === 0 ? ri(s.$slots, "default", { key: 0 }) : si("", !0)
    ], 64));
  }
});
var xn = function(e, t) {
  return xn = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(n, r) {
    n.__proto__ = r;
  } || function(n, r) {
    for (var s in r) Object.prototype.hasOwnProperty.call(r, s) && (n[s] = r[s]);
  }, xn(e, t);
};
function cn(e, t) {
  if (typeof t != "function" && t !== null)
    throw new TypeError("Class extends value " + String(t) + " is not a constructor or null");
  xn(e, t);
  function n() {
    this.constructor = e;
  }
  e.prototype = t === null ? Object.create(t) : (n.prototype = t.prototype, new n());
}
function Vn(e) {
  var t = typeof Symbol == "function" && Symbol.iterator, n = t && e[t], r = 0;
  if (n) return n.call(e);
  if (e && typeof e.length == "number") return {
    next: function() {
      return e && r >= e.length && (e = void 0), { value: e && e[r++], done: !e };
    }
  };
  throw new TypeError(t ? "Object is not iterable." : "Symbol.iterator is not defined.");
}
function jn(e, t) {
  var n = typeof Symbol == "function" && e[Symbol.iterator];
  if (!n) return e;
  var r = n.call(e), s, o = [], i;
  try {
    for (; (t === void 0 || t-- > 0) && !(s = r.next()).done; ) o.push(s.value);
  } catch (a) {
    i = { error: a };
  } finally {
    try {
      s && !s.done && (n = r.return) && n.call(r);
    } finally {
      if (i) throw i.error;
    }
  }
  return o;
}
function Bn(e, t, n) {
  if (n || arguments.length === 2) for (var r = 0, s = t.length, o; r < s; r++)
    (o || !(r in t)) && (o || (o = Array.prototype.slice.call(t, 0, r)), o[r] = t[r]);
  return e.concat(o || Array.prototype.slice.call(t));
}
function je(e) {
  return typeof e == "function";
}
function xs(e) {
  var t = function(r) {
    Error.call(r), r.stack = new Error().stack;
  }, n = e(t);
  return n.prototype = Object.create(Error.prototype), n.prototype.constructor = n, n;
}
var An = xs(function(e) {
  return function(n) {
    e(this), this.message = n ? n.length + ` errors occurred during unsubscription:
` + n.map(function(r, s) {
      return s + 1 + ") " + r.toString();
    }).join(`
  `) : "", this.name = "UnsubscriptionError", this.errors = n;
  };
});
function Hn(e, t) {
  if (e) {
    var n = e.indexOf(t);
    0 <= n && e.splice(n, 1);
  }
}
var ln = (function() {
  function e(t) {
    this.initialTeardown = t, this.closed = !1, this._parentage = null, this._finalizers = null;
  }
  return e.prototype.unsubscribe = function() {
    var t, n, r, s, o;
    if (!this.closed) {
      this.closed = !0;
      var i = this._parentage;
      if (i)
        if (this._parentage = null, Array.isArray(i))
          try {
            for (var a = Vn(i), c = a.next(); !c.done; c = a.next()) {
              var l = c.value;
              l.remove(this);
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
      var f = this.initialTeardown;
      if (je(f))
        try {
          f();
        } catch (b) {
          o = b instanceof An ? b.errors : [b];
        }
      var m = this._finalizers;
      if (m) {
        this._finalizers = null;
        try {
          for (var E = Vn(m), _ = E.next(); !_.done; _ = E.next()) {
            var p = _.value;
            try {
              Dr(p);
            } catch (b) {
              o = o ?? [], b instanceof An ? o = Bn(Bn([], jn(o)), jn(b.errors)) : o.push(b);
            }
          }
        } catch (b) {
          r = { error: b };
        } finally {
          try {
            _ && !_.done && (s = E.return) && s.call(E);
          } finally {
            if (r) throw r.error;
          }
        }
      }
      if (o)
        throw new An(o);
    }
  }, e.prototype.add = function(t) {
    var n;
    if (t && t !== this)
      if (this.closed)
        Dr(t);
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
    n === t ? this._parentage = null : Array.isArray(n) && Hn(n, t);
  }, e.prototype.remove = function(t) {
    var n = this._finalizers;
    n && Hn(n, t), t instanceof e && t._removeParent(this);
  }, e.EMPTY = (function() {
    var t = new e();
    return t.closed = !0, t;
  })(), e;
})(), Vs = ln.EMPTY;
function js(e) {
  return e instanceof ln || e && "closed" in e && je(e.remove) && je(e.add) && je(e.unsubscribe);
}
function Dr(e) {
  je(e) ? e() : e.unsubscribe();
}
var hi = {
  Promise: void 0
}, _i = {
  setTimeout: function(e, t) {
    for (var n = [], r = 2; r < arguments.length; r++)
      n[r - 2] = arguments[r];
    return setTimeout.apply(void 0, Bn([e, t], jn(n)));
  },
  clearTimeout: function(e) {
    return clearTimeout(e);
  },
  delegate: void 0
};
function Ei(e) {
  _i.setTimeout(function() {
    throw e;
  });
}
function wr() {
}
function $t(e) {
  e();
}
var Bs = (function(e) {
  cn(t, e);
  function t(n) {
    var r = e.call(this) || this;
    return r.isStopped = !1, n ? (r.destination = n, js(n) && n.add(r)) : r.destination = bi, r;
  }
  return t.create = function(n, r, s) {
    return new qn(n, r, s);
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
})(ln), gi = (function() {
  function e(t) {
    this.partialObserver = t;
  }
  return e.prototype.next = function(t) {
    var n = this.partialObserver;
    if (n.next)
      try {
        n.next(t);
      } catch (r) {
        wt(r);
      }
  }, e.prototype.error = function(t) {
    var n = this.partialObserver;
    if (n.error)
      try {
        n.error(t);
      } catch (r) {
        wt(r);
      }
    else
      wt(t);
  }, e.prototype.complete = function() {
    var t = this.partialObserver;
    if (t.complete)
      try {
        t.complete();
      } catch (n) {
        wt(n);
      }
  }, e;
})(), qn = (function(e) {
  cn(t, e);
  function t(n, r, s) {
    var o = e.call(this) || this, i;
    return je(n) || !n ? i = {
      next: n ?? void 0,
      error: r ?? void 0,
      complete: s ?? void 0
    } : i = n, o.destination = new gi(i), o;
  }
  return t;
})(Bs);
function wt(e) {
  Ei(e);
}
function yi(e) {
  throw e;
}
var bi = {
  closed: !0,
  next: wr,
  error: yi,
  complete: wr
}, Ni = (function() {
  return typeof Symbol == "function" && Symbol.observable || "@@observable";
})();
function Oi(e) {
  return e;
}
function Si(e) {
  return e.length === 0 ? Oi : e.length === 1 ? e[0] : function(n) {
    return e.reduce(function(r, s) {
      return s(r);
    }, n);
  };
}
var kr = (function() {
  function e(t) {
    t && (this._subscribe = t);
  }
  return e.prototype.lift = function(t) {
    var n = new e();
    return n.source = this, n.operator = t, n;
  }, e.prototype.subscribe = function(t, n, r) {
    var s = this, o = Ai(t) ? t : new qn(t, n, r);
    return $t(function() {
      var i = s, a = i.operator, c = i.source;
      o.add(a ? a.call(o, c) : c ? s._subscribe(o) : s._trySubscribe(o));
    }), o;
  }, e.prototype._trySubscribe = function(t) {
    try {
      return this._subscribe(t);
    } catch (n) {
      t.error(n);
    }
  }, e.prototype.forEach = function(t, n) {
    var r = this;
    return n = Mr(n), new n(function(s, o) {
      var i = new qn({
        next: function(a) {
          try {
            t(a);
          } catch (c) {
            o(c), i.unsubscribe();
          }
        },
        error: o,
        complete: s
      });
      r.subscribe(i);
    });
  }, e.prototype._subscribe = function(t) {
    var n;
    return (n = this.source) === null || n === void 0 ? void 0 : n.subscribe(t);
  }, e.prototype[Ni] = function() {
    return this;
  }, e.prototype.pipe = function() {
    for (var t = [], n = 0; n < arguments.length; n++)
      t[n] = arguments[n];
    return Si(t)(this);
  }, e.prototype.toPromise = function(t) {
    var n = this;
    return t = Mr(t), new t(function(r, s) {
      var o;
      n.subscribe(function(i) {
        return o = i;
      }, function(i) {
        return s(i);
      }, function() {
        return r(o);
      });
    });
  }, e.create = function(t) {
    return new e(t);
  }, e;
})();
function Mr(e) {
  var t;
  return (t = e ?? hi.Promise) !== null && t !== void 0 ? t : Promise;
}
function Ti(e) {
  return e && je(e.next) && je(e.error) && je(e.complete);
}
function Ai(e) {
  return e && e instanceof Bs || Ti(e) && js(e);
}
var vi = xs(function(e) {
  return function() {
    e(this), this.name = "ObjectUnsubscribedError", this.message = "object unsubscribed";
  };
}), Hs = (function(e) {
  cn(t, e);
  function t() {
    var n = e.call(this) || this;
    return n.closed = !1, n.currentObservers = null, n.observers = [], n.isStopped = !1, n.hasError = !1, n.thrownError = null, n;
  }
  return t.prototype.lift = function(n) {
    var r = new Fr(this, this);
    return r.operator = n, r;
  }, t.prototype._throwIfClosed = function() {
    if (this.closed)
      throw new vi();
  }, t.prototype.next = function(n) {
    var r = this;
    $t(function() {
      var s, o;
      if (r._throwIfClosed(), !r.isStopped) {
        r.currentObservers || (r.currentObservers = Array.from(r.observers));
        try {
          for (var i = Vn(r.currentObservers), a = i.next(); !a.done; a = i.next()) {
            var c = a.value;
            c.next(n);
          }
        } catch (l) {
          s = { error: l };
        } finally {
          try {
            a && !a.done && (o = i.return) && o.call(i);
          } finally {
            if (s) throw s.error;
          }
        }
      }
    });
  }, t.prototype.error = function(n) {
    var r = this;
    $t(function() {
      if (r._throwIfClosed(), !r.isStopped) {
        r.hasError = r.isStopped = !0, r.thrownError = n;
        for (var s = r.observers; s.length; )
          s.shift().error(n);
      }
    });
  }, t.prototype.complete = function() {
    var n = this;
    $t(function() {
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
    var r = this, s = this, o = s.hasError, i = s.isStopped, a = s.observers;
    return o || i ? Vs : (this.currentObservers = null, a.push(n), new ln(function() {
      r.currentObservers = null, Hn(a, n);
    }));
  }, t.prototype._checkFinalizedStatuses = function(n) {
    var r = this, s = r.hasError, o = r.thrownError, i = r.isStopped;
    s ? n.error(o) : i && n.complete();
  }, t.prototype.asObservable = function() {
    var n = new kr();
    return n.source = this, n;
  }, t.create = function(n, r) {
    return new Fr(n, r);
  }, t;
})(kr), Fr = (function(e) {
  cn(t, e);
  function t(n, r) {
    var s = e.call(this) || this;
    return s.destination = n, s.source = r, s;
  }
  return t.prototype.next = function(n) {
    var r, s;
    (s = (r = this.destination) === null || r === void 0 ? void 0 : r.next) === null || s === void 0 || s.call(r, n);
  }, t.prototype.error = function(n) {
    var r, s;
    (s = (r = this.destination) === null || r === void 0 ? void 0 : r.error) === null || s === void 0 || s.call(r, n);
  }, t.prototype.complete = function() {
    var n, r;
    (r = (n = this.destination) === null || n === void 0 ? void 0 : n.complete) === null || r === void 0 || r.call(n);
  }, t.prototype._subscribe = function(n) {
    var r, s;
    return (s = (r = this.source) === null || r === void 0 ? void 0 : r.subscribe(n)) !== null && s !== void 0 ? s : Vs;
  }, t;
})(Hs);
const qs = new Hs();
function pf(e, t) {
  const n = rn(!1);
  let r;
  function s(o) {
    if (o.key !== e)
      return;
    const i = o.data;
    if (i.type === "close") {
      n.value = !1;
      return;
    }
    n.value = !0, t?.(i);
  }
  return ks(() => {
    r = qs.subscribe(s);
  }), Ms(() => {
    r?.unsubscribe();
  }), { show: n };
}
function Ws(e, t) {
  return function() {
    return e.apply(t, arguments);
  };
}
const { toString: Li } = Object.prototype, { getPrototypeOf: ur } = Object, { iterator: un, toStringTag: Ys } = Symbol, fn = /* @__PURE__ */ ((e) => (t) => {
  const n = Li.call(t);
  return e[n] || (e[n] = n.slice(8, -1).toLowerCase());
})(/* @__PURE__ */ Object.create(null)), Ie = (e) => (e = e.toLowerCase(), (t) => fn(t) === e), dn = (e) => (t) => typeof t === e, { isArray: mt } = Array, ut = dn("undefined");
function Rt(e) {
  return e !== null && !ut(e) && e.constructor !== null && !ut(e.constructor) && ge(e.constructor.isBuffer) && e.constructor.isBuffer(e);
}
const Gs = Ie("ArrayBuffer");
function Ri(e) {
  let t;
  return typeof ArrayBuffer < "u" && ArrayBuffer.isView ? t = ArrayBuffer.isView(e) : t = e && e.buffer && Gs(e.buffer), t;
}
const Ci = dn("string"), ge = dn("function"), Ks = dn("number"), Ct = (e) => e !== null && typeof e == "object", Ii = (e) => e === !0 || e === !1, xt = (e) => {
  if (fn(e) !== "object")
    return !1;
  const t = ur(e);
  return (t === null || t === Object.prototype || Object.getPrototypeOf(t) === null) && !(Ys in e) && !(un in e);
}, Pi = (e) => {
  if (!Ct(e) || Rt(e))
    return !1;
  try {
    return Object.keys(e).length === 0 && Object.getPrototypeOf(e) === Object.prototype;
  } catch {
    return !1;
  }
}, Di = Ie("Date"), wi = Ie("File"), ki = (e) => !!(e && typeof e.uri < "u"), Mi = (e) => e && typeof e.getParts < "u", Fi = Ie("Blob"), Ui = Ie("FileList"), $i = (e) => Ct(e) && ge(e.pipe);
function xi() {
  return typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {};
}
const Ur = xi(), $r = typeof Ur.FormData < "u" ? Ur.FormData : void 0, Vi = (e) => {
  let t;
  return e && ($r && e instanceof $r || ge(e.append) && ((t = fn(e)) === "formdata" || // detect form-data instance
  t === "object" && ge(e.toString) && e.toString() === "[object FormData]"));
}, ji = Ie("URLSearchParams"), [Bi, Hi, qi, Wi] = [
  "ReadableStream",
  "Request",
  "Response",
  "Headers"
].map(Ie), Yi = (e) => e.trim ? e.trim() : e.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
function It(e, t, { allOwnKeys: n = !1 } = {}) {
  if (e === null || typeof e > "u")
    return;
  let r, s;
  if (typeof e != "object" && (e = [e]), mt(e))
    for (r = 0, s = e.length; r < s; r++)
      t.call(null, e[r], r, e);
  else {
    if (Rt(e))
      return;
    const o = n ? Object.getOwnPropertyNames(e) : Object.keys(e), i = o.length;
    let a;
    for (r = 0; r < i; r++)
      a = o[r], t.call(null, e[a], a, e);
  }
}
function Xs(e, t) {
  if (Rt(e))
    return null;
  t = t.toLowerCase();
  const n = Object.keys(e);
  let r = n.length, s;
  for (; r-- > 0; )
    if (s = n[r], t === s.toLowerCase())
      return s;
  return null;
}
const et = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : global, Qs = (e) => !ut(e) && e !== et;
function Wn() {
  const { caseless: e, skipUndefined: t } = Qs(this) && this || {}, n = {}, r = (s, o) => {
    if (o === "__proto__" || o === "constructor" || o === "prototype")
      return;
    const i = e && Xs(n, o) || o;
    xt(n[i]) && xt(s) ? n[i] = Wn(n[i], s) : xt(s) ? n[i] = Wn({}, s) : mt(s) ? n[i] = s.slice() : (!t || !ut(s)) && (n[i] = s);
  };
  for (let s = 0, o = arguments.length; s < o; s++)
    arguments[s] && It(arguments[s], r);
  return n;
}
const Gi = (e, t, n, { allOwnKeys: r } = {}) => (It(
  t,
  (s, o) => {
    n && ge(s) ? Object.defineProperty(e, o, {
      value: Ws(s, n),
      writable: !0,
      enumerable: !0,
      configurable: !0
    }) : Object.defineProperty(e, o, {
      value: s,
      writable: !0,
      enumerable: !0,
      configurable: !0
    });
  },
  { allOwnKeys: r }
), e), Ki = (e) => (e.charCodeAt(0) === 65279 && (e = e.slice(1)), e), Xi = (e, t, n, r) => {
  e.prototype = Object.create(t.prototype, r), Object.defineProperty(e.prototype, "constructor", {
    value: e,
    writable: !0,
    enumerable: !1,
    configurable: !0
  }), Object.defineProperty(e, "super", {
    value: t.prototype
  }), n && Object.assign(e.prototype, n);
}, Qi = (e, t, n, r) => {
  let s, o, i;
  const a = {};
  if (t = t || {}, e == null) return t;
  do {
    for (s = Object.getOwnPropertyNames(e), o = s.length; o-- > 0; )
      i = s[o], (!r || r(i, e, t)) && !a[i] && (t[i] = e[i], a[i] = !0);
    e = n !== !1 && ur(e);
  } while (e && (!n || n(e, t)) && e !== Object.prototype);
  return t;
}, Ji = (e, t, n) => {
  e = String(e), (n === void 0 || n > e.length) && (n = e.length), n -= t.length;
  const r = e.indexOf(t, n);
  return r !== -1 && r === n;
}, zi = (e) => {
  if (!e) return null;
  if (mt(e)) return e;
  let t = e.length;
  if (!Ks(t)) return null;
  const n = new Array(t);
  for (; t-- > 0; )
    n[t] = e[t];
  return n;
}, Zi = /* @__PURE__ */ ((e) => (t) => e && t instanceof e)(typeof Uint8Array < "u" && ur(Uint8Array)), ea = (e, t) => {
  const r = (e && e[un]).call(e);
  let s;
  for (; (s = r.next()) && !s.done; ) {
    const o = s.value;
    t.call(e, o[0], o[1]);
  }
}, ta = (e, t) => {
  let n;
  const r = [];
  for (; (n = e.exec(t)) !== null; )
    r.push(n);
  return r;
}, na = Ie("HTMLFormElement"), ra = (e) => e.toLowerCase().replace(/[-_\s]([a-z\d])(\w*)/g, function(n, r, s) {
  return r.toUpperCase() + s;
}), xr = (({ hasOwnProperty: e }) => (t, n) => e.call(t, n))(Object.prototype), sa = Ie("RegExp"), Js = (e, t) => {
  const n = Object.getOwnPropertyDescriptors(e), r = {};
  It(n, (s, o) => {
    let i;
    (i = t(s, o, e)) !== !1 && (r[o] = i || s);
  }), Object.defineProperties(e, r);
}, oa = (e) => {
  Js(e, (t, n) => {
    if (ge(e) && ["arguments", "caller", "callee"].indexOf(n) !== -1)
      return !1;
    const r = e[n];
    if (ge(r)) {
      if (t.enumerable = !1, "writable" in t) {
        t.writable = !1;
        return;
      }
      t.set || (t.set = () => {
        throw Error("Can not rewrite read-only method '" + n + "'");
      });
    }
  });
}, ia = (e, t) => {
  const n = {}, r = (s) => {
    s.forEach((o) => {
      n[o] = !0;
    });
  };
  return mt(e) ? r(e) : r(String(e).split(t)), n;
}, aa = () => {
}, ca = (e, t) => e != null && Number.isFinite(e = +e) ? e : t;
function la(e) {
  return !!(e && ge(e.append) && e[Ys] === "FormData" && e[un]);
}
const ua = (e) => {
  const t = new Array(10), n = (r, s) => {
    if (Ct(r)) {
      if (t.indexOf(r) >= 0)
        return;
      if (Rt(r))
        return r;
      if (!("toJSON" in r)) {
        t[s] = r;
        const o = mt(r) ? [] : {};
        return It(r, (i, a) => {
          const c = n(i, s + 1);
          !ut(c) && (o[a] = c);
        }), t[s] = void 0, o;
      }
    }
    return r;
  };
  return n(e, 0);
}, fa = Ie("AsyncFunction"), da = (e) => e && (Ct(e) || ge(e)) && ge(e.then) && ge(e.catch), zs = ((e, t) => e ? setImmediate : t ? ((n, r) => (et.addEventListener(
  "message",
  ({ source: s, data: o }) => {
    s === et && o === n && r.length && r.shift()();
  },
  !1
), (s) => {
  r.push(s), et.postMessage(n, "*");
}))(`axios@${Math.random()}`, []) : (n) => setTimeout(n))(typeof setImmediate == "function", ge(et.postMessage)), pa = typeof queueMicrotask < "u" ? queueMicrotask.bind(et) : typeof process < "u" && process.nextTick || zs, ma = (e) => e != null && ge(e[un]), y = {
  isArray: mt,
  isArrayBuffer: Gs,
  isBuffer: Rt,
  isFormData: Vi,
  isArrayBufferView: Ri,
  isString: Ci,
  isNumber: Ks,
  isBoolean: Ii,
  isObject: Ct,
  isPlainObject: xt,
  isEmptyObject: Pi,
  isReadableStream: Bi,
  isRequest: Hi,
  isResponse: qi,
  isHeaders: Wi,
  isUndefined: ut,
  isDate: Di,
  isFile: wi,
  isReactNativeBlob: ki,
  isReactNative: Mi,
  isBlob: Fi,
  isRegExp: sa,
  isFunction: ge,
  isStream: $i,
  isURLSearchParams: ji,
  isTypedArray: Zi,
  isFileList: Ui,
  forEach: It,
  merge: Wn,
  extend: Gi,
  trim: Yi,
  stripBOM: Ki,
  inherits: Xi,
  toFlatObject: Qi,
  kindOf: fn,
  kindOfTest: Ie,
  endsWith: Ji,
  toArray: zi,
  forEachEntry: ea,
  matchAll: ta,
  isHTMLForm: na,
  hasOwnProperty: xr,
  hasOwnProp: xr,
  // an alias to avoid ESLint no-prototype-builtins detection
  reduceDescriptors: Js,
  freezeMethods: oa,
  toObjectSet: ia,
  toCamelCase: ra,
  noop: aa,
  toFiniteNumber: ca,
  findKey: Xs,
  global: et,
  isContextDefined: Qs,
  isSpecCompliantForm: la,
  toJSONObject: ua,
  isAsyncFn: fa,
  isThenable: da,
  setImmediate: zs,
  asap: pa,
  isIterable: ma
};
let q = class Zs extends Error {
  static from(t, n, r, s, o, i) {
    const a = new Zs(t.message, n || t.code, r, s, o);
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
  constructor(t, n, r, s, o) {
    super(t), Object.defineProperty(this, "message", {
      value: t,
      enumerable: !0,
      writable: !0,
      configurable: !0
    }), this.name = "AxiosError", this.isAxiosError = !0, n && (this.code = n), r && (this.config = r), s && (this.request = s), o && (this.response = o, this.status = o.status);
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
      config: y.toJSONObject(this.config),
      code: this.code,
      status: this.status
    };
  }
};
q.ERR_BAD_OPTION_VALUE = "ERR_BAD_OPTION_VALUE";
q.ERR_BAD_OPTION = "ERR_BAD_OPTION";
q.ECONNABORTED = "ECONNABORTED";
q.ETIMEDOUT = "ETIMEDOUT";
q.ERR_NETWORK = "ERR_NETWORK";
q.ERR_FR_TOO_MANY_REDIRECTS = "ERR_FR_TOO_MANY_REDIRECTS";
q.ERR_DEPRECATED = "ERR_DEPRECATED";
q.ERR_BAD_RESPONSE = "ERR_BAD_RESPONSE";
q.ERR_BAD_REQUEST = "ERR_BAD_REQUEST";
q.ERR_CANCELED = "ERR_CANCELED";
q.ERR_NOT_SUPPORT = "ERR_NOT_SUPPORT";
q.ERR_INVALID_URL = "ERR_INVALID_URL";
const ha = null;
function Yn(e) {
  return y.isPlainObject(e) || y.isArray(e);
}
function eo(e) {
  return y.endsWith(e, "[]") ? e.slice(0, -2) : e;
}
function vn(e, t, n) {
  return e ? e.concat(t).map(function(s, o) {
    return s = eo(s), !n && o ? "[" + s + "]" : s;
  }).join(n ? "." : "") : t;
}
function _a(e) {
  return y.isArray(e) && !e.some(Yn);
}
const Ea = y.toFlatObject(y, {}, null, function(t) {
  return /^is[A-Z]/.test(t);
});
function pn(e, t, n) {
  if (!y.isObject(e))
    throw new TypeError("target must be an object");
  t = t || new FormData(), n = y.toFlatObject(
    n,
    {
      metaTokens: !0,
      dots: !1,
      indexes: !1
    },
    !1,
    function(b, N) {
      return !y.isUndefined(N[b]);
    }
  );
  const r = n.metaTokens, s = n.visitor || f, o = n.dots, i = n.indexes, c = (n.Blob || typeof Blob < "u" && Blob) && y.isSpecCompliantForm(t);
  if (!y.isFunction(s))
    throw new TypeError("visitor must be a function");
  function l(p) {
    if (p === null) return "";
    if (y.isDate(p))
      return p.toISOString();
    if (y.isBoolean(p))
      return p.toString();
    if (!c && y.isBlob(p))
      throw new q("Blob is not supported. Use a Buffer instead.");
    return y.isArrayBuffer(p) || y.isTypedArray(p) ? c && typeof Blob == "function" ? new Blob([p]) : Buffer.from(p) : p;
  }
  function f(p, b, N) {
    let h = p;
    if (y.isReactNative(t) && y.isReactNativeBlob(p))
      return t.append(vn(N, b, o), l(p)), !1;
    if (p && !N && typeof p == "object") {
      if (y.endsWith(b, "{}"))
        b = r ? b : b.slice(0, -2), p = JSON.stringify(p);
      else if (y.isArray(p) && _a(p) || (y.isFileList(p) || y.endsWith(b, "[]")) && (h = y.toArray(p)))
        return b = eo(b), h.forEach(function(A, O) {
          !(y.isUndefined(A) || A === null) && t.append(
            // eslint-disable-next-line no-nested-ternary
            i === !0 ? vn([b], O, o) : i === null ? b : b + "[]",
            l(A)
          );
        }), !1;
    }
    return Yn(p) ? !0 : (t.append(vn(N, b, o), l(p)), !1);
  }
  const m = [], E = Object.assign(Ea, {
    defaultVisitor: f,
    convertValue: l,
    isVisitable: Yn
  });
  function _(p, b) {
    if (!y.isUndefined(p)) {
      if (m.indexOf(p) !== -1)
        throw Error("Circular reference detected in " + b.join("."));
      m.push(p), y.forEach(p, function(h, S) {
        (!(y.isUndefined(h) || h === null) && s.call(t, h, y.isString(S) ? S.trim() : S, b, E)) === !0 && _(h, b ? b.concat(S) : [S]);
      }), m.pop();
    }
  }
  if (!y.isObject(e))
    throw new TypeError("data must be an object");
  return _(e), t;
}
function Vr(e) {
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
function fr(e, t) {
  this._pairs = [], e && pn(e, this, t);
}
const to = fr.prototype;
to.append = function(t, n) {
  this._pairs.push([t, n]);
};
to.toString = function(t) {
  const n = t ? function(r) {
    return t.call(this, r, Vr);
  } : Vr;
  return this._pairs.map(function(s) {
    return n(s[0]) + "=" + n(s[1]);
  }, "").join("&");
};
function ga(e) {
  return encodeURIComponent(e).replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+");
}
function no(e, t, n) {
  if (!t)
    return e;
  const r = n && n.encode || ga, s = y.isFunction(n) ? {
    serialize: n
  } : n, o = s && s.serialize;
  let i;
  if (o ? i = o(t, s) : i = y.isURLSearchParams(t) ? t.toString() : new fr(t, s).toString(r), i) {
    const a = e.indexOf("#");
    a !== -1 && (e = e.slice(0, a)), e += (e.indexOf("?") === -1 ? "?" : "&") + i;
  }
  return e;
}
class jr {
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
    y.forEach(this.handlers, function(r) {
      r !== null && t(r);
    });
  }
}
const dr = {
  silentJSONParsing: !0,
  forcedJSONParsing: !0,
  clarifyTimeoutError: !1,
  legacyInterceptorReqResOrdering: !0
}, ya = typeof URLSearchParams < "u" ? URLSearchParams : fr, ba = typeof FormData < "u" ? FormData : null, Na = typeof Blob < "u" ? Blob : null, Oa = {
  isBrowser: !0,
  classes: {
    URLSearchParams: ya,
    FormData: ba,
    Blob: Na
  },
  protocols: ["http", "https", "file", "blob", "url", "data"]
}, pr = typeof window < "u" && typeof document < "u", Gn = typeof navigator == "object" && navigator || void 0, Sa = pr && (!Gn || ["ReactNative", "NativeScript", "NS"].indexOf(Gn.product) < 0), Ta = typeof WorkerGlobalScope < "u" && // eslint-disable-next-line no-undef
self instanceof WorkerGlobalScope && typeof self.importScripts == "function", Aa = pr && window.location.href || "http://localhost", va = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  hasBrowserEnv: pr,
  hasStandardBrowserEnv: Sa,
  hasStandardBrowserWebWorkerEnv: Ta,
  navigator: Gn,
  origin: Aa
}, Symbol.toStringTag, { value: "Module" })), Ee = {
  ...va,
  ...Oa
};
function La(e, t) {
  return pn(e, new Ee.classes.URLSearchParams(), {
    visitor: function(n, r, s, o) {
      return Ee.isNode && y.isBuffer(n) ? (this.append(r, n.toString("base64")), !1) : o.defaultVisitor.apply(this, arguments);
    },
    ...t
  });
}
function Ra(e) {
  return y.matchAll(/\w+|\[(\w*)]/g, e).map((t) => t[0] === "[]" ? "" : t[1] || t[0]);
}
function Ca(e) {
  const t = {}, n = Object.keys(e);
  let r;
  const s = n.length;
  let o;
  for (r = 0; r < s; r++)
    o = n[r], t[o] = e[o];
  return t;
}
function ro(e) {
  function t(n, r, s, o) {
    let i = n[o++];
    if (i === "__proto__") return !0;
    const a = Number.isFinite(+i), c = o >= n.length;
    return i = !i && y.isArray(s) ? s.length : i, c ? (y.hasOwnProp(s, i) ? s[i] = [s[i], r] : s[i] = r, !a) : ((!s[i] || !y.isObject(s[i])) && (s[i] = []), t(n, r, s[i], o) && y.isArray(s[i]) && (s[i] = Ca(s[i])), !a);
  }
  if (y.isFormData(e) && y.isFunction(e.entries)) {
    const n = {};
    return y.forEachEntry(e, (r, s) => {
      t(Ra(r), s, n, 0);
    }), n;
  }
  return null;
}
function Ia(e, t, n) {
  if (y.isString(e))
    try {
      return (t || JSON.parse)(e), y.trim(e);
    } catch (r) {
      if (r.name !== "SyntaxError")
        throw r;
    }
  return (n || JSON.stringify)(e);
}
const Pt = {
  transitional: dr,
  adapter: ["xhr", "http", "fetch"],
  transformRequest: [
    function(t, n) {
      const r = n.getContentType() || "", s = r.indexOf("application/json") > -1, o = y.isObject(t);
      if (o && y.isHTMLForm(t) && (t = new FormData(t)), y.isFormData(t))
        return s ? JSON.stringify(ro(t)) : t;
      if (y.isArrayBuffer(t) || y.isBuffer(t) || y.isStream(t) || y.isFile(t) || y.isBlob(t) || y.isReadableStream(t))
        return t;
      if (y.isArrayBufferView(t))
        return t.buffer;
      if (y.isURLSearchParams(t))
        return n.setContentType("application/x-www-form-urlencoded;charset=utf-8", !1), t.toString();
      let a;
      if (o) {
        if (r.indexOf("application/x-www-form-urlencoded") > -1)
          return La(t, this.formSerializer).toString();
        if ((a = y.isFileList(t)) || r.indexOf("multipart/form-data") > -1) {
          const c = this.env && this.env.FormData;
          return pn(
            a ? { "files[]": t } : t,
            c && new c(),
            this.formSerializer
          );
        }
      }
      return o || s ? (n.setContentType("application/json", !1), Ia(t)) : t;
    }
  ],
  transformResponse: [
    function(t) {
      const n = this.transitional || Pt.transitional, r = n && n.forcedJSONParsing, s = this.responseType === "json";
      if (y.isResponse(t) || y.isReadableStream(t))
        return t;
      if (t && y.isString(t) && (r && !this.responseType || s)) {
        const i = !(n && n.silentJSONParsing) && s;
        try {
          return JSON.parse(t, this.parseReviver);
        } catch (a) {
          if (i)
            throw a.name === "SyntaxError" ? q.from(a, q.ERR_BAD_RESPONSE, this, null, this.response) : a;
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
    FormData: Ee.classes.FormData,
    Blob: Ee.classes.Blob
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
y.forEach(["delete", "get", "head", "post", "put", "patch"], (e) => {
  Pt.headers[e] = {};
});
const Pa = y.toObjectSet([
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
]), Da = (e) => {
  const t = {};
  let n, r, s;
  return e && e.split(`
`).forEach(function(i) {
    s = i.indexOf(":"), n = i.substring(0, s).trim().toLowerCase(), r = i.substring(s + 1).trim(), !(!n || t[n] && Pa[n]) && (n === "set-cookie" ? t[n] ? t[n].push(r) : t[n] = [r] : t[n] = t[n] ? t[n] + ", " + r : r);
  }), t;
}, Br = /* @__PURE__ */ Symbol("internals");
function yt(e) {
  return e && String(e).trim().toLowerCase();
}
function Vt(e) {
  return e === !1 || e == null ? e : y.isArray(e) ? e.map(Vt) : String(e);
}
function wa(e) {
  const t = /* @__PURE__ */ Object.create(null), n = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;
  let r;
  for (; r = n.exec(e); )
    t[r[1]] = r[2];
  return t;
}
const ka = (e) => /^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(e.trim());
function Ln(e, t, n, r, s) {
  if (y.isFunction(r))
    return r.call(this, t, n);
  if (s && (t = n), !!y.isString(t)) {
    if (y.isString(r))
      return t.indexOf(r) !== -1;
    if (y.isRegExp(r))
      return r.test(t);
  }
}
function Ma(e) {
  return e.trim().toLowerCase().replace(/([a-z\d])(\w*)/g, (t, n, r) => n.toUpperCase() + r);
}
function Fa(e, t) {
  const n = y.toCamelCase(" " + t);
  ["get", "set", "has"].forEach((r) => {
    Object.defineProperty(e, r + n, {
      value: function(s, o, i) {
        return this[r].call(this, t, s, o, i);
      },
      configurable: !0
    });
  });
}
let ye = class {
  constructor(t) {
    t && this.set(t);
  }
  set(t, n, r) {
    const s = this;
    function o(a, c, l) {
      const f = yt(c);
      if (!f)
        throw new Error("header name must be a non-empty string");
      const m = y.findKey(s, f);
      (!m || s[m] === void 0 || l === !0 || l === void 0 && s[m] !== !1) && (s[m || c] = Vt(a));
    }
    const i = (a, c) => y.forEach(a, (l, f) => o(l, f, c));
    if (y.isPlainObject(t) || t instanceof this.constructor)
      i(t, n);
    else if (y.isString(t) && (t = t.trim()) && !ka(t))
      i(Da(t), n);
    else if (y.isObject(t) && y.isIterable(t)) {
      let a = {}, c, l;
      for (const f of t) {
        if (!y.isArray(f))
          throw TypeError("Object iterator must return a key-value pair");
        a[l = f[0]] = (c = a[l]) ? y.isArray(c) ? [...c, f[1]] : [c, f[1]] : f[1];
      }
      i(a, n);
    } else
      t != null && o(n, t, r);
    return this;
  }
  get(t, n) {
    if (t = yt(t), t) {
      const r = y.findKey(this, t);
      if (r) {
        const s = this[r];
        if (!n)
          return s;
        if (n === !0)
          return wa(s);
        if (y.isFunction(n))
          return n.call(this, s, r);
        if (y.isRegExp(n))
          return n.exec(s);
        throw new TypeError("parser must be boolean|regexp|function");
      }
    }
  }
  has(t, n) {
    if (t = yt(t), t) {
      const r = y.findKey(this, t);
      return !!(r && this[r] !== void 0 && (!n || Ln(this, this[r], r, n)));
    }
    return !1;
  }
  delete(t, n) {
    const r = this;
    let s = !1;
    function o(i) {
      if (i = yt(i), i) {
        const a = y.findKey(r, i);
        a && (!n || Ln(r, r[a], a, n)) && (delete r[a], s = !0);
      }
    }
    return y.isArray(t) ? t.forEach(o) : o(t), s;
  }
  clear(t) {
    const n = Object.keys(this);
    let r = n.length, s = !1;
    for (; r--; ) {
      const o = n[r];
      (!t || Ln(this, this[o], o, t, !0)) && (delete this[o], s = !0);
    }
    return s;
  }
  normalize(t) {
    const n = this, r = {};
    return y.forEach(this, (s, o) => {
      const i = y.findKey(r, o);
      if (i) {
        n[i] = Vt(s), delete n[o];
        return;
      }
      const a = t ? Ma(o) : String(o).trim();
      a !== o && delete n[o], n[a] = Vt(s), r[a] = !0;
    }), this;
  }
  concat(...t) {
    return this.constructor.concat(this, ...t);
  }
  toJSON(t) {
    const n = /* @__PURE__ */ Object.create(null);
    return y.forEach(this, (r, s) => {
      r != null && r !== !1 && (n[s] = t && y.isArray(r) ? r.join(", ") : r);
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
    return n.forEach((s) => r.set(s)), r;
  }
  static accessor(t) {
    const r = (this[Br] = this[Br] = {
      accessors: {}
    }).accessors, s = this.prototype;
    function o(i) {
      const a = yt(i);
      r[a] || (Fa(s, i), r[a] = !0);
    }
    return y.isArray(t) ? t.forEach(o) : o(t), this;
  }
};
ye.accessor([
  "Content-Type",
  "Content-Length",
  "Accept",
  "Accept-Encoding",
  "User-Agent",
  "Authorization"
]);
y.reduceDescriptors(ye.prototype, ({ value: e }, t) => {
  let n = t[0].toUpperCase() + t.slice(1);
  return {
    get: () => e,
    set(r) {
      this[n] = r;
    }
  };
});
y.freezeMethods(ye);
function Rn(e, t) {
  const n = this || Pt, r = t || n, s = ye.from(r.headers);
  let o = r.data;
  return y.forEach(e, function(a) {
    o = a.call(n, o, s.normalize(), t ? t.status : void 0);
  }), s.normalize(), o;
}
function so(e) {
  return !!(e && e.__CANCEL__);
}
let Dt = class extends q {
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
    super(t ?? "canceled", q.ERR_CANCELED, n, r), this.name = "CanceledError", this.__CANCEL__ = !0;
  }
};
function oo(e, t, n) {
  const r = n.config.validateStatus;
  !n.status || !r || r(n.status) ? e(n) : t(
    new q(
      "Request failed with status code " + n.status,
      [q.ERR_BAD_REQUEST, q.ERR_BAD_RESPONSE][Math.floor(n.status / 100) - 4],
      n.config,
      n.request,
      n
    )
  );
}
function Ua(e) {
  const t = /^([-+\w]{1,25})(:?\/\/|:)/.exec(e);
  return t && t[1] || "";
}
function $a(e, t) {
  e = e || 10;
  const n = new Array(e), r = new Array(e);
  let s = 0, o = 0, i;
  return t = t !== void 0 ? t : 1e3, function(c) {
    const l = Date.now(), f = r[o];
    i || (i = l), n[s] = c, r[s] = l;
    let m = o, E = 0;
    for (; m !== s; )
      E += n[m++], m = m % e;
    if (s = (s + 1) % e, s === o && (o = (o + 1) % e), l - i < t)
      return;
    const _ = f && l - f;
    return _ ? Math.round(E * 1e3 / _) : void 0;
  };
}
function xa(e, t) {
  let n = 0, r = 1e3 / t, s, o;
  const i = (l, f = Date.now()) => {
    n = f, s = null, o && (clearTimeout(o), o = null), e(...l);
  };
  return [(...l) => {
    const f = Date.now(), m = f - n;
    m >= r ? i(l, f) : (s = l, o || (o = setTimeout(() => {
      o = null, i(s);
    }, r - m)));
  }, () => s && i(s)];
}
const Xt = (e, t, n = 3) => {
  let r = 0;
  const s = $a(50, 250);
  return xa((o) => {
    const i = o.loaded, a = o.lengthComputable ? o.total : void 0, c = i - r, l = s(c), f = i <= a;
    r = i;
    const m = {
      loaded: i,
      total: a,
      progress: a ? i / a : void 0,
      bytes: c,
      rate: l || void 0,
      estimated: l && a && f ? (a - i) / l : void 0,
      event: o,
      lengthComputable: a != null,
      [t ? "download" : "upload"]: !0
    };
    e(m);
  }, n);
}, Hr = (e, t) => {
  const n = e != null;
  return [
    (r) => t[0]({
      lengthComputable: n,
      total: e,
      loaded: r
    }),
    t[1]
  ];
}, qr = (e) => (...t) => y.asap(() => e(...t)), Va = Ee.hasStandardBrowserEnv ? /* @__PURE__ */ ((e, t) => (n) => (n = new URL(n, Ee.origin), e.protocol === n.protocol && e.host === n.host && (t || e.port === n.port)))(
  new URL(Ee.origin),
  Ee.navigator && /(msie|trident)/i.test(Ee.navigator.userAgent)
) : () => !0, ja = Ee.hasStandardBrowserEnv ? (
  // Standard browser envs support document.cookie
  {
    write(e, t, n, r, s, o, i) {
      if (typeof document > "u") return;
      const a = [`${e}=${encodeURIComponent(t)}`];
      y.isNumber(n) && a.push(`expires=${new Date(n).toUTCString()}`), y.isString(r) && a.push(`path=${r}`), y.isString(s) && a.push(`domain=${s}`), o === !0 && a.push("secure"), y.isString(i) && a.push(`SameSite=${i}`), document.cookie = a.join("; ");
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
function Ba(e) {
  return typeof e != "string" ? !1 : /^([a-z][a-z\d+\-.]*:)?\/\//i.test(e);
}
function Ha(e, t) {
  return t ? e.replace(/\/?\/$/, "") + "/" + t.replace(/^\/+/, "") : e;
}
function io(e, t, n) {
  let r = !Ba(t);
  return e && (r || n == !1) ? Ha(e, t) : t;
}
const Wr = (e) => e instanceof ye ? { ...e } : e;
function st(e, t) {
  t = t || {};
  const n = {};
  function r(l, f, m, E) {
    return y.isPlainObject(l) && y.isPlainObject(f) ? y.merge.call({ caseless: E }, l, f) : y.isPlainObject(f) ? y.merge({}, f) : y.isArray(f) ? f.slice() : f;
  }
  function s(l, f, m, E) {
    if (y.isUndefined(f)) {
      if (!y.isUndefined(l))
        return r(void 0, l, m, E);
    } else return r(l, f, m, E);
  }
  function o(l, f) {
    if (!y.isUndefined(f))
      return r(void 0, f);
  }
  function i(l, f) {
    if (y.isUndefined(f)) {
      if (!y.isUndefined(l))
        return r(void 0, l);
    } else return r(void 0, f);
  }
  function a(l, f, m) {
    if (m in t)
      return r(l, f);
    if (m in e)
      return r(void 0, l);
  }
  const c = {
    url: o,
    method: o,
    data: o,
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
    headers: (l, f, m) => s(Wr(l), Wr(f), m, !0)
  };
  return y.forEach(Object.keys({ ...e, ...t }), function(f) {
    if (f === "__proto__" || f === "constructor" || f === "prototype") return;
    const m = y.hasOwnProp(c, f) ? c[f] : s, E = m(e[f], t[f], f);
    y.isUndefined(E) && m !== a || (n[f] = E);
  }), n;
}
const ao = (e) => {
  const t = st({}, e);
  let { data: n, withXSRFToken: r, xsrfHeaderName: s, xsrfCookieName: o, headers: i, auth: a } = t;
  if (t.headers = i = ye.from(i), t.url = no(
    io(t.baseURL, t.url, t.allowAbsoluteUrls),
    e.params,
    e.paramsSerializer
  ), a && i.set(
    "Authorization",
    "Basic " + btoa(
      (a.username || "") + ":" + (a.password ? unescape(encodeURIComponent(a.password)) : "")
    )
  ), y.isFormData(n)) {
    if (Ee.hasStandardBrowserEnv || Ee.hasStandardBrowserWebWorkerEnv)
      i.setContentType(void 0);
    else if (y.isFunction(n.getHeaders)) {
      const c = n.getHeaders(), l = ["content-type", "content-length"];
      Object.entries(c).forEach(([f, m]) => {
        l.includes(f.toLowerCase()) && i.set(f, m);
      });
    }
  }
  if (Ee.hasStandardBrowserEnv && (r && y.isFunction(r) && (r = r(t)), r || r !== !1 && Va(t.url))) {
    const c = s && o && ja.read(o);
    c && i.set(s, c);
  }
  return t;
}, qa = typeof XMLHttpRequest < "u", Wa = qa && function(e) {
  return new Promise(function(n, r) {
    const s = ao(e);
    let o = s.data;
    const i = ye.from(s.headers).normalize();
    let { responseType: a, onUploadProgress: c, onDownloadProgress: l } = s, f, m, E, _, p;
    function b() {
      _ && _(), p && p(), s.cancelToken && s.cancelToken.unsubscribe(f), s.signal && s.signal.removeEventListener("abort", f);
    }
    let N = new XMLHttpRequest();
    N.open(s.method.toUpperCase(), s.url, !0), N.timeout = s.timeout;
    function h() {
      if (!N)
        return;
      const A = ye.from(
        "getAllResponseHeaders" in N && N.getAllResponseHeaders()
      ), C = {
        data: !a || a === "text" || a === "json" ? N.responseText : N.response,
        status: N.status,
        statusText: N.statusText,
        headers: A,
        config: e,
        request: N
      };
      oo(
        function(g) {
          n(g), b();
        },
        function(g) {
          r(g), b();
        },
        C
      ), N = null;
    }
    "onloadend" in N ? N.onloadend = h : N.onreadystatechange = function() {
      !N || N.readyState !== 4 || N.status === 0 && !(N.responseURL && N.responseURL.indexOf("file:") === 0) || setTimeout(h);
    }, N.onabort = function() {
      N && (r(new q("Request aborted", q.ECONNABORTED, e, N)), N = null);
    }, N.onerror = function(O) {
      const C = O && O.message ? O.message : "Network Error", D = new q(C, q.ERR_NETWORK, e, N);
      D.event = O || null, r(D), N = null;
    }, N.ontimeout = function() {
      let O = s.timeout ? "timeout of " + s.timeout + "ms exceeded" : "timeout exceeded";
      const C = s.transitional || dr;
      s.timeoutErrorMessage && (O = s.timeoutErrorMessage), r(
        new q(
          O,
          C.clarifyTimeoutError ? q.ETIMEDOUT : q.ECONNABORTED,
          e,
          N
        )
      ), N = null;
    }, o === void 0 && i.setContentType(null), "setRequestHeader" in N && y.forEach(i.toJSON(), function(O, C) {
      N.setRequestHeader(C, O);
    }), y.isUndefined(s.withCredentials) || (N.withCredentials = !!s.withCredentials), a && a !== "json" && (N.responseType = s.responseType), l && ([E, p] = Xt(l, !0), N.addEventListener("progress", E)), c && N.upload && ([m, _] = Xt(c), N.upload.addEventListener("progress", m), N.upload.addEventListener("loadend", _)), (s.cancelToken || s.signal) && (f = (A) => {
      N && (r(!A || A.type ? new Dt(null, e, N) : A), N.abort(), N = null);
    }, s.cancelToken && s.cancelToken.subscribe(f), s.signal && (s.signal.aborted ? f() : s.signal.addEventListener("abort", f)));
    const S = Ua(s.url);
    if (S && Ee.protocols.indexOf(S) === -1) {
      r(
        new q(
          "Unsupported protocol " + S + ":",
          q.ERR_BAD_REQUEST,
          e
        )
      );
      return;
    }
    N.send(o || null);
  });
}, Ya = (e, t) => {
  const { length: n } = e = e ? e.filter(Boolean) : [];
  if (t || n) {
    let r = new AbortController(), s;
    const o = function(l) {
      if (!s) {
        s = !0, a();
        const f = l instanceof Error ? l : this.reason;
        r.abort(
          f instanceof q ? f : new Dt(f instanceof Error ? f.message : f)
        );
      }
    };
    let i = t && setTimeout(() => {
      i = null, o(new q(`timeout of ${t}ms exceeded`, q.ETIMEDOUT));
    }, t);
    const a = () => {
      e && (i && clearTimeout(i), i = null, e.forEach((l) => {
        l.unsubscribe ? l.unsubscribe(o) : l.removeEventListener("abort", o);
      }), e = null);
    };
    e.forEach((l) => l.addEventListener("abort", o));
    const { signal: c } = r;
    return c.unsubscribe = () => y.asap(a), c;
  }
}, Ga = function* (e, t) {
  let n = e.byteLength;
  if (n < t) {
    yield e;
    return;
  }
  let r = 0, s;
  for (; r < n; )
    s = r + t, yield e.slice(r, s), r = s;
}, Ka = async function* (e, t) {
  for await (const n of Xa(e))
    yield* Ga(n, t);
}, Xa = async function* (e) {
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
}, Yr = (e, t, n, r) => {
  const s = Ka(e, t);
  let o = 0, i, a = (c) => {
    i || (i = !0, r && r(c));
  };
  return new ReadableStream(
    {
      async pull(c) {
        try {
          const { done: l, value: f } = await s.next();
          if (l) {
            a(), c.close();
            return;
          }
          let m = f.byteLength;
          if (n) {
            let E = o += m;
            n(E);
          }
          c.enqueue(new Uint8Array(f));
        } catch (l) {
          throw a(l), l;
        }
      },
      cancel(c) {
        return a(c), s.return();
      }
    },
    {
      highWaterMark: 2
    }
  );
}, Gr = 64 * 1024, { isFunction: kt } = y, Qa = (({ Request: e, Response: t }) => ({
  Request: e,
  Response: t
}))(y.global), { ReadableStream: Kr, TextEncoder: Xr } = y.global, Qr = (e, ...t) => {
  try {
    return !!e(...t);
  } catch {
    return !1;
  }
}, Ja = (e) => {
  e = y.merge.call(
    {
      skipUndefined: !0
    },
    Qa,
    e
  );
  const { fetch: t, Request: n, Response: r } = e, s = t ? kt(t) : typeof fetch == "function", o = kt(n), i = kt(r);
  if (!s)
    return !1;
  const a = s && kt(Kr), c = s && (typeof Xr == "function" ? /* @__PURE__ */ ((p) => (b) => p.encode(b))(new Xr()) : async (p) => new Uint8Array(await new n(p).arrayBuffer())), l = o && a && Qr(() => {
    let p = !1;
    const b = new n(Ee.origin, {
      body: new Kr(),
      method: "POST",
      get duplex() {
        return p = !0, "half";
      }
    }).headers.has("Content-Type");
    return p && !b;
  }), f = i && a && Qr(() => y.isReadableStream(new r("").body)), m = {
    stream: f && ((p) => p.body)
  };
  s && ["text", "arrayBuffer", "blob", "formData", "stream"].forEach((p) => {
    !m[p] && (m[p] = (b, N) => {
      let h = b && b[p];
      if (h)
        return h.call(b);
      throw new q(
        `Response type '${p}' is not supported`,
        q.ERR_NOT_SUPPORT,
        N
      );
    });
  });
  const E = async (p) => {
    if (p == null)
      return 0;
    if (y.isBlob(p))
      return p.size;
    if (y.isSpecCompliantForm(p))
      return (await new n(Ee.origin, {
        method: "POST",
        body: p
      }).arrayBuffer()).byteLength;
    if (y.isArrayBufferView(p) || y.isArrayBuffer(p))
      return p.byteLength;
    if (y.isURLSearchParams(p) && (p = p + ""), y.isString(p))
      return (await c(p)).byteLength;
  }, _ = async (p, b) => {
    const N = y.toFiniteNumber(p.getContentLength());
    return N ?? E(b);
  };
  return async (p) => {
    let {
      url: b,
      method: N,
      data: h,
      signal: S,
      cancelToken: A,
      timeout: O,
      onDownloadProgress: C,
      onUploadProgress: D,
      responseType: g,
      headers: W,
      withCredentials: B = "same-origin",
      fetchOptions: R
    } = ao(p), v = t || fetch;
    g = g ? (g + "").toLowerCase() : "text";
    let V = Ya(
      [S, A && A.toAbortSignal()],
      O
    ), z = null;
    const U = V && V.unsubscribe && (() => {
      V.unsubscribe();
    });
    let k;
    try {
      if (D && l && N !== "get" && N !== "head" && (k = await _(W, h)) !== 0) {
        let Y = new n(b, {
          method: "POST",
          body: h,
          duplex: "half"
        }), G;
        if (y.isFormData(h) && (G = Y.headers.get("content-type")) && W.setContentType(G), Y.body) {
          const [ee, te] = Hr(
            k,
            Xt(qr(D))
          );
          h = Yr(Y.body, Gr, ee, te);
        }
      }
      y.isString(B) || (B = B ? "include" : "omit");
      const I = o && "credentials" in n.prototype, $ = {
        ...R,
        signal: V,
        method: N.toUpperCase(),
        headers: W.normalize().toJSON(),
        body: h,
        duplex: "half",
        credentials: I ? B : void 0
      };
      z = o && new n(b, $);
      let w = await (o ? v(z, R) : v(b, $));
      const x = f && (g === "stream" || g === "response");
      if (f && (C || x && U)) {
        const Y = {};
        ["status", "statusText", "headers"].forEach((le) => {
          Y[le] = w[le];
        });
        const G = y.toFiniteNumber(w.headers.get("content-length")), [ee, te] = C && Hr(
          G,
          Xt(qr(C), !0)
        ) || [];
        w = new r(
          Yr(w.body, Gr, ee, () => {
            te && te(), U && U();
          }),
          Y
        );
      }
      g = g || "text";
      let j = await m[y.findKey(m, g) || "text"](
        w,
        p
      );
      return !x && U && U(), await new Promise((Y, G) => {
        oo(Y, G, {
          data: j,
          headers: ye.from(w.headers),
          status: w.status,
          statusText: w.statusText,
          config: p,
          request: z
        });
      });
    } catch (I) {
      throw U && U(), I && I.name === "TypeError" && /Load failed|fetch/i.test(I.message) ? Object.assign(
        new q(
          "Network Error",
          q.ERR_NETWORK,
          p,
          z,
          I && I.response
        ),
        {
          cause: I.cause || I
        }
      ) : q.from(I, I && I.code, p, z, I && I.response);
    }
  };
}, za = /* @__PURE__ */ new Map(), co = (e) => {
  let t = e && e.env || {};
  const { fetch: n, Request: r, Response: s } = t, o = [r, s, n];
  let i = o.length, a = i, c, l, f = za;
  for (; a--; )
    c = o[a], l = f.get(c), l === void 0 && f.set(c, l = a ? /* @__PURE__ */ new Map() : Ja(t)), f = l;
  return l;
};
co();
const mr = {
  http: ha,
  xhr: Wa,
  fetch: {
    get: co
  }
};
y.forEach(mr, (e, t) => {
  if (e) {
    try {
      Object.defineProperty(e, "name", { value: t });
    } catch {
    }
    Object.defineProperty(e, "adapterName", { value: t });
  }
});
const Jr = (e) => `- ${e}`, Za = (e) => y.isFunction(e) || e === null || e === !1;
function ec(e, t) {
  e = y.isArray(e) ? e : [e];
  const { length: n } = e;
  let r, s;
  const o = {};
  for (let i = 0; i < n; i++) {
    r = e[i];
    let a;
    if (s = r, !Za(r) && (s = mr[(a = String(r)).toLowerCase()], s === void 0))
      throw new q(`Unknown adapter '${a}'`);
    if (s && (y.isFunction(s) || (s = s.get(t))))
      break;
    o[a || "#" + i] = s;
  }
  if (!s) {
    const i = Object.entries(o).map(
      ([c, l]) => `adapter ${c} ` + (l === !1 ? "is not supported by the environment" : "is not available in the build")
    );
    let a = n ? i.length > 1 ? `since :
` + i.map(Jr).join(`
`) : " " + Jr(i[0]) : "as no adapter specified";
    throw new q(
      "There is no suitable adapter to dispatch the request " + a,
      "ERR_NOT_SUPPORT"
    );
  }
  return s;
}
const lo = {
  /**
   * Resolve an adapter from a list of adapter names or functions.
   * @type {Function}
   */
  getAdapter: ec,
  /**
   * Exposes all known adapters
   * @type {Object<string, Function|Object>}
   */
  adapters: mr
};
function Cn(e) {
  if (e.cancelToken && e.cancelToken.throwIfRequested(), e.signal && e.signal.aborted)
    throw new Dt(null, e);
}
function zr(e) {
  return Cn(e), e.headers = ye.from(e.headers), e.data = Rn.call(e, e.transformRequest), ["post", "put", "patch"].indexOf(e.method) !== -1 && e.headers.setContentType("application/x-www-form-urlencoded", !1), lo.getAdapter(e.adapter || Pt.adapter, e)(e).then(
    function(r) {
      return Cn(e), r.data = Rn.call(e, e.transformResponse, r), r.headers = ye.from(r.headers), r;
    },
    function(r) {
      return so(r) || (Cn(e), r && r.response && (r.response.data = Rn.call(
        e,
        e.transformResponse,
        r.response
      ), r.response.headers = ye.from(r.response.headers))), Promise.reject(r);
    }
  );
}
const uo = "1.13.6", mn = {};
["object", "boolean", "number", "function", "string", "symbol"].forEach((e, t) => {
  mn[e] = function(r) {
    return typeof r === e || "a" + (t < 1 ? "n " : " ") + e;
  };
});
const Zr = {};
mn.transitional = function(t, n, r) {
  function s(o, i) {
    return "[Axios v" + uo + "] Transitional option '" + o + "'" + i + (r ? ". " + r : "");
  }
  return (o, i, a) => {
    if (t === !1)
      throw new q(
        s(i, " has been removed" + (n ? " in " + n : "")),
        q.ERR_DEPRECATED
      );
    return n && !Zr[i] && (Zr[i] = !0, console.warn(
      s(
        i,
        " has been deprecated since v" + n + " and will be removed in the near future"
      )
    )), t ? t(o, i, a) : !0;
  };
};
mn.spelling = function(t) {
  return (n, r) => (console.warn(`${r} is likely a misspelling of ${t}`), !0);
};
function tc(e, t, n) {
  if (typeof e != "object")
    throw new q("options must be an object", q.ERR_BAD_OPTION_VALUE);
  const r = Object.keys(e);
  let s = r.length;
  for (; s-- > 0; ) {
    const o = r[s], i = t[o];
    if (i) {
      const a = e[o], c = a === void 0 || i(a, o, e);
      if (c !== !0)
        throw new q(
          "option " + o + " must be " + c,
          q.ERR_BAD_OPTION_VALUE
        );
      continue;
    }
    if (n !== !0)
      throw new q("Unknown option " + o, q.ERR_BAD_OPTION);
  }
}
const jt = {
  assertOptions: tc,
  validators: mn
}, Se = jt.validators;
let nt = class {
  constructor(t) {
    this.defaults = t || {}, this.interceptors = {
      request: new jr(),
      response: new jr()
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
        let s = {};
        Error.captureStackTrace ? Error.captureStackTrace(s) : s = new Error();
        const o = s.stack ? s.stack.replace(/^.+\n/, "") : "";
        try {
          r.stack ? o && !String(r.stack).endsWith(o.replace(/^.+\n.+\n/, "")) && (r.stack += `
` + o) : r.stack = o;
        } catch {
        }
      }
      throw r;
    }
  }
  _request(t, n) {
    typeof t == "string" ? (n = n || {}, n.url = t) : n = t || {}, n = st(this.defaults, n);
    const { transitional: r, paramsSerializer: s, headers: o } = n;
    r !== void 0 && jt.assertOptions(
      r,
      {
        silentJSONParsing: Se.transitional(Se.boolean),
        forcedJSONParsing: Se.transitional(Se.boolean),
        clarifyTimeoutError: Se.transitional(Se.boolean),
        legacyInterceptorReqResOrdering: Se.transitional(Se.boolean)
      },
      !1
    ), s != null && (y.isFunction(s) ? n.paramsSerializer = {
      serialize: s
    } : jt.assertOptions(
      s,
      {
        encode: Se.function,
        serialize: Se.function
      },
      !0
    )), n.allowAbsoluteUrls !== void 0 || (this.defaults.allowAbsoluteUrls !== void 0 ? n.allowAbsoluteUrls = this.defaults.allowAbsoluteUrls : n.allowAbsoluteUrls = !0), jt.assertOptions(
      n,
      {
        baseUrl: Se.spelling("baseURL"),
        withXsrfToken: Se.spelling("withXSRFToken")
      },
      !0
    ), n.method = (n.method || this.defaults.method || "get").toLowerCase();
    let i = o && y.merge(o.common, o[n.method]);
    o && y.forEach(["delete", "get", "head", "post", "put", "patch", "common"], (p) => {
      delete o[p];
    }), n.headers = ye.concat(i, o);
    const a = [];
    let c = !0;
    this.interceptors.request.forEach(function(b) {
      if (typeof b.runWhen == "function" && b.runWhen(n) === !1)
        return;
      c = c && b.synchronous;
      const N = n.transitional || dr;
      N && N.legacyInterceptorReqResOrdering ? a.unshift(b.fulfilled, b.rejected) : a.push(b.fulfilled, b.rejected);
    });
    const l = [];
    this.interceptors.response.forEach(function(b) {
      l.push(b.fulfilled, b.rejected);
    });
    let f, m = 0, E;
    if (!c) {
      const p = [zr.bind(this), void 0];
      for (p.unshift(...a), p.push(...l), E = p.length, f = Promise.resolve(n); m < E; )
        f = f.then(p[m++], p[m++]);
      return f;
    }
    E = a.length;
    let _ = n;
    for (; m < E; ) {
      const p = a[m++], b = a[m++];
      try {
        _ = p(_);
      } catch (N) {
        b.call(this, N);
        break;
      }
    }
    try {
      f = zr.call(this, _);
    } catch (p) {
      return Promise.reject(p);
    }
    for (m = 0, E = l.length; m < E; )
      f = f.then(l[m++], l[m++]);
    return f;
  }
  getUri(t) {
    t = st(this.defaults, t);
    const n = io(t.baseURL, t.url, t.allowAbsoluteUrls);
    return no(n, t.params, t.paramsSerializer);
  }
};
y.forEach(["delete", "get", "head", "options"], function(t) {
  nt.prototype[t] = function(n, r) {
    return this.request(
      st(r || {}, {
        method: t,
        url: n,
        data: (r || {}).data
      })
    );
  };
});
y.forEach(["post", "put", "patch"], function(t) {
  function n(r) {
    return function(o, i, a) {
      return this.request(
        st(a || {}, {
          method: t,
          headers: r ? {
            "Content-Type": "multipart/form-data"
          } : {},
          url: o,
          data: i
        })
      );
    };
  }
  nt.prototype[t] = n(), nt.prototype[t + "Form"] = n(!0);
});
let nc = class fo {
  constructor(t) {
    if (typeof t != "function")
      throw new TypeError("executor must be a function.");
    let n;
    this.promise = new Promise(function(o) {
      n = o;
    });
    const r = this;
    this.promise.then((s) => {
      if (!r._listeners) return;
      let o = r._listeners.length;
      for (; o-- > 0; )
        r._listeners[o](s);
      r._listeners = null;
    }), this.promise.then = (s) => {
      let o;
      const i = new Promise((a) => {
        r.subscribe(a), o = a;
      }).then(s);
      return i.cancel = function() {
        r.unsubscribe(o);
      }, i;
    }, t(function(o, i, a) {
      r.reason || (r.reason = new Dt(o, i, a), n(r.reason));
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
      token: new fo(function(s) {
        t = s;
      }),
      cancel: t
    };
  }
};
function rc(e) {
  return function(n) {
    return e.apply(null, n);
  };
}
function sc(e) {
  return y.isObject(e) && e.isAxiosError === !0;
}
const Kn = {
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
Object.entries(Kn).forEach(([e, t]) => {
  Kn[t] = e;
});
function po(e) {
  const t = new nt(e), n = Ws(nt.prototype.request, t);
  return y.extend(n, nt.prototype, t, { allOwnKeys: !0 }), y.extend(n, t, null, { allOwnKeys: !0 }), n.create = function(s) {
    return po(st(e, s));
  }, n;
}
const ce = po(Pt);
ce.Axios = nt;
ce.CanceledError = Dt;
ce.CancelToken = nc;
ce.isCancel = so;
ce.VERSION = uo;
ce.toFormData = pn;
ce.AxiosError = q;
ce.Cancel = ce.CanceledError;
ce.all = function(t) {
  return Promise.all(t);
};
ce.spread = rc;
ce.isAxiosError = sc;
ce.mergeConfig = st;
ce.AxiosHeaders = ye;
ce.formToJSON = (e) => ro(y.isHTMLForm(e) ? new FormData(e) : e);
ce.getAdapter = lo.getAdapter;
ce.HttpStatusCode = Kn;
ce.default = ce;
const {
  Axios: Ef,
  AxiosError: gf,
  CanceledError: yf,
  isCancel: bf,
  CancelToken: Nf,
  VERSION: Of,
  all: Sf,
  Cancel: Tf,
  isAxiosError: Af,
  spread: vf,
  toFormData: Lf,
  AxiosHeaders: Rf,
  HttpStatusCode: es,
  formToJSON: Cf,
  getAdapter: If,
  mergeConfig: Pf
} = ce;
function oc(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var Bt = { exports: {} }, ic = Bt.exports, ts;
function ac() {
  return ts || (ts = 1, (function(e, t) {
    (function(n, r) {
      e.exports = r();
    })(ic, (function() {
      var n = 1e3, r = 6e4, s = 36e5, o = "millisecond", i = "second", a = "minute", c = "hour", l = "day", f = "week", m = "month", E = "quarter", _ = "year", p = "date", b = "Invalid Date", N = /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/, h = /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g, S = { name: "en", weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"), ordinal: function(U) {
        var k = ["th", "st", "nd", "rd"], I = U % 100;
        return "[" + U + (k[(I - 20) % 10] || k[I] || k[0]) + "]";
      } }, A = function(U, k, I) {
        var $ = String(U);
        return !$ || $.length >= k ? U : "" + Array(k + 1 - $.length).join(I) + U;
      }, O = { s: A, z: function(U) {
        var k = -U.utcOffset(), I = Math.abs(k), $ = Math.floor(I / 60), w = I % 60;
        return (k <= 0 ? "+" : "-") + A($, 2, "0") + ":" + A(w, 2, "0");
      }, m: function U(k, I) {
        if (k.date() < I.date()) return -U(I, k);
        var $ = 12 * (I.year() - k.year()) + (I.month() - k.month()), w = k.clone().add($, m), x = I - w < 0, j = k.clone().add($ + (x ? -1 : 1), m);
        return +(-($ + (I - w) / (x ? w - j : j - w)) || 0);
      }, a: function(U) {
        return U < 0 ? Math.ceil(U) || 0 : Math.floor(U);
      }, p: function(U) {
        return { M: m, y: _, w: f, d: l, D: p, h: c, m: a, s: i, ms: o, Q: E }[U] || String(U || "").toLowerCase().replace(/s$/, "");
      }, u: function(U) {
        return U === void 0;
      } }, C = "en", D = {};
      D[C] = S;
      var g = "$isDayjsObject", W = function(U) {
        return U instanceof V || !(!U || !U[g]);
      }, B = function U(k, I, $) {
        var w;
        if (!k) return C;
        if (typeof k == "string") {
          var x = k.toLowerCase();
          D[x] && (w = x), I && (D[x] = I, w = x);
          var j = k.split("-");
          if (!w && j.length > 1) return U(j[0]);
        } else {
          var Y = k.name;
          D[Y] = k, w = Y;
        }
        return !$ && w && (C = w), w || !$ && C;
      }, R = function(U, k) {
        if (W(U)) return U.clone();
        var I = typeof k == "object" ? k : {};
        return I.date = U, I.args = arguments, new V(I);
      }, v = O;
      v.l = B, v.i = W, v.w = function(U, k) {
        return R(U, { locale: k.$L, utc: k.$u, x: k.$x, $offset: k.$offset });
      };
      var V = (function() {
        function U(I) {
          this.$L = B(I.locale, null, !0), this.parse(I), this.$x = this.$x || I.x || {}, this[g] = !0;
        }
        var k = U.prototype;
        return k.parse = function(I) {
          this.$d = (function($) {
            var w = $.date, x = $.utc;
            if (w === null) return /* @__PURE__ */ new Date(NaN);
            if (v.u(w)) return /* @__PURE__ */ new Date();
            if (w instanceof Date) return new Date(w);
            if (typeof w == "string" && !/Z$/i.test(w)) {
              var j = w.match(N);
              if (j) {
                var Y = j[2] - 1 || 0, G = (j[7] || "0").substring(0, 3);
                return x ? new Date(Date.UTC(j[1], Y, j[3] || 1, j[4] || 0, j[5] || 0, j[6] || 0, G)) : new Date(j[1], Y, j[3] || 1, j[4] || 0, j[5] || 0, j[6] || 0, G);
              }
            }
            return new Date(w);
          })(I), this.init();
        }, k.init = function() {
          var I = this.$d;
          this.$y = I.getFullYear(), this.$M = I.getMonth(), this.$D = I.getDate(), this.$W = I.getDay(), this.$H = I.getHours(), this.$m = I.getMinutes(), this.$s = I.getSeconds(), this.$ms = I.getMilliseconds();
        }, k.$utils = function() {
          return v;
        }, k.isValid = function() {
          return this.$d.toString() !== b;
        }, k.isSame = function(I, $) {
          var w = R(I);
          return this.startOf($) <= w && w <= this.endOf($);
        }, k.isAfter = function(I, $) {
          return R(I) < this.startOf($);
        }, k.isBefore = function(I, $) {
          return this.endOf($) < R(I);
        }, k.$g = function(I, $, w) {
          return v.u(I) ? this[$] : this.set(w, I);
        }, k.unix = function() {
          return Math.floor(this.valueOf() / 1e3);
        }, k.valueOf = function() {
          return this.$d.getTime();
        }, k.startOf = function(I, $) {
          var w = this, x = !!v.u($) || $, j = v.p(I), Y = function(Re, ue) {
            var Ne = v.w(w.$u ? Date.UTC(w.$y, ue, Re) : new Date(w.$y, ue, Re), w);
            return x ? Ne : Ne.endOf(l);
          }, G = function(Re, ue) {
            return v.w(w.toDate()[Re].apply(w.toDate("s"), (x ? [0, 0, 0, 0] : [23, 59, 59, 999]).slice(ue)), w);
          }, ee = this.$W, te = this.$M, le = this.$D, Ue = "set" + (this.$u ? "UTC" : "");
          switch (j) {
            case _:
              return x ? Y(1, 0) : Y(31, 11);
            case m:
              return x ? Y(1, te) : Y(0, te + 1);
            case f:
              var Le = this.$locale().weekStart || 0, Pe = (ee < Le ? ee + 7 : ee) - Le;
              return Y(x ? le - Pe : le + (6 - Pe), te);
            case l:
            case p:
              return G(Ue + "Hours", 0);
            case c:
              return G(Ue + "Minutes", 1);
            case a:
              return G(Ue + "Seconds", 2);
            case i:
              return G(Ue + "Milliseconds", 3);
            default:
              return this.clone();
          }
        }, k.endOf = function(I) {
          return this.startOf(I, !1);
        }, k.$set = function(I, $) {
          var w, x = v.p(I), j = "set" + (this.$u ? "UTC" : ""), Y = (w = {}, w[l] = j + "Date", w[p] = j + "Date", w[m] = j + "Month", w[_] = j + "FullYear", w[c] = j + "Hours", w[a] = j + "Minutes", w[i] = j + "Seconds", w[o] = j + "Milliseconds", w)[x], G = x === l ? this.$D + ($ - this.$W) : $;
          if (x === m || x === _) {
            var ee = this.clone().set(p, 1);
            ee.$d[Y](G), ee.init(), this.$d = ee.set(p, Math.min(this.$D, ee.daysInMonth())).$d;
          } else Y && this.$d[Y](G);
          return this.init(), this;
        }, k.set = function(I, $) {
          return this.clone().$set(I, $);
        }, k.get = function(I) {
          return this[v.p(I)]();
        }, k.add = function(I, $) {
          var w, x = this;
          I = Number(I);
          var j = v.p($), Y = function(te) {
            var le = R(x);
            return v.w(le.date(le.date() + Math.round(te * I)), x);
          };
          if (j === m) return this.set(m, this.$M + I);
          if (j === _) return this.set(_, this.$y + I);
          if (j === l) return Y(1);
          if (j === f) return Y(7);
          var G = (w = {}, w[a] = r, w[c] = s, w[i] = n, w)[j] || 1, ee = this.$d.getTime() + I * G;
          return v.w(ee, this);
        }, k.subtract = function(I, $) {
          return this.add(-1 * I, $);
        }, k.format = function(I) {
          var $ = this, w = this.$locale();
          if (!this.isValid()) return w.invalidDate || b;
          var x = I || "YYYY-MM-DDTHH:mm:ssZ", j = v.z(this), Y = this.$H, G = this.$m, ee = this.$M, te = w.weekdays, le = w.months, Ue = w.meridiem, Le = function(ue, Ne, $e, De) {
            return ue && (ue[Ne] || ue($, x)) || $e[Ne].slice(0, De);
          }, Pe = function(ue) {
            return v.s(Y % 12 || 12, ue, "0");
          }, Re = Ue || function(ue, Ne, $e) {
            var De = ue < 12 ? "AM" : "PM";
            return $e ? De.toLowerCase() : De;
          };
          return x.replace(h, (function(ue, Ne) {
            return Ne || (function($e) {
              switch ($e) {
                case "YY":
                  return String($.$y).slice(-2);
                case "YYYY":
                  return v.s($.$y, 4, "0");
                case "M":
                  return ee + 1;
                case "MM":
                  return v.s(ee + 1, 2, "0");
                case "MMM":
                  return Le(w.monthsShort, ee, le, 3);
                case "MMMM":
                  return Le(le, ee);
                case "D":
                  return $.$D;
                case "DD":
                  return v.s($.$D, 2, "0");
                case "d":
                  return String($.$W);
                case "dd":
                  return Le(w.weekdaysMin, $.$W, te, 2);
                case "ddd":
                  return Le(w.weekdaysShort, $.$W, te, 3);
                case "dddd":
                  return te[$.$W];
                case "H":
                  return String(Y);
                case "HH":
                  return v.s(Y, 2, "0");
                case "h":
                  return Pe(1);
                case "hh":
                  return Pe(2);
                case "a":
                  return Re(Y, G, !0);
                case "A":
                  return Re(Y, G, !1);
                case "m":
                  return String(G);
                case "mm":
                  return v.s(G, 2, "0");
                case "s":
                  return String($.$s);
                case "ss":
                  return v.s($.$s, 2, "0");
                case "SSS":
                  return v.s($.$ms, 3, "0");
                case "Z":
                  return j;
              }
              return null;
            })(ue) || j.replace(":", "");
          }));
        }, k.utcOffset = function() {
          return 15 * -Math.round(this.$d.getTimezoneOffset() / 15);
        }, k.diff = function(I, $, w) {
          var x, j = this, Y = v.p($), G = R(I), ee = (G.utcOffset() - this.utcOffset()) * r, te = this - G, le = function() {
            return v.m(j, G);
          };
          switch (Y) {
            case _:
              x = le() / 12;
              break;
            case m:
              x = le();
              break;
            case E:
              x = le() / 3;
              break;
            case f:
              x = (te - ee) / 6048e5;
              break;
            case l:
              x = (te - ee) / 864e5;
              break;
            case c:
              x = te / s;
              break;
            case a:
              x = te / r;
              break;
            case i:
              x = te / n;
              break;
            default:
              x = te;
          }
          return w ? x : v.a(x);
        }, k.daysInMonth = function() {
          return this.endOf(m).$D;
        }, k.$locale = function() {
          return D[this.$L];
        }, k.locale = function(I, $) {
          if (!I) return this.$L;
          var w = this.clone(), x = B(I, $, !0);
          return x && (w.$L = x), w;
        }, k.clone = function() {
          return v.w(this.$d, this);
        }, k.toDate = function() {
          return new Date(this.valueOf());
        }, k.toJSON = function() {
          return this.isValid() ? this.toISOString() : null;
        }, k.toISOString = function() {
          return this.$d.toISOString();
        }, k.toString = function() {
          return this.$d.toUTCString();
        }, U;
      })(), z = V.prototype;
      return R.prototype = z, [["$ms", o], ["$s", i], ["$m", a], ["$H", c], ["$W", l], ["$M", m], ["$y", _], ["$D", p]].forEach((function(U) {
        z[U[1]] = function(k) {
          return this.$g(k, U[0], U[1]);
        };
      })), R.extend = function(U, k) {
        return U.$i || (U(k, V, R), U.$i = !0), R;
      }, R.locale = B, R.isDayjs = W, R.unix = function(U) {
        return R(1e3 * U);
      }, R.en = D[C], R.Ls = D, R.p = {}, R;
    }));
  })(Bt)), Bt.exports;
}
var cc = ac();
const Xn = /* @__PURE__ */ oc(cc);
let Qt = null;
function Df(e) {
  if (Qt !== null) {
    console.warn(
      "[LinID CoreLib] HTTP client has already been initialized. Re-initialization is ignored."
    );
    return;
  }
  Qt = e;
}
function qe() {
  if (Qt === null)
    throw new Error(
      "[LinID CoreLib] HTTP client is not initialized. Call setHttpClient() first."
    );
  return Qt;
}
const mo = /* @__PURE__ */ new Map();
function wf(e) {
  mo.set(e.instanceId, e);
}
function ht(e) {
  const t = mo.get(e);
  if (!t)
    throw new Error(
      `[LinID CoreLib] No module host configuration found for instanceId: ${e}`
    );
  return t;
}
async function kf(e, t) {
  const n = ht(e);
  return qe().post(`/${n.apiEndpoint}`, t).then(({ data: r }) => r);
}
async function Mf(e, t, n) {
  const r = ht(e);
  return qe().put(`/${r.apiEndpoint}/${t}`, n).then(({ data: s }) => s);
}
async function Ff(e, t, n) {
  const r = ht(e);
  return qe().get(`/${r.apiEndpoint}`, {
    params: { ...t, ...n }
  }).then(({ data: s }) => s);
}
async function Uf(e, t) {
  const n = ht(e);
  return qe().get(`/${n.apiEndpoint}/${t}`).then(({ data: r }) => r);
}
async function $f(e, t) {
  const n = ht(e);
  return qe().delete(`/${n.apiEndpoint}/${t}`);
}
async function lc(e, t, n) {
  const r = ht(e);
  await qe().post(
    `/${r.apiEndpoint}/validate/${t}`,
    n,
    { headers: { "Content-Type": "application/json" } }
  );
}
function uc(e, t) {
  if (!ft(e) || !ft(t))
    return t;
  const n = { ...e };
  for (const r of Object.keys(t))
    n[r] = uc(e[r], t[r]);
  return n;
}
function xf(e) {
  const t = {};
  for (const [n, r] of Object.entries(e)) {
    const s = n.split(".");
    let o = t;
    s.forEach((i, a) => {
      a === s.length - 1 ? o[i] = r : (ft(o[i]) || (o[i] = {}), o = o[i]);
    });
  }
  return t;
}
function ft(e) {
  return typeof e == "object" && e !== null && !Array.isArray(e);
}
function fc(e, t) {
  return typeof e != "object" || e === null ? e : Object.fromEntries(
    Object.entries(e).map(([n, r]) => {
      const s = t(n), o = ft(r) ? fc(r, t) : r;
      return [s, o];
    })
  );
}
function ho(e, t) {
  if (e === t || typeof e == "number" && typeof t == "number" && Number.isNaN(e) && Number.isNaN(t))
    return !0;
  if (e == null || t == null || typeof e != "object" || typeof t != "object" || Array.isArray(e) !== Array.isArray(t))
    return !1;
  const n = Object.keys(e), r = Object.keys(t);
  if (n.length !== r.length)
    return !1;
  const s = e, o = t;
  return n.every(
    (i) => Object.prototype.hasOwnProperty.call(o, i) && ho(s[i], o[i])
  );
}
function Qn(e, t) {
  if (Array.isArray(e) && Array.isArray(t)) {
    if (e.length !== t.length)
      return !1;
    const n = /* @__PURE__ */ new Set();
    return e.every((r) => {
      const s = t.findIndex(
        (o, i) => !n.has(i) && Qn(r, o)
      );
      return s === -1 ? !1 : (n.add(s), !0);
    });
  }
  if (ft(e) && ft(t)) {
    const n = Object.keys(e), r = Object.keys(t);
    return n.length !== r.length ? !1 : n.every(
      (s) => Object.prototype.hasOwnProperty.call(t, s) && Qn(e[s], t[s])
    );
  }
  return ho(e, t);
}
function Fe(e, t) {
  typeof console < "u" && (console.warn("[intlify] " + e), t && console.warn(t.stack));
}
const ns = {};
function dc(e) {
  ns[e] || (ns[e] = !0, Fe(e));
}
const He = typeof window < "u";
let be, ot;
if (process.env.NODE_ENV !== "production") {
  const e = He && window.performance;
  e && e.mark && e.measure && e.clearMarks && // @ts-ignore browser compat
  e.clearMeasures && (be = (t) => {
    e.mark(t);
  }, ot = (t, n, r) => {
    e.measure(t, n, r), e.clearMarks(n), e.clearMarks(r);
  });
}
const pc = /\{([0-9a-zA-Z]+)\}/g;
function hn(e, ...t) {
  return t.length === 1 && Q(t[0]) && (t = t[0]), (!t || !t.hasOwnProperty) && (t = {}), e.replace(pc, (n, r) => t.hasOwnProperty(r) ? t[r] : "");
}
const We = (e, t = !1) => t ? Symbol.for(e) : Symbol(e), mc = (e, t, n) => hc({ l: e, k: t, s: n }), hc = (e) => JSON.stringify(e).replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029").replace(/\u0027/g, "\\u0027"), de = (e) => typeof e == "number" && isFinite(e), _o = (e) => hr(e) === "[object Date]", Jt = (e) => hr(e) === "[object RegExp]", _n = (e) => J(e) && Object.keys(e).length === 0, pe = Object.assign, _c = Object.create, Z = (e = null) => _c(e);
let rs;
const tt = () => rs || (rs = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : Z());
function ss(e) {
  return e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;").replace(/\//g, "&#x2F;").replace(/=/g, "&#x3D;");
}
function os(e) {
  return e.replace(/&(?![a-zA-Z0-9#]{2,6};)/g, "&amp;").replace(/"/g, "&quot;").replace(/'/g, "&apos;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
function Ec(e) {
  return e = e.replace(/(\w+)\s*=\s*"([^"]*)"/g, (r, s, o) => `${s}="${os(o)}"`), e = e.replace(/(\w+)\s*=\s*'([^']*)'/g, (r, s, o) => `${s}='${os(o)}'`), /\s*on\w+\s*=\s*["']?[^"'>]+["']?/gi.test(e) && (process.env.NODE_ENV !== "production" && Fe("Potentially dangerous event handlers detected in translation. Consider removing onclick, onerror, etc. from your translation messages."), e = e.replace(/(\s+)(on)(\w+\s*=)/gi, "$1&#111;n$3")), [
    // In href, src, action, formaction attributes
    /(\s+(?:href|src|action|formaction)\s*=\s*["']?)\s*javascript:/gi,
    // In style attributes within url()
    /(style\s*=\s*["'][^"']*url\s*\(\s*)javascript:/gi
  ].forEach((r) => {
    e = e.replace(r, "$1javascript&#58;");
  }), e;
}
const gc = Object.prototype.hasOwnProperty;
function ve(e, t) {
  return gc.call(e, t);
}
const ae = Array.isArray, re = (e) => typeof e == "function", F = (e) => typeof e == "string", ie = (e) => typeof e == "boolean", Q = (e) => e !== null && typeof e == "object", yc = (e) => Q(e) && re(e.then) && re(e.catch), Eo = Object.prototype.toString, hr = (e) => Eo.call(e), J = (e) => hr(e) === "[object Object]", bc = (e) => e == null ? "" : ae(e) || J(e) && e.toString === Eo ? JSON.stringify(e, null, 2) : String(e);
function _r(e, t = "") {
  return e.reduce((n, r, s) => s === 0 ? n + r : n + t + r, "");
}
const is = 2;
function Nc(e, t = 0, n = e.length) {
  const r = e.split(/\r?\n/);
  let s = 0;
  const o = [];
  for (let i = 0; i < r.length; i++)
    if (s += r[i].length + 1, s >= t) {
      for (let a = i - is; a <= i + is || n > s; a++) {
        if (a < 0 || a >= r.length)
          continue;
        const c = a + 1;
        o.push(`${c}${" ".repeat(3 - String(c).length)}|  ${r[a]}`);
        const l = r[a].length;
        if (a === i) {
          const f = t - (s - l) + 1, m = Math.max(1, n > s ? l - f : n - t);
          o.push("   |  " + " ".repeat(f) + "^".repeat(m));
        } else if (a > i) {
          if (n > s) {
            const f = Math.max(Math.min(n - s, l), 1);
            o.push("   |  " + "^".repeat(f));
          }
          s += l + 1;
        }
      }
      break;
    }
  return o.join(`
`);
}
function Oc() {
  const e = /* @__PURE__ */ new Map();
  return {
    events: e,
    on(n, r) {
      const s = e.get(n);
      s && s.push(r) || e.set(n, [r]);
    },
    off(n, r) {
      const s = e.get(n);
      s && s.splice(s.indexOf(r) >>> 0, 1);
    },
    emit(n, r) {
      (e.get(n) || []).slice().map((s) => s(r)), (e.get("*") || []).slice().map((s) => s(n, r));
    }
  };
}
const Mt = (e) => !Q(e) || ae(e);
function Ht(e, t) {
  if (Mt(e) || Mt(t))
    throw new Error("Invalid value");
  const n = [{ src: e, des: t }];
  for (; n.length; ) {
    const { src: r, des: s } = n.pop();
    Object.keys(r).forEach((o) => {
      o !== "__proto__" && (Q(r[o]) && !Q(s[o]) && (s[o] = Array.isArray(r[o]) ? [] : Z()), Mt(s[o]) || Mt(r[o]) ? s[o] = r[o] : n.push({ src: r[o], des: s[o] }));
    });
  }
}
function Sc(e, t, n) {
  return { line: e, column: t, offset: n };
}
function Jn(e, t, n) {
  return { start: e, end: t };
}
const H = {
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
}, Tc = 17, Ac = {
  // tokenizer error messages
  [H.EXPECTED_TOKEN]: "Expected token: '{0}'",
  [H.INVALID_TOKEN_IN_PLACEHOLDER]: "Invalid token in placeholder: '{0}'",
  [H.UNTERMINATED_SINGLE_QUOTE_IN_PLACEHOLDER]: "Unterminated single quote in placeholder",
  [H.UNKNOWN_ESCAPE_SEQUENCE]: "Unknown escape sequence: \\{0}",
  [H.INVALID_UNICODE_ESCAPE_SEQUENCE]: "Invalid unicode escape sequence: {0}",
  [H.UNBALANCED_CLOSING_BRACE]: "Unbalanced closing brace",
  [H.UNTERMINATED_CLOSING_BRACE]: "Unterminated closing brace",
  [H.EMPTY_PLACEHOLDER]: "Empty placeholder",
  [H.NOT_ALLOW_NEST_PLACEHOLDER]: "Not allowed nest placeholder",
  [H.INVALID_LINKED_FORMAT]: "Invalid linked format",
  // parser error messages
  [H.MUST_HAVE_MESSAGES_IN_PLURAL]: "Plural must have messages",
  [H.UNEXPECTED_EMPTY_LINKED_MODIFIER]: "Unexpected empty linked modifier",
  [H.UNEXPECTED_EMPTY_LINKED_KEY]: "Unexpected empty linked key",
  [H.UNEXPECTED_LEXICAL_ANALYSIS]: "Unexpected lexical analysis in token: '{0}'",
  // generator error messages
  [H.UNHANDLED_CODEGEN_NODE_TYPE]: "unhandled codegen node type: '{0}'",
  // minimizer error messages
  [H.UNHANDLED_MINIFIER_NODE_TYPE]: "unhandled mimifier node type: '{0}'"
};
function _t(e, t, n = {}) {
  const { domain: r, messages: s, args: o } = n, i = process.env.NODE_ENV !== "production" ? hn((s || Ac)[e] || "", ...o || []) : e, a = new SyntaxError(String(i));
  return a.code = e, t && (a.location = t), a.domain = r, a;
}
function vc(e) {
  throw e;
}
const Lc = /<\/?[\w\s="/.':;#-\/]+>/, Rc = (e) => Lc.test(e), we = " ", Cc = "\r", he = `
`, Ic = "\u2028", Pc = "\u2029";
function Dc(e) {
  const t = e;
  let n = 0, r = 1, s = 1, o = 0;
  const i = (g) => t[g] === Cc && t[g + 1] === he, a = (g) => t[g] === he, c = (g) => t[g] === Pc, l = (g) => t[g] === Ic, f = (g) => i(g) || a(g) || c(g) || l(g), m = () => n, E = () => r, _ = () => s, p = () => o, b = (g) => i(g) || c(g) || l(g) ? he : t[g], N = () => b(n), h = () => b(n + o);
  function S() {
    return o = 0, f(n) && (r++, s = 0), i(n) && n++, n++, s++, t[n];
  }
  function A() {
    return i(n + o) && o++, o++, t[n + o];
  }
  function O() {
    n = 0, r = 1, s = 1, o = 0;
  }
  function C(g = 0) {
    o = g;
  }
  function D() {
    const g = n + o;
    for (; g !== n; )
      S();
    o = 0;
  }
  return {
    index: m,
    line: E,
    column: _,
    peekOffset: p,
    charAt: b,
    currentChar: N,
    currentPeek: h,
    next: S,
    peek: A,
    reset: O,
    resetPeek: C,
    skipToPeek: D
  };
}
const xe = void 0, wc = ".", as = "'", kc = "tokenizer";
function Mc(e, t = {}) {
  const n = t.location !== !1, r = Dc(e), s = () => r.index(), o = () => Sc(r.line(), r.column(), r.index()), i = o(), a = s(), c = {
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
  }, l = () => c, { onError: f } = t;
  function m(u, d, L, ...M) {
    const ne = l();
    if (d.column += L, d.offset += L, f) {
      const oe = n ? Jn(ne.startLoc, d) : null, K = _t(u, oe, {
        domain: kc,
        args: M
      });
      f(K);
    }
  }
  function E(u, d, L) {
    u.endLoc = o(), u.currentType = d;
    const M = { type: d };
    return n && (M.loc = Jn(u.startLoc, u.endLoc)), L != null && (M.value = L), M;
  }
  const _ = (u) => E(
    u,
    13
    /* TokenTypes.EOF */
  );
  function p(u, d) {
    return u.currentChar() === d ? (u.next(), d) : (m(H.EXPECTED_TOKEN, o(), 0, d), "");
  }
  function b(u) {
    let d = "";
    for (; u.currentPeek() === we || u.currentPeek() === he; )
      d += u.currentPeek(), u.peek();
    return d;
  }
  function N(u) {
    const d = b(u);
    return u.skipToPeek(), d;
  }
  function h(u) {
    if (u === xe)
      return !1;
    const d = u.charCodeAt(0);
    return d >= 97 && d <= 122 || // a-z
    d >= 65 && d <= 90 || // A-Z
    d === 95;
  }
  function S(u) {
    if (u === xe)
      return !1;
    const d = u.charCodeAt(0);
    return d >= 48 && d <= 57;
  }
  function A(u, d) {
    const { currentType: L } = d;
    if (L !== 2)
      return !1;
    b(u);
    const M = h(u.currentPeek());
    return u.resetPeek(), M;
  }
  function O(u, d) {
    const { currentType: L } = d;
    if (L !== 2)
      return !1;
    b(u);
    const M = u.currentPeek() === "-" ? u.peek() : u.currentPeek(), ne = S(M);
    return u.resetPeek(), ne;
  }
  function C(u, d) {
    const { currentType: L } = d;
    if (L !== 2)
      return !1;
    b(u);
    const M = u.currentPeek() === as;
    return u.resetPeek(), M;
  }
  function D(u, d) {
    const { currentType: L } = d;
    if (L !== 7)
      return !1;
    b(u);
    const M = u.currentPeek() === ".";
    return u.resetPeek(), M;
  }
  function g(u, d) {
    const { currentType: L } = d;
    if (L !== 8)
      return !1;
    b(u);
    const M = h(u.currentPeek());
    return u.resetPeek(), M;
  }
  function W(u, d) {
    const { currentType: L } = d;
    if (!(L === 7 || L === 11))
      return !1;
    b(u);
    const M = u.currentPeek() === ":";
    return u.resetPeek(), M;
  }
  function B(u, d) {
    const { currentType: L } = d;
    if (L !== 9)
      return !1;
    const M = () => {
      const oe = u.currentPeek();
      return oe === "{" ? h(u.peek()) : oe === "@" || oe === "|" || oe === ":" || oe === "." || oe === we || !oe ? !1 : oe === he ? (u.peek(), M()) : v(u, !1);
    }, ne = M();
    return u.resetPeek(), ne;
  }
  function R(u) {
    b(u);
    const d = u.currentPeek() === "|";
    return u.resetPeek(), d;
  }
  function v(u, d = !0) {
    const L = (ne = !1, oe = "") => {
      const K = u.currentPeek();
      return K === "{" || K === "@" || !K ? ne : K === "|" ? !(oe === we || oe === he) : K === we ? (u.peek(), L(!0, we)) : K === he ? (u.peek(), L(!0, he)) : !0;
    }, M = L();
    return d && u.resetPeek(), M;
  }
  function V(u, d) {
    const L = u.currentChar();
    return L === xe ? xe : d(L) ? (u.next(), L) : null;
  }
  function z(u) {
    const d = u.charCodeAt(0);
    return d >= 97 && d <= 122 || // a-z
    d >= 65 && d <= 90 || // A-Z
    d >= 48 && d <= 57 || // 0-9
    d === 95 || // _
    d === 36;
  }
  function U(u) {
    return V(u, z);
  }
  function k(u) {
    const d = u.charCodeAt(0);
    return d >= 97 && d <= 122 || // a-z
    d >= 65 && d <= 90 || // A-Z
    d >= 48 && d <= 57 || // 0-9
    d === 95 || // _
    d === 36 || // $
    d === 45;
  }
  function I(u) {
    return V(u, k);
  }
  function $(u) {
    const d = u.charCodeAt(0);
    return d >= 48 && d <= 57;
  }
  function w(u) {
    return V(u, $);
  }
  function x(u) {
    const d = u.charCodeAt(0);
    return d >= 48 && d <= 57 || // 0-9
    d >= 65 && d <= 70 || // A-F
    d >= 97 && d <= 102;
  }
  function j(u) {
    return V(u, x);
  }
  function Y(u) {
    let d = "", L = "";
    for (; d = w(u); )
      L += d;
    return L;
  }
  function G(u) {
    let d = "";
    for (; ; ) {
      const L = u.currentChar();
      if (L === "\\") {
        const M = u.peek();
        M === "{" || M === "}" || M === "@" || M === "|" || M === "\\" ? (d += L + M, u.next(), u.next()) : (u.resetPeek(), d += L, u.next());
      } else {
        if (L === "{" || L === "}" || L === "@" || L === "|" || !L)
          break;
        if (L === we || L === he)
          if (v(u))
            d += L, u.next();
          else {
            if (R(u))
              break;
            d += L, u.next();
          }
        else
          d += L, u.next();
      }
    }
    return d;
  }
  function ee(u) {
    N(u);
    let d = "", L = "";
    for (; d = I(u); )
      L += d;
    const M = u.currentChar();
    if (M && M !== "}" && M !== xe && M !== we && M !== he && M !== "　") {
      const ne = ue(u);
      return m(H.INVALID_TOKEN_IN_PLACEHOLDER, o(), 0, L + ne), L + ne;
    }
    return u.currentChar() === xe && m(H.UNTERMINATED_CLOSING_BRACE, o(), 0), L;
  }
  function te(u) {
    N(u);
    let d = "";
    return u.currentChar() === "-" ? (u.next(), d += `-${Y(u)}`) : d += Y(u), u.currentChar() === xe && m(H.UNTERMINATED_CLOSING_BRACE, o(), 0), d;
  }
  function le(u) {
    return u !== as && u !== he;
  }
  function Ue(u) {
    N(u), p(u, "'");
    let d = "", L = "";
    for (; d = V(u, le); )
      d === "\\" ? L += Le(u) : L += d;
    const M = u.currentChar();
    return M === he || M === xe ? (m(H.UNTERMINATED_SINGLE_QUOTE_IN_PLACEHOLDER, o(), 0), M === he && (u.next(), p(u, "'")), L) : (p(u, "'"), L);
  }
  function Le(u) {
    const d = u.currentChar();
    switch (d) {
      case "\\":
      case "'":
        return u.next(), `\\${d}`;
      case "u":
        return Pe(u, d, 4);
      case "U":
        return Pe(u, d, 6);
      default:
        return m(H.UNKNOWN_ESCAPE_SEQUENCE, o(), 0, d), "";
    }
  }
  function Pe(u, d, L) {
    p(u, d);
    let M = "";
    for (let ne = 0; ne < L; ne++) {
      const oe = j(u);
      if (!oe) {
        m(H.INVALID_UNICODE_ESCAPE_SEQUENCE, o(), 0, `\\${d}${M}${u.currentChar()}`);
        break;
      }
      M += oe;
    }
    return `\\${d}${M}`;
  }
  function Re(u) {
    return u !== "{" && u !== "}" && u !== we && u !== he;
  }
  function ue(u) {
    N(u);
    let d = "", L = "";
    for (; d = V(u, Re); )
      L += d;
    return L;
  }
  function Ne(u) {
    let d = "", L = "";
    for (; d = U(u); )
      L += d;
    return L;
  }
  function $e(u) {
    const d = (L) => {
      const M = u.currentChar();
      return M === "{" || M === "@" || M === "|" || M === "(" || M === ")" || !M || M === we ? L : (L += M, u.next(), d(L));
    };
    return d("");
  }
  function De(u) {
    N(u);
    const d = p(
      u,
      "|"
      /* TokenChars.Pipe */
    );
    return N(u), d;
  }
  function Et(u, d) {
    let L = null;
    switch (u.currentChar()) {
      case "{":
        return d.braceNest >= 1 && m(H.NOT_ALLOW_NEST_PLACEHOLDER, o(), 0), u.next(), L = E(
          d,
          2,
          "{"
          /* TokenChars.BraceLeft */
        ), N(u), d.braceNest++, L;
      case "}":
        return d.braceNest > 0 && d.currentType === 2 && m(H.EMPTY_PLACEHOLDER, o(), 0), u.next(), L = E(
          d,
          3,
          "}"
          /* TokenChars.BraceRight */
        ), d.braceNest--, d.braceNest > 0 && N(u), d.inLinked && d.braceNest === 0 && (d.inLinked = !1), L;
      case "@":
        return d.braceNest > 0 && m(H.UNTERMINATED_CLOSING_BRACE, o(), 0), L = Xe(u, d) || _(d), d.braceNest = 0, L;
      default: {
        let ne = !0, oe = !0, K = !0;
        if (R(u))
          return d.braceNest > 0 && m(H.UNTERMINATED_CLOSING_BRACE, o(), 0), L = E(d, 1, De(u)), d.braceNest = 0, d.inLinked = !1, L;
        if (d.braceNest > 0 && (d.currentType === 4 || d.currentType === 5 || d.currentType === 6))
          return m(H.UNTERMINATED_CLOSING_BRACE, o(), 0), d.braceNest = 0, gt(u, d);
        if (ne = A(u, d))
          return L = E(d, 4, ee(u)), N(u), L;
        if (oe = O(u, d))
          return L = E(d, 5, te(u)), N(u), L;
        if (K = C(u, d))
          return L = E(d, 6, Ue(u)), N(u), L;
        if (!ne && !oe && !K)
          return L = E(d, 12, ue(u)), m(H.INVALID_TOKEN_IN_PLACEHOLDER, o(), 0, L.value), N(u), L;
        break;
      }
    }
    return L;
  }
  function Xe(u, d) {
    const { currentType: L } = d;
    let M = null;
    const ne = u.currentChar();
    switch ((L === 7 || L === 8 || L === 11 || L === 9) && (ne === he || ne === we) && m(H.INVALID_LINKED_FORMAT, o(), 0), ne) {
      case "@":
        return u.next(), M = E(
          d,
          7,
          "@"
          /* TokenChars.LinkedAlias */
        ), d.inLinked = !0, M;
      case ".":
        return N(u), u.next(), E(
          d,
          8,
          "."
          /* TokenChars.LinkedDot */
        );
      case ":":
        return N(u), u.next(), E(
          d,
          9,
          ":"
          /* TokenChars.LinkedDelimiter */
        );
      default:
        return R(u) ? (M = E(d, 1, De(u)), d.braceNest = 0, d.inLinked = !1, M) : D(u, d) || W(u, d) ? (N(u), Xe(u, d)) : g(u, d) ? (N(u), E(d, 11, Ne(u))) : B(u, d) ? (N(u), ne === "{" ? Et(u, d) || M : E(d, 10, $e(u))) : (L === 7 && m(H.INVALID_LINKED_FORMAT, o(), 0), d.braceNest = 0, d.inLinked = !1, gt(u, d));
    }
  }
  function gt(u, d) {
    let L = {
      type: 13
      /* TokenTypes.EOF */
    };
    if (d.braceNest > 0)
      return Et(u, d) || _(d);
    if (d.inLinked)
      return Xe(u, d) || _(d);
    switch (u.currentChar()) {
      case "{":
        return Et(u, d) || _(d);
      case "}":
        return m(H.UNBALANCED_CLOSING_BRACE, o(), 0), u.next(), E(
          d,
          3,
          "}"
          /* TokenChars.BraceRight */
        );
      case "@":
        return Xe(u, d) || _(d);
      default: {
        if (R(u))
          return L = E(d, 1, De(u)), d.braceNest = 0, d.inLinked = !1, L;
        if (v(u))
          return E(d, 0, G(u));
        break;
      }
    }
    return L;
  }
  function bn() {
    const { currentType: u, offset: d, startLoc: L, endLoc: M } = c;
    return c.lastType = u, c.lastOffset = d, c.lastStartLoc = L, c.lastEndLoc = M, c.offset = s(), c.startLoc = o(), r.currentChar() === xe ? E(
      c,
      13
      /* TokenTypes.EOF */
    ) : gt(r, c);
  }
  return {
    nextToken: bn,
    currentOffset: s,
    currentPosition: o,
    context: l
  };
}
const Fc = "parser", Uc = /(?:\\\\|\\'|\\u([0-9a-fA-F]{4})|\\U([0-9a-fA-F]{6}))/g, $c = /\\([\\@{}|])/g;
function xc(e, t) {
  return t;
}
function Vc(e, t, n) {
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
function jc(e = {}) {
  const t = e.location !== !1, { onError: n } = e;
  function r(h, S, A, O, ...C) {
    const D = h.currentPosition();
    if (D.offset += O, D.column += O, n) {
      const g = t ? Jn(A, D) : null, W = _t(S, g, {
        domain: Fc,
        args: C
      });
      n(W);
    }
  }
  function s(h, S, A) {
    const O = { type: h };
    return t && (O.start = S, O.end = S, O.loc = { start: A, end: A }), O;
  }
  function o(h, S, A, O) {
    t && (h.end = S, h.loc && (h.loc.end = A));
  }
  function i(h, S) {
    const A = h.context(), O = s(3, A.offset, A.startLoc);
    return O.value = S.replace($c, xc), o(O, h.currentOffset(), h.currentPosition()), O;
  }
  function a(h, S) {
    const A = h.context(), { lastOffset: O, lastStartLoc: C } = A, D = s(5, O, C);
    return D.index = parseInt(S, 10), h.nextToken(), o(D, h.currentOffset(), h.currentPosition()), D;
  }
  function c(h, S) {
    const A = h.context(), { lastOffset: O, lastStartLoc: C } = A, D = s(4, O, C);
    return D.key = S, h.nextToken(), o(D, h.currentOffset(), h.currentPosition()), D;
  }
  function l(h, S) {
    const A = h.context(), { lastOffset: O, lastStartLoc: C } = A, D = s(9, O, C);
    return D.value = S.replace(Uc, Vc), h.nextToken(), o(D, h.currentOffset(), h.currentPosition()), D;
  }
  function f(h) {
    const S = h.nextToken(), A = h.context(), { lastOffset: O, lastStartLoc: C } = A, D = s(8, O, C);
    return S.type !== 11 ? (r(h, H.UNEXPECTED_EMPTY_LINKED_MODIFIER, A.lastStartLoc, 0), D.value = "", o(D, O, C), {
      nextConsumeToken: S,
      node: D
    }) : (S.value == null && r(h, H.UNEXPECTED_LEXICAL_ANALYSIS, A.lastStartLoc, 0, ke(S)), D.value = S.value || "", o(D, h.currentOffset(), h.currentPosition()), {
      node: D
    });
  }
  function m(h, S) {
    const A = h.context(), O = s(7, A.offset, A.startLoc);
    return O.value = S, o(O, h.currentOffset(), h.currentPosition()), O;
  }
  function E(h) {
    const S = h.context(), A = s(6, S.offset, S.startLoc);
    let O = h.nextToken();
    if (O.type === 8) {
      const C = f(h);
      A.modifier = C.node, O = C.nextConsumeToken || h.nextToken();
    }
    switch (O.type !== 9 && r(h, H.UNEXPECTED_LEXICAL_ANALYSIS, S.lastStartLoc, 0, ke(O)), O = h.nextToken(), O.type === 2 && (O = h.nextToken()), O.type) {
      case 10:
        O.value == null && r(h, H.UNEXPECTED_LEXICAL_ANALYSIS, S.lastStartLoc, 0, ke(O)), A.key = m(h, O.value || "");
        break;
      case 4:
        O.value == null && r(h, H.UNEXPECTED_LEXICAL_ANALYSIS, S.lastStartLoc, 0, ke(O)), A.key = c(h, O.value || "");
        break;
      case 5:
        O.value == null && r(h, H.UNEXPECTED_LEXICAL_ANALYSIS, S.lastStartLoc, 0, ke(O)), A.key = a(h, O.value || "");
        break;
      case 6:
        O.value == null && r(h, H.UNEXPECTED_LEXICAL_ANALYSIS, S.lastStartLoc, 0, ke(O)), A.key = l(h, O.value || "");
        break;
      default: {
        r(h, H.UNEXPECTED_EMPTY_LINKED_KEY, S.lastStartLoc, 0);
        const C = h.context(), D = s(7, C.offset, C.startLoc);
        return D.value = "", o(D, C.offset, C.startLoc), A.key = D, o(A, C.offset, C.startLoc), {
          nextConsumeToken: O,
          node: A
        };
      }
    }
    return o(A, h.currentOffset(), h.currentPosition()), {
      node: A
    };
  }
  function _(h) {
    const S = h.context(), A = S.currentType === 1 ? h.currentOffset() : S.offset, O = S.currentType === 1 ? S.endLoc : S.startLoc, C = s(2, A, O);
    C.items = [];
    let D = null;
    do {
      const B = D || h.nextToken();
      switch (D = null, B.type) {
        case 0:
          B.value == null && r(h, H.UNEXPECTED_LEXICAL_ANALYSIS, S.lastStartLoc, 0, ke(B)), C.items.push(i(h, B.value || ""));
          break;
        case 5:
          B.value == null && r(h, H.UNEXPECTED_LEXICAL_ANALYSIS, S.lastStartLoc, 0, ke(B)), C.items.push(a(h, B.value || ""));
          break;
        case 4:
          B.value == null && r(h, H.UNEXPECTED_LEXICAL_ANALYSIS, S.lastStartLoc, 0, ke(B)), C.items.push(c(h, B.value || ""));
          break;
        case 6:
          B.value == null && r(h, H.UNEXPECTED_LEXICAL_ANALYSIS, S.lastStartLoc, 0, ke(B)), C.items.push(l(h, B.value || ""));
          break;
        case 7: {
          const R = E(h);
          C.items.push(R.node), D = R.nextConsumeToken || null;
          break;
        }
      }
    } while (S.currentType !== 13 && S.currentType !== 1);
    const g = S.currentType === 1 ? S.lastOffset : h.currentOffset(), W = S.currentType === 1 ? S.lastEndLoc : h.currentPosition();
    return o(C, g, W), C;
  }
  function p(h, S, A, O) {
    const C = h.context();
    let D = O.items.length === 0;
    const g = s(1, S, A);
    g.cases = [], g.cases.push(O);
    do {
      const W = _(h);
      D || (D = W.items.length === 0), g.cases.push(W);
    } while (C.currentType !== 13);
    return D && r(h, H.MUST_HAVE_MESSAGES_IN_PLURAL, A, 0), o(g, h.currentOffset(), h.currentPosition()), g;
  }
  function b(h) {
    const S = h.context(), { offset: A, startLoc: O } = S, C = _(h);
    return S.currentType === 13 ? C : p(h, A, O, C);
  }
  function N(h) {
    const S = Mc(h, pe({}, e)), A = S.context(), O = s(0, A.offset, A.startLoc);
    return t && O.loc && (O.loc.source = h), O.body = b(S), e.onCacheKey && (O.cacheKey = e.onCacheKey(h)), A.currentType !== 13 && r(S, H.UNEXPECTED_LEXICAL_ANALYSIS, A.lastStartLoc, 0, h[A.offset] || ""), o(O, S.currentOffset(), S.currentPosition()), O;
  }
  return { parse: N };
}
function ke(e) {
  if (e.type === 13)
    return "EOF";
  const t = (e.value || "").replace(/\r?\n/gu, "\\n");
  return t.length > 10 ? t.slice(0, 9) + "…" : t;
}
function Bc(e, t = {}) {
  const n = {
    ast: e,
    helpers: /* @__PURE__ */ new Set()
  };
  return { context: () => n, helper: (o) => (n.helpers.add(o), o) };
}
function cs(e, t) {
  for (let n = 0; n < e.length; n++)
    Er(e[n], t);
}
function Er(e, t) {
  switch (e.type) {
    case 1:
      cs(e.cases, t), t.helper(
        "plural"
        /* HelperNameMap.PLURAL */
      );
      break;
    case 2:
      cs(e.items, t);
      break;
    case 6: {
      Er(e.key, t), t.helper(
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
function Hc(e, t = {}) {
  const n = Bc(e);
  n.helper(
    "normalize"
    /* HelperNameMap.NORMALIZE */
  ), e.body && Er(e.body, n);
  const r = n.context();
  e.helpers = Array.from(r.helpers);
}
function qc(e) {
  const t = e.body;
  return t.type === 2 ? ls(t) : t.cases.forEach((n) => ls(n)), e;
}
function ls(e) {
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
      e.static = _r(t);
      for (let n = 0; n < e.items.length; n++) {
        const r = e.items[n];
        (r.type === 3 || r.type === 9) && delete r.value;
      }
    }
  }
}
const Wc = "minifier";
function ct(e) {
  switch (e.t = e.type, e.type) {
    case 0: {
      const t = e;
      ct(t.body), t.b = t.body, delete t.body;
      break;
    }
    case 1: {
      const t = e, n = t.cases;
      for (let r = 0; r < n.length; r++)
        ct(n[r]);
      t.c = n, delete t.cases;
      break;
    }
    case 2: {
      const t = e, n = t.items;
      for (let r = 0; r < n.length; r++)
        ct(n[r]);
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
      ct(t.key), t.k = t.key, delete t.key, t.modifier && (ct(t.modifier), t.m = t.modifier, delete t.modifier);
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
        throw _t(H.UNHANDLED_MINIFIER_NODE_TYPE, null, {
          domain: Wc,
          args: [e.type]
        });
  }
  delete e.type;
}
const Yc = "parser";
function Gc(e, t) {
  const { filename: n, breakLineCode: r, needIndent: s } = t, o = t.location !== !1, i = {
    filename: n,
    code: "",
    column: 1,
    line: 1,
    offset: 0,
    map: void 0,
    breakLineCode: r,
    needIndent: s,
    indentLevel: 0
  };
  o && e.loc && (i.source = e.loc.source);
  const a = () => i;
  function c(b, N) {
    i.code += b;
  }
  function l(b, N = !0) {
    const h = N ? r : "";
    c(s ? h + "  ".repeat(b) : h);
  }
  function f(b = !0) {
    const N = ++i.indentLevel;
    b && l(N);
  }
  function m(b = !0) {
    const N = --i.indentLevel;
    b && l(N);
  }
  function E() {
    l(i.indentLevel);
  }
  return {
    context: a,
    push: c,
    indent: f,
    deindent: m,
    newline: E,
    helper: (b) => `_${b}`,
    needIndent: () => i.needIndent
  };
}
function Kc(e, t) {
  const { helper: n } = e;
  e.push(`${n(
    "linked"
    /* HelperNameMap.LINKED */
  )}(`), dt(e, t.key), t.modifier ? (e.push(", "), dt(e, t.modifier), e.push(", _type")) : e.push(", undefined, _type"), e.push(")");
}
function Xc(e, t) {
  const { helper: n, needIndent: r } = e;
  e.push(`${n(
    "normalize"
    /* HelperNameMap.NORMALIZE */
  )}([`), e.indent(r());
  const s = t.items.length;
  for (let o = 0; o < s && (dt(e, t.items[o]), o !== s - 1); o++)
    e.push(", ");
  e.deindent(r()), e.push("])");
}
function Qc(e, t) {
  const { helper: n, needIndent: r } = e;
  if (t.cases.length > 1) {
    e.push(`${n(
      "plural"
      /* HelperNameMap.PLURAL */
    )}([`), e.indent(r());
    const s = t.cases.length;
    for (let o = 0; o < s && (dt(e, t.cases[o]), o !== s - 1); o++)
      e.push(", ");
    e.deindent(r()), e.push("])");
  }
}
function Jc(e, t) {
  t.body ? dt(e, t.body) : e.push("null");
}
function dt(e, t) {
  const { helper: n } = e;
  switch (t.type) {
    case 0:
      Jc(e, t);
      break;
    case 1:
      Qc(e, t);
      break;
    case 2:
      Xc(e, t);
      break;
    case 6:
      Kc(e, t);
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
        throw _t(H.UNHANDLED_CODEGEN_NODE_TYPE, null, {
          domain: Yc,
          args: [t.type]
        });
  }
}
const zc = (e, t = {}) => {
  const n = F(t.mode) ? t.mode : "normal", r = F(t.filename) ? t.filename : "message.intl";
  t.sourceMap;
  const s = t.breakLineCode != null ? t.breakLineCode : n === "arrow" ? ";" : `
`, o = t.needIndent ? t.needIndent : n !== "arrow", i = e.helpers || [], a = Gc(e, {
    filename: r,
    breakLineCode: s,
    needIndent: o
  });
  a.push(n === "normal" ? "function __msg__ (ctx) {" : "(ctx) => {"), a.indent(o), i.length > 0 && (a.push(`const { ${_r(i.map((f) => `${f}: _${f}`), ", ")} } = ctx`), a.newline()), a.push("return "), dt(a, e), a.deindent(o), a.push("}"), delete e.helpers;
  const { code: c, map: l } = a.context();
  return {
    ast: e,
    code: c,
    map: l ? l.toJSON() : void 0
    // eslint-disable-line @typescript-eslint/no-explicit-any
  };
};
function Zc(e, t = {}) {
  const n = pe({}, t), r = !!n.jit, s = !!n.minify, o = n.optimize == null ? !0 : n.optimize, a = jc(n).parse(e);
  return r ? (o && qc(a), s && ct(a), { ast: a, code: "" }) : (Hc(a, n), zc(a, n));
}
function el() {
  typeof __INTLIFY_PROD_DEVTOOLS__ != "boolean" && (tt().__INTLIFY_PROD_DEVTOOLS__ = !1), typeof __INTLIFY_DROP_MESSAGE_COMPILER__ != "boolean" && (tt().__INTLIFY_DROP_MESSAGE_COMPILER__ = !1);
}
function Ce(e) {
  return Q(e) && gr(e) === 0 && (ve(e, "b") || ve(e, "body"));
}
const go = ["b", "body"];
function tl(e) {
  return Ge(e, go);
}
const yo = ["c", "cases"];
function nl(e) {
  return Ge(e, yo, []);
}
const bo = ["s", "static"];
function rl(e) {
  return Ge(e, bo);
}
const No = ["i", "items"];
function sl(e) {
  return Ge(e, No, []);
}
const Oo = ["t", "type"];
function gr(e) {
  return Ge(e, Oo);
}
const So = ["v", "value"];
function Ft(e, t) {
  const n = Ge(e, So);
  if (n != null)
    return n;
  throw Tt(t);
}
const To = ["m", "modifier"];
function ol(e) {
  return Ge(e, To);
}
const Ao = ["k", "key"];
function il(e) {
  const t = Ge(e, Ao);
  if (t)
    return t;
  throw Tt(
    6
    /* NodeTypes.Linked */
  );
}
function Ge(e, t, n) {
  for (let r = 0; r < t.length; r++) {
    const s = t[r];
    if (ve(e, s) && e[s] != null)
      return e[s];
  }
  return n;
}
const vo = [
  ...go,
  ...yo,
  ...bo,
  ...No,
  ...Ao,
  ...To,
  ...So,
  ...Oo
];
function Tt(e) {
  return new Error(`unhandled node type: ${e}`);
}
function In(e) {
  return (n) => al(n, e);
}
function al(e, t) {
  const n = tl(t);
  if (n == null)
    throw Tt(
      0
      /* NodeTypes.Resource */
    );
  if (gr(n) === 1) {
    const o = nl(n);
    return e.plural(o.reduce((i, a) => [
      ...i,
      us(e, a)
    ], []));
  } else
    return us(e, n);
}
function us(e, t) {
  const n = rl(t);
  if (n != null)
    return e.type === "text" ? n : e.normalize([n]);
  {
    const r = sl(t).reduce((s, o) => [...s, zn(e, o)], []);
    return e.normalize(r);
  }
}
function zn(e, t) {
  const n = gr(t);
  switch (n) {
    case 3:
      return Ft(t, n);
    case 9:
      return Ft(t, n);
    case 4: {
      const r = t;
      if (ve(r, "k") && r.k)
        return e.interpolate(e.named(r.k));
      if (ve(r, "key") && r.key)
        return e.interpolate(e.named(r.key));
      throw Tt(n);
    }
    case 5: {
      const r = t;
      if (ve(r, "i") && de(r.i))
        return e.interpolate(e.list(r.i));
      if (ve(r, "index") && de(r.index))
        return e.interpolate(e.list(r.index));
      throw Tt(n);
    }
    case 6: {
      const r = t, s = ol(r), o = il(r);
      return e.linked(zn(e, o), s ? zn(e, s) : void 0, e.type);
    }
    case 7:
      return Ft(t, n);
    case 8:
      return Ft(t, n);
    default:
      throw new Error(`unhandled node on format message part: ${n}`);
  }
}
const cl = "Detected HTML in '{source}' message. Recommend not using HTML messages to avoid XSS.";
function ll(e, t) {
  t && Rc(e) && Fe(hn(cl, { source: e }));
}
const ul = (e) => e;
let Ut = Z();
function fl(e, t = {}) {
  let n = !1;
  const r = t.onError || vc;
  return t.onError = (s) => {
    n = !0, r(s);
  }, { ...Zc(e, t), detectError: n };
}
// @__NO_SIDE_EFFECTS__
function dl(e, t) {
  if (!__INTLIFY_DROP_MESSAGE_COMPILER__ && F(e)) {
    const n = ie(t.warnHtmlMessage) ? t.warnHtmlMessage : !0;
    process.env.NODE_ENV !== "production" && ll(e, n);
    const s = (t.onCacheKey || ul)(e), o = Ut[s];
    if (o)
      return o;
    const { ast: i, detectError: a } = fl(e, {
      ...t,
      location: process.env.NODE_ENV !== "production",
      jit: !0
    }), c = In(i);
    return a ? c : Ut[s] = c;
  } else {
    if (process.env.NODE_ENV !== "production" && !Ce(e))
      return Fe(`the message that is resolve with key '${t.key}' is not supported for jit compilation`), (() => e);
    const n = e.cacheKey;
    if (n) {
      const r = Ut[n];
      return r || (Ut[n] = In(e));
    } else
      return In(e);
  }
}
let At = null;
function pl(e) {
  At = e;
}
function ml(e, t, n) {
  At && At.emit("i18n:init", {
    timestamp: Date.now(),
    i18n: e,
    version: t,
    meta: n
  });
}
const hl = /* @__PURE__ */ _l("function:translate");
function _l(e) {
  return (t) => At && At.emit(e, t);
}
const _e = {
  INVALID_ARGUMENT: Tc,
  // 17
  INVALID_DATE_ARGUMENT: 18,
  INVALID_ISO_DATE_ARGUMENT: 19,
  NOT_SUPPORT_NON_STRING_MESSAGE: 20,
  NOT_SUPPORT_LOCALE_PROMISE_VALUE: 21,
  NOT_SUPPORT_LOCALE_ASYNC_FUNCTION: 22,
  NOT_SUPPORT_LOCALE_TYPE: 23
}, El = 24;
function Ve(e) {
  return _t(e, null, process.env.NODE_ENV !== "production" ? { messages: gl } : void 0);
}
const gl = {
  [_e.INVALID_ARGUMENT]: "Invalid arguments",
  [_e.INVALID_DATE_ARGUMENT]: "The date provided is an invalid Date object.Make sure your Date represents a valid date.",
  [_e.INVALID_ISO_DATE_ARGUMENT]: "The argument provided is not a valid ISO date string",
  [_e.NOT_SUPPORT_NON_STRING_MESSAGE]: "Not support non-string message",
  [_e.NOT_SUPPORT_LOCALE_PROMISE_VALUE]: "cannot support promise value",
  [_e.NOT_SUPPORT_LOCALE_ASYNC_FUNCTION]: "cannot support async function",
  [_e.NOT_SUPPORT_LOCALE_TYPE]: "cannot support locale type"
};
function yr(e, t) {
  return t.locale != null ? fs(t.locale) : fs(e.locale);
}
let Pn;
function fs(e) {
  if (F(e))
    return e;
  if (re(e)) {
    if (e.resolvedOnce && Pn != null)
      return Pn;
    if (e.constructor.name === "Function") {
      const t = e();
      if (yc(t))
        throw Ve(_e.NOT_SUPPORT_LOCALE_PROMISE_VALUE);
      return Pn = t;
    } else
      throw Ve(_e.NOT_SUPPORT_LOCALE_ASYNC_FUNCTION);
  } else
    throw Ve(_e.NOT_SUPPORT_LOCALE_TYPE);
}
function yl(e, t, n) {
  return [.../* @__PURE__ */ new Set([
    n,
    ...ae(t) ? t : Q(t) ? Object.keys(t) : F(t) ? [t] : [n]
  ])];
}
function Zn(e, t, n) {
  const r = F(n) ? n : zt, s = e;
  s.__localeChainCache || (s.__localeChainCache = /* @__PURE__ */ new Map());
  let o = s.__localeChainCache.get(r);
  if (!o) {
    o = [];
    let i = [n];
    for (; ae(i); )
      i = ds(o, i, t);
    const a = ae(t) || !J(t) ? t : t.default ? t.default : null;
    i = F(a) ? [a] : a, ae(i) && ds(o, i, !1), s.__localeChainCache.set(r, o);
  }
  return o;
}
function ds(e, t, n) {
  let r = !0;
  for (let s = 0; s < t.length && ie(r); s++) {
    const o = t[s];
    F(o) && (r = bl(e, t[s], n));
  }
  return r;
}
function bl(e, t, n) {
  let r;
  const s = t.split("-");
  do {
    const o = s.join("-");
    r = Nl(e, o, n), s.splice(-1, 1);
  } while (s.length && r === !0);
  return r;
}
function Nl(e, t, n) {
  let r = !1;
  if (!e.includes(t) && (r = !0, t)) {
    r = t[t.length - 1] !== "!";
    const s = t.replace(/!/g, "");
    e.push(s), (ae(n) || J(n)) && n[s] && (r = n[s]);
  }
  return r;
}
const Ke = [];
Ke[
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
Ke[
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
Ke[
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
Ke[
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
Ke[
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
Ke[
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
Ke[
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
const Ol = /^\s?(?:true|false|-?[\d.]+|'[^']*'|"[^"]*")\s?$/;
function Sl(e) {
  return Ol.test(e);
}
function Tl(e) {
  const t = e.charCodeAt(0), n = e.charCodeAt(e.length - 1);
  return t === n && (t === 34 || t === 39) ? e.slice(1, -1) : e;
}
function Al(e) {
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
function vl(e) {
  const t = e.trim();
  return e.charAt(0) === "0" && isNaN(parseInt(e)) ? !1 : Sl(t) ? Tl(t) : "*" + t;
}
function Ll(e) {
  const t = [];
  let n = -1, r = 0, s = 0, o, i, a, c, l, f, m;
  const E = [];
  E[
    0
    /* Actions.APPEND */
  ] = () => {
    i === void 0 ? i = a : i += a;
  }, E[
    1
    /* Actions.PUSH */
  ] = () => {
    i !== void 0 && (t.push(i), i = void 0);
  }, E[
    2
    /* Actions.INC_SUB_PATH_DEPTH */
  ] = () => {
    E[
      0
      /* Actions.APPEND */
    ](), s++;
  }, E[
    3
    /* Actions.PUSH_SUB_PATH */
  ] = () => {
    if (s > 0)
      s--, r = 4, E[
        0
        /* Actions.APPEND */
      ]();
    else {
      if (s = 0, i === void 0 || (i = vl(i), i === !1))
        return !1;
      E[
        1
        /* Actions.PUSH */
      ]();
    }
  };
  function _() {
    const p = e[n + 1];
    if (r === 5 && p === "'" || r === 6 && p === '"')
      return n++, a = "\\" + p, E[
        0
        /* Actions.APPEND */
      ](), !0;
  }
  for (; r !== null; )
    if (n++, o = e[n], !(o === "\\" && _())) {
      if (c = Al(o), m = Ke[r], l = m[c] || m.l || 8, l === 8 || (r = l[0], l[1] !== void 0 && (f = E[l[1]], f && (a = o, f() === !1))))
        return;
      if (r === 7)
        return t;
    }
}
const ps = /* @__PURE__ */ new Map();
function Rl(e, t) {
  return Q(e) ? e[t] : null;
}
function Cl(e, t) {
  if (!Q(e))
    return null;
  let n = ps.get(t);
  if (n || (n = Ll(t), n && ps.set(t, n)), !n)
    return null;
  const r = n.length;
  let s = e, o = 0;
  for (; o < r; ) {
    const i = n[o];
    if (vo.includes(i) && Ce(s) || !Q(s) || !ve(s, i))
      return null;
    const a = s[i];
    if (a === void 0 || re(s))
      return null;
    s = a, o++;
  }
  return s;
}
const fe = {
  NOT_FOUND_KEY: 1,
  FALLBACK_TO_TRANSLATE: 2,
  CANNOT_FORMAT_NUMBER: 3,
  FALLBACK_TO_NUMBER_FORMAT: 4,
  CANNOT_FORMAT_DATE: 5,
  FALLBACK_TO_DATE_FORMAT: 6,
  EXPERIMENTAL_CUSTOM_MESSAGE_COMPILER: 7,
  INVALID_NUMBER_ARGUMENT: 8,
  INVALID_DATE_ARGUMENT: 9
}, at = 10, Il = {
  [fe.NOT_FOUND_KEY]: "Not found '{key}' key in '{locale}' locale messages.",
  [fe.FALLBACK_TO_TRANSLATE]: "Fall back to translate '{key}' key with '{target}' locale.",
  [fe.CANNOT_FORMAT_NUMBER]: "Cannot format a number value due to not supported Intl.NumberFormat.",
  [fe.FALLBACK_TO_NUMBER_FORMAT]: "Fall back to number format '{key}' key with '{target}' locale.",
  [fe.CANNOT_FORMAT_DATE]: "Cannot format a date value due to not supported Intl.DateTimeFormat.",
  [fe.FALLBACK_TO_DATE_FORMAT]: "Fall back to datetime format '{key}' key with '{target}' locale.",
  [fe.EXPERIMENTAL_CUSTOM_MESSAGE_COMPILER]: "This project is using Custom Message Compiler, which is an experimental feature. It may receive breaking changes or be removed in the future.",
  [fe.INVALID_NUMBER_ARGUMENT]: "Invalid argument for number formatting: expected a number but received '{value}'.",
  [fe.INVALID_DATE_ARGUMENT]: "Invalid argument for datetime formatting: expected a Date, number, or ISO string but received '{value}'."
};
function Be(e, ...t) {
  return hn(Il[e], ...t);
}
const Pl = "11.3.0", En = -1, zt = "en-US", pt = "", ms = (e) => `${e.charAt(0).toLocaleUpperCase()}${e.substr(1)}`;
function Dl() {
  return {
    upper: (e, t) => t === "text" && F(e) ? e.toUpperCase() : t === "vnode" && Q(e) && "__v_isVNode" in e ? e.children.toUpperCase() : e,
    lower: (e, t) => t === "text" && F(e) ? e.toLowerCase() : t === "vnode" && Q(e) && "__v_isVNode" in e ? e.children.toLowerCase() : e,
    capitalize: (e, t) => t === "text" && F(e) ? ms(e) : t === "vnode" && Q(e) && "__v_isVNode" in e ? ms(e.children) : e
  };
}
let Lo;
function wl(e) {
  Lo = e;
}
let Ro;
function kl(e) {
  Ro = e;
}
let Co;
function Ml(e) {
  Co = e;
}
let Io = null;
const Fl = /* @__NO_SIDE_EFFECTS__ */ (e) => {
  Io = e;
}, Ul = /* @__NO_SIDE_EFFECTS__ */ () => Io;
let Po = null;
const hs = (e) => {
  Po = e;
}, $l = () => Po;
let _s = 0;
function xl(e = {}) {
  const t = re(e.onWarn) ? e.onWarn : Fe, n = F(e.version) ? e.version : Pl, r = F(e.locale) || re(e.locale) ? e.locale : zt, s = re(r) ? zt : r, o = ae(e.fallbackLocale) || J(e.fallbackLocale) || F(e.fallbackLocale) || e.fallbackLocale === !1 ? e.fallbackLocale : s, i = J(e.messages) ? e.messages : Dn(s), a = J(e.datetimeFormats) ? e.datetimeFormats : Dn(s), c = J(e.numberFormats) ? e.numberFormats : Dn(s), l = pe(Z(), e.modifiers, Dl()), f = e.pluralRules || Z(), m = re(e.missing) ? e.missing : null, E = ie(e.missingWarn) || Jt(e.missingWarn) ? e.missingWarn : !0, _ = ie(e.fallbackWarn) || Jt(e.fallbackWarn) ? e.fallbackWarn : !0, p = !!e.fallbackFormat, b = !!e.unresolving, N = re(e.postTranslation) ? e.postTranslation : null, h = J(e.processor) ? e.processor : null, S = ie(e.warnHtmlMessage) ? e.warnHtmlMessage : !0, A = !!e.escapeParameter, O = re(e.messageCompiler) ? e.messageCompiler : Lo;
  process.env.NODE_ENV !== "production" && re(e.messageCompiler) && dc(Be(fe.EXPERIMENTAL_CUSTOM_MESSAGE_COMPILER));
  const C = re(e.messageResolver) ? e.messageResolver : Ro || Rl, D = re(e.localeFallbacker) ? e.localeFallbacker : Co || yl, g = Q(e.fallbackContext) ? e.fallbackContext : void 0, W = e, B = Q(W.__datetimeFormatters) ? W.__datetimeFormatters : /* @__PURE__ */ new Map(), R = Q(W.__numberFormatters) ? W.__numberFormatters : /* @__PURE__ */ new Map(), v = Q(W.__meta) ? W.__meta : {};
  _s++;
  const V = {
    version: n,
    cid: _s,
    locale: r,
    fallbackLocale: o,
    messages: i,
    modifiers: l,
    pluralRules: f,
    missing: m,
    missingWarn: E,
    fallbackWarn: _,
    fallbackFormat: p,
    unresolving: b,
    postTranslation: N,
    processor: h,
    warnHtmlMessage: S,
    escapeParameter: A,
    messageCompiler: O,
    messageResolver: C,
    localeFallbacker: D,
    fallbackContext: g,
    onWarn: t,
    __meta: v
  };
  return V.datetimeFormats = a, V.numberFormats = c, V.__datetimeFormatters = B, V.__numberFormatters = R, process.env.NODE_ENV !== "production" && (V.__v_emitter = W.__v_emitter != null ? W.__v_emitter : void 0), (process.env.NODE_ENV !== "production" || __INTLIFY_PROD_DEVTOOLS__) && ml(V, n, v), V;
}
const Dn = (e) => ({ [e]: Z() });
function gn(e, t) {
  return e instanceof RegExp ? e.test(t) : e;
}
function Do(e, t) {
  return e instanceof RegExp ? e.test(t) : e;
}
function br(e, t, n, r, s) {
  const { missing: o, onWarn: i } = e;
  if (process.env.NODE_ENV !== "production") {
    const a = e.__v_emitter;
    a && a.emit("missing", {
      locale: n,
      key: t,
      type: s,
      groupId: `${s}:${t}`
    });
  }
  if (o !== null) {
    const a = o(e, n, t, s);
    return F(a) ? a : t;
  } else
    return process.env.NODE_ENV !== "production" && Do(r, t) && i(Be(fe.NOT_FOUND_KEY, { key: t, locale: n })), t;
}
function bt(e, t, n) {
  const r = e;
  r.__localeChainCache = /* @__PURE__ */ new Map(), e.localeFallbacker(e, n, t);
}
function wo(e, t) {
  return e === t ? !1 : e.split("-")[0] === t.split("-")[0];
}
function Vl(e, t) {
  const n = t.indexOf(e);
  if (n === -1)
    return !1;
  for (let r = n + 1; r < t.length; r++)
    if (wo(e, t[r]))
      return !0;
  return !1;
}
const Es = typeof Intl < "u", ko = {
  dateTimeFormat: Es && typeof Intl.DateTimeFormat < "u",
  numberFormat: Es && typeof Intl.NumberFormat < "u"
};
function gs(e, ...t) {
  const { datetimeFormats: n, unresolving: r, fallbackLocale: s, onWarn: o, localeFallbacker: i } = e, { __datetimeFormatters: a } = e;
  if (process.env.NODE_ENV !== "production" && !ko.dateTimeFormat)
    return o(Be(fe.CANNOT_FORMAT_DATE)), pt;
  if (!F(t[0]) && !_o(t[0]) && !de(t[0]))
    return process.env.NODE_ENV !== "production" && o(Be(fe.INVALID_DATE_ARGUMENT, {
      value: String(t[0])
    })), pt;
  const [c, l, f, m] = er(...t), E = ie(f.missingWarn) ? f.missingWarn : e.missingWarn, _ = ie(f.fallbackWarn) ? f.fallbackWarn : e.fallbackWarn, p = !!f.part, b = yr(e, f), N = i(
    e,
    // eslint-disable-line @typescript-eslint/no-explicit-any
    s,
    b
  );
  if (!F(c) || c === "")
    return new Intl.DateTimeFormat(b.replace(/!/g, ""), m).format(l);
  let h = {}, S, A = null, O = b, C = null;
  const D = "datetime format";
  for (let B = 0; B < N.length; B++) {
    if (S = C = N[B], process.env.NODE_ENV !== "production" && b !== S && gn(_, c) && o(Be(fe.FALLBACK_TO_DATE_FORMAT, {
      key: c,
      target: S
    })), process.env.NODE_ENV !== "production" && b !== S) {
      const R = e.__v_emitter;
      R && R.emit("fallback", {
        type: D,
        key: c,
        from: O,
        to: C,
        groupId: `${D}:${c}`
      });
    }
    if (h = n[S] || {}, A = h[c], J(A))
      break;
    br(e, c, S, E, D), O = C;
  }
  if (!J(A) || !F(S))
    return r ? En : c;
  let g = `${S}__${c}`;
  _n(m) || (g = `${g}__${JSON.stringify(m)}`);
  let W = a.get(g);
  return W || (W = new Intl.DateTimeFormat(S, pe({}, A, m)), a.set(g, W)), p ? W.formatToParts(l) : W.format(l);
}
const Mo = [
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
function er(...e) {
  const [t, n, r, s] = e, o = Z();
  let i = Z(), a;
  if (F(t)) {
    const c = t.match(/(\d{4}-\d{2}-\d{2})(T|\s)?(.*)/);
    if (!c)
      throw Ve(_e.INVALID_ISO_DATE_ARGUMENT);
    const l = c[3] ? c[3].trim().startsWith("T") ? `${c[1].trim()}${c[3].trim()}` : `${c[1].trim()}T${c[3].trim()}` : c[1].trim();
    a = new Date(l);
    try {
      a.toISOString();
    } catch {
      throw Ve(_e.INVALID_ISO_DATE_ARGUMENT);
    }
  } else if (_o(t)) {
    if (isNaN(t.getTime()))
      throw Ve(_e.INVALID_DATE_ARGUMENT);
    a = t;
  } else if (de(t))
    a = t;
  else
    throw Ve(_e.INVALID_ARGUMENT);
  return F(n) ? o.key = n : J(n) && Object.keys(n).forEach((c) => {
    Mo.includes(c) ? i[c] = n[c] : o[c] = n[c];
  }), F(r) ? o.locale = r : J(r) && (i = r), J(s) && (i = s), [o.key || "", a, o, i];
}
function ys(e, t, n) {
  const r = e;
  for (const s in n) {
    const o = `${t}__${s}`;
    r.__datetimeFormatters.has(o) && r.__datetimeFormatters.delete(o);
  }
}
function bs(e, ...t) {
  const { numberFormats: n, unresolving: r, fallbackLocale: s, onWarn: o, localeFallbacker: i } = e, { __numberFormatters: a } = e;
  if (process.env.NODE_ENV !== "production" && !ko.numberFormat)
    return o(Be(fe.CANNOT_FORMAT_NUMBER)), pt;
  if (!de(t[0]))
    return process.env.NODE_ENV !== "production" && o(Be(fe.INVALID_NUMBER_ARGUMENT, {
      value: String(t[0])
    })), pt;
  const [c, l, f, m] = tr(...t), E = ie(f.missingWarn) ? f.missingWarn : e.missingWarn, _ = ie(f.fallbackWarn) ? f.fallbackWarn : e.fallbackWarn, p = !!f.part, b = yr(e, f), N = i(
    e,
    // eslint-disable-line @typescript-eslint/no-explicit-any
    s,
    b
  );
  if (!F(c) || c === "")
    return new Intl.NumberFormat(b.replace(/!/g, ""), m).format(l);
  let h = {}, S, A = null, O = b, C = null;
  const D = "number format";
  for (let B = 0; B < N.length; B++) {
    if (S = C = N[B], process.env.NODE_ENV !== "production" && b !== S && gn(_, c) && o(Be(fe.FALLBACK_TO_NUMBER_FORMAT, {
      key: c,
      target: S
    })), process.env.NODE_ENV !== "production" && b !== S) {
      const R = e.__v_emitter;
      R && R.emit("fallback", {
        type: D,
        key: c,
        from: O,
        to: C,
        groupId: `${D}:${c}`
      });
    }
    if (h = n[S] || {}, A = h[c], J(A))
      break;
    br(e, c, S, E, D), O = C;
  }
  if (!J(A) || !F(S))
    return r ? En : c;
  let g = `${S}__${c}`;
  _n(m) || (g = `${g}__${JSON.stringify(m)}`);
  let W = a.get(g);
  return W || (W = new Intl.NumberFormat(S, pe({}, A, m)), a.set(g, W)), p ? W.formatToParts(l) : W.format(l);
}
const Fo = [
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
function tr(...e) {
  const [t, n, r, s] = e, o = Z();
  let i = Z();
  if (!de(t))
    throw Ve(_e.INVALID_ARGUMENT);
  const a = t;
  return F(n) ? o.key = n : J(n) && Object.keys(n).forEach((c) => {
    Fo.includes(c) ? i[c] = n[c] : o[c] = n[c];
  }), F(r) ? o.locale = r : J(r) && (i = r), J(s) && (i = s), [o.key || "", a, o, i];
}
function Ns(e, t, n) {
  const r = e;
  for (const s in n) {
    const o = `${t}__${s}`;
    r.__numberFormatters.has(o) && r.__numberFormatters.delete(o);
  }
}
const jl = (e) => e, Bl = (e) => "", Hl = "text", ql = (e) => e.length === 0 ? "" : _r(e), Wl = bc;
function wn(e, t) {
  return e = Math.abs(e), t === 2 ? e === 1 ? 0 : 1 : Math.min(e, 2);
}
function Yl(e) {
  const t = de(e.pluralIndex) ? e.pluralIndex : -1;
  return de(e.named?.count) ? e.named.count : de(e.named?.n) ? e.named.n : t;
}
function Gl(e = {}) {
  const t = e.locale, n = Yl(e), r = F(t) && re(e.pluralRules?.[t]) ? e.pluralRules[t] : wn, s = r === wn ? void 0 : wn, o = (h) => h[r(n, h.length, s)], i = e.list || [], a = (h) => i[h], c = e.named || Z();
  de(e.pluralIndex) && (c.count ||= e.pluralIndex, c.n ||= e.pluralIndex);
  const l = (h) => c[h];
  function f(h, S) {
    const A = re(e.messages) ? e.messages(h, !!S) : Q(e.messages) ? e.messages[h] : !1;
    return A || (e.parent ? e.parent.message(h) : Bl);
  }
  const m = (h) => e.modifiers ? e.modifiers[h] : jl, E = re(e.processor?.normalize) ? e.processor.normalize : ql, _ = re(e.processor?.interpolate) ? e.processor.interpolate : Wl, p = F(e.processor?.type) ? e.processor.type : Hl, N = {
    list: a,
    named: l,
    plural: o,
    linked: (h, ...S) => {
      const [A, O] = S;
      let C = "text", D = "";
      S.length === 1 ? Q(A) ? (D = A.modifier || D, C = A.type || C) : F(A) && (D = A || D) : S.length === 2 && (F(A) && (D = A || D), F(O) && (C = O || C));
      const g = f(h, !0)(N), W = g === "" || g === void 0 ? h : g, B = (
        // The message in vnode resolved with linked are returned as an array by processor.nomalize
        C === "vnode" && ae(W) && D ? W[0] : W
      );
      return D ? m(D)(B, C) : B;
    },
    message: f,
    type: p,
    interpolate: _,
    normalize: E,
    values: pe(Z(), i, c)
  };
  return N;
}
const Os = () => "", Ae = (e) => re(e);
function Ss(e, ...t) {
  const { fallbackFormat: n, postTranslation: r, unresolving: s, messageCompiler: o, fallbackLocale: i, messages: a } = e, [c, l] = nr(...t), f = ie(l.missingWarn) ? l.missingWarn : e.missingWarn, m = ie(l.fallbackWarn) ? l.fallbackWarn : e.fallbackWarn, E = ie(l.escapeParameter) ? l.escapeParameter : e.escapeParameter, _ = !!l.resolvedMessage, p = F(l.default) || ie(l.default) ? ie(l.default) ? o ? c : () => c : l.default : n ? o ? c : () => c : null, b = n || p != null && (F(p) || re(p)), N = yr(e, l);
  E && Kl(l);
  let [h, S, A] = _ ? [
    c,
    N,
    a[N] || Z()
  ] : Uo(e, c, N, i, m, f), O = h, C = c;
  if (!_ && !(F(O) || Ce(O) || Ae(O)) && b && (O = p, C = O), !_ && (!(F(O) || Ce(O) || Ae(O)) || !F(S)))
    return s ? En : c;
  if (process.env.NODE_ENV !== "production" && F(O) && e.messageCompiler == null)
    return Fe(`The message format compilation is not supported in this build. Because message compiler isn't included. You need to pre-compilation all message format. So translate function return '${c}'.`), c;
  let D = !1;
  const g = () => {
    D = !0;
  }, W = Ae(O) ? O : $o(e, c, S, O, C, g);
  if (D)
    return O;
  const B = zl(e, S, A, l), R = Gl(B), v = Xl(e, W, R);
  let V = r ? r(v, c) : v;
  if (E && F(V) && (V = Ec(V)), process.env.NODE_ENV !== "production" || __INTLIFY_PROD_DEVTOOLS__) {
    const z = {
      timestamp: Date.now(),
      key: F(c) ? c : Ae(O) ? O.key : "",
      locale: S || (Ae(O) ? O.locale : ""),
      format: F(O) ? O : Ae(O) ? O.source : "",
      message: V
    };
    z.meta = pe({}, e.__meta, /* @__PURE__ */ Ul() || {}), hl(z);
  }
  return V;
}
function Kl(e) {
  ae(e.list) ? e.list = e.list.map((t) => F(t) ? ss(t) : t) : Q(e.named) && Object.keys(e.named).forEach((t) => {
    F(e.named[t]) && (e.named[t] = ss(e.named[t]));
  });
}
function Uo(e, t, n, r, s, o) {
  const { messages: i, onWarn: a, messageResolver: c, localeFallbacker: l } = e, f = l(e, r, n);
  let m = Z(), E, _ = null, p = n, b = null;
  const N = "translate";
  for (let h = 0; h < f.length; h++) {
    if (E = b = f[h], process.env.NODE_ENV !== "production" && n !== E && !wo(n, E) && gn(s, t) && a(Be(fe.FALLBACK_TO_TRANSLATE, {
      key: t,
      target: E
    })), process.env.NODE_ENV !== "production" && n !== E) {
      const C = e.__v_emitter;
      C && C.emit("fallback", {
        type: N,
        key: t,
        from: p,
        to: b,
        groupId: `${N}:${t}`
      });
    }
    m = i[E] || Z();
    let S = null, A, O;
    if (process.env.NODE_ENV !== "production" && He && (S = window.performance.now(), A = "intlify-message-resolve-start", O = "intlify-message-resolve-end", be && be(A)), (_ = c(m, t)) === null && (_ = m[t]), process.env.NODE_ENV !== "production" && He) {
      const C = window.performance.now(), D = e.__v_emitter;
      D && S && _ && D.emit("message-resolve", {
        type: "message-resolve",
        key: t,
        message: _,
        time: C - S,
        groupId: `${N}:${t}`
      }), A && O && be && ot && (be(O), ot("intlify message resolve", A, O));
    }
    if (F(_) || Ce(_) || Ae(_))
      break;
    if (!Vl(E, f)) {
      const C = br(
        e,
        // eslint-disable-line @typescript-eslint/no-explicit-any
        t,
        E,
        o,
        N
      );
      C !== t && (_ = C);
    }
    p = b;
  }
  return [_, E, m];
}
function $o(e, t, n, r, s, o) {
  const { messageCompiler: i, warnHtmlMessage: a } = e;
  if (Ae(r)) {
    const E = r;
    return E.locale = E.locale || n, E.key = E.key || t, E;
  }
  if (i == null) {
    const E = (() => r);
    return E.locale = n, E.key = t, E;
  }
  let c = null, l, f;
  process.env.NODE_ENV !== "production" && He && (c = window.performance.now(), l = "intlify-message-compilation-start", f = "intlify-message-compilation-end", be && be(l));
  const m = i(r, Ql(e, n, s, r, a, o));
  if (process.env.NODE_ENV !== "production" && He) {
    const E = window.performance.now(), _ = e.__v_emitter;
    _ && c && _.emit("message-compilation", {
      type: "message-compilation",
      message: r,
      time: E - c,
      groupId: `translate:${t}`
    }), l && f && be && ot && (be(f), ot("intlify message compilation", l, f));
  }
  return m.locale = n, m.key = t, m.source = r, m;
}
function Xl(e, t, n) {
  let r = null, s, o;
  process.env.NODE_ENV !== "production" && He && (r = window.performance.now(), s = "intlify-message-evaluation-start", o = "intlify-message-evaluation-end", be && be(s));
  const i = t(n);
  if (process.env.NODE_ENV !== "production" && He) {
    const a = window.performance.now(), c = e.__v_emitter;
    c && r && c.emit("message-evaluation", {
      type: "message-evaluation",
      value: i,
      time: a - r,
      groupId: `translate:${t.key}`
    }), s && o && be && ot && (be(o), ot("intlify message evaluation", s, o));
  }
  return i;
}
function nr(...e) {
  const [t, n, r] = e, s = Z();
  if (!F(t) && !de(t) && !Ae(t) && !Ce(t))
    throw Ve(_e.INVALID_ARGUMENT);
  const o = de(t) ? String(t) : (Ae(t), t);
  return de(n) ? s.plural = n : F(n) ? s.default = n : J(n) && !_n(n) ? s.named = n : ae(n) && (s.list = n), de(r) ? s.plural = r : F(r) ? s.default = r : J(r) && pe(s, r), [o, s];
}
function Ql(e, t, n, r, s, o) {
  return {
    locale: t,
    key: n,
    warnHtmlMessage: s,
    onError: (i) => {
      if (o && o(i), process.env.NODE_ENV !== "production") {
        const a = Jl(r), c = i.location && a && Nc(a, i.location.start.offset, i.location.end.offset), l = e.__v_emitter;
        l && a && l.emit("compile-error", {
          message: a,
          error: i.message,
          start: i.location && i.location.start.offset,
          end: i.location && i.location.end.offset,
          groupId: `translate:${n}`
        });
        const f = `Message compilation error: ${i.message}`;
        throw new SyntaxError(c ? `${f}
${c}` : f);
      }
      throw i;
    },
    onCacheKey: (i) => mc(t, n, i)
  };
}
function Jl(e) {
  if (F(e))
    return e;
  if (e.loc && e.loc.source)
    return e.loc.source;
}
function zl(e, t, n, r) {
  const { modifiers: s, pluralRules: o, messageResolver: i, fallbackLocale: a, fallbackWarn: c, missingWarn: l, fallbackContext: f } = e, E = {
    locale: t,
    modifiers: s,
    pluralRules: o,
    messages: (_, p) => {
      let b = i(n, _);
      if (b == null && (f || p)) {
        const [, , N] = Uo(
          f || e,
          // NOTE: if has fallbackContext, fallback to root, else if use linked, fallback to local context
          _,
          t,
          a,
          c,
          l
        );
        b = i(N, _);
      }
      if (F(b) || Ce(b)) {
        let N = !1;
        const S = $o(e, _, t, b, _, () => {
          N = !0;
        });
        return N ? Os : S;
      } else return Ae(b) ? b : Os;
    }
  };
  return e.processor && (E.processor = e.processor), r.list && (E.list = r.list), r.named && (E.named = r.named), de(r.plural) && (E.pluralIndex = r.plural), E;
}
el();
const Zl = "11.3.0";
function eu() {
  typeof __VUE_I18N_FULL_INSTALL__ != "boolean" && (tt().__VUE_I18N_FULL_INSTALL__ = !0), typeof __VUE_I18N_LEGACY_API__ != "boolean" && (tt().__VUE_I18N_LEGACY_API__ = !0), typeof __INTLIFY_DROP_MESSAGE_COMPILER__ != "boolean" && (tt().__INTLIFY_DROP_MESSAGE_COMPILER__ = !1), typeof __INTLIFY_PROD_DEVTOOLS__ != "boolean" && (tt().__INTLIFY_PROD_DEVTOOLS__ = !1);
}
const me = {
  // composer module errors
  UNEXPECTED_RETURN_TYPE: El,
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
function vt(e, ...t) {
  return _t(e, null, process.env.NODE_ENV !== "production" ? { messages: tu, args: t } : void 0);
}
const tu = {
  [me.UNEXPECTED_RETURN_TYPE]: "Unexpected return type in composer",
  [me.INVALID_ARGUMENT]: "Invalid argument",
  [me.MUST_BE_CALL_SETUP_TOP]: "Must be called at the top of a `setup` function",
  [me.NOT_INSTALLED]: "Need to install with `app.use` function",
  [me.UNEXPECTED_ERROR]: "Unexpected error",
  [me.REQUIRED_VALUE]: "Required in value: {0}",
  [me.INVALID_VALUE]: "Invalid value",
  [me.CANNOT_SETUP_VUE_DEVTOOLS_PLUGIN]: "Cannot setup vue-devtools plugin",
  [me.NOT_INSTALLED_WITH_PROVIDE]: "Need to install with `provide` function",
  [me.NOT_COMPATIBLE_LEGACY_VUE_I18N]: "Not compatible legacy VueI18n.",
  [me.NOT_AVAILABLE_COMPOSITION_IN_LEGACY]: "Not available Compostion API in Legacy API mode. Please make sure that the legacy API mode is working properly"
}, rr = /* @__PURE__ */ We("__translateVNode"), sr = /* @__PURE__ */ We("__datetimeParts"), or = /* @__PURE__ */ We("__numberParts"), ir = /* @__PURE__ */ We("__enableEmitter"), ar = /* @__PURE__ */ We("__disableEmitter"), nu = We("__setPluralRules"), xo = /* @__PURE__ */ We("__injectWithOption"), cr = /* @__PURE__ */ We("__dispose"), Me = {
  FALLBACK_TO_ROOT: at,
  // 10
  NOT_FOUND_PARENT_SCOPE: at + 1,
  IGNORE_OBJ_FLATTEN: at + 2,
  /**
   * @deprecated will be removed at vue-i18n v12
   */
  DEPRECATE_LEGACY_MODE: at + 3,
  /**
   * @deprecated will be removed at vue-i18n v12
   */
  DEPRECATE_TRANSLATE_CUSTOME_DIRECTIVE: at + 4,
  // duplicate `useI18n` calling
  DUPLICATE_USE_I18N_CALLING: at + 5
}, ru = {
  [Me.FALLBACK_TO_ROOT]: "Fall back to {type} '{key}' with root locale.",
  [Me.NOT_FOUND_PARENT_SCOPE]: "Not found parent scope. use the global scope.",
  [Me.IGNORE_OBJ_FLATTEN]: "Ignore object flatten: '{key}' key has an string value",
  /**
   * @deprecated will be removed at vue-i18n v12
   */
  [Me.DEPRECATE_LEGACY_MODE]: `Legacy API mode has been deprecated in v11. Use Composition API mode instead.
About how to use the Composition API mode, see https://vue-i18n.intlify.dev/guide/advanced/composition.html`,
  /**
   * @deprecated will be removed at vue-i18n v12
   */
  [Me.DEPRECATE_TRANSLATE_CUSTOME_DIRECTIVE]: "'v-t' has been deprecated in v11. Use translate APIs ('t' or '$t') instead.",
  [Me.DUPLICATE_USE_I18N_CALLING]: "Duplicate `useI18n` calling by local scope. Please don't call it on local scope, due to it does not work properly in component."
};
function Zt(e, ...t) {
  return hn(ru[e], ...t);
}
function Lt(e) {
  if (!Q(e) || Ce(e))
    return e;
  for (const t in e)
    if (ve(e, t))
      if (!t.includes("."))
        Q(e[t]) && Lt(e[t]);
      else {
        const n = t.split("."), r = n.length - 1;
        let s = e, o = !1;
        for (let i = 0; i < r; i++) {
          if (n[i] === "__proto__")
            throw new Error(`unsafe key: ${n[i]}`);
          if (n[i] in s || (s[n[i]] = Z()), !Q(s[n[i]])) {
            process.env.NODE_ENV !== "production" && Fe(Zt(Me.IGNORE_OBJ_FLATTEN, {
              key: n[i]
            })), o = !0;
            break;
          }
          s = s[n[i]];
        }
        if (o || (Ce(s) ? vo.includes(n[r]) || delete e[t] : (s[n[r]] = e[t], delete e[t])), !Ce(s)) {
          const i = s[n[r]];
          Q(i) && Lt(i);
        }
      }
  return e;
}
function Vo(e, t) {
  const { messages: n, __i18n: r, messageResolver: s, flatJson: o } = t, i = J(n) ? n : ae(r) ? Z() : { [e]: Z() };
  if (ae(r) && r.forEach((a) => {
    if ("locale" in a && "resource" in a) {
      const { locale: c, resource: l } = a;
      c ? (i[c] = i[c] || Z(), Ht(l, i[c])) : Ht(l, i);
    } else
      F(a) && Ht(JSON.parse(a), i);
  }), s == null && o)
    for (const a in i)
      ve(i, a) && Lt(i[a]);
  return i;
}
function jo(e) {
  return e.type;
}
function su(e, t, n) {
  let r = Q(t.messages) ? t.messages : Z();
  "__i18nGlobal" in n && (r = Vo(e.locale.value, {
    messages: r,
    __i18n: n.__i18nGlobal
  }));
  const s = Object.keys(r);
  s.length && s.forEach((o) => {
    e.mergeLocaleMessage(o, r[o]);
  });
  {
    if (Q(t.datetimeFormats)) {
      const o = Object.keys(t.datetimeFormats);
      o.length && o.forEach((i) => {
        e.mergeDateTimeFormat(i, t.datetimeFormats[i]);
      });
    }
    if (Q(t.numberFormats)) {
      const o = Object.keys(t.numberFormats);
      o.length && o.forEach((i) => {
        e.mergeNumberFormat(i, t.numberFormats[i]);
      });
    }
  }
}
function Ts(e) {
  return ii(ai, null, e, 0);
}
function Nr() {
  const e = "currentInstance";
  return e in Nn ? Nn[e] : Nn.getCurrentInstance();
}
const As = "__INTLIFY_META__", vs = () => [], ou = () => !1;
let Ls = 0;
function Rs(e) {
  return ((t, n, r, s) => e(n, r, Nr() || void 0, s));
}
const iu = /* @__NO_SIDE_EFFECTS__ */ () => {
  const e = Nr();
  let t = null;
  return e && (t = jo(e)[As]) ? { [As]: t } : null;
};
function au(e = {}) {
  const { __root: t, __injectWithOption: n } = e, r = t === void 0, s = e.flatJson, o = He ? rn : oi;
  let i = ie(e.inheritLocale) ? e.inheritLocale : !0;
  const a = o(
    // prettier-ignore
    t && i ? t.locale.value : F(e.locale) ? e.locale : zt
  ), c = o(
    // prettier-ignore
    t && i ? t.fallbackLocale.value : F(e.fallbackLocale) || ae(e.fallbackLocale) || J(e.fallbackLocale) || e.fallbackLocale === !1 ? e.fallbackLocale : a.value
  ), l = o(Vo(a.value, e)), f = o(J(e.datetimeFormats) ? e.datetimeFormats : { [a.value]: {} }), m = o(J(e.numberFormats) ? e.numberFormats : { [a.value]: {} });
  let E = t ? t.missingWarn : ie(e.missingWarn) || Jt(e.missingWarn) ? e.missingWarn : !0, _ = t ? t.fallbackWarn : ie(e.fallbackWarn) || Jt(e.fallbackWarn) ? e.fallbackWarn : !0, p = t ? t.fallbackRoot : ie(e.fallbackRoot) ? e.fallbackRoot : !0, b = !!e.fallbackFormat, N = re(e.missing) ? e.missing : null, h = re(e.missing) ? Rs(e.missing) : null, S = re(e.postTranslation) ? e.postTranslation : null, A = t ? t.warnHtmlMessage : ie(e.warnHtmlMessage) ? e.warnHtmlMessage : !0, O = !!e.escapeParameter;
  const C = t ? t.modifiers : J(e.modifiers) ? e.modifiers : {};
  let D = e.pluralRules || t && t.pluralRules, g;
  g = (() => {
    r && hs(null);
    const T = {
      version: Zl,
      locale: a.value,
      fallbackLocale: c.value,
      messages: l.value,
      modifiers: C,
      pluralRules: D,
      missing: h === null ? void 0 : h,
      missingWarn: E,
      fallbackWarn: _,
      fallbackFormat: b,
      unresolving: !0,
      postTranslation: S === null ? void 0 : S,
      warnHtmlMessage: A,
      escapeParameter: O,
      messageResolver: e.messageResolver,
      messageCompiler: e.messageCompiler,
      __meta: { framework: "vue" }
    };
    T.datetimeFormats = f.value, T.numberFormats = m.value, T.__datetimeFormatters = J(g) ? g.__datetimeFormatters : void 0, T.__numberFormatters = J(g) ? g.__numberFormatters : void 0, process.env.NODE_ENV !== "production" && (T.__v_emitter = J(g) ? g.__v_emitter : void 0);
    const P = xl(T);
    return r && hs(P), P;
  })(), bt(g, a.value, c.value);
  function B() {
    return [
      a.value,
      c.value,
      l.value,
      f.value,
      m.value
    ];
  }
  const R = Ye({
    get: () => a.value,
    set: (T) => {
      g.locale = T, a.value = T;
    }
  }), v = Ye({
    get: () => c.value,
    set: (T) => {
      g.fallbackLocale = T, c.value = T, bt(g, a.value, T);
    }
  }), V = Ye(() => l.value), z = /* @__PURE__ */ Ye(() => f.value), U = /* @__PURE__ */ Ye(() => m.value);
  function k() {
    return re(S) ? S : null;
  }
  function I(T) {
    S = T, g.postTranslation = T;
  }
  function $() {
    return N;
  }
  function w(T) {
    T !== null && (h = Rs(T)), N = T, g.missing = h;
  }
  function x(T, P) {
    return T !== "translate" || !P.resolvedMessage;
  }
  const j = (T, P, X, se, Qe, Je) => {
    B();
    let Oe;
    try {
      process.env.NODE_ENV !== "production" || __INTLIFY_PROD_DEVTOOLS__, r || (g.fallbackContext = t ? $l() : void 0), Oe = T(g);
    } finally {
      process.env.NODE_ENV !== "production" || __INTLIFY_PROD_DEVTOOLS__, r || (g.fallbackContext = void 0);
    }
    if (X !== "translate exists" && // for not `te` (e.g `t`)
    de(Oe) && Oe === En || X === "translate exists" && !Oe) {
      const [ze, Wo] = P();
      if (process.env.NODE_ENV !== "production" && t && F(ze) && x(X, Wo) && (p && (gn(_, ze) || Do(E, ze)) && Fe(Zt(Me.FALLBACK_TO_ROOT, {
        key: ze,
        type: X
      })), process.env.NODE_ENV !== "production")) {
        const { __v_emitter: Sr } = g;
        Sr && p && Sr.emit("fallback", {
          type: X,
          key: ze,
          to: "global",
          groupId: `${X}:${ze}`
        });
      }
      return t && p ? se(t) : Qe(ze);
    } else {
      if (Je(Oe))
        return Oe;
      throw vt(me.UNEXPECTED_RETURN_TYPE);
    }
  };
  function Y(...T) {
    return j((P) => Reflect.apply(Ss, null, [P, ...T]), () => nr(...T), "translate", (P) => Reflect.apply(P.t, P, [...T]), (P) => P, (P) => F(P));
  }
  function G(...T) {
    const [P, X, se] = T;
    if (se && !Q(se))
      throw vt(me.INVALID_ARGUMENT);
    return Y(P, X, pe({ resolvedMessage: !0 }, se || {}));
  }
  function ee(...T) {
    return j((P) => Reflect.apply(gs, null, [P, ...T]), () => er(...T), "datetime format", (P) => Reflect.apply(P.d, P, [...T]), () => pt, (P) => F(P) || ae(P));
  }
  function te(...T) {
    return j((P) => Reflect.apply(bs, null, [P, ...T]), () => tr(...T), "number format", (P) => Reflect.apply(P.n, P, [...T]), () => pt, (P) => F(P) || ae(P));
  }
  function le(T) {
    return T.map((P) => F(P) || de(P) || ie(P) ? Ts(String(P)) : P);
  }
  const Le = {
    normalize: le,
    interpolate: (T) => T,
    type: "vnode"
  };
  function Pe(...T) {
    return j((P) => {
      let X;
      const se = P;
      try {
        se.processor = Le, X = Reflect.apply(Ss, null, [se, ...T]);
      } finally {
        se.processor = null;
      }
      return X;
    }, () => nr(...T), "translate", (P) => P[rr](...T), (P) => [Ts(P)], (P) => ae(P));
  }
  function Re(...T) {
    return j((P) => Reflect.apply(bs, null, [P, ...T]), () => tr(...T), "number format", (P) => P[or](...T), vs, (P) => F(P) || ae(P));
  }
  function ue(...T) {
    return j((P) => Reflect.apply(gs, null, [P, ...T]), () => er(...T), "datetime format", (P) => P[sr](...T), vs, (P) => F(P) || ae(P));
  }
  function Ne(T) {
    D = T, g.pluralRules = D;
  }
  function $e(T, P) {
    return j(() => {
      if (!T)
        return !1;
      const X = F(P) ? P : a.value, se = F(P) ? [X] : Zn(g, c.value, X);
      for (let Qe = 0; Qe < se.length; Qe++) {
        const Je = Xe(se[Qe]);
        let Oe = g.messageResolver(Je, T);
        if (Oe === null && (Oe = Je[T]), Ce(Oe) || Ae(Oe) || F(Oe))
          return !0;
      }
      return !1;
    }, () => [T], "translate exists", (X) => Reflect.apply(X.te, X, [T, P]), ou, (X) => ie(X));
  }
  function De(T) {
    let P = null;
    const X = Zn(g, c.value, a.value);
    for (let se = 0; se < X.length; se++) {
      const Qe = l.value[X[se]] || {}, Je = g.messageResolver(Qe, T);
      if (Je != null) {
        P = Je;
        break;
      }
    }
    return P;
  }
  function Et(T) {
    const P = De(T);
    return P ?? (t ? t.tm(T) || {} : {});
  }
  function Xe(T) {
    return l.value[T] || {};
  }
  function gt(T, P) {
    if (s) {
      const X = { [T]: P };
      for (const se in X)
        ve(X, se) && Lt(X[se]);
      P = X[T];
    }
    l.value[T] = P, g.messages = l.value;
  }
  function bn(T, P) {
    l.value[T] = l.value[T] || {};
    const X = { [T]: P };
    if (s)
      for (const se in X)
        ve(X, se) && Lt(X[se]);
    P = X[T], Ht(P, l.value[T]), g.messages = l.value;
  }
  function u(T) {
    return f.value[T] || {};
  }
  function d(T, P) {
    f.value[T] = P, g.datetimeFormats = f.value, ys(g, T, P);
  }
  function L(T, P) {
    f.value[T] = pe(f.value[T] || {}, P), g.datetimeFormats = f.value, ys(g, T, P);
  }
  function M(T) {
    return m.value[T] || {};
  }
  function ne(T, P) {
    m.value[T] = P, g.numberFormats = m.value, Ns(g, T, P);
  }
  function oe(T, P) {
    m.value[T] = pe(m.value[T] || {}, P), g.numberFormats = m.value, Ns(g, T, P);
  }
  Ls++, t && He && (Mn(t.locale, (T) => {
    i && (a.value = T, g.locale = T, bt(g, a.value, c.value));
  }), Mn(t.fallbackLocale, (T) => {
    i && (c.value = T, g.fallbackLocale = T, bt(g, a.value, c.value));
  }));
  const K = {
    id: Ls,
    locale: R,
    fallbackLocale: v,
    get inheritLocale() {
      return i;
    },
    set inheritLocale(T) {
      i = T, T && t && (a.value = t.locale.value, c.value = t.fallbackLocale.value, bt(g, a.value, c.value));
    },
    get availableLocales() {
      return Object.keys(l.value).sort();
    },
    messages: V,
    get modifiers() {
      return C;
    },
    get pluralRules() {
      return D || {};
    },
    get isGlobal() {
      return r;
    },
    get missingWarn() {
      return E;
    },
    set missingWarn(T) {
      E = T, g.missingWarn = E;
    },
    get fallbackWarn() {
      return _;
    },
    set fallbackWarn(T) {
      _ = T, g.fallbackWarn = _;
    },
    get fallbackRoot() {
      return p;
    },
    set fallbackRoot(T) {
      p = T;
    },
    get fallbackFormat() {
      return b;
    },
    set fallbackFormat(T) {
      b = T, g.fallbackFormat = b;
    },
    get warnHtmlMessage() {
      return A;
    },
    set warnHtmlMessage(T) {
      A = T, g.warnHtmlMessage = T;
    },
    get escapeParameter() {
      return O;
    },
    set escapeParameter(T) {
      O = T, g.escapeParameter = T;
    },
    t: Y,
    getLocaleMessage: Xe,
    setLocaleMessage: gt,
    mergeLocaleMessage: bn,
    getPostTranslationHandler: k,
    setPostTranslationHandler: I,
    getMissingHandler: $,
    setMissingHandler: w,
    [nu]: Ne
  };
  return K.datetimeFormats = z, K.numberFormats = U, K.rt = G, K.te = $e, K.tm = Et, K.d = ee, K.n = te, K.getDateTimeFormat = u, K.setDateTimeFormat = d, K.mergeDateTimeFormat = L, K.getNumberFormat = M, K.setNumberFormat = ne, K.mergeNumberFormat = oe, K[xo] = n, K[rr] = Pe, K[sr] = ue, K[or] = Re, process.env.NODE_ENV !== "production" && (K[ir] = (T) => {
    g.__v_emitter = T;
  }, K[ar] = () => {
    g.__v_emitter = void 0;
  }), K;
}
function Cs(e, t) {
}
const Or = {
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
function cu({ slots: e }, t) {
  return t.length === 1 && t[0] === "default" ? (e.default ? e.default() : []).reduce((r, s) => [
    ...r,
    // prettier-ignore
    ...s.type === Wt ? s.children : [s]
  ], []) : t.reduce((n, r) => {
    const s = e[r];
    return s && (n[r] = s()), n;
  }, Z());
}
function Bo() {
  return Wt;
}
pe({
  keypath: {
    type: String,
    required: !0
  },
  plural: {
    type: [Number, String],
    validator: (e) => de(e) || !isNaN(e)
  }
}, Or);
function lu(e) {
  return ae(e) && !F(e[0]);
}
function Ho(e, t, n, r) {
  const { slots: s, attrs: o } = t;
  return () => {
    const i = { part: !0 };
    let a = Z();
    e.locale && (i.locale = e.locale), F(e.format) ? i.key = e.format : Q(e.format) && (F(e.format.key) && (i.key = e.format.key), a = Object.keys(e.format).reduce((E, _) => n.includes(_) ? pe(Z(), E, { [_]: e.format[_] }) : E, Z()));
    const c = r(e.value, i, a);
    let l = [i.key];
    ae(c) ? l = c.map((E, _) => {
      const p = s[E.type], b = p ? p({ [E.type]: E.value, index: _, parts: c }) : [E.value];
      return lu(b) && (b[0].key = `${E.type}-${_}`), b;
    }) : F(c) && (l = [c]);
    const f = pe(Z(), o), m = F(e.tag) || Q(e.tag) ? e.tag : Bo();
    return Fs(m, f, l);
  };
}
pe({
  value: {
    type: Number,
    required: !0
  },
  format: {
    type: [String, Object]
  }
}, Or);
const uu = /* @__PURE__ */ We("global-vue-i18n");
function yn(e = {}) {
  const t = Nr();
  if (t == null)
    throw vt(me.MUST_BE_CALL_SETUP_TOP);
  if (!t.isCE && t.appContext.app != null && !t.appContext.app.__VUE_I18N_SYMBOL__)
    throw vt(me.NOT_INSTALLED);
  const n = fu(t), r = pu(n), s = jo(t), o = du(e, s);
  if (o === "global")
    return su(r, e, s), r;
  if (o === "parent") {
    let c = mu(n, t, e.__useComponent);
    return c == null && (process.env.NODE_ENV !== "production" && Fe(Zt(Me.NOT_FOUND_PARENT_SCOPE)), c = r), c;
  }
  const i = n;
  let a = i.__getInstance(t);
  if (a == null) {
    const c = pe({}, e);
    "__i18n" in s && (c.__i18n = s.__i18n), r && (c.__root = r), a = au(c), i.__composerExtend && (a[cr] = i.__composerExtend(a)), _u(i, t, a), i.__setInstance(t, a);
  } else
    process.env.NODE_ENV !== "production" && o === "local" && Fe(Zt(Me.DUPLICATE_USE_I18N_CALLING));
  return a;
}
function fu(e) {
  const t = qt(e.isCE ? uu : e.appContext.app.__VUE_I18N_SYMBOL__);
  if (!t)
    throw vt(e.isCE ? me.NOT_INSTALLED_WITH_PROVIDE : me.UNEXPECTED_ERROR);
  return t;
}
function du(e, t) {
  return _n(e) ? "__i18n" in t ? "local" : "global" : e.useScope ? e.useScope : "local";
}
function pu(e) {
  return e.mode === "composition" ? e.global : e.global.__composer;
}
function mu(e, t, n = !1) {
  let r = null;
  const s = t.root;
  let o = hu(t, n);
  for (; o != null; ) {
    const i = e;
    if (e.mode === "composition")
      r = i.__getInstance(o);
    else if (__VUE_I18N_LEGACY_API__) {
      const a = i.__getInstance(o);
      a != null && (r = a.__composer, n && r && !r[xo] && (r = null));
    }
    if (r != null || s === o)
      break;
    o = o.parent;
  }
  return r;
}
function hu(e, t = !1) {
  return e == null ? null : t && e.vnode.ctx || e.parent;
}
function _u(e, t, n) {
  let r = null;
  ks(() => {
    if (process.env.NODE_ENV !== "production") {
      t.__VUE_I18N__ = n, r = Oc();
      const s = n;
      s[ir] && s[ir](r), r.on("*", Cs);
    }
  }, t), Ms(() => {
    const s = n;
    process.env.NODE_ENV !== "production" && (r && r.off("*", Cs), s[ar] && s[ar](), delete t.__VUE_I18N__), e.__deleteInstance(t);
    const o = s[cr];
    o && (o(), delete s[cr]);
  }, t);
}
pe({
  value: {
    type: [Number, Date],
    required: !0
  },
  format: {
    type: [String, Object]
  }
}, Or);
eu();
wl(dl);
kl(Cl);
Ml(Zn);
if (process.env.NODE_ENV !== "production" || __INTLIFY_PROD_DEVTOOLS__) {
  const e = tt();
  e.__INTLIFY__ = !0, pl(e.__INTLIFY_DEVTOOLS_GLOBAL_HOOK__);
}
process.env.NODE_ENV;
let en = null;
function Vf(e) {
  if (en !== null) {
    console.warn(
      "[LinID CoreLib] I18n has already been initialized. Re-initialization is ignored."
    );
    return;
  }
  en = e;
}
function Eu() {
  if (en === null)
    throw new Error(
      "[LinID CoreLib] I18n is not initialized. Call setI18nInstance() first."
    );
  return en;
}
function gu(e) {
  const { t, te: n, tm: r } = yn({
    useScope: "global",
    __i18n: Eu().global
  });
  function s(...c) {
    const [l, f, m] = c;
    return t(typeof f == "number" ? `${e}.${l}` : `${e}.${l}`, f, m);
  }
  function o(c) {
    return n(`${e}.${c}`);
  }
  function i(c) {
    return r(`${e}.${c}`);
  }
  function a(c, ...l) {
    return o(l[0]) ? s(...l) : c;
  }
  return {
    t: s,
    te: o,
    tm: i,
    translateOrDefault: a
  };
}
const yu = /* @__PURE__ */ new Set([
  es.BadRequest,
  es.NotFound
]), qo = "YYYY-MM-DD";
function bu(e) {
  return ce.isAxiosError(e) && e.response?.status != null && yu.has(e.response.status);
}
function Is(e, t) {
  return typeof e == "string" ? Xn(e, t || qo, !0) : Xn(e);
}
function Nu(e) {
  const { t } = gu(e);
  async function n(_, p, b) {
    try {
      return await lc(_, p, b), !0;
    } catch (N) {
      return bu(N) ? N.response.data.error : t("validation.unknownError");
    }
  }
  function r(_) {
    return _ == null || _ === "" ? t("validation.required") : !0;
  }
  function s(_) {
    return typeof _ != "string" || !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(_) ? t("validation.email") : !0;
  }
  function o(_, p) {
    return _ != null && _.length < p ? t("validation.minLength", { min: p }) : !0;
  }
  function i(_, p) {
    return _ != null && _.length > p ? t("validation.maxLength", { max: p }) : !0;
  }
  function a(_, p) {
    return p > _ ? t("validation.min", { min: p }) : !0;
  }
  function c(_, p) {
    return _ > p ? t("validation.max", { max: p }) : !0;
  }
  function l(_, p) {
    return new RegExp(p).test(_) ? !0 : t("validation.pattern", { pattern: p.toString() });
  }
  function f(_, p) {
    return _ == null ? !0 : (typeof _ == "object" ? p.some((N) => Qn(_, N)) : p.some((N) => N != null && String(N) === String(_))) ? t("validation.unique") : !0;
  }
  function m(_, p) {
    return _ == null || _ === "" || Is(_, p).isValid() ? !0 : t("validation.invalidDate", {
      format: p || qo
    });
  }
  function E(_, p) {
    return _ == null || _ === "" ? !0 : Is(_, p).isBefore(Xn(), "day") ? t("validation.dateInPast") : !0;
  }
  return {
    validateFromApi: n,
    required: r,
    email: s,
    minLength: o,
    maxLength: i,
    min: a,
    max: c,
    pattern: l,
    unique: f,
    validDate: m,
    dateNotInPast: E
  };
}
function jf() {
  function e(t) {
    qs.next({
      key: "notify",
      data: t
    });
  }
  return { Notify: e };
}
function Bf() {
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
const Ps = "YYYY/MM/DD";
function Ou(e) {
  const {
    validateFromApi: t,
    required: n,
    email: r,
    minLength: s,
    maxLength: o,
    min: i,
    max: a,
    pattern: c,
    unique: l,
    validDate: f,
    dateNotInPast: m
  } = Nu(e);
  return {
    validateFromApi: (E, _) => (p) => t(E, _, p),
    required: n,
    email: r,
    min: (E) => (_) => i(typeof _ == "string" ? parseFloat(_) : _, E),
    max: (E) => (_) => a(typeof _ == "string" ? parseFloat(_) : _, E),
    minLength: (E) => (_) => s(_, E),
    maxLength: (E) => (_) => o(_, E),
    pattern: (E) => (_) => c(_, E),
    unique: (E) => (_) => l(_, E),
    validDate: (E) => (_) => f(_, E || Ps),
    dateNotInPast: (E) => (_) => m(_, E || Ps)
  };
}
function Hf(e, t, n, r) {
  const { required: s, email: o, validateFromApi: i, ...a } = Ou(r), c = t.required ? [s] : [];
  return n.forEach((l) => {
    if (l === "email")
      c.push(o);
    else if (a[l] && t.inputSettings?.[l] != null) {
      const f = t.inputSettings[l];
      c.push(a[l](f));
    }
  }), t.hasValidations && c.push(i(e, t.name)), c;
}
let tn = null;
function qf(e) {
  if (tn !== null) {
    console.warn(
      "[LinID CoreLib] UI Design has already been initialized. Re-initialization is ignored."
    );
    return;
  }
  tn = e;
}
function Su() {
  if (tn === null)
    throw new Error(
      "[LinID CoreLib] UI Design is not initialized. Call setUiDesign() first."
    );
  return tn;
}
const Tu = [
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
], Au = [
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
], vu = [
  "icon",
  "activeClass",
  "exactActiveClass",
  "noCaps",
  "alert",
  "contentClass",
  "ripple"
], Lu = [
  "reveal",
  "revealOffset",
  "elevated",
  "bordered"
], Ru = ["inset"], Cu = ["shrink"], Iu = [
  "icon",
  "size",
  "fontSize",
  "color",
  "textColor",
  "square",
  "rounded"
], Pu = [
  "floating",
  "multiLine",
  "align",
  "color",
  "textColor",
  "transparent",
  "outline",
  "rounded"
], Du = [
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
], wu = ["dark", "square", "flat", "bordered"], ku = ["align", "vertical"], Mu = ["left", "right", "name", "size", "color"], Fu = [
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
], Uu = [
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
], $u = [
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
], xu = [
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
], Vu = [
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
], ju = [
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
], Bu = [
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
], Hu = ["size", "color", "thickness"], qu = [
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
], Wu = [
  "separator",
  "padding",
  "tag",
  "bordered",
  "dense",
  "dark"
], Yu = [
  "insetLevel",
  "tag",
  "activeClass",
  "exactActiveClass",
  "clickable",
  "manualFocus",
  "focused",
  "dark",
  "dense"
], Gu = [
  "avatar",
  "thumbnail",
  "side",
  "top",
  "noWrap"
], Ku = [
  "autofocus",
  "noErrorFocus",
  "noResetFocus",
  "greedy"
], Xu = ["lines", "overline", "caption", "header"], Qu = ["inlineActions", "dense", "rounded", "dark"], Ju = [
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
], zu = [
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
], Zu = [
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
], Ds = {
  "q-avatar": Iu,
  "q-badge": Pu,
  "q-banner": Qu,
  "q-btn": Tu,
  "q-btn-dropdown": qu,
  "q-card": wu,
  "q-card-actions": ku,
  "q-date": $u,
  "q-dialog": Bu,
  "q-file": Vu,
  "q-form": Ku,
  "q-header": Lu,
  "q-icon": Mu,
  "q-img": xu,
  "q-input": Uu,
  "q-item": Yu,
  "q-item-label": Xu,
  "q-item-section": Gu,
  "q-list": Wu,
  "q-menu": Ju,
  "q-route-tab": vu,
  "q-select": ju,
  "q-spinner": Hu,
  "q-table": Du,
  "q-tabs": Au,
  "q-toggle": Fu,
  "q-toolbar": Ru,
  "q-toolbar-title": Cu,
  "q-tree": zu,
  "q-splitter": Zu
};
function ws(e, t) {
  return t.split(".").reduce((n, r) => {
    if (n && typeof n == "object")
      return n[r];
  }, e);
}
function ef(e, t, n) {
  let r = ws(e, `${t}.${n}`);
  if (r === void 0 && (r = ws(e, `default.${n}`)), typeof r == "object")
    throw new Error(
      `[UiDesign] Value for '${t}.${n}' is a nested object or null, expected a primitive.`
    );
  return r;
}
function tf(e) {
  if (!(e in Ds))
    throw new Error(
      `[UiDesign] The component '${e}' is not supported for UI design retrieval.`
    );
  return Ds[e];
}
function Wf() {
  const e = Ye(() => Su());
  function t(n, r, s) {
    const o = tf(r), i = {};
    for (const a of o) {
      const c = s?.[a] ?? ef(e.value, n, `${r}.${String(a)}`);
      c !== void 0 && (i[a] = c);
    }
    return i;
  }
  return { ui: t };
}
function Yf() {
  function e(t) {
    return t.map((n) => ({
      type: n.type,
      key: n.key,
      value: n.value,
      children: e(n.nodes)
    }));
  }
  return {
    toQTreeNodes: e
  };
}
async function nf() {
  return (await qe().get("/metadata/entities")).data;
}
async function Gf(e) {
  return (await qe().get(
    `/metadata/entities/${e}`
  )).data;
}
async function rf() {
  return (await qe().get(
    "/metadata/routes"
  )).data;
}
const Kf = () => sf(an()), sf = /* @__PURE__ */ on("LinidConfigurationStore", {
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
          nf(),
          rf()
        ]);
        this.entities = e, this.apiEndpoints = t;
      } catch (e) {
        this.error = e instanceof Error ? e.message : "Failed to fetch configuration", console.error("[Linid CoreLib] Failed to fetch configuration:", e);
      } finally {
        this.loading = !1;
      }
    }
  }
}), Xf = () => of(an()), of = /* @__PURE__ */ on("LinidUiStore", {
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
}), Qf = () => af(an()), af = /* @__PURE__ */ on("LinidUserStore", {
  /**
   * State properties of the user store.
   * @returns The initial state of the user store.
   */
  state: () => ({
    user: { username: "", email: "", fullName: "", roles: [] },
    isAuthenticated: !1
  }),
  actions: {
    /**
     * Populates the store from the claims of an OIDC ID token.
     * Maps `sub` → username, `email`, `name` → fullName, `roles` → roles,
     * and flips `isAuthenticated` to true.
     * @param claims The decoded ID token claims provided by oidc-client-ts.
     */
    setUserFromClaims(e) {
      const t = e.roles;
      this.user = {
        username: e.sub,
        email: typeof e.email == "string" ? e.email : "",
        fullName: typeof e.name == "string" ? e.name : "",
        roles: Array.isArray(t) ? t.filter((n) => typeof n == "string") : []
      }, this.isAuthenticated = !0;
    }
  }
});
let nn = null;
function Jf(e) {
  if (nn !== null) {
    console.warn(
      "[LinID CoreLib] Nunjucks environment has already been initialized. Re-initialization is ignored."
    );
    return;
  }
  nn = e;
}
function zf() {
  if (nn === null)
    throw new Error(
      "[LinID CoreLib] Nunjucks environment is not initialized. Call setNunjucksEnv() first."
    );
  return nn;
}
var cf = /* @__PURE__ */ ((e) => (e.SETUP = "setup", e.CONFIGURE = "configure", e.INITIALIZE = "initialize", e.READY = "ready", e.POST_INIT = "postInit", e))(cf || {});
class Zf {
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
  constructor(t, n, r, s) {
    this.id = t, this.name = n, this.version = r, this.description = s;
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
  Zf as BasicRemoteModule,
  df as LinidZoneRenderer,
  cf as ModuleLifecyclePhase,
  ho as deepEqual,
  Qn as deepEqualUnordered,
  $f as deleteEntityById,
  xf as fromDot,
  rf as getApiEndpointsConfiguration,
  Ff as getEntities,
  nf as getEntitiesConfiguration,
  Uf as getEntityById,
  Gf as getEntityConfiguration,
  qe as getHttpClient,
  Eu as getI18nInstance,
  ci as getModuleFederation,
  ht as getModuleHostConfiguration,
  zf as getNunjucksEnv,
  an as getPiniaStore,
  Su as getUiDesign,
  ft as isObject,
  li as loadAsyncComponent,
  uc as merge,
  wf as registerModuleHostConfiguration,
  fc as renameKeys,
  kf as saveEntity,
  Df as setHttpClient,
  Vf as setI18nInstance,
  uf as setModuleFederation,
  Jf as setNunjucksEnv,
  ff as setPiniaStore,
  qf as setUiDesign,
  qs as uiEventSubject,
  Mf as updateEntity,
  pf as useDialog,
  Nu as useFieldValidation,
  Kf as useLinidConfigurationStore,
  Xf as useLinidUiStore,
  Qf as useLinidUserStore,
  pi as useLinidZoneStore,
  jf as useNotify,
  Bf as usePagination,
  Ou as useQuasarFieldValidation,
  Hf as useQuasarRules,
  gu as useScopedI18n,
  Yf as useTree,
  Wf as useUiDesign
};
