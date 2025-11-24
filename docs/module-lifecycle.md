# Module Lifecycle System

The module lifecycle system provides a standardized way for business modules to initialize themselves in the host application.

## Overview

The lifecycle consists of five phases that are executed in sequence for all modules:

# Module Lifecycle System

The module lifecycle system provides a standardized way for business modules to initialize themselves in the host application.

## Overview

The lifecycle consists of five phases that are executed in sequence for all modules:

```
Setup → Configure → Initialize → Ready → Post-Init
```

Each phase has a specific purpose and is executed for **all modules** before moving to the next phase.

---

## Lifecycle Phases

### 1. Setup Phase

**Purpose:** Validate dependencies and prepare the module

**When executed:** First phase, after the module is loaded via Module Federation

**Use cases:**

- Check if required dependencies are available
- Validate environment
- Prepare internal state
- Check Vue version compatibility

**Hook signature:**

```typescript
async onSetup(app: App): Promise<ModuleLifecycleResult>
```

**Implementation example:**

```typescript
async onSetup(app: App): Promise<ModuleLifecycleResult> {
  if (!app) {
    return {
      success: false,
      error: 'Vue app instance not available'
    };
  }
  return { success: true };
}
```

---

### 2. Configure Phase

**Purpose:** Receive and validate host configuration

**When executed:** After setup, before initialization

**Use cases:**

- Receive configuration from host (`module-<name>.json`)
- Validate required configuration fields
- Store configuration for later use
- Apply configuration settings

**Hook signature:**

```typescript
async onConfigure(app: App, config: ModuleHostConfig): Promise<ModuleLifecycleResult>
```

**Implementation example:**

```typescript
async onConfigure(
  app: App,
  config: ModuleHostConfig
): Promise<ModuleLifecycleResult> {
  if (!config.id) {
    return {
      success: false,
      error: 'Missing module ID in configuration'
    };
  }

  // Store configuration for later use
  this.config = config;

  return { success: true };
}
```

---

### 3. Initialize Phase

**Purpose:** Register stores and initialize resources

**When executed:** After configuration

**Use cases:**

- Register Pinia stores
- Set up event listeners
- Initialize module-specific resources
- Prepare data structures

**Hook signature:**

```typescript
async onInitialize(app: App): Promise<ModuleLifecycleResult>
```

**Implementation example:**

```typescript
async onInitialize(app: App): Promise<ModuleLifecycleResult> {
  // Register Pinia store
  const pinia = app.config.globalProperties.$pinia;
  pinia.use(myStorePlugin);

  // Initialize module resources
  await this.loadInitialData();

  return {
    success: true,
    metadata: { storesRegistered: 1 }
  };
}
```

---

### 4. Ready Phase

**Purpose:** Signal that the module is ready for use

**When executed:** After all modules are initialized

**Use cases:**

- Perform final checks
- Emit ready events
- Log readiness status

**Hook signature:**

```typescript
async onReady(app: App): Promise<ModuleLifecycleResult>
```

**Implementation example:**

```typescript
async onReady(app: App): Promise<ModuleLifecycleResult> {
  console.log(`Module ${this.name} v${this.version} is ready!`);

  return {
    success: true,
    metadata: { startTime: Date.now() }
  };
}
```

---

### 5. Post-Init Phase

**Purpose:** Cross-module integrations and final setup

**When executed:** After all modules are ready

**Use cases:**

- Integrate with other modules
- Set up cross-module communication
- Perform final setup that requires all modules to be ready

**Hook signature:**

```typescript
async onPostInit(app: App): Promise<ModuleLifecycleResult>
```

**Implementation example:**

```typescript
async onPostInit(app: App): Promise<ModuleLifecycleResult> {
  // Access other modules from host's module registry
  // Set up cross-module event listeners
  // Perform integrations

  return { success: true };
}
```

---

## Vue App Instance

All lifecycle hooks receive the Vue `app` instance as their first parameter:

```typescript
import type { App } from 'vue';

async onInitialize(app: App): Promise<ModuleLifecycleResult> {
  // Access Pinia
  const pinia = app.config.globalProperties.$pinia;

  // Access router (when available)
  const router = app.config.globalProperties.$router;

  // Access other global properties
  const i18n = app.config.globalProperties.$i18n;

  return { success: true };
}
```

---

## Result Object

All lifecycle hooks must return a `ModuleLifecycleResult`:

```typescript
interface ModuleLifecycleResult {
  /**
   * Whether the phase completed successfully.
   * If false, the error is logged but the module continues through remaining phases.
   */
  success: boolean;

  /**
   * Error message if the phase failed.
   */
  error?: string;

  /**
   * Additional metadata from the phase (for debugging).
   */
  metadata?: Record<string, unknown>;
}
```

