import type { Component } from 'vue';
/**
 * Makes a component available to zones under the given name.
 *
 * Registering a component is what allows a zone entry to reference it by name,
 * either programmatically or from a module configuration file. Components are
 * stored with `markRaw` to keep them out of the reactivity system, as Vue
 * components must not be reactive.
 *
 * Registering an already known name overrides the previous component.
 * @param name - The name under which the component can be referenced.
 * @param component - The component to make available to zones.
 */
export declare function registerLocalComponent(name: string, component: Component): void;
/**
 * Makes several components available to zones at once.
 *
 * Convenience wrapper around {@link registerLocalComponent}, typically used by
 * the host application to declare all its local components in a single call.
 * @param components - The components to make available, indexed by name.
 */
export declare function registerLocalComponents(components: Record<string, Component>): void;
/**
 * Resolves the component registered under the given name.
 *
 * Unknown names are returned as-is so that Vue still attempts to resolve them
 * against globally registered components, which keeps entries working when a
 * component is made available by the application rather than by this registry.
 * @param name - The name of the component to resolve.
 * @returns The registered component, or the name itself when unknown.
 */
export declare function resolveLocalComponent(name: string): Component | string;
