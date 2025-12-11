# 🎨 UI Design Configuration (`UiDesign`)

This document explains how to use the `UiDesign` singleton and the `useUiDesign` composable to manage and access UI
configuration values in your application.

---

## 1. Overview

`UiDesign` provides a centralized configuration system for dynamic UI personalization, allowing consistent styling and
behavior across components. The configuration supports **namespaces** and a **default fallback**.

Example structure:

```json
{
  "default": {
    "button": {
      "flat": true,
      "icon": "icon",
      "color": "primary"
    }
  },
  "custom": {
    "button": {
      "flat": false
    },
    "other": {
      "button": {
        "color": "secondary"
      }
    }
  }
}
```

- `default` namespace: fallback values for all components.
- Other namespaces (`custom`, `other`, etc.): override default values as needed.

---

## 2. Initialization

The UI design must be initialized **once** by the host application, typically during boot.

```ts
import { setUiDesign } from '@linagora/linid-im-front-corelib';
import designConfig from 'public/design.json';

setUiDesign(designConfig);
```

> ⚠️ Subsequent calls to `setUiDesign()` are ignored. Accessing `UiDesign` before initialization will throw an error.

---

## 3. Using the `useUiDesign` Composable

You can use the `useUiDesign` composable inside your Vue components to dynamically apply UI configuration to Quasar
components.

### Example: `MyComponent.vue`

```vue
<template>
  <div>
    <!-- Quasar button using dynamic flat and color values from UiDesign -->
    <q-btn
      :flat="ui('MyComponent', 'button.flat')"
      :color="ui('MyComponent', 'button.color')"
      :icon="ui('MyComponent', 'button.icon')"
      label="Click me"
    />
  </div>
</template>

<script setup lang="ts">
import {useUiDesign} from '@linagora/linid-im-front-corelib;

// Retrieve the ui() function from the composable
const {ui} = useUiDesign();
</script>
```

### 3.1 How it Works

- `ui(namespace, type)` searches the requested namespace first.
- If the value is `undefined`, it falls back to the `default` namespace.
- Both `namespace` and `type` support **dot notation** for nested keys.

---

## 4. Examples

### 4.1 Basic Button Configuration

```ts
ui('custom', 'button.color'); // 'primary' from default
ui('custom', 'button.flat'); // false, overridden in custom namespace
```

### 4.2 Nested Keys and Fallbacks

```ts
ui('custom.other', 'button.color'); // 'secondary' from custom.other
ui('unknown', 'button.icon'); // 'icon' from default
```

---

## 5. TypeScript Support

The `UiDesign` interface provides type safety:

```ts
/**
 * Represents a single primitive value in the UI configuration.
 */
export type UiDesignValue = string | number | boolean;

/**
 * Represents a namespace containing key-value pairs of UI configuration values.
 * Values can be primitives or nested namespaces.
 */
export interface UiDesignNamespace {
  [key: string]: UiDesignValue | UiDesignNamespace;
}

/**
 * Represents the full UI design configuration used across the application.
 * Contains multiple namespaces, including the `default` namespace used as a fallback.
 */
export interface UiDesign {
  /**
   * Default namespace providing fallback values for all components.
   */
  default?: UiDesignNamespace;

  /**
   * Arbitrary namespaces for component-specific overrides.
   */
  [namespace: string]: UiDesignNamespace | undefined;
}
```

---

## 6. Best Practices

- Always initialize `UiDesign` before using `useUiDesign`.
- Keep `default` namespace comprehensive to ensure reliable fallback behavior.
- Use descriptive namespaces for modules or feature-specific overrides.
- Avoid deeply nested configurations if not needed; flat structures improve readability.
