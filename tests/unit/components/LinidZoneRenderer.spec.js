import { shallowMount } from '@vue/test-utils';
import { createPinia, setActivePinia } from 'pinia';
import LinidZoneRenderer from 'src/components/LinidZoneRenderer.vue';
import * as federationService from 'src/services/federationService';
import * as piniaStoreService from 'src/services/piniaStoreService.ts';
import { useLinidZoneStore } from 'src/stores/linidZoneStore';
import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('src/services/federationService', () => ({
  loadAsyncComponent: vi.fn(),
}));

vi.mock('src/services/piniaStoreService', () => ({
  getPiniaStore: vi.fn(),
  setPiniaStore: vi.fn(),
}));

describe('Test component: LinidZoneRenderer', () => {
  let pinia;
  let store;
  let wrapper;

  beforeEach(() => {
    pinia = createPinia();
    setActivePinia(pinia);
    vi.mocked(piniaStoreService.getPiniaStore).mockReturnValue(pinia);
    store = useLinidZoneStore();
    vi.clearAllMocks();
  });

  describe('Test constant: components', () => {
    it('should not call loadAsyncComponent when the zone is not registered in store', async () => {
      wrapper = shallowMount(LinidZoneRenderer, {
        props: { zone: 'unregistered-zone' },
        global: { plugins: [pinia] },
      });

      expect(federationService.loadAsyncComponent).not.toHaveBeenCalled();
      expect(wrapper.vm.components).toEqual([]);
    });

    it('should not call loadAsyncComponent when the zone is registered has no entries', async () => {
      wrapper = shallowMount(LinidZoneRenderer, {
        props: { zone: 'empty-zone' },
        global: { plugins: [pinia] },
      });

      expect(federationService.loadAsyncComponent).not.toHaveBeenCalled();
      expect(wrapper.vm.components).toEqual([]);
    });

    it('should load components from store when zone is registered and has entries', async () => {
      const MockComponentA = {
        name: 'MockComponent',
        template: '<div>Mock</div>',
      };
      const MockComponentB = {
        name: 'MockComponent',
        template: '<div>Mock</div>',
      };
      vi.mocked(federationService.loadAsyncComponent)
        .mockReturnValueOnce(MockComponentA)
        .mockReturnValueOnce(MockComponentB);

      store.register('test-zone', {
        plugin: 'test-plugin/MockComponentA',
        props: { title: 'Test' },
      });

      store.register('test-zone', {
        plugin: 'test-plugin/MockComponentB',
        props: {},
      });

      wrapper = shallowMount(LinidZoneRenderer, {
        props: { zone: 'test-zone' },
        global: { plugins: [pinia] },
      });

      expect(federationService.loadAsyncComponent).toHaveBeenCalledTimes(2);
      expect(federationService.loadAsyncComponent).toHaveBeenCalledWith(
        'test-plugin/MockComponentA'
      );
      expect(federationService.loadAsyncComponent).toHaveBeenCalledWith(
        'test-plugin/MockComponentB'
      );

      expect(wrapper.vm.components).toHaveLength(2);

      expect(wrapper.vm.components[0].plugin).toBe(
        'test-plugin/MockComponentA'
      );
      expect(wrapper.vm.components[0].props).toEqual({ title: 'Test' });
      expect(JSON.stringify(wrapper.vm.components[0].component)).toEqual(
        JSON.stringify(MockComponentA)
      );

      expect(wrapper.vm.components[1].plugin).toBe(
        'test-plugin/MockComponentB'
      );
      expect(wrapper.vm.components[1].props).toEqual({});
      expect(JSON.stringify(wrapper.vm.components[1].component)).toEqual(
        JSON.stringify(MockComponentB)
      );
    });
  });
});
