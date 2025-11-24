# Helper Functions

This document describes utility functions provided by `linid-im-front-corelib` to simplify common tasks.

---

## `loadAsyncComponent`

Loads a remote Vue component from a Module Federation remote using the enhanced runtime.

This helper wraps Vue's `defineAsyncComponent` and Module Federation's `loadRemote` to provide a simple way to load federated components asynchronously.

### Import

```typescript
import { loadAsyncComponent } from '@linagora/linid-im-front-corelib';
```

### Parameters

| Parameter | Type     | Description                                                                                                          |
| --------- | -------- | -------------------------------------------------------------------------------------------------------------------- |
| `plugin`  | `string` | The Module Federation remote identifier in the format `remoteName/modulePath`.<br/>Example: `'myRemote/MyComponent'` |

### Returns

Returns a Vue async component that can be used in templates or rendered programmatically.

### Behavior

1. **Lazy loading:** The component is only loaded when it's actually rendered
2. **Error handling:** Throws an error if the remote module doesn't export a default component
3. **Type safety:** Expects the remote module to follow the `RemoteComponentModule` structure

---

## Usage Examples

### Basic Usage

```vue
<template>
  <component :is="remoteComponent" />
</template>

<script setup lang="ts">
import { loadAsyncComponent } from '@linagora/linid-im-front-corelib';

const remoteComponent = loadAsyncComponent('myRemote/HeaderWidget');
</script>
```

---

### Dynamic Component Loading

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

### In LinidZoneRenderer Context

The `loadAsyncComponent` function is used internally by `LinidZoneRenderer`:

```typescript
// Internal usage in LinidZoneRenderer
const components = entries.map((entry) => ({
  ...entry,
  component: loadAsyncComponent(entry.plugin),
}));
```

---

## Error Handling

### Module Not Found

If the remote module cannot be loaded:

```typescript
const component = loadAsyncComponent('invalidRemote/Component');
// Throws: Error loading remote module
```

### Missing Default Export

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

## TypeScript Support

### Remote Module Structure

The function expects remotes to follow this structure:

```typescript
/**
 * Module structure for a Vue component exposed via Module Federation.
 */
interface RemoteComponentModule {
  /**
   * The default exported Vue component.
   */
  default: Component;
}
```

### Type Inference

The returned component is fully typed as a Vue `Component`:

```typescript
import type { Component } from 'vue';

const myComponent: Component = loadAsyncComponent('remote/Component');
```

---
