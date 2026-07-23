import type { Component } from 'vue';
import type { LinidZoneEntry } from '../types/linidZone';
/**
 * State interface for the Linid Zone Store.
 */
interface LinidZoneState {
    /** Map of zone names to their registered entries. */
    zones: Record<string, LinidZoneEntry[]>;
}
/**
 * Returns the Linid Zone Store instance.
 * @returns The Linid Zone Store instance.
 */
export declare const useLinidZoneStore: () => import("pinia").Store<"linidZoneStore", LinidZoneState, {}, {
    /**
     * Append an entry to a specified zone, creating the zone if needed.
     *
     * Internal helper backing the public `register*` actions.
     * @param zone - The name of the zone.
     * @param entry - The entry to append.
     */
    appendEntry(zone: string, entry: LinidZoneEntry): void;
    /**
     * Register a federated plugin component in a specified zone.
     * @param zone - The name of the zone.
     * @param plugin - The plugin identifier of the remote component to load.
     * @param props - Optional props passed to the rendered component.
     */
    registerPlugin(zone: string, plugin: string, props?: Record<string, unknown>): void;
    /**
     * Register a federated plugin component only if the plugin
     * is not already registered in the zone.
     * @param zone - The name of the zone.
     * @param plugin - The plugin identifier of the remote component to load.
     * @param props - Optional props passed to the rendered component.
     */
    registerPluginOnce(zone: string, plugin: string, props?: Record<string, unknown>): void;
    /**
     * Register a Vue component directly in a specified zone.
     *
     * The component is stored with `markRaw` to keep it out of the
     * reactivity system, as Vue components must not be reactive.
     * @param zone - The name of the zone.
     * @param component - The Vue component to render as-is.
     * @param props - Optional props passed to the rendered component.
     */
    registerComponent(zone: string, component: Component, props?: Record<string, unknown>): void;
}>;
export {};
