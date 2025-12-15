# Services 🔧

This document describes the **services** provided by `linid-im-front-corelib`.

---

## 🔌 HTTP Client Service

Provides a singleton Axios instance shared across all modules.

| Function                          | Description                                       |
|-----------------------------------|---------------------------------------------------|
| [`setHttpClient`](#sethttpclient) | Initializes the shared Axios instance (call once) |
| [`getHttpClient`](#gethttpclient) | Returns the shared Axios instance                 |

---

### `setHttpClient`

Initializes the shared Axios instance to be used by all modules. Should be called once during application bootstrapping.

```typescript
import { setHttpClient } from '@linagora/linid-im-front-corelib';
```

#### Parameters

| Parameter | Type            | Description                      |
|-----------|-----------------|----------------------------------|
| `client`  | `AxiosInstance` | The Axios instance to be shared. |

#### Returns

No return value.

#### Behavior

1. **Singleton:** Only the first call sets the instance; subsequent calls log a warning and do not overwrite the instance.
2. **Required:** Must be called before any call to `getHttpClient()`.

---

### `getHttpClient`

Retrieves the shared Axios instance initialized by `setHttpClient`.

```typescript
import { getHttpClient } from '@linagora/linid-im-front-corelib';
```

#### Parameters

None.

#### Returns

| Type            | Description                |
|-----------------|----------------------------|
| `AxiosInstance` | The shared Axios instance. |

#### Behavior

1. **Singleton:** Always returns the same instance set by `setHttpClient`.
2. **Error Handling:** Throws an error if called before initialization.

---

### Usage Examples

#### Basic Usage

```typescript
import { setHttpClient, getHttpClient } from '@linagora/linid-im-front-corelib';
import axios from 'axios';

// Host application bootstrapping
const axiosInstance = axios.create({
  baseURL: '/api',
  timeout: 10000,
});
setHttpClient(axiosInstance);

// In any module
const http = getHttpClient();
http.get('/users').then((response) => {
  // handle response
});
```

---

#### Error Handling

##### Calling `getHttpClient` before initialization

```typescript
import { getHttpClient } from '@linagora/linid-im-front-corelib';

try {
  const http = getHttpClient();
  // Throws: [LinID CoreLib] HTTP client is not initialized. Call setHttpClient() first.
} catch (error) {
  // Handle error
}
```

##### Attempting to re-initialize

```typescript
import { setHttpClient } from '@linagora/linid-im-front-corelib';
import axios from 'axios';

setHttpClient(axios.create());
// Second call logs a warning and does not overwrite the instance
setHttpClient(axios.create());
// Logs: [LinID CoreLib] HTTP client has already been initialized. Re-initialization is ignored.
```

---

### TypeScript Support

The functions are fully typed for use with Axios:

```typescript
import type { AxiosInstance } from 'axios';

const http: AxiosInstance = getHttpClient();
```

---

> The HTTP Client Service ensures all modules share a single, consistent Axios instance for HTTP requests.

### Rules

- ✅ Host calls `setHttpClient()` once during boot
- ✅ Modules use `getHttpClient()` to access the same instance
- ⚠️ Warning logged if re-initialization is attempted
- ❌ Error thrown if `getHttpClient()` is called before initialization

---

## 🔗 Federation Service

Provides helpers wrapping Module Federation functionalites.

| Function                                    | Description                                                   |
|---------------------------------------------|---------------------------------------------------------------|
| [`loadAsyncComponent`](#loadasynccomponent) | Loads a remote Vue component from a Module Federation remote. |

### `loadAsyncComponent`

Loads a remote Vue component from a Module Federation remote using the enhanced runtime.

This helper wraps Vue's `defineAsyncComponent` and Module Federation's `loadRemote` to provide a simple way to load
federated components asynchronously.

```typescript
import { loadAsyncComponent } from '@linagora/linid-im-front-corelib';
```

#### Parameters

| Parameter | Type     | Description                                                                                                          |
|-----------|----------|----------------------------------------------------------------------------------------------------------------------|
| `plugin`  | `string` | The Module Federation remote identifier in the format `remoteName/modulePath`.<br/>Example: `'myRemote/MyComponent'` |

#### Returns

Returns a Vue async component that can be used in templates or rendered programmatically.

#### Behavior

1. **Lazy loading:** The component is only loaded when it's actually rendered
2. **Error handling:** Throws an error if the remote module doesn't export a default component
3. **Type safety:** Expects the remote module to follow the `FederatedModule` structure

---

#### Usage Examples

##### Basic Usage

```vue

<template>
  <component :is="remoteComponent"/>
</template>

<script setup lang="ts">
  import { loadAsyncComponent } from '@linagora/linid-im-front-corelib';

  const remoteComponent = loadAsyncComponent('myRemote/HeaderWidget');
</script>
```

---

##### Dynamic Component Loading

```vue

<template>
  <component
      v-for="plugin in plugins"
      :key="plugin"
      :is="loadAsyncComponent(plugin)"
  />
</template>

<script setup lang="ts">
  import { loadAsyncComponent } from '@linagora/linid-im-front-corelib';

  const plugins = ['remote1/ComponentA', 'remote2/ComponentB'];
</script>
```

---

#### Error Handling

##### Module Not Found

If the remote module cannot be loaded:

```typescript
const component = loadAsyncComponent('invalidRemote/Component');
// Throws: Error loading remote module
```

##### Missing Default Export

If the module doesn't export a default component:

```typescript
// Remote module exports: export { MyComponent }
const component = loadAsyncComponent('myRemote/MyComponent');
// Throws: Failed to load component from myRemote/MyComponent
```

**Solution:** Ensure your remote module exports a default component:

```vue
<!-- ✅ Correct - remote module (.vue file) -->
<template>
  <div>My Component</div>
</template>

<script setup lang="ts">
  // Default export automatic with <script setup>
  // Nothing special to do!
</script>
```

**Alternative with Options API:**

```vue
<!-- ✅ Correct - remote module (.vue file) -->
<template>
  <div>My Component</div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';

  export default defineComponent({
    name: 'MyComponent',
    // ...
  });
</script>
```

**❌ Wrong - TypeScript/JavaScript file (not .vue):**

```typescript
// In a .ts file (not .vue)
// ❌ Named export only - doesn't work with loadAsyncComponent
export const MyComponent = defineComponent({
  // ...
});

// ✅ Correct - default export
export default defineComponent({
  name: 'MyComponent',
  // ...
});
```

---

#### TypeScript Support

##### Remote Module Structure

The function expects remotes to follow this structure:

```typescript
/**
 * ESM namespace object returned when loading a remote component through
 * Module Federation (for example via `loadRemote`).
 *
 * In a Vite + native ESM environment, federated modules are not auto-unwrapped:
 * the effective export is exposed on the `default` property of the namespace.
 */
interface FederatedModule<Component> {
  /**
   * The default exported Vue component.
   */
  default: Component;
}
```

##### Type Inference

The returned component is fully typed as a Vue `Component`:

```typescript
import type { Component } from 'vue';

const myComponent: Component = loadAsyncComponent('remote/Component');
```

---

## 🗄️ Entity Service

The **Entity Service** provides a standardized CRUD abstraction for backend entity management. Each operation automatically resolves the correct backend endpoint using the module’s `instanceId` and its registered configuration.

This service builds on top of the HTTP Client Service and the Module Host Configuration Service.

| Function                                | Description                            |
|-----------------------------------------|----------------------------------------|
| [`saveEntity`](#saveentity)             | Creates a new entity on the backend    |
| [`updateEntity`](#updateentity)         | Updates an existing entity             |
| [`getEntities`](#getentities)           | Retrieves a paginated list of entities |
| [`getEntityById`](#getentitybyid)       | Retrieves a single entity by ID        |
| [`deleteEntityById`](#deleteentitybyid) | Deletes a single entity by ID          |

---

### `saveEntity`

Creates and persists a new entity using the backend API associated with the module instance.

#### Parameters

| Parameter    | Type     | Description                       |
|--------------|----------|-----------------------------------|
| `instanceId` | `string` | Identifier of the module instance |
| `record`     | `T`      | Entity data to create             |

#### Returns

| Type | Description                           |
|------|---------------------------------------|
| `Y`  | The created entity returned by server |

#### Behavior

1. Automatically resolves the backend endpoint through `getModuleHostConfiguration`
2. Issues a `POST` request with the entity payload
3. Returns the deserialized response body

#### Example

```ts
const created = await saveEntity<UserInput, User>('users', newUser);
```

---

### `updateEntity`

Updates an existing entity in the backend.

#### Parameters

| Parameter    | Type     | Description                       |
|--------------|----------|-----------------------------------|
| `instanceId` | `string` | Identifier of the module instance |
| `entityId`   | `string` | The ID of the entity to update    |
| `record`     | `T`      | New data to update the entity     |

#### Returns

| Type | Description                           |
|------|---------------------------------------|
| `Y`  | The updated entity returned by server |

---

### `getEntities`

Retrieves a paginated list of entities.

#### Parameters

| Parameter    | Type          | Description                       |
|--------------|---------------|-----------------------------------|
| `instanceId` | `string`      | Identifier of the module instance |
| `filters`    | `QueryFilter` | Filters to apply to the search    |
| `pagination` | `Pagination`  | Pagination parameters             |

#### Returns

| Type      | Description                           |
|-----------|---------------------------------------|
| `Page<T>` | A page object containing entity items |

---

### `getEntityById`

Fetches a single entity by its unique identifier.

#### Parameters

| Parameter    | Type     | Description                       |
|--------------|----------|-----------------------------------|
| `instanceId` | `string` | Identifier of the module instance |
| `entityId`   | `string` | ID of the entity to retrieve      |

#### Returns

| Type | Description                  |
|------|------------------------------|
| `T`  | The retrieved entity content |

---

### `deleteEntityById`

Deletes a single entity by ID.

#### Parameters

| Parameter    | Type     | Description                       |
|--------------|----------|-----------------------------------|
| `instanceId` | `string` | Identifier of the module instance |
| `entityId`   | `string` | ID of the entity to delete        |

#### Returns

`void`

#### Behavior

1. Resolves endpoint from module configuration
2. Performs a `DELETE` HTTP request
3. Returns an empty Promise

---

### Usage Example

```ts
// Create
await saveEntity('users', {name: 'Alice'});

// Update
await updateEntity('users', '42', {name: 'Alice Cooper'});

// Retrieve paginated list
const page = await getEntities<User>(
  'users',
  {search: 'alice'},
  {page: 0, size: 20}
);

// Retrieve by ID
const user = await getEntityById<User>('users', '42');

// Delete
await deleteEntityById('users', '42');
```

---

This service provides a unified, module-aware way to manage backend CRUD operations while relying on shared configuration and HTTP client infrastructure.

---

> Additional services will be added as new features are implemented in the library.
