# LinidZoneRenderer Component 🔌

The **LinidZoneRenderer** component is a core feature of `linid-im-front-corelib`.  
It allows the host application to **dynamically render remote Vue components (plugins) or locally provided Vue
components** inside predefined “zones” of the UI.

This component works together with the **Linid Zone Store**, which manages plugin registration and provides reactive
updates.

---

## 🎯 Purpose

LinidZoneRenderer provides:

- **Dynamic rendering:** Federated components are loaded asynchronously only when needed.
- **Plugin-based architecture:** Plugins registered during initialization are rendered automatically.
- **Direct components:** A zone entry can also provide a local Vue component, without module federation.
- **Extensibility:** New features can be added via plugins without modifying the host app.
- **Standardization:** All entries follow the `LinidZoneEntry` discriminated union.

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

| Prop            | Type    | Description                                                                                                                                                                |
|-----------------|---------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `zone`          | string  | The name of the zone to render                                                                                                                                             |
| `...additional` | unknown | Any additional attributes and event listeners passed to the component are forwarded to all rendered zone plugins via `$attrs`. These is overriden by entry-specific props. |

**Example with additional attributes:**

```vue
<template>
  <LinidZoneRenderer
    zone="user-details"
    :userId="42"
    :theme="dark"
  />
</template>
```

In this example, `userId` and `theme` are forwarded to all plugins registered in the `user-details` zone, and will
override any same-named props defined in the zone entry configuration. Event listeners (e.g. `@my-event`) would be
forwarded the same way.

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

Modules can declare exposed elements, through module federation, that should be rendered in zones via their
configuration file (`module-<name>.json`). This provides a **declarative, configuration-driven approach** to zone
management.

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

In this example, the module declares that its `RoleCardPlugin` component should be rendered in the `user-details` zone,
with a prop to show avatars. We suppose that `user-details` is a zone exposed by another module, for example the User
Management module, allowing this Roles module to extend the user details view with role information.

### Key Points

- **Declarative:** Zones are configured in JSON, separate from code
- **Type-safe:** The `props` field can be strongly typed when needed
- **Optional props:** If no configuration is needed, `props` can be omitted
- **Multiple zones:** A module can inject elements into multiple zones
- **Centralized:** All zone declarations are in one place
- **Static:** Zones must be known at build time for this approach
- **Integration:** The module lifecycle will automatically register these zones in the Linid Zone Store during
  initialization

### When to Use Configuration vs. Store

| Approach                                                          | Use When                                                                                                        |
|-------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------|
| **Configuration** (`ModuleZoneDefinition`)                        | Static zone declarations known at build time, configuration-driven architecture, cleaner separation of concerns |
| **Store** (`registerPlugin`/`registerPluginOnce`/`registerComponent`) | Dynamic runtime registration, programmatic control needed, bootstrap-time setup in module lifecycle             |

Both approaches can coexist: use configuration for standard zones and the store for dynamic cases.

---

## ⚡ Adding an Entry with the Store

Entries must be registered in the **Linid Zone Store** before they can be rendered.

### Federated Plugin Entry (`registerPlugin`)

```ts
import { useLinidZoneStore } from '@linagora/linid-im-front-corelib';

const linidZoneStore = useLinidZoneStore();

linidZoneStore.registerPlugin('user-details', '@/remote/UserCard', {
  userId: 42,
});
```

- `plugin`: Path or identifier of the remote component to load.
- `props`: Optional props passed to the plugin component.

### Direct Component Entry (`registerComponent`)

A zone entry can also provide a Vue component directly, without going through module federation. This is typically
used by the host application to inject its own local components into zones exposed by generic pages.

```ts
import { useLinidZoneStore } from '@linagora/linid-im-front-corelib';
import UserRolesCard from './components/UserRolesCard.vue';

const linidZoneStore = useLinidZoneStore();

linidZoneStore.registerComponent('user-details', UserRolesCard, {
  userId: 42,
});
```

- `component`: The Vue component to render as-is (no asynchronous loading).
- `props`: Optional props passed to the component.

> The store wraps direct components with `markRaw` automatically, so they are kept out of the reactivity system.