### Success Result

```typescript
return { success: true };
```

### Success with Metadata

```typescript
return {
  success: true,
  metadata: {
    storesRegistered: 2,
    dataLoaded: true,
  },
};
```

### Failure Result

```typescript
return {
  success: false,
  error: 'Missing required configuration',
};
```

---

## Implementing a Module

### Option 1: Extending BasicRemoteModule (Recommended)

The corelib provides a `BasicRemoteModule` class with default implementations for all hooks:

```typescript
import { BasicRemoteModule } from '@linagora/linid-im-front-corelib';
import type { ModuleLifecycleResult } from '@linagora/linid-im-front-corelib';
import type { App } from 'vue';

class MyModule extends BasicRemoteModule {
  constructor() {
    super('my-module', 'My Business Module', '1.0.0', 'Description');
  }

  // Override only the hooks you need
  async onInitialize(app: App): Promise<ModuleLifecycleResult> {
    const pinia = app.config.globalProperties.$pinia;
    pinia.use(myStore);
    return { success: true };
  }
}

export default new MyModule();
```

**Advantages:**

- ✅ All hooks have default implementations (return success)
- ✅ Override only what you need
- ✅ Object-oriented design
- ✅ Follows SOLID principles
- ✅ Easy to extend and maintain

---

### Option 2: Implementing RemoteModule Interface

Implement the `RemoteModule` interface directly for full control:

```typescript
import type {
  RemoteModule,
  ModuleLifecycleResult,
  ModuleHostConfig,
} from '@linagora/linid-im-front-corelib';
import type { App } from 'vue';

class MyModule implements RemoteModule {
  id = 'my-module';
  name = 'My Business Module';
  version = '1.0.0';
  description = 'Description of what the module does';

  async onSetup(app: App): Promise<ModuleLifecycleResult> {
    // Validate dependencies
    return { success: true };
  }

  async onConfigure(
    app: App,
    config: ModuleHostConfig
  ): Promise<ModuleLifecycleResult> {
    // Apply configuration
    if (!config.id) {
      return { success: false, error: 'Missing module ID' };
    }
    return { success: true };
  }

  async onInitialize(app: App): Promise<ModuleLifecycleResult> {
    // Register stores
    const pinia = app.config.globalProperties.$pinia;
    pinia.use(myStore);
    return { success: true };
  }

  async onReady(app: App): Promise<ModuleLifecycleResult> {
    console.log('Module is ready!');
    return { success: true };
  }

  async onPostInit(app: App): Promise<ModuleLifecycleResult> {
    // Cross-module integrations
    return { success: true };
  }
}

export default new MyModule();
```

**Advantages:**

- ✅ Full control over implementation
- ✅ Implement only needed hooks
- ✅ Type-safe with TypeScript
- ✅ Clean, explicit code

---

### Module Federation Configuration

Expose the lifecycle in your module's `vite.config.ts`:

```typescript
import { defineConfig } from 'vite';
import federation from '@originjs/vite-plugin-federation';

export default defineConfig({
  plugins: [
    federation({
      name: 'myBusinessModule',
      filename: 'remoteEntry.js',
      exposes: {
        './lifecycle': './src/lifecycle.ts', // Required for business modules
        './MyComponent': './src/components/MyComponent.vue',
      },
    }),
  ],
});
```

---

## Best Practices

### 1. Keep Phases Focused

Each phase should have a single, clear responsibility.

✅ **Good:**

```typescript
async onInitialize(app: App): Promise<ModuleLifecycleResult> {
  const pinia = app.config.globalProperties.$pinia;
  pinia.use(myStore);
  return { success: true };
}
```

❌ **Bad:**

```typescript
async onInitialize(app: App): Promise<ModuleLifecycleResult> {
  const pinia = app.config.globalProperties.$pinia;
  pinia.use(myStore);
  await fetchUserData(); // Should be in onReady or onPostInit
  integrateWithOtherModule(); // Should be in onPostInit
  return { success: true };
}
```

---

### 2. Always Return a Valid Result

Never return `undefined` or forget the return statement.

✅ **Good:**

```typescript
return { success: true };
```

✅ **Good:**

```typescript
return {
  success: false,
  error: 'Missing required configuration',
};
```

❌ **Bad:**

```typescript
return; // Invalid, returns undefined
```

---

### 3. Use Metadata for Debugging

Provide useful debugging information in the metadata.

