import { createPinia, setActivePinia } from 'pinia';
import { useLinidZoneStore } from 'src/stores/linidZoneStore';
import { beforeEach, describe, expect, it } from 'vitest';

describe('Test store: linidZoneStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  describe('Test initial state', () => {
    it('should initialize with empty zones', () => {
      const store = useLinidZoneStore();

      expect(store.zones).toEqual({});
    });
  });

  describe('Test function: register', () => {
    it('should register an entry in a new zone', () => {
      const store = useLinidZoneStore();
      const entry = {
        plugin: 'test-plugin/TestComponent',
        props: {},
      };

      store.register('list-page.sidebar', entry);

      expect(store.zones['list-page.sidebar']).toBeDefined();
      expect(store.zones['list-page.sidebar']).toHaveLength(1);
      expect(store.zones['list-page.sidebar'][0]).toEqual(entry);
    });

    it('should register multiple entries in the same zone', () => {
      const store = useLinidZoneStore();
      const entry1 = {
        plugin: 'plugin-1/Component1',
        props: {},
      };
      const entry2 = {
        plugin: 'plugin-2/Component2',
        props: { value: 42 },
      };

      store.register('list-page.sidebar', entry1);
      store.register('list-page.sidebar', entry2);

      expect(store.zones['list-page.sidebar']).toHaveLength(2);
      expect(store.zones['list-page.sidebar'][0]).toEqual(entry1);
      expect(store.zones['list-page.sidebar'][1]).toEqual(entry2);
    });

    it('should register entries in different zones independently', () => {
      const store = useLinidZoneStore();
      const headerEntry = {
        plugin: 'header-plugin/HeaderComponent',
        props: {},
      };
      const footerEntry = {
        plugin: 'footer-plugin/FooterComponent',
        props: {},
      };

      store.register('list-page.header', headerEntry);
      store.register('list-page.footer', footerEntry);

      expect(store.zones['list-page.header']).toHaveLength(1);
      expect(store.zones['list-page.footer']).toHaveLength(1);
      expect(store.zones['list-page.header'][0]).toEqual(headerEntry);
      expect(store.zones['list-page.footer'][0]).toEqual(footerEntry);
    });

    it('should handle entries with complex props', () => {
      const store = useLinidZoneStore();
      const entry = {
        plugin: 'complex-plugin/ComplexComponent',
        props: {
          title: 'Test Title',
          count: 123,
          enabled: true,
          config: {
            nested: {
              value: 'deep',
            },
          },
          items: ['a', 'b', 'c'],
        },
      };

      store.register('list-page.body', entry);

      expect(store.zones['list-page.body'][0].props).toEqual(entry.props);
    });
  });
});
