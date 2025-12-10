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

- `zones` is a reactive object.
- Each key corresponds to a zone, each value is an array of plugins for that zone.

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
export const MyComponent = defineComponent({
  /* ... */
});

// ✅ Correct - default export
export default defineComponent({
  /* ... */
});
```

---

## 🏢 Entity Configuration Types

Types for entity and route metadata returned by the backend API.

### LinIdAttributeConfiguration

Describes a single attribute of an entity (name, type, input settings, validations).

### LinIdEntityConfiguration

Represents an entity with its name and list of attributes.
Returned by `/metadata/entities` and `/metadata/entities/:entity`.

### LinIdRouteConfiguration

Represents a REST route (method, path, entity, variables).
Returned by `/metadata/routes`.

---

## 🗃️ LinIdConfigurationState

Represents the state of the Pinia store that manages entity and route configurations.

```ts
interface LinIdConfigurationState {
  /** List of entity configurations fetched from the backend. */
  entities: LinIdEntityConfiguration[];
  /** List of route configurations fetched from the backend. */
  routes: LinIdRouteConfiguration[];
  /** Indicates if the configuration is currently being loaded. */
  loading: boolean;
  /** Error message if the configuration fetch failed. */
  error: string | null;
}
```

---

## 🧰 Summary

| Type / Interface              | Purpose                                               |
| ----------------------------- | ----------------------------------------------------- |
| `LinidZoneEntry`              | Defines the contract for a plugin component           |
| `LinidZoneState`              | Defines the structure of the zone store               |
| `RemoteComponentModule`       | Defines the structure of a federated component module |
| `LinIdAttributeConfiguration` | Describes an entity attribute                         |
| `LinIdEntityConfiguration`    | Describes an entity and its attributes                |
| `LinIdRouteConfiguration`     | Describes a REST route                                |
| `LinIdConfigurationState`     | Defines the structure of the configuration store      |

These types enforce **consistency and type safety** across all front-end modules and plugins.

---

> Additional types and interfaces will be added as new features are implemented in the library.
