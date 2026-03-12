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
     * Register a new entry in a specified zone.
     * @param zone - The name of the zone.
     * @param entry - The entry to register.
     */
    register(zone: string, entry: LinidZoneEntry): void;
    /**
     * Register a new entry only if the plugin
     * is not already registered in the zone.
     * @param zone - The name of the zone.
     * @param entry - The entry to register.
     */
    registerOnce(zone: string, entry: LinidZoneEntry): void;
}>;
export {};
