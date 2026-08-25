import {
  getInstance,
  registerRemotes,
} from '@module-federation/enhanced/runtime';
import { createPinia, setActivePinia } from 'pinia';
import { linidModuleFederation } from 'src/lifecycle/linidModuleFederation';
import * as federationService from 'src/services/federationService';
import * as i18nService from 'src/services/i18nService';
import * as linidModuleConfigurationService from 'src/services/linidModuleConfigurationService';
import * as localComponentService from 'src/services/localComponentService';
import * as nunjucksService from 'src/services/nunjucksService';
import * as piniaStoreService from 'src/services/piniaStoreService';
import { useLinidZoneStore } from 'src/stores/linidZoneStore';
import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('@module-federation/enhanced/runtime', () => ({
  getInstance: vi.fn(),
  registerRemotes: vi.fn(),
}));

vi.mock('src/services/federationService', () => ({
  getModuleFederation: vi.fn(),
  setModuleFederation: vi.fn(),
}));

vi.mock('src/services/i18nService', () => ({
  getI18nInstance: vi.fn(),
}));

vi.mock('src/services/linidModuleConfigurationService', () => ({
  registerModuleHostConfiguration: vi.fn(),
}));

vi.mock('src/services/localComponentService', () => ({
  registerLocalComponents: vi.fn(),
}));

vi.mock('src/services/nunjucksService', () => ({
  getNunjucksEnv: vi.fn(),
}));

vi.mock('src/services/piniaStoreService', () => ({
  getPiniaStore: vi.fn(),
  setPiniaStore: vi.fn(),
}));

