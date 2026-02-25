# LinidZoneRenderer Component 🔌

The **LinidZoneRenderer** component is a core feature of `linid-im-front-corelib`.  
It allows the host application to **dynamically render remote Vue components (plugins)** inside predefined “zones” of
the UI.

This component works together with the **Linid Zone Store**, which manages plugin registration and provides reactive
updates.

---

## 🎯 Purpose

LinidZoneRenderer provides:

- **Dynamic rendering:** Components are loaded asynchronously only when needed.
- **Plugin-based architecture:** Plugins registered during initialization are rendered automatically.
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

- `zone` (string): Identifier of the zone where components should be rendered.
- The component fetches all registered plugins for this zone from the store **at initialization time** and renders them
  asynchronously.

### Props

| Prop   | Type   | Description                    |
| ------ | ------ | ------------------------------ |
| `zone` | string | The name of the zone to render |

### Default Slot - Fallback Component

The `LinidZoneRenderer` component provides a **default slot** that is displayed when no components are registered in the
specified zone **after loading is complete**.

#### Purpose

The default slot allows you to:

- Display a custom message when a zone is empty
- Render a placeholder component
- Show alternative content for zones without plugins

#### Behavior

The slot is rendered **only when**:

1. ✅ The loading process is complete
2. ✅ No components are registered in the zone

**Important:** The slot will **not** be displayed during the initial loading phase to avoid flickering.

---

#### Usage

##### Default Fallback (No Custom Slot)

If you don't provide a custom slot, the component displays a default message:

```vue
<template>
  <LinidZoneRenderer zone="sidebar" />
</template>
```

---

##### Custom Fallback Component

You can provide your own fallback content using the default slot:

```vue
<template>
  <LinidZoneRenderer zone="user-actions">
    <template #default>
      <div>
        <p>No actions available for this user.</p>
      </div>
    </template>
  </LinidZoneRenderer>
</template>
```

---

## 🔧 Configuring Zones in Module Configuration

Modules can declare exposed elements, through module federation, that should be rendered in zones via their configuration file (`module-<name>.json`). This provides a **declarative, configuration-driven approach** to zone management.

### ModuleZoneDefinition Interface

The `ModuleZoneDefinition` interface standardizes how zones are declared in module configuration:

```typescript
interface ModuleZoneDefinition<T = Record<string, unknown>> {
  /** Name of the target zone */
  zone: string;

  /** Remote/element name (e.g. "remoteA/componentB") */
  plugin: string;

  /** Optional element props (can be strongly typed) */
  props?: T;
}
```

### Configuration Example

In your `module-<name>.json` file:

```json
{
  "instanceId": "moduleRoles-instance",
  "remoteName": "moduleRoles",
  "entity": "roles",
  "apiEndpoint": "/api/roles",
  "basePath": "/roles",
  "zones": [
    {
      "zone": "user-details",
      "plugin": "moduleRoles/RoleCardPlugin",
      "props": {
        "showAvatar": true,
        "theme": "dark"
      }
    },
    {
      "zone": "sidebar",
      "plugin": "moduleRoles/QuickActionsPlugin"
    }
  ],
  "options": {}
}
```

In this example, the module declares that its `RoleCardPlugin` component should be rendered in the `user-details` zone, with a prop to show avatars. We suppose that `user-details` is a zone exposed by another module, for example the User Management module, allowing this Roles module to extend the user details view with role information.

### Key Points

- **Declarative:** Zones are configured in JSON, separate from code
- **Type-safe:** The `props` field can be strongly typed when needed
- **Optional props:** If no configuration is needed, `props` can be omitted
- **Multiple zones:** A module can inject elements into multiple zones
- **Centralized:** All zone declarations are in one place
- **Static:** Zones must be known at build time for this approach
- **Integration:** The module lifecycle will automatically register these zones in the Linid Zone Store during initialization

### When to Use Configuration vs. Store

| Approach                                   | Use When                                                                                                        |
| ------------------------------------------ | --------------------------------------------------------------------------------------------------------------- |
| **Configuration** (`ModuleZoneDefinition`) | Static zone declarations known at build time, configuration-driven architecture, cleaner separation of concerns |
| **Store** (`registerOnce`/`register`)      | Dynamic runtime registration, programmatic control needed, bootstrap-time setup in module lifecycle             |

Both approaches can coexist: use configuration for standard zones and the store for dynamic cases.

---

## ⚡ Adding a Plugin with the Store

Plugins must be registered in the **Linid Zone Store** before they can be rendered.

```ts
import { useLinidZoneStore } from '@linagora/linid-im-front-corelib';

const linidZoneStore = useLinidZoneStore();

linidZoneStore.register('user-details', {
  plugin: '@/remote/UserCard',
  props: { userId: 42 },
});
```