```typescript
return {
  success: true,
  metadata: {
    storesRegistered: 2,
    routesRegistered: 3,
    duration: Date.now() - startTime,
  },
};
```

---

### 4. Fail Fast in Setup

Validate prerequisites early in the Setup phase.

```typescript
async onSetup(app: App): Promise<ModuleLifecycleResult> {
  if (!window.someRequiredAPI) {
    return {
      success: false,
      error: 'Required API not available'
    };
  }

  if (!app) {
    return {
      success: false,
      error: 'Vue app instance not available'
    };
  }

  return { success: true };
}
```

---

### 5. Don't Throw Errors

Return failure results instead of throwing errors.

✅ **Good:**

```typescript
if (!config.id) {
  return { success: false, error: 'Missing module ID' };
}
```

❌ **Bad:**

```typescript
if (!config.id) {
  throw new Error('Missing module ID'); // Will be caught by host but not clean
}
```

**Why:** Thrown errors are caught by the host and converted to failure results, but explicit returns are clearer and follow the expected pattern.

---

### 6. Implement Only What You Need

All lifecycle hooks are optional. Don't implement hooks your module doesn't need.

```typescript
class SimpleModule extends BasicRemoteModule {
  constructor() {
    super('simple-module', 'Simple Module', '1.0.0');
  }

  async onInitialize(app: App): Promise<ModuleLifecycleResult> {
    const pinia = app.config.globalProperties.$pinia;
    pinia.use(myStore);
    return { success: true };
  }

  // No need for onSetup, onConfigure, onReady, or onPostInit
}

export default new SimpleModule();
```

---

## Error Handling

### Module Fails to Load

If a module fails to load via Module Federation, the host will log an error:

```
[Module Lifecycle] Failed to load module myBusinessModule/lifecycle: <error>
```

**Consequences:**

- Module is not added to the registry
- Module does not participate in lifecycle phases
- Other modules continue normally

---

### Phase Execution Fails

If a lifecycle phase returns `success: false` or throws an error:

```
[Module Lifecycle] my-module: Error in initialize phase: <error>
```

**Consequences:**

- Error is logged by the host
- Module continues through remaining phases
- Other modules are not affected

---

### Invalid Phase Result

If a lifecycle hook returns an invalid result (not a `ModuleLifecycleResult` object):

```
[Module Lifecycle] my-module: Phase setup returned invalid result, treating as success
```

**Consequences:**

- Host treats the phase as successful
- Module continues through remaining phases
- Warning is logged for debugging

---

## Execution Sequence

The host executes lifecycle phases in this order:

```
Host Application
    │
    ├─ 1. Load modules.json (get list of modules to load)
    │
    ├─ 2. For each module in modules.json:
    │   ├─ Load module-<name>.json configuration
    │   └─ Load module via Module Federation (remoteName/lifecycle)
    │
    ├─ 3. Phase 1: Setup (all modules in parallel)
    │   ├─ module-A.onSetup(app)
    │   ├─ module-B.onSetup(app)
    │   └─ module-C.onSetup(app)
    │
    ├─ 4. Phase 2: Configure (all modules in parallel)
    │   ├─ module-A.onConfigure(app, configA)
    │   ├─ module-B.onConfigure(app, configB)
    │   └─ module-C.onConfigure(app, configC)
    │
    ├─ 5. Phase 3: Initialize (all modules in parallel)
    │   ├─ module-A.onInitialize(app)
    │   ├─ module-B.onInitialize(app)
    │   └─ module-C.onInitialize(app)
    │
    ├─ 6. Phase 4: Ready (all modules in parallel)
    │   ├─ module-A.onReady(app)
    │   ├─ module-B.onReady(app)
    │   └─ module-C.onReady(app)
    │
    └─ 7. Phase 5: Post-Init (all modules in parallel)
        ├─ module-A.onPostInit(app)
        ├─ module-B.onPostInit(app)
        └─ module-C.onPostInit(app)
```

**Key points:**

- All modules complete one phase before moving to the next
- Phases execute in parallel for all modules (using `Promise.allSettled`)
- Failure in one module doesn't block others

---

## Integration with Host

### Host Responsibilities

The host application is responsible for:

1. ✅ Loading module configurations from `/config/modules.json`
2. ✅ Loading each module's configuration file (`/config/module-<name>.json`)
3. ✅ Loading modules via Module Federation
4. ✅ Executing each lifecycle phase in sequence for all modules
5. ✅ Handling errors and logging
6. ✅ Providing the Vue `app` instance to modules

### Module Responsibilities

Business modules are responsible for:

