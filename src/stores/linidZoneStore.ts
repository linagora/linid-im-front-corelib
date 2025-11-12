import { defineStore } from 'pinia';
import { LinidZoneEntry } from '../types/linidZone';

/**
 * State interface for the Linid Zone Store
 */
interface LinidZoneState {
  /** Map of zone names to their registered entries */
  zones: Record<string, LinidZoneEntry[]>;
}

/**
 * Pinia store managing Linid zones and their registered entries.
 *
 * Each zone can contain multiple {@link LinidZoneEntry} objects,
 * and this store provides utilities to register them dynamically.
 */
export const useLinidZoneStore = defineStore('linidZoneStore', {
  /**
   * Reactive state of the Linid Zone Store.
   * @returns The initial state containing an empty zones object
   */
  state: (): LinidZoneState => ({
    zones: {},
  }),

  actions: {
    /**
     * Register a new entry in a specified zone
     * @param zone - The name of the zone
     * @param entry - The entry to register
     */
    register(zone: string, entry: LinidZoneEntry): void {
      if (!this.zones[zone]) {
        this.zones[zone] = [];
      }
      this.zones[zone].push(entry);
    },
  },
});
