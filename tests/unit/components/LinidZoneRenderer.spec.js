import { flushPromises, shallowMount } from '@vue/test-utils';
import { createPinia, setActivePinia } from 'pinia';
import LinidZoneRenderer from 'src/components/LinidZoneRenderer.vue';
import * as federationService from 'src/services/federationService';
import { useLinidZoneStore } from 'src/stores/linidZoneStore';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { nextTick, watch } from 'vue';

vi.mock('src/services/federationService', () => ({
  loadAsyncComponent: vi.fn(),
}));

describe('Test component: LinidZoneRenderer', () => {
  let pinia;
  let store;
  let wrapper;

  beforeEach(() => {
    pinia = createPinia();
    setActivePinia(pinia);
    store = useLinidZoneStore();
    wrapper = shallowMount(LinidZoneRenderer, {
      props: { zone: '' },
      global: { plugins: [pinia] },
    });
    vi.clearAllMocks();
  });

  describe('Test watchEffect', () => {
    it('should initialize isLoadingComplete to false when mounted', async () => {
      const values = [];
      const stopWatch = watch(
        () => wrapper.vm.isLoadingComplete,
        (newVal) => {
          values.push(newVal);
        },
        { flush: 'sync' }
      );

      await wrapper.setProps({ zone: 'zone-test' });

      await flushPromises();
      await nextTick();
      stopWatch();

      expect(values).toEqual([false, true]);
    });

    it('should set isLoadingComplete to true after initialization', async () => {
      wrapper.setProps({ zone: 'any-zone' });

      await flushPromises();
      await nextTick();

      expect(wrapper.vm.isLoadingComplete).toBe(true);
    });

    it('should not call loadAsyncComponent when the zone is not registered in store', async () => {
      wrapper.setProps({ zone: 'unregistered-zone' });

      await flushPromises();
      await nextTick();

      expect(federationService.loadAsyncComponent).not.toHaveBeenCalled();
      expect(wrapper.vm.components).toEqual([]);
    });

    it('should not call loadAsyncComponent when the zone is registered has no entries', async () => {
      wrapper.vm.linidZoneStore.zones['empty-zone'] = [];

      wrapper.setProps({ zone: 'empty-zone' });

      await flushPromises();
      await nextTick();

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

      wrapper.setProps({ zone: 'test-zone' });

      await flushPromises();
      await nextTick();

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
