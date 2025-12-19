/*
 * Copyright (C) 2025 Linagora
 *
 * This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General
 * Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option)
 * any later version, provided you comply with the Additional Terms applicable for LinID Identity Manager software by
 * LINAGORA pursuant to Section 7 of the GNU Affero General Public License, subsections (b), (c), and (e), pursuant to
 * which these Appropriate Legal Notices must notably (i) retain the display of the "LinID™" trademark/logo at the top
 * of the interface window, the display of the “You are using the Open Source and free version of LinID™, powered by
 * Linagora © 2009–2013. Contribute to LinID R&D by subscribing to an Enterprise offer!” infobox and in the e-mails
 * sent with the Program, notice appended to any type of outbound messages (e.g. e-mail and meeting requests) as well
 * as in the LinID Identity Manager user interface, (ii) retain all hypertext links between LinID Identity Manager
 * and https://linid.org/, as well as between LINAGORA and LINAGORA.com, and (iii) refrain from infringing LINAGORA
 * intellectual property rights over its trademarks and commercial brands. Other Additional Terms apply, see
 * <http://www.linagora.com/licenses/> for more details.
 *
 * This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied
 * warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more
 * details.
 *
 * You should have received a copy of the GNU Affero General Public License and its applicable Additional Terms for
 * LinID Identity Manager along with this program. If not, see <http://www.gnu.org/licenses/> for the GNU Affero
 * General Public License version 3 and <http://www.linagora.com/licenses/> for the Additional Terms applicable to the
 * LinID Identity Manager software.
 */

import { defineStore } from 'pinia';
import {
  getApiEndpointsConfiguration,
  getEntitiesConfiguration,
} from '../services/linidConfigurationService';
import { getPiniaStore } from '../services/piniaStoreService';
import type {
  LinidApiEndpointConfiguration,
  LinidEntityConfiguration,
} from '../types/linidConfiguration';

/**
 * State interface for the Linid Configuration Store.
 */
interface LinidConfigurationState {
  /** List of entity configurations fetched from the backend. */
  entities: LinidEntityConfiguration[];
  /** List of api endpoint configurations fetched from the backend. */
  apiEndpoints: LinidApiEndpointConfiguration[];
  /** Indicates if the configuration is currently being loaded. */
  loading: boolean;
  /** Error message if the configuration fetch failed. */
  error: string | null;
}

/**
 * Returns the Linid Configuration Store instance.
 * @returns The Linid Configuration Store instance.
 */
export const useLinidConfigurationStore = () =>
  _useLinidConfigurationStore(getPiniaStore());

/**
 * Pinia store managing Linid entity and route configurations.
 *
 * Fetches and stores metadata from the backend API.
 */
const _useLinidConfigurationStore = defineStore('LinidConfigurationStore', {
  state: (): LinidConfigurationState => ({
    entities: [],
    apiEndpoints: [],
    loading: false,
    error: null,
  }),

  getters: {
    /**
     * Returns an entity configuration by name.
     * @param state - The store state.
     * @returns A function that takes an entity name and returns the configuration.
     */
    getEntityByName:
      (state) =>
      (name: string): LinidEntityConfiguration | undefined =>
        state.entities.find((entity) => entity.name === name),

    /**
     * Returns all api endpoints for a specific entity.
     * @param state - The store state.
     * @returns A function that takes an entity name and returns its api endpoints.
     */
    getApiEndpointsByEntity:
      (state) =>
      (entityName: string): LinidApiEndpointConfiguration[] =>
        state.apiEndpoints.filter(
          (apiEndpoint) => apiEndpoint.entity === entityName
        ),
  },

  actions: {
    /**
     * Fetches all entity and api endpoint configurations from the backend.
     */
    async fetchConfiguration(): Promise<void> {
      this.loading = true;
      this.error = null;

      try {
        const [entities, apiEndpoints] = await Promise.all([
          getEntitiesConfiguration(),
          getApiEndpointsConfiguration(),
        ]);

        this.entities = entities;
        this.apiEndpoints = apiEndpoints;
      } catch (err) {
        this.error =
          err instanceof Error ? err.message : 'Failed to fetch configuration';
        console.error('[Linid CoreLib] Failed to fetch configuration:', err);
      } finally {
        this.loading = false;
      }
    },
  },
});