describe('Test object: linidModuleFederation', () => {
  const config = {
    instanceId: 'test-module',
    remoteName: 'testModule',
    lifecycleRemote: 'testModule/lifecycle',
    routesRemote: 'testModule/routes',
    i18nRemote: 'testModule/i18n',
    basePath: '/test-module',
    zones: [],
  };
  const remotes = [{ name: 'testModule', entry: '/testModule/manifest.json' }];
  const modules = ['/modules/test.json'];

  let pinia;
  let loadRemote;
  let setLocaleMessage;
  let router;
  let remoteModule;
  let federationInstance;

  /**
   * Mocks a fetch implementation serving one module configuration file.
   * @param moduleConfig - The module configuration returned for /modules/test.json.
   */
  function stubFetch(moduleConfig) {
    vi.stubGlobal(
      'fetch',
      vi.fn(async (url) => ({ ok: true, url, json: async () => moduleConfig }))
    );
  }

  beforeEach(() => {
    vi.clearAllMocks();
    pinia = createPinia();
    setActivePinia(pinia);
    vi.mocked(piniaStoreService.getPiniaStore).mockReturnValue(pinia);

    remoteModule = {
      setup: vi.fn(async () => ({ success: true })),
      configure: vi.fn(async () => ({ success: true })),
      initialize: vi.fn(async () => ({ success: true })),
      ready: vi.fn(async () => ({ success: true })),
      postInit: vi.fn(async () => ({ success: true })),
    };

    loadRemote = vi.fn(async (remote) => {
      if (remote === 'testModule/lifecycle') {
        return { default: remoteModule };
      }
      if (remote === 'testModule/routes') {
        return { default: [] };
      }
      return { default: {} };
    });
    federationInstance = { loadRemote };
    vi.mocked(getInstance).mockReturnValue(federationInstance);
    vi.mocked(federationService.getModuleFederation).mockReturnValue(
      federationInstance
    );

    setLocaleMessage = vi.fn();
    vi.mocked(i18nService.getI18nInstance).mockReturnValue({
      global: {
        messages: { value: { 'en-US': { existing: 'kept' } } },
        setLocaleMessage,
      },
    });

    vi.mocked(nunjucksService.getNunjucksEnv).mockReturnValue({
      renderString: vi.fn((template) => template),
    });

    router = {
      hasRoute: vi.fn(() => false),
      removeRoute: vi.fn(),
      addRoute: vi.fn(),
    };
  });

  describe('Test function: init', () => {
    it('should register remotes and share the federation instance with the corelib', async () => {
      stubFetch(config);

      await linidModuleFederation.init({ router, remotes, modules });

      expect(registerRemotes).toHaveBeenCalledWith(remotes);
      expect(federationService.setModuleFederation).toHaveBeenCalledWith(
        federationInstance
      );
    });

    it('should register the provided host-local components', async () => {
      stubFetch(config);
      const localComponents = {
        MyLocalComponent: { name: 'MyLocalComponent' },
      };

      await linidModuleFederation.init({
        router,
        remotes,
        modules,
        localComponents,
      });

      expect(
        localComponentService.registerLocalComponents
      ).toHaveBeenCalledWith(localComponents);
    });

    it('should not register local components when none are provided', async () => {
      stubFetch(config);

      await linidModuleFederation.init({ router, remotes, modules });

      expect(
        localComponentService.registerLocalComponents
      ).not.toHaveBeenCalled();
    });

    it('should run all lifecycle phases in order for a loaded module', async () => {
      stubFetch(config);

      await linidModuleFederation.init({ router, remotes, modules });

      expect(loadRemote).toHaveBeenCalledWith('testModule/lifecycle');
      expect(
        linidModuleConfigurationService.registerModuleHostConfiguration
      ).toHaveBeenCalledWith(config);
      expect(remoteModule.setup).toHaveBeenCalledTimes(1);
      expect(remoteModule.configure).toHaveBeenCalledWith(config);
      expect(remoteModule.initialize).toHaveBeenCalledWith(config);
      expect(remoteModule.ready).toHaveBeenCalledWith(config);
      expect(remoteModule.postInit).toHaveBeenCalledWith(config);

      const order = [
        remoteModule.setup,
        remoteModule.configure,
        remoteModule.initialize,
        remoteModule.ready,
        remoteModule.postInit,
      ].map((hook) => hook.mock.invocationCallOrder[0]);
      expect(order).toEqual([...order].sort((a, b) => a - b));
    });

    it('should fetch each provided module configuration file', async () => {
      const fetchMock = vi.fn(async () => ({ ok: false }));
      vi.stubGlobal('fetch', fetchMock);

      await linidModuleFederation.init({
        router,
        remotes,
        modules: ['/modules/a.json', '/modules/b.json'],
      });

      expect(fetchMock).toHaveBeenCalledWith('/modules/a.json');
      expect(fetchMock).toHaveBeenCalledWith('/modules/b.json');
    });

    it('should skip a module whose configuration file fails to load', async () => {
      vi.stubGlobal(
        'fetch',
        vi.fn(async () => ({ ok: false }))
      );

      await linidModuleFederation.init({ router, remotes, modules });

      expect(loadRemote).not.toHaveBeenCalled();
    });

    it('should register module routes on the router, replacing existing ones', async () => {
      stubFetch(config);
      loadRemote.mockImplementation(async (remote) => {
        if (remote === 'testModule/lifecycle') {
          return { default: remoteModule };
        }
        if (remote === 'testModule/routes') {
          return {
            default: [
              {
                name: 'test-route',
                path: '/test-module',
                component: 'testModule/Page',
              },
            ],
          };
        }
        return { default: {} };
      });
      router.hasRoute = vi.fn(() => true);

      await linidModuleFederation.init({ router, remotes, modules });

      expect(router.removeRoute).toHaveBeenCalledWith('test-route');
      expect(router.addRoute).toHaveBeenCalledTimes(1);
      expect(router.addRoute.mock.calls[0][0]).toMatchObject({
        name: 'test-route',
        path: '/test-module',
      });
    });

    it('should merge module i18n messages into the host i18n instance', async () => {
      stubFetch(config);
      loadRemote.mockImplementation(async (remote) => {
        if (remote === 'testModule/lifecycle') {
          return { default: remoteModule };
        }
        if (remote === 'testModule/i18n') {
          return { default: { 'en-US': { added: 'value' } } };
        }
        return { default: [] };
      });

      await linidModuleFederation.init({ router, remotes, modules });

      expect(setLocaleMessage).toHaveBeenCalledWith('en-US', {
        added: 'value',
        existing: 'kept',
      });
    });

    it('should register configured zones as components or federated plugins', async () => {
      stubFetch({
        ...config,
        zones: [
          { zone: 'header', component: 'LocalComponent' },
          { zone: 'footer', plugin: 'testModule/RemoteComponent' },
        ],
      });

      await linidModuleFederation.init({ router, remotes, modules });

      const zoneStore = useLinidZoneStore();
      expect(zoneStore.zones.header).toEqual([
        { type: 'component', component: 'LocalComponent', props: undefined },
      ]);
      expect(zoneStore.zones.footer).toEqual([
        {
          type: 'federated',
          plugin: 'testModule/RemoteComponent',
          props: undefined,
        },
      ]);
    });

    it('should run the provided hook after the default phase runner', async () => {
      stubFetch(config);
      const configureHook = vi.fn(async () => ({ success: true }));

      await linidModuleFederation.init({
        router,
        remotes,
        modules,
        hooks: { configure: configureHook },
      });

      expect(configureHook).toHaveBeenCalledWith(remoteModule, config, router);
      // The default configure runner still ran, before the hook.
      expect(remoteModule.configure).toHaveBeenCalledWith(config);
      expect(loadRemote).toHaveBeenCalledWith('testModule/routes');
      expect(remoteModule.configure.mock.invocationCallOrder[0]).toBeLessThan(
        configureHook.mock.invocationCallOrder[0]
      );
      // Phases without a hook keep their default behavior.
      expect(
        linidModuleConfigurationService.registerModuleHostConfiguration
      ).toHaveBeenCalledWith(config);
      expect(remoteModule.postInit).toHaveBeenCalledWith(config);
    });
  });
});
