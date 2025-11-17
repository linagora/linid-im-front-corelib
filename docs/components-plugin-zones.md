# LinidZoneRenderer Component 🔌

The **LinidZoneRenderer** component is a core feature of `linid-im-front-corelib`.  
It allows the host application to **dynamically render remote Vue components (plugins)** inside predefined “zones” of the UI.

This component works together with the **Linid Zone Store**, which manages plugin registration and provides reactive updates.

---

## 🎯 Purpose

LinidZoneRenderer provides:

- **Dynamic rendering:** Components are loaded asynchronously only when needed.
- **Reactive updates:** New plugins registered to a zone appear automatically.
- **Extensibility:** New features can be added via plugins without modifying the host app.
- **Standardization:** All plugins follow the `LinidZoneEntry` interface.

---

## 🧱 How to Use the Component

### Basic Usage

```vue
<template>
  <LinidZoneRenderer zone="user-details" />
</template>
```

* `zone` (string): Identifier of the zone where components should be rendered.
* The component automatically fetches all registered plugins for this zone from the store and renders them asynchronously.

### Props

| Prop       | Type          | Description                                        |
| ---------- | ------------- | -------------------------------------------------- |
| `zone`     | string        | The name of the zone to render                     |

---

## ⚡ Adding a Plugin with the Store

Plugins must be registered in the **Linid Zone Store** before they can be rendered.

```ts
import { useLinidZoneStore } from '@linagora/linid-im-front-corelib';

const linidZoneStore = useLinidZoneStore();

linidZoneStore.register("user-details", {
  plugin: "@/remote/UserCard",
  props: { userId: 42 },
});
```

* `plugin`: Path or identifier of the remote component to load.
* `props`: Optional props passed to the plugin component.

> Once registered, the `LinidZoneRenderer` component will automatically render this plugin in the specified zone.

---

## 🧩 How It Works

1. The component retrieves all entries for the given `zone` from the **Linid Zone Store**.
2. Each entry is wrapped as an **async component** using `defineAsyncComponent(() => import(entry.plugin))`.
3. All plugins in the zone are rendered sequentially with:

```vue
<component :is="entry.component" v-bind="entry.props" />
```

* This allows multiple plugins to coexist in a single zone.
* The component reacts automatically to changes in the store.

---

## 🔧 Plugin Types

Plugins must implement the `LinidZoneEntry` interface:

```ts
export interface LinidZoneEntry {
  /** Path to the remote module */
  plugin: string;

  /** Props forwarded to the plugin component */
  props?: Record<string, unknown>;
}
```

* Props are automatically forwarded to the dynamically loaded component.
* Components are wrapped in `defineAsyncComponent` for asynchronous loading.

---

## ✅ Advantages

* **Decoupled architecture:** Plugins are independent of the host.
* **Lazy loading:** Only load components when needed.
* **Reactive:** Supports runtime addition/removal of plugins.
* **Standardized interface:** All plugins conform to `LinidZoneEntry`.
* **Framework-friendly:** Works natively with Vue 3, Pinia, and Module Federation.

---

## 📌 Notes

* Multiple plugins can be registered for the same zone; they are rendered in registration order.
* Failed imports are handled automatically; you can provide a `fallback` component.
* Designed for scalable front-end applications using Module Federation.
