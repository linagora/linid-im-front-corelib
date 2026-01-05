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

- All plugins registered to the `Linid Zone Store` must implement this interface.

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

## 📦 Modules types

### FederatedModule

Defines the structure of a remote module loaded via Module Federation.

```ts
/**
 * ESM namespace object returned when loading a remote module through
 * Module Federation (for example via `loadRemote`).
 *
 * In a Vite + native ESM environment, federated modules are not auto-unwrapped:
 * the effective export is exposed on the `default` property of the namespace.
 * @template T Type of the value exported as `default` by the federated module.
 */
export interface FederatedModule<T> {
  /**
   * Default export of the federated module.
   *
   * This commonly represents a concrete runtime value such as a lifecycle
   * instance, service, or class instance, but may also be a function, class,
   * or plain object depending on the remote’s contract.
   */
  default: T;
}
```

**Usage:**

- Used internally by [`loadAsyncComponent`](./helpers.md#loadasynccomponent) to ensure type safety when loading federated components.

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

### ModuleHostConfig

Defines the configuration provided to a remote module by the host application.

```ts
export interface ModuleHostConfig {
  /**
   * Unique identifier for this instance of the module.
   * Typically used to differentiate multiple instances of the same module within the host.
   */
  instanceId: string;

  /**
   * Module Federation remote name (must match a key in remotes.json).
   *
   * This is the name used to load the remote module via Module Federation.
   */
  remoteName: string;

  /**
   * Name of the entity used in the host configuration.
   * Allows the module to retrieve associated attributes and other information for this entity.
   */
  entity: string;

  /**
   * Base URL for the module's API endpoints.
   * All API requests from the module should be prefixed with this endpoint.
   */
  apiEndpoint: string;

  /**
   * Base path (default route) for the module in the host application.
   * Used to mount the module at a specific route.
   */
  basePath: string;
}
```

**Usage:**

- Passed to remote modules during their lifecycle `configure` phase.

### RemoteModule

Defines the structure of a remote module loaded via Module Federation.

```ts
xport interface RemoteModule extends ModuleLifecycleHooks {
  /**
   * Unique identifier for the module.
   *
   * Should be in kebab-case and match the ID in the module configuration.
   */
  id: string;

  /**
   * Human-readable name of the module.
   */
  name: string;

  /**
   * Version of the module.
   *
   * Should follow semantic versioning (semver).
   */
  version: string;

  /**
   * Optional description of the module.
   *
   * Provide a brief description of what the module does.
   */
  description?: string;
}
```

**Usage:**

- Used to define the contract for remote modules loaded into the host application.

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

## 🛣️ LinidRoute & LinidRoutes

Defines the structure for application routes, supporting recursive nesting for multi-level routes.

```ts
export type LinidRoutes = LinidRoute[];

export interface LinidRoute {
  /** Absolute or nested route path (e.g. "/admin" or "settings"). */
  path: string;
  /** Remote component name, resolved through Module Federation (e.g. "remoteA/ComponentX"). */
  component: string;
  /** Optional list of child routes for nested routing. */
  children?: LinidRoutes;
}
```

**Usage:**

- Used to describe both top-level and nested routes in the application.
- Enables recursive route definitions for complex navigation structures.

---

## 📄 Pagination & Page Types

Utility types used to represent **paginated API responses**, **standard pagination**, and **Quasar QTable events**. Defined in `src/type/page.ts`.

---

### Page<T>

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

### Pagination

Standard pagination model used when querying the backend.

```ts
export interface Pagination {
  /** Current page number (0-based). */
  page: number;

  /** Page size (number of items per page). */
  size: number;

  /** Property name used for ordering. */
  sort?: string;

  /** Sort direction. */
  direction?: 'asc' | 'desc';
}
```

---

### QTableRequestEvent

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

### QuasarPagination

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

### QueryFilter

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

## 🔄 Module lifecycle types

Types related to module lifecycle management.

### ModuleLifecyclePhase

Defines the sequence of initialization steps for remote modules. Each phase is executed in order for all modules before moving to the next phase.

```ts
export enum ModuleLifecyclePhase {
  /**
   * Initial setup phase - module is being loaded.
   *
   * Use this phase to validate dependencies and prepare the module.
   */
  SETUP = 'setup',

  /**
   * Configuration phase - module receives configuration.
   *
   * Use this phase to receive and validate the host configuration.
   */
  CONFIGURE = 'configure',

  /**
   * Initialization phase - module initializes its core features.
   *
   * Use this phase to register stores and initialize resources.
   */
  INITIALIZE = 'initialize',

  /**
   * Ready phase - module is ready to be used.
   *
   * Use this phase to perform final checks and emit ready state.
   */
  READY = 'ready',

  /**
   * Post-initialization phase - final setup after all modules are ready.
   *
   * Use this phase for cross-module integrations and final setup.
   */
  POST_INIT = 'postInit',
}
```

**Usage:**

- Used internally by the module loader to manage the lifecycle of remote modules.

### ModuleLifecycleResult

Result of a lifecycle phase execution. Modules should return this from their lifecycle hooks to indicate success or failure of the phase.

```ts
export interface ModuleLifecycleResult {
  /**
   * Whether the phase completed successfully.
   *
   * If false, the module will continue through remaining phases but
   * the error will be logged.
   */
  success: boolean;

  /**
   * Error message if the phase failed.
   *
   * Only present when success is false.
   */
  error?: string;

  /**
   * Additional metadata from the phase.
   *
   * Use this to provide debugging information or statistics.
   */
  metadata?: Record<string, unknown>;
}
```

**Usage:**

- Used as the return type for module lifecycle hooks to indicate phase outcomes.

### ModuleLifecycleHooks

Remote modules should implement these hooks to participate in the lifecycle. All hooks are optional - implement only what your module needs.

```ts
export interface ModuleLifecycleHooks {
  /**
   * Called when the module is first loaded.
   *
   * Use this to prepare the module for initialization and validate
   * that all required dependencies are available.
   * @returns Promise resolving to the lifecycle result.
   */
  setup(): Promise<ModuleLifecycleResult>;

  /**
   * Called to configure the module with application-specific settings.
   *
   * Use this to receive and validate the host configuration for your module.
   * This is where you should check that all required configuration is present.
   * @param config - Module-specific configuration from host (from module-<name>.json).
   * @returns Promise resolving to the lifecycle result.
   */
  configure(config: ModuleHostConfig): Promise<ModuleLifecycleResult>;

  /**
   * Called to initialize the module's core functionality.
   *
   * Use this to register Pinia stores and initialize any resources
   * your module needs to function.
   * @returns Promise resolving to the lifecycle result.
   */
  initialize(): Promise<ModuleLifecycleResult>;

  /**
   * Called when the module is ready to be used.
   *
   * Use this to perform final checks and emit ready state.
   * At this point, all other modules have completed initialization.
   * @returns Promise resolving to the lifecycle result.
   */
  ready(): Promise<ModuleLifecycleResult>;

  /**
   * Called after all modules have been initialized.
   *
   * Use this for cross-module integrations and final setup that requires
   * all modules to be ready.
   * @returns Promise resolving to the lifecycle result.
   */
  postInit(): Promise<ModuleLifecycleResult>;
}
```

**Usage:**

- Remote modules should implement these hooks to participate in the lifecycle management.

---

## 🧰 Summary

| Type / Interface                | Purpose                                               |
| ------------------------------- | ----------------------------------------------------- |
| `LinidZoneEntry`                | Defines the contract for a plugin component           |
| `LinidZoneState`                | Defines the structure of the zone store               |
| `FederatedModule`               | Defines the structure of a federated component module |
| `ModuleHostConfig`              | Configuration provided to remote modules              |
| `RemoteModule`                  | Defines the structure of a remote module              |
| `LinidAttributeConfiguration`   | Describes an entity attribute                         |
| `LinidEntityConfiguration`      | Describes an entity and its attributes                |
| `LinidApiEndpointConfiguration` | Describes a REST route                                |
| `LinidConfigurationState`       | Defines the structure of the configuration store      |
| `LinidRoute`                    | Defines the structure of a route (recursive children) |
| `LinidRoutes`                   | Array of LinidRoute for nested routes                 |
| `Page<T>`                       | Paginated API response                                |
| `Pagination`                    | Backend pagination model                              |
| `QTableRequestEvent`            | Quasar table server-side request payload              |
| `QuasarPagination`              | Quasar-specific pagination structure                  |
| `QueryFilter`                   | Flexible query parameter map                          |
| `ModuleLifecyclePhase`          | Enum of module lifecycle phases                       |
| `ModuleLifecycleResult`         | Result of a lifecycle phase execution                 |
| `ModuleLifecycleHooks`          | Lifecycle hooks for remote modules                    |

These types enforce **consistency and type safety** across all front-end modules and plugins.

---

> Additional types and interfaces will be added as new features are implemented in the library.