> Once registered **before the component mounts**, the `LinidZoneRenderer` component will render this entry in the
> specified zone.

---

## 🔍 Checking Whether a Zone Has Entries (`hasZoneEntries`)

The **Linid Zone Store** exposes a `hasZoneEntries` getter to know whether a zone holds at least one registered entry,
i.e. whether its `LinidZoneRenderer` will actually produce content.

```ts
import { useLinidZoneStore } from '@linagora/linid-im-front-corelib';

const linidZoneStore = useLinidZoneStore();

if (linidZoneStore.hasZoneEntries('user-details')) {
  // The zone will render something
}
```

### 🔎 Behavior

- Returns `true` when the zone contains **at least one entry**, whatever its type (`federated` or `component`).
- Returns `false` when the zone contains no entry, or when the zone has never been registered at all.
- Unknown zones are handled safely: no error is thrown, `false` is returned.

---

## 🔁 Registering a Plugin Only Once (`registerPluginOnce`)

In some scenarios, a plugin must be registered **only once per zone**, even if the registration logic is executed
multiple times (for example, during repeated component mounts or micro-frontend initialization).

The **Linid Zone Store** provides a `registerPluginOnce` method for this purpose.

### 🎯 Purpose

`registerPluginOnce` ensures that:

- A plugin is not duplicated in the same zone.
- Repeated initialization logic does not lead to multiple identical entries.
- Idempotent registration is guaranteed.

---

### 🧱 Usage

```ts
import { useLinidZoneStore } from '@linagora/linid-im-front-corelib';

const linidZoneStore = useLinidZoneStore();

linidZoneStore.registerPluginOnce('user-details', '@/remote/UserCard');
```

### 🔎 Behavior

- Uniqueness is evaluated **based on the `plugin` identifier (its name/path)**, among federated entries only.
- If a plugin with the same `plugin` value is **not yet registered** in the specified zone → it is added.
- If a plugin with the same `plugin` value is **already registered** in the zone → the call is ignored.
- The comparison does **not** take `props` into account.
- No duplicate entries are created.
- Rendering remains reactive and unchanged.

> There is no `Once` variant for direct component entries: the host controls its own bootstrap registrations.

---

### ⚠️ Important Recommendation

Although `registerPluginOnce` technically allows passing `props`, this is strongly discouraged.

Because uniqueness is determined **only by the `plugin` identifier**:

- Two registrations with the same `plugin` but different `props` will be treated as identical.
- The first registration wins.
- Subsequent calls will be ignored, even if their configuration differs.

For this reason:

> `registerPluginOnce` should only be used with **stateless or configuration-free plugins** (i.e., plugins without
> `props`).

If your plugin requires dynamic configuration or multiple differently configured instances, you should use
`registerPlugin` instead.

---

### ⚠️ Lifecycle Constraint

Entry registration must occur during the **module initialization phase** (i.e., within the module lifecycle bootstrap
logic).

The `registerPlugin`, `registerPluginOnce` and `registerComponent` methods are designed to be invoked only at
initialization time.

Any entry registered **after the module has completed its initialization** will **not be rendered or taken into account
** by `LinidZoneRenderer`.

This constraint ensures architectural consistency and prevents unpredictable runtime mutations of the zone
configuration.

> In short: zone registration is a bootstrap-time operation, not a runtime dynamic mutation mechanism.

---

### ⚖️ `registerPlugin` vs `registerPluginOnce`

| Method               | Allows duplicates | Typical Use Case                             |
|----------------------|-------------------|----------------------------------------------|
| `registerPlugin`     | ✅ Yes             | When multiple identical plugins are expected |
| `registerPluginOnce` | ❌ No              | When idempotent registration is required     |

---

### 📌 When to Prefer `registerPluginOnce`

Use `registerPluginOnce` when:

- A plugin represents a singleton UI contribution (e.g., a header badge, a global action button).
- Registration may run multiple times due to re-mounting or hot reload.
- You want to guarantee architectural safety against duplication.

Use `registerPlugin` when:

- Multiple instances of the same plugin are intentionally allowed.
- Order-sensitive or repeated rendering is required.

---

