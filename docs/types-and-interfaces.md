# TypeScript Types & Interfaces 🧩

This document explains the **types and interfaces** used in `linid-im-front-corelib`.

---

## 🔌 LinidZoneEntry

Represents a plugin entry that can be rendered inside a zone.

```ts
export interface LinidZoneEntry {
  /** Path or identifier of the plugin module */
  plugin: string;

  /** Props forwarded to the plugin component */
  props?: Record<string, unknown>;
}
```

**Usage:**
All plugins registered to the `Linid Zone Store` must implement this interface.

---

## 🧱 LinidZoneState

Represents the state of the Pinia store that manages all plugin zones.

```ts
interface LinidZoneState {
  /** Map of zone names to their registered plugin entries */
  zones: Record<string, LinidZoneEntry[]>;
}
```

* `zones` is a reactive object.
* Each key corresponds to a zone, each value is an array of plugins for that zone.

---

## 📦 RemoteComponentModule

Defines the structure of a Vue component module loaded via Module Federation.

```ts
export interface RemoteComponentModule {
  /** The default exported Vue component */
  default: Component;
}
```

**Usage:**

Used internally by [`loadAsyncComponent`](./helpers.md#loadasynccomponent) to ensure type safety when loading federated components.

**Remote modules must export a default component:**

```vue
<!-- ✅ Correct - .vue file -->
<template>
  <div>My Component</div>
</template>

<script setup lang="ts">
// Default export is automatic
</script>
```

```typescript
// ❌ Wrong - named export only
export const MyComponent = defineComponent({ /* ... */ });

// ✅ Correct - default export
export default defineComponent({ /* ... */ });
```

---

## 🧰 Summary

| Type / Interface        | Purpose                                               |
| ----------------------- | ----------------------------------------------------- |
| `LinidZoneEntry`        | Defines the contract for a plugin component           |
| `LinidZoneState`        | Defines the structure of the zone store               |
| `RemoteComponentModule` | Defines the structure of a federated component module |

These types enforce **consistency and type safety** across all front-end modules and plugins.

---

> Additional types and interfaces will be added as new features are implemented in the library.