- `plugin`: Path or identifier of the remote component to load.
- `props`: Optional props passed to the plugin component.

> Once registered **before the component mounts**, the `LinidZoneRenderer` component will render this plugin in the specified zone.

---

## 🔁 Registering a Plugin Only Once (`registerOnce`)

In some scenarios, a plugin must be registered **only once per zone**, even if the registration logic is executed
multiple times (for example, during repeated component mounts or micro-frontend initialization).

The **Linid Zone Store** provides a `registerOnce` method for this purpose.

### 🎯 Purpose

`registerOnce` ensures that:

- A plugin is not duplicated in the same zone.
- Repeated initialization logic does not lead to multiple identical entries.
- Idempotent registration is guaranteed.

---

### 🧱 Usage

```ts
import { useLinidZoneStore } from '@linagora/linid-im-front-corelib';

const linidZoneStore = useLinidZoneStore();

linidZoneStore.registerOnce('user-details', {
  plugin: '@/remote/UserCard',
});
```

### 🔎 Behavior

- Uniqueness is evaluated **based on the `plugin` identifier (its name/path)**.
- If a plugin with the same `plugin` value is **not yet registered** in the specified zone → it is added.
- If a plugin with the same `plugin` value is **already registered** in the zone → the call is ignored.
- The comparison does **not** take `props` into account.
- No duplicate entries are created.
- Rendering remains reactive and unchanged.

---

### ⚠️ Important Recommendation

Although `registerOnce` technically allows passing `props`, this is strongly discouraged.

Because uniqueness is determined **only by the `plugin` field**:

- Two registrations with the same `plugin` but different `props` will be treated as identical.
- The first registration wins.
- Subsequent calls will be ignored, even if their configuration differs.

For this reason:

> `registerOnce` should only be used with **stateless or configuration-free plugins** (i.e., plugins without `props`).

If your plugin requires dynamic configuration or multiple differently configured instances, you should use `register`
instead.

---

### ⚠️ Lifecycle Constraint

Plugin registration must occur during the **module initialization phase** (i.e., within the module lifecycle bootstrap logic).

The `register` and `registerOnce` methods are designed to be invoked only at initialization time.

Any plugin registered **after the module has completed its initialization** will **not be rendered or taken into account** by `LinidZoneRenderer`.

This constraint ensures architectural consistency and prevents unpredictable runtime mutations of the zone configuration.

> In short: zone registration is a bootstrap-time operation, not a runtime dynamic mutation mechanism.

---

### ⚖️ `register` vs `registerOnce`

| Method         | Allows duplicates | Typical Use Case                             |
| -------------- | ----------------- | -------------------------------------------- |
| `register`     | ✅ Yes            | When multiple identical plugins are expected |
| `registerOnce` | ❌ No             | When idempotent registration is required     |

---

### 📌 When to Prefer `registerOnce`

Use `registerOnce` when:

- A plugin represents a singleton UI contribution (e.g., a header badge, a global action button).
- Registration may run multiple times due to re-mounting or hot reload.
- You want to guarantee architectural safety against duplication.

Use `register` when:

- Multiple instances of the same plugin are intentionally allowed.
- Order-sensitive or repeated rendering is required.

---

## 🧩 How It Works

1. **At initialization time**, the component retrieves all entries for the given `zone` from the **Linid Zone Store**.
2. Each entry is wrapped as an **async component** retrieved from its remote module using the
   `loadAsyncComponent(entry.plugin)` method.
3. All plugins in the zone are rendered sequentially with:

```vue
<component :is="entry.component" v-bind="entry.props" />
```

- This allows multiple plugins to coexist in a single zone.
- The component loads plugins once during initialization and does not react to subsequent store changes.

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

- Props are automatically forwarded to the dynamically loaded component.
- Components are wrapped in `loadAsyncComponent` for asynchronous loading.

---

## ✅ Advantages

- **Decoupled architecture:** Plugins are independent of the host.
- **Lazy loading:** Only load components when needed.
- **Performance optimized:** Plugins are loaded once at initialization, avoiding unnecessary reactivity overhead.
- **Standardized interface:** All plugins conform to `LinidZoneEntry`.
- **Framework-friendly:** Works natively with Vue 3, Pinia, and Module Federation.

---

## 📌 Notes

- Multiple plugins can be registered for the same zone; they are rendered in registration order.
- Plugins must be registered **before the component is mounted** to be rendered.
- The component does not react to plugins added after initialization.
- Failed imports are handled automatically; you can provide a `fallback` component.
- Designed for scalable front-end applications using Module Federation.