## 🧩 How It Works

1. **At initialization time**, the component retrieves all entries for the given `zone` from the **Linid Zone Store**.
2. Each **federated entry** (`type: 'federated'`) is wrapped as an **async component** retrieved from its remote
   module using the `loadAsyncComponent(entry.plugin)` method. **Component entries** (`type: 'component'`) are
   rendered as-is, without any asynchronous loading.
3. The component sets `inheritAttrs: false` to take manual control over attribute forwarding. This is required because
   the template has multiple root nodes (a fragment), so Vue cannot automatically determine which node should receive
   the inherited attributes. Disabling automatic inheritance allows each plugin to receive `$attrs` explicitly via
   `v-bind`.
4. All plugins in the zone are rendered sequentially with their props merged:

```vue
<component :is="entry.component" v-bind="{ ...$attrs, ...entry.props }" />
```

**Props merge behavior:**

- `entry.props`: Props from the zone entry configuration (from `module-<name>.json`). These serve as default values for
  the plugin.
- `$attrs`: All attributes and event listeners passed to `LinidZoneRenderer` that are not declared as props or emits.
  This includes bound props (e.g. `:userId="42"`) as well as event listeners (e.g. `@my-event="handler"`). The `zone`
  prop is declared and therefore excluded from `$attrs` automatically.
  See [Vue Fallthrough Attributes](https://vuejs.org/guide/components/attrs) for details.
- **`$attrs` is overridden:** If the same key is present in both, the value from `zone entry` wins.

**Example:**

```vue
<!-- In parent component -->
<LinidZoneRenderer zone="user-details" :theme="dark" :readOnly="true" />
```

In module-<name>.json zone configuration

```json
{
  "zone": "user-details",
  "plugin": "myModule/UserCard",
  "props": {
    "theme": "light",
    "showAvatar": true
  }
}
```

```ts
// Rendered component receives
{
  theme: 'light', // from $attrs (override)
  readOnly: true, //from $attrs
  showAvatar: true // from entry.props
}
```

- This allows multiple plugins to coexist in a single zone.
- The component loads plugins once during initialization and does not react to subsequent store changes.
- Attributes passed to the zone renderer override entry-specific props, making `entry.props` act as default values.

---

## 🔧 Entry Types

Zone entries follow the `LinidZoneEntry` discriminated union:

```ts
export interface BaseLinidZoneEntry {
  /** Props forwarded to the rendered component */
  props?: Record<string, unknown>;
}

export interface FederatedLinidZoneEntry extends BaseLinidZoneEntry {
  type: 'federated';

  /** Path to the remote module */
  plugin: string;
}

export interface ComponentLinidZoneEntry extends BaseLinidZoneEntry {
  type: 'component';

  /** The Vue component to render directly */
  component: Component;
}

export type LinidZoneEntry = FederatedLinidZoneEntry | ComponentLinidZoneEntry;
```

- Entries are built by the store helpers (`registerPlugin`, `registerPluginOnce`, `registerComponent`); consumers
  never construct them manually.
- Props are automatically forwarded to the rendered component.
- Federated entries are wrapped in `loadAsyncComponent` for asynchronous loading; component entries are rendered
  as-is.
- The `type` discriminant makes the model extensible for future entry kinds.

---

## ✅ Advantages

- **Decoupled architecture:** Plugins are independent of the host.
- **Lazy loading:** Federated components are only loaded when needed.
- **Performance optimized:** Entries are loaded once at initialization, avoiding unnecessary reactivity overhead.
- **Standardized interface:** All entries conform to the `LinidZoneEntry` discriminated union.
- **Host injection:** The host can inject its own local components into zones without module federation.
- **Framework-friendly:** Works natively with Vue 3, Pinia, and Module Federation.

---

## 📌 Notes

- Multiple entries can be registered for the same zone; they are rendered in registration order.
- Entries must be registered **before the component is mounted** to be rendered.
- Use `hasZoneEntries(zone)` to know whether a zone will render anything.
- The component does not react to entries added after initialization.
- Failed imports are handled automatically; you can provide a `fallback` component.
- Designed for scalable front-end applications using Module Federation.
