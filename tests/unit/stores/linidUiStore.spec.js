import { createPinia, setActivePinia } from 'pinia';
import * as piniaStoreService from 'src/services/piniaStoreService.ts';
import { useLinidUiStore } from 'src/stores/linidUiStore';
import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('src/services/piniaStoreService', () => ({
  getPiniaStore: vi.fn(),
  setPiniaStore: vi.fn(),
}));

describe('Test store: linidUiStore', () => {
  let store;
  let pinia;

  beforeEach(() => {
    pinia = createPinia();
    setActivePinia(pinia);
    vi.mocked(piniaStoreService.getPiniaStore).mockReturnValue(pinia);
    store = useLinidUiStore();
    vi.clearAllMocks();
  });

  describe('Test initial state', () => {
    it('should have empty initial state', () => {
      expect(store.mainNavigationItems).toEqual([]);
    });
  });

  describe('Test action: addMainNavigationMenuItems', () => {
    it('should add items to the main navigation menu', async () => {
      const items = [
        { id: 'home', label: 'Home', route: '/' },
        { id: 'about', label: 'About', route: '/about' },
      ];
      store.addMainNavigationMenuItems(...items);
      expect(store.mainNavigationItems).toEqual(items);
    });
  });
});
