import type { Component } from 'vue';
/**
 * Base model shared by all zone entry variants.
 */
export interface BaseLinidZoneEntry {
    /**
     * Optional props to be passed to the rendered component.
     *
     * The keys are prop names, and the values are Vue components or objects
     * compatible with Vue’s component system.
     */
    props?: Record<string, unknown>;
}
/**
 * Zone entry referencing a component loaded through module federation.
 */
export interface FederatedLinidZoneEntry extends BaseLinidZoneEntry {
    /** Discriminant of the federated variant. */
    type: 'federated';
    /**
     * The unique plugin identifier that registered this entry.
     *
     * Typically corresponds to the plugin name or package name.
     */
    plugin: string;
}
/**
 * Zone entry providing a Vue component directly.
 *
 * Unlike federated entries, no module federation loading is involved:
 * the component is rendered as-is.
 */
export interface ComponentLinidZoneEntry extends BaseLinidZoneEntry {
    /** Discriminant of the component variant. */
    type: 'component';
    /**
     * The Vue component to render directly.
     */
    component: Component;
}
/**
 * Represents a single entry registered within a Linid Zone.
 *
 * An entry provides its component either through a federated plugin
 * identifier ({@link FederatedLinidZoneEntry}) or as a Vue component
 * given directly ({@link ComponentLinidZoneEntry}), and can optionally
 * define props to configure that component.
 */
export type LinidZoneEntry = FederatedLinidZoneEntry | ComponentLinidZoneEntry;
/**
 * A zone entry resolved for rendering by `LinidZoneRenderer`.
 *
 * Whatever the entry variant, the resolved form always carries the
 * component to render.
 */
export interface LinidZoneResolvedEntry {
    /**
     * The component to render.
     *
     * Either the async component loaded from the federated plugin,
     * or the Vue component provided directly by the entry.
     */
    component: Component;
    /**
     * Optional props to be passed to the rendered component.
     */
    props?: Record<string, unknown>;
}
