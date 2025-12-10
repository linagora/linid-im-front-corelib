import { createPinia, setActivePinia } from 'pinia';
import { useLinIdConfigurationStore } from 'src/stores/linIdConfigurationStore';
import * as linIdConfigurationService from 'src/services/linIdConfigurationService';
import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('src/services/linIdConfigurationService', () => ({
  getEntitiesConfiguration: vi.fn(),
  getRoutesConfiguration: vi.fn(),
}));

describe('Test store: linIdConfigurationStore', () => {
  let store;

  beforeEach(() => {
    setActivePinia(createPinia());
    store = useLinIdConfigurationStore();
    vi.clearAllMocks();
  });

  describe('Test initial state', () => {
    it('should have empty initial state', () => {
      expect(store.entities).toEqual([]);
      expect(store.routes).toEqual([]);
      expect(store.loading).toBe(false);
      expect(store.error).toBeNull();
    });
  });

  describe('Test getter: getEntityByName', () => {
    it('should return undefined when entity is not found', () => {
      store.entities = [{ name: 'user', attributes: [] }];

      const result = store.getEntityByName('unknown');

      expect(result).toBeUndefined();
    });

    it('should return the entity when found', () => {
      const userEntity = { name: 'user', attributes: [{ name: 'email' }] };
      store.entities = [userEntity, { name: 'group', attributes: [] }];

      const result = store.getEntityByName('user');

      expect(result).toEqual(userEntity);
    });
  });

  describe('Test getter: getRoutesByEntity', () => {
    it('should return empty array when no routes match', () => {
      store.routes = [
        { method: 'GET', path: '/groups', entity: 'group', variables: [] },
      ];

      const result = store.getRoutesByEntity('user');

      expect(result).toEqual([]);
    });

    it('should return all routes for the specified entity', () => {
      const userRoutes = [
        { method: 'GET', path: '/users', entity: 'user', variables: [] },
        { method: 'POST', path: '/users', entity: 'user', variables: [] },
      ];
      store.routes = [
        ...userRoutes,
        { method: 'GET', path: '/groups', entity: 'group', variables: [] },
      ];

      const result = store.getRoutesByEntity('user');

      expect(result).toEqual(userRoutes);
    });
  });

  describe('Test action: fetchConfiguration', () => {
    it('should fetch entities and routes successfully', async () => {
      const mockEntities = [{ name: 'user', attributes: [] }];
      const mockRoutes = [
        { method: 'GET', path: '/users', entity: 'user', variables: [] },
      ];

      vi.mocked(
        linIdConfigurationService.getEntitiesConfiguration
      ).mockResolvedValue(mockEntities);
      vi.mocked(
        linIdConfigurationService.getRoutesConfiguration
      ).mockResolvedValue(mockRoutes);

      await store.fetchConfiguration();

      expect(store.entities).toEqual(mockEntities);
      expect(store.routes).toEqual(mockRoutes);
      expect(store.loading).toBe(false);
      expect(store.error).toBeNull();
    });

    it('should set loading to true during fetch', async () => {
      let loadingDuringFetch = false;

      vi.mocked(
        linIdConfigurationService.getEntitiesConfiguration
      ).mockImplementation(async () => {
        loadingDuringFetch = store.loading;
        return [];
      });
      vi.mocked(
        linIdConfigurationService.getRoutesConfiguration
      ).mockResolvedValue([]);

      await store.fetchConfiguration();

      expect(loadingDuringFetch).toBe(true);
      expect(store.loading).toBe(false);
    });

    it('should handle errors and set error message', async () => {
      const consoleErrorSpy = vi
        .spyOn(globalThis.console, 'error')
        .mockImplementation(() => {});
      const error = new Error('Network failure');

      vi.mocked(
        linIdConfigurationService.getEntitiesConfiguration
      ).mockRejectedValue(error);

      await store.fetchConfiguration();

      expect(store.error).toBe('Network failure');
      expect(store.loading).toBe(false);
      expect(store.entities).toEqual([]);
      expect(store.routes).toEqual([]);
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        '[LinID CoreLib] Failed to fetch configuration:',
        error
      );

      consoleErrorSpy.mockRestore();
    });

    it('should handle non-Error exceptions', async () => {
      const consoleErrorSpy = vi
        .spyOn(globalThis.console, 'error')
        .mockImplementation(() => {});

      vi.mocked(
        linIdConfigurationService.getEntitiesConfiguration
      ).mockRejectedValue('String error');

      await store.fetchConfiguration();

      expect(store.error).toBe('Failed to fetch configuration');

      consoleErrorSpy.mockRestore();
    });

    it('should reset error on new fetch', async () => {
      store.error = 'Previous error';

      vi.mocked(
        linIdConfigurationService.getEntitiesConfiguration
      ).mockResolvedValue([]);
      vi.mocked(
        linIdConfigurationService.getRoutesConfiguration
      ).mockResolvedValue([]);

      await store.fetchConfiguration();

      expect(store.error).toBeNull();
    });
  });
});