1. ✅ Exposing `./lifecycle` in Module Federation config
2. ✅ Implementing the `RemoteModule` interface (or extending `BasicRemoteModule`)
3. ✅ Returning valid `ModuleLifecycleResult` from all hooks
4. ✅ Handling their own errors gracefully
5. ✅ Using the provided `app` instance correctly

---

## Future Enhancements

The following features are planned for future versions:

### Router Integration

Add direct router access for route registration:

```typescript
async onInitialize(app: App): Promise<ModuleLifecycleResult> {
  const router = app.config.globalProperties.$router;
  router.addRoute({
    path: '/my-module',
    component: MyComponent
  });
  return { success: true };
}
```

### Zone System

Allow modules to inject components into named zones in the UI.

### Module Dependencies

Declare and validate inter-module dependencies:

```typescript
class MyModule extends BasicRemoteModule {
  dependencies = ['core-module', 'auth-module'];

  // ...
}
```

### Lazy Loading

Support for lazy-loaded module features that load on demand.

---

## Troubleshooting

### Module Not Loading

**Problem:** Module doesn't appear in lifecycle logs

**Solutions:**

1. Check module is listed in host's `/config/modules.json`
2. Verify config file exists: `/config/module-<name>.json`
3. Check Module Federation remote is registered in `/public/remotes.json`
4. Verify module exposes `./lifecycle` in its Module Federation config
5. Check browser console for loading errors

---

### Lifecycle Hook Not Called

**Problem:** A specific lifecycle hook is not being called

**Solutions:**

1. Verify the hook is implemented and exported
2. Check the hook signature matches the interface
3. Ensure the hook is `async` and returns a `Promise<ModuleLifecycleResult>`
4. Check browser console for `[Module Lifecycle]` logs

---

### Configuration Not Received

**Problem:** Module's `onConfigure` receives unexpected configuration

**Solutions:**

1. Verify module's `id` matches the `id` in host config
2. Check the config file path: `/config/module-<module-name>.json`
3. Validate JSON syntax in config file
4. Check browser network tab for config file fetch (404?)

---

## Examples

### Minimal Module

A module that only registers a store:

```typescript
import { BasicRemoteModule } from '@linagora/linid-im-front-corelib';
import type { ModuleLifecycleResult } from '@linagora/linid-im-front-corelib';
import type { App } from 'vue';

class MinimalModule extends BasicRemoteModule {
  constructor() {
    super('minimal-module', 'Minimal Module', '1.0.0');
  }

  async onInitialize(app: App): Promise<ModuleLifecycleResult> {
    const pinia = app.config.globalProperties.$pinia;
    pinia.use(myStore);
    return { success: true };
  }
}

export default new MinimalModule();
```

---

### Full Module with All Hooks

A complete module implementation:

```typescript
import { BasicRemoteModule } from '@linagora/linid-im-front-corelib';
import type {
  ModuleLifecycleResult,
  ModuleHostConfig,
} from '@linagora/linid-im-front-corelib';
import type { App } from 'vue';

class FullModule extends BasicRemoteModule {
  private config: ModuleHostConfig | null = null;

  constructor() {
    super(
      'full-module',
      'Full Module',
      '1.0.0',
      'A complete module with all lifecycle hooks'
    );
  }

  async onSetup(app: App): Promise<ModuleLifecycleResult> {
    // Validate environment
    if (!app) {
      return {
        success: false,
        error: 'Vue app instance not available',
      };
    }

    console.log('[Full Module] Setup phase');
    return { success: true };
  }

  async onConfigure(
    app: App,
    config: ModuleHostConfig
  ): Promise<ModuleLifecycleResult> {
    // Validate config
    if (!config.id || config.id !== this.id) {
      return {
        success: false,
        error: 'Invalid or missing module ID in configuration',
      };
    }

    // Store config
    this.config = config;

    console.log('[Full Module] Configure phase', config);
    return { success: true };
  }

  async onInitialize(app: App): Promise<ModuleLifecycleResult> {
    // Register store
    const pinia = app.config.globalProperties.$pinia;
    pinia.use(myStore);

    console.log('[Full Module] Initialize phase');
    return {
      success: true,
      metadata: { storesRegistered: 1 },
    };
  }

  async onReady(app: App): Promise<ModuleLifecycleResult> {
    console.log('[Full Module] Ready phase - Module is now ready!');
    return { success: true };
  }

  async onPostInit(app: App): Promise<ModuleLifecycleResult> {
    console.log('[Full Module] Post-init phase - Setting up integrations');
    return { success: true };
  }
}

export default new FullModule();
```

Each phase has a specific purpose and is executed for **all modules** before moving to the next phase.

---
