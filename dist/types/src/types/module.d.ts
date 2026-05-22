import type { ModuleLifecycleHooks } from './moduleLifecycle';
/**
 * Remote module interface.
 *
 * All remote modules exposed via Module Federation should implement this interface.
 * This is the contract between the host application and remote modules.
 * @template T Type of the module-specific options provided in the host configuration.
 */
export interface RemoteModule<T> extends ModuleLifecycleHooks<T> {
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
/**
 * Module configuration in the host (module-<name>.json).
 *
 * This is what the host provides to each module during the configuration phase.
 * The host reads this from `module-<name>.json` files.
 * @template T Type of the module-specific options.
 */
export interface ModuleHostConfig<T> {
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
    /**
     * Definitions of the zones where the module will render exposed elements in other modules.
     *
     * Zones should always be set (empty array [] when no zones).
     */
    zones: ModuleZoneDefinition[];
    /**
     * Module-specific options provided in the host configuration.
     * These options are passed to the module during configuration.
     */
    options: T;
}
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
/**
 * Definition of a UI zone injection.
 *
 * Allows a module to declare that one of its exposed elements through module
 * federation should be rendered inside a named zone exposed by another module,
 * optionally with props.
 * @template T Props type for the injected element.
 */
export interface ModuleZoneDefinition<T = Record<string, unknown>> {
    /**
     * Name of the target zone exposed by another module where the element will be rendered.
     */
    zone: string;
    /**
     * Name of the exposed element to render in the zone.
     */
    plugin: string;
    /**
     * Optional props to pass to the exposed element rendered in this zone.
     * The module can define the structure of these props as needed.
     */
    props?: T;
}
