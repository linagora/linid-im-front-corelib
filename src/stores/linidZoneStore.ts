import {defineStore} from "pinia";
import {LinidZoneEntry} from "../types/linidZone";

export const useLinidZoneStore = defineStore("linidZoneStore", {
  state: () => ({
    zones: {} as Record<string, LinidZoneEntry[]>,
  }),

  actions: {
    register(zone: string, entry: LinidZoneEntry) {
      if (!this.zones[zone]) this.zones[zone] = [];
      this.zones[zone].push(entry);
    },
  },
});
