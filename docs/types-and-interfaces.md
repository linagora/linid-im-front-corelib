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

### LinidAttributeConfiguration

Describes a single attribute of an entity (name, type, input settings, validations).

### LinidEntityConfiguration

Represents an entity with its name and list of attributes. Returned by `/metadata/entities` and `/metadata/entities/:entity`.

### LinidApiEndpointConfiguration

Represents a REST route (method, path, entity, variables). Returned by `/metadata/routes`.

---

## 🗃️ LinidConfigurationState

Represents the state of the Pinia store that manages entity and route configurations.

```ts
interface LinidConfigurationState {
  /** List of entity configurations fetched from the backend. */
  entities: LinidEntityConfiguration[];
  /** List of api endpoint configurations fetched from the backend. */
  apiEndpoints: LinidApiEndpointConfiguration[];
  /** Indicates if the configuration is currently being loaded. */
  loading: boolean;
  /** Error message if the configuration fetch failed. */
  error: string | null;
}
```

---

## 📄 Pagination & Page Types

Utility types used to represent **paginated API responses**, **standard pagination**, and **Quasar QTable events**. Defined in `src/type/page.ts`.

---

## 📘 Page<T>

Represents a paginated result returned by the backend API.

This structure closely follows **Spring Data’s `Page<T>`** model.

```ts
export interface Page<T> {
  /** The content (list of items) on the current page. */
  content: T[];

  /** Pagination information about the current request. */
  pageable: {
    /** Sorting details applied on this pageable request. */
    sort: {
      sorted: boolean;
      unsorted: boolean;
      empty: boolean;
    };

    /** Zero-based page index. */
    pageNumber: number;

    /** Size of the page requested. */
    pageSize: number;

    /** Offset of the first item in this page relative to the entire data set. */
    offset: number;

    /** Whether the page is paged. */
    paged: boolean;

    /** Whether the page is unpaged. */
    unpaged: boolean;
  };

  /** Total number of pages available. */
  totalPages: number;

  /** Total number of elements across all pages. */
  totalElements: number;

  /** Whether this page is the last page. */
  last: boolean;

  /** Whether this page is the first page. */
  first: boolean;

  /** Overall sorting information (duplicate of pageable.sort). */
  sort: {
    sorted: boolean;
    unsorted: boolean;
    empty: boolean;
  };

  /** Number of elements on this page. */
  numberOfElements: number;

  /** Size of the page requested (duplicate of pageable.pageSize). */
  size: number;

  /** Current page number (zero-based). */
  number: number;

  /** Whether the current page content is empty. */
  empty: boolean;
}
```

**Usage:**

- Returned by API services
- Stored in Pinia stores
- Consumed by data tables and lists

---

## 📑 Pagination

Standard pagination model used when querying the backend.

```ts
export interface Pagination {
  /** Current page number (0-based). */
  page: number;

  /** Page size (number of items per page). */
  size: number;

  /** Property name used for ordering. */
  sort: string;

  /** Sort direction. */
  direction: 'asc' | 'desc';
}
```

---

## 📊 QTableRequestEvent

Payload emitted by Quasar `QTable` when using **server-side pagination**.

```ts
export interface QTableRequestEvent {
  /** Pagination sent by the QTable */
  pagination: QuasarPagination;

  /** Global filter string */
  filter?: string;

  /** Full QTable props */
  props?: Record<string, unknown>;
}
```

---

## 🧮 QuasarPagination

Pagination structure used internally by Quasar `QTable`.

```ts
export interface QuasarPagination {
  /** Current page number (1-based). */
  page: number;

  /** Number of rows displayed per page. */
  rowsPerPage: number;

  /** Total number of rows (optional). */
  rowsNumber?: number;

  /** Column used for sorting (optional). */
  sortBy?: string;

  /** Whether sorting is descending (optional). */
  descending?: boolean;
}
```

**Notes:**

- Page indexing is **1-based**, unlike backend pagination.
- Usually converted to `Pagination` before API requests.

---

## 🔍 QueryFilter

Represents a flexible set of query parameters used to filter API requests.

```ts
export interface QueryFilter {
  [key: string]: string | number | boolean | undefined;
}
```

**Usage:**

- Passed as query params to API services
- Enables dynamic filtering without strong typing per endpoint

---

## 🧰 Summary

| Type / Interface                | Purpose                                               |
| ------------------------------- | ----------------------------------------------------- |
| `LinidZoneEntry`                | Defines the contract for a plugin component           |
| `LinidZoneState`                | Defines the structure of the zone store               |
| `RemoteComponentModule`         | Defines the structure of a federated component module |
| `LinidAttributeConfiguration`   | Describes an entity attribute                         |
| `LinidEntityConfiguration`      | Describes an entity and its attributes                |
| `LinidApiEndpointConfiguration` | Describes a REST route                                |
| `LinidConfigurationState`       | Defines the structure of the configuration store      |
| `LinidRoute`                    | Defines the structure of a top-level route            |
| `LinidSubRoute`                 | Defines the structure of a nested child route         |
| `Page<T>`                       | Paginated API response                                |
| `Pagination`                    | Backend pagination model                              |
| `QTableRequestEvent`            | Quasar table server-side request payload              |
| `QuasarPagination`              | Quasar-specific pagination structure                  |
| `QueryFilter`                   | Flexible query parameter map                          |

These types enforce **consistency and type safety** across all front-end modules and plugins.

---

> Additional types and interfaces will be added as new features are implemented in the library.
